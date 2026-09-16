'use client';

import { useEffect, useState, useRef } from 'react';
import { Award, Building2, ShieldCheck, FileCheck, Lock, HardHat } from 'lucide-react';
import styles from './HomeStorySections.module.css';

interface StatItemData {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  icon: typeof Award;
}

const stats: StatItemData[] = [
  {
    value: 28,
    suffix: '+',
    label: 'Years of Trust',
    sub: 'Continuous operation in Anna Nagar since 1998',
    icon: Award,
  },
  {
    value: 500,
    suffix: '+',
    label: 'Homes Delivered',
    sub: 'Bespoke villas & turnkey residences completed',
    icon: Building2,
  },
  {
    value: 425,
    suffix: '+',
    label: 'Quality Checks',
    sub: 'Documented audits & concrete cube strength tests',
    icon: ShieldCheck,
  },
  {
    value: 10,
    suffix: ' Yrs',
    label: 'Structural Warranty',
    sub: 'Legally binding structural integrity guarantee',
    icon: FileCheck,
  },
  {
    value: 100,
    suffix: '%',
    label: 'Fixed Price',
    sub: 'Line-by-line itemized BOQ with zero escalation',
    icon: Lock,
  },
  {
    value: 100,
    suffix: '%',
    label: 'In-House Team',
    sub: 'Dedicated resident engineers & licensed architects',
    icon: HardHat,
  },
];

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

function StatCard({ stat, start }: { stat: StatItemData; start: boolean }) {
  const value = useCountUp(stat.value, start);
  const IconComp = stat.icon;

  return (
    <div className={styles.statCard}>
      <div className={styles.iconTile}><IconComp size={21} strokeWidth={1.5} aria-hidden="true" /></div>
      <div>
        <div className={styles.statValue}>{value}<span>{stat.suffix}</span></div>
        <div className={styles.statLabel}>{stat.label}</div>
        <div className={styles.statDescription}>{stat.sub}</div>
      </div>
    </div>
  );
}

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setStart(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="MPA Credentials and Performance Metrics"
      id="numbers"
      className={styles.stats}
    >
      {/* Six credentials arranged as a 3 × 2 matrix on desktop. */}
      <div className={styles.container}>
        <div className={styles.statsHeader}>
          <p className={styles.eyebrow}>MPA in numbers</p>
          <span>Since 1998 · Chennai</span>
        </div>
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} start={start} />
          ))}
        </div>
      </div>
    </section>
  );
}
