import { Module } from '@nestjs/common';
import { CustomerRepository } from '../../../adapters/repositories/customer.repository';
import { PrismaService } from './prisma/prisma.service';
import { CustomerPrismaRepository } from './prisma/repositories/customer.prisma.repository';
import { ItemPrismaRepository } from './prisma/repositories/item.prisma.repository';
import { ItemRepository } from '../../../adapters/repositories/item.repository';
import { OrderItemRepository } from '../../../adapters/repositories/order-item.repository';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { PrismaOrderItemRepository } from './prisma/repositories/order-item.prisma.repository';
import { PrismaOrderRepository } from './prisma/repositories/order.prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: CustomerPrismaRepository,
    },
    {
      provide: ItemRepository,
      useClass: ItemPrismaRepository,
    },
    {
      provide: OrderItemRepository,
      useClass: PrismaOrderItemRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: CustomerPrismaRepository,
    },
    {
      provide: ItemRepository,
      useClass: ItemPrismaRepository,
    },
    {
      provide: OrderItemRepository,
      useClass: PrismaOrderItemRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
  ],
})
export class DatabaseModule {}
