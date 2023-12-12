import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://developer.chrome.com/');

  // Set screen size
  await page.setViewport({ width: 1980, height: 1024 });

  setTimeout(async () => {
    // Take screenshot

    await page.screenshot({ path: "chrome.png" })

    await browser.close();
  }, 4000);
})();
