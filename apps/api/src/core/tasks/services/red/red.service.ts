import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTaskService } from '../base.service';
import { Click, creatBrowser, Type } from '../../utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITaskData } from '../../types';
import { TaskUtilService } from '../utils.service';
import { Page } from 'puppeteer';

@Injectable()
export class RedTaskService extends BaseTaskService {
  constructor(private prisma: PrismaService, private taskUtilService: TaskUtilService) {
    super();
  }

  async handleTask(params: { account_id: number; task_id: number }) {
    const { account_id, task_id } = params;
    const { browser, page } = await creatBrowser();

    const account = await this.prisma.accounts.findUniqueOrThrow({
      where: {
        id: account_id,
      },
    });

    const task = await this.prisma.tasks.findUniqueOrThrow({
      where: {
        id: task_id,
      },
    });

    let count = task.expect_count - task.sent_count;

    if (!count) {
      await this.taskUtilService.updateTaskStatus({
        task_id,
        status: 'COMPLETED',
      });
    }

    try {
      if (!account.cookie) {
        await this.prisma.accounts.update({
          where: {
            id: account_id,
          },
          data: {
            is_expired: true,
            expired_at: new Date(),
          },
        });
        throw new BadRequestException("Can't get cookie in this account.");
      }

      const cookies = account.cookie.split('; ').map((item) => {
        const [name, ...rest] = item.split('=');

        return {
          name,
          value: rest.join('='),
          domain: '.xiaohongshu.com',
          path: '/',
        };
      });

      for (const cookie of cookies) {
        await page.setCookie(cookie);
      }

      await this.taskUtilService.updateTaskStatus({
        task_id,
        status: 'RUNNING',
      });

      const response = await page.goto('https://www.xiaohongshu.com', {
        waitUntil: 'domcontentloaded',
      });

      if (!response) {
        throw new BadRequestException(`Failed to create broswer.`);
      }

      const data = task.data as ITaskData;

      await Type({
        page,
        content: data.filter[0],
        name: 'Dashboard Input',
        selector: '#search-input',
      });

      await Click({
        page,
        name: 'Dashboard Button',
        delay: 3,
        selector: '#global > div.header-container > header > div.input-box > div > div.search-icon',
      });

      while (count > 0) {
        try {
          const currentTask = await this.prisma.tasks.findUniqueOrThrow({
            where: {
              id: task_id,
            },
          });
          if (currentTask.expect_count - currentTask.sent_count) {
            break;
          }

          await Click({
            page,
            name: 'Article',
            delay: 3,
            selector: '#global > div.main-container > div.with-side-bar.main-content > div > div.feeds-container > section:nth-child(1) > div > a.cover.ld.mask',
          });

          if (!data.type || data.type === 'comment') {
            await this.sendComment({
              page,
              content: data.content[0],
            });
          }

          count -= 1;

          await this.taskUtilService.updateTaskStatus({
            task_id,
            status: 'COMPLETED',
            send_count: 1,
          });
        } catch (error) {
          count -= 1;
        }
      }

      await this.taskUtilService.updateTaskStatus({
        task_id,
        status: 'COMPLETED',
      });

      await browser.close();
    } catch (error: any) {
      await browser.close();

      const failed_reason = error?.message || 'Unknown Error';

      await this.taskUtilService.updateTaskStatus({
        task_id,
        status: 'FAILED',
        failed_reason,
      });
    }
  }

  async sendComment(params: { page: Page; content: string }) {
    const { page, content } = params;
    await Click({
      page,
      name: 'Article',
      delay: 3,
      selector: 'div.inner',
    });

    await page.keyboard.type(content);

    await Click({
      page,
      name: 'Submit comment',
      delay: 3,
      selector: '#noteContainer > div.interaction-container > div.interactions.engage-bar > div > div > div.bottom > div > div.right-btn-area > button.btn.submit',
    });
  }
}
