/** Apply the brand typeface only to full brand names within copy. */
export default function BrandText({ children }: { children: string }) {
  const parts = children.split(/(Murali\s+Patharala\s*(?:&|and)\s*Associates|ARCH\s+foundations?)/gi);

  return parts.map((part, index) =>
    index % 2 === 1 ? <span className="brand-name" key={index}>{part}</span> : part
  );
}
