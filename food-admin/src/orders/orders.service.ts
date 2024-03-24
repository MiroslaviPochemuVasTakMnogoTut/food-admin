import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { AddOrderItemDto } from './dto/add-orderItem.dto';
import { ItemOrder } from './entities/item_order';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(ItemOrder)
    private itemRepository: Repository<ItemOrder>,

  ) { }

  create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find({
      relations:{
        items:true
      }
    });
  }

  findOne(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: {
        items: true,
      }
    });
  }
  async findByRest(rid: number) {
    const value = await this.orderRepository.find({ 
      where: {rest: {
        id: rid
      }},
      relations: {        
        items: true,
        rest: true,
        user: true,
      },
      select:{
        id: true,
        rest: { id: true },
        user: { id: true },
        items: true,
        created_at: true,
        completed_at: true,
        status:true
      }
    });
    return value;
  }


  async findByUID(uid: number) {
    // console.log(`requested orders for: ` + uid)
    const value = await this.orderRepository.find({
      where: {
        user: {
          id: uid
        },
      },
      relations: {
        items: true,
      }
    })
    // console.log(value);
    return value;
  }

  addToOrder(addToOrderDto: AddOrderItemDto) {
    const item = this.itemRepository.create(addToOrderDto);
    return this.itemRepository.save(item);
  }

  async removeFromOrder(orderId: number, itemId: number) {
    const rm = await this.itemRepository.findOneByOrFail({
      itemId,
      orderId,
    })
    return this.itemRepository.delete(rm.id)
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
