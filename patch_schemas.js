const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'app/private/admin/edit/[slug]/schemas.ts');
let content = fs.readFileSync(file, 'utf8');
const searchStr = 'export const TEMPLATE_SCHEMAS: Record<string, TemplateSchema> = {';
const index = content.indexOf(searchStr);
if (index !== -1) {
  content = content.substring(0, index) + `export const TEMPLATE_SCHEMAS: Record<string, TemplateSchema> = {
  template1: { pages: SHARED_PAGES },
  template2: { pages: SHARED_PAGES },
  template3: { pages: SHARED_PAGES },
  template4: { pages: SHARED_PAGES },
  template6: { pages: SHARED_PAGES },
  template7: { pages: SHARED_PAGES },
  template10: { pages: SHARED_PAGES },
  base: { pages: SHARED_PAGES }
};
`;
  fs.writeFileSync(file, content, 'utf8');
  console.log("Patched schemas.ts successfully.");
} else {
  console.log("Could not find TEMPLATE_SCHEMAS in schemas.ts");
}
