import Image from 'next/image';

type Props = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image?: string;
  alt?: string;
  caption?: string;
  bgImage?: string;
};

export default function PageIntro(props: Props) {
  const bgImage = props.bgImage || props.image || '/images/architecture/architectural-blueprint-draft.webp';

  return (
    <section className="relative overflow-hidden border-b-4 border-[#111111] bg-[#121418] text-white pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12">
      {/* Background architectural image */}
      <Image
        src={bgImage}
        alt={props.alt || ''}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-85 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#121418]/95 via-[#121418]/70 to-[#121418]/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/65 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#EA580C]">
          {props.eyebrow}
        </p>
        <h1
          className="text-4xl sm:text-6xl font-bold font-serif leading-[1.08] tracking-tight text-white"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {props.title} <br />
          <em className="text-[#EA580C] not-italic">{props.accent}</em>
        </h1>
        <p className="text-sm sm:text-lg text-white/80 max-w-2xl font-medium leading-relaxed">
          {props.description}
        </p>
        <div className="flex items-center gap-6 pt-2 text-xs font-bold uppercase tracking-widest text-white/60">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#EA580C] rounded-full inline-block" />
            MPA Architecture &amp; ARCH Foundation Civil
          </span>
          <span>•</span>
          <span>Anna Nagar, Chennai</span>
          <span>•</span>
          <span>Est. 1998</span>
        </div>
      </div>
    </section>
  );
}
