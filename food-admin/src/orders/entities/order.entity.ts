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
  @ManyToOne(() => User, { onDelete: 'SET NULL'})
  @IsInt()
  user: User;
  
  @ApiProperty({default: 1, example: '1', description: 'Restaurant ID'})
  @ManyToOne(() => Restaurant,{ onDelete: 'SET NULL'})
  @IsInt()
  rest: Restaurant;

  @ApiProperty({default: 'cooking', example: 'ready', description: 'Order status'})
  @Column()
  @IsString()
  status: string;  
  
  @ApiProperty({default: '', example: 'first window table', description: 'Table'})
  @Column({default: ''})
  table: string;
  
  @ApiProperty({default: false, example: true})
  @Column({default: false})
  isOutside: boolean;
  
  @ApiProperty({default: '', example: 'Order\'s note', description: 'Order status'})
  @Column({default: ''})
  @IsString()
  note: string;
  
  @CreateDateColumn()
  created_at: Date;
  
  @Column({nullable: true})
  completed_at: Date;

  @OneToMany(() => ItemOrder, itemo => itemo.order, { onDelete: 'CASCADE'})
  items: ItemOrder[];
}
