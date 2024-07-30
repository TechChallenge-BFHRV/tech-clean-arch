import { Checkout } from 'src/core/entities/checkout.entity';
import { Repository } from './repository';

export abstract class CheckoutRepository extends Repository<Checkout> {}
