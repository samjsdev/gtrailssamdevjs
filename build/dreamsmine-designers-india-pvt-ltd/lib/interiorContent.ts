export type ServiceDetail = {
  iconKey: string;
  tagline: string;
  description: string;
  benefits: string[];
  process: string[];
  image?: string;
};

export type InteriorGuide = {
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

/* ============================================
   Image Constants
   ============================================ */

export const HERO_IMAGES = {
  home: "/images/all/premium-villas/villa-09.webp",
  services: "/images/all/premium-villas/villa-04.webp",
  gallery: "/images/all/premium-villas/villa-07.webp",
  about: "/images/all/premium-villas/villa-01.webp",
  contact: "/images/all/premium-villas/villa-05.webp",
  designer: "/images/all/brand-assets/brand-02.webp",
};

// Keep backward compatibility
export const INTERIOR_HERO_IMAGES = HERO_IMAGES;

/* ============================================
   Project Gallery Images (for sliders)
   ============================================ */

export const PROJECT_IMAGES = {
  exteriorElevations: Array.from({ length: 55 }, (_, i) => 
    `/images/all/exterior-elevations/elevation-${String(i + 1).padStart(2, '0')}.webp`
  ),
  premiumVillas: Array.from({ length: 9 }, (_, i) => 
    `/images/all/premium-villas/villa-${String(i + 1).padStart(2, '0')}.webp`
  ),
  interiorPromos: Array.from({ length: 9 }, (_, i) => 
    `/images/all/interior-promos/promo-${String(i + 1).padStart(2, '0')}.webp`
  ),
  brandAssets: [
    "/images/all/brand-assets/brand-01.webp",
    "/images/all/brand-assets/brand-02.webp",
  ],
};

// Curated hero slider images (best visuals for hero carousel)
export const HERO_SLIDER_IMAGES = [
  "/images/all/premium-villas/villa-09.webp",
  "/images/all/premium-villas/villa-04.webp",
  "/images/all/premium-villas/villa-07.webp",
  "/images/all/exterior-elevations/elevation-10.webp",
  "/images/all/premium-villas/villa-02.webp",
];

// Curated project showcase (for projects slider on homepage)
export const SHOWCASE_PROJECTS = [
  {
    image: "/images/all/premium-villas/villa-09.webp",
    title: "Modern Duplex Villa",
    category: "Premium Villa",
    location: "Kundrathur, Chennai",
  },
  {
    image: "/images/all/premium-villas/villa-04.webp",
    title: "Contemporary Elevation",
    category: "Exterior Design",
    location: "Chennai",
  },
  {
    image: "/images/all/premium-villas/villa-07.webp",
    title: "Luxury Residence",
    category: "Premium Villa",
    location: "Chennai",
  },
  {
    image: "/images/all/exterior-elevations/elevation-06.webp",
    title: "Individual House",
    category: "Residential",
    location: "Chennai",
  },
  {
    image: "/images/all/exterior-elevations/elevation-10.webp",
    title: "3-Floor Elevation",
    category: "Exterior Design",
    location: "Chennai",
  },
  {
    image: "/images/all/premium-villas/villa-01.webp",
    title: "Vastu Compliant Home",
    category: "Residential",
    location: "Kundrathur",
  },
  {
    image: "/images/all/exterior-elevations/elevation-15.webp",
    title: "Double Floor House",
    category: "Residential",
    location: "Chennai",
  },
  {
    image: "/images/all/premium-villas/villa-05.webp",
    title: "Premium Elevation Design",
    category: "Exterior Design",
    location: "Chennai",
  },
];

/* ============================================
   Services Data
   ============================================ */

export const DEFAULT_INTERIOR_SERVICES = [
  "Residential Construction",
  "Exterior Elevation Design",
  "Interior Design & Styling",
  "Modular Kitchen Design",
  "2D/3D Planning & Vastu",
  "Renovation & Makeovers",
];

export const DEFAULT_INTERIOR_HIGHLIGHTS = [
  "100% Vastu Compliant Plans",
  "ISO 9001 Certified Quality",
  "1 Year Free Maintenance",
  "10 Year Material Warranty",
  "Easy EMI Options Available",
  "Premium Brand Materials",
];

export const CONSTRUCTION_INCLUDES = [
  { item: "2D/3D Plan", icon: "drafting-compass" },
  { item: "Overhead Water Tank", icon: "droplets" },
  { item: "Anti-Termite Treatment", icon: "shield-check" },
  { item: "Basement Bitumen Coating", icon: "layers" },
  { item: "Cool Roof Tiles", icon: "sun" },
  { item: "Modular Kitchen", icon: "utensils" },
  { item: "Staircase Granite", icon: "stairs" },
  { item: "1 Year Maintenance", icon: "wrench" },
];

export const ASSOCIATED_BRANDS = [
  { name: "ARS 550D", category: "TMT Steel Bars", color: "#D32F2F" },
  { name: "KAG Tiles", category: "Premium Tiles", color: "#1565C0" },
  { name: "Asian Paints", category: "Paints & Coatings", color: "#E65100" },
  { name: "Orbit", category: "Wires & Cables", color: "#2E7D32" },
  { name: "Finolex", category: "Industries", color: "#C62828" },
  { name: "Parryware", category: "Sanitaryware", color: "#0277BD" },
];

/* ============================================
   Reviews
   ============================================ */

export const DEFAULT_INTERIOR_REVIEWS = [
  {
    author: "Ananya Rao",
    rating: 5,
    text: "Dreamsmine built our dream home in Kundrathur with complete Vastu compliance. The quality of construction at Rs.2200/sqft is unbeatable. Highly recommend!",
  },
  {
    author: "Karthik Menon",
    rating: 5,
    text: "Excellent modular kitchen and interior work. They used premium brands like Asian Paints and KAG Tiles. The 10-year warranty gives great peace of mind.",
  },
  {
    author: "Priya Lakshmi",
    rating: 5,
    text: "From 2D planning to final handover, everything was transparent. The anti-termite treatment and cool roof tiles are thoughtful additions. Very professional team.",
  },
];

/* ============================================
   FAQs
   ============================================ */

export const INTERIOR_FAQS = [
  {
    q: "What is the cost per square foot for residential construction?",
    a: "Our residential construction starts at Rs.2200/sqft. This includes 2D/3D planning, Vastu compliance, overhead water tank, anti-termite treatment, basement bitumen coating, cool roof tiles, modular kitchen, staircase granite, and 1 year free maintenance. The final cost may vary based on specific design requirements and material choices.",
  },
  {
    q: "Do you provide 100% Vastu compliant house plans?",
    a: "Yes, all our residential construction projects are designed with 100% Vastu compliance. Our architects create floor plans that follow Vastu Shastra principles while maximizing space utilization and ensuring modern aesthetics.",
  },
  {
    q: "What brands of materials do you use in construction?",
    a: "We use only premium, certified materials from trusted brands: ARS 550D TMT Steel Bars for structural strength, KAG Tiles for flooring, Asian Paints for interior/exterior painting, Orbit Wires & Cables for electrical work, Finolex for plumbing, and Parryware for sanitary fittings.",
  },
  {
    q: "What warranty do you offer on completed homes?",
    a: "We provide a comprehensive 1-year free maintenance warranty on all construction work and a 10-year material warranty. This covers structural integrity, plumbing, electrical, and finishing work. Our ISO 9001 certification ensures consistent quality standards.",
  },
  {
    q: "Do you offer EMI or financing options?",
    a: "Yes, we offer easy EMI options for both construction and interior design projects. This makes it convenient for homeowners to build or renovate their dream home without financial strain. Contact us for detailed payment plan options.",
  },
  {
    q: "What areas do you serve in Chennai?",
    a: "We primarily serve Kundrathur, Pammal, Pallavaram, Chromepet, Tambaram, and surrounding areas in Chennai. We also take up projects across Tamil Nadu for larger residential and commercial builds.",
  },
];

/* ============================================
   Gallery Categories
   ============================================ */

export const INTERIOR_GALLERY_PREVIEW = [
  { title: "Modern Elevation", sub: "Exterior Design" },
  { title: "Modular Kitchen", sub: "Interior Design" },
  { title: "Premium Villa", sub: "Construction" },
];

export const GALLERY_CATEGORIES = [
  {
    id: "all",
    label: "All Projects",
    images: [
      ...PROJECT_IMAGES.premiumVillas,
      ...PROJECT_IMAGES.exteriorElevations.slice(0, 20),
    ],
  },
  {
    id: "exterior",
    label: "Exterior Elevations",
    images: PROJECT_IMAGES.exteriorElevations,
  },
  {
    id: "villas",
    label: "Premium Villas",
    images: PROJECT_IMAGES.premiumVillas,
  },
  {
    id: "interiors",
    label: "Interior Design",
    images: PROJECT_IMAGES.interiorPromos,
  },
];

/* ============================================
   Service Details (for service pages)
   ============================================ */

export const INTERIOR_SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "residential construction": {
    iconKey: "building",
    tagline: "Quality homes built with honest pricing and premium materials.",
    description:
      "We build individual houses, duplex villas, and multi-floor residences from foundation to finishing. Every project includes 100% Vastu compliant planning, premium brand materials (ARS TMT, KAG Tiles, Asian Paints), and a comprehensive warranty. Our Rs.2200/sqft package covers 2D/3D planning, anti-termite treatment, modular kitchen, and much more.",
    benefits: [
      "100% Vastu compliant architectural planning",
      "Premium materials from trusted brands (ARS, KAG, Asian Paints)",
      "Rs.2200/sqft all-inclusive construction package",
      "1 Year free maintenance + 10 Year material warranty",
      "Anti-termite treatment & basement bitumen coating included",
      "Modular kitchen & staircase granite included",
    ],
    process: [
      "Initial consultation, site visit, and requirement analysis",
      "2D/3D architectural planning with Vastu compliance",
      "Material selection, budget finalization, and approval",
      "Foundation, structural work, and construction execution",
      "Interior finishing, modular kitchen, and final handover",
    ],
    image: "/images/all/brand-assets/brand-01.webp",
  },
  "exterior elevation design": {
    iconKey: "layers",
    tagline: "Stunning modern facades that make your home stand out.",
    description:
      "Transform your home's exterior with contemporary elevation designs. We create 3D rendered elevations that blend modern architecture with practical construction. From single-floor houses to three-story buildings, our designs consider aesthetics, structural integrity, and local building regulations.",
    benefits: [
      "Photorealistic 3D elevation renders before construction",
      "Modern contemporary and traditional design options",
      "Structural feasibility analysis included",
      "Material-efficient designs that reduce cost",
      "Multiple revision rounds until you're satisfied",
    ],
    process: [
      "Understand plot dimensions, orientation, and preferences",
      "Create multiple elevation concept sketches",
      "Develop detailed 3D renders with material specifications",
      "Finalize design with structural engineer approval",
      "Provide construction-ready elevation drawings",
    ],
    image: "/images/all/exterior-elevations/elevation-10.webp",
  },
  "interior design & styling": {
    iconKey: "palette",
    tagline: "Chennai's leading interiors — where style meets function.",
    description:
      "Complete home interior design from living room to bedroom, with premium materials and a 10-year warranty. We handle false ceiling, wall paneling, TV units, wardrobe design, lighting, and complete room styling. Our interiors start from just 1.5 Lakhs with easy EMI options.",
    benefits: [
      "Full home interior design starting from Rs.1.5 Lakhs",
      "10-year material warranty on all interior work",
      "Premium finishes with Asian Paints and branded materials",
      "Living room, bedroom, dining — complete styling",
      "Easy EMI options for hassle-free payments",
    ],
    process: [
      "Design consultation and space assessment",
      "Mood board, material palette, and budget planning",
      "3D visualization of proposed interiors",
      "Material procurement and execution",
      "Final styling, quality check, and handover",
    ],
    image: "/images/all/interior-promos/promo-04.webp",
  },
  "modular kitchen design": {
    iconKey: "utensils",
    tagline: "A kitchen built for movement, storage, and everyday ease.",
    description:
      "Premium modular kitchen design with optimized workflow, durable finishes, and smart storage solutions. We plan every cabinet, counter, handle, light, and backsplash for cooking efficiency while making the kitchen one of the most elegant spaces in your home.",
    benefits: [
      "Ergonomic work triangle planning for cooking efficiency",
      "Premium hardware and durable countertop options",
      "Smart storage for utensils, pantry, and appliances",
      "LED lighting and stylish backsplash designs",
      "Branded fittings and appliance integration",
    ],
    process: [
      "Measure the space and map cooking habits",
      "Create ergonomic layout and storage zoning",
      "Select finishes, hardware, lighting, and appliances",
      "Fabrication, installation, and quality checks",
    ],
    image: "/images/all/interior-promos/promo-09.webp",
  },
  "2d/3d planning & vastu": {
    iconKey: "drafting-compass",
    tagline: "Every square foot planned with purpose and Vastu wisdom.",
    description:
      "Comprehensive 2D floor plans and 3D rendered visualizations with 100% Vastu compliance. Before any construction begins, we create detailed architectural plans that maximize space, ensure proper ventilation, and follow Vastu Shastra principles for prosperity and well-being.",
    benefits: [
      "100% Vastu Shastra compliant floor plans",
      "Detailed 2D CAD drawings with dimensions",
      "Photorealistic 3D renders for visualization",
      "Space optimization for every square foot",
      "Government approval-ready documentation",
    ],
    process: [
      "Plot survey, orientation analysis, and Vastu assessment",
      "Initial floor plan options with room configurations",
      "Detailed 2D drawings with electrical and plumbing layouts",
      "3D rendered walkthrough for visualization",
      "Final approved plans for construction execution",
    ],
    image: "/images/all/exterior-elevations/elevation-51.webp",
  },
  "renovation & makeovers": {
    iconKey: "hammer",
    tagline: "A thoughtful refresh without starting from zero.",
    description:
      "Transform your existing home with strategic renovations. Whether it's a complete bedroom makeover, living room restyling, or kitchen upgrade, we bring fresh life to your space. Our renovation packages include painting, lighting, furniture, storage updates, and modern finishing touches.",
    benefits: [
      "High-impact refresh with controlled scope and budget",
      "Reuse of existing structures where practical",
      "Modern upgrades: lighting, paint, flooring, false ceiling",
      "Quick turnaround compared to new construction",
      "Same premium materials and warranty as new builds",
    ],
    process: [
      "Site assessment — what stays, what changes, what needs repair",
      "Renovation plan with budget-friendly priorities",
      "Material selection and design finalization",
      "Execution with minimal disruption to daily life",
      "Final inspection, styling, and handover",
    ],
    image: "/images/all/interior-promos/promo-01.webp",
  },
};

