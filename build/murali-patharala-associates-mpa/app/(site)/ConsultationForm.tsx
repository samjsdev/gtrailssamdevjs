'use client';

import { useState } from 'react';
import { 
  Compass, Phone, MessageSquare, CheckCircle2, 
  ArrowRight, ShieldCheck, Mail, MapPin, Sparkles, Clock,
  Building2, Home, Check
} from 'lucide-react';

interface ConsultationFormProps {
  clinicName?: string;
  phone?: string;
}

export default function ConsultationForm({
  phone = '98410 98490',
}: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    serviceType: 'turnkey_construction',
    approxArea: '2400',
    consultationMode: 'site_visit',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const rawPhone = phone.replace(/\D/g, '') || '9841098490';
  const cleanPhone = rawPhone.startsWith('91') ? rawPhone : `91${rawPhone.replace(/^0+/, '')}`;
  
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi ARCH Foundations & Murali Patharala Associates,\nI would like to book a Free Consultation:\n- Name: ${formData.name || 'Prospective Homeowner'}\n- Service: ${formData.serviceType.replace('_', ' ')}\n- Site Location: ${formData.location || 'Chennai'}\n- Approx Area: ${formData.approxArea} Sq.Ft\n- Mode: ${formData.consultationMode}\nThank you!`
  )}`;

  return (
    <div id="consultation-form" className="w-full bg-white border border-stone-200 rounded-lg shadow-lg p-6 sm:p-12 font-sans">
      {submitted ? (
        <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-md bg-gradient-to-br from-[#E64D16] to-[#C93F0F] text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E64D16]">
              Consultation Scheduled &bull; Reference MPA-{(Math.random() * 90000 + 10000).toFixed(0)}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Site Inspection Request Received
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
              Thank you, <strong className="font-semibold text-stone-900">{formData.name}</strong>. A Senior Engineer or Principal Architect from ARCH Foundations &amp; MPA will contact you within 2 working hours to confirm your site survey appointment.
            </p>
          </div>

          <div className="p-5 bg-stone-50 border border-stone-200 rounded-md max-w-md mx-auto text-xs text-left space-y-2 font-normal">
            <div className="flex justify-between">
              <span className="text-stone-500">Service:</span>
              <span className="font-semibold text-stone-900 capitalize">{formData.serviceType.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Site Location:</span>
              <span className="font-semibold text-stone-900">{formData.location || 'Chennai Area'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Approx. Built-up Area:</span>
              <span className="font-semibold text-stone-900">{formData.approxArea} Sq.Ft</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-sm flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Connect on WhatsApp</span>
            </a>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-stone-900 hover:bg-[#E64D16] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Trust Assurances (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs font-bold text-[#E64D16] tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Technical Audit</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight leading-snug">
                Book Your Free Plot Survey &amp; <span className="text-[#E64D16]">Architectural Feasibility</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                Meet our senior civil engineers and architects in Anna Nagar East or request an on-site visit to your plot anywhere in Chennai. We analyze soil conditions, CMDA/DTCP setback regulations, Vastu alignment, and give you an itemized BOQ.
              </p>
            </div>

            {/* Assurances List */}
            <div className="space-y-3.5 pt-2 border-t border-stone-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 text-[#E64D16] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">100% Fixed-Price Contract</h4>
                  <p className="text-[11px] text-stone-500 leading-normal">
                    Complete itemized BOQ with zero hidden costs or budget creep during execution.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 text-[#E64D16] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Dedicated Site Engineer</h4>
                  <p className="text-[11px] text-stone-500 leading-normal">
                    Full-time in-house engineering supervision with 425+ quality checklist protocols.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 text-[#E64D16] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">10-Year Structural Guarantee</h4>
                  <p className="text-[11px] text-stone-500 leading-normal">
                    Legal structural warranty backed by primary TMT steel &amp; 53-grade certified concrete.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Studio Contact Bar */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-white border border-stone-200 flex items-center justify-center text-[#E64D16] shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400">Direct Studio Line</div>
                  <div className="text-sm font-bold text-stone-900">+91 98410 98490</div>
                </div>
              </div>
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi ARCH Foundations & Murali Patharala Associates, I would like to schedule a free site consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Lead Form (7 cols) */}
          <div className="lg:col-span-7 bg-stone-50/60 p-6 sm:p-8 border border-stone-200 rounded-md">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">
                    Full Name <span className="text-[#E64D16]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. R. Karthik"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-xs text-stone-900 focus:outline-hidden focus:border-[#E64D16] focus:ring-1 focus:ring-[#E64D16] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">
                    Mobile Number <span className="text-[#E64D16]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98410 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-xs text-stone-900 focus:outline-hidden focus:border-[#E64D16] focus:ring-1 focus:ring-[#E64D16] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. karthik@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-xs text-stone-900 focus:outline-hidden focus:border-[#E64D16] focus:ring-1 focus:ring-[#E64D16] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">
                    Site Location in Chennai <span className="text-[#E64D16]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anna Nagar, ECR, Kilpauk, Mogappair"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-xs text-stone-900 focus:outline-hidden focus:border-[#E64D16] focus:ring-1 focus:ring-[#E64D16] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Project Service Required</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-xs text-stone-900 focus:outline-hidden focus:border-[#E64D16] focus:ring-1 focus:ring-[#E64D16] transition-all"
                  >
                    <option value="turnkey_construction">Turnkey Home Construction (Full Building)</option>
                    <option value="architectural_design">Architectural 3D Elevation &amp; 2D Plans</option>
                    <option value="luxury_interiors">Luxury Interior Design &amp; Modular Joinery</option>
                    <option value="both_construction_interior">Both Construction &amp; Bespoke Interior</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Approx Built-up / Plot Area</label>
                  <select
                    value={formData.approxArea}
                    onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-xs text-stone-900 focus:outline-hidden focus:border-[#E64D16] focus:ring-1 focus:ring-[#E64D16] transition-all"
                  >
                    <option value="1200">1,000 – 1,500 Sq.Ft</option>
                    <option value="2000">1,500 – 2,500 Sq.Ft</option>
                    <option value="3200">2,500 – 3,500 Sq.Ft</option>
                    <option value="4500">3,500 – 5,000+ Sq.Ft (Villa)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">Preferred Consultation Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'site_visit', label: 'On-Site Plot Visit' },
                    { id: 'studio_visit', label: 'Anna Nagar Studio' },
                    { id: 'phone_call', label: 'Phone Consultation' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, consultationMode: m.id })}
                      className={`py-2 px-2 text-center rounded-md text-[11px] font-semibold border transition-all ${
                        formData.consultationMode === m.id
                          ? 'bg-[#242624] text-white border-[#1A1B1A]'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">Specific Requirements or Questions (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking to construct a G+1 independent duplex villa on a 30x40 plot in Anna Nagar East..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-md text-xs text-stone-900 focus:outline-hidden focus:border-[#E64D16] focus:ring-1 focus:ring-[#E64D16] transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-bold text-xs uppercase tracking-widest rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Request Free Site Survey &amp; Quote</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <div className="text-center text-[11px] text-stone-500">
                🔒 Your details are 100% confidential. No spam or unsolicited calls guaranteed.
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
