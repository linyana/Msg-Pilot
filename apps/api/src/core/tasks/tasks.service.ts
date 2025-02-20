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
    this.init();
  }

  async retry(connection_id: number, task_id: number) {
    const task = await this.prisma.tasks.findFirst({
      where: {
        connection_id,
        id: task_id,
        NOT: {
          status: {
            in: ['COMPLETED', 'RUNNING'],
          },
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

    if (task) {
      const { taskService } = await this.getConnector(Number(task.connection_id));

      const account = task.task_accounts?.[0]?.account;
      if (!account) {
        throw new BadRequestException('无可用账号');
      }

      taskService.setMessages({
        task_id: Number(task.id),
        account_id: Number(account.id),
      });

      return '任务开启成功';
    }

    throw new BadRequestException('任务开启失败');
  }

  async init() {
    const tasks = await this.prisma.tasks.findMany({
      where: {
        status: {
          in: ['RUNNING'],
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
        throw new BadRequestException('无可用账号');
      }

      await taskService.setMessages({
        task_id: Number(task.id),
        account_id: Number(account.id),
      });
      console.log('end');
      // await taskService.handleTask({
      //   task_id: Number(task.id),
      //   account_id: Number(account.id),
      // });
    }
  }

  private getTaskService = (type: CONNECTION_TYPE): BaseTaskService => {
    switch (type) {
      case 'Red':
        return this.redService;
      default:
        throw new BadRequestException('找不到该平台');
    }
  };

  async getConnector(connection_id: number) {
    const connection = await this.prisma.connections.findFirst({
      where: {
        id: connection_id,
      },
    });

    if (!connection) {
      throw new BadRequestException('找不到该连接');
    }

    const taskService = this.getTaskService(connection.type);

    return {
      connection,
      taskService,
    };
  }

  async creatTask(connection_id: number, tenant_id: number, body: CreateTaskDto) {
    const { name, description, expect_count, data, account_ids, type, destribution_rule } = body;

    const accounts = await this.prisma.accounts.findMany({
      where: {
        id: {
          in: account_ids.map((item) => Number(item)),
        },
        connection_id,
      },
    });

    if (!accounts.length) {
      throw new BadRequestException('无可用账号，请重试');
    }

    const task = await this.prisma.tasks.create({
      data: {
        connection_id,
        tenant_id,
        name,
        description,
        expect_count,
        data,
        type,
        destribution_rule,
        status: 'RUNNING',
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

    const { taskService } = await this.getConnector(connection_id);

    taskService.setMessages({
      task_id: Number(task.id),
      account_id: Number(accounts[0].id),
    });

    await this.prisma.tasks.update({
      where: {
        id: Number(task.id),
      },
      data: {
        status: 'RUNNING',
      },
    });

    return 'Successfully created';
  }

  getAllTasks(connection_id: number) {
    return this.prisma.tasks.findMany({
      where: {
        connection_id,
      },
    });
  }

  async getOneTask(connectionId: number, id: string) {
    const task = await this.prisma.tasks.findUnique({
      where: {
        unit_id: id,
      },
      select: {
        task_accounts: {
          include: {
            account: true,
          },
        },
        connection_id: true,
        data: true,
      },
    });

    if (!task || Number(task.connection_id) !== connectionId) {
      throw new BadRequestException('找不到该任务');
    }

    return task;
  }
}
