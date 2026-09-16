import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Compass, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ArrowRight,
  HardHat,
  Sparkles,
  Users,
  Target,
  Eye,
  HeartHandshake
} from 'lucide-react';
import ArchitecturalDiagramBg from '@/components/ArchitecturalDiagramBg';

interface PageProps {
  params?: any;
}

const COMPANY_TIMELINE = [
  {
    year: '1998',
    title: 'The Foundation',
    desc: 'Started as a boutique architectural design studio in Anna Nagar, Chennai, focusing on bespoke residential planning.',
  },
  {
    year: '2005',
    title: 'ARCH Foundation',
    desc: 'ARCH Foundation, part of MPA, became the dedicated construction team, ensuring MPA architectural designs were executed with engineering discipline and site accountability.',
  },
  {
    year: '2012',
    title: 'In-House Interiors',
    desc: 'Established our own modular carpentry factory, bringing complete turnkey interior execution under one roof.',
  },
  {
    year: '2024',
    title: 'Market Leadership',
    desc: 'Now running a dedicated team of over 150+ professionals and managing 30+ premium residential sites simultaneously.',
  },
];

const COMPANY_STATS = [
  { value: '1,50,000+', label: 'Sq.Ft. Built', desc: 'Premium residential space constructed across Chennai' },
  { value: '500+', label: 'Homes Delivered', desc: 'Villas, bungalows, and independent houses completed' },
  { value: '150+', label: 'In-House Experts', desc: 'Architects, engineers, and master craftsmen' },
  { value: '28+', label: 'Years Legacy', desc: 'Continuous operation and trust since 1998' },
];

const LEADERSHIP_FOUNDERS = [
  {
    name: 'Ar. S. Murali',
    designation: 'Principal Architect & Founder',
    experience: '28+ Years Experience',
    image: '/images/architecture/principal-architect.webp',
    bio: 'An experienced visionary who leads the architectural design, space planning, and aesthetic direction at MPA. With a deep understanding of tropical architecture and modern minimalism, he ensures every home is designed with meticulous attention to detail. His approach seamlessly integrates traditional Vastu principles with contemporary spatial layouts, maximizing natural light, cross-ventilation, and functional elegance. Over his extensive career, he has pioneered designs that not only look breathtaking but also enhance the daily living experience of modern families.',
    focus: 'Architectural Design, Master Planning, Facade Aesthetics',
  },
  {
    name: 'Er. R. Sundaram',
    designation: 'Construction Lead, ARCH Foundation',
    experience: '30+ Years Experience',
    image: '/images/architecture/senior-structural-engineer.webp',
    bio: 'A seasoned structural expert with decades of hands-on experience in civil engineering and residential construction. At ARCH Foundation, he oversees structural integrity, RCC framework design, and rigorous site execution. His engineering philosophy prioritizes safety, longevity, and uncompromising material quality. From soil mechanics and foundation planning to dedicated site teams, he ensures each MPA design is translated into a dependable built structure.',
    focus: 'Structural Engineering, RCC Framework Design, Soil Mechanics',
  },
];

