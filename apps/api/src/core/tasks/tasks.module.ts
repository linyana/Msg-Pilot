import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedTaskService } from './services/red/red.service';
import { TaskUtilService } from './services/utils.service';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService, RedTaskService, TaskUtilService],
})
export class TasksModule {}
