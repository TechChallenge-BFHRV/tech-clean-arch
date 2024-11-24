import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExternalCheckoutService } from '../../external/integrations/external-checkout-service';
import { CreateCheckoutDTO } from '../../pkg/dtos/create-checkout-dto';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly externalCheckoutService: ExternalCheckoutService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Payment processed successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Payment cannot be processed.',
  })
  async createCheckout(@Body() createCheckoutDTO: CreateCheckoutDTO) {
    return await this.externalCheckoutService.createCheckout(createCheckoutDTO);
  }
}
