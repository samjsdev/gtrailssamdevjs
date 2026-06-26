'use client';

import Image from 'next/image';

export default function AboutSection({
  business,
  media
}: {
  business: any;
  media: any;
}) {
  const images = media.otherImages?.length >= 3 
    ? media.otherImages 
    : [
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800'
      ];

  const stats = [
    { value: '30+', label: 'Satisfied Customer', bg: 'bg-white', text: 'text-[#1A1D27]' },
    { value: '5k+', label: 'Award wining', bg: 'bg-[#2b347b]', text: 'text-white' },
    { value: '07+', label: 'Years of Experience', bg: 'bg-[#f0f2f5]', text: 'text-[#1A1D27]' },
    { value: '33+', label: 'Projects Delivered', bg: 'bg-white', text: 'text-[#1A1D27]' },
  ];

  return (
    <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column - Stats */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1D27] leading-tight mb-4">
            Your Trusted Interior<br />Design Partners
          </h2>
          <p className="text-gray-500 mb-12 max-w-md text-sm leading-relaxed">
            We specialize in crafting beautiful, functional spaces tailored precisely to your lifestyle. Let us bring your vision to life through thoughtful design and seamless execution.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`${stat.bg} ${stat.text} p-6 rounded-3xl flex flex-col justify-center shadow-sm ${idx === 3 || idx === 0 ? 'border border-gray-100' : ''} aspect-square md:aspect-auto md:h-40`}
              >
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Images Collage */}
        <div className="relative h-[500px] flex justify-center items-center">
          <div className="grid grid-cols-2 gap-4 w-full h-full relative">
            
            {/* Top Right Image */}
            <div className="absolute top-0 right-0 w-3/4 h-[55%] rounded-3xl overflow-hidden shadow-lg z-10">
              <Image src={images[0]} alt="Interior Design Setup" fill className="object-cover" />
            </div>

            {/* Bottom Left Image */}
            <div className="absolute bottom-10 left-0 w-2/3 h-[45%] rounded-3xl overflow-hidden shadow-lg z-20">
              <Image src={images[1]} alt="Cozy Living Area" fill className="object-cover" />
            </div>

            {/* Bottom Right Image */}
            <div className="absolute bottom-0 right-4 w-1/2 h-[40%] rounded-3xl overflow-hidden shadow-lg z-10">
              <Image src={images[2]} alt="Modern Kitchen" fill className="object-cover" />
            </div>

            {/* Circular Badge */}
            <div className="absolute top-[45%] left-[25%] z-30 transform -translate-y-1/2 bg-[#2b347b] w-24 h-24 rounded-full flex items-center justify-center text-white border-4 border-white shadow-xl cursor-pointer hover:scale-105 transition">
              <span className="text-xs font-semibold tracking-widest uppercase rotate-45">Explore</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
