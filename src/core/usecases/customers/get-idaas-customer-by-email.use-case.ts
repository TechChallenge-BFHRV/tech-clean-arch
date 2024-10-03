import { Injectable } from '@nestjs/common';
import { IUseCase } from '../usecase';
import { Customer } from '../../entities/customer.entity';
import { ApiGatewayService } from '../../../external/integrations/api-gateway-service';

@Injectable()
export class GetIdaasCustomerByEmailUseCase implements IUseCase<Customer> {
  constructor(private readonly apiGateway: ApiGatewayService) {}

  async execute(email: string): Promise<any> {
    const idaasRequest = await this.apiGateway.getUser(email);

    if (idaasRequest && idaasRequest.errorMessage) {
      console.log(idaasRequest.errorMessage);
      return null;
    }

    if (idaasRequest && idaasRequest.Enabled) {
      console.log('User FOUND on cognito!');
      const cognitoCpfObjectAttribute = idaasRequest.UserAttributes.find(
        (el) => el.Name === 'custom:cpf',
      );
      if (cognitoCpfObjectAttribute && cognitoCpfObjectAttribute.Value) {
        console.log(
          'User CPF on Cognito is: ',
          cognitoCpfObjectAttribute.Value,
        );
      }
    }
    return idaasRequest;
  }
}
