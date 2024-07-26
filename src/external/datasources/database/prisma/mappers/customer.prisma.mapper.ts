import { Customer } from '../../../../../core/entities/customer.entity';
import { Customer as PrismaCustomer } from '@prisma/client';

export class CustomerPrismaMapper {
  public static toEntity(raw: PrismaCustomer): Customer {
    return {
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      email: raw.email,
      name: raw.name,
      cpf: raw.cpf,
    };
  }

  public static toPrisma(raw: Customer): PrismaCustomer {
    return {
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    } as PrismaCustomer;
  }
}
