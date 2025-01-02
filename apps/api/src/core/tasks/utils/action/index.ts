import { BadRequestException } from '@nestjs/common';
import { Page } from 'puppeteer';
import { sleep } from 'src/utils';

export const Type = async (params: { page: Page; content: string; name: string; selector: string; delay?: number }) => {
  const { page, content, selector, name, delay } = params;

  const searchInput = await page.waitForSelector(selector);
  if (!searchInput) {
    throw new BadRequestException(`Can't find search input:  ${name}`);
  }

  await searchInput?.focus();
  await searchInput.type(content);

  if (delay) {
    await sleep(delay * 1000);
  }
};

export const Click = async (params: { page: Page; name: string; selector: string; delay?: number }) => {
  const { page, selector, name, delay } = params;

  const searchButton = await page.waitForSelector(selector);

  if (!searchButton) {
    throw new BadRequestException(`Can't find search button: ${name}`);
  }

  searchButton.click();

  if (delay) {
    await sleep(delay * 1000);
  }
};
