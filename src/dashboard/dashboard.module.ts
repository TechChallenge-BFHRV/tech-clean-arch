import { Module, forwardRef } from '@nestjs/common';
import { CreateCustomerUseCase } from './application/usecases/customers/create-customer.use-case';
import { GetCustomerByCpfUseCase } from './application/usecases/customers/get-customer-by-cpf.use-case';
import { UpdateCustomerUseCase } from './application/usecases/customers/update-customer.use-case';
import { DatabaseModule } from './infra/database/database.module';
import { CustomerController } from './infra/controllers/customer.controller';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    GetCustomerByCpfUseCase,
  ],
  exports: [
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    GetCustomerByCpfUseCase,
  ],
  controllers: [CustomerController],
})
export class DashboardModule {}
