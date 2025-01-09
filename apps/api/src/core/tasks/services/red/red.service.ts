import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTaskService } from '../base.service';
import { Click, creatBrowser, Type } from '../../utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITaskData } from '../../types';
import { TaskUtilService } from '../utils.service';
import { Page } from 'puppeteer';
import { sleep } from 'src/utils';
import { Prisma } from '@prisma/client';

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
        throw new BadRequestException('账号授权已过期');
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
        throw new BadRequestException(`创建浏览器失败`);
      }

      const data = task.data as ITaskData;

      const hasLoginButton = await page.evaluate(() => {
        return document.querySelector('#login-btn');
      });

      if (hasLoginButton) {
        throw new BadRequestException('账号授权已过期');
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
        name: '搜索框',
        selector: '#search-input',
      });

      await Click({
        page,
        name: '搜索按钮',
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
            break;
          }

          await Click({
            page,
            name: '笔记',
            delay: 3,
            selector: 'section:nth-child(1) > div > a.cover.ld.mask',
          });

          if (task.type === 'NOTE_COMMENT') {
            await this.sendComment({
              page,
              content,
            });
          }

          count -= 1;

          await this.taskUtilService.updateTaskStatus({
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

      await this.taskUtilService.updateTaskStatus({
        task_id,
        status: currentTask.expect_count - currentTask.sent_count > 0 ? 'PARTIAL_COMPLETED' : 'COMPLETED',
      });

      await browser.close();
    } catch (error: any) {
      await browser.close();

      const failed_reason = error?.message || '未知错误';

      const currentTask = await this.prisma.tasks.findUniqueOrThrow({
        where: {
          id: task_id,
        },
      });

      await this.taskUtilService.updateTaskStatus({
        task_id,
        status: currentTask.sent_count ? 'PARTIAL_COMPLETED' : 'FAILED',
        failed_reason,
      });
    }
  }

  async setMessages(params: { account_id: number; task_id: number }) {
    const { account_id, task_id } = params;

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
    const connection_id = Number(task.connection_id);

    await this.taskUtilService.updateTaskStatus({
      task_id,
      status: 'SEARCHING',
    });

    const messages = await this.prisma.messages.findMany({
      where: {
        connection_id,
      },
    });

    const need_send_count = task.expect_count - messages.length;

    if (!need_send_count) {
      await this.taskUtilService.updateTaskStatus({
        task_id,
        status: 'COMPLETED_SEARCH',
      });
      return;
    }

    const { browser, page } = await creatBrowser();

    try {
      if (!account.cookie) {
        await this.prisma.accounts.update({
          where: { id: account_id },
          data: { is_expired: true, expired_at: new Date() },
        });
        throw new BadRequestException('无法找到Cookie');
      }

      const cookies = account.cookie.split('; ').map((item) => {
        const [name, ...rest] = item.split('=');
        return { name, value: rest.join('='), domain: '.xiaohongshu.com', path: '/' };
      });

      for (const cookie of cookies) {
        await page.setCookie(cookie);
      }

      await this.taskUtilService.updateTaskStatus({ task_id, status: 'RUNNING' });

      const response = await page.goto('https://www.xiaohongshu.com', { waitUntil: 'domcontentloaded' });
      if (!response) throw new BadRequestException('创建浏览器失败');

      const hasLoginButton = await page.evaluate(() => document.querySelector('#login-btn'));
      if (hasLoginButton) throw new BadRequestException('账号授权已过期');

      const filter = (task.data as ITaskData)?.filter[0];

      await Type({
        page,
        content: filter,
        name: '搜索框',
        selector: '#search-input',
      });

      await Click({
        page,
        name: '搜索按钮',
        delay: 3,
        selector: '#global > div.header-container > header > div.input-box > div > div.search-icon',
      });

      let noteIds: { id: string; name: string }[] = [];

      const usedNoteIds = await this.prisma.messages.findMany({
        where: { task_id },
        select: { platform_unit_id: true },
      });
      const usedIdsSet = new Set(usedNoteIds.map((item) => item.platform_unit_id));

      const getUnUsedIds = async () => {
        const newNoteIds = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('section.note-item > div > a')).map((element) => {
            const id = new URL((element as HTMLAnchorElement).href).pathname.split('/')[2];
            const name = element.textContent || '';
            return { id, name };
          });
        });

        let noMoreUsers = false;
        const uniqueNewNoteIds = Array.from(new Map(newNoteIds.map((item) => [item.id, item])).values());
        const newIds = uniqueNewNoteIds.filter((item) => !usedIdsSet.has(item.id));
        if (!newIds.length) noMoreUsers = true;

        noteIds = [...noteIds, ...newIds.filter((item) => !noteIds.some((existing) => existing.id === item.id))];
        const unUsedIds = noteIds.filter((item) => !usedIdsSet.has(item.id));

        return { unUsedIds, noMoreUsers };
      };

      const createMessages = async (usersToSend: { id: string; name: string }[]) => {
        const data: Prisma.messagesCreateManyInput[] = usersToSend.map((item) => ({
          platform_unit_id: item.id,
          platform_name: item.name,
          task_id,
          account_id,
          connection_id,
          tenant_id: Number(task.tenant_id),
          platform_data: { note_id: item.id, name: item.name },
        }));
        await this.prisma.messages.createMany({ data });
      };

      let foundEnoughUsers = false;
      let noMoreUsers = false;
      let scrollCount = 100;

      while (!foundEnoughUsers && !noMoreUsers) {
        const { unUsedIds, noMoreUsers: isNoMoreUsers } = await getUnUsedIds();
        noMoreUsers = isNoMoreUsers;

        if (unUsedIds.length >= need_send_count) {
          foundEnoughUsers = true;
          await createMessages(unUsedIds.slice(0, need_send_count));
          await this.taskUtilService.updateTaskStatus({ task_id, status: 'COMPLETED_SEARCH' });
        } else if (noMoreUsers || scrollCount <= 0) {
          await createMessages(unUsedIds);
          await this.taskUtilService.updateTaskStatus({ task_id, status: 'PARTIAL_COMPLETED_SEARCH' });
          break;
        } else {
          await page.evaluate(() => window.scrollBy(0, window.innerHeight));
          await sleep(2000);
          scrollCount -= 1;
        }
      }

      await browser.close();
    } catch (error: any) {
      await browser.close();

      const failed_reason = error?.message || '未知错误';
      const currentTask = await this.prisma.tasks.findUniqueOrThrow({
        where: { id: task_id },
      });

      await this.taskUtilService.updateTaskStatus({
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
      name: '笔记',
      delay: 3,
      selector: 'div.inner',
    });

    await page.keyboard.type(content);

    await Click({
      page,
      name: '提交按钮',
      delay: 3,
      selector: '#noteContainer > div.interaction-container > div.interactions.engage-bar > div > div > div.bottom > div > div.right-btn-area > button.btn.submit',
    });
  }
}
