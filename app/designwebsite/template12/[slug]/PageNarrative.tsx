import Reveal from './Reveal';

type PageName = 'about' | 'services' | 'gallery' | 'contact';

type PageNarrativeProps = {
  page: PageName;
  studioName: string;
  city: string;
};

const PAGE_CONTENT: Record<PageName, { eyebrow: string; title: string; intro: string; cards: Array<{ title: string; desc: string }> }> = {
  about: {
    eyebrow: 'Our Build Standard',
    title: 'Architectural excellence is engineered from the ground up',
    intro: 'Our approach unites statutory compliance, geotechnical soil matching, and climate response, so your home endures for generations.',
    cards: [
      { title: '100% Vaastu & Directional Harmony', desc: 'We harmonize Eesanyan pooja placement, Agni kitchen layouts, and Niruthi master suites with contemporary open-plan spaces.' },
      { title: 'Plot Topography & Geotechnical Science', desc: 'Borehole SPT soil tests dictate whether your plot needs bored RCC piles (OMR/Velachery clay) or reinforced raft footings (ECR sand).' },
      { title: 'Single-Contract Turnkey Discipline', desc: 'One accountable route from 3D BIM digital twin to CMDA sanction, civil execution, and final occupancy keys handover.' },
    ],
  },
  services: {
    eyebrow: 'Scope Made Simple',
    title: 'What a well-planned architectural build includes',
    intro: 'The right scope does more than list materials. It details statutory approvals, structural engineering rigor, and transparent site execution.',
    cards: [
      { title: 'Plot Zoning & CMDA Sanction Roadmap', desc: 'Statutory TNCDBR 2019 compliance, road-width FSI maximization, and mandatory Rainwater Harvesting (RWH) percolation pit approvals.' },
      { title: 'Engineered Structural Specifications', desc: 'STAAD-analyzed RCC frames, Tata Tiscon Fe550D rebar, UltraTech 53 cement, and Porotherm thermal block masonry locked in a frozen BOQ.' },
      { title: 'Structured Milestone Civil Delivery', desc: 'Clear weekly photographic updates and stage-by-stage inspections covering plinth, columns, roof slab casting, and facade glazing.' },
    ],
  },
  gallery: {
    eyebrow: 'See the Engineering',
    title: 'Look for the decisions that make a residence endure',
    intro: 'The portfolio is most revealing when you look past the photograph and notice the climate-responsive and structural choices.',
    cards: [
      { title: 'Passive Cooling & Natural Drafts', desc: 'Observe how central Mutham courtyards and terracotta jalis purge rising heat and draw cool evening coastal breezes.' },
      { title: 'Flood-Resilient Elevated Plinths', desc: 'Notice plinths raised 3.5 to 4.5 feet above road crown level to protect against Chennai monsoon cloudbursts and road height rises.' },
      { title: 'Materials Built for Generations', desc: 'Sadarahalli granite, exposed board-marked concrete members, and Saint-Gobain Low-E solar glass that withstand tropical coastal humidity for decades.' },
    ],
  },
  contact: {
    eyebrow: 'Make the First Call Count',
    title: 'A few site details are all we need to begin',
    intro: 'Come as you are. The most helpful first conversation starts with your plot parameters and the family life you want to support.',
    cards: [
      { title: 'Patta, FMB Sketch & Boundary Dimensions', desc: 'A plot title sketch or survey map gives our architects the exact baseline to calculate setbacks and permissible FSI.' },
      { title: 'Groundbreaking & Move-in Targets', desc: 'Sharing your timeline helps our liaison team schedule CMDA/GCC permit filings and mobilize civil engineering teams.' },
      { title: 'Typology & Spatial Wishlist', desc: 'Share the architecture you connect with—coastal modern villas, traditional courtyards, or contemporary duplexes.' },
    ],
  },
};

export default function PageNarrative({ page, studioName, city }: PageNarrativeProps) {
  const content = PAGE_CONTENT[page];

  return (
    <section className="px-6 py-[clamp(70px,8vw,108px)] bg-[#faf7f1] border-y border-[#1b1b1b]/10">
      <div className="max-w-[1240px] mx-auto">
        <Reveal className="max-w-[720px] mb-12">
          <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
            {content.eyebrow}
          </span>
          <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-4">
            {content.title}
          </h2>
          <p className="text-[#6b6660] text-[15.5px] leading-[1.75] font-medium max-w-[620px]">{content.intro}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {content.cards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 90}>
              <article className="h-full bg-white border border-[#1b1b1b]/10 rounded-[22px] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(27,27,27,0.08)]">
                <span className="w-10 h-10 rounded-xl bg-[#fdeecb] text-[#0e5a43] font-[family-name:var(--font-bricolage)] font-extrabold grid place-items-center mb-6">0{idx + 1}</span>
                <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[20px] text-[#1b1b1b] leading-[1.15] mb-3">{card.title}</h3>
                <p className="text-[13.5px] text-[#6b6660] font-medium leading-[1.7]">{card.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280} className="mt-7 text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#0e5a43]">
          {studioName || 'Our practice'} · Designing for real life in {city}
        </Reveal>
      </div>
    </section>
  );
}
