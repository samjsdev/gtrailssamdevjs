
import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { BookOpen } from 'lucide-react';

export default async function ForClientsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const guides = [
    { title: "Initial Consultation", desc: "What to expect during your first design consultation." },
    { title: "Space Planning & Layout", desc: "Guide to understanding floor plans and spatial design." },
    { title: "Material & Finish Selection", desc: "Choosing the right materials for durability and aesthetics." },
    { title: "Furniture Selection", desc: "How we help you choose and source the perfect furniture." },
    { title: "Lighting Design", desc: "Understanding layered lighting for your home or office." },
    { title: "Kitchen Design", desc: "Essential guide to planning your dream kitchen." }
  ];

  return (
    <div className="text-slate-900 min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] text-[#0084FF] uppercase">CLIENT RESOURCES</p>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">Design Guides</h1>
          <p className="text-xl text-slate-500 font-light">Helpful resources to guide you through our design process, material selections, and project milestones.</p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, i) => (
            <div key={i} className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-[#0084FF] shadow-sm hover:shadow-2xl hover:shadow-[#0084FF]/10 transition-all duration-300 relative overflow-hidden cursor-pointer">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0084FF]/5 rounded-bl-[100px] -z-0"></div>
              <div className="w-12 h-12 bg-slate-50 group-hover:bg-[#0084FF] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                <BookOpen className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">{guide.title}</h3>
              <p className="text-slate-500">{guide.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
