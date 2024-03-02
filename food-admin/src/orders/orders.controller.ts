import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AddOrderItemDto } from './dto/add-orderItem.dto';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }
  
  @ApiOperation({summary: 'Создать заказ'})
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  
  @ApiOperation({summary: 'Добавить пункт к существующему заказу'})
  @Post('add_to_order')
  add_to_order(@Body() addToOrder: AddOrderItemDto) {
    const value = this.ordersService.addToOrder(addToOrder);
    console.log(value);
    return value;
  }

  @ApiOperation({summary: 'Получить все заказы'})
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
  
  @ApiOperation({summary: 'Получить свои заказы'})
  @Get('myorders')
  myorders(@Req() req: any) {
    // return req;
    return this.ordersService.findByUID(req.user.sub);
  }

  @ApiOperation({summary: 'Получить весь список всех заказов определенного ресторана'})
  @Get('byrest:id')
  findOneByRest(@Param('id') id: string) {
    return this.ordersService.findByRest(+id);
  }
  
  @ApiOperation({summary: 'Получить заказ по ID'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
  
  @ApiOperation({summary: 'Изменить заказ (не работает)'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @ApiOperation({summary: 'Удалить заказ (не работает)'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
