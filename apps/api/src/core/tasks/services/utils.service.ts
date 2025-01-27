import { Injectable } from '@nestjs/common';
import { TASK_STATUS } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskUtilService {
  constructor(private prisma: PrismaService) {}

  async updateTaskStatus(params: { task_id: number; status?: TASK_STATUS; failed_reason?: string; send_count?: number }) {
    const { status, failed_reason, task_id, send_count } = params;
    if (!status) {
      const task = await this.prisma.tasks.findUniqueOrThrow({
        where: {
          id: Number(task_id),
        },
      });

      let status: TASK_STATUS = 'COMPLETED';
      if (!task.sent_count) {
        status = 'FAILED';
      } else if (task.expect_count > task.sent_count) {
        status = 'PARTIAL_COMPLETED';
      }

      await this.prisma.tasks.update({
        where: {
          id: Number(task_id),
        },
        data: {
          status,
        },
      });
    } else if (status === 'FAILED' || status === 'PARTIAL_COMPLETED') {
      await this.prisma.tasks.update({
        where: {
          id: Number(task_id),
        },
        data: {
          status,
          failed_reason,
        },
      });
    } else if (status === 'COMPLETED_SEARCH') {
      await this.prisma.tasks.update({
        where: {
          id: Number(task_id),
        },
        data: {
          status,
          is_search_completed: true,
          failed_reason: '',
        },
      });
    } else {
      await this.prisma.tasks.update({
        where: {
          id: Number(task_id),
        },
        data: {
          status,
          failed_reason: '',
          sent_count: send_count
            ? {
                increment: 1,
              }
            : undefined,
        },
      });
    }
  }
}
