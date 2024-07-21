import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ItemCategory } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ItemDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsEnum(ItemCategory)
  category: ItemCategory;

  @ApiProperty()
  @IsNumber()
  preparationTime: number;

  @ApiPropertyOptional()
  imageUrl?: string;
}
