import { Module, Global } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import { EmailService } from './services/email.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, RedisService, EmailService],
  exports: [PrismaService, RedisService, EmailService],
})
export class CommonModule {}
