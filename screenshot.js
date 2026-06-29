const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/designwebsite/template8/360-degree-interior');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'shot1.png' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'shot2.png' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'shot3.png' });
  await browser.close();
})();
