import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/adapters/repositories/customer.repository';
import { IUseCase } from '../usecase';
import { Customer } from '../../entities/customer.entity';
import { ApiGatewayService } from 'src/external/integrations/api-gateway-service';

@Injectable()
export class GetCustomerByEmailUseCase implements IUseCase<Customer> {
  constructor(
    private customerRepository: CustomerRepository,
    private readonly apiGateway: ApiGatewayService
  ) {}

  async execute(email: string): Promise<Customer> {
    const data = await this.apiGateway.getUser(email);
    const customer = await this.customerRepository.getCustomerByEmail(email);
    return customer;
  }
}
