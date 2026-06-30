const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    recordVideo: {
      dir: './videos/',
      size: { width: 1280, height: 720 }
    }
  });
  const page = await context.newPage();
  console.log("Navigating...");
  await page.goto('http://localhost:3000/designwebsite/template7/360-degree-interior');
  console.log("Waiting for animations...");
  await page.waitForTimeout(10000); // wait for 10 seconds to capture swaps
  await context.close();
  await browser.close();
  console.log("Done. Video saved in ./videos/");
})();
