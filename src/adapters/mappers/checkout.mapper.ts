import { Checkout } from 'src/core/entities/checkout.entity';
import { CreateCheckoutDTO } from 'src/pkg/dtos/create-checkout-dto';

export class CheckoutMapper {
  public static toEntity(raw: CreateCheckoutDTO): Checkout {
    return {
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      orderId: raw.orderId,
      customerId: raw.customerId,
      status: raw.status,
    } as Checkout;
  }

  public static toDTO(entity: Checkout): CreateCheckoutDTO {
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      orderId: entity.orderId,
      customerId: entity.customerId,
      status: entity.status,
    };
  }
}
