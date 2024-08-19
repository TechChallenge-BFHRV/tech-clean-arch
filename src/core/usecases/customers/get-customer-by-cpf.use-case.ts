import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';
import { Customer } from '../../entities/customer.entity';
import { CreateCustomerUseCase } from './create-customer.use-case';
import { CustomerDTO } from 'src/pkg/dtos/customer.dto';
import { SetCustomerCpfUseCase } from './set-customer-cpf.use-case';

@Injectable()
export class GetCustomerByCpfUseCase implements IUseCase<Customer> {
  constructor(
    private customerRepository: CustomerRepository,
    private createCustomerUseCase: CreateCustomerUseCase,
    private setCustomerCpfUseCase: SetCustomerCpfUseCase,
  ) {}

  async execute(cpf: string): Promise<Customer> {
    try {
      const customer = await this.customerRepository.getCustomerByCpf(cpf);
      return customer;
    } catch (error) {
      const newCustomer = await this.createCustomerUseCase.execute(new CustomerDTO);
      if (newCustomer && newCustomer.id) {
        const updatedCustomerCPF = await this.setCustomerCpfUseCase.execute(newCustomer.id, cpf);
        return updatedCustomerCPF;
        // Now email is MANDATORY for Cognito
      }
      return error;
    }
  }
}
