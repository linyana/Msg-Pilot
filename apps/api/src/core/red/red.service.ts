import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRedDto } from './dto/create-red.dto';
import { UpdateRedDto } from './dto/update-red.dto';
import puppeteer from 'puppeteer';
import { sleep } from 'src/utils';

@Injectable()
export class RedService {
  constructor() {
    // this.init();
  }

  async init() {
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

      const response = await page.goto('https://www.xiaohongshu.com', {
        waitUntil: 'domcontentloaded',
      });

      if (!response) {
        console.log(`create page error`);
      }

      const searchInput = await page.waitForSelector('#search-input');
      if (!searchInput) {
        throw new BadRequestException("Can't find search input");
      }

      await searchInput?.focus();
      await searchInput.type('程序员');

      const searchButton = await page.waitForSelector('#global > div.header-container > header > div.input-box > div > div.search-icon');

      if (!searchButton) {
        throw new BadRequestException("Can't find search button");
      }

      searchButton.click();
      await sleep(3000);
      const article = await page.waitForSelector('#global > div.main-container > div.with-side-bar.main-content > div > div.feeds-container > section:nth-child(1) > div > a.cover.ld.mask');

      if (!article) {
        throw new BadRequestException("Can't find search button");
      }

      article.click();

      await sleep(3000);
      const commentButton = await page.waitForSelector('div.inner');

      if (!commentButton) {
        throw new BadRequestException("Can't find search button");
      }

      commentButton.click();
      await sleep(2000);
      await page.keyboard.type('文章写的不错');

      const submitButton = await page.waitForSelector('#noteContainer > div.interaction-container > div.interactions.engage-bar > div > div > div.bottom > div > div.right-btn-area > button.btn.submit');

      if (!submitButton) {
        throw new BadRequestException("Can't find search button");
      }

      submitButton.click();
    } catch (error) {
      console.log(error);
    }
  }

  create(createRedDto: CreateRedDto) {
    return 'This action adds a new red';
  }

  findAll() {
    return `This action returns all red`;
  }

  findOne(id: number) {
    return `This action returns a #${id} red`;
  }

  update(id: number, updateRedDto: UpdateRedDto) {
    return `This action updates a #${id} red`;
  }

  remove(id: number) {
    return `This action removes a #${id} red`;
  }
}
