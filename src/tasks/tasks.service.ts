import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>,
              @InjectRepository(User) private readonly userRepo: Repository<User>
  ){} 

  create(createTaskDto: CreateTaskDto) {
  return this.taskRepo.save(createTaskDto);
  }

  findAll() {
    return this.taskRepo.find();
  }

  findOne(id: number) {
    return this.taskRepo.findOneBy({id});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskToUpdate = await this.taskRepo.findOneBy({id});
    if(!taskToUpdate){
      throw new NotFoundException(`there is no Task With this ID : ${id}`)
    }
   const updatedTask = {...taskToUpdate, ...updateTaskDto  }  
   return this.taskRepo.save(updatedTask);
  }


  remove(id: number) {
    return this.taskRepo.delete(id);
  }
}
