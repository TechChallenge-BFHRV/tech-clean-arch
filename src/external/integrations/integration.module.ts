import { Module } from '@nestjs/common';
import { FakePaymentGatewayAdapter } from './fake-payment-gateway';
import { PaymentGateway } from '../../adapters/interfaces/payment-gateway';
import { ApiGatewayService } from './api-gateway-service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: PaymentGateway,
      useClass: FakePaymentGatewayAdapter,
    },
    ApiGatewayService,
  ],
  exports: [
    {
      provide: PaymentGateway,
      useClass: FakePaymentGatewayAdapter,
    },
    ApiGatewayService,
  ],
})
export class IntegrationModule {}
