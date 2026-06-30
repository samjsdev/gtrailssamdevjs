'use client';

import Image from 'next/image';
import { useTemplateData } from '../context/TemplateContext';

export default function ContactClient() {
  const { data } = useTemplateData();
  const contactData = data?.contact?.sections?.[0] || {};
  const formData = data?.contact?.sections?.[1] || {};

  const heroHeading = contactData.headings?.[0] || "Let's Talk Design.";
  const heroDesc = contactData.text?.[0] || 'Ready to transform your space? Get in touch with our team of experts to discuss your vision, process, and next steps.';

  const officeLabel = contactData.headings?.[1] || 'Office';
  const phoneLabel = contactData.headings?.[2] || 'Phone';
  const emailLabel = contactData.headings?.[3] || 'Email';

  const address = data?.clinic?.address?.full || contactData.text?.[1] || '123 Design Boulevard, Creative District, NY 10001';
  const rawPhone = data?.clinic?.contact?.phone || contactData.text?.[2];
  const phone = (rawPhone && /\d/.test(rawPhone)) ? rawPhone : '+1 (555) 123-4567';
  const rawEmail = data?.clinic?.contact?.email || contactData.text?.[3];
  const email = (rawEmail && rawEmail.includes('@')) ? rawEmail : 'hello@yourcompany.com';

  const contactImage = data?.media?.clinicImages?.[0] || contactData.image_sources?.[0] || '/images/stock/1c7b75e9.webp';

  const formHeading = formData.headings?.[0] || 'Send a Message';
  const formDesc = formData.text?.[0] || "We'll get back to you within 24 hours.";
  
  const fNameLabel = formData.text?.[1] || 'First Name';
  const lNameLabel = formData.text?.[2] || 'Last Name';
  const emailInputLabel = formData.text?.[3] || 'Email Address';
  const projectTypeLabel = formData.text?.[4] || 'Project Type';
  const projectTypeOpt0 = formData.text?.[5] || 'Select a project type...';
  const projectTypeOpt1 = formData.text?.[6] || 'Residential Design';
  const projectTypeOpt2 = formData.text?.[7] || 'Commercial / Office';
  const projectTypeOpt3 = formData.text?.[8] || 'Full Renovation';
  const projectTypeOpt4 = formData.text?.[9] || 'Design Consultation';
  const msgLabel = formData.text?.[10] || 'Message';
  const btnLabel = formData.text?.[11] || 'Send Message';

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-white">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)]">
        
        {/* Left Side: Info & Image */}
        <div className="relative w-full lg:w-1/2 min-h-[500px] lg:min-h-full flex items-center justify-center p-8 lg:p-16">
          <Image 
            src={contactImage} 
            alt="Contact Us" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#2b347b]/80 mix-blend-multiply"></div>
          
          <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[40px] text-white shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight whitespace-pre-line">{heroHeading}</h1>
            <p className="text-white/80 leading-relaxed mb-10">
              {heroDesc}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  📍
                </div>
                <div>
                  <h3 className="font-bold mb-1">{officeLabel}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{address}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  📞
                </div>
                <div>
                  <h3 className="font-bold mb-1">{phoneLabel}</h3>
                  <p className="text-white/70 text-sm">{phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  ✉️
                </div>
                <div>
                  <h3 className="font-bold mb-1">{emailLabel}</h3>
                  <p className="text-white/70 text-sm">{email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-lg">
            <h2 className="text-3xl font-bold text-[#1A1D27] mb-2">{formHeading}</h2>
            <p className="text-gray-500 mb-10">{formDesc}</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-[#1A1D27]">{fNameLabel}</label>
                  <input type="text" id="firstName" className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] border border-gray-200 focus:outline-none focus:border-[#2b347b] focus:ring-1 focus:ring-[#2b347b] transition-all" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-[#1A1D27]">{lNameLabel}</label>
                  <input type="text" id="lastName" className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] border border-gray-200 focus:outline-none focus:border-[#2b347b] focus:ring-1 focus:ring-[#2b347b] transition-all" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-[#1A1D27]">{emailInputLabel}</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] border border-gray-200 focus:outline-none focus:border-[#2b347b] focus:ring-1 focus:ring-[#2b347b] transition-all" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="projectType" className="text-sm font-semibold text-[#1A1D27]">{projectTypeLabel}</label>
                <select id="projectType" className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] border border-gray-200 focus:outline-none focus:border-[#2b347b] focus:ring-1 focus:ring-[#2b347b] transition-all text-gray-700">
                  <option value="">{projectTypeOpt0}</option>
                  <option value="residential">{projectTypeOpt1}</option>
                  <option value="commercial">{projectTypeOpt2}</option>
                  <option value="renovation">{projectTypeOpt3}</option>
                  <option value="consultation">{projectTypeOpt4}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-[#1A1D27]">{msgLabel}</label>
                <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-xl bg-[#f8f9fa] border border-gray-200 focus:outline-none focus:border-[#2b347b] focus:ring-1 focus:ring-[#2b347b] transition-all resize-none" placeholder="Tell us about your project..."></textarea>
              </div>

              <button type="button" className="w-full py-4 bg-[#2b347b] text-white rounded-xl font-bold tracking-wide hover:bg-[#1f265c] transition-colors shadow-lg hover:shadow-xl">
                {btnLabel}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
