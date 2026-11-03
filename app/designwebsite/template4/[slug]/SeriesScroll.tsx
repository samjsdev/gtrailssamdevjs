'use client';

import CurtainHorizontalSlider, { SeriesTheme } from './CurtainHorizontalSlider';

export type { SeriesTheme };

export default function SeriesScroll({
  themes,
  collection = 'Design Series',
  basePath = '',
}: {
  themes: SeriesTheme[];
  collection: string;
  basePath?: string;
}) {
  return (
    <CurtainHorizontalSlider
      themes={themes}
      collection={collection}
      basePath={basePath}
    />
  );
}

