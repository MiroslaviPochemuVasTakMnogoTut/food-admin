import { ApiBearerAuth } from '@nestjs/swagger';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ApiBearerAuth()
@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  uid: number;

  @ManyToOne(() => Restaurant)
  restid: number;

  @Column()
  status: string;
  
  
  @Column({ default: () => 'NOW()' })
  created_at: Date;
  
  @Column()
  completed_at: Date;
}
