'use client';

import { useTemplateData } from '../../context/TemplateContext';

export default function Stats() {
  const { data } = useTemplateData();
  const stats = data.stats || [];

  return (
    <div className="flex flex-wrap justify-center gap-8 py-8 px-6">
      {stats.map((stat: any, index: number) => (
        <div key={index} className="text-center">
          <span className="block text-4xl font-bold mb-1" style={{ color: 'var(--accent-2)' }}>{stat.number}</span>
          <span className="text-sm" style={{ color: 'var(--muted)' }}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
