import { OmitType } from '@nestjs/swagger';
import { ItemOrder } from '../entities/item_order';

export class AddOrderItemDto extends OmitType(ItemOrder, ['id', 'item', 'order']) { }