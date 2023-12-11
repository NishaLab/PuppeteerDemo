import puppeteer, { Puppeteer } from 'puppeteer';

Puppeteer.registerCustomQueryHandler('getById', {
  queryOne: (elementOrDocument, selector) => {
    return elementOrDocument.querySelector(`[id="${CSS.escape(selector)}"]`);
  },

  queryAll: (elementOrDocument, selector) => {
    return elementOrDocument.querySelectorAll(`[id="${CSS.escape(selector)}"]`);
  },
});


(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://developer.chrome.com/');

  // Select with custom Selector
  const customSelector = await page.waitForSelector('::p-getById(customId)');

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();
