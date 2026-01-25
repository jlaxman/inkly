import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  category: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
