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
    title: 'The rooms should belong to the life inside them',
    intro: 'We believe a private residence should feel composed without becoming formal, and personal without becoming overfilled.',
    cards: [
      { title: 'Begin with the rhythm', desc: 'We listen for the ways a household begins, gathers, rests, works, and quietly resets at the end of the day.' },
      { title: 'Edit with intention', desc: 'A smaller number of well-chosen materials gives a home a lasting identity and lets its details breathe.' },
      { title: 'Let craft stay quiet', desc: 'The best detailing feels inevitable: seams align, storage disappears, and the tactile moments reward daily use.' },
    ],
  },
  services: {
    eyebrow: 'A Clearer Commission',
    title: 'The shape of a considered interior scope',
    intro: 'A commission becomes easier to trust when the vision, the choices, and the route to completion are all held in the same conversation.',
    cards: [
      { title: 'The spatial intention', desc: 'We define what the rooms need to offer before selecting the pieces and finishes that will express it.' },
      { title: 'The material direction', desc: 'Timber, stone, textiles, metal, and light are selected as a family — with performance and maintenance in view.' },
      { title: 'The craft sequence', desc: 'Drawings, samples, fabrication, and installation follow a deliberate order so the finished rooms retain their original clarity.' },
    ],
  },
  gallery: {
    eyebrow: 'Notes From the Portfolio',
    title: 'Look for the atmosphere, then the decisions behind it',
    intro: 'A photograph captures a moment. A lived-in home holds up through the hours, the seasons, and the ordinary rituals that follow.',
    cards: [
      { title: 'Observe the light', desc: 'Notice how soft layers of daylight and evening light give a room more than one mood.' },
      { title: 'Notice the restraint', desc: 'The enduring rooms are often the ones where a few materials are allowed to lead, with space left around them.' },
      { title: 'Find the useful luxury', desc: 'A beautiful home becomes generous when its storage, seating, surfaces, and circulation make everyday hosting feel effortless.' },
    ],
  },
  contact: {
    eyebrow: 'Before We Meet',
    title: 'Bring the fragments. We will help find the thread.',
    intro: 'There is no need for a perfectly finished brief. The most revealing conversations often start with a plan, a memory, or a room that is not working yet.',
    cards: [
      { title: 'A plan, if available', desc: 'A builder drawing, measurements, or a room list gives the conversation a useful sense of proportion and possibility.' },
      { title: 'Your non-negotiables', desc: 'Tell us what must feel different: more light, easier storage, a better kitchen, a quieter bedroom, or a home ready for family.' },
      { title: 'A few true references', desc: 'Bring images you return to and the feeling behind them. The reason you choose an image is more valuable than the image alone.' },
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
