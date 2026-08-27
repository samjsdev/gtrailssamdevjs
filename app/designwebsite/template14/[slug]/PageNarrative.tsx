import Reveal from './Reveal';

type PageName = 'about' | 'services' | 'gallery' | 'contact';

type PageNarrativeProps = {
  page: PageName;
  studioName: string;
  city: string;
};

const PAGE_CONTENT: Record<PageName, { eyebrow: string; title: string; intro: string; cards: Array<{ title: string; desc: string }> }> = {
  about: {
    eyebrow: 'An Atelier Principle',
    title: 'The residence should belong to the climate and life inside it',
    intro: 'We believe a private residence should feel monumental without becoming rigid, and deeply personal without sacrificing structural permanence.',
    cards: [
      { title: 'Respond to Solar Rhythms', desc: 'We align morning light in east-facing verandas and shield western facades with Porotherm hollow clay walls and deep weather sunshades (chajjas).' },
      { title: 'Material Restraint & Permanence', desc: 'Sadarahalli granite, primary Fe550D TMT rebar, and board-marked concrete age gracefully without high recurring maintenance.' },
      { title: 'Climate & Acoustic Calm', desc: 'Central Mutham atriums, double-glazed acoustic Low-E glass, and flood-resilient plinth heights keep the sanctuary peaceful.' },
    ],
  },
  services: {
    eyebrow: 'A Clearer Commission',
    title: 'The shape of a rigorous architectural build',
    intro: 'A commission becomes easier to trust when statutory clearances, structural engineering, and frozen line-item BOQs are united under one contract.',
    cards: [
      { title: 'Statutory & Spatial Intention', desc: 'We resolve CMDA/DTCP zoning setbacks, road-width FSI allowances, and mandatory Rainwater Harvesting recharge pits before structural engineering.' },
      { title: 'The Engineering Specification', desc: 'Tata Tiscon Fe550D rebar, UltraTech Grade-53 monolithic RCC casting, and Saint-Gobain Low-E facades locked in a frozen BOQ.' },
      { title: 'The Turnkey Execution Sequence', desc: 'Borehole SPT soil analysis, pile/raft casting, column pours, Porotherm masonry, and keys handover backed by a 10-year warranty.' },
    ],
  },
  gallery: {
    eyebrow: 'Notes From the Portfolio',
    title: 'Look for the climate intelligence, then the form',
    intro: 'A photograph captures an elevation. A lived-in residence endures through blistering summer heat, coastal humidity, and monsoon downpours.',
    cards: [
      { title: 'Observe the Climate Light', desc: 'Notice how east-facing verandas capture soft dawn light while extended roof eaves deflect intense Kathiri Veyyil afternoon heat.' },
      { title: 'Notice Structural Honesty', desc: 'Enduring residences let board-marked concrete frames, Sadarahalli granite plinths, and natural terracotta jalis speak for themselves.' },
      { title: 'Find Generational Livability', desc: 'A home becomes truly generous when its 100% Vaastu layout, cross-ventilation corridors, and accessible multigenerational suites support family life.' },
    ],
  },
  contact: {
    eyebrow: 'Before We Meet',
    title: 'Bring your plot parameters to begin',
    intro: 'There is no need for a finished architectural brief. A few concrete site details let our principal architects evaluate your project with statutory and structural rigor.',
    cards: [
      { title: 'Patta, FMB Sketch & Plot Coordinates', desc: 'A plot title document, survey number, or dimensions give our architects the legal baseline to calculate exact CMDA setbacks and buildable FSI.' },
      { title: 'Your Family’s Non-Negotiables', desc: 'Share what matters most: 100% Vaastu adherence, a central Mutham courtyard, a private lift, or a firm housewarming target.' },
      { title: 'Architectural Language References', desc: 'Bring images or sketches you return to—modernist coastal villas, traditional Chettinad courtyards, or minimalist monolithic forms.' },
    ],
  },
};

export default function PageNarrative({ page, studioName, city }: PageNarrativeProps) {
  const content = PAGE_CONTENT[page];

  return (
    <section className="py-24 bg-white border-y border-[#221c14]/12">
      <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-20 items-start">
        <Reveal className="lg:sticky lg:top-28">
          <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
            {content.eyebrow}
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(34px,4.5vw,54px)] font-semibold leading-[1.04] mt-3.5 mb-4">{content.title}</h2>
          <p className="text-[#7a6f60] text-[15.5px] font-light leading-[1.8] max-w-[440px]">{content.intro}</p>
          <p className="mt-6 text-[10.5px] font-semibold tracking-[0.22em] uppercase text-[#a4532f]">{studioName || 'Our atelier'} · {city}</p>
        </Reveal>

        <div className="grid gap-4">
          {content.cards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 90}>
              <article className="grid sm:grid-cols-[78px_1fr] gap-5 bg-[#fbf8f1] border border-[#221c14]/12 p-6 sm:p-7 transition-all duration-300 hover:border-[#a4532f]/45 hover:shadow-[0_16px_38px_rgba(23,19,15,0.06)]">
                <span className="w-14 h-14 rounded-full bg-white border border-[#a4532f]/22 text-[#a4532f] font-[family-name:var(--font-cormorant)] text-[25px] font-semibold grid place-items-center">0{idx + 1}</span>
                <div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[25px] font-semibold text-[#17130f] mb-1.5">{card.title}</h3>
                  <p className="text-[13.5px] text-[#7a6f60] font-light leading-[1.7]">{card.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
