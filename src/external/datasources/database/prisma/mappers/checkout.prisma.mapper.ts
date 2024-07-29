import { Checkout as PrismaCheckout } from '@prisma/client';
import { Checkout } from 'src/core/entities/checkout.entity';

export class CheckoutPrismaMapper {
  public static toEntity(raw: PrismaCheckout): Checkout {
    return {
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      orderId: raw.orderId,
      customerId: raw.customerId,
      status: raw.status,
    } as Checkout;
  }

  public static toPrisma(raw: Checkout): PrismaCheckout {
    return {
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      orderId: raw.orderId,
      customerId: raw.customerId,
      status: raw.status,
    } as PrismaCheckout;
  }
}
