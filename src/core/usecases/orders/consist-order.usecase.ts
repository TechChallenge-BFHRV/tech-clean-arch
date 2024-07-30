import { Injectable } from '@nestjs/common';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class ConsistOrderUseCase implements IUseCase<Order> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: number): Promise<Order> {
    let order = await this.orderRepository.getById(orderId);

    order = await this.calculateFinalPrice(order);
    order = await this.calculatePreparationTime(order);

    await this.orderRepository.update(order.id, order);

    return order;
  }

  async calculateFinalPrice(order: Order): Promise<Order> {
    const totalPrice = order.orderItems.reduce(
      (acc, item) => item.Item.price + acc,
      0,
    );

    order.totalPrice = totalPrice;

    const comboDiscount = await this.getComboDiscount(order);

    const discountedPrice = totalPrice * (1 - comboDiscount);

    order.finalPrice = Math.round(discountedPrice * 100) / 100;

    return order;
  }

  async calculatePreparationTime(order: Order): Promise<Order> {
    const preparationTime = order.orderItems.reduce(
      (acc, item) => item.Item.preparationTime + acc,
      0,
    );

    order.preparationTime = preparationTime;

    return order;
  }

  async getComboDiscount(order: Order): Promise<number> {
    const minimumComboCategory = 4;
    const maxDiscount = 0.15;
    const discountPerCombo = 0.05;

    const groupedCategory = order.orderItems.reduce((acc, orderItem) => {
      if (!acc[orderItem.Item.category]) {
        acc[orderItem.Item.category] = 0;
      }

      acc[orderItem.Item.category]++;
      return acc;
    }, {});

    const isCombo = Object.keys(groupedCategory).length >= minimumComboCategory;

    if (!isCombo) {
      return 0;
    }

    const categoryCounts: number[] = Object.values(groupedCategory);

    let comboCount = 0;
    while (
      categoryCounts.filter((count) => count > 0).length >= minimumComboCategory
    ) {
      comboCount++;
      for (let i = 0; i < categoryCounts.length; i++) {
        if (categoryCounts[i] > 0) {
          categoryCounts[i]--;
        }
      }
    }

    const totalDiscount = Math.min(comboCount * discountPerCombo, maxDiscount);

    return totalDiscount;
  }
}
