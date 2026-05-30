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
import { Lora } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template7/${slug}`;

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
  ].filter(Boolean).slice(0, 10);


  const waPhone = clinic.contact?.phone?.replace(/\D/g, '') || '919751396117';
  const waText = `Hi, I'm interested in booking a design consultation at ${clinic.name || 'your studio'}!`;
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="font-sans text-[#3D2C20] bg-[#FAF8F5] min-h-screen selection:bg-[#E3A857] selection:text-white scroll-smooth">
      {/* HERO SECTION */}
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white border-b border-[#D4C3B3]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#E3A857] tracking-[0.2em] uppercase bg-[#FAF8F5] px-3 py-1 rounded-none border border-[#D4C3B3]">
              DESIGN IDEALS
            </span>
            <div className="flex flex-col">
              <h2 className={`${lora.className} text-4xl md:text-5xl lg:text-6xl font-bold`}>Designed Around</h2>
              <h2 className={`${lora.className} text-4xl md:text-5xl lg:text-6xl font-normal text-[#E3A857] italic mt-1`}>Your Daily Life</h2>
            </div>
            <p className="text-lg text-[#5C4D3C] max-w-xl font-light">We combine organic elements, spatial purity, and calm structures to shape rooms that are beautiful and highly functional.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Spatial Logic", desc: "Circulation mapping, layout proportions, and structural symmetry are resolved before selecting color palettes.", icon: Compass },
              { title: "Natural Materials", desc: "We favor teakwood, walnut veneers, leather details, and organic linens that bring warmth and texture into your home.", icon: Layers },
              { title: "Comfort Zoning", desc: "Seating height, cabinet access, and lighting layers are scaled precisely for your height and everyday routines.", icon: Smile },
              { title: "Contract Security", desc: "We organize drawing details and material indices upfront, ensuring construction costs match expectations.", icon: Scale }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col p-6 bg-[#FAF8F5] border border-[#D4C3B3] rounded-none">
                <div className="w-12 h-12 rounded-none bg-white border border-[#D4C3B3] flex items-center justify-center mb-6 text-[#E3A857]">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className={`${lora.className} text-xl font-bold mb-3`}>{feature.title}</h3>
                <p className="text-[#5C4D3C] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#FAF8F5] border-b border-[#D4C3B3]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#3B483B] tracking-[0.2em] uppercase bg-[#E1E8E1] px-3 py-1 rounded-none border border-[#3B483B]">
              SERVICES INDEX
            </span>
            <div className="flex flex-col">
              <h2 className={`${lora.className} text-4xl md:text-5xl lg:text-6xl font-bold`}>Mid Century Styling</h2>
              <h2 className={`${lora.className} text-4xl md:text-5xl lg:text-6xl font-normal text-[#E3A857] italic mt-1`}>& Execution Capabilities</h2>
            </div>
            <p className="text-lg text-[#5C4D3C] max-w-xl font-light">From room renovations to complete turnkey solutions, our designers execute exactly as specified.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((svc: string, i: number) => {
              const svcData = getInteriorServiceData(svc);
              const serviceImage = svcData?.image || INTERIOR_HERO_IMAGES.services;
              return (
                <div key={i} className="bg-white p-8 rounded-none border border-[#D4C3B3] hover:border-[#E3A857] transition-all flex flex-col justify-between min-h-[300px]">
                  <div className="mb-6 aspect-4/3 overflow-hidden rounded-none bg-[#FAF8F5] border border-[#D4C3B3]">
                    <img src={serviceImage} alt={`${svc} service image`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div>
                    <div className="mb-6 w-10 h-10 rounded-none bg-[#FAF8F5] flex items-center justify-center text-[#E3A857]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className={`${lora.className} text-xl font-bold`}>{svc}</h3>
                    <p className="text-[#5C4D3C] text-sm leading-relaxed mt-3 mb-6">
                      {svcData?.description || getInteriorServiceSummary(svc)}
                    </p>
                  </div>
                  {svcData?.benefits && (
                    <div className="border-t border-[#D4C3B3] pt-4">
                      <ul className="space-y-1">
                        {svcData.benefits.slice(0, 2).map((b, bi) => (
                          <li key={bi} className="text-xs text-[#3B483B] flex items-center gap-2 font-bold">
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
      <section id="about" className="py-24 bg-white border-b border-[#D4C3B3]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={doctorImage} alt={doctor.name || "Lead designer"} className="w-full aspect-4/5 object-cover rounded-none bg-[#FAF8F5] border border-[#D4C3B3]" />
              <div className="absolute -bottom-6 -right-4 bg-white p-6 rounded-none shadow-lg border border-[#D4C3B3] flex items-center gap-6">
                <div>
                  <h3 className={`${lora.className} text-lg font-bold`}>{doctor.name || 'Lead Designer'}</h3>
                  <p className="text-xs text-[#E3A857] uppercase tracking-wider mt-1 font-semibold">{doctor.specialization || 'Retro Modernist Architect'}</p>
                </div>
                <div className="text-gray-400 text-sm border-l border-[#D4C3B3] pl-6 font-bold">{doctor.experience || '10+ Years'}</div>
              </div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-bold text-[#3B483B] tracking-[0.2em] uppercase bg-[#E1E8E1] px-3 py-1 rounded-none border border-[#3B483B]">
                OUR MISSION
              </span>
              <h2 className={`${lora.className} text-4xl lg:text-5xl font-bold`}>The Design Collective</h2>
              <blockquote className="text-lg text-[#5C4D3C] leading-relaxed border-l-4 pl-4 border-[#E3A857] italic">
                &ldquo;{clinic.description || 'Our studio aligns carpenters, layout draftsmen, and decorators under a strict timeline so sites match original concept sketches.'}&rdquo;
              </blockquote>

              <div className="space-y-6 pt-4">
                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-none bg-[#FAF8F5] flex items-center justify-center text-[#3B483B] border border-[#D4C3B3]"><Ruler className="w-4 h-4" /></div>
                  <div>
                    <h4 className={`${lora.className} text-lg font-bold`}>Scale Mapping</h4>
                    <p className="text-[#5C4D3C] text-sm mt-1 font-light">Proportional detailing of ceiling heights, passage clearances, and custom casework depths.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-none bg-[#FAF8F5] flex items-center justify-center text-[#3B483B] border border-[#D4C3B3]"><Palette className="w-4 h-4" /></div>
                  <div>
                    <h4 className={`${lora.className} text-lg font-bold`}>Organic Finishes</h4>
                    <p className="text-[#5C4D3C] text-sm mt-1 font-light">Walnut veneers, teak accents, matte slates, and tactile bouclé wools.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-none bg-[#FAF8F5] flex items-center justify-center text-[#3B483B] border border-[#D4C3B3]"><Hammer className="w-4 h-4" /></div>
                  <div>
                    <h4 className={`${lora.className} text-lg font-bold`}>Site Verification</h4>
                    <p className="text-[#5C4D3C] text-sm mt-1 font-light">Scheduled walkthroughs, quality audits on joints, and detail alignments before handover.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-[#3B483B] text-white selection:bg-[#E3A857] selection:text-white">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#E3A857] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1">
              DESIGN ARCHIVES
            </span>
            <div className="flex flex-col">
              <h2 className={`${lora.className} text-4xl md:text-5xl lg:text-6xl font-bold text-white`}>Realized Interiors</h2>
              <h2 className={`${lora.className} text-4xl md:text-5xl lg:text-6xl font-normal text-[#E3A857] italic mt-1`}>Of Timeless Character</h2>
            </div>
            <p className="text-lg text-slate-300 max-w-xl font-light">Unfiltered photography from actual apartments, kitchen units, and design workspaces.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGalleryImages.length > 0 ? (
              allGalleryImages.map((img: string, idx: number) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white/5 p-4 rounded-none border border-white/10 hover:border-white/20 transition-all">
                  <div className="aspect-4/3 bg-white/10 rounded-none overflow-hidden relative mb-4">
                    <img src={img} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="flex flex-col items-center justify-center bg-[#E3A857] text-white w-14 h-14 rounded-none shadow-lg transform group-hover:scale-110 transition-all">
                        <Camera className="w-4 h-4 mb-1" />
                        <span className="text-[8px] uppercase tracking-wider font-bold">View</span>
                      </span>
                    </div>
                  </div>
                  <h4 className={`${lora.className} text-lg font-bold text-white px-2`}>Residential Suite</h4>
                  <p className="text-xs text-[#E3A857] px-2 mt-1">Interior Layout</p>
                </div>
              ))
            ) : (
              INTERIOR_GALLERY_PREVIEW.map((item, idx) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white/5 p-4 rounded-none border border-white/10 transition-all">
                  <div className="aspect-4/3 bg-white/10 rounded-none overflow-hidden relative mb-4">
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  <h4 className={`${lora.className} text-lg font-bold text-white px-2`}>{item.title}</h4>
                  <p className="text-xs text-[#E3A857] px-2 mt-1">{item.sub}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* REVIEWS SECTION */}
      <section className="py-24 bg-white border-b border-[#D4C3B3]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4 text-center flex flex-col items-center">
            <span className="text-xs font-bold text-[#E3A857] tracking-[0.2em] uppercase bg-[#FAF8F5] px-3 py-1">
              TESTIMONIALS
            </span>
            <h2 className={`${lora.className} text-4xl lg:text-5xl font-bold`}>What Homeowners Say</h2>
            <p className="text-lg text-[#5C4D3C] max-w-lg font-light">Read actual feedback from homeowners who trusted us with their residences.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {displayReviews.map((review: any, i: number) => (
              <div key={i} className="bg-[#FAF8F5] p-8 rounded-none border border-[#D4C3B3] flex flex-col h-full justify-between">
                <div>
                  <div className="flex gap-0.5 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < parseInt(review.rating) ? 'fill-[#E3A857] text-[#E3A857]' : 'fill-[#FAF8F5] text-[#D4C3B3]'}`} />
                    ))}
                  </div>
                  <p className="text-[#3D2C20] leading-relaxed text-sm italic">&ldquo;{review.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 mt-6 border-t border-[#D4C3B3] pt-4">
                  <div className="w-8 h-8 bg-white border border-[#D4C3B3] rounded-none flex items-center justify-center text-[#3D2C20] font-bold text-xs">
                    {review.author ? review.author.charAt(0) : 'U'}
                  </div>
                  <span className="font-bold text-xs uppercase tracking-wider">{review.author || 'Client'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-[#FAF8F5] border-b border-[#D4C3B3]">
        <div className="max-w-4xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4 text-center">
            <h2 className={`${lora.className} text-4xl lg:text-5xl font-bold`}>Common Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group border border-[#D4C3B3] rounded-none bg-white px-6 py-2 open:bg-white transition-all">
                <summary className="flex items-center justify-between py-4 cursor-pointer list-none font-bold text-base">
                  <span>{faq.q}</span>
                  <span className="text-xs text-[#E3A857]">+</span>
                </summary>
                <p className="text-[#5C4D3C] leading-relaxed pb-4 text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM & CTA */}
      <section className="py-24 bg-[#3D2C20] text-white">
        <div className="max-w-6xl mx-auto px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className={`${lora.className} text-4xl md:text-5xl font-bold text-white mb-4`}>Bring Design to Life</h2>
            <p className="text-lg text-slate-300 mb-10 font-light">Book an initial scheduling call. We will review dimensions, budget ranges, and primary material options.</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#E3A857]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-400 uppercase tracking-wider font-bold">Call Us</h4>
                  <p className="text-base font-bold text-white mt-0.5">{clinic.contact?.phone || 'Contact Number'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#E3A857]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-400 uppercase tracking-wider font-bold">Studio</h4>
                  <p className="text-base font-bold text-white mt-0.5">{clinic.address?.full || 'Address'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-[#3D2C20] rounded-none p-8 lg:p-10 border border-[#D4C3B3]">
            <h3 className={`${lora.className} text-xl font-bold mb-6`}>Request Consultation</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-2">Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-[#FAF8F5] border border-[#D4C3B3] px-4 py-2.5 text-[#3D2C20] placeholder-slate-400 focus:outline-none focus:border-[#E3A857]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-2">Phone</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-[#FAF8F5] border border-[#D4C3B3] px-4 py-2.5 text-[#3D2C20] placeholder-slate-400 focus:outline-none focus:border-[#E3A857]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-2">Message</label>
                <textarea rows={3} placeholder="Describe your room configurations..." className="w-full bg-[#FAF8F5] border border-[#D4C3B3] px-4 py-2.5 text-[#3D2C20] placeholder-slate-400 focus:outline-none focus:border-[#E3A857] resize-none"></textarea>
              </div>
              <button type="button" className="w-full bg-[#3B483B] hover:bg-[#2C372C] text-white font-bold py-3 uppercase tracking-wider text-xs transition-all">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
