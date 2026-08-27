export default function MarqueeBand() {
  const items = [
    'TURNKEY CONSTRUCTION',
    'FIXED PRICE CONTRACTS',
    'IN-HOUSE ARCHITECTS',
    'ON-TIME DELIVERY',
    'ZERO COST OVERRUNS',
    '28+ YEARS TRUST IN CHENNAI',
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
