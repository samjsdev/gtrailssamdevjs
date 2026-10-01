import Image from 'next/image';
import BrandText from './BrandText';

type ServiceImageCardProps = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  bullets?: string[];
};

export default function ServiceImageCard({ title, description, image, imageAlt, bullets }: ServiceImageCardProps) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden border border-[#5D5140]/20 bg-surface-cream">
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="text-[#302A20]">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted"><BrandText>{description}</BrandText></p>
        {bullets && bullets.length > 0 && (
          <details className="mt-5 border-t border-[#5D5140]/15 pt-4">
            <summary className="cursor-pointer text-sm text-[#703015]">View details</summary>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-ink-muted">
              {bullets.map(bullet => <li key={bullet}><BrandText>{bullet}</BrandText></li>)}
            </ul>
          </details>
        )}
      </div>
      {image && (
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-t border-[#5D5140]/15 bg-surface-linen">
          <Image src={image} alt={imageAlt ?? title} fill sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 50vw, 33vw" className="object-cover" />
        </div>
      )}
    </article>
  );
}
