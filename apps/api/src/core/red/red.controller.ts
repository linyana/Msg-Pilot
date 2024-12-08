import { Body, Controller, Post } from '@nestjs/common';
import { RedService } from './red.service';

@Controller('red')
export class RedController {
  constructor(private readonly redService: RedService) {}

  @Post('task')
  createTask(@Body() body: any) {
    this.redService.createTask(body);
    return 'Successfully  created the task';
  }
}
