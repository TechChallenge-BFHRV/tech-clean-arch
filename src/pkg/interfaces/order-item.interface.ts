import { Item } from '../../core/entities/item.entity';

export interface OrderItemData {
  id: number;
  orderId: number;
  itemId: number;
  Item: Item;
  isActive?: boolean;
}
