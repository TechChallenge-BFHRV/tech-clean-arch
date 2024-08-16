import { Injectable } from '@nestjs/common';
import { Customer } from '../../entities/customer.entity';
import { CustomerRepository } from '../../../adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class SetCustomerEmailUseCase implements IUseCase<Customer> {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: number, email: string): Promise<Customer> {
    const updatedCustomer = await this.customerRepository.setCustomerEmail(
      id,
      email,
    );
    return updatedCustomer;
  }
}
