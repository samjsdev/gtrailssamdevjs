import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const OUTPUT_DIR = path.join(projectRoot, 'public/images/architecture');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 24 Curated High-End Architectural Photography URLs from Unsplash
const ARCHITECTURE_IMAGE_SOURCES = [
  { name: 'hero-villa-twilight.webp', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80' },
  { name: 'hero-minimalist-residence.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80' },
  { name: 'facade-white-concrete.webp', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80' },
  { name: 'brutalist-glass-pavilion.webp', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80' },
  { name: 'tropical-modern-villa.webp', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80' },
  { name: 'structural-construction-frame.webp', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=80' },
  { name: 'architectural-blueprint-draft.webp', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80' },
  { name: 'architect-studio-model.webp', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80' },
  { name: 'civic-landmark-facade.webp', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80' },
  { name: 'glass-curtain-wall.webp', url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80' },
  { name: 'courtyard-water-residence.webp', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80' },
  { name: 'site-surveying-raw.webp', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80' },
  { name: 'principal-architect.webp', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80' },
  { name: 'atelier-design-studio.webp', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80' },
  { name: 'interior-double-height.webp', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80' },
  { name: 'cantilever-garden-overhang.webp', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80' },
  { name: 'geometric-villa-elevation.webp', url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80' },
  { name: 'luxury-modernist-estate.webp', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80' },
  { name: 'linear-pool-pavilion.webp', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80' },
  { name: 'urban-master-plan.webp', url: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=80' },
  { name: 'stone-concrete-residence.webp', url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80' },
  { name: 'sculptural-concrete-staircase.webp', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80' },
  { name: 'passive-timber-screens.webp', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80' },
  { name: 'monumental-facade-entry.webp', url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=80' }
];

async function run() {
  console.log(`Starting download of ${ARCHITECTURE_IMAGE_SOURCES.length} architecture stock images...`);
  let downloaded = 0;

  for (let i = 0; i < ARCHITECTURE_IMAGE_SOURCES.length; i++) {
    const item = ARCHITECTURE_IMAGE_SOURCES[i];
    const outPath = path.join(OUTPUT_DIR, item.name);

    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
      console.log(`[${i + 1}/${ARCHITECTURE_IMAGE_SOURCES.length}] Exists: ${item.name}`);
      continue;
    }

    console.log(`[${i + 1}/${ARCHITECTURE_IMAGE_SOURCES.length}] Downloading: ${item.name}...`);
    try {
      const resp = await fetch(item.url);
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
      }
      const buffer = await resp.arrayBuffer();
      await sharp(Buffer.from(buffer))
        .webp({ quality: 82 })
        .toFile(outPath);
      console.log(`  ✓ Saved ${item.name}`);
      downloaded++;
    } catch (err) {
      console.error(`  ✗ Error downloading ${item.name}:`, err.message);
    }
  }

  console.log(`Finished! Downloaded ${downloaded} images into ${OUTPUT_DIR}`);
}

run().catch(console.error);
