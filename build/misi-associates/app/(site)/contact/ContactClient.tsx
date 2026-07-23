'use client';

import { useEffect, useRef } from 'react';
import { useTemplateData } from '../context/TemplateContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Contact() {
  const { data } = useTemplateData();
  const contact = data.contact || {};
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Animations (Matching other pages)
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from('.header-title', {
        y: 50,
        opacity: 0,
        duration: 1.2
    }, '-=0.8')
    .from('.header-desc', {
        y: 30,
        opacity: 0,
        duration: 1
    }, '-=0.8');
    
    // Fade in main content elements
    // Fade in main content elements
    gsap.fromTo('.contact-content > *', 
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.5,
            clearProps: 'all' // Ensure cleanup after animation
        }
    );

  }, { scope: containerRef });

  useEffect(() => {

    // Tally embed script
    const d = document;
    const w = "https://tally.so/widgets/embed.js";
    const v = function() {
      if (typeof (window as any).Tally !== "undefined") {
        (window as any).Tally.loadEmbeds();
      } else {
        d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e: any) {
          e.src = e.dataset.tallySrc;
        }));
      }
    };

    if (typeof (window as any).Tally !== "undefined") {
      v();
    } else if (d.querySelector('script[src="' + w + '"]') == null) {
      const s = d.createElement("script");
      s.src = w;
      s.onload = v;
      s.onerror = v;
      d.body.appendChild(s);
    }
  }, []);

  return (
    <div ref={containerRef} className="tw-page bg-[#f8fafc] overflow-hidden min-h-screen relative">
      
       {/* Background - Soft Blue Gradient Match Home */}
       <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#eaf6ff] via-[#e2f1ff] to-[#f0f9ff] opacity-100 pointer-events-none" />

       {/* Massive Background Watermark */}
       <div className="absolute top-[2%] left-0 right-0 z-0 overflow-hidden pointer-events-none select-none flex justify-center">
          <div aria-hidden="true" className="text-[18vw] leading-none font-bold text-white opacity-40 text-center uppercase tracking-tighter whitespace-nowrap"
              style={{ 
                  textShadow: '0 4px 20px rgba(186, 219, 255, 0.4)',
                  WebkitTextStroke: '2px rgba(255,255,255,0.8)'
              }}>
            CONTACT US
          </div>
       </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 pt-32 pb-20 relative z-10">
        
        {/* Header - Standardized Style */}
        <header className="mb-24 text-center">

          <h1 className="header-title text-5xl md:text-7xl font-light leading-[1.1] text-slate-900 mb-8" style={{ fontFamily: 'var(--serif-font)' }}>
            Contact <span className="italic text-blue-600">{data?.clinic?.name || "Us"}</span>
          </h1>
          <p className="header-desc max-w-2xl mx-auto text-slate-600 text-xl font-light leading-relaxed">
            We are here to help. Send us a message or find our location below.
          </p>
        </header>

        <div className="contact-content flex flex-col gap-12">
          {/* Branch Offices Section */}
          <div className="grid md:grid-cols-3 gap-6">
            {(data?.clinic?.branches || [
              {
                city: "Chennai",
                address: "S3 Second Floor, Subam 9/5, College Road, Nungambakkam, Chennai",
                phone: "+91 82200 27117"
              },
              {
                city: "Madurai",
                address: "31, Melur Main Road, First Floor, Above ICICI Bank, K.K. Nagar, Madurai",
                phone: "+91 82200 27117"
              },
              {
                city: "Ramanathapuram",
                address: "19/27, First Floor, Thasin Complex, R.R. Sethupathy Nagar, Ramanathapuram",
                phone: "+91 82200 27117"
              }
            ]).map((branch: any, idx: number) => (
              <div key={idx} className="tw-glass p-8 rounded-[28px] border border-white/60 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between bg-white/70">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600">{branch.city} BRANCH</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{branch.city}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{branch.address}</p>
                </div>
                <a href={`tel:${(branch.phone || '+918220027117').replace(/[^0-9+]/g, '')}`} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-md">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call +91 82200 27117
                </a>
              </div>
            ))}
          </div>

          {/* Bottom Section: Grid for Form and Map */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Tally Form */}
            <section className="tw-glass rounded-[32px] p-8 md:p-10 border border-white/60 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-80" />
              
               <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Send a Message</h2>
                  <span className="text-xs font-mono text-indigo-500 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">FORM_ID: MSG-01</span>
               </div>

               <div className="min-h-[400px]">
                  <iframe 
                    data-tally-src="https://tally.so/embed/wL69e1?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
                    loading="lazy" 
                    width="100%" 
                    height="370" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0} 
                    title="Contact form"
                    className="w-full"
                  ></iframe>
               </div>
            </section>

             {/* Right Column: Google Map */}
            <section className="tw-glass rounded-[32px] p-8 md:p-10 border border-white/60 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-80" />
              
               <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Visit Us</h2>
                   <span className="text-xs font-mono text-teal-600 px-3 py-1 bg-teal-50 rounded-full border border-teal-100">LOC: CHENNAI</span>
               </div>

               <div className="w-full h-[370px] overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 relative">
                  <iframe
                    src={contact?.map?.embedUrl || `https://www.google.com/maps?q=${encodeURIComponent(data?.clinic?.address?.full || contact?.footer?.text?.[6] || 'New York, NY')}&output=embed`}
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clinic map"
                    allowFullScreen
                  />
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
