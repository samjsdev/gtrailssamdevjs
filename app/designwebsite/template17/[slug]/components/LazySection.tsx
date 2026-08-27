"use client";

import { useEffect, useRef, useState } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  minHeight?: string;
  rootMargin?: string;
  forceMountDelayMs?: number | null;
}

export default function LazySection({
  children,
  threshold = 0.1,
  minHeight = "50vh",
  rootMargin = "0px 0px 150px 0px",
  forceMountDelayMs = null,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const shouldForceMount = typeof forceMountDelayMs === "number" && forceMountDelayMs >= 0;
    let safetyTimeout: ReturnType<typeof setTimeout> | null = null;
    if (shouldForceMount) {
      safetyTimeout = setTimeout(() => {
        setIsVisible(true);
      }, forceMountDelayMs);
    }

    return () => {
      observer.disconnect();
      if (safetyTimeout) {
        clearTimeout(safetyTimeout);
      }
    };
  }, [threshold, rootMargin, forceMountDelayMs]);

  return (
    <div ref={ref} style={{ minHeight }} className="w-full transition-opacity duration-700 ease-in-out" data-visible={isVisible}>
      {isVisible ? children : null}
    </div>
  );
}
