import { Customer } from '../../../../application/entities/customer.entity';
import { Customer as PrismaCustomer } from '@prisma/client';

export class CustomerPrismaMapper {
  public static toEntity(raw: PrismaCustomer): Customer {
    return new Customer(
      raw.id,
      raw.email,
      raw.name,
      raw.cpf,
      raw.createdAt,
      raw.updatedAt,
    );
  }
}
