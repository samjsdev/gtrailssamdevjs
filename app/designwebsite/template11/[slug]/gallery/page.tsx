import { readSourceConfig } from '@/lib/dataBuilder';
import { previewMedia } from '@/lib/architectureContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { Sparkles, MapPin, Clock, ArrowRight } from 'lucide-react';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import GalleryGrid, { GalleryItem } from './GalleryGrid';

type PageProps = { params: Promise<{ slug: string }> };

const GALLERY_FALLBACK = [
  '/images/architecture/hero-villa-twilight.webp',
  '/images/architecture/modern-villa-duplex.webp',
  '/images/architecture/civic-landmark-facade.webp',
  '/images/architecture/courtyard-water-residence.webp',
  '/images/architecture/porotherm-clay-facade.webp',
  '/images/architecture/monolithic-brutalist-facade.webp',
  '/images/architecture/villa-after-finished.webp',
  '/images/architecture/structural-construction-frame.webp',
  '/images/architecture/terrace-cool-roof.webp',
];

const CASE_STUDIES = [
  {
    title: 'Modern Beachfront Villa',
    sqft: '5,400 sq.ft · 4-BHK Luxury Villa',
    timeline: '12 Months',
    theme: 'Modern Luxury Villa',
    challenge: 'A coastal plot along ECR requiring marine-grade structural corrosion protection and wide verandas facing sea breezes.',
    solution: 'Engineered with marine-grade Tata Tiscon steel, high plinth flood protection, shaded verandas, and energy-efficient sliding glass facades.',
    img: '/images/architecture/hero-villa-twilight.webp',
  },
  {
    title: 'Commercial Office Complex',
    sqft: '9,600 sq.ft · G+3 Commercial Building',
    timeline: '10 Months',
    theme: 'Commercial Architecture',
    challenge: 'An urban commercial plot along OMR IT Corridor requiring maximum allowable FSI, ground-floor parking, and an energy-efficient glass facade.',
    solution: 'Engineered with column-free floor plates, Saint-Gobain solar-reflective curtain glazing, automated fire-safety systems, and dedicated service shafts.',
    img: '/images/architecture/civic-landmark-facade.webp',
  },
];

const DESIGN_STYLES = [
  {
    name: 'Modern Luxury Villas',
    desc: 'Spacious multi-level floor plans, high ceilings, private parking, and large energy-efficient glass windows designed for coastal and suburban Chennai plots.',
  },
  {
    name: 'Residential Independent Houses',
    desc: 'Functional G+1 and G+2 duplex homes with covered car parking, flood-safe raised plinths, 100% Vaastu compliance, and heat-resistant cool roofs.',
  },
  {
    name: 'Commercial Buildings & Offices',
    desc: 'Commercial complexes, retail spaces, and corporate offices planned for maximum legal FSI, column-free floors, and statutory fire-safety clearances.',
  },
  {
    name: 'Traditional Courtyard Homes',
    desc: 'Authentic courtyard residences (mutham) engineered with natural cross-ventilation, shaded verandas, and clay jali blocks that keep rooms naturally cool.',
  },
];

