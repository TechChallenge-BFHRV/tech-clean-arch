import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateCheckoutDTO } from '../../pkg/dtos/create-checkout-dto';
import { OrderRepository } from '../../adapters/repositories/order.repository';
import { GetOrderByIdUseCase } from 'src/core/usecases/orders/get-order-by-id.usecase';
import { Status } from '../../core/entities/status.entity';
import { Step } from '../../core/entities/step.entity';

@Injectable()
export class ExternalCheckoutService {
  constructor(
    @Inject('CHECKOUT_MICROSERVICE') private readonly checkoutMicroserviceClient: ClientProxy,
    private readonly orderRepository: OrderRepository,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
  ) {}

  async createCheckout(createCheckoutDTO: CreateCheckoutDTO) {
    const order = await this.getOrderByIdUseCase.execute(createCheckoutDTO.orderId);

    if (order.status !== 'STARTED') {
      throw new Error('Order must be in STARTED status to create a checkout');
    }

    if (order.orderItems.some((item) => item.isActive) === false) {
      throw new Error('Order must have at least one item to create a checkout');
    }

    const response = this.checkoutMicroserviceClient.send('create_checkout', createCheckoutDTO);
    const val = await lastValueFrom(response);
    if (val && val.data) {
      order.status = val.data.status;
      order.step = Step.PAYMENT_REQUEST;
      await this.orderRepository.update(order.id, order);
      if (val.data.status === 'PENDING') {
        this.processCheckout(val.data._id, order.finalPrice);
      }
    }
    return val;
  }

  async processCheckout(id: string, totalPrice: number) {
    const processCheckout = this.checkoutMicroserviceClient.send('process_checkout', { id, totalPrice });
    const processVal = await lastValueFrom(processCheckout);
    const order = await this.getOrderByIdUseCase.execute(processVal.data.orderId);
    if (processVal.data.status === 'REJECTED') {
      order.status = Status.STARTED;
    }
    if (processVal.data.status === 'APPROVED') {
      order.status = Status.APPROVED;
    }
    await this.orderRepository.update(order.id, order);
    return processVal;
  }
}
