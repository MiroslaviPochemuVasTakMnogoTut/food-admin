import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { MenuItem } from './entities/menu_item.entity';

@Module({
  controllers: [RestaurantsController],
  imports: [TypeOrmModule.forFeature([Restaurant, MenuItem])],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}

// @Module({
//   controllers: [RestaurantsController],
//   imports: [TypeOrmModule.forFeature([RestaurantEmployee])],
//   providers: [RestaurantsService],
// })
// export class RestEmpModule {}
