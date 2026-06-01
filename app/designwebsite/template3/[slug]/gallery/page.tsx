import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Fustat } from 'next/font/google';
import GalleryGrid from './GalleryGrid';

const fustat = Fustat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
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
  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  return (
    <div className={`text-slate-900 min-h-screen pb-32 relative overflow-hidden bg-[#FAFAF9] ${fustat.className}`}>

      {/* Ambient background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-[#B48A66]/5 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] left-1/4 w-[30rem] h-[30rem] bg-amber-500/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-10 w-[35rem] h-[35rem] bg-slate-200/50 rounded-full blur-[100px]" />
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-35" />
        {/* Architectural lines */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-slate-200/25 -rotate-12 origin-top" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-slate-200/20 rotate-6 origin-top" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-20 space-y-20">

        {/* Hero */}
        <section className="text-center space-y-8 max-w-3xl mx-auto pt-16">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
            OUR PORTFOLIO
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 leading-[1.05]">
            Our Work &{' '}
            <span className="text-[#B48A66] italic font-normal">Studio</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
            Explore the spaces we have transformed and the creative environment where our designs come to life.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 pt-4">
            {[
              { num: '200+', label: 'Projects Delivered' },
              { num: '11', label: 'Portfolio Showcases' },
              { num: '15+', label: 'Years of Excellence' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-slate-900">{stat.num}</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-6 max-w-5xl mx-auto">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Browse Collection
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Interactive gallery grid */}
        <GalleryGrid items={PORTFOLIO} />

      </div>
    </div>
  );
}
