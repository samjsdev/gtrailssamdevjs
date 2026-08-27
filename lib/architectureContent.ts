export type ArchitectureServiceDetail = {
  iconKey: string;
  tagline: string;
  description: string;
  benefits: string[];
  process: string[];
  image?: string;
};

export type ArchitectureGuide = {
  iconKey: string;
  category: string;
  title: string;
  intro: string;
  sections: {
    heading: string;
    content: string;
  }[];
  tips: string[];
};

/** Curated local high-definition architecture stock photography. */
export const ARCHITECTURE_STOCK = {
  heroes: [
    '/images/architecture/hero-villa-twilight.webp',
    '/images/architecture/hero-minimalist-residence.webp',
    '/images/architecture/modern-villa-duplex.webp',
    '/images/architecture/cantilever-garden-overhang.webp',
    '/images/architecture/courtyard-water-residence.webp',
    '/images/architecture/monolithic-brutalist-facade.webp',
  ],
  gallery: [
    '/images/architecture/cantilever-garden-overhang.webp',
    '/images/architecture/courtyard-water-residence.webp',
    '/images/architecture/modern-villa-duplex.webp',
    '/images/architecture/geometric-villa-elevation.webp',
    '/images/architecture/monolithic-brutalist-facade.webp',
    '/images/architecture/porotherm-clay-facade.webp',
    '/images/architecture/monolithic-concrete-atrium.webp',
    '/images/architecture/living-room-double-height.webp',
    '/images/architecture/terrace-cool-roof.webp',
    '/images/architecture/granite-teak-portal.webp',
    '/images/architecture/villa-after-finished.webp',
    '/images/architecture/hero-villa-twilight.webp',
  ],
  services: [
    '/images/architecture/villa-before-frame.webp',
    '/images/architecture/bim-3d-walkthrough.webp',
    '/images/architecture/cmda-sanction-drafting.webp',
    '/images/architecture/staad-structural-engineering.webp',
    '/images/architecture/courtyard-water-residence.webp',
    '/images/architecture/modular-kitchen-luxury.webp',
  ],
  interiors: [
    '/images/architecture/modular-kitchen-luxury.webp',
    '/images/architecture/living-room-double-height.webp',
    '/images/architecture/luxury-master-bedroom.webp',
    '/images/architecture/custom-furniture-joinery.webp',
    '/images/architecture/space-planning-atrium.webp',
    '/images/architecture/monolithic-concrete-atrium.webp',
  ],
  construction: [
    '/images/architecture/villa-before-frame.webp',
    '/images/architecture/staad-structural-engineering.webp',
    '/images/architecture/structural-construction-frame.webp',
  ],
  villas: [
    '/images/architecture/hero-villa-twilight.webp',
    '/images/architecture/villa-after-finished.webp',
    '/images/architecture/modern-villa-duplex.webp',
    '/images/architecture/cantilever-garden-overhang.webp',
    '/images/architecture/monolithic-brutalist-facade.webp',
  ],
  commercial: [
    '/images/architecture/civic-landmark-facade.webp',
    '/images/architecture/glass-curtain-wall.webp',
    '/images/architecture/urban-master-plan.webp',
  ],
  about: [
    '/images/architecture/architectural-atelier-studio.webp',
    '/images/architecture/cmda-sanction-drafting.webp',
    '/images/architecture/bim-3d-walkthrough.webp',
  ],
  studio: [
    '/images/architecture/architectural-atelier-studio.webp',
    '/images/architecture/cmda-sanction-drafting.webp',
  ],
  people: [
    '/images/architecture/principal-architect.webp',
    '/images/architecture/senior-structural-engineer.webp',
  ],
} as const;

export function stockArchitectureImage(
  kind: keyof typeof ARCHITECTURE_STOCK,
  index = 0
): string {
  const list = (ARCHITECTURE_STOCK as any)[kind] || ARCHITECTURE_STOCK.heroes;
  return list[index % list.length];
}

export const PREVIEW_STOCK_DEFAULT = true;

/** Blank client media arrays so templates fall through to local stock images. */
export function previewMedia(media: any): {
  clinicImages: string[];
  treatmentImages: string[];
  otherImages: string[];
} {
  if (!PREVIEW_STOCK_DEFAULT) {
    return {
      clinicImages: media?.clinicImages || [],
      treatmentImages: media?.treatmentImages || [],
      otherImages: media?.otherImages || [],
    };
  }
  return { clinicImages: [], treatmentImages: [], otherImages: [] };
}

