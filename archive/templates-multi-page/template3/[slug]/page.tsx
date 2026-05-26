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
    ? business.services.slice(0, 6)
    : DEFAULT_INTERIOR_SERVICES;

  return (
    <div className="text-slate-900 bg-white min-h-screen selection:bg-[#0084FF] selection:text-white">
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* WHY CHOOSE US */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-5">
            <h3 className="text-sm font-semibold text-gray-500 tracking-[0.15em] uppercase">Why Choose Us</h3>
            <div className={`${fustat.className} flex flex-col`}>
              <h4 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-400 leading-none tracking-tighter">Designed Around</h4>
              <h4 className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Your Life</h4>
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
                <h5 className="text-xl font-medium text-[#0084FF] mb-3">{feature.title}</h5>
                <p className="text-gray-500 leading-relaxed font-normal text-[15px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 lg:py-32 bg-[#F4FAFF]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div className="space-y-5 flex-1">
              <h3 className="text-sm font-semibold text-gray-500 tracking-[0.15em] uppercase">Comprehensive Services</h3>
              <div className={`${fustat.className} flex flex-col`}>
                <h4 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-400 leading-none tracking-tighter">Explore Our</h4>
                <h4 className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Services</h4>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl pt-2">Whether it is a full-home plan, modular kitchen, living room refresh, or custom storage, we shape every detail with care.</p>
            </div>
            <Link href={`${basePath}/services`} className="inline-flex items-center gap-2 pb-1 border-b border-[#0084FF] text-[#0084FF] font-medium hover:text-gray-600 hover:border-gray-600 transition-colors uppercase tracking-wider text-sm whitespace-nowrap">
              View All Services
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((svc: string, i: number) => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col group min-h-80">
                <div className="mb-8">
                   <Activity className="w-8 h-8 text-gray-400 group-hover:text-[#0084FF] transition-colors" />
                </div>
                <h5 className="text-2xl font-normal text-[#0084FF] mb-4 tracking-tight">{svc}</h5>
                <p className="text-gray-500 leading-relaxed mb-8 grow text-[15px]">
                  {getInteriorServiceSummary(svc)}
                </p>
                <Link href={`${basePath}/services`} className="flex items-center justify-between mt-auto border-t border-gray-100 pt-6">
                  <span className="text-sm font-medium uppercase tracking-[0.15em] text-[#0084FF] group-hover:text-gray-500 transition-colors">Read Details</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-[#0084FF] group-hover:text-white transition-all transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 lg:py-32 bg-[#F4FAFF] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div className="space-y-5 flex-1">
              <h3 className="text-sm font-semibold text-slate-500 tracking-[0.15em] uppercase">Design Portfolio</h3>
              <div className={`${fustat.className} flex flex-col`}>
                <h4 className="text-5xl md:text-6xl lg:text-7xl font-normal text-slate-400 leading-none tracking-tighter">Spaces With</h4>
                <h4 className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Character</h4>
              </div>
              <p className="text-xl text-slate-600 max-w-2xl pt-2">Explore rooms shaped through thoughtful planning, layered materials, practical storage, and confident styling.</p>
            </div>
            <Link href={`${basePath}/gallery`} className="inline-flex items-center gap-2 pb-1 border-b border-[#0084FF] text-[#0084FF] font-medium hover:text-slate-700 hover:border-slate-700 transition-colors uppercase tracking-wider text-sm whitespace-nowrap">
              View Full Gallery
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {INTERIOR_GALLERY_PREVIEW.map((item, idx) => (
              <div key={idx} className="group cursor-pointer flex flex-col h-full">
                <div className="aspect-4/3 bg-[#006fd8] rounded-3xl overflow-hidden relative mb-6">
                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>
                   <div className="absolute inset-0 flex items-center justify-center opacity-75 group-hover:opacity-100 transition-opacity">
                     <span className="flex flex-col items-center gap-3 text-white">
                        <Camera className="w-8 h-8" />
                        <span className="text-xs uppercase tracking-[0.15em] font-semibold">Spaces With</span>
                     </span>
                   </div>
                </div>
                <div className="flex justify-between items-center px-2">
                  <div>
                    <h5 className="text-xl font-normal text-slate-900">{item.title}</h5>
                    <p className="text-slate-500 mt-1 uppercase text-xs tracking-widest font-semibold">{item.sub}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 group-hover:bg-[#0084FF] group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALISTS */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 w-full">
           <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
             <div className="order-2 lg:order-1 relative">
                <img src={doctorImage} alt={doctor.name || "Lead designer"} className="w-full aspect-4/5 object-cover rounded-3xl bg-gray-100" />
                <div className="absolute -bottom-8 -right-4 md:right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-6">
                   <div>
                     <h4 className="text-xl font-medium text-[#0084FF]">{doctor.name || 'Lead Designer'}</h4>
                     <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-semibold">{doctor.specialization || 'Interior Design & Turnkey Execution'}</p>
                   </div>
                   <div className="text-gray-400 font-medium text-sm border-l border-gray-200 pl-6">{doctor.experience || '10+ Years'}</div>
                </div>
             </div>
             
             <div className="order-1 lg:order-2 space-y-12">
               <div className="space-y-5">
                 <h3 className="text-sm font-semibold text-gray-500 tracking-[0.15em] uppercase">Our Design Studio</h3>
                 <div className={`${fustat.className} flex flex-col`}>
                   <h4 className="text-5xl lg:text-7xl font-normal text-gray-400 leading-none tracking-tighter">A Studio of</h4>
                   <h4 className="text-5xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Designers</h4>
                 </div>
                 <blockquote className="text-xl text-gray-600 leading-relaxed pt-6 border-l-2 pl-6 border-gray-200 italic">
                   &ldquo;Our studio is shaped by designers, material specialists, and execution partners who make every space feel considered from layout to final styling.&rdquo;
                 </blockquote>
               </div>

               <div className="space-y-8">
                 <div className="flex gap-5 group">
                   <div className="mt-1"><Ruler className="w-6 h-6 text-gray-400 group-hover:text-[#0084FF] transition-colors" /></div>
                   <div>
                     <h5 className="text-lg font-medium text-[#0084FF]">Space Planners</h5>
                     <p className="text-gray-500 mt-2 text-[15px] leading-relaxed">Experts in circulation, room zoning, furniture placement, and storage strategies for compact and spacious homes.</p>
                   </div>
                 </div>
                 <div className="flex gap-5 group">
                   <div className="mt-1"><Palette className="w-6 h-6 text-gray-400 group-hover:text-[#0084FF] transition-colors" /></div>
                   <div>
                     <h5 className="text-lg font-medium text-[#0084FF]">Material & Lighting Leads</h5>
                     <p className="text-gray-500 mt-2 text-[15px] leading-relaxed">Specialists in finishes, lighting layers, textures, and color palettes that make every surface feel intentional.</p>
                   </div>
                 </div>
                 <div className="flex gap-5 group">
                   <div className="mt-1"><Hammer className="w-6 h-6 text-gray-400 group-hover:text-[#0084FF] transition-colors" /></div>
                   <div>
                     <h5 className="text-lg font-medium text-[#0084FF]">Execution Coordinators</h5>
                     <p className="text-gray-500 mt-2 text-[15px] leading-relaxed">Site-focused team members who align vendors, drawings, timelines, and quality checks from start to handover.</p>
                   </div>
                 </div>
               </div>
               
               <div className="pt-4">
                  <Link href={`${basePath}/about-us`} className="inline-flex px-8 py-3.5 rounded-full bg-gray-200 text-gray-900 hover:bg-gray-300 transition-colors font-medium">
                    Learn More About Us
                  </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 lg:py-32 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-5 text-center">
            <h3 className="text-sm font-semibold text-gray-500 tracking-[0.15em] uppercase">Client Stories</h3>
            <div className="flex flex-col items-center">
              <h4 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-400 leading-none tracking-tighter">Over 500+</h4>
              <h4 className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Happy Clients</h4>
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
                        <h6 className="font-semibold text-sm text-[#0084FF] uppercase tracking-wider">{review.author || 'Client'}</h6>
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
          <div className="mb-20 space-y-5 text-center">
             <h3 className="text-sm font-semibold text-gray-500 tracking-[0.15em] uppercase">Common Queries</h3>
             <div className="flex flex-col items-center">
               <h4 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-400 leading-none tracking-tighter">Frequently Asked</h4>
               <h4 className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#0084FF] leading-none tracking-tighter -mt-1.5">Questions</h4>
             </div>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => (
               <details key={idx} className="group border-b border-gray-200 open:pb-6">
                 <summary className="flex items-center justify-between py-8 cursor-pointer list-none font-medium text-xl text-[#0084FF]">
                   <span className="pr-8">{faq.q}</span>
                   <span className="flex shrink-0 w-8 h-8 items-center justify-center rounded-full bg-gray-50 group-open:bg-[#0084FF] group-open:text-white transition-colors border border-gray-200 group-open:border-[#0084FF]">
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
          
          <div className="mt-16 bg-gray-50 rounded-3xl p-10 text-center border border-gray-100 flex flex-col items-center">
             <h5 className="font-medium text-2xl text-[#0084FF] mb-3">Have a different question?</h5>
             <p className="text-gray-500 mb-8 max-w-lg mx-auto">Our design team is ready to help you clarify your next step.</p>
             <a href={`tel:${clinic.contact?.phone || ''}`} className="inline-flex px-8 py-3.5 rounded-full bg-[#0084FF] text-white hover:bg-[#1a2229] transition-colors font-medium text-sm tracking-wide">
                Call Us Directly
             </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center w-full rounded-[32px] bg-[rgba(0,132,255,0.82)] backdrop-blur-md border border-white/40 [box-shadow:inset_0px_4px_4px_0px_rgba(255,255,255,0.28)] py-16 md:py-20 text-white">
            <h3 className={`${fustat.className} text-5xl md:text-6xl lg:text-7xl font-normal text-blue-100 leading-none tracking-tighter mb-4`}>Your Design Journey</h3>
            <h3 className={`${fustat.className} text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-none tracking-tighter mb-8 -mt-1.5`}>Starts Here</h3>
            <p className="text-xl text-blue-50/90 max-w-2xl mx-auto mb-12">Bring your space closer to the way you want to live. Book a consultation and let us shape a clear design path forward.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <a href={`tel:${clinic.contact?.phone || ''}`} className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#0084FF] font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm tracking-wide">
                 <Phone className="w-4 h-4" /> Call {clinic.contact?.phone || 'Now'}
               </a>
               <Link href={`${basePath}/contact-us`} className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-gray-600 text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm tracking-wide">
                 Send Enquiry <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
