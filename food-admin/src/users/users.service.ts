import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Salt } from 'src/auth/entities/salt.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Salt)
    private saltRepository: Repository<Salt>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // if (this.findByEmail(createUserDto.email) === null) {
      const saltOrRounds = 10;
      const salt = await bcrypt.genSalt();
      const dbPasswd = await bcrypt.hash(createUserDto.passwd + salt, saltOrRounds);
      const newdto = {...createUserDto , passwd: dbPasswd };
      console.log(newdto);
      const user = this.usersRepository.create(newdto);
      const dbUser = await this.usersRepository.save(user);
      
      const saltObj = this.saltRepository.create({someNumbers: salt, user: dbUser});
      this.saltRepository.save(saltObj);
      console.log(saltObj);
      return dbUser;
    // }
    // else{
    //   throw new ConflictException('Email is buisy');
    // }
    
  }

  findAll() {
    return this.usersRepository.find({
      relations: ['works'],
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({email});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(
      {
        id,
      },
      updateUserDto,
    );
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
