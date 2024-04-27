import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/auth.entity';
import { UsersService } from 'src/users/users.service';
// import { User } from 'src/users/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { Salt } from './entities/salt.entity';




@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([Token, Salt]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TTL + 'm' },
    })
  ],
  providers: [AuthService,
{ provide: APP_GUARD, useClass: AuthGuard } 
  ],// Закомментировать, чтобы выключить запрос токена для API
  exports: [AuthService]
})
export class AuthModule { }
