import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import {
  DEFAULT_INTERIOR_SERVICES,
  getInteriorServiceData,
  getInteriorServiceSummary,
  getServiceImage,
} from '@/lib/interiorContent';
import Reveal from '../Reveal';
import Estimator from '../Estimator';

type PageProps = { params: Promise<{ slug: string }> };

const SERVICE_FALLBACK_IMAGES = [
  '/images/stock/68b39046.webp',
  '/images/stock/a0e0726f.webp',
  '/images/stock/dc1759ad.webp',
  '/images/stock/f23e9dc6.webp',
  '/images/stock/615f9d34.webp',
  '/images/stock/6dcb103c.webp',
];

export default async function Template3Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template3/${slug}`;

  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const { clinic, business, media } = data;
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const servicesList: string[] = business.services?.length ? business.services : DEFAULT_INTERIOR_SERVICES;

  const services = servicesList.map((svc: string, idx: number) => {
    const detail = getInteriorServiceData(svc);
    return {
      title: svc,
      tagline: detail?.tagline || 'Designed and built around your home.',
      desc: detail?.description || getInteriorServiceSummary(svc),
      benefits: detail?.benefits?.slice(0, 4) || [
        'Personalized design direction',
        'Curated material selections',
        'Clear budgets and timelines',
        'Coordinated execution and styling',
      ],
      process: detail?.process?.slice(0, 4) || [],
      img:
        getServiceImage(svc, media) ||
        media.treatmentImages?.[idx] ||
        SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length],
    };
  });

  return (
    <div>
      {/* HERO */}
      <section id="services-hero" className="px-7 py-[clamp(56px,7vw,88px)]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Our offerings
            </div>
            <h1 className="text-[clamp(32px,4.6vw,54px)] font-extrabold mt-3.5 tracking-[-0.02em] max-w-[780px] leading-[1.12]">
              Everything your home needs,{' '}
              <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">under one roof</span>
            </h1>
            <p className="mt-4.5 max-w-[640px] text-[#6d6259] text-[16px]">
              From modular kitchens to complete turnkey homes — {cleanName || 'our studio'} designs, builds and delivers across {city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services-list" className="px-7 py-[clamp(48px,6vw,80px)] bg-white">
        <div className="max-w-[1220px] mx-auto flex flex-col gap-[clamp(52px,6vw,80px)]">
          {services.map((svc, idx) => (
            <Reveal key={svc.title}>
              <div className="grid lg:grid-cols-2 gap-9 lg:gap-14 items-center">
                <div className={`relative ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="rounded-[20px] overflow-hidden aspect-[4/3.1] shadow-[0_30px_60px_-24px_rgba(29,23,19,0.4)]">
                    <img src={svc.img} alt={svc.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -top-4 left-6 bg-[#d8442c] text-white text-[11px] font-extrabold tracking-[0.12em] uppercase px-4 py-2 rounded-full">
                    Offering {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold tracking-[-0.02em] mb-1.5">{svc.title}</h2>
                  <p className="font-[family-name:var(--font-newsreader)] italic text-[#d8442c] text-[18px] mb-4">{svc.tagline}</p>
                  <p className="text-[#6d6259] text-[14.5px] leading-[1.7] mb-6">{svc.desc}</p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {svc.benefits.map((b: string) => (
                      <div key={b} className="flex gap-2.5 items-start bg-[#fbf7f2] border border-[#241f1a]/8 rounded-xl px-3.5 py-3">
                        <Check className="w-[18px] h-[18px] text-[#d8442c] shrink-0 mt-px" strokeWidth={2.4} />
                        <span className="text-[13px] font-bold leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>

                  {svc.process.length > 0 && (
                    <ol className="mb-7 grid gap-2">
                      {svc.process.map((step: string, sIdx: number) => (
                        <li key={step} className="flex gap-3 items-start text-[13.5px] text-[#6d6259] font-semibold">
                          <span className="w-6 h-6 shrink-0 rounded-full bg-[#1d1713] text-[#f4b942] grid place-items-center text-[11px] font-extrabold">
                            {sIdx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  )}

                  <Link
                    href={`${basePath}/contact`}
                    className="inline-flex items-center gap-2.5 text-[12.5px] font-extrabold tracking-[0.18em] uppercase text-[#d8442c] group"
                  >
                    Get my free quote
                    <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1.5" strokeWidth={2.4} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ESTIMATOR */}
      <section id="estimator" className="px-7 py-[clamp(56px,7vw,88px)]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <Estimator contactPath={`${basePath}/contact`} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
