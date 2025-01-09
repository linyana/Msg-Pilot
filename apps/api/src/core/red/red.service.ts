import { BadRequestException, Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { sleep } from 'src/utils';

@Injectable()
export class RedService {
  constructor() {
    // this.init();
  }

  async createTask(body: any) {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        slowMo: 250,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled', '--as-browser'],
        ignoreDefaultArgs: ['--enable-automation'],
      });
      const context = await browser.createIncognitoBrowserContext();
      const page = await context.newPage();
      await page.setViewport({ width: 1800, height: 1300 });

      const rawCookie = `a1=193a29032aekxyms6q3ivbyx2f8mfhbogxkdndbv050000196898; webId=d2803f2d26e3c89f040ecebef8987251; unread={%22ub%22:%22673b406000000000020385e1%22%2C%22ue%22:%226730799f000000001b0120d3%22%2C%22uc%22:23}; websectiga=9730ffafd96f2d09dc024760e253af6ab1feb0002827740b95a255ddf6847fc8; sec_poison_id=54a496d3-3a9d-4300-a8ad-03dfeb0f36da; xsecappid=xhs-pc-web; web_session=040069b7f7be9d3fc37843e961354b40910522`;

      const cookies = rawCookie.split('; ').map((item) => {
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

      await page.goto('https://www.xiaohongshu.com', {
        waitUntil: 'domcontentloaded',
      });

      const searchInput = await page.waitForSelector('#search-input');
      if (!searchInput) {
        throw new BadRequestException('找不到筛选输入框');
      }

      await searchInput?.focus();
      await searchInput.type(body.filter);

      const searchButton = await page.waitForSelector('#global > div.header-container > header > div.input-box > div > div.search-icon');

      if (!searchButton) {
        throw new BadRequestException('找不到搜索按钮');
      }

      searchButton.click();
      await sleep(3000);
      const article = await page.waitForSelector('#global > div.main-container > div.with-side-bar.main-content > div > div.feeds-container > section:nth-child(1) > div > a.cover.ld.mask');

      if (!article) {
        throw new BadRequestException('找不到笔记');
      }

      article.click();

      await sleep(3000);
      const commentButton = await page.waitForSelector('div.inner');

      if (!commentButton) {
        throw new BadRequestException('找不到评论按钮');
      }

      commentButton.click();
      await sleep(2000);
      await page.keyboard.type(body.content);

      const submitButton = await page.waitForSelector('#noteContainer > div.interaction-container > div.interactions.engage-bar > div > div > div.bottom > div > div.right-btn-area > button.btn.submit');

      if (!submitButton) {
        throw new BadRequestException('找不到发送按钮');
      }

      submitButton.click();
      await browser.close();
    } catch (error) {
      console.log(error);
    }
  }
}
