import { Injectable } from '@nestjs/common';
import { IUseCase } from '../usecase';
import { OrderItem } from '../../../core/entities/order-items.entity';
import { OrderItemRepository } from '../../../adapters/repositories/order-item.repository';
import { AddItemToOrderDTO } from '../../../pkg/dtos/add-item-to-order-dto';
import { OrderItemMapper } from '../../../adapters/mappers/order-item.mapper';
import { ExternalItemService } from '../../../external/integrations/external-item-service';

@Injectable()
export class AddItemToOrderUseCase implements IUseCase<OrderItem> {
  constructor(
    private readonly itemService: ExternalItemService,
    private readonly orderItemRepository: OrderItemRepository
  ) {}

  async execute(orderItem: AddItemToOrderDTO): Promise<AddItemToOrderDTO> {
    const createdOrderItem = await this.orderItemRepository.create(
      OrderItemMapper.toEntity(orderItem),
    );

    return OrderItemMapper.toDTO(createdOrderItem);
  }
}
