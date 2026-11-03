import Image from 'next/image';

const clients = [
  { name: 'Bharat Petroleum', image: 'bharat-petroleum.webp' },
  { name: 'IndianOil', image: 'indian-oil.webp' },
  { name: 'TAHDCO', image: 'tahdco.webp' },
  { name: 'Indian Railways', image: 'indian-railways.webp' },
  { name: 'Sri Balaji Hospital', image: 'sri-balaji-hospital.webp' },
  { name: 'SLA', image: 'sla.webp' },
];

export default function ClientPortfolio() {
  return (
    <section className="border-y border-[#111111]/15 bg-surface-cream px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">Selected clients</p>
        <h2 className="mb-10 max-w-2xl font-serif text-3xl font-bold leading-tight md:text-5xl">Experience across organisations and communities.</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {clients.map(client => (
            <div key={client.name} className="flex min-h-40 flex-col items-center justify-center gap-5 border border-[#111111]/15 bg-surface-cream p-5">
              <div className="relative h-20 w-full"><Image src={`/images/clients/${client.image}`} alt={client.name} fill sizes="(max-width: 639px) 40vw, 180px" className="object-contain" /></div>
              <p className="text-center text-xs font-semibold text-[#55534E]">{client.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
