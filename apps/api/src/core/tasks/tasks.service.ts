import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  creatTask() {
    return 'Successfully created';
  }
}
