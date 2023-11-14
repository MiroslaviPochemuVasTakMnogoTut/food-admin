import { IsNumber, IsString } from 'class-validator';
import { MenuItem } from 'src/restaurants/entities/menu_item.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'item' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;
  
  @IsString()
  @Column()
  description: string;

  @Column()
  @IsNumber()
  weight: number;
  
  @IsNumber()
  @Column()
  volume: number;
  
  @IsNumber()
  @Column()
  price: number;

  @IsString()
  @Column()
  image: string;

  @OneToMany(() => MenuItem, (menu) => menu.item)
  inMenu: MenuItem[];
}
