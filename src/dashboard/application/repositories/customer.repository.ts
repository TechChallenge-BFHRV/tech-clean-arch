import { Customer } from '../entities/customer.entity';

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<Customer>;
  abstract update(id: number, customer: Customer): Promise<Customer>;
  abstract getCustomerByCpf(cpf: string): Promise<Customer>;
}
