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
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template5/${slug}`;

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
    <div className="font-sans text-[#4A3B32] bg-[#FDFBF7] min-h-screen selection:bg-[#8C6239] selection:text-white scroll-smooth">
      {/* HERO SECTION */}
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#8C6239] tracking-[0.2em] uppercase bg-[#F7F4EB] px-3 py-1 rounded-full">
              Natural Philosophy
            </span>
            <div className="flex flex-col">
              <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B32]`}>Designed Around</h2>
              <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C6239] italic mt-1`}>Your Daily Life</h2>
            </div>
            <p className="text-lg text-[#6B5A4E] max-w-xl font-light">We balance organic materials, spatial strategy, and light to design interiors that are warm, calm, and practical.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Spatial Planning", desc: "We study circulation and natural light zoning before designing custom joinery, so spaces feel open and flow naturally.", icon: Compass },
              { title: "Tactile Palette", desc: "We select timbers, lime washes, linen textiles, and raw stones that age gracefully and feel organic to touch.", icon: Layers },
              { title: "Comfort & Rest", desc: "Every design is customized to support your daily rhythm: cooking, working, resting, and hosting.", icon: Smile },
              { title: "Execution Safety", desc: "We plan materials early, explain cost parameters clearly, and keep construction details aligned with budgets.", icon: Scale }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col p-6 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D5] hover:border-[#8C6239] transition-all">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E2D5] flex items-center justify-center mb-6 text-[#8C6239]">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className={`${playfair.className} text-xl font-bold text-[#4A3B32] mb-3`}>{feature.title}</h3>
                <p className="text-[#6B5A4E] font-light text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#8C6239] tracking-[0.2em] uppercase bg-[#E8E2D5] px-3 py-1 rounded-full">
              Our Expertise
            </span>
            <div className="flex flex-col">
              <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3B32]`}>Earthy Architecture</h2>
              <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C6239] italic mt-1`}>Services We Provide</h2>
            </div>
            <p className="text-lg text-[#6B5A4E] max-w-xl font-light">From compact modular systems to complete turnkey renovations, we handle execution with precision.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((svc: string, i: number) => {
              const svcData = getInteriorServiceData(svc);
              return (
                <div key={i} className="bg-white p-8 rounded-2xl border border-[#E8E2D5] hover:border-[#8C6239] transition-all flex flex-col justify-between min-h-[300px]">
                  <div>
                    <div className="mb-6 w-10 h-10 rounded-lg bg-[#F7F4EB] flex items-center justify-center text-[#8C6239]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className={`${playfair.className} text-xl font-bold text-[#4A3B32] mb-3`}>{svc}</h3>
                    <p className="text-[#6B5A4E] font-light text-sm leading-relaxed mb-6">
                      {svcData?.description || getInteriorServiceSummary(svc)}
                    </p>
                  </div>
                  {svcData?.benefits && (
                    <div className="border-t border-[#E8E2D5] pt-4">
                      <ul className="space-y-1">
                        {svcData.benefits.slice(0, 2).map((b, bi) => (
                          <li key={bi} className="text-xs text-[#8C6239] flex items-center gap-2 font-medium">
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
      <section id="about" className="py-24 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative">
                <img src={doctorImage} alt={doctor.name || "Lead designer"} className="w-full aspect-4/5 object-cover rounded-3xl bg-[#F7F4EB] border border-[#E8E2D5]" />
                <div className="absolute -bottom-6 -right-4 bg-white p-6 rounded-2xl shadow-lg border border-[#E8E2D5] flex items-center gap-6">
                   <div>
                     <h3 className={`${playfair.className} text-lg font-bold text-[#4A3B32]`}>{doctor.name || 'Lead Designer'}</h3>
                     <p className="text-xs text-[#8C6239] uppercase tracking-wider mt-1 font-semibold">{doctor.specialization || 'Interior Design & Sustainability'}</p>
                   </div>
                   <div className="text-gray-400 text-sm border-l border-[#E8E2D5] pl-6 font-bold">{doctor.experience || '10+ Years'}</div>
                </div>
             </div>
             
             <div className="space-y-8">
               <span className="text-xs font-bold text-[#8C6239] tracking-[0.2em] uppercase bg-[#F7F4EB] px-3 py-1 rounded-full">
                 Our Studio
               </span>
               <h2 className={`${playfair.className} text-4xl lg:text-5xl font-bold text-[#4A3B32]`}>Meet The Designers</h2>
               <blockquote className="text-lg text-[#6B5A4E] leading-relaxed border-l-4 pl-4 border-[#8C6239] italic">
                 &ldquo;{clinic.description || 'Our studio brings designers, material specialists, and execution partners together so every room is planned with both beauty and buildability in mind.'}&rdquo;
               </blockquote>

               <div className="space-y-6 pt-4">
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 rounded-lg bg-[#F7F4EB] flex items-center justify-center text-[#8C6239]"><Ruler className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${playfair.className} text-lg font-bold text-[#4A3B32]`}>Space Planning</h4>
                     <p className="text-[#6B5A4E] text-sm font-light mt-1">Ergonomic sizing, circulation audits, and utility zones designed around everyday activities.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 rounded-lg bg-[#F7F4EB] flex items-center justify-center text-[#8C6239]"><Palette className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${playfair.className} text-lg font-bold text-[#4A3B32]`}>Organic Palettes</h4>
                     <p className="text-[#6B5A4E] text-sm font-light mt-1">Earthy timber tones, plant curation, clean lime washes, and non-toxic varnishes.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 w-8 h-8 rounded-lg bg-[#F7F4EB] flex items-center justify-center text-[#8C6239]"><Hammer className="w-4 h-4" /></div>
                   <div>
                     <h4 className={`${playfair.className} text-lg font-bold text-[#4A3B32]`}>Site Management</h4>
                     <p className="text-[#6B5A4E] text-sm font-light mt-1">On-site coordination with execution partners to deliver exactly what was promised in the blueprint.</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-[#4A3B32] text-[#F7F4EB] selection:bg-[#8C6239] selection:text-white">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#C8B195] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Design Portfolio
            </span>
            <div className="flex flex-col">
              <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-bold text-white`}>Our Completed Spaces</h2>
              <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-bold text-[#C8B195] italic mt-1`}>With Calm Character</h2>
            </div>
            <p className="text-lg text-slate-300 max-w-xl font-light">Take a look at real apartments, kitchens, and offices styled with tactile natural elements.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGalleryImages.length > 0 ? (
              allGalleryImages.map((img: string, idx: number) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="aspect-4/3 bg-white/10 rounded-xl overflow-hidden relative mb-4">
                     <img src={img} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                     <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="flex flex-col items-center justify-center bg-[#8C6239] text-white w-14 h-14 rounded-full shadow-lg transform group-hover:scale-110 transition-all">
                          <Camera className="w-4 h-4 mb-1" />
                          <span className="text-[8px] uppercase tracking-wider font-bold">View</span>
                       </span>
                     </div>
                  </div>
                  <h4 className={`${playfair.className} text-lg font-bold text-white px-2`}>Organic Workspace</h4>
                  <p className="text-xs text-[#C8B195] px-2 mt-1">Interior Layout</p>
                </div>
              ))
            ) : (
              INTERIOR_GALLERY_PREVIEW.map((item, idx) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white/5 p-4 rounded-2xl border border-white/10 transition-all">
                  <div className="aspect-4/3 bg-white/10 rounded-xl overflow-hidden relative mb-4">
                     <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  <h4 className={`${playfair.className} text-lg font-bold text-white px-2`}>{item.title}</h4>
                  <p className="text-xs text-[#C8B195] px-2 mt-1">{item.sub}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* REVIEWS SECTION */}
      <section className="py-24 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4 text-center flex flex-col items-center">
            <span className="text-xs font-bold text-[#8C6239] tracking-[0.2em] uppercase bg-[#F7F4EB] px-3 py-1 rounded-full">
              Client Feedback
            </span>
            <h2 className={`${playfair.className} text-4xl lg:text-5xl font-bold text-[#4A3B32]`}>What Our Clients Say</h2>
            <p className="text-lg text-[#6B5A4E] max-w-lg font-light">Read authentic reviews from homeowners who renovated with our organic design systems.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {displayReviews.map((review: any, i: number) => (
              <div key={i} className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#E8E2D5] flex flex-col h-full justify-between">
                 <div>
                   <div className="flex gap-0.5 mb-6">
                     {[...Array(5)].map((_, j) => (
                       <Star key={j} className={`w-4 h-4 ${j < parseInt(review.rating) ? 'fill-[#8C6239] text-[#8C6239]' : 'fill-[#FDFBF7] text-[#E8E2D5]'}`} />
                     ))}
                   </div>
                   <p className="text-[#4A3B32] font-light leading-relaxed text-sm italic">&ldquo;{review.text}&rdquo;</p>
                 </div>
                 <div className="flex items-center gap-3 mt-6 border-t border-[#E8E2D5] pt-4">
                    <div className="w-8 h-8 bg-white border border-[#E8E2D5] rounded-full flex items-center justify-center text-[#8C6239] font-bold text-xs">
                      {review.author ? review.author.charAt(0) : 'U'}
                    </div>
                    <span className="font-bold text-xs text-[#4A3B32] uppercase tracking-wider">{review.author || 'Client'}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4 text-center">
             <span className="text-xs font-bold text-[#8C6239] tracking-[0.2em] uppercase bg-[#E8E2D5] px-3 py-1 rounded-full">
               Help Center
             </span>
             <h2 className={`${playfair.className} text-4xl lg:text-5xl font-bold text-[#4A3B32]`}>Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
               <details key={idx} className="group border border-[#E8E2D5] rounded-xl bg-white px-6 py-2 open:bg-white transition-all">
                 <summary className="flex items-center justify-between py-4 cursor-pointer list-none font-bold text-base text-[#4A3B32]">
                   <span>{faq.q}</span>
                   <span className="text-xs text-[#8C6239]">+</span>
                 </summary>
                 <p className="text-[#6B5A4E] font-light leading-relaxed pb-4 text-sm">
                   {faq.a}
                 </p>
               </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM & CTA */}
      <section className="py-24 bg-[#4A3B32] text-[#F7F4EB]">
        <div className="max-w-6xl mx-auto px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-white mb-4`}>Bring Nature Indoors</h2>
              <p className="text-lg text-slate-300 mb-10 font-light">Book a free call with our lead spatial planner. We will outline budget expectations and initial material configurations.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C8B195]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-[#C8B195] uppercase tracking-wider font-bold">Call Us</h4>
                    <p className="text-base font-bold text-white mt-0.5">{clinic.contact?.phone || 'Contact Number'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C8B195]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-[#C8B195] uppercase tracking-wider font-bold">Studio</h4>
                    <p className="text-base font-bold text-white mt-0.5">{clinic.address?.full || 'Address'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10">
              <h3 className={`${playfair.className} text-xl font-bold text-white mb-6`}>Request Consultation</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#C8B195]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#C8B195]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Message</label>
                  <textarea rows={3} placeholder="Describe your room sizes..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#C8B195] resize-none"></textarea>
                </div>
                <button type="button" className="w-full bg-[#8C6239] hover:bg-[#734A29] text-white font-bold py-3 rounded-xl transition-all">
                  Submit Request
                </button>
              </form>
            </div>
        </div>
      </section>
    </div>
  );
}
