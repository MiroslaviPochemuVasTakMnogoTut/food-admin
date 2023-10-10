import { Brand } from 'src/brands/entities/brand.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'company' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //////////////////

  @OneToMany(() => Brand, (brand) => brand.company)
  brands: Brand[];
}
