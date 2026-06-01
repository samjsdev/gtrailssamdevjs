import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Calendar as CalendarIcon, MessageSquare, Phone, MapPin, Send, Sparkles } from 'lucide-react';

export default async function ContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const { clinic } = data;

  return (
    <div className="text-slate-900 min-h-screen pt-24 pb-32 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        {/* Page Hero Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] text-[#0084FF] uppercase">GET IN TOUCH</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 font-fustat">Visit Our Studio</h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed">Let's collaborate on your custom interior spaces. Reach out to book a walkthrough or request a customized scoping checklist.</p>
        </section>

        {/* Split Contact Columns */}
        <div className="grid lg:grid-cols-12 gap-12 items-start pt-8">
          {/* Left Column: Coordinates details */}
          <div className="lg:col-span-5 space-y-8 bg-white p-8 md:p-12 rounded-4xl border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0084FF]/5 rounded-bl-full -z-0"></div>
            
            <div className="font-bold flex items-center gap-3 mb-8 text-2xl relative z-10 font-fustat">
              <Sparkles className="text-[#0084FF] w-6 h-6 shrink-0"/> Design Coordinates
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 border border-slate-200">
                  <MapPin className="w-5 h-5 text-[#0084FF]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Showroom Location</h4>
                  <p className="text-sm text-slate-900 font-semibold mt-1 leading-relaxed">
                    {clinic.address?.full || '1/20, Anna Street, Velachery - Tambaram Main Rd, Pallikaranai, Chennai, Tamil Nadu 600100'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 border border-slate-200">
                  <Phone className="w-5 h-5 text-[#0084FF]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Consultation</h4>
                  <p className="text-sm text-slate-900 font-semibold mt-1">
                    <a href={`tel:${clinic.contact?.phone || ''}`} className="hover:text-[#0084FF] transition-colors">
                      {clinic.contact?.phone || 'Contact Number'}
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 font-light mt-0.5">Mon-Sat · 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl relative z-10 mt-8">
              <div>
                <h4 className="font-bold text-slate-900">Chat on WhatsApp</h4>
                <p className="text-xs text-slate-500 mt-0.5">Instant design coordination.</p>
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
                    className="bg-[#25D366] hover:bg-[#1db954] text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-xs uppercase tracking-wider"
                  >
                    Chat Now
                  </a>
                );
              })()}
            </div>
          </div>

          {/* Right Column: Native enquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-4xl border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div className="font-bold flex items-center gap-3 mb-8 text-2xl relative z-10 font-fustat">
              <MessageSquare className="text-[#0084FF] w-6 h-6 shrink-0"/> Send a Message
            </div>
            
            <form className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">Full Name</label>
                <input type="text" id="fullName" placeholder="Your name" className="w-full text-slate-900 px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0084FF] focus:border-transparent transition-all bg-slate-50 font-sans text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">Email Address</label>
                <input type="email" id="email" placeholder="you@company.com" className="w-full text-slate-900 px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0084FF] focus:border-transparent transition-all bg-slate-50 font-sans text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">Project Details</label>
                <textarea id="message" rows={5} placeholder="Describe your dream space, specific challenges, or modular kitchen ideas..." className="w-full text-slate-900 px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0084FF] focus:border-transparent transition-all resize-none bg-slate-50 font-sans text-sm"></textarea>
              </div>
              <button type="button" className="w-full py-4 mt-2 bg-[#0084FF] hover:bg-[#0070DA] text-white font-bold rounded-xl transition-all duration-300 shadow-md shadow-[#0084FF]/10 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] uppercase tracking-widest text-xs">
                Request a Proposal <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
