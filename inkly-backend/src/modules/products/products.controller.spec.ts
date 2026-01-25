import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getCategories: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const mockResult = {
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
      };

      mockProductsService.findAll.mockResolvedValue(mockResult);

      const result = await controller.findAll({ page: 1, limit: 10 });

      expect(result).toEqual(mockResult);
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const mockProduct = {
        id: '1',
        name: 'Test Product',
        price: 29.99,
      };

      mockProductsService.findOne.mockResolvedValue(mockProduct);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockProduct);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('getCategories', () => {
    it('should return categories', async () => {
      const mockCategories = ['tshirts', 'hoodies'];
      mockProductsService.getCategories.mockResolvedValue(mockCategories);

      const result = await controller.getCategories();

      expect(result).toEqual(mockCategories);
      expect(service.getCategories).toHaveBeenCalled();
    });
  });
});
