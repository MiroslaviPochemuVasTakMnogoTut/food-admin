// import { User } from 'src/users/entities/user.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // ManyToMany,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Point,
} from 'typeorm';

import { Brand } from 'src/brands/entities/brand.entity';
import { RestaurantEmployee } from 'src/restaurant-employees/entities/restaurant-employee.entity';
import { Item } from 'src/items/entities/item.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Brand, (brand)=>brand.restaurants)
  brand: Brand;

  @Column()
  description: string;

  @Column()
  img: string;

  @Column()
  address: string;

  @Column({nullable: true})
  costs: number;
  
  @Column()
  phone: string;
  
  @Column()
  time: string;

  @Column({type: 'geometry', spatialFeatureType: 'point', srid: 4326, nullable: true})
  geometry:Point
  
  @OneToMany(
    () => RestaurantEmployee,
    (restaurantEmployee) => restaurantEmployee.restaurant,
    )
    
  employees: RestaurantEmployee[];
  @ManyToMany(() => Item)
  @JoinTable()
  menu: Item[]

}
