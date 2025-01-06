import { Injectable } from '@nestjs/common';
import { TASK_STATUS } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskUtilService {
  constructor(private prisma: PrismaService) {}

  async updateTaskStatus(params: { task_id: number; status: TASK_STATUS; failed_reason?: string; send_count?: number }) {
    const { status, failed_reason, task_id, send_count } = params;
    if (status === 'FAILED' || status === 'PARTIAL_COMPLETED') {
      await this.prisma.tasks.update({
        where: {
          id: Number(task_id),
        },
        data: {
          status,
          failed_reason,
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
