import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { INTERIOR_FAQS } from '@/lib/interiorContent';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import LeadForm from '../LeadForm';
import FAQAccordion, { FAQItem } from '../FAQAccordion';

type PageProps = { params: Promise<{ slug: string }> };

const CONSULTATION_STEPS = [
  {
    step: '01',
    title: 'Discovery Call',
    time: 'Within 2 Hours',
    desc: 'Our design coordinator calls to understand your property type, possession date, and design aspirations.',
  },
  {
    step: '02',
    title: 'Studio / Site Meeting',
    time: '45 Minutes',
    desc: 'Sit with a senior interior architect. Review material swatches, explore moodboards, and audit your floor plan.',
  },
  {
    step: '03',
    title: '3D Concept & BOQ',
    time: '3 – 5 Days',
    desc: 'Receive photorealistic room visuals and an itemised quote with frozen line-item pricing.',
  },
  {
    step: '04',
    title: 'Precision Build',
    time: '45-Day Handover',
    desc: 'Factory manufacturing and site installation with weekly milestone photo updates to handover.',
  },
];

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

  const contactFaqs: FAQItem[] = INTERIOR_FAQS.slice(0, 6).map((faq) => ({
    q: faq.q,
    a: faq.a,
    tag: 'FAQ',
  }));

  const neighborhoods = [
    `Central ${city}`,
    `South ${city}`,
    `North ${city}`,
    `IT & Coastal Corridor`,
    `Premium Gated Enclaves`,
    `Independent Villa Layouts`,
  ];

  return (
    <div>
      {/* PAGE HERO */}
      <section id="contact-hero" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-5 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              Begin Your Home
            </span>
            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(38px,5vw,68px)] leading-[1.08] max-w-[760px]">
              Book a complimentary design <em className="not-italic italic font-light text-[#c9ab7c]">consultation</em>
            </h1>
            <p className="mt-6 max-w-[580px] text-[16.5px] font-light leading-[1.75] text-white/80">
              A 45-minute session with our principal design team in {city} — spatial review, material touch-and-feel, and an exact itemised estimate for your residence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ROADMAP: WHAT HAPPENS NEXT */}
      <section className="py-[clamp(64px,7vw,96px)] px-6 lg:px-7 bg-[#fdfbf6] border-b border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4">
              Consultation Roadmap
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(28px,3.4vw,44px)] leading-[1.12]">
              What happens when you <em className="not-italic italic font-light text-[#a58150]">reach out</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONSULTATION_STEPS.map((s, idx) => (
              <Reveal key={s.title} delay={idx * 80}>
                <div className="bg-[#f6f1e8] border border-[#211a13]/10 p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-[family-name:var(--font-marcellus)] text-[24px] text-[#a58150]">{s.step}</span>
                      <span className="text-[11px] uppercase tracking-wider text-[#7d7264] bg-white/70 px-2 py-0.5 border border-[#211a13]/10">{s.time}</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-marcellus)] text-[18px] text-[#211a13] mb-2">{s.title}</h3>
                    <p className="text-[13px] font-light text-[#7d7264] leading-[1.65]">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT + FORM */}
      <section id="contact-details" className="py-[clamp(70px,8vw,110px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-[clamp(44px,6vw,90px)] items-start">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Reach the Studio
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(28px,3.4vw,46px)] leading-[1.12] mb-9">
              Visit, call or write — <em className="not-italic italic font-light text-[#a58150]">we respond within hours</em>
            </h2>

            <div className="grid gap-0 mb-9">
              <div className="flex gap-5 py-6 border-t border-b border-[#211a13]/10 items-start">
                <span className="w-11 h-11 shrink-0 border border-[#a58150] grid place-items-center">
                  <MapPin className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                </span>
                <div>
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[18px] block mb-1.5">The Studio &amp; Library</b>
                  <span className="text-[14.5px] text-[#7d7264] font-light leading-[1.7]">{address || `${city}, Tamil Nadu`}</span>
                </div>
              </div>

              {phone && (
                <div className="flex gap-5 py-6 border-b border-[#211a13]/10 items-start">
                  <span className="w-11 h-11 shrink-0 border border-[#a58150] grid place-items-center">
                    <Phone className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <b className="font-[family-name:var(--font-marcellus)] font-normal text-[18px] block mb-1.5">Direct Advisory Line</b>
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
                  <span className="text-[14.5px] text-[#7d7264] font-light">Monday – Saturday: 10:00 AM – 7:30 PM (Sunday by appointment)</span>
                </div>
              </div>

              <div className="flex gap-5 py-6 border-b border-[#211a13]/10 items-start">
                <span className="w-11 h-11 shrink-0 border border-[#a58150] grid place-items-center">
                  <MessageCircle className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                </span>
                <div>
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[18px] block mb-1.5">Instant WhatsApp</b>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14.5px] text-[#211a13] font-medium hover:text-[#a58150] transition-colors block"
                  >
                    Chat with a designer — fast responses &amp; catalog sharing
                  </a>
                </div>
              </div>
            </div>

            {/* Coverage areas */}
            <div className="bg-[#fdfbf6] border border-[#211a13]/10 p-6">
              <b className="font-[family-name:var(--font-marcellus)] text-[16px] block mb-2.5">
                Service &amp; Site Visit Coverage Areas in {city}:
              </b>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.map((n) => (
                  <span key={n} className="text-[12px] bg-[#f6f1e8] border border-[#211a13]/10 text-[#7d7264] px-3 py-1">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="lg:sticky lg:top-28 border border-[#211a13]/10 shadow-[0_20px_50px_rgba(33,26,19,0.08)]">
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
                className="w-full block grayscale-[25%] contrast-[1.05]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <PageNarrative page="contact" studioName={cleanName} city={city} />

      {/* FAQ */}
      <section id="faq" className="bg-[#fdfbf6] border-t border-[#211a13]/10 px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4">
              Good Questions
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(28px,3.6vw,46px)] leading-[1.12] mb-3">
              Frequently asked <em className="not-italic italic font-light text-[#a58150]">client questions</em>
            </h2>
            <p className="text-[#7d7264] font-light text-[15px]">
              Everything you need to know about our consultation, contracts, and execution workflows.
            </p>
          </Reveal>

          <Reveal>
            <FAQAccordion items={contactFaqs} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
