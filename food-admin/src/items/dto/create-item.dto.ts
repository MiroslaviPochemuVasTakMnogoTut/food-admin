import { OmitType } from '@nestjs/swagger';
import { Item } from '../entities/item.entity';

export class CreateItemDto extends OmitType(Item, ['id', 'inMenu']) {
  // readonly title: string;

  // readonly description: string;
}
