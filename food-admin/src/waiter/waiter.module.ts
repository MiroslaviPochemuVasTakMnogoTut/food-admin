import { Module } from '@nestjs/common';
import { WaiterGateway } from './waiter.gateway';
// import { WaiterGatewayController } from './waiter.controller';

@Module({
  // controllers:[WaiterGatewayController],
  providers: [WaiterGateway],
  exports: [WaiterGateway]
})
export class WaiterModule { }