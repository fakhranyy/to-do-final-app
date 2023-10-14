import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';  
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';


@Module({
  // we use typeOrmModule.forFeature to let me use the entity class as a repository in the service class
  imports: [TypeOrmModule.forFeature([Task]), MulterModule.register({dest: './uploads'})],  
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
