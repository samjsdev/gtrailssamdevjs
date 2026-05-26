import { readSourceConfig } from '@/lib/dataBuilder';
import { DEFAULT_INTERIOR_HIGHLIGHTS, INTERIOR_HERO_IMAGES } from '@/lib/interiorContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, Target, Sparkles, Award, Heart, Users, Ruler, Palette,
  Hammer, Lightbulb, Layers3, ClipboardCheck, CheckCircle2, ArrowRight, Phone
} from 'lucide-react';

export default async function AboutUsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic, doctor, business, media } = data;
  const doctorImage = media.otherImages?.[0] || INTERIOR_HERO_IMAGES.designer;
  const clinicImage = media.clinicImages?.[0] || INTERIOR_HERO_IMAGES.about;

  return (
    <div className="font-sans text-[#0A0A0A] bg-[#FCFAF6] min-h-screen selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
      {/* Page Hero Banner */}
      <section className="relative text-white py-24 lg:py-32 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="/images/heroes/about_us_hero_1776016804621.png" alt="About Us" className="w-full h-full object-cover mix-blend-luminosity" />
          <div className="absolute inset-0 bg-[#0A0A0A]/80"></div>
        </div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm mb-8">
            <span className="text-xs font-bold text-[#C1FF72] tracking-wider uppercase">About Us</span>
          </div>
          <div className="flex flex-col mb-8 items-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter">The Story Behind</h2>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#C1FF72] leading-[1.05] tracking-tighter mt-1">Your Design Studio<span className="text-white">.</span></h2>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl font-medium leading-relaxed">
            Learn about our process, our design principles, and the team that makes {clinic.name || 'our studio'} a trusted destination for thoughtful interiors.
          </p>
        </div>
      </section>

      {/* Welcome / Introduction Section */}
      <section className="py-24 lg:py-32 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="flex-1 w-full">
              <div className="relative rounded-4xl overflow-hidden border border-[#E5E5E5] bg-[#FCFAF6] shadow-xl p-2 pb-0">
                <img
                  src={clinicImage}
                  alt={`${clinic.name || 'Interior design studio'} project`}
                  className="w-full rounded-t-3xl aspect-4/3 object-cover shadow-sm"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] shadow-sm mb-2">
                  <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Who We Are</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">Welcome to</h4>
                  <h4 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">{clinic.name || 'Our Studio'}<span className="text-[#C1FF72]">.</span></h4>
                </div>
              </div>
              <div className="space-y-6 text-gray-500 text-[16px] leading-relaxed font-medium">
                <p>
                  {clinic.name || 'Our studio'} creates refined interiors shaped around daily life, comfort, and a clear design vision. Every project begins with listening closely to how you live, work, host, rest, and move through your space.
                </p>
                <p>
                  Our designers, material specialists, and execution partners bring layouts, finishes, lighting, storage, and styling together into one cohesive plan. Whether it is a new home, renovation, modular kitchen, or commercial space, we keep beauty and buildability in balance.
                </p>
                <p>
                  What sets us apart is a client-first process built on clarity. We guide each decision with transparent budgets, practical timelines, and design details that make the finished space feel personal, polished, and easy to maintain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 lg:py-32 bg-[#FCFAF6] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision */}
            <div className="bg-white rounded-4xl p-10 lg:p-12 border border-[#E5E5E5] flex flex-col group shadow-sm hover:shadow-xl hover:border-[#0A0A0A] transition-all duration-300">
              <div className="w-16 h-16 bg-[#FCFAF6] rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#0A0A0A] mb-8 group-hover:bg-[#C1FF72] group-hover:border-[#C1FF72] transition-colors duration-300">
                <Eye className="w-7 h-7" />
              </div>
              <h4 className="text-3xl font-extrabold text-[#0A0A0A] mb-6 tracking-tight">Our Vision<span className="text-[#C1FF72]">.</span></h4>
              <p className="text-gray-500 leading-relaxed font-medium text-[16px] grow">
                To become the most trusted interior design studio for people who want spaces that feel beautiful, functional, and genuinely lived in. We imagine homes and workplaces where every detail supports comfort, clarity, and a better everyday rhythm.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-4xl p-10 lg:p-12 border border-[#E5E5E5] flex flex-col group shadow-sm hover:shadow-xl hover:border-[#0A0A0A] transition-all duration-300">
              <div className="w-16 h-16 bg-[#FCFAF6] rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#0A0A0A] mb-8 group-hover:bg-[#C1FF72] group-hover:border-[#C1FF72] transition-colors duration-300">
                <Target className="w-7 h-7" />
              </div>
              <h4 className="text-3xl font-extrabold text-[#0A0A0A] mb-6 tracking-tight">Our Mission<span className="text-[#C1FF72]">.</span></h4>
              <p className="text-gray-500 leading-relaxed font-medium text-[16px] grow">
                To deliver interiors with strong planning, curated materials, reliable execution, and calm communication. We simplify the journey from first consultation to final styling so clients can make confident choices at every stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="py-24 lg:py-32 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="mb-20 space-y-6 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] shadow-sm">
              <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Guiding Principles</span>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">The Values</h4>
              <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">That Drive Us<span className="text-[#C1FF72]">.</span></h4>
            </div>
            <p className="text-lg text-gray-500 font-medium pt-2 max-w-2xl mx-auto">Every decision we make — from the first layout option to the final styling detail — is guided by these six principles.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: 'Client-First Design', desc: 'Your lifestyle, taste, budget, and routines shape every decision. We listen carefully, explain clearly, and design for the way you actually live.' },
              { icon: Ruler, title: 'Practical Planning', desc: 'Layouts, storage, movement, and measurements come before decoration so every square foot has purpose and every detail supports daily use.' },
              { icon: Award, title: 'Design Excellence', desc: 'We pursue refined proportions, durable materials, thoughtful lighting, and polished details that make each space feel complete.' },
              { icon: Users, title: 'Collaborative Process', desc: 'Designers, vendors, and execution teams stay aligned through drawings, budgets, updates, and site coordination.' },
              { icon: Sparkles, title: 'Transparency & Trust', desc: 'No vague budgets or surprise choices. We present options honestly so clients can make confident decisions.' },
              { icon: Palette, title: 'Personal Character', desc: 'Every color, finish, texture, and decor choice is curated to feel personal rather than copied from a trend.' },
            ].map((value, i) => (
              <div key={i} className="p-8 rounded-4xl bg-[#FCFAF6] flex flex-col group border border-[#E5E5E5] hover:bg-white hover:border-[#0A0A0A] hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C1FF72] rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0A0A0A] mb-8 border border-[#E5E5E5] group-hover:bg-[#C1FF72] group-hover:border-[#C1FF72] transition-colors relative z-10">
                  <value.icon className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-[#0A0A0A] text-xl mb-3 relative z-10">{value.title}</h5>
                <p className="text-gray-500 font-medium leading-relaxed relative z-10">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey / Timeline */}
      <section className="py-24 lg:py-32 bg-[#FCFAF6] border-b border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-8 w-full">
          <div className="mb-24 space-y-6 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E5E5] shadow-sm">
              <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Our Journey</span>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-5xl md:text-6xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">Milestones</h4>
              <h4 className="text-5xl md:text-6xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">That Define Us<span className="text-[#C1FF72]">.</span></h4>
            </div>
          </div>

          <div className="relative space-y-0">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-[#E5E5E5] md:-translate-x-1/2" />

            {[
              { year: 'Foundation', title: 'The Studio Took Shape', desc: 'Started with a simple belief: interiors should look beautiful, work hard, and feel deeply personal to the people who use them.' },
              { year: 'Growth', title: 'Expanded Design Team', desc: 'Brought together space planners, material specialists, lighting partners, and execution coordinators for a more complete project experience.' },
              { year: 'Innovation', title: 'Built Better Systems', desc: 'Refined our process with moodboards, layouts, material palettes, budget checkpoints, and site review workflows that keep decisions clear.' },
              { year: 'Today', title: 'Trusted By Clients', desc: `Proud to support ${business.reviewCount || '500+'} design conversations with a ${business.rating || '4.9'}-star rating, continuously raising the bar for what clients should expect from an interior studio.` },
            ].map((milestone, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-start gap-8 md:gap-16 pb-16 last:pb-0 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'} group`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-6 h-6 bg-[#C1FF72] rounded-full border-4 border-white shadow-sm -translate-x-1/2 mt-2 z-10 group-hover:scale-125 transition-transform" />
                
                {/* Content */}
                <div className={`flex-1 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                  <span className="text-[#0A0A0A] font-bold text-xs tracking-wider uppercase bg-[#E5E5E5] px-3 py-1 rounded-full">{milestone.year}</span>
                  <h5 className="text-2xl font-bold text-[#0A0A0A] mt-4 mb-3">{milestone.title}</h5>
                  <p className="text-gray-500 font-medium leading-relaxed">{milestone.desc}</p>
                </div>
                
                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-24 lg:py-32 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="flex-1 w-full order-2 lg:order-1">
              <div className="relative rounded-4xl overflow-hidden bg-[#FCFAF6] border border-[#E5E5E5] p-2 aspect-3/4">
                 <img 
                   src={doctorImage} 
                   alt={doctor.name || 'Lead designer'} 
                   className="w-full h-full object-cover rounded-3xl"
                 />
                 <div className="absolute bottom-6 left-6 right-6 bg-white rounded-4xl p-6 shadow-xl border border-[#E5E5E5] text-center">
                    <h4 className="text-xl font-bold text-[#0A0A0A]">{doctor.name || 'Our Lead Designer'}</h4>
                    <p className="text-gray-500 font-bold mt-1 text-xs tracking-widest uppercase">{doctor.specialization || 'Interior Design & Turnkey Execution'} • {doctor.experience || '10+ Years'}</p>
                 </div>
              </div>
            </div>

            <div className="flex-1 order-1 lg:order-2 lg:pt-10 space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFAF6] border border-[#E5E5E5] shadow-sm">
                  <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Meet Our Founder</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">Our Lead</h4>
                  <h4 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">Designer<span className="text-[#C1FF72]">.</span></h4>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FCFAF6] text-[#0A0A0A] rounded-full font-bold text-sm border border-[#E5E5E5]">
                {doctor.specialization || 'Interior Design & Turnkey Execution'} &bull; {doctor.experience || '10+ Years Experience'}
              </div>
              
              <div className="space-y-6 text-gray-500 text-[16px] leading-relaxed font-medium">
                <p>
                  {doctor.name || 'Our lead designer'} brings over {doctor.experience || '10+ years'} of experience in shaping homes and commercial spaces that balance comfort, proportion, and long-term usability.
                </p>
                <p>
                  Their approach combines creative direction with practical site knowledge, helping clients move from inspiration images to clear layouts, finish palettes, furniture details, and execution-ready decisions.
                </p>
                <p>
                  They believe good interiors are not only about how a room photographs; they are about how naturally the room supports real life, every single day.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {(business.highlights || DEFAULT_INTERIOR_HIGHLIGHTS).map((h: string, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[#C1FF72] shrink-0" />
                    <span className="text-[#0A0A0A] font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Disciplines */}
      <section className="py-24 lg:py-32 bg-[#FCFAF6] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="text-center mb-20 space-y-6 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E5E5] shadow-sm">
              <span className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">Our Design Disciplines</span>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-5xl md:text-6xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter">A Design Team</h4>
              <h4 className="text-5xl md:text-6xl font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tighter mt-1">For Every Detail<span className="text-[#C1FF72]">.</span></h4>
            </div>
            <p className="text-gray-500 font-medium text-lg pt-2 max-w-2xl mx-auto">Our multi-disciplinary team collaborates to deliver coordinated interior design, material selection, and execution support under one roof.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Ruler, title: 'Space Planners', desc: 'Experts in layouts, circulation, furniture scale, and storage logic that make every room easier to use.' },
              { icon: Palette, title: 'Material Curators', desc: 'Specialists in finishes, colors, textures, hardware, and surfaces that bring the visual story together.' },
              { icon: Lightbulb, title: 'Lighting Designers', desc: 'Focused on ambient, task, and accent lighting so spaces feel comfortable at every hour.' },
              { icon: Layers3, title: 'Custom Furniture Leads', desc: 'Designers who plan wardrobes, TV units, kitchens, desks, and built-ins around exact measurements.' },
              { icon: Hammer, title: 'Execution Partners', desc: 'Coordinators who align vendors, timelines, site updates, and finishing details during implementation.' },
              { icon: ClipboardCheck, title: 'Styling & Handover', desc: 'Final-detail specialists who review quality, place decor, and prepare the finished space for everyday life.' },
            ].map((dept, i) => (
              <div key={i} className="bg-white p-8 rounded-4xl border border-[#E5E5E5] flex flex-col group hover:shadow-xl hover:border-[#0A0A0A] transition-all duration-300">
                <div className="w-12 h-12 bg-[#FCFAF6] rounded-full flex items-center justify-center text-[#0A0A0A] mb-8 border border-[#E5E5E5] group-hover:bg-[#C1FF72] group-hover:border-[#C1FF72] transition-colors duration-300">
                  <dept.icon className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-[#0A0A0A] text-xl mb-3">{dept.title}</h5>
                <p className="text-gray-500 leading-relaxed font-medium">{dept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0A0A0A] py-24 lg:py-40 text-white selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-8 text-center w-full flex flex-col items-center">
          <div className="flex flex-col mb-8 items-center">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter">Experience The</h3>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#C1FF72] leading-[1.05] tracking-tighter mt-1">Difference Today<span className="text-white">.</span></h3>
          </div>
          <p className="text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto">Visit the studio, meet the team, and let us show you how thoughtful planning can change the way your space feels.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a href={`tel:${clinic.contact?.phone || ''}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C1FF72] text-[#0A0A0A] px-10 py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 text-[15px] tracking-wide shadow-sm">
              <Phone className="w-5 h-5" /> Call {clinic.contact?.phone || 'Now'}
            </a>
            <Link href={`${basePath}/contact-us`} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 text-white px-10 py-5 rounded-full font-bold transition-all hover:bg-white/10 hover:scale-105 active:scale-95 text-[15px] tracking-wide shadow-sm">
              Visit Us <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
