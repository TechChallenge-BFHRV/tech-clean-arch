import { Injectable } from '@nestjs/common';
import { CheckoutStatus, Status, Step } from '@prisma/client';
import { ConsistOrderUseCase } from '../orders/consist-order.usecase';
import { OrderQueueUseCase } from '../orders/queue/order-queue.usecase';
import { IUseCase } from '../usecase';
import { Checkout } from '../../../core/entities/checkout.entity';
import { CheckoutRepository } from '../../../adapters/repositories/checkout.repository';
import { OrderRepository } from '../../../adapters/repositories/order.repository';
import { PaymentGateway } from '../../../adapters/interfaces/payment-gateway';

@Injectable()
export class CreateCheckoutUseCase implements IUseCase<Checkout> {
  constructor(
    private readonly checkoutRepository: CheckoutRepository,
    private readonly orderRepository: OrderRepository,
    private readonly paymentGateway: PaymentGateway,
    private readonly orderQueueUseCase: OrderQueueUseCase,
    private readonly consistOrderUseCase: ConsistOrderUseCase,
  ) {}

  async execute(checkoutRequest: Checkout): Promise<Checkout> {
    let order = await this.orderRepository.getById(checkoutRequest.orderId);
    console.log('order', order);

    if (order.status !== 'STARTED') {
      throw new Error('Order must be in STARTED status to create a checkout');
    }

    if (order.orderItems.some((item) => item.isActive) === false) {
      throw new Error('Order must have at least one item to create a checkout');
    }

    if (!order.preparationTime || !order.finalPrice) {
      order = await this.consistOrderUseCase.execute(order.id);
    }

    checkoutRequest.customerId = order.customerId;
    checkoutRequest.status = CheckoutStatus.PENDING;
    order.status = Status.PENDING;
    order.step = Step.PAYMENT_REQUEST;

    await this.orderRepository.update(order.id, order);
    await this.orderQueueUseCase.addOrderToQueue({
      orderId: order.id,
      status: Status.PENDING,
    });

    const createdCheckout =
      await this.checkoutRepository.create(checkoutRequest);

    const paymentSucceed = await this.paymentGateway.execute(order.finalPrice);

    if (paymentSucceed) {
      order.status = Status.APPROVED;
      order.step = Step.COMPLETED;
      createdCheckout.status = CheckoutStatus.APPROVED;
      await this.orderQueueUseCase.addOrderToQueue({
        orderId: order.id,
        status: Status.APPROVED,
      });
    } else {
      order.status = Status.STARTED;
      order.step = Step.CHECKOUT;
      createdCheckout.status = CheckoutStatus.REJECTED;
    }

    await this.orderRepository.update(order.id, order);
    await this.checkoutRepository.update(createdCheckout.id, createdCheckout);

    return createdCheckout;
  }
}
