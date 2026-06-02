const { chromium } = require('playwright');

async function testEditorNodes() {
  console.log('🚀 Launching headless chromium browser to inspect editable image elements...');
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

    console.log('✅ Editor page loaded.');

    // Select Template 1
    console.log('🔄 Selecting "Template 1"...');
    await page.locator('select').first().selectOption('template1');
    await page.waitForTimeout(1000);

    let sectionCount = await page.locator('.bg-white > div[class*="cursor-pointer"]').count();
    console.log(`📂 [Template 1] Total sections: ${sectionCount}`);
    for (let i = 0; i < sectionCount; i++) {
      const text = await page.locator('.bg-white > div[class*="cursor-pointer"] h4').nth(i).textContent();
      console.log(`   Section ${i + 1}: ${text?.trim()}`);
    }

    // 1. Inspect elements inside "Section 1: Hero Intro Banner"
    console.log('🔍 [Template 1] Inspecting Section 1 (Hero) elements...');
    const sec1 = page.locator('.bg-white > div[class*="cursor-pointer"]').nth(0);
    await sec1.click();
    await page.waitForTimeout(500);

    const sec1BtnCount = await sec1.locator('button').count();
    console.log(`   👉 Total editable nodes in Hero: ${sec1BtnCount}`);
    for (let i = 0; i < sec1BtnCount; i++) {
      const btn = sec1.locator('button').nth(i);
      const type = await btn.locator('p').first().textContent();
      const label = await btn.locator('p').nth(1).textContent();
      console.log(`      Node ${i + 1}: [Type: ${type}] - Label: "${label}"`);
    }

    // Select Template 10
    console.log('\n🔄 Selecting "Template 10"...');
    await page.locator('select').first().selectOption('template10');
    await page.waitForTimeout(1000);

    sectionCount = await page.locator('.bg-white > div[class*="cursor-pointer"]').count();
    console.log(`📂 [Template 10] Total sections: ${sectionCount}`);
    for (let i = 0; i < sectionCount; i++) {
      const text = await page.locator('.bg-white > div[class*="cursor-pointer"] h4').nth(i).textContent();
      console.log(`   Section ${i + 1}: ${text?.trim()}`);
    }

    // Inspect elements inside "Section 1: Hero Section" in Template 10
    console.log('🔍 [Template 10] Inspecting Section 1 (Hero Section) elements...');
    const t10sec1 = page.locator('.bg-white > div[class*="cursor-pointer"]').nth(0);
    await t10sec1.click();
    await page.waitForTimeout(500);

    const t10sec1BtnCount = await t10sec1.locator('button').count();
    console.log(`   👉 Total editable nodes in Hero Section: ${t10sec1BtnCount}`);
    for (let i = 0; i < t10sec1BtnCount; i++) {
      const btn = t10sec1.locator('button').nth(i);
      const type = await btn.locator('p').first().textContent();
      const label = await btn.locator('p').nth(1).textContent();
      console.log(`      Node ${i + 1}: [Type: ${type}] - Label: "${label}"`);
    }

    // Inspect elements inside "Section 3: About Section" in Template 10
    console.log('🔍 [Template 10] Inspecting Section 3 (About Section) elements...');
    const t10sec3 = page.locator('.bg-white > div[class*="cursor-pointer"]').nth(2);
    await t10sec3.click();
    await page.waitForTimeout(500);

    const t10sec3BtnCount = await t10sec3.locator('button').count();
    console.log(`   👉 Total editable nodes in About Section: ${t10sec3BtnCount}`);
    for (let i = 0; i < t10sec3BtnCount; i++) {
      const btn = t10sec3.locator('button').nth(i);
      const type = await btn.locator('p').first().textContent();
      const label = await btn.locator('p').nth(1).textContent();
      console.log(`      Node ${i + 1}: [Type: ${type}] - Label: "${label}"`);
    }

  } catch (err) {
    console.error('❌ Nodes validation test failed:', err);
  } finally {
    await browser.close();
    console.log('🧹 Browser closed.');
  }
}

testEditorNodes();
