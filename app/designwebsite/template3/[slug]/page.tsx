import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Star, Plus, Minus } from 'lucide-react';
import ClientHero from './ClientHero';
import { Fustat } from 'next/font/google';
import Link from 'next/link';
import {
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceSummary,
  getInteriorServiceData,
  getServiceImage,
} from '@/lib/interiorContent';

const fustat = Fustat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template3/${slug}`;

  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const { clinic, business, doctor, media, reviews } = data;

  const displayReviews = reviews && reviews.length > 0 ? reviews : [
    { author: "Morgan Dufresne", role: "Company owner", rating: 5, text: "I absolutely love my new modern living room! The clean lines, neutral tones, and minimalist interior create such a calming & stylish atmosphere. Highly recommend their modern interior design services!" },
    { author: "Sarah Jenkins", role: "Homeowner", rating: 5, text: "From Concept To Reality, The Team Turned My Vision Into A Stunning, Livable Space. I couldn't be happier with the results! The level of professionalism was outstanding." },
    { author: "David Chen", role: "Restaurateur", rating: 5, text: "They completely transformed our restaurant space. The blend of contemporary elements with warm lighting created an inviting ambiance that our guests constantly compliment. Exceptional attention to detail throughout the entire process." },
    { author: "Emily Roberts", role: "Developer", rating: 5, text: "Working with this studio was a breeze. They handled everything from space planning to furnishing, making the renovation stress-free. The end result added significant value." },
    { author: "Michael Torres", role: "Startup CEO", rating: 5, text: "We wanted a modern, functional office that sparks creativity, and they delivered perfectly. The custom furniture and strategic layout changes completely revitalized our work environment. It's a joy coming to the office every day." }
  ];

  return (
    <div className="text-slate-900 bg-white min-h-screen selection:bg-[#B48A66] selection:text-white scroll-smooth relative">
      {/* Blueprint Grid Lines Overlay (Subtle) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-35 z-0" />

      {/* REAL HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
                {clinic?.name || "Premium Interior Design"}
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                {clinic?.tagline || <>Design Your <span className="text-[#B48A66]">Dream</span> Space With Us</>}
              </h1>
              <p className="text-lg text-slate-500 font-light leading-relaxed max-w-lg">
                {clinic?.description || "We create refined interiors with thoughtful planning, curated materials, and client-first project coordination to bring your vision to life."}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link href={`${basePath}/contact`} className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-[#B48A66] transition-colors shadow-xl hover:shadow-[#B48A66]/20">
                  Start Your Project
                </Link>
                <a href="#gallery" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-slate-900 bg-white border border-slate-200 rounded-full hover:border-[#B48A66] hover:text-[#B48A66] transition-colors">
                  View Portfolio
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[#B48A66] rounded-3xl rotate-3 opacity-10"></div>
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src={media?.clinicImages?.[0] || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000"}
                  alt="Modern luxury interior"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#B48A66]/10 rounded-full flex items-center justify-center text-[#B48A66]">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{doctor?.experience || "15+"}</div>
                  <div className="text-xs text-slate-500 font-bold tracking-wider uppercase">Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-slate-50 relative z-10 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
              OUR EXPERTISE
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Comprehensive <span className="text-[#B48A66]">Design</span> Services
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(business.services?.length ? business.services : DEFAULT_INTERIOR_SERVICES).slice(0, 6).map((svc: string, idx: number) => {
              const svcData = getInteriorServiceData(svc);
              const svcImage = getServiceImage(svc, media) || svcData?.image || INTERIOR_HERO_IMAGES.services;
              const svcDesc = svcData?.description || getInteriorServiceSummary(svc);
              return (
                <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group overflow-hidden flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-[#B48A66]/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img src={svcImage} alt={svc} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#B48A66] flex items-center justify-center font-bold text-sm z-20 shadow-sm border border-white/20">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{svc}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-light">{svcDesc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY / PROJECTS SECTION */}
      <div id="gallery">
        <ClientHero clinic={clinic} business={business} basePath={basePath} media={media} />
      </div>

      {/* ABOUT / WATERMARK SECTION */}
      <section id="about" className="relative py-24 flex flex-col items-center justify-center overflow-hidden">
        {/* Giant Watermark Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
          <span className="font-extrabold text-[12vw] sm:text-[14vw] md:text-[16vw] text-slate-100/65 uppercase tracking-wider">
            Interior
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full mb-16 text-center">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
              ABOUT OUR STUDIO
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Crafting Spaces That <span className="text-[#B48A66]">Inspire</span> &amp; Elevate Everyday Life
            </h2>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              We create refined interiors with thoughtful planning, curated materials, and client-first project coordination to bring your vision to life.
            </p>
          </div>
        </div>

        {/* Modular Sleek Horizontal Glass House Image Overlay */}
        <div className="relative z-10 max-w-6xl w-full px-8 flex justify-center">
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img
              src={media?.clinicImages?.[1] || media?.otherImages?.[1] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"}
              alt="Modern horizontal architectural render"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-24 bg-white relative z-10 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8 w-full grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div className="w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img src={media?.otherImages?.[0] || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=2000"} alt="Principal Designer" className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
              <p className="text-xs font-bold tracking-[0.2em] text-[#B48A66] mb-2 uppercase">PRINCIPAL DESIGNER</p>
              <h3 className="text-2xl font-bold">{doctor?.name || "Arjun Mehta"}</h3>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-10 lg:pl-12">
            <div className="space-y-4">
              <p className="text-xs font-bold tracking-[0.2em] text-[#B48A66] uppercase">ABOUT OUR STUDIO</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">{doctor?.name || "Arjun Mehta"}</h2>
              <p className="text-xl text-slate-500 font-light leading-relaxed">
                {doctor?.name || "Arjun Mehta"} is the leader at {clinic?.name || "our studio"}. With {doctor?.experience || "over a decade"} of design expertise, they combine spatial intelligence with an artistic eye for refined aesthetics, specializing in {doctor?.specialization || "luxury residential and boutique commercial interiors"}.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">National Institute of Design</h4>
                <p className="text-slate-500 text-sm">M.Des, Interior Architecture</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Sir J.J. College of Architecture</h4>
                <p className="text-slate-500 text-sm">B.Arch, Architecture</p>
              </div>
            </div>

            <div className="pt-4">
              <Link href={`${basePath}/contact`} className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-[#B48A66] transition-colors shadow-xl">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION ("Here's What Our Clients Say") */}
      <section className="py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
              CLIENT REVIEWS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Hear From Our <span className="text-[#B48A66]">Happy</span> Clients
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {displayReviews.slice(0, 3).map((review, idx) => (
              <div key={idx} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-lg bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col items-center text-center">
                <div className="space-y-6 flex flex-col items-center">
                  <div className="flex justify-center gap-1 text-amber-400">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-sm font-light leading-relaxed text-slate-700 italic">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                </div>
                <div className="flex flex-col items-center gap-3 pt-6 mt-auto border-t border-slate-200 w-full">
                  <div className="w-10 h-10 rounded-full bg-[#B48A66]/10 flex items-center justify-center text-[#B48A66] font-bold uppercase overflow-hidden border border-[#B48A66]/20">
                    {review.author?.charAt(0) || "C"}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#B48A66] transition-colors">{review.author || "Client"}</h4>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">{review.role || "Homeowner"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS GRID */}
      <section className="py-16 bg-white border-t border-b border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-8 w-full space-y-10">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-slate-100 flex-1" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-center px-4">
              Our Website 75000+ VIP Customer
            </span>
            <div className="h-px bg-slate-100 flex-1" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center text-center font-bold text-xs tracking-widest text-slate-400">
            <span className="hover:text-slate-900 transition-colors cursor-default">ARCHITECT REAL ESTATE</span>
            <span className="hover:text-slate-900 transition-colors cursor-default">TREND INTERIORS</span>
            <span className="hover:text-slate-900 transition-colors cursor-default">INTERIOR PREMIUM</span>
            <span className="hover:text-slate-900 transition-colors cursor-default">BUILDING CONSTRUCTION</span>
            <span className="hover:text-slate-900 transition-colors cursor-default">REAL ESTATE</span>
            <span className="hover:text-slate-900 transition-colors cursor-default">BUILDING CONSTRUCTION</span>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-slate-50 relative z-10 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-8 w-full space-y-16">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] text-[#B48A66] uppercase">COMMON QUERIES</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "How does the design process work from start to finish?", a: "We follow a structured 5-phase process: Discovery & Brief, Concept Development, Design Development, Procurement & Execution, and Final Styling. Each phase includes client sign-off before we move forward.", open: true },
              { q: "Do you work with existing furniture or only new pieces?", a: "We work with both. Our designers assess what you have and recommend what to keep, repurpose, or replace. We believe in sustainable design and will incorporate existing pieces wherever they fit the vision.", open: false },
              { q: "What is your pricing model for interior design projects?", a: "We offer transparent, tiered pricing based on scope—from single-room makeovers to full-home redesigns. Every project begins with a fixed-fee consultation, and we provide detailed cost breakdowns before any work begins. No hidden charges.", open: false },
              { q: "Can you handle both residential and commercial projects?", a: "Yes. Our team has deep expertise in both residential interiors (apartments, villas, penthouses) and commercial spaces (offices, retail stores, restaurants, co-working spaces).", open: false },
              { q: "How long does a typical interior design project take?", a: "Timelines vary by scope. A single room typically takes 4–6 weeks, while a full home or office project can take 3–6 months. We provide a detailed timeline during the concept phase and keep you updated throughout.", open: false },
              { q: "Do you provide 3D visualizations before starting the work?", a: "Absolutely. We create photorealistic 3D renders and mood boards for every project so you can see exactly how your space will look before a single piece of furniture is moved. Revisions are included in the design fee.", open: false }
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm" open={faq.open}>
                <summary className="flex justify-between items-center font-bold font-fustat text-lg cursor-pointer list-none p-6 text-slate-900 hover:text-[#B48A66] transition-colors">
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    <Plus className="w-5 h-5 group-open:hidden" />
                    <Minus className="w-5 h-5 hidden group-open:block" />
                  </span>
                </summary>
                <div className="text-slate-500 font-light border-t border-slate-100 p-6 leading-relaxed bg-slate-50/50">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 p-8 bg-slate-900 text-white rounded-3xl text-center space-y-4 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#B48A66]/20 rounded-bl-full blur-2xl"></div>
             <h3 className="text-2xl font-bold relative z-10">Have a specific question?</h3>
             <p className="text-slate-300 relative z-10">Message us on WhatsApp, and our design team will personally respond to your query.</p>
             {(() => {
               const phoneClean = clinic.contact?.phone?.replace(/\D/g, '') || '919876543210';
               return (
                 <a href={`https://wa.me/${phoneClean}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-[#B48A66] text-white px-8 py-3 rounded-full font-bold relative z-10 hover:bg-[#9a7453] transition-colors">
                   WhatsApp: {clinic.contact?.phone || "+91 98765 43210"}
                 </a>
               );
             })()}
          </div>

        </div>
      </section>

      {/* CTA SECTION ("Create An Even Greater Experience") */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-8 w-full text-center space-y-12">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
              360-DEGREE PANORAMAS
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
              Create An Even <span className="text-[#B48A66]">Greater</span> Experience
            </h2>
          </div>

          <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <img
              src={media?.clinicImages?.[2] || media?.otherImages?.[2] || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"}
              alt="Sleek luxurious interior mockup"
              className="w-full aspect-[16/9] object-cover hover:scale-101 transition-transform duration-[2000ms]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
