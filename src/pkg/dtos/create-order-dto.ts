import { OrderItems, Status, Step } from '@prisma/client';

export class CreateOrderDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
  orderitems?: OrderItems;
  status: Status;
  step: Step;
}
