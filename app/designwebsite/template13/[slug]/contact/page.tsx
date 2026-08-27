import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, MessageCircle, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { ARCHITECTURE_FAQS } from '@/lib/architectureContent';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import LeadForm from '../LeadForm';
import FAQAccordion, { FAQItem } from '../FAQAccordion';

type PageProps = { params: Promise<{ slug: string }> };

const CONSULTATION_PROCESS = [
  { step: '1', title: 'Site & Zoning Review', time: 'Under 24 Hours', desc: 'Our architectural team analyzes your plot deed, coordinates, and municipal bylaw parameters.' },
  { step: '2', title: 'Atelier & Plot Meeting', time: '60 Minutes', desc: 'Meet our principal architect. Review topographical contours, solar paths, and preliminary massing models.' },
  { step: '3', title: '3D BIM Twin & Sanctions', time: '7 – 10 Days', desc: 'Receive cinematic volumetric models, structural calculations, and a frozen BOQ cost framework.' },
  { step: '4', title: 'Turnkey Groundbreaking', time: 'Milestone Schedule', desc: 'Monolithic RCC casting, structural steel erection, and weekly photo updates to guaranteed keys handover.' },
];

export default async function Template13Contact({ params }: PageProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template13');
  if (!data) return notFound();

  const { clinic, business } = data;
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const whatsapp = phone;
  const fullAddress = clinic.address?.full || `${city}, Tamil Nadu`;
  const hours = 'Mon–Sat: 9:30 AM – 7:00 PM (Sunday by appointment)';
  const rating = business.rating || '4.9';
  const reviewCount = business.reviewCount || '120';
  const waPhone = (whatsapp || '').replace(/[^0-9]/g, '');

  const contactCards = [
    { icon: MapPin, label: 'Visit our atelier', value: fullAddress },
    ...(phone ? [{ icon: Phone, label: 'Call our architects', value: phone, href: `tel:${phone.replace(/\s/g, '')}` }] : []),
    { icon: Clock, label: 'Atelier hours', value: hours },
    ...(whatsapp
      ? [
          {
            icon: MessageCircle,
            label: 'WhatsApp chat',
            value: 'Chat with an architect now',
            href: `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`,
          },
        ]
      : []),
  ];

  const contactFaqs: FAQItem[] = ARCHITECTURE_FAQS.slice(0, 6).map((faq) => ({
    q: faq.q,
    a: faq.a,
    tag: 'Sanctions & Civil',
  }));

  const neighborhoods = [
    `North ${city}`,
    `Central ${city}`,
    `South ${city}`,
    `Gated Villa Communities`,
    `High-Rise Residential Towers`,
  ];

  const mapQuery = encodeURIComponent(fullAddress || `${cleanName} ${city}`);

  return (
    <div>
      {/* HERO + FORM */}
      <section id="contact-hero" className="px-7 py-[clamp(56px,7vw,88px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-11 lg:gap-16 items-start">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Let&apos;s talk about your home
            </div>
            <h1 className="text-[clamp(32px,4.6vw,54px)] font-extrabold mt-3.5 tracking-[-0.02em] leading-[1.12]">
              Start with a{' '}
              <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">
                design consultation
              </span>
            </h1>
            <p className="mt-4.5 max-w-[560px] text-[#6d6259] text-[16px]">
              Tell us about your plot, project, and budget. A licensed architect from {cleanName || 'our studio'} will connect with you within a few working hours.
            </p>

            <div className="mt-7 inline-flex items-center gap-3 bg-white border border-[#241f1a]/10 rounded-2xl px-5 py-3.5 shadow-sm">
              <span className="flex gap-0.5 text-[#f4b942]">★★★★★</span>
              <span className="text-[13.5px] font-extrabold text-[#1d1713]">
                {rating} rated · {reviewCount}+ Google reviews in {city}
              </span>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4 mb-8">
              {contactCards.map((card) => {
                const Icon = card.icon;
                const inner = (
                  <>
                    <span className="w-11 h-11 rounded-xl bg-[#d8442c]/10 text-[#d8442c] grid place-items-center shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={2.2} />
                    </span>
                    <div>
                      <b className="block text-[12px] uppercase tracking-wider text-[#6d6259] font-extrabold mb-1">
                        {card.label}
                      </b>
                      <span className="text-[14px] font-bold text-[#1d1713] leading-snug">{card.value}</span>
                    </div>
                  </>
                );
                const cls =
                  'flex gap-3.5 items-start bg-white border border-[#241f1a]/8 rounded-2xl p-4.5 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-sm';
                return 'href' in card && card.href ? (
                  <a key={card.label} href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} className={cls}>
                    {inner}
                  </a>
                ) : (
                  <div key={card.label} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* Coverage */}
            <div className="bg-white border border-[#241f1a]/10 rounded-2xl p-5">
              <b className="text-[14.5px] font-extrabold text-[#1d1713] block mb-2">
                We cover all major residential neighborhoods in {city}:
              </b>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.map((n) => (
                  <span key={n} className="text-[12px] font-bold bg-[#fbf7f2] text-[#d8442c] px-3 py-1 rounded-full border border-[#d8442c]/20">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28 bg-white border border-[#241f1a]/10 rounded-2xl p-7 sm:p-9 shadow-lg">
            <LeadForm studioName={cleanName || 'the studio'} waPhone={waPhone} city={city} />
          </Reveal>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="px-7 py-[clamp(56px,7vw,88px)] bg-white border-y border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Consultation Process
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              What happens when you inquire
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONSULTATION_PROCESS.map((p) => (
              <Reveal key={p.step}>
                <div className="bg-[#fbf7f2] border border-[#241f1a]/10 rounded-2xl p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="w-8 h-8 rounded-lg bg-[#d8442c] text-white font-extrabold text-[14px] grid place-items-center">
                        {p.step}
                      </span>
                      <span className="text-[11px] font-extrabold uppercase text-[#d8442c] bg-white px-2 py-0.5 rounded border border-[#241f1a]/10">
                        {p.time}
                      </span>
                    </div>
                    <h3 className="text-[18px] font-extrabold text-[#1d1713] mb-1.5">{p.title}</h3>
                    <p className="text-[13px] text-[#6d6259] font-medium leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="map" className="px-7 py-[clamp(56px,7vw,88px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-[#241f1a]/10 shadow-md">
              <iframe
                title="Studio Location"
                src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                className="w-full h-[380px] border-0"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <PageNarrative page="contact" studioName={cleanName} city={city} />

      {/* FAQ */}
      <section id="faq" className="px-7 py-[clamp(56px,7vw,88px)] bg-white border-t border-[#241f1a]/10">
        <div className="max-w-[900px] mx-auto">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Good Questions
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              Consultation FAQ
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
