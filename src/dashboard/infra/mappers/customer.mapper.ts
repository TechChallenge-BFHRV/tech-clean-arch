import { Customer } from '../../../core/entities/customer.entity';
import { CustomerDTO } from '../../application/dtos/customer.dto';
import { CustomerData } from '../../application/interfaces/customer.interface';

export class CustomerMapper {
  public static toEntity(raw: CustomerData): Customer {
    return new Customer(
      raw.id,
      raw.email,
      raw.name,
      raw.cpf,
      raw.createdAt,
      raw.updatedAt,
      raw.orders,
      raw.checkout,
    );
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
    };
  }
}
