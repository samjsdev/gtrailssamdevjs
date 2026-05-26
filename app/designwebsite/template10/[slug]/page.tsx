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
import { Archivo_Black } from 'next/font/google';

const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template10/${slug}`;

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
    <div className="font-sans text-[#F4F1DE] bg-[#1E2022] min-h-screen selection:bg-[#E07A5F] selection:text-white scroll-smooth">
      {/* HERO SECTION */}
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-[#141517] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1">
              STRUCTURAL STRENGTH
            </span>
            <div className="flex flex-col">
              <h2 className={`${archivo.className} text-3xl md:text-4xl lg:text-5xl text-white uppercase`}>Designed Around</h2>
              <h2 className={`${archivo.className} text-3xl md:text-4xl lg:text-5xl text-[#E07A5F] uppercase mt-1`}>Raw Integrity</h2>
            </div>
            <p className="text-lg text-slate-400 max-w-xl font-light">We organize loft layouts, expose ceiling structures, and coordinate masonry details to deliver high-character homes.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Spatial Zoning", desc: "Open-plan lofts zoned with floating partitions, floor finishes, and custom cabinetry depths.", icon: Compass },
              { title: "Raw Palettes", desc: "Black metal sections, raw aggregates, recycled timber boards, and rustic terracotta bricks.", icon: Layers },
              { title: "Ergonomic Logic", desc: "Zoned lighting fixtures, cabinet clearances, and active zones sized for human comfort.", icon: Smile },
              { title: "Scheduling Security", desc: "Itemized spreadsheets and architectural sketches frozen before single site activity starts.", icon: Scale }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col p-6 bg-[#1E2022] border border-white/10">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#E07A5F]">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className={`${archivo.className} text-lg text-white uppercase mb-3`}>{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#1E2022] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1">
              PRODUCTION CATALOG
            </span>
            <div className="flex flex-col">
              <h2 className={`${archivo.className} text-3xl md:text-4xl lg:text-5xl text-white uppercase`}>Urban Fitouts</h2>
              <h2 className={`${archivo.className} text-3xl md:text-4xl lg:text-5xl text-[#E07A5F] uppercase mt-1`}>& Loft Services</h2>
            </div>
            <p className="text-lg text-slate-400 max-w-xl font-light">From individual room fit-outs to comprehensive turnkey contracts.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((svc: string, i: number) => {
              const svcData = getInteriorServiceData(svc);
              return (
                <div key={i} className="bg-[#141517] p-8 border border-white/10 hover:border-[#E07A5F] transition-all flex flex-col justify-between min-h-[300px]">
                  <div>
                    <div className="mb-6 w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-[#E07A5F]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className={`${archivo.className} text-lg text-white uppercase`}>{svc}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mt-4 mb-6 font-light">
                      {svcData?.description || getInteriorServiceSummary(svc)}
                    </p>
                  </div>
                  {svcData?.benefits && (
                    <div className="border-t border-white/10 pt-4">
                      <ul className="space-y-1">
                        {svcData.benefits.slice(0, 2).map((b, bi) => (
                          <li key={bi} className="text-xs text-[#E07A5F] flex items-center gap-2 font-bold uppercase">
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
      <section id="about" className="py-24 bg-[#141517] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 w-full">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative border border-white/10 p-2 bg-[#1E2022]">
                <img src={doctorImage} alt={doctor.name || "Lead designer"} className="w-full aspect-4/5 object-cover bg-gray-900" />
                <div className="absolute -bottom-6 -right-4 bg-[#E07A5F] text-white p-6 border border-white/10 flex items-center gap-6 shadow-2xl">
                   <div>
                     <h3 className={`${archivo.className} text-base uppercase`}>{doctor.name || 'Lead Designer'}</h3>
                     <p className="text-[10px] text-white uppercase tracking-wider mt-1 font-bold">{doctor.specialization || 'Space Architect'}</p>
                   </div>
                   <div className="text-white text-sm border-l border-white/20 pl-6 font-bold">{doctor.experience || '10+ Years'}</div>
                </div>
             </div>
             
             <div className="space-y-8">
               <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1">
                 LOFT MANUAL
               </span>
               <h2 className={`${archivo.className} text-3xl lg:text-4xl text-white uppercase`}>Meet the Fabricators</h2>
               <blockquote className="text-lg text-slate-300 leading-relaxed border-l-4 pl-4 border-[#E07A5F] italic">
                 &ldquo;{clinic.description || 'Our studio brings designers, material specialists, and execution partners together so every room is planned with both beauty and buildability in mind.'}&rdquo;
               </blockquote>

               <div className="space-y-6 pt-4">
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-[#E07A5F] shrink-0"><Ruler className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${archivo.className} text-base text-white uppercase`}>Volumetric Drafts</h4>
                     <p className="text-slate-400 text-sm font-light mt-1">Sizing checks on metal profiles, exposed conduits, and ceiling light structures.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-[#E07A5F] shrink-0"><Palette className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${archivo.className} text-base text-white uppercase`}>Tactile Materials</h4>
                     <p className="text-slate-400 text-sm font-light mt-1">Exposed bricks, raw concretes, steel profiles, and thick rustic timber planks.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-[#E07A5F] shrink-0"><Hammer className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${archivo.className} text-base text-white uppercase`}>Snag Schedules</h4>
                     <p className="text-slate-400 text-sm font-light mt-1">On-site supervision of custom masonry, weld joints, and layout tolerances.</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-[#1E2022] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1">
              BUILT SHELLS
            </span>
            <div className="flex flex-col">
              <h2 className={`${archivo.className} text-3xl md:text-4xl lg:text-5xl text-white uppercase`}>Loft Projects</h2>
              <h2 className={`${archivo.className} text-3xl md:text-4xl lg:text-5xl text-[#E07A5F] uppercase mt-1`}>In Industrial Style</h2>
            </div>
            <p className="text-lg text-slate-400 max-w-xl font-light">Unfiltered photography from actual apartments, kitchen units, and design workspaces.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGalleryImages.length > 0 ? (
              allGalleryImages.map((img: string, idx: number) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-[#141517] p-4 border border-white/10 hover:border-white/20 transition-all">
                  <div className="aspect-4/3 bg-slate-950 overflow-hidden relative mb-4">
                     <img src={img} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-[#E07A5F]/10 transition-colors"></div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="flex flex-col items-center justify-center bg-[#E07A5F] text-white w-14 h-14 rounded-none shadow-lg transform group-hover:scale-110 transition-all">
                          <Camera className="w-4 h-4 mb-1" />
                          <span className="text-[8px] uppercase tracking-wider font-bold">View</span>
                       </span>
                     </div>
                  </div>
                  <h4 className={`${archivo.className} text-base text-white uppercase px-2`}>Urban Loft Shell</h4>
                  <p className="text-xs text-[#E07A5F] px-2 mt-1">Interior Layout</p>
                </div>
              ))
            ) : (
              INTERIOR_GALLERY_PREVIEW.map((item, idx) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-[#141517] p-4 border border-white/10 transition-all">
                  <div className="aspect-4/3 bg-slate-950 overflow-hidden relative mb-4">
                     <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  <h4 className={`${archivo.className} text-base text-white uppercase px-2`}>{item.title}</h4>
                  <p className="text-xs text-[#E07A5F] px-2 mt-1">{item.sub}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* REVIEWS SECTION */}
      <section className="py-24 bg-[#1E2022] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4 text-center flex flex-col items-center">
            <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1">
              LOGGED FEEDBACK
            </span>
            <h2 className={`${archivo.className} text-3xl lg:text-4xl text-white uppercase`}>What Loft Owners Say</h2>
            <p className="text-lg text-slate-400 max-w-lg font-light">Read actual logs from homeowner handovers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {displayReviews.map((review: any, i: number) => (
              <div key={i} className="bg-[#141517] p-8 border border-white/10 flex flex-col h-full justify-between hover:border-[#E07A5F] transition-all">
                 <div>
                   <div className="flex gap-0.5 mb-6">
                     {[...Array(5)].map((_, j) => (
                       <Star key={j} className={`w-4 h-4 ${j < parseInt(review.rating) ? 'fill-[#E07A5F] text-[#E07A5F]' : 'fill-none text-slate-600'}`} />
                     ))}
                   </div>
                   <p className="text-slate-300 leading-relaxed text-sm italic font-light">&ldquo;{review.text}&rdquo;</p>
                 </div>
                 <div className="flex items-center gap-3 mt-6 border-t border-white/10 pt-4">
                    <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-none flex items-center justify-center text-white font-bold text-xs">
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
      <section className="py-24 bg-[#141517] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-8 w-full">
          <div className="mb-16 text-center">
             <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1">
               HELP CENTER
             </span>
             <h2 className={`${archivo.className} text-3xl lg:text-4xl text-white uppercase mt-4`}>Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
               <details key={idx} className="group border border-white/10 rounded-none bg-[#1E2022] px-6 py-2 open:bg-[#1E2022] transition-all">
                 <summary className="flex items-center justify-between py-4 cursor-pointer list-none font-bold text-base text-white uppercase">
                   <span>{faq.q}</span>
                   <span className="text-xs text-[#E07A5F]">+</span>
                 </summary>
                 <p className="text-slate-400 font-light leading-relaxed pb-4 text-sm border-t border-white/10 pt-2 mt-2">
                   {faq.a}
                 </p>
               </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM & CTA */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`${archivo.className} text-3xl md:text-4xl text-white uppercase mb-4`}>LAUNCH Loft PLAN</h2>
              <p className="text-base text-slate-400 mb-10 font-light">Book a scheduling call. We will review dimensions, budget ranges, and primary material options.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#E07A5F]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 uppercase tracking-wider font-bold">Call Us</h4>
                    <p className="text-base font-bold text-white mt-0.5">{clinic.contact?.phone || 'Contact Number'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#E07A5F]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 uppercase tracking-wider font-bold">Studio</h4>
                    <p className="text-base font-bold text-white mt-0.5">{clinic.address?.full || 'Address'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1E2022] text-[#F4F1DE] rounded-none p-8 lg:p-10 border border-white/10 shadow-2xl">
              <h3 className={`${archivo.className} text-xl text-white uppercase mb-6`}>Log Project</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-2">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#141517] border border-white/10 rounded-none px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#E07A5F]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-2">Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-[#141517] border border-white/10 rounded-none px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#E07A5F]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-2">Message</label>
                  <textarea rows={3} placeholder="Describe your room configurations..." className="w-full bg-[#141517] border border-white/10 rounded-none px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#E07A5F] resize-none"></textarea>
                </div>
                <button type="button" className="w-full bg-[#E07A5F] hover:bg-[#C9644A] text-white font-bold py-3 uppercase tracking-wider text-xs transition-all">
                  Submit Request
                </button>
              </form>
            </div>
        </div>
      </section>
    </div>
  );
}
