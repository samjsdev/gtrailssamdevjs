import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { INTERIOR_FAQS,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import VisitForm from '../VisitForm';
import FAQAccordion, { FAQItem } from '../FAQAccordion';

type PageProps = { params: Promise<{ slug: string }> };

const CONSULTATION_STEPS = [
  { step: '01', title: 'Private Inquiry', desc: 'Our studio coordinator connects to discuss your property layout and design vision.' },
  { step: '02', title: 'Studio Walkthrough', desc: 'Touch and feel physical samples of smoked veneers, marble slabs, and custom joinery.' },
  { step: '03', title: 'Cinematic 3D Concept', desc: 'Review 3D spatial walkthroughs and an exhaustive itemised Bill of Quantities.' },
  { step: '04', title: 'Turnkey Handover', desc: 'Factory fabrication, precision assembly, and final styling with 10-year craft warranty.' },
];

export default async function Template4Contact({ params }: PageProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template4');
  if (!data) return notFound();

  const { clinic } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const address = clinic.address?.full || `${city}, Tamil Nadu`;
  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const mapQuery = encodeURIComponent(address || `${cleanName} ${city}`);

  const visitImage =
    media.clinicImages?.[0] ||
    media.otherImages?.[0] ||
    '/images/stock/68b39046.webp';

  const contactFaqs: FAQItem[] = INTERIOR_FAQS.slice(0, 6).map((faq) => ({
    q: faq.q,
    a: faq.a,
    tag: 'Atelier FAQ',
  }));

  const neighborhoods = [
    `Prime Residential Enclaves in ${city}`,
    `Seaside & Coastal Residences`,
    `Gated Villa Layouts`,
    `Luxury High-Rise Penthouses`,
  ];

  return (
    <div>
      {/* VISIT + FORM */}
      <section className="py-[clamp(64px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-[52px]">
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              By Appointment Only
            </div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(36px,4.8vw,60px)] font-light leading-[1.08] mt-4 mb-3.5 max-w-[780px]">
              Feel the materials. <em className="italic text-[#a4532f]">Meet your architect.</em>
            </h1>
            <p className="text-[#7a6f60] text-[16px] font-light max-w-[640px]">
              Sit with an interior architect from {cleanName || 'our studio'} for an unhurried hour — walk through materials, floor plans, and budgets. By private appointment, never a queue.
            </p>
          </Reveal>

          <Reveal>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] bg-[#17130f] text-white overflow-hidden shadow-2xl">
              <div className="min-h-[300px] lg:min-h-[480px]">
                <img
                  src={visitImage}
                  alt={`Inside the ${cleanName || 'design'} studio`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-8 py-12 lg:px-[58px] lg:py-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a]">
                  Step into the Atelier
                </div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.4vw,40px)] font-semibold leading-[1.12] my-4">
                  Request your <em className="italic text-[#d9c49a]">private session</em>
                </h2>
                <ul className="flex flex-col gap-3 mb-8">
                  {[
                    'A dedicated hour with a senior architect',
                    'Tactile material samples you can touch & compare',
                    'Transparent budgets, itemised on the spot',
                    'Zero cost, zero obligation',
                  ].map((li) => (
                    <li key={li} className="flex gap-3 text-[14px] text-white/88 font-light">
                      <Check className="w-[17px] h-[17px] text-[#b08d4f] shrink-0 mt-[3px]" strokeWidth={2.2} />
                      {li}
                    </li>
                  ))}
                </ul>
                <VisitForm studioName={cleanName || 'the studio'} waPhone={waPhone} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-20 bg-[#fbf8f1] border-y border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-12 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
              Consultation Experience
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] mt-3">
              The appointment roadmap
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONSULTATION_STEPS.map((s) => (
              <Reveal key={s.step}>
                <div className="bg-white border border-[#221c14]/12 p-7 h-full flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="font-[family-name:var(--font-cormorant)] text-[24px] text-[#a4532f] block mb-3">
                      {s.step}
                    </span>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[20px] font-semibold text-[#17130f] mb-2">
                      {s.title}
                    </h3>
                    <p className="text-[13px] text-[#7a6f60] font-light leading-[1.65]">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILS + MAP */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-[0.9fr_1.1fr] gap-[26px] items-stretch">
          <Reveal>
            <div className="bg-[#fbf8f1] border border-[#221c14]/14 p-9 sm:p-11 h-full flex flex-col justify-center gap-7">
              <div className="flex gap-4 items-start">
                <span className="w-[46px] h-[46px] rounded-full bg-[#f5f1e8] grid place-items-center text-[#a4532f] shrink-0">
                  <MapPin className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold mb-1">The Atelier &amp; Library</h3>
                  <p className="text-[14.5px] text-[#7a6f60] font-light leading-[1.7]">{address}</p>
                </div>
              </div>

              {phone && (
                <div className="flex gap-4 items-start">
                  <span className="w-[46px] h-[46px] rounded-full bg-[#f5f1e8] grid place-items-center text-[#a4532f] shrink-0">
                    <Phone className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold mb-1">Direct Line</h3>
                    <a href={`tel:${phone}`} className="text-[14.5px] text-[#17130f] font-medium hover:text-[#a4532f]">
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex gap-4 items-start">
                <span className="w-[46px] h-[46px] rounded-full bg-[#f5f1e8] grid place-items-center text-[#a4532f] shrink-0">
                  <Clock className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold mb-1">Studio Hours</h3>
                  <p className="text-[14.5px] text-[#7a6f60] font-light">Monday – Saturday: 10:00 AM – 7:30 PM (Sunday by appointment)</p>
                </div>
              </div>

              {/* Neighborhoods */}
              <div className="border-t border-[#221c14]/10 pt-5">
                <b className="font-[family-name:var(--font-cormorant)] text-[17px] text-[#17130f] block mb-2">
                  Private site visits across {city}:
                </b>
                <div className="flex flex-wrap gap-2">
                  {neighborhoods.map((n) => (
                    <span key={n} className="text-[12px] bg-white border border-[#221c14]/12 text-[#7a6f60] px-3 py-1 font-light">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden border border-[#221c14]/14 min-h-[380px] h-full shadow-sm">
              <iframe
                title="Atelier Location"
                src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <PageNarrative page="contact" studioName={cleanName} city={city} />

      {/* FAQ */}
      <section className="py-24 bg-[#fbf8f1] border-t border-[#221c14]/12">
        <div className="max-w-[860px] mx-auto px-[30px]">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
              Atelier FAQ
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] mt-3">
              Frequently asked inquiries
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
