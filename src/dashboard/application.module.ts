import { Module, forwardRef } from '@nestjs/common';
import { CreateCustomerUseCase } from './application/usecases/customers/create-customer.use-case';
import { GetCustomerByCpfUseCase } from './application/usecases/customers/get-customer-by-cpf.use-case';
import { UpdateCustomerUseCase } from './application/usecases/customers/update-customer.use-case';
import { DatabaseModule } from './infra/database/database.module';
import { CustomerController } from './infra/controllers/customer.controller';
import { CreateItemUseCase } from './application/usecases/items/create-item.usecase';
import { GetItemUseCase } from './application/usecases/items/get-item.usecase';
import { GetItemsPerCategoryUseCase } from './application/usecases/items/get-items-per-cateogry.usecase';
import { ItemController } from './infra/controllers/item.controller';

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
