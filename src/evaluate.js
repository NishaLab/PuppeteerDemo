// Import puppeteer
import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: false
  });

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto('https://developer.chrome.com/');

  // Evaluate JavaScript
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
    return;
  });
  await page.screenshot({ path: 'evaluate.png' })
  // Close browser.
  await browser.close();
})();
