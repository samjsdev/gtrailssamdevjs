import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  Star, ArrowRight, Activity, Camera, CheckCircle2,
  Compass, Layers, Smile, Scale, Ruler, Palette, Hammer, MapPin, Phone
} from 'lucide-react';
import Link from 'next/link';
import ClientHero from './ClientHero';
import ReviewsSlider from '@/components/ReviewsSlider';
import {
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_FAQS,
  INTERIOR_GALLERY_PREVIEW,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceSummary,
  getInteriorServiceData,
} from '@/lib/interiorContent';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template8/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic, doctor, business, media } = data;
  const heroImage = media.clinicImages?.[0] || INTERIOR_HERO_IMAGES.home;
  const doctorImage = media.otherImages?.[0] || INTERIOR_HERO_IMAGES.designer;

  const displayReviews = data.reviews && data.reviews.length > 0 ? data.reviews : DEFAULT_INTERIOR_REVIEWS;
  const faqs = INTERIOR_FAQS;

  const servicesList = business.services?.length
    ? business.services
    : DEFAULT_INTERIOR_SERVICES;

  const allGalleryImages = [
    ...(media.clinicImages || []),
    ...(media.treatmentImages || []),
    ...(media.otherImages || [])
  ];

  
  const waPhone = clinic.contact?.phone?.replace(/\D/g, '') || '919751396117';
  const waText = `Hi, I'm interested in booking a design consultation at ${clinic.name || 'your studio'}!`;
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="font-sans text-slate-200 bg-[#0B0F19] min-h-screen selection:bg-[#38BDF8] selection:text-slate-900 scroll-smooth">
      {/* HERO SECTION */}
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-slate-950/40 border-b border-white/5 relative">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#06B6D4]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#38BDF8] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              CORE SYSTEM
            </span>
            <div className="flex flex-col">
              <h2 className={`${plusJakarta.className} text-4xl md:text-5xl font-extrabold text-white`}>Designed Around</h2>
              <h2 className={`${plusJakarta.className} text-4xl md:text-5xl font-extrabold text-[#38BDF8] mt-1`}>Everyday Utility</h2>
            </div>
            <p className="text-base text-slate-400 max-w-xl font-light">We combine layout optimization, material curation, and systematic coordination to deliver modern, quiet interiors.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Spatial Flow", desc: "Sizing ratios, circulation directions, and daylight exposure resolved under structured grids.", icon: Compass },
              { title: "Material Rigor", desc: "Curated selections of lightweight timbers, anodized aluminum, and floating glass components.", icon: Layers },
              { title: "Tactile Rest", desc: "Rooms organized around acoustic boundaries, comfortable seating proportions, and warm finishes.", icon: Smile },
              { title: "Cost Efficiency", desc: "Systematic drawings and material schedules organized upfront to prevent deployment snags.", icon: Scale }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#38BDF8]/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#38BDF8]">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className={`${plusJakarta.className} text-lg font-bold text-white mb-2`}>{feature.title}</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#0B0F19] border-b border-white/10 relative">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#38BDF8] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              DELIVERABLES
            </span>
            <div className="flex flex-col">
              <h2 className={`${plusJakarta.className} text-4xl md:text-5xl font-extrabold text-white`}>Sleek Architecture</h2>
              <h2 className={`${plusJakarta.className} text-4xl md:text-5xl font-extrabold text-[#38BDF8] mt-1`}>Services Catalog</h2>
            </div>
            <p className="text-base text-slate-400 max-w-xl font-light">From individual room fit-outs to comprehensive turnkey contracts.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((svc: string, i: number) => {
              const svcData = getInteriorServiceData(svc);
              return (
                <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-[#38BDF8]/50 transition-all flex flex-col justify-between min-h-[300px]">
                  <div>
                    <div className="mb-6 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38BDF8]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className={`${plusJakarta.className} text-lg font-bold text-white mb-3`}>{svc}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                      {svcData?.description || getInteriorServiceSummary(svc)}
                    </p>
                  </div>
                  {svcData?.benefits && (
                    <div className="border-t border-white/10 pt-4">
                      <ul className="space-y-1">
                        {svcData.benefits.slice(0, 2).map((b, bi) => (
                          <li key={bi} className="text-xs text-[#38BDF8] flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-slate-950/40 border-b border-white/5 relative">
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#06B6D4]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative p-2 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                <img src={doctorImage} alt={doctor.name || "Lead designer"} className="w-full aspect-4/5 object-cover rounded-2xl" />
                <div className="absolute -bottom-6 -right-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-center gap-6 shadow-2xl">
                   <div>
                     <h3 className={`${plusJakarta.className} text-base font-bold text-white`}>{doctor.name || 'Lead Designer'}</h3>
                     <p className="text-[10px] text-[#38BDF8] uppercase tracking-wider mt-1 font-semibold">{doctor.specialization || 'System Architect'}</p>
                   </div>
                   <div className="text-slate-500 text-sm border-l border-white/10 pl-6 font-bold">{doctor.experience || '10+ Years'}</div>
                </div>
             </div>
             
             <div className="space-y-8">
               <span className="text-xs font-bold text-[#38BDF8] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                 STUDIO INTENT
               </span>
               <h2 className={`${plusJakarta.className} text-4xl lg:text-5xl font-extrabold text-white`}>The Design Studio</h2>
               <blockquote className="text-lg text-slate-300 leading-relaxed border-l-4 pl-4 border-[#38BDF8] italic">
                 &ldquo;{clinic.description || 'Our studio brings designers, material specialists, and execution partners together so every room is planned with both beauty and buildability in mind.'}&rdquo;
               </blockquote>

               <div className="space-y-6 pt-4">
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#38BDF8] shrink-0"><Ruler className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${plusJakarta.className} text-base font-bold text-white`}>Layout Sizing</h4>
                     <p className="text-slate-400 text-sm font-light mt-1">Millimeter precision audits on custom wardrobes, lighting layers, and utility clearance routes.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#38BDF8] shrink-0"><Palette className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${plusJakarta.className} text-base font-bold text-white`}>Glow & Material Layering</h4>
                     <p className="text-slate-400 text-sm font-light mt-1">Frosted panes, custom color temperatures, matte veneers, and acoustic paneling.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#38BDF8] shrink-0"><Hammer className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${plusJakarta.className} text-base font-bold text-white`}>Deployment Supervision</h4>
                     <p className="text-slate-400 text-sm font-light mt-1">Rigorous site inspections to ensure structural alignments match original models.</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-[#0B0F19] border-b border-white/10 relative">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#38BDF8] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              PORTFOLIO
            </span>
            <div className="flex flex-col">
              <h2 className={`${plusJakarta.className} text-4xl md:text-5xl font-extrabold text-white`}>Sleek Prototypes</h2>
              <h2 className={`${plusJakarta.className} text-4xl md:text-5xl font-extrabold text-[#38BDF8] mt-1`}>In Real Spaces</h2>
            </div>
            <p className="text-base text-slate-400 max-w-xl font-light">Actual photographs showing structural profiles, light integrations, and layout configurations.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGalleryImages.length > 0 ? (
              allGalleryImages.map((img: string, idx: number) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white/5 p-4 rounded-3xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="aspect-4/3 bg-slate-900 rounded-2xl overflow-hidden relative mb-4">
                     <img src={img} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-[#38BDF8]/10 transition-colors"></div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="flex flex-col items-center justify-center bg-white text-slate-900 w-12 h-12 rounded-full shadow-lg transform group-hover:scale-110 transition-all">
                          <Camera className="w-4 h-4" />
                       </span>
                     </div>
                  </div>
                  <h4 className={`${plusJakarta.className} text-base font-bold text-white px-2`}>Modern Suite Prototype</h4>
                  <p className="text-xs text-[#38BDF8] px-2 mt-1">Interior Layout</p>
                </div>
              ))
            ) : (
              INTERIOR_GALLERY_PREVIEW.map((item, idx) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white/5 p-4 rounded-3xl border border-white/10 transition-all">
                  <div className="aspect-4/3 bg-slate-900 rounded-2xl overflow-hidden relative mb-4">
                     <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  <h4 className={`${plusJakarta.className} text-base font-bold text-white px-2`}>{item.title}</h4>
                  <p className="text-xs text-[#38BDF8] px-2 mt-1">{item.sub}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* REVIEWS SECTION */}
      <section className="py-24 bg-[#0B0F19] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <div className="mb-16 space-y-4 text-center flex flex-col items-center">
            <span className="text-xs font-bold text-[#38BDF8] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              VERIFICATIONS
            </span>
            <h2 className={`${plusJakarta.className} text-4xl lg:text-5xl font-extrabold text-white`}>Verified Client Reviews</h2>
            <p className="text-base text-slate-400 max-w-lg font-light">Read direct logs from homeowner handovers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {displayReviews.map((review: any, i: number) => (
              <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col h-full justify-between hover:border-[#38BDF8]/30 transition-all">
                 <div>
                   <div className="flex gap-0.5 mb-6">
                     {[...Array(5)].map((_, j) => (
                       <Star key={j} className={`w-4 h-4 ${j < parseInt(review.rating) ? 'fill-[#38BDF8] text-[#38BDF8]' : 'fill-none text-slate-600'}`} />
                     ))}
                   </div>
                   <p className="text-slate-200 font-light leading-relaxed text-sm italic">&ldquo;{review.text}&rdquo;</p>
                 </div>
                 <div className="flex items-center gap-3 mt-6 border-t border-white/10 pt-4">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {review.author ? review.author.charAt(0) : 'U'}
                    </div>
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-300">{review.author || 'Client'}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-slate-950/40 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-8 w-full">
          <div className="mb-16 text-center">
             <span className="text-xs font-bold text-[#38BDF8] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
               HELP CENTER
             </span>
             <h2 className={`${plusJakarta.className} text-4xl lg:text-5xl font-extrabold text-white mt-4`}>Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
               <details key={idx} className="group border border-white/10 rounded-xl bg-white/5 px-6 py-2 open:bg-white/5 transition-all">
                 <summary className="flex items-center justify-between py-4 cursor-pointer list-none font-bold text-base text-white">
                   <span>{faq.q}</span>
                   <span className="text-xs text-[#38BDF8]">+</span>
                 </summary>
                 <p className="text-slate-400 font-light leading-relaxed pb-4 text-sm">
                   {faq.a}
                 </p>
               </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM & CTA */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`${plusJakarta.className} text-4xl md:text-5xl font-extrabold text-white mb-4`}>DEPLOY A LAYOUT</h2>
              <p className="text-base text-slate-400 mb-10 font-light">Book a scheduling call. We will review dimensions, budget ranges, and primary material options.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38BDF8]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 uppercase tracking-wider font-bold">Call Us</h4>
                    <p className="text-base font-bold text-white mt-0.5">{clinic.contact?.phone || 'Contact Number'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38BDF8]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 uppercase tracking-wider font-bold">Studio</h4>
                    <p className="text-base font-bold text-white mt-0.5">{clinic.address?.full || 'Address'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-2xl">
              <h3 className={`${plusJakarta.className} text-xl font-bold text-white mb-6`}>Request Consultation</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Message</label>
                  <textarea rows={3} placeholder="Describe your room configurations..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] resize-none"></textarea>
                </div>
                <button type="button" className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Submit Request
                </button>
              </form>
            </div>
        </div>
      </section>
    </div>
  );
}
