import { Inject, Injectable } from '@nestjs/common';
import { OrderItem } from '../../../core/entities/order-items.entity';
import { OrderItemRepository } from '../../../adapters/repositories/order-item.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class SetItemToOrderUseCase implements IUseCase<OrderItem> {
  constructor(

    private readonly orderItemRepository: OrderItemRepository,
  ) {}
  async execute(orderItemId: number): Promise<OrderItem> {
    const setOrderItem =
      await this.orderItemRepository.setOrderItemId(orderItemId);
    return setOrderItem;
  }
}
