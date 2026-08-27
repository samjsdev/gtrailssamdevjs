const items = [
  'Architectural 3D Elevations',
  'CMDA / DTCP Approvals',
  'Turnkey Home Construction',
  'Modular Kitchens',
  'Luxury Interiors',
  'Vastu-Compliant Planning',
  '10-Year Structural Warranty',
  'Fixed-Price Contracts',
  'Custom Furniture & Joinery',
  'Space Planning',
];

export default function ServicesMarquee() {
  const row = [...items, ...items];
  return (
    <div className="relative w-full bg-[#E64D16] overflow-hidden py-3.5 border-y border-[#B8934B]/60">
      <div className="marquee-track-fast flex items-center gap-10 whitespace-nowrap w-max">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-white text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em]">
              {item}
            </span>
            <span className="text-[#FAD4C0] text-lg leading-none">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
