import { Injectable } from '@nestjs/common';
import { Status } from '../../entities/status.entity';
import { Order } from '../../entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class GetOrdersByStatusUseCase implements IUseCase<Order[]> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(status: Status): Promise<Order[]> {
    const filteredOrders = await this.orderRepository.getOrdersByStatus(status);
    return filteredOrders;
  }
}
