import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { INTERIOR_FAQS } from '@/lib/interiorContent';
import Reveal from '../Reveal';
import LeadForm from '../LeadForm';

type PageProps = { params: Promise<{ slug: string }> };

export default async function Template1Contact({ params }: PageProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { clinic } = data;
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const address = clinic.address?.full || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Hi, I'm interested in booking a design consultation at ${cleanName || 'your studio'}!`
  )}`;

  const mapUrl =
    clinic.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent((cleanName || '') + ' ' + address)}&output=embed`;

  return (
    <div>
      {/* PAGE HERO */}
      <section id="contact-hero" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-5 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              Begin your home
            </span>
            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(38px,5vw,68px)] leading-[1.08] max-w-[760px]">
              Book a free design <em className="not-italic italic font-light text-[#c9ab7c]">consultation</em>
            </h1>
            <p className="mt-6 max-w-[560px] text-[16.5px] font-light leading-[1.75] text-white/75">
              A 45-minute session with our design team — space plan, style direction and a ballpark estimate for your home. Free, with zero obligation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT + FORM */}
      <section id="contact-details" className="py-[clamp(70px,8vw,110px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-[clamp(44px,6vw,90px)] items-start">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Reach the studio
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(28px,3.4vw,46px)] leading-[1.12] mb-9">
              Visit, call or write — <em className="not-italic italic font-light text-[#a58150]">we respond within a day</em>
            </h2>

            <div className="grid gap-0">
              <div className="flex gap-5 py-6 border-t border-b border-[#211a13]/10 items-start">
                <span className="w-11 h-11 shrink-0 border border-[#a58150] grid place-items-center">
                  <MapPin className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                </span>
                <div>
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[18px] block mb-1.5">The Studio</b>
                  <span className="text-[14.5px] text-[#7d7264] font-light leading-[1.7]">{address || `${city}, Tamil Nadu`}</span>
                </div>
              </div>

              {phone && (
                <div className="flex gap-5 py-6 border-b border-[#211a13]/10 items-start">
                  <span className="w-11 h-11 shrink-0 border border-[#a58150] grid place-items-center">
                    <Phone className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <b className="font-[family-name:var(--font-marcellus)] font-normal text-[18px] block mb-1.5">Call Us</b>
                    <a href={`tel:${phone}`} className="text-[14.5px] text-[#211a13] font-medium hover:text-[#a58150] transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex gap-5 py-6 border-b border-[#211a13]/10 items-start">
                <span className="w-11 h-11 shrink-0 border border-[#a58150] grid place-items-center">
                  <Clock className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                </span>
                <div>
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[18px] block mb-1.5">Studio Hours</b>
                  <span className="text-[14.5px] text-[#7d7264] font-light">Mon – Sat, 10 AM – 7 PM</span>
                </div>
              </div>

              <div className="flex gap-5 py-6 border-b border-[#211a13]/10 items-start">
                <span className="w-11 h-11 shrink-0 border border-[#a58150] grid place-items-center">
                  <MessageCircle className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                </span>
                <div>
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[18px] block mb-1.5">WhatsApp</b>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14.5px] text-[#211a13] font-medium hover:text-[#a58150] transition-colors"
                  >
                    Message us — usually replies in minutes
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="lg:sticky lg:top-28 border border-[#211a13]/10">
              <LeadForm studioName={cleanName || 'the studio'} waPhone={waPhone} phoneDisplay={phone} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MAP */}
      <section id="map" className="px-6 lg:px-7 pb-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="border border-[#211a13]/10 overflow-hidden">
              <iframe
                src={mapUrl}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Location of ${cleanName || 'our studio'}`}
                className="w-full block grayscale-[35%] contrast-[1.05]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#fdfbf6] border-t border-[#211a13]/10 px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4">
              Good questions
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.8vw,50px)] leading-[1.12]">
              Before you <em className="not-italic italic font-light text-[#a58150]">ask</em>
            </h2>
          </Reveal>

          <Reveal>
            {INTERIOR_FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group border-b border-[#211a13]/10 py-5 first:border-t"
                open={idx === 0}
              >
                <summary className="cursor-pointer list-none flex justify-between items-center gap-4 font-[family-name:var(--font-marcellus)] text-[19px] text-[#211a13] [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="text-[24px] text-[#a58150] font-light transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="text-[#7d7264] text-[14.5px] font-light leading-[1.75] pt-3.5">{faq.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
