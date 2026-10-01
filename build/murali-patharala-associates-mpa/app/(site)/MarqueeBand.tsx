import BrandText from '@/components/BrandText';
export default function MarqueeBand() {
  const items = ['MPA • ARCHITECTURE + INTERIOR DESIGN', 'ARCH FOUNDATIONS • CONSTRUCTION & DEVELOPMENT', 'RESIDENTIAL • COMMERCIAL • INSTITUTIONAL', 'DESIGN & TECHNICAL COORDINATION', 'TENDER DOCUMENTATION', 'PROJECT MANAGEMENT & SITE SUPERVISION', 'SINCE 1998 • CHENNAI'];

  return (
    <div className="border-b-4 border-[#111111] bg-surface-linen text-[#302A20] overflow-hidden py-4 sm:py-5 select-none">
      <div className="marquee-shell">
        <div className="marquee-track flex whitespace-nowrap">
          {[1, 2, 3, 4].map((group) => (
            <div key={group} className="flex items-center gap-6 sm:gap-8 mx-4 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase shrink-0">
              {items.map((text, idx) => (
                <span key={idx} className="inline-flex items-center gap-6 sm:gap-8">
                  <span><BrandText>{text}</BrandText></span>
                  <span className="text-[#703015]">❖</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
