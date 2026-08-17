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
    title: 'Good interiors are built on better questions',
    intro: 'Before a room gets a style, it needs a clear understanding of the people, objects, limits, and possibilities already inside it.',
    cards: [
      { title: 'What needs to work?', desc: 'We start with storage, movement, work, rest, and gatherings — the daily things that determine whether a room feels effortless.' },
      { title: 'What deserves the budget?', desc: 'The plan identifies where performance and craft matter most, so the room is not spending equally on everything.' },
      { title: 'What needs to be decided first?', desc: 'A strong sequence keeps structural, electrical, joinery, and finish decisions in the right order.' },
    ],
  },
  services: {
    eyebrow: 'A Better Brief',
    title: 'The difference between a list and a real scope',
    intro: 'A useful interior scope connects the design intent to the materials, the site, and the next decision — not just a collection of line items.',
    cards: [
      { title: 'The room plan', desc: 'The layout gives every activity and every essential item a place before the joinery is finalised.' },
      { title: 'The specification', desc: 'The proposal records the finishes and fitting logic behind the look, so the result does not rely on assumptions.' },
      { title: 'The execution path', desc: 'Each phase has a purpose: approve, fabricate, prepare the site, install, inspect, and hand over.' },
    ],
  },
  gallery: {
    eyebrow: 'How to Read a Project',
    title: 'There is more to a room than its first impression',
    intro: 'Use the projects as prompts. The most valuable ideas may be a circulation choice, a concealed shelf, or an atmosphere you want to recreate.',
    cards: [
      { title: 'Find the anchor', desc: 'Every strong room has one or two ideas that hold the composition together — a material, a view, a light source, or a piece of furniture.' },
      { title: 'Trace the movement', desc: 'Notice how the space lets people arrive, sit, work, serve, and put things away without getting in each other’s way.' },
      { title: 'Spot the quiet storage', desc: 'The best storage supports the visual calm of the room without announcing itself at every wall.' },
    ],
  },
  contact: {
    eyebrow: 'A Useful Starting Point',
    title: 'The first conversation can be simple',
    intro: 'You do not need to know every answer yet. A few concrete details are enough to make the consultation focused and worthwhile.',
    cards: [
      { title: 'Show us the starting point', desc: 'Bring a builder plan, a measured sketch, or a few photos of the rooms you want to change.' },
      { title: 'Name your priorities', desc: 'Tell us what must improve: storage, a kitchen, a work zone, a move-in deadline, or simply a home that feels more like you.' },
      { title: 'Share the references you trust', desc: 'A small folder of images with notes on what you like gives the discussion more value than a long list of trends.' },
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
