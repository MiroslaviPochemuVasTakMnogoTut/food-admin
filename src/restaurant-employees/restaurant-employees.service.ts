import { Injectable } from '@nestjs/common';
import { CreateRestaurantEmployeeDto } from './dto/create-restaurant-employee.dto';
import { UpdateRestaurantEmployeeDto } from './dto/update-restaurant-employee.dto';
import { Repository } from 'typeorm';
import { RestaurantEmployee } from './entities/restaurant-employee.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RestaurantEmployeesService {
  constructor(
    @InjectRepository(RestaurantEmployee)
    private restEmpRepository: Repository<RestaurantEmployee>,
  ){}
  create(createRestaurantEmployeeDto: CreateRestaurantEmployeeDto) {
    const restEmp = this.restEmpRepository.create(createRestaurantEmployeeDto);
    return this.restEmpRepository.save(restEmp);
  }

  findAll() {
    return this.restEmpRepository.find();
  }

  findOne(id: number) {
    return this.restEmpRepository.findOneBy({id});
  }

  update(id: number, updateRestaurantEmployeeDto: UpdateRestaurantEmployeeDto) {
    return this.restEmpRepository.update({id}, updateRestaurantEmployeeDto);
  }

  remove(id: number) {
    return this.restEmpRepository.delete(id);
  }
}
