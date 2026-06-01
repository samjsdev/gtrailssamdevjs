import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Playfair_Display, Lato } from 'next/font/google';
import GalleryGrid from './GalleryGrid';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

const PORTFOLIO = [
  {
    cat: 'Residential',
    title: 'Modern Living Room',
    desc: 'Minimalist design with warm textures and natural light.',
    img: 'https://interior.growhigh.studio/images/residential_design.png',
    span: 'tall' as const,
  },
  {
    cat: 'Residential',
    title: 'Master Bedroom Suite',
    desc: 'Serene retreat with custom joinery and muted tones.',
    img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
  },
  {
    cat: 'Residential',
    title: 'Kitchen Renovation',
    desc: 'Contemporary kitchen with premium finishes and smart storage.',
    img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    span: 'wide' as const,
  },
  {
    cat: 'Commercial',
    title: 'Corporate Office Lobby',
    desc: 'Welcoming reception area with brand-aligned design.',
    img: 'https://interior.growhigh.studio/images/commercial_interiors.png',
    span: 'tall' as const,
  },
  {
    cat: 'Commercial',
    title: 'Co-Working Space',
    desc: 'Flexible workspace with collaborative and focus zones.',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
  },
  {
    cat: 'Residential',
    title: 'Bathroom Retreat',
    desc: 'Spa-inspired bathroom with natural stone and ambient lighting.',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
  },
  {
    cat: 'Commercial',
    title: 'Boutique Retail Store',
    desc: 'Curated retail environment designed to elevate the shopping experience.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    span: 'wide' as const,
  },
  {
    cat: 'Residential',
    title: 'Penthouse Dining',
    desc: 'Elegant dining space with custom lighting and bespoke furniture.',
    img: 'https://interior.growhigh.studio/images/custom_furniture.png',
    span: 'tall' as const,
  },
  {
    cat: 'Studio & Process',
    title: 'Design Studio',
    desc: 'Where creativity meets precision—our design workspace.',
    img: 'https://interior.growhigh.studio/images/principal_designer.png',
  },
  {
    cat: 'Studio & Process',
    title: 'Material Library',
    desc: 'Curated collection of fabrics, finishes, and samples.',
    img: 'https://interior.growhigh.studio/images/styling_decor.png',
    span: 'wide' as const,
  },
  {
    cat: 'Studio & Process',
    title: 'Client Consultation',
    desc: 'One-on-one design discussions with mood boards and 3D renders.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
  },
];

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template6');
  if (!data) return notFound();

  const clinicName = data?.clinic?.name || 'Studio';

  return (
    <div className={`${lato.className} text-zinc-300 min-h-screen bg-[#1a1a1a]`}>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="pt-44 pb-0 border-b border-white/5 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#c59b72]" />
                <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">Our Portfolio</span>
              </div>
              <h1 className={`${playfair.className} text-6xl sm:text-7xl lg:text-8xl text-white font-light leading-none`}>
                Our Work &amp;<br />
                <span className="italic text-zinc-400 font-light">Studio</span>
              </h1>
            </div>
            
            <div className="lg:col-span-5 space-y-8 lg:pb-4">
              <p className="text-zinc-400 font-light leading-loose text-sm md:text-base">
                Explore the spaces we have transformed and the creative environment where our designs come to life.
              </p>
              
              {/* Stats strip - Copy of template 3 exact stats */}
              <div className="flex flex-wrap gap-x-12 gap-y-4 pt-4">
                {[
                  { num: '200+', label: 'Projects Delivered' },
                  { num: '11', label: 'Portfolio Showcases' },
                  { num: '15+', label: 'Years of Excellence' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className={`${playfair.className} text-4xl text-white font-light`}>{stat.num}</span>
                    <span className="text-[9px] font-bold tracking-[0.25em] text-zinc-500 uppercase mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6 max-w-7xl mx-auto px-6 py-12 border-t border-white/5">
          <div className="h-[1px] flex-1 bg-white/5" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500">
            Browse Collection
          </span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>
      </section>

      {/* ── GALLERY GRID ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-[#1a1a1a]">
        <GalleryGrid items={PORTFOLIO} />
      </section>

      {/* ── ROW SEPARATOR ────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-16 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className={`${playfair.className} text-2xl md:text-3xl text-white font-light italic`}>
            &ldquo;Every photograph here is a room someone calls home.&rdquo;
          </p>
          <span className="text-[9px] font-bold tracking-[0.3em] text-zinc-600 uppercase shrink-0">— {clinicName} Studio</span>
        </div>
      </section>

    </div>
  );
}
