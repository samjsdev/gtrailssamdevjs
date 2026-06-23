const fs = require('fs');

const file = 'app/private/admin/edit/[slug]/schemas.ts';
let content = fs.readFileSync(file, 'utf8');

const template1Schema = `
  template1: {
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
              { type: 'image', label: 'Hero Background Image', imageConfig: { arrayKey: 'clinicImages', index: 0 } },
              { type: 'text', label: 'Contact Phone', path: ['clinic', 'contact', 'phone'] }
            ]
          },
          {
            label: "Services Section",
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
  },
`;

content = content.replace(/template1:\s*\{\s*pages:\s*SHARED_PAGES\s*\},\n/, template1Schema);
fs.writeFileSync(file, content);
console.log("Updated template1 schema");
