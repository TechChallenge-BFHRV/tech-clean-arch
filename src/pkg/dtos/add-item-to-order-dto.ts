import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../../core/entities/item.entity';
import { IsNumber } from 'class-validator';

export class AddItemToOrderDTO {
  id: number;
  Item: Item;

  @ApiProperty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  @IsNumber()
  itemId: number;
}
