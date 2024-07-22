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
import { UpdateCustomerUseCase } from '../../core/usecases/customers/update-customer.use-case';
import { CustomerDTO } from '../../pkg/dtos/customer.dto';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
    private readonly getCustomerByCpfUseCase: GetCustomerByCpfUseCase,
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
  async update(
    @Param('customerId') id: number,
    @Query('cpf') dto: CustomerDTO,
  ) {
    const customerUpdated = await this.updateCustomerUseCase.execute(id, dto);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Customer updated successfully',
      data: customerUpdated,
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
}
