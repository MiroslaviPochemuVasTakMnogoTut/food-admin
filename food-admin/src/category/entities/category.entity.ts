import { IsString } from 'class-validator';
import { MenuItem } from 'src/restaurants/entities/menu_item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @OneToMany(() => MenuItem, (menu) => menu.category)
  items: MenuItem[];
}
