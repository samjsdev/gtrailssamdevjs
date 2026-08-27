'use client';

import { useState } from 'react';
import Link from 'next/link';

const BASE: Record<string, number> = { '1': 68, '2': 98, '3': 155, '4': 240 };
const TIER: Record<string, number> = { e: 0.18, p: 0.65, l: 1.0 };
const BHK_LABELS = [
  { key: '1', label: 'ECR Beach Villa (2,800 sf)' },
  { key: '2', label: 'Anna Nagar Duplex (3,800 sf)' },
  { key: '3', label: 'Chettinad Mutham (5,500 sf)' },
  { key: '4', label: 'OMR Sustainable Estate (8,000+ sf)' },
];
const TIER_LABELS = [
  { key: 'e', label: 'BIM & CMDA Sanctions' },
  { key: 'p', label: 'Piles & Porotherm Shell' },
  { key: 'l', label: 'Turnkey Luxury Build' },
];

export default function Estimator({ contactPath }: { contactPath: string }) {
  const [bhk, setBhk] = useState('2');
  const [tier, setTier] = useState('l');

  const mid = BASE[bhk] * TIER[tier];
  const lo = (mid * 0.95).toFixed(1);
  const hi = (mid * 1.10).toFixed(1);
  const emi = Math.round((mid * 100000 * 0.8) / 36).toLocaleString('en-IN');

  const pill = (active: boolean) =>
    `px-5 py-2.5 rounded-full border-[1.5px] font-bold text-[13px] sm:text-[14px] cursor-pointer transition-all duration-200 ${
      active
        ? 'bg-[#d8442c] border-[#d8442c] text-white'
        : 'bg-transparent border-white/30 text-white hover:border-[#f4b942]'
    }`;

  return (
    <div className="bg-[linear-gradient(135deg,#1d1713,#2a211b)] text-white rounded-[26px] p-8 sm:p-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
      <div>
        <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#f4b942] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#f4b942]">
          Instant architectural cost estimator
        </div>
        <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white mb-3">
          What will your architectural build cost?
        </h2>
        <p className="text-white/75 text-[15px] mb-8 max-w-[440px]">
          Two taps, transparent civil &amp; architectural ranges based on actual regional building parameters, not teaser pricing.
        </p>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-[12px] font-extrabold tracking-[0.14em] uppercase text-white/60 mb-3">
              Project Typology
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
          Indicative regional range only. Your exact itemised frozen BOQ follows an on-site plot contour audit and geotechnical soil investigation.
        </p>
      </div>
    </div>
  );
}
