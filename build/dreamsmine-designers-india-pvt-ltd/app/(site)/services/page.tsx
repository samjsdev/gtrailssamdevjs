import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, DraftingCompass, Home, Briefcase, ShieldCheck } from 'lucide-react';
import { elevationImages, interiorProofImages, processSteps, servicePillars, walkthroughVideos, heroImages } from '@/lib/siteContent';
import VideoSequence from '../VideoSequence';
import VerticalImageCarousel from '../VerticalImageCarousel';

type PageProps = {
  params?: Promise<{ slug?: string }>;
};

const serviceHeroSlides = [
  { src: heroImages[0], title: 'Turnkey duplex construction', label: 'Premium villa' },
  { src: heroImages[1], title: 'Facade-led family homes', label: 'Exterior design' },
  { src: heroImages[2], title: 'Built with site discipline', label: 'Civil execution' },
];

export default async function ServicesPage({ params }: PageProps) {
  const resolvedParams = params ? await params : {};
  const data = await readSourceConfig(resolvedParams.slug, 'template1');
  if (!data) return notFound();

  const { business } = data;
  const basePath = '';

  return (
    <div className="min-h-screen pb-16 md:pb-24">
      {/* Hero Section — with Images */}
      <section className="border-b border-[var(--line)] bg-[var(--paper)] py-8">
        <div className="site-grid">
          <div className="grid gap-6 lg:grid-cols-[55fr_45fr] lg:items-stretch bg-[var(--paper)] p-4 sm:p-6 rounded-3xl border border-[var(--line-strong)] shadow-sm min-h-[70vh]">
            <div className="grid content-between bg-[var(--white)] p-6 md:p-10 rounded-2xl border border-[var(--line)] shadow-sm">
              <div>
                <span className="eyebrow">SERVICE SYSTEM</span>
                <h1 className="mt-5 max-w-5xl text-[2.75rem] font-black uppercase leading-[0.86] tracking-[-0.065em] sm:text-6xl">
                  One scope from drawing to delivery.
                </h1>
                <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-black/68 md:text-lg">
                  Architecture, civil construction, elevation and interiors move together. This is structured for clients who need clarity before construction starts and accountability until maintenance begins.
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href={`${basePath}/contact`} className="btn-solid rounded-xl text-center py-4 px-8">
                  Start Project Brief
                </Link>
                <Link href={`${basePath}/gallery`} className="btn-line rounded-xl text-center py-4 px-8">
                  See Built Work
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[var(--line)] shadow-sm h-full min-h-[400px]">
              <VerticalImageCarousel slides={serviceHeroSlides} />
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section — Redesigned Presentation */}
      <section className="bg-[var(--white)] py-16 md:py-24 border-b border-[var(--line)]">
        <div className="site-grid text-center max-w-4xl mx-auto mb-16">
          <span className="eyebrow">CONSTRUCTION PACKAGES</span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
            Honest pricing,<br/>No hidden costs.
          </h2>
          <p className="mt-5 text-lg font-medium leading-7 text-black/68">
            We build based on 100% Vastu. From initial 2D/3D planning to the construction materials, we take care of everything using high-quality ISI brands.
          </p>
        </div>
        <div className="site-grid">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Basic Package */}
            <div className="relative p-1 bg-[var(--paper)] border border-[var(--line-strong)] flex flex-col group rounded-3xl">
               <div className="bg-[var(--white)] p-8 md:p-12 h-full flex flex-col rounded-3xl">
                  <DraftingCompass className="h-10 w-10 text-[var(--oxide)] mb-6" />
                  <h3 className="text-3xl font-black uppercase tracking-[-0.04em] mb-2">Basic Package</h3>
                  <div className="flex items-end gap-2 mb-6 border-b border-[var(--line)] pb-6">
                    <p className="text-5xl font-black text-[var(--ink)]">₹2200</p>
                    <span className="text-sm font-bold text-black/50 tracking-normal pb-2">/ sq.ft</span>
                  </div>
                  <p className="text-base text-black/60 font-medium mb-8 flex-grow leading-relaxed">
                    Ideal for budget-friendly homes without compromising on structural integrity. Includes ISI first-quality products and 1-year free maintenance.
                  </p>
                  <ul className="space-y-4">
                    {['100% Vastu Planning', '10-Year Structural Warranty', 'Standard Finishes', 'Free Maintenance (1 Yr)'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.08em] text-[var(--ink)]">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--paper)]">
                          <CheckCircle2 className="h-4 w-4 text-[var(--oxide)]" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

            {/* Premium Package */}
            <div className="relative p-1 bg-[var(--ink)] border border-[var(--ink)] flex flex-col group shadow-2xl scale-100 md:scale-105 z-10 rounded-3xl">
               <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[var(--safety)] text-black text-[0.65rem] font-black px-4 py-2 uppercase tracking-[0.2em] shadow-lg rounded-full">Recommended</div>
               <div className="bg-[#1a1a1a] p-8 md:p-12 h-full flex flex-col rounded-[22px]">
                  <Home className="h-10 w-10 text-[var(--safety)] mb-6" />
                  <h3 className="text-3xl font-black uppercase tracking-[-0.04em] mb-2 text-white">Premium Package</h3>
                  <div className="flex items-end gap-2 mb-6 border-b border-white/10 pb-6">
                    <p className="text-5xl font-black text-white">₹2400</p>
                    <span className="text-sm font-bold text-white/50 tracking-normal pb-2">/ sq.ft</span>
                  </div>
                  <p className="text-base text-white/60 font-medium mb-8 flex-grow leading-relaxed">
                    For luxury homes and villas requiring premium fixtures, advanced electricals, and upgraded architectural elements.
                  </p>
                  <ul className="space-y-4">
                    {['Premium ISI Brands', 'Free 3D Elevation', '50+ Quality Checks', 'Advanced Electricals'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.08em] text-white">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                          <CheckCircle2 className="h-4 w-4 text-[var(--safety)]" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services — Each Service Gets a Section */}
      <div className="bg-[var(--paper)] pt-16 pb-8 border-b border-[var(--line)]">
         <div className="site-grid text-center">
            <span className="eyebrow">CORE SERVICES DEEP DIVE</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em] leading-[0.9]">Everything under one scope</h2>
         </div>
      </div>

      {servicePillars.map((service, index) => (
        <section key={service.title} className="bg-[var(--paper)] py-16 md:py-24 border-b border-[var(--line)]">
          <div className="site-grid">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
              <div className={`order-2 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                 <div className="image-box aspect-[4/3] w-full relative">
                    <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" unoptimized />
                    <div className="absolute top-4 left-4 bg-[var(--white)] text-[var(--ink)] text-xl font-black py-2 px-4 shadow-md">
                       0{index + 1}
                    </div>
                 </div>
              </div>
              <div className={`order-1 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--oxide)] mb-4">{service.eyebrow}</p>
                <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.95] tracking-[-0.05em] mb-6">{service.title}</h3>
                <p className="text-lg font-medium leading-relaxed text-black/68 mb-8">{service.summary}</p>
                <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--line-strong)]">
                  {service.proof.map((item) => (
                    <p key={item} className="flex gap-3 text-sm font-black uppercase tracking-[0.08em] text-[var(--ink)] items-center">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--oxide)]" />
                      {item}
                    </p>
                  ))}
                </div>
                <div className="mt-10">
                   <Link href={`${basePath}/contact`} className="btn-line py-3 px-6 rounded-xl">
                     Enquire about this service
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Interior Offers — dark strip */}
      <section className="bg-[var(--ink)] text-[var(--white)] py-16 md:py-24 border-b border-[var(--line)] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.07] hidden lg:block pointer-events-none">
           <Image src="/images/all/interior-promos/promo-01.webp" alt="Interior" fill className="object-cover" unoptimized />
        </div>

        <div className="site-grid relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
            <div>
              <span className="inline-block bg-[var(--safety)] text-black px-3 py-1 text-xs font-black uppercase tracking-[0.2em] mb-6 rounded-full">Biggest Festival Offers</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[-0.05em] leading-[0.9] mb-8">
                Chennai's Leading <br/><span className="text-[var(--oxide)]">Interiors</span>
              </h2>
              <p className="text-base font-medium leading-7 text-white/60 max-w-xl">
                Commercial interiors including meeting rooms, workstations, and functional office setups. Residential interiors covering luxury living rooms, stylish kitchens, false ceilings, and wardrobes.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <Link href={`${basePath}/gallery`} className="flex items-center gap-3 border border-white/16 bg-white/5 px-5 py-3 font-bold uppercase text-xs tracking-[0.1em] rounded-xl hover:bg-white/10 transition-colors">
                  <Briefcase className="h-4 w-4 text-[var(--oxide)]" />
                  Commercial Spaces
                </Link>
                <Link href={`${basePath}/gallery`} className="flex items-center gap-3 border border-white/16 bg-white/5 px-5 py-3 font-bold uppercase text-xs tracking-[0.1em] rounded-xl hover:bg-white/10 transition-colors">
                  <Home className="h-4 w-4 text-[var(--oxide)]" />
                  Residential Interiors
                </Link>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="dark-panel p-6 md:p-8 hover:bg-[#1a1a1a] transition-colors rounded-3xl">
                <h3 className="text-3xl font-black uppercase text-[var(--safety)] mb-2">Flat 40% Off</h3>
                <p className="text-lg font-bold mb-4">Home Interior Packages</p>
                <ul className="space-y-3 border-t border-white/10 pt-4">
                  <li className="flex gap-3 items-center text-sm"><CheckCircle2 className="h-4 w-4 text-[var(--oxide)]" /> Starting from 1.5 Lakhs</li>
                  <li className="flex gap-3 items-center text-sm"><CheckCircle2 className="h-4 w-4 text-[var(--oxide)]" /> Free Chimney with Modular Kitchens</li>
                  <li className="flex gap-3 items-center text-sm"><CheckCircle2 className="h-4 w-4 text-[var(--oxide)]" /> 10-Year Material Warranty</li>
                </ul>
              </div>

              <div className="dark-panel p-6 md:p-8 hover:bg-[#1a1a1a] transition-colors rounded-3xl">
                <h3 className="text-3xl font-black uppercase text-[var(--safety)] mb-2">Flat 25% Off</h3>
                <p className="text-lg font-bold mb-4">Standard Home Interiors</p>
                <ul className="space-y-3 border-t border-white/10 pt-4">
                  <li className="flex gap-3 items-center text-sm"><CheckCircle2 className="h-4 w-4 text-[var(--oxide)]" /> Easy EMI Options</li>
                  <li className="flex gap-3 items-center text-sm"><CheckCircle2 className="h-4 w-4 text-[var(--oxide)]" /> Fast Execution & Booking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exterior & Civil Proof */}
      <section className="bg-[var(--paper)] py-16 md:py-24 border-b border-[var(--line)]">
        <div className="site-grid">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-start">
            <div>
              <span className="eyebrow">CONSTRUCTION INCLUSIONS</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em] leading-[0.9] mb-6">What your build package must clarify.</h2>
              <p className="text-base font-medium leading-relaxed text-black/68 mb-10">
                The package makes technical inclusions visible: planning, waterproofing, anti-termite, tanks, tiles, modular kitchen and handover maintenance. No vague contractor handoff.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-[var(--line-strong)] pt-8">
                {(business.constructionIncludes || []).map((item: string) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-black/80 border-b border-[var(--line)] pb-3">
                    <CheckCircle2 className="h-4 w-4 text-[var(--oxide)] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {elevationImages.slice(0, 4).map((image, index) => (
                <div key={image} className="image-box aspect-[4/3] group rounded-2xl">
                  <Image src={image} alt={`Exterior elevation ${index + 1}`} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition duration-500" unoptimized />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process / Method */}
      <section className="bg-[var(--white)] py-16 md:py-24 border-b border-[var(--line)]">
        <div className="site-grid">
          <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[0.5fr_1fr]">
            <div>
              <span className="eyebrow">PROJECT PATH</span>
              <h2 className="mt-4 text-5xl font-black uppercase tracking-[-0.05em] leading-[0.9]">A clear path<br/>to handover.</h2>
            </div>
            <div className="flex flex-col justify-end">
              <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">Each phase has an output clients can approve.</h3>
              <p className="mt-3 text-lg font-medium text-black/68">
                This keeps decisions structured and prevents construction ambiguity.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-0 md:grid-cols-4 border-l border-[var(--line-strong)]">
            {processSteps.map((step) => (
              <div key={step.step} className="group border-r border-b border-[var(--line-strong)] p-6 md:p-8 hover:bg-[var(--paper)] transition-colors">
                <p className="text-5xl font-black tracking-[-0.06em] text-[var(--concrete)] group-hover:text-[var(--oxide)] transition-colors select-none">{step.step}</p>
                <h3 className="mt-4 text-lg font-black uppercase leading-snug tracking-[-0.04em] text-[var(--ink)]">{step.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-black/60">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href={`${basePath}/contact`} className="btn-solid rounded-xl px-10 py-4 text-lg">
              Request Service Scope
              <ArrowRight className="h-5 w-5 ml-2 inline" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
