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
    <div id="consultation-form" className="w-full bg-white border border-[#1E2322]/15 rounded-sm shadow-md p-6 sm:p-12">
      {submitted ? (
        <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-[#C85A32] text-white flex items-center justify-center mx-auto rounded-sm shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#C49B45]">
              TECHNICAL DOSSIER DISPATCHED
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-[#1E2322] tracking-tight">
              CONSULTATION SCHEDULED
            </h3>
            <p className="text-sm font-sans text-[#1E2322]/80 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#1E2322]">{formData.name}</strong>. A Senior Civil Project Engineer and Architectural Consultant will contact you within 2 working hours.
            </p>
          </div>

          <div className="p-4 bg-[#F8F7F4] border border-[#1E2322]/15 rounded-sm max-w-md mx-auto font-mono text-xs text-left space-y-1">
            <div className="flex justify-between">
              <span className="text-[#1E2322]/70">REFERENCE ID:</span>
              <span className="font-bold text-[#C85A32]">CIVIL-{(Math.random() * 90000 + 10000).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1E2322]/70">ASSIGNED DIVISION:</span>
              <span className="font-bold text-[#1E2322]">{formData.serviceType.toUpperCase().replace('_', ' ')}</span>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-[#1E2322] hover:bg-[#C85A32] text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-colors"
          >
            SUBMIT ANOTHER PROJECT INQUIRY
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Heading & Assurances */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181C1B] text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-[0.2em] rounded-sm">
                <HardHat className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>TECHNICAL SITE INSPECTION</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold uppercase text-[#1E2322] tracking-tight leading-[0.95]">
                DISCUSS YOUR RESIDENTIAL VISION WITH OUR <span className="text-[#C85A32]">ENGINEERING LEADERSHIP</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#1E2322]/80 font-sans leading-relaxed">
                Whether you have a vacant plot ready for turnkey civil execution, or require innovative 3D architectural floor schemes and luxury interiors, our licensed architects and senior structural engineers provide itemized, fixed-price clarity.
              </p>
            </div>

            {/* Direct Connect Options */}
            <div className="space-y-3 pt-4 border-t border-[#1E2322]/15">
              <div className="p-4 bg-[#F8F7F4] border border-[#1E2322]/15 rounded-sm space-y-2">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#C49B45] block">
                  URGENT OR ON-SITE INQUIRIES
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E2322] text-white font-mono font-medium text-xs uppercase tracking-wider rounded-sm hover:bg-[#C85A32] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>CALL: {phone}</span>
                  </a>

                  <a
                    href={walink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white font-mono font-medium text-xs uppercase tracking-wider rounded-sm hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WHATSAPP CHAT</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#1E2322]/80 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#C85A32]" />
                <span>100% Free Site Survey & Structural Feasibility Review</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Inputs */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#1E2322]">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    placeholder="e.g. Anand Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8F7F4] text-[#1E2322] font-mono text-xs border border-[#1E2322]/20 rounded-sm focus:outline-none focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#1E2322]">
                    Mobile Contact Number *
                  </label>
                  <input
                    id="phone"
                    required
                    type="tel"
                    placeholder="+91 98400 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8F7F4] text-[#1E2322] font-mono text-xs border border-[#1E2322]/20 rounded-sm focus:outline-none focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#1E2322]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="anand@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8F7F4] text-[#1E2322] font-mono text-xs border border-[#1E2322]/20 rounded-sm focus:outline-none focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="location" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#1E2322]">
                    Plot / Site Location *
                  </label>
                  <input
                    id="location"
                    required
                    type="text"
                    placeholder="e.g. ECR / Anna Nagar / Whitefield"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8F7F4] text-[#1E2322] font-mono text-xs border border-[#1E2322]/20 rounded-sm focus:outline-none focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="serviceType" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#1E2322]">
                    Scope of Requirement *
                  </label>
                  <select
                    id="serviceType"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8F7F4] text-[#1E2322] font-mono text-xs border border-[#1E2322]/20 rounded-sm focus:outline-none focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:bg-white transition-all"
                  >
                    <option value="turnkey_construction">Turnkey Residential Civil Construction</option>
                    <option value="architectural_design">Architectural 3D BIM & Scheme Plans</option>
                    <option value="interior_fitouts">Luxury Interior Fitouts & Millwork</option>
                    <option value="complete_integrated">Complete Integrated (Design + Civil + Interior)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="approxArea" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#1E2322]">
                    Approx. Built-up Area (Sq.Ft)
                  </label>
                  <input
                    id="approxArea"
                    type="text"
                    placeholder="e.g. 2500"
                    value={formData.approxArea}
                    onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8F7F4] text-[#1E2322] font-mono text-xs border border-[#1E2322]/20 rounded-sm focus:outline-none focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="notes" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#1E2322]">
                  Project Specifications & Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Share details about your timeline, number of floors, style preferences (Contemporary, Classical, Minimalist), etc."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8F7F4] text-[#1E2322] font-mono text-xs border border-[#1E2322]/20 rounded-sm focus:outline-none focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C85A32] hover:bg-[#B34D28] text-white font-semibold text-xs uppercase tracking-widest rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
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
