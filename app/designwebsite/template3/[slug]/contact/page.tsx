
import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Calendar as CalendarIcon, MessageSquare } from 'lucide-react';

export default async function ContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  return (
    <div className="text-slate-900 min-h-screen pt-24 pb-32 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] text-[#0084FF] uppercase">GET IN TOUCH</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900">Visit Our Studio</h1>
          <p className="text-xl text-slate-500 font-light">Book a consultation or drop us a message. Let us bring your vision to life.</p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 items-start pt-8">
          <div className="bg-white p-8 md:p-12 rounded-4xl border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#0084FF]/5 rounded-bl-full -z-0"></div>
             <div className="font-bold flex items-center gap-3 mb-8 text-2xl relative z-10"><CalendarIcon className="text-[#0084FF] w-8 h-8"/> Book a Consultation</div>
             <div className="w-full aspect-[4/3] bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mb-8 relative z-10">
                <p className="text-slate-400 font-medium">Cal.com Widget Area</p>
             </div>
             <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl relative z-10">
               <div>
                 <h4 className="font-bold text-slate-900">Prefer WhatsApp?</h4>
                 <p className="text-sm text-slate-500">Fastest response.</p>
               </div>
               <a href="https://wa.me/919962316499" target="_blank" className="bg-[#25D366] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-[#1EBE5A] transition-colors">Chat on WhatsApp</a>
             </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-4xl border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden">
             <div className="font-bold flex items-center gap-3 mb-8 text-2xl relative z-10"><MessageSquare className="text-[#0084FF] w-8 h-8"/> Send a Message</div>
             <div className="w-full h-[600px] bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden relative z-10 flex text-center items-center justify-center">
                <iframe
                  data-tally-src="https://tally.so/embed/wL69e1?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                  loading="lazy"
                  width="100%"
                  height="100%"
                  title="Contact Form"
                  className="border-0 w-full h-full"
                ></iframe>
                <script async src="https://tally.so/widgets/embed.js"></script>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
