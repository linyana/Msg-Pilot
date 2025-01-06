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
      await this.taskUtilService.updateITaskStatus({
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

      await this.taskUtilService.updateITaskStatus({
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

      const hasLoginButton = await page.evaluate(() => {
        return document.querySelector('#login-btn');
      });

      if (hasLoginButton) {
        throw new BadRequestException('Cookie had expired.');
      }

      const filter = data.filter[0];
      const content = data.content[0] || '';

      let noteIds: string[] = [];
      let unUsedNoteIndex = -1;

      const getUsefulNoteIndex = async () => {
        noteIds = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('section.note-item > div > a')).map((element) => new URL((element as HTMLAnchorElement).href).pathname.split('/')[2]);
        });

        const usedNoteIds = await this.prisma.messages.findMany({
          where: {
            task_id,
          },
          select: {
            platform_unit_id: true,
          },
        });

        const usedIdsSet = new Set(usedNoteIds.map((item) => item.platform_unit_id));
        const unUsedNoteIndex = noteIds.findIndex((id) => !usedIdsSet.has(id));
        return unUsedNoteIndex;
      };

      unUsedNoteIndex = await getUsefulNoteIndex();

      if (unUsedNoteIndex < 0) {
        console.log('No more note to send');
        return;
      } else {
        await this.prisma.messages.create({
          data: {
            task_id,
            platform_unit_id: noteIds[unUsedNoteIndex],
            filter,
            content,
            type: task.type,
            tenant_id: Number(task.tenant_id),
            connection_id: Number(task.connection_id),
          },
        });
      }
      console.log(unUsedNoteIndex);

      // search filter
      await Type({
        page,
        content: filter,
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
          if (currentTask.expect_count - currentTask.sent_count <= 0) {
            console.log(1);
            break;
          }

          await Click({
            page,
            name: 'Article',
            delay: 3,
            selector: 'section:nth-child(1) > div > a.cover.ld.mask',
          });

          if (!data.type || data.type === 'comment') {
            await this.sendComment({
              page,
              content,
            });
          }

          count -= 1;

          await this.taskUtilService.updateITaskStatus({
            task_id,
            status: 'RUNNING',
            send_count: 1,
          });
        } catch (error) {
          count -= 1;
        }
      }

      const currentTask = await this.prisma.tasks.findUniqueOrThrow({
        where: {
          id: task_id,
        },
      });

      await this.taskUtilService.updateITaskStatus({
        task_id,
        status: currentTask.expect_count - currentTask.sent_count > 0 ? 'PARTIAL_COMPLETED' : 'COMPLETED',
      });

      await browser.close();
    } catch (error: any) {
      await browser.close();

      const failed_reason = error?.message || 'Unknown Error';

      const currentTask = await this.prisma.tasks.findUniqueOrThrow({
        where: {
          id: task_id,
        },
      });

      await this.taskUtilService.updateITaskStatus({
        task_id,
        status: currentTask.sent_count ? 'PARTIAL_COMPLETED' : 'FAILED',
        failed_reason,
      });
    }
  }

  async setMessages(params: { account_id: number; task_id: number }) {
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

    const count = task.expect_count - task.sent_count;

    if (!count) {
      await this.taskUtilService.updateITaskStatus({
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

      await this.taskUtilService.updateITaskStatus({
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

      const hasLoginButton = await page.evaluate(() => {
        return document.querySelector('#login-btn');
      });

      if (hasLoginButton) {
        throw new BadRequestException('Cookie had expired.');
      }

      const filter = data.filter[0];
      const content = data.content[0] || '';

      let noteIds: string[] = [];
      const unUsedNoteIndex = -1;

      const getUsefulNoteIndex = async () => {
        noteIds = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('section.note-item > div > a')).map((element) => new URL((element as HTMLAnchorElement).href).pathname.split('/')[2]);
        });

        const usedNoteIds = await this.prisma.messages.findMany({
          where: {
            task_id,
          },
          select: {
            platform_unit_id: true,
          },
        });

        const usedIdsSet = new Set(usedNoteIds.map((item) => item.platform_unit_id));
        const unUsedNoteIndex = noteIds.filter((id) => !usedIdsSet.has(id));
        return unUsedNoteIndex;
      };

      await browser.close();
    } catch (error: any) {
      await browser.close();

      const failed_reason = error?.message || 'Unknown Error';

      const currentTask = await this.prisma.tasks.findUniqueOrThrow({
        where: {
          id: task_id,
        },
      });

      await this.taskUtilService.updateITaskStatus({
        task_id,
        status: currentTask.sent_count ? 'PARTIAL_COMPLETED' : 'FAILED',
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
