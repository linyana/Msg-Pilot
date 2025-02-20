import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTaskService } from '../base.service';
import { Click, creatBrowser, Type } from '../../utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { IRedMessagePlatformDataType, ITaskDataType } from '../../types';
import { TaskUtilService } from '../utils.service';
import { Page } from 'puppeteer';
import { sleep } from 'src/utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class RedTaskService extends BaseTaskService {
  constructor(private prisma: PrismaService, private taskUtilService: TaskUtilService) {
    super();
  }

  url = 'https://www.xiaohongshu.com';

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

    const count = task.expect_count - task.sent_count;

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
            last_expired_at: new Date(),
            status: 'EXPIRED',
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

      const response = await page.goto(this.url, {
        waitUntil: 'domcontentloaded',
      });

      if (!response) {
        throw new BadRequestException(`创建浏览器失败`);
      }

      const data = task.data as ITaskDataType;

      const hasLoginButton = await page.evaluate(() => {
        return document.querySelector('#login-btn');
      });

      if (hasLoginButton) {
        throw new BadRequestException('账号授权已过期');
      }

      const content = data.content[0] || '';

      const messages = await this.prisma.messages.findMany({
        where: {
          task_id,
          status: {
            in: ['FAILED', 'NOT_START'],
          },
        },
      });

      const captcha = await page.evaluate(() => {
        return document.querySelector('#red-captcha');
      });

      if (captcha) {
        await sleep(10000);
        await this.taskUtilService.updateTaskStatus({
          task_id,
          status: 'FAILED',
          failed_reason: '发送频繁，需要验证',
        });
        await browser.close();
        return;
      }

      for (const message of messages) {
        try {
          await this.handleMessage({
            page,
            content,
            message_id: Number(message.id),
          });
        } catch (error) {
          console.log(error);
        }
      }

      await this.taskUtilService.handleCompleteTask({
        task_id,
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

    const messages = await this.prisma.messages.findMany({
      where: {
        task_id,
      },
    });

    const need_send_count = task.expect_count - messages.length;

    if (!need_send_count) {
      await this.handleTask({
        task_id,
        account_id,
      });
      return;
    }

    const { browser, page } = await creatBrowser();

    try {
      if (!account.cookie) {
        await this.prisma.accounts.update({
          where: { id: account_id },
          data: {
            last_expired_at: new Date(),
            status: 'EXPIRED',
          },
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

      const response = await page.goto(this.url, { waitUntil: 'domcontentloaded' });
      if (!response) throw new BadRequestException('创建浏览器失败');

      const hasLoginButton = await page.evaluate(() => document.querySelector('#login-btn'));
      if (hasLoginButton) {
        await this.prisma.accounts.update({
          where: { id: account_id },
          data: {
            last_expired_at: new Date(),
            status: 'EXPIRED',
          },
        });
        throw new BadRequestException('账号授权已过期');
      }

      const filter = (task.data as ITaskDataType)?.filter[0];

      await this.prisma.accounts.update({
        where: { id: account_id },
        data: { status: 'ACTIVE' },
      });

      if (filter !== '') {
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
      }

      const createMessages = async (usersToSend: IRedMessagePlatformDataType[]) => {
        const data: Prisma.messagesCreateManyInput[] = usersToSend.map((item) => ({
          platform_unit_id: item.id,
          platform_name: item.name,
          task_id,
          account_id,
          connection_id,
          tenant_id: Number(task.tenant_id),
          platform_data: {
            note_id: item.id,
            name: item.name,
            note_image: item.note_image,
            author_name: item.author_name,
            author_image: item.author_image,
            href: item.href,
          },
        }));

        await this.prisma.messages.createMany({ data });
        await this.updateMessagesCount({
          task_id,
        });
      };

      let noteIds: IRedMessagePlatformDataType[] = [];

      const usedNoteIds = await this.prisma.messages.findMany({
        where: { account_id },
        select: { platform_unit_id: true },
      });

      const usedIdsSet = new Set(usedNoteIds.map((item) => item.platform_unit_id));
      let lastNoteId: string | null = null;

      const getUnUsedIds = async () => {
        await sleep(3000);

        const newNoteIds = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('section.note-item > div'))
            .map((container) => {
              try {
                const anchor = container.querySelector('a.cover') as HTMLAnchorElement;
                const id = anchor ? new URL(anchor.href).pathname.split('/')[2] : '';
                const name = container.querySelector('a.title span')?.textContent?.trim() || '';
                const note_image = container.querySelector('a.cover img')?.getAttribute('src') || '';
                const authorElement = container.querySelector('.author-wrapper .author');
                const author_name = authorElement?.querySelector('.name')?.textContent?.trim() || '';
                const author_image = authorElement?.querySelector('.author-avatar')?.getAttribute('src') || '';
                const href = anchor.href;
                return { id, name, note_image, author_name, author_image, href };
              } catch (error) {
                return { id: '', name: '', note_image: '', author_name: '', author_image: '', href: '' };
              }
            })
            ?.filter((item) => item.id);
        });

        const uniqueNewNoteIds = Array.from(new Map(newNoteIds.map((item) => [item.id, item])).values());
        const newUsefulIds = uniqueNewNoteIds.filter((item) => !usedIdsSet.has(item.id));
        const newLastNoteId = newNoteIds[newNoteIds.length - 1]?.id;
        let hasNewFoundNotes = true;
        if (lastNoteId === newLastNoteId) {
          hasNewFoundNotes = false;
        } else {
          lastNoteId = newLastNoteId;
        }

        noteIds = [...noteIds, ...newUsefulIds.filter((item) => !noteIds.some((existing) => existing.id === item.id))];
        const unUsedIds = noteIds.filter((item) => !usedIdsSet.has(item.id));

        return { unUsedIds, hasNewFoundNotes };
      };

      let scrollCount = 0;
      let refreshCount = 0;
      let preNoteIds = 0;

      while (true) {
        const { unUsedIds, hasNewFoundNotes } = await getUnUsedIds();

        if (unUsedIds.length >= need_send_count) {
          await createMessages(unUsedIds.slice(0, need_send_count));
          break;
        }

        if (hasNewFoundNotes) scrollCount = 0;
        if (preNoteIds !== unUsedIds.length) refreshCount = 0;

        preNoteIds = unUsedIds.length;

        if (scrollCount >= 5) {
          if (refreshCount >= 2) {
            await createMessages(unUsedIds.slice(0, need_send_count));
            break;
          } else {
            await page.reload();
            refreshCount += 1;
            scrollCount = 0;
            continue;
          }
        }

        scrollCount += 1;
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      }

      await browser.close();
    } catch (error: any) {
      console.log(error);
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

    await this.handleTask({
      task_id,
      account_id,
    });
  }

  async updateMessagesCount(params: { task_id: number }) {
    const { task_id } = params;

    const messageCount = await this.prisma.messages.count({
      where: {
        task_id,
      },
    });
    await this.prisma.tasks.update({
      where: {
        id: task_id,
      },
      data: {
        found_count: messageCount,
      },
    });
  }

  async sendComment(params: { page: Page; content: string }) {
    const { page, content } = params;

    await sleep(3000);
    await Click({
      page,
      name: '笔记',
      delay: 3,
      selector: 'div.inner',
    });

    await page.keyboard.type(content);
    await sleep(5 * 1000);
    await Click({
      page,
      name: '提交按钮',
      delay: 3,
      selector: '#noteContainer > div.interaction-container > div.interactions.engage-bar > div > div > div.bottom > div > div.right-btn-area > button.btn.submit',
    });
  }

  handleMessage = async (params: { page: Page; content: string; message_id: number }) => {
    const { page, content, message_id } = params;
    const message = await this.prisma.messages.findUnique({
      where: {
        id: message_id,
      },
    });

    if (!message) {
      throw new BadRequestException("Can't find this message");
    }
    if (message.status === 'COMPLETED') {
      return;
    }

    await this.prisma.messages.update({
      where: {
        id: message_id,
      },
      data: {
        status: 'RUNNING',
      },
    });

    try {
      await this.prisma.messages.update({
        where: {
          id: message_id,
        },
        data: {
          status: 'RUNNING',
        },
      });

      const response = await page.goto((message.platform_data as any)?.href, {
        waitUntil: 'domcontentloaded',
      });

      if (!response) {
        throw new BadRequestException(`创建浏览器失败`);
      }

      await this.sendComment({
        page,
        content,
      });

      await this.prisma.messages.update({
        where: {
          id: message_id,
        },
        data: {
          status: 'COMPLETED',
          failed_reason: '',
        },
      });

      await this.taskUtilService.updateTaskStatus({
        task_id: Number(message.task_id),
        sent_count: 1,
      });
    } catch (error: any) {
      await this.prisma.messages.update({
        where: {
          id: message_id,
        },
        data: {
          status: 'FAILED',
          failed_reason: error?.message || 'Unknown Error',
        },
      });
    }
  };
}
