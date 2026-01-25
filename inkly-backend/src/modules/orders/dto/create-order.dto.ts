import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsObject()
  shippingInfo?: Record<string, any>;
}
