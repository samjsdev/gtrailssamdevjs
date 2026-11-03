import BrandText from '@/components/BrandText';
import ServiceImageCard from '@/components/ServiceImageCard';
import { CONTACT_LINKS } from '@/lib/contactLinks';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  Check,
  MessageCircle,
  Phone,
  Compass,
  Eye,
  FileCheck,
  Calculator,
  ShieldCheck,
  Home,
  Zap,
  FileText,
  Layers,
  Sun,
  Palette,
  Award,
  Building2,
  Sparkles,
  Key,
} from 'lucide-react';
import ArchitecturalDiagramBg from '@/components/ArchitecturalDiagramBg';
import ArchitecturalPlans from '../ArchitecturalPlans';
import ThreeDimensionalPlans from '../ThreeDimensionalPlans';
import { getServiceDetail, SERVICE_DETAILS, ServiceDetail } from '@/lib/serviceDetails';

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_DETAILS.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) return {};

  const seo = {
    title: `${service.title} ${service.accent.replace(/\.$/, '')} in Chennai`,
    description: service.summary,
    keywords: [slug, 'murali patharala associates', 'chennai architecture'],
  };

  const canonicalUrl = `/services/${slug}/`;
  const heroImage = service.heroImage || '/og-image.png';

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://muralipatharalaassociates.com${canonicalUrl}`,
      siteName: 'Murali Patharala & Associates (MPA)',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: service.heroAlt || seo.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [heroImage],
    },
  };
}

