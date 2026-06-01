import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond } from 'next/font/google';
import GalleryGrid from './GalleryGrid';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const PORTFOLIO = [
  {
    cat: 'Commercial',
    title: 'Bespoke Commercial Lounge, Nungambakkam',
    desc: 'Bespoke commercial reception lounge combining custom wood cladding and premium styling.',
    img: 'https://interior.growhigh.studio/images/commercial_interiors.png',
    span: 'tall' as const,
  },
  {
    cat: 'Residential',
    title: 'Contemporary Eco-Villa, ECR Road',
    desc: 'Private residence on ECR highlighting warm natural finishes and soft ambient lighting.',
    img: 'https://interior.growhigh.studio/images/residential_design.png',
  },
  {
    cat: 'Residential',
    title: 'Luxury Master Bedroom, Adyar',
    desc: 'Luxury master bedroom coordination in Adyar featuring high-end modular wardrobes and integrated storage.',
    img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    span: 'wide' as const,
  },
  {
    cat: 'Residential',
    title: 'Modern Spa-Inspired Bathroom, Besant Nagar',
    desc: 'Spa-inspired residential bathroom with premium custom quartz countertops and washbasins.',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
    span: 'tall' as const,
  },
  {
    cat: 'Studio & Process',
    title: 'SKETCHLAB Experience Center, Pallikaranai',
    desc: 'Where our team coordinates custom design, modular kitchen rendering, and fabrication in Chennai.',
    img: 'https://interior.growhigh.studio/images/principal_designer.png',
  },
  {
    cat: 'Commercial',
    title: 'Bespoke Café Interior, OMR Road',
    desc: 'Bespoke café interior styling utilizing custom wood seating, planters, and warm ambient layout.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    cat: 'Studio & Process',
    title: 'SKETCHLAB Tactile Material Library',
    desc: 'Our curated tactile library of premium laminates, veneers, acrylic samples, and countertops.',
    img: 'https://interior.growhigh.studio/images/styling_decor.png',
    span: 'wide' as const,
  },
  {
    cat: 'Residential',
    title: 'Luxury Dining Room, Anna Nagar',
    desc: 'Luxury dining room in Anna Nagar featuring custom table setups and structural architectural lighting.',
    img: 'https://interior.growhigh.studio/images/custom_furniture.png',
    span: 'tall' as const,
  },
  {
    cat: 'Studio & Process',
    title: 'Client Design Collaboration, Chennai Studio',
    desc: 'Interactive 3D walkthroughs and material boards at our Pallikaranai studio.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
  },
];

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template2');
  if (!data) return notFound();

  const doctor = data?.doctor;

  return (
    <div className="font-sans text-[#2A2421] bg-[#F7F4EF] min-h-screen pb-24 space-y-16">
      {/* Hero Header */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-20 pb-12">
        <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
          PORTFOLIO SHOWCASE
        </div>

        <h1 className={`${cormorant.className} text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-tight`}>
          Refined Projects &amp; <span className="text-[#8E7056] italic">Curated Spaces</span>
        </h1>

        <p className="text-sm sm:text-base text-[#2A2421]/90 font-light leading-relaxed max-w-xl mx-auto">
          Explore our completed premium interior design and turnkey fabrication projects across Chennai.
        </p>

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 pt-6 max-w-xl mx-auto">
          {[
            { num: '250+', label: 'Completed Projects' },
            { num: '12+', label: 'Service Offerings' },
            { num: doctor?.experience ? doctor.experience.replace(/\D/g, '') + '+' : '8+', label: 'Years Experience' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className={`${cormorant.className} text-3xl font-bold text-[#2A2421]`}>{stat.num}</span>
              <span className="text-[9px] font-bold text-[#2A2421]/75 uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="flex items-center gap-6 max-w-5xl mx-auto px-4">
        <div className="h-px flex-1 bg-[#EAE3D8]" />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2A2421]/75">
          Bespoke Chennai Collection
        </span>
        <div className="h-px flex-1 bg-[#EAE3D8]" />
      </div>

      {/* Interactive gallery grid */}
      <div className="max-w-7xl mx-auto px-4">
        <GalleryGrid items={PORTFOLIO} />
      </div>
    </div>
  );
}
