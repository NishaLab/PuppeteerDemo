import puppeteer from "puppeteer";
import jsonfile from "jsonfile";
(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://truyenyy.pro/auth/betatruyen/");
  await page.setViewport({ width: 1980, height: 1024 });
  const betaButtonSelector = ".weui-btn";
  await page.waitForSelector(betaButtonSelector);
  await page.click(betaButtonSelector);
  await page.waitForNavigation();
  await page.waitForSelector(".genre");
  const cookies = await page.cookies();

  jsonfile.writeFile("cookies.json", cookies, { spaces: 2 }, function (err) {
    if (err) {
      console.log("The file could not be written.", err);
    }
    console.log("Session has been successfully saved");
  });

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