export const ARCHITECTURE_HERO_IMAGES = {
  home: ARCHITECTURE_STOCK.heroes[0],
  services: ARCHITECTURE_STOCK.services[0],
  gallery: ARCHITECTURE_STOCK.gallery[0],
  guides: ARCHITECTURE_STOCK.services[1],
  about: ARCHITECTURE_STOCK.about[0],
  contact: ARCHITECTURE_STOCK.studio[0],
  architect: ARCHITECTURE_STOCK.people[0],
};

export const DEFAULT_ARCHITECTURE_SERVICES = [
  "Modern Villa Construction",
  "Residential Home Building",
  "Commercial Establishments & Offices",
  "3D Elevation & Floor Plan Design",
  "CMDA & DTCP Approved Plans",
  "100% Vaastu Compliant Planning",
];

export const DEFAULT_ARCHITECTURE_HIGHLIGHTS = [
  "Licensed Architects & Certified Structural Engineers",
  "100% CMDA & Greater Chennai Corporation Approval Record",
  "Strong Soil-Tested Foundations with Tata Tiscon Steel & Grade-53 Cement",
  "Fixed Price Contract with No Hidden Costs & 10-Year Warranty",
];

export const DEFAULT_ARCHITECTURE_REVIEWS = [
  {
    author: "Dr. Vikramaditya Chandran",
    rating: 5,
    text: "Built our 5,400 sq.ft individual villa on ECR. They handled everything from soil testing and CMDA plan approval to the final painting and key handover. Excellent quality materials, timely work, and zero cost increase from the original budget.",
  },
  {
    author: "Meera & K. S. Sundararajan",
    rating: 5,
    text: "We wanted a modern independent house in Anna Nagar with 100% Vaastu compliance. Their architects designed large airy rooms with an open central courtyard that keeps the house cool even during peak Chennai summers. Highly recommended.",
  },
  {
    author: "Anand Narayanan (OMR)",
    rating: 5,
    text: "Built our commercial office building in Sholinganallur. Their structural team tested the soil and built solid pile foundations. The 3D elevation walkthrough showed us exactly how the building would look before construction started.",
  },
];

export const ARCHITECTURE_FAQS = [
  {
    q: "How do you handle CMDA and Chennai Corporation plan approvals?",
    a: "We manage the complete government approval process through the single-window online system. We prepare all sanction drawings, verify road width rules, calculate FSI, and get your official building permit without hassle.",
  },
  {
    q: "How do you design foundations for Chennai soil conditions?",
    a: "We always do a soil test on your plot before building. For sandy soil on ECR, we use reinforced raft footings. For clayey soil and high water tables in OMR, Velachery, and Tambaram, we use deep pile foundations so your house never develops cracks.",
  },
  {
    q: "Do you follow 100% Vaastu for room planning?",
    a: "Yes. Almost all our Chennai clients request Vaastu. We correctly place the pooja room and water sump in the North-East, kitchen in the South-East, and master bedroom in the South-West, while keeping the home modern, bright, and spacious.",
  },
  {
    q: "How are your homes designed for Chennai hot summers and heavy rains?",
    a: "We design homes with cross ventilation to catch cool evening sea breezes, high plinths (3 to 4 feet above road level) to protect against monsoon flooding, heat-resistant terrace tiles, and compulsory rainwater harvesting pits.",
  },
  {
    q: "Will construction costs increase after we sign the contract?",
    a: "No. We give you a complete item-by-item cost estimate before starting work. We specify the exact brands—Tata Tiscon steel, UltraTech cement, and premium fittings. The price is fixed with zero hidden charges.",
  },
];

export const ARCHITECTURE_GALLERY_PREVIEW = [
  { title: "Modern Luxury Villa", sub: "East Coast Road (ECR), Chennai · 5,400 sq.ft" },
  { title: "Traditional Courtyard Home", sub: "Anna Nagar, Chennai · 4,800 sq.ft" },
  { title: "Commercial Office Complex", sub: "OMR IT Corridor, Chennai · 12,000 sq.ft" },
];

