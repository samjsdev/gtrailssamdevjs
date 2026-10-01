import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '../LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Murali Patharala & Associates handles information shared through its website, enquiry form, phone, and WhatsApp.',
  alternates: { canonical: '/privacy/' },
};

const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who this policy covers',
    content: <>
      <p><span className="brand-name">Murali Patharala &amp; Associates</span> (MPA) operates this website. Enquiries about residential construction may also be handled by the <span className="brand-name">ARCH foundations</span> team identified on the site. This policy explains how information is handled when you browse the site or contact us about a project.</p>
      <p>For privacy questions, call us on <a href="tel:+919841098490" className="underline">+91 98410 98490</a> or <a href="tel:+918778104969" className="underline">+91 87781 04969</a> or write to W115A, AL Complex, 3rd Avenue, W Block, Anna Nagar East, Chennai, Tamil Nadu 600040.</p>
    </>,
  },
  {
    id: 'information',
    title: 'Information you share',
    content: <>
      <p>When you enquire, you may provide your name, phone number, email address, plot or project location, property details, preferred services, budget or timeline, and anything you include in your message or attachments.</p>
      <p>The contact page uses an embedded Google Form. You can also contact us by phone, email, or WhatsApp. Information sent through those services is processed by the relevant provider under its own privacy terms as well as being received by us.</p>
    </>,
  },
  {
    id: 'use',
    title: 'How we use it',
    content: <>
      <p>We use enquiry information to respond to you, understand your project, arrange calls or site visits, prepare proposals or estimates, and communicate about work you ask us to undertake. We may also use basic technical information needed to operate, secure, and troubleshoot the website.</p>
      <p>If a project proceeds, its drawings, correspondence, and related records may be handled under the separate documents agreed for that project.</p>
    </>,
  },
  {
    id: 'sharing',
    title: 'Who may receive it',
    content: <>
      <p>Relevant MPA or <span className="brand-name">ARCH foundations</span> team members may review your enquiry. We may use service providers that support the website and communications, including the hosting provider, Google Forms and Maps, and WhatsApp when you choose to use those features. We may also disclose information when required by applicable law.</p>
    </>,
  },
  {
    id: 'third-party-services',
    title: 'Embedded services and browser data',
    content: <>
      <p>The site embeds Google Forms and Google Maps and links to WhatsApp. These services may collect device, browser, usage, or cookie information when their content loads or when you open them. Their own privacy notices explain their practices and controls.</p>
      <p>Your browser and the website host may also process routine connection information, such as an IP address and request details, to deliver and protect the site.</p>
    </>,
  },
  {
    id: 'retention-security',
    title: 'Retention and security',
    content: <>
      <p>We retain information for as long as reasonably needed to respond to an enquiry, manage a resulting project, maintain necessary records, or meet legal obligations. The period depends on the type of information and whether a project proceeds.</p>
      <p>We take reasonable steps to limit access and protect information. No website or electronic transmission can be guaranteed completely secure.</p>
    </>,
  },
  {
    id: 'your-choices',
    title: 'Your choices and requests',
    content: <>
      <p>You can contact us to ask what personal information we hold about you, request a correction or deletion, or withdraw an enquiry. We will consider and respond to requests in accordance with applicable law and any records we must retain.</p>
      <p>You can manage third-party cookies through your browser and the relevant provider’s settings. You may also contact us by phone instead of using the embedded form.</p>
    </>,
  },
  {
    id: 'updates',
    title: 'Changes to this policy',
    content: <p>We may update this policy when the website, our practices, or applicable requirements change. The date at the top of this page shows when this version was last updated.</p>,
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" eyebrow="Your information / Our approach" introduction="A clear account of the information you share with us and how it is used when you explore or enquire about a project." sections={sections} companion={{ href: '/terms', label: 'Terms of Use' }} />;
}
