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
    title: 'Scaling Construction',
    desc: 'Expanded into full-scale civil construction to ensure our architectural designs were executed without contractor compromises.',
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
    bio: 'An experienced visionary who leads the architectural design, space planning, and aesthetic direction at MPA. With a deep understanding of tropical architecture and modern minimalism, he ensures every home is designed with meticulous attention to detail. His approach seamlessly integrates traditional Vastu principles with contemporary spatial layouts, maximizing natural light, cross-ventilation, and functional elegance. Over his extensive career, he has pioneered designs that not only look breathtaking but also enhance the daily living experience of modern families.',
    focus: 'Architectural Design, Master Planning, Facade Aesthetics',
  },
  {
    name: 'Er. R. Sundaram',
    designation: 'Chief Structural Engineer & Co-Founder',
    experience: '30+ Years Experience',
    bio: 'A seasoned structural expert with decades of hands-on experience in civil engineering and large-scale residential construction. At MPA, he oversees the structural integrity, RCC framework design, and rigorous on-site execution. His engineering philosophy prioritizes safety, longevity, and uncompromising material quality over cost-cutting shortcuts. From complex soil mechanics and deep foundation planning to managing dedicated site execution teams, he guarantees that every architectural masterpiece is built on an unbreakable foundation.',
    focus: 'Structural Engineering, RCC Framework Design, Soil Mechanics',
  },
];

const TEAM_DEPARTMENTS = [
  {
    icon: Compass,
    title: 'Architectural & 3D Design Team',
    desc: 'Our in-house architects and 3D visualizers handle everything from Vastu-compliant spatial planning and structural drafting to photorealistic exterior elevations and interior layouts.',
    deliverables: ['2D Floor Plans & Working Drawings', 'Photorealistic 3D Elevations', 'Vastu & Spatial Optimization'],
  },
  {
    icon: HardHat,
    title: 'Structural & Civil Engineering Team',
    desc: 'Senior structural consultants and resident civil engineers oversee soil analysis, foundation design, and RCC framing to ensure every build meets highest safety standards.',
    deliverables: ['Seismic Zone III RCC Framing', 'Soil Mechanics & Foundation Design', '10-Year Structural Integrity'],
  },
  {
    icon: ShieldCheck,
    title: 'Site Supervision & Quality Control Team',
    desc: 'Dedicated full-time site engineers and quality managers stationed on-site daily, conducting 425+ rigorous checks across every construction stage.',
    deliverables: ['Daily On-Site Quality Monitoring', 'Concrete Cube & Material Testing', 'Daily App Photo & Progress Updates'],
  },
  {
    icon: Building2,
    title: 'Modular Interiors & Joinery Team',
    desc: 'Experienced interior designers and master carpenters delivering custom modular kitchens, wardrobes, and architectural woodwork with premium materials.',
    deliverables: ['100% BWR Marine Plywood (IS:710)', 'Precision Factory Joinery', 'End-to-End Interior Execution'],
  },
];

const CORE_VALUES = [
  {
    icon: Eye,
    title: 'Our Vision',
    subtitle: 'Setting the Benchmark for Quality Living',
    desc: 'To be Chennai’s most trusted, premier residential construction and architectural firm—recognized for architectural brilliance, structural longevity, and an unwavering commitment to transparent, stress-free homebuilding.',
  },
  {
    icon: Target,
    title: 'Our Mission',
    subtitle: 'Building Certainty into Every Home',
    desc: 'To deliver superior quality turnkey homes by bringing architectural design, civil engineering, and modular interiors under one accountable roof—backed by fixed pricing, 425+ quality checks, and on-time project completion.',
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
      <section className="relative py-20 md:py-28 bg-[#111111] text-white border-b-4 border-[#111111] px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#EA580C]/20 border border-[#EA580C] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#EA580C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
            <span>About Murali Patharala Associates (MPA)</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight tracking-tight text-white"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Building Chennai&apos;s Finest Homes <br />
            <span className="text-[#EA580C]">With Passion, Precision &amp; Trust.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
            We are an integrated team of licensed architects, structural engineers, and civil construction experts dedicated to delivering exceptional turnkey homes across Chennai since 1998.
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
              We Have an Amazing Team of Experts Ready to Build Your Dream Home.
            </h2>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-medium">
              At Murali Patharala Associates (MPA), we bring together licensed architects, structural engineers, civil project managers, and skilled craftsmen under one roof. Our experienced team has successfully planned, designed, and constructed over <strong>500+ residential homes and luxury villas</strong> across Chennai.
            </p>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-medium">
              We handle every step of your residential construction journey—from soil testing and architectural floor plans to municipal approvals, RCC civil structure, electrical, plumbing, and bespoke modular interiors. With a dedicated full-time engineer on every site, 425+ quality checks, and transparent fixed-price contracts, we ensure your home is built on time and to the highest standards.
            </p>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-medium">
              If your home construction project needs experienced professionals who care about your budget, timeline, and quality—reach out to us today.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala Associates, I am looking for expert residential construction services in Chennai.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-[#111111] hover:text-white transition-colors"
              >
                Reach Out to Our Experts &rarr;
              </a>
              <Link
                href="/services"
                className="px-8 py-4 border-2 border-[#111111] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-[#111111] hover:text-white transition-colors"
              >
                Explore Our Services
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] border-4 border-[#111111] bg-[#181818] overflow-hidden shadow-xl group">
              <Image
                src="/images/clinicImages-1.webp"
                alt="Murali Patharala Associates Head Studio Chennai"
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
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#111111] text-white border-b-4 border-[#111111]">
        <div className="max-w-5xl mx-auto space-y-16">
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
              From a small architectural studio to a premier turnkey construction firm, our growth has been driven by a relentless pursuit of quality and architectural integrity.
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
                  {/* Placeholder for missing images */}
                  <div className="absolute inset-0 bg-[#E5E5E5] flex flex-col items-center justify-center group-hover:bg-[#111111] transition-colors duration-700">
                    <Users className="w-16 h-16 text-[#999999] group-hover:text-[#EA580C] transition-colors duration-700 mb-4" />
                    <span className="text-xs font-bold tracking-widest text-[#999999] group-hover:text-white uppercase transition-colors duration-700">
                      Portrait Area
                    </span>
                  </div>
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
      <section className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-[#111111] text-white">
        <div className="max-w-6xl mx-auto space-y-16">
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

                  <div className="pt-4 border-t border-[#E5E5E5] space-y-2">
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Reach Out / Pre-Footer CTA ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#111111] text-white text-center border-t-4 border-[#111111]">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C]">
            NEED CONSTRUCTION EXPERTS?
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            If Your Construction Needs Experts, <br />
            <span className="text-[#EA580C]">Reach Out to Us Today.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/75 font-medium leading-relaxed max-w-xl mx-auto">
            Whether you are planning a modern villa, multi-generational home, or looking for turnkey architectural execution in Chennai—our team is ready to assist you with complete clarity and fixed pricing.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
            >
              Contact Our Team &rarr;
            </Link>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala Associates (MPA), I would like to consult with your construction and architecture experts.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-[#EA580C] text-[#EA580C] font-bold uppercase tracking-widest text-xs hover:bg-[#EA580C] hover:text-[#111111] transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Our Experts</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
