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
import { MenuItem } from './menu_item.entity';
import { Category } from 'src/category/entities/category.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Restaurant {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Brand, (brand)=>brand.restaurants)
  brand: Brand;

  @Field({nullable:true})
  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  img: string;

  @Field({nullable:true})
  @Column({nullable: true})
  address: string;

  @Column({nullable: true})
  costs: number;
  
  @Column({nullable: true})
  phone: string;
  
  @Column({nullable: true})
  time: string;

  @Column({type: 'geometry', spatialFeatureType: 'point', srid: 4326, nullable: true})
  geometry:Point;
  
  @OneToMany(
    () => RestaurantEmployee,
    (restaurantEmployee) => restaurantEmployee.restaurant,
    )
    
  employees: RestaurantEmployee[];

  
  // // @JoinTable()
  // @OneToMany(() => MenuItem, (item) => item.restaurant)
  // menu: MenuItem[];

  @OneToMany(() => Category, (cat) => cat.rest)
  menu: Category[];

}
