import { Injectable } from '@nestjs/common';
import { Status } from 'src/core/entities/status.entity';
import { Step } from '../../../../../core/entities/step.entity';
import { Order } from '../../../../../core/entities/orders.entity';
import { OrderRepository } from '../../../../../adapters/repositories/order.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: Order): Promise<Order> {
    const createdOrder = await this.prisma.order.create({
      data: {
        totalPrice: order.totalPrice,
        status: order.status,
        step: order.step,
      },
    });
    return createdOrder;
  }

  async update(id: number, data: Order): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: { id: id },
      data: {
        totalPrice: data.totalPrice,
        status: data.status,
        step: data.step,
        preparationTime: data.preparationTime,
        finalPrice: data.finalPrice,
        customerId: data.customerId,
        InProgressTimestamp: data.InProgressTimestamp,
      },
    });
    return updatedOrder;
  }

  async getById(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id: id },
      include: {
        orderItems: {
          where: { isActive: true },
        },
      },
    });
    if (!order) throw new Error('Order not found!');
    return order;
  }
  getAll(): Promise<Order[]> {
    const orders = this.prisma.order.findMany({
      include: {
        orderItems: {
          where: { isActive: true },
        },
      },
    });
    return orders;
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async orderStepUpdate(id: number, step: Step): Promise<Order> {
    const order = await this.prisma.order.update({
      where: { id: id },
      data: {
        step: step,
      },
    });
    return order;
  }

  async getOrdersByStatus(status: Status): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        status: status,
      },
    });
    return orders;
  }

  async setOrderCustomer(orderId: number, customerId: number): Promise<Order> {
    const updatedOrderCustomer = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        customerId,
      },
    });

    return updatedOrderCustomer;
  }
}
