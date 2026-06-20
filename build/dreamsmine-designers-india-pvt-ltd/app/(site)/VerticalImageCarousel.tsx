'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Slide = {
  src: string;
  title: string;
  label: string;
};

type VerticalImageCarouselProps = {
  slides: Slide[];
};

export default function VerticalImageCarousel({ slides }: VerticalImageCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const current = slides[active];

  return (
    <div className="image-box relative w-full h-full min-h-[450px] bg-[var(--paper)]">
      <Image
        key={current.src}
        src={current.src}
        alt={current.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="carousel-fade object-cover"
        unoptimized
      />

    </div>
  );
}
