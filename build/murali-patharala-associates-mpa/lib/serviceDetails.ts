export interface ServiceSectionBlock {
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  caption: string;
  bullets?: string[];
}

export interface ServiceIdealFor {
  title: string;
  text: string;
}

export interface ServiceScopeItem {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tag?: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
  image: string;
  deliverable: string;
}

export interface DeliverableCategory {
  title: string;
  subtitle: string;
  icon: string;
  items: string[];
}

export interface ServiceDetail {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  accent: string;
  ownership: { label: string; company: string };
  summary: string;
  promise: string;
  heroImage: string;
  heroAlt: string;
  highlights: string[];
  stats: Array<{ value: string; label: string }>;
  overviewKicker: string;
  overviewTitle: string;
  overviewLead: string;
  overviewSections: ServiceSectionBlock[];
  idealForTitle: string;
  idealFor: ServiceIdealFor[];
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
  standards: Array<{ label: string; title: string; description: string; image?: string }>;
  deliverablesKicker: string;
  deliverablesTitle: string;
  deliverablesIntro: string;
  deliverables: string[];
  deliverableCategories: DeliverableCategory[];
  gallery: Array<{ src: string; alt: string; caption: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'architectural-design',
    number: '01',
    eyebrow: 'Planning / 3D Elevations / Working Drawings',
    title: 'Architectural',
    accent: 'Design.',
    ownership: { label: 'Architectural design by', company: 'Murali Patharala & Associates (MPA)' },
    summary:
      "Design it first. Know what you're building, and know what it will cost. Complete architectural planning, 3D elevations, structural engineering, and detailed construction estimates before building.",
    promise: "Design It First. Know What You're Building. Know What It Will Cost.",
    heroImage: '/images/architecture/architectural-blueprint-draft.webp',
    heroAlt: 'Architect developing a detailed residential floor plan',
    highlights: [
      'Custom Vastu-Compliant Plans',
      'Photorealistic 3D Elevations',
      'Structural & MEP Drawings',
      'Detailed Construction Estimate (BOQ)',
    ],
    stats: [
      { value: '100%', label: 'Custom Floor Plans' },
      { value: '3D Views', label: 'Exterior & Walkthrough' },
      { value: 'Vastu', label: '100% Vastu Compliant' },
      { value: 'Accurate', label: 'Detailed Cost Estimate' },
    ],
    overviewKicker: 'Our 4-Pillar Design Approach',
    overviewTitle: 'Plan with complete clarity before you build.',
    overviewLead:
      'From understanding your family lifestyle to finalizing built-up area and construction costs, every stage is planned and executed with engineering precision and aesthetic detail.',
    overviewSections: [
      {
        heading: 'DESIGN: Tailored to your land & lifestyle',
        body: 'We understand your plot dimensions, orientation, family requirements, room numbers, and style preferences to create custom floor plans shaped around your life.',
        image: '/images/architecture/villa-plan-sketch.webp',
        imageAlt: 'Architect sketching a villa plan around site requirements',
        caption: 'Design & Space Planning',
        bullets: [
          'Land dimensions, orientation, and natural sunlight analysis',
          'Room sizes tailored to family routine and future expansion',
          '100% Vastu compliance integrated thoughtfully without dark compromises',
        ],
      },
      {
        heading: 'FINALISE: Photorealistic 3D elevations & areas',
        body: 'Walk through your home virtually. Finalize floor plans, exterior facade concepts, room volumes, and built-up areas with complete clarity before committing funds.',
        image: '/images/architecture/bim-3d-walkthrough.webp',
        imageAlt: 'Photorealistic 3D walkthrough of a home interior',
        caption: '3D Elevation & Area Finalisation',
        bullets: [
          'Photorealistic 3D exterior and interior elevation concepts',
          'Finalized built-up area statements with floor-by-floor breakdown',
          'Freeze design and specifications with total family confidence',
        ],
      },
      {
        heading: 'ESTIMATE: Detailed construction estimate upfront',
        body: 'Prepare an itemized construction estimate and coordinated engineering drawings so you know exact specifications, quantities, and costs before construction begins.',
        image: '/images/architecture/cmda-sanction-drafting.webp',
        imageAlt: 'Sanction drawings and technical specifications',
        caption: 'Detailed Estimate & Working Set',
        bullets: [
          'Comprehensive itemized BOQ with branded material specifications',
          'Vetted structural framing and coordinated electrical/plumbing sets',
          'CMDA / GCC municipal sanction drawings compliant with local bylaws',
        ],
      },
    ],
    idealForTitle: 'Choose this if…',
    idealFor: [
      { title: 'You own a residential plot', text: 'You want custom floor plans designed around your family requirements, plot size, and orientation.' },
      { title: 'You want to see first', text: 'You want to approve photorealistic 3D elevations and room flows before starting civil construction.' },
      { title: 'You want budget clarity', text: 'You want an accurate construction estimate and itemized BOQ before signing a contractor agreement.' },
      { title: 'You need building approvals', text: 'Statutory sanction drawings prepared strictly to CMDA / GCC norms for first-time approval.' },
    ],
    scopeKicker: 'What is included',
    scopeTitle: 'Complete architecture & engineering solutions.',
    scopeIntro: 'Six core design stages covering planning, 3D visualization, engineering, and cost estimation.',
    scope: [
      {
        number: '01',
        title: 'Requirements & Site Assessment',
        description: 'Plot dimensions, orientation, access road width, and family room requirements analyzed upfront.',
        image: '/images/architecture/villa-plan-sketch.webp',
        imageAlt: 'Site assessment and requirements planning',
        tag: 'Step 01',
      },
      {
        number: '02',
        title: 'Architectural Floor Plans',
        description: 'Vastu-compliant room layouts, furniture planning, circulation paths, and natural ventilation.',
        image: '/images/architecture/space-planning-atrium.webp',
        imageAlt: 'Space planning and room circulation layouts',
        tag: 'Step 02',
      },
      {
        number: '03',
        title: '3D Exterior Elevation Concepts',
        description: 'Contemporary facade massing, shading elements, material textures, and street-facing lighting.',
        image: '/images/architecture/geometric-villa-elevation.webp',
        imageAlt: 'Contemporary facade 3D elevation',
        tag: 'Step 03',
      },
      {
        number: '04',
        title: 'Structural Engineering Drawings',
        description: 'Vetted column-beam structural framing, footing designs, and slab reinforcement schedules.',
        image: '/images/architecture/staad-structural-engineering.webp',
        imageAlt: 'Structural engineering analysis and drawings',
        tag: 'Step 04',
      },
      {
        number: '05',
        title: 'Plumbing & Electrical Working Set',
        description: 'Concealed conduit points, switch locations, water supply lines, and drainage schematics.',
        image: '/images/architecture/architectural-blueprint-draft.webp',
        imageAlt: 'Plumbing and electrical working drawings',
        tag: 'Step 05',
      },
      {
        number: '06',
        title: 'Sanction Drawings & BOQ Estimate',
        description: 'Municipal approval documentation plus a comprehensive, itemized construction cost estimate.',
        image: '/images/architecture/cmda-sanction-drafting.webp',
        imageAlt: 'Sanction package drafting and BOQ preparation',
        tag: 'Step 06',
      },
    ],
    processKicker: 'Your Home Design Journey',
    processTitle: 'From requirements to construction with total clarity.',
    processIntro: 'Follow our structured 6-stage journey matching the proven Deejos architectural framework.',
    process: [
      {
        step: '01',
        title: 'Tell Us Your Requirements',
        description: 'Share land dimensions, family room needs, number of floors, preferred style, and budget expectations.',
        image: '/images/architecture/architect-studio-model.webp',
        deliverable: 'Client brief & space requirements',
      },
      {
        step: '02',
        title: 'Site Assessment & Plot Study',
        description: 'Analyze plot orientation, road access, site conditions, sunlight angles, and setback guidelines.',
        image: '/images/architecture/villa-plan-sketch.webp',
        deliverable: 'Site orientation & zoning study',
      },
      {
        step: '03',
        title: 'Architectural Floor Plans',
        description: 'Develop custom 2D floor plans and furniture layouts collaboratively with your family.',
        image: '/images/architecture/space-planning-atrium.webp',
        deliverable: 'Approved 2D architectural plans',
      },
      {
        step: '04',
        title: '3D Elevation & Built-Up Area',
        description: 'Walk through photorealistic 3D elevations and freeze finalized built-up areas and specifications.',
        image: '/images/architecture/bim-3d-walkthrough.webp',
        deliverable: '3D elevations & area statement',
      },
      {
        step: '05',
        title: 'Engineering & Detailed Drawings',
        description: 'Prepare coordinated structural drawings, column-beam schedules, and MEP service layouts.',
        image: '/images/architecture/staad-structural-engineering.webp',
        deliverable: 'Execution-ready working drawing set',
      },
      {
        step: '06',
        title: 'Detailed Construction Estimate',
        description: 'Arrive at an accurate, itemized construction estimate (BOQ) before signing any building agreement.',
        image: '/images/architecture/architectural-blueprint-draft.webp',
        deliverable: 'Detailed BOQ estimate & agreement',
      },
    ],
    standardsKicker: 'Why choose our architectural services',
    standardsTitle: 'Professional designs built to last.',
    standardsIntro: 'Designed with engineering precision, aesthetic detail, and complete budget control.',
    standards: [
      {
        label: 'Vastu & Climate',
        title: '100% Vastu-Compliant & Climate-Responsive',
        description: 'Designs tailored to local sun and wind directions, cutting heat buildup while honoring directional traditions.',
        image: '/images/architecture/passive-timber-screens.webp',
      },
      {
        label: 'Engineering Precision',
        title: 'Coordinated Structural & MEP Drawings',
        description: 'Structural framing and building services aligned before site work, preventing costly on-site clashes.',
        image: '/images/architecture/staad-structural-engineering.webp',
      },
      {
        label: 'Cost Transparency',
        title: 'Know What You Are Building & What It Costs',
        description: 'Itemized area statements and construction estimates ensure zero budget surprises when building.',
        image: '/images/architecture/cmda-sanction-drafting.webp',
      },
    ],
    deliverablesKicker: 'What you take home',
    deliverablesTitle: 'Complete architectural & engineering package.',
    deliverablesIntro: 'All files provided in high-resolution print binders and digital CAD/PDF formats.',
    deliverables: [
      'Custom 2D floor plans with dimensioned room layouts',
      'Photorealistic 3D exterior elevation renders',
      'Structural column-beam framing and footing details',
      'Concealed plumbing and drainage schematic layouts',
      'Electrical switch point and conduit distribution plans',
      'Door, window, and ventilation schedule details',
      'CMDA / GCC municipal sanction drawing package',
      'Detailed built-up area statement & construction estimate (BOQ)',
    ],
    deliverableCategories: [
      {
        title: 'Architectural Blueprints',
        subtitle: 'Dimensioned working plans for site execution',
        icon: 'Compass',
        items: [
          'All-floor dimensioned floor plans with room tags',
          'Cross-sectional wall and staircase details',
          'Exterior elevation views with finish callouts',
          'Door, window, and ventilation schedules',
        ],
      },
      {
        title: '3D Elevation Suite',
        subtitle: 'Photorealistic imagery for visual sign-off',
        icon: 'Eye',
        items: [
          'High-resolution day and dusk exterior 3D renders',
          'Key room interior flow perspectives',
          'Material texture and facade lighting views',
          'Complete visual design presentation',
        ],
      },
      {
        title: 'Engineering & MEP Set',
        subtitle: 'Coordinated structural & services drawings',
        icon: 'Calculator',
        items: [
          'Structural column, beam, and slab framing schedules',
          'Footing reinforcement and foundation details',
          'Plumbing, drainage, and water supply routes',
          'Electrical points, conduit runs, and DB layouts',
        ],
      },
      {
        title: 'Sanction & Costing Pack',
        subtitle: 'Permits and transparent cost estimate',
        icon: 'FileCheck',
        items: [
          'CMDA / GCC sanction submission drawing set',
          'FSI, coverage, and setback calculation sheets',
          'Itemized construction cost estimate (BOQ)',
          'Area statement with specifications breakdown',
        ],
      },
    ],
    gallery: [
      { src: '/images/architecture/villa-plan-sketch.webp', alt: 'Hand-drawn villa planning study', caption: 'Concept planning' },
      { src: '/images/architecture/space-planning-atrium.webp', alt: 'Double-height atrium space planning', caption: 'Volume and daylight' },
      { src: '/images/architecture/geometric-villa-elevation.webp', alt: 'Contemporary geometric villa elevation', caption: 'Facade development' },
    ],
    faqs: [
      { question: 'What is included in the architectural design package?', answer: 'Our package includes land assessment, 100% Vastu-compliant 2D floor plans, photorealistic 3D elevations, structural engineering drawings, electrical & plumbing schematics, CMDA/GCC sanction drawings, and a detailed construction estimate.' },
      { question: 'Is Vastu compliance compulsory?', answer: 'We ensure 100% Vastu compliance tailored to your preferences — entrance, kitchen, bedrooms, pooja room, and stairs — while ensuring modern aesthetics, abundant natural light, and cross-ventilation.' },
      { question: 'How do you help us understand construction costs before building?', answer: 'We prepare an itemized construction estimate (BOQ) with clear specifications, built-up areas, and material grades so you know the exact cost before signing a construction contract.' },
      { question: 'Can we use these drawings to hire our own contractor or build with you?', answer: 'Yes. Our drawings are complete and contractor-ready. You can use them to obtain transparent bids or choose our in-house construction services for seamless turnkey execution.' },
      { question: 'How long does the architectural design process take?', answer: 'Typically 3 to 5 weeks depending on revisions and client approvals, progressing logically from floor plans to 3D elevations and technical working drawings.' },
    ],
  },
  {
    slug: 'residential-construction',
    number: '02',
    eyebrow: 'Design + Construction / Branded Materials / Quality Handover',
    title: 'Residential',
    accent: 'Construction.',
    ownership: { label: 'Construction by', company: 'ARCH Foundation · Part of MPA' },
    summary:
      'Residential construction by experts. We build buildings professionally using branded materials, experienced in-house engineers, transparent project management, and on-time delivery.',
    promise: 'High Quality At Reasonable Price. We Build Buildings Professionally.',
    heroImage: '/images/architecture/structural-construction-frame.webp',
    heroAlt: 'Engineered reinforced concrete frame under construction',
    highlights: [
      'One-Stop Design + Execution',
      'Branded Materials (Tata, UltraTech)',
      'Experienced In-House Technical Team',
      'High Transparency & On-Time Delivery',
    ],
    stats: [
      { value: 'Branded', label: 'Tata Steel & UltraTech' },
      { value: 'In-House', label: 'Architects & Engineers' },
      { value: '100% Vastu', label: 'Customized Designs' },
      { value: 'On-Time', label: 'Scheduled Handover' },
    ],
    overviewKicker: 'Why Choose Us for Construction',
    overviewTitle: 'High quality construction at reasonable price.',
    overviewLead:
      'We combine architectural expertise, structural engineering, and professional construction under one roof — delivering structurally sound, beautiful homes on time.',
    overviewSections: [
      {
        heading: 'Experienced in-house team of experts',
        body: 'Our in-house team of architects, structural engineers, and project managers oversee every stage of construction, ensuring seamless execution without contractor hassles.',
        image: '/images/architecture/site-engineer-audit.webp',
        imageAlt: 'Site engineer reviewing structural work on a residential site',
        caption: 'In-House Technical Supervision',
        bullets: [
          'Direct coordination between architectural design and site execution',
          'Strict compliance with approved structural drawings and safety norms',
          'Regular engineering quality checks at every structural milestone',
        ],
      },
      {
        heading: 'Branded materials & durable construction',
        body: 'We use only trusted branded materials — Tata Tiscon / JSW steel, UltraTech / Ramco cement — ensuring your home is structurally durable, weather-resistant, and built to last.',
        image: '/images/architecture/villa-before-frame.webp',
        imageAlt: 'Reinforcement and shuttering checked before concrete pour',
        caption: 'Branded Materials & Quality Framing',
        bullets: [
          'Certified 550D TMT steel and 53-grade high-performance cement',
          'Multi-layer waterproofing for terraces, balconies, and wet areas',
          'High-quality branded plumbing, electrical, and sanitary fittings',
        ],
      },
      {
        heading: 'High transparency & on-time delivery',
        body: 'We maintain transparent project tracking, regular milestone progress updates, and structured planning to deliver your completed home on time within the agreed budget.',
        image: '/images/architecture/turnkey-key-handover.webp',
        imageAlt: 'Engineer documenting site progress with measurements',
        caption: 'Transparent Milestone Management',
        bullets: [
          'Transparent milestone schedule with clear timelines',
          'Regular construction progress updates for complete peace of mind',
          'Itemized package specifications with zero hidden surprises',
        ],
      },
    ],
    idealForTitle: 'Choose this if…',
    idealFor: [
      { title: 'You want professional execution', text: 'You want your home built by a professional firm with in-house architects and engineers.' },
      { title: 'You demand branded materials', text: 'You want trusted brands like Tata Tiscon, UltraTech, and Ashirvad named in your agreement.' },
      { title: 'You value transparency', text: 'You want clear package pricing, milestone tracking, and on-time handover without cost escalations.' },
      { title: 'You live outside Chennai', text: 'You need reliable remote progress reporting and structured milestone updates.' },
    ],
    scopeKicker: 'What is included',
    scopeTitle: 'End-to-end residential construction scope.',
    scopeIntro: 'Comprehensive packages covering design, structural civil work, plumbing, electrical, and finishes.',
    scope: [
      {
        number: '01',
        title: 'Design & Statutory Sanction',
        description: 'Architectural floor plans, 3D elevation design, structural framing, and municipal permit drawings.',
        image: '/images/architecture/cmda-sanction-drafting.webp',
        imageAlt: 'Design and statutory permits drafting',
        tag: 'Scope 01',
      },
      {
        number: '02',
        title: 'Foundation & RCC Structure',
        description: 'Earthwork excavation, anti-termite treatment, engineered RCC footings, columns, beams, and slabs.',
        image: '/images/architecture/structural-construction-frame.webp',
        imageAlt: 'Reinforced concrete frame under construction',
        tag: 'Scope 02',
      },
      {
        number: '03',
        title: 'Brickwork & Wall Plastering',
        description: 'High-density block masonry / country bricks, lintel beams, and smooth crack-resistant plastering.',
        image: '/images/architecture/porotherm-clay-facade.webp',
        imageAlt: 'Masonry construction with precision joints',
        tag: 'Scope 03',
      },
      {
        number: '04',
        title: 'Plumbing & Waterproofing',
        description: 'Concealed CPVC/UPVC water lines, branded sanitaryware, and multi-layer terrace waterproofing.',
        image: '/images/architecture/terrace-cool-roof.webp',
        imageAlt: 'Terrace waterproofing and drainage setup',
        tag: 'Scope 04',
      },
      {
        number: '05',
        title: 'Electrical Infrastructure',
        description: 'Concealed fire-resistant copper wiring, modular switches, MCB distribution, and earthing pits.',
        image: '/images/architecture/staad-structural-engineering.webp',
        imageAlt: 'Concealed services and MEP infrastructure installation',
        tag: 'Scope 05',
      },
      {
        number: '06',
        title: 'Flooring, Painting & Handover',
        description: 'Vitrified tile flooring, premium wall putty and emulsion painting, doors, windows, and handover.',
        image: '/images/architecture/villa-after-finished.webp',
        imageAlt: 'Completed luxury residential villa',
        tag: 'Scope 06',
      },
    ],
    processKicker: 'Construction Journey',
    processTitle: 'Step-by-step from ground breaking to key handover.',
    processIntro: 'Structured planning, milestone inspections, and transparent progress tracking.',
    process: [
      {
        step: '01',
        title: 'Requirements & Soil Assessment',
        description: 'Understand site conditions, soil bearing capacity, family requirements, and finalize package selection.',
        image: '/images/architecture/site-surveying-raw.webp',
        deliverable: 'Soil test & project feasibility',
      },
      {
        step: '02',
        title: 'Plan Finalisation & Agreement',
        description: 'Architectural drawings approved, built-up areas frozen, and itemized construction contract signed.',
        image: '/images/architecture/villa-plan-sketch.webp',
        deliverable: 'Approved plans & construction contract',
      },
      {
        step: '03',
        title: 'Foundation & RCC Framing',
        description: 'Excavation, anti-termite treatment, footings, plinth beam, and floor-by-floor concrete frame casting.',
        image: '/images/architecture/villa-before-frame.webp',
        deliverable: 'Completed RCC structural frame',
      },
      {
        step: '04',
        title: 'Brickwork, MEP & Waterproofing',
        description: 'Masonry walls, concealed electrical conduits, plumbing pipework, and terrace waterproofing.',
        image: '/images/architecture/structural-construction-frame.webp',
        deliverable: 'Weatherproof shell & tested services',
      },
      {
        step: '05',
        title: 'Finishes, Quality Audit & Handover',
        description: 'Vitrified flooring, painting, door/window installation, sanitary fittings, and key handover.',
        image: '/images/architecture/turnkey-key-handover.webp',
        deliverable: 'Completed home & keys handover',
      },
    ],
    standardsKicker: 'Our Construction Guarantees',
    standardsTitle: 'Quality materials and professional execution.',
    standardsIntro: 'Built to industry engineering codes with trusted Indian brands.',
    standards: [
      {
        label: 'Branded Materials',
        title: 'Tata / JSW Steel & UltraTech Cement',
        description: 'Standardized use of certified 550D TMT steel bars and 53-grade cement named explicitly in your agreement.',
        image: '/images/architecture/structural-construction-frame.webp',
      },
      {
        label: 'In-House Technical Team',
        title: 'Architects & Engineers on Every Project',
        description: 'Direct supervision by qualified civil engineers and architects to ensure construction complies with drawings.',
        image: '/images/architecture/site-engineer-audit.webp',
      },
      {
        label: 'On-Time Handover',
        title: 'Milestone Tracking & Timely Delivery',
        description: 'Structured stage-by-stage planning ensures your home is completed and handed over on schedule.',
        image: '/images/architecture/villa-after-finished.webp',
      },
    ],
    deliverablesKicker: 'What you take home',
    deliverablesTitle: 'A ready-to-live home with complete documentation.',
    deliverablesIntro: 'Full handover package including as-built drawings, material warranties, and keys.',
    deliverables: [
      'Soil test report and certified structural drawings',
      'RCC framed structure built with branded steel and cement',
      'Precision masonry walls with smooth interior and exterior plastering',
      'Multi-layer waterproofing for all wet areas and terrace slabs',
      'Tested concealed electrical and plumbing infrastructure',
      'Vitrified tile flooring, granite steps, and bathroom tiling',
      'Interior and exterior painting with premium emulsion coats',
      'As-built drawings, fixture warranties, and ready-to-live keys handover',
    ],
    deliverableCategories: [
      {
        title: 'Structural Frame & Civil Work',
        subtitle: 'Engineered concrete framework built to code',
        icon: 'ShieldCheck',
        items: [
          'Earthwork excavation and certified anti-termite treatment',
          'RCC footings, plinth beams, columns, and roof slabs',
          'Tata Tiscon / JSW 550D TMT steel reinforcement',
          'UltraTech / Ramco 53-grade certified cement',
        ],
      },
      {
        title: 'Masonry & Waterproofing',
        subtitle: 'Durable building envelope and weather protection',
        icon: 'Home',
        items: [
          'Solid concrete blocks / country brick wall construction',
          'Smooth sponge-finish internal and exterior wall plastering',
          'Multi-layer elastomeric waterproofing on terrace slabs',
          'Sunken slab waterproofing in all bathrooms and balconies',
        ],
      },
      {
        title: 'Plumbing & Electrical Systems',
        subtitle: 'Safe, tested MEP infrastructure',
        icon: 'Zap',
        items: [
          'Ashirvad / Astral CPVC water lines and UPVC drainage',
          'Branded CP and sanitary fittings (Parryware / Jaquar / Kohler)',
          'Finolex / Havells fire-resistant copper wiring',
          'Modular switches and MCB distribution board with earthing',
        ],
      },
      {
        title: 'Finishes & Handover Package',
        subtitle: 'Move-in ready finishes with documentation',
        icon: 'FileText',
        items: [
          'Double-charged vitrified tile flooring for living and bedrooms',
          'Asian Paints primer, wall putty, and premium emulsion coats',
          'Main teak wood entrance door with brass fittings',
          'As-built drawing files, fixture warranties, and keys handover',
        ],
      },
    ],
    gallery: [
      { src: '/images/architecture/site-surveying-raw.webp', alt: 'Site engineer surveying a residential plot', caption: 'Setting out' },
      { src: '/images/architecture/staad-structural-engineering.webp', alt: 'Structural engineering analysis for a home', caption: 'Structural verification' },
      { src: '/images/architecture/villa-after-finished.webp', alt: 'Completed contemporary residence after construction', caption: 'Completed handover' },
    ],
    faqs: [
      { question: 'What home construction packages do you offer?', answer: 'We offer customizable construction packages (Standard, Premium, and Luxury) with clear, itemized specifications per square foot, covering design, structural work, plumbing, electrical, flooring, and painting.' },
      { question: 'Which material brands do you use for construction?', answer: 'We use trusted brands: Tata Tiscon / JSW for TMT steel, UltraTech / Ramco for cement, Ashirvad / Astral for plumbing, Finolex / Havells for wiring, and Asian Paints for wall finishes.' },
      { question: 'How do you ensure on-time project completion?', answer: 'We use structured milestone scheduling and active project management to coordinate labor, material procurement, and stage approvals without unneeded delays.' },
      { question: 'Can you construct based on drawings from our own architect?', answer: 'Yes. We review your existing drawings, provide an itemized construction estimate, and execute the civil construction with our in-house engineering team.' },
      { question: 'How do outstation and NRI clients track progress?', answer: 'We provide regular milestone photo and video updates, scheduled phone/video reviews, and transparent stage-wise billing linked directly to verified progress.' },
    ],
  },
  {
    slug: 'interior-design',
    number: '03',
    eyebrow: 'Modular Kitchens / Wardrobes / False Ceilings / Lighting',
    title: 'Interior',
    accent: 'Design.',
    ownership: { label: 'Interior design by', company: 'Murali Patharala & Associates (MPA)' },
    summary:
      'End-to-end home interior solutions. Signature luxury interiors covering modular kitchens, wardrobes, false ceilings, lighting, and custom furniture tailored to your lifestyle.',
    promise: 'Signature Luxury Interiors. End-To-End Home Interior Solutions.',
    heroImage: '/images/architecture/interior-double-height.webp',
    heroAlt: 'Bespoke double-height residential interior',
    highlights: [
      '100% Customized Solutions',
      'Bespoke Modular Kitchens',
      'Full-Height Wardrobes & Storage',
      'False Ceilings & Lighting Design',
    ],
    stats: [
      { value: '100%', label: 'Customized To Rooms' },
      { value: 'End-to-End', label: 'Design & Execution' },
      { value: 'Premium', label: 'Quality Core Materials' },
      { value: 'On-Time', label: 'Turnkey Handover' },
    ],
    overviewKicker: 'Our Interior Solutions',
    overviewTitle: 'Transforming spaces with expertise and dedication.',
    overviewLead:
      'We plan storage, modular kitchens, lighting, and furniture around your daily routines — crafted with factory precision, premium materials, and on-time handover.',
    overviewSections: [
      {
        heading: 'Modular kitchens & ergonomic storage',
        body: 'Kitchens designed around how you cook. Ergonomic work triangles, soft-close tandem drawers, corner units, appliance garages, and quartz or granite countertops.',
        image: '/images/architecture/modular-kitchen-luxury.webp',
        imageAlt: 'Kitchen planned around cooking and storage routines',
        caption: 'Bespoke Modular Kitchens',
        bullets: [
          'Ergonomic kitchen work triangles tailored to your cooking habits',
          'Heavy-duty soft-close tandem drawers and pullout wire baskets',
          'Durable quartz, granite, or composite stone countertops with backsplashes',
        ],
      },
      {
        heading: 'Storage, wardrobes & living furniture',
        body: 'Full-height floor-to-ceiling wardrobes, lofts, dressing units, living room TV consoles, crockery units, and shoe racks custom-built to maximize every inch of space.',
        image: '/images/architecture/luxury-master-bedroom.webp',
        imageAlt: 'Master bedroom wardrobe and dressing joinery',
        caption: 'Custom Wardrobes & Joinery',
        bullets: [
          'Floor-to-ceiling wardrobes with sliding or hinged shutters',
          'Integrated loft storage, internal accessory trays, and dressing mirrors',
          'Designer TV entertainment units, crockery cabinets, and foyer shoe racks',
        ],
      },
      {
        heading: 'False ceilings, lighting & finish styling',
        body: 'Architectural false ceilings with layered ambient, task, and warm LED cove lighting to create inviting, sophisticated atmospheres throughout your home.',
        image: '/images/architecture/living-room-double-height.webp',
        imageAlt: 'Living space with coordinated lighting and ceiling design',
        caption: 'False Ceilings & Lighting',
        bullets: [
          'Designer Gyproc false ceilings with clean shadow reveals',
          'Layered ambient, spot, and concealed warm LED strip lighting',
          'Harmonious wall paint, textured paneling, and curated finishes',
        ],
      },
    ],
    idealForTitle: 'Choose this if…',
    idealFor: [
      { title: 'You are building a new home', text: 'You want interiors coordinated seamlessly with civil construction so no walls need hacking later.' },
      { title: 'You want a functional kitchen', text: 'You want a modular kitchen designed around your family cooking habits with durable, moisture-resistant materials.' },
      { title: 'You need maximum storage', text: 'You want floor-to-ceiling wardrobes, lofts, TV units, and crockery cabinets tailored to room dimensions.' },
      { title: 'You want one cohesive look', text: 'False ceilings, lighting, custom joinery, and wall styling composed as one harmonious design.' },
    ],
    scopeKicker: 'What is included',
    scopeTitle: 'Complete home interior solutions.',
    scopeIntro: 'Covering modular kitchens, storage, ceilings, lighting, and custom joinery (matching Deejos interior solutions).',
    scope: [
      {
        number: '01',
        title: 'Modular Kitchen Solutions',
        description: 'Tandem drawer systems, pullout baskets, tall pantry units, and quartz countertops.',
        image: '/images/architecture/modular-kitchen-luxury.webp',
        imageAlt: 'Luxury modular kitchen with modern finishes',
        tag: 'Solution 01',
      },
      {
        number: '02',
        title: 'Storage & Wardrobes',
        description: 'Floor-to-ceiling wardrobes with lofts, internal sensor lighting, and dressing mirrors.',
        image: '/images/architecture/luxury-master-bedroom.webp',
        imageAlt: 'Master bedroom wardrobe and dressing joinery',
        tag: 'Solution 02',
      },
      {
        number: '03',
        title: 'False Ceiling & Lighting',
        description: 'Designer false ceiling concepts with warm LED cove lights, task spots, and ambient layers.',
        image: '/images/architecture/interior-double-height.webp',
        imageAlt: 'Double-height false ceiling and lighting design',
        tag: 'Solution 03',
      },
      {
        number: '04',
        title: 'TV & Living Entertainment Units',
        description: 'Custom acoustic fluted paneling, floating media consoles, and display shelving.',
        image: '/images/architecture/living-room-double-height.webp',
        imageAlt: 'Living space layout and TV unit styling',
        tag: 'Solution 04',
      },
      {
        number: '05',
        title: 'Crockery Units & Dining Solutions',
        description: 'Glass-shutter crockery units, breakfast counters, and integrated dining storage cabinets.',
        image: '/images/architecture/custom-furniture-joinery.webp',
        imageAlt: 'Custom cabinetry and dining joinery',
        tag: 'Solution 05',
      },
      {
        number: '06',
        title: 'Pooja Units, Foyer & Study Tables',
        description: 'Custom-crafted pooja mandirs, entryway shoe consoles, and ergonomic study workstations.',
        image: '/images/architecture/pooja-mandir-foyer.webp',
        imageAlt: 'Pooja unit and foyer design finishes',
        tag: 'Solution 06',
      },
    ],
    processKicker: 'Interior Design Journey',
    processTitle: 'From 3D concept to finished home.',
    processIntro: 'Understand requirements, approve 3D views, factory fabrication, and clean on-site installation.',
    process: [
      {
        step: '01',
        title: 'Consultation & Site Measurement',
        description: 'Understand family storage requirements, cooking style, aesthetic preferences, and take laser measurements.',
        image: '/images/architecture/living-room-double-height.webp',
        deliverable: 'Space measurement & client brief',
      },
      {
        step: '02',
        title: '3D Designs & Material Selection',
        description: 'Review photorealistic 3D renders displaying colors, laminates, lighting, and spatial clearances.',
        image: '/images/architecture/modular-kitchen-luxury.webp',
        deliverable: 'Approved 3D designs & estimate',
      },
      {
        step: '03',
        title: 'Production Working Drawings',
        description: 'Prepare precision joinery drawings, cutting lists, and hardware schedules for factory production.',
        image: '/images/architecture/custom-furniture-joinery.webp',
        deliverable: 'Production fabrication drawings',
      },
      {
        step: '04',
        title: 'Factory Fabrication & Assembly',
        description: 'Precision factory cutting, edge banding, and modular pre-assembly with high-grade machinery.',
        image: '/images/architecture/interior-double-height.webp',
        deliverable: 'Factory fabricated modular units',
      },
      {
        step: '05',
        title: 'Site Installation & Handover',
        description: 'On-site installation by master carpenters, false ceiling painting, electrical hookup, and handover.',
        image: '/images/architecture/luxury-master-bedroom.webp',
        deliverable: 'Completed interior handover',
      },
    ],
    standardsKicker: 'Why choose our interior solutions',
    standardsTitle: 'Quality materials and factory precision.',
    standardsIntro: 'Built to withstand daily use with high moisture resistance and premium hardware.',
    standards: [
      {
        label: 'Quality Core',
        title: 'Moisture-Resistant BWR / BWP Plywood',
        description: 'Heavy-duty Boiling Water Resistant plywood core for all kitchen wet areas and durable wardrobes.',
        image: '/images/architecture/custom-furniture-joinery.webp',
      },
      {
        label: 'Smooth Hardware',
        title: 'Soft-Close Hinges & Heavy-Duty Drawers',
        description: 'Branded soft-close hinges, tandem boxes, and hydraulic lift-ups engineered for smooth daily operation.',
        image: '/images/architecture/modular-kitchen-luxury.webp',
      },
      {
        label: 'Clean Execution',
        title: 'Factory Cutting & Seamless Fitment',
        description: 'Factory-cut joinery ensures millimeter precision, neat edge-banding, and clean on-site installation.',
        image: '/images/architecture/interior-double-height.webp',
      },
    ],
    deliverablesKicker: 'What you take home',
    deliverablesTitle: 'Fully furnished, ready-to-use interiors.',
    deliverablesIntro: 'Complete modular joinery, ceilings, lighting, and finishes with hardware documentation.',
    deliverables: [
      'Modular kitchen with tandem drawers, pullouts, and countertops',
      'Floor-to-ceiling wardrobes with lofts and dressing mirrors',
      'Designer false ceilings with concealed warm LED cove lighting',
      'Custom living room TV console and decorative wall paneling',
      'Dining room crockery display unit and breakfast counter',
      'Pooja mandir unit and entryway shoe rack storage',
      'Study tables and home office desks with cable organizers',
      'Clean handover with hardware documentation and care guide',
    ],
    deliverableCategories: [
      {
        title: 'Modular Kitchen & Dining',
        subtitle: 'Ergonomic cooking & dining storage',
        icon: 'Layers',
        items: [
          'Modular kitchen with soft-close tandem drawers & cutlery trays',
          'Pullout bottle racks, corner carousels, and tall pantry storage',
          'Durable quartz or granite countertop with matching backsplash',
          'Dining crockery display cabinet with glass-frame shutters',
        ],
      },
      {
        title: 'Wardrobes & Bedroom Storage',
        subtitle: 'Floor-to-ceiling customized wardrobes',
        icon: 'Home',
        items: [
          'Full-height wardrobes with sliding or hinged soft-close doors',
          'Integrated top lofts maximizing vertical room storage',
          'Built-in dresser mirrors, internal accessory trays & lock drawers',
          'Bed headboard paneling and matching bedside side tables',
        ],
      },
      {
        title: 'Ceilings & Ambient Lighting',
        subtitle: 'Layered architectural lighting for day and night',
        icon: 'Sun',
        items: [
          'Gyproc false ceilings with neat shadow grooves',
          'Concealed warm LED strip cove lighting and spot lights',
          'Curtain pelmets with integrated hidden LED channels',
          'Coordinated two-way switches and concealed AC piping',
        ],
      },
      {
        title: 'Living Joinery & Pooja Mandir',
        subtitle: 'Custom furniture and sacred spaces',
        icon: 'Sparkles',
        items: [
          'Living room TV console with fluted paneling and wire hiding',
          'Custom traditional or contemporary pooja mandir unit',
          'Foyer shoe rack with cushioned bench seating',
          'Study desk with bookshelf storage and electrical outlets',
        ],
      },
    ],
    gallery: [
      { src: '/images/architecture/modular-kitchen-luxury.webp', alt: 'Bespoke luxury modular kitchen', caption: 'Kitchen systems' },
      { src: '/images/architecture/luxury-master-bedroom.webp', alt: 'Warm custom-designed master bedroom', caption: 'Private spaces' },
      { src: '/images/architecture/custom-furniture-joinery.webp', alt: 'Craftsperson working on custom furniture joinery', caption: 'Custom fabrication' },
    ],
    faqs: [
      { question: 'What interior services do you offer?', answer: 'We offer complete end-to-end home interior solutions: modular kitchens, wardrobes & lofts, false ceilings & lighting, TV units, crockery units, pooja mandirs, study desks, and foyer shoe racks.' },
      { question: 'Can we hire you for only a modular kitchen or wardrobes?', answer: 'Yes. We design and execute room-wise scopes including kitchens and wardrobes, or complete whole-home interior packages.' },
      { question: 'When should we start interior planning for a newly constructed home?', answer: 'The best time is while brickwork and electrical conduit work is underway. Planning early allows us to align switch points, plumbing, and AC points with zero wall hacking later.' },
      { question: 'What materials do you use for modular cabinetry?', answer: 'We use Boiling Water Resistant (BWR / BWP) plywood cores for all moisture-prone areas like kitchens and bathrooms, paired with branded soft-close German hardware.' },
      { question: 'How long does the interior installation take?', answer: 'Once 3D designs and materials are approved, factory production takes approximately 2 to 3 weeks, followed by 10 to 15 days of on-site installation and alignment.' },
    ],
  },
  {
    slug: 'turnkey-construction',
    number: '04',
    eyebrow: 'One-Stop Solution: Design + Construction + Interior',
    title: 'Turnkey',
    accent: 'Construction.',
    ownership: { label: 'Integrated delivery by', company: 'MPA & ARCH Foundation' },
    summary:
      'One-stop solution: end-to-end design & execution. Architecture, residential construction, and interior design delivered seamlessly under one roof — zero contractor hassles.',
    promise: 'One-Stop Solution: End-To-End Design & Execution Under One Roof.',
    heroImage: '/images/architecture/tropical-modern-villa.webp',
    heroAlt: 'Completed tropical modern turnkey villa',
    highlights: [
      'One-Stop Solution (Design to Handover)',
      'Architecture + Civil + Interiors Under One Roof',
      'Single Point of Accountability',
      'High Transparency & On-Time Handover',
    ],
    stats: [
      { value: 'One Roof', label: 'Design, Build & Interiors' },
      { value: 'Single Point', label: 'Complete Accountability' },
      { value: 'Transparent', label: 'Clear Package Pricing' },
      { value: 'On-Time', label: 'Ready-to-Live Handover' },
    ],
    overviewKicker: 'Why Choose Turnkey Delivery',
    overviewTitle: 'One-stop solution: end-to-end design & execution.',
    overviewLead:
      'Conventional building turns you into a full-time coordinator mediating between architect, civil contractor, plumber, and carpenter. Our turnkey model unites the entire journey under one accountable team.',
    overviewSections: [
      {
        heading: 'Architecture, construction & interiors under one roof',
        body: 'Our architects, structural engineers, and interior designers work from the identical coordinated plan. Plumbing shifts or site level changes are resolved internally without vendor finger-pointing.',
        image: '/images/architecture/urban-master-plan.webp',
        imageAlt: 'Integrated master planning drawings for a turnkey home',
        caption: 'One-Stop End-to-End Execution',
        bullets: [
          'Design studio and construction team work from one coordinated model',
          'Zero coordination headaches between architects and outside contractors',
          'Internal resolution of site nuances with zero project delay',
        ],
      },
      {
        heading: 'Clear decisions with transparent pricing upfront',
        body: 'Approve 2D plans, 3D elevations, materials, and interior joinery with clear package pricing and transparent specifications. Regular milestone updates keep you informed at every step.',
        image: '/images/architecture/structural-construction-frame.webp',
        imageAlt: 'Turnkey home structural frame under coordinated execution',
        caption: 'Transparent Milestone Management',
        bullets: [
          'Clear package specifications detailing branded materials and finishes',
          'Itemized BOQ estimate so you know exact costs before starting',
          'Regular construction progress updates for complete peace of mind',
        ],
      },
      {
        heading: 'Seamless handover: ready for your housewarming',
        body: 'Wall finishes meet door frames, switchboards match bedside tables, and terrace drains slope perfectly — because one team designed and built everything. Deep-cleaned and move-in ready.',
        image: '/images/architecture/turnkey-key-handover.webp',
        imageAlt: 'Handover ceremony with keys delivered to happy homeowners',
        caption: 'Ready-To-Live Handover',
        bullets: [
          'Every electrical switch, tap, and shutter tested before handover',
          'As-built drawings and fixture documentation given at completion',
          'Deep cleaned and ready for your family housewarming',
        ],
      },
    ],
    idealForTitle: 'Choose this if…',
    idealFor: [
      { title: 'You want one accountable team', text: 'You do not have time to coordinate between architects, civil contractors, plumbers, and carpenters.' },
      { title: 'You live abroad or outstation', text: 'You need a trustworthy firm providing structured remote updates and transparent milestone billing.' },
      { title: 'You want design intent protected', text: 'The approved 3D elevations, floor plans, and interior finishes get built faithfully as designed.' },
      { title: 'You want clear budget certainty', text: 'One comprehensive package and schedule rather than unpredictable piecemeal contracts.' },
    ],
    scopeKicker: 'What is included',
    scopeTitle: 'Complete turnkey construction scope.',
    scopeIntro: 'Design, statutory permits, civil construction, and custom interiors delivered as one seamless journey.',
    scope: [
      {
        number: '01',
        title: 'Architectural & 3D Design',
        description: 'Vastu-compliant floor plans, photorealistic 3D elevations, and complete interior layout planning.',
        image: '/images/architecture/urban-master-plan.webp',
        imageAlt: 'Turnkey project master planning and architectural study',
        tag: 'Phase 01',
      },
      {
        number: '02',
        title: 'Statutory Permits & Engineering',
        description: 'CMDA / GCC municipal sanction drawings, vetted structural designs, and MEP working layouts.',
        image: '/images/architecture/staad-structural-engineering.webp',
        imageAlt: 'Structural engineering and municipal permit package',
        tag: 'Phase 02',
      },
      {
        number: '03',
        title: 'Civil Construction Execution',
        description: 'Earthwork, RCC framed structure, branded TMT steel, cement, and quality brickwork masonry.',
        image: '/images/architecture/structural-construction-frame.webp',
        imageAlt: 'Turnkey structural concrete frame execution',
        tag: 'Phase 03',
      },
      {
        number: '04',
        title: 'Building Services & Waterproofing',
        description: 'Concealed CPVC plumbing, fire-resistant electrical conduits, and multi-layer terrace waterproofing.',
        image: '/images/architecture/terrace-cool-roof.webp',
        imageAlt: 'Building services and waterproofing setup',
        tag: 'Phase 04',
      },
      {
        number: '05',
        title: 'Complete Interior Solutions',
        description: 'Custom modular kitchen, full-height wardrobes, designer false ceilings, and ambient lighting.',
        image: '/images/architecture/interior-double-height.webp',
        imageAlt: 'Turnkey luxury interior joinery and lighting',
        tag: 'Phase 05',
      },
      {
        number: '06',
        title: 'Final Quality Inspection & Handover',
        description: 'Comprehensive systems check, deep cleaning, as-built documentation, and ready-to-live keys handover.',
        image: '/images/architecture/turnkey-key-handover.webp',
        imageAlt: 'Handover ceremony with ceremonial key and documentation pack',
        tag: 'Phase 06',
      },
    ],
    processKicker: 'Turnkey Construction Journey',
    processTitle: 'From plot to housewarming in five structured stages.',
    processIntro: 'One accountable team guiding you through every milestone.',
    process: [
      {
        step: '01',
        title: 'Requirements & Design Brief',
        description: 'We review your plot dimensions, family room needs, preferred finish level, and investment target.',
        image: '/images/architecture/urban-master-plan.webp',
        deliverable: 'Project brief & design framework',
      },
      {
        step: '02',
        title: 'Integrated Design & Fixed Estimate',
        description: 'Architectural floor plans, 3D elevations, and interior layouts finalized alongside itemized pricing.',
        image: '/images/architecture/bim-3d-walkthrough.webp',
        deliverable: '3D walkthrough & package contract',
      },
      {
        step: '03',
        title: 'Approvals & Ground Breaking',
        description: 'Statutory municipal permits prepared, site cleared, soil tested, and excavation initiated.',
        image: '/images/architecture/cmda-sanction-drafting.webp',
        deliverable: 'Municipal permits & site mobilization',
      },
      {
        step: '04',
        title: 'Civil Build & Interior Integration',
        description: 'RCC structure, masonry, plumbing, electrical, and custom interior cabinetry executed in sync.',
        image: '/images/architecture/structural-construction-frame.webp',
        deliverable: 'Completed structure & interior fitment',
      },
      {
        step: '05',
        title: 'Quality Check & Key Handover',
        description: 'Full inspection, deep cleaning, as-built documentation file, and ready-to-live key handover.',
        image: '/images/architecture/turnkey-key-handover.webp',
        deliverable: 'Ready-to-live home & keys',
      },
    ],
    standardsKicker: 'Single-Source Accountability',
    standardsTitle: 'One team answers for everything.',
    standardsIntro: 'Design, structural civil work, and custom interiors managed under one roof.',
    standards: [
      {
        label: 'One Stop Solution',
        title: 'Design + Construction + Interior',
        description: 'No coordinating between different contractors. One unified team delivers your complete home from plot to keys.',
        image: '/images/architecture/site-engineer-audit.webp',
      },
      {
        label: 'Transparent Pricing',
        title: 'Clear Package Specifications',
        description: 'Itemized specifications detailing branded materials, grades, and prices with zero hidden costs.',
        image: '/images/architecture/cmda-sanction-drafting.webp',
      },
      {
        label: 'On-Time Handover',
        title: 'Professional Project Management',
        description: 'Structured stage-by-stage execution ensures your finished residence is delivered on schedule.',
        image: '/images/architecture/hero-villa-twilight.webp',
      },
    ],
    deliverablesKicker: 'What you take home',
    deliverablesTitle: 'A ready-to-live home, completely finished.',
    deliverablesIntro: 'Everything tested, deep-cleaned, and delivered with documentation and keys.',
    deliverables: [
      'Custom architectural floor plans, sections, and 3D elevations',
      'CMDA / GCC statutory municipal sanction approval package',
      'Complete civil construction delivered with branded steel and cement',
      'Tested electrical, plumbing, and sanitary infrastructure',
      'Custom modular kitchen with tandem drawers and stone countertops',
      'Full-height wardrobes, lofts, false ceilings, and ambient lighting',
      'Regular milestone construction progress updates',
      'As-built drawings, fixture documentation, and ready-to-live keys',
    ],
    deliverableCategories: [
      {
        title: 'Design & Statutory Approvals',
        subtitle: 'All blueprints, 3D elevations & permits',
        icon: 'Compass',
        items: [
          'Custom architectural floor plans & 3D visualizations',
          'CMDA / GCC municipal sanction approval set',
          'Vetted structural engineering drawings & schedules',
          'Coordinated electrical, plumbing & drainage schematics',
        ],
      },
      {
        title: 'Engineered Civil Construction',
        subtitle: 'Built with branded materials to engineering codes',
        icon: 'Building2',
        items: [
          'Tata Tiscon / JSW steel and UltraTech cement structure',
          'Engineered RCC footings, columns, beams, and slabs',
          'High-density block / country brick wall masonry',
          'Multi-layer waterproofing for all terrace and wet areas',
        ],
      },
      {
        title: 'Signature Luxury Interiors',
        subtitle: 'Move-in ready custom interiors & joinery',
        icon: 'Sparkles',
        items: [
          'Bespoke modular kitchen with tandem drawers & stone tops',
          'Floor-to-ceiling wardrobes with soft-close German fittings',
          'Designer false ceilings with layered ambient LED lighting',
          'Vitrified flooring, painting, doors, and branded sanitaryware',
        ],
      },
      {
        title: 'Handover & Documentation Pack',
        subtitle: 'Move-in ready with complete documentation',
        icon: 'Key',
        items: [
          'As-built architectural, plumbing, and electrical drawing sets',
          'Manufacturer warranty certificates for fittings & appliances',
          'Complete systems testing and snag closure verification',
          'Deep-cleaned residence ready for immediate housewarming',
        ],
      },
    ],
    gallery: [
      { src: '/images/architecture/urban-master-plan.webp', alt: 'Residential master planning drawings', caption: 'Integrated planning' },
      { src: '/images/architecture/structural-construction-frame.webp', alt: 'Turnkey residence structural frame', caption: 'Controlled construction' },
      { src: '/images/architecture/living-room-double-height.webp', alt: 'Completed double-height turnkey home interior', caption: 'Ready-to-live handover' },
    ],
    faqs: [
      { question: 'What is included in the turnkey construction service?', answer: 'Our turnkey service is a complete one-stop solution: architectural design, 3D elevations, statutory sanction approvals, complete civil construction using branded materials, building services, and custom home interiors — delivered ready to live.' },
      { question: 'We already have drawings from an external architect. Can you execute turnkey construction?', answer: 'Yes. We can review your approved architectural drawings, provide an itemized construction and interior estimate, and execute the entire project under one roof.' },
      { question: 'Why is turnkey better than hiring separate contractors?', answer: 'Turnkey eliminates vendor finger-pointing between architects, civil builders, and carpenters. You get a single point of accountability, transparent package pricing, and on-time handover.' },
      { question: 'How do outstation or NRI families manage turnkey projects?', answer: 'Turnkey is the most popular choice for outstation and NRI clients: you get regular milestone photo and video updates, scheduled phone/video reviews, and stage-gated payments linked directly to progress.' },
      { question: 'How is the project price fixed?', answer: 'We provide an itemized package agreement with clear specifications, brand names, and built-up areas upfront, ensuring complete cost transparency.' },
    ],
  },
];

export function getServiceDetail(slug: string) {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}
