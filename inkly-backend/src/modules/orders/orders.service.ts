import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { EmailService } from '../../common/services/email.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => EmailService))
    private emailService?: EmailService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    // Get user's cart
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    // Create order with items
    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        status: OrderStatus.PENDING,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Clear cart after order creation
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    // Send order confirmation email (async)
    if (this.emailService) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, name: true },
      });

      if (user) {
        this.emailService
          .sendOrderConfirmationEmail(user.email, user.name || user.email, order.id, order.total)
          .catch(() => {
            // Silently fail if email fails
          });
      }
    }

    return order;
  }

  async findAll(userId: string, isAdmin: boolean = false) {
    const where: any = {};

    if (!isAdmin) {
      where.userId = userId;
    }

    return this.prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string, isAdmin: boolean = false) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (!isAdmin && order.userId !== userId) {
      throw new ForbiddenException('Not authorized to view this order');
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, isAdmin: boolean = false) {
    if (!isAdmin) {
      throw new ForbiddenException('Only admins can update order status');
    }

    const order = await this.findOne(id, '', true); // Admin can view any order

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    // Send status update email if status changed
    if (updateOrderDto.status && this.emailService && updatedOrder.user) {
      this.emailService
        .sendOrderStatusUpdateEmail(
          updatedOrder.user.email,
          updatedOrder.user.name || updatedOrder.user.email,
          updatedOrder.id,
          updateOrderDto.status,
        )
        .catch(() => {
          // Silently fail if email fails
        });
    }

    return updatedOrder;
  }
}
