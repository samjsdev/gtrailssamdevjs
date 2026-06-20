import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { elevationImages, interiorProofImages, processSteps, servicePillars, walkthroughVideos } from '@/lib/siteContent';
import VideoSequence from '../VideoSequence';

type PageProps = {
  params?: Promise<{ slug?: string }>;
};

export default async function ServicesPage({ params }: PageProps) {
  const resolvedParams = params ? await params : {};
  const data = await readSourceConfig(resolvedParams.slug, 'template1');
  if (!data) return notFound();

  const { business } = data;
  const basePath = '';

  return (
    <div className="blueprint-bg">
      <section className="site-grid py-16 md:py-24">
        <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[0.72fr_1fr]">
          <div>
            <span className="eyebrow">SERVICE SYSTEM</span>
            <h1 className="section-heading mt-4">One scope from drawing to delivery.</h1>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.05em]">Architecture, civil construction, elevation and interiors move together.</h2>
            <p className="section-subheading mt-4">
              This is structured for clients who need clarity before construction starts and accountability until maintenance begins.
            </p>
          </div>
        </div>
      </section>

      <section className="site-grid pb-16 md:pb-24">
        <div className="rail-scroll services-rail">
          {servicePillars.map((service, index) => (
            <article key={service.title} className="panel overflow-hidden">
              <div className="image-box aspect-[4/3] border-x-0 border-t-0">
                <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 78vw, 20vw" className="object-cover" unoptimized />
              </div>
              <div className="p-4">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--oxide)]">0{index + 1} / {service.eyebrow}</p>
                <h2 className="mt-3 text-xl font-black uppercase leading-none tracking-[-0.05em]">{service.title}</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-black/62">{service.summary}</p>
                <div className="mt-4 grid gap-2">
                  {service.proof.map((item) => (
                    <p key={item} className="flex gap-2 text-xs font-black uppercase tracking-[0.08em] text-black/62">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--oxide)]" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--ink)] py-16 text-[var(--white)] md:py-24">
        <div className="site-grid grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <span className="eyebrow text-[var(--safety)]">CONSTRUCTION INCLUSIONS</span>
            <h2 className="section-heading mt-4 text-white">What your build package must clarify.</h2>
            <h3 className="mt-5 text-3xl font-black uppercase tracking-[-0.045em]">No vague contractor handoff.</h3>
            <p className="mt-3 max-w-2xl text-lg font-medium leading-8 text-white/62">
              The package makes technical inclusions visible: planning, waterproofing, anti-termite, tanks, tiles, modular kitchen and handover maintenance.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(business.constructionIncludes || []).map((item: string) => (
              <div key={item} className="border border-white/16 p-4 text-sm font-black uppercase tracking-[0.08em] text-white/78">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-grid py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="eyebrow">EXTERIOR ELEVATION</span>
            <h2 className="section-heading mt-4">Approve the facade before site spending.</h2>
            <h3 className="mt-5 text-3xl font-black uppercase tracking-[-0.045em]">Modern proportions, materials and lighting.</h3>
            <p className="section-subheading mt-3">
              Elevation previews help clients decide street presence, balcony depth, color, stone, lighting and massing with confidence.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {elevationImages.slice(0, 6).map((image, index) => (
              <div key={image} className={`image-box ${index === 0 || index === 5 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'}`}>
                <Image src={image} alt={`Exterior elevation ${index + 1}`} fill sizes="(max-width: 1024px) 33vw, 18vw" className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--concrete)] py-16 md:py-24">
        <div className="site-grid">
          <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[0.72fr_1fr]">
            <div>
              <span className="eyebrow">INTERIOR DESIGN</span>
              <h2 className="section-heading mt-4">Spaces designed around lifestyle and budget.</h2>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">Modular kitchens, storage, bedrooms and living spaces.</h3>
              <p className="section-subheading mt-3">
                Interior offer creatives are used as offer proof, while the premium website experience stays project-led and clean.
              </p>
            </div>
          </div>

          <div className="rail-scroll projects-rail mt-8">
            {interiorProofImages.map((image, index) => (
              <article key={image} className="panel overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image src={image} alt={`Interior offer ${index + 1}`} fill sizes="(max-width: 768px) 78vw, 33vw" className="object-cover" unoptimized />
                </div>
                <div className="p-4">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--oxide)]">Interior 0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-black uppercase tracking-[-0.04em]">Offer-backed interior scope</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-grid py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="eyebrow">SERVICE DELIVERY VIDEO</span>
            <h2 className="section-heading mt-4">Execution is easier to trust when it is visible.</h2>
            <h3 className="mt-5 text-3xl font-black uppercase tracking-[-0.045em]">Sequential site clips support the service promise.</h3>
            <p className="section-subheading mt-3">
              The video sequence shows real site progress and keeps technical delivery in the foreground.
            </p>
          </div>
          <VideoSequence videos={walkthroughVideos} label="Services Reel" title="Civil and interior sequence" />
        </div>
      </section>

      <section className="bg-[var(--white)] py-16 md:py-24">
        <div className="site-grid">
          <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[0.72fr_1fr]">
            <div>
              <span className="eyebrow">PROJECT PATH</span>
              <h2 className="section-heading mt-4">A clear path from inquiry to handover.</h2>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">Each phase has an output clients can approve.</h3>
              <p className="section-subheading mt-3">
                This keeps decisions structured and prevents construction ambiguity.
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
            Request Service Scope
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
