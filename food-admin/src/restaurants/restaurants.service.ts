import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    
  ) {}

  create({brand, coordinates, ...dto}: CreateRestaurantDto) {
    const restaurant = this.restaurantRepository.create({
      brand:{id:brand},
      geometry: {type: 'Point', coordinates},
      ...dto
    });
    return this.restaurantRepository.save(restaurant);
  }

  findAll() {
    return this.restaurantRepository.find({
      select:{
        brand:{
          name:true
        }
      },
      relations:{
        brand: true
      }
    });
  }

  findOne(id: number) {
    return this.restaurantRepository.findOneBy({ id });
  }

  update(id: number, {brand, coordinates,...dto}: UpdateRestaurantDto) {
    return this.restaurantRepository.update({ id }, {
      brand: brand ? {id:brand} : undefined,
      geometry: coordinates ? {type: 'Point', coordinates} : undefined,
      ...dto
    });
  }

  remove(id: number) {
    return this.restaurantRepository.delete(id);
  }
}
