import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  Star, ArrowRight, Shield, Activity, ChevronRight, Quote, Plus, Minus, 
  PlayCircle, Phone, Award, Smile, Users, Image as ImageIcon, Camera, CheckCircle2,
  Compass, Layers, Scale, Ruler, Palette, Hammer
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
} from '@/lib/interiorContent';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic, doctor, business, media } = data;
  const heroImage = media.clinicImages?.[0] || INTERIOR_HERO_IMAGES.home;
  const doctorImage = media.otherImages?.[0] || INTERIOR_HERO_IMAGES.designer;

  const displayReviews = data.reviews && data.reviews.length > 0 ? data.reviews : DEFAULT_INTERIOR_REVIEWS;

  const faqs = INTERIOR_FAQS;

  const servicesList = business.services?.length
    ? business.services.slice(0, 6)
    : DEFAULT_INTERIOR_SERVICES;

  return (
    <div className="font-sans text-[#0A0A0A] bg-[#FCFAF6] min-h-screen selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* WHY CHOOSE US */}
      <section className="py-24 lg:py-32 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] shadow-sm">
              <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Why Choose Us</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">Designed Around</h4>
              <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">Your Life<span className="text-[#C1FF72]">.</span></h4>
            </div>
            <p className="text-xl text-gray-500 font-medium max-w-2xl pt-2">We combine spatial strategy, material intelligence, and calm project coordination to shape interiors that feel personal and practical.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Spatial Planning", desc: "We map movement, storage, light, and furniture placement before choosing finishes, so each room works beautifully in daily life.", icon: Compass },
              { title: "Material Curation", desc: "Our palettes combine durable surfaces, tactile textures, and refined details that suit your budget and maintenance needs.", icon: Layers },
              { title: "Comfort & Function", desc: "Every design decision supports how you cook, host, work, rest, and move through the home.", icon: Smile },
              { title: "Budget Clarity", desc: "We define priorities early, explain options clearly, and keep design decisions aligned with your project scope.", icon: Scale }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col group p-8 rounded-4xl bg-[#FCFAF6] hover:bg-white border border-transparent hover:border-[#0A0A0A] hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center mb-8 text-[#0A0A0A] group-hover:bg-[#C1FF72] group-hover:border-[#C1FF72] transition-colors duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h5 className="text-xl font-bold text-[#0A0A0A] mb-3">{feature.title}</h5>
                <p className="text-gray-500 font-medium leading-relaxed text-[15px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 lg:py-32 bg-[#FCFAF6]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div className="space-y-6 flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E5E5] shadow-sm">
                 <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Comprehensive Services</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">Explore Our</h4>
                <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">Services<span className="text-[#C1FF72]">.</span></h4>
              </div>
              <p className="text-xl text-gray-500 font-medium max-w-2xl pt-2">Whether it is a full-home plan, modular kitchen, living room refresh, or custom storage, we shape every detail with care.</p>
            </div>
            <Link href={`${basePath}/services`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0A0A0A] text-white font-bold hover:bg-[#1A1A1A] transition-all hover:scale-105 active:scale-95 text-[15px] tracking-wide shadow-sm whitespace-nowrap">
              View All Services
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((svc: string, i: number) => (
              <div key={i} className="bg-white p-10 rounded-4xl border border-[#E5E5E5] hover:border-[#0A0A0A] hover:shadow-xl transition-all duration-300 flex flex-col group min-h-80 relative overflow-hidden">
                <div className="mb-8 relative z-10 flex justify-between items-start">
                   <div className="w-12 h-12 rounded-full bg-[#FCFAF6] flex items-center justify-center text-[#0A0A0A] group-hover:bg-[#C1FF72] transition-colors">
                     <Activity className="w-5 h-5" />
                   </div>
                </div>
                <h5 className="text-2xl font-bold text-[#0A0A0A] mb-4 tracking-tight relative z-10">{svc}</h5>
                <p className="text-gray-500 font-medium leading-relaxed mb-8 grow text-[15px] relative z-10">
                  {getInteriorServiceSummary(svc)}
                </p>
                <Link href={`${basePath}/services`} className="flex items-center justify-between mt-auto border-t border-[#E5E5E5] pt-6 relative z-10">
                  <span className="text-sm font-bold uppercase tracking-wider text-[#0A0A0A] group-hover:text-gray-600 transition-colors">Read Details</span>
                  <div className="w-10 h-10 rounded-full bg-[#FCFAF6] flex items-center justify-center text-[#0A0A0A] group-hover:bg-[#C1FF72] transition-all transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 lg:py-32 bg-[#0A0A0A] text-white selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div className="space-y-6 flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm">
                <span className="text-xs font-bold text-white tracking-wider uppercase">Design Portfolio</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter">Spaces With</h4>
                <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#C1FF72] leading-[1.05] tracking-tighter mt-1">Character<span className="text-white">.</span></h4>
              </div>
              <p className="text-xl text-gray-400 font-medium max-w-2xl pt-2">Explore rooms shaped through thoughtful planning, layered materials, practical storage, and confident styling.</p>
            </div>
            <Link href={`${basePath}/gallery`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0A0A0A] font-bold hover:bg-[#C1FF72] transition-all hover:scale-105 active:scale-95 text-[15px] tracking-wide shadow-sm whitespace-nowrap">
              View Full Gallery
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(() => {
              const allPreviewImages = [...(media.clinicImages || []), ...(media.treatmentImages || []), ...(media.otherImages || [])];
              const previewItems = INTERIOR_GALLERY_PREVIEW.map((item, index) => ({ ...item, img: allPreviewImages[index] }));
              return previewItems.map((item, idx) => (
                <Link key={idx} href={`${basePath}/gallery`} className="group cursor-pointer flex flex-col h-full bg-white/5 p-4 rounded-4xl border border-white/10 hover:border-white/30 transition-colors">
                  <div className="aspect-4/3 bg-white/10 rounded-2xl overflow-hidden relative mb-6">
                     {item.img ? (
                       <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                     ) : null}
                     <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="flex flex-col items-center justify-center bg-[#C1FF72] text-[#0A0A0A] w-24 h-24 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                          <Camera className="w-8 h-8 mb-1" />
                          <span className="text-[10px] uppercase font-bold tracking-widest">View</span>
                       </span>
                     </div>
                  </div>
                  <div className="flex justify-between items-center px-4 pb-2">
                    <div>
                      <h5 className="text-xl font-bold text-white">{item.title}</h5>
                      <p className="text-[#C1FF72] mt-1 text-xs font-bold tracking-widest uppercase">{item.sub}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#C1FF72] group-hover:text-[#0A0A0A] transition-all">
                      <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                    </div>
                  </div>
                </Link>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* SPECIALISTS */}
      <section className="py-24 lg:py-32 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
           <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
             <div className="order-2 lg:order-1 relative">
                <img src={doctorImage} alt={doctor.name || "Lead designer"} className="w-full aspect-4/5 object-cover rounded-4xl bg-[#FCFAF6] border border-[#E5E5E5]" />
                <div className="absolute -bottom-8 -right-4 md:right-8 bg-white p-6 rounded-4xl shadow-xl border border-[#E5E5E5] flex items-center gap-6">
                   <div>
                     <h4 className="text-xl font-bold text-[#0A0A0A]">{doctor.name || 'Lead Designer'}</h4>
                     <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-bold">{doctor.specialization || 'Interior Design & Turnkey Execution'}</p>
                   </div>
                   <div className="text-gray-400 font-bold text-sm border-l border-[#E5E5E5] pl-6">{doctor.experience || '10+ Years'}</div>
                </div>
             </div>
             
             <div className="order-1 lg:order-2 space-y-12">
               <div className="space-y-6">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] shadow-sm">
                   <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Our Design Studio</span>
                 </div>
                 <div className="flex flex-col">
                   <h4 className="text-5xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">A Studio of</h4>
                   <h4 className="text-5xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">Designers<span className="text-[#C1FF72]">.</span></h4>
                 </div>
                 <blockquote className="text-xl text-gray-500 font-medium leading-relaxed pt-6 border-l-4 pl-6 border-[#C1FF72] italic">
                   &ldquo;Our studio brings designers, material specialists, and execution partners together so every room is planned with both beauty and buildability in mind.&rdquo;
                 </blockquote>
               </div>

               <div className="space-y-8">
                 <div className="flex gap-5 group">
                   <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] flex items-center justify-center group-hover:bg-[#C1FF72] transition-colors"><Ruler className="w-5 h-5 text-[#0A0A0A]" /></div>
                   <div>
                     <h5 className="text-xl font-bold text-[#0A0A0A]">Space Planners</h5>
                     <p className="text-gray-500 mt-2 text-[15px] font-medium leading-relaxed">Experts in circulation, room zoning, furniture placement, and storage strategies for compact and spacious homes.</p>
                   </div>
                 </div>
                 <div className="flex gap-5 group">
                   <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] flex items-center justify-center group-hover:bg-[#C1FF72] transition-colors"><Palette className="w-5 h-5 text-[#0A0A0A]" /></div>
                   <div>
                     <h5 className="text-xl font-bold text-[#0A0A0A]">Material & Lighting Leads</h5>
                     <p className="text-gray-500 mt-2 text-[15px] font-medium leading-relaxed">Specialists in finishes, lighting layers, textures, and color palettes that make every surface feel intentional.</p>
                   </div>
                 </div>
                 <div className="flex gap-5 group">
                   <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] flex items-center justify-center group-hover:bg-[#C1FF72] transition-colors"><Hammer className="w-5 h-5 text-[#0A0A0A]" /></div>
                   <div>
                     <h5 className="text-xl font-bold text-[#0A0A0A]">Execution Coordinators</h5>
                     <p className="text-gray-500 mt-2 text-[15px] font-medium leading-relaxed">Site-focused team members who align vendors, drawings, timelines, and quality checks from start to handover.</p>
                   </div>
                 </div>
               </div>
               
               <div className="pt-4">
                  <Link href={`${basePath}/about-us`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-[#E5E5E5] text-[#0A0A0A] font-bold hover:bg-[#FCFAF6] hover:border-[#0A0A0A] transition-all hover:scale-105 active:scale-95 text-[15px] tracking-wide shadow-sm">
                    Learn More About Us
                  </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 lg:py-32 bg-[#FCFAF6] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-6 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E5E5] shadow-sm">
              <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Client Stories</span>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">Over 500+</h4>
              <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">Happy Clients<span className="text-[#C1FF72]">.</span></h4>
            </div>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto pt-2">Read real experiences from clients who trusted us with their homes and workspaces.</p>
          </div>

          {displayReviews.length > 5 ? (
            <ReviewsSlider reviews={displayReviews} theme="template1" />
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {displayReviews.map((review: any, i: number) => (
                <div key={i} className="bg-white p-10 rounded-4xl border border-[#E5E5E5] flex flex-col h-full hover:shadow-xl hover:border-[#0A0A0A] transition-all duration-300">
                   <div className="flex gap-1 mb-8">
                     {[...Array(5)].map((_, j) => (
                       <Star key={j} className={`w-5 h-5 ${j < parseInt(review.rating) ? 'fill-[#C1FF72] text-[#0A0A0A]' : 'fill-[#FCFAF6] text-[#E5E5E5]'}`} />
                     ))}
                   </div>
                   <p className="text-[#0A0A0A] leading-relaxed mb-10 text-[16px] grow font-bold text-lg">&ldquo;{review.text}&rdquo;</p>
                   <div className="flex items-center gap-4 mt-auto border-t border-[#E5E5E5] pt-6">
                      <div className="w-10 h-10 bg-[#FCFAF6] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#0A0A0A] font-extrabold text-sm">
                        {review.author ? review.author.charAt(0) : 'U'}
                      </div>
                      <div>
                        <h6 className="font-bold text-sm text-[#0A0A0A] uppercase tracking-wider">{review.author || 'Client'}</h6>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-6 text-center flex flex-col items-center">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] shadow-sm">
               <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Common Queries</span>
             </div>
             <div className="flex flex-col items-center">
               <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">Frequently Asked</h4>
               <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">Questions<span className="text-[#C1FF72]">.</span></h4>
             </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
               <details key={idx} className="group border border-[#E5E5E5] rounded-4xl bg-[#FCFAF6] px-8 open:bg-white open:border-[#0A0A0A] hover:border-[#0A0A0A] transition-colors">
                 <summary className="flex items-center justify-between py-6 cursor-pointer list-none font-bold text-xl text-[#0A0A0A]">
                   <span className="pr-8">{faq.q}</span>
                   <span className="flex shrink-0 w-10 h-10 items-center justify-center rounded-full bg-white group-open:bg-[#C1FF72] group-open:text-[#0A0A0A] transition-colors border border-[#E5E5E5] group-open:border-[#0A0A0A]">
                     <Plus className="w-5 h-5 group-open:hidden" />
                     <Minus className="w-5 h-5 hidden group-open:block" />
                   </span>
                 </summary>
                 <p className="text-gray-500 font-medium leading-relaxed pb-8 text-[16px]">
                   {faq.a}
                 </p>
               </details>
            ))}
          </div>
          
          <div className="mt-16 bg-[#FCFAF6] rounded-4xl p-12 text-center border border-[#E5E5E5] flex flex-col items-center">
             <h5 className="font-extrabold text-3xl text-[#0A0A0A] mb-4">Have a different question?</h5>
             <p className="text-gray-500 font-medium mb-8 max-w-lg mx-auto">Our design team is ready to help you clarify your next step.</p>
             <a href={`tel:${clinic.contact?.phone || ''}`} className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#0A0A0A] text-white hover:bg-[#1A1A1A] transition-all hover:scale-105 active:scale-95 font-bold tracking-wide shadow-sm">
                Call Us Directly
             </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 lg:py-40 bg-[#0A0A0A] text-white selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-8 text-center w-full flex flex-col items-center">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter mb-2">Your Design Journey</h3>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#C1FF72] leading-[1.05] tracking-tighter mb-8">Starts Here<span className="text-white">.</span></h3>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto mb-12">Bring your space closer to the way you want to live. Book a consultation and let us shape a clear design path forward.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
               <a href={`tel:${clinic.contact?.phone || ''}`} className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#C1FF72] text-[#0A0A0A] font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-[15px] tracking-wide shadow-sm">
                 <Phone className="w-5 h-5" /> Call {clinic.contact?.phone || 'Now'}
               </a>
               <Link href={`${basePath}/contact-us`} className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#0A0A0A] border border-white/20 text-white font-bold hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-[15px] tracking-wide shadow-sm">
                 Send Enquiry <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
