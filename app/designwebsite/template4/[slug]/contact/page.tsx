import { readSourceConfig } from "@/lib/dataBuilder";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ContactPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template4');
  if (!data) return notFound();

  const { clinic } = data;

  const waphone = clinic.contact?.phone?.replace(/\D/g, "") || "919751396117";
  const watext = `Hi, I'm interested in booking a design consultation at ${clinic.name || "your studio"}!`;
  const walink = `https://wa.me/${waphone}?text=${encodeURIComponent(watext)}`;

  return (
    <div className="text-stone-900 bg-stone-50 min-h-screen pt-24 pb-32 selection:bg-stone-200">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        
        {/* Page Hero Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto pt-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">— GET IN TOUCH</p>
          <h1 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight">Visit Our Studio</h1>
          <p className="text-base text-stone-500 font-light leading-relaxed">
            Let's collaborate on your customized interior spaces. Reach out to schedule a private gallery walkthrough or discuss your spatial requirements.
          </p>
        </section>

        {/* Split Contact Columns */}
        <div className="grid lg:grid-cols-12 gap-12 items-start pt-8">
          {/* Left Column: Coordinates details */}
          <div className="lg:col-span-5 space-y-8 bg-white p-8 md:p-12 border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-stone-50 rounded-bl-full -z-0 border-l border-b border-stone-100"></div>
            
            <div className="font-bold flex items-center gap-3 mb-8 text-xl tracking-wider uppercase text-stone-900 relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 shrink-0 text-stone-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H13.62l.813-5.109L5.454 15.904h4.359z" />
              </svg> 
              Coordinates
            </div>

            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-700 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-stone-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Showroom Address</h4>
                  <p className="text-xs text-stone-900 font-medium mt-1 leading-relaxed">
                    {clinic.address?.full || '1/20, Anna Street, Velachery - Tambaram Main Rd, Pallikaranai, Chennai, Tamil Nadu 600100'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-700 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-stone-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a20.302 20.302 0 01-9.811-9.811c-.155-.44-.01-.928.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Direct Contact</h4>
                  <p className="text-xs text-stone-900 font-medium mt-1">
                    <a href={`tel:${clinic.contact?.phone || ''}`} className="hover:text-stone-600 transition-colors">
                      {clinic.contact?.phone || 'Contact Number'}
                    </a>
                  </p>
                  <p className="text-[10px] text-stone-400 font-light mt-0.5">Mon - Sat · 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-stone-50 border border-stone-200 rounded-none relative z-10 mt-8">
              <div>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">Chat on WhatsApp</h4>
                <p className="text-[10px] text-stone-400 mt-0.5">Instant design coordination.</p>
              </div>
              <a 
                href={walink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#25D366] hover:bg-[#1db954] text-white px-5 py-2.5 font-bold shadow-sm transition-all text-[9px] uppercase tracking-wider rounded-none"
              >
                Chat Now
              </a>
            </div>
          </div>

          {/* Right Column: Native proposal Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="font-bold flex items-center gap-3 mb-8 text-xl tracking-wider uppercase text-stone-900 relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 shrink-0 text-stone-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Send a Message
            </div>
            
            <form className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Full Name</label>
                <input type="text" id="fullName" placeholder="Your name" className="w-full text-stone-900 px-4 py-3 border border-stone-200 focus:outline-none focus:border-stone-900 bg-stone-50 text-xs" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Email Address</label>
                <input type="email" id="email" placeholder="you@example.com" className="w-full text-stone-900 px-4 py-3 border border-stone-200 focus:outline-none focus:border-stone-900 bg-stone-50 text-xs" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Project Details</label>
                <textarea id="message" rows={5} placeholder="Describe your dream space, kitchen layout preferences, specific challenges, or structural coordinates..." className="w-full text-stone-900 px-4 py-3 border border-stone-200 focus:outline-none focus:border-stone-900 bg-stone-50 text-xs resize-none"></textarea>
              </div>
              <button type="button" className="w-full py-4 mt-2 bg-stone-900 hover:bg-stone-850 text-white font-bold text-[10px] uppercase tracking-widest transition-all duration-300 shadow-sm flex items-center justify-center gap-2">
                Request a Proposal 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
