import { Salt } from 'src/auth/entities/salt.entity';
import { Order } from 'src/orders/entities/order.entity';
import { RestaurantEmployee } from 'src/restaurant-employees/entities/restaurant-employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, Index, UpdateDateColumn, OneToOne } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ default: 'false' })
  email_verified: boolean;

  @Column()
  passwd: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  udated_at: Date;

  @OneToMany(() => Order, (order) => order.user, { onDelete: 'SET NULL' })
  orders: Order[];

  @OneToMany(
    () => RestaurantEmployee,
    (restaurantEmployee) => restaurantEmployee.employee, { onDelete: 'SET NULL' }
  )
  works: RestaurantEmployee[];

  @OneToOne(() => Salt, salt => salt.user, { onDelete: 'CASCADE' })
  salt: Salt;
}


//   @Column()
//   lastName: string;
//   @Column({ default: true })
//   isActive: boolean;
