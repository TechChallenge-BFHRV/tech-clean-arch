import { Injectable } from '@nestjs/common';
import { ApiGatewayInterface } from '../../adapters/interfaces/api-gateway';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Customer } from 'src/core/entities/customer.entity';

@Injectable()
export class ApiGatewayService implements ApiGatewayInterface {
  constructor(private readonly httpService: HttpService) {}
  private readonly dynamicApiGateway = process.env.API_GATEWAY_URL
  private readonly apiUrl = this.dynamicApiGateway || 'https://httpbin.org/anything';

  async getUser(username: string): Promise<any> {
    const payload = {
        data: {
            'username': username
        }
    };
    const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/retrieve`, payload));
    return response.data;
  }

  async createUser(user: Customer): Promise<any> {
    const payload = user;
    const response = await firstValueFrom(this.httpService.post(`${this.apiUrl}/create`, payload));
    return response.data;
  }
}