/* ============================================
   Stats for Counter Section
   ============================================ */

export const BUSINESS_STATS = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Vastu Compliant" },
  { value: 2200, prefix: "₹", suffix: "", label: "Per Sq.ft" },
];

/* ============================================
   Guide Articles
   ============================================ */

export const INTERIOR_GUIDES: InteriorGuide[] = [
  {
    iconKey: "wallet",
    category: "Budget Planning",
    title: "How to Set a Realistic Home Construction Budget",
    intro:
      "A good budget is not just a number. It's a set of priorities that determines where to invest in quality materials and where smart alternatives work just as well.",
    sections: [
      {
        heading: "Start With Structure, Not Finishes",
        content:
          "Prioritize foundation, structural steel, roofing, and plumbing before decorative finishes. A strong structure with good TMT bars (like ARS 550D) ensures your home lasts generations.",
      },
      {
        heading: "Keep a 10-15% Contingency",
        content:
          "Construction projects can reveal hidden site conditions or small upgrades that genuinely improve the result. A contingency buffer prevents panic decisions.",
      },
    ],
    tips: [
      "Get a detailed per-sqft breakdown before signing",
      "Confirm what's included vs extra (modular kitchen, painting, etc.)",
      "Compare material brands — premium doesn't always mean most expensive",
      "Ask about EMI options for better cash flow management",
    ],
  },
  {
    iconKey: "ruler",
    category: "Vastu Planning",
    title: "Why Vastu Compliance Matters in Modern Homes",
    intro:
      "Vastu Shastra isn't just tradition — it's about optimal orientation, ventilation, and energy flow. Modern Vastu-compliant designs look contemporary while following time-tested principles.",
    sections: [
      {
        heading: "Orientation and Natural Light",
        content:
          "A Vastu-compliant plan ensures the master bedroom, kitchen, and prayer room are positioned for maximum natural light and positive energy flow.",
      },
      {
        heading: "Room Placement That Works",
        content:
          "Kitchen in the southeast, master bedroom in the southwest, entrance in the northeast — these positions aren't arbitrary but based on solar movement and ventilation patterns.",
      },
    ],
    tips: [
      "Share your plot orientation with the architect on day one",
      "Vastu-compliant plans can be fully modern in aesthetics",
      "Don't compromise structural safety for Vastu adjustments",
      "A good architect integrates Vastu without the home looking dated",
    ],
  },
  {
    iconKey: "lightbulb",
    category: "Construction Tips",
    title: "Choosing the Right Materials for Chennai's Climate",
    intro:
      "Chennai's heat, humidity, and monsoon rains demand specific material choices. The right selection keeps your home cool, dry, and low-maintenance for years.",
    sections: [
      {
        heading: "Cool Roof Tiles & Heat Resistance",
        content:
          "Cool roof tiles reflect solar radiation, keeping interiors 3-5°C cooler. Combined with proper wall insulation, they dramatically reduce AC costs.",
      },
      {
        heading: "Anti-Termite & Waterproofing",
        content:
          "Chennai's soil conditions make anti-termite treatment and basement bitumen coating essential. These preventive measures save lakhs in future repair costs.",
      },
    ],
    tips: [
      "Always insist on anti-termite treatment before foundation",
      "Use ISI-marked TMT bars for structural integrity",
      "Choose paints with anti-fungal properties for exterior walls",
      "Proper waterproofing prevents 80% of common construction complaints",
    ],
  },
];

/* ============================================
   Helper Functions
   ============================================ */

function findServiceKey(serviceName: string): string | null {
  const lower = serviceName.toLowerCase();

  for (const key in INTERIOR_SERVICE_DETAILS) {
    if (lower.includes(key) || key.includes(lower)) {
      return key;
    }
  }

  const keywords = lower.split(/\s+/);
  for (const key in INTERIOR_SERVICE_DETAILS) {
    if (keywords.some((keyword) => keyword.length > 3 && key.includes(keyword))) {
      return key;
    }
  }

  return null;
}

export function getInteriorServiceData(serviceName: string): ServiceDetail | null {
  const serviceKey = findServiceKey(serviceName);
  if (!serviceKey) return null;
  return INTERIOR_SERVICE_DETAILS[serviceKey];
}

export function getInteriorServiceSummary(serviceName: string): string {
  return (
    getInteriorServiceData(serviceName)?.description ||
    "Professional design and construction service tailored to your requirements, budget, and timeline — with premium materials and comprehensive warranty."
  );
}

export function getServiceImage(serviceName: string, media: any): string | null {
  const data = getInteriorServiceData(serviceName);
  if (data?.image) return data.image;

  if (!media?.clinicImages) return null;
  return media.clinicImages[0] || null;
}
