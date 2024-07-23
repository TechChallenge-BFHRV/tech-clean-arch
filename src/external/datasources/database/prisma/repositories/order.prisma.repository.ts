import { Injectable } from '@nestjs/common';
import { Status, Step } from '@prisma/client';
import { Order } from '../../../../../core/entities/orders.entity';
import { OrderRepository } from '../../../../../adapters/repositories/order.repository';
import { OrderPrismaMapper } from '../mappers/order.prisma.mapper';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: Order): Promise<Order> {
    //return OrderPrismaMapper.toEntity(order)

    const createdOrder = await this.prisma.order.create({
      data: {
        totalPrice: order.totalPrice,
        status: order.status,
        step: order.step,
      },
    });
    return createdOrder;
  }

  update(id: number, data: Order): Promise<Order> {
    const updatedOrder = this.prisma.order.update({
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
          include: {
            Item: true,
          },
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
          include: {
            Item: true,
          },
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

  async setOrderCustomer(
    orderId: number,
    customerId: number,
  ): Promise<Order> {
    const updatedOrderCustomer = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        customerId,
      },
    });

    return updatedOrderCustomer;
  }
}
