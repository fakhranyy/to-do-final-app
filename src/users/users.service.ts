import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/auth/encrypt/encrypt';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>,
  ){}
  // create(createUserDto: CreateUserDto) {
  //   const password = encodePassword(createUserDto.password);
  //   console.log(password);
  //   return this.repo.save({...createUserDto , password});
  // }

  async create(name: string): Promise<User> {
    const user = new User();
    user.name = name;
    return this.repo.save(user);
  }
  
  findAll() {
    return this.repo.find();
  }

  async findOne(username: string): Promise<User> {
    return this.repo.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.repo.findOneBy({id}); 
    if (!userToUpdate) {
      throw new NotFoundException(`there is no user With this ID : ${id}`);
    }
    const updatedUser = {...userToUpdate , ...updateUserDto};
    return this.repo.save(updatedUser);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
