"use strict";
const phantom = require("phantom");

const Status = [200, 301, 302];

const monitor = async () => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on("onResourceReceived", response => {
    if (!Status.includes(response.status)) {
      console.error(`Http url ${response.url} response status ${response.status}`);
    }
  });
  await page.open("https://explorer.nervos.org/aggron");
  await page.open("https://explorer.nervos.org/aggron/nervosdao");
  await page.open("https://explorer.nervos.org/aggron/charts");
  await instance.exit();
};

(async () => {
  while (true) {
    await monitor();
  }
})();
