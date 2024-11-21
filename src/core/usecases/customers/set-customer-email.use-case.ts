import { Injectable } from '@nestjs/common';
import { Customer } from '../../entities/customer.entity';
import { CustomerRepository } from '../../../adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';
import { CreateIdaasCustomerUseCase } from '../../usecases/customers/create-idaas-customer.use-case';
import { GetIdaasCustomerByEmailUseCase } from './get-idaas-customer-by-email.use-case';
import { CustomerMapper } from 'src/adapters/mappers/customer.mapper';

@Injectable()
export class SetCustomerEmailUseCase implements IUseCase<Customer> {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly createIdaasCustomerUseCase: CreateIdaasCustomerUseCase,
    private readonly getIdaasCustomerByEmailUseCase: GetIdaasCustomerByEmailUseCase,
  ) {}

  async execute(id: number, email: string): Promise<Customer> {
    let updatedCustomer = await this.customerRepository.setCustomerEmail(
      id,
      email,
    );

    const cognitoUser =
      await this.getIdaasCustomerByEmailUseCase.execute(email);

    if (cognitoUser && cognitoUser?.Enabled === true) {
      updatedCustomer.authId = cognitoUser?.UserAttributes.find(
        (el) => el.Name === 'sub',
      ).Value;
    }

    if (!cognitoUser && updatedCustomer) {
      const idaasRequest =
        await this.createIdaasCustomerUseCase.execute(updatedCustomer);

      if (idaasRequest?.data?.$metadata?.httpStatusCode !== 200) {
        console.log('Error creating customer in IDAAS');
        return;
      }

      updatedCustomer.authId = idaasRequest?.data?.User?.Attributes.find(
        (el) => el.Name === 'sub',
      ).Value;

      if (!updatedCustomer.authId) {
        console.log('Error get customer in IDAAS');
        return;
      }
    }

    updatedCustomer = await this.customerRepository.update(
      updatedCustomer.id,
      CustomerMapper.toEntity(updatedCustomer),
    );

    return updatedCustomer;
  }
}
