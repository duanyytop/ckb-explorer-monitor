"use strict";

const puppeteer = require("puppeteer");
const Status = [200, 301, 302];

const monitor = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("response", response => {
    if (!Status.includes(response.status())) {
      console.error(`Http url ${response.url()} and response status: ${response.status()}`);
    }
  });

  await page.goto("https://explorer.nervos.org/aggron");
  await page.goto("https://explorer.nervos.org/aggron/nervosdao");
  await page.goto("https://explorer.nervos.org/aggron/charts");
  await browser.close();
};

(async () => {
  while (true) {
    await monitor();
  }
})();
