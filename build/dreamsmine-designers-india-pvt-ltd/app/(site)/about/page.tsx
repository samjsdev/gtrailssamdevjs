import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, ClipboardCheck, HardHat, ShieldCheck } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { materialBrands, processSteps, trustMarkers, walkthroughVideos } from '@/lib/siteContent';
import VideoSequence from '../VideoSequence';

type PageProps = {
  params?: Promise<{ slug?: string }>;
};

export default async function AboutPage({ params }: PageProps) {
  const resolvedParams = params ? await params : {};
  const data = await readSourceConfig(resolvedParams.slug, 'template1');
  if (!data) return notFound();

  const { clinic, doctor } = data;
  const cleanName = cleanClinicName(clinic.name);
  const basePath = '';

  return (
    <div>
      <section className="site-grid py-16 md:py-24">
        <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[0.72fr_1fr]">
          <div>
            <span className="eyebrow">STUDIO POSITIONING</span>
            <h1 className="section-heading mt-4">A design studio that understands construction risk.</h1>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.05em]">Premium homes need disciplined drawings and disciplined sites.</h2>
            <p className="section-subheading mt-4">
              {cleanName} combines architecture, civil engineering, Vastu planning, exterior visualization and turnkey interiors for clients who want a single accountable partner.
            </p>
          </div>
        </div>
      </section>

      <section className="site-grid pb-16 md:pb-24">
        <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="image-box min-h-[520px]">
            <Image src="/images/all/premium-villas/villa-06.webp" alt="Completed Dreamsmine villa exterior" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" priority unoptimized />
          </div>
          <div className="grid gap-3">
            <div className="panel p-6">
              <span className="eyebrow">FOUNDER-LED REVIEW</span>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.055em]">{doctor.name || 'G. Thirumurugan'}</h2>
              <p className="section-subheading mt-4">
                Founder involvement keeps design decisions, budget expectations, site quality and handover commitments connected.
              </p>
            </div>
            <div className="bg-[var(--ink)] p-6 text-[var(--white)]">
              <span className="eyebrow text-[var(--safety)]">OPERATING BELIEF</span>
              <h3 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.055em]">
                Beautiful homes are engineered before they are decorated.
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--ink)] py-12 text-[var(--white)]">
        <div className="site-grid grid gap-3 md:grid-cols-4">
          {trustMarkers.map((marker) => (
            <div key={marker.label} className="border border-white/16 p-5">
              <p className="text-4xl font-black uppercase tracking-[-0.055em]">{marker.value}</p>
              <p className="mt-2 text-[0.64rem] font-black uppercase tracking-[0.18em] text-white/52">{marker.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="site-grid py-16 md:py-24">
        <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[0.72fr_1fr]">
          <div>
            <span className="eyebrow">WHY CLIENTS TRUST US</span>
            <h2 className="section-heading mt-4">Design excellence with construction accountability.</h2>
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">The website must make trust obvious within seconds.</h3>
            <p className="section-subheading mt-3">
              ISO systems, warranty, maintenance, recognizable materials and visible site progress are placed before decorative studio claims.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {[
            { icon: ShieldCheck, title: 'Certified quality', text: 'ISO 9001 systems anchor quality conversations.' },
            { icon: HardHat, title: 'Site control', text: 'Civil execution is part of the offer, not outsourced mystery.' },
            { icon: ClipboardCheck, title: 'Handover clarity', text: 'Maintenance and warranty are named up front.' },
            { icon: Building2, title: 'Brand materials', text: 'Recognizable vendors make quality tangible.' },
          ].map((item) => (
            <div key={item.title} className="panel p-5">
              <item.icon className="h-7 w-7 text-[var(--oxide)]" />
              <h3 className="mt-5 text-xl font-black uppercase leading-none tracking-[-0.05em]">{item.title}</h3>
              <p className="mt-4 text-sm font-medium leading-6 text-black/62">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--concrete)] py-16 md:py-24">
        <div className="site-grid grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="eyebrow">VISIBLE WORKFLOW</span>
            <h2 className="section-heading mt-4">Site progress is part of the brand.</h2>
            <h3 className="mt-5 text-3xl font-black uppercase tracking-[-0.045em]">Videos help clients see how execution moves.</h3>
            <p className="section-subheading mt-3">
              A premium architecture site should show both final visuals and the discipline of the build process.
            </p>
          </div>
          <VideoSequence videos={walkthroughVideos} label="Studio Proof" title="Construction visibility" />
        </div>
      </section>

      <section className="site-grid py-16 md:py-24">
        <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[0.72fr_1fr]">
          <div>
            <span className="eyebrow">MATERIAL NETWORK</span>
            <h2 className="section-heading mt-4">Quality made legible.</h2>
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">Clients recognize trust through brands and specifications.</h3>
            <p className="section-subheading mt-3">
              The material ecosystem supports the engineering claim and reduces uncertainty around construction quality.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {materialBrands.map((brand) => (
            <div key={brand} className="panel p-5 text-center text-sm font-black uppercase tracking-[0.12em]">
              {brand}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--white)] py-16 md:py-24">
        <div className="site-grid">
          <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[0.72fr_1fr]">
            <div>
              <span className="eyebrow">METHOD</span>
              <h2 className="section-heading mt-4">A predictable build rhythm.</h2>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">Every stage produces a decision clients can review.</h3>
              <p className="section-subheading mt-3">
                The process is simple to skim and structured enough to communicate engineering confidence.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.step} className="panel p-5">
                <p className="text-5xl font-black tracking-[-0.06em] text-[var(--oxide)]">{step.step}</p>
                <h3 className="mt-5 text-xl font-black uppercase leading-none tracking-[-0.05em]">{step.title}</h3>
                <p className="mt-4 text-sm font-medium leading-6 text-black/62">{step.text}</p>
              </div>
            ))}
          </div>

          <Link href={`${basePath}/contact`} className="btn-solid mt-8">
            Meet the Studio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
