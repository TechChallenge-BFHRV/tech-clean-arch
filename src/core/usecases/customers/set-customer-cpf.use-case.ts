import { Injectable } from '@nestjs/common';
import { Customer } from '../../entities/customer.entity';
import { CustomerRepository } from '../../../adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';

@Injectable()
export class SetCustomerCpfUseCase implements IUseCase<Customer> {
  constructor(
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(id: number, cpf: string): Promise<Customer> {
    const updatedCustomer = await this.customerRepository.setCustomerCpf(
      id,
      cpf,
    );
    return updatedCustomer;
  }
}
