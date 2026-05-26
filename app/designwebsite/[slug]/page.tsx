import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  Star, ArrowRight, Shield, Activity, ChevronRight, Quote, Plus, Minus, 
  PlayCircle, Phone, Award, Smile, Users, Image as ImageIcon, Camera, CheckCircle2,
  Compass, Layers, Scale, Ruler, Palette, Hammer, HelpCircle, Mail, MapPin
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
    ? business.services
    : DEFAULT_INTERIOR_SERVICES;

  const allGalleryImages = [
    ...(media.clinicImages || []),
    ...(media.treatmentImages || []),
    ...(media.otherImages || [])
  ].slice(0, 10);

  const waPhone = clinic.contact?.phone?.replace(/\D/g, '') || '919751396117';
  const waText = `Hi, I'm interested in booking a design consultation at ${clinic.name || 'your studio'}!`;
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="font-sans text-[#0A0A0A] bg-[#FCFAF6] min-h-screen selection:bg-[#C1FF72] selection:text-[#0A0A0A] scroll-smooth">
      {/* HERO SECTION */}
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* WHY CHOOSE US */}
      <section className="py-24 lg:py-32 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] shadow-sm">
              <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Why Choose Us</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">Designed Around</h2>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">Your Life<span className="text-[#C1FF72]">.</span></h2>
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
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-[15px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 lg:py-32 bg-[#FCFAF6] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E5E5] shadow-sm">
               <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Our Services</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">Interior Expertise</h2>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">Tailored for You<span className="text-[#C1FF72]">.</span></h2>
            </div>
            <p className="text-xl text-gray-500 font-medium max-w-2xl pt-2">From concept layout plans to complete turnkey execution, we cover all aspects of interior architecture.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((svc: string, i: number) => {
              const svcData = getInteriorServiceData(svc);
              return (
                <div key={i} className="bg-white p-10 rounded-4xl border border-[#E5E5E5] hover:border-[#0A0A0A] hover:shadow-xl transition-all duration-300 flex flex-col group min-h-96 justify-between">
                  <div>
                    <div className="mb-8 w-12 h-12 rounded-full bg-[#FCFAF6] flex items-center justify-center text-[#0A0A0A] group-hover:bg-[#C1FF72] transition-colors">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4 tracking-tight">{svc}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed mb-6 text-[15px]">
                      {svcData?.description || getInteriorServiceSummary(svc)}
                    </p>
                  </div>
                  {svcData?.benefits && (
                    <div className="border-t border-[#E5E5E5] pt-6 mt-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Key Highlights</h4>
                      <ul className="space-y-2">
                        {svcData.benefits.slice(0, 2).map((b, bi) => (
                          <li key={bi} className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-[#C1FF72] shrink-0" />
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
      <section id="about" className="py-24 lg:py-32 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
           <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
             <div className="relative">
                <img src={doctorImage} alt={doctor.name || "Lead designer"} className="w-full aspect-4/5 object-cover rounded-4xl bg-[#FCFAF6] border border-[#E5E5E5]" />
                <div className="absolute -bottom-8 -right-4 md:right-8 bg-white p-6 rounded-4xl shadow-xl border border-[#E5E5E5] flex items-center gap-6">
                   <div>
                     <h3 className="text-xl font-bold text-[#0A0A0A]">{doctor.name || 'Lead Designer'}</h3>
                     <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-bold">{doctor.specialization || 'Interior Design & Turnkey Execution'}</p>
                   </div>
                   <div className="text-gray-400 font-bold text-sm border-l border-[#E5E5E5] pl-6">{doctor.experience || '10+ Years'}</div>
                </div>
             </div>
             
             <div className="space-y-12">
               <div className="space-y-6">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] shadow-sm">
                   <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Our Design Studio</span>
                 </div>
                 <div className="flex flex-col">
                   <h2 className="text-5xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">A Studio of</h2>
                   <h2 className="text-5xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">Designers<span className="text-[#C1FF72]">.</span></h2>
                 </div>
                 <blockquote className="text-xl text-gray-500 font-medium leading-relaxed pt-6 border-l-4 pl-6 border-[#C1FF72] italic">
                   &ldquo;{clinic.description || 'Our studio brings designers, material specialists, and execution partners together so every room is planned with both beauty and buildability in mind.'}&rdquo;
                 </blockquote>
               </div>

               <div className="space-y-8">
                 <div className="flex gap-5 group">
                   <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] flex items-center justify-center group-hover:bg-[#C1FF72] transition-colors"><Ruler className="w-5 h-5 text-[#0A0A0A]" /></div>
                   <div>
                     <h4 className="text-xl font-bold text-[#0A0A0A]">Space Planners</h4>
                     <p className="text-gray-500 mt-2 text-[15px] font-medium leading-relaxed">Experts in circulation, room zoning, furniture placement, and storage strategies for compact and spacious homes.</p>
                   </div>
                 </div>
                 <div className="flex gap-5 group">
                   <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] flex items-center justify-center group-hover:bg-[#C1FF72] transition-colors"><Palette className="w-5 h-5 text-[#0A0A0A]" /></div>
                   <div>
                     <h4 className="text-xl font-bold text-[#0A0A0A]">Material & Lighting Leads</h4>
                     <p className="text-gray-500 mt-2 text-[15px] font-medium leading-relaxed">Specialists in finishes, lighting layers, textures, and color palettes that make every surface feel intentional.</p>
                   </div>
                 </div>
                 <div className="flex gap-5 group">
                   <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] flex items-center justify-center group-hover:bg-[#C1FF72] transition-colors"><Hammer className="w-5 h-5 text-[#0A0A0A]" /></div>
                   <div>
                     <h4 className="text-xl font-bold text-[#0A0A0A]">Execution Coordinators</h4>
                     <p className="text-gray-500 mt-2 text-[15px] font-medium leading-relaxed">Site-focused team members who align vendors, drawings, timelines, and quality checks from start to handover.</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 lg:py-32 bg-[#0A0A0A] text-white selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm">
              <span className="text-xs font-bold text-white tracking-wider uppercase">Design Portfolio</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter">Spaces With</h2>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#C1FF72] leading-[1.05] tracking-tighter mt-1">Character<span className="text-white">.</span></h2>
            </div>
            <p className="text-xl text-gray-400 font-medium max-w-2xl pt-2">Explore rooms shaped through thoughtful planning, layered materials, practical storage, and confident styling.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGalleryImages.length > 0 ? (
              allGalleryImages.map((img: string, idx: number) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white/5 p-4 rounded-4xl border border-white/10 hover:border-white/30 transition-colors">
                  <div className="aspect-4/3 bg-white/10 rounded-2xl overflow-hidden relative mb-6">
                     <img src={img} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="flex flex-col items-center justify-center bg-[#C1FF72] text-[#0A0A0A] w-20 h-20 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                          <Camera className="w-6 h-6 mb-1" />
                          <span className="text-[9px] uppercase font-bold tracking-widest">View</span>
                       </span>
                     </div>
                  </div>
                  <div className="flex justify-between items-center px-4 pb-2">
                    <div>
                      <h4 className="text-lg font-bold text-white">Project Space</h4>
                      <p className="text-[#C1FF72] mt-1 text-[10px] font-bold tracking-widest uppercase">Interior Showcase</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#C1FF72] group-hover:text-[#0A0A0A] transition-all">
                      <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              INTERIOR_GALLERY_PREVIEW.map((item, idx) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white/5 p-4 rounded-4xl border border-white/10 transition-colors">
                  <div className="aspect-4/3 bg-white/10 rounded-2xl overflow-hidden relative mb-6">
                     <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  <div className="flex justify-between items-center px-4 pb-2">
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-[#C1FF72] mt-1 text-xs font-bold tracking-widest uppercase">{item.sub}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* REVIEWS SECTION */}
      <section className="py-24 lg:py-32 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-6 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] shadow-sm">
              <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Client Stories</span>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">Client Reviews</h2>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">And Feedback<span className="text-[#C1FF72]">.</span></h2>
            </div>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto pt-2">Hear directly from the clients who trusted us with their residences and workspaces.</p>
          </div>

          {displayReviews.length > 5 ? (
            <ReviewsSlider reviews={displayReviews} theme="template1" />
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {displayReviews.map((review: any, i: number) => (
                <div key={i} className="bg-[#FCFAF6] p-10 rounded-4xl border border-[#E5E5E5] flex flex-col h-full hover:shadow-xl hover:border-[#0A0A0A] transition-all duration-300">
                   <div className="flex gap-1 mb-8">
                     {[...Array(5)].map((_, j) => (
                       <Star key={j} className={`w-5 h-5 ${j < parseInt(review.rating) ? 'fill-[#C1FF72] text-[#0A0A0A]' : 'fill-[#FCFAF6] text-[#E5E5E5]'}`} />
                     ))}
                   </div>
                   <p className="text-[#0A0A0A] leading-relaxed mb-10 text-[16px] grow font-bold text-lg">&ldquo;{review.text}&rdquo;</p>
                   <div className="flex items-center gap-4 mt-auto border-t border-[#E5E5E5] pt-6">
                      <div className="w-10 h-10 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#0A0A0A] font-extrabold text-sm">
                        {review.author ? review.author.charAt(0) : 'U'}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#0A0A0A] uppercase tracking-wider">{review.author || 'Client'}</h4>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 lg:py-32 bg-[#FCFAF6] border-b border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-6 text-center flex flex-col items-center">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E5E5] shadow-sm">
               <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Common Queries</span>
             </div>
             <div className="flex flex-col items-center">
               <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">Frequently Asked</h2>
               <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">Questions<span className="text-[#C1FF72]">.</span></h2>
             </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
               <details key={idx} className="group border border-[#E5E5E5] rounded-4xl bg-white px-8 open:bg-white open:border-[#0A0A0A] hover:border-[#0A0A0A] transition-colors">
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
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 lg:py-36 bg-[#0A0A0A] text-white selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-16 items-center justify-between">
            <div className="flex-1">
              <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tighter mb-2">Your Design Journey</h2>
              <h2 className="text-5xl md:text-6xl font-extrabold text-[#C1FF72] leading-[1.05] tracking-tighter mb-8">Starts Here<span className="text-white">.</span></h2>
              <p className="text-xl text-gray-400 font-medium max-w-lg mb-12">Bring your space closer to the way you want to live. Chat with us on WhatsApp and let us shape a clear design path forward.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C1FF72]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold">Call Us Directly</h4>
                    <p className="text-lg font-bold text-white mt-1">{clinic.contact?.phone || 'Contact Number'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C1FF72]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold">Studio Location</h4>
                    <p className="text-lg font-bold text-white mt-1">{clinic.address?.full || 'Address'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-4xl p-10 lg:p-12 flex flex-col items-center text-center gap-6 min-w-[320px]">
              <div className="w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Chat With Us on WhatsApp</h3>
              <p className="text-gray-400 font-medium text-[15px] max-w-xs">Get instant answers, share your space photos, and schedule a free consultation — all on WhatsApp.</p>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1db954] text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-[15px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Start WhatsApp Chat
              </a>
              <p className="text-gray-600 text-xs">Usually replies within minutes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
