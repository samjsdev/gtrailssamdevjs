const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const LOCAL_DATA_FILE = path.join(__dirname, 'data', 'navaneeth-interiors', 'source.json');
const mockData = JSON.parse(fs.readFileSync(LOCAL_DATA_FILE, 'utf-8'));

function normalize(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function flattenTextData(obj, mockTextData = [], currentPath = []) {
  if (!obj) return mockTextData;
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const path = [...currentPath, key];
    if (typeof val === 'string' || typeof val === 'number') {
      const valStr = String(val).trim();
      if (valStr.length < 3) continue;
      if (valStr.startsWith('http://') || valStr.startsWith('https://')) continue;
      if (key === 'slug' || key === 'mapEmbedUrl') continue;
      mockTextData.push({ path, value: valStr });
    } else if (typeof val === 'object' && !Array.isArray(val)) {
      flattenTextData(val, mockTextData, path);
    }
  }
  return mockTextData;
}

const mockTextData = flattenTextData(mockData);

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = 'http://localhost:3000/designwebsite/template1/navaneeth-interiors';
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  const result = await page.evaluate(({ mockTextData }) => {
    function normalize(str) {
      if (!str) return '';
      return String(str).toLowerCase().replace(/[^a-z0-9]/g, '').trim();
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const logs = [];
    let textNode;
    while (textNode = walker.nextNode()) {
      const textContent = textNode.textContent.trim();
      if (!textContent || textContent.length < 3) continue;
      
      const normText = normalize(textContent);
      
      let matched = false;
      for (const item of mockTextData) {
        const normVal = normalize(item.value);
        if (!normVal || normVal.length < 3) continue;
        if (normText.includes(normVal)) {
          matched = true;
          logs.push(`MATCH: "${textContent}" with path ${item.path.join('.')}`);
        }
      }
      if (!matched) {
        logs.push(`NO MATCH: "${textContent}" (norm: ${normText})`);
      }
    }
    return logs;
  }, { mockTextData });

  console.log(result.slice(0, 50).join('\n'));
  await browser.close();
}

main();
