import { Injectable } from '@nestjs/common';
import { IUseCase } from '../usecase';
import { Customer } from '../../entities/customer.entity';
import { ApiGatewayService } from 'src/external/integrations/api-gateway-service';

@Injectable()
export class GetIdaasCustomerByEmailUseCase implements IUseCase<Customer> {
  constructor(
    private readonly apiGateway: ApiGatewayService
  ) {}

  async execute(email: string): Promise<any> {
    const idaasRequest = await this.apiGateway.getUser(email);
    if (idaasRequest && idaasRequest.errorType) {
      console.log('user does not exist on cognito userpool');
    }
    if (idaasRequest && idaasRequest.Enabled) {
      const cognitoCpfObjectAttribute = idaasRequest.UserAttributes.find(el => el.Name === 'custom:cpf');
      if (cognitoCpfObjectAttribute && cognitoCpfObjectAttribute.Value) {
      }

    }
    return idaasRequest;
  }
}
