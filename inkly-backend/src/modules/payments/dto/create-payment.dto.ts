import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentMethodEnum {
  UPI = 'UPI',
  PHONEPE = 'PHONEPE',
  RAZORPAY = 'RAZORPAY',
  CARD = 'CARD',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

export class CreatePaymentDto {
  @ApiProperty({ description: 'Order ID' })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ description: 'Payment amount' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: PaymentMethodEnum, description: 'Payment method' })
  @IsEnum(PaymentMethodEnum)
  @IsNotEmpty()
  paymentMethod: PaymentMethodEnum;
}
