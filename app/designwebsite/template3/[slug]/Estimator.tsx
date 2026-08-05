'use client';

import { useState } from 'react';
import Link from 'next/link';

const BASE: Record<string, number> = { '1': 2.4, '2': 3.4, '3': 4.6, '4': 5.8 };
const TIER: Record<string, number> = { e: 1, p: 1.35, l: 1.8 };
const BHK_LABELS = [
  { key: '1', label: '1BHK' },
  { key: '2', label: '2BHK' },
  { key: '3', label: '3BHK' },
  { key: '4', label: '4BHK / Villa' },
];
const TIER_LABELS = [
  { key: 'e', label: 'Essentials' },
  { key: 'p', label: 'Premium' },
  { key: 'l', label: 'Luxe' },
];

export default function Estimator({ contactPath }: { contactPath: string }) {
  const [bhk, setBhk] = useState('2');
  const [tier, setTier] = useState('p');

  const mid = BASE[bhk] * TIER[tier];
  const lo = (mid * 0.96).toFixed(1);
  const hi = (mid * 1.08).toFixed(1);
  const emi = Math.round((mid * 100000 * 0.8) / 36).toLocaleString('en-IN');

  const pill = (active: boolean) =>
    `px-5.5 py-3 rounded-full border-[1.5px] font-bold text-[14px] cursor-pointer transition-all duration-200 ${
      active
        ? 'bg-[#d8442c] border-[#d8442c] text-white'
        : 'bg-transparent border-white/30 text-white hover:border-[#f4b942]'
    }`;

  return (
    <div className="bg-[linear-gradient(135deg,#1d1713,#2a211b)] text-white rounded-[26px] p-8 sm:p-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
      <div>
        <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#f4b942] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#f4b942]">
          Instant cost estimator
        </div>
        <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white mb-3">
          What will your interiors cost?
        </h2>
        <p className="text-white/75 text-[15px] mb-8 max-w-[440px]">
          Two taps, honest range — based on typical Chennai market rates, not teaser pricing.
        </p>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-[12px] font-extrabold tracking-[0.14em] uppercase text-white/60 mb-3">
              Your home
            </label>
            <div className="flex gap-2.5 flex-wrap">
              {BHK_LABELS.map((item) => (
                <button key={item.key} type="button" className={pill(bhk === item.key)} onClick={() => setBhk(item.key)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-extrabold tracking-[0.14em] uppercase text-white/60 mb-3">
              Finish level
            </label>
            <div className="flex gap-2.5 flex-wrap">
              {TIER_LABELS.map((item) => (
                <button key={item.key} type="button" className={pill(tier === item.key)} onClick={() => setTier(item.key)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-[#241f1a] rounded-[20px] px-8 py-9 text-center">
        <span className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-[#6d6259]">
          Estimated investment
        </span>
        <div className="text-[clamp(34px,4vw,46px)] font-extrabold text-[#d8442c] my-2 tracking-[-0.02em]">
          ₹{lo}L – ₹{hi}L
        </div>
        <div className="text-[15px] font-bold mb-5">or ₹{emi}/month × 36 EMI</div>
        <Link
          href={contactPath}
          className="block w-full bg-[#d8442c] text-white font-extrabold text-[15px] px-7 py-3.5 rounded-xl hover:bg-[#b93320] transition-colors duration-250"
        >
          Get Exact Quote
        </Link>
        <p className="text-[12px] text-[#6d6259] mt-3.5 leading-[1.5]">
          Indicative market range only. Your exact itemised quote follows a home measurement.
        </p>
      </div>
    </div>
  );
}
