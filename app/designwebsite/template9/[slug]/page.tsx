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
import { Instrument_Serif } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template9/${slug}`;

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
    <div className="font-sans text-[#2D4A47] bg-[#F7FAF9] min-h-screen selection:bg-[#497A76] selection:text-white scroll-smooth">
      {/* HERO SECTION */}
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white border-b border-[#D0DCD6]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#497A76] tracking-[0.2em] uppercase bg-[#E1EDEB] px-3 py-1 rounded-full border border-[#D0DCD6]">
              COASTAL IDEALS
            </span>
            <div className="flex flex-col">
              <h2 className={`${instrumentSerif.className} text-4xl md:text-5xl lg:text-6xl font-bold`}>Designed Around</h2>
              <h2 className={`${instrumentSerif.className} text-4xl md:text-5xl lg:text-6xl font-normal text-[#609994] italic mt-1`}>Your Daily Life</h2>
            </div>
            <p className="text-lg text-[#556F6B] max-w-xl font-light">We combine spatial clarity, material textures, and scheduling peace to design rooms that feel fresh, airy, and practical.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Spatial Logic", desc: "No crowded passages. We study furniture depths, door swings, and window alignments to maximize airy circulation.", icon: Compass },
              { title: "Shore Palette", desc: "We favor whitewashed oak, sand tone bouclés, sea-salt linen, and light aggregates that reflect coastal sun.", icon: Layers },
              { title: "Composed Rest", desc: "Every height, angle, and cushion texture is selected to encourage relaxation, family comfort, and quiet utility.", icon: Smile },
              { title: "Contract Security", desc: "Clear spreadsheets and detailed drafts organized upfront so delivery costs align perfectly with quotes.", icon: Scale }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col p-6 bg-[#F7FAF9] border border-[#D0DCD6] rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white border border-[#D0DCD6] flex items-center justify-center mb-6 text-[#609994]">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className={`${instrumentSerif.className} text-2xl font-bold`}>{feature.title}</h3>
                <p className="text-[#556F6B] text-sm leading-relaxed mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#F7FAF9] border-b border-[#D0DCD6]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#497A76] tracking-[0.2em] uppercase bg-[#E1EDEB] px-3 py-1 rounded-full border border-[#D0DCD6]">
              SERVICES DIRECTORY
            </span>
            <div className="flex flex-col">
              <h2 className={`${instrumentSerif.className} text-4xl md:text-5xl lg:text-6xl font-bold`}>Serene Renovations</h2>
              <h2 className={`${instrumentSerif.className} text-4xl md:text-5xl lg:text-6xl font-normal text-[#609994] italic mt-1`}>& Design Services</h2>
            </div>
            <p className="text-lg text-[#556F6B] max-w-xl font-light">From room styling updates to complete custom built-in cabinetry and turnkey design contracts.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((svc: string, i: number) => {
              const svcData = getInteriorServiceData(svc);
              const serviceImage = svcData?.image || INTERIOR_HERO_IMAGES.services;
              return (
                <div key={i} className="bg-white p-8 rounded-2xl border border-[#D0DCD6] hover:border-[#497A76] transition-all flex flex-col justify-between min-h-[300px]">
                  <div className="mb-6 aspect-4/3 overflow-hidden rounded-2xl bg-[#F7FAF9] border border-[#D0DCD6]">
                    <img src={serviceImage} alt={`${svc} service image`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div>
                    <div className="mb-6 w-10 h-10 rounded-full bg-[#F7FAF9] flex items-center justify-center text-[#609994]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className={`${instrumentSerif.className} text-2xl font-bold`}>{svc}</h3>
                    <p className="text-[#556F6B] text-sm leading-relaxed mt-2 mb-6">
                      {svcData?.description || getInteriorServiceSummary(svc)}
                    </p>
                  </div>
                  {svcData?.benefits && (
                    <div className="border-t border-[#D0DCD6] pt-4">
                      <ul className="space-y-1">
                        {svcData.benefits.slice(0, 2).map((b, bi) => (
                          <li key={bi} className="text-xs text-[#497A76] flex items-center gap-2 font-bold">
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
      <section id="about" className="py-24 bg-white border-b border-[#D0DCD6]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={doctorImage} alt={doctor.name || "Lead designer"} className="w-full aspect-4/5 object-cover rounded-3xl bg-[#F7FAF9] border border-[#D0DCD6]" />
              <div className="absolute -bottom-6 -right-4 bg-white p-6 rounded-2xl shadow-lg border border-[#D0DCD6] flex items-center gap-6">
                <div>
                  <h3 className={`${instrumentSerif.className} text-xl font-bold`}>{doctor.name || 'Lead Designer'}</h3>
                  <p className="text-xs text-[#609994] uppercase tracking-wider mt-1 font-semibold">{doctor.specialization || 'Coastal Architect'}</p>
                </div>
                <div className="text-gray-400 text-sm border-l border-[#D0DCD6] pl-6 font-bold">{doctor.experience || '10+ Years'}</div>
              </div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-bold text-[#497A76] tracking-[0.2em] uppercase bg-[#E1EDEB] px-3 py-1 rounded-full border border-[#D0DCD6]">
                OUR IDENTITY
              </span>
              <h2 className={`${instrumentSerif.className} text-4xl lg:text-5xl font-bold`}>The Shore Studio</h2>
              <blockquote className="text-lg text-[#556F6B] leading-relaxed border-l-4 pl-4 border-[#609994] italic">
                &ldquo;{clinic.description || 'Our studio aligns material curators, builders, and decorators under a strict timeline so sites match original concept sketches.'}&rdquo;
              </blockquote>

              <div className="space-y-6 pt-4">
                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#F7FAF9] flex items-center justify-center text-[#497A76] border border-[#D0DCD6]"><Ruler className="w-4 h-4" /></div>
                  <div>
                    <h4 className={`${instrumentSerif.className} text-xl font-bold`}>Aesthetic Layouts</h4>
                    <p className="text-[#556F6B] text-sm mt-1 font-light font-sans">Proportional detailing of ceiling fixtures, cabinetry depths, and socket locations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#F7FAF9] flex items-center justify-center text-[#497A76] border border-[#D0DCD6]"><Palette className="w-4 h-4" /></div>
                  <div>
                    <h4 className={`${instrumentSerif.className} text-xl font-bold`}>Tactile Palette</h4>
                    <p className="text-[#556F6B] text-sm mt-1 font-light font-sans">White washed oak timbers, neutral sand bouclés, sea-salt linens, and light slates.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#F7FAF9] flex items-center justify-center text-[#497A76] border border-[#D0DCD6]"><Hammer className="w-4 h-4" /></div>
                  <div>
                    <h4 className={`${instrumentSerif.className} text-xl font-bold`}>Site Inspection</h4>
                    <p className="text-[#556F6B] text-sm mt-1 font-light font-sans">Walkthroughs and quality audits on site junctions and cabinet frames before handover.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-[#497A76] text-white selection:bg-[#E1EDEB] selection:text-[#2D4A47]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4">
            <span className="text-xs font-bold text-[#A5CFC9] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1">
              GALLERY ARCHIVES
            </span>
            <div className="flex flex-col">
              <h2 className={`${instrumentSerif.className} text-4xl md:text-5xl lg:text-6xl font-bold text-white`}>Realized Shore</h2>
              <h2 className={`${instrumentSerif.className} text-4xl md:text-5xl lg:text-6xl font-normal text-[#A5CFC9] italic mt-1`}>Interiors</h2>
            </div>
            <p className="text-lg text-slate-200 max-w-xl font-light">Unfiltered photography from actual residences and styling projects.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGalleryImages.length > 0 ? (
              allGalleryImages.map((img: string, idx: number) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white/5 p-4 rounded-3xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="aspect-4/3 bg-white/10 rounded-2xl overflow-hidden relative mb-4">
                    <img src={img} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="flex flex-col items-center justify-center bg-white text-[#2D4A47] w-14 h-14 rounded-full shadow-lg transform group-hover:scale-110 transition-all">
                        <Camera className="w-4 h-4 mb-1" />
                        <span className="text-[8px] uppercase tracking-wider font-bold">View</span>
                      </span>
                    </div>
                  </div>
                  <h4 className={`${instrumentSerif.className} text-2xl font-bold text-white px-2`}>Shoreline Apartment</h4>
                  <p className="text-xs text-[#A5CFC9] px-2 mt-1">Interior Layout</p>
                </div>
              ))
            ) : (
              INTERIOR_GALLERY_PREVIEW.map((item, idx) => (
                <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white/5 p-4 rounded-3xl border border-white/10 transition-all">
                  <div className="aspect-4/3 bg-white/10 rounded-2xl overflow-hidden relative mb-4">
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  <h4 className={`${instrumentSerif.className} text-2xl font-bold text-white px-2`}>{item.title}</h4>
                  <p className="text-xs text-[#A5CFC9] px-2 mt-1">{item.sub}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* REVIEWS SECTION */}
      <section className="py-24 bg-white border-b border-[#D0DCD6]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-16 space-y-4 text-center flex flex-col items-center">
            <span className="text-xs font-bold text-[#609994] tracking-[0.2em] uppercase bg-[#F7FAF9] px-3 py-1">
              TESTIMONIALS
            </span>
            <h2 className={`${instrumentSerif.className} text-4xl lg:text-5xl font-bold`}>What Homeowners Say</h2>
            <p className="text-lg text-[#556F6B] max-w-lg font-light font-sans">Read actual feedback from families who styled with our coastal layouts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {displayReviews.map((review: any, i: number) => (
              <div key={i} className="bg-[#F7FAF9] p-8 rounded-2xl border border-[#D0DCD6] flex flex-col h-full justify-between">
                <div>
                  <div className="flex gap-0.5 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < parseInt(review.rating) ? 'fill-[#609994] text-[#609994]' : 'fill-[#F7FAF9] text-[#D0DCD6]'}`} />
                    ))}
                  </div>
                  <p className="text-[#2D4A47] leading-relaxed text-sm italic font-sans font-light">&ldquo;{review.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 mt-6 border-t border-[#D0DCD6] pt-4 font-sans">
                  <div className="w-8 h-8 bg-white border border-[#D0DCD6] rounded-full flex items-center justify-center text-[#2D4A47] font-bold text-xs">
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
      <section className="py-24 bg-[#F7FAF9] border-b border-[#D0DCD6]">
        <div className="max-w-4xl mx-auto px-8 w-full">
          <div className="mb-16 text-center">
            <h2 className={`${instrumentSerif.className} text-4xl lg:text-5xl font-bold mt-4`}>Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group border border-[#D0DCD6] rounded-2xl bg-white px-6 py-2 open:bg-white transition-all font-sans">
                <summary className="flex items-center justify-between py-4 cursor-pointer list-none font-bold text-base text-[#2D4A47]">
                  <span>{faq.q}</span>
                  <span className="text-xs text-[#609994]">+</span>
                </summary>
                <p className="text-[#556F6B] leading-relaxed pb-4 text-sm font-light">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM & CTA */}
      <section className="py-24 bg-[#2D4A47] text-white">
        <div className="max-w-6xl mx-auto px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className={`${instrumentSerif.className} text-4xl md:text-5xl font-bold text-white mb-4`}>Fresh Shore Designs</h2>
            <p className="text-lg text-slate-300 mb-10 font-light font-sans">Book a scheduling call. We will review dimensions, budget ranges, and primary material options.</p>

            <div className="space-y-6 font-sans">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A5CFC9]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-400 uppercase tracking-wider font-bold">Call Us</h4>
                  <p className="text-base font-bold text-white mt-0.5">{clinic.contact?.phone || 'Contact Number'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A5CFC9]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-400 uppercase tracking-wider font-bold">Studio</h4>
                  <p className="text-base font-bold text-white mt-0.5">{clinic.address?.full || 'Address'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-[#2D4A47] rounded-3xl p-8 lg:p-10 border border-[#D0DCD6] font-sans">
            <h3 className={`${instrumentSerif.className} text-2xl font-bold mb-6`}>Request Consultation</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-2">Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-[#F7FAF9] border border-[#D0DCD6] rounded-xl px-4 py-2.5 text-[#2D4A47] placeholder-slate-400 focus:outline-none focus:border-[#497A76]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-2">Phone</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-[#F7FAF9] border border-[#D0DCD6] rounded-xl px-4 py-2.5 text-[#2D4A47] placeholder-slate-400 focus:outline-none focus:border-[#497A76]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-2">Message</label>
                <textarea rows={3} placeholder="Describe your room configurations..." className="w-full bg-[#F7FAF9] border border-[#D0DCD6] rounded-xl px-4 py-2.5 text-[#2D4A47] placeholder-slate-400 focus:outline-none focus:border-[#497A76] resize-none"></textarea>
              </div>
              <button type="button" className="w-full bg-[#497A76] hover:bg-[#3B6461] text-white font-bold py-3 uppercase tracking-wider text-xs transition-all rounded-full">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
