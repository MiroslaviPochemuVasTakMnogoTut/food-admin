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

  @Column()
  @IsInt()
  itemId: number;
  
  @Column()
  @IsInt()
  orderId: number;
  
  @Column()
  @IsInt()
  amount: number;

  @Column()
  @IsString()
  note: string;

  @ManyToOne(()=>Order)
  @JoinColumn({name: 'orderId'})
  order: Order;

  @ManyToOne(()=>Item)
  @JoinColumn({name: 'itemId'})
  item: Item;

} 