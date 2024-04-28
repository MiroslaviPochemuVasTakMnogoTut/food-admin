import {
  Controller,
  Post,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response, Request, response} from 'express'
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-passwd.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto){
    return this.authService.signup(createUserDto);
  }
  
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto, @Res({passthrough: true}) response: Response) {
    const { access_token, refresh_token} = await this.authService.login(createAuthDto);
    
    response.cookie('refresh', refresh_token, {httpOnly: true, maxAge: +process.env.REFRESH_TTL*1000*60});
    return {access_token};
  }
  
  @ApiBearerAuth()
  @Delete('logout')
  async logout(@Req() request: Request, @Res({passthrough: true}) response: Response)
  {
    const token = request.cookies.refresh;
    if (!token){ throw new UnauthorizedException()}
    
    response.cookie('refresh', null, {httpOnly: true, maxAge: 0});
    
    return this.authService.logout(token);
  }
  
  @ApiBearerAuth()
  @Post('refresh') 
  async refresh(@Req() request: Request, @Res({passthrough: true}) response: Response){
    const token = request.cookies.refresh;
    if (!token){ throw new UnauthorizedException()}
    
    const {access_token, refresh_token} = await this.authService.refresh(token);
    
    response.cookie('refresh', refresh_token, {httpOnly: true, maxAge: +process.env.REFRESH_TTL*1000*60});
    
    return {access_token};
  }
  
  @ApiBearerAuth()
  @Post('changePasswd')
  async changePasswd(@Req() request: any, @Body() changePasswordDto: ChangePasswordDto){
    const token = request.cookies.refresh;
    if (!token){ throw new UnauthorizedException()}
    this.authService.changePasswd(request.user.sub, changePasswordDto);
  }
}
