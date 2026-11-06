/**
 * Niche catalog for the website editor.
 * Check any combination. Site copy is built from the checked niches
 * and their sub-types. Photos come from public/images/niches/{id}/.
 */

export const NICHE_MARK = '\u2060';

export type NicheService = {
  name: string;
  tagline: string;
  description: string;
  iconKey: string;
  benefits: string[];
  process: string[];
  image?: string;
};

export type NicheSub = {
  id: string;
  label: string;
  leads?: number;
  services: NicheService[];
};

export type NicheImages = {
  heroes: string[];
  gallery: string[];
  services: string[];
  about: string[];
  people: string[];
};

export type NicheDefinition = {
  id: string;
  label: string;
  shortLabel: string;
  leads?: number;
  tagline: string;
  specialization: string;
  support: string;
  highlights: string[];
  highlightNotes: string[];
  trust: string[];
  services: NicheService[];
  subNiches: NicheSub[];
  faqs: { q: string; a: string }[];
  reviews: { author: string; rating: number; text: string }[];
  gallery: { title: string; sub: string }[];
  images: NicheImages;
};

export type SiteCopy = {
  nicheIds: string[];
  subNicheIds: string[];
  regionIds?: string[];
  labels: string[];
  eyebrow: string;
  tagline: string;
  specialization: string;
  description: string;
  services: string[];
  highlights: string[];
  highlightNotes: string[];
  trust: string[];
  faqs: { q: string; a: string; tag?: string }[];
  reviews: { author: string; rating: number; text: string }[];
  gallery: { title: string; sub: string }[];
};

export type RegionDefinition = {
  id: string;
  label: string;
  shortLabel: string;
  country: string;
  city: string;
  tagline: string;
  highlights: string[];
  highlightNotes: string[];
};

export const REGIONS: RegionDefinition[] = [
  {
    id: 'chennai',
    label: 'Chennai, India',
    shortLabel: 'Chennai',
    country: 'India',
    city: 'Chennai',
    tagline: 'Built for Chennai climate, statutory approvals, and daily living',
    highlights: [
      'CMDA & GCC Plan Approvals',
      'Vaastu-Compliant Layouts',
      'Monsoon-Resilient Raised Plinths',
      'Tropical Climate Thermal Design',
    ],
    highlightNotes: [
      'Sanction blueprints prepared and tracked under TNCDBR rules with Greater Chennai Corporation and CMDA.',
      'Pooja room, kitchen, and master bedroom orientations coordinated with natural ventilation and light.',
      'Plinths raised 3.5 to 4.5 feet above road crown level to protect against monsoon rainfall.',
      'Porotherm clay blocks, deep verandas, and central courtyards keep rooms cool during peak summer.',
    ],
  },
  {
    id: 'canada',
    label: 'Canada',
    shortLabel: 'Canada',
    country: 'Canada',
    city: 'Toronto & GTA / Canada',
    tagline: 'Engineered for Canadian climate, building codes, and four-season comfort',
    highlights: [
      'Building Code & City Permits',
      'High R-Value Thermal Envelope',
      'Snow-Load Engineered Structures',
      'Licensed & Insured Trade Execution',
    ],
    highlightNotes: [
      'Architectural and HVAC drawings engineered to NBC / Ontario Building Code standards for municipal inspection.',
      'Continuous exterior insulation, air-barrier wraps, and triple-pane Low-E windows.',
      'Roof trusses and frost-protected footings engineered for Canadian freeze-thaw cycles.',
      'Red Seal certified trades, WSIB coverage, and Tarion warranty standards.',
    ],
  },
];

const arch = (file: string) => `/images/architecture/${file}.webp`;
const stock = (file: string) => `/images/stock/${file}.webp`;

function s(name: string, tagline: string, description: string, image?: string): NicheService {
  return {
    name,
    tagline,
    description,
    iconKey: 'layers',
    image,
    benefits: [
      `Scope, schedule, and price agreed before ${name.toLowerCase()} work starts`,
      'A named lead who stays on the job from the first visit to handover',
      'Materials and methods chosen for this property, not a generic package',
      'Stage checks, photo updates, and a written snag list before you sign off',
    ],
    process: [
      'Visit the site, measure, and write a plain-language brief',
      'Share the scope, drawings or samples, schedule, and itemised quote',
      'Carry out the work with supervision and progress updates',
      'Finish, clear the snag list, and hand over',
    ],
  };
}

