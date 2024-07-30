import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../../adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';
import { Customer } from '../../entities/customer.entity';
import { CustomerMapper } from 'src/adapters/mappers/customer.mapper';

@Injectable()
export class CreateCustomerUseCase implements IUseCase<Customer> {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(customer: Customer): Promise<Customer> {
    const generatedCustomer = await this.customerRepository.create(
      CustomerMapper.toEntity(customer),
    );
    return CustomerMapper.toDTO(generatedCustomer);
  }
}
