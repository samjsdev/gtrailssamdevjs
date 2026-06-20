import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';

type PageProps = {
  params?: Promise<{ slug?: string }>;
};

export default async function ContactPage({ params }: PageProps) {
  const resolvedParams = params ? await params : {};
  const data = await readSourceConfig(resolvedParams.slug, 'template1');
  if (!data) return notFound();

  const { clinic, business } = data;
  const cleanName = cleanClinicName(clinic.name);
  const phone = clinic.contact?.phone || '09176600046';
  const email = clinic.contact?.email || 'dreamsminedesigners@gmail.com';
  const waPhone = phone.replace(/\D/g, '') || '919176600046';
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hi ${cleanName}, I want to discuss a home design and construction project.`)}`;

  return (
    <div>
      <section className="site-grid py-16 md:py-24">
        <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[0.72fr_1fr]">
          <div>
            <span className="eyebrow">PROJECT BRIEF</span>
            <h1 className="section-heading mt-4">Start with scope, site and budget clarity.</h1>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.05em]">Tell us what you want to build, renovate or visualize.</h2>
            <p className="section-subheading mt-4">
              Share the plot status, desired square footage, Vastu expectations, timeline and interior scope so the first conversation is useful.
            </p>
          </div>
        </div>
      </section>

      <section className="site-grid pb-16 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="grid content-start gap-3">
            <a href={`tel:${phone}`} className="panel flex gap-4 p-5 transition hover:border-[var(--ink)]">
              <Phone className="h-6 w-6 shrink-0 text-[var(--oxide)]" />
              <div>
                <p className="eyebrow">CALL DIRECTLY</p>
                <p className="mt-2 text-xl font-black uppercase tracking-[-0.04em]">{phone}</p>
              </div>
            </a>
            <a href={`mailto:${email}`} className="panel flex gap-4 p-5 transition hover:border-[var(--ink)]">
              <Mail className="h-6 w-6 shrink-0 text-[var(--oxide)]" />
              <div>
                <p className="eyebrow">EMAIL BRIEF</p>
                <p className="mt-2 text-xl font-black tracking-[-0.04em]">{email}</p>
              </div>
            </a>
            <div className="panel flex gap-4 p-5">
              <MapPin className="h-6 w-6 shrink-0 text-[var(--oxide)]" />
              <div>
                <p className="eyebrow">STUDIO LOCATION</p>
                <p className="mt-2 text-base font-bold leading-7">{clinic.address?.full}</p>
              </div>
            </div>
            <div className="bg-[var(--ink)] p-5 text-[var(--white)]">
              <p className="eyebrow text-[var(--safety)]">BUILD RATE SIGNAL</p>
              <p className="mt-3 text-4xl font-black uppercase tracking-[-0.05em]">Rs.{business.pricePerSqft || '2299'} / sqft</p>
              <p className="mt-3 text-sm font-medium leading-6 text-white/62">Use this as a starting reference. Final estimates depend on site, scope and specification.</p>
            </div>
          </aside>

          <div className="panel p-5 md:p-8">
            <div className="grid gap-6 border-b border-[var(--line)] pb-6 md:grid-cols-[0.7fr_1fr]">
              <div>
                <span className="eyebrow">CONSULTATION FORM</span>
                <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.055em]">Send a structured project brief.</h2>
              </div>
              <p className="section-subheading">
                Fill out the form below to receive an instant free quotation. Direct WhatsApp and phone actions are also active for immediate enquiry.
              </p>
            </div>

            <div className="mt-6 flex justify-center w-full bg-[var(--paper)] py-4 rounded border border-[var(--line)]">
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdsYUIz-6IWzBpZXEpOIrAiVt1iiD8lRr3Gto5o7zjz0Ubq8Q/viewform?embedded=true" width="640" height="826" frameBorder="0" marginHeight={0} marginWidth={0} className="w-full max-w-[640px]">Loading…</iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--white)] py-16 md:py-24">
        <div className="site-grid grid gap-6 md:grid-cols-[0.72fr_1fr]">
          <div>
            <span className="eyebrow">FAST ACTION</span>
            <h2 className="section-heading mt-4">Need a quick response?</h2>
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">WhatsApp is the fastest route for first project scoping.</h3>
            <p className="section-subheading mt-3">
              Send your plot size, location and desired services. The team can then guide the next consultation step.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={waLink} target="_blank" rel="noreferrer" className="btn-solid">
                WhatsApp Project Details
              </a>
              <Link href={`tel:${phone}`} className="btn-line">
                Call Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
