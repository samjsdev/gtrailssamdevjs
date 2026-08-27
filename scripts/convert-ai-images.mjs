import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const BRAIN_DIR = '/Users/samuvelraja/.gemini/antigravity-ide/brain/c9518e75-fb1f-40c3-96a3-ae04630fe34d';
const TARGET_DIR = '/Users/samuvelraja/dev/Webagency/gtrails/public/images/architecture';

const MAPPINGS = [
  {
    src: 'hero_villa_twilight_1787760797346.jpg',
    targets: ['hero-villa-twilight.webp', 'linear-pool-pavilion.webp']
  },
  {
    src: 'courtyard_water_residence_1787760835998.jpg',
    targets: ['courtyard-water-residence.webp']
  },
  {
    src: 'construction_frame_1787760863563.jpg',
    targets: ['structural-construction-frame.webp', 'site-surveying-raw.webp']
  },
  {
    src: 'cantilever_coastal_villa_1787760894223.jpg',
    targets: ['cantilever-garden-overhang.webp', 'brutalist-glass-pavilion.webp']
  },
  {
    src: 'architect_drafting_table_1787760926137.jpg',
    targets: ['architectural-blueprint-draft.webp', 'architect-studio-model.webp', 'atelier-design-studio.webp']
  },
  {
    src: 'principal_architect_portrait_1787760957085.jpg',
    targets: ['principal-architect.webp']
  },
  {
    src: 'anna_nagar_duplex_1787761010897.jpg',
    targets: ['tropical-modern-villa.webp', 'hero-minimalist-residence.webp', 'facade-white-concrete.webp']
  },
  {
    src: 'porotherm_jali_detail_1787761163364.jpg',
    targets: ['brick-perforated-facade.webp', 'passive-timber-screens.webp']
  },
  {
    src: 'bim_villa_render_1787761224015.jpg',
    targets: ['geometric-villa-elevation.webp', 'luxury-modernist-estate.webp', 'civic-landmark-facade.webp']
  },
  {
    src: 'concrete_atrium_interior_1787761383315.jpg',
    targets: ['monolithic-concrete-atrium.webp', 'interior-double-height.webp', 'stone-concrete-residence.webp']
  }
];

async function convert() {
  for (const item of MAPPINGS) {
    const srcPath = path.join(BRAIN_DIR, item.src);
    if (!fs.existsSync(srcPath)) {
      console.error(`Source not found: ${srcPath}`);
      continue;
    }
    const buffer = fs.readFileSync(srcPath);
    for (const target of item.targets) {
      const destPath = path.join(TARGET_DIR, target);
      await sharp(buffer)
        .webp({ quality: 85 })
        .toFile(destPath);
      console.log(`Converted & Saved: ${target}`);
    }
  }
  console.log('All AI architectural images successfully converted to WebP in public/images/architecture!');
}

convert().catch(console.error);
