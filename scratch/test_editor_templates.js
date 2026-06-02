const { chromium } = require('playwright');

async function testEditorTemplates() {
  console.log('🚀 Launching headless chromium browser for multi-template validation...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`❌ PAGE ERROR: "${msg.text()}"`);
    }
  });

  page.on('pageerror', err => {
    console.log(`❌ PAGE UNCAUGHT EXCEPTION: ${err.message}`);
  });

  try {
    const url = 'http://localhost:3000/private/admin/edit/navaneeth-interiors';
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    console.log('✅ Base editor page loaded.');

    // 1. Let's check the default scope selected in the scope dropdown.
    const initialScopeValue = await page.locator('select').first().inputValue();
    console.log(`ℹ️ Initial Scope dropdown selected value: "${initialScopeValue}"`);

    // Let's change the scope to 'template1'
    console.log('🔄 Selecting "Template 1"...');
    await page.locator('select').first().selectOption('template1');
    await page.waitForTimeout(1000);

    let sectionCount = await page.locator('.bg-white > div[class*="cursor-pointer"]').count();
    console.log(`   👉 Template 1 section count: ${sectionCount}`);
    for (let i = 0; i < sectionCount; i++) {
      const text = await page.locator('.bg-white > div[class*="cursor-pointer"] h4').nth(i).textContent();
      console.log(`      Section ${i + 1}: ${text?.trim()}`);
    }

    // Let's change the scope to 'template3'
    console.log('🔄 Selecting "Template 3"...');
    await page.locator('select').first().selectOption('template3');
    await page.waitForTimeout(1000);

    sectionCount = await page.locator('.bg-white > div[class*="cursor-pointer"]').count();
    console.log(`   👉 Template 3 section count: ${sectionCount}`);
    for (let i = 0; i < sectionCount; i++) {
      const text = await page.locator('.bg-white > div[class*="cursor-pointer"] h4').nth(i).textContent();
      console.log(`      Section ${i + 1}: ${text?.trim()}`);
    }

    // Let's change the page dropdown to 'About Page' in Template 3
    console.log('🔄 Selecting "About Page" for Template 3...');
    await page.locator('select').nth(1).selectOption('about');
    await page.waitForTimeout(1000);

    sectionCount = await page.locator('.bg-white > div[class*="cursor-pointer"]').count();
    console.log(`   👉 Template 3 (About Page) section count: ${sectionCount}`);
    for (let i = 0; i < sectionCount; i++) {
      const text = await page.locator('.bg-white > div[class*="cursor-pointer"] h4').nth(i).textContent();
      console.log(`      Section ${i + 1}: ${text?.trim()}`);
    }

    // Let's check how many input / textarea / image elements are inside Section 1 (Story & Vision)
    // Click on Section 1
    console.log('🔄 Inspecting elements in Section 1...');
    await page.locator('.bg-white > div[class*="cursor-pointer"]').nth(0).click();
    await page.waitForTimeout(500);

    // Get input and textarea values or elements in section 1
    const elementCount = await page.locator('.bg-white > div[class*="cursor-pointer"]').nth(0).locator('button').count();
    console.log(`   👉 Number of editable nodes in Section 1: ${elementCount}`);
    for (let i = 0; i < elementCount; i++) {
      const elementBtn = page.locator('.bg-white > div[class*="cursor-pointer"]').nth(0).locator('button').nth(i);
      const type = await elementBtn.locator('p').first().textContent();
      const label = await elementBtn.locator('p').nth(1).textContent();
      console.log(`      Node ${i + 1}: [Type: ${type}] - Label: "${label}"`);
    }

  } catch (err) {
    console.error('❌ Template validation test failed:', err);
  } finally {
    await browser.close();
    console.log('🧹 Browser closed.');
  }
}

testEditorTemplates();
