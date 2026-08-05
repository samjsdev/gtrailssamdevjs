import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { DEFAULT_INTERIOR_HIGHLIGHTS, DEFAULT_INTERIOR_SERVICES,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from '../Reveal';

type PageProps = { params: Promise<{ slug: string }> };

export default async function Template1About({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template1/${slug}`;

  const data = await readSourceConfig(slug, 'template1');
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
  const designerImage =
    media.otherImages?.[0] ||
    '/images/stock/a0e0726f.webp';
  const craftImage =
    media.otherImages?.[4] ||
    '/images/stock/dc1759ad.webp';

  const VALUE_NOTES = [
    'Every project starts from your lifestyle — never a catalogue.',
    'Curated palettes and honest advice on materials that last.',
    'Itemised estimates and a schedule you can hold us to.',
    'One accountable team from first sketch to final handover.',
  ];

  return (
    <div>
      {/* PAGE HERO */}
      <section id="about-hero" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-5 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              The studio
            </span>
            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(38px,5vw,68px)] leading-[1.08] max-w-[760px]">
              {cleanName || 'A design studio'} —{' '}
              <em className="not-italic italic font-light text-[#c9ab7c]">crafted in {city}</em>
            </h1>
            <p className="mt-6 max-w-[560px] text-[16.5px] font-light leading-[1.75] text-white/75">{cleanDesc}</p>
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal>
            <div className="relative before:content-[''] before:absolute before:-left-4 before:-top-4 before:right-14 before:bottom-14 before:border before:border-[#a58150]">
              <div className="overflow-hidden aspect-[4/4.7]">
                <img src={storyImage} alt={`${cleanName || 'Studio'} interior project`} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -right-2 sm:-right-4 bottom-11 bg-[#211a13] text-white px-8 py-7 shadow-[0_30px_60px_rgba(33,26,19,0.3)]">
                <b className="font-[family-name:var(--font-marcellus)] font-normal text-[44px] text-[#c9ab7c] block leading-none">{experienceYears}+</b>
                <span className="text-[11px] tracking-[0.3em] uppercase text-white/65">Years of Craft</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Our story
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-6">
              Homes shaped by <em className="not-italic italic font-light text-[#a58150]">listening first</em>
            </h2>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px] mb-4.5">
              {clinic.tagline || 'Thoughtful Interiors for Everyday Living'} — that is the promise behind every drawing that leaves our studio. We believe great interiors are not imported taste; they are deep listening translated into space.
            </p>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px]">
              From compact apartments to independent villas across {city}, our work balances beauty with the practical weight of daily life: storage that disappears, light that flatters, materials that age gracefully.
            </p>

            <div className="grid grid-cols-3 border-t border-b border-[#211a13]/10 mt-9">
              {[
                { value: `${rating}★`, label: 'Google Rating' },
                { value: `${experienceYears}+`, label: 'Years Experience' },
                { value: `${servicesCount}+`, label: 'Services Offered' },
              ].map((stat, i) => (
                <div key={stat.label} className={`py-5 px-5 border-l border-[#211a13]/10 ${i === 0 ? 'border-l-0 pl-0' : ''}`}>
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[clamp(24px,2.4vw,34px)] block">{stat.value}</b>
                  <span className="text-[10.5px] tracking-[0.2em] uppercase text-[#7d7264]">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#fdfbf6] border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-[clamp(44px,5vw,68px)]">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150] after:content-[''] after:w-10 after:h-px after:bg-[#a58150]">
              What we stand for
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
              The values behind <em className="not-italic italic font-light text-[#a58150]">the craft</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.slice(0, 4).map((h, idx) => (
              <Reveal key={h} delay={idx * 80}>
                <div className="border border-[#211a13]/10 bg-[#f6f1e8] px-7 py-9 h-full hover:border-[#a58150] transition-colors duration-300">
                  <span
                    className="font-[family-name:var(--font-marcellus)] text-[46px] block mb-5 text-transparent"
                    style={{ WebkitTextStroke: '1px #a58150' }}
                  >
                    0{idx + 1}
                  </span>
                  <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[20px] mb-3 leading-snug">{h}</h3>
                  <p className="text-[13.5px] font-light text-[#7d7264] leading-[1.7]">{VALUE_NOTES[idx % VALUE_NOTES.length]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPAL DESIGNER */}
      <section id="designer" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal className="relative overflow-hidden aspect-[4/4.6]">
            <img src={designerImage} alt={doctor?.name || 'Principal designer'} loading="lazy" className="w-full h-full object-cover" />
          </Reveal>

          <Reveal delay={120}>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              The people behind the work
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-6">
              {doctor?.name || 'Our Design Team'}
            </h2>
            <p className="text-[15px] tracking-[0.08em] uppercase text-[#a58150] mb-5">
              {doctor?.specialization || 'Interior Design & Turnkey Execution'} · {doctor?.experience || '5+ years'}
            </p>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px] mb-4.5">
              Every project is personally reviewed before handover — one signature, one standard. Our team blends design sensibility with site discipline, so what you approve in 3D is exactly what gets built.
            </p>
            <blockquote className="font-[family-name:var(--font-marcellus)] text-[clamp(20px,2.2vw,26px)] leading-[1.5] border-l-2 border-[#a58150] pl-6 my-8">
              &ldquo;A home should hold your life the way a well-tailored garment holds the body — invisibly, perfectly, yours.&rdquo;
            </blockquote>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-3 bg-[#211a13] text-white px-7 py-4 text-[12.5px] tracking-[0.2em] uppercase font-medium border border-[#211a13] hover:bg-[#a58150] hover:border-[#a58150] transition-colors duration-300"
            >
              Meet Us For A Consultation
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CRAFT CTA */}
      <section id="craft" className="relative py-[clamp(84px,9vw,130px)] px-6 lg:px-7 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={craftImage} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[rgba(24,18,12,0.82)]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,4vw,54px)] leading-[1.12] mb-6">
              Ready to see what your home <em className="not-italic italic font-light text-[#c9ab7c]">could become?</em>
            </h2>
            <p className="text-white/75 font-light leading-[1.8] mb-9">
              Browse the portfolio, or sit with us for 45 minutes — space plan, style direction and a ballpark estimate, free.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`${basePath}/gallery`}
                className="inline-flex items-center gap-3 bg-transparent text-white px-7 py-4 text-[12.5px] tracking-[0.2em] uppercase font-medium border border-white/50 hover:border-white hover:bg-white/10 transition-colors duration-300"
              >
                View Portfolio
              </Link>
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center gap-3 bg-[#a58150] text-white px-7 py-4 text-[12.5px] tracking-[0.2em] uppercase font-medium border border-[#a58150] hover:bg-white hover:text-[#211a13] hover:border-white transition-colors duration-300"
              >
                Book Free Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
