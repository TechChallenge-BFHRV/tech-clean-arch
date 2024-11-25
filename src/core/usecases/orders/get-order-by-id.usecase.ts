import { Injectable } from '@nestjs/common';
import { Order } from '../../../core/entities/orders.entity';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { IUseCase } from '../usecase';
import { ExternalItemService } from '../../../external/integrations/external-item-service';

@Injectable()
export class GetOrderByIdUseCase implements IUseCase<Order> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly itemService: ExternalItemService,
  ) {}
  async execute(orderId: number): Promise<Order> {
    const order = await this.orderRepository.getById(orderId);
    const enrichedOrderItems = await Promise.all(
      order.orderItems.map(async (orderItem) => {
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
    order.orderItems = enrichedOrderItems;
    return order;
  }
}
