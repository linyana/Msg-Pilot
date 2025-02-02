import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Req } from 'src/decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() body: CreateTaskDto, @Req('connection_id') connection_id: number, @Req('tenant_id') tenant_id: number) {
    return this.tasksService.creatTask(connection_id, tenant_id, body);
  }

  @Get()
  findAllTasks(@Req('connection_id') connection_id: number) {
    return this.tasksService.findAllTasks(connection_id);
  }

  @Post(':id')
  retry(@Req('connection_id') connection_id: number, @Param() { id }: { id: number }) {
    return this.tasksService.retry(connection_id, Number(id));
  }
}
