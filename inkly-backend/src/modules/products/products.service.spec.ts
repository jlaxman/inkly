import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../../common/prisma.service';
import { RedisService } from '../../common/services/redis.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prismaService: PrismaService;
  let redisService: RedisService;

  const mockPrismaService = {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  const mockRedisService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prismaService = module.get<PrismaService>(PrismaService);
    redisService = module.get<RedisService>(RedisService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const mockProducts = [
        {
          id: '1',
          name: 'Test Product',
          price: 29.99,
          category: 'tshirts',
          isActive: true,
        },
      ];

      mockPrismaService.product.findMany.mockResolvedValue(mockProducts);
      mockPrismaService.product.count.mockResolvedValue(1);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.data).toEqual(mockProducts);
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(10);
    });

    it('should filter by category', async () => {
      mockPrismaService.product.findMany.mockResolvedValue([]);
      mockPrismaService.product.count.mockResolvedValue(0);

      await service.findAll({ page: 1, limit: 10, category: 'tshirts' });

      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            category: 'tshirts',
          }),
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const mockProduct = {
        id: '1',
        name: 'Test Product',
        price: 29.99,
      };

      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);

      const result = await service.findOne('1');

      expect(result).toEqual(mockProduct);
      expect(mockPrismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('getCategories', () => {
    it('should return unique categories', async () => {
      const mockCategories = [
        { category: 'tshirts' },
        { category: 'hoodies' },
      ];

      mockPrismaService.product.findMany.mockResolvedValue(mockCategories);

      const result = await service.getCategories();

      expect(result).toEqual(['tshirts', 'hoodies']);
    });

    it('should use cache when available', async () => {
      const cachedCategories = ['tshirts', 'hoodies'];
      mockRedisService.get.mockResolvedValue(cachedCategories);

      const result = await service.getCategories();

      expect(result).toEqual(cachedCategories);
      expect(mockPrismaService.product.findMany).not.toHaveBeenCalled();
    });
  });
});
