import Reveal from './Reveal';

type PageName = 'about' | 'services' | 'gallery' | 'contact';

type PageNarrativeProps = {
  page: PageName;
  studioName: string;
  city: string;
};

const PAGE_CONTENT: Record<PageName, { eyebrow: string; title: string; intro: string; cards: Array<{ title: string; desc: string }> }> = {
  about: {
    eyebrow: 'The Way We Work',
    title: 'Beautiful is only useful when it works every day',
    intro: 'Our approach keeps the practical questions in the same room as the visual ones, so your home feels easy to maintain, enjoy, and grow into.',
    cards: [
      { title: 'Plan around real routines', desc: 'We begin with mornings, meals, work, children, guests, and storage — not a one-size-fits-all moodboard.' },
      { title: 'Make the choices understandable', desc: 'We translate finishes, fittings, and design options into decisions you can compare and comfortably approve.' },
      { title: 'Keep the handoffs simple', desc: 'One clear route from the brief to drawings, production, installation, and the final walkthrough.' },
    ],
  },
  services: {
    eyebrow: 'Scope Made Simple',
    title: 'What a well-planned interior service should include',
    intro: 'The right scope does more than list products. It explains the plan, the choices behind it, and how each step gets delivered.',
    cards: [
      { title: 'A room-by-room plan', desc: 'Layouts and storage are discussed in the context of the actual people and activities each room needs to support.' },
      { title: 'A finish shortlist', desc: 'Materials and hardware are narrowed with performance, maintenance, and budget in mind.' },
      { title: 'A clear next step', desc: 'You know what needs approval next, what happens off site, and what will be coordinated at your home.' },
    ],
  },
  gallery: {
    eyebrow: 'See the Thinking',
    title: 'Look for the details that make a home easier',
    intro: 'The portfolio is more useful when you look past the photograph and notice the choices that support everyday life.',
    cards: [
      { title: 'Storage with a purpose', desc: 'Watch how clutter-prone items get a home without making the room feel like a wall of cupboards.' },
      { title: 'Lighting with layers', desc: 'Notice how working light, ambient light, and moments of focus make a space more flexible.' },
      { title: 'Finishes that can live', desc: 'The best material choices look good now and remain comfortable to clean, touch, and use later.' },
    ],
  },
  contact: {
    eyebrow: 'Make the First Call Count',
    title: 'A few details are all we need to begin',
    intro: 'Come as you are. The most helpful first conversation starts with the life you want to support, not a perfectly prepared design brief.',
    cards: [
      { title: 'A plan or room list', desc: 'A builder plan, a measured sketch, or a simple room list helps us understand the starting point.' },
      { title: 'Your move-in target', desc: 'A sense of timing helps us discuss priorities, sequencing, and which decisions deserve attention first.' },
      { title: 'A handful of references', desc: 'Share the images that feel right and tell us why — warm light, a calmer palette, better storage, or a material you love.' },
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
          {studioName || 'Our studio'} · Designing for real life in {city}
        </Reveal>
      </div>
    </section>
  );
}
