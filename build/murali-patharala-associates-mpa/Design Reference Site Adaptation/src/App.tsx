import { useEffect, useState, useRef } from "react";

const NAV_LINKS = ["Services", "Packages", "Projects", "Process", "Contact"];

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "850+", label: "Homes Delivered" },
  { value: "0%", label: "Cost Escalation" },
  { value: "10 Yr", label: "Structural Warranty" },
];

const SERVICES = [
  {
    icon: "01",
    title: "Turnkey Construction",
    desc: "100% end-to-end execution. From soil testing and foundation to the final coat of paint, we manage all materials, labor, and compliance. Zero subcontractors.",
  },
  {
    icon: "02",
    title: "Architectural Design",
    desc: "In-house licensed architects craft custom floor plans and stunning 3D elevations perfectly tailored to your plot, maximizing space and natural light.",
  },
  {
    icon: "03",
    title: "Interior Design",
    desc: "Seamlessly integrated interiors. We plan lighting, plumbing, and false ceilings alongside structural work, delivering a cohesive, move-in-ready home.",
  },
  {
    icon: "04",
    title: "Approvals & Liaison",
    desc: "We handle all civic body approvals, plan sanctions, and temporary electricity/water connections. Complete peace of mind before breaking ground.",
  },
];

const PACKAGES = [
  {
    name: "Classic",
    tag: "Essential Quality",
    price: "₹1,850",
    unit: "/ sq.ft",
    features: [
      "Custom 2D floor plans",
      "ISI-certified TMT steel",
      "Standard electrical & plumbing",
      "Weather-proof exterior paint",
      "Basic modular kitchen",
      "5-year structural warranty",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    tag: "Most Recommended",
    price: "₹2,450",
    unit: "/ sq.ft",
    features: [
      "Everything in Classic + 3D Elevation",
      "Premium vitrified tiles / granite",
      "UPVC soundproof windows",
      "Full modular kitchen with chimney",
      "False ceiling in living spaces",
      "8-year structural warranty",
    ],
    highlight: true,
  },
  {
    name: "Luxury",
    tag: "Uncompromising Finish",
    price: "₹3,200",
    unit: "/ sq.ft",
    features: [
      "Complete interior design integration",
      "Italian marble & hardwood floors",
      "Smart home automation setup",
      "Landscaping & external paving",
      "Dedicated site architect",
      "10-year structural warranty",
    ],
    highlight: false,
  },
];

const WHY_US = [
  {
    num: "I.",
    title: "No Subcontractors",
    body: "Our architects, civil engineers, and site supervisors are all full-time employees. We maintain absolute control over quality and timelines.",
  },
  {
    num: "II.",
    title: "Zero Cost Overruns",
    body: "We operate on a strict fixed-price model. Once the Bill of Quantities (BOQ) is signed, you won't pay a single rupee extra for the agreed scope.",
  },
  {
    num: "III.",
    title: "Guaranteed Timelines",
    body: "Every project comes with a legally binding delivery schedule. We track progress weekly and enforce strict penalty clauses for any delays.",
  },
  {
    num: "IV.",
    title: "200+ Point QC Protocol",
    body: "Quality isn't left to chance. Every stage of construction undergoes rigorous, documented quality checks by our independent audit team.",
  },
];

const PROJECTS = [
  {
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&auto=format",
    title: "The Courtyard House",
    tag: "Whitefield · 4,200 sq.ft",
  },
  {
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&auto=format",
    title: "Minimalist Villa",
    tag: "Sarjapur · 3,600 sq.ft",
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&auto=format",
    title: "Brick & Timber Residence",
    tag: "Hennur · 5,100 sq.ft",
  },
  {
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop&auto=format",
    title: "Contemporary Estate",
    tag: "Yelahanka · 6,500 sq.ft",
  },
];

const INTERIOR_PROJECTS = [
  {
    img: "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=800&h=600&fit=crop&auto=format",
    label: "Living & Dining — Open Plan Integration",
  },
  {
    img: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=800&h=600&fit=crop&auto=format",
    label: "Master Bedroom — Warm Minimalist",
  },
  {
    img: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&h=600&fit=crop&auto=format",
    label: "Kitchen — Modern Modular Layout",
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Site Inspection & Brief", desc: "We evaluate your plot, understand your family's lifestyle, and lock down the overarching vision and budget." },
  { step: "02", title: "Architecture & Approvals", desc: "Our architects draft floor plans and 3D elevations. Once approved by you, we secure all necessary government permits." },
  { step: "03", title: "BOQ & Contracts", desc: "A highly detailed Bill of Quantities is generated. You sign a fixed-price contract with zero hidden clauses." },
  { step: "04", title: "Construction Phase", desc: "Execution begins. You receive a dedicated WhatsApp group and weekly reports detailing progress and QC checks." },
  { step: "05", title: "Handover & Warranty", desc: "Deep cleaning, final walkthrough, and handover of keys along with your 10-year structural warranty certificate." }
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [interiorIndex, setInteriorIndex] = useState(0);
  
  const [formData, setFormData] = useState({ name: "", phone: "", plotSize: "" });
  const [formSent, setFormSent] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-advance main project slider
  useEffect(() => {
    const timer = window.setInterval(() => {
      setProjectIndex((current) => (current + 1) % PROJECTS.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  function handleQuoteSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", phone: "", plotSize: "" });
  }

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-full font-sans antialiased text-[#111111] selection:bg-[#EA580C] selection:text-white border-x-4 border-[#111111] max-w-[1600px] mx-auto bg-[#FAFAFA]">
      
      {/* ── NAV (Inspired by the bold red & white signboard) ── */}
      <nav className="sticky top-0 z-50 bg-[#111111] text-white border-b-4 border-[#111111] px-6 md:px-12 py-5 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#EA580C] flex items-center justify-center">
            <div className="w-2 h-2 bg-[#111111]"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight uppercase text-[#EA580C]" style={{ fontFamily: "'Lora', serif" }}>VastuCraft</span>
        </a>

        <ul className="hidden md:flex gap-10 items-center">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-[#EA580C] hover:text-white transition-colors">
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden md:inline-flex px-6 py-3 bg-[#EA580C] text-[#111111] text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
          Get Estimate
        </a>

        <button className="md:hidden text-[#EA580C] hover:text-white transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12"/></svg> : <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#111111] text-[#EA580C] flex flex-col pt-28 px-6 pb-6">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="py-5 text-2xl font-bold border-b border-[#333333] uppercase tracking-wide">
              {link}
            </a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-[90vh] flex items-stretch border-b-4 border-[#111111]">
        <div className="grid md:grid-cols-2 w-full">
          {/* Left Content */}
          <div className="px-6 md:px-12 py-20 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-[#111111] bg-white">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-6 inline-block">Bengaluru's Premium Turnkey Builder</p>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8" style={{ fontFamily: "'Lora', serif" }}>
              Zero Delays.<br/>Zero Overruns.<br/><span className="text-[#EA580C]">100% Quality.</span>
            </h1>
            <p className="text-lg text-[#757575] mb-10 max-w-md leading-relaxed font-medium">
              We design, build, and deliver custom homes with absolute transparency. In-house experts, fixed-price contracts, and uncompromising execution.
            </p>
            
            <div className="grid grid-cols-2 gap-4 border-2 border-[#111111] p-6 bg-[#FAFAFA] max-w-md">
              {formSent ? (
                <div className="col-span-2 text-center py-8">
                  <span className="text-3xl block mb-2 text-[#EA580C]">✓</span>
                  <span className="font-bold text-lg">Request Received</span>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="col-span-2 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest border-b-2 border-[#111111] pb-3 mb-4">Quick Estimate</h3>
                  <input required type="text" placeholder="Name" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="w-full px-4 py-3 bg-white border border-[#E0E0E0] text-sm outline-none focus:border-[#EA580C]" />
                  <div className="flex gap-4">
                    <input required type="tel" placeholder="Phone" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} className="w-full px-4 py-3 bg-white border border-[#E0E0E0] text-sm outline-none focus:border-[#EA580C]" />
                    <select required value={formData.plotSize} onChange={e=>setFormData({...formData, plotSize:e.target.value})} className="w-full px-4 py-3 bg-white border border-[#E0E0E0] text-sm outline-none focus:border-[#EA580C]">
                      <option value="" disabled>Plot Size</option>
                      <option>Under 1200 sqft</option>
                      <option>1200-2400 sqft</option>
                      <option>Above 2400 sqft</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-[#EA580C] text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#111111] transition-colors mt-2">
                    Request Callback
                  </button>
                </form>
              )}
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative min-h-[50vh] md:min-h-full">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1600&fit=crop&auto=format" alt="Premium construction" className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]" />
            <div className="absolute inset-0 bg-[#EA580C] mix-blend-overlay opacity-20"></div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-b-4 border-[#111111] bg-[#111111] text-white overflow-hidden py-5">
        <div className="marquee-track flex whitespace-nowrap">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-8 mx-4 text-sm font-bold tracking-[0.25em] uppercase">
              <span>TURNKEY CONSTRUCTION</span>
              <span className="text-[#EA580C]">❖</span>
              <span>FIXED PRICE CONTRACTS</span>
              <span className="text-[#EA580C]">❖</span>
              <span>IN-HOUSE ARCHITECTS</span>
              <span className="text-[#EA580C]">❖</span>
              <span>ON-TIME DELIVERY</span>
              <span className="text-[#EA580C]">❖</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── THE MANIFESTO (New Section) ── */}
      <section className="py-20 md:py-32 px-6 md:px-12 border-b-4 border-[#111111] bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-[#EA580C] mx-auto mb-10"></div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-8 leading-tight">We Believe Building a Home Shouldn't Be a Nightmare of Escalating Costs and Broken Promises.</h2>
          <p className="text-lg md:text-xl text-[#757575] leading-relaxed">
            The traditional construction industry is broken—riddled with subcontractors, hidden fees, and endless delays. VastuCraft was built to change that. We bring architecture, engineering, and construction under one roof, backed by unbreakable fixed-price contracts and ironclad delivery timelines.
          </p>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="border-b-4 border-[#111111]">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-[#111111] bg-[#FAFAFA]">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Lora', serif" }}>The Standard<br/>For Excellence.</h2>
            <p className="text-lg text-[#757575] mb-12">We don't rely on third-party contractors. By keeping design, engineering, and execution in-house, we guarantee absolute accountability.</p>
            <div className="grid grid-cols-2 gap-8 gap-y-12">
              {STATS.map(s => (
                <div key={s.label}>
                  <p className="text-4xl md:text-5xl font-bold text-[#EA580C] mb-2 font-serif">{s.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 bg-white">
            {WHY_US.map((item, i) => (
              <div key={i} className={`p-8 md:p-12 border-[#111111] ${i%2===0 ? 'border-b-2 sm:border-r-2' : 'border-b-2'} ${i>1 ? 'border-b-0' : ''}`}>
                <span className="text-2xl font-serif text-[#EA580C] font-bold block mb-4">{item.num}</span>
                <h4 className="text-lg font-bold mb-3 uppercase tracking-wide">{item.title}</h4>
                <p className="text-sm text-[#757575] leading-relaxed font-medium">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section id="services" className="border-b-4 border-[#111111]">
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-full p-8 md:p-12 border-b-4 border-[#111111] bg-[#111111] text-white">
            <h2 className="text-3xl font-bold font-serif">End-to-End Capabilities</h2>
          </div>
          {SERVICES.map((s, i) => (
            <div key={i} className={`p-8 md:p-10 border-[#111111] bg-[#FAFAFA] hover:bg-white transition-colors ${i < SERVICES.length - 1 ? 'border-b-2 md:border-b-0 md:border-r-2 lg:border-b-0' : ''}`}>
              <div className="text-4xl font-serif text-[#EA580C] font-bold mb-6">{s.icon}</div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-4">{s.title}</h3>
              <p className="text-sm text-[#757575] leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STEP-BY-STEP PROCESS (New Section) ── */}
      <section id="process" className="py-20 md:py-24 border-b-4 border-[#111111] bg-white">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">Methodology</p>
            <h2 className="text-4xl font-bold font-serif mb-4">How We Build</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((proc, i) => (
              <div key={i} className="relative pt-6">
                {i !== PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-[1.35rem] left-[2.5rem] right-[-1rem] h-0.5 bg-[#E0E0E0]"></div>
                )}
                <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm mb-6 relative z-10">
                  {proc.step}
                </div>
                <h4 className="font-bold uppercase tracking-wide mb-3">{proc.title}</h4>
                <p className="text-sm text-[#757575] leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DYNAMIC PROJECT CAROUSEL ── */}
      <section id="projects" className="border-b-4 border-[#111111] bg-[#111111] text-[#FAFAFA]">
        <div className="p-6 md:p-12 border-b-2 border-[#212121] flex justify-between items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Signature Residences</h2>
          </div>
          <div className="hidden md:flex gap-4">
            <button onClick={() => scrollCarousel('left')} className="w-12 h-12 border border-[#212121] flex items-center justify-center hover:bg-[#EA580C] hover:border-[#EA580C] transition-colors">←</button>
            <button onClick={() => scrollCarousel('right')} className="w-12 h-12 border border-[#212121] flex items-center justify-center hover:bg-[#EA580C] hover:border-[#EA580C] transition-colors">→</button>
          </div>
        </div>
        
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar border-b-4 border-[#111111]"
          style={{ scrollbarWidth: 'none' }}
        >
          {PROJECTS.map((proj, i) => (
            <div key={i} className="min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw] snap-center border-r-2 border-[#212121] relative group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={proj.img} alt={proj.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent pt-32">
                <p className="text-[#EA580C] text-xs font-bold tracking-widest uppercase mb-2">{proj.tag}</p>
                <h3 className="text-2xl font-bold font-serif">{proj.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" className="border-b-4 border-[#111111] py-16 md:py-24 bg-[#FAFAFA]">
        <div className="px-6 md:px-12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">Transparent Pricing</p>
            <h2 className="text-4xl font-bold font-serif mb-4">Fixed-Price Contracts</h2>
            <p className="text-[#757575] font-medium">Detailed BOQs. No hidden charges. No escalation clauses.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0 border-2 border-[#111111] shadow-2xl">
            {PACKAGES.map((pkg, i) => (
              <div key={i} className={`p-8 relative ${i !== 2 ? 'border-b-2 md:border-b-0 md:border-r-2 border-[#111111]' : ''} ${pkg.highlight ? 'bg-[#111111] text-white' : 'bg-white'}`}>
                {pkg.highlight && <div className="absolute top-0 left-0 right-0 h-2 bg-[#EA580C]"></div>}
                <p className={`text-xs font-bold tracking-widest uppercase mb-6 ${pkg.highlight ? 'text-[#EA580C]' : 'text-[#757575]'}`}>{pkg.tag}</p>
                <h3 className="text-2xl font-bold font-serif mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-current opacity-30">
                  <span className={`text-4xl font-bold font-serif ${pkg.highlight ? 'text-white' : 'text-[#EA580C]'}`}>{pkg.price}</span>
                  <span className="text-sm font-bold uppercase tracking-wider">{pkg.unit}</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="flex gap-3 text-sm font-medium">
                      <span className="text-[#EA580C]">■</span>
                      <span className="opacity-90">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-colors ${pkg.highlight ? 'bg-[#EA580C] text-white hover:bg-white hover:text-[#111111]' : 'bg-[#FAFAFA] border-2 border-[#111111] hover:bg-[#111111] hover:text-white'}`}>
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (New Section) ── */}
      <section className="py-20 md:py-24 border-b-4 border-[#111111] bg-white">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">Client Proof</p>
              <h2 className="text-4xl font-bold font-serif">Don't Take Our Word For It.</h2>
            </div>
            <p className="text-[#757575] max-w-sm">Hear directly from homeowners who chose our zero-headache, 100% turnkey approach.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Rahul S.", area: "Whitefield", text: "VastuCraft delivered exactly what they promised, on the exact date they promised. The 200-point QC checks meant I never had to worry about what was happening on site." },
              { name: "Priya & Anil", area: "Sarjapur", text: "The fixed-price contract is real. We made a few changes to the interior scope, but there were zero hidden structural costs. Truly a premium experience." },
              { name: "Dr. Venkat", area: "Yelahanka", text: "Having an in-house architect made all the difference. The transition from the blueprint to the actual physical build was seamless. Incredible quality." }
            ].map((t, i) => (
              <div key={i} className="p-8 border-2 border-[#111111] bg-[#FAFAFA]">
                <div className="flex gap-1 text-[#EA580C] mb-4">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="text-sm font-medium leading-relaxed mb-6 font-serif italic">"{t.text}"</p>
                <p className="text-xs font-bold uppercase tracking-widest">{t.name}</p>
                <p className="text-xs text-[#757575] uppercase">{t.area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERIOR SLIDER (DYNAMIC) ── */}
      <section className="border-b-4 border-[#111111]">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-[#111111] flex flex-col justify-center bg-[#111111] text-white">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">Interior Architecture</p>
            <h2 className="text-4xl font-bold font-serif mb-6">Designed From The Inside Out.</h2>
            <p className="text-white/70 mb-8 leading-relaxed font-medium">
              We design interiors concurrently with the structural plan. This allows for perfectly placed recessed lighting, concealed plumbing, and custom wall niches—eliminating post-construction modifications.
            </p>
            <div className="flex gap-4">
              {INTERIOR_PROJECTS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setInteriorIndex(i)}
                  className={`h-1.5 flex-1 transition-colors ${i === interiorIndex ? 'bg-[#EA580C]' : 'bg-[#333333]'}`}
                />
              ))}
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-white">{INTERIOR_PROJECTS[interiorIndex].label}</p>
          </div>
          <div className="relative aspect-square md:aspect-auto">
            {INTERIOR_PROJECTS.map((proj, i) => (
              <img 
                key={i} 
                src={proj.img} 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === interiorIndex ? 'opacity-100' : 'opacity-0'}`} 
                alt="Interior Design" 
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── DESIGN SYSTEM (BRAND GUIDELINES) ── */}
      <section id="design-system" className="py-20 md:py-24 border-b-4 border-[#111111] bg-[#FAFAFA]">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">Brand Identity</p>
            <h2 className="text-4xl font-bold font-serif mb-4">Design System</h2>
            <p className="text-[#757575] font-medium max-w-2xl leading-relaxed">
              A precise, high-contrast visual language built on deep black, stark white, and safety orange. Engineered for absolute clarity and unwavering trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Colors */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-6 border-b-2 border-[#111111] pb-3">Color Palette</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <div className="h-24 w-full bg-[#111111] border-2 border-[#111111]"></div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">Onyx Black</p>
                    <p className="text-xs text-[#757575] font-medium mt-1">#111111</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-24 w-full bg-[#EA580C] border-2 border-[#111111]"></div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">Safety Orange</p>
                    <p className="text-xs text-[#757575] font-medium mt-1">#EA580C</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-24 w-full bg-[#FAFAFA] border-2 border-[#111111]"></div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">Base White</p>
                    <p className="text-xs text-[#757575] font-medium mt-1">#FAFAFA</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-24 w-full bg-[#757575] border-2 border-[#111111]"></div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">Concrete Gray</p>
                    <p className="text-xs text-[#757575] font-medium mt-1">#757575</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-6 border-b-2 border-[#111111] pb-3">Typography</h3>
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-3">Primary Heading (Lora)</p>
                  <p className="text-4xl md:text-5xl font-bold font-serif leading-none text-[#111111]">Uncompromising Quality.</p>
                  <p className="text-xs text-[#757575] mt-3 uppercase tracking-widest font-bold">Serif • Bold • Headings</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-3">Secondary Body (Work Sans)</p>
                  <p className="text-base font-medium leading-relaxed text-[#111111]">Structured, geometric, and highly legible. Used for all body copy, interface elements, and detailed technical specifications across the platform.</p>
                  <p className="text-xs text-[#757575] mt-3 uppercase tracking-widest font-bold">Sans-Serif • Medium • Body & UI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER (Bold sign-board style) ── */}
      <footer id="contact" className="bg-[#111111] text-white">
        
        {/* Pre-footer Call to Action */}
        <div className="p-8 md:p-16 border-b-4 border-[#333333] bg-[#111111] text-white text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-[#EA580C]">Ready to Build Your Legacy?</h2>
          <p className="text-lg text-[#757575] mb-8">Book a free consultation and let's discuss your plot, vision, and budget.</p>
          <a href="#contact" className="inline-block px-10 py-4 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest hover:bg-white transition-colors">
            Start the Process
          </a>
        </div>

        {/* Actual Footer */}
        <div className="p-8 md:p-16 pb-8">
          <div className="grid md:grid-cols-4 gap-12 border-b-2 border-[#333333] pb-12 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#EA580C] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#111111]"></div>
                </div>
                <span className="text-3xl font-bold tracking-tight uppercase text-[#EA580C]" style={{ fontFamily: "'Lora', serif" }}>VastuCraft</span>
              </div>
              <p className="text-base text-white/90 max-w-sm mb-8 leading-relaxed font-medium">
                Bengaluru's premier turnkey construction company. Fixed prices, zero delays, and absolute transparency from blueprint to handover.
              </p>
              
              <div className="bg-[#111111] border border-[#333333] inline-flex flex-col px-6 py-4">
                <span className="text-xs uppercase tracking-widest text-[#757575] mb-1">Direct Line</span>
                <span className="text-xl font-bold uppercase tracking-widest text-[#EA580C]">+91 80 4567 8901</span>
              </div>
            </div>
            
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-6">Company</h5>
              <ul className="space-y-4">
                {["About", "Portfolio", "Packages", "Process", "Careers"].map(link => (
                  <li key={link}><a href="#" className="text-sm font-bold uppercase tracking-wide text-white hover:text-[#EA580C] transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-6">Headquarters</h5>
              <p className="text-sm font-medium leading-relaxed opacity-90 text-white">
                12/4, 3rd Cross, Indiranagar<br/>
                Bengaluru, Karnataka 560038
              </p>
              <a href="#" className="inline-block mt-4 text-xs font-bold uppercase tracking-widest border-b border-[#EA580C] text-[#EA580C] hover:text-white hover:border-white transition-all pb-1">Get Directions</a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-widest text-[#757575]">
            <p>© 2024 VASTUCRAFT Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
