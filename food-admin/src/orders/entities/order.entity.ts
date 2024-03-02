import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemOrder } from './item_order';


@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({default: 1, example: '1', description: 'User ID'})
  @ManyToOne(() => User)
  @IsInt()
  user: User;
  
  @ApiProperty({default: 1, example: '1', description: 'Restaurant ID'})
  @ManyToOne(() => Restaurant)
  @IsInt()
  rest: Restaurant;

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
