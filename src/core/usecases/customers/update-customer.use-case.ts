import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';
import { Customer } from '../../entities/customer.entity';

@Injectable()
export class UpdateCustomerUseCase implements IUseCase<Customer> {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(id: number, customer: Customer): Promise<Customer> {
    return await this.customerRepository.update(id, customer);
  }
}