export default async function Template11Gallery({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template11/${slug}`;

  const data = await readSourceConfig(slug, 'template11');
  if (!data) return notFound();

  const { clinic } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const city = clinic.address?.city || 'Chennai';

  const uniqueImages = Array.from(
    new Set(
      [
        ...(media.clinicImages || []),
        ...(media.treatmentImages || []),
        ...(media.otherImages || []),
      ].filter(Boolean)
    )
  ) as string[];

  const sourceImages = uniqueImages.length > 0 ? uniqueImages : GALLERY_FALLBACK;
  const cats = ['Luxury Villas', 'Residential Houses', 'Commercial Buildings', 'Civil Construction'];
  const items: GalleryItem[] = sourceImages.slice(0, 24).map((img, idx) => ({
    img,
    title: `${cats[idx % cats.length]} — Project ${String(idx + 1).padStart(2, '0')}`,
    cat: cats[idx % cats.length],
  }));

  return (
    <div>
      {/* PAGE HERO */}
      <section id="gallery-hero" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-5 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              Delivered Projects
            </span>
            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(38px,5vw,68px)] leading-[1.08] max-w-[760px]">
              The {cleanName || 'studio'} <em className="not-italic italic font-light text-[#c9ab7c]">portfolio</em>
            </h1>
            <p className="mt-6 max-w-[580px] text-[16.5px] font-light leading-[1.75] text-white/80">
              {cleanDesc || `A real portfolio of homes and buildings delivered across ${city}. Every photograph shows genuine craftsmanship, precise engineering, and careful planning.`}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED CASE STUDIES */}
      <section className="py-[clamp(70px,8vw,110px)] px-6 lg:px-7 bg-[#fdfbf6] border-b border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Case Studies
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.8vw,48px)] leading-[1.12]">
              Inside our signature <em className="not-italic italic font-light text-[#a58150]">transformations</em>
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10">
            {CASE_STUDIES.map((study, idx) => (
              <Reveal key={study.title} delay={idx * 100}>
                <div className="bg-[#f6f1e8] border border-[#211a13]/10 overflow-hidden flex flex-col justify-between h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={study.img} alt={study.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-4 text-[12px] text-[#a58150] uppercase tracking-[0.15em] font-medium mb-3">
                      <span>{study.sqft}</span>
                      <span>·</span>
                      <span>{study.timeline}</span>
                      <span>·</span>
                      <span>{study.theme}</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-marcellus)] text-[24px] mb-3 text-[#211a13]">
                      {study.title}
                    </h3>
                    <p className="text-[14px] text-[#7d7264] font-light leading-[1.7] mb-4">
                      <b className="text-[#211a13] font-medium">Brief:</b> {study.challenge}
                    </p>
                    <p className="text-[14px] text-[#7d7264] font-light leading-[1.7] mb-6">
                      <b className="text-[#211a13] font-medium">Solution:</b> {study.solution}
                    </p>
                    <Link
                      href={`${basePath}/contact`}
                      className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase font-medium text-[#211a13] border-b border-[#a58150] pb-1 hover:text-[#a58150]"
                    >
                      Enquire for a Similar Home &rarr;
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN STYLES EXPLORER */}
      <section className="py-[clamp(70px,8vw,110px)] px-6 lg:px-7 bg-[#211a13] text-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c] after:content-[''] after:w-10 after:h-px after:bg-[#c9ab7c]">
              Building Styles We Deliver
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-4">
              Explore construction styles for <em className="not-italic italic font-light text-[#c9ab7c]">your home</em>
            </h2>
            <p className="text-white/70 font-light text-[15px]">
              Every home is customized to your plot, your family's needs, and your budget.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESIGN_STYLES.map((style, idx) => (
              <Reveal key={style.name} delay={idx * 80}>
                <div className="bg-[#2c231a] border border-[#a58150]/25 p-7 h-full flex flex-col justify-between">
                  <div>
                    <span className="font-[family-name:var(--font-marcellus)] text-[22px] text-[#c9ab7c] block mb-3">
                      0{idx + 1}
                    </span>
                    <h3 className="font-[family-name:var(--font-marcellus)] text-[20px] text-white mb-2.5">
                      {style.name}
                    </h3>
                    <p className="text-[13px] font-light text-white/65 leading-[1.7]">
                      {style.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section id="gallery-grid" className="py-[clamp(84px,9vw,120px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-10">
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Full Gallery Archive
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.6vw,48px)] leading-[1.12]">
              Explore projects by <em className="not-italic italic font-light text-[#a58150]">building typology</em>
            </h2>
          </Reveal>

          <Reveal>
            <GalleryGrid items={items} />
          </Reveal>
        </div>
      </section>

      <PageNarrative page="gallery" studioName={cleanName} city={city} />

      {/* CTA */}
      <section id="gallery-cta" className="bg-[#fdfbf6] border-t border-[#211a13]/10 px-6 lg:px-7 py-[clamp(64px,7vw,100px)]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.8vw,50px)] leading-[1.12] mb-6">
              Picture your home <em className="not-italic italic font-light text-[#a58150]">on this page</em>
            </h2>
            <p className="text-[#7d7264] font-light leading-[1.8] mb-9 text-[16px]">
              Every home here began with an open conversation over floor plans and coffee. Let&rsquo;s craft yours.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 bg-[#211a13] text-white px-5 py-3 sm:px-6 sm:py-3.5 text-[10.5px] sm:text-[11.5px] tracking-[0.2em] uppercase font-medium border border-[#211a13] hover:bg-[#a58150] hover:border-[#a58150] transition-colors duration-300"
            >
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
