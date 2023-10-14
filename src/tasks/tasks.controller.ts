import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LazyModuleLoader } from '@nestjs/core'
import { TasksModule } from './tasks.module';
import { ApiAcceptedResponse, ApiTags, ApiResponse } from '@nestjs/swagger';


@Controller('tasks')
@ApiTags('Tasks api')
export class TasksController {
  constructor(private readonly lazyModuleLoader: LazyModuleLoader) {}

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
