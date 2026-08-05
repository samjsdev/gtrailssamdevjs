import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import {
  DEFAULT_INTERIOR_SERVICES,
  getInteriorServiceData,
  getInteriorServiceSummary,
  getServiceImage,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from '../Reveal';

type PageProps = { params: Promise<{ slug: string }> };

const SERVICE_FALLBACK_IMAGES = [
  '/images/stock/68b39046.webp',
  '/images/stock/a0e0726f.webp',
  '/images/stock/dc1759ad.webp',
  '/images/stock/f23e9dc6.webp',
  '/images/stock/615f9d34.webp',
  '/images/stock/6dcb103c.webp',
];

export default async function Template1Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template1/${slug}`;

  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { clinic, business } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';

  const servicesList: string[] = business.services?.length ? business.services : DEFAULT_INTERIOR_SERVICES;

  const services = servicesList.map((svc: string, idx: number) => {
    const detail = getInteriorServiceData(svc);
    return {
      title: svc,
      desc: detail?.description || getInteriorServiceSummary(svc),
      tagline: detail?.tagline || 'A personalized design service shaped around your home.',
      benefits: detail?.benefits?.slice(0, 4) || [
        'Personalized design direction',
        'Curated material selections',
        'Clear budgets and timelines',
        'Coordinated execution and styling',
      ],
      img:
        getServiceImage(svc, media) ||
        media.treatmentImages?.[idx] ||
        SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length],
    };
  });

  return (
    <div>
      {/* PAGE HERO */}
      <section id="services-hero" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-5 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              What we do
            </span>
            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(38px,5vw,68px)] leading-[1.08] max-w-[760px]">
              End-to-end interior services, <em className="not-italic italic font-light text-[#c9ab7c]">under one roof</em>
            </h1>
            <p className="mt-6 max-w-[560px] text-[16.5px] font-light leading-[1.75] text-white/75">
              One team from concept to keys — design, production, execution and styling under a single contract with {cleanName || 'our studio'} in {city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section id="services-list" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto flex flex-col gap-[clamp(64px,7vw,100px)]">
          {services.map((svc, idx) => (
            <Reveal key={svc.title}>
              <div className={`grid lg:grid-cols-2 gap-[clamp(36px,5vw,72px)] items-center`}>
                <div className={`relative ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative before:content-[''] before:absolute before:-left-3.5 before:-top-3.5 before:right-12 before:bottom-12 before:border before:border-[#a58150]">
                    <div className="overflow-hidden aspect-[4/3.1] group">
                      <img
                        src={svc.img}
                        alt={svc.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <span
                    className="absolute -bottom-6 right-4 font-[family-name:var(--font-marcellus)] text-[80px] leading-none text-transparent select-none"
                    style={{ WebkitTextStroke: '1px #a58150' }}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
                    Service 0{idx + 1}
                  </span>
                  <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(28px,3.2vw,44px)] leading-[1.12] mb-3">
                    {svc.title}
                  </h2>
                  <p className="font-light italic text-[#a58150] text-[16px] mb-5">{svc.tagline}</p>
                  <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px] mb-7">{svc.desc}</p>

                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-8">
                    {svc.benefits.map((b: string) => (
                      <li key={b} className="flex items-start gap-3 text-[14px] font-light text-[#211a13]">
                        <span className="w-6 h-6 shrink-0 border border-[#a58150] grid place-items-center mt-0.5">
                          <Check className="w-3.5 h-3.5 text-[#a58150]" strokeWidth={2} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`${basePath}/contact`}
                    className="inline-flex items-center gap-3 text-[12.5px] tracking-[0.2em] uppercase font-medium text-[#211a13] border-b border-[#a58150] pb-1.5 hover:text-[#a58150] transition-colors"
                  >
                    Discuss This Service →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="services-cta" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,100px)]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.8vw,50px)] leading-[1.12] mb-6">
              Not sure where to start? <em className="not-italic italic font-light text-[#c9ab7c]">Start with a conversation.</em>
            </h2>
            <p className="text-white/70 font-light leading-[1.8] mb-9">
              Tell us about your rooms, your budget and your timeline — we&rsquo;ll map the right scope for your home in one free session.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-3 bg-[#a58150] text-white px-8 py-4 text-[12.5px] tracking-[0.2em] uppercase font-medium border border-[#a58150] hover:bg-white hover:text-[#211a13] hover:border-white transition-colors duration-300"
            >
              Book Free Consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
