'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

export type CountUpProps = {
  value: number | string;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  prefixClassName?: string;
  suffixClassName?: string;
};

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUp({
  value,
  duration = 1600,
  decimals,
  prefix = '',
  suffix = '',
  className = '',
  prefixClassName = '',
  suffixClassName = '',
}: CountUpProps) {
  const parsed = useMemo(() => {
    if (typeof value === 'number') {
      const dec = decimals !== undefined ? decimals : value % 1 !== 0 ? 1 : 0;
      return { num: value, dec, pref: prefix, suff: suffix };
    }

    const str = String(value ?? '').trim();
    // match optional prefix, number, and trailing suffix
    const match = str.match(/^([^\d.-]*)([-+]?\d*\.?\d+)(.*)$/);
    if (!match) {
      return { num: 0, dec: decimals ?? 0, pref: prefix, suff: suffix || str };
    }

    const pref = prefix || match[1];
    const num = parseFloat(match[2]) || 0;
    const autoDec = match[2].includes('.') ? match[2].split('.')[1].length : 0;
    const dec = decimals !== undefined ? decimals : autoDec;
    const suff = suffix || match[3];

    return { num, dec, pref, suff };
  }, [value, decimals, prefix, suffix]);

  const [currentVal, setCurrentVal] = useState<number>(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setCurrentVal(parsed.num);
        return;
      }

      const startTime = performance.now();

      const updateCounter = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);

        setCurrentVal(parsed.num * eased);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setCurrentVal(parsed.num);
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 60px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [parsed.num, duration]);

  const formattedNum =
    parsed.dec > 0
      ? currentVal.toFixed(parsed.dec)
      : Math.round(currentVal).toLocaleString();

  return (
    <span ref={containerRef} className={`inline-flex items-baseline tabular-nums ${className}`}>
      {parsed.pref && <span className={prefixClassName}>{parsed.pref}</span>}
      <span>{formattedNum}</span>
      {parsed.suff && <span className={suffixClassName}>{parsed.suff}</span>}
    </span>
  );
}
