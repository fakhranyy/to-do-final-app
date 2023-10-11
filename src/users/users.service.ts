import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>,
  ){}
  create(createUserDto: CreateUserDto) {
    // const 
    return this.repo.save(createUserDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({id});
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
