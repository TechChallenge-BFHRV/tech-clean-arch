import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateCheckoutDTO } from '../../pkg/dtos/create-checkout-dto';
import { Status } from '../../core/entities/status.entity';
import { Step } from '../../core/entities/step.entity';
import { ConsistOrderUseCase } from '../../core/usecases/orders/consist-order.usecase';
import { ExternalOrderService } from './external-order-service';

@Injectable()
export class ExternalCheckoutService {
  constructor(
    @Inject('CHECKOUT_MICROSERVICE') private readonly checkoutMicroserviceClient: ClientProxy,
    private readonly consistOrderUseCase: ConsistOrderUseCase,
    private readonly orderService: ExternalOrderService,
  ) {}

  async createCheckout(createCheckoutDTO: CreateCheckoutDTO) {
    const consistedOrder = await this.consistOrderUseCase.execute(createCheckoutDTO.orderId);
    const orderResponse = await this.orderService.getOrderById(createCheckoutDTO.orderId);
    const order = orderResponse.data;

    if (order.status !== 'STARTED') {
      throw new Error('Order must be in STARTED status to create a checkout');
    }

    if (order.orderItems.some((item) => item.isActive) === false) {
      throw new Error('Order must have at least one item to create a checkout');
    }
    order.step = Step.CHECKOUT;
    await this.orderService.update(order.id, order);

    const response = this.checkoutMicroserviceClient.send('create_checkout', createCheckoutDTO);
    const val = await lastValueFrom(response);
  
    if (val && val.data) {
      order.status = val.data.status;
      order.step = Step.PAYMENT_REQUEST;
      await this.orderService.update(order.id, order);
  
      if (val.data.status === 'PENDING') {
        const finalRes = await this.processCheckout(val.data._id, order.finalPrice);
        return finalRes;
      }
    }
    return val;
  }

  async processCheckout(id: string, totalPrice: number) {
    const processCheckout = this.checkoutMicroserviceClient.send('process_checkout', { id, totalPrice });
    const processVal = await lastValueFrom(processCheckout);
    const orderRes = await this.orderService.getOrderById(processVal.data.orderId);
    const order = orderRes.data;
    if (processVal.data.status === 'REJECTED') {
      order.status = Status.STARTED;
    }
    if (processVal.data.status === 'APPROVED') {
      order.status = Status.APPROVED;
      order.step = Step.COMPLETED;
    }
    await this.orderService.update(order.id, order);
    return processVal;
  }
}
