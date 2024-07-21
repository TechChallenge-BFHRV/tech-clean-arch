import { Module } from '@nestjs/common';
import { CustomerRepository } from '../../application/repositories/customer.repository';
import { PrismaService } from './prisma/prisma.service';
import { CustomerPrismaRepository } from './prisma/repositories/customer.prisma.repository';
import { ItemPrismaRepository } from './prisma/repositories/item.prisma.repository';
import { ItemRepository } from 'src/dashboard/application/repositories/item.repository';

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
  ],
})
export class DatabaseModule {}
