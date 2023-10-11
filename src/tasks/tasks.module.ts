import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],  // to let me use the entity class as a repository in the service class
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
