import { Module } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway-service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ApiGatewayService],
  exports: [ApiGatewayService],
})
export class IntegrationModule {}
