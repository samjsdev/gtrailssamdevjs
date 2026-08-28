export default function MarqueeBand() {
  const items = [
    'A RESIDENTIAL CONSTRUCTION COMPANY',
    'ONE-STOP SOLUTION: DESIGN + CONSTRUCTION + INTERIOR',
    '425+ QUALITY CHECKS',
    '10 YEARS STRUCTURAL WARRANTY',
    'DEDICATED FULL-TIME SITE ENGINEER',
    'HIGH TRANSPARENCY & TECH-DRIVEN PROJECT MANAGEMENT',
    'HIGH QUALITY AT REASONABLE PRICE',
    '100% FIXED-PRICE GUARANTEE',
    'SINCE 1998 • CHENNAI',
  ];

  return (
    <div className="border-b-4 border-[#111111] bg-[#111111] text-white overflow-hidden py-4 sm:py-5 select-none">
      <div className="marquee-shell">
        <div className="marquee-track flex whitespace-nowrap">
          {[1, 2, 3, 4].map((group) => (
            <div key={group} className="flex items-center gap-6 sm:gap-8 mx-4 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase shrink-0">
              {items.map((text, idx) => (
                <span key={idx} className="inline-flex items-center gap-6 sm:gap-8">
                  <span>{text}</span>
                  <span className="text-[#EA580C]">❖</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
