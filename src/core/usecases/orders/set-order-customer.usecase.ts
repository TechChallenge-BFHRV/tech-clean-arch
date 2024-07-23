import { Injectable } from '@nestjs/common';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class SetOrderCustomerUseCase implements IUseCase<Order> {
  constructor(
    
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(orderId: number, customerId: number): Promise<Order> {
    const updatedOrder = await this.orderRepository.setOrderCustomer(
      orderId,
      customerId,
    );
    return updatedOrder;
  }
}
