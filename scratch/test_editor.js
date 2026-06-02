const { chromium } = require('playwright');

async function testEditor() {
  console.log('🚀 Launching headless chromium browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Log all console errors or logs from the page
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`❌ PAGE ERROR: "${msg.text()}"`);
    } else {
      console.log(`INFO: [Page Console] ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    console.log(`❌ PAGE UNCAUGHT EXCEPTION: ${err.message}`);
  });

  try {
    const url = 'http://localhost:3000/private/admin/edit/navaneeth-interiors';
    console.log(`🌐 Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    console.log('✅ Page loaded successfully!');

    // Wait a brief moment to ensure JS executes
    await page.waitForTimeout(2000);

    // Let's check the title of the page
    const title = await page.title();
    console.log(`📄 Page Title: "${title}"`);

    // Let's check if the Editor heading is present
    const headingText = await page.locator('h1').textContent();
    console.log(`🏷️ Heading text: "${headingText?.trim()}"`);

    // Let's check if there are section buttons rendered based on the parsed schema!
    const sectionCount = await page.locator('aside button').count();
    console.log(`📂 Number of section buttons in sidebar: ${sectionCount}`);

    // Log the text of the section buttons to verify it loaded schemas correctly
    for (let i = 0; i < sectionCount; i++) {
      const text = await page.locator('aside button').nth(i).textContent();
      console.log(`   👉 Button ${i + 1}: ${text?.replace(/\s+/g, ' ').trim()}`);
    }

    // Let's verify the scope dropdown includes templates
    const scopes = await page.locator('select').first().locator('option').allTextContents();
    console.log(`⚙️ Available Scopes in dropdown:`, scopes);

    // Let's verify if the canvas preview sections are rendering
    const previewSections = await page.locator('.bg-white > div[class*="cursor-pointer"]').count();
    console.log(`🖥️ Number of preview sections in canvas: ${previewSections}`);

    for (let i = 0; i < previewSections; i++) {
      const title = await page.locator('.bg-white > div[class*="cursor-pointer"] h4').nth(i).textContent();
      console.log(`   🖥️ Canvas Section ${i + 1}: ${title?.trim()}`);
    }

  } catch (err) {
    console.error('❌ Test failed with error:', err);
  } finally {
    await browser.close();
    console.log('🧹 Browser closed.');
  }
}

testEditor();
