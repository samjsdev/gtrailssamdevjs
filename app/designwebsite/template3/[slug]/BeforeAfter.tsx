'use client';

import { useState } from 'react';

interface BeforeAfterProps {
  image: string;
  caption?: string;
}

export default function BeforeAfter({ image, caption }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);

  return (
    <div>
      <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] shadow-[0_30px_60px_-24px_rgba(29,23,19,0.4)] select-none">
        {/* Before (grayscale) */}
        <img
          src={image}
          alt="Before renovation"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ filter: 'grayscale(1) brightness(.82)' }}
        />
        {/* After */}
        <img
          src={image}
          alt="After makeover"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />
        <span className="absolute top-4 left-4 z-[3] text-[11px] font-extrabold tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full bg-black/55 text-white">
          Before
        </span>
        <span className="absolute top-4 right-4 z-[3] text-[11px] font-extrabold tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full bg-[#f4b942] text-[#1d1713]">
          After
        </span>
        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-white -translate-x-1/2 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full bg-[#d8442c] grid place-items-center text-white font-extrabold text-[15px] shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
            ↔
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Drag to compare before and after"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-[5]"
        />
      </div>
      {caption && (
        <p className="text-center text-[13px] text-[#6d6259] mt-3.5 font-semibold">{caption}</p>
      )}
    </div>
  );
}
