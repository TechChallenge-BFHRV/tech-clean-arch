import { Injectable } from '@nestjs/common';
import { Customer } from '../../entities/customer.entity';
import { CustomerRepository } from '../../../adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';
import { CreateIdaasCustomerUseCase } from '../../usecases/customers/create-idaas-customer.use-case';
import { GetIdaasCustomerByEmailUseCase } from './get-idaas-customer-by-email.use-case';

@Injectable()
export class SetCustomerEmailUseCase implements IUseCase<Customer> {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private createIdaasCustomerUseCase: CreateIdaasCustomerUseCase,
    private getIdaasCustomerByEmailUseCase: GetIdaasCustomerByEmailUseCase,
  ) {}

  async execute(id: number, email: string): Promise<Customer> {
    const updatedCustomer = await this.customerRepository.setCustomerEmail(
      id,
      email,
    );
    const cognitoUser = await this.getIdaasCustomerByEmailUseCase.execute(email);
    if (updatedCustomer && cognitoUser && !cognitoUser.Enabled) {
      const idaasRequest = await this.createIdaasCustomerUseCase.execute(updatedCustomer);
    }
    return updatedCustomer;
  }
}
