import { Injectable } from '@nestjs/common';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';
import { GetOrderByIdUseCase } from './get-order-by-id.usecase';
import { ExternalOrderService } from '../../../external/integrations/external-order-service';
import { ExternalItemService } from '../../../external/integrations/external-item-service';

@Injectable()
export class ConsistOrderUseCase implements IUseCase<Order> {
  constructor(
    private readonly orderService: ExternalOrderService,
    private readonly itemService: ExternalItemService,
  ) {}

  async execute(orderId: number): Promise<Order> {
    let order = await this.orderService.getOrderById(orderId);
    const enrichedOrderItems = await Promise.all(
      order.data.orderItems.map(async (orderItem) => {
        let Item = null;
        try {
          const req = await this.itemService.getItemById(orderItem.itemId)
          Item = req.data;
        }
        catch {
          // itemDetails = { message: 'Couldnt get it boss', data: null };
        }
        return {
          ...orderItem,
          Item,
        };
      })
    );
    let orderDataClone = { ...order.data, orderItems: enrichedOrderItems };
    orderDataClone = await this.calculateFinalPrice(orderDataClone);
    orderDataClone = await this.calculatePreparationTime(orderDataClone);

    order.data.totalPrice = orderDataClone.totalPrice;
    order.data.finalPrice = orderDataClone.finalPrice;
    order.data.preparationTime = orderDataClone.preparationTime;
    await this.orderService.update(order.id, order.data);

    return order.data;
  }

  async calculateFinalPrice(order: Order): Promise<Order> {
    const totalPrice = order.orderItems.reduce((acc, item) => {
      if (!item.Item) return acc;
      return item.Item.price + acc;
     }, 0);

    order.totalPrice = totalPrice;

    const comboDiscount = await this.getComboDiscount(order);

    const discountedPrice = totalPrice * (1 - comboDiscount);

    order.finalPrice = Math.round(discountedPrice * 100) / 100;

    return order;
  }

  async calculatePreparationTime(order: Order): Promise<Order> {
    const preparationTime = order.orderItems.reduce((acc, item) => {
        if (!item.Item) return acc;
        return item.Item.preparationTime + acc;
      }, 0);

    order.preparationTime = preparationTime;

    return order;
  }

  async getComboDiscount(order: Order): Promise<number> {
    const minimumComboCategory = 4;
    const maxDiscount = 0.15;
    const discountPerCombo = 0.05;

    const groupedCategory = order.orderItems.reduce((acc, orderItem) => {
      if (!orderItem.Item) return acc;
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
