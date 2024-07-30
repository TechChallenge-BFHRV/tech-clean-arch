import { Status, Step } from '@prisma/client';
import { OrderItem } from './order-items.entity';

export class Order {
  id: number | null;
  totalPrice: number;
  orderItems?: OrderItem[];
  customerId?: number;
  status: Status;
  step: Step;
  createdAt: Date;
  updatedAt: Date;
  finalPrice?: number;
  preparationTime?: number;
  InProgressTimestamp?: Date;

  constructor(
    id: number,
    totalPrice: number,
    status: Status,
    step: Step,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.totalPrice = totalPrice;
    this.status = status;
    this.step = step;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
