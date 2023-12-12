import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://truyenyy.pro/auth/betatruyen/');
  await page.setViewport({ width: 1980, height: 1024 });
  // const loginSelector = '.genre';
  // await page.waitForSelector(loginSelector)
  // await page.click(loginSelector)
  const betaButtonSelector = '.weui-btn'
  await page.waitForSelector(betaButtonSelector)
  await page.click(betaButtonSelector)
  await page.waitForNavigation()
  await page.waitForSelector('.genre')
  await page.screenshot({ path: "chrome.png" })
})();
