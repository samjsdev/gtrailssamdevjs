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
  const basePath = `/designwebsite/template2/${slug}`;

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
    <div className="font-sans text-blue-900 bg-gray-50 min-h-screen selection:bg-blue-900 selection:text-white">
      {/* Page Hero Banner */}
      <section className="relative text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={INTERIOR_HERO_IMAGES.guides} alt="Interior design guides" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-blue-900/75"></div>
          <div className="absolute inset-0 bg-linear-to-t from-blue-900 via-blue-900/40 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <p className="text-gray-400 font-semibold tracking-[0.15em] uppercase text-xs mb-6">Design Notes</p>
          <div className="flex flex-col mb-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-500 leading-none tracking-tighter">Guides Written By</h2>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-none tracking-tighter -mt-1.5">Our Design Studio</h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl font-light leading-relaxed">
            Clear, practical notes on budgets, materials, layouts, lighting, and execution so you can make confident decisions about your space.
          </p>
        </div>
      </section>

      {/* Guides List */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-8 w-full pt-16">
        {guides.map((guide, idx) => {
          const IconComp = guide.icon;

          return (
            <article key={idx} className="mb-24 pb-24 border-b border-gray-100 last:border-0 last:mb-0 last:pb-16">
                {/* Category & Title */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 bg-gray-50">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-gray-500 font-semibold text-xs tracking-[0.15em] uppercase">{guide.category}</span>
                </div>

                <h3 className="text-4xl lg:text-5xl font-normal text-blue-900 mb-8 leading-tight tracking-tight">{guide.title}</h3>
                <p className="text-gray-500 text-[18px] leading-relaxed mb-12 border-l-2 border-gray-200 pl-6 italic font-light">{guide.intro}</p>

                {/* Content Sections */}
                <div className="space-y-12 mb-12">
                  {guide.sections.map((section, sIdx) => (
                    <div key={sIdx}>
                      <h4 className="text-xl font-medium text-blue-900 mb-4">{section.heading}</h4>
                      <p className="text-gray-600 text-[16px] leading-relaxed font-light">{section.content}</p>
                    </div>
                  ))}
                </div>

                {/* Tips Box */}
                <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Lightbulb className="w-5 h-5 text-gray-600" />
                    <h4 className="font-medium text-blue-900 text-lg">Expert Tips</h4>
                  </div>
                  <ul className="space-y-4">
                    {guide.tips.map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-4">
                        <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
                        <span className="text-gray-600 font-light">{tip}</span>
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
      <section className="bg-blue-900 py-24 lg:py-40 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center w-full">
          <div className="flex flex-col mb-8">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-500 leading-none tracking-tighter">Have Questions</h3>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-none tracking-tighter -mt-1.5">About Your Space?</h3>
          </div>
          <p className="text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">Our designers are here to provide practical advice. No room, budget, or layout question is too small.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`tel:${clinic.contact?.phone || ''}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm tracking-wide">
              <Phone className="w-4 h-4" /> Ask Our Designers
            </a>
            <Link href={`${basePath}/contact-us`} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-600 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm tracking-wide">
              Send Your Question <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
