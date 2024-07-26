import { Customer } from '../../core/entities/customer.entity';
import { Repository } from './repository';

export abstract class CustomerRepository extends Repository<Customer> {
  abstract create(customer: Customer): Promise<Customer>;
  abstract update(id: number, customer: Customer): Promise<Customer>;
  abstract getCustomerByCpf(cpf: string): Promise<Customer>;
}
