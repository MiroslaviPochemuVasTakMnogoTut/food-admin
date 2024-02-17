import { ApiBearerAuth } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemOrder } from './item_order';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @IsInt()
  uid: number;
  
  @ManyToOne(() => Restaurant)
  @IsInt()
  restid: number;

  @Column()
  @IsString()
  status: string;  
  
  @CreateDateColumn()
  created_at: Date;
  
  @Column({nullable: true})
  completed_at: Date;

  @OneToMany(() => ItemOrder, itemo => itemo.order)
  items: ItemOrder[];
}
