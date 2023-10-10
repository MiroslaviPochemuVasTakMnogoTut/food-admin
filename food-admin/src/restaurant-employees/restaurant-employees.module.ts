import { Module } from '@nestjs/common';
import { RestaurantEmployeesService } from './restaurant-employees.service';
import { RestaurantEmployeesController } from './restaurant-employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEmployee } from './entities/restaurant-employee.entity';

@Module({
  controllers: [RestaurantEmployeesController],
  imports: [TypeOrmModule.forFeature([RestaurantEmployee])],
  providers: [RestaurantEmployeesService],
})
export class RestaurantEmployeesModule {}
