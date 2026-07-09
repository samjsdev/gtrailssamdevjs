'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const MIN_VISIBLE_MS = 900;
const FADE_MS = 520;

export default function PageLoader() {
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    let fadeTimer: number | undefined;
    let removeTimer: number | undefined;

    const dismiss = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

      fadeTimer = window.setTimeout(() => {
        setLeaving(true);
        removeTimer = window.setTimeout(() => setMounted(false), FADE_MS);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss, { once: true });
    }

    return () => {
      window.removeEventListener('load', dismiss);
      if (fadeTimer) window.clearTimeout(fadeTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`site-loader${leaving ? ' site-loader--leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Dreamsmine Designers India Pvt Ltd"
    >
      <div className="site-loader__mark" aria-hidden="true">
        <Image
          src="/dreamslogo.webp"
          alt=""
          width={140}
          height={140}
          priority
          unoptimized
        />
      </div>
      <div className="site-loader__copy">
        <p>Dreamsmine Designers India Pvt Ltd</p>
        <span>Architecture / Builders / Interiors</span>
      </div>
      <div className="site-loader__bar" aria-hidden="true" />
    </div>
  );
}
