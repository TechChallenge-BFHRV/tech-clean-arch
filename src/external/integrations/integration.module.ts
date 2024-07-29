import { Module } from '@nestjs/common';
import { FakePaymentGatewayAdapter } from './fake-payment-gateway';
import { PaymentGateway } from 'src/adapters/interfaces/payment-gateway';

@Module({
  providers: [
    {
      provide: PaymentGateway,
      useClass: FakePaymentGatewayAdapter,
    },
  ],
  exports: [
    {
      provide: PaymentGateway,
      useClass: FakePaymentGatewayAdapter,
    },
  ],
})
export class IntegrationModule {}
