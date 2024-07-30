import { OrderItem } from '../../core/entities/order-items.entity';
import { AddItemToOrderDTO } from '../../pkg/dtos/add-item-to-order-dto';
import { OrderItemData } from '../../pkg/interfaces/order-item.interface';

export class OrderItemMapper {
  public static toEntity(raw: OrderItemData): OrderItem {
    return {
      id: raw.id,
      orderId: raw.orderId,
      itemId: raw.itemId,
      Item: raw.Item,
      isActive: raw.isActive,
    };
  }

  public static toDTO(entity: OrderItem): AddItemToOrderDTO {
    return {
      id: entity.id,
      Item: entity.Item,
      orderId: entity.orderId,
      itemId: entity.itemId,
    };
  }
}
