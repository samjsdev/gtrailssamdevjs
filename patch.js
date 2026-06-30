const fs = require('fs');
const file = 'app/designwebsite/template7/[slug]/components/Hero/Hero.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /style=\{isReady \? \{ transition: 'all 1000ms ease-in-out, z-index 0ms' \} : \{\}\}/g,
  "style={isReady ? (posIndex === 0 ? { transition: 'none' } : { transition: 'all 1000ms ease-in-out, z-index 0ms' }) : {}}"
);
content = content.replace(
  /style=\{isReady \? \{ transition: 'all 1000ms ease-in-out' \} : \{\}\}/g,
  "style={isReady ? (posIndex === 0 ? { transition: 'none' } : { transition: 'all 1000ms ease-in-out' }) : {}}"
);

fs.writeFileSync(file, content);
console.log("Patched");
