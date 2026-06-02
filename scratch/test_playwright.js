const { chromium } = require('playwright');

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  console.log('Navigating to local page...');
  await page.goto('http://localhost:3000/designwebsite/template1/navaneeth-interiors');
  const title = await page.title();
  console.log(`Page title: ${title}`);
  await browser.close();
  console.log('Success!');
}

run().catch(err => {
  console.error('Playwright failed:', err);
  process.exit(1);
});
