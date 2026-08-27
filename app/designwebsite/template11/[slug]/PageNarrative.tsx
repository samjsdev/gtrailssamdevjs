import Reveal from './Reveal';

type PageName = 'about' | 'services' | 'gallery' | 'contact';

type PageNarrativeProps = {
  page: PageName;
  studioName: string;
  city: string;
};

const PAGE_CONTENT: Record<PageName, { eyebrow: string; title: string; intro: string; cards: Array<{ title: string; desc: string }> }> = {
  about: {
    eyebrow: 'How We Build',
    title: 'What goes into every building we deliver',
    intro: 'A building should stay strong, functional, and durable for generations. These are the engineering rules we never compromise on.',
    cards: [
      { title: '100% Vaastu & Natural Light', desc: 'Auspicious zoning for residential projects, wide weather sunshades over windows that block harsh afternoon heat while welcoming natural daylight.' },
      { title: 'Soil-Tested Strong Foundations', desc: 'We test your plot soil first, then engineer the foundation to match it — with Tata Tiscon steel and Grade-53 cement for lifelong structural integrity.' },
      { title: 'Courtyard & Cross Ventilation', desc: 'Central courtyards and climate-responsive planning that keep indoor spaces naturally cooler — reducing reliance on heavy air-conditioning.' },
    ],
  },
  services: {
    eyebrow: 'Know What You Pay For',
    title: 'A clear plan before construction starts',
    intro: 'Before work begins, you get everything in writing — approvals needed, materials specified, and the exact cost of each stage.',
    cards: [
      { title: 'Plot Rules & Approvals Plan', desc: 'The proposal shows how much you can legally build on your plot, the required open space setbacks on all sides, and mandatory rainwater harvesting pits.' },
      { title: 'Fixed Material List & Prices', desc: 'Every material — Tata Tiscon steel, UltraTech cement, branded electricals and plumbing — is listed item by item in the contract. The price never increases midway.' },
      { title: 'Clear Stages to Key Handover', desc: 'You get one simple roadmap: design approval, CMDA/GCC permit, construction milestones with regular photo updates, and key handover with a 10-year warranty.' },
    ],
  },
  gallery: {
    eyebrow: 'Look Closely at the Details',
    title: 'Built for the Chennai climate',
    intro: 'As you view our projects, notice the thoughtful planning that keeps these buildings cool in summer and safe during monsoon rains all year round.',
    cards: [
      { title: 'Natural Light & Sea Breeze', desc: 'East-facing verandas and large windows bring in soft morning light and evening sea breeze, while shaded facades block hot afternoon heat.' },
      { title: 'Strong, Flood-Safe Structures', desc: 'Solid concrete frames with ground plinths raised 3.5 to 4.5 feet above road level, keeping floodwaters out during heavy monsoon rains.' },
      { title: 'Materials That Endure', desc: 'Heat-insulating clay blocks, solid granite stonework, and high-performance weather-proof exterior finishes engineered for tropical durability.' },
    ],
  },
  contact: {
    eyebrow: 'Your First Visit',
    title: 'Bring your plot documents and start planning',
    intro: 'No need to prepare anything complicated. A few basic details about your plot are enough for our architects to advise you properly.',
    cards: [
      { title: 'Plot Documents & Measurements', desc: 'Bring your land papers (Patta/FMB) and plot measurements. Our architects check road width and exactly how much you can legally build.' },
      { title: 'Project Scope & Requirements', desc: 'Tell us if you are planning a villa, an independent residential house, or a commercial building, along with your target timeline.' },
      { title: 'Design Ideas & Elevations', desc: 'Share your preferred architectural styles — contemporary elevations, traditional courtyard plans, or modern commercial glass facades.' },
    ],
  },
};

export default function PageNarrative({ page, studioName, city }: PageNarrativeProps) {
  const content = PAGE_CONTENT[page];

  return (
    <section className="py-[clamp(76px,8vw,118px)] px-6 lg:px-7 bg-[#f6f1e8] border-y border-[#211a13]/10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-[clamp(42px,6vw,88px)] items-start">
        <Reveal className="lg:sticky lg:top-32">
          <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
            {content.eyebrow}
          </span>
          <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,4vw,54px)] leading-[1.1] mb-5">{content.title}</h2>
          <p className="text-[#7d7264] text-[15.5px] font-light leading-[1.85] max-w-[430px]">{content.intro}</p>
          <p className="mt-6 text-[12px] tracking-[0.2em] uppercase text-[#a58150] font-medium">
            {studioName || 'Our studio'} · {city}
          </p>
        </Reveal>

        <div className="grid gap-px bg-[#211a13]/12 border border-[#211a13]/12">
          {content.cards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 85}>
              <article className="group grid sm:grid-cols-[74px_1fr] gap-5 bg-[#fdfbf6] p-7 sm:p-8 transition-colors duration-300 hover:bg-white">
                <span className="font-[family-name:var(--font-marcellus)] text-[34px] text-[#a58150] leading-none">0{idx + 1}</span>
                <div>
                  <h3 className="font-[family-name:var(--font-marcellus)] text-[22px] text-[#211a13] mb-2">{card.title}</h3>
                  <p className="text-[13.5px] leading-[1.75] font-light text-[#7d7264]">{card.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
