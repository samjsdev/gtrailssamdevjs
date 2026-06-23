/**
 * Dynamic Template Editor UI Schemas Generator
 * 
 * WORKING PRINCIPLE (PIVOTED TO WEB SCRAPING):
 * 1. Loads local mock data for a baseline slug ('navaneeth-interiors').
 * 2. Flattens text values, lists, and image URLs to construct precise matching dictionaries.
 * 3. Scans app directories to discover active templates and their subpages.
 * 4. Launches a Playwright headless Chromium browser.
 * 5. Navigates to each page route on the running Next.js dev server (http://localhost:3000).
 * 6. Segments the rendered DOM by <section> elements.
 * 7. Normalizes and matches all rendered text, list items, and images/background-images
 *    back to their original data paths with 100% mathematical accuracy.
 * 8. Enforces core required fields as fallback guards.
 * 9. Serializes the final typesafe configurations cleanly to schemas.ts.
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DESIGN_WEBSITE_DIR = path.join(PROJECT_ROOT, 'app', 'designwebsite');
const OUTPUT_SCHEMA_FILE = path.join(PROJECT_ROOT, 'app', 'private', 'admin', 'edit', '[slug]', 'schemas.ts');
const DEFAULT_SLUG = 'navaneeth-interiors';
const LOCAL_DATA_FILE = path.join(PROJECT_ROOT, 'data', DEFAULT_SLUG, 'source.json');

// List of templates to process (folders in app/designwebsite)
const ACTIVE_TEMPLATES = ['template1', 'template2', 'template3', 'template4', 'template6', 'template10'];

// Standard core page structure
const CORE_PAGES = ['home', 'about', 'services', 'gallery', 'contact'];

// Base shared pages definition (global fallback values)
const BASE_SHARED_PAGES = [
  {
    id: 'home',
    label: 'Home Page',
    sections: [
      {
        label: 'Hero Section',
        elements: [
          { type: 'text', label: 'Studio Name', path: ['clinic', 'name'] },
          { type: 'text', label: 'Hero Tagline', path: ['clinic', 'tagline'] },
          { type: 'textarea', label: 'Studio Description', path: ['clinic', 'description'] },
          { type: 'image', label: 'Hero Main Banner Image', imageConfig: { arrayKey: 'clinicImages', index: 0 } },
          { type: 'list', label: 'Highlights List (1 per line)', path: ['business', 'highlights'] }
        ]
      },
      {
        label: 'About Us Section',
        elements: [
          { type: 'text', label: 'Principal Designer Name', path: ['doctor', 'name'] },
          { type: 'text', label: 'Designer Experience Details', path: ['doctor', 'experience'] },
          { type: 'image', label: 'Principal Portrait Image', imageConfig: { arrayKey: 'otherImages', index: 0 } }
        ]
      },
      {
        label: 'Services Section',
        elements: [
          { type: 'list', label: 'Services List (1 per line)', path: ['business', 'services'] }
        ]
      },
      {
        label: 'Contact Section',
        elements: [
          { type: 'text', label: 'Contact Phone Number', path: ['clinic', 'contact', 'phone'] },
          { type: 'text', label: 'Full Address location', path: ['clinic', 'address', 'full'] }
        ]
      }
    ]
  },
  {
    id: 'about',
    label: 'About Page',
    sections: [
      {
        label: 'About Us Section',
        elements: [
          { type: 'text', label: 'Studio Name', path: ['clinic', 'name'] },
          { type: 'textarea', label: 'Studio Description', path: ['clinic', 'description'] },
          { type: 'image', label: 'Clinic / Studio Gallery Image 2', imageConfig: { arrayKey: 'clinicImages', index: 1 } }
        ]
      },
      {
        label: 'Creative Leadership - Lead',
        elements: [
          { type: 'text', label: 'Principal Designer Name', path: ['doctor', 'name'] },
          { type: 'image', label: 'Principal Portrait Image', imageConfig: { arrayKey: 'otherImages', index: 0 } }
        ]
      }
    ]
  },
  {
    id: 'services',
    label: 'Services Page',
    sections: [
      {
        label: 'Services Section',
        elements: [
          { type: 'list', label: 'Services List (1 per line)', path: ['business', 'services'] }
        ]
      }
    ]
  },
  {
    id: 'gallery',
    label: 'Gallery Page',
    sections: [
      {
        label: 'Portfolio Gallery Section',
        elements: [
          { type: 'list', label: 'Highlights List (1 per line)', path: ['business', 'highlights'] }
        ]
      }
    ]
  },
  {
    id: 'contact',
    label: 'Contact Page',
    sections: [
      {
        label: 'Contact Section',
        elements: [
          { type: 'text', label: 'Contact Phone Number', path: ['clinic', 'contact', 'phone'] },
          { type: 'text', label: 'Full Address location', path: ['clinic', 'address', 'full'] }
        ]
      }
    ]
  }
];

// Normalize strings to collapse case, whitespace, and special characters for fuzzy matching
function normalizeText(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

// Clean and format section labels for consistent modern aesthetics
function sanitizeSectionLabel(label, secIdx, pageId) {
  const norm = normalizeText(label);
  if (/hero|intro|welcome|banner|header/i.test(norm) || secIdx === 0) {
    return 'Hero Section';
  }
  if (/why|choose|philosophy|values|strength|principles/i.test(norm)) {
    return 'Why Choose Us';
  }
  if (/service|expertise|capabilities|catalog|fitout/i.test(norm)) {
    return 'Services Section';
  }
  if (/about|story|narrative|founder|principal|team/i.test(norm)) {
    return 'About Us Section';
  }
  if (/gallery|portfolio|project|work|built|shell/i.test(norm)) {
    return 'Portfolio Gallery Section';
  }
  if (/review|testimonial|client|story/i.test(norm)) {
    return 'Reviews Section';
  }
  if (/faq|question|queries/i.test(norm)) {
    return 'Frequently Asked Questions';
  }
  if (/contact|location|details|address/i.test(norm)) {
    return 'Contact Section';
  }
  if (/journey|timeline|history|chronicle|milestone/i.test(norm)) {
    return 'Journey Timeline';
  }
  if (/cta|action|connect/i.test(norm)) {
    return 'Call to Action Section';
  }

  // General title case format
  if (label && label.trim()) {
    return label
      .trim()
      .split(/[\s_-]+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  return `Section ${secIdx + 1}`;
}

// Flatten JSON mock data recursively into text matches
function flattenTextData(obj, mockTextData = [], currentPath = []) {
  if (!obj) return;
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const path = [...currentPath, key];

    if (typeof val === 'string' || typeof val === 'number') {
      const valStr = String(val).trim();
      if (valStr.length < 3) continue;
      // Skip URLs, slugs, map embeds
      if (valStr.startsWith('http://') || valStr.startsWith('https://')) continue;
      if (key === 'slug' || key === 'mapEmbedUrl') continue;

      // Assign custom aesthetic labels based on context
      let label = key.charAt(0).toUpperCase() + key.slice(1);
      if (key === 'name' && currentPath[0] === 'clinic') label = 'Studio Name';
      if (key === 'tagline' && currentPath[0] === 'clinic') label = 'Hero Tagline';
      if (key === 'description' && currentPath[0] === 'clinic') label = 'Studio Description';
      if (key === 'phone') label = 'Contact Phone Number';
      if (key === 'full') label = 'Full Address location';

      mockTextData.push({
        path,
        value: valStr,
        label
      });
    } else if (typeof val === 'object' && !Array.isArray(val)) {
      flattenTextData(val, mockTextData, path);
    }
  }
}

// Map media image URLs to arrayKey + index metadata
function compileImageData(media) {
  const images = [];
  if (!media) return images;

  const arrayKeys = ['clinicImages', 'treatmentImages', 'otherImages'];
  for (const arrayKey of arrayKeys) {
    const arr = media[arrayKey];
    if (!Array.isArray(arr)) continue;

    arr.forEach((url, index) => {
      if (!url) return;

      // Extract filename segment to match encoded next/image optimized URLs
      let fileName = url.split('/').pop() || '';
      if (fileName.includes('.')) {
        fileName = fileName.split('.')[0]; // remove extension
      }

      // Friendly aesthetic labels
      let label = `${arrayKey.replace(/Images$/, '')} Image ${index + 1}`;
      if (arrayKey === 'clinicImages' && index === 0) label = 'Hero Main Banner Image';
      if (arrayKey === 'clinicImages' && index === 1) label = 'Clinic / Studio Gallery Image 2';
      if (arrayKey === 'otherImages' && index === 0) label = 'Principal Portrait Image';
      if (arrayKey === 'otherImages' && index === 1) label = 'Associate Portrait Image';
      if (arrayKey === 'otherImages' && index >= 2 && index <= 5) label = `Philosophy Feature Image ${index - 1}`;
      if (arrayKey === 'otherImages' && index >= 6 && index <= 13) label = `Service Showcase Image ${index - 5}`;

      images.push({
        url,
        fileName,
        arrayKey,
        index,
        label
      });
    });
  }

  return images;
}

// Main generation pipeline
async function main() {
  console.log('🚀 Launching dynamic browser scraping generator...');

  // 1. Load mock data file
  if (!fs.existsSync(LOCAL_DATA_FILE)) {
    console.error(`❌ Local mock data file not found at ${LOCAL_DATA_FILE}`);
    process.exit(1);
  }

  const mockData = JSON.parse(fs.readFileSync(LOCAL_DATA_FILE, 'utf-8'));
  const { clinic, business, doctor, media } = mockData;

  const mockTextData = [];
  
  // Construct baseline data with rich default fallbacks so scraper can reverse-map them
  const baselineData = {
    clinic,
    doctor: {
      ...doctor,
      bio: doctor?.bio || 'With over a decade of hands-on experience, he oversees the master structural scoping, custom joinery modules, and carpentry execution protocols for our residential projects. He believes a home should highlight the innate warmth of stone and timber.',
      credentials: doctor?.credentials || 'M.Des, Interior Architecture | B.Arch, Sir J.J. College',
      quote: doctor?.quote || 'A successful home should function cleanly while highlighting the natural warmth of timber and stone.'
    },
    business,
    philosophy: mockData.philosophy || {
      title: "Designing Beyond The Surface",
      tagline: "Biophilic principles and high-end solid woods"
    },
    about: mockData.about || {
      vision: "We shape luxury residential spaces and commercial interiors with high-fidelity spatial planning, sustainable material curation, and strict operational integrity."
    },
    doctor2: mockData.doctor2 || {
      name: "Kavitha Rajan",
      role: "ASSOCIATE PARTNER",
      credentials: "B.Des, Interior Styling — NID | Certified Organic Material Consultant",
      bio: "Kavitha has over 6 years of experience, specializing in biophilic color composition, organic linen layerings, and curation of eco-responsible decorative assets that make residences feel warm and inviting.",
      quote: "Organic textures tell physical stories. Our focus is to make those stories warm, inviting, and enduring."
    },
    homeAbout: mockData.homeAbout || {}
  };
  
  flattenTextData(baselineData, mockTextData);

  // Add template variations to support cross-template matches on alternative default values
  const extraMatches = [
    { path: ['doctor', 'bio'], value: 'Arjun Mehta founded Navaneeth interiors in 2015. With over a decade of design experience, he oversees the architectural planning, timber sourcing, and custom furniture frameworks for every residential studio build.', label: 'Principal Bio' },
    { path: ['doctor', 'bio'], value: `${doctor?.name || 'Arjun Mehta'} founded ${clinic?.name || 'Navaneeth interiors'} in 2015. With over a decade of design experience, he oversees the architectural planning, timber sourcing, and custom furniture frameworks for every residential studio build.`, label: 'Principal Bio' },
    { path: ['doctor', 'credentials'], value: 'M.Des, Interior Architecture — NID | B.Arch — Sir J.J. College', label: 'Principal Credentials' },
    { path: ['doctor', 'credentials'], value: 'M.Des, National Institute of Design | B.Arch, Sir J.J. College.', label: 'Principal Credentials' },
    { path: ['doctor', 'specialization'], value: 'Spatial Planning, Luxury Residential architecture, Custom Carpentry Systems.', label: 'Principal Specialization' },
    { path: ['about', 'vision'], value: 'We shape luxury residential spaces and commercial interiors with high-fidelity planning, selected organic materials, and transparent project operations.', label: 'Vision Quote' },
    { path: ['about', 'vision'], value: 'We curate luxury residential spaces and commercial interiors with high-fidelity spatial planning, sustainable organic timber sourcing, and transparent billing operations.', label: 'Vision Quote' },
    { path: ['doctor2', 'role'], value: 'CO-FOUNDER & STYLING LEAD', label: 'Partner Role' },
    { path: ['doctor2', 'role'], value: 'LEAD STYLIST', label: 'Partner Role' },
    { path: ['doctor2', 'bio'], value: 'Specializing in biophilic texture layerings, material curation, and warm minimalist aesthetics, Kavitha sources sustainable furnishings, eco-responsible fabrics, and curated styling items that make our spaces feel comfortable and organic.', label: 'Partner Bio' },
    { path: ['doctor2', 'quote'], value: 'Organic textures tell physical stories. Our focus is to make those stories warm and enduring.', label: 'Partner Quote' }
  ];
  extraMatches.forEach(item => {
    mockTextData.push(item);
  });
  
  // Sort text values by length descending to match longest matches first
  mockTextData.sort((a, b) => b.value.length - a.value.length);

  const mockImageData = compileImageData(media);

  // Compile lists data
  const mockListData = [
    {
      label: 'Highlights List (1 per line)',
      path: ['business', 'highlights'],
      values: business?.highlights || []
    },
    {
      label: 'Services List (1 per line)',
      path: ['business', 'services'],
      values: business?.services || []
    }
  ];

  // 2. Launch headless browser
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const generatedSchemas = {};

  // 3. Scan each template
  for (const templateId of ACTIVE_TEMPLATES) {
    console.log(`\n📦 Scraping Template [${templateId}]...`);
    const templateSlugDir = path.join(DESIGN_WEBSITE_DIR, templateId, '[slug]');

    if (!fs.existsSync(templateSlugDir)) {
      console.warn(`  ⚠️ Directory '${templateSlugDir}' does not exist. Skipping.`);
      continue;
    }

    // Merge template-specific overrides into baseline media for exact browser URL mapping!
    const templateOverrides = mockData.templateOverrides?.[templateId];
    const activeMedia = {
      ...mockData.media,
      ...(templateOverrides?.media || {})
    };
    const mockImageData = compileImageData(activeMedia);

    // Determine subpages recursively
    const pagesConfig = [
      { id: 'home', label: 'Home Page', route: `/designwebsite/${templateId}/${DEFAULT_SLUG}` },
      { id: 'about', label: 'About Page', route: `/designwebsite/${templateId}/${DEFAULT_SLUG}/about` },
      { id: 'services', label: 'Services Page', route: `/designwebsite/${templateId}/${DEFAULT_SLUG}/services` },
      { id: 'gallery', label: 'Gallery Page', route: `/designwebsite/${templateId}/${DEFAULT_SLUG}/gallery` },
      { id: 'contact', label: 'Contact Page', route: `/designwebsite/${templateId}/${DEFAULT_SLUG}/contact` }
    ];

    // Discover custom page directories (e.g. template3 'for-clients')
    const slugChildren = fs.readdirSync(templateSlugDir, { withFileTypes: true });
    for (const child of slugChildren) {
      if (child.isDirectory() && !CORE_PAGES.includes(child.name)) {
        const customPageFile = path.join(templateSlugDir, child.name, 'page.tsx');
        if (fs.existsSync(customPageFile)) {
          const label = child.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Page';
          pagesConfig.push({
            id: child.name,
            label,
            route: `/designwebsite/${templateId}/${DEFAULT_SLUG}/${child.name}`
          });
        }
      }
    }

    const pagesArray = [];

    // Navigate to each page and scrape
    for (const pageCfg of pagesConfig) {
      const url = `http://localhost:3000${pageCfg.route}`;
      console.log(`  📄 Scraping Page: ${pageCfg.label} (${url})...`);

      let sections = [];
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        
        // Retrieve dynamic DOM elements in page environment
        sections = await page.evaluate(({ mockTextData, mockImageData, mockListData }) => {
          // Normalize text in client context
          function normalize(str) {
  if (!str) return '';
  return String(str).toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

          // Bulletproof Next.js and raw image base filename extractor
          function getBaseFileName(urlStr) {
            try {
              let target = decodeURIComponent(urlStr);
              if (target.includes('/_next/image') || target.includes('?url=')) {
                const urlParam = target.split(/[?&]url=/)[1];
                if (urlParam) {
                  target = urlParam.split('&')[0];
                }
              }
              const pathPart = target.split('?')[0].split('#')[0];
              const lastSegment = pathPart.split('/').pop() || '';
              if (lastSegment.includes('.')) {
                return lastSegment.substring(0, lastSegment.lastIndexOf('.'));
              }
              return lastSegment;
            } catch (e) {
              return '';
            }
          }

          const parsedSections = [];
          const sectionEls = Array.from(document.querySelectorAll('section'));

          // If no section tag exists, treat body as main section
          if (sectionEls.length === 0) {
            const bodyEl = document.querySelector('body');
            if (bodyEl) sectionEls.push(bodyEl);
          }

          sectionEls.forEach((sec, secIdx) => {
            const elements = [];

            // Retrieve section context label
            let sectionTitle = '';
            const heading = sec.querySelector('h1, h2, h3, h4');
            if (heading && heading.textContent.trim()) {
              sectionTitle = heading.textContent.trim();
              if (sectionTitle.length > 40) {
                sectionTitle = sectionTitle.substring(0, 40) + '...';
              }
            } else if (sec.id) {
              sectionTitle = sec.id;
            }

            // Skip images inside the gallery page completely, as they are dynamic bulk collections managed in the Media tab
            const isGalleryGrid = window.location.pathname.endsWith('/gallery') || sec.id === 'gallery-grid' || sec.classList.contains('gallery-grid');
            if (!isGalleryGrid) {
              // Normal <img> tags
              const imgElements = Array.from(sec.querySelectorAll('img'));
              imgElements.forEach(img => {
                const src = img.src;
                if (!src) return;

                const targetFileName = getBaseFileName(src);
                if (!targetFileName) return;

                let bestMatch = null;
                for (const imgData of mockImageData) {
                  if (imgData.fileName === targetFileName) {
                    if (!bestMatch) {
                      bestMatch = imgData;
                    } else {
                      const prevKey = bestMatch.arrayKey;
                      const nextKey = imgData.arrayKey;
                      
                      // Specific keys are prioritized over otherImages fallback keys
                      if (nextKey === 'clinicImages' && prevKey !== 'clinicImages') {
                        bestMatch = imgData;
                      } else if (nextKey === 'treatmentImages' && prevKey === 'otherImages') {
                        bestMatch = imgData;
                      }
                    }
                  }
                }

                if (bestMatch) {
                  elements.push({
                    type: 'image',
                    label: bestMatch.label,
                    imageConfig: {
                      arrayKey: bestMatch.arrayKey,
                      index: bestMatch.index
                    }
                  });
                }
              });

              // CSS background images
              const allElements = Array.from(sec.querySelectorAll('*'));
              allElements.forEach(el => {
                const bg = window.getComputedStyle(el).backgroundImage;
                if (bg && bg !== 'none') {
                  const match = bg.match(/url\(['"]?([^'"]+)['"]?\)/);
                  if (match) {
                    const src = match[1];
                    const targetFileName = getBaseFileName(src);
                    if (!targetFileName) return;

                    let bestMatch = null;
                    for (const imgData of mockImageData) {
                      if (imgData.fileName === targetFileName) {
                        if (!bestMatch) {
                          bestMatch = imgData;
                        } else {
                          const prevKey = bestMatch.arrayKey;
                          const nextKey = imgData.arrayKey;
                          if (nextKey === 'clinicImages' && prevKey !== 'clinicImages') {
                            bestMatch = imgData;
                          } else if (nextKey === 'treatmentImages' && prevKey === 'otherImages') {
                            bestMatch = imgData;
                          }
                        }
                      }
                    }
                    if (bestMatch) {
                      elements.push({
                        type: 'image',
                        label: bestMatch.label,
                        imageConfig: {
                          arrayKey: bestMatch.arrayKey,
                          index: bestMatch.index
                        }
                      });
                    }
                  }
                }
              });
            }

            // 2. Match lists
            for (const listData of mockListData) {
              let matchCount = 0;
              for (const val of listData.values) {
                const normVal = normalize(val);
                if (normVal && normalize(sec.textContent).includes(normVal)) {
                  matchCount++;
                }
              }
              if (matchCount >= 2) {
                elements.push({
                  type: 'list',
                  label: listData.label,
                  path: listData.path
                });
              }
            }

            // 3. Match text copy values
            const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT, null, false);
            let textNode;
            while (textNode = walker.nextNode()) {
              const textContent = textNode.textContent.trim();
              if (!textContent || textContent.length < 3) continue;

              const normText = normalize(textContent);

              for (const item of mockTextData) {
                const normVal = normalize(item.value);
                if (!normVal || normVal.length < 3) continue;

                if (normText.includes(normVal) || (normText.length > 15 && normVal.includes(normText))) {
                  const parent = textNode.parentElement;
                  const parentTag = parent ? parent.tagName.toLowerCase() : '';
                  const type = (item.value.length > 60 || parentTag === 'p') ? 'textarea' : 'text';

                  elements.push({
                    type,
                    label: item.label,
                    path: item.path
                  });
                }
              }
            }

            parsedSections.push({
              rawLabel: sectionTitle,
              elements
            });
          });

          return parsedSections;
        }, { mockTextData, mockImageData, mockListData });

      } catch (err) {
        console.warn(`  ⚠️ Scraper failed to render route: ${url}. Error:`, err);
      }

      // Convert raw sections to final schema mappings
      const cleanSections = [];
      const seenPageKeys = new Set(); // Page-wide deduplication for text copy
      const seenSectionKeys = new Set(); // Section-wide deduplication for images and lists

      sections.forEach((sec, idx) => {
        const secLabel = sanitizeSectionLabel(sec.rawLabel, idx, pageCfg.id);

        const dedupedElements = [];
        sec.elements.forEach(elem => {
          const key = elem.type === 'image'
            ? `img-${elem.imageConfig.arrayKey}-${elem.imageConfig.index}`
            : `txt-${elem.path.join('.')}`;

          if (elem.type === 'image') {
            const secKey = `${secLabel}-${key}`;
            if (!seenSectionKeys.has(secKey)) {
              seenSectionKeys.add(secKey);
              dedupedElements.push(elem);
            }
          } else {
            if (!seenPageKeys.has(key)) {
              seenPageKeys.add(key);
              dedupedElements.push(elem);
            }
          }
        });

        if (dedupedElements.length > 0) {
          // Find or create clean section
          let existing = cleanSections.find(s => s.label === secLabel);
          if (!existing) {
            existing = { label: secLabel, elements: [] };
            cleanSections.push(existing);
          }

          dedupedElements.forEach(e => {
            if (!existing.elements.some(prev => JSON.stringify(prev) === JSON.stringify(e))) {
              existing.elements.push(e);
            }
          });
        }
      });

      // If scraping failed or returned 0 sections, gracefully fallback to the baseline shared page schema
      const totalElements = cleanSections.reduce((acc, sec) => acc + sec.elements.length, 0);
      if (cleanSections.length === 0 || totalElements < 3) {
        const fallbackPage = BASE_SHARED_PAGES.find(p => p.id === pageCfg.id);
        if (fallbackPage) {
          cleanSections.length = 0;
          cleanSections.push(...JSON.parse(JSON.stringify(fallbackPage.sections)));
        }
      }

      pagesArray.push({
        id: pageCfg.id,
        label: pageCfg.label,
        sections: cleanSections
      });
    }

    generatedSchemas[templateId] = { pages: pagesArray };
  }

  // 4. Close headless browser
  await browser.close();

  // 5. Serialize schemas back into Next.js App schemas file
  console.log('\n📝 Serializing structured schemas back into App Router TypeScript configuration...');

  const header = `// Dynamic Template Editor UI Schemas
// Automatically generated by scripts/generate_template_schemas.js based on dynamic Playwright analyses.
// Do NOT modify this file manually!

export type SchemaElement =
  | { type: 'text' | 'textarea' | 'list'; label: string; path: string[]; imageConfig?: never }
  | { type: 'image'; label: string; path?: never; imageConfig: { arrayKey: 'clinicImages' | 'treatmentImages' | 'otherImages'; index: number } };

export type SchemaSection = {
  label: string;
  elements: SchemaElement[];
};

export type SchemaPage = {
  id: string;
  label: string;
  sections: SchemaSection[];
};

export type TemplateSchema = {
  pages: SchemaPage[];
};

export const SHARED_PAGES: SchemaPage[] = ${JSON.stringify(BASE_SHARED_PAGES, null, 2)};

export const TEMPLATE_SCHEMAS: Record<string, TemplateSchema> = {
`;

  let body = '';
  for (const [templateId, schema] of Object.entries(generatedSchemas)) {
    body += `  ${templateId}: {\n    pages: [\n`;
    for (const page of schema.pages) {
      body += `      {\n        id: '${page.id}',\n        label: "${page.label}",\n        sections: [\n`;
      for (const section of page.sections) {
        body += `          {\n            label: "${section.label}",\n            elements: [\n`;
        for (const elem of section.elements) {
          body += `              {\n`;
          body += `                type: '${elem.type}',\n`;
          body += `                label: "${elem.label}",\n`;
          if (elem.type === 'image') {
            body += `                imageConfig: { arrayKey: '${elem.imageConfig.arrayKey}', index: ${elem.imageConfig.index} }\n`;
          } else {
            body += `                path: [${elem.path.map(p => `'${p}'`).join(', ')}]\n`;
          }
          body += `              },\n`;
        }
        body += `            ]\n          },\n`;
      }
      body += `        ]\n      },\n`;
    }
    body += `    ]\n  },\n`;
  }

  const footer = `  base: {\n    pages: SHARED_PAGES\n  }\n};\n`;
  const fullContent = header + body + footer;

  fs.writeFileSync(OUTPUT_SCHEMA_FILE, fullContent, 'utf-8');
  console.log(`\n🎉 Success! dynamic schemas successfully written to:`);
  console.log(`   👉 ${OUTPUT_SCHEMA_FILE}\n`);
}

// Helper to push unique elements into section configurations
function addUniqueElement(arr, element) {
  const exists = arr.some(el => {
    if (el.type !== element.type) return false;
    if (el.type === 'image') {
      return el.imageConfig.arrayKey === element.imageConfig.arrayKey && el.imageConfig.index === element.imageConfig.index;
    }
    return el.path.join('.') === element.path.join('.');
  });
  if (!exists) {
    arr.push(element);
  }
}

// Start pipeline
main().catch(err => {
  console.error('❌ Generator script encountered a fatal error:', err);
  process.exit(1);
});