export const ARCHITECTURE_SERVICE_DETAILS: Record<string, ArchitectureServiceDetail> = {
  "modern villa construction": {
    iconKey: "home",
    tagline: "Custom-built luxury villas and independent houses built to last generations.",
    description:
      "We build modern luxury villas across Chennai including ECR, OMR, Anna Nagar, Adyar, and Porur. From soil testing and foundation to complete civil construction, electrical, plumbing, and painting, we deliver turnkey homes with a 10-year structural warranty.",
    benefits: [
      "Top-grade materials: Tata Tiscon 550D steel, UltraTech 53 grade cement & quality sand",
      "Soil-tested solid foundation (Bored RCC Piles / Raft / Column Footings)",
      "Zero cost increase with a complete item-by-item fixed budget",
      "10-year structural warranty with regular photo updates during construction",
    ],
    process: [
      "Soil testing on your plot and boundary level survey",
      "3D elevation design, structural drawings, and municipal approval",
      "Complete civil construction, brickwork, plastering, and waterproofing",
      "Final 300-point quality check and key handover celebration",
    ],
    image: '/images/architecture/villa-after-finished.webp',
  },
  "residential home building": {
    iconKey: "home",
    tagline: "Quality turnkey house construction from foundation to final key handover.",
    description:
      "Complete residential construction services for individual plots. We use primary Tata Tiscon Fe550D steel, UltraTech 53 grade cement, and quality river sand or M-sand. Every stage is inspected by licensed civil engineers.",
    benefits: [
      "Turnkey package covering labor, materials, electrical, and plumbing",
      "Engineered plinth height raised 3 to 4 feet above road level for flood safety",
      "Clear milestone-based payments tied to actual site progress",
      "Direct supervision by qualified site civil engineers daily",
    ],
    process: [
      "Plot inspection, lifestyle requirements, and budget discussion",
      "Floor plan finalization and government sanction submission",
      "Reinforced concrete slab casting, brick walls, and electrical/plumbing lines",
      "Flooring, doors, painting, and final handover",
    ],
    image: '/images/architecture/modern-villa-duplex.webp',
  },
  "commercial establishments & offices": {
    iconKey: "fileCheck",
    tagline: "Contemporary office buildings, retail spaces, and commercial complexes.",
    description:
      "We design and build commercial complexes, corporate offices, and mixed-use retail buildings. Optimized for maximum usable floor area (FSI), customer parking, fire safety regulations, and modern glass facades.",
    benefits: [
      "Maximum legal built-up area (FSI) utilization within municipal regulations",
      "Open column-free floor layouts ideal for modern offices and showrooms",
      "Complete statutory clearances: CMDA, Fire safety, and Corporation NOCs",
      "Energy-efficient glass facades and dedicated service utility shafts",
    ],
    process: [
      "Commercial plot zoning analysis and commercial FSI calculation",
      "Traffic flow, parking layout, and architectural structural planning",
      "CMDA commercial sanction filing and government liaison",
      "Rapid turnkey execution with tested commercial grade materials",
    ],
    image: '/images/architecture/civic-landmark-facade.webp',
  },
  "3d elevation & floor plan design": {
    iconKey: "compass",
    tagline: "Realistic 3D views and walkthroughs before construction begins.",
    description:
      "See your dream home before spending a single rupee on construction. We create realistic 3D exterior elevations, daytime and night views, and complete architectural floor plans so you can review room sizes and layout clearly.",
    benefits: [
      "Photorealistic 3D exterior and interior elevation views",
      "Walk through your future home in 3D to finalize window positions and colors",
      "Accurate room dimensions and furniture placement layouts",
      "Prevents costly changes and demolition during actual construction",
    ],
    process: [
      "Plot measurements and family room requirement checklist",
      "2D architectural floor plan with room sizes and Vaastu alignment",
      "3D realistic exterior elevation styling and color palettes",
      "Detailed civil drawings and working plans ready for site execution",
    ],
    image: '/images/architecture/bim-3d-walkthrough.webp',
  },
  "cmda & dtcp sanction plan approvals": {
    iconKey: "fileCheck",
    tagline: "100% legal building permits and hassle-free plan sanction approvals.",
    description:
      "We handle complete building plan approval with CMDA, Greater Chennai Corporation (GCC), and DTCP. We ensure your plans strictly follow building setback rules, road width norms, and rainwater harvesting requirements.",
    benefits: [
      "100% legal approvals with zero risk of demolition notices",
      "Handled by licensed Council of Architecture liaison professionals",
      "Mandatory rainwater harvesting and percolation pit design included",
      "Assistance with electricity (TANGEDCO) and water (CMWSSB) documentation",
    ],
    process: [
      "Patta, parent documents, and plot sketch verification",
      "Sanction blueprint preparation according to Chennai building rules",
      "Online application submission through the single-window portal",
      "Site inspection follow-up and receipt of approved building permit",
    ],
    image: '/images/architecture/cmda-sanction-drafting.webp',
  },
  "100% vaastu compliant planning": {
    iconKey: "sparkles",
    tagline: "Traditional Vaastu harmony combined with modern living spaces.",
    description:
      "Proper placement of pooja room, kitchen, bedrooms, staircase, borewell, and septic tank according to authentic Vaastu rules, while ensuring large windows, good ventilation, and beautiful modern interiors.",
    benefits: [
      "100% Vaastu-compliant room placement for peace of mind",
      "Pooja room and underground sump in the auspicious North-East (Eesanyan)",
      "Modern modular kitchen in the South-East (Agni corner)",
      "Master bedroom in the South-West (Niruthi) with peaceful privacy",
    ],
    process: [
      "Compass direction verification of your plot entrance and roads",
      "Vaastu grid mapping aligned with family lifestyle needs",
      "Integration of Vaastu zones into bright, modern architectural plans",
      "Final review and Vaastu compliance certificate",
    ],
    image: '/images/architecture/courtyard-water-residence.webp',
  },
  // Compatibility aliases
  "turnkey residential villa construction": {
    iconKey: "home",
    tagline: "Custom-built luxury villas and independent houses built to last generations.",
    description: "We build modern luxury villas across Chennai including ECR, OMR, Anna Nagar, Adyar, and Porur. From soil testing and foundation to complete civil construction, electrical, plumbing, and painting, we deliver turnkey homes with a 10-year structural warranty.",
    benefits: [
      "Top-grade materials: Tata Tiscon 550D steel, UltraTech 53 grade cement & quality sand",
      "Soil-tested solid foundation (Bored RCC Piles / Raft / Column Footings)",
      "Zero cost increase with a complete item-by-item fixed budget",
      "10-year structural warranty with regular photo updates during construction",
    ],
    process: [
      "Soil testing on your plot and boundary level survey",
      "3D elevation design, structural drawings, and municipal approval",
      "Complete civil construction, brickwork, plastering, and waterproofing",
      "Final 300-point quality check and key handover celebration",
    ],
    image: '/images/architecture/structural-construction-frame.webp',
  },
  "architectural concept & 3d bim walkthroughs": {
    iconKey: "compass",
    tagline: "Realistic 3D views and walkthroughs before construction begins.",
    description: "See your dream home before spending a single rupee on construction. We create realistic 3D exterior elevations, daytime and night views, and complete architectural floor plans so you can review room sizes and layout clearly.",
    benefits: [
      "Photorealistic 3D exterior and interior elevation views",
      "Walk through your future home in 3D to finalize window positions and colors",
      "Accurate room dimensions and furniture placement layouts",
      "Prevents costly changes and demolition during actual construction",
    ],
    process: [
      "Plot measurements and family room requirement checklist",
      "2D architectural floor plan with room sizes and Vaastu alignment",
      "3D realistic exterior elevation styling and color palettes",
      "Detailed civil drawings and working plans ready for site execution",
    ],
    image: '/images/architecture/bim-3d-walkthrough.webp',
  },
  "structural engineering & soil-matched foundations": {
    iconKey: "layers",
    tagline: "Engineered foundations designed for Chennai soil and water tables.",
    description: "Our licensed structural engineers test plot soil and design site-matched foundations—whether deep concrete piles for OMR clay or solid raft footings for ECR sand—guaranteeing lifetime safety against cracks.",
    benefits: [
      "Soil-tested foundation eliminating cracks and water seepage",
      "Tata Tiscon Fe550D corrosion-resistant steel rebar detailing",
      "Computerized structural load calculations for complete safety",
      "Mandatory engineer site inspections before every concrete pour",
    ],
    process: [
      "Soil borehole testing and soil load-bearing capacity report",
      "Structural engineering design and column rebar schedules",
      "On-site rebar inspection before concrete pouring",
      "Concrete strength cube testing at 7, 14, and 28 days",
    ],
    image: '/images/architecture/staad-structural-engineering.webp',
  },
  "climate-responsive courtyard architecture": {
    iconKey: "hardhat",
    tagline: "Cool homes designed for Chennai weather with natural air circulation.",
    description: "Beat the Chennai summer heat with smart home design: central open courtyards for natural air cooling, heat-insulating clay bricks, shaded verandas, and high plinths for complete monsoon flood safety.",
    benefits: [
      "Cooler indoor rooms naturally without heavy air-conditioning bills",
      "Continuous fresh air circulation catching evening sea breezes",
      "Plinths built 3 to 4 feet above road level to prevent rainwater entry",
      "Terrace heat-reflective cool roof tiles keeping top-floor bedrooms cool",
    ],
    process: [
      "Sun-path and wind direction study for your plot",
      "Courtyard and window placement for cross ventilation",
      "Heat-insulating clay brick and double-glazed window planning",
      "Rainwater harvesting collection channels and recharge pits",
    ],
    image: '/images/architecture/courtyard-water-residence.webp',
  },
};

