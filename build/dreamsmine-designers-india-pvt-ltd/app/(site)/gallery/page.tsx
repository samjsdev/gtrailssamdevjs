import fs from 'fs/promises';
import path from 'path';
import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import GalleryGrid from './GalleryGrid';
import { classifyAsset } from '@/lib/siteContent';

type PageProps = {
  params?: Promise<{ slug?: string }>;
};

type GalleryItem = {
  cat: string;
  title: string;
  desc: string;
  img: string;
  span?: 'wide' | 'tall' | 'normal';
};

async function listImages(folder: string) {
  const dir = path.join(process.cwd(), 'public', 'images', 'all', folder);
  const files = await fs.readdir(dir);
  return files
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort()
    .map((file) => `/images/all/${folder}/${file}`);
}

export default async function GalleryPage({ params }: PageProps) {
  const resolvedParams = params ? await params : {};
  const data = await readSourceConfig(resolvedParams.slug, 'template1');
  if (!data) return notFound();

  const [villas, elevations, interiors] = await Promise.all([
    listImages('premium-villas'),
    listImages('exterior-elevations'),
    listImages('interior-promos'),
  ]);

  const items: GalleryItem[] = [
    ...villas.map((img, index) => ({
      cat: 'Villas',
      title: `Premium Villa Study ${String(index + 1).padStart(2, '0')}`,
      desc: classifyAsset(img).recommendedUse,
      img,
      span: index % 4 === 0 ? ('tall' as const) : ('normal' as const),
    })),
    ...elevations.map((img, index) => {
      const asset = classifyAsset(img);
      return {
        cat: asset.category.includes('plan') ? 'Plans' : 'Elevations',
        title: `${asset.category} ${String(index + 1).padStart(2, '0')}`,
        desc: asset.recommendedUse,
        img,
        span: index % 9 === 0 ? ('wide' as const) : index % 5 === 0 ? ('tall' as const) : ('normal' as const),
      };
    }),
    ...interiors.map((img, index) => ({
      cat: 'Interiors',
      title: `Interior Offer Creative ${String(index + 1).padStart(2, '0')}`,
      desc: classifyAsset(img).recommendedUse,
      img,
      span: index % 3 === 0 ? ('wide' as const) : ('normal' as const),
    })),
  ];

  return (
    <div>
      <section className="site-grid py-16 md:py-24">
        <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 md:grid-cols-[0.72fr_1fr]">
          <div>
            <span className="eyebrow">PORTFOLIO ARCHIVE</span>
            <h1 className="section-heading mt-4">Every asset categorized by what it proves.</h1>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.05em]">Villas, elevations, plans and interior offer material.</h2>
            <p className="section-subheading mt-4">
              The archive groups images by completed villa presence, exterior elevation thinking, Vastu or floor-plan logic, and interior offer proof.
            </p>
          </div>
        </div>
      </section>

      <section className="site-grid pb-16 md:pb-24">
        <GalleryGrid items={items} />
      </section>
    </div>
  );
}
