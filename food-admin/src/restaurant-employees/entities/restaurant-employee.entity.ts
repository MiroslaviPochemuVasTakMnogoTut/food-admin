import { IsInt, Min } from 'class-validator';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";

@Entity()
export class RestaurantEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  @IsInt()
  @Min(1)
  @Column()
  employeeId:number

  @ManyToOne(() => User, (user) => user.works)
  @JoinColumn({name:'employeeId'})
  employee: User;

  @IsInt()
  @Min(1)
  @Column()
  restaurantId:number

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.employees)
  @JoinColumn({name:'restaurantId'})
  restaurant: Restaurant;

  @IsInt()
  @Min(1)
  @Column()
  role: number
}
