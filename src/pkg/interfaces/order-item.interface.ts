import { Item } from '@prisma/client';

export interface OrderItemData {
  id: number;
  orderId: number;
  itemId: number;
  Item: Item;
  isActive?: boolean;
}
