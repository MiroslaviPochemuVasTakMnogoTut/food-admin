import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Item } from 'src/items/entities/item.entity';
import { IsInt, IsString } from 'class-validator';

@Entity()
export class ItemOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'itemId'})
  @IsInt()
  itemId: number;
  
  @Column({name: 'orderId'})
  @IsInt()
  orderId: number;
  
  @Column()
  @IsInt()
  amount: number;

  @Column()
  @IsString()
  note: string;

  @ManyToOne(()=>Order, (order) => order.items )
  @JoinColumn({name: 'orderId'})
  order: Order;

  @ManyToOne(()=>Item)
  @JoinColumn({name: 'itemId'})
  item: Item;

} 