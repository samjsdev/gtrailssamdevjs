export type AssetQuality = "high" | "medium" | "low";

export type Asset = {
  path: string;
  category: string;
  quality: AssetQuality;
  recommendedUse: string;
};

export const heroImages = [
  "/images/all/premium-villas/villa-05.webp",
  "/images/all/premium-villas/villa-06.webp",
  "/images/all/premium-villas/villa-08.webp",
  "/images/all/exterior-elevations/elevation-31.webp",
];

export const villaShowcase = [
  {
    title: "Contemporary Duplex Villa",
    location: "Chennai residential build",
    image: "/images/all/premium-villas/villa-09.webp",
    note: "Warm exterior lighting, layered facade depth, and strong arrival sequence.",
  },
  {
    title: "Compact Urban Villa",
    location: "Vastu-led family home",
    image: "/images/all/premium-villas/villa-04.webp",
    note: "Clean balcony massing with a generous car porch and controlled material palette.",
  },
  {
    title: "Premium Corner Residence",
    location: "Turnkey design and build",
    image: "/images/all/premium-villas/villa-06.webp",
    note: "Stone, vertical fins, and warm lighting create a memorable street presence.",
  },
];

export const elevationImages = [
  "/images/all/exterior-elevations/elevation-06.webp",
  "/images/all/exterior-elevations/elevation-10.webp",
  "/images/all/exterior-elevations/elevation-15.webp",
  "/images/all/exterior-elevations/elevation-20.webp",
  "/images/all/exterior-elevations/elevation-27.webp",
  "/images/all/exterior-elevations/elevation-41.webp",
];

export const interiorProofImages = [
  "/images/all/interior-promos/promo-01.webp",
  "/images/all/interior-promos/promo-02.webp",
  "/images/all/interior-promos/promo-04.webp",
  "/images/all/interior-promos/promo-09.webp",
];

export const brandVideos = [
  {
    src: "/images/all/brand-assets/walkthrough-01.mp4",
    title: "dreamsmine builder",
  },

  {
    src: "/images/all/brand-assets/walkthrough-03.mp4",
    title: "build your dream on budget",
  },
  {
    src: "/images/all/brand-assets/walkthrough-04.mp4",
    title: "interior designs",
  },
];

export const walkthroughVideos = [
  "/images/all/brand-assets/walkthrough-01.mp4",

  "/images/all/brand-assets/walkthrough-03.mp4",
  "/images/all/brand-assets/walkthrough-04.mp4",
];

export const servicePillars = [
  {
    title: "Residential Construction",
    eyebrow: "Civil execution",
    summary:
      "End-to-end individual homes and duplex villas with structural supervision, premium materials, and site accountability.",
    image: "/images/all/premium-villas/villa-09.webp",
    proof: ["ARS 550D steel", "Anti-termite treatment", "Cool roof tiles"],
  },
  {
    title: "Exterior Elevation Design",
    eyebrow: "Facade language",
    summary:
      "Modern 2D and 3D elevations that help clients approve massing, balcony proportion, lighting, and street presence before work begins.",
    image: "/images/all/exterior-elevations/elevation-11.webp",
    proof: ["3D facade renders", "Material palette", "Lighting intent"],
  },
  {
    title: "Vastu Planning & 3D Layouts",
    eyebrow: "Blueprint discipline",
    summary:
      "Vastu-aligned plans translated into practical circulation, daylight, service lines, and family-specific room zoning.",
    image: "/images/all/exterior-elevations/elevation-46.webp",
    proof: ["2D planning", "3D visualization", "Site-fit reviews"],
  },
  {
    title: "Turnkey Interiors",
    eyebrow: "Finish and detail",
    summary:
      "Modular kitchens, wardrobes, TV units, false ceilings, paint, tile, and fixture coordination with clear budgets.",
    image: "/images/all/interior-promos/promo-01.webp",
    proof: ["Modular kitchen", "Asian Paints", "Parryware fixtures"],
  },
  {
    title: "Renovation & Makeovers",
    eyebrow: "Upgrade scope",
    summary:
      "Focused improvements for existing homes: facade upgrades, kitchen replacement, storage planning, ceiling work, paint, and finish coordination.",
    image: "/images/all/exterior-elevations/elevation-17.webp",
    proof: ["Scope audit", "Budget phasing", "Fast handover"],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery and site reading",
    text: "We begin with family needs, plot conditions, Vastu priorities, budget range, and the execution deadline.",
  },
  {
    step: "02",
    title: "Plan, elevation, and estimate",
    text: "The team aligns spatial planning, facade direction, material assumptions, and transparent line-item costing.",
  },
  {
    step: "03",
    title: "Civil and MEP coordination",
    text: "Structural work, waterproofing, electrical, plumbing, and site quality checks run from a single delivery plan.",
  },
  {
    step: "04",
    title: "Interior fit-out and handover",
    text: "Final carpentry, finishes, fixtures, maintenance cover, and warranty documentation close the project cleanly.",
  },
];

