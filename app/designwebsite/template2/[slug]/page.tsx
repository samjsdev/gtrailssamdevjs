import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond } from 'next/font/google';
import ClientHero from './ClientHero';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template2/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic, business, media } = data;

  const waPhone = clinic.contact?.phone?.replace(/\D/g, '') || '919751396117';
  const waText = `Hi, I'm interested in booking a woodwork/carpentry consultation at ${clinic.name || 'your studio'}!`;
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="font-sans text-[#2A221E] bg-[#FAF6F0] min-h-screen selection:bg-[#B48A66] selection:text-white scroll-smooth">
      {/* Hero with 4 Floating Cards inside */}
      <ClientHero clinic={clinic} business={business} basePath={basePath} />

      {/* OUR SERVICES */}
      <section id="services" className="py-24 bg-[#FAF6F0] text-[#2A221E]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="text-center mb-16">
            <h2 className={`${cormorant.className} text-4xl sm:text-5xl md:text-6xl font-light tracking-wide`}>
              Our Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Furniture Design & Build",
                desc: "Lorem ipsum dolor sit amet, speed car secletan ad ipiscing elit, sed do eiusmod tempor.",
                image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600"
              },
              {
                title: "Home Woodworking Projects",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=600"
              },
              {
                title: "Wood Restoration & Repair",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600"
              }
            ].map((svc, i) => (
              <div key={i} className="bg-white p-6 rounded shadow-lg border border-black/5 hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="mb-6 aspect-4/3 overflow-hidden rounded bg-[#FAF6F0] relative">
                  <img src={svc.image} alt={svc.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103" />
                </div>
                <h3 className="text-xl font-semibold mb-3 tracking-wide">{svc.title}</h3>
                <p className="text-black/60 text-sm leading-relaxed mb-6 font-light">{svc.desc}</p>
                <div className="mt-auto">
                  <a 
                    href="#contact"
                    className="inline-block w-full text-center py-3 bg-[#7B4E31] hover:bg-[#633E26] text-white text-xs font-semibold uppercase tracking-widest rounded transition-colors duration-300"
                  >
                    Request Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MIDDLE BANNER */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image of tools with Dark Warm Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?auto=format&fit=crop&q=80&w=1200"
            alt="Woodworking tools close up" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center text-white space-y-6">
          <h2 className={`${cormorant.className} text-4xl sm:text-5xl md:text-6xl font-light tracking-wide leading-tight`}>
            Bespoke Woodworking<br />Tailored to Your Needs
          </h2>
          <p className="text-lg text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            Built to last and made for your space, our team is dedicated to providing high-quality woodcraft solutions.
          </p>
          <div className="pt-4">
            <a 
              href="#contact"
              className="inline-block px-10 py-4 bg-[#B48A66] hover:bg-[#9E7551] text-white font-medium transition-all duration-300 text-sm tracking-widest uppercase rounded shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* DISCUSS YOUR PROJECT FORM */}
      <section id="contact" className="py-24 bg-[#FAF6F0] text-[#2A221E]">
        <div className="max-w-3xl mx-auto px-8 w-full">
          <div className="text-center mb-16 space-y-4">
            <h2 className={`${cormorant.className} text-4xl sm:text-5xl font-light tracking-wide`}>
              Discuss Your Project
            </h2>
            <p className="text-black/60 font-light text-sm">
              Get in touch with us to discuss your woodworking requirements and receive a free quote.
            </p>
          </div>

          <form className="space-y-6 bg-white p-10 rounded shadow-xl border border-black/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-black/50 mb-2">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 bg-[#FAF6F0]/40 border border-black/10 focus:border-[#B48A66] focus:outline-none rounded transition-colors text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-black/50 mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 bg-[#FAF6F0]/40 border border-black/10 focus:border-[#B48A66] focus:outline-none rounded transition-colors text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-black/50 mb-2">Phone</label>
              <input 
                type="tel" 
                placeholder="Your Phone Number" 
                className="w-full px-4 py-3 bg-[#FAF6F0]/40 border border-black/10 focus:border-[#B48A66] focus:outline-none rounded transition-colors text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-black/50 mb-2">Message</label>
              <textarea 
                rows={5}
                placeholder="Tell us about your project..." 
                className="w-full px-4 py-3 bg-[#FAF6F0]/40 border border-black/10 focus:border-[#B48A66] focus:outline-none rounded transition-colors text-sm"
                required
              ></textarea>
            </div>

            <div>
              <button 
                type="submit"
                className="w-full py-4 bg-[#7B4E31] hover:bg-[#633E26] text-white font-semibold uppercase tracking-widest rounded transition-colors duration-300 shadow hover:shadow-lg text-sm"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}