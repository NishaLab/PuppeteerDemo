import puppeteer from "puppeteer";
import jsonfile from "jsonfile";
(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  const file = 'cookies.json'
  const cookies = await jsonfile.readFile(file)
  await page.setCookie(...cookies)

  await page.goto("https://truyenyy.pro");
  await page.setViewport({ width: 1980, height: 1024 });
  await page.waitForSelector(".genre");
  await page.waitForSelector(".rbt-input-main");
  await page.type(".rbt-input-main", "quỷ bí chi chủ");
  await page.click(".rbt-input-main");

  const titleSelector = "text/Quỷ Bí Chi Chủ (Dịch-Full)";
  await page.waitForSelector(titleSelector);
  await page.click(titleSelector);

  await page.waitForSelector(".loaded");
  await page.click(".flex-primary");

  const newPagePromise = getNewPageWhenLoaded(browser);
  const newPage = await newPagePromise;
  await newPage.waitForFunction('document.querySelector(".d-flex.mb-2") === null')
  await newPage.screenshot({ path: "truyen.png", fullPage: true });
  await page.close();
  await newPage.close();
})();

const getNewPageWhenLoaded = async (browser) => {
  return new Promise((x) =>
    browser.on("targetcreated", async (target) => {
      if (target.type() === "page") {
        const newPage = await target.page();
        const newPagePromise = new Promise((y) =>
          newPage.once("domcontentloaded", () => y(newPage))
        );
        const isPageLoaded = await newPage.evaluate(() => document.readyState);
        return isPageLoaded.match("complete|interactive")
          ? x(newPage)
          : x(newPagePromise);
      }
    })
  );
};