const TEAM_DEPARTMENTS = [
  {
    icon: Compass,
    title: 'Architectural & 3D Design Team',
    desc: 'Our in-house architects and 3D visualizers handle everything from Vastu-compliant spatial planning and structural drafting to photorealistic exterior elevations and interior layouts.',
    deliverables: ['2D Floor Plans & Working Drawings', 'Photorealistic 3D Elevations', 'Vastu & Spatial Optimization'],
    serviceLink: '/services/architectural-design',
    serviceLabel: 'Architecture Guide',
    packageLink: '/design-package',
    packageLabel: 'Design Packages',
  },
  {
    icon: HardHat,
    title: 'ARCH Foundation — Civil Engineering Team',
    desc: 'ARCH Foundation’s structural consultants and resident civil engineers oversee soil analysis, foundation design, RCC framing and construction delivery.',
    deliverables: ['Seismic Zone III RCC Framing', 'Soil Mechanics & Foundation Design', '10-Year Structural Integrity'],
    serviceLink: '/services/residential-construction',
    serviceLabel: 'Civil Build Guide',
    packageLink: '/construction-package',
    packageLabel: 'Build Packages',
  },
  {
    icon: ShieldCheck,
    title: 'ARCH Foundation — Site & Quality Team',
    desc: 'Dedicated ARCH Foundation site engineers and quality managers conduct the stage-wise checks that control construction quality and progress.',
    deliverables: ['Daily On-Site Quality Monitoring', 'Concrete Cube & Material Testing', 'Daily App Photo & Progress Updates'],
    serviceLink: '/services/turnkey-construction',
    serviceLabel: 'Turnkey Workflow',
    packageLink: '/construction-package',
    packageLabel: 'Turnkey Packages',
  },
  {
    icon: Building2,
    title: 'Modular Interiors & Joinery Team',
    desc: 'Experienced interior designers and master carpenters delivering custom modular kitchens, wardrobes, and architectural woodwork with premium materials.',
    deliverables: ['100% BWR Marine Plywood (IS:710)', 'Precision Factory Joinery', 'End-to-End Interior Execution'],
    serviceLink: '/services/interior-design',
    serviceLabel: 'Interiors Guide',
    packageLink: '/gallery',
    packageLabel: 'Interior Works',
  },
];

const CORE_VALUES = [
  {
    icon: Eye,
    title: 'Our Vision',
    subtitle: 'Setting the Benchmark for Quality Living',
    desc: 'To make Murali Patharala & Associates Chennai’s most trusted architectural design practice—recognized for spatial clarity, enduring aesthetics, and homes conceived around real life.',
  },
  {
    icon: Target,
    title: 'Our Mission',
    subtitle: 'Building Certainty into Every Home',
    desc: 'To unite architectural and interior design by MPA with civil construction by ARCH Foundation under one accountable turnkey workflow—backed by clear pricing, rigorous quality checks, and disciplined delivery.',
  },
  {
    icon: HeartHandshake,
    title: 'Our Philosophy',
    subtitle: 'Honesty, Discipline & Enduring Quality',
    desc: 'We believe building a home is a lifetime milestone for a family. We replace contractor ambiguity with architectural discipline, fixed pricing, and uncompromising material standards—building relationships that last for generations.',
  },
];

const HIGHLIGHTS = [
  { value: '28+', label: 'Years of Experience', desc: 'Serving Chennai homeowners since 1998' },
  { value: '500+', label: 'Homes Delivered', desc: 'Bespoke villas & turnkey residences completed' },
  { value: '425+', label: 'Quality Checks', desc: 'Stage-by-stage structural and material inspections' },
  { value: '10 Yr', label: 'Structural Warranty', desc: 'Written warranty backing every home we construct' },
];

