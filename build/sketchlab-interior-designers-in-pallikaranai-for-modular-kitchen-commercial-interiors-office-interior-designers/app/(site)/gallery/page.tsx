import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond } from 'next/font/google';
import GalleryGrid from './GalleryGrid';
import { cleanClinicName } from '@/lib/copyCleaner';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

export default async function GalleryPage({ params }: { params?: any }) {
  const slug = ''; // standalone: slug not needed for data loading
  const data = await readSourceConfig(undefined, 'template2');
  if (!data) return notFound();

  const { clinic, media, doctor } = data;
  const cleanName = cleanClinicName(clinic.name);

  const defaultGalleryStock = [
    "/images/otherImages-1.jpg",
    "/images/otherImages-2.jpg",
    "/images/otherImages-3.jpg",
    "/images/otherImages-4.jpg",
    "/images/otherImages-5.jpg",
    "/images/otherImages-6.jpg",
    "/images/otherImages-7.jpg",
    "/images/otherImages-8.jpg",
    "/images/otherImages-9.jpg",
    "/images/otherImages-10.jpg",
    "/images/otherImages-11.jpg",
    "/images/otherImages-12.jpg",
    "/images/otherImages-13.jpg",
    "/images/otherImages-14.jpg",
    "/images/otherImages-15.jpg",
    "/images/otherImages-16.jpg",
    "/images/otherImages-17.jpg",
    "/images/otherImages-18.jpg",
    "/images/otherImages-19.jpg",
    "/images/otherImages-20.jpg",
    "/images/otherImages-21.jpg"
  ];

  const uniqueUserImages = Array.from(new Set([
    ...(media.clinicImages || []),
    ...(media.treatmentImages || []),
    ...(media.otherImages || [])
  ].filter(Boolean)));

  const PORTFOLIO = [];
  const imagesToUse = uniqueUserImages.length > 0 ? uniqueUserImages : defaultGalleryStock;

  const imageMapping: Record<string, { cat: string, title: string, desc: string }> = {
    "/images/clinicImages-1.jpg": { cat: "Residential", title: "Navy Blue Modular Kitchen", desc: "A sleek, functional culinary space with navy blue cabinetry and warm wooden accents." },
    "/images/clinicImages-2.jpg": { cat: "Commercial", title: "Design Studio Workspace", desc: "An open, collaborative office environment with glass partitions and modern workstations." },
    "/images/clinicImages-3.jpg": { cat: "Commercial", title: "Studio Exterior Facade", desc: "A striking nighttime view of the Sketchlab studio architecture and lighting." },
    "/images/clinicImages-4.jpg": { cat: "Commercial", title: "Conference & Training Room", desc: "A spacious, well-lit meeting room equipped with long desks and ergonomic seating." },
    "/images/treatmentImages-1.jpg": { cat: "Residential", title: "Modern Vanity & Bar Unit", desc: "An elegant backlit floral mirror paired with a fluted vanity and integrated wine rack." },
    "/images/treatmentImages-2.jpg": { cat: "Residential", title: "Azure Blue L-Shaped Kitchen", desc: "A vibrant and modular kitchen setup featuring striking azure blue cabinetry and clean white countertops." },
    "/images/treatmentImages-3.jpg": { cat: "Residential", title: "Chevron Pattern Bedroom Wardrobe", desc: "A sophisticated built-in wardrobe with wood chevron patterns and contrasting cream panels." },
    "/images/treatmentImages-4.jpg": { cat: "Commercial", title: "Open Plan Co-working Desks", desc: "A continuous commercial desk layout with overhead grey storage cabinets and task seating." },
    "/images/otherImages-1.jpg": { cat: "Residential", title: "Living Room with Pooja Unit", desc: "A modern living room featuring a carved wooden pooja cabinet with peacock motifs, a cream sofa, and marble coffee table." },
    "/images/otherImages-2.jpg": { cat: "Residential", title: "Premium Wardrobe with Glass Display", desc: "A luxurious bedroom wardrobe with fluted panels, backlit glass display shelving, and an integrated dressing area with oval mirror." },
    "/images/otherImages-3.jpg": { cat: "Residential", title: "Sage Green Modular Kitchen", desc: "A contemporary kitchen design featuring dark sage green cabinets and a beautifully marbled backsplash." },
    "/images/otherImages-4.jpg": { cat: "Residential", title: "Pastel Green Arched Living Room", desc: "A cozy, stylish living space defined by pastel green arched wall paneling and a tufted sofa." },
    "/images/otherImages-5.jpg": { cat: "Residential", title: "False Ceiling with Cove Lighting", desc: "A residential room showcasing a designer false ceiling with warm cove lighting and decorative pendant lamps." },
    "/images/otherImages-6.jpg": { cat: "Commercial", title: "Office Workstation & Cabinets", desc: "A clean commercial workspace featuring a long wooden desk with overhead grey storage cabinets and wall paneling." },
    "/images/otherImages-7.jpg": { cat: "Residential", title: "Curved TV Unit with Display Shelf", desc: "A bespoke wooden TV unit with rounded open shelving, fluted glass cabinets, and decorative Ganesha veena sculpture." },
    "/images/otherImages-8.jpg": { cat: "Residential", title: "Kids Bedroom with Leaf Art Headboard", desc: "A vibrant kids bedroom featuring a large circular backlit headboard with hand-painted tropical leaves and flowers." },
    "/images/otherImages-9.jpg": { cat: "Residential", title: "Modern Bathroom with Terrazzo Tiles", desc: "A designer bathroom with colorful terrazzo floor and wall tiles, a gold-framed oval mirror, fluted storage, and a wall-hung toilet." },
    "/images/otherImages-10.jpg": { cat: "Residential", title: "Mint Green L-Shaped Kitchen", desc: "A spacious L-shaped modular kitchen with glossy mint green cabinets, black granite countertop, wicker baskets, and chimney hood." },
    "/images/otherImages-11.jpg": { cat: "Commercial", title: "Office Workstation with Overhead Storage", desc: "A commercial office desk space with wooden wall paneling, a long curved countertop, and a grey overhead cabinet unit." },
    "/images/otherImages-12.jpg": { cat: "Residential", title: "Two-Tone Teal & Cream Wardrobe", desc: "A sleek bedroom wardrobe with cream upper panels and deep teal lower panels, shown with one door open revealing internal organization." },
    "/images/otherImages-13.jpg": { cat: "Commercial", title: "Sketchlab Studio Night Exterior", desc: "The illuminated Sketchlab Interior Design Studio storefront at night, showcasing the brand signage and street-level presence." },
    "/images/otherImages-14.jpg": { cat: "Commercial", title: "Open Office with Wall Desks", desc: "A spacious commercial office with long wall-mounted desks, overhead grey cabinets, and ergonomic swivel chairs." },
    "/images/otherImages-15.jpg": { cat: "Residential", title: "Showroom Display – Vanity & Bar Unit", desc: "A showroom display wall featuring a floral backlit mirror, blue fluted vanity, wine rack shelving, glass cabinets, and blue arched doors." },
    "/images/otherImages-16.jpg": { cat: "Residential", title: "Classic Blue & White Kitchen", desc: "An L-shaped modular kitchen with vibrant blue shaker-style base cabinets, white paneled uppers with diamond-pattern glass inserts, and quartz countertop." },
    "/images/otherImages-17.jpg": { cat: "Residential", title: "Mint Green Bedroom Wardrobe", desc: "A full-wall bedroom wardrobe in mint green and beige tones with black bar handles, set against a bed with chevron-patterned linen." },
    "/images/otherImages-18.jpg": { cat: "Residential", title: "TV Unit Under Construction", desc: "A TV wall unit being installed with dark marble backsplash, wooden slatted paneling, and white cabinets – site execution in progress." },
    "/images/otherImages-19.jpg": { cat: "Residential", title: "Mauve Wardrobe with Floating Console", desc: "A minimalist mauve-grey three-door wardrobe paired with a floating wooden console shelf, orchid flowers, and a wall mirror." },
    "/images/otherImages-20.jpg": { cat: "Residential", title: "Bedroom Wardrobe & Study Nook", desc: "A compact white wardrobe integrated with a cozy study desk nook featuring wooden slatted backlighting, floating shelves, and a laptop workspace." },
    "/images/otherImages-21.jpg": { cat: "Residential", title: "Grey Modular Kitchen with Gold Shelf", desc: "A premium grey L-shaped kitchen with backlit glass uppers, under-cabinet lighting, and a decorative gold diamond display shelf." },
    "/images/otherImages-22.jpg": { cat: "Residential", title: "Traditional Living Room with False Ceiling", desc: "A cozy living room featuring a geometric false ceiling with gold chandelier, Buddha statue, Ganesha art, and a partition shelf unit." },
    "/images/otherImages-23.jpg": { cat: "Residential", title: "Living Room Curtains & Drapery", desc: "Layered window treatments with brown jacquard curtains and sheer voile panels, accented by decorative pendant lights." },
    "/images/otherImages-24.jpg": { cat: "Residential", title: "Wardrobe Interior Organization", desc: "A split view showing a large closed wardrobe and its fully organized interior with hanging rods, shelves, and drawers for complete storage." },
    "/images/otherImages-25.jpg": { cat: "Residential", title: "Home Office & Music Studio", desc: "A dedicated workspace with dark fluted paneling, built-in desk, overhead cabinets, monitor, and a music keyboard setup." },
    "/images/otherImages-26.jpg": { cat: "Commercial", title: "Sketchlab Studio Glass Facade", desc: "A close-up nighttime shot of the Sketchlab studio glass entrance with reflections and interior visible through the glass." },
    "/images/otherImages-27.jpg": { cat: "Residential", title: "Carved Wooden Pooja Mandir", desc: "A tall temple-style wooden pooja unit with CNC-cut Ganesha motifs, hanging brass bells, lotus carvings, and stepped gopuram crown." },
    "/images/otherImages-28.jpg": { cat: "Residential", title: "Buddha Zen Fountain Corner", desc: "A serene entryway niche with a bronze Buddha water fountain, painted tree of life mural, and a cream storage cabinet below." },
    "/images/otherImages-29.jpg": { cat: "Residential", title: "Brown Wood & Frosted Glass Kitchen", desc: "A warm-toned wooden L-shaped kitchen corner with frosted glass overhead cabinets, black granite counter, and marble-pattern flooring." },
    "/images/otherImages-30.jpg": { cat: "Residential", title: "Wooden Slatted Room Partition", desc: "A floor-to-ceiling wooden slat partition dividing living spaces while maintaining visual flow and natural light." },
    "/images/otherImages-31.jpg": { cat: "Commercial", title: "Sketchlab Daytime Studio Exterior", desc: "A daytime street-level view of the Sketchlab Interior Design Studio building with signage for Architecture, Interior, and Construction." },
    "/images/otherImages-32.jpg": { cat: "Residential", title: "Teal Blue Study Nook", desc: "A stylish built-in study alcove with teal blue paneling, floating wooden shelves, backlit stone backsplash, and a red accent chair." },
    "/images/otherImages-33.jpg": { cat: "Commercial", title: "Open Plan Office & Co-working Space", desc: "A large open office with central conference desk, wall-mounted workstations, wood paneling, and glass partition, being set up for use." },
    "/images/otherImages-34.jpg": { cat: "Commercial", title: "Showroom Interior with Opening Sale", desc: "The Sketchlab showroom interior featuring a display window with Opening Sale promotional poster and various design showcases." },
    "/images/otherImages-35.jpg": { cat: "Residential", title: "Royal Blue & White Kitchen", desc: "A close-up view of an L-shaped modular kitchen with royal blue shaker base cabinets, white diamond-pattern uppers, and quartz countertop." },
    "/images/otherImages-36.jpg": { cat: "Residential", title: "Blue & Grey Bedroom Wardrobe", desc: "A full-wall bedroom wardrobe with sky blue and light grey panels, black bar handles, and overhead loft storage." },
    "/images/otherImages-37.jpg": { cat: "Residential", title: "Living Room with TV & Pooja Unit", desc: "A 3D render of a complete living room showing a wooden TV unit with grey drawers, marble floor, and a matching pooja cabinet with peacock design." },
    "/images/otherImages-38.jpg": { cat: "Residential", title: "Sliding Wardrobe with Corner Shelf", desc: "A modern white and grey sliding-door wardrobe with gold trim accents, an open corner display with hooks and a mushroom lamp." },
    "/images/otherImages-39.jpg": { cat: "Residential", title: "Grey & White Wardrobe with Dresser", desc: "A floor-to-ceiling grey and white three-door wardrobe with an attached dressing mirror, drawer unit, and pink accent wall." },
    "/images/otherImages-40.jpg": { cat: "Studio & Process", title: "Sketchlab Promotional Poster", desc: "A marketing poster for Sketchlab featuring 'Build Your Elegant Dream Home Interior' tagline with a green sofa and branding." },
    "/images/otherImages-41.jpg": { cat: "Commercial", title: "Computer Lab & Training Center", desc: "A spacious commercial training room with dual rows of workstations, overhead grey storage cabinets, monitors, and ergonomic chairs." },
    "/images/otherImages-42.jpg": { cat: "Residential", title: "Navy Fluted TV Unit & Display", desc: "A premium living room feature wall with navy blue fluted panel, floating blue console, white open display shelf with backlighting, and art sculptures." },
    "/images/otherImages-43.jpg": { cat: "Commercial", title: "Office with Curved Workstations", desc: "A side view of a spacious commercial office showing long curved wooden desks, overhead grey storage, and workstation seating." },
    "/images/otherImages-44.jpg": { cat: "Residential", title: "Grey & White Five-Door Wardrobe", desc: "A modern five-door wardrobe with grey and white panels, long wooden bar handles, and a dark accent wall backdrop." },
    "/images/otherImages-45.jpg": { cat: "Commercial", title: "Corporate Training Facility", desc: "A view of the expansive commercial training center, ready for professional use." }
  };

  for (let i = 0; i < imagesToUse.length; i++) {
    const imgUrl = imagesToUse[i];
    const design = imageMapping[imgUrl] || {
      cat: "Residential",
      title: "Bespoke Interior Design",
      desc: "A carefully curated space combining aesthetic beauty with modern functionality."
    };

    PORTFOLIO.push({
      cat: design.cat,
      title: design.title,
      desc: design.desc,
      img: imgUrl
    });
  }

  return (
    <div className="font-sans text-[#2A2421] bg-[#F7F4EF] min-h-screen pb-24 space-y-16">
      {/* Hero Header */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-20 pb-12">
        <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
          PORTFOLIO SHOWCASE
        </div>

        <h1 className={`${cormorant.className} text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-tight`}>
          {clinic.name || "Refined Projects"} &amp; <span className="text-[#8E7056] italic">Curated Spaces</span>
        </h1>

        <p className="text-sm sm:text-base text-[#2A2421]/90 font-light leading-relaxed max-w-xl mx-auto">
          {clinic.description || "Explore our completed premium interior design and turnkey fabrication projects across Chennai."}
        </p>

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 pt-6 max-w-xl mx-auto">
          {[
            { num: '250+', label: 'Completed Projects' },
            { num: '12+', label: 'Service Offerings' },
            { num: doctor?.experience ? doctor.experience.replace(/\D/g, '') + '+' : '8+', label: 'Years Experience' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className={`${cormorant.className} text-3xl font-bold text-[#2A2421]`}>{stat.num}</span>
              <span className="text-[9px] font-bold text-[#2A2421]/75 uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="flex items-center gap-6 max-w-5xl mx-auto px-4">
        <div className="h-px flex-1 bg-[#EAE3D8]" />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2A2421]/75">
          Bespoke Chennai Collection
        </span>
        <div className="h-px flex-1 bg-[#EAE3D8]" />
      </div>

      {/* Interactive gallery grid */}
      <section id="gallery-grid" className="max-w-7xl mx-auto px-4">
        <GalleryGrid items={PORTFOLIO} />
      </section>
    </div>
  );
}
