import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Item } from 'src/items/entities/item.entity';
import { Category } from 'src/category/entities/category.entity';
import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('menu_item')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsInt()
  @ApiProperty({ type: "number" })
  @Column()
  restId: number;

  @ApiProperty({ type: "number" })
  @IsInt()
  @Column()
  itemId: number;
  
  @ApiProperty({ type: "number" })
  @IsInt()
  @Column()
  categoryId: number;

  // @ManyToOne(()=> Restaurant, (restaurant) => restaurant.menu)
  // @JoinColumn({name: 'restId'})
  // // @Transform((value)=>({id:value}),{toPlainOnly:true})
  // restaurant: Restaurant;
  
  @ManyToOne(() => Item, (item) => item.inMenu)
  @JoinColumn({name: 'itemId'})
  item: Item;
  
  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({name: 'categoryId'})
  category: Category;
}