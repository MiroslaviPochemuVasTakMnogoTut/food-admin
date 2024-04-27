import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salt } from 'src/auth/entities/salt.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User, Salt])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
