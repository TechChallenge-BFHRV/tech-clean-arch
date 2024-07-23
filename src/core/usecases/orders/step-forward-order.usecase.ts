import { Injectable } from '@nestjs/common';
import { Step } from '@prisma/client';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class OrderStepForwardUseCase implements IUseCase<Order> {
  constructor(
    
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(orderId: number): Promise<Order> {
    const order = await this.orderRepository.getById(orderId);
    let nextStep: Step;
    switch (order.step) {
      case 'START':
        nextStep = 'MEAL';
        break;
      case 'MEAL':
        nextStep = 'SIDE_DISH';
        break;
      case 'SIDE_DISH':
        nextStep = 'DRINK';
        break;
      case 'DRINK':
        nextStep = 'DESERT';
        break;
      case 'DESERT':
        nextStep = 'CHECKOUT';
        break;
      case 'CHECKOUT':
        nextStep = 'PAYMENT_REQUEST';
        break;
      case 'PAYMENT_REQUEST':
        nextStep = 'COMPLETED';
        break;
      default:
        nextStep = 'START';
    }
    const updatedOrder = await this.orderRepository.orderStepUpdate(
      orderId,
      nextStep,
    );
    return updatedOrder;
  }
}
