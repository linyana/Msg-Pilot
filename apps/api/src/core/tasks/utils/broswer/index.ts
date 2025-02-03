import puppeteer from 'puppeteer';

export const creatBrowser = async () => {
  console.log(process.env.NODE_ENV === 'production');

  const browser = await puppeteer.launch(
    process.env.NODE_ENV === 'production'
      ? {
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled', '--as-browser'],
          ignoreDefaultArgs: ['--enable-automation'],
        }
      : {
          headless: false,
          devtools: true,
          slowMo: 250,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled', '--as-browser'],
          ignoreDefaultArgs: ['--enable-automation'],
        },
  );

  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: 1800, height: 1300 });

  return {
    browser,
    page,
  };
};
