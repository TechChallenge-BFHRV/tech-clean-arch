import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/adapters/repositories/customer.repository';
import { PrismaService } from '../prisma.service';
import { Customer } from '../../../../../core/entities/customer.entity';
import { CustomerPrismaMapper } from '../mappers/customer.prisma.mapper';

@Injectable()
export class CustomerPrismaRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(customer: Customer): Promise<Customer> {
    const prismaCustomer = await this.prisma.customer.create({
      data: CustomerPrismaMapper.toPrisma(customer),
    });
    return CustomerPrismaMapper.toEntity(prismaCustomer);
  }

  async getCustomerByCpf(cpf: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { cpf: cpf },
    });
    if (!customer) throw new Error('Customer not found!');
    return customer;
  }

  async setCustomerCpf(id: number, cpf: string): Promise<Customer> {
    return await this.prisma.customer.update({
      where: { id: id },
      data: {
        cpf: cpf,
      },
    });
  }

  async getCustomerByEmail(email: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { email: email },
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

  async getById(id: number): Promise<Customer> {
    console.log('get by id repository', id);
    return null;
  }

  async getAll(): Promise<Customer[]> {
    console.log('got all customers...');
    return null;
  }

  async delete(id: number): Promise<void> {
    return null;
  }
}
