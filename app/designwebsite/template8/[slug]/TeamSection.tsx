'use client';

import Image from 'next/image';
import { Globe, Mail } from 'lucide-react';

export default function TeamSection({ doctor, media }: { doctor: any, media: any }) {
  // Try to use doctor and media images, otherwise fallback
  const teamImages = media?.otherImages?.length >= 4 
    ? media.otherImages 
    : [
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
      ];

  const teamMembers = [
    { name: doctor?.name || 'James Wilson', role: 'Lead Broker', image: teamImages[0] },
    { name: 'Sarah Parker', role: 'Property Consultant', image: teamImages[1] },
    { name: 'Michael Chang', role: 'Investment Advisor', image: teamImages[2] },
    { name: 'Emma Davis', role: 'Client Relations', image: teamImages[3] },
  ];

  return (
    <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-md">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1D27] leading-tight mb-4">
            Meet Our Expert<br />Real Estate Team
          </h2>
        </div>
        <div className="max-w-md text-sm text-gray-500 pb-2">
          Dedicated professionals committed to finding you the perfect property. Our team brings decades of local market expertise.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="group relative rounded-3xl overflow-hidden cursor-pointer">
            <div className="w-full aspect-[3/4] relative">
              <Image 
                src={member.image} 
                alt={member.name} 
                fill 
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D27]/80 via-[#1A1D27]/20 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <div>
                <h3 className="text-white font-bold text-lg">{member.name}</h3>
                <p className="text-gray-300 text-sm">{member.role}</p>
              </div>
              
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <button className="bg-white/20 hover:bg-white text-white hover:text-[#2b347b] p-2 rounded-full backdrop-blur-sm transition">
                  <Globe className="w-4 h-4" />
                </button>
                <button className="bg-[#2b347b] hover:bg-[#1a2155] text-white p-2 rounded-full transition">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
