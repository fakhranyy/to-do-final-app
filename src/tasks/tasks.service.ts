import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>,
              @InjectRepository(User) private readonly userRepo: Repository<User>
  ){} 
// // 
//   async create(id: number , createTaskDto: CreateTaskDto) {
//     await this.taskRepo.create({userId: id})
//   }



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
