import Reveal from './Reveal';

type PageName = 'about' | 'services' | 'gallery' | 'contact';

type PageNarrativeProps = {
  page: PageName;
  studioName: string;
  city: string;
};

const PAGE_CONTENT: Record<PageName, { eyebrow: string; title: string; intro: string; cards: Array<{ title: string; desc: string }> }> = {
  about: {
    eyebrow: 'The Work Behind the Look',
    title: 'Good architecture is built on rigorous questions',
    intro: 'Before a site gets a style, it needs a clear understanding of plot orientation, geotechnical soil strata, and statutory building limits.',
    cards: [
      { title: 'What needs to work?', desc: 'We prioritize Vaastu directional alignment (Eesanyan, Agni, Niruthi), climatic cross-ventilation, and multigenerational accessibility before decorative flourishes.' },
      { title: 'What deserves the budget?', desc: 'We invest in primary Fe550D TMT rebar, borehole-matched pile foundations, Wienerberger Porotherm clay blocks, and Low-E solar glass.' },
      { title: 'What needs to be decided first?', desc: 'A rigorous sequence keeps CMDA setback clearances, STAAD RCC schemas, and MEP coordination in lockstep before casting on site.' },
    ],
  },
  services: {
    eyebrow: 'A Better Brief',
    title: 'The difference between a generic list and a real scope',
    intro: 'A useful architectural scope connects statutory planning permissions, structural engineering rigor, and frozen line-item BOQs.',
    cards: [
      { title: 'The Plot & Zoning Plan', desc: 'The proposal charts exact legal FSI utilization, road-width ratios, and mandatory Rainwater Harvesting recharge pits under TNCDBR 2019.' },
      { title: 'The Engineering Specification', desc: 'Brand-locked materials: Tata Tiscon Fe550D steel, UltraTech 53 cement, and certified ready-mix concrete batch tests locked in a frozen BOQ.' },
      { title: 'The Turnkey Execution Path', desc: 'From groundbreaking and deep RCC casting to Porotherm blockwork, terrace waterproofing, and keys handover with a 10-year warranty.' },
    ],
  },
  gallery: {
    eyebrow: 'How to Read a Project',
    title: 'Look for the climate intelligence behind the photograph',
    intro: 'Use the portfolio as inspiration. The most valuable decisions are often the orientation choices, foundation depth, and natural stack-effect cooling.',
    cards: [
      { title: 'Find the Architectural Anchor', desc: 'Observe spacious shaded living verandas, central Mutham courtyards, or monolithic board-marked concrete masses that ground each residence.' },
      { title: 'Trace Passive Cooling Corridors', desc: 'Notice how open courtyards draw warm air upward via stack effect, pulling refreshing evening Bay of Bengal breezes through shaded verandas.' },
      { title: 'Inspect Flood & Soil Details', desc: 'Notice plinths raised 3.5 to 4.5 feet above road crown level to ensure complete flood resilience during severe Chennai monsoon downpours.' },
    ],
  },
  contact: {
    eyebrow: 'A Useful Starting Point',
    title: 'The first consultation starts with your plot',
    intro: 'You do not need to know every answer yet. A few concrete site details are enough to make the initial consultation focused and actionable.',
    cards: [
      { title: 'Show us the site baseline', desc: 'Bring your Patta, FMB sketch, or plot dimensions so our architects can immediately evaluate municipal setbacks and FSI potential.' },
      { title: 'Name your structural & spatial priorities', desc: 'Tell us what matters most: 100% Vaastu compliance, a central courtyard, a rooftop terrace garden, or a firm housewarming deadline.' },
      { title: 'Share architectural references you trust', desc: 'Bring images or sketches of aesthetics you love—modernist tropical pavilions, Chettinad courtyard compounds, or contemporary concrete villas.' },
    ],
  },
};

export default function PageNarrative({ page, studioName, city }: PageNarrativeProps) {
  const content = PAGE_CONTENT[page];

  return (
    <section className="px-7 py-[clamp(64px,7vw,96px)] bg-[#fbf7f2] border-y border-[#241f1a]/10">
      <div className="max-w-[1220px] mx-auto grid lg:grid-cols-[0.78fr_1.22fr] gap-10 lg:gap-16 items-start">
        <Reveal className="lg:sticky lg:top-28">
          <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
            {content.eyebrow}
          </div>
          <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold mt-3.5 mb-4 tracking-[-0.02em] leading-[1.08]">{content.title}</h2>
          <p className="text-[#6d6259] text-[15.5px] leading-relaxed max-w-[430px]">{content.intro}</p>
          <p className="mt-6 text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#d8442c]">{studioName || 'Our studio'} · {city}</p>
        </Reveal>

        <div className="grid gap-4">
          {content.cards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 85}>
              <article className="grid sm:grid-cols-[64px_1fr] gap-5 bg-white border border-[#241f1a]/10 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-[#d8442c]/35 hover:shadow-[0_16px_38px_rgba(36,31,26,0.07)]">
                <span className="w-14 h-14 rounded-xl bg-[#fbf7f2] border border-[#d8442c]/20 text-[#d8442c] text-[18px] font-extrabold grid place-items-center">0{idx + 1}</span>
                <div>
                  <h3 className="text-[21px] font-extrabold text-[#1d1713] mb-2">{card.title}</h3>
                  <p className="text-[13.5px] text-[#6d6259] font-medium leading-[1.7]">{card.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
