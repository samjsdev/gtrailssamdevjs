import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  Star, ArrowRight, Quote, Plus, Minus, Phone, MapPin, Sparkles, HelpCircle 
} from 'lucide-react';
import Link from 'next/link';
import ClientHero from './ClientHero';
import WhyChooseUs from './WhyChooseUs';
import HomeServices from './HomeServices';
import HomeAbout from './HomeAbout';
import ReviewsSlider from '@/components/ReviewsSlider';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import {
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_FAQS,
  INTERIOR_GALLERY_PREVIEW,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceSummary,
  getInteriorServiceData,
  getServiceImage,
} from '@/lib/interiorContent';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template1/${slug}`;

  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { clinic, doctor, business, media } = data;
  
  // Apply copy cleaner to raw clinic variables
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  
  const cleanedClinic = {
    ...clinic,
    name: cleanName,
    description: cleanDesc
  };

  const heroImage = media.clinicImages?.[0] || INTERIOR_HERO_IMAGES.home;
  const doctorImage = media.otherImages?.[0] || INTERIOR_HERO_IMAGES.designer;

  const displayReviews = data.reviews && data.reviews.length > 0 ? data.reviews : DEFAULT_INTERIOR_REVIEWS;
  const faqs = INTERIOR_FAQS;

  const servicesList = business.services?.length
    ? business.services
    : DEFAULT_INTERIOR_SERVICES;

  const allGalleryImages = [
    ...(media.treatmentImages || []),
    ...(media.otherImages || []),
    ...(media.clinicImages || [])
  ].filter(Boolean);

  const previewServices = servicesList.slice(0, 3).map((svc: string, idx: number) => {
    const svcData = getInteriorServiceData(svc);
    const num = `0${idx + 1}`;
    const img = getServiceImage(svc, media) || svcData?.image || "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800";
    const desc = svcData?.description || getInteriorServiceSummary(svc);
    const highlights = svcData?.benefits?.slice(0, 3) || [
      "Tactile custom finishes",
      "Ergonomic space mapping",
      "Line-item budget logging"
    ];

    return { num, title: svc, desc, img, highlights };
  });
  
  const previewGallery = allGalleryImages.slice(0, 3);

  const waPhone = clinic.contact?.phone?.replace(/\D/g, '') || '919751396117';
  const waText = `Hi, I'm interested in booking a design consultation at ${cleanName || 'your studio'}!`;
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="font-sans text-[#0A0A0A] bg-[#FCFAF6] min-h-screen selection:bg-[#C1FF72] selection:text-[#0A0A0A] scroll-smooth">
      {/* HERO SECTION */}
      <ClientHero clinic={cleanedClinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* WHY CHOOSE US */}
      <WhyChooseUs basePath={basePath} data={data} />

      {/* SERVICES SECTION */}
      <HomeServices
        basePath={basePath}
        services={previewServices}
      />

      {/* ABOUT US SECTION */}
      <HomeAbout
        basePath={basePath}
        clinic={cleanedClinic}
        doctor={doctor}
        doctorImage={doctorImage}
        homeAbout={data.homeAbout}
      />

      {/* PORTFOLIO GALLERY SECTION */}
      <section id="gallery" className="py-28 lg:py-36 bg-[#FCFAF6] overflow-hidden relative border-t border-[#0A0A0A]/5">
        {/* Subtle grid line */}
        <div className="absolute left-[8%] top-0 w-px h-full bg-[#0A0A0A]/5 pointer-events-none"></div>
        
        <div className="max-w-[90rem] mx-auto px-8 w-full relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
            <div className="space-y-6 max-w-2xl text-left">
              <div className="inline-flex items-center gap-3">
                <div className="w-8 h-px bg-[#0A0A0A]"></div>
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#0A0A0A]/70">Portfolio Preview</span>
              </div>
              <h2 className="font-serif text-5xl lg:text-7xl font-light tracking-tight leading-[1.05] text-[#0A0A0A]">
                Spaces with <br />
                <span className="italic font-normal text-[#0A0A0A]/60">Character</span> <span className="text-[#C1FF72]">.</span>
              </h2>
            </div>
            
            <Link
              href={`${basePath}/gallery`}
              className="group inline-flex items-center gap-4 text-[#0A0A0A] font-bold tracking-[0.15em] uppercase text-[11px] hover:text-[#0A0A0A]/70 transition-colors shrink-0"
            >
              <span className="border-b border-[#0A0A0A]/20 hover:border-[#0A0A0A] pb-1 transition-colors">View Complete Archive</span>
              <span className="w-9 h-9 rounded-full border border-[#0A0A0A] group-hover:bg-[#C1FF72] group-hover:border-[#C1FF72] flex items-center justify-center transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0A] -rotate-45" />
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-8 h-auto md:h-[65vh]">
            {previewGallery.length > 0 ? (
              previewGallery.map((img: string, idx: number) => {
                const widths = ['w-full md:w-[35%]', 'w-full md:w-[45%]', 'w-full md:w-[20%]'];
                const projectNames = ['Residential Living', 'Culinary Kitchen Space', 'Bedroom Sanctuary'];
                const projectSub = ['Bespoke Craft', 'Modular Layout', 'Biophilic Details'];
                
                return (
                  <div key={idx} className={`group cursor-pointer relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] ${widths[idx % 3]} h-64 sm:h-80 md:h-full border border-[#0A0A0A]/5 shadow-sm`}>
                    <img 
                      src={img} 
                      alt={`Portfolio ${idx + 1}`} 
                      className="w-full h-full object-cover grayscale-[30%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1200ms]" 
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-[#0A0A0A]/35 group-hover:bg-[#0A0A0A]/10 transition-colors duration-700"></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
                      <p className="text-[#C1FF72] text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
                        {projectSub[idx % 3]}
                      </p>
                      <h4 className="text-white text-2xl font-serif font-normal tracking-wide">
                        {projectNames[idx % 3]}
                      </h4>
                    </div>
                  </div>
                )
              })
            ) : (
              INTERIOR_GALLERY_PREVIEW.map((item, idx) => (
                <div key={idx} className="group cursor-pointer relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] w-full md:w-1/3 h-64 sm:h-80 md:h-full bg-white border border-[#0A0A0A]/5 shadow-sm p-8 md:p-10 flex flex-col justify-end text-left">
                  <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-[#0A0A0A]/10 flex items-center justify-center text-[#0A0A0A]/40 group-hover:bg-[#C1FF72] group-hover:text-[#0A0A0A] transition-all duration-300">
                    <ArrowRight className="w-4 h-4 -rotate-45" />
                  </div>
                  <div>
                    <p className="text-[#0A0A0A]/60 text-[11px] font-bold tracking-[0.25em] uppercase mb-2">{item.sub}</p>
                    <h4 className="text-[#0A0A0A] text-xl font-serif font-normal tracking-wide">{item.title}</h4>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-28 lg:py-36 bg-[#0A0A0A] text-white relative overflow-hidden">
        {/* Subtle glowing sphere background */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#C1FF72]/5 blur-[120px] pointer-events-none z-0"></div>
        
        <div className="max-w-[90rem] mx-auto px-8 w-full relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 mb-24">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-px bg-[#C1FF72]/30"></div>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C1FF72]">Client Stories</span>
              <div className="w-8 h-px bg-[#C1FF72]/30"></div>
            </div>
            <h2 className="font-serif text-5xl lg:text-7xl font-light tracking-tight leading-[1.05]">
              Living in our <br />
              <span className="italic font-normal text-[#FCFAF6]/60">Designs</span>.
            </h2>
          </div>

          {displayReviews.length > 5 ? (
            <div className="invert grayscale">
              <ReviewsSlider reviews={displayReviews} theme="template1" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {displayReviews.map((review: any, i: number) => (
                <div key={i} className="flex flex-col p-10 rounded-[2.5rem] border border-white/10 hover:border-[#C1FF72]/20 transition-all duration-500 bg-white/[0.02] shadow-xl hover:translate-y-[-4px] group">
                  <div className="text-[#C1FF72] mb-10">
                    <Quote className="w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-white/80 font-serif text-base md:text-lg leading-relaxed font-normal mb-10 grow italic">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center font-bold text-xs text-[#C1FF72] border border-white/10 group-hover:bg-[#C1FF72] group-hover:text-[#0A0A0A] transition-colors duration-300">
                      {review.author ? review.author.charAt(0) : 'U'}
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-[0.2em] text-[11px] mb-1">{review.author || 'Client'}</h4>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3.5 h-3.5 ${j < parseInt(review.rating) ? 'fill-[#C1FF72] text-[#C1FF72]' : 'fill-[#FCFAF6]/10 text-transparent'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-28 lg:py-36 bg-[#FCFAF6] border-b border-[#0A0A0A]/5 relative overflow-hidden">
        <div className="absolute right-[5%] top-0 w-px h-full bg-[#0A0A0A]/5 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-8 w-full relative z-10">
          <div className="mb-24 space-y-6 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-bold text-[#0A0A0A]/70 tracking-[0.25em] uppercase">Common Queries</span>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-[#0A0A0A] leading-[1.05] tracking-tight">Frequently Asked</h2>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-[#0A0A0A] leading-[1.05] tracking-tight mt-1">Questions<span className="text-[#C1FF72]">.</span></h2>
            </div>
          </div>

          <div className="space-y-6 text-left">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group border border-[#0A0A0A]/5 rounded-[2rem] bg-white px-8 open:bg-white open:border-[#0A0A0A]/10 hover:border-[#0A0A0A]/10 transition-all duration-300 shadow-sm">
                <summary className="flex items-center justify-between py-6 cursor-pointer list-none font-serif font-normal text-lg md:text-xl text-[#0A0A0A] focus:outline-none">
                  <span className="pr-8">{faq.q}</span>
                  <span className="flex shrink-0 w-8 h-8 items-center justify-center rounded-full bg-[#FCFAF6] group-open:bg-[#C1FF72] group-open:text-[#0A0A0A] transition-colors border border-[#0A0A0A]/5">
                    <Plus className="w-3.5 h-3.5 group-open:hidden text-[#0A0A0A]/60" />
                    <Minus className="w-3.5 h-3.5 hidden group-open:block text-[#0A0A0A]" />
                  </span>
                </summary>
                <p className="text-[#0A0A0A]/70 font-normal leading-relaxed pb-8 text-[15px] border-t border-[#0A0A0A]/5 pt-4 mt-1">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-28 lg:py-36 bg-[#0A0A0A] text-white selection:bg-[#C1FF72] selection:text-[#0A0A0A] relative overflow-hidden">
        <div className="absolute right-[-10%] bottom-[-10%] w-[55vw] h-[55vw] rounded-full border border-white/[0.03] pointer-events-none"></div>

        <div className="max-w-[90rem] mx-auto px-8 w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center justify-between">
            <div className="flex-1 text-left space-y-8">
              <div className="space-y-4">
                <h2 className="font-serif text-5xl md:text-6xl font-light text-white leading-[1.05] tracking-tight">Your Design Journey</h2>
                <h2 className="font-serif text-5xl md:text-6xl font-light text-[#C1FF72] leading-[1.05] tracking-tight">Starts Here<span className="text-white">.</span></h2>
              </div>
              <p className="text-sm md:text-base text-white/60 font-normal max-w-lg leading-relaxed">
                Bring your space closer to the way you want to live. Connect with us to shape a clear design path forward.
              </p>
              <div className="space-y-6 pt-6 border-t border-white/5 max-w-md">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C1FF72]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] text-[#FCFAF6]/60 uppercase tracking-[0.2em] font-bold">Call Us Directly</h4>
                    <p className="text-base font-bold text-white mt-1 hover:text-[#C1FF72] transition-colors">
                      <a href={`tel:${clinic.contact?.phone || ''}`}>{clinic.contact?.phone || 'Contact Number'}</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C1FF72]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] text-[#FCFAF6]/60 uppercase tracking-[0.2em] font-bold">Studio Location</h4>
                    <p className="text-sm font-semibold text-white mt-1 leading-relaxed">{clinic.address?.full || 'Address'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium WhatsApp Engagement Box */}
            <div className="bg-[#FCFAF6]/5 border border-white/10 rounded-[2.5rem] p-10 lg:p-12 flex flex-col items-center text-center gap-6 min-w-[320px] max-w-md shadow-2xl relative z-10 backdrop-blur-sm group">
              <div className="w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl relative group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25"></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10 relative z-10">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl md:text-2xl font-normal text-white tracking-wide">Chat On WhatsApp</h3>
                <p className="text-white/60 font-normal text-[13px] max-w-xs">
                  Get instant answers, share project references, and book your consultation in minutes.
                </p>
              </div>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1db954] text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-[11px] tracking-widest uppercase shadow-lg"
              >
                Start Conversation
              </a>
              <p className="text-[#FCFAF6]/40 text-[11px] font-bold uppercase tracking-widest">Usually replies in minutes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

