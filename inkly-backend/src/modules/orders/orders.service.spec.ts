import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../../common/prisma.service';
import { EmailService } from '../../common/services/email.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let prismaService: PrismaService;
  let emailService: EmailService;

  const mockPrismaService = {
    order: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    cart: {
      findUnique: jest.fn(),
    },
    cartItem: {
      findMany: jest.fn(),
      deleteMany: jest.fn(),
    },
  };

  const mockEmailService = {
    sendOrderConfirmation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prismaService = module.get<PrismaService>(PrismaService);
    emailService = module.get<EmailService>(EmailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an order from cart', async () => {
      const userId = 'user1';
      const mockCart = {
        id: 'cart1',
        items: [
          {
            product: { id: 'prod1', price: 29.99 },
            quantity: 2,
          },
        ],
      };

      mockPrismaService.cart.findUnique.mockResolvedValue(mockCart);
      mockPrismaService.order.create.mockResolvedValue({
        id: 'order1',
        userId,
        total: 59.98,
        status: 'PENDING',
      });

      const result = await service.create(userId, {});

      expect(result).toBeDefined();
      expect(mockPrismaService.order.create).toHaveBeenCalled();
      expect(mockEmailService.sendOrderConfirmation).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return user orders', async () => {
      const userId = 'user1';
      const mockOrders = [
        {
          id: 'order1',
          userId,
          total: 59.98,
          status: 'PENDING',
        },
      ];

      mockPrismaService.order.findMany.mockResolvedValue(mockOrders);

      const result = await service.findAll(userId);

      expect(result).toEqual(mockOrders);
      expect(mockPrismaService.order.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
