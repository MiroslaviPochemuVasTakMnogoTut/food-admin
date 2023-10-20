import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'item' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  weight: number;

  @Column()
  volume: number;

  @Column()
  price: number;

  @Column()
  image: string;

  @ManyToMany(() => Restaurant)
  inMenu: Restaurant[]
}
