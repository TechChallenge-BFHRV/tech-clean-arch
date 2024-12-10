import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateOrderDTO } from '../../pkg/dtos/create-order-dto';

@Injectable()
export class ExternalOrderService {
  constructor(
    @Inject('ORDER_MICROSERVICE')
    private readonly orderMicroserviceClient: ClientProxy,
  ) {}

  async createOrder(order: CreateOrderDTO) {
    const newOrder = new CreateOrderDTO();
    const res = this.orderMicroserviceClient.send('create_order', { ...newOrder });
    const val = await lastValueFrom(res);
    return val;
  }

  async getOrders() {
    const req = this.orderMicroserviceClient.send('get_all_orders', {});
    const val = await lastValueFrom(req);
    return val;
  }

  async getOrderById(id: number) {
    const req = this.orderMicroserviceClient.send('get_order_by_id', id);
    const val = await lastValueFrom(req);
    return val;
  }

  async remove(id: number) {
    const req = this.orderMicroserviceClient.send('delete_order', id);
    const val = await lastValueFrom(req);
    return val;
  }
}
