const fs = require('fs');

const file = 'app/private/admin/edit/[slug]/schemas.ts';
let content = fs.readFileSync(file, 'utf8');

const t2Schema = `  template2: {
    pages: [
      {
        id: 'home',
        label: "Home Page",
        sections: [
          {
            label: "Hero Section",
            elements: [
              { type: 'text', label: 'Studio Name', path: ['clinic', 'name'] },
              { type: 'text', label: 'Hero Tagline', path: ['clinic', 'tagline'] },
              { type: 'textarea', label: 'Studio Description', path: ['clinic', 'description'] },
              { type: 'image', label: 'Hero Background Image', imageConfig: { arrayKey: 'clinicImages', index: 0 } }
            ]
          },
          {
            label: "Who We Are",
            elements: [
              { type: 'text', label: 'Years Experience', path: ['doctor', 'experience'] },
              { type: 'text', label: 'Designer Name', path: ['doctor', 'name'] },
              { type: 'textarea', label: 'Bio / Who We Are Text', path: ['doctor', 'bio'] },
              { type: 'image', label: 'Portrait Image', imageConfig: { arrayKey: 'otherImages', index: 0 } }
            ]
          },
          {
            label: "Design Philosophy",
            elements: [
              { type: 'text', label: 'Philosophy Title', path: ['philosophy', 'title'] },
              { type: 'textarea', label: 'Philosophy Description', path: ['philosophy', 'description'] },
              { type: 'image', label: 'Philosophy Large Image', imageConfig: { arrayKey: 'clinicImages', index: 0 } }
            ]
          },
          {
            label: "Services Preview",
            elements: [
              { type: 'list', label: 'Services List', path: ['business', 'services'] }
            ]
          },
          {
            label: "Luxe Benefits",
            elements: [
              { type: 'list', label: 'Highlights/Benefits', path: ['business', 'highlights'] }
            ]
          },
          {
            label: "Contact & Footer",
            elements: [
              { type: 'text', label: 'Contact Phone', path: ['clinic', 'contact', 'phone'] }
            ]
          }
        ]
      }
    ]
  },`;

content = content.replace(/template2:\s*\{[\s\S]*?(?=template3:)/, t2Schema + '\n  ');
fs.writeFileSync(file, content);
console.log("Patched template2 schema");
