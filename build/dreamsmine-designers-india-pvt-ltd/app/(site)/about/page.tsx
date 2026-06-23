import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, ClipboardCheck, HardHat, ShieldCheck, Ruler, Wrench, CheckCircle2 } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { materialBrands, processSteps, trustMarkers } from '@/lib/siteContent';

type PageProps = {
  params?: Promise<{ slug?: string }>;
};

export default async function AboutPage({ params }: PageProps) {
  const resolvedParams = params ? await params : {};
  const data = await readSourceConfig(resolvedParams.slug, 'template1');
  if (!data) return notFound();

  const { clinic, doctor } = data;
  const cleanName = cleanClinicName(clinic.name) || 'Dreamsmine Builders';
  const basePath = '';

  return (
    <div className="min-h-screen pb-16 md:pb-24">
      {/* Hero Section */}
      <section className="border-b border-[var(--line)] bg-[var(--white)] py-16 md:py-24">
        <div className="site-grid">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="eyebrow text-[var(--oxide)]">COMPANY OVERVIEW</span>
              <h1 className="mt-5 max-w-5xl text-[2.75rem] font-black uppercase leading-[0.86] tracking-[-0.065em] sm:text-6xl md:text-7xl">
                Infra Developers &<br />Interior Designers.
              </h1>
              <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-black/68 md:text-lg md:leading-8">
                {cleanName} is a premier construction and interior design firm in Chennai. With 15 years of industry experience, we specialize in delivering budget-friendly, high-quality residential and commercial spaces from the ground up.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link href={`${basePath}/contact`} className="btn-solid rounded-sm text-center py-4 px-8">
                Start Your Project
                <ArrowRight className="h-4 w-4 ml-1 inline" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Legacy Strip */}
      <section className="bg-[var(--ink)] text-[var(--white)] border-b border-[var(--line)] py-12">
        <div className="site-grid">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
              <div className="flex flex-col items-center justify-center text-center px-4">
                 <p className="text-5xl font-black uppercase tracking-[-0.05em] text-[var(--safety)]">15+</p>
                 <p className="mt-2 text-xs font-black uppercase tracking-[0.15em] text-white/60">Years Experience</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-4">
                 <p className="text-5xl font-black uppercase tracking-[-0.05em] text-[var(--safety)]">200+</p>
                 <p className="mt-2 text-xs font-black uppercase tracking-[0.15em] text-white/60">Successful Projects</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-4">
                 <p className="text-5xl font-black uppercase tracking-[-0.05em] text-[var(--safety)]">ISO</p>
                 <p className="mt-2 text-xs font-black uppercase tracking-[0.15em] text-white/60">9001 Certified</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-4">
                 <p className="text-5xl font-black uppercase tracking-[-0.05em] text-[var(--safety)]">100%</p>
                 <p className="mt-2 text-xs font-black uppercase tracking-[0.15em] text-white/60">Vastu Compliant</p>
              </div>
           </div>
        </div>
      </section>

      {/* Leadership & Philosophy Section */}
      <section className="bg-[var(--paper)] py-16 md:py-24 border-b border-[var(--line)]">
        <div className="site-grid">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:items-stretch">
            <div className="relative overflow-hidden border border-[var(--line-strong)] shadow-sm min-h-[400px] lg:min-h-[500px]">
              <Image src="/images/all/premium-villas/villa-06.webp" alt="Completed Dreamsmine villa exterior" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority unoptimized />
            </div>
            <div className="flex flex-col h-full gap-6">
              <div className="flex-1 panel p-8 md:p-12 flex flex-col justify-center">
                <span className="eyebrow text-[var(--oxide)]">LEADERSHIP</span>
                <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em]">{doctor.name || 'G. Thirumurugan'}</h2>
                <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-black/50 mt-1 mb-6">Director</p>
                <p className="text-base font-medium leading-relaxed text-black/70 mb-4">
                  Under his leadership, Dreamsmine Designers India Pvt Ltd has grown into a trusted name in Chennai's construction landscape. Our mission is to bridge the gap between structural integrity and luxurious interiors without compromising on honest pricing.
                </p>
                <p className="text-base font-medium leading-relaxed text-black/70">
                  By managing both civil execution and turnkey interiors, we eliminate contractor ambiguity and deliver a seamless handover experience.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="dark-panel p-8">
                  <Ruler className="h-8 w-8 text-[var(--safety)] mb-4" />
                  <h3 className="text-xl font-black uppercase text-white mb-2">Vastu Engineering</h3>
                  <p className="text-sm font-medium text-white/60 leading-6">Every foundation and floor plan we construct is 100% Vastu aligned from day one.</p>
                </div>
                <div className="dark-panel p-8">
                  <ShieldCheck className="h-8 w-8 text-[var(--safety)] mb-4" />
                  <h3 className="text-xl font-black uppercase text-white mb-2">Quality Assured</h3>
                  <p className="text-sm font-medium text-white/60 leading-6">We conduct 50+ quality checks and provide a 10-year warranty for structural elements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Material & Quality Standards */}
      <section className="bg-[var(--white)] py-16 md:py-24 border-b border-[var(--line)]">
         <div className="site-grid">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center">
               <div>
                  <span className="eyebrow">QUALITY STANDARDS</span>
                  <h2 className="mt-4 text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em] leading-[0.9]">
                    We build with recognizable brands.
                  </h2>
                  <p className="mt-6 text-lg font-medium leading-7 text-black/68">
                    To ensure the generational durability of your dream home or commercial space, we never compromise on our supply chain. All our projects exclusively utilize ISI-certified, first-quality products.
                  </p>
                  
                  <ul className="mt-10 space-y-4 border-t border-[var(--line-strong)] pt-8">
                    <li className="flex items-center gap-3">
                       <CheckCircle2 className="h-5 w-5 text-[var(--oxide)]" />
                       <span className="text-sm font-black uppercase tracking-[0.05em]">10-Year Structural Warranty</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <CheckCircle2 className="h-5 w-5 text-[var(--oxide)]" />
                       <span className="text-sm font-black uppercase tracking-[0.05em]">1-Year Free Maintenance Service</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <CheckCircle2 className="h-5 w-5 text-[var(--oxide)]" />
                       <span className="text-sm font-black uppercase tracking-[0.05em]">Free 2D / 3D Elevation Designs</span>
                    </li>
                  </ul>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-3 border-l border-t border-[var(--line-strong)]">
                  {[
                    { name: "UltraTech Cement", logo: "/images/all/logos/ultratechlogo.png" },
                    { name: "Asian Paints", logo: "/images/all/logos/asianpaintslogo.jpeg" },
                    { name: "KAG Tiles", logo: "/images/all/logos/kagtileslogo.jpeg" },
                    { name: "ARS 550D TMT", logo: "/images/all/logos/arssteel.png" },
                    { name: "Parryware", logo: "/images/all/logos/parryware.png" },
                    { name: "Legrand", logo: "/images/all/logos/legrand.png" },
                    { name: "Godrej Locks", logo: "/images/all/logos/godrej.png", scale: "scale-[1.7]" },
                    { name: "Finolex Pipes", logo: "/images/all/logos/finolexpipes.jpeg" },
                    { name: "Orbit Wires", logo: "/images/all/logos/orbit.png" }
                  ].map((brand, i) => (
                    <div key={i} className="flex flex-col items-center justify-center p-8 border-r border-b border-[var(--line-strong)] bg-[var(--paper)] min-h-[150px] sm:min-h-[200px] h-full hover:bg-[var(--white)] transition-colors group relative overflow-hidden">
                      <Image src={brand.logo} alt={brand.name} width={120} height={80} className={`object-contain h-10 md:h-14 w-auto mix-blend-multiply opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 ${brand.scale || ''}`} unoptimized />
                      <span className="sr-only">{brand.name}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Comprehensive Services Overview */}
      <section className="bg-[var(--paper)] py-16 md:py-24 border-b border-[var(--line)]">
        <div className="site-grid">
          <div className="mb-16 max-w-4xl">
            <span className="eyebrow">OUR EXPERTISE</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em] leading-[0.9]">
              Complete project delivery under one roof.
            </h2>
            <p className="mt-5 text-lg font-medium leading-8 text-black/68">
              From individual villas to commercial complexes and luxury interior setups, our team handles every aspect of development.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="panel p-8 lg:p-10 hover:border-[var(--ink)] transition-colors flex flex-col">
              <HardHat className="h-10 w-10 text-[var(--oxide)] mb-6" />
              <h3 className="text-2xl font-black uppercase tracking-[-0.04em] mb-4">Civil Construction</h3>
              <p className="text-sm font-medium leading-relaxed text-black/62 flex-grow mb-6">
                We execute budget-friendly to luxury homes, duplex villas, and commercial complexes like schools and colleges. Fully supervised execution.
              </p>
              <Link href={`${basePath}/services`} className="text-xs font-black uppercase tracking-[0.1em] text-[var(--oxide)] flex items-center gap-2">
                View Packages <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="panel p-8 lg:p-10 hover:border-[var(--ink)] transition-colors flex flex-col">
              <Building2 className="h-10 w-10 text-[var(--oxide)] mb-6" />
              <h3 className="text-2xl font-black uppercase tracking-[-0.04em] mb-4">Commercial Interiors</h3>
              <p className="text-sm font-medium leading-relaxed text-black/62 flex-grow mb-6">
                End-to-end professional space setups including meeting rooms, workstations, functional offices, electricals, and HVAC integration.
              </p>
              <Link href={`${basePath}/services`} className="text-xs font-black uppercase tracking-[0.1em] text-[var(--oxide)] flex items-center gap-2">
                Explore Interiors <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="panel p-8 lg:p-10 hover:border-[var(--ink)] transition-colors flex flex-col">
              <Wrench className="h-10 w-10 text-[var(--oxide)] mb-6" />
              <h3 className="text-2xl font-black uppercase tracking-[-0.04em] mb-4">Residential Interiors</h3>
              <p className="text-sm font-medium leading-relaxed text-black/62 flex-grow mb-6">
                Turn your house into a luxury home with our interior services covering stylish modular kitchens, bathroom flooring, false ceilings, and wardrobes.
              </p>
              <Link href={`${basePath}/services`} className="text-xs font-black uppercase tracking-[0.1em] text-[var(--oxide)] flex items-center gap-2">
                Explore Interiors <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process / Method */}
      <section className="bg-[var(--white)] py-16 md:py-24 border-b border-[var(--line)]">
        <div className="site-grid">
          <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[0.5fr_1fr]">
            <div>
              <span className="eyebrow">METHOD</span>
              <h2 className="mt-4 text-5xl font-black uppercase tracking-[-0.05em] leading-[0.9]">A predictable<br />build rhythm.</h2>
            </div>
            <div className="flex flex-col justify-end">
              <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">Each phase has an output clients can approve.</h3>
              <p className="mt-3 text-lg font-medium text-black/68">
                The process is transparent, structured, and designed to provide complete engineering confidence.
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
            <Link href={`${basePath}/contact`} className="btn-solid rounded-sm px-10 py-4 text-lg">
              Contact Our Experts
              <ArrowRight className="h-5 w-5 ml-2 inline" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
