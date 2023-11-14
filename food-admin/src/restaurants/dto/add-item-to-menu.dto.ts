import { Item } from 'src/items/entities/item.entity';
import { Restaurant } from '../entities/restaurant.entity';
import { Category } from "src/category/entities/category.entity";
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { MenuItem } from '../entities/menu_item.entity';

export class AddItemToMenuDto/* {
  @ApiProperty({
    type: "number",
  })
  readonly restId: Restaurant;
  @ApiProperty({
    type: "number",
  })
  readonly itemId: Item;
  @ApiProperty({
    type: "number",
  })
  readonly category?: Category;
}  */ extends OmitType(MenuItem,['id', 'restaurant', 'category', 'item']){}