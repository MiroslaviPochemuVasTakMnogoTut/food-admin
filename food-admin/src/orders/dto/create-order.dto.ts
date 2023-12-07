import { OmitType } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

export class CreateOrderDto extends OmitType(Order, ['id', 'created_at', 'completed_at']) {}
