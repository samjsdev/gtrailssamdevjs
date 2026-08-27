import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from './HeroSlider';
import StatsBand from './StatsBand';
import ServicesMarquee from './ServicesMarquee';
import ProjectMarquee from './ProjectMarquee';
import ProjectCarousel from './ProjectCarousel';
import TestimonialCarousel from './TestimonialCarousel';
import CostEstimator from './CostEstimator';
import ConsultationForm from './ConsultationForm';
import {
  Building2, Compass, ShieldCheck, Award,
  ArrowRight, Phone, Users, Star, Layers,
  Check, HardHat, FileText, Clock,
} from 'lucide-react';

interface PageProps {
  params?: any;
}

export default async function HomePage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicPhone = '98410 98490';
  const rawPhone = '919841098490';

  const packagesData = [
    {
      id: 'standard',
      name: 'Standard',
      rate: '2,050',
      badge: '',
      highlight: false,
      description: 'Quality construction with trusted branded materials for budget-conscious families.',
      features: [
        'FE 550 ISI TMT Steel (Kamachi / ARS)',
        '53-Grade PPC Cement (Coromandel / Chettinad)',
        '2x2 Vitrified Tiles (Somany / Kajaria)',
        'Teak Main Door + UPVC Windows',
        '10-Year Structural Warranty',
      ],
      timeline: '7 – 9 Months',
    },
    {
      id: 'premium',
      name: 'Premium',
      rate: '2,450',
      badge: 'Most Popular',
      highlight: true,
      description: 'Architect-designed turnkey residence with premium finishes and modular interiors.',
      features: [
        'Tata Tiscon / JSW Neosteel 550D TMT',
        'UltraTech / Ramco Supergrade Cement',
        '4x2 Glazed Vitrified / Granite Inlays',
        'Burma Teak Door + Kommerling UPVC',
        'Modular Kitchen & Wardrobes Included',
        '10-Yr Warranty + 5-Yr Maintenance',
      ],
      timeline: '8 – 11 Months',
    },
    {
      id: 'luxury',
      name: 'Ultra Luxury',
      rate: '2,950+',
      badge: 'Signature',
      highlight: false,
      description: 'Custom architectural masterpiece with Italian marble and bespoke millwork.',
      features: [
        'Tata Tiscon 550D + Anti-Seismic Design',
        'Italian Marble (Bottochino / Statuario)',
        'Grohe / Kohler Designer Collections',
        'Schüco Aluminium + Teak Paneling',
        'Island Kitchen & Fluted Glass Interiors',
        'Comprehensive 10-Yr Joinery Warranty',
      ],
      timeline: '10 – 14 Months',
    },
  ];

  return (
    <div className="w-full bg-[#FAF9F7] text-[#1A1B1A] font-sans">
      {/* 1. Full-screen hero slider */}
      <HeroSlider />

      {/* 2. Orange services marquee strip */}
      <ServicesMarquee />

      {/* 3. Gold trust band (name-board echo) */}
      <StatsBand />

      {/* 4. Services we offer — minimal intro + slim pillar cards */}
      <section id="services" className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-extrabold tracking-[0.3em] uppercase text-stone-400 block">
              What we do?
            </span>
            <h2 className="text-4xl sm:text-5xl font-sans tracking-tight text-stone-900">
              <span className="font-light">SERVICES</span>{' '}
              <span className="font-extrabold text-[#E64D16]">WE OFFER</span>
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Architecture, construction, and interiors — one team, one contract, one point of responsibility from foundation to handover.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="group bg-[#FAF9F7] border border-stone-200 rounded-lg overflow-hidden hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/stock/1c7b75e9.webp"
                  alt="Architectural Design & 3D Elevations"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1A]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-md bg-[#E64D16] text-white flex items-center justify-center shadow-lg">
                  <Compass className="w-6 h-6" />
                </div>
              </div>
              <div className="p-7 space-y-3 flex-1 flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Discipline 01</span>
                <h3 className="text-xl font-bold text-stone-900">
                  Architectural Design &amp; 3D Elevations
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed flex-1">
                  2D plans, photorealistic 3D facades, CMDA / DTCP sanction drawings, and Vastu-aligned spatial planning.
                </p>
                <Link
                  href="/services#architecture"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#E64D16] pt-3 border-t border-stone-200 group-hover:text-[#A6340C]"
                >
                  <span>Explore Design Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="group bg-[#FAF9F7] border-2 border-[#E64D16]/50 rounded-lg overflow-hidden hover:border-[#E64D16] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col relative">
              <span className="absolute top-4 left-4 z-10 px-3 py-0.5 bg-[#E64D16] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow">
                Core Specialty
              </span>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/clinicImages-1.jpg"
                  alt="Turnkey Residential Construction"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1A]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-md bg-[#242624] text-white flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-[#E64D16]" />
                </div>
              </div>
              <div className="p-7 space-y-3 flex-1 flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Discipline 02</span>
                <h3 className="text-xl font-bold text-stone-900">
                  Turnkey Home Construction
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed flex-1">
                  Soil testing to handover — RCC framing, branded materials, daily engineer supervision, 10-year warranty.
                </p>
                <Link
                  href="/services#construction"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#E64D16] pt-3 border-t border-stone-200 group-hover:text-[#A6340C]"
                >
                  <span>View Construction Scope</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="group bg-[#FAF9F7] border border-stone-200 rounded-lg overflow-hidden hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/stock/c87d10e5.webp"
                  alt="Bespoke Modular Interiors"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1A]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-md bg-gradient-to-br from-[#B8934B] to-[#96742E] text-white flex items-center justify-center shadow-lg">
                  <Layers className="w-6 h-6" />
                </div>
              </div>
              <div className="p-7 space-y-3 flex-1 flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Discipline 03</span>
                <h3 className="text-xl font-bold text-stone-900">
                  Modular Kitchens &amp; Interiors
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed flex-1">
                  Factory CNC joinery in 100% BWR marine plywood — quartz kitchens, fluted wardrobes, designer ceilings.
                </p>
                <Link
                  href="/services#interiors"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#E64D16] pt-3 border-t border-stone-200 group-hover:text-[#A6340C]"
                >
                  <span>Explore Interior Solutions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Completed projects auto-marquee */}
      <ProjectMarquee />

      {/* 6. Construction packages — simplified symmetric 3-col */}
      <section id="packages" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F8F1E2] border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-extrabold tracking-[0.3em] uppercase text-stone-400 block">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans tracking-tight text-stone-900">
              <span className="font-light">CONSTRUCTION</span>{' '}
              <span className="font-extrabold text-[#E64D16]">PACKAGES</span>
            </h2>
            <p className="text-sm text-stone-600">
              Fixed rate per sq.ft with itemized material benchmarks. Minimum 1,200 sq.ft built-up.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packagesData.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-lg p-8 transition-all duration-300 flex flex-col ${
                  pkg.highlight
                    ? 'bg-white border-2 border-[#E64D16] shadow-xl relative'
                    : 'bg-white border border-stone-200 shadow-sm hover:shadow-lg'
                }`}
              >
                {pkg.badge && (
                  <span
                    className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full w-fit ${
                      pkg.highlight ? 'bg-[#E64D16] text-white' : 'bg-[#B8934B]/15 text-[#7A5F2A] border border-[#B8934B]/40'
                    }`}
                  >
                    {pkg.badge}
                  </span>
                )}

                <div className="space-y-5 flex-1">
                  <div className="space-y-2 pt-2">
                    <h3 className="text-2xl font-bold text-stone-900">{pkg.name}</h3>
                    <p className="text-xs text-stone-600 min-h-10">{pkg.description}</p>
                  </div>

                  <div className="p-4 bg-[#F8F1E2] rounded-md border border-[#B8934B]/30 text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-xs font-bold text-stone-500">₹</span>
                      <span className="text-4xl font-black text-stone-900">{pkg.rate}</span>
                      <span className="text-xs font-semibold text-stone-500">/ sq.ft</span>
                    </div>
                    <span className="text-[11px] text-[#E64D16] font-semibold block mt-1">Handover in {pkg.timeline}</span>
                  </div>

                  <div className="space-y-2.5 pt-2 text-xs">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#E64D16] shrink-0 mt-0.5" />
                        <span className="text-stone-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-stone-100 space-y-2">
                  <Link
                    href="#consultation-form-section"
                    className={`w-full py-3.5 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      pkg.highlight
                        ? 'bg-[#E64D16] hover:bg-[#C93F0F] text-white shadow-md'
                        : 'bg-[#242624] hover:bg-[#E64D16] text-white'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                  <a
                    href={`https://wa.me/${rawPhone}?text=${encodeURIComponent(`Hi ARCH Foundations & MPA, I want the ${pkg.name} package details (₹${pkg.rate}/sqft).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 text-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 block"
                  >
                    Request itemized sheet on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-stone-500">
            * Rates valid for residential construction in Chennai. Exact quote after free site survey &amp; soil test.
          </p>
        </div>
      </section>

      {/* 7. Interactive cost calculator */}
      <section id="cost-calculator" className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-extrabold tracking-[0.3em] uppercase text-stone-400 block">
              Interactive Estimator
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans tracking-tight text-stone-900">
              <span className="font-light">ESTIMATE YOUR</span>{' '}
              <span className="font-extrabold text-[#E64D16]">CONSTRUCTION COST</span>
            </h2>
            <p className="text-sm text-stone-600">
              Select area, floors, and specification to preview an instant stage-wise budget for your plot in Chennai.
            </p>
          </div>

          <CostEstimator />
        </div>
      </section>

      {/* 8. Why us — image + 6 compact cards */}
      <section id="why-us" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF9F7] border-b border-stone-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-extrabold tracking-[0.3em] uppercase text-stone-400 block">
              Why choose us
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans tracking-tight text-stone-900">
              <span className="font-light">BUILT ON</span>{' '}
              <span className="font-extrabold text-[#E64D16]">TRUST</span>
            </h2>
            <p className="text-sm text-stone-600">
              Systems proven over 28 years and 500+ homes — engineering rigor without the premium-firm price.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/stock/d2cd7311.webp"
                  alt="Engineer reviewing structural drawings on site"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute bottom-4 left-4 bg-[#242624]/85 backdrop-blur-sm text-white px-4 py-2.5 rounded-md text-xs font-semibold flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-[#E64D16]" />
                  <span>On-site engineering, every single day</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: <ShieldCheck className="w-5 h-5" />,
                  title: 'Zero Cost Overrun Guarantee',
                  desc: 'Once the BOQ is signed, your price is locked 100% — we absorb steel & cement inflation.',
                },
                {
                  icon: <HardHat className="w-5 h-5" />,
                  title: 'Dedicated Site Engineer',
                  desc: 'A full-time civil engineer on your site every day — concrete pours, rebar, alignments.',
                },
                {
                  icon: <Check className="w-5 h-5" />,
                  title: '400+ Quality Checks',
                  desc: 'Concrete cube tests, laser alignment, damp-proofing — every stage audited.',
                },
                {
                  icon: <Award className="w-5 h-5" />,
                  title: 'Since 1998 • 28+ Years',
                  desc: 'Continuous architecture & construction practice in Chennai for nearly three decades.',
                },
                {
                  icon: <FileText className="w-5 h-5" />,
                  title: 'Weekly Progress Reports',
                  desc: 'HD photo & video milestone reports on WhatsApp and email — full transparency.',
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  title: '10-Year Structural Warranty',
                  desc: 'Legally backed certificate protecting foundation, columns, beams, and slabs.',
                },
              ].map((item) => (
                <div key={item.title} className="p-6 bg-white border border-stone-200 rounded-md space-y-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-md bg-orange-100 text-[#E64D16] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-stone-900">{item.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Six-stage turnkey process */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-extrabold tracking-[0.3em] uppercase text-stone-400 block">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans tracking-tight text-stone-900">
              <span className="font-light">OUR 6-STAGE</span>{' '}
              <span className="font-extrabold text-[#E64D16]">TURNKEY JOURNEY</span>
            </h2>
            <p className="text-sm text-stone-600">
              A structured roadmap ensuring on-time delivery with zero surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {[
              {
                step: '01',
                title: 'Survey & 3D Concept',
                desc: 'Laser site survey, soil study, CMDA setbacks, Vastu alignment, photorealistic 3D elevations.',
              },
              {
                step: '02',
                title: 'Structural Design & Approvals',
                desc: 'RCC analysis, beam schedules, MEP layouts, and municipal sanction assistance.',
              },
              {
                step: '03',
                title: 'Itemized BOQ & Fixed Price',
                desc: 'Line-by-line material specs signed off with a 100% price freeze guarantee.',
              },
              {
                step: '04',
                title: 'Civil Construction & QC',
                desc: 'Anti-termite foundation, RCC framing, masonry, curing, 400+ cube tests.',
              },
              {
                step: '05',
                title: 'Interiors & Joinery',
                desc: 'Factory CNC modular kitchen, wardrobes, false ceiling, and painting.',
              },
              {
                step: '06',
                title: 'Audit & Handover',
                desc: 'Deep clean, snag-list clearance, warranty documentation, key handover.',
              },
            ].map((stage) => (
              <div key={stage.step} className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-md bg-[#FAF9F7] border border-stone-200 flex items-center justify-center text-base font-black text-[#E64D16]">
                  {stage.step}
                </div>
                <h3 className="text-base font-bold text-stone-900 pt-1.5">{stage.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-1.5">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Project showcase carousel + category quick links */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF9F7] border-b border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-4 max-w-2xl">
              <span className="text-[11px] font-extrabold tracking-[0.3em] uppercase text-stone-400 block">
                Completed Sites &amp; 3D Designs
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans tracking-tight text-stone-900">
                <span className="font-light">EXPLORE OUR</span>{' '}
                <span className="font-extrabold text-[#E64D16]">DELIVERED LANDMARKS</span>
              </h2>
            </div>

            <Link
              href="/gallery"
              className="px-6 py-3 bg-[#242624] hover:bg-[#E64D16] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all flex items-center gap-2"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProjectCarousel />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Turnkey Villas', count: '180+ Delivered', img: '/images/stock/34bba44b.webp' },
              { label: '3D Elevations', count: '320+ Designed', img: '/images/stock/1c7b75e9.webp' },
              { label: 'Modular Kitchens', count: '260+ Installed', img: '/images/stock/c87d10e5.webp' },
              { label: 'Full Interiors', count: '210+ Handed Over', img: '/images/stock/0d97766b.webp' },
            ].map((c) => (
              <Link
                key={c.label}
                href="/gallery"
                className="group relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={c.img}
                  alt={c.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1A]/85 to-transparent group-hover:from-[#E64D16]/80 transition-all duration-300" />
                <div className="absolute bottom-3.5 left-4 text-white">
                  <div className="font-bold text-sm">{c.label}</div>
                  <div className="text-[11px] text-[#E6C673] font-semibold">{c.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Testimonials */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-extrabold tracking-[0.3em] uppercase text-stone-400 block">
              Homeowner Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans tracking-tight text-stone-900">
              <span className="font-light">RATED 4.8 / 5.0 BY</span>{' '}
              <span className="font-extrabold text-[#E64D16]">CHENNAI FAMILIES</span>
            </h2>
            <p className="text-sm text-stone-600">
              Read authentic feedback from families who entrusted their lifelong home to us.
            </p>
          </div>

          <TestimonialCarousel />

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
            {[
              { icon: <Users className="w-5 h-5" />, text: '500+ Homes Delivered' },
              { icon: <Star className="w-5 h-5" />, text: '4.8 Google Rating' },
              { icon: <Building2 className="w-5 h-5" />, text: 'Chennai & TN Coverage' },
              { icon: <Phone className="w-5 h-5" />, text: 'Direct Engineer Access' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2.5 text-stone-700">
                <span className="text-[#E64D16]">{b.icon}</span>
                <span className="text-xs font-bold">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Book free consultation */}
      <section id="consultation-form-section" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto">
          <ConsultationForm phone={clinicPhone} />
        </div>
      </section>
    </div>
  );
}
