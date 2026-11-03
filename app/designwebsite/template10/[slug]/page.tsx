import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Plus, ExternalLink } from 'lucide-react';
import { cleanClinicName, cleanArchitectureTagline, cleanArchitectureDescription } from '@/lib/copyCleaner';
import { ARCHITECTURE_STOCK } from '@/lib/architectureContent';
import DisciplinesShowcase from './DisciplinesShowcase';
import CuratedWorks from './CuratedWorks';
import BeforeAfter from './BeforeAfter';
import HeroScroll from './HeroScroll';
import Reveal from './Reveal';
import ScrollParallax from './ScrollParallax';
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['300', '400', '500'] });

type PageProps = {
  params: Promise<{ slug: string }>;
};

const PUBLICATIONS = [
  {
    tag: "HARPER'S BAZAAR",
    title: 'Set the tone',
    image: '/images/architecture/cantilever-garden-overhang.webp',
  },
  {
    tag: 'FORBES',
    title: 'My Startup My Right',
    image: '/images/architecture/monolithic-brutalist-facade.webp',
  },
  {
    tag: 'ELLE DECOR',
    title: 'Design trends 2025',
    image: '/images/architecture/living-room-double-height.webp',
  },
  {
    tag: 'VOGUE',
    title: 'Flawless Craftsmanship Stunning Spaces',
    image: '/images/architecture/courtyard-water-residence.webp',
  },
  {
    tag: 'AD',
    title: 'Architectural Digest',
    image: '/images/architecture/hero-villa-twilight.webp',
  },
  {
    tag: 'GQ',
    title: 'Slow Burn',
    image: '/images/architecture/modern-villa-duplex.webp',
  },
];

