import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class SetOrderToPrepareUseCase implements IUseCase<Order> {
  constructor(
    
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(orderId: number): Promise<Order> {
    console.log(`Order ID`, orderId);
    const order = await this.orderRepository.getById(orderId);

    if (order.status !== Status.APPROVED) {
      throw new Error(
        'Order must be in APPROVED status to set it to In Progress',
      );
    }

    order.status = Status.IN_PROGRESS;
    order.InProgressTimestamp = new Date();

    const updatedOrder = await this.orderRepository.update(orderId, order);
    return updatedOrder;
  }
}
