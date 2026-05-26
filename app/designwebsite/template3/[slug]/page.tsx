import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  Star, ArrowRight, Shield, Activity, ChevronRight, Quote, Plus, Minus, 
  PlayCircle, Phone, Award, Smile, Users, Image as ImageIcon, Camera, CheckCircle2,
  Compass, Layers, Scale, Ruler, Palette, Hammer, MapPin
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
import { Fustat } from 'next/font/google';

const fustat = Fustat({
  subsets: ['latin'],
  weight: ['700'],
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ReviewItem = {
  author: string;
  rating: number | string;
  text: string;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template3/${slug}`;

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
    <div className="text-slate-900 bg-white min-h-screen selection:bg-[#0084FF] selection:text-white scroll-smooth">
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* WHY CHOOSE US */}
      <section className="py-24 lg:py-32 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-5">
            <h3 className="text-sm font-semibold text-gray-500 tracking-[0.15em] uppercase">Why Choose Us</h3>
            <div className={`${fustat.className} flex flex-col`}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-400 leading-none tracking-tighter">Designed Around</h2>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Your Life</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl pt-2">We combine spatial strategy, material intelligence, and calm project coordination to shape interiors that feel personal and practical.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: "Spatial Planning", desc: "We map movement, storage, light, and furniture placement before choosing finishes, so each room works beautifully in daily life.", icon: Compass },
              { title: "Material Curation", desc: "Our palettes combine durable surfaces, tactile textures, and refined details that suit your budget and maintenance needs.", icon: Layers },
              { title: "Comfort & Function", desc: "Every design decision supports how you cook, host, work, rest, and move through the home.", icon: Smile },
              { title: "Budget Clarity", desc: "We define priorities early, explain options clearly, and keep design decisions aligned with your project scope.", icon: Scale }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col group p-6 rounded-3xl hover:bg-gray-50 transition-colors duration-300">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-6 text-gray-800 group-hover:bg-[#0084FF] group-hover:text-white transition-colors duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-[#0084FF] mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-normal text-[15px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 lg:py-32 bg-[#F4FAFF] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-5">
            <h3 className="text-sm font-semibold text-gray-500 tracking-[0.15em] uppercase">Comprehensive Services</h3>
            <div className={`${fustat.className} flex flex-col`}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-400 leading-none tracking-tighter">Explore Our</h2>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Services</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl pt-2">Whether it is a full-home plan, modular kitchen, living room refresh, or custom storage, we shape every detail with care.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((svc: string, i: number) => {
              const svcData = getInteriorServiceData(svc);
              return (
                <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col group justify-between min-h-[350px]">
                  <div>
                    <div className="mb-8">
                       <Activity className="w-8 h-8 text-gray-400 group-hover:text-[#0084FF] transition-colors" />
                    </div>
                    <h3 className="text-2xl font-normal text-[#0084FF] mb-4 tracking-tight">{svc}</h3>
                    <p className="text-gray-500 leading-relaxed text-[15px] mb-6">
                      {svcData?.description || getInteriorServiceSummary(svc)}
                    </p>
                  </div>
                  {svcData?.benefits && (
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <ul className="space-y-1">
                        {svcData.benefits.slice(0, 2).map((b, bi) => (
                          <li key={bi} className="text-xs text-gray-400 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0084FF]" />
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

      {/* ABOUT US SECTION */}
      <section id="about" className="py-24 lg:py-32 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 w-full">
           <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
             <div className="relative">
                <img src={doctorImage} alt={doctor.name || "Lead designer"} className="w-full aspect-4/5 object-cover rounded-3xl bg-gray-100" />
                <div className="absolute -bottom-8 -right-4 md:right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-6">
                   <div>
                     <h3 className="text-xl font-medium text-[#0084FF]">{doctor.name || 'Lead Designer'}</h3>
                     <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-semibold">{doctor.specialization || 'Interior Design & Turnkey Execution'}</p>
                   </div>
                   <div className="text-gray-400 font-medium text-sm border-l border-gray-200 pl-6">{doctor.experience || '10+ Years'}</div>
                </div>
             </div>
             
             <div className="space-y-12">
               <div className="space-y-5">
                 <h3 className="text-sm font-semibold text-gray-500 tracking-[0.15em] uppercase">Our Design Studio</h3>
                 <div className={`${fustat.className} flex flex-col`}>
                   <h2 className="text-5xl lg:text-7xl font-normal text-gray-400 leading-none tracking-tighter">A Studio of</h2>
                   <h2 className="text-5xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Designers</h2>
                 </div>
                 <blockquote className="text-xl text-gray-600 leading-relaxed pt-6 border-l-2 pl-6 border-gray-200 italic">
                   &ldquo;{clinic.description || 'Our studio is shaped by designers, material specialists, and execution partners who make every space feel considered from layout to final styling.'}&rdquo;
                 </blockquote>
               </div>

               <div className="space-y-8">
                 <div className="flex gap-5 group">
                   <div className="mt-1"><Ruler className="w-6 h-6 text-gray-400 group-hover:text-[#0084FF] transition-colors" /></div>
                   <div>
                     <h4 className="text-lg font-medium text-[#0084FF]">Space Planners</h4>
                     <p className="text-gray-500 mt-2 text-[15px] leading-relaxed">Experts in circulation, room zoning, furniture placement, and storage strategies for compact and spacious homes.</p>
                   </div>
                 </div>
                 <div className="flex gap-5 group">
                   <div className="mt-1"><Palette className="w-6 h-6 text-gray-400 group-hover:text-[#0084FF] transition-colors" /></div>
                   <div>
                     <h4 className="text-lg font-medium text-[#0084FF]">Material & Lighting Leads</h4>
                     <p className="text-gray-500 mt-2 text-[15px] leading-relaxed">Specialists in finishes, lighting layers, textures, and color palettes that make every surface feel intentional.</p>
                   </div>
                 </div>
                 <div className="flex gap-5 group">
                   <div className="mt-1"><Hammer className="w-6 h-6 text-gray-400 group-hover:text-[#0084FF] transition-colors" /></div>
                   <div>
                     <h4 className="text-lg font-medium text-[#0084FF]">Execution Coordinators</h4>
                     <p className="text-gray-500 mt-2 text-[15px] leading-relaxed">Site-focused team members who align vendors, drawings, timelines, and quality checks from start to handover.</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 lg:py-32 bg-[#F4FAFF] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-5">
            <h3 className="text-sm font-semibold text-slate-500 tracking-[0.15em] uppercase">Design Portfolio</h3>
            <div className={`${fustat.className} flex flex-col`}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-slate-400 leading-none tracking-tighter">Spaces With</h2>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Character</h2>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl pt-2">Explore rooms shaped through thoughtful planning, layered materials, practical storage, and confident styling.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGalleryImages.length > 0 ? (
              allGalleryImages.map((img: string, idx: number) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white p-4 rounded-3xl border border-slate-100 hover:border-[#0084FF] transition-colors shadow-sm">
                  <div className="aspect-4/3 bg-slate-100 rounded-2xl overflow-hidden relative mb-6">
                     <img src={img} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                     <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="flex flex-col items-center justify-center bg-[#0084FF] text-white w-16 h-16 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                          <Camera className="w-5 h-5 mb-1" />
                          <span className="text-[8px] uppercase font-bold tracking-widest">View</span>
                       </span>
                     </div>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <div>
                      <h4 className="text-lg font-normal text-slate-900">Project Space</h4>
                      <p className="text-slate-500 mt-1 uppercase text-xs tracking-widest font-semibold">Gallery Work</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 group-hover:bg-[#0084FF] group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              INTERIOR_GALLERY_PREVIEW.map((item, idx) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full">
                  <div className="aspect-4/3 bg-[#006fd8] rounded-3xl overflow-hidden relative mb-6">
                     <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <div>
                      <h4 className="text-lg font-normal text-slate-900">{item.title}</h4>
                      <p className="text-slate-500 mt-1 uppercase text-xs tracking-widest font-semibold">{item.sub}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* REVIEWS SECTION */}
      <section className="py-24 lg:py-32 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-5 text-center">
            <h3 className="text-sm font-semibold text-gray-500 tracking-[0.15em] uppercase">Client Stories</h3>
            <div className="flex flex-col items-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-400 leading-none tracking-tighter">Over 500+</h2>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Happy Clients</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto pt-2">Don&apos;t just take our word for it. Read real experiences from our valued community.</p>
          </div>

          {displayReviews.length > 5 ? (
            <ReviewsSlider reviews={displayReviews} theme="template3" />
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {displayReviews.map((review: ReviewItem, i: number) => (
                <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 flex flex-col h-full hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                   <div className="flex gap-1 mb-8">
                     {[...Array(5)].map((_, j) => (
                       <Star key={j} className={`w-4 h-4 ${j < parseInt(String(review.rating), 10) ? 'fill-gray-800 text-gray-800' : 'fill-gray-200 text-gray-200'}`} />
                     ))}
                   </div>
                   <p className="text-gray-600 leading-relaxed mb-10 text-[16px] grow font-light">&ldquo;{review.text}&rdquo;</p>
                   <div className="flex items-center gap-4 mt-auto border-t border-gray-100 pt-6">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#0084FF] font-semibold text-sm">
                        {review.author ? review.author.charAt(0) : 'U'}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[#0084FF] uppercase tracking-wider">{review.author || 'Client'}</h4>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-5 text-center">
             <h3 className="text-sm font-semibold text-gray-500 tracking-[0.15em] uppercase">Common Queries</h3>
             <div className="flex flex-col items-center">
               <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-400 leading-none tracking-tighter">Frequently Asked</h2>
               <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Questions</h2>
             </div>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => (
               <details key={idx} className="group border-b border-slate-200 open:pb-6">
                 <summary className="flex items-center justify-between py-8 cursor-pointer list-none font-medium text-xl text-[#0084FF]">
                   <span className="pr-8">{faq.q}</span>
                   <span className="flex shrink-0 w-8 h-8 items-center justify-center rounded-full bg-slate-50 group-open:bg-[#0084FF] group-open:text-white transition-colors border border-slate-200 group-open:border-[#0084FF]">
                     <Plus className="w-4 h-4 group-open:hidden" />
                     <Minus className="w-4 h-4 hidden group-open:block" />
                   </span>
                 </summary>
                 <p className="text-gray-600 leading-relaxed pt-2 pb-4 text-[17px] font-light">
                   {faq.a}
                 </p>
               </details>
            ))}
          </div>
        </div>
      </section>
      {/* WHATSAPP CTA SECTION */}
      <section className="py-24 bg-[#0d1117] text-white">
        <div className="max-w-5xl mx-auto px-8 w-full flex flex-col items-center text-center gap-8">
          <div className="w-24 h-24 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl" style={{ boxShadow: '0 8px 48px rgba(37,211,102,0.35)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-12 h-12"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Let&apos;s Plan Your<br/><span className="text-[#25D366]">Dream Space</span></h2>
          <p className="text-gray-400 text-xl max-w-xl font-light">Chat with our design team on WhatsApp. Share your space photos, get a quick budget estimate, and book a free consultation.</p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1db954] text-white font-bold px-10 py-5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
            <a href={`tel:${clinic.contact?.phone || ''}`} className="flex items-center gap-2 border border-white/20 text-white px-8 py-5 rounded-full hover:border-white/50 transition-all text-[15px] font-medium">
              Call Us: {clinic.contact?.phone || 'Contact Us'}
            </a>
          </div>
          <p className="text-gray-600 text-sm">&#x2022; Free consultation &nbsp;&#x2022; Quick response &nbsp;&#x2022; No commitment required</p>
        </div>
      </section>
    </div>
  );
}