import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { MenuItem } from './entities/menu_item.entity';
import { RestaurantsResolver } from './restaurants.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

@Module({
  controllers: [RestaurantsController],
  imports: [TypeOrmModule.forFeature([Restaurant, MenuItem])],
  providers: [RestaurantsService, RestaurantsResolver],
})
export class RestaurantsModule {}

// @Module({
//   controllers: [RestaurantsController],
//   imports: [TypeOrmModule.forFeature([RestaurantEmployee])],
//   providers: [RestaurantsService],
// })
// export class RestEmpModule {}
