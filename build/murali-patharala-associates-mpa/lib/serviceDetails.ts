export interface ServiceSectionBlock {
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  caption: string;
  bullets?: string[];
}

export interface ServiceScopeItem {
  number: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tag?: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  deliverable: string;
}

export interface DeliverableCategory {
  title: string;
  subtitle: string;
  icon: string;
  items: string[];
}

export interface BentoImageItem {
  src: string;
  alt: string;
  tag: string;
  caption: string;
  location?: string;
}

export interface ServiceBentoGrid {
  hero: BentoImageItem;
  sub1: BentoImageItem;
  sub2: BentoImageItem;
}

export interface ServiceDetail {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  accent: string;
  ownership: { label: string; company: string };
  summary: string;
  shortSummary: string;
  heroImage: string;
  heroAlt: string;
  heroMobileImage?: string;
  heroMobileAlt?: string;
  highlights: string[];
  overviewKicker: string;
  overviewTitle: string;
  overviewLead: string;
  overviewSections: ServiceSectionBlock[];
  scopeKicker: string;
  scopeTitle: string;
  scopeIntro: string;
  scope: ServiceScopeItem[];
  processKicker: string;
  processTitle: string;
  processIntro: string;
  process: ServiceProcessStep[];
  standardsKicker: string;
  standardsTitle: string;
  standardsIntro: string;
  standards: Array<{ label: string; title: string; description: string; image?: string; imageAlt?: string }>;
  deliverablesKicker: string;
  deliverablesTitle: string;
  deliverablesIntro: string;
  deliverables: string[];
  deliverableCategories: DeliverableCategory[];
  gallery: Array<{ src: string; alt: string; caption: string }>;
  bentoImages: ServiceBentoGrid;
  faqs: Array<{ question: string; answer: string }>;
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    "slug": "architectural-design",
    "number": "01",
    "eyebrow": "Architecture & interior design consultancy",
    "title": "Architectural",
    "accent": "Design.",
    "ownership": {
      "label": "Architectural design by",
      "company": "Murali Patharala & Associates (MPA)"
    },
    "summary": "Architectural consultancy for residential, commercial and institutional projects, including feasibility, design development, technical coordination, tender support and construction administration.",
    "shortSummary": "Architecture for homes, workplaces and institutions, from site study to construction documentation.",
    "heroImage": "/images/architecture/architectural-blueprint-draft.webp",
    "heroAlt": "Architect developing a detailed residential floor plan",
    "highlights": [
      "Residential, commercial & institutional",
      "Concept to construction documents",
      "Structural & MEP coordination",
      "Tender & approval support"
    ],
    "overviewKicker": "Our approach",
    "overviewTitle": "Spaces shaped around the people who use them.",
    "overviewLead": "We bring form, function and feeling together, respecting cultural roots while responding to contemporary needs.",
    "overviewSections": [
      {
        "heading": "Understand the place and the brief",
        "body": "Site analysis, zoning, budget and the way people will use a building inform the first design decisions.",
        "image": "/images/architecture/villa-plan-sketch.webp",
        "imageAlt": "Architect sketching a villa plan around site requirements",
        "caption": "Understand the place and the brief",
        "bullets": [
          "Site conditions and planning constraints",
          "Project viability and budget forecasting",
          "User needs and spatial relationships"
        ]
      },
      {
        "heading": "Develop the architectural idea",
        "body": "Sketches, mood boards, floor plans, elevations and 3D massing allow the design to develop through discussion.",
        "image": "/images/architecture/bim-3d-walkthrough.webp",
        "imageAlt": "Photorealistic 3D walkthrough of a home interior",
        "caption": "Develop the architectural idea",
        "bullets": [
          "Conceptual and schematic design",
          "Materials, finishes and spatial character",
          "Tradition and modernity considered together"
        ]
      },
      {
        "heading": "Coordinate before construction",
        "body": "Detailed drawings connect architecture with structure and building services so contractors can understand the scope.",
        "image": "/images/architecture/cmda-sanction-drafting.webp",
        "imageAlt": "Sanction drawings and technical specifications",
        "caption": "Coordinate before construction",
        "bullets": [
          "Structural and MEP coordination",
          "Working drawings, schedules and specifications",
          "Quantity take-offs and BOQs"
        ]
      }
    ],
    "scopeKicker": "Service scope",
    "scopeTitle": "Support shaped around your project.",
    "scopeIntro": "The required services and deliverables are defined in your project proposal.",
    "scope": [
      {
        "number": "01",
        "title": "Pre-design & Feasibility",
        "description": "Site analysis, zoning checks, budget forecasting and project viability assessments.",
        "image": "/images/architecture/villa-plan-sketch.webp",
        "imageAlt": "Pre-design & Feasibility"
      },
      {
        "number": "02",
        "title": "Conceptual & Schematic Design",
        "description": "Sketches, mood boards, floor plans, elevations and basic 3D massing.",
        "image": "/images/architecture/space-planning-atrium.webp",
        "imageAlt": "Conceptual & Schematic Design"
      },
      {
        "number": "03",
        "title": "Design Development",
        "description": "Refined drawings, material specifications, structural coordination and service integration.",
        "image": "/images/architecture/geometric-villa-elevation.webp",
        "imageAlt": "Design Development"
      },
      {
        "number": "04",
        "title": "Construction Documentation",
        "description": "Detailed working drawings, sections, schedules and specifications for tendering and execution.",
        "image": "/images/architecture/staad-structural-engineering.webp",
        "imageAlt": "Construction Documentation"
      },
      {
        "number": "05",
        "title": "Specialist Technical Coordination",
        "description": "Structural integration, HVAC and MEP coordination, fire-safety documentation, generator sizing and AC load calculations.",
        "image": "/images/architecture/architectural-blueprint-draft.webp",
        "imageAlt": "Specialist Technical Coordination"
      },
      {
        "number": "06",
        "title": "Approvals & Environmental Support",
        "description": "CMDA and DTCP liaison, permits and NOCs, and LEED, IGBC or GRIHA documentation according to project requirements.",
        "image": "/images/architecture/cmda-sanction-drafting.webp",
        "imageAlt": "Approvals & Environmental Support"
      }
    ],
    "processKicker": "How we work",
    "processTitle": "A clear sequence, with room for your project.",
    "processIntro": "Each stage develops the information and coordination needed for the work that follows.",
    "process": [
      {
        "step": "01",
        "title": "Pre-design & Feasibility",
        "description": "Review the site, zoning, budget and viability with the client.",
        "deliverable": "Site and project assessment",
        "image": "/images/architecture/architectural-blueprint-draft.webp"
      },
      {
        "step": "02",
        "title": "Conceptual Design",
        "description": "Explore sketches, mood boards and spatial planning.",
        "deliverable": "Concept direction",
        "image": "/images/architecture/villa-plan-sketch.webp"
      },
      {
        "step": "03",
        "title": "Schematic Design",
        "description": "Develop floor plans, elevations and basic 3D massing.",
        "deliverable": "Schematic drawing set",
        "image": "/images/architecture/space-planning-atrium.webp"
      },
      {
        "step": "04",
        "title": "Design Development",
        "description": "Refine materials and integrate structure, HVAC, electrical and plumbing systems.",
        "deliverable": "Coordinated design",
        "image": "/images/architecture/bim-3d-walkthrough.webp"
      },
      {
        "step": "05",
        "title": "Construction Documentation",
        "description": "Prepare working drawings, schedules, specifications and BOQs.",
        "deliverable": "Tender and execution information",
        "image": "/images/architecture/staad-structural-engineering.webp"
      },
      {
        "step": "06",
        "title": "Bidding & Negotiation",
        "description": "Assist with contractor selection, bid evaluation and contract finalisation.",
        "deliverable": "Reviewed contractor proposals",
        "image": "/images/architecture/architectural-blueprint-draft.webp"
      },
      {
        "step": "07",
        "title": "Construction Administration",
        "description": "Coordinate site visits, quality checks, RFIs and change orders to uphold the design.",
        "deliverable": "Design coordination during construction",
        "image": "/images/architecture/architectural-blueprint-draft.webp"
      }
    ],
    "standardsKicker": "What guides the work",
    "standardsTitle": "Purpose, coordination and care.",
    "standardsIntro": "Our approach connects the design intent with practical delivery.",
    "standards": [
      {
        "label": "User experience",
        "title": "Design around real use",
        "description": "Homes, workplaces and institutions each need a different response to the people they serve."
      },
      {
        "label": "Coordination",
        "title": "Resolve structure and services together",
        "description": "Coordinated documentation helps identify clashes, reduce rework and communicate design intent."
      },
      {
        "label": "Cost planning",
        "title": "Make scope and quantities clear",
        "description": "Detailed specifications and BOQs support comparable bids, budget review and value engineering."
      }
    ],
    "deliverablesKicker": "Project information",
    "deliverablesTitle": "A scope you can understand and review.",
    "deliverablesIntro": "Your proposal identifies which drawings, documents and services apply to the commission.",
    "deliverables": [
      "Floor plans, elevations and sections",
      "Spatial planning and 3D massing",
      "Material specifications and finishes",
      "Working drawings and schedules",
      "Structural engineer coordination",
      "Mechanical, electrical and plumbing integration",
      "HVAC layouts and AC load calculations",
      "Generator sizing and fire-safety documentation",
      "Quantity take-offs and BOQs",
      "Tender documentation and bid evaluation support",
      "CMDA / DTCP submissions and NOC coordination",
      "Certification documentation where commissioned",
      "Site visits and quality checks",
      "RFIs and contractor coordination",
      "Change-order review",
      "Post-occupancy evaluation when included in scope"
    ],
    "deliverableCategories": [
      {
        "title": "Architectural drawings",
        "subtitle": "Plans that communicate the design",
        "icon": "compass",
        "items": [
          "Floor plans, elevations and sections",
          "Spatial planning and 3D massing",
          "Material specifications and finishes",
          "Working drawings and schedules"
        ]
      },
      {
        "title": "Technical coordination",
        "subtitle": "Structure and building services",
        "icon": "layers",
        "items": [
          "Structural engineer coordination",
          "Mechanical, electrical and plumbing integration",
          "HVAC layouts and AC load calculations",
          "Generator sizing and fire-safety documentation"
        ]
      },
      {
        "title": "Tender & approval information",
        "subtitle": "A clear scope for review",
        "icon": "file",
        "items": [
          "Quantity take-offs and BOQs",
          "Tender documentation and bid evaluation support",
          "CMDA / DTCP submissions and NOC coordination",
          "Certification documentation where commissioned"
        ]
      },
      {
        "title": "Construction administration",
        "subtitle": "Design support through execution",
        "icon": "shield",
        "items": [
          "Site visits and quality checks",
          "RFIs and contractor coordination",
          "Change-order review",
          "Post-occupancy evaluation when included in scope"
        ]
      }
    ],
    "gallery": [
      {
        "src": "/murali-patharala-associates-assets/exterior_renders/JAMEE2.webp",
        "alt": "Contemporary residence rendered at dusk with layered stone and glass facade",
        "caption": "Dusk exterior elevation"
      },
      {
        "src": "/murali-patharala-associates-assets/exterior_renders/Sushama John.webp",
        "alt": "White and stone-clad residential exterior elevation",
        "caption": "Residential facade study"
      },
      {
        "src": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 16.17.56 (2).webp",
        "alt": "Contemporary timber and stone residential exterior design",
        "caption": "Material and form study"
      }
    ],
    "bentoImages": {
      "hero": {
        "src": "/murali-patharala-associates-assets/exterior_renders/JAMEE2.webp",
        "alt": "Contemporary residence rendered at dusk with layered stone and glass facade",
        "tag": "01 // DUSK ELEVATION",
        "caption": "Contemporary exterior elevation with layered stone and glass",
        "location": "Exterior Design"
      },
      "sub1": {
        "src": "/murali-patharala-associates-assets/exterior_renders/Sushama John.webp",
        "alt": "White and stone-clad residential exterior elevation",
        "tag": "02 // FACADE STUDY",
        "caption": "White and stone facade with layered balconies",
        "location": "Exterior Design"
      },
      "sub2": {
        "src": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 16.17.56 (2).webp",
        "alt": "Contemporary timber and stone residential exterior design",
        "tag": "03 // MATERIAL STUDY",
        "caption": "Contemporary timber and stone exterior form",
        "location": "Exterior Design"
      }
    },
    "faqs": [
      {
        "question": "Do you design commercial and institutional buildings?",
        "answer": "Yes. MPA’s architectural consultancy covers residential, commercial and institutional projects."
      },
      {
        "question": "Can you help us select a contractor?",
        "answer": "Our bidding and negotiation services include contractor selection, bid evaluation and contract finalisation."
      },
      {
        "question": "What specialist services are available?",
        "answer": "The practice offers structural and MEP coordination, fire-safety documentation, generator and AC load calculations, authority approvals and green-building documentation. The required scope is agreed for each project."
      },
      {
        "question": "Does your work continue after drawings are issued?",
        "answer": "Construction administration can include site visits, quality checks, RFIs, change orders and contractor coordination. Post-occupancy evaluation assesses performance and user satisfaction after handover."
      },
      {
        "question": "How are professional fees agreed?",
        "answer": "We review the project brief, site and required services before providing a proposal defining the scope, deliverables and professional fees."
      }
    ]
  },
  {
    "slug": "residential-construction",
    "number": "02",
    "eyebrow": "Construction & project delivery",
    "title": "Residential",
    "accent": "Construction.",
    "ownership": {
      "label": "Construction by",
      "company": "ARCH foundations"
    },
    "summary": "Residential construction by ARCH foundations, combining civil works, structural engineering, project management and site supervision.",
    "shortSummary": "Civil construction, structural engineering and site supervision for your home.",
    "heroImage": "/images/architecture/site-engineer-audit.webp",
    "heroAlt": "Site engineer inspecting reinforcement at a residential construction site",
    "heroMobileImage": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 17.38.22 (1).webp",
    "heroMobileAlt": "Contemporary three-storey residential design with warm facade lighting",
    "highlights": [
      "Civil works & structural engineering",
      "Project management",
      "Site supervision",
      "Construction to handover"
    ],
    "overviewKicker": "Our approach",
    "overviewTitle": "Turn a considered design into a well-built home.",
    "overviewLead": "ARCH foundations brings construction and project execution to the architectural work of MPA, with attention to quality, craftsmanship and the client’s needs.",
    "overviewSections": [
      {
        "heading": "Plan the construction scope",
        "body": "The drawings, specifications and site conditions provide the basis for the construction proposal.",
        "image": "/murali-patharala-associates-assets/exterior_renders/JAMEE2.webp",
        "imageAlt": "Contemporary villa exterior visualization from the MPA project library",
        "caption": "Plan the construction scope",
        "bullets": [
          "Review architectural and engineering information",
          "Define civil works and responsibilities",
          "Discuss the budget and programme"
        ]
      },
      {
        "heading": "Coordinate the work on site",
        "body": "Project management and site supervision connect the work of engineers, contractors and service specialists.",
        "image": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 16.17.56 (2).webp",
        "imageAlt": "Contemporary timber and stone residential elevation by MPA",
        "caption": "Coordinate the work on site",
        "bullets": [
          "Civil works and structural engineering",
          "Building-service coordination",
          "Quality checks during execution"
        ]
      },
      {
        "heading": "Complete the agreed works",
        "body": "Construction, finishes and utility installations are coordinated towards handover.",
        "image": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 16.36.14.webp",
        "imageAlt": "Contemporary white residential elevation with layered balconies",
        "caption": "Complete the agreed works",
        "bullets": [
          "Review completed work against the scope",
          "Coordinate finishes and services",
          "Plan the handover with the client"
        ]
      }
    ],
    "scopeKicker": "Service scope",
    "scopeTitle": "Support shaped around your project.",
    "scopeIntro": "The required services and deliverables are defined in your project proposal.",
    "scope": [
      {
        "number": "01",
        "title": "Site & Project Review",
        "description": "Review the site and the proposed construction scope before work begins.",
        "image": "/images/service-stages/design-planning.webp",
        "imageAlt": "Site & Project Review"
      },
      {
        "number": "02",
        "title": "Civil & Structural Works",
        "description": "Coordinate structural engineering and carry out civil construction to the project drawings.",
        "image": "/images/service-stages/foundation-rcc.webp",
        "imageAlt": "Civil & Structural Works"
      },
      {
        "number": "03",
        "title": "Building Services",
        "description": "Integrate utility installations with the architectural and structural work.",
        "image": "/images/service-stages/brickwork-plaster.webp",
        "imageAlt": "Building Services"
      },
      {
        "number": "04",
        "title": "Materials & Finishes",
        "description": "Agree material specifications and finish selections as part of the project scope.",
        "image": "/images/service-stages/plumbing-waterproofing.webp",
        "imageAlt": "Materials & Finishes"
      },
      {
        "number": "05",
        "title": "Project Management",
        "description": "Coordinate activities, responsibilities and the construction programme.",
        "image": "/images/service-stages/electrical-installation.webp",
        "imageAlt": "Project Management"
      },
      {
        "number": "06",
        "title": "Site Supervision & Handover",
        "description": "Supervise execution, review quality and coordinate completion of the agreed works.",
        "image": "/images/service-stages/flooring-painting.webp",
        "imageAlt": "Site Supervision & Handover"
      }
    ],
    "processKicker": "How we work",
    "processTitle": "A clear sequence, with room for your project.",
    "processIntro": "Each stage develops the information and coordination needed for the work that follows.",
    "process": [
      {
        "step": "01",
        "title": "Review the Project",
        "description": "Discuss the site, drawings, requirements and budget.",
        "deliverable": "Project brief",
        "image": "/images/service-stages/soil-assessment.webp"
      },
      {
        "step": "02",
        "title": "Define the Scope",
        "description": "Agree construction responsibilities, specifications and proposal.",
        "deliverable": "Documented construction scope",
        "image": "/images/service-stages/engineering-permits.webp"
      },
      {
        "step": "03",
        "title": "Coordinate Engineering",
        "description": "Resolve structural and service information before the relevant works.",
        "deliverable": "Coordinated drawings",
        "image": "/images/service-stages/foundation-rcc.webp"
      },
      {
        "step": "04",
        "title": "Build & Supervise",
        "description": "Manage civil works, services and finishes with site supervision.",
        "deliverable": "Construction progress and quality review",
        "image": "/images/service-stages/plumbing-waterproofing.webp"
      },
      {
        "step": "05",
        "title": "Complete & Handover",
        "description": "Review completion against the agreed scope and coordinate handover.",
        "deliverable": "Completed works",
        "image": "/images/service-stages/home-handover.webp"
      }
    ],
    "standardsKicker": "What guides the work",
    "standardsTitle": "Purpose, coordination and care.",
    "standardsIntro": "Our approach connects the design intent with practical delivery.",
    "standards": [
      {
        "label": "Engineering",
        "title": "Build from coordinated information",
        "description": "Architectural, structural and service drawings guide construction."
      },
      {
        "label": "Craftsmanship",
        "title": "Give execution the care it needs",
        "description": "Material choices and workmanship are reviewed against the project specifications."
      },
      {
        "label": "Communication",
        "title": "Keep responsibilities clear",
        "description": "The construction proposal sets out the scope, programme and responsibilities."
      }
    ],
    "deliverablesKicker": "Project information",
    "deliverablesTitle": "A scope you can understand and review.",
    "deliverablesIntro": "Your proposal identifies which drawings, documents and services apply to the commission.",
    "deliverables": [
      "Civil works to the agreed scope",
      "Structural engineering coordination",
      "Material and finish specifications",
      "Utility installation coordination",
      "Interior fit-outs where included",
      "Coordination between construction disciplines",
      "Construction programme coordination",
      "Site supervision and quality checks",
      "Completion review and handover"
    ],
    "deliverableCategories": [
      {
        "title": "Civil construction",
        "subtitle": "The building and its structure",
        "icon": "home",
        "items": [
          "Civil works to the agreed scope",
          "Structural engineering coordination",
          "Material and finish specifications"
        ]
      },
      {
        "title": "Services & finishes",
        "subtitle": "Coordinated execution",
        "icon": "layers",
        "items": [
          "Utility installation coordination",
          "Interior fit-outs where included",
          "Coordination between construction disciplines"
        ]
      },
      {
        "title": "Project delivery",
        "subtitle": "Management and supervision",
        "icon": "shield",
        "items": [
          "Construction programme coordination",
          "Site supervision and quality checks",
          "Completion review and handover"
        ]
      }
    ],
    "gallery": [
      {
        "src": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 17.38.22 (1).webp",
        "alt": "Residential architectural visualization with warm evening lighting",
        "caption": "Residential design vision"
      },
      {
        "src": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 16.17.56 (2).webp",
        "alt": "White and stone-clad residence from the MPA project library",
        "caption": "Project design details"
      },
      {
        "src": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 16.36.14.webp",
        "alt": "Contemporary white residential elevation with layered balconies",
        "caption": "Contemporary facade"
      }
    ],
    "bentoImages": {
      "hero": {
        "src": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 17.38.22 (1).webp",
        "alt": "Contemporary three-storey residential design with warm facade lighting",
        "tag": "01 // RESIDENTIAL VISION",
        "caption": "Contemporary exterior design with layered forms and warm lighting",
        "location": "Anna Nagar Project"
      },
      "sub1": {
        "src": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 16.17.56 (2).webp",
        "alt": "White and stone-clad residence from the MPA project library",
        "tag": "02 // MATERIAL PALETTE",
        "caption": "Stone and timber facade details from the MPA project library",
        "location": "Site Supervision"
      },
      "sub2": {
        "src": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 16.36.14.webp",
        "alt": "Contemporary white residential elevation with layered balconies",
        "tag": "03 // PROJECT EXTERIOR",
        "caption": "Modern white residential elevation and balcony design",
        "location": "Residential Design"
      }
    },
    "faqs": [
      {
        "question": "Do you build from an existing design?",
        "answer": "Share the available drawings and specifications with the studio. We will review the information and construction scope before proposing the next steps."
      },
      {
        "question": "Do you also undertake commercial construction?",
        "answer": "Yes. ARCH foundations’ profile covers residential, commercial and institutional construction, civil works and structural engineering."
      },
      {
        "question": "What does project supervision cover?",
        "answer": "Project management and site supervision coordinate construction activities and quality checks. The responsibilities and visit arrangements are set out in the project proposal."
      },
      {
        "question": "How are costs and timelines confirmed?",
        "answer": "They are established after reviewing the site, drawings, specifications and scope. Your written proposal records the agreed commercial terms."
      },
      {
        "question": "Can interiors be included?",
        "answer": "Interior fit-outs and utility installations can be coordinated within a turnkey project scope."
      }
    ]
  },
  {
    "slug": "interior-design",
    "number": "03",
    "eyebrow": "Interior design consultancy",
    "title": "Interior",
    "accent": "Design.",
    "ownership": {
      "label": "Interior design by",
      "company": "Murali Patharala & Associates (MPA)"
    },
    "summary": "Interior design consultancy for homes, workplaces and institutional spaces, with spatial planning, material selection, technical coordination and fit-out support.",
    "shortSummary": "Interior design that brings function, character and everyday comfort together.",
    "heroImage": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.59 (3).webp",
    "heroAlt": "Bespoke double-height residential interior designed by Ar. Murali Patharala",
    "highlights": [
      "User-centred space planning",
      "Concepts & materials",
      "Coordinated interior drawings",
      "Fit-out coordination"
    ],
    "overviewKicker": "Our approach",
    "overviewTitle": "Interiors that belong to their people and place.",
    "overviewLead": "Our interior design work balances practical use with atmosphere, material character and the architectural setting.",
    "overviewSections": [
      {
        "heading": "Start with the people",
        "body": "Understand how the space is used and the experience the client wants to create.",
        "image": "/murali-patharala-associates-assets/portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.33.webp",
        "imageAlt": "Completed luxury modular kitchen with backlit onyx wall and custom cabinetry",
        "caption": "Start with the people",
        "bullets": [
          "Daily activities and movement",
          "Furniture and storage requirements",
          "Residential, commercial and institutional needs"
        ]
      },
      {
        "heading": "Shape the character",
        "body": "Develop the concept through spatial planning, mood boards and material choices.",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.22.23 (5).webp",
        "imageAlt": "Designed living room media wall with integrated storage",
        "caption": "Shape the character",
        "bullets": [
          "Concept sketches and mood boards",
          "Materials, colours and finishes",
          "A balance of tradition and contemporary life"
        ]
      },
      {
        "heading": "Coordinate the details",
        "body": "Connect interior design with building services and construction information.",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.59 (4).webp",
        "imageAlt": "Living space with backlit onyx elevator cladding, TV console, and false ceiling lighting",
        "caption": "Coordinate the details",
        "bullets": [
          "Electrical, plumbing and HVAC coordination",
          "Working drawings and specifications",
          "Fit-out coordination as part of the agreed scope"
        ]
      }
    ],
    "scopeKicker": "Service scope",
    "scopeTitle": "Support shaped around your project.",
    "scopeIntro": "The required services and deliverables are defined in your project proposal.",
    "scope": [
      {
        "number": "01",
        "title": "Brief & Space Planning",
        "description": "Review user requirements, circulation and furniture relationships.",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.22.24 (4).webp",
        "imageAlt": "Brief & Space Planning"
      },
      {
        "number": "02",
        "title": "Concept Development",
        "description": "Explore the interior direction through sketches, mood boards and design discussion.",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.59.webp",
        "imageAlt": "Concept Development"
      },
      {
        "number": "03",
        "title": "Materials & Finishes",
        "description": "Develop material and finish specifications that support the design.",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.59 (4).webp",
        "imageAlt": "Materials & Finishes"
      },
      {
        "number": "04",
        "title": "Interior Drawings",
        "description": "Prepare drawings and details to communicate the agreed interior design.",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.22.23 (5).webp",
        "imageAlt": "Interior Drawings"
      },
      {
        "number": "05",
        "title": "Service Integration",
        "description": "Coordinate the interior layout with electrical, plumbing, HVAC and other required services.",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.22.24 (2).webp",
        "imageAlt": "Service Integration"
      },
      {
        "number": "06",
        "title": "Fit-out Coordination",
        "description": "Support the transition from design to interior execution within the commissioned scope.",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.57 (7).webp",
        "imageAlt": "Fit-out Coordination"
      }
    ],
    "processKicker": "How we work",
    "processTitle": "A clear sequence, with room for your project.",
    "processIntro": "Each stage develops the information and coordination needed for the work that follows.",
    "process": [
      {
        "step": "01",
        "title": "Understand the Space",
        "description": "Discuss the users, activities, existing conditions and brief.",
        "deliverable": "Interior brief",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.58.webp"
      },
      {
        "step": "02",
        "title": "Explore the Concept",
        "description": "Develop spatial planning, mood boards and the design direction.",
        "deliverable": "Concept proposal",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.59 (1).webp"
      },
      {
        "step": "03",
        "title": "Develop the Design",
        "description": "Refine layouts, materials and service requirements.",
        "deliverable": "Developed interior design",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.22.24 (2).webp"
      },
      {
        "step": "04",
        "title": "Prepare the Information",
        "description": "Document the design, finishes and coordination requirements.",
        "deliverable": "Interior drawing and specification set",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.59 (4).webp"
      },
      {
        "step": "05",
        "title": "Coordinate Execution",
        "description": "Work with the construction team and vendors as agreed in the scope.",
        "deliverable": "Fit-out coordination",
        "image": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.59.webp"
      }
    ],
    "standardsKicker": "What guides the work",
    "standardsTitle": "Purpose, coordination and care.",
    "standardsIntro": "Our approach connects the design intent with practical delivery.",
    "standards": [
      {
        "label": "Function",
        "title": "Make each space work",
        "description": "Spatial planning begins with the activities and people the interior must support."
      },
      {
        "label": "Character",
        "title": "Respect context and identity",
        "description": "The design balances cultural roots with contemporary aspirations."
      },
      {
        "label": "Integration",
        "title": "Connect architecture and interiors",
        "description": "Material details and building services are considered alongside the overall design."
      }
    ],
    "deliverablesKicker": "Project information",
    "deliverablesTitle": "A scope you can understand and review.",
    "deliverablesIntro": "Your proposal identifies which drawings, documents and services apply to the commission.",
    "deliverables": [
      "User requirements and space planning",
      "Mood boards and concept development",
      "Material and finish selections",
      "Interior layouts and details",
      "Material specifications",
      "Coordination with building services",
      "Coordination with contractors and vendors",
      "Design clarifications during execution",
      "Interior fit-outs in a turnkey scope"
    ],
    "deliverableCategories": [
      {
        "title": "Design direction",
        "subtitle": "A shared interior concept",
        "icon": "compass",
        "items": [
          "User requirements and space planning",
          "Mood boards and concept development",
          "Material and finish selections"
        ]
      },
      {
        "title": "Interior documentation",
        "subtitle": "Information for execution",
        "icon": "file",
        "items": [
          "Interior layouts and details",
          "Material specifications",
          "Coordination with building services"
        ]
      },
      {
        "title": "Execution support",
        "subtitle": "From concept to fit-out",
        "icon": "layers",
        "items": [
          "Coordination with contractors and vendors",
          "Design clarifications during execution",
          "Interior fit-outs in a turnkey scope"
        ]
      }
    ],
    "gallery": [
      {
        "src": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.59 (3).webp",
        "alt": "Double height living space with curved marble staircase by Ar. Murali Patharala",
        "caption": "Signature living"
      },
      {
        "src": "/murali-patharala-associates-assets/portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.33.webp",
        "alt": "Completed open luxury modular kitchen and dining",
        "caption": "Completed kitchen & dining"
      },
      {
        "src": "/murali-patharala-associates-assets/completed_interiors/WhatsApp Image 2026-09-23 at 16.40.29.webp",
        "alt": "Luxury entrance foyer with marble floor inlay and gold console",
        "caption": "Executed luxury foyer"
      }
    ],
    "bentoImages": {
      "hero": {
        "src": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.59 (3).webp",
        "alt": "Double-height luxury living hall with curved marble staircase, internal courtyard, and onyx wall designed by Ar. Murali Patharala",
        "tag": "01 // SIGNATURE LIVING",
        "caption": "Double-height living space with curved marble stair & internal courtyard",
        "location": "Luxury Residence"
      },
      "sub1": {
        "src": "/murali-patharala-associates-assets/portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.33.webp",
        "alt": "Completed open luxury modular kitchen and dining space with backlit onyx wall and custom cabinetry",
        "tag": "02 // COMPLETED KITCHEN",
        "caption": "Executed luxury modular kitchen with backlit onyx feature wall",
        "location": "Completed Residence"
      },
      "sub2": {
        "src": "/murali-patharala-associates-assets/interior_renders/WhatsApp Image 2026-09-23 at 16.42.59 (1).webp",
        "alt": "Contemporary kitchen with polished Italian marble floor, breakfast island, and dark stone walls by Ar. Murali Patharala",
        "tag": "03 // MARBLE ISLAND",
        "caption": "Contemporary breakfast island kitchen with Italian marble surfaces",
        "location": "Signature Interiors"
      }
    },
    "faqs": [
      {
        "question": "Do you work on spaces other than homes?",
        "answer": "Yes. MPA’s profile includes residential, commercial and institutional design."
      },
      {
        "question": "How is the interior style decided?",
        "answer": "It develops from the client brief, the architecture and the users’ needs, using concepts, mood boards and material discussions."
      },
      {
        "question": "Can interior design be coordinated with construction?",
        "answer": "Yes. ARCH foundations’ turnkey scope can combine planning, construction, interior fit-outs and utility installations."
      },
      {
        "question": "Are specific material brands included automatically?",
        "answer": "Materials, finishes and any brand requirements are agreed in the project specifications and proposal."
      },
      {
        "question": "How do we start?",
        "answer": "Share the location, plans or available dimensions, intended use and budget with the studio for an initial discussion."
      }
    ]
  },
  {
    "slug": "turnkey-construction",
    "number": "04",
    "eyebrow": "Construction & project delivery",
    "title": "Turnkey",
    "accent": "Construction.",
    "ownership": {
      "label": "Integrated delivery by",
      "company": "MPA + ARCH foundations"
    },
    "summary": "Turnkey project delivery combines architectural planning, construction, interior fit-outs and utility installations. ARCH foundations also undertakes property development and promotion.",
    "shortSummary": "Planning, construction, interior fit-outs and utilities coordinated from concept to handover.",
    "heroImage": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 16.17.56 (2).webp",
    "heroAlt": "Contemporary residential exterior visualization from the MPA project library",
    "highlights": [
      "Design to handover",
      "Integrated planning & construction",
      "Interior fit-outs & utilities",
      "Property development & promotion"
    ],
    "overviewKicker": "Our approach",
    "overviewTitle": "A connected path from concept to completed space.",
    "overviewLead": "MPA’s design consultancy and ARCH foundations’ construction expertise bring the disciplines of a project together through execution and handover.",
    "overviewSections": [
      {
        "heading": "Bring the brief together",
        "body": "Define the building, users, budget and design requirements at the outset.",
        "image": "/murali-patharala-associates-assets/exterior_renders/JAMEE2.webp",
        "imageAlt": "Contemporary villa exterior visualization from the MPA project library",
        "caption": "Bring the brief together",
        "bullets": [
          "Residential, commercial or institutional brief",
          "Site and feasibility review",
          "Scope and project responsibilities"
        ]
      },
      {
        "heading": "Coordinate design and delivery",
        "body": "Develop the architecture alongside engineering, services and construction planning.",
        "image": "/murali-patharala-associates-assets/portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.33.webp",
        "imageAlt": "Completed kitchen and dining interior from the MPA project library",
        "caption": "Coordinate design and delivery",
        "bullets": [
          "Architectural and structural coordination",
          "Interior fit-outs and utility installations",
          "Project management and site supervision"
        ]
      },
      {
        "heading": "Carry the work through",
        "body": "Manage the transition from drawings to construction and ready-to-occupy spaces.",
        "image": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 17.38.22 (1).webp",
        "imageAlt": "Contemporary residential design with warm evening facade lighting",
        "caption": "Carry the work through",
        "bullets": [
          "Coordinated civil and interior works",
          "Quality and completion reviews",
          "Handover planning"
        ]
      }
    ],
    "scopeKicker": "Service scope",
    "scopeTitle": "Support shaped around your project.",
    "scopeIntro": "The required services and deliverables are defined in your project proposal.",
    "scope": [
      {
        "number": "01",
        "title": "Architectural Planning",
        "description": "Site review, conceptual design and developed architectural information.",
        "image": "/images/service-stages/design-planning.webp",
        "imageAlt": "Architectural Planning"
      },
      {
        "number": "02",
        "title": "Technical & Approval Coordination",
        "description": "Structural and building-service coordination, with statutory submissions where included.",
        "image": "/images/service-stages/engineering-permits.webp",
        "imageAlt": "Technical & Approval Coordination"
      },
      {
        "number": "03",
        "title": "Civil Construction",
        "description": "Civil works and structural engineering coordinated to the project design.",
        "image": "/images/service-stages/foundation-rcc.webp",
        "imageAlt": "Civil Construction"
      },
      {
        "number": "04",
        "title": "Utility Installations",
        "description": "Integration of electrical, plumbing and other required building services.",
        "image": "/images/service-stages/plumbing-waterproofing.webp",
        "imageAlt": "Utility Installations"
      },
      {
        "number": "05",
        "title": "Interior Fit-outs",
        "description": "Interior execution coordinated with the architecture and construction scope.",
        "image": "/images/service-stages/interior-fitout.webp",
        "imageAlt": "Interior Fit-outs"
      },
      {
        "number": "06",
        "title": "Property Development & Promotion",
        "description": "Development and promotion services through ARCH foundations, with scope defined for the particular project.",
        "image": "/images/service-stages/home-handover.webp",
        "imageAlt": "Property Development & Promotion"
      }
    ],
    "processKicker": "How we work",
    "processTitle": "A clear sequence, with room for your project.",
    "processIntro": "Each stage develops the information and coordination needed for the work that follows.",
    "process": [
      {
        "step": "01",
        "title": "Establish the Brief",
        "description": "Review the site, intended use, budget and delivery requirements.",
        "deliverable": "Project scope",
        "image": "/images/service-stages/design-planning.webp"
      },
      {
        "step": "02",
        "title": "Develop & Coordinate",
        "description": "Resolve architecture, engineering, approvals and interior requirements.",
        "deliverable": "Coordinated design information",
        "image": "/images/service-stages/engineering-permits.webp"
      },
      {
        "step": "03",
        "title": "Plan Delivery",
        "description": "Agree specifications, responsibilities and the construction programme.",
        "deliverable": "Project delivery proposal",
        "image": "/images/service-stages/soil-assessment.webp"
      },
      {
        "step": "04",
        "title": "Execute the Works",
        "description": "Coordinate construction, fit-outs and utilities with site supervision.",
        "deliverable": "Completed construction and fit-outs",
        "image": "/images/service-stages/interior-fitout.webp"
      },
      {
        "step": "05",
        "title": "Review & Handover",
        "description": "Review the agreed works and prepare the spaces for occupation.",
        "deliverable": "Project handover",
        "image": "/images/service-stages/home-handover.webp"
      }
    ],
    "standardsKicker": "What guides the work",
    "standardsTitle": "Purpose, coordination and care.",
    "standardsIntro": "Our approach connects the design intent with practical delivery.",
    "standards": [
      {
        "label": "Coordination",
        "title": "Bring the disciplines together",
        "description": "Planning, construction, interiors and utilities are coordinated around the project brief."
      },
      {
        "label": "Purpose",
        "title": "Build with the user in mind",
        "description": "The completed space should support its intended use and the client’s priorities."
      },
      {
        "label": "Craftsmanship",
        "title": "Carry design intent into the work",
        "description": "Technical coordination and site supervision support the transition from drawings to construction."
      }
    ],
    "deliverablesKicker": "Project information",
    "deliverablesTitle": "A scope you can understand and review.",
    "deliverablesIntro": "Your proposal identifies which drawings, documents and services apply to the commission.",
    "deliverables": [
      "Architectural planning and design",
      "Structural and MEP coordination",
      "Approval documentation within the agreed scope",
      "Civil construction and structural works",
      "Interior fit-outs",
      "Utility installations",
      "Project management",
      "Site supervision and quality review",
      "Completion and handover coordination"
    ],
    "deliverableCategories": [
      {
        "title": "Design & coordination",
        "subtitle": "A considered starting point",
        "icon": "compass",
        "items": [
          "Architectural planning and design",
          "Structural and MEP coordination",
          "Approval documentation within the agreed scope"
        ]
      },
      {
        "title": "Construction & fit-out",
        "subtitle": "Connected execution",
        "icon": "home",
        "items": [
          "Civil construction and structural works",
          "Interior fit-outs",
          "Utility installations"
        ]
      },
      {
        "title": "Project delivery",
        "subtitle": "Concept to occupation",
        "icon": "shield",
        "items": [
          "Project management",
          "Site supervision and quality review",
          "Completion and handover coordination"
        ]
      }
    ],
    "gallery": [
      {
        "src": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 16.17.56 (2).webp",
        "alt": "Contemporary timber and stone residence visualization",
        "caption": "Architectural exterior vision"
      },
      {
        "src": "/murali-patharala-associates-assets/portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.33.webp",
        "alt": "Completed kitchen and dining interior by MPA",
        "caption": "Completed kitchen and dining"
      },
      {
        "src": "/murali-patharala-associates-assets/completed_interiors/WhatsApp Image 2026-09-23 at 16.40.29.webp",
        "alt": "Completed residential entrance foyer with custom console and marble flooring",
        "caption": "Completed entrance interior"
      }
    ],
    "bentoImages": {
      "hero": {
        "src": "/murali-patharala-associates-assets/exterior_renders/WhatsApp Image 2026-09-23 at 16.17.56 (2).webp",
        "alt": "Contemporary timber and stone residence visualization from the MPA project library",
        "tag": "01 // ARCHITECTURAL DESIGN",
        "caption": "Contemporary residential exterior concept with layered stone and timber",
        "location": "Chennai Residence"
      },
      "sub1": {
        "src": "/murali-patharala-associates-assets/portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.33.webp",
        "alt": "Completed kitchen and dining area with custom cabinetry and stone finishes",
        "tag": "02 // INTERIOR DESIGN",
        "caption": "Completed kitchen and dining space with coordinated interior finishes",
        "location": "Completed Residence"
      },
      "sub2": {
        "src": "/murali-patharala-associates-assets/completed_interiors/WhatsApp Image 2026-09-23 at 16.40.29.webp",
        "alt": "Completed residential entrance foyer with custom console and marble flooring",
        "tag": "03 // COMPLETED INTERIOR",
        "caption": "Finished entrance foyer with custom joinery and marble flooring",
        "location": "Completed Residence"
      }
    },
    "faqs": [
      {
        "question": "What does turnkey delivery include?",
        "answer": "The client profile describes end-to-end delivery from concept to handover, integrating planning, construction, interior fit-outs and utility installations. The proposal defines the inclusions for your project."
      },
      {
        "question": "Is turnkey work limited to houses?",
        "answer": "No. The practice and construction profile also cover commercial and institutional projects."
      },
      {
        "question": "Do you undertake property development?",
        "answer": "ARCH foundations offers property development and promotion alongside its construction services. Contact the studio to discuss the specific development brief."
      },
      {
        "question": "Who handles architecture and construction?",
        "answer": "Murali Patharala & Associates provides architectural and interior design consultancy. ARCH foundations provides construction and property development expertise."
      },
      {
        "question": "How are the contract terms decided?",
        "answer": "The team reviews the project before issuing a written proposal covering the scope, specifications, responsibilities, fees and programme."
      }
    ]
  }
];

export function getServiceDetail(slug: string) {
  return SERVICE_DETAILS.find(service => service.slug === slug);
}
