import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(Token)
    private TokenRepository: Repository<Token>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ){}
  
  async login(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.findByEmail(createAuthDto.login)
    if (user?.passwd !== createAuthDto.passwd) {
      throw new UnauthorizedException();
    }
    const payload = {sub: user.id, username: user.email}

    return {access_token: await this.jwtService.signAsync(payload)}

  }

  logout() {}

  refresh() {}
}
