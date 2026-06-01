import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Playfair_Display, Lato } from 'next/font/google';
import { MessageSquare, Phone, MapPin, Send, Sparkles } from 'lucide-react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

export default async function ContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template6');
  if (!data) return notFound();

  const { clinic } = data;
  const basePath = `/designwebsite/template6/${slug}`;

  return (
    <div className={`${lato.className} text-zinc-300 min-h-screen pt-44 pb-32 bg-[#1a1a1a] selection:bg-zinc-800 selection:text-white`}>
      {/* Symmetrical line grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        {/* Page Hero Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">GET IN TOUCH</p>
          <h1 className={`${playfair.className} text-5xl md:text-7xl font-light text-white leading-none`}>Visit Our <span className="italic font-normal text-zinc-400">Studio</span></h1>
          <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base mt-4">Let's collaborate on your custom interior spaces. Reach out to book a walkthrough or request a customized scoping checklist.</p>
        </section>

        {/* Split Contact Columns */}
        <div className="grid lg:grid-cols-12 gap-12 items-start pt-8">
          
          {/* Left Column: Coordinates Details */}
          <div className="lg:col-span-5 space-y-8 bg-[#121212] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -z-0"></div>
            
            <div className={`${playfair.className} font-medium flex items-center gap-3 mb-8 text-2xl relative z-10 text-white uppercase tracking-wider`}>
              <Sparkles className="text-white w-6 h-6 shrink-0"/> Coordinates
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-white shrink-0 border border-white/10">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Showroom Location</h4>
                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed font-light">
                    {clinic.address?.full || '1/20, Anna Street, Velachery - Tambaram Main Rd, Pallikaranai, Chennai, Tamil Nadu 600100'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-white shrink-0 border border-white/10">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Direct Consultation</h4>
                  <p className="text-sm text-white font-medium mt-1">
                    <a href={`tel:${clinic.contact?.phone || ''}`} className="hover:text-zinc-400 transition-colors">
                      {clinic.contact?.phone || 'Contact Number'}
                    </a>
                  </p>
                  <p className="text-[10px] text-zinc-500 font-light mt-0.5">Mon-Sat · 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-[#1a1a1a] border border-white/5 rounded-2xl relative z-10 mt-8">
              <div>
                <h4 className={`${playfair.className} text-white font-medium`}>Chat on WhatsApp</h4>
                <p className="text-[10px] text-zinc-500 mt-0.5">Instant design coordination.</p>
              </div>
              {(() => {
                const waPhone = clinic.contact?.phone?.replace(/\D/g, '') || '919751396117';
                const waText = `Hi, I'm interested in booking a design consultation at ${clinic.name || 'your studio'}!`;
                const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;
                return (
                  <a 
                    href={waLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-[#25D366] hover:bg-[#1db954] text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-[9px] uppercase tracking-widest"
                  >
                    Chat Now
                  </a>
                );
              })()}
            </div>
          </div>

          {/* Right Column: Native enquiry Form */}
          <div className="lg:col-span-7 bg-[#121212] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
            <div className={`${playfair.className} font-medium flex items-center gap-3 mb-8 text-2xl relative z-10 text-white uppercase tracking-wider`}>
              <MessageSquare className="text-white w-6 h-6 shrink-0"/> Send a Message
            </div>
            
            <form className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-sans">Full Name</label>
                <input type="text" id="fullName" placeholder="Your name" className="w-full text-white px-5 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent transition-all bg-[#1a1a1a] font-sans text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-sans">Email Address</label>
                <input type="email" id="email" placeholder="you@company.com" className="w-full text-white px-5 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent transition-all bg-[#1a1a1a] font-sans text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-sans">Project Details</label>
                <textarea id="message" rows={5} placeholder="Describe your dream space, specific challenges, or modular kitchen ideas..." className="w-full text-white px-5 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent transition-all resize-none bg-[#1a1a1a] font-sans text-sm"></textarea>
              </div>
              <button type="button" className="w-full py-4 mt-2 bg-white hover:bg-[#1a1a1a] hover:text-white text-black font-bold rounded-xl border border-transparent hover:border-white transition-all uppercase tracking-widest text-[10px] shadow-md flex items-center justify-center gap-2 font-sans">
                Request a Proposal <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
