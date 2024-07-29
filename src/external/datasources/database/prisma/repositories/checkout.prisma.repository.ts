import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Checkout } from 'src/core/entities/checkout.entity';
import { CheckoutRepository } from 'src/adapters/repositories/checkout.repository';

@Injectable()
export class PrismaCheckoutRepository implements CheckoutRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(checkout: Checkout): Promise<Checkout> {
    const createdCheckout = await this.prisma.checkout.create({
      data: {
        id: checkout.id,
        status: checkout.status,
        orderId: checkout.orderId,
        customerId: checkout.customerId,
      },
    });
    return createdCheckout;
  }

  update(id: number, data: Checkout): Promise<Checkout> {
    const updatedCheckout = this.prisma.checkout.update({
      where: { id: data.id },
      data: {
        status: data.status,
        orderId: data.orderId,
        customerId: data.customerId,
      },
    });
    return updatedCheckout;
  }
  getById(id: number): Promise<Checkout> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Checkout[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
