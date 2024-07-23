import { Injectable } from '@nestjs/common';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class GetAllOrdersUseCase implements IUseCase<Order[]> {
  constructor(
    
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(): Promise<Order[]> {
    const allOrders = await this.orderRepository.getAll();
    return allOrders;
  }
}
