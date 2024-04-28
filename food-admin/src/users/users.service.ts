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
  ) { }

  async create(createUserDto: CreateUserDto) {
    const numbers = await this.saltPasswd(createUserDto.passwd);
    const newdto = { ...createUserDto, passwd: numbers.dbPasswd };
    const user = this.usersRepository.create(newdto);
    const dbUser = await this.usersRepository.save(user);
    const saltObj = this.saltRepository.create({ someNumbers: numbers.salt, user: dbUser });
    this.saltRepository.save(saltObj);
    return dbUser;
  }

  private async saltPasswd(passwd:string) {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt();
    const dbPasswd = await bcrypt.hash(passwd + salt, saltOrRounds);
    return {salt, dbPasswd}
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
    return this.usersRepository.findOne({ where: { email }, relations: { salt: true } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {

    return this.usersRepository.update(
      {
        id,
      },
      updateUserDto,
    );
  }

  async updatePasswd(id: number){
    const user = await this.usersRepository.findOne({where: {id}, relations: {salt: true}});
    if (!user.salt){
      const numbers = await this.saltPasswd(user.passwd);
      this.update(id, {passwd: numbers.dbPasswd});
      const dbSalt = this.saltRepository.create({someNumbers: numbers.salt, user});
      this.saltRepository.save(dbSalt);
    }
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