export const ARCHITECTURE_GUIDES: ArchitectureGuide[] = [
  {
    iconKey: "ruler",
    category: "Site & Statutory",
    title: "Navigating CMDA & DTCP Sanctions Under TNCDBR 2019",
    intro:
      "Before breaking ground in Chennai, statutory planning permission is mandatory. Understanding Floor Space Index (FSI), road-width ratios, and mandatory setbacks under the Tamil Nadu Combined Development and Building Rules (TNCDBR) 2019 unlocks maximum living area while protecting your property from legal disputes.",
    sections: [
      {
        heading: "FSI & Road Width Ratios in Chennai",
        content:
          "Permissible FSI ranges from 1.5 to 2.0+ depending on the abutting road width (9m, 12m, or 18m). Premium FSI can be purchased through statutory payments to CMDA. Strategic architectural design places stairwells, lift shafts, open balconies, and covered car parking in exempt categories to maximize air-conditioned living space.",
      },
      {
        heading: "Setback Regulations & Rainwater Harvesting",
        content:
          "Mandatory front, side, and rear setbacks ensure natural light, emergency fire access, and air circulation. In Chennai, integrating recharge percolation pits and rainwater collection sumps is legally compulsory for building completion and CMWSSB water connections.",
      },
    ],
    tips: [
      "Verify Patta, FMB sketch, and CMDA/DTCP layout approval before purchasing land",
      "Ensure road width is verified on the official CMDA Master Plan",
      "Keep non-FSI architectural elements (verandas, balconies) optimized to rule limits",
      "Design compulsory Rainwater Harvesting (RWH) percolation pits from day one",
    ],
  },
  {
    iconKey: "layers",
    category: "Foundation & Soil",
    title: "Foundation Engineering for Chennai: Deep Piles vs. Raft Footings",
    intro:
      "Chennai presents highly varied soil strata. Building along the sandy coast of ECR requires entirely different foundation engineering compared to the expansive marine clay and high water tables of OMR, Velachery, and Pallikaranai.",
    sections: [
      {
        heading: "High Water Tables & Clayey Soil (OMR, Velachery)",
        content:
          "Marshland and black cotton clay have low Safe Bearing Capacity (SBC) and expand/contract with seasonal rains. For multi-storey residences, under-reamed or bored cast-in-situ RCC pile foundations resting on hard strata are essential to prevent differential foundation settlement and diagonal wall cracks.",
      },
      {
        heading: "Coastal Sandy Strata & Saline Breeze (ECR)",
        content:
          "Sandy coastal soils require wide raft foundations or deep reinforced pad footings. Due to saline atmospheric moisture, structural steel must be anti-corrosion CRS TMT or Tata Tiscon 550D with an increased concrete cover depth of 45mm–50mm to prevent structural rust and concrete spalling.",
      },
    ],
    tips: [
      "Always commission a Standard Penetration Test (SPT) borehole soil report",
      "Insist on M25 or M30 grade concrete with computerized batching for foundations",
      "Apply pre-construction anti-termite chemical soil barriers before casting PCC",
      "Elevate the ground floor plinth at least 3.5 to 4.5 feet above the crown of the road for flood safety",
    ],
  },
  {
    iconKey: "compass",
    category: "Climate Architecture",
    title: "Tropical Climate Design: Beating the Chennai Summer & Monsoon",
    intro:
      "Designing a residence for Chennai's tropical climate means balancing blistering summer heat (up to 42°C in May) with intense torrential rainfall during the Northeast monsoon. Passive architectural techniques keep homes serene and naturally cool.",
    sections: [
      {
        heading: "The Modern Mutham: Central Stack Cooling",
        content:
          "Inspired by traditional Tamil heritage architecture, a central double-height courtyard acts as a thermal chimney. Hot air naturally rises and escapes through high clerestory louvers, drawing cool sea breezes from low-level shaded garden openings throughout the home.",
      },
      {
        heading: "Porotherm Clay Blocks & Reflective Cool Roofs",
        content:
          "Wienerberger Porotherm hollow clay blocks provide natural air cavities that reduce thermal heat transfer by over 40% compared to solid concrete blocks. On the terrace, white solar-reflective Cool Roof tiles paired with multi-layer elastomeric waterproofing reflect solar radiation and prevent monsoon roof leaks.",
      },
    ],
    tips: [
      "Orient large glass fenestrations towards North and East to capture soft morning light",
      "Provide wide weather sunshades (chajjas) and terracotta jali screens on West and South facades",
      "Use double-glazed Low-E glass (Saint-Gobain) to block infrared heat while welcoming daylight",
      "Install solar net-metering systems on terrace pergolas to power air-conditioning during peak hours",
    ],
  },
];

