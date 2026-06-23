const fs = require('fs');

const file = 'app/private/admin/edit/[slug]/schemas.ts';
let content = fs.readFileSync(file, 'utf8');

const t1Schema = `  template1: {
    pages: [
      {
        id: 'home',
        label: "Home Page",
        sections: [
          {
            label: "Hero Section",
            elements: [
              { type: 'text', label: 'Studio Name', path: ['clinic', 'name'] },
              { type: 'text', label: 'Hero Line 1', path: ['hero', 'line1'] },
              { type: 'text', label: 'Hero Line 2', path: ['hero', 'line2'] },
              { type: 'text', label: 'Hero Line 3', path: ['hero', 'line3'] },
              { type: 'textarea', label: 'Studio Description', path: ['clinic', 'description'] },
              { type: 'image', label: 'Hero Background Image', imageConfig: { arrayKey: 'clinicImages', index: 0 } },
              { type: 'text', label: 'Contact Phone', path: ['clinic', 'contact', 'phone'] }
            ]
          },
          {
            label: "Services Slider",
            elements: [
              { type: 'list', label: 'Services List', path: ['business', 'services'] }
            ]
          },
          {
            label: "Why Choose Us",
            elements: [
              { type: 'list', label: 'Key Highlights', path: ['business', 'highlights'] }
            ]
          },
          {
            label: "About Us Section",
            elements: [
              { type: 'text', label: 'Principal Designer Name', path: ['doctor', 'name'] },
              { type: 'text', label: 'Specialization', path: ['doctor', 'specialization'] },
              { type: 'textarea', label: 'Designer Bio', path: ['doctor', 'bio'] },
              { type: 'image', label: 'Designer Portrait', imageConfig: { arrayKey: 'otherImages', index: 0 } }
            ]
          },
          {
            label: "Contact & Footer",
            elements: [
              { type: 'textarea', label: 'Full Address', path: ['clinic', 'address', 'full'] },
              { type: 'text', label: 'Contact Phone', path: ['clinic', 'contact', 'phone'] }
            ]
          }
        ]
      }
    ]
  },`;

// Replace template1 section
content = content.replace(/template1:\s*\{[\s\S]*?(?=template2:)/, t1Schema + '\n  ');
fs.writeFileSync(file, content);
console.log("Patched template1 schema");
