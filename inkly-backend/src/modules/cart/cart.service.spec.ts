import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { PrismaService } from '../../common/prisma.service';

describe('CartService', () => {
  let service: CartService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    cart: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    cartItem: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    product: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCart', () => {
    it('should return user cart with items', async () => {
      const userId = 'user1';
      const mockCart = {
        id: 'cart1',
        userId,
        items: [
          {
            id: 'item1',
            product: { id: 'prod1', name: 'Product 1', price: 29.99 },
            quantity: 2,
          },
        ],
      };

      mockPrismaService.cart.findUnique.mockResolvedValue(mockCart);

      const result = await service.getCart(userId);

      expect(result).toEqual(mockCart);
      expect(mockPrismaService.cart.findUnique).toHaveBeenCalledWith({
        where: { userId },
        include: {
          items: {
            include: { product: true },
          },
        },
      });
    });

    it('should create cart if it does not exist', async () => {
      const userId = 'user1';
      mockPrismaService.cart.findUnique.mockResolvedValue(null);
      mockPrismaService.cart.create.mockResolvedValue({
        id: 'cart1',
        userId,
        items: [],
      });

      await service.getCart(userId);

      expect(mockPrismaService.cart.create).toHaveBeenCalledWith({
        data: { userId },
        include: {
          items: {
            include: { product: true },
          },
        },
      });
    });
  });

  describe('addToCart', () => {
    it('should add item to cart', async () => {
      const userId = 'user1';
      const productId = 'prod1';
      const quantity = 2;

      const mockCart = { id: 'cart1', userId };
      const mockProduct = { id: productId, price: 29.99 };

      mockPrismaService.cart.findUnique.mockResolvedValue(mockCart);
      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
      mockPrismaService.cartItem.findUnique.mockResolvedValue(null);
      mockPrismaService.cartItem.create.mockResolvedValue({
        id: 'item1',
        cartId: 'cart1',
        productId,
        quantity,
      });

      const result = await service.addToCart(userId, { productId, quantity });

      expect(result).toBeDefined();
      expect(mockPrismaService.cartItem.create).toHaveBeenCalled();
    });
  });
});
