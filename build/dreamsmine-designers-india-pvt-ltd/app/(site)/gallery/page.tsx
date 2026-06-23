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
    })),
    ...elevations.map((img, index) => {
      const asset = classifyAsset(img);
      return {
        cat: asset.category.includes('plan') ? 'Plans' : 'Elevations',
        title: `${asset.category} ${String(index + 1).padStart(2, '0')}`,
        desc: asset.recommendedUse,
        img,
      };
    }),
    ...interiors.map((img, index) => ({
      cat: 'Interiors',
      title: `Interior Offer Creative ${String(index + 1).padStart(2, '0')}`,
      desc: classifyAsset(img).recommendedUse,
      img,
    })),
  ];

  return (
    <div className="min-h-screen pb-16 md:pb-24">
      {/* Hero Section */}
      <section className="border-b border-[var(--line)] bg-[var(--white)] py-16 md:py-24">
        <div className="site-grid">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="eyebrow text-[var(--oxide)]">PORTFOLIO ARCHIVE</span>
              <h1 className="mt-5 max-w-5xl text-[2.75rem] font-black uppercase leading-[0.86] tracking-[-0.065em] sm:text-6xl md:text-7xl">
                Every asset categorized by what it proves.
              </h1>
              <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-black/68 md:text-lg md:leading-8">
                Villas, elevations, plans and interior offer material. The archive groups images by completed villa presence, exterior elevation thinking, Vastu or floor-plan logic, and interior offer proof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-[var(--paper)] py-16">
        <div className="site-grid">
          <GalleryGrid items={items} />
        </div>
      </section>
    </div>
  );
}
