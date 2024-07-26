import { Module, forwardRef } from '@nestjs/common';
import { CreateCustomerUseCase } from '../core/usecases/customers/create-customer.use-case';
import { GetCustomerByCpfUseCase } from '../core/usecases/customers/get-customer-by-cpf.use-case';
import { UpdateCustomerUseCase } from '../core/usecases/customers/update-customer.use-case';
import { DatabaseModule } from '../external/datasources/database/database.module';
import { CustomerController } from '../adapters/controllers/customer.controller';
import { CreateItemUseCase } from '../core/usecases/items/create-item.usecase';
import { GetItemUseCase } from '../core/usecases/items/get-item.usecase';
import { GetItemsPerCategoryUseCase } from '../core/usecases/items/get-items-per-cateogry.usecase';
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
import { SetCustomerCpfUseCase } from 'src/core/usecases/customers/set-customer-cpf.use-case';


@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    GetCustomerByCpfUseCase,
    CreateItemUseCase,
    GetItemUseCase,
    GetItemsPerCategoryUseCase,
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
    SetCustomerCpfUseCase
  ],
  exports: [
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    GetCustomerByCpfUseCase,
    CreateItemUseCase,
    GetItemUseCase,
    GetItemsPerCategoryUseCase,
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
    SetCustomerCpfUseCase
  ],
  controllers: [CustomerController, ItemController, OrderController],
})
export class ApplicationModule { }
