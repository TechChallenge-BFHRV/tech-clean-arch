import { Injectable } from '@nestjs/common';
import { Status } from '../../entities/status.entity';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class SetOrderToFinishedUseCase implements IUseCase<Order> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(orderId: number): Promise<Order> {
    const order = await this.orderRepository.getById(orderId);

    if (order.status !== Status.READY) {
      throw new Error('Order must be in READY status to set it to FINISHED');
    }

    order.status = Status.FINISHED;

    const updatedOrder = await this.orderRepository.update(orderId, order);
    return updatedOrder;
  }
}
