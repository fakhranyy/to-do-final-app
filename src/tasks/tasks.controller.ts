import { Controller, Get, Post, Body, Patch, Param, Delete,  UseInterceptors, UploadedFile } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LazyModuleLoader } from '@nestjs/core'
import { TasksModule } from './tasks.module';
import { ApiAcceptedResponse, ApiTags, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('tasks')
@ApiTags('Tasks api')
export class TasksController {
  constructor(private readonly lazyModuleLoader: LazyModuleLoader) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './files',
      filename(req, file, callback){
       const uniqueSuffix =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename)
      }
    })
  }))
  handleUpload(@UploadedFile() file: Express.Multer.File){
    console.log( file );
  }


  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    // return this.tasksService.create(createTaskDto);
    const moduleRef = await this.lazyModuleLoader.load(() => TasksModule);
    const service = moduleRef.get(TasksService);
    return service.create(createTaskDto);
  }

  @Get()
  async findAll() {
    // return this.tasksService.findAll();
    const moduleRef = await this.lazyModuleLoader.load(() => TasksModule);
    const service = moduleRef.get(TasksService);
    return service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const moduleRef = await this.lazyModuleLoader.load(() => TasksModule);
    const service = moduleRef.get(TasksService);
    return service.findOne(id);
    // return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    // return this.tasksService.update(+id, updateTaskDto);
    const moduleRef = await this.lazyModuleLoader.load(() => TasksModule);
    const service = moduleRef.get(TasksService);
    return service.update( id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const moduleRef = await this.lazyModuleLoader.load(() => TasksModule);
    const service = moduleRef.get(TasksService);
    return service.remove(id);
  }
}
