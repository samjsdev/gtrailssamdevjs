import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Archivo_Black, Inter } from 'next/font/google';
import GalleryGrid from './GalleryGrid';

const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const PORTFOLIO = [
  {
    cat: 'Residential',
    title: 'Urban Loft Living',
    desc: 'Open-plan layout with sandblasted steel columns, terracotta brick walls, and concrete flooring.',
    img: 'https://interior.growhigh.studio/images/residential_design.png',
    span: 'tall' as const,
  },
  {
    cat: 'Residential',
    title: 'Industrial Bedroom Retreat',
    desc: 'Muted palette featuring custom steel framing, thick wooden planks, and biophilic lighting.',
    img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
  },
  {
    cat: 'Residential',
    title: 'Exposed Brick Kitchen',
    desc: 'High-efficiency kitchen with black steel cabinets, concrete countertops, and smart storage.',
    img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    span: 'wide' as const,
  },
  {
    cat: 'Commercial',
    title: 'Steel-Framed Lobby',
    desc: 'Double-height reception shell with exposed structural beams and custom weld joints.',
    img: 'https://interior.growhigh.studio/images/commercial_interiors.png',
    span: 'tall' as const,
  },
  {
    cat: 'Commercial',
    title: 'Warehouse Co-Working',
    desc: 'Zoned workspace with raw brick partitions, focus pods, and shared styling benches.',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
  },
  {
    cat: 'Residential',
    title: 'Concrete Spa Bathroom',
    desc: 'Spa-inspired washroom carved in micro-concrete with smart LED lighting.',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
  },
  {
    cat: 'Commercial',
    title: 'Boutique Industrial Retail',
    desc: 'Loft-themed showroom with bespoke steel racks and custom lighting displays.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    span: 'wide' as const,
  },
  {
    cat: 'Residential',
    title: 'Penthouse Timber Dining',
    desc: 'Gathering space featuring a massive rustic walnut table and custom task spotlights.',
    img: 'https://interior.growhigh.studio/images/custom_furniture.png',
    span: 'tall' as const,
  },
  {
    cat: 'Studio & Process',
    title: 'Design Fab Lab',
    desc: 'Our creative warehouse workspace where drawings, weld layouts, and material boards come together.',
    img: 'https://interior.growhigh.studio/images/principal_designer.png',
  },
  {
    cat: 'Studio & Process',
    title: 'Raw Material Library',
    desc: 'A curated showroom of brick samples, timber plaques, metal profiles, and concrete textures.',
    img: 'https://interior.growhigh.studio/images/styling_decor.png',
    span: 'wide' as const,
  },
  {
    cat: 'Studio & Process',
    title: 'Volumetric Layout Meeting',
    desc: 'One-on-one drafting session with scale models, 3D plans, and materials scheduling.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
  },
];

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template10');
  if (!data) return notFound();

  const clinicName = data?.clinic?.name || 'Studio';

  return (
    <div className={`${inter.className} text-[#F4F1DE] min-h-screen bg-[#1E2022]`}>

      {/* ── HERO BANNER ─────────────────────────────────────────────────── */}
      <section className="pt-44 pb-0 border-b border-white/10 bg-[#1E2022]">
        <div className="max-w-7xl mx-auto px-8 pb-16">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#E07A5F]" />
                <span className="text-[10px] font-bold tracking-[0.35em] text-[#E07A5F] uppercase">BUILT SHELLS</span>
              </div>
              <h1 className={`${archivo.className} text-5xl sm:text-6xl lg:text-8xl text-white uppercase leading-[1.05]`}>
                Loft Work &amp;<br />
                <span className="text-[#E07A5F]">Shells</span>
              </h1>
            </div>
            
            <div className="lg:col-span-5 space-y-8 lg:pb-4">
              <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
                Explore the spaces we have transformed and the creative environment where our designs come to life.
              </p>
              
              {/* Stats strip - Template 3 matching stats styled in raw metal columns */}
              <div className="flex flex-wrap gap-x-12 gap-y-4 pt-4">
                {[
                  { num: '200+', label: 'Loft Handovers' },
                  { num: '11', label: 'Portfolio Shells' },
                  { num: '15+', label: 'Years in Fabrication' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className={`${archivo.className} text-4xl text-white`}>{stat.num}</span>
                    <span className="text-[9px] font-bold tracking-[0.25em] text-slate-500 uppercase mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6 max-w-7xl mx-auto px-8 py-12 border-t border-white/10">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
            Browse Shell Catalog
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>
      </section>

      {/* ── GALLERY GRID ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 py-20 bg-[#1E2022]">
        <GalleryGrid items={PORTFOLIO} />
      </section>

      {/* ── FOOTER SEPARATOR ─────────────────────────────────────────────── */}
      <section className="border-t border-white/10 py-16 bg-[#141517]">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className={`${archivo.className} text-xl md:text-2xl text-white uppercase`}>
            &ldquo;Every exposed weld represents structural truth.&rdquo;
          </p>
          <span className="text-[9px] font-bold tracking-[0.3em] text-[#E07A5F] uppercase shrink-0">— {clinicName} Studio</span>
        </div>
      </section>

    </div>
  );
}
