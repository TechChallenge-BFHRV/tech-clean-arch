import { Injectable } from '@nestjs/common';
import { ApiGatewayInterface } from '../../adapters/interfaces/api-gateway';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiGatewayService implements ApiGatewayInterface {
  constructor(private readonly httpService: HttpService) {}
  private readonly apiUrl = 'https://wc8gw3zxgj.execute-api.us-east-1.amazonaws.com/dev/totem-userpool';

  async getUser(username: string): Promise<any> {
    const payload = {
        data: {
            'username': username
        }
    };
    const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/retrieve`, payload));
    return response.data;
  }
}
