import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, ArrowRight, Phone, CheckCircle2,
  Lightbulb, Droplets, ShieldCheck, Clock
} from 'lucide-react';
import {
  INTERIOR_GUIDES,
  INTERIOR_HERO_IMAGES,
} from '@/lib/interiorContent';

export default async function DesignGuidesPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic } = data;

  const guideIconMap: Record<string, any> = {
    wallet: BookOpen,
    ruler: BookOpen,
    lightbulb: Lightbulb,
    palette: Droplets,
    utensils: ShieldCheck,
    calendar: Clock,
  };

  const guides = INTERIOR_GUIDES.map((guide) => ({
    ...guide,
    icon: guideIconMap[guide.iconKey] || BookOpen,
  }));

  return (
    <div className="font-sans text-[#0A0A0A] bg-[#FCFAF6] min-h-screen selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
      {/* Page Hero Banner */}
      <section className="relative text-white py-24 lg:py-32 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src={INTERIOR_HERO_IMAGES.guides} alt="Interior design guides" className="w-full h-full object-cover mix-blend-luminosity" />
          <div className="absolute inset-0 bg-[#0A0A0A]/80"></div>
        </div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm mb-8">
            <span className="text-xs font-bold text-[#C1FF72] tracking-wider uppercase">Design Notes</span>
          </div>
          <div className="flex flex-col mb-8 items-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter">Guides Written By</h2>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#C1FF72] leading-[1.05] tracking-tighter mt-1">Our Design Studio<span className="text-white">.</span></h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl font-medium leading-relaxed">
            Clear, practical notes on budgets, materials, layouts, lighting, and execution so you can make confident decisions about your space.
          </p>
        </div>
      </section>

      {/* Guides List */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-8 w-full pt-20">
        {guides.map((guide, idx) => {
          const IconComp = guide.icon;

          return (
            <article key={idx} className="mb-24 pb-24 border-b border-[#E5E5E5] last:border-0 last:mb-0 last:pb-20">
                {/* Category & Title */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#0A0A0A] bg-[#FCFAF6] shadow-sm">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FCFAF6] border border-[#E5E5E5]">
                      <span className="text-[#0A0A0A] font-bold text-xs tracking-wider uppercase">{guide.category}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] mb-8 leading-[1.05] tracking-tighter text-center">{guide.title}</h3>
                <p className="text-gray-500 text-[18px] leading-relaxed mb-12 border-l-4 border-[#C1FF72] pl-6 font-medium italic bg-[#FCFAF6] p-6 rounded-r-4xl">{guide.intro}</p>

                {/* Content Sections */}
                <div className="space-y-12 mb-12">
                  {guide.sections.map((section, sIdx) => (
                    <div key={sIdx}>
                      <h4 className="text-xl font-bold text-[#0A0A0A] mb-4">{section.heading}</h4>
                      <p className="text-gray-500 text-[16px] leading-relaxed font-medium">{section.content}</p>
                    </div>
                  ))}
                </div>

                {/* Tips Box */}
                <div className="bg-[#FCFAF6] rounded-4xl p-10 border border-[#E5E5E5] shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Lightbulb className="w-6 h-6 text-[#C1FF72]" />
                    <h4 className="font-bold text-[#0A0A0A] text-lg">Expert Tips</h4>
                  </div>
                  <ul className="space-y-4">
                    {guide.tips.map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#C1FF72] shrink-0" />
                        <span className="text-gray-500 font-medium">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
            </article>
          );
        })}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-[#0A0A0A] py-24 lg:py-40 text-white selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-8 text-center w-full flex flex-col items-center">
          <div className="flex flex-col mb-8 items-center">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter">Have Questions</h3>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#C1FF72] leading-[1.05] tracking-tighter mt-1">About Your Space?<span className="text-white">.</span></h3>
          </div>
          <p className="text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto">Our designers are here to provide practical advice. No room, budget, or layout question is too small.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a href={`tel:${clinic.contact?.phone || ''}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C1FF72] text-[#0A0A0A] px-10 py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 text-[15px] tracking-wide shadow-sm">
              <Phone className="w-5 h-5" /> Ask Our Designers
            </a>
            <Link href={`${basePath}/contact-us`} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 text-white px-10 py-5 rounded-full font-bold transition-all hover:bg-white/10 hover:scale-105 active:scale-95 text-[15px] tracking-wide shadow-sm">
              Send Your Question <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
