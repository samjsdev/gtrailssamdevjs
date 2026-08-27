'use client';

import { MessageSquare, Phone } from 'lucide-react';

export default function FloatingActions() {
  const waHref = `https://wa.me/919841098490?text=${encodeURIComponent(
    'Hi ARCH Foundations & Murali Patharala Associates, I would like to enquire about home construction & architectural design.'
  )}`;

  return (
    <div className="fixed z-40 bottom-5 right-4 sm:right-6 flex flex-col gap-3">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#1FB857] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all"
      >
        <MessageSquare className="w-6 h-6" />
      </a>
      <a
        href="tel:+919841098490"
        aria-label="Call our studio"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#E64D16] hover:bg-[#C93F0F] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
