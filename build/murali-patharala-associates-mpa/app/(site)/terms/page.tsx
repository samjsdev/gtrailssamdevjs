import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '../LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms for using the Murali Patharala & Associates website and information about its services, project imagery, and package guides.',
  alternates: { canonical: '/terms/' },
};

const sections: LegalSection[] = [
  {
    id: 'scope',
    title: 'Website scope',
    content: <>
      <p>These terms apply to your use of this website operated by <span className="brand-name">Murali Patharala &amp; Associates</span> (MPA). By using the site, you agree to use it lawfully and in a way that does not disrupt it or other visitors.</p>
      <p>These website terms do not replace a signed architectural, construction, or interior design agreement. If you become a client, the written project documents agreed with the relevant team govern that work.</p>
    </>,
  },
  {
    id: 'site-information',
    title: 'Service and package information',
    content: <>
      <p>Descriptions, timelines, inclusions, specifications, and package information on this site are general guides. They may change and may not cover every site condition, approval requirement, design choice, or project detail.</p>
      <p>A website enquiry, calculator result, or displayed package does not by itself form a service contract. A project scope, price, payment schedule, and any warranty are confirmed in the written quotation and agreement issued for that project.</p>
    </>,
  },
  {
    id: 'estimates',
    title: 'Estimates and project decisions',
    content: <>
      <p>Online figures and example rates are preliminary. Final fees and construction costs depend on drawings, measurements, location, site conditions, selected materials, approvals, and agreed scope. Please obtain a written proposal before making a financial or construction decision.</p>
      <p>Any commitment described as fixed price or warranty applies only on the terms stated in the signed project documents.</p>
    </>,
  },
  {
    id: 'visuals',
    title: 'Images, drawings, and portfolio',
    content: <>
      <p>Project photographs, drawings, 3D views, and renders illustrate design work or construction capabilities. A render may show a proposed outcome and may differ from a completed building. Materials and details for your project are determined by its approved drawings and written specifications.</p>
      <p>Do not copy, publish, or reuse site images, drawings, text, branding, or other content without permission from the relevant rights holder.</p>
    </>,
  },
  {
    id: 'external-services',
    title: 'Third-party services',
    content: <p>The website links to or embeds services such as Google Forms, Google Maps, and WhatsApp. Those services are operated by their respective providers and may have separate terms and privacy practices. We cannot control their availability or content.</p>,
  },
  {
    id: 'availability',
    title: 'Availability and responsibility',
    content: <>
      <p>We aim to keep the site accurate and available, but it may contain errors or be temporarily unavailable. Please contact us to confirm any detail important to your project.</p>
      <p>To the extent permitted by applicable law, we are not responsible for losses caused solely by relying on general website information without confirming it in a project-specific written agreement. Nothing here limits rights that cannot lawfully be excluded.</p>
    </>,
  },
  {
    id: 'changes-contact',
    title: 'Changes and contact',
    content: <>
      <p>We may update the website and these terms. The date at the top shows when this version was last updated. Your continued use of the site after changes means the current website terms apply to that use.</p>
      <p>For questions, call <a href="tel:+919841098490" className="underline">+91 98410 98490</a> or <a href="tel:+918778104969" className="underline">+91 87781 04969</a> or write to W115A, AL Complex, 3rd Avenue, W Block, Anna Nagar East, Chennai, Tamil Nadu 600040.</p>
    </>,
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms of Use" eyebrow="Website information / Project enquiries" introduction="The ground rules for using this website and understanding its service guides, package details, and project imagery." sections={sections} companion={{ href: '/privacy', label: 'Privacy Policy' }} />;
}
