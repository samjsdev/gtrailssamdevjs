const fs = require('fs');
const path = './app/private/admin/edit/[slug]/page.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(
  'const SHARED_PAGES = [',
  `const SHARED_PAGES: {
  id: string;
  label: string;
  sections: {
    label: string;
    elements: (
      | { type: 'text' | 'textarea' | 'list'; label: string; path: string[]; imageConfig?: never }
      | { type: 'image'; label: string; path?: never; imageConfig: { arrayKey: 'clinicImages' | 'otherImages'; index: number } }
    )[];
  }[];
}[] = [`
);

fs.writeFileSync(path, code, 'utf8');
