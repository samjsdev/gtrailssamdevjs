import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Fustat } from 'next/font/google';
import GalleryGrid from './GalleryGrid';
import { cleanClinicName } from '@/lib/copyCleaner';

const fustat = Fustat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  display: 'swap',
});

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const { clinic, media } = data;
  const cleanName = cleanClinicName(clinic.name);

  const defaultGalleryStock = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
  ];

  const uniqueUserImages = Array.from(new Set([
    ...(media.clinicImages || []),
    ...(media.treatmentImages || []),
    ...(media.otherImages || [])
  ].filter(Boolean)));

  const PORTFOLIO = [];
  const totalToRender = 50;

  for (let i = 0; i < totalToRender; i++) {
    let imgUrl = "";
    let isUserImg = false;

    if (uniqueUserImages.length > 0) {
      imgUrl = uniqueUserImages[i % uniqueUserImages.length];
      isUserImg = true;
    } else {
      imgUrl = defaultGalleryStock[i % defaultGalleryStock.length];
    }

    const cats = ['Residential', 'Commercial', 'Studio & Process'];
    const cat = cats[i % cats.length];
    const span = i % 3 === 0 ? ('wide' as const) : i % 5 === 0 ? ('tall' as const) : ('normal' as const);

    PORTFOLIO.push({
      cat,
      title: isUserImg ? `Client Project Space #${i + 1}` : `Curated Design Space #${i + 1}`,
      desc: isUserImg 
        ? `Custom interior feature designed and coordinated for ${cleanName || 'our studio'}.`
        : `Bespoke room configuration showcasing fine materials and detailing.`,
      img: imgUrl,
      span
    });
  }

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
