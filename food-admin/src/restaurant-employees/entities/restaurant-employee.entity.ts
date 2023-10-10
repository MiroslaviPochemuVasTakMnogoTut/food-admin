import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";

@Entity()
export class RestaurantEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.works)
  employee: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.employees)
  restaurant: Restaurant;

  @Column()
  role: number
}
