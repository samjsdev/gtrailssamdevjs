import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Playfair_Display, Lato } from 'next/font/google';
import Link from 'next/link';
import ClientHero from './ClientHero';
import { Star, Plus, Minus, Quote } from 'lucide-react';
import {
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceSummary,
  getInteriorServiceData,
  getServiceImage,
} from '@/lib/interiorContent';

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

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template6/${slug}`;

  const data = await readSourceConfig(slug, 'template6');
  if (!data) return notFound();

  const { clinic, doctor, business, media, reviews } = data;
  const heroImage = media?.clinicImages?.[0] || INTERIOR_HERO_IMAGES.home;
  const doctorImage = doctor?.images?.[0] || media?.otherImages?.[0] || INTERIOR_HERO_IMAGES.designer;

  const servicesList = (business?.services?.length ? business.services : DEFAULT_INTERIOR_SERVICES).slice(0, 6).map((svc: string) => {
    const svcData = getInteriorServiceData(svc);
    return {
      title: svc,
      desc: svcData?.description || getInteriorServiceSummary(svc),
      image: getServiceImage(svc, media) || svcData?.image || INTERIOR_HERO_IMAGES.services,
    };
  });

  const displayReviews = reviews && reviews.length > 0 ? reviews : [
    { author: "Morgan Dufresne", role: "Company owner", rating: 5, text: "I absolutely love my new modern living room! The clean lines, neutral tones, and minimalist interior create such a calming & stylish atmosphere. Highly recommend their modern interior design services!" },
    { author: "Sarah Jenkins", role: "Homeowner", rating: 5, text: "From Concept To Reality, The Team Turned My Vision Into A Stunning, Livable Space. I couldn't be happier with the results! The level of professionalism was outstanding." },
    { author: "David Chen", role: "Restaurateur", rating: 5, text: "They completely transformed our restaurant space. The blend of contemporary elements with warm lighting created an inviting ambiance that our guests constantly compliment. Exceptional attention to detail throughout the entire process." },
    { author: "Emily Roberts", role: "Developer", text: "Working with this studio was a breeze. They handled everything from space planning to furnishing, making the renovation stress-free. The end result added significant value." },
    { author: "Michael Torres", role: "Startup CEO", rating: 5, text: "We wanted a modern, functional office that sparks creativity, and they delivered perfectly. The custom furniture and strategic layout changes completely revitalized our work environment. It's a joy coming to the office every day." }
  ];

  const faqs = [
    { q: "How does the design process work from start to finish?", a: "We follow a structured 5-phase process: Discovery & Brief, Concept Development, Design Development, Procurement & Execution, and Final Styling. Each phase includes client sign-off before we move forward." },
    { q: "Do you work with existing furniture or only new pieces?", a: "We work with both. Our designers assess what you have and recommend what to keep, repurpose, or replace. We believe in sustainable design and will incorporate existing pieces wherever they fit the vision." },
    { q: "What is your pricing model for interior design projects?", a: "We offer transparent, tiered pricing based on scope—from single-room makeovers to full-home redesigns. Every project begins with a fixed-fee consultation, and we provide detailed cost breakdowns before any work begins. No hidden charges." },
    { q: "Can you handle both residential and commercial projects?", a: "Yes. Our team has deep expertise in both residential interiors (apartments, villas, penthouses) and commercial spaces (offices, retail stores, restaurants, co-working spaces)." },
    { q: "How long does a typical interior design project take?", a: "Timelines vary by scope. A single room typically takes 4–6 weeks, while a full home or office project can take 3–6 months. We provide a detailed timeline during the concept phase and keep you updated throughout." },
    { q: "Do you provide 3D visualizations before starting the work?", a: "Absolutely. We create photorealistic 3D renders and mood boards for every project so you can see exactly how your space will look before a single piece of furniture is moved. Revisions are included in the design fee." }
  ];

  return (
    <div className={`${lato.className} bg-[#1a1a1a] text-zinc-300 min-h-screen selection:bg-zinc-800 selection:text-white`}>
      
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* ── EXPERTISE / SERVICES ───────────────────────────────────────────── */}
      <section id="services" className="py-28 md:py-36 px-6 bg-[#121212] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#c59b72]"></div>
                <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">
                  Our Expertise
                </span>
              </div>
              <h2 className={`${playfair.className} text-4xl md:text-5xl text-white font-light`}>
                Comprehensive <span className="italic text-zinc-400 font-light">Design</span> Services
              </h2>
            </div>
            <p className="text-zinc-500 font-light text-sm max-w-xs leading-relaxed">
              Tailored spatial planning and high-end turnkey execution delivered with biophilic and structural sincerity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {servicesList.map((svc: { title: string; desc: string; image: string }, idx: number) => (
              <div key={idx} className="group flex flex-col justify-between border-t border-white/10 pt-8 hover:border-[#c59b72]/40 transition-colors duration-500">
                <div>
                  <div className="aspect-[16/10] overflow-hidden mb-8 relative">
                    <div className="absolute inset-0 bg-[#c59b72]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500" />
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className={`${playfair.className} absolute top-4 right-4 text-white/20 text-3xl font-light z-20`}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <h3 className={`${playfair.className} text-2xl text-white mb-4 font-light group-hover:text-[#c59b72] transition-colors`}>
                    {svc.title}
                  </h3>
                  <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
                    {svc.desc}
                  </p>
                </div>
                <div>
                  <Link 
                    href={`${basePath}/services`} 
                    className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-400 group-hover:text-white transition-colors border-b border-transparent group-hover:border-white pb-1"
                  >
                    Discover Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / WATERMARK SECTION ──────────────────────────────────────── */}
      <section id="about" className="relative py-28 md:py-36 px-6 bg-[#1a1a1a] overflow-hidden border-b border-white/5">
        {/* Giant Watermark Background Text - Styled Elegantly in Dark Mode */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
          <span className="font-extrabold text-[12vw] sm:text-[14vw] md:text-[16vw] text-[#222]/60 uppercase tracking-widest font-sans">
            Interior
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-8 mb-20">
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#c59b72]"></div>
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">
                About Our Studio
              </span>
            </div>
            
            <h2 className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl text-white leading-tight font-light`}>
              Crafting Spaces That <br />
              <span className="italic text-zinc-400 font-light">Inspire &amp; Elevate</span> Everyday Life
            </h2>
            
            <p className="text-zinc-400 font-light leading-loose text-base max-w-2xl mx-auto">
              With over a decade of experience, our award-winning team brings passion, precision, and a personalized approach to every project. We believe that exceptional design is a perfect balance of form and function.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto px-4">
            <div className="aspect-[21/9] overflow-hidden border border-white/10">
              <img
                src={media?.otherImages?.[2] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"}
                alt="Modern luxury interior render"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER / BIOGRAPHY ────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6 bg-[#121212] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left side Image with Overlay Name tag */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[3/4] overflow-hidden border border-white/10">
                <img 
                  src={doctorImage} 
                  alt={doctor?.name || "Arjun Mehta"} 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-all duration-1000" 
                />
              </div>
              <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-[#1a1a1a] border border-white/10 p-6 md:p-8 shadow-2xl">
                <p className="text-[9px] font-bold tracking-[0.25em] text-[#c59b72] mb-1.5 uppercase">PRINCIPAL DESIGNER</p>
                <h3 className={`${playfair.className} text-2xl text-white font-light`}>{doctor?.name || "Arjun Mehta"}</h3>
              </div>
            </div>

            {/* Right side copy and details */}
            <div className="lg:col-span-7 space-y-8 lg:pl-12">
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase block">ABOUT OUR FOUNDER</span>
                <h2 className={`${playfair.className} text-4xl sm:text-5xl text-white leading-tight font-light`}>
                  {doctor?.name || "Arjun Mehta"}
                </h2>
                <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
                  Founder of Luxe Interiors Studio. With over a decade of design expertise, Arjun combines spatial intelligence with an artistic eye for refined aesthetics. Specializing in luxury residential and boutique commercial interiors.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div className="space-y-2">
                  <h4 className={`${playfair.className} text-lg text-white font-light`}>National Institute of Design</h4>
                  <p className="text-zinc-500 text-xs tracking-wider">M.Des, Interior Architecture</p>
                </div>
                <div className="space-y-2">
                  <h4 className={`${playfair.className} text-lg text-white font-light`}>Sir J.J. College of Architecture</h4>
                  <p className="text-zinc-500 text-xs tracking-wider">B.Arch, Architecture</p>
                </div>
              </div>

              <blockquote className={`${playfair.className} text-xl text-zinc-400 italic font-light border-l border-[#c59b72] pl-6 py-1`}>
                &ldquo;A successful home should function cleanly while highlighting the natural warmth of timber and stone.&rdquo;
              </blockquote>

              <div className="pt-4">
                <Link 
                  href={`${basePath}/contact`} 
                  className="inline-flex items-center justify-center px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase text-black bg-white hover:bg-zinc-200 transition-colors shadow-xl"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6 bg-[#1a1a1a] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#c59b72]"></div>
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">
                Reviews
              </span>
            </div>
            <h2 className={`${playfair.className} text-4xl md:text-5xl text-white font-light`}>
              Hear From Our <span className="italic text-zinc-400 font-light">Happy</span> Clients
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayReviews.slice(0, 3).map((review: any, idx: number) => (
              <div 
                key={idx} 
                className={`bg-[#121212] p-10 border border-white/5 shadow-xl flex flex-col justify-between group hover:border-[#c59b72]/30 transition-colors duration-500 ${
                  idx === 3 || idx === 4 ? 'lg:col-span-1 md:col-span-2 lg:block' : ''
                }`}
              >
                <div className="space-y-6">
                  <div className="flex gap-1 text-[#c59b72]">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-sm font-light leading-loose text-zinc-400 italic">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                </div>
                <div className="flex items-center gap-4 pt-8 mt-10 border-t border-white/5">
                  <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#c59b72] font-mono text-sm uppercase">
                    {(review.author || 'C').charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#c59b72] transition-colors">{review.author || 'Client'}</h4>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold mt-1">{review.role || 'Homeowner'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS GRID ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#121212] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] bg-white/5 flex-1" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 text-center px-4">
              Our Website 75000+ VIP Customer
            </span>
            <div className="h-[1px] bg-white/5 flex-1" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center text-center font-bold text-[10px] tracking-[0.25em] text-zinc-500">
            {["ARCHITECT REAL ESTATE", "TREND INTERIORS", "INTERIOR PREMIUM", "BUILDING CONSTRUCTION", "REAL ESTATE", "BUILDING CONSTRUCTION"].map((partner, i) => (
              <span key={i} className="hover:text-white transition-colors cursor-default select-none uppercase font-light">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-[#1a1a1a] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#c59b72]"></div>
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">FAQ</span>
            </div>
            <h2 className={`${playfair.className} text-4xl sm:text-5xl font-light text-white tracking-tight`}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details 
                key={i} 
                className="group bg-[#121212] border border-white/5 overflow-hidden transition-all duration-300"
                open={i === 0}
              >
                <summary className={`${playfair.className} flex justify-between items-center font-light text-lg cursor-pointer list-none p-6 text-white hover:text-[#c59b72] transition-colors select-none`}>
                  {faq.q}
                  <span className="transition-transform duration-300 group-open:rotate-180 text-zinc-500 shrink-0 ml-4">
                    <Plus className="w-4 h-4 group-open:hidden" />
                    <Minus className="w-4 h-4 hidden group-open:block" />
                  </span>
                </summary>
                <div className="text-zinc-400 font-light border-t border-white/5 p-6 leading-loose text-sm bg-[#121212]/50">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* WhatsApp Banner */}
          <div className="mt-16 p-8 md:p-12 bg-[#121212] border border-white/10 text-center space-y-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#c59b72]/5 rounded-bl-full pointer-events-none"></div>
             <h3 className={`${playfair.className} text-2xl text-white font-light`}>Have a specific question?</h3>
             <p className="text-zinc-400 font-light text-sm max-w-md mx-auto leading-relaxed">
               Message us on WhatsApp, and our design team will personally respond to your query.
             </p>
             {(() => {
                const phoneClean = clinic.contact?.phone?.replace(/\D/g, '') || '919876543210';
                return (
                  <a 
                    href={`https://wa.me/${phoneClean}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block mt-4 bg-white text-black px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-zinc-200 transition-colors"
                  >
                    WhatsApp: {clinic.contact?.phone || "+91 98765 43210"}
                  </a>
                );
              })()}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-[#121212] px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#c59b72]"></div>
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">
                360-degree panoramas
              </span>
            </div>
            <h2 className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl text-white leading-tight font-light`}>
              Create An Even <span className="italic text-zinc-400 font-light">Greater</span> Experience
            </h2>
          </div>

          <div className="max-w-5xl mx-auto overflow-hidden border border-white/10 bg-[#1a1a1a]">
            <img
              src={media?.otherImages?.[3] || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"}
              alt="Sleek luxurious interior mockup"
              className="w-full aspect-[16/9] object-cover opacity-70 hover:opacity-100 hover:scale-101 transition-all duration-[2000ms]"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
