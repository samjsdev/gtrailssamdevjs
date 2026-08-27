'use client';

import { useState } from 'react';
import { 
  HardHat, Phone, MessageSquare, CheckCircle2, 
  ArrowRight, ShieldCheck, Mail, MapPin, Sparkles, Clock
} from 'lucide-react';

interface ConsultationFormProps {
  clinicName: string;
  phone: string;
}

export default function ConsultationForm({ clinicName, phone }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    serviceType: 'turnkey_construction',
    approxArea: '2400',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const waphone = phone.replace(/\D/g, '') || '918110000384';
  const walink = `https://wa.me/${waphone}?text=${encodeURIComponent(`Hi, I'm interested in an Architectural & Civil Construction consultation for my property with ${clinicName}.`)}`;

  return (
    <div id="consultation-form" className="w-full bg-[#FFFFFF] border-4 border-[#252A29] shadow-[8px_8px_0px_#252A29] p-6 sm:p-12">
      {submitted ? (
        <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-[#E94B26] text-[#F4F3EE] flex items-center justify-center mx-auto border-2 border-[#111111] shadow-[4px_4px_0px_#111111]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C8A84E]">
              TECHNICAL DOSSIER DISPATCHED
            </span>
            <h3 className="text-3xl font-black uppercase text-[#252A29] tracking-tight">
              CONSULTATION SCHEDULED
            </h3>
            <p className="text-sm font-sans text-[#252A29]/80 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#252A29]">{formData.name}</strong>. A Senior Civil Project Engineer and Architectural Consultant will contact you within 2 working hours.
            </p>
          </div>

          <div className="p-4 bg-[#F4F3EE] border-2 border-[#252A29] max-w-md mx-auto font-mono text-xs text-left space-y-1">
            <div className="flex justify-between">
              <span className="text-[#252A29]/70">REFERENCE ID:</span>
              <span className="font-bold text-[#E94B26]">CIVIL-{(Math.random() * 90000 + 10000).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#252A29]/70">ASSIGNED DIVISION:</span>
              <span className="font-bold text-[#252A29]">{formData.serviceType.toUpperCase().replace('_', ' ')}</span>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-[#252A29] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] hover:bg-[#E94B26] transition-colors"
          >
            SUBMIT ANOTHER PROJECT INQUIRY
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Heading & Assurances */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-mono font-bold uppercase tracking-[0.2em] border border-[#111111]">
                <HardHat className="w-3.5 h-3.5 text-[#E94B26]" />
                <span>TECHNICAL SITE INSPECTION</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#252A29] tracking-tight leading-[0.95]">
                DISCUSS YOUR RESIDENTIAL VISION WITH OUR <span className="text-[#E94B26]">ENGINEERING LEADERSHIP</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#252A29]/80 font-sans leading-relaxed">
                Whether you have a vacant plot ready for turnkey civil execution, or require innovative 3D architectural floor schemes and luxury interiors, our licensed architects and senior structural engineers provide itemized, fixed-price clarity.
              </p>
            </div>

            {/* Direct Connect Options */}
            <div className="space-y-3 pt-4 border-t-2 border-[#252A29]/20">
              <div className="p-4 bg-[#F4F3EE] border-2 border-[#252A29] space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C8A84E] block">
                  URGENT OR ON-SITE INQUIRIES
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#252A29] text-[#F4F3EE] font-mono font-bold text-xs uppercase tracking-wider border border-[#111111] hover:bg-[#E94B26] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E94B26]" />
                    <span>CALL: {phone}</span>
                  </a>

                  <a
                    href={walink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-[#111111] font-mono font-bold text-xs uppercase tracking-wider border border-[#111111] hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WHATSAPP CHAT</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#252A29]/80 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#E94B26]" />
                <span>100% Free Site Survey & Structural Feasibility Review</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Inputs */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#252A29]">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    placeholder="e.g. Anand Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F3EE] text-[#252A29] font-mono text-xs border-2 border-[#252A29] focus:outline-none focus:border-[#E94B26] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#252A29]">
                    Mobile Contact Number *
                  </label>
                  <input
                    id="phone"
                    required
                    type="tel"
                    placeholder="+91 98400 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F3EE] text-[#252A29] font-mono text-xs border-2 border-[#252A29] focus:outline-none focus:border-[#E94B26] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#252A29]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="anand@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F3EE] text-[#252A29] font-mono text-xs border-2 border-[#252A29] focus:outline-none focus:border-[#E94B26] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="location" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#252A29]">
                    Plot / Site Location *
                  </label>
                  <input
                    id="location"
                    required
                    type="text"
                    placeholder="e.g. ECR / Anna Nagar / Whitefield"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F3EE] text-[#252A29] font-mono text-xs border-2 border-[#252A29] focus:outline-none focus:border-[#E94B26] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="serviceType" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#252A29]">
                    Scope of Requirement *
                  </label>
                  <select
                    id="serviceType"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F3EE] text-[#252A29] font-mono text-xs border-2 border-[#252A29] focus:outline-none focus:border-[#E94B26] focus:bg-[#FFFFFF] transition-colors"
                  >
                    <option value="turnkey_construction">Turnkey Residential Civil Construction</option>
                    <option value="architectural_design">Architectural 3D BIM & Scheme Plans</option>
                    <option value="interior_fitouts">Luxury Interior Fitouts & Millwork</option>
                    <option value="complete_integrated">Complete Integrated (Design + Civil + Interior)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="approxArea" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#252A29]">
                    Approx. Built-up Area (Sq.Ft)
                  </label>
                  <input
                    id="approxArea"
                    type="text"
                    placeholder="e.g. 2500"
                    value={formData.approxArea}
                    onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F3EE] text-[#252A29] font-mono text-xs border-2 border-[#252A29] focus:outline-none focus:border-[#E94B26] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="notes" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#252A29]">
                  Project Specifications & Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Share details about your timeline, number of floors, style preferences (Contemporary, Classical, Minimalist), etc."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F4F3EE] text-[#252A29] font-mono text-xs border-2 border-[#252A29] focus:outline-none focus:border-[#E94B26] focus:bg-[#FFFFFF] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#E94B26] hover:bg-[#d43d1a] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
              >
                <HardHat className="w-4 h-4" />
                <span>DISPATCH CONSULTATION & QUOTE REQUEST</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
