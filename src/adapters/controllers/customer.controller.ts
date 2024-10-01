import {
  Controller,
  Post,
  HttpStatus,
  Body,
  Put,
  Param,
  Query,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateCustomerUseCase } from '../../core/usecases/customers/create-customer.use-case';
import { GetCustomerByCpfUseCase } from '../../core/usecases/customers/get-customer-by-cpf.use-case';
import { SetCustomerCpfUseCase } from '../../core/usecases/customers/set-customer-cpf.use-case';
import { GetCustomerByEmailUseCase } from '../../core/usecases/customers/get-customer-by-email.use-case';
import { SetCustomerEmailUseCase } from '../../core/usecases/customers/set-customer-email.use-case';
import { CustomerDTO } from '../../pkg/dtos/customer.dto';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly setCustomerCpfUseCase: SetCustomerCpfUseCase,
    private readonly getCustomerByCpfUseCase: GetCustomerByCpfUseCase,
    private readonly getCustomerByEmailUseCase: GetCustomerByEmailUseCase,
    private readonly setCustomerEmailUseCase: SetCustomerEmailUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Customer created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async createCustomer(@Body() customer: CustomerDTO) {
    const customerCreated = await this.createCustomerUseCase.execute(customer);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Customer created successfully',
      data: customerCreated,
    };
  }

  @Put(':customerId')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Customer updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async setCustomerCpf(
    @Param('customerId') id: number,
    @Query('cpf') cpf: string,
  ) {
    const updatedCustomer = await this.setCustomerCpfUseCase.execute(id, cpf);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Customer updated successfully',
      data: updatedCustomer,
    };
  }

  @Put(':customerId/email')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Customer updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async setCustomerEmail(
    @Param('customerId') id: number,
    @Query('email') email: string,
  ) {
    const updatedCustomer = await this.setCustomerEmailUseCase.execute(
      id,
      email,
    );
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Customer updated successfully',
      data: updatedCustomer,
    };
  }

  @Get('by-cpf')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Customer not found.',
  })
  async customerByCpf(@Query('cpf') cpf: string) {
    const customer = await this.getCustomerByCpfUseCase.execute(cpf);
    return {
      statusCode: HttpStatus.OK,
      message: 'Customer retrieved successfully',
      data: customer,
    };
  }

  @Get('by-email')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Customer not found.',
  })
  async customerByEmail(@Query('email') email: string) {
    const customer = await this.getCustomerByEmailUseCase.execute(email);
    return {
      statusCode: HttpStatus.OK,
      message: 'Customer retrieved successfully',
      data: customer,
    };
  }
}
