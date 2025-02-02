import puppeteer from 'puppeteer';
const isProduction = process.env.NODE_ENV === 'production';

export const creatBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: isProduction,
    devtools: !isProduction,
    slowMo: isProduction ? 0 : 250,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled', '--as-browser'],
    ignoreDefaultArgs: ['--enable-automation'],
  });

  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: 1800, height: 1300 });

  return {
    browser,
    page,
  };
};
