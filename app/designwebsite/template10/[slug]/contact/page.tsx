import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Archivo_Black, Inter } from 'next/font/google';
import { MessageSquare, Phone, MapPin, Send, Sparkles } from 'lucide-react';

const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default async function ContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template10');
  if (!data) return notFound();

  const { clinic } = data;
  const basePath = `/designwebsite/template10/${slug}`;

  return (
    <div className={`${inter.className} text-[#F4F1DE] min-h-screen pt-44 pb-32 bg-[#1E2022] selection:bg-[#E07A5F] selection:text-white`}>
      {/* Symmetrical dot grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10 space-y-16">
        
        {/* Page Hero Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1">
            LAUNCH LOFT PLAN
          </span>
          <h1 className={`${archivo.className} text-4xl sm:text-5xl lg:text-7xl text-white uppercase leading-[1.05]`}>
            Visit Our <span className="text-[#E07A5F]">Studio</span>
          </h1>
          <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base max-w-lg mx-auto mt-4">
            Let's collaborate on your custom loft volumes. Reach out to book a workshop walkthrough or request a sizing checklist.
          </p>
        </section>

        {/* Contact Split Columns */}
        <div className="grid lg:grid-cols-12 gap-12 items-start pt-8">
          
          {/* Left Column: Direct Coordinates details */}
          <div className="lg:col-span-5 space-y-8 bg-[#141517] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none"></div>
            
            <div className={`${archivo.className} flex items-center gap-3 mb-8 text-xl relative z-10 text-white uppercase`}>
              <Sparkles className="text-[#E07A5F] w-5 h-5 shrink-0"/> Coordinates
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1E2022] flex items-center justify-center text-white shrink-0 border border-white/10">
                  <MapPin className="w-4 h-4 text-[#E07A5F]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Showroom Location</h4>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed font-light">
                    {clinic.address?.full || '1/20, Anna Street, Velachery - Tambaram Main Rd, Pallikaranai, Chennai, Tamil Nadu 600100'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1E2022] flex items-center justify-center text-white shrink-0 border border-white/10">
                  <Phone className="w-4 h-4 text-[#E07A5F]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Direct Call</h4>
                  <p className="text-base text-white font-medium mt-1 font-sans">
                    <a href={`tel:${clinic.contact?.phone || ''}`} className="hover:text-[#E07A5F] transition-colors">
                      {clinic.contact?.phone || 'Contact Number'}
                    </a>
                  </p>
                  <p className="text-[10px] text-slate-500 font-light mt-1">Mon-Sat · 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-[#1E2022] border border-white/10 rounded-none relative z-10 mt-8">
              <div>
                <h4 className={`${archivo.className} text-white uppercase text-sm`}>WhatsApp Chat</h4>
                <p className="text-[10px] text-slate-400 mt-1 font-light">Instant volume planning.</p>
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
                    className="bg-[#25D366] hover:bg-[#1db954] text-white px-5 py-2.5 rounded-none font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-[9px] uppercase tracking-widest"
                  >
                    Chat Now
                  </a>
                );
              })()}
            </div>
          </div>

          {/* Right Column: Industrial enquiry Form */}
          <div className="lg:col-span-7 bg-[#141517] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className={`${archivo.className} flex items-center gap-3 mb-8 text-xl relative z-10 text-white uppercase`}>
              <MessageSquare className="text-[#E07A5F] w-5 h-5 shrink-0"/> Log Project Shell
            </div>
            
            <form className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Full Name</label>
                <input type="text" id="fullName" placeholder="Your name" className="w-full text-white px-4 py-3 rounded-none border border-white/10 focus:outline-none focus:border-[#E07A5F] transition-colors bg-[#1E2022] font-sans text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Email Address</label>
                <input type="email" id="email" placeholder="you@company.com" className="w-full text-white px-4 py-3 rounded-none border border-white/10 focus:outline-none focus:border-[#E07A5F] transition-colors bg-[#1E2022] font-sans text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Loft Configurations</label>
                <textarea id="message" rows={5} placeholder="Describe exposed beams, raw concrete ideas, specific clearances, or custom weld layouts..." className="w-full text-white px-4 py-3 rounded-none border border-white/10 focus:outline-none focus:border-[#E07A5F] transition-colors resize-none bg-[#1E2022] font-sans text-sm"></textarea>
              </div>
              <button type="button" className="w-full py-4 mt-2 bg-[#E07A5F] hover:bg-[#C9644A] text-white font-bold rounded-none uppercase tracking-wider text-xs transition-colors shadow-lg font-sans flex items-center justify-center gap-2">
                Log Project Plan <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
