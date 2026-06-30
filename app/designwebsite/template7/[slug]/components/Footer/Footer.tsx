import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTemplateData } from '../../context/TemplateContext';

const Footer = () => {
  const { data } = useTemplateData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 bg-slate-50 border-t border-slate-200 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-50"></div>
      <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-indigo-50/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 pr-0 lg:pr-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3">
                 <div className="relative w-10 h-10 flex items-center justify-center bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                    <span className="text-white font-bold text-xl">{(data?.clinic?.name || data?.navbar?.logo?.text || "W")[0]}</span>
                 </div>
                <span className="text-2xl font-bold text-slate-900 tracking-tight">{data?.clinic?.name || data?.navbar?.logo?.text || "Waring Interiors"}</span>
              </div>
            </Link>
            <p className="text-slate-600 leading-relaxed font-medium max-w-sm">
              {data?.clinic?.description || "Waring Interiors Design Studio. Redefining spaces with advanced design and a client-first approach. Experience the future of living today."}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-semibold text-emerald-700 tracking-wide uppercase">Accepting New Projects</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-6">Explore</h3>
            <ul className="flex flex-col gap-4">
              {['Home', 'About Us', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-slate-600 hover:text-blue-600 transition-colors font-medium text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 transition-all duration-300 h-[1px] bg-blue-600 mr-0 group-hover:mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 md:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-6">Services</h3>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'Space Planning', href: '/services' },
                { label: 'Color Consultation', href: '/services' },
                { label: 'Custom Furniture', href: '/services' },
                { label: 'Full Renovations', href: '/services' },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href} 
                    className="text-slate-600 hover:text-blue-600 transition-colors font-medium text-sm flex items-center group"
                  >
                     <span className="w-0 group-hover:w-2 transition-all duration-300 h-[1px] bg-blue-600 mr-0 group-hover:mr-2"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-2">Get in Touch</h3>
            
            <div className="flex flex-col gap-4">
              {(() => {
                const phone = data?.contact?.phone || '+1 (555) 123-4567';
                return (
               <a href={`tel:${phone}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Direct Line</p>
                    <p className="text-slate-900 font-bold group-hover:text-blue-700 transition-colors">{phone}</p>
                  </div>
               </a>
                );
              })()}

              {(() => {
                const email = data?.contact?.email || 'hello@yourcompany.com';
                return (
               <a href={`mailto:${email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Email</p>
                    <p className="text-slate-700 font-medium text-sm leading-relaxed truncate max-w-[150px]">
                      {email}
                    </p>
                  </div>
               </a>
                );
              })()}

              {data?.contact?.address && (
               <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mt-1 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Services Available In</p>
                    <p className="text-slate-700 font-medium text-sm leading-relaxed">
                      {data.contact.address}
                    </p>
                  </div>
               </div>
              )}

              {data?.contact?.website && (
               <a href={data.contact.website.startsWith('http') ? data.contact.website : `https://${data.contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Website</p>
                    <p className="text-slate-700 font-medium text-sm leading-relaxed">
                      {data.contact.website.replace(/^https?:\/\//, '')}
                    </p>
                  </div>
               </a>
              )}
            </div>

            <div className="flex gap-3 mt-2">
               {['facebook', 'instagram'].map((social) => (
                 <a key={social} href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all hover:scale-110" aria-label={`Follow us on ${social}`}>
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="2" /> {/* Placeholder icon */}
                    </svg>
                 </a>
               ))}
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © {currentYear} Waring Interiors Design Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
