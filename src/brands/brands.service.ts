import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto) {
    const brand = this.brandsRepository.create(createBrandDto);
    return this.brandsRepository.save(brand);
  }

  findAll() {
    return this.brandsRepository.find({
      relations: ['restaurants'],
    });
  }

  findOne(id: number) {
    return this.brandsRepository.findOneBy({ id });
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.brandsRepository.update({ id }, updateBrandDto);
  }

  remove(id: number) {
    return this.brandsRepository.delete(id);
  }
}
