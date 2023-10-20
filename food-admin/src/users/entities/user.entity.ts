import { Order } from 'src/orders/entities/order.entity';
import { RestaurantEmployee } from 'src/restaurant-employees/entities/restaurant-employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: 'false' })
  email_verified: boolean;

  @Column()
  passwd: string;

  @Column({ default: () => 'NOW()' })
  created_at: Date;

  @Column({ default: () => 'NOW()' })
  udated_at: Date;

  ///////////////////////////////////////

  @OneToMany(()=> Order, (order) => order.uid)
  orders: Order[];

  @OneToMany(
    () => RestaurantEmployee,
    (restaurantEmployee) => restaurantEmployee.employee,
  )
  works: RestaurantEmployee[];
}
//   @Column()
//   lastName: string;
//   @Column({ default: true })
//   isActive: boolean;
