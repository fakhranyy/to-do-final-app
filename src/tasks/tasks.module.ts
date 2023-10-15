import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';  
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';


@Module({
  // we import typeOrmModule.forFeature to let me use the entity class as a repository in the service class
  // we import MulterModule to help me implementing upload file feature
  imports: [TypeOrmModule.forFeature([Task]), MulterModule.register({dest: './uploads'})],  
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
