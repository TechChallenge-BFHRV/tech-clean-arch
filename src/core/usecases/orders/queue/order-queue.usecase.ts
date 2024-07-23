import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { Queue } from 'bullmq';
import { OrderRepository } from '../../../../adapters/repositories/order.repository';

@Injectable()
export class OrderQueueUseCase {
  constructor(
    @InjectQueue('order-queue') private readonly orderQueue: Queue,
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async addOrderToQueue(order: any) {
    await this.orderQueue.add('order-job', order, {
      removeOnComplete: true,
      removeOnFail: true,
    });
  }

  async updateOrderStatus(orderId: number, status: Status) {
    const order = await this.orderRepository.getById(orderId);
    order.status = status;
    await this.orderRepository.update(orderId, order);
  }
}
