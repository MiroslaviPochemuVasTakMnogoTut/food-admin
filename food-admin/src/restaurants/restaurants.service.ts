import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Point, Repository } from 'typeorm';
import { MenuItem } from './entities/menu_item.entity';
import { AddItemToMenuDto } from './dto/add-item-to-menu.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    
    @InjectRepository(MenuItem)
    private menuRepository: Repository<MenuItem>,
    
  ) {}

  create(dto: CreateRestaurantDto) {
    const restaurant = this.restaurantRepository.create(dto);
    return this.restaurantRepository.save(restaurant);
  }

  async findAll() {

    const restaurants = this.restaurantRepository.find({
      select:{
        brand:{
          name:true
        },
      },
      
      relations:{
        brand: true,
        menu: {
            items: {
              item: true,
              category: false,
            }
          },
      }
    });

    return restaurants
  }

  findOne(id: number) {
    return this.restaurantRepository.findOne({ 
      where: {id},
      select: {
        brand: {
          name: true,
        }
      },
      relations: {
        brand: true,
        menu: {
          items:{
            item: true,
            category: false,
          }
        }
      }
     });
  }

  update(id: number, { ...dto}: UpdateRestaurantDto) {
    return this.restaurantRepository.update({ id }, {
     
      ...dto
    });
  }

  remove(id: number) {
    return this.restaurantRepository.delete(id);
  }


  addToMenu(addItemToMenu: AddItemToMenuDto){
    const menuItem = this.menuRepository.create(addItemToMenu);
    return this.menuRepository.save(menuItem);
  }

  findByDistance(point: Point, distance: number) {

    return this.restaurantRepository.createQueryBuilder('restaurant').where(`ST_Distance(
      st_transform(
        st_geomfromgeojson(:point), 3857),
        st_transform(geometry,3857)) < :distance`, {point, distance}).getMany();
  }
}
