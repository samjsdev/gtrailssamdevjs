import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, Factory, ClipboardCheck, ShieldCheck, HeartHandshake } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { DEFAULT_INTERIOR_HIGHLIGHTS, DEFAULT_INTERIOR_SERVICES,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from '../Reveal';

type PageProps = { params: Promise<{ slug: string }> };

export default async function Template3About({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template3/${slug}`;

  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const { clinic, doctor, business } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const rating = business.rating || '4.9';
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '5';
  const servicesCount = business.services?.length || DEFAULT_INTERIOR_SERVICES.length;
  const highlights: string[] = business.highlights?.length ? business.highlights : DEFAULT_INTERIOR_HIGHLIGHTS;

  const storyImage =
    media.clinicImages?.[1] ||
    '/images/stock/68b39046.webp';
  const teamImage =
    media.otherImages?.[0] ||
    '/images/stock/a0e0726f.webp';
  const studioImage =
    media.otherImages?.[5] ||
    '/images/stock/dc1759ad.webp';

  const VALUES = [
    { icon: Factory, title: highlights[0] || 'Personalized design concepts', desc: 'Concepts start from how your family actually lives, not a template.' },
    { icon: ClipboardCheck, title: highlights[1] || 'Material and finish guidance', desc: 'We tell you honestly what lasts — and what to skip.' },
    { icon: ShieldCheck, title: highlights[2] || 'Transparent project planning', desc: 'Itemised quotes, frozen at booking. Never a surprise invoice.' },
    { icon: HeartHandshake, title: highlights[3] || 'End-to-end execution support', desc: 'A single accountable team from sketch to handover — and after.' },
  ];

  return (
    <div>
      {/* HERO */}
      <section id="about-hero" className="px-7 py-[clamp(56px,7vw,88px)]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              About us
            </div>
            <h1 className="text-[clamp(32px,4.6vw,54px)] font-extrabold mt-3.5 tracking-[-0.02em] max-w-[780px] leading-[1.12]">
              {cleanName || 'A studio'} — {city}&rsquo;s home-grown{' '}
              <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">interiors studio</span>
            </h1>
            <p className="mt-4.5 max-w-[640px] text-[#6d6259] text-[16px]">{cleanDesc}</p>
          </Reveal>
        </div>
      </section>

      {/* STORY + STATS */}
      <section id="story" className="px-7 py-[clamp(56px,7vw,88px)] bg-white">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-2 gap-11 lg:gap-14 items-center">
          <Reveal>
            <div className="rounded-[20px] overflow-hidden aspect-[4/3.3] shadow-[0_30px_60px_-24px_rgba(29,23,19,0.4)]">
              <img src={storyImage} alt={`${cleanName || 'Studio'} completed project`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Our story
            </div>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold mt-3.5 mb-4 tracking-[-0.02em]">
              {clinic.tagline || 'Thoughtful interiors for everyday living'}
            </h2>
            <p className="text-[#6d6259] text-[15.5px] mb-4">
              We built this studio around one belief: a home should be designed for the people in it. That means listening before drawing, planning before quoting, and checking before handing over.
            </p>
            <p className="text-[#6d6259] text-[15.5px] mb-7">
              Today, led by {doctor?.name || 'our design team'} ({doctor?.specialization || 'Interior Design & Turnkey Execution'}), we handle projects across {city} — from single-room refreshes to full turnkey homes.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { b: `${rating}★`, s: 'Google rating' },
                { b: `${experienceYears}+ yrs`, s: 'Experience' },
                { b: `${servicesCount}+`, s: 'Services' },
              ].map((stat) => (
                <div key={stat.s} className="bg-[#fbf7f2] border border-[#241f1a]/10 rounded-2xl px-4 py-5 text-center">
                  <b className="text-[clamp(20px,2.4vw,27px)] font-extrabold text-[#d8442c] block">{stat.b}</b>
                  <span className="text-[11.5px] text-[#6d6259] font-semibold tracking-[0.05em] uppercase">{stat.s}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="px-7 py-[clamp(56px,7vw,88px)]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="mb-11">
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              What we promise
            </div>
            <h2 className="text-[clamp(26px,3.6vw,42px)] font-extrabold mt-3.5 tracking-[-0.02em]">
              Built like a brand, priced like a local
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, idx) => {
              const Icon = v.icon;
              return (
                <Reveal key={idx} delay={idx * 60}>
                  <div className="bg-white border border-[#241f1a]/10 rounded-[18px] px-6 py-7 h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-18px_rgba(29,23,19,0.18)]">
                    <span className="w-[46px] h-[46px] rounded-[13px] bg-[#fdeae5] text-[#d8442c] grid place-items-center mb-4">
                      <Icon className="w-[21px] h-[21px]" strokeWidth={2} />
                    </span>
                    <h3 className="text-[16.5px] font-extrabold mb-2 leading-snug">{v.title}</h3>
                    <p className="text-[13.5px] text-[#6d6259] leading-[1.6]">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="px-7 py-[clamp(56px,7vw,88px)] bg-white">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-11 lg:gap-14 items-center">
          <Reveal>
            <div className="rounded-[18px] overflow-hidden aspect-[4/3.6] border border-[#241f1a]/10">
              <img src={teamImage} alt={doctor?.name || 'Design team'} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Meet your designers
            </div>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold mt-3.5 mb-1.5 tracking-[-0.02em]">
              {doctor?.name || 'Our Design Team'}
            </h2>
            <span className="text-[14px] text-[#d8442c] font-bold block mb-4">
              {doctor?.specialization || 'Interior Design & Turnkey Execution'} · {doctor?.experience || '5+ years'}
            </span>
            <p className="text-[#6d6259] text-[15.5px] mb-6">
              &ldquo;Storage is love. We design homes that survive a decade of real life — heavy cooking, growing kids, visiting grandparents — and still look beautiful doing it.&rdquo;
            </p>
            <div className="grid gap-3 mb-8">
              {highlights.slice(0, 4).map((h) => (
                <div key={h} className="flex gap-3 items-center font-bold text-[14.5px]">
                  <Check className="w-5 h-5 text-[#d8442c] shrink-0" strokeWidth={2.4} />
                  {h}
                </div>
              ))}
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center justify-center bg-[#d8442c] text-white font-extrabold text-[15px] px-7 py-3.5 rounded-xl hover:bg-[#b93320] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(216,68,44,0.3)] transition-all duration-250"
            >
              Book Consultation
            </Link>
          </Reveal>
        </div>
      </section>

      {/* STUDIO VISIT */}
      <section id="studio" className="px-7 py-[clamp(56px,7vw,88px)]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <div className="bg-[linear-gradient(120deg,#1d1713,#2a211b)] text-white rounded-[26px] overflow-hidden grid lg:grid-cols-2">
              <div className="min-h-[280px] lg:min-h-[420px]">
                <img src={studioImage} alt={`Inside the ${cleanName || 'design'} studio`} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="px-8 sm:px-12 py-12 flex flex-col justify-center">
                <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#f4b942] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#f4b942]">
                  Visit us
                </div>
                <h2 className="text-[clamp(26px,3vw,36px)] font-extrabold my-3.5">Walk through your future home</h2>
                <p className="text-white/80 text-[15px] mb-6">
                  Feel the finishes, open the drawers, test the hardware — and sit with a designer over filter coffee. Home visits available across {city}.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 mb-7 list-none">
                  {['Material & finish library', '3D design previews', 'Real project photos', 'Itemised sample quotes'].map((li) => (
                    <li key={li} className="flex gap-2.5 text-[13.5px] font-semibold text-white/90">
                      <Check className="w-4 h-4 text-[#f4b942] shrink-0 mt-0.5" strokeWidth={2.4} />
                      {li}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${basePath}/contact`}
                  className="self-start inline-flex items-center justify-center bg-[#d8442c] text-white font-extrabold text-[15px] px-7 py-3.5 rounded-xl hover:bg-[#b93320] hover:-translate-y-0.5 transition-all duration-250"
                >
                  Plan My Visit
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
