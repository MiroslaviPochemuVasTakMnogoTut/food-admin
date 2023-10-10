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
    const { restaurant, employee , ...dto} = createRestaurantEmployeeDto;

    const restEmp = this.restEmpRepository.create({
      restaurant: {id : restaurant},
      employee: {id: employee},
      ...dto

    });
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

  findWorkers(restId: number){
    return this.restEmpRepository.find({where:{restaurant: {id: restId}}})
  }

}
