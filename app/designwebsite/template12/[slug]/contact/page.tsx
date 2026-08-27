import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, MessageCircle, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { ARCHITECTURE_FAQS } from '@/lib/architectureContent';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import LeadForm from '../LeadForm';
import FAQAccordion, { FAQItem } from '../FAQAccordion';

type PageProps = { params: Promise<{ slug: string }> };

const CONSULTATION_BLUEPRINT = [
  {
    step: '1',
    title: 'Site & Zoning Review',
    desc: 'Our architectural team analyzes your plot dimensions, municipal zoning bylaws, and setback requirements within 24 hours.',
  },
  {
    step: '2',
    title: '60-Min Architect Consultation',
    desc: 'Meet our principal architect. Review contour surveys, solar path simulations, and preliminary massing models.',
  },
  {
    step: '3',
    title: '3D BIM Twin & Frozen BOQ',
    desc: 'Receive photorealistic digital twins, structural calculations, and a legally frozen BOQ with zero escalation clauses.',
  },
  {
    step: '4',
    title: 'Turnkey Groundbreaking',
    desc: 'Monolithic RCC casting, structural steel erection, and weekly photo updates to guaranteed keys handover.',
  },
];

export default async function Template12Contact({ params }: PageProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template12');
  if (!data) return notFound();

  const { clinic } = data;
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const address = clinic.address?.full || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Hi, I'm interested in an architectural consultation with ${cleanName || 'your architects'}!`
  )}`;

  const mapUrl =
    clinic.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent((cleanName || '') + ' ' + address)}&output=embed`;

  const cards = [
    { icon: MapPin, title: 'Visit Our Office', body: address || `${city}, Tamil Nadu`, href: null },
    ...(phone ? [{ icon: Phone, title: 'Direct Helpline', body: phone, href: `tel:${phone}` }] : []),
    { icon: MessageCircle, title: 'WhatsApp Chat', body: 'Chat directly with an architect', href: waLink },
    { icon: Clock, title: 'Office Hours', body: 'Mon – Sat: 9:30 AM – 7:00 PM', href: null },
  ];

  const contactFaqs: FAQItem[] = ARCHITECTURE_FAQS.slice(0, 6).map((faq) => ({
    q: faq.q,
    a: faq.a,
    tag: 'Bylaws & Build',
  }));

  const neighborhoods = [
    `North ${city}`,
    `South ${city}`,
    `Central ${city}`,
    `Suburban Residential Townships`,
    `Premium Gated Communities`,
  ];

  return (
    <div>
      {/* PAGE HERO + FORM */}
      <section id="contact-hero" className="bg-[#faf7f1] px-6 py-[clamp(60px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(36px,5vw,64px)] items-start">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 bg-white border border-[#1b1b1b]/10 rounded-full px-4.5 py-2 text-[12px] font-bold tracking-[0.14em] uppercase text-[#0e5a43] mb-6 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f2a007]">
              Design Consultation
            </span>
            <h1 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(34px,4.6vw,58px)] leading-[1.06] tracking-[-0.02em]">
              Your dream home is <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">one conversation away</mark>
            </h1>
            <p className="mt-5 max-w-[520px] text-[#6b6660] text-[16.5px] leading-[1.7] font-medium mb-8">
              Floor plan review, 3D design direction, and an exact itemised quote for your home in {city}. A designer (never a call center) will assist you.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {cards.map((card) => {
                const Icon = card.icon;
                const inner = (
                  <div className="flex gap-4 items-start bg-white border border-[#1b1b1b]/10 rounded-[18px] px-5 py-4.5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(27,27,27,0.10)]">
                    <span className="w-11 h-11 shrink-0 rounded-[13px] bg-[#fdeecb] grid place-items-center">
                      <Icon className="w-5 h-5 text-[#f2a007]" strokeWidth={2} />
                    </span>
                    <span>
                      <b className="font-[family-name:var(--font-bricolage)] font-bold text-[16px] block mb-0.5 text-[#1b1b1b]">{card.title}</b>
                      <span className="text-[13px] text-[#6b6660] font-semibold leading-snug">{card.body}</span>
                    </span>
                  </div>
                );
                return card.href ? (
                  <a key={card.title} href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={card.title}>{inner}</div>
                );
              })}
            </div>

            {/* Coverage badge */}
            <div className="bg-white border border-[#1b1b1b]/10 rounded-2xl p-5">
              <b className="font-[family-name:var(--font-bricolage)] text-[15px] text-[#1b1b1b] block mb-2">
                We provide free site visits across {city}:
              </b>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.map((n) => (
                  <span key={n} className="text-[11.5px] font-bold bg-[#faf7f1] text-[#0e5a43] px-3 py-1 rounded-full border border-[#0e5a43]/15">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <LeadForm studioName={cleanName || 'our architects'} waPhone={waPhone} />
          </Reveal>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="px-6 py-[clamp(64px,7vw,96px)] bg-white border-y border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              What to Expect
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,46px)] leading-[1.08] tracking-[-0.02em]">
              The consultation blueprint
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONSULTATION_BLUEPRINT.map((b) => (
              <Reveal key={b.step}>
                <div className="bg-[#faf7f1] border border-[#1b1b1b]/10 rounded-[20px] p-6 h-full flex flex-col justify-between">
                  <div>
                    <span className="w-9 h-9 rounded-xl bg-[#0e5a43] text-white font-bold text-[14px] grid place-items-center mb-4">
                      {b.step}
                    </span>
                    <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[18px] text-[#1b1b1b] mb-2">
                      {b.title}
                    </h3>
                    <p className="text-[13px] text-[#6b6660] font-medium leading-[1.65]">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="map" className="px-6 py-[clamp(56px,6vw,88px)] bg-[#faf7f1]">
        <div className="max-w-[1240px] mx-auto">
          <Reveal>
            <div className="rounded-[26px] overflow-hidden border border-[#1b1b1b]/10 shadow-[0_24px_60px_rgba(27,27,27,0.08)]">
              <iframe
                src={mapUrl}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Location of ${cleanName || 'our office'}`}
                className="w-full block"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <PageNarrative page="contact" studioName={cleanName} city={city} />

      {/* FAQ */}
      <section id="faq" className="px-6 py-[clamp(64px,7vw,96px)] bg-white border-t border-[#1b1b1b]/10">
        <div className="max-w-[900px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              Got Questions?
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,46px)] leading-[1.08] tracking-[-0.02em] mb-3">
              Common consultation questions
            </h2>
          </Reveal>

          <Reveal>
            <FAQAccordion items={contactFaqs} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
