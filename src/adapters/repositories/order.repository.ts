import { Status, Step } from '@prisma/client';
import { Order } from '../../core/entities/orders.entity';
import { Repository } from './repository';

export abstract class OrderRepository extends Repository<Order> {
  abstract orderStepUpdate(id: number, step: Step): Promise<Order>;
  abstract getOrdersByStatus(status: Status): Promise<Order[]>;
  abstract setOrderCustomer(orderId: number, customerId: number): Promise<Order>;
}
