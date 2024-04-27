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
import * as bcrypt from 'bcrypt';
import { Salt } from './entities/salt.entity';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-passwd.dto';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(Token)
    private TokenRepository: Repository<Token>,
    @InjectRepository(Salt)
    private saltRepository: Repository<Salt>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ){}

  async signup(createUserDto: CreateUserDto){
    const user = await this.usersService.findByEmail(createUserDto.email)
    // console.log(st)
    if (user === null) {
      return this.usersService.create(createUserDto);
    }
    else{
      throw new ConflictException('Email is buisy');
    }

  }
  
  async login(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.findByEmail(createAuthDto.login)
    console.log(user);
    const isPswdMatch = await bcrypt.compare(createAuthDto.passwd + user.salt.someNumbers, user?.passwd);
    console.log(`Result ${isPswdMatch}`);
    if (user?.passwd == createAuthDto.passwd) {

    }
      if (!isPswdMatch) {
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
    const token  = this.TokenRepository.create({user, token: randomUUID()});
    await this.TokenRepository.save(token);

    const payload = {sub: user.id, username: user.email};
    const access_token =  await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET, 
                                                                    expiresIn: process.env.JWT_TTL + 'm'});
    return {access_token,
            refresh_token: token.token}

  }
  async changePasswd(id: number, changePasswdDto: ChangePasswordDto){
    const updateUserDto = {passwd: changePasswdDto.newpasswd};
    this.usersService.update(id, updateUserDto);
  }
}
