import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond } from 'next/font/google';
import { 
  Sparkles, Phone, Send
} from 'lucide-react';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

export default async function ContactPage({ params }: { params?: any }) {
  const slug = ''; // standalone: slug not needed for data loading
  const data = await readSourceConfig(undefined, 'template2');
  if (!data) return notFound();

  const { clinic } = data;

  return (
    <div className="font-sans text-[#2A2421] bg-[#F7F4EF] min-h-screen pb-24 space-y-16">
      {/* Editorial Hero Section */}
      <section className="relative pt-20 pb-8 text-center space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
          CONNECT WITH US
        </div>
        
        <h1 className={`${cormorant.className} text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-tight text-[#2A2421]`}>
          Start Your <span className="text-[#8E7056] italic">Design Journey</span>
        </h1>
        
        <p className="text-sm sm:text-base text-[#2A2421]/90 font-light leading-relaxed max-w-xl mx-auto">
          Visit our Pallikaranai studio or drop us a message below. Let our design coordination team bring your custom interior vision to life.
        </p>
      </section>

      {/* Premium Split Contact Section with Form */}
      <section className="bg-white rounded-[3rem] px-8 sm:px-12 lg:px-16 py-16 border border-[#EAE3D8]/50 shadow-sm">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Client Contact Information & Details */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-4">
                 <div className="flex items-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
                   GET IN TOUCH
                 </div>
                 <h2 className={`${cormorant.className} text-4xl sm:text-5xl font-light tracking-wide text-[#2A2421] leading-tight`}>
                   Let's Collaborate <br />on Your <span className="text-[#8E7056] italic">Dream Space</span>
                 </h2>
                 <p className="text-[#2A2421]/90 font-light text-sm leading-relaxed">
                   Have a design project in mind? Sourcing modular kitchen ideas? Fill out our structural query sheet, or reach out directly to coordinate your consultation.
                 </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-[#EAE3D8]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8E7056]/10 flex items-center justify-center text-[#8E7056] shrink-0 border border-[#8E7056]/20">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#8E7056]">Showroom Location</h4>
                    <p className="text-xs text-[#2A2421]/90 leading-relaxed font-medium mt-1">
                      {clinic.address?.full || '1/20, Anna Street, Velachery - Tambaram Main Rd, Pallikaranai, Chennai, Tamil Nadu 600100'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8E7056]/10 flex items-center justify-center text-[#8E7056] shrink-0 border border-[#8E7056]/20">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#8E7056]">Direct Coordination</h4>
                    <p className="text-xs text-[#2A2421]/90 leading-relaxed font-semibold mt-1">
                      <a href={`tel:${clinic.contact?.phone || ''}`} className="hover:text-[#8E7056] transition-colors">
                        {clinic.contact?.phone || 'Contact Number'}
                      </a>
                    </p>
                    <p className="text-[10px] text-[#2A2421]/70 font-light mt-0.5">Mon-Sat · 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              {(() => {
                const waPhone = '919578784758';
                const waText = `Hi, I'm interested in booking an interior design consultation at ${clinic.name || 'your studio'}!`;
                const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;
                return (
                  <div className="pt-6 flex flex-wrap gap-4">
                    <a 
                      href={`tel:${clinic.contact?.phone || ''}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A2421] hover:bg-[#8E7056] text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 shadow-sm"
                    >
                      Call Directly
                    </a>
                    <a 
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1db954] text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 shadow-sm"
                    >
                      WhatsApp Us
                    </a>
                  </div>
                );
              })()}
            </div>

            {/* Right Column: Dynamic Form */}
            <div className="lg:col-span-7 w-full">
              <form className="bg-[#F7F4EF]/50 rounded-3xl border border-[#EAE3D8]/80 p-8 sm:p-10 text-left space-y-6 shadow-xs">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-[10px] font-bold uppercase tracking-wider text-[#2A2421]/80">Full Name</label>
                  <input type="text" id="fullName" placeholder="Your name" className="w-full text-[#2A2421] px-5 py-3.5 rounded-2xl border border-[#EAE3D8] focus:outline-none focus:ring-2 focus:ring-[#8E7056] focus:border-transparent transition-all bg-white font-sans placeholder-[#2A2421]/50 text-sm" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-[#2A2421]/80">Email Address</label>
                  <input type="email" id="email" placeholder="you@company.com" className="w-full text-[#2A2421] px-5 py-3.5 rounded-2xl border border-[#EAE3D8] focus:outline-none focus:ring-2 focus:ring-[#8E7056] focus:border-transparent transition-all bg-white font-sans placeholder-[#2A2421]/50 text-sm" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-wider text-[#2A2421]/80">Project Details</label>
                  <textarea id="message" rows={4} placeholder="Describe your dream space, specific challenges, or modular kitchen ideas..." className="w-full text-[#2A2421] px-5 py-3.5 rounded-2xl border border-[#EAE3D8] focus:outline-none focus:ring-2 focus:ring-[#8E7056] focus:border-transparent transition-all resize-none bg-white font-sans placeholder-[#2A2421]/50 text-sm"></textarea>
                </div>
                <button type="button" className="w-full py-4 mt-2 bg-[#2A2421] hover:bg-[#8E7056] text-[#FAF8F5] font-bold uppercase tracking-widest text-[10px] rounded-2xl transition-all duration-300 shadow-md shadow-[#2A2421]/10 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]">
                  Request a Proposal <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
