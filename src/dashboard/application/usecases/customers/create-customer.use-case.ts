import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../repositories/customer.repository';
import { IUseCase } from '../usecase';
import { Customer } from '../../../../core/entities/customer.entity';

@Injectable()
export class CreateCustomerUseCase implements IUseCase<Customer> {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(customer: Customer): Promise<Customer> {
    return await this.customerRepository.create(customer);
  }
}
