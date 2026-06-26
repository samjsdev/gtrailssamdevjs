const fs = require('fs');
const path = './app/private/admin/edit/[slug]/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// We want to replace the TEMPLATE_SCHEMAS definition to share the pages array.
// First, find where template1's pages array starts and ends.
const t1start = code.indexOf(`template1: {\n    pages: [`);
const t1endStr = `    ]\n  },\n  template2: {`;
const t1end = code.indexOf(t1endStr);

if (t1start > -1 && t1end > -1) {
  const pagesCode = code.substring(code.indexOf(`pages: [`, t1start) + 7, t1end + 5);
  
  // Cut out the rest of the schemas and replace with referencing the shared one.
  const schemaEnd = code.indexOf(`};\n\n// Curated stock library`);
  
  const headerCode = code.substring(0, t1start);
  const footerCode = code.substring(schemaEnd);
  
  const newSchemaCode = `
const SHARED_PAGES = ${pagesCode};

const TEMPLATE_SCHEMAS: Record<string, {
  pages: {
    id: string;
    label: string;
    sections: {
      label: string;
      elements: (
        | { type: 'text' | 'textarea' | 'list'; label: string; path: string[]; imageConfig?: never }
        | { type: 'image'; label: string; path?: never; imageConfig: { arrayKey: 'clinicImages' | 'otherImages'; index: number } }
      )[];
    }[];
  }[];
}> = {
  template1: { pages: SHARED_PAGES },
  template2: { pages: SHARED_PAGES },
  template3: { pages: SHARED_PAGES },
  template4: { pages: SHARED_PAGES },
  template6: { pages: SHARED_PAGES },
  template7: { pages: SHARED_PAGES },
  template10: { pages: SHARED_PAGES }
`;
  
  // Replace the whole schema definition
  const schemaStart = code.indexOf('const TEMPLATE_SCHEMAS:');
  const tempCode = code.substring(0, schemaStart) + newSchemaCode + footerCode;
  
  fs.writeFileSync(path, tempCode, 'utf8');
  console.log("Schema updated successfully!");
} else {
  console.log("Could not find boundaries.");
}
