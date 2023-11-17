import { IsInt, IsString } from 'class-validator';
import { Company } from 'src/companies/entities/company.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'brand' })
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @IsInt()
  @Column()
  companyId: number;

  @ManyToOne(() => Company, com => com.brands)
  @JoinColumn({name: 'comanyId'})
  company: Company;

  @IsString()
  @Column()
  name: string;

  /////////////////

  @OneToMany(() => Restaurant, (restaurant) => restaurant.brand)
  restaurants: Restaurant[];
}
