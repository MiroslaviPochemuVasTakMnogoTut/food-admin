import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantEmployeeDto } from './create-restaurant-employee.dto';

export class UpdateRestaurantEmployeeDto extends PartialType(CreateRestaurantEmployeeDto) {}
