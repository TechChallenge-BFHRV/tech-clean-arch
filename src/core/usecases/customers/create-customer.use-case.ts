import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../../adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';
import { Customer } from '../../entities/customer.entity';
import { CustomerMapper } from '../../../adapters/mappers/customer.mapper';
import { CreateIdaasCustomerUseCase } from './create-idaas-customer.use-case';
import { GetIdaasCustomerByEmailUseCase } from './get-idaas-customer-by-email.use-case';

@Injectable()
export class CreateCustomerUseCase implements IUseCase<Customer> {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly createIdaasCustomerUseCase: CreateIdaasCustomerUseCase,
    private readonly getIdaasCustomerByEmailUseCase: GetIdaasCustomerByEmailUseCase,
  ) {}

  async execute(customer: Customer): Promise<Customer> {
    let generatedCustomer = await this.customerRepository.create(
      CustomerMapper.toEntity(customer),
    );

    if (customer.email) {
      const cognitoUser = await this.getIdaasCustomerByEmailUseCase.execute(
        generatedCustomer.email,
      );

      if (cognitoUser) {
        console.log('cognitoUser', cognitoUser);
        generatedCustomer.authId = cognitoUser.UserAttributes.find(
          (el) => el.Name === 'sub',
        ).Value;
      }

      if (!generatedCustomer?.authId) {
        const idaasRequest =
          await this.createIdaasCustomerUseCase.execute(generatedCustomer);

        if (idaasRequest?.data?.$metadata?.httpStatusCode !== 200) {
          console.log('Error creating customer in IDAAS');
          return;
        }

        generatedCustomer.authId = idaasRequest?.data?.User?.Attributes.find(
          (el) => el.Name === 'sub',
        ).Value;

        if (!generatedCustomer.authId) {
          console.log('Error get customer in IDAAS');
          return;
        }

        generatedCustomer = await this.customerRepository.update(
          generatedCustomer.id,
          CustomerMapper.toEntity(generatedCustomer),
        );
      }
    }

    return CustomerMapper.toDTO(generatedCustomer);
  }
}
