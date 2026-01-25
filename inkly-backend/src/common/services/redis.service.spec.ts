import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

jest.mock('ioredis');

describe('RedisService', () => {
  let service: RedisService;
  let configService: ConfigService;
  let mockRedisClient: jest.Mocked<Redis>;

  beforeEach(async () => {
    mockRedisClient = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      quit: jest.fn(),
    } as any;

    (Redis as jest.Mock).mockImplementation(() => mockRedisClient);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'REDIS_HOST') return 'localhost';
              if (key === 'REDIS_PORT') return 6379;
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should get value from redis', async () => {
      const key = 'test:key';
      const value = 'test-value';
      mockRedisClient.get.mockResolvedValue(value);

      const result = await service.get(key);

      expect(result).toBe(value);
      expect(mockRedisClient.get).toHaveBeenCalledWith(key);
    });

    it('should return null if key does not exist', async () => {
      mockRedisClient.get.mockResolvedValue(null);

      const result = await service.get('nonexistent:key');

      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should set value in redis', async () => {
      const key = 'test:key';
      const value = 'test-value';
      mockRedisClient.set.mockResolvedValue('OK');

      await service.set(key, value);

      expect(mockRedisClient.set).toHaveBeenCalledWith(key, value);
    });

    it('should set value with expiration', async () => {
      const key = 'test:key';
      const value = 'test-value';
      const ttl = 3600;
      mockRedisClient.set.mockResolvedValue('OK');

      await service.set(key, value, ttl);

      expect(mockRedisClient.set).toHaveBeenCalledWith(key, value, 'EX', ttl);
    });
  });

  describe('del', () => {
    it('should delete key from redis', async () => {
      const key = 'test:key';
      mockRedisClient.del.mockResolvedValue(1);

      await service.del(key);

      expect(mockRedisClient.del).toHaveBeenCalledWith(key);
    });
  });
});
