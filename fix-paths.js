const fs = require('fs');
const file = 'app/private/admin/edit/[slug]/schemas.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/path:\s*\[([^\]]*?),\s*(\d+),\s*([^\]]*?)\]/g, "path: [$1, '$2', $3]");
fs.writeFileSync(file, content);
