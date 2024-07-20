import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../../../application/repositories/customer.repository';
import { PrismaService } from '../prisma.service';
import { Customer } from '../../../../application/entities/customer.entity';
import { CustomerPrismaMapper } from '../mappers/customer.prisma.mapper';

@Injectable()
export class CustomerPrismaRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(customer: Customer): Promise<Customer> {
    return CustomerPrismaMapper.toEntity(customer);
  }

  async getCustomerByCpf(cpf: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { cpf: cpf },
    });
    if (!customer) throw new Error('Customer not found!');
    return customer;
  }

  async update(id: number, customer: Customer): Promise<Customer> {
    return await this.prisma.customer.update({
      where: { id: id },
      data: {
        cpf: customer.cpf,
      },
    });
  }
}
