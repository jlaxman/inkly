import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async createPaymentIntent(createPaymentDto: CreatePaymentDto) {
    const { orderId, amount, paymentMethod } = createPaymentDto;

    // Verify order exists
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    if (order.total !== amount) {
      throw new BadRequestException('Amount mismatch');
    }

    // For UPI/PhonePe, we'll generate a payment link
    // In production, integrate with Razorpay or PhonePe SDK
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Update order with payment info
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentMethod: paymentMethod as any,
        paymentId,
      },
    });

    // Generate payment link based on method
    let paymentLink: string;
    let qrCode: string;

    if (paymentMethod === 'UPI' || paymentMethod === 'PHONEPE') {
      // Generate UPI payment link
      const upiId = this.configService.get<string>('UPI_ID') || 'your-merchant@upi';
      paymentLink = `upi://pay?pa=${upiId}&am=${amount}&cu=INR&tn=Inkly Order ${orderId}`;
      qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentLink)}`;
    } else if (paymentMethod === 'RAZORPAY') {
      // In production, create Razorpay order
      const razorpayKey = this.configService.get<string>('RAZORPAY_KEY_ID');
      paymentLink = `https://checkout.razorpay.com/v1/checkout.js?key=${razorpayKey}`;
      // You would create a Razorpay order here and return order_id
    }

    return {
      paymentId,
      paymentLink,
      qrCode,
      amount,
      orderId,
      status: 'PENDING',
    };
  }

  async verifyPayment(paymentId: string, orderId: string) {
    // In production, verify with payment gateway
    // For now, we'll simulate verification
    
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.paymentId !== paymentId) {
      throw new BadRequestException('Invalid payment');
    }

    // Update order payment status
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'COMPLETED',
      },
    });

    return {
      success: true,
      orderId,
      paymentId,
    };
  }

  async getPaymentStatus(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: {
        paymentStatus: true,
        paymentMethod: true,
        paymentId: true,
      },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    return {
      status: order.paymentStatus,
      method: order.paymentMethod,
      paymentId: order.paymentId,
    };
  }
}
