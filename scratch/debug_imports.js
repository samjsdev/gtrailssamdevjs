const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'app', 'designwebsite', 'template1', '[slug]', 'page.tsx');
const content = fs.readFileSync(file, 'utf8');

const importRegex = /import\s+((?:(?!import)[\s\S])*?)\s+from\s+['"]([^'"]+)['"]/g;
let match;

console.log('Scanning imports with negative lookahead:');
while ((match = importRegex.exec(content)) !== null) {
  const importClause = match[1].trim();
  const importPath = match[2];
  if (!importPath.startsWith('./') && !importPath.startsWith('../')) continue;

  console.log('---');
  console.log('Matched line:', match[0]);
  console.log('importClause:', JSON.stringify(importClause));
  console.log('importPath:', JSON.stringify(importPath));
}
