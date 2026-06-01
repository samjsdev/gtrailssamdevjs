import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  Phone, MapPin, Send, Mail, Clock, Sparkles
} from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ContactPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { clinic } = data;

  const cleanName = cleanClinicName(clinic.name);

  const waPhone = clinic.contact?.phone?.replace(/\D/g, '') || '919751396117';
  const waText = `Hi, I'm interested in booking a design consultation at ${cleanName || 'your studio'}!`;
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="font-sans text-[#0A0A0A] bg-[#FCFAF6] min-h-screen selection:bg-[#C1FF72] selection:text-[#0A0A0A] scroll-smooth pb-28 space-y-16 text-left relative z-10">
      
      {/* Editorial Hero Section */}
      <section className="relative pt-28 pb-8 text-center space-y-6 max-w-4xl mx-auto px-8 relative z-20">
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72] animate-pulse"></span>
          <span className="text-[10px] font-bold text-[#0A0A0A]/60 tracking-[0.25em] uppercase">Connect With Us</span>
        </div>
        
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] font-light tracking-tight leading-[1.05] text-[#0A0A0A]">
          Start Your <span className="italic font-normal text-[#0A0A0A]/60 inline-block relative">Design Journey.<span className="absolute bottom-2 left-0 w-full h-[1.5px] bg-[#C1FF72]"></span></span>
        </h1>
        
        <p className="text-base sm:text-lg text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
          Visit our studio showroom location or leave a detailed inquiry below. Our principal design team will follow up for a private layout consultation.
        </p>
      </section>

      {/* Split Contact Section */}
      <section className="max-w-[90rem] mx-auto px-8 w-full relative z-20">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Direct Info & Booking Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <div className="w-8 h-px bg-[#0A0A0A]"></div>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#0A0A0A]/60">Get in Touch</span>
              </div>
              <h2 className="font-serif text-4xl font-normal text-[#0A0A0A] tracking-wide leading-snug">
                Let's Shape Your <span className="text-gray-400 italic">Dream Space</span>.
              </h2>
              <p className="text-xs md:text-sm text-gray-500 font-normal leading-relaxed">
                Have a design brief in mind? Need a modular kitchen or full turnkey villa renovation scoping? Share your details or connect instantly.
              </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-[#0A0A0A]/5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#0A0A0A]/5 flex items-center justify-center text-[#0A0A0A] shrink-0 shadow-sm">
                  <MapPin className="w-4.5 h-4.5 text-[#0A0A0A]" />
                </div>
                <div>
                  <h4 className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold">Studio Showroom</h4>
                  <p className="text-xs md:text-sm text-[#0A0A0A] leading-relaxed font-semibold mt-1">
                    {clinic.address?.full || 'Studio Location Address'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#0A0A0A]/5 flex items-center justify-center text-[#0A0A0A] shrink-0 shadow-sm">
                  <Phone className="w-4.5 h-4.5 text-[#0A0A0A]" />
                </div>
                <div>
                  <h4 className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold">Direct Inquiry Line</h4>
                  <p className="text-xs md:text-sm text-[#0A0A0A] font-bold mt-1">
                    <a href={`tel:${clinic.contact?.phone || ''}`} className="hover:text-[#C1FF72] transition-colors">
                      {clinic.contact?.phone || 'Contact Number'}
                    </a>
                  </p>
                  <p className="text-[9px] text-gray-400 font-semibold mt-0.5">Mon-Sat · 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Direct Instant Action Channels */}
            <div className="pt-8 flex flex-wrap gap-4 border-t border-[#0A0A0A]/5">
              <a 
                href={`tel:${clinic.contact?.phone || ''}`}
                className="px-8 py-4 rounded-full text-[#FCFAF6] bg-[#0A0A0A] hover:bg-transparent hover:text-[#0A0A0A] font-bold transition-all duration-500 text-[10px] tracking-widest uppercase shadow-sm border border-[#0A0A0A]"
              >
                Call Directly
              </a>
              <a 
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-full text-white bg-[#25D366] hover:bg-[#1db954] font-bold transition-all duration-300 text-[10px] tracking-widest uppercase shadow-lg flex items-center gap-2"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Right Column: Premium Form Mockup */}
          <div className="lg:col-span-7 w-full bg-white rounded-[2.5rem] border border-[#0A0A0A]/5 p-8 sm:p-12 space-y-6 shadow-xl relative">
            <h3 className="font-serif text-2xl font-normal text-[#0A0A0A] tracking-wide">Request a Design Consultation</h3>
            <p className="text-xs text-gray-500 font-normal leading-relaxed">
              Submit your room requirements below and our principal designers will coordinate a private review.
            </p>
            
            <form className="space-y-6 pt-4 border-t border-[#0A0A0A]/5">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-[9px] font-bold uppercase tracking-[0.25em] text-[#0A0A0A]/60">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter your full name" className="w-full text-gray-900 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C1FF72] focus:border-transparent transition-all bg-[#FCFAF6] font-normal text-xs md:text-sm shadow-inner" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[9px] font-bold uppercase tracking-[0.25em] text-[#0A0A0A]/60">Email Address</label>
                <input type="email" id="email" placeholder="you@example.com" className="w-full text-gray-900 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C1FF72] focus:border-transparent transition-all bg-[#FCFAF6] font-normal text-xs md:text-sm shadow-inner" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-[9px] font-bold uppercase tracking-[0.25em] text-[#0A0A0A]/60">Project Description</label>
                <textarea id="message" rows={4} placeholder="Tell us about your kitchen, bedroom, or full home design brief..." className="w-full text-gray-900 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C1FF72] focus:border-transparent transition-all resize-none bg-[#FCFAF6] font-normal text-xs md:text-sm shadow-inner"></textarea>
              </div>
              
              <button type="button" className="w-full py-4 mt-4 bg-[#0A0A0A] hover:bg-transparent text-white hover:text-[#0A0A0A] border border-[#0A0A0A] font-bold rounded-xl transition-all duration-500 shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] uppercase tracking-widest text-[10px]">
                Submit Project Brief <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
