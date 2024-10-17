import { OrderItem } from '../../core/entities/order-items.entity';
import { Status } from '../../core/entities/status.entity';
import { Step } from '../../core/entities/step.entity';

export class CreateOrderDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
  orderitems?: OrderItem;
  status: Status;
  step: Step;
}