export default async function Template10Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template10/${slug}`;

  const data = await readSourceConfig(slug, 'template10');
  if (!data) return notFound();

  const { clinic, business, doctor } = data;

  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const tagline = cleanArchitectureTagline(clinic.tagline);
  const phone = clinic.contact?.phone || '+91 93103 59993';
  const doctorName = doctor?.name || 'Aparna Kaushik';

  return (
    <div className="bg-white text-black">
      {/* 1. hp_sec1: CINEMATIC FULLSCREEN HERO WITH SCROLL PARALLAX */}
      <HeroScroll cleanName={cleanName} />

      {/* 2. hp_sec2: BRAND STORY (Aparna Kaushik Signature Layout) */}
      <section className="py-24 sm:py-32 bg-white text-black border-b border-[#e5e5e5]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <Reveal direction="up" delay={0}>
                <span className={`${montserrat.className} text-[11px] tracking-[0.25em] uppercase text-[#888888] font-semibold block mb-3`}>
                  Brand Story
                </span>

                <h2
                  className={`${montserrat.className} text-[32px] sm:text-[44px] md:text-[50px] uppercase font-light tracking-[0.05em] text-black leading-[1.15]`}
                >
                  &ldquo;Designing a home is like drawing a portrait of your client&rdquo;
                </h2>
              </Reveal>

              <Reveal direction="up" delay={120}>
                <div className="mt-8 space-y-4">
                  <p className={`${montserrat.className} text-[12px] tracking-[0.25em] uppercase font-semibold text-black`}>
                    Know Us Better
                  </p>
                  <p className="text-[17px] sm:text-[19px] text-[#555555] font-light">
                    Iconic Architecture · Interior Design · Turnkey Civil Execution
                  </p>
                  <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed max-w-xl pt-2">
                    The House of {cleanName || 'Aparna Kaushik'} is a fingerprint of the discerning visionary behind its inception. The firm manifests an academically informed canon of work that blends classical proportions with modernist tropical architecture and precision engineering.
                  </p>
                </div>

                <div className="mt-10">
                  <Link
                    href={`${basePath}/about`}
                    className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold text-black hover:text-[#7d3333] transition-colors border-b border-black pb-1 hover:border-[#7d3333]"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Portrait Image */}
            <div className="lg:col-span-5">
              <Reveal direction="curtain" delay={80} duration={1.1}>
                <ScrollParallax speed={0.14} className="aspect-[3/4] w-full bg-[#f7f7f7]">
                  <Image
                    src="/images/architecture/cantilever-garden-overhang.webp"
                    alt="Brand Story Architecture"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </ScrollParallax>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. hp_sec3: PRINCIPAL ARCHITECT (Aparna Kaushik Signature Layout) */}
      <section className="py-24 sm:py-32 bg-white text-black border-b border-[#e5e5e5]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <Reveal direction="up" delay={0}>
                <span className={`${montserrat.className} text-[11px] tracking-[0.25em] uppercase text-[#888888] font-semibold block mb-3`}>
                  Principal Architect
                </span>

                <h2
                  className={`${montserrat.className} text-[32px] sm:text-[44px] md:text-[50px] uppercase font-light tracking-[0.05em] text-black leading-[1.15]`}
                >
                  &ldquo;My designs are sincere, natural and unforced!&rdquo;
                </h2>
              </Reveal>

              <Reveal direction="up" delay={120}>
                <div className="mt-8 space-y-4">
                  <p className="text-[14.5px] sm:text-[15.5px] text-[#555555] leading-relaxed max-w-xl">
                    For me, design is everything. Clarity of purpose and simplicity of line; purity of form and obsessive attention to detail. I strive for perfection.
                  </p>
                  <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed max-w-xl">
                    {cleanName || 'Aparna Kaushik'} is one of the leading designers and builders of ultra-luxury estate homes of all scales and lifestyle creations across India, the UAE, and the world.
                  </p>
                </div>

                <div className="mt-10">
                  <Link
                    href={`${basePath}/about`}
                    className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold text-black hover:text-[#7d3333] transition-colors border-b border-black pb-1 hover:border-[#7d3333]"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Portrait Image */}
            <div className="lg:col-span-5">
              <Reveal direction="curtain" delay={80} duration={1.1}>
                <ScrollParallax speed={0.14} className="aspect-[3/4] w-full bg-[#f7f7f7]">
                  <Image
                    src="/images/architecture/principal-architect.webp"
                    alt={doctorName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </ScrollParallax>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. hp_sec4 + hp_sec5: SERVICES (Interactive Full-Width Hover Experience) */}
      <DisciplinesShowcase basePath={basePath} />

      {/* 5. hp_sec7: FEATURED WORKS (Asymmetrical Editorial Grid) */}
      <CuratedWorks basePath={basePath} />

      {/* 6. BEFORE & AFTER TRANSFORMATION SLIDER (Civil & Architecture Specialization) */}
      <BeforeAfter />

      {/* 7. hp_sec8: LATEST INSIGHT / PUBLICATIONS CAROUSEL */}
      <section className="py-24 bg-white text-black border-t border-[#e5e5e5]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          <Reveal direction="up">
            <div className="flex items-baseline justify-between mb-12 border-b border-black pb-8">
              <h2 className={`${montserrat.className} text-[36px] sm:text-[48px] uppercase font-light tracking-[0.06em] text-black`}>
                Latest Insight
              </h2>
              <Link
                href={`${basePath}/gallery`}
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold text-black hover:text-[#7d3333] transition-colors"
              >
                <span>View More Publications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PUBLICATIONS.map((pub, idx) => (
              <Reveal key={pub.tag} direction="up" delay={idx * 80}>
                <div className="group border border-[#e5e5e5] p-6 hover:border-black transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5]">
                      <span className={`${montserrat.className} text-[11px] tracking-[0.2em] uppercase font-semibold text-black`}>
                        {pub.tag}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <h3 className={`${montserrat.className} text-[18px] uppercase font-light tracking-[0.06em] text-black mt-4 leading-snug`}>
                      {pub.title}
                    </h3>
                  </div>

                  <div className="relative aspect-[16/10] w-full mt-6 overflow-hidden bg-[#f7f7f7]">
                    <Image
                      src={pub.image}
                      alt={pub.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. hp_sec9: THE MONUMENTAL LEGACY BANNER (Exact text from aparnakaushik.com) */}
      <section className="py-24 sm:py-32 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 text-center flex flex-col items-center">
          <Reveal direction="scale" duration={1.0}>
            <h2
              className={`${montserrat.className} text-[26px] sm:text-[38px] md:text-[46px] uppercase font-light tracking-[0.08em] text-white leading-[1.25] max-w-4xl`}
            >
              A legacy of 300+ ultra-luxury residences delivered across India, the UAE, and the world.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={200}>
            <div className="mt-10">
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold hover:bg-[#7d3333] hover:text-white transition-all duration-300 shadow-xl group"
              >
                <span>Let&rsquo;s connect</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
