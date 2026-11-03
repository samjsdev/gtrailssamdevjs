'use client';

import { useState } from 'react';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['600', '700'] });

interface LeadFormProps {
  clinicName?: string;
  phone?: string;
  defaultProject?: string;
}

export default function LeadForm({ clinicName, phone, defaultProject }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    typology: defaultProject || 'Independent Luxury Villa',
    area: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const waPhone = phone ? phone.replace(/\D/g, '') : '919310359993';
  const waMessage = `Hello ${clinicName || 'Atelier'}, my name is ${formData.name || 'a prospective client'}. I would like to schedule an architectural consultation for a ${formData.typology} (${formData.area || 'project area'} at ${formData.location || 'our site'}).`;
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-[#faf8f5] border border-[#141414]/15 p-6 sm:p-10 shadow-lg">
      <div className="mb-6">
        <span className="text-[10.5px] tracking-[0.25em] uppercase font-bold text-[#b89568]">
          Confidential Atelier Inquiry
        </span>
        <h3
          className={`${cinzel.className} mt-1.5 text-[24px] sm:text-[28px] font-bold text-[#141414] leading-tight`}
        >
          Initiate a Private Commission
        </h3>
        <p className="mt-2 text-[13.5px] text-[#5a544c] leading-relaxed">
          Share preliminary parameters of your plot or envisioned residence. Our principal architects will review feasibility within 24 hours.
        </p>
      </div>

      {submitted ? (
        <div className="py-8 text-center bg-[#f5f2ea] border border-[#141414]/10 p-6">
          <CheckCircle2 className="w-12 h-12 text-[#c5a47e] mx-auto mb-3" />
          <h4 className={`${cinzel.className} text-[20px] font-bold text-[#141414]`}>
            Inquiry Registered
          </h4>
          <p className="mt-2 text-[13px] text-[#5a544c] max-w-sm mx-auto">
            Thank you, {formData.name}. Our studio director will contact you directly to schedule an initial spatial briefing.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-[#141414] text-[#faf8f5] px-5 py-3 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-[#c5a47e] hover:text-[#141414] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect on WhatsApp Now</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10.5px] tracking-[0.18em] uppercase font-bold text-[#141414] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Anand Chandrasekar"
                className="w-full px-3.5 py-3 text-[13px] bg-white border border-[#141414]/15 focus:border-[#141414] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10.5px] tracking-[0.18em] uppercase font-bold text-[#141414] mb-1.5">
                Phone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 98400 12345"
                className="w-full px-3.5 py-3 text-[13px] bg-white border border-[#141414]/15 focus:border-[#141414] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10.5px] tracking-[0.18em] uppercase font-bold text-[#141414] mb-1.5">
                Plot / Project Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. ECR Neelankarai, Chennai"
                className="w-full px-3.5 py-3 text-[13px] bg-white border border-[#141414]/15 focus:border-[#141414] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10.5px] tracking-[0.18em] uppercase font-bold text-[#141414] mb-1.5">
                Estimated Built-Up Area
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="e.g. 5,500 sq.ft (Ground + 2 Floors)"
                className="w-full px-3.5 py-3 text-[13px] bg-white border border-[#141414]/15 focus:border-[#141414] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10.5px] tracking-[0.18em] uppercase font-bold text-[#141414] mb-1.5">
              Project Typology
            </label>
            <select
              value={formData.typology}
              onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
              className="w-full px-3.5 py-3 text-[13px] bg-white border border-[#141414]/15 focus:border-[#141414] focus:outline-none transition-colors"
            >
              <option value="Independent Luxury Villa">Independent Luxury Villa</option>
              <option value="Multi-Story Duplex Residence">Multi-Story Duplex Residence</option>
              <option value="Private Farmhouse Estate">Private Farmhouse Estate</option>
              <option value="Turnkey Civil RCC Construction">Turnkey Civil RCC Construction</option>
              <option value="Commercial Landmark / Corporate HQ">Commercial Landmark / Corporate HQ</option>
              <option value="Statutory CMDA Sanction Liaison">Statutory CMDA Sanction Liaison</option>
            </select>
          </div>

          <div>
            <label className="block text-[10.5px] tracking-[0.18em] uppercase font-bold text-[#141414] mb-1.5">
              Brief Vision / Notes
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about plot dimensions, architectural preferences, family requirements or target start dates..."
              className="w-full px-3.5 py-3 text-[13px] bg-white border border-[#141414]/15 focus:border-[#141414] focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#141414] text-[#faf8f5] py-4 text-[11px] tracking-[0.22em] uppercase font-bold hover:bg-[#c5a47e] hover:text-[#141414] transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Transmit Commission Request</span>
          </button>
        </form>
      )}
    </div>
  );
}
