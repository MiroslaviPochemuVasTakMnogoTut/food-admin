import { Company } from 'src/companies/entities/company.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'brands' })
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company)
  company: number;

  @Column()
  name: string;

  /////////////////

  @OneToMany(() => Restaurant, (restaurant) => restaurant.brand)
  restaurants: Restaurant[];
}
