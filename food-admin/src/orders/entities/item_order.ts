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
  itemId: number;
  
  @Column({name: 'orderId'})
  orderId: number;
  
  @Column()
  amount: number;

  @Column({default: false})
  isComplete: boolean

  @Column({default: ''})
  note: string;

  @ManyToOne(()=>Order, (order) => order.items )
  @JoinColumn({name: 'orderId'})
  order: Order;

  @ManyToOne(()=>Item)
  @JoinColumn({name: 'itemId'})
  item: Item;

} 