export type InteriorServiceDetail = {
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

export const INTERIOR_HERO_IMAGES = {
  home: "/images/fallback-home.jpg",
  services: "/images/fallback-services.jpg",
  gallery: "/images/fallback-gallery.jpg",
  guides: "/images/fallback-guides.jpg",
  about: "/images/fallback-about.jpg",
  contact: "/images/fallback-contact.jpg",
  designer: "/images/fallback-designer.jpg",
};

const INTERIOR_SERVICE_IMAGES: Record<string, string> = {
  "residential interior design": INTERIOR_HERO_IMAGES.home,
  "modular kitchen design": INTERIOR_HERO_IMAGES.services,
  "living room styling": INTERIOR_HERO_IMAGES.gallery,
  "bedroom makeovers": INTERIOR_HERO_IMAGES.about,
  "space planning": INTERIOR_HERO_IMAGES.guides,
  "custom furniture": INTERIOR_HERO_IMAGES.contact,
  "commercial interiors": INTERIOR_HERO_IMAGES.designer,
  "renovation styling": INTERIOR_HERO_IMAGES.gallery,
  "lighting design": INTERIOR_HERO_IMAGES.services,
  "turnkey interiors": INTERIOR_HERO_IMAGES.home,
};

export const DEFAULT_INTERIOR_SERVICES = [
  "Residential Interior Design",
  "Modular Kitchen Design",
  "Living Room Styling",
  "Bedroom Makeovers",
  "Space Planning",
  "Custom Furniture",
];

export const DEFAULT_INTERIOR_HIGHLIGHTS = [
  "Personalized design concepts",
  "Material and finish guidance",
  "Transparent project planning",
  "End-to-end execution support",
];

export const DEFAULT_INTERIOR_REVIEWS = [
  {
    author: "Ananya Rao",
    rating: 5,
    text: "The team understood our lifestyle immediately and turned a plain apartment into a warm, practical home. Every finish feels intentional.",
  },
  {
    author: "Karthik Menon",
    rating: 5,
    text: "Clear budgets, beautiful material choices, and very smooth site coordination. The final result looked even better than the moodboard.",
  },
  {
    author: "Priya Shah",
    rating: 5,
    text: "They balanced storage, lighting, and style beautifully. Our kitchen and living room now feel calm, open, and easy to use every day.",
  },
];

export const INTERIOR_FAQS = [
  {
    q: "What happens during the first design consultation?",
    a: "We discuss your lifestyle, rooms, budget range, timeline, inspiration references, and functional pain points. From there, we outline a design direction and the next steps for measurements, layouts, and material planning.",
  },
  {
    q: "Can you work with my existing furniture or finishes?",
    a: "Yes. We can design around pieces you want to keep, refresh existing rooms, or create a phased plan that mixes new furniture, custom storage, lighting, and decor with your current home.",
  },
  {
    q: "Do you handle execution as well as design?",
    a: "Yes, projects can be handled as design-only or end-to-end execution. For turnkey work, we coordinate vendors, drawings, site updates, material selections, and handover quality checks.",
  },
  {
    q: "How do you keep the project on budget?",
    a: "We define priorities early, separate must-haves from nice-to-haves, and align every major material, furniture, and execution choice to the agreed budget before site work begins.",
  },
];

export const INTERIOR_GALLERY_PREVIEW = [
  { title: "Layered Living Room", sub: "Texture, Lighting, Storage" },
  { title: "Modular Kitchen", sub: "Workflow, Materials, Details" },
  { title: "Bedroom Retreat", sub: "Comfort, Wardrobes, Calm" },
];

export const INTERIOR_SERVICE_DETAILS: Record<string, InteriorServiceDetail> = {
  "residential interior design": {
    iconKey: "home",
    tagline: "A complete home designed around how you actually live.",
    description:
      "Residential interior design brings layout, color, lighting, furniture, storage, and material choices into one cohesive plan. We translate your routines, taste, and budget into rooms that feel polished without losing comfort. From apartments to villas, the focus is on a home that looks refined, works beautifully, and still feels deeply personal.",
    benefits: [
      "A cohesive design language across every room",
      "Better daily flow with practical furniture placement",
      "Curated materials, colors, and lighting that work together",
      "Clear execution roadmap before site work begins",
    ],
    process: [
      "Discovery call, site measurements, and lifestyle brief",
      "Moodboard, layout options, and preliminary budget alignment",
      "Material, lighting, furniture, and finish selections",
      "Execution coordination, styling, and final handover",
    ],
  },
  "modular kitchen design": {
    iconKey: "utensils",
    tagline: "A kitchen built for movement, storage, and everyday ease.",
    description:
      "A well-designed modular kitchen balances workflow, durable finishes, appliance planning, storage zones, and beautiful detailing. We plan every cabinet, counter, handle, light, and backsplash so cooking feels efficient while the kitchen still becomes one of the most elegant spaces in the home.",
    benefits: [
      "Optimized storage for utensils, pantry, appliances, and cleaning supplies",
      "Durable countertop, shutter, and hardware recommendations",
      "Smart work triangle planning for cooking efficiency",
      "Lighting and backsplash details that elevate the whole room",
    ],
    process: [
      "Measure the space and map cooking habits",
      "Create ergonomic layout and storage zoning",
      "Select finishes, hardware, lighting, and appliances",
      "Coordinate fabrication, installation, and quality checks",
    ],
  },
  "living room styling": {
    iconKey: "sofa",
    tagline: "A welcoming room with balance, depth, and personality.",
    description:
      "Living room styling shapes the first impression of the home. We balance seating, rugs, curtains, wall finishes, lighting, art, and decor so the room feels inviting and composed. The goal is a space that is easy to host in, easy to relax in, and memorable without feeling overdone.",
    benefits: [
      "Balanced seating layout for conversation and comfort",
      "Layered lighting for day, evening, and hosting moods",
      "Textile, decor, and wall styling that adds character",
      "Better visual proportion with rugs, art, and furniture scale",
    ],
    process: [
      "Assess room proportions, light, and existing furniture",
      "Build a styling direction with palette and material references",
      "Source furniture, soft furnishings, art, and decor",
      "Install, style, and refine the final room composition",
    ],
  },
  "bedroom makeovers": {
    iconKey: "bed",
    tagline: "A calmer, softer room made for rest and routine.",
    description:
      "Bedroom design combines comfort, storage, lighting, and mood. We plan wardrobes, bed backdrops, side tables, soft furnishings, and lighting layers so the room supports sleep, dressing, reading, and quiet downtime. The result is a retreat that feels intentional from morning to night.",
    benefits: [
      "Improved storage with wardrobes and bedside planning",
      "Softer lighting for rest, reading, and dressing",
      "A calming palette tailored to your personal style",
      "Better use of compact rooms without visual clutter",
    ],
    process: [
      "Understand storage needs, routines, and preferred mood",
      "Plan furniture layout, wardrobe modules, and lighting",
      "Select wall finishes, textiles, and decor accents",
      "Complete installation, styling, and final comfort check",
    ],
  },
  "space planning": {
    iconKey: "ruler",
    tagline: "Every square foot assigned a clear purpose.",
    description:
      "Space planning is the foundation of a successful interior project. Before finishes or furniture, we study circulation, room zoning, storage requirements, light, and human movement. This helps compact spaces feel larger and larger homes feel more connected and intentional.",
    benefits: [
      "Smarter circulation and less wasted area",
      "Furniture layouts that match real daily movement",
      "Clear room zoning for work, rest, storage, and hosting",
      "Fewer execution changes because decisions are planned early",
    ],
    process: [
      "Measure and document the current layout",
      "Map activities, movement paths, and storage needs",
      "Compare layout options with pros, constraints, and budget impact",
      "Finalize drawings for execution and furniture planning",
    ],
  },
  "custom furniture": {
    iconKey: "layers",
    tagline: "Built-in pieces made for your measurements and habits.",
    description:
      "Custom furniture makes awkward corners, compact rooms, and specific routines easier to manage. We design wardrobes, TV units, study desks, dining storage, consoles, and display systems around exact measurements, material choices, and long-term use.",
    benefits: [
      "Precise fit for your room dimensions",
      "More storage without bulky visual weight",
      "Coordinated finishes across the home",
      "Furniture details planned for durability and maintenance",
    ],
    process: [
      "Measure the area and define usage requirements",
      "Prepare design sketches, material palette, and storage logic",
      "Finalize drawings, hardware, and fabrication details",
      "Install, inspect alignment, and complete finishing touches",
    ],
  },
  "commercial interiors": {
    iconKey: "briefcase",
    tagline: "Brand-led spaces that support people and performance.",
    description:
      "Commercial interior design turns offices, studios, salons, cafes, and retail spaces into environments that communicate brand identity while supporting daily operations. We plan customer flow, staff comfort, lighting, materials, and durable details that can handle real use.",
    benefits: [
      "Brand-aligned visual language across the space",
      "Efficient layouts for staff, customers, and storage",
      "Durable finishes suited to high-use environments",
      "Improved first impressions for visitors and clients",
    ],
    process: [
      "Understand brand, operations, footfall, and functional needs",
      "Develop layout, lighting, signage, and finish concepts",
      "Coordinate execution drawings, vendors, and site schedule",
      "Complete styling, snag checks, and handover",
    ],
  },
  "renovation styling": {
    iconKey: "hammer",
    tagline: "A thoughtful refresh without starting from zero.",
    description:
      "Renovation styling helps update existing homes through strategic changes: paint, lighting, curtains, furniture, decor, storage tweaks, and feature walls. It is ideal when the structure works but the space needs more warmth, clarity, and polish.",
    benefits: [
      "High-impact refresh with controlled scope",
      "Reuse of existing furniture where it still works",
      "Quick upgrades through color, lighting, and styling",
      "Clear priorities to avoid unnecessary demolition",
    ],
    process: [
      "Audit what stays, what changes, and what needs repair",
      "Create a refresh plan with budget-friendly priorities",
      "Select finishes, lighting, furniture, and decor updates",
      "Coordinate installation and final styling",
    ],
  },
  "lighting design": {
    iconKey: "lightbulb",
    tagline: "Light that changes how every surface feels.",
    description:
      "Lighting design shapes mood, comfort, and functionality. We layer ambient, task, and accent lighting so rooms work for cooking, reading, hosting, dressing, and relaxing. The right lighting makes materials richer and spaces more flexible throughout the day.",
    benefits: [
      "Layered lighting for different moods and tasks",
      "Better focus in kitchens, studies, mirrors, and work areas",
      "Feature lighting for art, textures, and architectural details",
      "Cleaner switch planning and fewer dark corners",
    ],
    process: [
      "Study room usage, natural light, and ceiling conditions",
      "Plan ambient, task, accent, and decorative layers",
      "Select fixture styles, color temperature, and controls",
      "Coordinate electrical points, installation, and aiming",
    ],
  },
  "turnkey interiors": {
    iconKey: "check",
    tagline: "Design, procurement, execution, and styling in one plan.",
    description:
      "Turnkey interiors cover the full journey from concept to handover. We manage design direction, drawings, material choices, vendor coordination, site updates, furniture, lighting, and styling so the finished home feels cohesive and ready to live in.",
    benefits: [
      "Single coordinated plan from concept to handover",
      "Reduced decision fatigue through guided selections",
      "Site execution aligned to approved design drawings",
      "Final styling so the space feels complete from day one",
    ],
    process: [
      "Discovery, scope definition, measurements, and design brief",
      "Concept design, layouts, material palette, and budget plan",
      "Procurement, vendor coordination, and site execution",
      "Snag checks, styling, cleaning, and final handover",
    ],
  },
};

export const INTERIOR_GUIDES: InteriorGuide[] = [
  {
    iconKey: "wallet",
    category: "Budget Planning",
    title: "How to Set a Realistic Interior Design Budget",
    intro:
      "A good budget is not just a number. It is a set of priorities that tells the project where to spend, where to save, and which decisions matter most for your lifestyle.",
    sections: [
      {
        heading: "Start With Rooms, Not Products",
        content:
          "Break the project into rooms and functions first: kitchen, wardrobes, lighting, loose furniture, decor, and civil changes. This prevents one exciting purchase from eating into essentials like storage, electrical work, or durable finishes.",
      },
      {
        heading: "Keep a Contingency",
        content:
          "Interior projects can reveal hidden site conditions, delivery changes, or small upgrades that genuinely improve the result. Keeping a contingency of 10 to 15 percent gives the project room to breathe without panic decisions.",
      },
    ],
    tips: [
      "List must-haves separately from nice-to-haves",
      "Prioritize kitchens, wardrobes, and lighting before decor",
      "Avoid comparing only item prices; compare durability and installation too",
      "Finalize material selections before execution begins",
    ],
  },
  {
    iconKey: "ruler",
    category: "Space Planning",
    title: "Why Your Furniture Layout Matters More Than Decor",
    intro:
      "Decor can make a room beautiful, but layout makes it livable. The right furniture placement improves movement, comfort, storage access, and the way people naturally gather in a room.",
    sections: [
      {
        heading: "Design Around Movement",
        content:
          "Every room needs clear paths between doors, windows, seating, storage, and work zones. When circulation is ignored, even expensive furniture can make a space feel crowded and inconvenient.",
      },
      {
        heading: "Scale Is Everything",
        content:
          "A sofa, bed, dining table, or wardrobe can look perfect online and still be wrong for your room. Scale planning ensures each piece supports the room instead of overwhelming it.",
      },
    ],
    tips: [
      "Measure door swings, window positions, and passage widths",
      "Use rugs to anchor zones in open-plan rooms",
      "Leave breathing space around large furniture",
      "Plan storage access before finalizing furniture placement",
    ],
  },
  {
    iconKey: "lightbulb",
    category: "Lighting",
    title: "The Three Lighting Layers Every Home Needs",
    intro:
      "Lighting is one of the fastest ways to make a space feel expensive, calm, and functional. A single ceiling light rarely does enough. Great rooms use layers.",
    sections: [
      {
        heading: "Ambient, Task, and Accent",
        content:
          "Ambient light gives general brightness, task light supports activities like cooking or reading, and accent light highlights art, textures, shelves, or architectural details. Together, they make the room flexible.",
      },
      {
        heading: "Choose the Right Warmth",
        content:
          "Warm white light usually feels more inviting in living rooms and bedrooms, while neutral light works well for kitchens, mirrors, and workspaces. The right temperature keeps materials looking natural.",
      },
    ],
    tips: [
      "Avoid relying on one bright ceiling fixture",
      "Use dimmers in living and bedroom areas when possible",
      "Add under-cabinet lighting in kitchens",
      "Highlight textured walls, art, or shelves with accent lights",
    ],
  },
  {
    iconKey: "palette",
    category: "Materials",
    title: "How to Choose Finishes That Age Well",
    intro:
      "Materials should look beautiful on day one and still make sense years later. The best finish palette balances durability, maintenance, texture, and the amount of natural light in your home.",
    sections: [
      {
        heading: "Think About Touch and Maintenance",
        content:
          "High-use areas need finishes that can handle fingerprints, moisture, heat, cleaning, and daily contact. A beautiful sample is only successful if it performs well in its real location.",
      },
      {
        heading: "Limit the Palette",
        content:
          "Too many finishes can make a home feel visually noisy. A restrained palette of woods, stones, metals, fabrics, and wall colors creates continuity and gives statement details more impact.",
      },
    ],
    tips: [
      "View samples in your actual room light before approval",
      "Use durable laminates or veneers in high-touch storage zones",
      "Balance glossy finishes with matte or textured surfaces",
      "Keep permanent finishes timeless and add trend through decor",
    ],
  },
  {
    iconKey: "utensils",
    category: "Kitchen Design",
    title: "What Makes a Modular Kitchen Easy to Use",
    intro:
      "A kitchen works best when storage, appliances, counters, lighting, and movement are planned together. Beauty matters, but daily rhythm matters more.",
    sections: [
      {
        heading: "Plan Storage by Activity",
        content:
          "Cooking, washing, prep, pantry, and appliance zones each need dedicated storage. When everything has a clear location, the kitchen feels faster and cleaner to use.",
      },
      {
        heading: "Counter Space Is a Design Feature",
        content:
          "Appliances, sinks, hobs, and tall units can consume working surfaces quickly. Protecting enough counter space makes everyday cooking far more comfortable.",
      },
    ],
    tips: [
      "Keep daily utensils near the hob and prep counter",
      "Use drawers for easy access to heavy items",
      "Plan task lighting below overhead cabinets",
      "Choose hardware quality before choosing decorative details",
    ],
  },
  {
    iconKey: "calendar",
    category: "Execution",
    title: "How to Prepare Your Home Before Site Work Begins",
    intro:
      "A smooth site phase starts before the first worker arrives. Clear decisions, protected belongings, access planning, and communication rhythm can save time and stress.",
    sections: [
      {
        heading: "Freeze Key Decisions Early",
        content:
          "Layouts, finishes, electrical points, furniture sizes, and appliance models should be approved before execution. Late changes can affect cost, timeline, and quality.",
      },
      {
        heading: "Plan for Dust, Noise, and Deliveries",
        content:
          "Even a well-managed project disrupts daily routines. Protect nearby rooms, arrange storage for delivered materials, and clarify work hours with building management or neighbors.",
      },
    ],
    tips: [
      "Clear rooms before carpentry or civil work starts",
      "Keep an approved drawing set accessible on site",
      "Track decisions in one shared place",
      "Do a snag walkthrough before final handover",
    ],
  },
];

function findInteriorServiceKey(serviceName: string): string | null {
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

export function getInteriorServiceData(serviceName: string): InteriorServiceDetail | null {
  const serviceKey = findInteriorServiceKey(serviceName);
  if (!serviceKey) return null;

  const serviceData = INTERIOR_SERVICE_DETAILS[serviceKey];

  return {
    ...serviceData,
    image: serviceData.image || INTERIOR_SERVICE_IMAGES[serviceKey] || INTERIOR_HERO_IMAGES.services,
  };
}

export function getInteriorServiceSummary(serviceName: string): string {
  return (
    getInteriorServiceData(serviceName)?.description ||
    "A personalized design service shaped around your lifestyle, budget, timeline, and the way each room needs to feel and function."
  );
}

export function getServiceImage(serviceName: string, media: any): string | null {
  if (!media?.otherImages) return null;
  const lower = serviceName.toLowerCase();
  
  // Index 6: Space planning / layout / zoning
  if (lower.includes("space") || lower.includes("zoning") || lower.includes("layout") || lower.includes("planning")) {
    return media.otherImages[6] || null;
  }
  // Index 7: Material selection / finishes / kitchen
  if (lower.includes("material") || lower.includes("finish") || lower.includes("kitchen")) {
    return media.otherImages[7] || null;
  }
  // Index 8: Lighting
  if (lower.includes("lighting")) {
    return media.otherImages[8] || null;
  }
  // Index 9: Residential
  if (lower.includes("residential") || lower.includes("home") || lower.includes("villa") || lower.includes("apartment")) {
    return media.otherImages[9] || null;
  }
  // Index 10: Commercial
  if (lower.includes("commercial") || lower.includes("office") || lower.includes("retail") || lower.includes("corporate")) {
    return media.otherImages[10] || null;
  }
  // Index 12: Renovation
  if (lower.includes("renovation") || lower.includes("makeover") || lower.includes("overhaul")) {
    return media.otherImages[12] || null;
  }
  // Index 11: Styling & Decor / Bedroom / Living Room
  if (lower.includes("styling") || lower.includes("decor") || lower.includes("bedroom") || lower.includes("living")) {
    return media.otherImages[11] || null;
  }
  // Index 13: Custom Furniture
  if (lower.includes("furniture") || lower.includes("joinery") || lower.includes("steel") || lower.includes("millwork") || lower.includes("wood")) {
    return media.otherImages[13] || null;
  }

  return null;
}
