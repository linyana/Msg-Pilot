import { Injectable } from '@nestjs/common';
import { TASK_STATUS } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskUtilService {
  constructor(private prisma: PrismaService) {}

  async updateTaskStatus(params: { task_id: number; status?: TASK_STATUS; failed_reason?: string; sent_count?: number }) {
    const { status, failed_reason, task_id, sent_count } = params;

    if (sent_count) {
      await this.prisma.tasks.update({
        where: {
          id: Number(task_id),
        },
        data: {
          sent_count: sent_count
            ? {
                increment: sent_count,
              }
            : undefined,
        },
      });
    }

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
    } else if (status === 'COMPLETED') {
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
        },
      });
    }
  }

  async handleCompleteTask(params: { task_id: number }) {
    const { task_id } = params;

    const task = await this.prisma.tasks.findUniqueOrThrow({
      where: {
        id: task_id,
      },
    });

    const messagesCount = await this.prisma.messages.findMany({
      where: {
        task_id,
      },
    });

    let status: TASK_STATUS = 'COMPLETED';

    if (Number(messagesCount) < Number(task.expect_count)) {
      status = 'PARTIAL_COMPLETED';
    }

    await this.prisma.tasks.update({
      where: {
        id: task_id,
      },
      data: {
        status,
      },
    });
  }
}
