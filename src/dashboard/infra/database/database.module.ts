import { Module } from '@nestjs/common';
import { CustomerRepository } from '../../application/repositories/customer.repository';
import { PrismaService } from './prisma/prisma.service';
import { CustomerPrismaRepository } from './prisma/repositories/customer.prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: CustomerPrismaRepository,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: CustomerPrismaRepository,
    },
  ],
})
export class DatabaseModule {}
