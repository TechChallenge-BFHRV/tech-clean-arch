import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCheckoutUseCase } from 'src/core/usecases/checkouts/create-checkout.usecase';
import { CreateCheckoutDTO } from 'src/pkg/dtos/create-checkout-dto';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly createCheckoutUseCase: CreateCheckoutUseCase) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Payment processed successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Payment cannot be processed.',
  })
  async createCheckout(@Body() createCheckout: CreateCheckoutDTO) {
    const checkout = await this.createCheckoutUseCase.execute(createCheckout);
    const isSuccess = checkout.status === 'APPROVED';
    return {
      statusCode: isSuccess ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message: isSuccess
        ? 'Payment processed successfully.'
        : 'Payment cannot be processed.',
      data: checkout,
    };
  }
}
