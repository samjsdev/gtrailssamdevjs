const fs = require('fs');

let script = fs.readFileSync('scripts/generate_template_schemas.js', 'utf8');

// Replace normalize function to be more robust
script = script.replace(/function normalize\(str\) {[\s\S]*?}/, `function normalize(str) {
  if (!str) return '';
  return String(str).toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}`);

// Add partial matching logic
script = script.replace(/if \(normText\.includes\(normVal\)\) {/, `if (normText.includes(normVal) || (normText.length > 15 && normVal.includes(normText))) {`);

fs.writeFileSync('scripts/generate_template_schemas.js', script);
console.log("Scraper patched for partial matching!");
