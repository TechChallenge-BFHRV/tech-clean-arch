import { Customer } from '../../core/entities/customer.entity';
import { CustomerDTO } from '../../pkg/dtos/customer.dto';
import { CustomerData } from '../../pkg/interfaces/customer.interface';

export class CustomerMapper {
  public static toEntity(raw: CustomerData): Customer {
    return {
      id: raw.id,
      email: raw.email,
      name: raw.name,
      cpf: raw.cpf,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      authId: raw.authId,
    };
  }

  public static toDTO(entity: Customer): CustomerDTO {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      cpf: entity.cpf,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      orders: entity.orders,
      checkout: entity.checkout,
      authId: entity.authId,
    };
  }
}
