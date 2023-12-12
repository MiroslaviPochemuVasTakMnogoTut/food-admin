import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(Token)
    private TokenRepository: Repository<Token>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ){}

  signup(createUserDto: CreateUserDto){
    if (this.usersService.findByEmail(createUserDto.email) === null) {
      return this.usersService.create(createUserDto);
    }
    else{
      throw new ConflictException('Email is buisy');
    }

  }
  
  async login(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.findByEmail(createAuthDto.login)
    if (user?.passwd !== createAuthDto.passwd) {
      throw new UnauthorizedException('Wrong password or login');
    }

    return this.generate_token(user);
  }

  logout(token:string) {
    return this.TokenRepository.delete({token})
  }

  async refresh(token: string) {

    const dbtoken  = await this.TokenRepository.findOneOrFail({where: {token},
    relations: {user: true}})
    const newtoken = await this.generate_token(dbtoken.user)

    await this.TokenRepository.delete(dbtoken.id);
    return newtoken;
  }

  private async generate_token(user: User){
    const token  = this.TokenRepository.create({user, token: randomUUID()})
    await this.TokenRepository.save(token)

    const payload = {sub: user.id, username: user.email}
    const access_token =  await this.jwtService.signAsync(payload)
    return {access_token,
            refresh_token: token.token}

  }
}
