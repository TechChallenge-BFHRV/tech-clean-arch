import { Order } from '../../../../../core/entities/orders.entity';
import { Order as PrismaOrder } from '@prisma/client';

export class OrderPrismaMapper {
  public static toEntity(raw: PrismaOrder): Order {
    return {
      id: raw.id,
      totalPrice: raw.totalPrice,
      //preparationTime: raw.preparationTime,
      status: raw.status,
      step: raw.step,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      //InProgressTimestamp: raw.InProgressTimestamp,
      //customerId: raw.customerId,
    };
  }

  public static toPrisma(raw: Order): PrismaOrder {
    return {
      id: raw.id,
      totalPrice: raw.totalPrice,
      //preparationTime: raw.preparationTime,
      status: raw.status,
      step: raw.step,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      //InProgressTimestamp: raw.InProgressTimestamp,
      //customerId: raw.customerId,
    } as PrismaOrder;
  }
}
