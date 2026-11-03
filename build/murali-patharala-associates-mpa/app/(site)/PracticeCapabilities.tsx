import { PRACTICE_CAPABILITIES } from '@/lib/clientProfile';
import ServiceImageCard from '@/components/ServiceImageCard';

export default function PracticeCapabilities() {
  return (
    <section id="consultancy" className="bg-surface-pale px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">Architectural consultancy</p>
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">From a first idea.<br /><em className="font-normal text-[#C2410C]">Through the life of a building.</em></h2>
          <p className="max-w-xl self-end text-base leading-relaxed text-[#55534E]">Our work spans residential, commercial and institutional projects. The professional services below can be coordinated around the needs and stage of your project.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_CAPABILITIES.map(item => (
            <ServiceImageCard key={item.title} title={item.title} description={item.text} image={item.image} imageAlt={item.imageAlt} />
          ))}
        </div>
      </div>
    </section>
  );
}