export const NICHES: NicheDefinition[] = [
  {
    id: 'interior-design',
    label: 'Interior Design & Decorating',
    shortLabel: 'Interior Design',
    leads: 59,
    tagline: 'Interiors shaped around how you actually live',
    specialization: 'Interior Design & Turnkey Execution',
    support: 'Rooms are planned for daily routines first, then finished with materials, lighting, and storage that will still feel right years from now.',
    highlights: [
      'Layouts drawn from your routines',
      'Materials you can see before you commit',
      'A written quote that stays put',
      'One team from concept to styling',
    ],
    highlightNotes: [
      'Furniture, storage, and circulation are planned around how the household cooks, works, and hosts.',
      'Finishes, hardware, and fabrics are chosen in person, with honest notes on wear and upkeep.',
      'The quote lists each room and finish. Approved prices do not move mid-project.',
      'Design, joinery, and site work stay with one accountable team through handover.',
    ],
    trust: ['Room-by-room quote', 'Sample-before-you-commit', 'Site photo updates', 'Styled handover'],
    images: {
      heroes: [stock('68b39046'), stock('a0e0726f'), stock('dc1759ad'), stock('f23e9dc6')],
      gallery: [stock('a151a9e5'), stock('bf333360'), stock('84fea9c5'), stock('284d6d29'), stock('36e83915'), stock('90879216')],
      services: [stock('cf0f5b64'), stock('881afddc'), stock('ae3de7db'), stock('c87d10e5'), stock('af2da1d1')],
      about: [stock('a9daeddb'), stock('6dcb103c'), stock('4a368613')],
      people: [stock('bbb7f0e7'), stock('5862d7f2'), stock('b7119856')],
    },
    services: [
      s('Residential Interior Design', 'A whole home planned as one calm sequence of rooms.', 'We plan layout, storage, lighting, color, and furniture together so an apartment or villa feels settled, not decorated room by room.', stock('68b39046')),
      s('Modular Kitchen Design', 'A kitchen that is easy to cook in and easy to look at.', 'Cabinets, counters, appliances, and light are set out around how you actually cook, store, and clean.', stock('c87d10e5')),
      s('Living & Bedroom Styling', 'Rooms for gathering, resting, and getting ready.', 'Seating, wardrobes, textiles, and lighting are composed so living rooms and bedrooms feel generous without extra furniture.', stock('af2da1d1')),
      s('Space Planning', 'Every square foot given a job.', 'We test furniture layouts and storage before finishes are chosen, so compact homes feel larger and larger homes feel connected.', stock('36e83915')),
      s('Custom Furniture', 'Built-ins made to the wall, not to a catalogue size.', 'Wardrobes, TV units, studies, and consoles are drawn to the room’s measurements and the way you use them.', stock('463ea892')),
      s('Turnkey Interiors', 'Design and execution under one contract.', 'From the first layout to the final styling, one team coordinates joinery, finishes, and site work to a dated handover.', stock('a0e0726f')),
    ],
    subNiches: [
      {
        id: 'interior-designer',
        label: 'Interior Designer',
        leads: 54,
        services: [
          s('Full-Home Interior Design', 'One design language across every room.', 'A lead designer plans the home as a whole: plan, palette, lighting, and furniture that belong together.', stock('68b39046')),
          s('Turnkey Interior Execution', 'From approved drawings to a styled handover.', 'Joinery, finishes, and installation are run to a schedule you can follow, with one person accountable on site.', stock('a0e0726f')),
        ],
      },
      {
        id: 'interior-decorator',
        label: 'Interior Decorator',
        leads: 4,
        services: [
          s('Furnishing & Styling', 'Furniture, art, and textiles composed for the room you already have.', 'We style existing homes with seating, rugs, curtains, lighting, and art, keeping pieces that still earn their place.', stock('bf333360')),
          s('Color & Finish Consultation', 'A palette you can live with every day.', 'Paint, stone, fabric, and metal are edited into a short list you can approve before anything is ordered.', stock('c093e1b3')),
        ],
      },
      {
        id: 'interior-architect',
        label: 'Interior Architect Office',
        leads: 1,
        services: [
          s('Interior Architecture', 'Walls, light, and rooms redrawn together.', 'We restudy partitions, ceilings, and openings so the interior works as architecture, not as a layer of decoration.', stock('dc1759ad')),
          s('Lighting Design', 'Light planned for morning, work, and evening.', 'Task, ambient, and accent light are drawn into the ceiling and furniture plan before execution.', stock('6dcb103c')),
        ],
      },
    ],
    faqs: [
      { q: 'What happens in the first design meeting?', a: 'We walk the plan, talk through how you use each room, and set a budget range. You leave with a direction and the next step for measurements or a site visit.' },
      { q: 'Can you keep furniture I already own?', a: 'Yes. We design around pieces worth keeping and replace only what is worn out, the wrong size, or working against the room.' },
      { q: 'Do you only design, or do you also execute?', a: 'Both. Design-only and turnkey execution are available. Turnkey work includes drawings, vendors, site updates, and a handover check.' },
      { q: 'How do you hold the budget?', a: 'Must-haves are separated from later phases, and every major finish is priced before work starts. The approved quote is the number we build to.' },
    ],
    reviews: [
      { author: 'Ananya Rao', rating: 5, text: 'They understood how we live and turned a plain apartment into a home that is easy to use every day. The finishes feel considered, not showy.' },
      { author: 'Karthik Menon', rating: 5, text: 'The quote matched the site, the samples were honest, and the handover looked like the drawings. We always knew what was happening that week.' },
      { author: 'Priya Shah', rating: 5, text: 'Storage, light, and the kitchen workflow were the brief. The rooms feel calm and we are not tripping over things that used to have no place.' },
    ],
    gallery: [
      { title: 'Layered Living Room', sub: 'Seating, light, and storage' },
      { title: 'Working Kitchen', sub: 'Counters, cabinets, and flow' },
      { title: 'Quiet Bedroom', sub: 'Wardrobes and evening light' },
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture & Architectural Design',
    shortLabel: 'Architecture',
    leads: 27,
    tagline: 'Buildings drawn clearly, then built to the drawings',
    specialization: 'Architecture & Design',
    support: 'Plans, elevations, and details are coordinated so the building you approve is the building that gets built, including the approvals the plot actually needs.',
    highlights: [
      'Drawings a builder can price',
      'Approvals handled with the design',
      'Structure coordinated with the plan',
      'A gallery of built work, not only renders',
    ],
    highlightNotes: [
      'Plans and details are issued so contractors can quote and build without guessing.',
      'Sanction drawings and the design stay in one office, so the approved plan matches the building.',
      'Structural spans, columns, and the architecture are resolved together, not patched on site.',
      'You see built projects with real plans, not a moodboard of other people’s buildings.',
    ],
    trust: ['Measured drawings', 'Approval coordination', 'Structural coordination', 'Built-work portfolio'],
    images: {
      heroes: [arch('hero-villa-twilight'), arch('hero-minimalist-residence'), arch('modern-villa-duplex'), arch('geometric-villa-elevation')],
      gallery: [arch('cantilever-garden-overhang'), arch('courtyard-water-residence'), arch('monolithic-brutalist-facade'), arch('porotherm-clay-facade'), arch('granite-teak-portal'), arch('luxury-modernist-estate')],
      services: [arch('villa-plan-sketch'), arch('bim-3d-walkthrough'), arch('cmda-sanction-drafting'), arch('architectural-blueprint-draft')],
      about: [arch('architectural-atelier-studio'), arch('atelier-design-studio'), arch('architect-studio-model')],
      people: [arch('principal-architect'), arch('senior-structural-engineer')],
    },
    services: [
      s('Architectural Design', 'A building designed for the plot, the climate, and the brief.', 'We prepare concept, plans, and elevations that respond to orientation, setbacks, and how the building will be used.', arch('hero-villa-twilight')),
      s('Residential Architecture', 'Houses and villas with rooms that get light and air.', 'Independent homes are planned around family life, cross-ventilation, and a structure that is settled before finishes begin.', arch('modern-villa-duplex')),
      s('Commercial Architecture', 'Offices and retail planned for people, parking, and code.', 'Floor plates, entries, services, and fire requirements are resolved so the building can actually be leased and used.', arch('civic-landmark-facade')),
      s('Working Drawings', 'The set your contractor and consultants build from.', 'Plans, sections, schedules, and details are issued at a level a site team can follow.', arch('architectural-blueprint-draft')),
      s('3D Views & Walkthroughs', 'See the building before a wall goes up.', 'Massing, materials, and key interiors are shown so decisions happen on screen, not as demolition later.', arch('bim-3d-walkthrough')),
      s('Plan Approvals', 'Sanction drawings and liaison for the permit.', 'We prepare the approval set and follow the local authority process so design and permission stay aligned.', arch('cmda-sanction-drafting')),
    ],
    subNiches: [
      {
        id: 'architecture-firm',
        label: 'Architecture Firm',
        leads: 13,
        services: [
          s('Full Architectural Services', 'Design, drawings, and site reviews from one firm.', 'The practice stays with the project from the first sketch through tender and periodic site review.', arch('architectural-atelier-studio')),
          s('RFP & Project Presentation', 'A clear submission for clients and committees.', 'Drawings, area statements, and a written approach are packaged so a proposal can be compared fairly.', arch('urban-master-plan')),
        ],
      },
      {
        id: 'architect',
        label: 'Architect',
        leads: 12,
        services: [
          s('Custom House Design', 'A house designed for one family and one plot.', 'The plan is drawn around your site, budget, and the rooms you use every day, then detailed for construction.', arch('hero-minimalist-residence')),
          s('Renovation Architecture', 'An existing building given a new plan.', 'We survey what can stay, redraw what must change, and coordinate structure before anyone opens a wall.', arch('villa-before-frame')),
        ],
      },
      {
        id: 'architectural-designer',
        label: 'Architectural Designer',
        leads: 2,
        services: [
          s('Concept & Elevation Design', 'The look of the building, tied to a real plan.', 'Elevations, materials, and massing are studied with the floor plan so the facade is buildable.', arch('geometric-villa-elevation')),
        ],
      },
    ],
    faqs: [
      { q: 'What do you need before the first meeting?', a: 'The plot sketch or existing plan, a rough budget, and how many people will use the building. If documents are missing, we start with a site measure.' },
      { q: 'Do you also get the building permit?', a: 'We prepare the sanction set and coordinate the submission. Timelines depend on the local authority, and we tell you that before you commit.' },
      { q: 'Will the contractor be able to price these drawings?', a: 'Yes. Working drawings and schedules are part of the service so quotes are based on the same set, not on a render.' },
      { q: 'Can you work with our structural engineer?', a: 'Yes. If you have a consultant, we coordinate columns, spans, and openings with them. If you do not, we can bring one in.' },
    ],
    reviews: [
      { author: 'Meera Sundar', rating: 5, text: 'The plans were clear enough that two contractors priced the same building. The house that came up matches the elevation we signed.' },
      { author: 'Arvind Krishnan', rating: 5, text: 'They caught setback issues before we spent money on a design that could not be approved. The permit set and the working drawings agreed with each other.' },
      { author: 'Lakshmi Iyer', rating: 5, text: 'We could walk the 3D model with our parents and change the kitchen before construction. That saved a fight on site.' },
    ],
    gallery: [
      { title: 'Courtyard House', sub: 'Light, air, and a quiet center' },
      { title: 'Villa Elevation', sub: 'Massing you can build' },
      { title: 'Studio & Drawings', sub: 'Plans, models, and details' },
    ],
  },
  {
    id: 'landscape',
    label: 'Landscape Architecture & Design',
    shortLabel: 'Landscape',
    leads: 7,
    tagline: 'Gardens and outdoor rooms that belong to the house',
    specialization: 'Landscape Architecture & Design',
    support: 'Planting, paving, shade, and water are designed with the architecture so the outdoor rooms are usable, not only green in a photograph.',
    highlights: [
      'Outdoor rooms, not leftover lawn',
      'Plants chosen for this climate',
      'Paving and levels that drain',
      'A plan your gardener can keep',
    ],
    highlightNotes: [
      'Courtyards, terraces, and entries are planned as places to sit, not as strips left after the building.',
      'Species are chosen for sun, water, and maintenance, with a list you can hand to a nursery.',
      'Levels, drains, and hardscape are drawn so monsoon water leaves the house.',
      'The planting plan includes spacing and a simple care note, so the garden survives the first year.',
    ],
    trust: ['Climate-fit planting', 'Drainage with the design', 'Outdoor rooms', 'Care notes included'],
    images: {
      heroes: [arch('cantilever-garden-overhang'), arch('courtyard-water-residence'), arch('terrace-cool-roof'), arch('tropical-modern-villa')],
      gallery: [arch('linear-pool-pavilion'), arch('passive-timber-screens'), arch('stone-concrete-residence'), arch('granite-teak-portal')],
      services: [arch('courtyard-water-residence'), arch('terrace-cool-roof'), arch('cantilever-garden-overhang')],
      about: [arch('site-surveying-raw'), arch('architect-studio-model')],
      people: [arch('principal-architect'), arch('senior-structural-engineer')],
    },
    services: [
      s('Landscape Design', 'A plan for the ground around the building.', 'We design levels, planting, paths, and shade so the site works with the house and the climate.', arch('cantilever-garden-overhang')),
      s('Garden Design', 'Beds, lawn, and trees with a maintenance plan.', 'Planting is composed for season, privacy, and the time you actually have to look after it.', arch('courtyard-water-residence')),
      s('Outdoor Living', 'Terraces, decks, and courts you will use.', 'Seating, shade, lighting, and paving are planned as rooms outside the house.', arch('terrace-cool-roof')),
      s('Hardscape & Planting Plans', 'Drawings for paving, soil, and plants.', 'Contractors get levels, materials, and a planting schedule instead of a loose sketch.', arch('stone-concrete-residence')),
    ],
    subNiches: [
      {
        id: 'landscape-designer',
        label: 'Landscape Designer',
        leads: 3,
        services: [
          s('Residential Garden Design', 'A garden composed for the house and the household.', 'Entries, courts, and back gardens are designed together, with plants that suit the light on each side.', arch('tropical-modern-villa')),
        ],
      },
      {
        id: 'landscaper',
        label: 'Landscaper',
        leads: 3,
        services: [
          s('Garden Installation & Care', 'Build the garden, then keep it.', 'We install soil, planting, irrigation, and paving, and can stay on for seasonal care.', arch('passive-timber-screens')),
        ],
      },
      {
        id: 'landscape-architect',
        label: 'Landscape Architect',
        leads: 1,
        services: [
          s('Site Landscape Architecture', 'Grading, drainage, and planting as one drawing set.', 'The landscape is documented with the building so outdoor work is priced and built properly.', arch('urban-master-plan')),
        ],
      },
    ],
    faqs: [
      { q: 'Do you design only, or also install?', a: 'Both. You can take the drawings to your own crew, or we can install planting, paving, and irrigation.' },
      { q: 'Will the plants survive this climate?', a: 'Species are chosen for sun, soil, and water on your site. The plan says what needs weekly care and what can be left.' },
      { q: 'Can you work with an existing house?', a: 'Yes. We survey levels, drains, and what is already growing, then design around trees and paving worth keeping.' },
      { q: 'How do you handle heavy rain?', a: 'Levels and drains are part of the design, so water moves away from the plinth instead of sitting on the lawn.' },
    ],
    reviews: [
      { author: 'Rahul Deshpande', rating: 5, text: 'The courtyard is the room we use most. Plants were chosen for our sun, and the paving drains after a hard rain.' },
      { author: 'Nithya Raman', rating: 5, text: 'They gave our gardener a plan he could follow. Six months later the garden still looks like the drawing.' },
    ],
    gallery: [
      { title: 'Courtyard Garden', sub: 'Shade, water, and a place to sit' },
      { title: 'Terrace Planting', sub: 'Weight, drainage, and green cover' },
      { title: 'Entry Landscape', sub: 'The first view of the house' },
    ],
  },
  {
    id: 'general-construction',
    label: 'General Construction & Contracting',
    shortLabel: 'General Construction',
    leads: 197,
    tagline: 'Construction run to a contract, a schedule, and a site engineer',
    specialization: 'General Contracting',
    support: 'Labour, materials, and supervision sit under one contract, with payments tied to stages you can see on site.',
    highlights: [
      'One contract for the build',
      'Stage payments tied to site progress',
      'Named materials, not vague grades',
      'A site engineer who is actually there',
    ],
    highlightNotes: [
      'Civil, finishes, and coordination of trades are covered in one agreement instead of a chain of side deals.',
      'You pay for work that is done. Each stage is checked before the next invoice.',
      'Steel, cement, and key finishes are named in the quote so substitutions are a conversation, not a surprise.',
      'A supervisor is responsible for the site, with photo updates you do not have to chase.',
    ],
    trust: ['Stage-wise payments', 'Named materials', 'Site supervision', 'Written snag list'],
    images: {
      heroes: [arch('structural-construction-frame'), arch('villa-before-frame'), arch('villa-after-finished'), arch('monumental-facade-entry')],
      gallery: [arch('porotherm-clay-facade'), arch('brick-perforated-facade'), arch('facade-white-concrete'), arch('site-surveying-raw'), arch('staad-structural-engineering')],
      services: [arch('structural-construction-frame'), arch('villa-before-frame'), arch('villa-after-finished')],
      about: [arch('site-surveying-raw'), arch('staad-structural-engineering'), arch('cmda-sanction-drafting')],
      people: [arch('senior-structural-engineer'), arch('principal-architect')],
    },
    services: [
      s('General Contracting', 'The full build, managed as one job.', 'We take the drawings, run the site, and deliver the building to an agreed scope and schedule.', arch('structural-construction-frame')),
      s('Residential Construction', 'Houses built from foundation to finish.', 'Individual homes are constructed with inspected structure, services, and finishes, and a handover you can walk.', arch('villa-after-finished')),
      s('Commercial Construction', 'Offices, retail, and mixed-use buildings.', 'The site is run for programme, safety, and the services a commercial building needs to open.', arch('civic-landmark-facade')),
      s('Project Management', 'Someone watching cost, time, and quality for you.', 'If you are hiring trades yourself, we coordinate them against the drawings and the budget.', arch('site-surveying-raw')),
      s('Renovation Contracting', 'Alterations without losing control of the existing building.', 'Demolition, structure, and making-good are sequenced so the rest of the property stays protected.', arch('villa-before-frame')),
    ],
    subNiches: [
      {
        id: 'construction-company',
        label: 'Construction Company',
        leads: 110,
        services: [
          s('Turnkey Building Construction', 'From breaking ground to key handover.', 'A construction company team runs labour, materials, and supervision under one programme.', arch('villa-after-finished')),
        ],
      },
      {
        id: 'general-contractor',
        label: 'General Contractor',
        leads: 33,
        services: [
          s('Main Contractor Services', 'Trades coordinated under one site lead.', 'We hire and sequence the trades, keep the drawings current, and answer for the finished work.', arch('structural-construction-frame')),
        ],
      },
      {
        id: 'real-estate-builders',
        label: 'Real Estate Builders & Construction Company',
        leads: 27,
        services: [
          s('Spec & Client Building', 'Buildings delivered for sale or for a named client.', 'The same site discipline applies whether the building is yours or part of a small development.', arch('luxury-modernist-estate')),
        ],
      },
      {
        id: 'contractor',
        label: 'Contractor',
        leads: 25,
        services: [
          s('Contract Building Works', 'A defined scope, a price, and a finish date.', 'Labour and materials for the agreed package, with variations written down before they are built.', arch('brick-perforated-facade')),
        ],
      },
      {
        id: 'building-firm',
        label: 'Building Firm',
        leads: 1,
        services: [
          s('Building Firm Delivery', 'A firm that stays through the whole building.', 'Design coordination, construction, and finishing are kept in-house so the handover has one author.', arch('monumental-facade-entry')),
        ],
      },
      {
        id: 'demolition-contractor',
        label: 'Demolition Contractor',
        leads: 1,
        services: [
          s('Demolition & Site Clearance', 'Take down only what the new work needs.', 'Structures are demolished with a method statement, debris removed, and the plot left ready for the next trade.', arch('villa-before-frame')),
        ],
      },
    ],
    faqs: [
      { q: 'What is included in the contract?', a: 'The quote lists labour, named materials, and exclusions. Anything not listed is a variation, priced before it is built.' },
      { q: 'How do payments work?', a: 'Payments follow stages — foundation, slab, brickwork, finishes — and each stage is checked before the next invoice.' },
      { q: 'Who is on site?', a: 'A supervisor is responsible for the job. You get a name, a phone number, and photo updates at agreed intervals.' },
      { q: 'Can you build from our architect’s drawings?', a: 'Yes. We price and build to the issued set. If drawings are incomplete, we flag that before work starts.' },
    ],
    reviews: [
      { author: 'Suresh Babu', rating: 5, text: 'The stage bills matched the site. When we visited, the steel and cement were the brands in the contract.' },
      { author: 'Farah Qureshi', rating: 5, text: 'They ran the trades to a schedule we could follow. The snag list was short and they actually closed it.' },
      { author: 'Joseph Mathew', rating: 5, text: 'We had an architect already. They priced the drawings properly and did not invent extras halfway through the slab.' },
    ],
    gallery: [
      { title: 'Structure in Progress', sub: 'Frame, slabs, and supervision' },
      { title: 'Finished Building', sub: 'The handover, not the render' },
      { title: 'Site Set-out', sub: 'Levels before the first pour' },
    ],
  },
  {
    id: 'home-builders',
    label: 'Home Builders & Developers',
    shortLabel: 'Home Building',
    leads: 38,
    tagline: 'Homes built for a family, or a small development built properly',
    specialization: 'Home Building & Development',
    support: 'Custom houses and small developments are delivered with a fixed scope, a walkable specification, and a date you can plan a move around.',
    highlights: [
      'A specification you can walk',
      'Custom homes or small developments',
      'Price and inclusions in writing',
      'Handover with a defects list',
    ],
    highlightNotes: [
      'Finishes, fittings, and structure are listed so two homes are not sold on the same vague promise.',
      'We build one-off houses and small groups of homes with the same site standard.',
      'Inclusions are written down. Changes are variations, not quiet upgrades on the invoice.',
      'You get a defects period and a list, not a set of keys and silence.',
    ],
    trust: ['Written specification', 'Fixed inclusions', 'Move-in date', 'Defects period'],
    images: {
      heroes: [arch('hero-villa-twilight'), arch('luxury-modernist-estate'), arch('tropical-modern-villa'), arch('villa-after-finished')],
      gallery: [arch('modern-villa-duplex'), arch('geometric-villa-elevation'), arch('living-room-double-height'), arch('luxury-master-bedroom'), arch('modular-kitchen-luxury')],
      services: [arch('villa-after-finished'), arch('hero-minimalist-residence'), arch('modern-villa-duplex')],
      about: [arch('architectural-atelier-studio'), arch('villa-plan-sketch')],
      people: [arch('principal-architect'), arch('senior-structural-engineer')],
    },
    services: [
      s('Custom Home Building', 'A house built for one brief, not a repeated plan.', 'We build the home you designed, with a specification and a programme agreed before the ground is broken.', arch('hero-minimalist-residence')),
      s('Villa Construction', 'Independent houses finished to a named standard.', 'Structure, services, and finishes are delivered as one package, from foundation to a house you can move into.', arch('villa-after-finished')),
      s('Residential Development', 'A small group of homes, built as a place to live.', 'Plots, shared works, and the houses themselves are sequenced so buyers are not living on a building site forever.', arch('luxury-modernist-estate')),
      s('Spec Homes', 'Homes built to a published specification.', 'What you see in the sample is what is in the contract: fittings, finishes, and the areas that are included.', arch('tropical-modern-villa')),
    ],
    subNiches: [
      {
        id: 'home-builder',
        label: 'Home Builder',
        leads: 16,
        services: [
          s('New Home Construction', 'A new house, start to keys.', 'We build on your plot to an agreed plan and specification, with stage reviews you can attend.', arch('modern-villa-duplex')),
        ],
      },
      {
        id: 'custom-home-builder',
        label: 'Custom Home Builder',
        leads: 12,
        services: [
          s('Luxury Custom Homes', 'Detail and finish held to the drawings.', 'Joinery, stone, and services are built as specified, with samples approved before they are ordered.', arch('luxury-master-bedroom')),
        ],
      },
      {
        id: 'real-estate-developer',
        label: 'Real Estate Developer',
        leads: 10,
        services: [
          s('Housing Development', 'Land, homes, and the works between them.', 'A small development is planned as streets, services, and houses, with a specification buyers can read.', arch('urban-master-plan')),
        ],
      },
    ],
    faqs: [
      { q: 'Can you build a house we have already designed?', a: 'Yes. We price the issued drawings and specification. If something cannot be built as drawn, we say so before the contract.' },
      { q: 'What does the specification include?', a: 'Structure, services, finishes, and fittings that are included, plus a list of exclusions. The sample home and the contract use the same list.' },
      { q: 'How are custom changes handled?', a: 'Changes are drawn and priced before they are built. The contract sum moves only when you approve a variation.' },
      { q: 'What happens after we move in?', a: 'A defects period covers items that were in the contract. We inspect, list them, and close them.' },
    ],
    reviews: [
      { author: 'Divya and Arun', rating: 5, text: 'The specification matched the house we walked at the end. Changes we asked for were priced before anyone built them.' },
      { author: 'Harish Patel', rating: 5, text: 'They treated our one-off house with the same paperwork as a development. We always knew the next stage and the next bill.' },
    ],
    gallery: [
      { title: 'Custom Villa', sub: 'Built to one family’s brief' },
      { title: 'Finished Interiors', sub: 'The specification, installed' },
      { title: 'Row of Homes', sub: 'A small development, completed' },
    ],
  },
  {
    id: 'remodeling',
    label: 'Remodeling & Renovation',
    shortLabel: 'Remodeling',
    leads: 12,
    tagline: 'Renovations that start with what is worth keeping',
    specialization: 'Remodeling & Renovation',
    support: 'Kitchens, baths, and whole-home updates are scoped around the existing structure, with dust, services, and neighbours planned before demolition.',
    highlights: [
      'A survey before anything is opened',
      'Kitchens, baths, and whole homes',
      'Dust and services planned first',
      'A finish that matches the rest of the house',
    ],
    highlightNotes: [
      'We check structure, waterproofing, and services before quoting a new layout.',
      'The work can be one room or the whole house, with a scope written either way.',
      'Protection, working hours, and temporary services are part of the plan when you are living next door to the work.',
      'New work is detailed to meet the rooms you are not changing.',
    ],
    trust: ['Survey before demo', 'Lived-in site plan', 'Room or whole home', 'Matched finishes'],
    images: {
      heroes: [arch('interior-before-bare-shell'), arch('interior-after-luxury-styled'), arch('modular-kitchen-luxury'), arch('living-room-double-height')],
      gallery: [arch('luxury-master-bedroom'), arch('custom-furniture-joinery'), arch('interior-double-height'), arch('space-planning-atrium')],
      services: [arch('modular-kitchen-luxury'), arch('interior-after-luxury-styled'), arch('interior-before-bare-shell')],
      about: [arch('custom-furniture-joinery'), arch('site-surveying-raw')],
      people: [arch('principal-architect'), stock('5862d7f2')],
    },
    services: [
      s('Home Remodeling', 'An existing home brought up to how you live now.', 'We resurvey the house, keep what is sound, and rebuild the rooms that are failing you.', arch('interior-after-luxury-styled')),
      s('Kitchen Remodeling', 'A new kitchen in the room you already have.', 'Layout, services, cabinets, and finishes are replanned without pretending the walls are new.', arch('modular-kitchen-luxury')),
      s('Bathroom Remodeling', 'Waterproofing first, then the room you see.', 'Wet areas are stripped back to a sound substrate, then rebuilt with falls, ventilation, and fittings that can be maintained.', arch('luxury-master-bedroom')),
      s('Additions & Alterations', 'More space, tied back into the old house.', 'New rooms are structured and detailed so the joint between old and new does not become the leak.', arch('interior-before-bare-shell')),
    ],
    subNiches: [
      {
        id: 'kitchen-remodeler',
        label: 'Kitchen Remodeler',
        leads: 6,
        services: [
          s('Kitchen Renovation', 'Strip, replan, and reinstall the kitchen.', 'We move services only as far as they need to go, then fit cabinets and counters to the new layout.', arch('modular-kitchen-luxury')),
        ],
      },
      {
        id: 'bathroom-remodeler',
        label: 'Bathroom Remodeler',
        leads: 2,
        services: [
          s('Bathroom Renovation', 'A wet room rebuilt from the waterproofing up.', 'Old finishes come out, the slab is made good, and the new bathroom is fitted to a tested detail.', arch('interior-double-height')),
        ],
      },
      {
        id: 'remodeler',
        label: 'Remodeler',
        leads: 2,
        services: [
          s('Whole-Home Renovation', 'Several rooms, one programme.', 'Phasing keeps part of the house usable where it can, and the finishes are specified once for the whole job.', arch('living-room-double-height')),
        ],
      },
      {
        id: 'interior-construction',
        label: 'Interior Construction Contractor',
        leads: 2,
        services: [
          s('Interior Construction', 'Partitions, ceilings, and joinery built to the design.', 'We build the interior package: framing, boarding, ceilings, and fitted work coordinated with services.', arch('custom-furniture-joinery')),
        ],
      },
    ],
    faqs: [
      { q: 'Can we live in the house during the work?', a: 'Often, if the job is phased. We agree which rooms close, how dust is contained, and when water and power will be off.' },
      { q: 'Do you open walls before the price is fixed?', a: 'We survey first. If something hidden would change the price, we allow for it or open a trial area before you sign.' },
      { q: 'Will the new kitchen match the rest of the home?', a: 'Yes. Finishes are chosen against the rooms that are staying, not from a showroom package in isolation.' },
      { q: 'How long does a bathroom take?', a: 'A single bathroom is usually measured in days to a few weeks once materials are on site. Waterproofing and drying time are in that programme, not extra.' },
    ],
    reviews: [
      { author: 'Sandra D’Souza', rating: 5, text: 'They remodelled the kitchen while we used the rest of the flat. The dust plan was real, and the new layout finally has a place for the fridge.' },
      { author: 'Imran Sheikh', rating: 5, text: 'The bathroom was rebuilt from the waterproofing, not just retiled. A year later it is still dry.' },
    ],
    gallery: [
      { title: 'Before the Strip-out', sub: 'What we kept and what we opened' },
      { title: 'Replanned Kitchen', sub: 'Services, cabinets, and light' },
      { title: 'Finished Rooms', sub: 'New work meeting the old house' },
    ],
  },
  {
    id: 'trades',
    label: 'Specialized Subcontractors & Trades',
    shortLabel: 'Specialist Trades',
    leads: 64,
    tagline: 'A trade that shows up, quotes clearly, and finishes the job',
    specialization: 'Specialist Trade Contracting',
    support: 'Roofing, plumbing, electrical, and the other trades are booked as specific jobs, with a quote you can compare and a number to call when something fails.',
    highlights: [
      'A quote for a defined job',
      'Licensed trade where the work requires it',
      'Emergency and planned visits',
      'The work left clean and tested',
    ],
    highlightNotes: [
      'You get a price for the repair or the installation described, not an open-ended day rate.',
      'Regulated work is done by people qualified to sign for it.',
      'Leaks, power, and breakdowns are triaged. Larger jobs are scheduled with a start date.',
      'The trade tests the work and clears the site before calling it done.',
    ],
    trust: ['Clear job quote', 'Qualified trades', 'Call-out or scheduled', 'Tested before we leave'],
    images: {
      heroes: [arch('structural-construction-frame'), arch('terrace-cool-roof'), arch('glass-curtain-wall'), arch('brick-perforated-facade')],
      gallery: [arch('porotherm-clay-facade'), arch('site-surveying-raw'), arch('staad-structural-engineering'), arch('facade-white-concrete'), arch('granite-teak-portal')],
      services: [arch('terrace-cool-roof'), arch('glass-curtain-wall'), arch('structural-construction-frame'), arch('custom-furniture-joinery')],
      about: [arch('site-surveying-raw'), arch('architectural-blueprint-draft')],
      people: [arch('senior-structural-engineer'), stock('b7119856')],
    },
    services: [
      s('Roofing', 'Roofs repaired, replaced, and detailed against rain.', 'We inspect the covering, flashings, and drainage, then repair or reroof to a specification you can read.', arch('terrace-cool-roof')),
      s('Plumbing', 'Supply, waste, and the leaks between them.', 'Pipes, fixtures, and heaters are installed or repaired and tested before we leave.', arch('site-surveying-raw')),
      s('Electrical', 'Power, lighting, and boards done to code.', 'New circuits, rewires, and fault finding are carried out and tested, with the board labelled.', arch('architectural-blueprint-draft')),
      s('HVAC', 'Cooling and ventilation sized for the rooms.', 'We specify and install systems for the actual heat load, then commission them.', arch('glass-curtain-wall')),
      s('Painting', 'Preparation first, then a finish that lasts.', 'Surfaces are repaired and primed. Paint is specified by product, not by a colour name alone.', arch('facade-white-concrete')),
      s('Masonry', 'Block, brick, and stone built and repaired.', 'Walls, pointing, and structural masonry are laid out and cured properly, not rushed over a weekend.', arch('brick-perforated-facade')),
    ],
    subNiches: [
      { id: 'roofing-contractor', label: 'Roofing Contractor', leads: 18, services: [s('Roof Repair & Replacement', 'Find the leak, then fix the roof, not the ceiling.', 'Coverings, flashings, and outlets are repaired or replaced so water leaves the building.', arch('terrace-cool-roof'))] },
      { id: 'masonry-contractor', label: 'Masonry Contractor', leads: 7, services: [s('Masonry & Blockwork', 'Walls built straight and tied in.', 'New masonry and repairs are set out, reinforced where needed, and finished for the next trade.', arch('porotherm-clay-facade'))] },
      { id: 'plumber', label: 'Plumber', leads: 5, services: [s('Plumbing Repairs & Fit-out', 'Leaks stopped and fixtures fitted.', 'From a failed joint to a full bathroom rough-in, the system is tested before we close up.', arch('site-surveying-raw'))] },
      { id: 'handyman', label: 'Handyman / Handyperson', leads: 4, services: [s('Handyman Repairs', 'The small jobs that keep a property working.', 'A punch list of repairs, fittings, and adjustments, done in one visit when the scope allows.', stock('463ea892'))] },
      { id: 'water-damage', label: 'Water Damage Restoration', leads: 4, services: [s('Water Damage Restoration', 'Dry the structure, then repair what the water ruined.', 'We extract water, dry the building, and replace finishes that cannot be saved.', arch('interior-before-bare-shell'))] },
      { id: 'concrete-contractor', label: 'Concrete Contractor', leads: 3, services: [s('Concrete Works', 'Slabs, footings, and flatwork placed and finished.', 'Formwork, reinforcement, pour, and cure are sequenced so the concrete reaches the strength on the drawing.', arch('monolithic-concrete-atrium'))] },
      { id: 'hvac-contractor', label: 'HVAC Contractor', leads: 3, services: [s('HVAC Installation & Service', 'Cooling that matches the rooms.', 'Equipment is sized, installed, and serviced so it holds temperature without constant call-backs.', arch('glass-curtain-wall'))] },
      { id: 'painter', label: 'Painter / Painting', leads: 4, services: [s('Interior & Exterior Painting', 'A clean surface and a specified coat system.', 'We prepare, prime, and finish interiors or elevations, and protect floors and fittings while we do it.', arch('facade-white-concrete'))] },
      { id: 'electrician', label: 'Electrical Installation & Electrician', leads: 3, services: [s('Electrical Installation', 'Circuits, lighting, and boards installed and tested.', 'New work and fault repairs are completed to code, labelled, and left safe.', arch('architectural-blueprint-draft'))] },
      { id: 'woodworker', label: 'Woodworker & Cabinet Maker', leads: 4, services: [s('Cabinets & Joinery', 'Cabinets and fitted woodwork made to measure.', 'Kitchens, wardrobes, and bespoke pieces are built to the opening, finished, and installed.', arch('custom-furniture-joinery'))] },
      { id: 'drywall-contractor', label: 'Drywall Contractor', leads: 2, services: [s('Drywall & Ceilings', 'Partitions and ceilings framed, boarded, and finished.', 'Levels are set out, joints finished, and the surface left ready for paint.', arch('space-planning-atrium'))] },
      { id: 'waterproofing', label: 'Waterproofing Service', leads: 2, services: [s('Waterproofing', 'Wet areas and roofs kept dry.', 'Bathrooms, terraces, and basements are detailed and tested, not painted with a single coat and hoped for.', arch('terrace-cool-roof'))] },
      { id: 'flooring', label: 'Flooring & Floor Refinishing', leads: 2, services: [s('Flooring & Refinishing', 'New floors, or old floors brought back.', 'Timber, tile, and stone are laid or refinished with the right substrate and movement joints.', arch('granite-teak-portal'))] },
      { id: 'asphalt-contractor', label: 'Asphalt Contractor', leads: 2, services: [s('Asphalt & Paving', 'Drives and yards paved to drain.', 'Base, levels, and asphalt or paving are built so water does not sit against the building.', arch('urban-master-plan'))] },
      { id: 'pool-contractor', label: 'Swimming Pool Contractor', leads: 1, services: [s('Swimming Pools', 'A pool structured, waterproofed, and commissioned.', 'Shell, waterproofing, filtration, and finish are one job, with the plant room included.', arch('linear-pool-pavilion'))] },
    ],
    faqs: [
      { q: 'Do you take small call-outs?', a: 'Yes. Describe the fault, send a photo if you can, and we will tell you whether it is a visit or a larger quote.' },
      { q: 'Will I get a fixed price?', a: 'For a defined job, yes. If we cannot see the extent until something is opened, we agree a ceiling or call you before continuing.' },
      { q: 'Are you insured for the trade?', a: 'Regulated and higher-risk work is carried out by qualified people under the firm’s insurance. Ask and we will say who is attending.' },
      { q: 'What if the repair fails?', a: 'Workmanship is covered for a stated period. If it is our joint or our installation, we come back.' },
    ],
    reviews: [
      { author: 'Neha Kulkarni', rating: 5, text: 'They found the roof leak instead of repainting the ceiling. The quote listed the sheets and flashings, and the next rain stayed outside.' },
      { author: 'Peter D’Souza', rating: 5, text: 'The electrician labelled the board and tested the new circuit. We were not left with a tangle and a verbal promise.' },
      { author: 'Aisha Rahman', rating: 5, text: 'Plumbing call-out the same day, price agreed before they opened the wall, and the bathroom was usable that night.' },
    ],
    gallery: [
      { title: 'Roof & Terrace', sub: 'Covering, outlets, and flashings' },
      { title: 'Site Trade Work', sub: 'The job, not a stock kitchen' },
      { title: 'Finished Detail', sub: 'Tested, cleaned, and left' },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering & Technical Consulting',
    shortLabel: 'Engineering',
    leads: 35,
    tagline: 'Engineering advice you can build from',
    specialization: 'Engineering Consulting',
    support: 'Structural, civil, and building-services advice is issued as calculations, drawings, and site comments a contractor can follow.',
    highlights: [
      'Calculations tied to drawings',
      'Reports a client can read',
      'Site visits with written comments',
      'Coordination with the architect',
    ],
    highlightNotes: [
      'The numbers and the drawings describe the same structure.',
      'Findings are written in plain language, with the technical appendix behind them.',
      'Inspections end with a note: what is accepted, what must change, and by when.',
      'We work to the architect’s set and flag clashes before they reach site.',
    ],
    trust: ['Stamped calculations', 'Readable reports', 'Site review notes', 'Consultant coordination'],
    images: {
      heroes: [arch('staad-structural-engineering'), arch('bim-3d-walkthrough'), arch('cmda-sanction-drafting'), arch('architectural-blueprint-draft')],
      gallery: [arch('structural-construction-frame'), arch('villa-plan-sketch'), arch('urban-master-plan'), arch('site-surveying-raw'), arch('monolithic-concrete-atrium')],
      services: [arch('staad-structural-engineering'), arch('bim-3d-walkthrough'), arch('cmda-sanction-drafting')],
      about: [arch('architectural-atelier-studio'), arch('architect-studio-model')],
      people: [arch('senior-structural-engineer'), arch('principal-architect')],
    },
    services: [
      s('Structural Engineering', 'Frames, foundations, and the drawings that go with them.', 'We design the structure for the soil and the building, and issue details the site can build.', arch('staad-structural-engineering')),
      s('Civil Engineering', 'Levels, roads, drains, and site works.', 'External works and civil packages are designed so the building sits on a site that drains and connects.', arch('urban-master-plan')),
      s('Engineering Consulting', 'A second set of eyes before you commit.', 'Peer review, feasibility, and technical due diligence for owners who need a clear recommendation.', arch('bim-3d-walkthrough')),
      s('MEP Coordination', 'Services that fit the building.', 'Mechanical, electrical, and plumbing routes are coordinated with structure and architecture.', arch('architectural-blueprint-draft')),
      s('Site Inspection', 'What was designed, checked against what was built.', 'We visit, record, and write the exceptions while they can still be corrected.', arch('site-surveying-raw')),
    ],
    subNiches: [
      {
        id: 'engineering-consultant',
        label: 'Engineering Consultant',
        leads: 26,
        services: [
          s('Technical Consulting', 'Advice, reports, and a recommendation.', 'We review a design or a site and tell you what to do next, with the risks written down.', arch('bim-3d-walkthrough')),
        ],
      },
      {
        id: 'engineer',
        label: 'Engineer',
        leads: 5,
        services: [
          s('Engineering Design', 'Design and documentation for the building team.', 'Calculations and drawings are issued for pricing and construction, not as a loose sketch.', arch('staad-structural-engineering')),
        ],
      },
      {
        id: 'structural-engineer',
        label: 'Structural Engineer',
        leads: 2,
        services: [
          s('Structural Design & Proof Check', 'New structures, and checks of someone else’s.', 'Foundations, frames, and alterations are designed or reviewed, including openings in existing buildings.', arch('structural-construction-frame')),
        ],
      },
      {
        id: 'civil-engineering-company',
        label: 'Civil Engineering Company',
        leads: 1,
        services: [
          s('Civil Works Design', 'Infrastructure around the building.', 'Roads, levels, stormwater, and external services are designed as a package.', arch('urban-master-plan')),
        ],
      },
      {
        id: 'electrical-engineer',
        label: 'Electrical Engineer',
        leads: 1,
        services: [
          s('Electrical Engineering', 'Load, distribution, and lighting design.', 'We design the electrical system and coordinate it with the board, the architect, and the installer.', arch('architectural-blueprint-draft')),
        ],
      },
    ],
    faqs: [
      { q: 'Do you only calculate, or do you visit site?', a: 'Both. Design is followed by agreed inspections. Each visit produces a written note, not only a conversation.' },
      { q: 'Can you review a design we already have?', a: 'Yes. A proof check tells you what is sound, what is missing, and what we would change before tender.' },
      { q: 'Will the architect understand your drawings?', a: 'They are issued to coordinate. Clashes are marked, and we attend the meetings where the set is combined.' },
      { q: 'What do you need to start?', a: 'Architectural drawings, a soil report if it exists, and the use of the building. If the soil report is missing, we say so before designing the foundation.' },
    ],
    reviews: [
      { author: 'Kavita Nair', rating: 5, text: 'Their structural set matched the architecture. The contractor stopped calling us about column sizes that were not on the plan.' },
      { author: 'Rohit Banerjee', rating: 5, text: 'The peer review was blunt and useful. We changed two details before tender and avoided a variation later.' },
    ],
    gallery: [
      { title: 'Analysis & Drawings', sub: 'The model and the sheet' },
      { title: 'Frame on Site', sub: 'What the calculation became' },
      { title: 'Coordination', sub: 'Structure, services, and plan' },
    ],
  },
  {
    id: 'supplies',
    label: 'Building Supplies, Showrooms & Materials',
    shortLabel: 'Building Supplies',
    leads: 7,
    tagline: 'Materials, showrooms, and supply for the people who build',
    specialization: 'Building Supplies & Showrooms',
    support: 'Trade customers and homeowners can see the product, check the specification, and get it to site in the quantity the job needs.',
    highlights: [
      'Product you can see in the showroom',
      'Specifications written down',
      'Trade and retail accounts',
      'Delivery timed to the site',
    ],
    highlightNotes: [
      'Samples and displays are the products we sell, not a different range.',
      'Grades, sizes, and lead times are on the quote.',
      'Contractors can hold an account. Homeowners can buy the same specification.',
      'Deliveries are booked to the site programme, not dumped a week early with nowhere to store them.',
    ],
    trust: ['Showroom samples', 'Spec on the quote', 'Trade accounts', 'Site delivery'],
    images: {
      heroes: [arch('granite-teak-portal'), arch('custom-furniture-joinery'), arch('glass-curtain-wall'), arch('modular-kitchen-luxury')],
      gallery: [arch('porotherm-clay-facade'), arch('facade-white-concrete'), arch('brick-perforated-facade'), arch('luxury-master-bedroom')],
      services: [arch('custom-furniture-joinery'), arch('glass-curtain-wall'), arch('granite-teak-portal')],
      about: [arch('architectural-atelier-studio'), arch('atelier-design-studio')],
      people: [stock('bbb7f0e7'), stock('5862d7f2')],
    },
    services: [
      s('Building Materials Supply', 'The materials on the drawing, in the quantity you need.', 'Cement, steel, masonry, and finishes are quoted to specification and delivered to the job.', arch('porotherm-clay-facade')),
      s('Showroom Selection', 'Choose from what is actually in stock or on order.', 'Walk the displays, compare samples, and leave with a product code, not a guess.', arch('modular-kitchen-luxury')),
      s('Trade Supply Accounts', 'Pricing and credit for contractors.', 'Regular buyers get account terms, repeat specifications, and a desk that knows the site.', arch('architectural-atelier-studio')),
      s('Specified Product Supply', 'Order against an architect’s schedule.', 'We match the specified product or offer a written alternative before you approve it.', arch('granite-teak-portal')),
    ],
    subNiches: [
      { id: 'roofing-supply', label: 'Roofing Supply Store', leads: 1, services: [s('Roofing Materials', 'Sheets, tiles, membranes, and the fixings that go with them.', 'Roofing products are sold as a system, with the accessories the detail needs.', arch('terrace-cool-roof'))] },
      { id: 'cabinet-store', label: 'Cabinet Store', leads: 1, services: [s('Cabinets & Kitchens', 'Cabinet systems you can open and compare.', 'Boxes, finishes, and hardware are on display, and we quote the run you measured.', arch('modular-kitchen-luxury'))] },
      { id: 'door-supplier', label: 'Door Supplier', leads: 1, services: [s('Doors & Frames', 'Doors specified by size, core, and finish.', 'We supply door sets to the schedule, including frames and ironmongery.', arch('granite-teak-portal'))] },
      { id: 'aluminum-frames', label: 'Aluminum Frames Supplier', leads: 1, services: [s('Aluminum Frames & Glazing', 'Windows and frames fabricated to the opening.', 'Sections, glass, and finishes are quoted from site sizes or from the architect’s schedule.', arch('glass-curtain-wall'))] },
      { id: 'ready-mix', label: 'Ready Mix Concrete Supplier', leads: 1, services: [s('Ready-Mix Concrete', 'The grade you ordered, at the time the pour needs.', 'Mixes are supplied to specification, with delivery slotted to the pour so the site is not waiting.', arch('monolithic-concrete-atrium'))] },
      { id: 'glass-industry', label: 'Glass Industry', leads: 1, services: [s('Glass Supply & Processing', 'Glass cut, processed, and delivered to size.', 'Toughened, laminated, and specialty glass are supplied against a cutting list.', arch('brutalist-glass-pavilion'))] },
      { id: 'home-improvement-store', label: 'Home Improvement Store', leads: 1, services: [s('Home Improvement Retail', 'Materials and finishes for repair and fit-out.', 'A shop floor for homeowners and small contractors, with staff who can match a specification.', stock('4e96f2e2'))] },
    ],
    faqs: [
      { q: 'Can I see the product before I order?', a: 'Yes. Showroom pieces and samples are available for the ranges we sell. If a line is made to order, we say so and show the closest sample.' },
      { q: 'Do you supply to site?', a: 'Yes. Delivery is scheduled with the site contact so materials arrive when they can be stored.' },
      { q: 'Can you match an architect’s specification?', a: 'We quote the specified product or a written equivalent for approval. We do not swap a grade quietly.' },
      { q: 'Do contractors get different pricing?', a: 'Trade accounts have their own terms. The specification does not change between a trade order and a retail order.' },
    ],
    reviews: [
      { author: 'Manoj Pillai', rating: 5, text: 'They matched the door schedule and delivered in the order we were hanging them. No mystery substitutions.' },
      { author: 'Helena Cruz', rating: 5, text: 'The showroom stock was the stock they invoiced. Delivery landed on the morning of the pour, not the day before with nowhere to put it.' },
    ],
    gallery: [
      { title: 'Showroom', sub: 'Product you can handle' },
      { title: 'Materials', sub: 'Specified, then supplied' },
      { title: 'Site Delivery', sub: 'Quantity and timing' },
    ],
  },
  {
    id: 'real-estate',
    label: 'Real Estate, Property Management & Housing',
    shortLabel: 'Real Estate',
    leads: 8,
    tagline: 'Property looked after, leased, or sold with the facts in writing',
    specialization: 'Real Estate & Property',
    support: 'Sales, lettings, and building management are run with clear fees, a real description of the property, and someone who answers when residents call.',
    highlights: [
      'Listings that match the property',
      'Fees stated before you instruct',
      'Residents and owners kept informed',
      'Buildings managed, not only advertised',
    ],
    highlightNotes: [
      'Area, condition, and charges are described as they are, with photographs of the actual property.',
      'Commission, management fees, and what they include are written down first.',
      'Owners get reports. Residents get a number that is answered.',
      'Common areas, vendors, and compliance sit with the management brief, not as an afterthought.',
    ],
    trust: ['Honest listings', 'Fees in writing', 'Owner reports', 'A number that answers'],
    images: {
      heroes: [arch('luxury-modernist-estate'), arch('civic-landmark-facade'), arch('hero-villa-twilight'), arch('glass-curtain-wall')],
      gallery: [arch('modern-villa-duplex'), arch('living-room-double-height'), arch('monumental-facade-entry'), arch('tropical-modern-villa'), arch('courtyard-water-residence')],
      services: [arch('luxury-modernist-estate'), arch('civic-landmark-facade'), arch('urban-master-plan')],
      about: [arch('architectural-atelier-studio'), arch('atelier-design-studio')],
      people: [stock('bbb7f0e7'), stock('5862d7f2'), arch('principal-architect')],
    },
    services: [
      s('Property Sales', 'Buyers and sellers with the facts on the table.', 'We market the property as it is, qualify interest, and carry the paperwork through to an agreed sale.', arch('luxury-modernist-estate')),
      s('Lettings', 'Homes and commercial space leased properly.', 'Viewings, agreements, and the inventory are handled so both sides know the condition and the rent.', arch('living-room-double-height')),
      s('Property Management', 'The building run after the keys are handed over.', 'Maintenance, vendors, accounts, and resident issues are managed to a written brief.', arch('civic-landmark-facade')),
      s('Housing Advisory', 'A clear recommendation before you buy or build.', 'We compare options against budget, location, and what the building actually costs to hold.', arch('urban-master-plan')),
    ],
    subNiches: [
      {
        id: 'condominium',
        label: 'Condominium Complex & Apartment Buildings',
        leads: 4,
        services: [
          s('Apartment & Condominium Living', 'A building presented and run for the people in it.', 'Amenities, common areas, and the homes themselves are looked after as one address.', arch('civic-landmark-facade')),
        ],
      },
      {
        id: 'real-estate-agency',
        label: 'Real Estate Agency / Agent',
        leads: 2,
        services: [
          s('Agency Sales & Lettings', 'An agent who has walked the property.', 'Listings, viewings, and negotiation are handled by someone who can answer questions about the actual flat or house.', arch('hero-villa-twilight')),
        ],
      },
      {
        id: 'property-management',
        label: 'Property Management Company',
        leads: 1,
        services: [
          s('Building Management', 'Day-to-day care of the property for the owner.', 'Repairs, vendors, rent rolls, and compliance are reported on a schedule you choose.', arch('monumental-facade-entry')),
        ],
      },
      {
        id: 'mortgage-broker',
        label: 'Mortgage Broker',
        leads: 1,
        services: [
          s('Home Finance Guidance', 'Loan options explained against the property.', 'We set out products, costs, and what the lender will actually need, before you apply.', arch('cmda-sanction-drafting')),
        ],
      },
    ],
    faqs: [
      { q: 'What does your fee cover?', a: 'The instruction letter lists the fee and whether marketing, viewings, management, or finance advice is included. There is no second schedule after you sign.' },
      { q: 'Are the photographs of this property?', a: 'Yes. Listings use photographs and areas for the property being offered. If a room is excluded, we say so.' },
      { q: 'How do owners hear from management?', a: 'You get a named manager and a report at the interval in the agreement: repairs, spend, and anything waiting on a decision.' },
      { q: 'Can you help with both the sale and the building?', a: 'Where both services are selected, the sales team and the management team share one file so a buyer hears the same facts as a resident.' },
    ],
    reviews: [
      { author: 'Priyanka Jain', rating: 5, text: 'The listing matched the flat. Charges were explained before we offered, and the agent knew which wall was structural.' },
      { author: 'George Fernandes', rating: 5, text: 'Management reports arrive when they say they will. Residents have a number, and repairs are logged instead of forgotten in a chat thread.' },
    ],
    gallery: [
      { title: 'The Property', sub: 'Photographed as it is' },
      { title: 'Common Areas', sub: 'The building residents share' },
      { title: 'A Home to Let or Sell', sub: 'Rooms, light, and a true area' },
    ],
  },
];

const SHORT_LABELS = new Set(NICHES.map((niche) => niche.shortLabel));
const TAGLINES = new Set(NICHES.map((niche) => niche.tagline));
const SPECIALIZATIONS = new Set(NICHES.map((niche) => niche.specialization));

const DETAIL_BY_NAME: Record<string, NicheService> = {};
for (const niche of NICHES) {
  for (const service of niche.services) DETAIL_BY_NAME[service.name.toLowerCase()] = service;
  for (const sub of niche.subNiches) {
    for (const service of sub.services) DETAIL_BY_NAME[service.name.toLowerCase()] = service;
  }
}

export function markNicheCopy(value: string): string {
  if (!value || value.startsWith(NICHE_MARK)) return value;
  return NICHE_MARK + value;
}

export function isNicheMarked(value?: string): boolean {
  return typeof value === 'string' && value.startsWith(NICHE_MARK);
}

export function unmarkNicheCopy(value: string): string {
  return value.startsWith(NICHE_MARK) ? value.slice(NICHE_MARK.length) : value;
}

export function plainIfNiche(value?: string): string | undefined {
  if (typeof value === 'string' && value.startsWith(NICHE_MARK)) return value.slice(NICHE_MARK.length);
  return undefined;
}

export function joinLabels(labels: string[]): string {
  const unique = [...new Set(labels.filter(Boolean))];
  if (unique.length <= 1) return unique[0] || '';
  if (unique.length === 2) return `${unique[0]} & ${unique[1]}`;
  return `${unique.slice(0, -1).join(', ')} & ${unique[unique.length - 1]}`;
}

export function isJoinedShortLabels(text?: string): boolean {
  if (!text) return false;
  const parts = text
    .split(' & ')
    .flatMap((part) => part.split(', '))
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 1 && parts.every((part) => SHORT_LABELS.has(part));
}

export function isNicheTagline(text?: string): boolean {
  if (!text) return false;
  const value = text.trim();
  return TAGLINES.has(value) || isJoinedShortLabels(value);
}

export function isNicheSpecialization(text?: string): boolean {
  if (!text) return false;
  const value = text.trim();
  return SPECIALIZATIONS.has(value) || isJoinedShortLabels(value);
}

export function isNicheLockedList(list?: unknown): boolean {
  return Array.isArray(list) && Boolean((list as { nicheLocked?: boolean }).nicheLocked);
}

export function getNicheServiceDetail(serviceName: string): NicheService | null {
  const key = serviceName.trim().toLowerCase();
  return DETAIL_BY_NAME[key] || null;
}

export function nicheById(id: string): NicheDefinition | undefined {
  return NICHES.find((niche) => niche.id === id);
}

function roundRobin<T>(groups: T[][], max: number): T[] {
  const out: T[] = [];
  let index = 0;
  while (out.length < max) {
    let added = false;
    for (const group of groups) {
      if (group[index] !== undefined) {
        out.push(group[index]);
        added = true;
        if (out.length >= max) break;
      }
    }
    if (!added) break;
    index += 1;
  }
  return out;
}

function servicesFor(niche: NicheDefinition, subIds: Set<string>): NicheService[] {
  const chosen = niche.subNiches.filter((sub) => subIds.has(sub.id));
  if (chosen.length) return chosen.flatMap((sub) => sub.services);
  return niche.services;
}

export function buildNicheVoice(
  nicheIds: string[] = [],
  subNicheIds: string[] = [],
  ctx: { name?: string; city?: string; regions?: string[] } = {}
): SiteCopy | null {
  const selected = NICHES.filter((niche) => nicheIds.includes(niche.id));
  if (!selected.length) return null;

  const subIds = new Set(subNicheIds);
  const regionIds = ctx.regions || [];
  const selectedRegions = REGIONS.filter((reg) => regionIds.includes(reg.id));
  const defaultCity = selectedRegions.length ? selectedRegions[0].city : 'your city';
  const name = (ctx.name || '').trim();
  const city = (ctx.city || '').trim() || defaultCity;
  const who = name || selected[0].shortLabel;
  const labels = selected.map((niche) => niche.shortLabel);
  const eyebrow = joinLabels(labels);

  const serviceGroups = selected.map((niche) => servicesFor(niche, subIds));
  const mergedServices: NicheService[] = [];
  const seen = new Set<string>();
  for (const service of roundRobin(serviceGroups, 8)) {
    const key = service.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    mergedServices.push(service);
  }

  const highlightGroups = selected.map((niche) =>
    niche.highlights.map((title, index) => ({
      title,
      note: niche.highlightNotes[index] || '',
    }))
  );

  // If regions are selected, prepend region highlights
  if (selectedRegions.length) {
    const regionHighlights = selectedRegions.flatMap((reg) =>
      reg.highlights.map((title, index) => ({
        title,
        note: reg.highlightNotes[index] || '',
      }))
    );
    highlightGroups.unshift(regionHighlights);
  }

  const highlights = roundRobin(highlightGroups, 4);

  const description = markNicheCopy(
    selected.length === 1
      ? `${who} is ${/^[aeiou]/i.test(selected[0].shortLabel) ? 'an' : 'a'} ${selected[0].shortLabel.toLowerCase()} practice in ${city}. ${selected[0].support}`
      : `${who} brings together ${eyebrow.toLowerCase()} in ${city}. ${selected.map((niche) => niche.support).join(' ')}`
  );

  return {
    nicheIds: selected.map((niche) => niche.id),
    subNicheIds: selected.flatMap((niche) => niche.subNiches.map((sub) => sub.id)).filter((id) => subIds.has(id)),
    regionIds,
    labels,
    eyebrow,
    tagline: selected.length === 1 ? selected[0].tagline : eyebrow,
    specialization: selected.length === 1 ? selected[0].specialization : eyebrow,
    description,
    services: mergedServices.map((service) => service.name),
    highlights: highlights.map((item) => item.title),
    highlightNotes: highlights.map((item) => item.note),
    trust: roundRobin(selected.map((niche) => niche.trust), 4),
    faqs: roundRobin(selected.map((niche) => niche.faqs), 5).map((faq) => ({ ...faq, tag: 'FAQ' })),
    reviews: roundRobin(selected.map((niche) => niche.reviews), 3),
    gallery: roundRobin(selected.map((niche) => niche.gallery), 6),
  };
}

export function faqsFromSite(
  data: { siteCopy?: { faqs?: { q: string; a: string; tag?: string }[] } } | null | undefined,
  fallback: { q: string; a: string; tag?: string }[]
) {
  const faqs = data?.siteCopy?.faqs;
  if (Array.isArray(faqs) && faqs.length) {
    return faqs.map((faq) => ({ q: faq.q, a: faq.a, tag: faq.tag || 'FAQ' }));
  }
  return fallback;
}

export function nicheNote(
  data: { siteCopy?: { highlightNotes?: string[] } } | null | undefined,
  index: number,
  fallback: string
): string {
  return data?.siteCopy?.highlightNotes?.[index] || fallback;
}

export function lockNicheList(items: string[]): string[] {
  const list = items.slice();
  Object.defineProperty(list, 'nicheLocked', { value: true, enumerable: false });
  return list;
}
