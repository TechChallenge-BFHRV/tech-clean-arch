import { CheckoutStatus } from '@prisma/client';
import { Order } from './orders.entity';

export class Checkout {
  id: number;
  orderId?: number;
  order?: Order;
  customerId?: number;
  status: CheckoutStatus;
  createdAt: Date;
  updatedAt: Date;
}