function findArchitectureServiceKey(serviceName: string): string | null {
  const lower = serviceName.toLowerCase();

  for (const key in ARCHITECTURE_SERVICE_DETAILS) {
    if (lower.includes(key) || key.includes(lower)) {
      return key;
    }
  }

  const keywords = lower.split(/\s+/);
  for (const key in ARCHITECTURE_SERVICE_DETAILS) {
    if (keywords.some((keyword) => keyword.length > 3 && key.includes(keyword))) {
      return key;
    }
  }

  return null;
}

export function getArchitectureServiceData(serviceName: string): ArchitectureServiceDetail | null {
  const serviceKey = findArchitectureServiceKey(serviceName);
  if (!serviceKey) return null;

  return ARCHITECTURE_SERVICE_DETAILS[serviceKey];
}

export function getArchitectureServiceSummary(serviceName: string): string {
  return (
    getArchitectureServiceData(serviceName)?.description ||
    "A comprehensive architectural discipline combining visionary spatial concept, structural engineering, statutory compliance, and construction administration."
  );
}

export function getArchitectureServiceImage(serviceName: string, media?: any): string {
  const lower = serviceName.toLowerCase();

  // Architecture Disciplines
  if (lower.includes("bim") || lower.includes("walkthrough") || lower.includes("3d") || lower.includes("render")) {
    return "/images/architecture/bim-3d-walkthrough.webp";
  }
  if (lower.includes("cmda") || lower.includes("dtcp") || lower.includes("sanction") || lower.includes("approval") || lower.includes("permit")) {
    return "/images/architecture/cmda-sanction-drafting.webp";
  }
  if (lower.includes("structural") || lower.includes("staad") || lower.includes("foundation") || lower.includes("soil") || lower.includes("pile")) {
    return "/images/architecture/staad-structural-engineering.webp";
  }
  if (lower.includes("civil") || lower.includes("turnkey") || lower.includes("construction") || lower.includes("contract")) {
    return "/images/architecture/structural-construction-frame.webp";
  }
  if (lower.includes("mutham") || lower.includes("courtyard") || lower.includes("biophilic") || lower.includes("climate")) {
    return "/images/architecture/courtyard-water-residence.webp";
  }
  if (lower.includes("vaastu") || lower.includes("duplex") || lower.includes("urban")) {
    return "/images/architecture/modern-villa-duplex.webp";
  }
  if (lower.includes("cantilever") || lower.includes("coastal") || lower.includes("pavilion")) {
    return "/images/architecture/cantilever-garden-overhang.webp";
  }

  // Interior Spaces & Disciplines
  if (lower.includes("kitchen")) {
    return "/images/architecture/modular-kitchen-luxury.webp";
  }
  if (lower.includes("living") || lower.includes("hall") || lower.includes("lounge")) {
    return "/images/architecture/living-room-double-height.webp";
  }
  if (lower.includes("bedroom") || lower.includes("master") || lower.includes("suite")) {
    return "/images/architecture/luxury-master-bedroom.webp";
  }
  if (lower.includes("furniture") || lower.includes("joinery") || lower.includes("wood") || lower.includes("carpentry")) {
    return "/images/architecture/custom-furniture-joinery.webp";
  }
  if (lower.includes("space") || lower.includes("planning") || lower.includes("zoning") || lower.includes("layout")) {
    return "/images/architecture/space-planning-atrium.webp";
  }
  if (lower.includes("residential") || lower.includes("interior") || lower.includes("home") || lower.includes("styling")) {
    return "/images/architecture/cantilever-garden-overhang.webp";
  }

  const detail = getArchitectureServiceData(serviceName);
  if (detail?.image) return detail.image;
  return ARCHITECTURE_HERO_IMAGES.services;
}
