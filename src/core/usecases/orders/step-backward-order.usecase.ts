import { Injectable } from '@nestjs/common';
import { Step } from '../../entities/step.entity';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class OrderStepBackwardUseCase implements IUseCase<Order> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(orderId: number): Promise<Order> {
    const order = await this.orderRepository.getById(orderId);
    let previousStep: Step;
    switch (order.step) {
      case 'PAYMENT_REQUEST':
        previousStep = 'CHECKOUT';
        break;
      case 'CHECKOUT':
        previousStep = 'DESERT';
        break;
      case 'DESERT':
        previousStep = 'DRINK';
        break;
      case 'DRINK':
        previousStep = 'SIDE_DISH';
        break;
      case 'SIDE_DISH':
        previousStep = 'MEAL';
        break;
      case 'MEAL':
        previousStep = 'START';
        break;
      default:
        previousStep = 'START';
    }
    const updatedOrder = await this.orderRepository.orderStepUpdate(
      orderId,
      previousStep,
    );
    return updatedOrder;
  }
}
