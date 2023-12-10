import { ApiBearerAuth } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ApiBearerAuth()
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
  
  
  @Column({ default: () => 'NOW()' })// TODO
  created_at: Date;
  
  @Column({nullable: true})
  completed_at: Date;
}
