import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, DraftingCompass, HardHat, ShieldCheck } from 'lucide-react';
import {
  elevationImages,
  heroImages,
  materialBrands,
  processSteps,
  servicePillars,
  trustMarkers,
  villaShowcase,
  walkthroughVideos,
  homePackageInclusions,
  brandVideos,
} from '@/lib/siteContent';
import VerticalImageCarousel from './VerticalImageCarousel';
import VideoSequence from './VideoSequence';
import VerticalVideoCarousel from './VerticalVideoCarousel';

type PageProps = {
  params?: Promise<{ slug?: string }>;
};

const heroSlides = [
  { src: heroImages[0], title: 'Turnkey duplex construction', label: 'Premium villa' },
  { src: heroImages[1], title: 'Facade-led family homes', label: 'Exterior design' },
  { src: heroImages[2], title: 'Built with site discipline', label: 'Civil execution' },
  { src: heroImages[3], title: 'Vastu planned residences', label: 'Planning' },
];

export default async function HomePage({ params }: PageProps) {
  const resolvedParams = params ? await params : {};
  const data = await readSourceConfig(resolvedParams.slug, 'template1');
  if (!data) return notFound();

  const { clinic, business, reviews } = data;
  const basePath = '';

  return (
    <div>
      <section className="border-b border-[var(--line)] bg-[var(--paper)] py-8">
        <div className="site-grid">
          <div className="grid gap-6 lg:grid-cols-[65fr_35fr] lg:items-stretch bg-[var(--paper)] p-4 sm:p-6 rounded-3xl border border-[var(--line-strong)] shadow-sm min-h-[75vh] lg:min-h-[85vh]">
            <div className="grid content-between bg-[var(--white)] p-6 md:p-10 rounded-2xl border border-[var(--line)] shadow-sm">
              <div>
                <span className="eyebrow">Dreamsmine Designers India Pvt Ltd</span>
                <h1 className="mt-5 max-w-5xl break-words text-[2.75rem] font-black uppercase leading-[0.86] tracking-[-0.065em] sm:text-6xl md:text-7xl">
                  Infra Developers<br />And Interior Designers
                </h1>
                <h2 className="mt-5 text-xl font-black uppercase tracking-[-0.03em] text-[var(--oxide)] sm:text-2xl">
                  Architecture, civil work and interiors
                </h2>
                <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-black/68 md:text-lg md:leading-8">
                  We are a Chennai-based design-build company for homeowners who want all key services managed by one accountable team.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { value: '15+', label: 'Years Experience' },
                  { value: '200+', label: 'Projects Built' },
                  { value: 'ISO 9001', label: 'Certified' },
                  { value: '100%', label: 'Vastu Planned' }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center justify-center border border-[var(--line-strong)] bg-[var(--white)] py-6 px-4 rounded-2xl hover:bg-[var(--paper)] transition-all shadow-sm group">
                    <span className="text-3xl sm:text-4xl font-black uppercase tracking-[-0.04em] text-[var(--ink)] group-hover:text-[var(--oxide)] transition-colors">{stat.value}</span>
                    <span className="mt-2 text-[0.65rem] sm:text-[0.7rem] font-black uppercase tracking-[0.15em] text-black/50 text-center leading-tight">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 h-full">
              <div className="rounded-2xl overflow-hidden border border-[var(--line)] shadow-sm flex-1 relative min-h-[350px]">
                <VerticalImageCarousel slides={heroSlides} />
              </div>
              
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`${basePath}/contact`} className="btn-solid rounded-xl text-center py-4 flex-1">
                  Start Project Brief
                </Link>
                <Link href={`${basePath}/gallery`} className="btn-line rounded-xl text-center py-4 flex-1">
                  See Built Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="bg-[var(--white)] py-16 md:py-24 border-b border-[var(--line)] overflow-hidden">
        <div className="site-grid">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            
            <div className="relative order-last lg:order-first h-full">
              <VerticalImageCarousel slides={[
                { src: "/images/all/premium-villas/villa-09.webp", title: "Contemporary Duplex", label: "Completed Build" },
                { src: "/images/all/premium-villas/villa-04.webp", title: "Compact Urban Villa", label: "Vastu Planned" },
                { src: "/images/all/premium-villas/villa-06.webp", title: "Premium Residence", label: "Turnkey Execution" },
              ]} />
              
              <div className="absolute top-4 right-4 z-20 bg-[var(--white)] rounded-full h-20 w-20 flex items-center justify-center shadow-xl border border-[var(--line-strong)] hidden sm:flex">
                 <div className="text-center">
                   <p className="text-xl font-black uppercase leading-none">ISO</p>
                   <p className="mt-1 text-[0.45rem] font-black uppercase tracking-[0.2em] text-[var(--oxide)]">9001</p>
                 </div>
              </div>
            </div>

            <div className="order-first lg:order-last flex flex-col justify-center">
              <div>
                <span className="inline-block bg-[var(--safety)] text-black px-3 py-1 text-xs font-black uppercase tracking-[0.2em] mb-5">Limited Time Offer</span>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                  Quality Homes<br />
                  <span className="text-[var(--oxide)]">Honest Price</span>
                </h2>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4 items-end">
                <div className="bg-[var(--ink)] text-white p-6 md:p-8">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-white/60">Our Price / Just</p>
                  <p className="mt-1 text-5xl sm:text-6xl font-black uppercase tracking-[-0.04em]">Rs.2200<span className="text-xl">/sqft</span></p>
                </div>
                <div className="flex flex-col gap-3 p-5 md:p-6 border border-[var(--line-strong)]">
                   <p className="text-2xl font-black uppercase tracking-[-0.02em]">Build With Us</p>
                   <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--oxide)] flex items-center gap-2">
                     <DraftingCompass className="h-4 w-4" /> 100% Vastu Plan
                   </p>
                </div>
              </div>

              <div className="mt-10">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-black/50 mb-5">Package Inclusions</p>
                <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                  {homePackageInclusions.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 border-b border-[var(--line)] pb-3">
                      <CheckCircle2 className="h-5 w-5 text-[var(--oxide)] shrink-0" />
                      <span className="text-sm font-black uppercase tracking-[0.05em]">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href={`${basePath}/services`} className="btn-solid rounded-xl px-8 py-4 inline-flex">
                    View Full Packages
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 overflow-hidden border-b border-[var(--line)] bg-[var(--white)]">
        <div className="site-grid mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="eyebrow">PROJECT GALLERY</span>
            <h2 className="section-heading mt-4">Built with precision</h2>
          </div>
          <Link href={`${basePath}/gallery`} className="btn-line rounded-xl px-6 py-3 shrink-0">
            View Full Portfolio
          </Link>
        </div>
        
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="site-grid text-lg sm:text-xl font-bold uppercase tracking-widest text-[var(--black)] opacity-60">Completed Projects</h3>
            <div className="marquee-track flex w-max gap-6">
            {[...elevationImages, ...elevationImages].map((img, i) => (
              <div key={i} className="relative aspect-[3/4] w-[350px] md:w-[420px] shrink-0 border border-[var(--line)] bg-[var(--concrete)]">
                <Image src={img} alt="Exterior Elevation" fill className="object-cover" unoptimized />
              </div>
            ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="site-grid text-lg sm:text-xl font-bold uppercase tracking-widest text-[var(--black)] opacity-60">Ongoing Projects</h3>
            <div className="marquee-track-reverse flex w-max gap-6">
            {[
              "/images/all/premium-villas/villa-01.webp",
              "/images/all/premium-villas/villa-02.webp",
              "/images/all/premium-villas/villa-03.webp",
              "/images/all/premium-villas/villa-04.webp",
              "/images/all/premium-villas/villa-06.webp",
              "/images/all/premium-villas/villa-07.webp",
              "/images/all/premium-villas/villa-01.webp",
              "/images/all/premium-villas/villa-02.webp",
              "/images/all/premium-villas/villa-03.webp",
              "/images/all/premium-villas/villa-04.webp",
              "/images/all/premium-villas/villa-06.webp",
              "/images/all/premium-villas/villa-07.webp",
            ].map((img, i) => (
              <div key={i} className="relative aspect-[3/4] w-[350px] md:w-[420px] shrink-0 border border-[var(--line)] bg-[var(--concrete)]">
                <Image src={img} alt="Premium Villa" fill className="object-cover" unoptimized />
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <VerticalVideoCarousel videos={brandVideos} />

      <section className="bg-[var(--paper)] py-16 md:py-24">
        <div className="site-grid">
          <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr] lg:items-start">
            
            <div className="md:sticky md:top-24">
              <span className="eyebrow">SERVICES MATRIX</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em] leading-[0.9]">Everything needed to make a perfect home at one place</h2>
              <h3 className="mt-6 text-xl font-black uppercase tracking-[-0.03em] text-[var(--oxide)]">Plan, visualize, build and delivery</h3>
              <p className="section-subheading mt-4">
                Four compact service pillars cover the complete journey from Vastu planning to exterior elevation, civil execution and interior fit-out.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {servicePillars.map((service, index) => (
                <Link key={service.title} href={`${basePath}/services`} className="group panel block overflow-hidden bg-[var(--white)] hover:border-[var(--ink)] transition-colors">
                  <div className="image-box aspect-square border-x-0 border-t-0">
                    <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" unoptimized />
                  </div>
                  <div className="p-6">
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--oxide)]">0{index + 1} / {service.eyebrow}</p>
                    <h3 className="mt-3 text-2xl font-black uppercase leading-[0.95] tracking-[-0.05em]">{service.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-black/62">{service.summary}</p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      <section className="bg-[var(--concrete)] py-20 md:py-32">
        <div className="site-grid">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-[var(--oxide)]"></div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--oxide)]">Premium Materials</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.95]">
                Uncompromising Quality <br className="hidden md:block"/> In Every Detail
              </h2>
            </div>
            <div className="max-w-sm flex flex-col items-start gap-6">
              <p className="text-sm md:text-base font-medium leading-relaxed text-black/60 border-l-2 border-[var(--line-strong)] pl-6">
                For all the buildings we have constructed so far, we have exclusively used ISI-certified, first-quality products to ensure generational durability.
              </p>
              <Link href={`${basePath}/about`} className="btn-line rounded-xl px-6 py-3 ml-6">
                Learn About Our Standards
              </Link>
            </div>
          </div>
          
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-[var(--line-strong)]">
            {[
              { name: "UltraTech Cement", logo: "/images/all/logos/ultratechlogo.png" },
              { name: "Asian Paints", logo: "/images/all/logos/asianpaintslogo.jpeg" },
              { name: "KAG Tiles", logo: "/images/all/logos/kagtileslogo.jpeg" },
              { name: "ARS 550 D TMT", logo: "/images/all/logos/arssteel.png" },
              { name: "Parryware", logo: "/images/all/logos/parryware.png" },
              { name: "Legrand", logo: "/images/all/logos/legrand.png" },
              { name: "Godrej Locks", logo: "/images/all/logos/godrej.png", scale: "scale-[1.35]" },
              { name: "Orbit Wires", logo: "/images/all/logos/orbit.png" },
              { name: "Finolex Pipes", logo: "/images/all/logos/finolexpipes.jpeg" },
              { name: "Premium Assured", logo: null }
            ].map((brand, i) => (
              <div key={brand.name} className="group flex flex-col items-center justify-center p-6 sm:p-8 border-r border-b border-[var(--line-strong)] bg-[var(--white)] min-h-[150px] sm:min-h-[200px] h-full transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:z-10 relative">
                {brand.logo ? (
                  <>
                    <div className="relative h-20 sm:h-24 w-full mb-4 sm:mb-6 transition-transform duration-500 group-hover:scale-110">
                      <div className={`relative w-full h-full ${brand.scale || ''}`}>
                        <Image src={brand.logo} alt={brand.name} fill className="object-contain mix-blend-darken" unoptimized />
                      </div>
                    </div>
                    <h3 className="text-[0.55rem] sm:text-[0.65rem] font-black uppercase tracking-[0.15em] text-black/40 group-hover:text-[var(--oxide)] transition-colors duration-500 text-center">
                      {brand.name}
                    </h3>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShieldCheck className="h-8 w-8 text-[var(--oxide)] mb-3 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.1em] text-black">100% Quality</p>
                    <p className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-black/50">Guaranteed</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)] py-16 md:py-24 border-b border-[var(--line)]">
        <div className="site-grid">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
            
            <div className="max-w-2xl">
              <span className="eyebrow text-[var(--oxide)]">PROJECT ESTIMATE</span>
              <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[-0.04em] leading-[1.05]">
                Transparent Pricing,<br/>No Hidden Costs
              </h2>
              <p className="mt-6 text-base md:text-lg text-black/70 leading-relaxed font-medium">
                Fill out the brief form to receive a detailed, line-item quotation for your dream home. Our design-build experts will get back to you with a clear cost breakdown based on your plot size and requirements.
              </p>
              
              <div className="mt-10 grid gap-6 sm:grid-cols-2 border-t border-[var(--line)] pt-10">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-[-0.02em] text-[var(--oxide)]">01 / Share Details</h3>
                  <p className="mt-2 text-sm text-black/60 font-medium">Tell us about your plot size, location, and family requirements.</p>
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-[-0.02em] text-[var(--oxide)]">02 / Get Estimate</h3>
                  <p className="mt-2 text-sm text-black/60 font-medium">Receive a transparent quotation covering civil work to interiors.</p>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center border border-[var(--line-strong)] bg-[var(--white)] p-2 md:p-6 rounded-3xl shadow-xl relative">
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdsYUIz-6IWzBpZXEpOIrAiVt1iiD8lRr3Gto5o7zjz0Ubq8Q/viewform?embedded=true" width="640" height="826" frameBorder="0" marginHeight={0} marginWidth={0} className="w-full max-w-[640px] min-h-[1200px] md:min-h-[850px] rounded-xl bg-transparent">Loading…</iframe>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