const DELIVERABLE_ICONS: Record<string, React.ElementType> = {
  Compass,
  Eye,
  FileCheck,
  Calculator,
  ShieldCheck,
  Home,
  Zap,
  FileText,
  Layers,
  Sun,
  Palette,
  Award,
  Building2,
  Sparkles,
  Key,
};

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { service: slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) notFound();

  const currentIndex = SERVICE_DETAILS.findIndex((item) => item.slug === service.slug);
  const previousService = SERVICE_DETAILS[(currentIndex - 1 + SERVICE_DETAILS.length) % SERVICE_DETAILS.length];
  const nextService = SERVICE_DETAILS[(currentIndex + 1) % SERVICE_DETAILS.length];
  const serviceName = `${service.title} ${service.accent.replace(/\.$/, '')}`;
  const inquiryRecipient =
    service.slug === 'residential-construction'
      ? 'ARCH foundations'
      : service.slug === 'turnkey-construction'
        ? 'Murali Patharala & Associates and ARCH foundations'
        : 'Murali Patharala & Associates';
  const message = encodeURIComponent(
    `Hi ${inquiryRecipient}, I would like to discuss your ${serviceName} service for my project.`
  );
  const nextStep =
    service.slug === 'architectural-design'
      ? { href: '/design-package', label: 'Compare design packages' }
      : service.slug === 'residential-construction'
        ? { href: '/construction-package', label: 'Compare construction packages' }
        : service.slug === 'turnkey-construction'
          ? { href: '/construction-package', label: 'Explore construction scope' }
          : { href: '/design-package', label: 'Explore interior design packages' };

  const construction = service.slug.includes('construction');
  const interlink = {
    packageTitle: construction ? 'Construction & Delivery Scope' : 'Architectural Consultancy Scope',
    packageHref: construction ? '/construction-package' : '/design-package',
    packageBadge: construction ? 'ARCH foundations' : 'MPA / Design consultancy',
    packageSummary: construction ? 'Explore civil construction, turnkey delivery and property development services. The project proposal defines the agreed scope and responsibilities.' : 'Explore design development, construction documentation, tender support and construction administration.',
    packageBullets: construction ? ['Civil works and structural engineering', 'Project management and site supervision', 'Interior fit-outs and utility installations'] : ['Concepts, plans and coordinated drawings', 'Specifications and tender documentation', 'Authority approvals and technical coordination'],
    siblingTitle: construction ? 'Architectural Design' : 'Turnkey Project Delivery',
    siblingHref: construction ? '/services/architectural-design' : '/services/turnkey-construction',
    siblingBadge: construction ? 'Architecture & interiors / MPA' : 'Construction / ARCH foundations',
    siblingSummary: construction ? 'Develop the brief, design and documentation needed to communicate your project to the construction team.' : 'Coordinate architectural planning, construction, interior fit-outs and utility installations from concept to handover.',
    siblingBullets: construction ? ['Residential, commercial and institutional design', 'Structural and MEP coordination', 'Bidding and construction administration'] : ['Integrated planning and construction', 'Project management and site supervision', 'Completion and handover coordination'],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://muralipatharalaassociates.com/services/${service.slug}/#service`,
    name: `${service.title} ${service.accent.replace(/\.$/, '')}`,
    provider: {
      '@type': 'LocalBusiness',
      name: service.ownership.company,
      telephone: '+91 98410 98490',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'W115A, AL Complex, 3rd Avenue, W Block, Anna Nagar East',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '600040',
        addressCountry: 'IN',
      },
    },
    description: service.summary,
    image: `https://muralipatharalaassociates.com${service.heroImage}`,
    areaServed: ['Chennai'],
    serviceType: service.eyebrow,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} Deliverables`,
      itemListElement: service.deliverables?.slice(0, 5).map((d) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: d,
        },
      })),
    },
  };

  return (
    <article className="w-full bg-surface-cream text-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {/* ── 00 · Hero Header ── */}
      <header className="relative min-h-[560px] overflow-hidden bg-[#111111] text-white lg:min-h-[640px]">
        <Image
          src={service.heroImage}
          alt={service.heroAlt}
          fill
          priority
          sizes="100vw"
          className={`object-cover opacity-75 ${service.heroMobileImage ? 'hidden md:block' : ''}`}
        />
        {service.heroMobileImage && <Image
          src={service.heroMobileImage}
          alt={service.heroMobileAlt || service.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75 md:hidden"
        />}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl flex-col justify-between px-6 py-8 md:px-12 md:py-12 lg:min-h-[640px] lg:py-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            <Link href="/" className="transition-colors hover:text-[#FB923C]">Home</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <Link href="/services" className="transition-colors hover:text-[#FB923C]">Services</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-[#FB923C]">{service.title} {service.accent}</span>
          </nav>

          {/* Hero Main Content */}
          <div data-motion-reveal className="grid items-end gap-8 pb-3 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#FB923C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FB923C]" />
                {service.number} / 04
              </p>
              <h1 className="font-serif text-[clamp(2.75rem,13.1vw,3.2rem)] font-bold leading-[0.88] tracking-[-0.05em] text-white sm:text-[clamp(3.2rem,7.5vw,7.5rem)] [text-wrap:balance]">
                {service.title}<br />
                <em className="font-normal text-[#FB923C]">{service.accent}</em>
              </h1>
            </div>

            <div className="max-w-md border-l-2 border-[#FB923C] pl-5 lg:col-span-5 lg:pl-8">
              <p className="text-base font-medium leading-relaxed text-white/90 md:text-lg [text-wrap:pretty]">
                <BrandText>{service.shortSummary}</BrandText>
              </p>
              <div className="mt-6">
                <a
                  href={`${CONTACT_LINKS.whatsapp}?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#EA580C] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111] transition-colors hover:bg-white"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  Discuss Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {service.slug === 'architectural-design' && (
        <>
          <ArchitecturalPlans />
          <ThreeDimensionalPlans />
        </>
      )}

      {/* ── 01 · Approach / Why This Matters ── */}
      <section className="relative overflow-hidden border-b border-[#111111]/15 bg-surface-pale px-6 py-20 md:px-12 md:py-28">
        <ArchitecturalDiagramBg variant="master-plan" theme="light" opacity={0.12} showCornerMarks={false} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div data-motion-reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#C2410C]">01 &bull; {service.overviewKicker}</p>
              <h2 className="font-serif text-3xl font-bold leading-[1.08] tracking-[-0.04em] md:text-5xl lg:text-6xl [text-wrap:balance]">
                {service.overviewTitle}
              </h2>
            </div>
            <p className="font-serif text-lg italic leading-relaxed text-[#4A4742] lg:col-span-5 md:text-xl [text-wrap:pretty]">
              <BrandText>{service.overviewLead}</BrandText>
            </p>
          </div>

          <div data-motion-group className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.overviewSections.map(block => (
              <ServiceImageCard key={block.heading} title={block.heading} description={block.body} image={block.image} imageAlt={block.imageAlt} bullets={block.bullets} />
            ))}
          </div>

        </div>
      </section>

      {/* ── 02 · Visual Scope Grid (What is Included) ── */}
      <section className="border-b border-[#111111]/15 bg-surface-cream px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div data-motion-reveal className="mb-14 flex flex-col justify-between gap-6 md:mb-18 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C2410C]">02 &bull; {service.scopeKicker}</p>
              <h2 className="font-serif text-3xl font-bold tracking-[-0.04em] md:text-5xl lg:text-6xl [text-wrap:balance]">
                {service.scopeTitle}
              </h2>
            </div>
            <p className="max-w-md text-sm font-medium leading-relaxed text-[#55534E] [text-wrap:pretty]">
              {service.scopeIntro}
            </p>
          </div>

          <div data-motion-group className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.scope.map(item => (
              <ServiceImageCard key={item.number} title={item.title} description={item.description} image={item.image} imageAlt={item.imageAlt} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · 5-Stage Visual Process ── */}
      <section className="relative overflow-hidden border-b border-[#5D5140]/25 bg-surface-sand px-6 py-20 text-[#302A20] md:px-12 md:py-28">
        <ArchitecturalDiagramBg variant="structural" theme="light" opacity={0.14} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div data-motion-reveal className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#703015]">03 &bull; {service.processKicker}</p>
              <h2 className="font-serif text-3xl font-bold leading-[1.06] tracking-[-0.04em] md:text-5xl lg:text-6xl [text-wrap:balance]">
                {service.processTitle}
              </h2>
            </div>
            <p className="text-sm font-medium leading-relaxed text-ink-muted lg:col-span-5 [text-wrap:pretty]">
              {service.processIntro}
            </p>
          </div>

          <div data-motion-group className="space-y-4">
            {service.process.map(item => (
              <div key={item.step} className="grid gap-5 border border-[#5D5140]/20 bg-surface-cream p-6 md:grid-cols-[32px_1fr_180px] md:items-center">
                <span className="text-sm text-[#703015]" aria-hidden="true">{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted"><BrandText>{item.description}</BrandText></p>
                  <p className="mt-2 text-xs text-[#703015]">Deliverable: {item.deliverable}</p>
                </div>
                {item.image && <div className="relative aspect-[16/10] overflow-hidden bg-surface-linen">
                  <Image src={item.image} alt={item.imageAlt ?? item.title} fill sizes="(max-width: 767px) calc(100vw - 96px), 180px" className="object-cover" />
                </div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · Tangible Deliverables Deck ── */}
      <section className="border-b border-[#111111]/15 bg-surface-oat px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div data-motion-reveal className="mb-14 flex flex-col justify-between gap-6 md:mb-18 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C2410C]">04 &bull; {service.deliverablesKicker}</p>
              <h2 className="font-serif text-3xl font-bold leading-[1.06] tracking-[-0.04em] md:text-5xl lg:text-6xl [text-wrap:balance]">
                {service.deliverablesTitle}
              </h2>
            </div>
            <p className="max-w-md text-sm font-medium leading-relaxed text-[#55534E] [text-wrap:pretty]">
              {service.deliverablesIntro}
            </p>
          </div>

          {/* 4 Categorized Deliverable Cards */}
          <div data-motion-group className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.deliverableCategories.map((category) => {
              const IconComponent = DELIVERABLE_ICONS[category.icon] || FileText;
              return (
                <div
                  key={category.title}
                  className="flex flex-col justify-between rounded-lg border border-[#111111]/15 bg-surface-cream p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-surface-cream text-[#C2410C]">
                      <IconComponent size={22} strokeWidth={2} />
                    </div>
                    <h3 className="font-serif text-xl font-bold tracking-tight text-[#111111]">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-[#77736C]">
                      {category.subtitle}
                    </p>

                    <details className="mt-5 border-t border-[#111111]/10 pt-4">
                      <summary className="cursor-pointer text-sm text-[#703015]">View deliverables</summary>
                    <ul className="mt-4 space-y-2.5">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs font-medium text-[#33312E]">
                          <Check size={14} className="mt-0.5 shrink-0 text-[#C2410C]" strokeWidth={2.4} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    </details>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-lg border border-[#C2410C]/20 bg-surface-cream p-5 text-center text-xs font-semibold text-[#9A3412]">
            The project proposal confirms the drawings, documentation and coordination services included in your commission.
          </div>
        </div>
      </section>

      {/* ── 05 · Standards & Quality Guarantees ── */}
      <section className="border-b border-[#111111]/15 bg-surface-cream px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div data-motion-reveal className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C2410C]">05 &bull; {service.standardsKicker}</p>
              <h2 className="font-serif text-3xl font-bold leading-[1.06] tracking-[-0.04em] md:text-5xl lg:text-6xl [text-wrap:balance]">
                {service.standardsTitle}
              </h2>
            </div>
            <p className="text-sm font-medium leading-relaxed text-[#55534E] lg:col-span-5 [text-wrap:pretty]">
              {service.standardsIntro}
            </p>
          </div>

          <div data-motion-group className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.standards.map(item => (
              <ServiceImageCard key={item.label} title={item.title} description={item.description} image={item.image} imageAlt={item.imageAlt} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 · Visual Project Gallery Showcase (3-Image Bento Grid) ── */}
      <section aria-label={`${service.title} project showcase`} className="relative overflow-hidden border-b border-[#111111]/15 bg-surface-sand py-20 px-6 md:px-12 md:py-28">
        <ArchitecturalDiagramBg variant="structural" theme="light" opacity={0.07} showGrid={true} showCornerMarks={true} />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-linen/60 border border-[#5D5140]/25 text-[#703015] font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                <span>06 &bull; Authentic Project Library &bull; <BrandText>{service.ownership.company}</BrandText></span>
              </div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#302A20] md:text-5xl [text-wrap:balance]">
                Selected Project Views
              </h2>
            </div>
            <Link
              href="/gallery"
              className="mpa-outline-cta mpa-outline-cta--accent"
            >
              Explore the project gallery <ArrowRight size={14} />
            </Link>
          </div>

          {/* 3-Image Architectural Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[500px] lg:h-[560px]">
            {/* Hero Tile (md:col-span-7) */}
            <div className="h-[280px] md:h-full md:col-span-7 relative border-2 border-[#5D5140]/25 bg-surface-linen overflow-hidden group shadow-2xl">
              <Link href="/gallery" className="block w-full h-full relative" aria-label={`View ${service.bentoImages.hero.caption}`}>
                <Image
                  src={service.bentoImages.hero.src}
                  alt={service.bentoImages.hero.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Secondary Stack (2 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:col-span-5 h-auto md:h-full">
              {/* Secondary Tile 1 */}
              <div className="h-[200px] md:h-full relative border-2 border-[#5D5140]/25 bg-surface-linen overflow-hidden group shadow-lg">
                <Link href="/gallery" className="block w-full h-full relative" aria-label={`View ${service.bentoImages.sub1.caption}`}>
                  <Image
                    src={service.bentoImages.sub1.src}
                    alt={service.bentoImages.sub1.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>
              </div>

              {/* Secondary Tile 2 */}
              <div className="h-[200px] md:h-full relative border-2 border-[#5D5140]/25 bg-surface-linen overflow-hidden group shadow-lg">
                <Link href="/gallery" className="block w-full h-full relative" aria-label={`View ${service.bentoImages.sub2.caption}`}>
                  <Image
                    src={service.bentoImages.sub2.src}
                    alt={service.bentoImages.sub2.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06.5 · Interlinked Packages & Related Capabilities ── */}
      <section id="interlinked-capabilities" aria-label="Related Packages & Sibling Services" className="border-b border-[#111111]/15 bg-surface-oat px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C2410C]">Interconnected Capabilities</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-[#111111] md:text-4xl">
                Complementary Packages &amp; Services
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#66635D] max-w-md font-medium">
              Architecture, engineering, construction and interiors inform one another. Explore the related services for your project.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[{title: interlink.packageTitle, summary: interlink.packageSummary, href: interlink.packageHref}, {title: interlink.siblingTitle, summary: interlink.siblingSummary, href: interlink.siblingHref}].map(item => (
              <Link key={item.href} href={item.href} className="group border border-[#5D5140]/20 bg-surface-cream p-6 md:p-8 hover:border-[#703015]">
                <div className="flex items-start justify-between gap-4"><h3>{item.title}</h3><ArrowRight size={20} className="shrink-0 text-[#703015]" aria-hidden="true" /></div>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted"><BrandText>{item.summary}</BrandText></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 · Frequently Asked Questions ── */}
      <section className="border-b border-[#111111]/15 bg-surface-cream px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
          <header data-motion-reveal className="lg:col-span-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C2410C]">06 &bull; Asked before starting</p>
            <h2 className="font-serif text-3xl font-bold tracking-[-0.04em] md:text-4xl lg:text-5xl [text-wrap:balance]">
              Everything you are wondering.
            </h2>
            <p className="mt-4 text-xs font-medium leading-relaxed text-[#66635D] [text-wrap:pretty]">
              Answers to common questions about scope, coordination and starting your project.
            </p>
          </header>
          <div className="mpa-faq lg:col-span-8">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="border-b border-[#111111]/15 py-4">
                <summary className="cursor-pointer font-serif text-lg font-bold text-[#111111] hover:text-[#C2410C]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm font-normal leading-relaxed text-[#55534E] [text-wrap:pretty]">
                  <BrandText>{faq.answer}</BrandText>
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08 · Consultation Next Step (CTA) ── */}
      <section className="relative overflow-hidden bg-surface-sand px-6 py-20 text-[#302A20] md:px-12 md:py-28">
        <div data-motion-reveal className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#703015]">Your next step &bull; No pressure</p>
          <h2 className="font-serif text-3xl font-bold leading-[1.06] tracking-[-0.04em] md:text-5xl lg:text-6xl [text-wrap:balance] drop-shadow-md">
            Tell us about your project.<br />
            <em className="font-normal text-[#703015]">We will guide what comes next.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-relaxed text-ink-muted md:text-base [text-wrap:pretty]">
            Share your plot location, requirements, and investment range. We will provide an honest appraisal of whether {serviceName} is your ideal starting point — and schedule your first studio consultation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={nextStep.href}
              className="inline-flex items-center gap-2 bg-[#EA580C] px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#111111] transition-colors hover:bg-surface-cream"
            >
              <span>{nextStep.label}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <a
              href={`${CONTACT_LINKS.whatsapp}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#5D5140]/25 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#302A20] transition-colors hover:border-[#5D5140]/25 hover:bg-surface-cream hover:text-[#111111]"
            >
              <MessageCircle size={14} aria-hidden="true" />
              <span>WhatsApp Our Studio</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 09 · Next / Previous Service Navigation ── */}
      <nav aria-label="Other services" className="grid border-t border-[#111111]/20 bg-surface-cream sm:grid-cols-3">
        <Link
          href={`/services/${previousService.slug}`}
          className="group flex min-h-36 items-center gap-5 border-b border-[#111111]/20 p-7 transition-colors hover:bg-surface-cream sm:border-b-0 sm:border-r md:p-10"
        >
          <span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#77736C]">Previous service</span>
            <span className="mt-1 block font-serif text-lg font-bold md:text-xl">{previousService.title} {previousService.accent}</span>
          </span>
        </Link>
        <Link
          href="/services"
          className="group flex min-h-28 items-center justify-center border-b border-[#111111]/20 p-7 text-center transition-colors hover:bg-surface-cream sm:min-h-36 sm:border-b-0 sm:border-r md:p-10"
        >
          <span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#77736C]">All capabilities</span>
            <span className="mt-1 block font-serif text-lg font-bold md:text-xl">Service Overview</span>
          </span>
        </Link>
        <Link
          href={`/services/${nextService.slug}`}
          className="group flex min-h-36 items-center justify-end gap-5 p-7 text-right transition-colors hover:bg-surface-cream md:p-10"
        >
          <span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#77736C]">Next service</span>
            <span className="mt-1 block font-serif text-lg font-bold md:text-xl">{nextService.title} {nextService.accent}</span>
          </span>
        </Link>
      </nav>
    </article>
  );
}
