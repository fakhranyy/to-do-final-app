import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>){}
  create(createTaskDto: CreateTaskDto) {
    return this.repo.save(createTaskDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({id});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskToUpdate = await this.repo.findOneBy({id});
    if(!taskToUpdate){
      throw new NotFoundException(`there is no Task With this ID : ${id}`)
    }
   const updatedTask = {...taskToUpdate, ...updateTaskDto  }  
   return this.repo.save(updatedTask);
  }


  remove(id: number) {
    return this.repo.delete(id);
  }
}
