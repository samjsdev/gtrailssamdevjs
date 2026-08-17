import Reveal from './Reveal';

type PageName = 'about' | 'services' | 'gallery' | 'contact';

type PageNarrativeProps = {
  page: PageName;
  studioName: string;
  city: string;
};

const PAGE_CONTENT: Record<PageName, { eyebrow: string; title: string; intro: string; cards: Array<{ title: string; desc: string }> }> = {
  about: {
    eyebrow: 'The Studio Standard',
    title: 'What we protect in every project',
    intro: 'A home should feel considered long after the reveal. These are the decisions we return to when an idea, material, or detail is being tested.',
    cards: [
      { title: 'Function before flourish', desc: 'Storage, circulation, sightlines, and daily rituals are resolved before a decorative finish earns its place.' },
      { title: 'Choices made visible', desc: 'A good design decision is one you can understand. Materials, details, and allowances should be clear enough to approve with confidence.' },
      { title: 'Details resolved early', desc: 'The quiet work happens before site execution: junctions, clearances, hardware, and lighting are considered before they become expensive surprises.' },
    ],
  },
  services: {
    eyebrow: 'How We Define Scope',
    title: 'A good interior scope answers three questions',
    intro: 'Before work begins, a useful proposal should make it clear what is being designed, what is being specified, and how the work will be coordinated.',
    cards: [
      { title: 'What changes in the room?', desc: 'The plan names the layouts, storage, joinery, and spatial improvements that are actually included.' },
      { title: 'What will it be made from?', desc: 'Finishes, hardware, countertop choices, and material allowances are described before you commit.' },
      { title: 'How does it come together?', desc: 'The sequence connects design approvals, fabrication, site work, and final installation into one understandable path.' },
    ],
  },
  gallery: {
    eyebrow: 'Looking Beyond the Photograph',
    title: 'The best rooms work after the camera leaves',
    intro: 'As you browse the portfolio, notice more than a style. The lasting value is often found in the quiet decisions that make a room easy to use.',
    cards: [
      { title: 'Follow the light', desc: 'Observe how day and evening lighting are layered to make a room feel composed at every hour.' },
      { title: 'Look for daily ease', desc: 'Consider where things are set down, stored, charged, served, or put away — the details that keep a home calm.' },
      { title: 'Read the material hierarchy', desc: 'Strong rooms let a few materials lead while the rest support them, rather than asking every surface to speak at once.' },
    ],
  },
  contact: {
    eyebrow: 'A More Useful First Conversation',
    title: 'Bring the details that move a project forward',
    intro: 'You do not need a finished brief. A few honest details let the first conversation focus on the decisions that matter most to your home.',
    cards: [
      { title: 'Your floor plan, if you have one', desc: 'A builder plan, measured sketch, or even a room list gives the conversation a practical starting point.' },
      { title: 'Your timing and priorities', desc: 'Share what needs to happen first, when you hope to move in, and which rooms carry the most weight in daily life.' },
      { title: 'Images with a reason behind them', desc: 'A small set of references is most useful when you can say what you respond to: light, warmth, storage, colour, or mood.' },
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
