import { Status } from '../../core/entities/status.entity'
import { Step } from '../../core/entities/step.entity';
import { Order } from '../../core/entities/orders.entity';
import { Repository } from './repository';

export abstract class OrderRepository extends Repository<Order> {
  abstract orderStepUpdate(id: number, step: Step): Promise<Order>;
  abstract getOrdersByStatus(status: Status): Promise<Order[]>;
  abstract setOrderCustomer(
    orderId: number,
    customerId: number,
  ): Promise<Order>;
}
