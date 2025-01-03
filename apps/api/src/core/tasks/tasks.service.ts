import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CONNECTION_TYPE } from '@prisma/client';
import { BaseTaskService } from './services/base.service';
import { RedTaskService } from './services/red/red.service';

@Injectable()
export class TasksService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    private prisma: PrismaService,
    private redService: RedTaskService,
  ) {
    // this.init();
  }

  async init() {
    const tasks = await this.prisma.tasks.findMany({
      where: {
        status: {
          in: ['NOT_START', 'FAILED', 'PARTIAL_COMPLETED', 'RUNNING', 'WAITING'],
        },
      },
      include: {
        task_accounts: {
          include: {
            account: true,
          },
        },
      },
    });

    for (const task of tasks) {
      const { taskService } = await this.getConnector(Number(task.connection_id));

      const account = task.task_accounts?.[0]?.account;
      if (!account) {
        throw new BadRequestException("Can't find account.");
      }

      await taskService.handleTask({
        task_id: Number(task.id),
        account_id: Number(account.id),
      });
    }
  }

  private getTaskService = (type: CONNECTION_TYPE): BaseTaskService => {
    switch (type) {
      case 'Red':
        return this.redService;
      default:
        throw new BadRequestException("Can't find this platform");
    }
  };

  async getConnector(connection_id: number) {
    const connection = await this.prisma.connections.findFirst({
      where: {
        id: connection_id,
      },
    });

    if (!connection) {
      throw new BadRequestException("Can't find this connection.");
    }

    const taskService = this.getTaskService(connection.type);

    return {
      connection,
      taskService,
    };
  }

  async creatTask(connection_id: number, tenant_id: number, body: CreateTaskDto) {
    const { name, description, expect_count, data, account_ids } = body;

    const accounts = await this.prisma.accounts.findMany({
      where: {
        id: {
          in: account_ids.map((item) => Number(item)),
        },
        connection_id,
      },
    });

    if (!accounts.length) {
      throw new BadRequestException("Can't find any accounts, please try again");
    }

    const task = await this.prisma.tasks.create({
      data: {
        connection_id,
        tenant_id,
        name,
        description,
        expect_count,
        data,
      },
    });

    for (const account of accounts) {
      await this.prisma.task_accounts.create({
        data: {
          connection_id,
          tenant_id,
          task_id: Number(task.id),
          account_id: Number(account.id),
        },
      });
    }

    return 'Successfully created';
  }

  findAllTasks(connection_id: number) {
    return this.prisma.tasks.findMany({
      where: {
        connection_id,
      },
    });
  }
}
