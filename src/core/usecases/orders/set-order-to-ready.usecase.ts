import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class SetOrderToReadyUseCase implements IUseCase<Order> {
  constructor(
    
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(orderId: number): Promise<Order> {
    const order = await this.orderRepository.getById(orderId);

    if (order.status !== Status.IN_PROGRESS) {
      throw new Error('Order must be in IN_PROGRESS status to set it to READY');
    }

    order.status = Status.READY;

    const updatedOrder = await this.orderRepository.update(orderId, order);
    return updatedOrder;
  }
}
