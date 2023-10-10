import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestaurantEmployeesService } from './restaurant-employees.service';
import { CreateRestaurantEmployeeDto } from './dto/create-restaurant-employee.dto';
import { UpdateRestaurantEmployeeDto } from './dto/update-restaurant-employee.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Works')
@Controller('restaurant-employees')
export class RestaurantEmployeesController {
  constructor(private readonly restaurantEmployeesService: RestaurantEmployeesService) {}

  @Post()
  create(@Body() createRestaurantEmployeeDto: CreateRestaurantEmployeeDto) {
    return this.restaurantEmployeesService.create(createRestaurantEmployeeDto);
  }

  @Get()
  findAll() {
    return this.restaurantEmployeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantEmployeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantEmployeeDto: UpdateRestaurantEmployeeDto) {
    return this.restaurantEmployeesService.update(+id, updateRestaurantEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantEmployeesService.remove(+id);
  }
}
