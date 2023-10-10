// import { User } from 'src/users/entities/user.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Brand } from 'src/brands/entities/brand.entity';
import { RestaurantEmployee } from 'src/restaurant-employees/entities/restaurant-employee.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Brand)
  brand: number;

  @Column()
  address: string;

  @OneToMany(
    () => RestaurantEmployee,
    (restaurantEmployee) => restaurantEmployee.restaurant,
  )
  employees: RestaurantEmployee[];
}
