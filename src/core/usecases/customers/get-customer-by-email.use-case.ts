import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../../adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';
import { Customer } from '../../entities/customer.entity';

@Injectable()
export class GetCustomerByEmailUseCase implements IUseCase<Customer> {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(email: string): Promise<Customer> {
    const customer = await this.customerRepository.getCustomerByEmail(email);
    return customer;
  }
}
