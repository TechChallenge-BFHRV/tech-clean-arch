import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';
import { Customer } from '../../../../core/entities/customer.entity';

@Injectable()
export class GetCustomerByCpfUseCase implements IUseCase<Customer> {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(cpf: string): Promise<Customer> {
    return await this.customerRepository.getCustomerByCpf(cpf);
  }
}
