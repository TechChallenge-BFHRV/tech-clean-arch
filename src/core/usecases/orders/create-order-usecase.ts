import { Injectable } from '@nestjs/common';
import { Status, Step } from '@prisma/client';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class CreateOrderUseCase implements IUseCase<Order> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(): Promise<Order> {
    const order: Order = {
      step: Step.START,
      status: Status.STARTED,
      id: 0,
      totalPrice: null,
      createdAt: undefined,
      updatedAt: undefined,
    };

    const createdOrder = await this.orderRepository.create(order);

    return createdOrder;
  }
}
