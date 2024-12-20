import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../../adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';
import { Customer } from '../../entities/customer.entity';
import { CreateCustomerUseCase } from './create-customer.use-case';
import { CustomerDTO } from '../../../pkg/dtos/customer.dto';
import { SetCustomerCpfUseCase } from './set-customer-cpf.use-case';

@Injectable()
export class GetCustomerByCpfUseCase implements IUseCase<Customer> {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly setCustomerCpfUseCase: SetCustomerCpfUseCase,
  ) {}

  async execute(cpf: string): Promise<Customer> {
    try {
      const customer = await this.customerRepository.getCustomerByCpf(cpf);
      return customer;
    } catch (error) {
      const newCustomer = await this.createCustomerUseCase.execute(
        new CustomerDTO(),
      );
      if (newCustomer?.id) {
        const updatedCustomerCPF = await this.setCustomerCpfUseCase.execute(
          newCustomer.id,
          cpf,
        );
        return updatedCustomerCPF;
        // Now email is MANDATORY for Cognito
      }
      return error;
    }
  }
}
