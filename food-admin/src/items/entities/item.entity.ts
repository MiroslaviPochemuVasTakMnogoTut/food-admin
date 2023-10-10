import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
