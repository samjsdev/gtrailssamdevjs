import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
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
import { getServiceDetail, SERVICE_DETAILS, ServiceDetail } from '@/lib/serviceDetails';

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_DETAILS.map((service) => ({ service: service.slug }));
}

const SERVICE_SEO: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  'architectural-design': {
    title: 'Architectural Design & 3D Floor Plans in Chennai | MPA',
    description:
      'Custom 2D floor plans, photorealistic 3D elevations, CMDA/GCC sanction drawings, structural engineering, and itemized BOQ estimates in Chennai by Ar. S. Murali.',
    keywords: [
      'architectural design chennai',
      'residential architects anna nagar',
      'vastu floor plans chennai',
      '3d elevation design chennai',
      'cmda sanction drawings chennai',
      'structural engineering chennai',
      'architectural blueprint drafting',
      'house plan design chennai',
    ],
  },
  'residential-construction': {
    title: 'Residential Construction & Civil Contracting Chennai | ARCH Foundation',
    description:
      'Engineered residential home construction with Tata Tiscon 550D steel, UltraTech cement, 425+ quality inspections, fixed-price BOQ, and 10-year structural warranty in Chennai.',
    keywords: [
      'residential construction chennai',
      'house builders anna nagar',
      'civil contractors chennai',
      'arch foundation construction',
      'turnkey home builders chennai',
      'fixed price construction packages',
      'tata tiscon 550d house construction',
      'structural warranty home construction',
    ],
  },
  'interior-design': {
    title: 'Luxury Home Interior Design & Modular Kitchens Chennai | MPA',
    description:
      'Signature luxury residential interiors, custom modular kitchens, bespoke wardrobes, false ceilings, and architectural lighting in Chennai tailored to your lifestyle.',
    keywords: [
      'interior design chennai',
      'luxury home interiors anna nagar',
      'modular kitchen manufacturers chennai',
      'wardrobe interior designers chennai',
      'false ceiling lighting chennai',
      'bespoke furniture joinery chennai',
      'living room interior makeovers',
    ],
  },
  'turnkey-construction': {
    title: 'Turnkey House Construction & Architectural Execution Chennai | MPA + ARCH Foundation',
    description:
      'Complete design-build turnkey construction from architectural blueprints and municipal sanctions to structural handover and bespoke interior fit-out.',
    keywords: [
      'turnkey house construction chennai',
      'design and build contractors chennai',
      'single point accountability home building',
      'end to end house construction chennai',
    ],
  },
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) return {};

  const seo = SERVICE_SEO[slug] || {
    title: `${service.title} ${service.accent.replace(/\.$/, '')} | Murali Patharala & Associates`,
    description: service.summary,
    keywords: [slug, 'murali patharala associates', 'chennai architecture'],
  };

  const canonicalUrl = `/services/${slug}/`;
  const heroImage = service.heroImage || '/og-image.jpg';

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
  const phone = '919841098490';
  const serviceName = `${service.title} ${service.accent.replace(/\.$/, '')}`;
  const inquiryRecipient =
    service.slug === 'residential-construction'
      ? 'ARCH Foundation'
      : service.slug === 'turnkey-construction'
        ? 'Murali Patharala & Associates and ARCH Foundation'
        : 'Murali Patharala & Associates';
  const message = encodeURIComponent(
    `Hi ${inquiryRecipient}, I would like to discuss your ${serviceName} service for my home.`
  );
  const nextStep =
    service.slug === 'architectural-design'
      ? { href: '/design-package', label: 'Compare design packages' }
      : service.slug === 'residential-construction'
        ? { href: '/construction-package', label: 'Compare construction packages' }
        : service.slug === 'turnkey-construction'
          ? { href: '/construction-package', label: 'Review build specifications' }
          : { href: '/design-package', label: 'Explore interior design packages' };

  const complementaryStep =
    service.slug === 'architectural-design'
      ? { href: '/services/residential-construction', label: 'Residential Construction Guide' }
      : service.slug === 'residential-construction'
        ? { href: '/design-package', label: 'Need drawings first? Design Packages' }
        : service.slug === 'turnkey-construction'
          ? { href: '/design-package', label: 'Architectural Design Packages' }
          : { href: '/gallery', label: 'View Interior Works in Portfolio' };

  const interlink = {
    'architectural-design': {
      packageTitle: 'Architectural Design Packages',
      packageHref: '/design-package',
      packageBadge: 'Design Documentation / MPA',
      packageSummary: 'Compare Concept, Construction-Ready, and Complete Home Design packages with custom 2D floor plans, 3D elevations, and BOQ cost estimates.',
      packageBullets: ['100% Vastu-Compliant Spatial Layouts', 'Photorealistic 3D Facade Visualizations', 'CMDA & Municipal Sanction Approval Sets'],
      siblingTitle: 'Residential Civil Construction',
      siblingHref: '/services/residential-construction',
      siblingBadge: 'Turnkey Execution / ARCH Foundation',
      siblingSummary: 'Once your architectural design is finalized, ARCH Foundation executes the civil build with branded materials and zero price escalation.',
      siblingBullets: ['Primary Tata Tiscon 550D Steel & UltraTech', '425+ Documented On-Site Quality Checks', '10-Year Structural Warranty Certificate'],
    },
    'residential-construction': {
      packageTitle: 'Fixed-Price Construction Packages',
      packageHref: '/construction-package',
      packageBadge: 'Specification Schedule / ARCH Foundation',
      packageSummary: 'Compare Classic, Premium, and Supreme build packages with explicit material specifications, daily engineer supervision, and frozen pricing.',
      packageBullets: ['100% Fixed-Price Contract Guarantee', 'Branded Materials: Tata Steel & UltraTech', 'Stage-Wise Photo/Video Milestone Reporting'],
      siblingTitle: 'Architectural Design Packages',
      siblingHref: '/design-package',
      siblingBadge: 'Pre-Construction Planning / MPA',
      siblingSummary: 'Need architectural floor plans, structural column framing, or CMDA approval drawings before building? Start with MPA design packages.',
      siblingBullets: ['Climatic & Sun-Path Orientation', 'Structural Foundation & Column Schedules', 'Itemized BOQ Quantity Take-Off'],
    },
    'interior-design': {
      packageTitle: 'Architectural Design & Space Packages',
      packageHref: '/design-package',
      packageBadge: 'Interior Planning / MPA',
      packageSummary: 'Comprehensive interior floor layouts, ceiling lighting plans, electrical schematics, and custom joinery detailing before factory fabrication.',
      packageBullets: ['100% BWR Marine Plywood (IS:710)', 'Precision Factory Joinery & CNC Details', 'Blum & Häfele Hardware Lifelong Guarantee'],
      siblingTitle: 'Turnkey Architectural & Civil Build',
      siblingHref: '/services/turnkey-construction',
      siblingBadge: 'Single Accountability / MPA + ARCH',
      siblingSummary: 'Combine your interior fit-outs with structural civil construction from day one to avoid costly conduit modifications or masonry breaking.',
      siblingBullets: ['Coordinated Conduit & Concealed Lines', 'Integrated Civil, Electrical & Millwork', 'On-Time Housewarming Handover'],
    },
    'turnkey-construction': {
      packageTitle: 'Turnkey Construction Packages',
      packageHref: '/construction-package',
      packageBadge: 'Full Turnkey Build / ARCH Foundation',
      packageSummary: 'Complete design-to-handover construction packages covering structural framing, masonry, electrical, plumbing, tiling, and finish hardware.',
      packageBullets: ['Itemized BOQ with 100% Frozen Price', 'Primary Steel & Certified 53-Grade Cement', 'Daily In-House Resident Site Engineer'],
      siblingTitle: 'Architectural Design Packages',
      siblingHref: '/design-package',
      siblingBadge: 'Design Foundation / MPA',
      siblingSummary: 'Review the 4-step architectural design sequence that resolves every floor plan, elevation, and structural beam before breaking ground.',
      siblingBullets: ['Land Survey & Laser Plot Feasibility', 'Vastu & Structural Calculations', 'Full Municipal CMDA Sanction Approvals'],
    },
  }[service.slug] || {
    packageTitle: 'Architectural Design Packages',
    packageHref: '/design-package',
    packageBadge: 'MPA Architecture',
    packageSummary: 'Comprehensive drawing documentation.',
    packageBullets: ['2D Floor Plans', '3D Elevations'],
    siblingTitle: 'Construction Packages',
    siblingHref: '/construction-package',
    siblingBadge: 'ARCH Foundation',
    siblingSummary: 'Turnkey civil construction.',
    siblingBullets: ['Fixed Price', 'Quality Audits'],
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
        streetAddress: 'W115A, 3rd Ave, Annanagar East',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '600040',
        addressCountry: 'IN',
      },
    },
    description: service.summary,
    image: `https://muralipatharalaassociates.com${service.heroImage}`,
    areaServed: ['Chennai', 'Anna Nagar', 'Coimbatore', 'Bangalore', 'Pondicherry', 'Tamil Nadu'],
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
    <article className="w-full bg-[#FAFAF8] text-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {/* ── 00 · Hero Header ── */}
      <header className="relative min-h-[640px] overflow-hidden bg-[#111111] text-white lg:min-h-[720px]">
        <Image
          src={service.heroImage}
          alt={service.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-7xl flex-col justify-between px-6 py-12 md:px-12 lg:min-h-[720px] lg:py-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            <Link href="/" className="transition-colors hover:text-[#FB923C]">Home</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <Link href="/services" className="transition-colors hover:text-[#FB923C]">Services</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-[#FB923C]">{service.title} {service.accent}</span>
          </nav>

          {/* Hero Main Content */}
          <div data-motion-reveal className="grid items-end gap-10 pb-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#FB923C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FB923C]" />
                {service.number} / 04 &nbsp;&bull;&nbsp; {service.eyebrow}
              </p>
              <h1 className="font-serif text-[clamp(3.2rem,7.5vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.05em] text-white [text-wrap:balance]">
                {service.title}<br />
                <em className="font-normal text-[#FB923C]">{service.accent}</em>
              </h1>
            </div>

            <div className="border-l border-white/20 pl-6 lg:col-span-5 lg:pl-10">
              <div className="mb-5 inline-flex flex-col border border-[#FB923C]/40 bg-black/40 px-4 py-2.5 backdrop-blur-md">
                <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/50">{service.ownership.label}</span>
                <strong className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FB923C]">{service.ownership.company}</strong>
              </div>
              <p className="text-sm font-normal leading-relaxed text-white/85 md:text-base [text-wrap:pretty]">
                {service.summary}
              </p>
              <div className="mt-5 border-l-2 border-[#FB923C] pl-4">
                <p className="font-serif text-base italic leading-snug text-white/95 md:text-lg">
                  &ldquo;{service.promise}&rdquo;
                </p>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${phone}?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#EA580C] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111] transition-colors hover:bg-white"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  Discuss Project
                </a>
                <Link
                  href={nextStep.href}
                  className="inline-flex items-center gap-2 border border-white/30 bg-black/40 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#FB923C] hover:text-[#FB923C]"
                >
                  {nextStep.label} <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link
                  href={complementaryStep.href}
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-[#FB923C] py-2"
                >
                  <span>{complementaryStep.label}</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div data-motion-group className="grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {service.stats.map((stat) => (
              <div key={stat.label} className="border-b border-r border-white/15 bg-black/45 p-5 backdrop-blur-md md:p-6">
                <strong className="block font-serif text-2xl font-bold text-white md:text-3xl">{stat.value}</strong>
                <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Highlights Ribbon (At a Glance for Fast Scanning) ── */}
      <section aria-label="Service Highlights" className="border-b border-[#111111]/10 bg-white py-6 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C2410C]">At a glance:</span>
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              {service.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-2 rounded-full border border-[#111111]/10 bg-[#FAFAF8] px-4 py-1.5 text-xs font-semibold text-[#222222]"
                >
                  <CheckCircle2 size={14} className="shrink-0 text-[#C2410C]" />
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 · Approach / Why This Matters ── */}
      <section className="relative overflow-hidden border-b border-[#111111]/15 bg-[#EFEBE4] px-6 py-20 md:px-12 md:py-28">
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
              {service.overviewLead}
            </p>
          </div>

          {/* 3 Visual Core Approach Cards */}
          <div className="mt-14 space-y-12 md:mt-18 md:space-y-16">
            {service.overviewSections.map((block, idx) => (
              <div
                key={block.heading}
                data-motion-reveal
                className={`grid items-center gap-8 rounded-lg border border-[#111111]/10 bg-white/70 p-6 backdrop-blur-sm lg:grid-cols-12 lg:gap-12 lg:p-8 ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="group relative aspect-[16/11] overflow-hidden rounded border border-[#111111]/15 bg-[#111111] shadow-md">
                    <Image
                      src={block.image}
                      alt={block.imageAlt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 42vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded bg-black/70 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      {block.caption}
                    </span>
                  </div>
                </div>

                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#C2410C]">
                    FEATURE 0{idx + 1} / 03
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#111111] md:text-3xl [text-wrap:balance]">
                    {block.heading}
                  </h3>
                  <p className="mt-3 text-sm font-normal leading-relaxed text-[#4A4742] md:text-base [text-wrap:pretty]">
                    {block.body}
                  </p>

                  {block.bullets && block.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-[#111111]/10 pt-4">
                      {block.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-xs font-medium text-[#33312E] md:text-sm">
                          <Check size={15} className="mt-0.5 shrink-0 text-[#C2410C]" strokeWidth={2.4} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Persona Card: "Choose this if..." */}
          <div data-motion-reveal className="mt-16 rounded-lg border border-[#111111]/15 bg-white p-7 shadow-sm md:mt-20 md:p-10">
            <div className="mb-8 flex flex-col justify-between gap-3 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C2410C]">Is this your starting point?</p>
                <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                  {service.idealForTitle}
                </h3>
              </div>
              <span className="text-xs font-medium text-[#66635D]">Check if your goals match this service</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.idealFor.map((item, idx) => (
                <div key={item.title} className="rounded border border-[#111111]/10 bg-[#FAFAF8] p-5 transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-2 text-[#C2410C]">
                    <CheckCircle2 size={18} strokeWidth={2.4} className="shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Point 0{idx + 1}</span>
                  </div>
                  <h4 className="mt-3 font-serif text-lg font-bold text-[#111111]">{item.title}</h4>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-[#55534E] [text-wrap:pretty]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 · Visual Scope Grid (What is Included) ── */}
      <section className="border-b border-[#111111]/15 bg-white px-6 py-20 md:px-12 md:py-28">
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

          {/* 6 Visual Cards With Real Architectural Imagery */}
          <div data-motion-group className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.scope.map((item) => (
              <div
                key={item.number}
                className="group flex flex-col overflow-hidden rounded-lg border border-[#111111]/15 bg-[#FAFAF8] transition-all duration-300 hover:-translate-y-1 hover:border-[#111111]/30 hover:shadow-lg"
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#FB923C]">
                      {item.number} / 06
                    </span>
                    {item.tag && (
                      <span className="rounded bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold tracking-tight text-[#111111] transition-colors group-hover:text-[#C2410C]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs font-medium leading-relaxed text-[#55534E] [text-wrap:pretty]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · 5-Stage Visual Process ── */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#121418] px-6 py-20 text-white md:px-12 md:py-28">
        <ArchitecturalDiagramBg variant="structural" theme="dark" opacity={0.14} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div data-motion-reveal className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#FB923C]">03 &bull; {service.processKicker}</p>
              <h2 className="font-serif text-3xl font-bold leading-[1.06] tracking-[-0.04em] md:text-5xl lg:text-6xl [text-wrap:balance]">
                {service.processTitle}
              </h2>
            </div>
            <p className="text-sm font-medium leading-relaxed text-white/65 lg:col-span-5 [text-wrap:pretty]">
              {service.processIntro}
            </p>
          </div>

          {/* Visual Step Timeline Cards */}
          <div data-motion-group className="space-y-4">
            {service.process.map((item, index) => (
              <div
                key={item.step}
                className="group flex flex-col gap-6 rounded-lg border border-white/15 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-[#FB923C]/50 hover:bg-white/[0.08] md:flex-row md:items-center md:gap-8"
              >
                {/* Step Thumbnail */}
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded border border-white/15 bg-black/50 md:w-48 lg:w-56">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 224px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] font-bold text-[#FB923C] backdrop-blur-sm">
                    STEP {item.step}
                  </span>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FB923C]">
                      STAGE {item.step} OF 05
                    </span>
                    <span className="text-white/30">&bull;</span>
                    <span className="rounded-full bg-white/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">
                      Output: {item.deliverable}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-bold text-white transition-colors group-hover:text-[#FB923C] md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-xs font-normal leading-relaxed text-white/70 md:text-sm [text-wrap:pretty]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · Tangible Deliverables Deck ── */}
      <section className="border-b border-[#111111]/15 bg-[#F7F4EE] px-6 py-20 md:px-12 md:py-28">
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
                  className="flex flex-col justify-between rounded-lg border border-[#111111]/15 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#EFEBE4] text-[#C2410C]">
                      <IconComponent size={22} strokeWidth={2} />
                    </div>
                    <h3 className="font-serif text-xl font-bold tracking-tight text-[#111111]">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-[#77736C]">
                      {category.subtitle}
                    </p>

                    <ul className="mt-5 space-y-2.5 border-t border-[#111111]/10 pt-4">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs font-medium text-[#33312E]">
                          <Check size={14} className="mt-0.5 shrink-0 text-[#C2410C]" strokeWidth={2.4} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-lg border border-[#C2410C]/20 bg-[#FFF7ED] p-5 text-center text-xs font-semibold text-[#9A3412]">
            All drawings and files are delivered as full-size hardcopy blueprint binders plus permanently stored high-resolution digital sets.
          </div>
        </div>
      </section>

      {/* ── 05 · Standards & Quality Guarantees ── */}
      <section className="border-b border-[#111111]/15 bg-white px-6 py-20 md:px-12 md:py-28">
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

          {/* 3 Trust Cards With Photographic Proof */}
          <div data-motion-group className="grid gap-6 md:grid-cols-3">
            {service.standards.map((item) => (
              <div
                key={item.label}
                className="flex flex-col overflow-hidden rounded-lg border border-[#111111]/15 bg-[#FAFAF8] transition-all hover:shadow-md"
              >
                {item.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
                      Verified Standard
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C2410C]">
                      {item.label}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-bold leading-snug text-[#111111]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs font-medium leading-relaxed text-[#55534E] [text-wrap:pretty]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 · Visual Project Gallery Showcase ── */}
      <section aria-label={`${service.title} project gallery`} className="border-b border-[#111111]/15 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#FB923C]">Visual proof</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">Selected {serviceName} Works</h3>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FB923C] hover:text-white"
            >
              Explore all projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-3">
          {service.gallery.map((image, index) => (
            <figure
              key={image.src}
              data-motion-reveal
              className="group relative min-h-[300px] overflow-hidden border-t border-white/15 md:border-r"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                <span>{image.caption}</span>
                <span className="text-[#FB923C]">0{index + 1}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── 06.5 · Interlinked Packages & Related Capabilities ── */}
      <section id="interlinked-capabilities" aria-label="Related Packages & Sibling Services" className="border-b border-[#111111]/15 bg-[#F7F4EE] px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C2410C]">Interconnected Capabilities</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-[#111111] md:text-4xl">
                Complementary Packages &amp; Services
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#66635D] max-w-md font-medium">
              Every home project connects architectural design, fixed-price civil construction, and interior millwork. Explore how this capability pairs with our structured packages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Matching Package Card */}
            <div className="p-7 sm:p-8 bg-white border-2 border-[#111111] flex flex-col justify-between space-y-6 hover:border-[#EA580C] hover:shadow-lg transition-all">
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 bg-[#111111] text-[#FB923C] text-[10px] font-bold uppercase tracking-wider">
                  {interlink.packageBadge}
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#111111]">
                  {interlink.packageTitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#55534E] leading-relaxed font-medium">
                  {interlink.packageSummary}
                </p>
                <ul className="space-y-1.5 pt-2 text-xs font-semibold text-[#222222]">
                  {interlink.packageBullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2">
                      <span className="text-[#EA580C]">✔</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#111111]/10">
                <Link
                  href={interlink.packageHref}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-wider text-[11px] hover:bg-[#111111] hover:text-white transition-colors"
                >
                  <span>Explore {interlink.packageTitle}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Sibling Capability Card */}
            <div className="p-7 sm:p-8 bg-white border-2 border-[#111111] flex flex-col justify-between space-y-6 hover:border-[#EA580C] hover:shadow-lg transition-all">
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 bg-[#EA580C] text-[#111111] text-[10px] font-bold uppercase tracking-wider">
                  {interlink.siblingBadge}
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#111111]">
                  {interlink.siblingTitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#55534E] leading-relaxed font-medium">
                  {interlink.siblingSummary}
                </p>
                <ul className="space-y-1.5 pt-2 text-xs font-semibold text-[#222222]">
                  {interlink.siblingBullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2">
                      <span className="text-[#EA580C]">✔</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={interlink.siblingHref}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#111111] text-white font-bold uppercase tracking-wider text-[11px] hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
                >
                  <span>Read Service Guide</span>
                  <ArrowRight size={13} />
                </Link>
                <Link
                  href="/gallery"
                  className="text-[11px] font-bold uppercase tracking-wider text-[#757575] hover:text-[#EA580C] transition-colors"
                >
                  View Related Projects ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 · Frequently Asked Questions ── */}
      <section className="border-b border-[#111111]/15 bg-white px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
          <header data-motion-reveal className="lg:col-span-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C2410C]">06 &bull; Asked before starting</p>
            <h2 className="font-serif text-3xl font-bold tracking-[-0.04em] md:text-4xl lg:text-5xl [text-wrap:balance]">
              Everything you are wondering.
            </h2>
            <p className="mt-4 text-xs font-medium leading-relaxed text-[#66635D] [text-wrap:pretty]">
              Direct answers to common questions about timelines, price guarantees, revisions, and site procedures.
            </p>
          </header>
          <div className="mpa-faq lg:col-span-8">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="border-b border-[#111111]/15 py-4">
                <summary className="cursor-pointer font-serif text-lg font-bold text-[#111111] hover:text-[#C2410C]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm font-normal leading-relaxed text-[#55534E] [text-wrap:pretty]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08 · Consultation Next Step (CTA) ── */}
      <section className="relative overflow-hidden bg-[#121418] px-6 py-20 text-white md:px-12 md:py-28">
        {/* Background Architectural Project Image */}
        <Image
          src={service.heroImage || "/images/architecture/turnkey-key-handover.webp"}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-85 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/90 via-[#121418]/60 to-[#121418]/30 pointer-events-none" />
        <div data-motion-reveal className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#FB923C]">Your next step &bull; No pressure</p>
          <h2 className="font-serif text-3xl font-bold leading-[1.06] tracking-[-0.04em] md:text-5xl lg:text-6xl [text-wrap:balance] drop-shadow-md">
            Tell us about your plot.<br />
            <em className="font-normal text-[#FB923C]">We will guide what comes next.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-relaxed text-white/70 md:text-base [text-wrap:pretty]">
            Share your plot location, requirements, and investment range. We will provide an honest appraisal of whether {serviceName} is your ideal starting point — and schedule your first studio consultation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={nextStep.href}
              className="inline-flex items-center gap-2 bg-[#EA580C] px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#111111] transition-colors hover:bg-white"
            >
              <span>{nextStep.label}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href="/contact#enquiry"
              className="inline-flex items-center gap-2 border border-white/40 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-[#111111]"
            >
              <span>Schedule Plot Feasibility</span>
            </Link>
            <a
              href={`https://wa.me/${phone}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white hover:text-[#111111]"
            >
              <MessageCircle size={14} aria-hidden="true" />
              <span>WhatsApp Our Studio</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 09 · Next / Previous Service Navigation ── */}
      <nav aria-label="Other services" className="grid border-t border-[#111111]/20 bg-[#EFEBE4] sm:grid-cols-3">
        <Link
          href={`/services/${previousService.slug}`}
          className="group flex min-h-36 items-center gap-5 border-b border-[#111111]/20 p-7 transition-colors hover:bg-white sm:border-b-0 sm:border-r md:p-10"
        >
          <ArrowLeft size={20} className="shrink-0 text-[#C2410C] transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#77736C]">Previous service</span>
            <span className="mt-1 block font-serif text-lg font-bold md:text-xl">{previousService.title} {previousService.accent}</span>
          </span>
        </Link>
        <Link
          href="/services"
          className="group flex min-h-28 items-center justify-center border-b border-[#111111]/20 p-7 text-center transition-colors hover:bg-white sm:min-h-36 sm:border-b-0 sm:border-r md:p-10"
        >
          <span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#77736C]">All capabilities</span>
            <span className="mt-1 block font-serif text-lg font-bold md:text-xl">Service Overview</span>
          </span>
        </Link>
        <Link
          href={`/services/${nextService.slug}`}
          className="group flex min-h-36 items-center justify-end gap-5 p-7 text-right transition-colors hover:bg-white md:p-10"
        >
          <span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#77736C]">Next service</span>
            <span className="mt-1 block font-serif text-lg font-bold md:text-xl">{nextService.title} {nextService.accent}</span>
          </span>
          <ArrowRight size={20} className="shrink-0 text-[#C2410C] transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </nav>
    </article>
  );
}
