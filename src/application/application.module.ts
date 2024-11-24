import { Module, forwardRef } from '@nestjs/common';
import { CreateCustomerUseCase } from '../core/usecases/customers/create-customer.use-case';
import { GetCustomerByCpfUseCase } from '../core/usecases/customers/get-customer-by-cpf.use-case';
import { UpdateCustomerUseCase } from '../core/usecases/customers/update-customer.use-case';
import { DatabaseModule } from '../external/datasources/database/database.module';
import { CustomerController } from '../adapters/controllers/customer.controller';
import { ItemController } from '../adapters/controllers/item.controller';
import { OrderController } from '../adapters/controllers/order.controller';

import { AddItemToOrderUseCase } from '../core/usecases/order-items/add-item-to-order.usecase';
import { ConsistOrderUseCase } from '../core/usecases/orders/consist-order.usecase';
import { CreateOrderUseCase } from '../core/usecases/orders/create-order-usecase';
import { GetAllOrdersUseCase } from '../core/usecases/orders/get-all-orders.usecase';
import { GetCartOrderUseCase } from '../core/usecases/orders/get-cart-order.usecase';
import { GetOrderByIdUseCase } from '../core/usecases/orders/get-order-by-id.usecase';
import { GetOrdersByStatusUseCase } from '../core/usecases/orders/get-orders-by-status.usecase';
import { OrderStepBackwardUseCase } from '../core/usecases/orders/step-backward-order.usecase';
import { OrderStepForwardUseCase } from '../core/usecases/orders/step-forward-order.usecase';
import { SetItemToOrderUseCase } from '../core/usecases/order-items/set-item.usecase';
import { SetOrderCustomerUseCase } from '../core/usecases/orders/set-order-customer.usecase';
import { SetOrderToCancelledUseCase } from '../core/usecases/orders/set-order-to-cancelled.usecase';
import { SetOrderToFinishedUseCase } from '../core/usecases/orders/set-order-to-finished.usecase';
import { SetOrderToPrepareUseCase } from '../core/usecases/orders/set-order-to-prepare.usecase';
import { SetOrderToReadyUseCase } from '../core/usecases/orders/set-order-to-ready.usecase';
import { SetCustomerCpfUseCase } from '../core/usecases/customers/set-customer-cpf.use-case';
import { IntegrationModule } from '../external/integrations/integration.module';
import { CreateCheckoutUseCase } from '../core/usecases/checkouts/create-checkout.usecase';
import { CheckoutController } from '../adapters/controllers/checkout.controller';
import { BullModule } from '@nestjs/bull';
import { OrderQueueUseCase } from '../core/usecases/orders/queue/order-queue.usecase';
import { OrderProcessor } from '../core/usecases/orders/queue/processor/order.processor';
import { GetCustomerByEmailUseCase } from '../core/usecases/customers/get-customer-by-email.use-case';
import { SetCustomerEmailUseCase } from '../core/usecases/customers/set-customer-email.use-case';
import { CreateIdaasCustomerUseCase } from '../core/usecases/customers/create-idaas-customer.use-case';
import { GetIdaasCustomerByEmailUseCase } from '../core/usecases/customers/get-idaas-customer-by-email.use-case';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExternalItemService } from '../external/integrations/external-item-service';
import { ExternalCheckoutService } from '../external/integrations/external-checkout-service';

const ITEMS_MICROSERVICE_HOST = process.env.ITEMS_SERVICE_HOST || 'localhost';
const ITEMS_MICROSERVICE_PORT = parseInt(process.env.ITEMS_SERVICE_PORT, 10) || 3000;

const CHECKOUT_MICROSERVICE_HOST = process.env.CHECKOUT_SERVICE_HOST || 'localhost';
const CHECKOUT_MICROSERVICE_PORT = parseInt(process.env.CHECKOUT_SERVICE_PORT, 10) || 3002;


@Module({
  imports: [
    ClientsModule.register([{
      name: 'ITEMS_MICROSERVICE',
      transport: Transport.TCP,
      options: {
        host: ITEMS_MICROSERVICE_HOST,
        port: ITEMS_MICROSERVICE_PORT,
      }
    },
    {
      name: 'CHECKOUT_MICROSERVICE',
      transport: Transport.TCP,
      options: {
        host: CHECKOUT_MICROSERVICE_HOST,
        port: CHECKOUT_MICROSERVICE_PORT,
      },
    },
  ]),
    forwardRef(() => DatabaseModule),
    forwardRef(() => IntegrationModule),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'order-queue',
    }),
  ],
  providers: [
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    GetCustomerByCpfUseCase,
    GetCustomerByEmailUseCase,
    SetCustomerEmailUseCase,
    CreateIdaasCustomerUseCase,
    GetIdaasCustomerByEmailUseCase,
    AddItemToOrderUseCase,
    ConsistOrderUseCase,
    CreateOrderUseCase,
    GetAllOrdersUseCase,
    GetCartOrderUseCase,
    GetOrderByIdUseCase,
    GetOrdersByStatusUseCase,
    OrderStepBackwardUseCase,
    OrderStepForwardUseCase,
    SetItemToOrderUseCase,
    SetOrderCustomerUseCase,
    SetOrderToCancelledUseCase,
    SetOrderToFinishedUseCase,
    SetOrderToPrepareUseCase,
    SetOrderToReadyUseCase,
    SetCustomerCpfUseCase,
    CreateCheckoutUseCase,
    OrderQueueUseCase,
    OrderProcessor,
    ExternalItemService,
    ExternalCheckoutService
  ],
  exports: [
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    GetCustomerByCpfUseCase,
    AddItemToOrderUseCase,
    ConsistOrderUseCase,
    CreateOrderUseCase,
    GetAllOrdersUseCase,
    GetCartOrderUseCase,
    GetOrderByIdUseCase,
    GetOrdersByStatusUseCase,
    OrderStepBackwardUseCase,
    OrderStepForwardUseCase,
    SetItemToOrderUseCase,
    SetOrderCustomerUseCase,
    SetOrderToCancelledUseCase,
    SetOrderToFinishedUseCase,
    SetOrderToPrepareUseCase,
    SetOrderToReadyUseCase,
    SetCustomerCpfUseCase,
    CreateCheckoutUseCase,
    OrderQueueUseCase,
    OrderProcessor,
  ],
  controllers: [
    CustomerController,
    ItemController,
    OrderController,
    CheckoutController,
  ],
})
export class ApplicationModule {}
