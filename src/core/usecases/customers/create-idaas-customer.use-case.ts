import { Injectable } from '@nestjs/common';
import { Customer } from '../../entities/customer.entity';
import { IUseCase } from '../usecase';
import { ApiGatewayService } from '../../../external/integrations/api-gateway-service';

@Injectable()
export class CreateIdaasCustomerUseCase implements IUseCase<Customer> {
  constructor(
    private apiGateway: ApiGatewayService,
  ) {}

  async execute(customer: Customer): Promise<any> {
    const idaasCreatedCustomer = await this.apiGateway.createUser(customer);
    return idaasCreatedCustomer;
  }
}
