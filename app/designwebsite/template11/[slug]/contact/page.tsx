import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { ARCHITECTURE_FAQS } from '@/lib/architectureContent';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import LeadForm from '../LeadForm';
import FAQAccordion, { FAQItem } from '../FAQAccordion';

type PageProps = { params: Promise<{ slug: string }> };

const CONSULTATION_STEPS = [
  {
    step: '01',
    title: 'We Study Your Plot Details',
    time: 'Within 24 Hours',
    desc: 'Our team reviews your plot location, road width, and whether you plan to build a villa, residential home, or commercial space.',
  },
  {
    step: '02',
    title: 'Meet Us on Your Plot',
    time: '60 Minutes',
    desc: 'Meet our architect at your plot. We check ground levels, required open space, sunlight direction, and discuss layout options.',
  },
  {
    step: '03',
    title: '3D Views & Approval Filing',
    time: '7 – 10 Days',
    desc: 'Get realistic 3D views of your home, submit the government plan approval, and receive an item-by-item cost estimate.',
  },
  {
    step: '04',
    title: 'Construction & Key Handover',
    time: 'Fixed Schedule',
    desc: 'From digging the foundation to final painting and fittings — regular photo updates until key handover with warranty.',
  },
];

export default async function Template11Contact({ params }: PageProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template11');
  if (!data) return notFound();

  const { clinic } = data;
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const address = clinic.address?.full || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Hi, I'm interested in booking an architectural consultation!`
  )}`;

  const mapUrl =
    clinic.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent((cleanName || '') + ' ' + address)}&output=embed`;

  const contactFaqs: FAQItem[] = ARCHITECTURE_FAQS.slice(0, 6).map((faq) => ({
    q: faq.q,
    a: faq.a,
    tag: 'Sanctions & Build',
  }));

  const neighborhoods = [
    `Central ${city} (Anna Nagar, T. Nagar, Alwarpet)`,
    `South ${city} (Adyar, Besant Nagar, Thiruvanmiyur)`,
    `Coastal Corridor (ECR, Neelankarai, Injambakkam)`,
    `IT Corridor (OMR, Perungudi, Sholinganallur)`,
    `West ${city} (Porur, Mogappair, Ambattur)`,
    `Suburban ${city} (Tambaram, Chromepet, Guduvanchery)`,
  ];

  return (
    <div>
      {/* PAGE HERO */}
      <section id="contact-hero" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-5 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              Start Your Architecture Project
            </span>
            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(38px,5vw,68px)] leading-[1.08] max-w-[760px]">
              Book a free design <em className="not-italic italic font-light text-[#c9ab7c]">consultation</em>
            </h1>
            <p className="mt-6 max-w-[580px] text-[16.5px] font-light leading-[1.75] text-white/80">
              A free 60-minute meeting with our architects in {city} — we check your plot papers and building rules, discuss villa, residential or commercial layout options, and give you a fixed cost estimate.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ROADMAP: WHAT HAPPENS NEXT */}
      <section className="py-[clamp(64px,7vw,96px)] px-6 lg:px-7 bg-[#fdfbf6] border-b border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4">
              What Happens Next
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(28px,3.4vw,44px)] leading-[1.12]">
              When you contact us, <em className="not-italic italic font-light text-[#a58150]">here is what happens</em>
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
              Contact Us
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(28px,3.4vw,46px)] leading-[1.12] mb-9">
              Visit, call or WhatsApp us — <em className="not-italic italic font-light text-[#a58150]">we reply within hours</em>
            </h2>

            <div className="grid gap-0 mb-9">
              <div className="flex gap-5 py-6 border-t border-b border-[#211a13]/10 items-start">
                <span className="w-11 h-11 shrink-0 border border-[#a58150] grid place-items-center">
                  <MapPin className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                </span>
                <div>
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[18px] block mb-1.5">Our Office</b>
                  <span className="text-[14.5px] text-[#7d7264] font-light leading-[1.7]">{address || `${city}, Tamil Nadu`}</span>
                </div>
              </div>

              {phone && (
                <div className="flex gap-5 py-6 border-b border-[#211a13]/10 items-start">
                  <span className="w-11 h-11 shrink-0 border border-[#a58150] grid place-items-center">
                    <Phone className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <b className="font-[family-name:var(--font-marcellus)] font-normal text-[18px] block mb-1.5">Call Us Directly</b>
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
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[18px] block mb-1.5">Office Hours</b>
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
                    Chat with our architects — quick replies
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
