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

export default async function Template2Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template2/${slug}`;

  const data = await readSourceConfig(slug, 'template2');
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
      tagline: detail?.tagline || 'Personalised to your floor plan and budget.',
      desc: detail?.description || getInteriorServiceSummary(svc),
      benefits: detail?.benefits?.slice(0, 4) || [
        'Personalized design direction',
        'Curated material selections',
        'Clear budgets and timelines',
        'Coordinated execution and styling',
      ],
      steps: detail?.process?.slice(0, 4) || [],
      img:
        getServiceImage(svc, media) ||
        media.treatmentImages?.[idx] ||
        SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length],
    };
  });

  return (
    <div>
      {/* PAGE HERO */}
      <section id="services-hero" className="bg-[#faf7f1] px-6 py-[clamp(60px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 bg-white border border-[#1b1b1b]/10 rounded-full px-4.5 py-2 text-[12px] font-bold tracking-[0.14em] uppercase text-[#0e5a43] mb-6 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f2a007]">
              Our services
            </span>
            <h1 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(34px,4.6vw,58px)] leading-[1.06] tracking-[-0.02em] max-w-[760px]">
              Everything your home needs, <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">under one roof</mark>
            </h1>
            <p className="mt-5 max-w-[560px] text-[#6b6660] text-[16.5px] leading-[1.7] font-medium">
              From a single room refresh to full-home interiors — {cleanName || 'our studio'} handles design, materials and execution across {city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services-list" className="px-6 py-[clamp(64px,7vw,100px)] bg-white">
        <div className="max-w-[1240px] mx-auto grid gap-7">
          {services.map((svc, idx) => (
            <Reveal key={svc.title}>
              <div className="grid lg:grid-cols-[0.85fr_1.15fr] border border-[#1b1b1b]/10 rounded-[26px] overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
                <div className="relative min-h-[260px] lg:min-h-full overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 bg-white/95 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.1em] uppercase text-[#0e5a43]">
                    Service {String(idx + 1).padStart(2, '0')}
                  </span>
                  <img src={svc.img} alt={svc.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </div>

                <div className="px-7 sm:px-9 py-8">
                  <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(22px,2.6vw,30px)] tracking-[-0.01em] mb-1.5">
                    {svc.title}
                  </h2>
                  <p className="text-[14px] font-extrabold text-[#0e5a43] mb-4">{svc.tagline}</p>
                  <p className="text-[#6b6660] font-medium leading-[1.7] text-[14.5px] mb-6">{svc.desc}</p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-7">
                    {svc.benefits.map((b: string) => (
                      <div key={b} className="flex gap-2.5 items-start bg-[#faf7f1] border border-[#1b1b1b]/8 rounded-xl px-3.5 py-3">
                        <Check className="w-[18px] h-[18px] text-[#0e5a43] shrink-0 mt-px" strokeWidth={2.2} />
                        <span className="text-[13px] font-semibold leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`${basePath}/contact`}
                    className="inline-flex items-center gap-2 font-extrabold text-[14px] text-[#0e5a43] border-b-[2.5px] border-[#f2a007] pb-1 hover:gap-3.5 transition-all"
                  >
                    Get a quote for this <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="services-cta" className="px-6 py-[clamp(64px,7vw,96px)] bg-[#0e5a43] text-white">
        <Reveal className="max-w-[760px] mx-auto text-center">
          <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-4">
            Not sure what your home needs? <mark className="bg-transparent text-[#f2a007]">Ask a designer.</mark>
          </h2>
          <p className="text-white/80 font-medium text-[16px] leading-[1.7] mb-8">
            Tell us about your rooms and budget — we&rsquo;ll map the right scope in one consultation.
          </p>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center justify-center gap-2 bg-[#f2a007] text-[#1b1b1b] font-bold text-[15px] px-9 py-4.5 rounded-[14px] hover:bg-[#e09500] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(242,160,7,0.35)] transition-all duration-300"
          >
            Book Consultation
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
