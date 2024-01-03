import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ItemOrder } from './entities/item_order';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([Order, ItemOrder])],
  providers: [OrdersService],
})
export class OrdersModule {}
