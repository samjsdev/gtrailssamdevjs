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
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template6/${slug}`;

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
    <div className="font-sans text-black bg-[#FFFEEB] min-h-screen selection:bg-[#FFF275] selection:text-black scroll-smooth">
      {/* HERO SECTION */}
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* WHY CHOOSE US */}
      <section className="py-20 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="inline-block text-xs font-black tracking-wider text-black bg-[#E0FF4F] border-2 border-black px-4 py-1.5 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              WHO WE ARE
            </span>
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl font-black uppercase`}>
              DESIGNED TO STAND OUT
            </h2>
            <p className="text-lg text-slate-800 max-w-xl font-bold">We drop the soft fluff and build structure. We mix material durability with visual strength so rooms work perfectly.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "SPATIAL OUTLINES", desc: "No dead corners. We map traffic flow, clearance depths, and active zones in black and white before styling.", icon: Compass },
              { title: "RAW TEXTURES", desc: "Palettes utilize brushed steel, matte veneers, volcanic slate, and raw aggregates that require zero filter.", icon: Layers },
              { title: "DAILY DURABILITY", desc: "Built for active hosting, cooking mess, workspace wear, and long term use.", icon: Smile },
              { title: "COST MATRICES", desc: "No hidden numbers. Itemized budgets frozen in contracts before single wall gets treated.", icon: Scale }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col p-6 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-12 h-12 border-2 border-black bg-[#E0FF4F] flex items-center justify-center mb-6">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className={`${spaceGrotesk.className} text-xl font-black uppercase mb-3`}>{feature.title}</h3>
                <p className="text-slate-700 font-medium text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="inline-block text-xs font-black tracking-wider text-black bg-[#06D6A0] border-2 border-black px-4 py-1.5 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              OUR CAPABILITIES
            </span>
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl font-black uppercase`}>
              PRODUCTION SPECS
            </h2>
            <p className="text-lg text-slate-800 max-w-xl font-bold">Standard services detailed with clear deliverables and processes.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((svc: string, i: number) => {
              const svcData = getInteriorServiceData(svc);
              return (
                <div key={i} className="bg-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between min-h-[320px]">
                  <div>
                    <div className="mb-6 w-10 h-10 border-2 border-black bg-[#06D6A0] flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className={`${spaceGrotesk.className} text-xl font-black uppercase mb-3`}>{svc}</h3>
                    <p className="text-slate-700 font-medium text-sm leading-relaxed mb-6">
                      {svcData?.description || getInteriorServiceSummary(svc)}
                    </p>
                  </div>
                  {svcData?.benefits && (
                    <div className="border-t-2 border-black pt-4">
                      <ul className="space-y-1">
                        {svcData.benefits.slice(0, 2).map((b, bi) => (
                          <li key={bi} className="text-xs font-bold uppercase flex items-center gap-2">
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
      <section id="about" className="py-20 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-8 w-full">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative">
                <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                   <img src={doctorImage} alt={doctor.name || "Lead designer"} className="w-full aspect-4/5 object-cover border-2 border-black" />
                </div>
                <div className="absolute -bottom-6 -right-4 bg-[#FF8C42] p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-6">
                   <div>
                     <h3 className={`${spaceGrotesk.className} text-lg font-black uppercase`}>{doctor.name || 'Lead Designer'}</h3>
                     <p className="text-xs font-black uppercase tracking-wider mt-1">{doctor.specialization || 'Space Planner'}</p>
                   </div>
                   <div className="font-black text-sm border-l-2 border-black pl-6">{doctor.experience || '10+ Years'}</div>
                </div>
             </div>
             
             <div className="space-y-8">
               <span className="inline-block text-xs font-black tracking-wider text-black bg-[#E0FF4F] border-2 border-black px-4 py-1.5 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                 STUDIO MANIFESTO
               </span>
               <h2 className={`${spaceGrotesk.className} text-4xl lg:text-5xl font-black uppercase`}>THE ARCHITECTS</h2>
               <blockquote className="text-lg font-bold leading-relaxed border-l-4 pl-4 border-black italic">
                 &ldquo;{clinic.description || 'Our studio coordinates draftsmen, fabricators, and masonry partners in a tight schedule so details look exactly like renders.'}&rdquo;
               </blockquote>

               <div className="space-y-6 pt-4">
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 border-2 border-black bg-white flex items-center justify-center shrink-0"><Ruler className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${spaceGrotesk.className} text-lg font-black uppercase`}>DRAFTING PROPORTIONS</h4>
                     <p className="text-slate-700 text-sm font-medium mt-1">Millimeter accuracy on custom drawer elevations, cabinet clearances, and sockets placement.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 border-2 border-black bg-white flex items-center justify-center shrink-0"><Palette className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${spaceGrotesk.className} text-lg font-black uppercase`}>DENSE FINISHES</h4>
                     <p className="text-slate-700 text-sm font-medium mt-1">High durability surfaces selected to resist scratching, staining, fading, and peeling.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 border-2 border-black bg-white flex items-center justify-center shrink-0"><Hammer className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${spaceGrotesk.className} text-lg font-black uppercase`}>SITE SCHEDULING</h4>
                     <p className="text-slate-700 text-sm font-medium mt-1">Daily snag checks, clear logs, and transparent vendor coordination.</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-20 bg-black text-white selection:bg-[#FF8C42] selection:text-black">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="inline-block text-xs font-black tracking-wider text-black bg-[#FF8C42] border-2 border-black px-4 py-1.5 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              WORK MATRIX
            </span>
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white`}>
              REAL PROJECTS
            </h2>
            <p className="text-lg text-slate-300 max-w-xl font-bold">Unfiltered photos showing joinery junctions, material pairings, and site resolutions.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGalleryImages.length > 0 ? (
              allGalleryImages.map((img: string, idx: number) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-slate-900 border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] p-4">
                  <div className="aspect-4/3 bg-slate-800 border-2 border-white overflow-hidden relative mb-4">
                     <img src={img} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-[#FFF275]/20 transition-all"></div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="flex flex-col items-center justify-center bg-white text-black border-2 border-black w-14 h-14 font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          VIEW
                       </span>
                     </div>
                  </div>
                  <h4 className={`${spaceGrotesk.className} text-lg font-black uppercase text-white`}>BUILT SHELL</h4>
                  <p className="text-xs text-[#FF8C42] font-black uppercase mt-1">INTERIOR SYSTEM</p>
                </div>
              ))
            ) : (
              INTERIOR_GALLERY_PREVIEW.map((item, idx) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-slate-900 border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] p-4">
                  <div className="aspect-4/3 bg-slate-800 border-2 border-white overflow-hidden relative mb-4">
                     <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  <h4 className={`${spaceGrotesk.className} text-lg font-black uppercase text-white`}>{item.title}</h4>
                  <p className="text-xs text-[#FF8C42] font-black uppercase mt-1">{item.sub}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* REVIEWS SECTION */}
      <section className="py-20 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4 text-center flex flex-col items-center">
            <span className="inline-block text-xs font-black tracking-wider text-black bg-[#E0FF4F] border-2 border-black px-4 py-1.5 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              VERIFIED USER LOGS
            </span>
            <h2 className={`${spaceGrotesk.className} text-4xl lg:text-5xl font-black uppercase`}>CLIENT STORIES</h2>
            <p className="text-lg text-slate-700 max-w-lg font-bold">Read verified logs from site handovers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {displayReviews.map((review: any, i: number) => (
              <div key={i} className="bg-[#FFFEEB] p-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full justify-between">
                 <div>
                   <div className="flex gap-0.5 mb-6">
                     {[...Array(5)].map((_, j) => (
                       <Star key={j} className={`w-4 h-4 ${j < parseInt(review.rating) ? 'fill-black text-black' : 'fill-none text-black'}`} />
                     ))}
                   </div>
                   <p className="text-black font-bold leading-relaxed text-sm italic">&ldquo;{review.text}&rdquo;</p>
                 </div>
                 <div className="flex items-center gap-3 mt-6 border-t-2 border-black pt-4">
                    <div className="w-8 h-8 bg-white border-2 border-black rounded-none flex items-center justify-center text-black font-black text-xs">
                      {review.author ? review.author.charAt(0) : 'U'}
                    </div>
                    <span className="font-black text-xs uppercase tracking-wider">{review.author || 'Client'}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4 text-center">
             <span className="inline-block text-xs font-black tracking-wider text-black bg-[#FFF275] border-2 border-black px-4 py-1.5 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
               HELP CENTER
             </span>
             <h2 className={`${spaceGrotesk.className} text-4xl lg:text-5xl font-black uppercase`}>FAQ REGISTRY</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
               <details key={idx} className="group border-4 border-black bg-white px-6 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                 <summary className="flex items-center justify-between py-4 cursor-pointer list-none font-black text-base uppercase">
                   <span>{faq.q}</span>
                   <span className="text-lg font-black">+</span>
                 </summary>
                 <p className="text-slate-800 font-bold leading-relaxed pb-4 text-sm border-t border-black pt-2">
                   {faq.a}
                 </p>
               </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM & CTA */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-black uppercase text-white mb-4`}>START PRODUCTION</h2>
              <p className="text-lg text-slate-300 mb-10 font-bold">Request an on-site draft call. We itemize specifications, sizes, and layout choices directly.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border-2 border-white bg-white/5 flex items-center justify-center text-[#FF8C42]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 uppercase font-black">VOICE WIRE</h4>
                    <p className="text-base font-black text-white mt-0.5">{clinic.contact?.phone || 'Contact Number'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border-2 border-white bg-white/5 flex items-center justify-center text-[#FF8C42]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 uppercase font-black">SHELL LOCATION</h4>
                    <p className="text-base font-black text-white mt-0.5">{clinic.address?.full || 'Address'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFEEB] text-black border-4 border-black p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
              <h3 className={`${spaceGrotesk.className} text-xl font-black uppercase mb-6`}>LOG INQUIRY</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-2">USER NAME</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white border-2 border-black px-4 py-2.5 text-black placeholder-slate-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-2">PHONE NUMBER</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white border-2 border-black px-4 py-2.5 text-black placeholder-slate-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-2">PROJECT DETAIL</label>
                  <textarea rows={3} placeholder="Describe room configurations..." className="w-full bg-white border-2 border-black px-4 py-2.5 text-black placeholder-slate-400 focus:outline-none resize-none"></textarea>
                </div>
                <button type="button" className="w-full bg-[#FF8C42] border-4 border-black hover:bg-black hover:text-[#FF8C42] text-black font-black py-3 uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  TRANSMIT REQUEST
                </button>
              </form>
            </div>
        </div>
      </section>
    </div>
  );
}
