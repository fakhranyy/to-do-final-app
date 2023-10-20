import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>,
  ){}
  // create(createUserDto: CreateUserDto) {
  //   const password = encodePassword(createUserDto.password);
  //   console.log(password);
  //   return this.repo.save({...createUserDto , password});
  // }

  async createUser(newUser : CreateUserDto): Promise<User> {
    const usernameAlreadyExists = await this.repo.findOne({
      where:{
        username : newUser.username
      }
    });
    if(usernameAlreadyExists){
      throw new BadRequestException('Username already found in database!');
    }
    const emailAlreadyExists = await this.repo.findOne({
      where:{
        email : newUser.email
      }
    });
    if(emailAlreadyExists){
      throw new BadRequestException('Email already found in database!');
    }
    const user = new User();
    user.email = newUser.email;
    user.name = newUser.name;
    user.password = newUser.password;
    user.username = newUser.username;
    return await this.repo.save(user);
  }

  async getUserTasks(id: number): Promise<User> {
    return await this.repo.findOne({
      where:{
        id
      },relations : {
        tasks:true
      }
    });
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