export default async function AboutPage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const phone = '09841098490';
  const displayPhone = '+91 98410 98490';
  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  return (
    <div className="w-full bg-[#FAFAFA] text-[#111111]">
      {/* ── 1. Hero Header Banner ── */}
      <section className="relative py-20 md:py-28 bg-[#121418] text-white border-b-4 border-[#111111] px-6 md:px-12 overflow-hidden">
        {/* Atmospheric Design Studio & Master Architecture Background */}
        <Image
          src="/images/architecture/atelier-design-studio.webp"
          alt="Murali Patharala & Associates Architecture Studio"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-65 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/85 via-[#121418]/60 to-[#121418]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121418]/85 via-transparent to-[#121418]/85 pointer-events-none" />
        <ArchitecturalDiagramBg variant="master-plan" theme="dark" opacity={0.16} watermarkText="MPA FOUNDATION 1998" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#EA580C]/20 border border-[#EA580C] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#EA580C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
            <span>About Murali Patharala & Associates (MPA)</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight tracking-tight text-white drop-shadow-md"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Building Chennai&apos;s Finest Homes <br />
            <span className="text-[#EA580C]">With Passion, Precision &amp; Trust.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Murali Patharala &amp; Associates leads architecture and interior design, working with ARCH Foundation for civil construction and turnkey site delivery.
          </p>

          {/* Quick Stats Grid */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="bg-[#181818] border border-white/15 p-4 text-center">
                <span
                  className="text-3xl sm:text-4xl font-bold font-serif text-[#EA580C] block"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {h.value}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white block mt-1">
                  {h.label}
                </span>
                <span className="text-[10px] text-white/60 block mt-0.5 font-medium">
                  {h.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Who We Are Section ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] block">
              WHO WE ARE
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold font-serif text-[#111111] leading-tight tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Design leadership by MPA. Construction accountability by ARCH Foundation.
            </h2>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-medium">
              Murali Patharala &amp; Associates (MPA) is the architectural and interior design practice. Our licensed architects lead spatial planning, facade design, approvals coordination, 3D visualisation and bespoke interiors for residential projects.
            </p>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-medium">
              ARCH Foundation handles civil construction—from soil testing and RCC structure to electrical, plumbing, finishes and site supervision. Together, MPA and ARCH Foundation offer a coordinated turnkey path without blurring who is responsible for design and who is responsible for construction.
            </p>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-medium">
              If your home construction project needs experienced professionals who care about your budget, timeline, and quality—reach out to us today.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi ARCH Foundation, I am looking for expert residential construction services in Chennai.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-wider text-[11px] hover:bg-[#111111] hover:text-white transition-colors"
              >
                Reach Out to Our Experts &rarr;
              </a>
              <Link
                href="/services"
                className="px-5 py-3 border border-[#111111] text-[#111111] font-bold uppercase tracking-wider text-[11px] hover:bg-[#111111] hover:text-white transition-colors"
              >
                Explore Our Services
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] border-4 border-[#111111] bg-[#181818] overflow-hidden shadow-xl group">
              <Image
                src="/images/architecture/architectural-atelier-studio.webp"
                alt="Murali Patharala & Associates Head Studio Anna Nagar Chennai"
                fill
                className="object-cover grayscale-[0.15] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#111111]/95 text-white border-t-2 border-[#EA580C]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">Head Studio &bull; Anna Nagar</p>
                <p className="text-[11px] text-white/80">W115A, 3rd Ave, Annanagar East, Chennai 600040</p>
              </div>
            </div>

            <div className="p-5 border-2 border-[#111111] bg-[#FAFAFA] space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#EA580C]" />
                <span>Anna Nagar East Studio &bull; Since 1998</span>
              </p>
              <p className="text-xs text-[#666666] leading-relaxed">
                Design studio, architectural consultation lounge, and material selection centre open Mon – Sat: 9:30 AM – 7:30 PM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. The Numbers (Stats) ── */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#EA580C] text-[#111111] border-b-4 border-[#111111]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x-2 divide-[#111111]/20">
            {COMPANY_STATS.map((stat, idx) => (
              <div key={idx} className="text-center md:px-6 space-y-2">
                <p
                  className="text-4xl md:text-5xl font-bold font-serif tracking-tight"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest bg-[#111111] text-white py-1.5 px-2 inline-block">
                  {stat.label}
                </p>
                <p className="text-[11px] font-medium text-[#111111]/80 mt-2 max-w-[200px] mx-auto leading-relaxed hidden sm:block">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. The Journey (Timeline) ── */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-[#121418] text-white border-b-4 border-[#111111] overflow-hidden">
        <ArchitecturalDiagramBg variant="elevation" theme="dark" opacity={0.25} watermarkText="CHRONOLOGY &amp; ELEVATION" />
        <div className="relative z-10 max-w-5xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#EA580C]">
              OUR EVOLUTION
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              The MPA Journey
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-medium max-w-2xl mx-auto">
              From an architectural studio to one company with its own construction team in ARCH Foundation, our growth has been driven by design integrity, construction discipline and clear accountability.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-4 md:left-1/2 md:-ml-0.5 w-1 h-[calc(100%-4rem)] bg-[#262626]"></div>

            <div className="space-y-12">
              {COMPANY_TIMELINE.map((item, idx) => (
                <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                  
                  {/* Left Side (Empty for odd, Content for even) */}
                  <div className={`hidden md:block w-5/12 ${idx % 2 === 0 ? 'text-right pr-12' : ''}`}>
                    {idx % 2 === 0 && (
                      <div>
                        <h3 className="text-2xl font-bold font-serif text-white mb-2" style={{ fontFamily: "'Lora', serif" }}>{item.title}</h3>
                        <p className="text-sm text-white/60 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-0 md:left-1/2 -ml-2 md:-ml-6 w-12 h-12 rounded-full bg-[#111111] border-4 border-[#EA580C] flex items-center justify-center z-10 group-hover:bg-[#EA580C] transition-colors duration-500">
                    <span className="text-[10px] font-bold text-white group-hover:text-[#111111] transition-colors">{item.year}</span>
                  </div>

                  {/* Right Side (Content for odd, Empty for even on desktop) */}
                  <div className={`w-full pl-16 md:pl-12 md:w-5/12 ${idx % 2 === 0 ? 'md:hidden' : ''}`}>
                    <div className="md:hidden text-xs font-bold text-[#EA580C] mb-1">{item.year}</div>
                    <h3 className="text-2xl font-bold font-serif text-white mb-2" style={{ fontFamily: "'Lora', serif" }}>{item.title}</h3>
                    <p className="text-sm text-white/60 font-medium leading-relaxed">{item.desc}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Leadership & Founders ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#EA580C]">
              OUR LEADERSHIP
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold font-serif text-[#111111] tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Meet the Founders
            </h2>
            <p className="text-sm sm:text-base text-[#555555] font-medium max-w-2xl mx-auto">
              Driven by decades of engineering expertise and architectural passion, our founding team ensures every project meets the highest standards of safety, aesthetics, and structural integrity.
            </p>
          </div>

          <div className="space-y-20 md:space-y-28 mt-12">
            {LEADERSHIP_FOUNDERS.map((founder, idx) => (
              <div key={idx} className={`group flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-16 items-center`}>
                {/* Large Image Container */}
                <div className="w-full md:w-5/12 aspect-[4/5] relative border-4 border-[#111111] bg-[#FAFAFA] overflow-hidden shadow-2xl">
                  <Image
                    src={founder.image}
                    alt={`${founder.name} — ${founder.designation}`}
                    fill
                    className="object-cover object-top filter grayscale-[0.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                </div>

                {/* Expanded Content */}
                <div className="w-full md:w-7/12 space-y-8">
                  <div className="space-y-2 relative">
                    <div className="absolute -left-6 top-2 w-2 h-12 bg-[#EA580C] hidden md:block group-hover:h-full transition-all duration-500"></div>
                    <h3
                      className="text-4xl md:text-5xl font-bold font-serif text-[#111111] group-hover:text-[#EA580C] transition-colors"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {founder.name}
                    </h3>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#EA580C]">
                      {founder.designation}
                    </p>
                  </div>
                  
                  <div className="inline-block bg-[#111111] text-white px-4 py-2 text-xs font-bold tracking-widest uppercase">
                    {founder.experience}
                  </div>

                  <p className="text-base md:text-lg text-[#555555] leading-relaxed font-medium">
                    {founder.bio}
                  </p>

                  <div className="pt-6 border-t-2 border-[#E5E5E5]">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#111111] mb-4">Core Expertise:</p>
                    <div className="flex flex-wrap gap-2">
                      {founder.focus.split(', ').map((skill, sIdx) => (
                        <span key={sIdx} className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-2 text-xs text-[#555555] font-bold hover:bg-[#111111] hover:text-white transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Vision, Mission & Philosophy ── */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-[#131519] text-white overflow-hidden">
        <ArchitecturalDiagramBg variant="structural" theme="dark" opacity={0.28} watermarkText="PHILOSOPHY &amp; CAD" />
        <div className="relative z-10 max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#EA580C]">
              OUR FOUNDATION
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Vision, Mission &amp; Philosophy
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-medium max-w-xl mx-auto">
              The guiding principles that drive our architectural excellence and construction integrity every single day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CORE_VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="border-4 border-[#262626] bg-[#181818] p-8 flex flex-col justify-between hover:border-[#EA580C] transition-colors group space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-[#111111] border-2 border-[#EA580C] text-[#EA580C] flex items-center justify-center group-hover:bg-[#EA580C] group-hover:text-[#111111] transition-colors">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#EA580C] block mb-1">
                        Core Value 0{idx + 1}
                      </span>
                      <h3
                        className="text-2xl font-bold font-serif text-white mb-2"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {val.title}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
                        {val.subtitle}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
                      {val.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#262626] flex items-center gap-2 text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                    <span>MPA Standard</span>
                    <span>&bull;</span>
                    <span>Chennai</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Our Multidisciplinary In-House Team ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#EA580C]">
              ONE-STOP IN-HOUSE EXPERTISE
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold font-serif text-[#111111] tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Our Team of Experts
            </h2>
            <p className="text-sm md:text-base text-[#666666] font-medium max-w-xl mx-auto">
              We don&apos;t subcontract your dream home to third parties. Every discipline is managed directly by our dedicated in-house departments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_DEPARTMENTS.map((dept, idx) => {
              const IconComp = dept.icon;
              return (
                <div
                  key={idx}
                  className="p-8 border-2 border-[#111111] bg-[#FAFAFA] flex flex-col justify-between hover:border-[#EA580C] transition-colors space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-[#111111] text-[#EA580C] flex items-center justify-center">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold font-serif text-[#111111] leading-snug" style={{ fontFamily: "'Lora', serif" }}>
                      {dept.title}
                    </h3>
                    <p className="text-xs text-[#555555] leading-relaxed font-medium">
                      {dept.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E5E5] space-y-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C]">
                        What We Deliver:
                      </p>
                      <ul className="space-y-1">
                        {dept.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5 text-[11px] font-medium text-[#333333]">
                            <span className="text-[#EA580C] font-bold">✔</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-dashed border-[#E5E5E5] flex items-center justify-between gap-2 text-xs font-bold">
                      <Link
                        href={dept.serviceLink}
                        className="inline-flex items-center gap-1 text-[#111111] hover:text-[#EA580C] transition-colors"
                      >
                        <span>{dept.serviceLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={dept.packageLink}
                        className="px-2.5 py-1 bg-[#111111] text-white hover:bg-[#EA580C] text-[11px] font-mono tracking-wider transition-colors"
                      >
                        {dept.packageLabel} ↗
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Reach Out / Pre-Footer CTA ── */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-[#121418] text-white text-center overflow-hidden">
        {/* Atmospheric Architectural Interior Background */}
        <Image
          src="/images/architecture/monolithic-concrete-atrium.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-85 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/90 via-[#121418]/60 to-[#121418]/30 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C]">
            NEED CONSTRUCTION EXPERTS?
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight drop-shadow-md"
            style={{ fontFamily: "'Lora', serif" }}
          >
            If Your Construction Needs Experts, <br />
            <span className="text-[#EA580C]">Reach Out to Us Today.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/75 font-medium leading-relaxed max-w-xl mx-auto">
            Whether you are planning a modern villa, multi-generational home, or looking for turnkey architectural execution in Chennai—our team is ready to assist you with complete clarity and fixed pricing.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-3 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-wider text-[11px] hover:bg-white transition-colors"
            >
              Contact Our Team &rarr;
            </Link>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala & Associates and ARCH Foundation, I would like to consult with your architecture and construction experts.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-[#EA580C] text-[#EA580C] font-bold uppercase tracking-wider text-[11px] hover:bg-[#EA580C] hover:text-[#111111] transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Our Experts</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
