'use client';

import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { useTemplateData } from './context/TemplateContext';

export default function TestimonialsSection({ sourcePage = 'home', sectionIndex = 4 }: { sourcePage?: 'home' | 'about', sectionIndex?: number }) {
  const { data } = useTemplateData();
  const testData = data?.[sourcePage]?.sections?.[sectionIndex] || {};

  const mainHeading = testData.headings?.[0] || 'What Our Clients Say';
  const mainText = testData.text?.[0] || "Read stories from clients whose homes we've transformed with our dedicated interior design services.";
  const roleText = testData.text?.[2] || 'Happy Client';

  const defaultImages = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
  ];
  
  const getImg = (i: number) => data?.media?.testimonials?.[i] || testData.image_sources?.[i] || defaultImages[i];

  const displayReviews = [
    {
      author_name: testData.headings?.[1] || 'Sarah Jenkins',
      rating: 5,
      text: testData.text?.[1] || 'They completely transformed our living room. The attention to detail and ability to capture our personal style was remarkable. Highly recommended!',
      profile_photo_url: getImg(0)
    },
    {
      author_name: testData.headings?.[2] || 'David Chen',
      rating: 5,
      text: testData.text?.[3] || 'The turnkey execution was flawless. They handled everything from demolition to the final styling of the bookshelves. Our home feels brand new.',
      profile_photo_url: getImg(1)
    },
    {
      author_name: testData.headings?.[3] || 'Emily & Mark',
      rating: 5,
      text: testData.text?.[4] || 'We loved how they optimized our floor plan. What used to be a cramped kitchen is now an open, airy space where we love to entertain guests.',
      profile_photo_url: getImg(2)
    }
  ];

  return (
    <section className="px-4 md:px-8 py-20 bg-[#f0f2f5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 data-gsap="reveal" className="text-4xl font-bold text-[#1A1D27] mb-4">{mainHeading}</h2>
          <p data-gsap="reveal" className="text-gray-500 max-w-md mx-auto text-sm">
            {mainText}
          </p>
        </div>

        <div data-gsap="stagger-container" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayReviews.map((review, idx) => (
            <div 
              key={idx} 
              data-gsap="stagger-item"
              className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-md transition relative flex flex-col"
            >
              <Quote className="text-[#2b347b]/10 w-12 h-12 absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#d85c47] text-[#d85c47]" />
                ))}
              </div>

              <p className="text-gray-600 italic text-sm leading-relaxed mb-8 flex-grow">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 relative">
                  {review.profile_photo_url ? (
                    <Image 
                      src={review.profile_photo_url} 
                      alt={review.author_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#2b347b] text-white flex items-center justify-center font-bold">
                      {review.author_name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1D27] text-sm">{review.author_name}</h4>
                  <p className="text-xs text-gray-400">{roleText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
