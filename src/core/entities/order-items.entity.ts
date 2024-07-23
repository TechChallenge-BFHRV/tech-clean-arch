import { Item } from '@prisma/client';

export class OrderItem {
  id: number;
  orderId: number;
  itemId: number;
  Item?: Item;
  isActive?: boolean;

  constructor(
    id: number,
    orderId: number,
    itemId: number,
    Item?: Item,
    isActive?: boolean,
  ) {
    this.id = id;
    this.orderId = orderId;
    this.itemId = itemId;
    this.Item = Item;
    this.isActive = isActive;
    
  }
}
