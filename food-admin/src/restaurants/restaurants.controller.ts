import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddItemToMenuDto } from './dto/add-item-to-menu.dto';
import { Public } from 'src/auth/auth.guard';
import { PointFromStringPipe } from 'src/point-from-string/point-from-string.pipe';
import { Point } from 'typeorm';

@ApiBearerAuth()
@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,) {}


  @ApiOperation({summary: 'Добавить ресторан'})
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }
  
  @ApiOperation({summary: 'Получить все рестораны'})
  @Public()
  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }
  
  @ApiOperation({summary: 'Получить рестораны в радиусе от координаты'})
  @ApiQuery({name: 'coords', type: 'string'})
  @Get('distance')
  findByDistance(@Query('coords', PointFromStringPipe) coords: Point, @Query('distance') distance: string) {
    return this.restaurantsService.findByDistance(coords, +distance);
  }
  
  @Public()
  @ApiOperation({summary: 'Получить ресторан по ID'})
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.restaurantsService.findOne(id);
  }
  
  @ApiOperation({summary: 'Обновить информацию о ресторане'})
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }
  
  @ApiOperation({summary: 'Удалить ресторан'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
  
  
  @ApiOperation({summary: 'Добавить в меню ресторана'})
  @Post('addToMenu')
  addToMenu(@Body() addItemToMenuDto: AddItemToMenuDto){
    // addItemToMenuDto.
    return this.restaurantsService.addToMenu(addItemToMenuDto);
  }
}
