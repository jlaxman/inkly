import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { RedisService } from '../../common/services/redis.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => RedisService))
    private redisService?: RedisService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });

    // Clear products cache
    if (this.redisService) {
      await this.redisService.clearPattern('products:*');
    }

    return product;
  }

  async findAll(query: QueryProductDto) {
    const { category, search, page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    // Create cache key
    const cacheKey = `products:${JSON.stringify(query)}`;

    // Try to get from cache
    if (this.redisService) {
      const cached = await this.redisService.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const where: any = {
      isActive: true,
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.product.count({ where }),
    ]);

    const result = {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    // Cache for 5 minutes
    if (this.redisService) {
      await this.redisService.set(cacheKey, result, 300);
    }

    return result;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id); // Check if exists

    const product = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });

    // Clear products cache
    if (this.redisService) {
      await this.redisService.clearPattern('products:*');
      await this.redisService.del(`product:${id}`);
    }

    return product;
  }

  async remove(id: string) {
    await this.findOne(id); // Check if exists

    const product = await this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    // Clear products cache
    if (this.redisService) {
      await this.redisService.clearPattern('products:*');
      await this.redisService.del(`product:${id}`);
    }

    return product;
  }

  async getCategories() {
    const cacheKey = 'products:categories';

    // Try cache first
    if (this.redisService) {
      const cached = await this.redisService.get<string[]>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const categories = await this.prisma.product.findMany({
      where: { isActive: true },
      select: { category: true },
      distinct: ['category'],
    });

    const result = categories.map((c) => c.category);

    // Cache for 1 hour
    if (this.redisService) {
      await this.redisService.set(cacheKey, result, 3600);
    }

    return result;
  }
}
