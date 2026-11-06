import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const REGIONS_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'niches', 'regions');

const REGION_MANIFEST = [
  // CHENNAI, INDIA
  {
    region: 'chennai',
    slot: 'heroes',
    file: '01-chennai-tropical-villa.webp',
    localSrc: 'public/images/architecture/courtyard-water-residence.webp'
  },
  {
    region: 'chennai',
    slot: 'heroes',
    file: '02-chennai-luxury-estate.webp',
    localSrc: 'public/images/architecture/cantilever-garden-overhang.webp'
  },
  {
    region: 'chennai',
    slot: 'gallery',
    file: '01-chennai-brick-jali.webp',
    localSrc: 'public/images/architecture/brick-perforated-facade.webp'
  },
  {
    region: 'chennai',
    slot: 'gallery',
    file: '02-chennai-granite-teak.webp',
    localSrc: 'public/images/architecture/granite-teak-portal.webp'
  },
  {
    region: 'chennai',
    slot: 'gallery',
    file: '03-chennai-linear-pool.webp',
    localSrc: 'public/images/architecture/linear-pool-pavilion.webp'
  },
  {
    region: 'chennai',
    slot: 'services',
    file: '01-chennai-cmda-approval.webp',
    localSrc: 'public/images/architecture/cmda-sanction-drafting.webp'
  },
  {
    region: 'chennai',
    slot: 'services',
    file: '02-chennai-structural-frame.webp',
    localSrc: 'public/images/architecture/structural-construction-frame.webp'
  },
  {
    region: 'chennai',
    slot: 'services',
    file: '03-chennai-modular-kitchen.webp',
    localSrc: 'public/images/stock/interior-luxury-dining.webp'
  },
  {
    region: 'chennai',
    slot: 'about',
    file: '01-chennai-atelier.webp',
    localSrc: 'public/images/architecture/atelier-design-studio.webp'
  },
  {
    region: 'chennai',
    slot: 'about',
    file: '02-chennai-site-survey.webp',
    localSrc: 'public/images/architecture/site-surveying-raw.webp'
  },
  {
    region: 'chennai',
    slot: 'people',
    file: '01-chennai-lead-architect.webp',
    localSrc: 'public/images/niches/interior-design/people/01-lead-designer.webp',
    isPortrait: true
  },
  {
    region: 'chennai',
    slot: 'people',
    file: '02-chennai-site-engineer.webp',
    localSrc: 'public/images/niches/general-construction/people/01-site-engineer.webp',
    isPortrait: true
  },

  // CANADA
  {
    region: 'canada',
    slot: 'heroes',
    file: '01-canada-custom-home.webp',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
  },
  {
    region: 'canada',
    slot: 'heroes',
    file: '02-canada-modern-residence.webp',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
  },
  {
    region: 'canada',
    slot: 'gallery',
    file: '01-canada-living-fireplace.webp',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80'
  },
  {
    region: 'canada',
    slot: 'gallery',
    file: '02-canada-open-kitchen.webp',
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80'
  },
  {
    region: 'canada',
    slot: 'gallery',
    file: '03-canada-exterior-deck.webp',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80'
  },
  {
    region: 'canada',
    slot: 'services',
    file: '01-canada-wood-framing.webp',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80'
  },
  {
    region: 'canada',
    slot: 'services',
    file: '02-canada-hvac-furnace.webp',
    url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1600&q=80'
  },
  {
    region: 'canada',
    slot: 'services',
    file: '03-canada-shingle-roof.webp',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&q=80'
  },
  {
    region: 'canada',
    slot: 'about',
    file: '01-canada-blueprint-review.webp',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80'
  },
  {
    region: 'canada',
    slot: 'about',
    file: '02-canada-jobsite-winterized.webp',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=80'
  },
  {
    region: 'canada',
    slot: 'people',
    file: '01-canada-general-contractor.webp',
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    isPortrait: true
  },
  {
    region: 'canada',
    slot: 'people',
    file: '02-canada-project-director.webp',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    isPortrait: true
  }
];

async function run() {
  console.log('Building Regional Photo Library (Chennai & Canada)...');
  for (const item of REGION_MANIFEST) {
    const targetDir = path.join(REGIONS_DIR, item.region, item.slot);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const destPath = path.join(targetDir, item.file);

    let buffer = null;

    if (item.localSrc) {
      const srcPath = path.join(PROJECT_ROOT, item.localSrc);
      if (fs.existsSync(srcPath)) {
        buffer = fs.readFileSync(srcPath);
      }
    }

    if (!buffer && item.url) {
      try {
        const resp = await fetch(item.url);
        if (resp.ok) {
          const arr = await resp.arrayBuffer();
          buffer = Buffer.from(arr);
        }
      } catch (err) {
        console.error(`Failed ${item.url}:`, err.message);
      }
    }

    if (!buffer) {
      console.warn(`No buffer for ${item.file}`);
      continue;
    }

    let pipeline = sharp(buffer);
    const meta = await pipeline.metadata();

    if (item.isPortrait) {
      if (meta.width && meta.width > 800) {
        pipeline = pipeline.resize(800, null, { withoutEnlargement: true });
      }
    } else {
      if (meta.width && meta.width > 1600) {
        pipeline = pipeline.resize(1600, null, { withoutEnlargement: true });
      }
    }

    await pipeline.webp({ quality: 82, effort: 4 }).toFile(destPath);
    const stats = fs.statSync(destPath);
    console.log(`✓ ${item.region}/${item.slot}/${item.file} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
  console.log('Region library build complete!');
}

run().catch(console.error);
