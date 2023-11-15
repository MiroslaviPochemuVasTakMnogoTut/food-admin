import { IsString } from 'class-validator';
import { MenuItem } from 'src/restaurants/entities/menu_item.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @OneToMany(() => MenuItem, (menu) => menu.category)
  items: MenuItem[];

  @ManyToOne(() => Restaurant, (rest) => rest.menu)
  rest: Restaurant;
}
