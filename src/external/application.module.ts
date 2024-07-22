import { Module, forwardRef } from '@nestjs/common';
import { CreateCustomerUseCase } from '../core/usecases/customers/create-customer.use-case';
import { GetCustomerByCpfUseCase } from '../core/usecases/customers/get-customer-by-cpf.use-case';
import { UpdateCustomerUseCase } from '../core/usecases/customers/update-customer.use-case';
import { DatabaseModule } from './datasources/database/database.module';
import { CustomerController } from '../adapters/controllers/customer.controller';
import { CreateItemUseCase } from '../core/usecases/items/create-item.usecase';
import { GetItemUseCase } from '../core/usecases/items/get-item.usecase';
import { GetItemsPerCategoryUseCase } from '../core/usecases/items/get-items-per-cateogry.usecase';
import { ItemController } from '../adapters/controllers/item.controller';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    GetCustomerByCpfUseCase,
    CreateItemUseCase,
    GetItemUseCase,
    GetItemsPerCategoryUseCase,
  ],
  exports: [
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    GetCustomerByCpfUseCase,
    CreateItemUseCase,
    GetItemUseCase,
    GetItemsPerCategoryUseCase,
  ],
  controllers: [CustomerController, ItemController],
})
export class ApplicationModule {}
