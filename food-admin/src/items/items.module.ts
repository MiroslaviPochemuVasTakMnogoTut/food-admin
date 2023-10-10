import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
  controllers: [ItemsController],
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemsService],
})
export class ItemsModule {}