export const trustMarkers = [
  { value: "ISO 9001", label: "Certified quality systems" },
  { value: "500+", label: "Projects completed" },
  { value: "10 yr", label: "Material warranty" },
  { value: "1 yr", label: "Free maintenance" },
];

export const materialBrands = [
  "ARS 550D",
  "KAG Tiles",
  "Asian Paints",
  "Orbit",
  "Finolex",
  "Parryware",
];

export const homePackageInclusions = [
  "1 Year Maintenance",
  "Over Head Water Tank",
  "Anti-Termite Treatment",
  "Basement Bitumen Coating",
  "2D/3D Plan",
  "Cool Roof Tiles",
  "Modular Kitchen",
  "Staircase Granite"
];

export const auditInsights = {
  services:
    "Residential construction, exterior elevation design, Vastu planning, 2D/3D visualization, turnkey interiors, modular kitchens, renovation, and maintenance-backed handover.",
  projectCategories:
    "Premium villas and duplex homes, modern facade renders, Vastu floor plans, modular kitchens, bedrooms, living-room interiors, and construction walkthroughs.",
  targetCustomers:
    "Chennai landowners, families building first or upgraded homes, clients comparing construction cost per square foot, and homeowners wanting one team for design plus execution.",
  positioning:
    "Dreamsmine is strongest as a design-led construction partner: a studio that can make the home look premium while also owning structural quality, brand materials, warranties, and post-handover care.",
  associatedBrands:
    "ARS 550D, KAG Tiles, Asian Paints, Orbit, Finolex, and Parryware appear as material trust signals.",
  visualPatterns:
    "Warm-lit modern villas, white and stone facades, balcony frames, vertical fins, compact urban plots, promotional black-yellow interior creatives, floor plans, and site-progress videos.",
  palette:
    "Existing assets lean dark green, yellow-gold, orange, white, and black. The redesign refines that into ink, limestone, muted olive, clay, and restrained brass.",
  embeddedText:
    "Several promo and brand assets include embedded offers: Rs.2299/sqft, 100% Vastu Plan, 1 year maintenance, 10 year material warranty, flat 25-40% offers, easy EMI, modular kitchen, and contact numbers.",
};

export function classifyAsset(path: string): Asset {
  const fileName = path.split("/").pop() || path;
  const folder = path.split("/").slice(-2, -1)[0] || "general";
  const isWhatsApp = fileName.startsWith("WhatsApp");
  const isVideo = /\.(mp4|mov|webm)$/i.test(fileName);

  if (folder === "brand-assets") {
    if (isVideo) {
      return {
        path,
        category: "Construction walkthrough video",
        quality: "high",
        recommendedUse: "Site transparency, engineering proof, construction process section.",
      };
    }

    return {
      path,
      category: fileName.includes("brand-02") ? "Brand contact card" : "Offer and identity creative",
      quality: isWhatsApp ? "medium" : "high",
      recommendedUse: "Trust proof, footer identity, offer context, or internal reference.",
    };
  }

  if (folder === "premium-villas") {
    const high = ["villa-03.webp", "villa-04.webp", "villa-06.webp", "villa-09.webp"].includes(fileName);
    return {
      path,
      category: "Premium villa exterior",
      quality: high ? "high" : "medium",
      recommendedUse: high
        ? "Homepage hero, flagship portfolio, design-build proof."
        : "Portfolio archive, project mosaic, supporting exterior section.",
    };
  }

  if (folder === "exterior-elevations") {
    const isPlan = /52|53|54|55/.test(fileName) || (isWhatsApp && /36\.|50|57|58/.test(fileName));
    return {
      path,
      category: isPlan ? "Vastu plan and layout" : "Modern exterior elevation",
      quality: isWhatsApp ? "medium" : "high",
      recommendedUse: isPlan
        ? "Planning process, Vastu proof, technical documentation section."
        : "Elevation services, gallery archive, facade proof panels.",
    };
  }

  if (folder === "interior-promos") {
    return {
      path,
      category: "Interior and modular kitchen promo",
      quality: "medium",
      recommendedUse: "Offer strip, interior services proof, not primary editorial hero due embedded text.",
    };
  }

  return {
    path,
    category: "General project media",
    quality: "low",
    recommendedUse: "Internal review before public placement.",
  };
}
