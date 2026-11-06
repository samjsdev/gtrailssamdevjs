import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const NICHES_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'niches');
const BRAIN_DIR = '/Users/samuvelraja/.gemini/antigravity/brain/955c152c-f49d-4012-8d90-ea70d2cf51a3';

/**
 * High quality curated photographic sources for all 10 niches
 * Each source maps to a specific niche, slot, and filename.
 */
const NICHE_IMAGE_MANIFEST = [
  // 1. INTERIOR DESIGN & DECORATING
  { niche: 'interior-design', slot: 'heroes', file: '01-hero.webp', localAi: 'luxury_contemporary_living_room' },
  { niche: 'interior-design', slot: 'heroes', file: '02-hero.webp', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'interior-design', slot: 'gallery', file: '01-modular-kitchen.webp', localAi: 'interior_kitchen_design' },
  { niche: 'interior-design', slot: 'gallery', file: '02-luxury-dining.webp', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'interior-design', slot: 'gallery', file: '03-curated-lounge.webp', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'interior-design', slot: 'services', file: '01-master-bedroom.webp', localAi: 'interior_bedroom_styling' },
  { niche: 'interior-design', slot: 'services', file: '02-space-planning.webp', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'interior-design', slot: 'services', file: '03-custom-joinery.webp', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'interior-design', slot: 'about', file: '01-design-atelier.webp', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'interior-design', slot: 'about', file: '02-material-palette.webp', url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'interior-design', slot: 'people', file: '01-lead-designer.webp', localAi: 'interior_designer_portrait', isPortrait: true },
  { niche: 'interior-design', slot: 'people', file: '02-design-partner.webp', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', isPortrait: true },

  // 2. ARCHITECTURE & ARCHITECTURAL DESIGN
  { niche: 'architecture', slot: 'heroes', file: '01-hero.webp', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'architecture', slot: 'heroes', file: '02-hero.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'architecture', slot: 'gallery', file: '01-cantilever-villa.webp', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'architecture', slot: 'gallery', file: '02-courtyard-residence.webp', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'architecture', slot: 'gallery', file: '03-monolithic-facade.webp', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'architecture', slot: 'services', file: '01-blueprints-drafting.webp', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'architecture', slot: 'services', file: '02-scale-modelling.webp', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'architecture', slot: 'services', file: '03-geometric-facade.webp', url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'architecture', slot: 'about', file: '01-atelier-studio.webp', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'architecture', slot: 'about', file: '02-urban-masterplan.webp', url: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'architecture', slot: 'people', file: '01-principal-architect.webp', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', isPortrait: true },
  { niche: 'architecture', slot: 'people', file: '02-senior-architect.webp', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', isPortrait: true },

  // 3. LANDSCAPE ARCHITECTURE & DESIGN
  { niche: 'landscape', slot: 'heroes', file: '01-hero.webp', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'landscape', slot: 'heroes', file: '02-hero.webp', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'landscape', slot: 'gallery', file: '01-linear-pool.webp', url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'landscape', slot: 'gallery', file: '02-courtyard-garden.webp', url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'landscape', slot: 'gallery', file: '03-terrace-deck.webp', url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'landscape', slot: 'services', file: '01-garden-design.webp', url: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'landscape', slot: 'services', file: '02-hardscape-paving.webp', url: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'landscape', slot: 'services', file: '03-outdoor-patio.webp', url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'landscape', slot: 'about', file: '01-landscape-grading.webp', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'landscape', slot: 'about', file: '02-horticulture-planning.webp', url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'landscape', slot: 'people', file: '01-landscape-designer.webp', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', isPortrait: true },
  { niche: 'landscape', slot: 'people', file: '02-horticulturist.webp', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80', isPortrait: true },

  // 4. GENERAL CONSTRUCTION & CONTRACTING
  { niche: 'general-construction', slot: 'heroes', file: '01-hero.webp', localAi: 'general_construction_hero' },
  { niche: 'general-construction', slot: 'heroes', file: '02-hero.webp', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'general-construction', slot: 'gallery', file: '01-concrete-structure.webp', url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'general-construction', slot: 'gallery', file: '02-commercial-build.webp', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'general-construction', slot: 'gallery', file: '03-building-handover.webp', url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'general-construction', slot: 'services', file: '01-turnkey-contracting.webp', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'general-construction', slot: 'services', file: '02-steel-framing.webp', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'general-construction', slot: 'services', file: '03-masonry-civil.webp', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'general-construction', slot: 'about', file: '01-site-survey.webp', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'general-construction', slot: 'about', file: '02-project-planning.webp', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'general-construction', slot: 'people', file: '01-site-engineer.webp', localAi: 'construction_site_engineer', isPortrait: true },
  { niche: 'general-construction', slot: 'people', file: '02-project-manager.webp', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', isPortrait: true },

  // 5. HOME BUILDERS & DEVELOPERS
  { niche: 'home-builders', slot: 'heroes', file: '01-hero.webp', localAi: 'custom_home_builder_hero' },
  { niche: 'home-builders', slot: 'heroes', file: '02-hero.webp', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'home-builders', slot: 'gallery', file: '01-luxury-villa.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'home-builders', slot: 'gallery', file: '02-modern-residence.webp', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'home-builders', slot: 'gallery', file: '03-residential-enclave.webp', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'home-builders', slot: 'services', file: '01-custom-home-build.webp', url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'home-builders', slot: 'services', file: '02-spec-home-development.webp', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'home-builders', slot: 'services', file: '03-move-in-finish.webp', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'home-builders', slot: 'about', file: '01-blueprint-review.webp', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'home-builders', slot: 'about', file: '02-spec-walkthrough.webp', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'home-builders', slot: 'people', file: '01-master-builder.webp', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', isPortrait: true },
  { niche: 'home-builders', slot: 'people', file: '02-build-director.webp', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80', isPortrait: true },

  // 6. REMODELING & RENOVATION
  { niche: 'remodeling', slot: 'heroes', file: '01-hero.webp', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'remodeling', slot: 'heroes', file: '02-hero.webp', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'remodeling', slot: 'gallery', file: '01-kitchen-remodel.webp', url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'remodeling', slot: 'gallery', file: '02-bathroom-renovation.webp', url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'remodeling', slot: 'gallery', file: '03-open-living.webp', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'remodeling', slot: 'services', file: '01-kitchen-cabinetry.webp', url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'remodeling', slot: 'services', file: '02-bathroom-waterproofing.webp', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'remodeling', slot: 'services', file: '03-interior-framing.webp', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'remodeling', slot: 'about', file: '01-site-survey-measure.webp', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'remodeling', slot: 'about', file: '02-dust-containment-craft.webp', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'remodeling', slot: 'people', file: '01-remodel-lead.webp', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', isPortrait: true },
  { niche: 'remodeling', slot: 'people', file: '02-finish-carpenter.webp', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80', isPortrait: true },

  // 7. SPECIALIZED SUBCONTRACTORS & TRADES
  { niche: 'trades', slot: 'heroes', file: '01-hero.webp', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'trades', slot: 'heroes', file: '02-hero.webp', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'trades', slot: 'gallery', file: '01-electrical-panel.webp', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'trades', slot: 'gallery', file: '02-plumbing-install.webp', url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'trades', slot: 'gallery', file: '03-roofing-sheet.webp', url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'trades', slot: 'services', file: '01-hvac-ductwork.webp', url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'trades', slot: 'services', file: '02-masonry-pointing.webp', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'trades', slot: 'services', file: '03-cabinetry-joinery.webp', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'trades', slot: 'about', file: '01-precision-tools.webp', url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'trades', slot: 'about', file: '02-site-testing.webp', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'trades', slot: 'people', file: '01-master-electrician.webp', url: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=800&q=80', isPortrait: true },
  { niche: 'trades', slot: 'people', file: '02-licensed-plumber.webp', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', isPortrait: true },

  // 8. ENGINEERING & TECHNICAL CONSULTING
  { niche: 'engineering', slot: 'heroes', file: '01-hero.webp', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'engineering', slot: 'heroes', file: '02-hero.webp', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'engineering', slot: 'gallery', file: '01-structural-frame.webp', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'engineering', slot: 'gallery', file: '02-rebar-reinforcement.webp', url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'engineering', slot: 'gallery', file: '03-cad-3d-model.webp', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'engineering', slot: 'services', file: '01-structural-calculations.webp', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'engineering', slot: 'services', file: '02-civil-stormwater.webp', url: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'engineering', slot: 'services', file: '03-site-inspection.webp', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'engineering', slot: 'about', file: '01-engineering-office.webp', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'engineering', slot: 'about', file: '02-survey-theodolite.webp', url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'engineering', slot: 'people', file: '01-senior-structural-engineer.webp', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', isPortrait: true },
  { niche: 'engineering', slot: 'people', file: '02-civil-engineer.webp', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', isPortrait: true },

  // 9. BUILDING SUPPLIES, SHOWROOMS & MATERIALS
  { niche: 'supplies', slot: 'heroes', file: '01-hero.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'supplies', slot: 'heroes', file: '02-hero.webp', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'supplies', slot: 'gallery', file: '01-stone-marble-gallery.webp', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'supplies', slot: 'gallery', file: '02-architectural-hardware.webp', url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'supplies', slot: 'gallery', file: '03-masonry-blocks.webp', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'supplies', slot: 'services', file: '01-showroom-display.webp', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'supplies', slot: 'services', file: '02-trade-spec-supply.webp', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'supplies', slot: 'services', file: '03-logistics-delivery.webp', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'supplies', slot: 'about', file: '01-material-samples.webp', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'supplies', slot: 'about', file: '02-warehouse-depot.webp', url: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'supplies', slot: 'people', file: '01-showroom-director.webp', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', isPortrait: true },
  { niche: 'supplies', slot: 'people', file: '02-supply-advisor.webp', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80', isPortrait: true },

  // 10. REAL ESTATE, PROPERTY MANAGEMENT & HOUSING
  { niche: 'real-estate', slot: 'heroes', file: '01-hero.webp', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'real-estate', slot: 'heroes', file: '02-hero.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'real-estate', slot: 'gallery', file: '01-luxury-lobby.webp', url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'real-estate', slot: 'gallery', file: '02-penthouse-living.webp', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'real-estate', slot: 'gallery', file: '03-modern-apartment.webp', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'real-estate', slot: 'services', file: '01-property-sales.webp', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'real-estate', slot: 'services', file: '02-property-management.webp', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'real-estate', slot: 'services', file: '03-leasing-advisory.webp', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'real-estate', slot: 'about', file: '01-agency-boardroom.webp', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'real-estate', slot: 'about', file: '02-resident-concierge.webp', url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80' },
  { niche: 'real-estate', slot: 'people', file: '01-real-estate-broker.webp', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', isPortrait: true },
  { niche: 'real-estate', slot: 'people', file: '02-property-manager.webp', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', isPortrait: true },
];

function findLocalAiFile(prefix) {
  try {
    const files = fs.readdirSync(BRAIN_DIR);
    const match = files.find(f => f.startsWith(prefix) && f.endsWith('.jpg'));
    return match ? path.join(BRAIN_DIR, match) : null;
  } catch {
    return null;
  }
}

async function processOne(item) {
  const targetDir = path.join(NICHES_DIR, item.niche, item.slot);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const destPath = path.join(targetDir, item.file);

  // If already exists and valid size > 15KB, skip
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 15000) {
    console.log(`[SKIP] Already exists: ${item.niche}/${item.slot}/${item.file}`);
    return;
  }

  let buffer = null;

  // 1. Try local AI image first if available
  if (item.localAi) {
    const localPath = findLocalAiFile(item.localAi);
    if (localPath && fs.existsSync(localPath)) {
      console.log(`[AI-SOURCE] Using local AI generated file for ${item.file}: ${localPath}`);
      buffer = fs.readFileSync(localPath);
    }
  }

  // 2. Fetch from curated URL if no local AI buffer
  if (!buffer && item.url) {
    console.log(`[FETCH] Downloading ${item.niche}/${item.slot}/${item.file}...`);
    try {
      const resp = await fetch(item.url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const arrayBuf = await resp.arrayBuffer();
      buffer = Buffer.from(arrayBuf);
    } catch (err) {
      console.error(`[ERROR] Failed to fetch ${item.url}:`, err.message);
      return;
    }
  }

  if (!buffer) {
    console.warn(`[WARN] No source found for ${item.niche}/${item.slot}/${item.file}`);
    return;
  }

  try {
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

    await pipeline
      .webp({ quality: 82, effort: 4 })
      .toFile(destPath);

    const stats = fs.statSync(destPath);
    console.log(`  ✓ Converted to WebP: ${item.niche}/${item.slot}/${item.file} (${(stats.size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`[SHARP ERROR] ${destPath}:`, err.message);
  }
}

async function run() {
  console.log(`Starting niche photo library build (${NICHE_IMAGE_MANIFEST.length} photos)...`);
  for (let i = 0; i < NICHE_IMAGE_MANIFEST.length; i++) {
    await processOne(NICHE_IMAGE_MANIFEST[i]);
  }
  console.log('Build complete!');
}

run().catch(console.error);
