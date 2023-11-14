import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/auth.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([Token, User]),
    UsersModule,
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '3600s'},
    })
  ],
  providers: [AuthService, 
              UsersService, 
              /* { provide: APP_GUARD, useClass: AuthGuard } */],// Закомментировать, чтобы выключить запрос токена для API
  exports: [AuthService]
})
export class AuthModule {}
