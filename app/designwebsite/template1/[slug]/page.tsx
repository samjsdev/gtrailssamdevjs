import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, FileText, Clock, BadgeCheck } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import {
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  DEFAULT_INTERIOR_HIGHLIGHTS,
  getInteriorServiceSummary,
  getServiceImage,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from './Reveal';
import LeadForm from './LeadForm';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const SERVICE_FALLBACK_IMAGES = [
  '/images/stock/68b39046.webp',
  '/images/stock/a0e0726f.webp',
  '/images/stock/dc1759ad.webp',
  '/images/stock/f23e9dc6.webp',
];

const PORTFOLIO_FALLBACK_IMAGES = [
  '/images/stock/615f9d34.webp',
  '/images/stock/6dcb103c.webp',
  '/images/stock/a151a9e5.webp',
  '/images/stock/bf333360.webp',
  '/images/stock/84fea9c5.webp',
  '/images/stock/284d6d29.webp',
];

const PROCESS_STEPS = [
  {
    title: 'Design Consultation',
    desc: 'Meet a principal designer at the studio or your home. We listen first — lifestyle, rituals, budget.',
  },
  {
    title: '3D Design & Quote',
    desc: 'Photorealistic 3D views of every room with a clear, itemised estimate. Iterate until it feels unmistakably yours.',
  },
  {
    title: 'Craft & Execution',
    desc: 'Precision production and site work proceed in parallel, tracked milestone by milestone.',
  },
  {
    title: 'Install & Style',
    desc: 'Installation in days, not weeks — then deep-clean, styling and a walkthrough before handover.',
  },
];

export default async function Template1Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template1/${slug}`;

  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { clinic, doctor, business } = data;

  const media = previewMedia(data.media);

  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';

  const heroImage =
    media.clinicImages?.[0] ||
    '/images/stock/36e83915.webp';
  const aboutImage =
    media.clinicImages?.[1] ||
    '/images/stock/90879216.webp';
  const whyImage =
    media.otherImages?.[2] ||
    '/images/stock/34bba44b.webp';
  const ctaImage =
    media.otherImages?.[3] ||
    '/images/stock/7617327a.webp';

  const servicesList: string[] = business.services?.length ? business.services : DEFAULT_INTERIOR_SERVICES;
  const highlights: string[] = business.highlights?.length ? business.highlights : DEFAULT_INTERIOR_HIGHLIGHTS;
  const reviews = data.reviews?.length ? data.reviews : DEFAULT_INTERIOR_REVIEWS;
  const rating = business.rating || '4.9';
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '5';

  const portfolioImages = [
    ...(media.treatmentImages || []),
    ...(media.clinicImages || []).slice(2),
    ...(media.otherImages || []).slice(6),
  ].filter(Boolean);
  const gallery = portfolioImages.length >= 6 ? portfolioImages.slice(0, 6) : PORTFOLIO_FALLBACK_IMAGES;

  const previewServices = servicesList.slice(0, 4).map((svc: string, idx: number) => ({
    title: svc,
    desc: getInteriorServiceSummary(svc).split('. ')[0] + '.',
    img:
      getServiceImage(svc, media) ||
      media.treatmentImages?.[idx] ||
      SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length],
  }));

  const whyChecks = [
    { icon: ShieldCheck, title: highlights[0] || 'Personalized design concepts', desc: 'Every project starts from your lifestyle — never a catalogue.' },
    { icon: FileText, title: highlights[1] || 'Material and finish guidance', desc: 'Curated palettes and honest advice on what lasts.' },
    { icon: Clock, title: highlights[2] || 'Transparent project planning', desc: 'Itemised estimates and a schedule you can hold us to.' },
    { icon: BadgeCheck, title: highlights[3] || 'End-to-end execution support', desc: 'One accountable team from first sketch to handover.' },
  ];

  return (
    <div>
      {/* HERO */}
      <section id="hero" className="relative min-h-[calc(100vh-116px)] flex flex-col justify-end text-white !p-0">
        <div className="absolute inset-0">
          <img src={heroImage} alt={`${cleanName || 'Studio'} signature interior`} className="w-full h-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-[linear-gradient(78deg,rgba(24,18,12,0.86)_0%,rgba(24,18,12,0.55)_42%,rgba(24,18,12,0.12)_72%),linear-gradient(0deg,rgba(24,18,12,0.65)_0%,transparent_30%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-7 pt-28 w-full">
          <span className="inline-flex items-center gap-3.5 text-[12.5px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-6 before:content-[''] before:w-[52px] before:h-px before:bg-[#c9ab7c]">
            Interior Design Studio — {city}
          </span>
          <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(42px,5.8vw,82px)] leading-[1.06] max-w-[760px]">
            {clinic.tagline || 'Timeless interiors for homes that deserve the extraordinary'}
          </h1>
          <p className="mt-6 mb-9 max-w-[560px] text-[17px] font-light leading-[1.75] text-white/80">
            {cleanDesc}
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-3 bg-[#a58150] text-white px-7 py-4 text-[12.5px] tracking-[0.2em] uppercase font-medium border border-[#a58150] hover:bg-[#211a13] hover:border-[#211a13] transition-colors duration-300"
            >
              Book Free Consultation
            </Link>
            <Link
              href={`${basePath}/gallery`}
              className="inline-flex items-center gap-3 bg-transparent text-white px-7 py-4 text-[12.5px] tracking-[0.2em] uppercase font-medium border border-white/50 hover:border-white hover:bg-white/10 transition-colors duration-300"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-7 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#f6f1e8]/15">
            {[
              { value: rating, suffix: '★', label: 'Google Rating' },
              { value: experienceYears, suffix: '+ yrs', label: 'Of Craftsmanship' },
              { value: String(servicesList.length), suffix: '+', label: 'Design Services' },
              { value: business.reviewCount || '100', suffix: '+', label: 'Happy Clients' },
            ].map((stat, i) => (
              <div key={i} className={`py-7 px-6 border-l border-[#f6f1e8]/15 ${i === 0 ? 'md:border-l-0 md:pl-0' : ''} ${i % 2 === 0 ? 'max-md:border-l-0 max-md:pl-0' : ''}`}>
                <b className="font-[family-name:var(--font-marcellus)] font-normal text-[clamp(30px,3vw,44px)] block text-white">
                  {stat.value}
                  <i className="not-italic text-[#c9ab7c]">{stat.suffix}</i>
                </b>
                <span className="text-[11.5px] tracking-[0.26em] uppercase text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal>
            <div className="relative before:content-[''] before:absolute before:-left-4 before:-top-4 before:right-14 before:bottom-14 before:border before:border-[#a58150]">
              <div className="overflow-hidden aspect-[4/4.7] group">
                <img
                  src={aboutImage}
                  alt={`Inside the ${cleanName || 'design'} studio`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute -right-2 sm:-right-4 bottom-11 bg-[#211a13] text-white px-8 py-7 shadow-[0_30px_60px_rgba(33,26,19,0.3)]">
                <b className="font-[family-name:var(--font-marcellus)] font-normal text-[44px] text-[#c9ab7c] block leading-none">
                  {experienceYears}+
                </b>
                <span className="text-[11px] tracking-[0.3em] uppercase text-white/65">Years in {city}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              The studio
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-6">
              A design house rooted in{' '}
              <em className="not-italic font-light italic text-[#a58150]">the way you live</em>
            </h2>
            <p className="text-[#7d7264] leading-[1.85] font-light mb-4.5 text-[15.5px]">{cleanDesc}</p>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px]">
              Led by {doctor?.name || 'our design team'} — {doctor?.specialization || 'Interior Design & Turnkey Execution'} — we design
              homes around real routines: kitchens built for serious cooking, storage that disappears, and living rooms made for long family evenings.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 my-8">
              {highlights.slice(0, 4).map((h) => (
                <div key={h} className="border-t border-[#211a13]/10 pt-4">
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[17px] block mb-1.5">{h}</b>
                </div>
              ))}
            </div>
            <Link
              href={`${basePath}/about`}
              className="inline-flex items-center gap-3 bg-transparent text-[#211a13] px-7 py-4 text-[12.5px] tracking-[0.2em] uppercase font-medium border border-[#211a13] hover:bg-[#211a13] hover:text-white transition-colors duration-300"
            >
              More About Us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#fdfbf6] border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
                What we do
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                End-to-end <em className="not-italic italic font-light text-[#a58150]">interior services</em>
              </h2>
            </div>
            <p className="max-w-[430px] text-[#7d7264] leading-[1.8] text-[15.5px] font-light">
              One team from concept to keys — design, production, execution and styling under a single roof.
            </p>
          </Reveal>

          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewServices.map((svc, idx) => (
              <Link key={svc.title} href={`${basePath}/services`} className="group relative overflow-hidden aspect-[3/4] flex items-end text-white">
                <img
                  src={svc.img}
                  alt={svc.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,18,12,0.88)_0%,rgba(24,18,12,0.28)_45%,rgba(24,18,12,0.06)_70%)]" />
                <div className="relative z-10 p-6">
                  <small className="text-[10.5px] tracking-[0.3em] uppercase text-[#c9ab7c] block mb-2.5">
                    0{idx + 1} — Service
                  </small>
                  <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[22px] mb-2.5">{svc.title}</h3>
                  <p className="text-[13px] font-light text-white/80 leading-[1.6] max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-[120px] group-hover:opacity-100 group-hover:mb-1">
                    {svc.desc}
                  </p>
                </div>
              </Link>
            ))}
          </Reveal>

          <Reveal className="text-center mt-12">
            <Link
              href={`${basePath}/services`}
              className="inline-flex items-center gap-3 text-[12.5px] tracking-[0.2em] uppercase font-medium text-[#211a13] border-b border-[#a58150] pb-1.5 hover:text-[#a58150] transition-colors"
            >
              Explore All Services →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="work" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
                Selected work
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                Recent projects across <em className="not-italic italic font-light text-[#a58150]">{city}</em>
              </h2>
            </div>
            <p className="max-w-[430px] text-[#7d7264] leading-[1.8] text-[15.5px] font-light">
              A selection from the homes and spaces we&rsquo;ve designed and built. Every photograph is a real project.
            </p>
          </Reveal>

          <div className="grid grid-cols-12 gap-5">
            {gallery.map((img, idx) => {
              const spans = ['col-span-12 md:col-span-7 aspect-[16/10.5]', 'col-span-12 md:col-span-5 aspect-[4/3.36]', 'col-span-12 md:col-span-5 aspect-[4/3.36]', 'col-span-12 md:col-span-7 aspect-[16/10.5]', 'col-span-12 md:col-span-6 aspect-[16/10]', 'col-span-12 md:col-span-6 aspect-[16/10]'];
              return (
                <Reveal key={idx} className={spans[idx % 6]} delay={(idx % 3) * 80}>
                  <Link href={`${basePath}/gallery`} className="group relative overflow-hidden flex items-end text-white w-full h-full">
                    <img
                      src={img}
                      alt={`${cleanName || 'Studio'} project ${idx + 1}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,18,12,0.82)_0%,transparent_46%)]" />
                    <div className="relative z-10 flex justify-between items-end w-full px-6 py-6">
                      <div>
                        <span className="text-[11px] tracking-[0.24em] uppercase text-[#c9ab7c]">{city}</span>
                        <b className="font-[family-name:var(--font-marcellus)] font-normal text-[20px] block">Project Space</b>
                      </div>
                      <span className="font-[family-name:var(--font-marcellus)] text-[15px] text-white/55">/ 0{idx + 1}</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#211a13] text-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
                The journey
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                From first sketch to <em className="not-italic italic font-light text-[#c9ab7c]">housewarming</em>
              </h2>
            </div>
            <p className="max-w-[430px] text-white/60 leading-[1.8] text-[15.5px] font-light">
              A structured, milestone-driven process — you always know what happens next.
            </p>
          </Reveal>

          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#f6f1e8]/15 border border-[#f6f1e8]/15">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.title} className="bg-[#211a13] hover:bg-[#2c231a] transition-colors duration-400 px-7 py-9">
                <span
                  className="font-[family-name:var(--font-marcellus)] text-[52px] block mb-5 text-transparent"
                  style={{ WebkitTextStroke: '1px #a58150' }}
                >
                  0{idx + 1}
                </span>
                <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[21px] mb-3">{step.title}</h3>
                <p className="text-[13.5px] font-light text-white/60 leading-[1.7]">{step.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal className="relative overflow-hidden aspect-[4/4.4]">
            <img src={whyImage} alt="Design and material planning" loading="lazy" className="w-full h-full object-cover" />
          </Reveal>

          <Reveal delay={120}>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Why {cleanName || 'us'}
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-6">
              The reassurance of a <em className="not-italic italic font-light text-[#a58150]">serious design house</em>
            </h2>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px] mb-7">
              Interior projects go wrong in the gaps — between designer and carpenter, quote and invoice, promise and delivery. We removed the gaps by owning every step ourselves.
            </p>
            <div>
              {whyChecks.map((check, idx) => {
                const Icon = check.icon;
                return (
                  <div key={idx} className={`flex gap-5 py-5 border-b border-[#211a13]/10 items-start ${idx === 0 ? 'border-t' : ''}`}>
                    <span className="w-10 h-10 shrink-0 border border-[#a58150] grid place-items-center">
                      <Icon className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                    </span>
                    <div>
                      <b className="font-[family-name:var(--font-marcellus)] font-normal text-[17px] block mb-1">{check.title}</b>
                      <span className="text-[13.5px] text-[#7d7264] font-light leading-[1.6]">{check.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#fdfbf6] border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
                Client stories
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                Loved by clients <em className="not-italic italic font-light text-[#a58150]">across the city</em>
              </h2>
            </div>
            <p className="max-w-[430px] text-[#7d7264] leading-[1.8] text-[15.5px] font-light">
              {rating} average on Google — the rating we guard most carefully.
            </p>
          </Reveal>

          <Reveal className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review: any, i: number) => (
              <div
                key={i}
                className="bg-[#f6f1e8] border border-[#211a13]/10 px-8 py-9 flex flex-col gap-5 transition-all duration-300 hover:border-[#a58150] hover:-translate-y-1.5"
              >
                <span className="text-[#a58150] tracking-[5px] text-[14px]">
                  {'★'.repeat(Math.max(1, Math.min(5, parseInt(String(review.rating)) || 5)))}
                </span>
                <blockquote className="font-[family-name:var(--font-marcellus)] text-[17.5px] leading-[1.65] flex-1">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3.5 border-t border-[#211a13]/10 pt-5">
                  <span className="w-[46px] h-[46px] rounded-full bg-[#211a13] text-[#c9ab7c] grid place-items-center font-[family-name:var(--font-marcellus)] text-[18px]">
                    {(review.author || 'C').charAt(0)}
                  </span>
                  <div>
                    <b className="block text-[14.5px] font-medium">{review.author || 'Happy Client'}</b>
                    <span className="text-[12px] text-[#7d7264] tracking-[0.08em]">Verified Google Review</span>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA / LEAD FORM */}
      <section id="consult" className="relative py-[clamp(84px,9vw,130px)] px-6 lg:px-7 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={ctaImage} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,18,12,0.93)_0%,rgba(24,18,12,0.78)_55%,rgba(24,18,12,0.45)_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              Begin your home
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.4vw,58px)] leading-[1.1] mb-5">
              Book a free design <em className="not-italic italic font-light text-[#c9ab7c]">consultation</em>
            </h2>
            <p className="text-white/75 font-light leading-[1.8] max-w-[460px] mb-7">
              A 45-minute session with our design team — space plan, style direction and a ballpark estimate for your home. Free, and genuinely useful even if you don&rsquo;t choose us.
            </p>
            <div className="flex flex-wrap gap-8">
              {[
                { value: '45 min', label: 'With a designer' },
                { value: '₹0', label: 'No fee, no obligation' },
                { value: '24 hrs', label: 'Response time' },
              ].map((item) => (
                <div key={item.label}>
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[26px] block text-[#c9ab7c]">{item.value}</b>
                  <span className="text-[11px] tracking-[0.24em] uppercase text-white/60">{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <LeadForm studioName={cleanName || 'the studio'} waPhone={waPhone} phoneDisplay={phone} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
