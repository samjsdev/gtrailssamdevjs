'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

interface FloatingTalkButtonProps {
  basePath: string;
}

export default function FloatingTalkButton({ basePath }: FloatingTalkButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link
        href={`${basePath}/contact`}
        className="inline-flex items-center gap-2.5 bg-[#141414] hover:bg-[#7d3333] text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group border border-white/10"
      >
        <span>Let&rsquo;s Talk</span>
        <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
          <Plus className="w-3.5 h-3.5" />
        </span>
      </Link>
    </div>
  );
}
