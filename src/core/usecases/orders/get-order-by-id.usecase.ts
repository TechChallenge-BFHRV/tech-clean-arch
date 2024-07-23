import { Injectable } from '@nestjs/common';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class GetOrderByIdUseCase implements IUseCase<Order> {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(orderId: number): Promise<Order> {
    const order = await this.orderRepository.getById(orderId);
    return order;
  }
}
