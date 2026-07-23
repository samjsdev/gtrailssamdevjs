import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Misi Associates',
  description: 'Privacy Policy for Misi Associates. Understand how we handle your personal information and project data.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Privacy() {
  return (
    <div className="min-h-screen py-32 px-6" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-[var(--muted)]">
          <section>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              At Misi Associates, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>1. Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, phone number, email address, and other contact details you provide when requesting a consultation or contacting us.</li>
              <li><strong>Project Information:</strong> Architectural requirements, site details, design preferences, and project records necessary for providing our services.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, and pages visited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>2. How We Use Your Information</h2>
            <p className="mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To schedule and manage your consultations.</li>
              <li>To provide architectural, construction, and interior design solutions.</li>
              <li>To communicate with you regarding your project plans or inquiries.</li>
              <li>To improve our website and services based on feedback and usage patterns.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your project records are kept confidential and are only accessible to authorized personnel involved in your project.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>4. Sharing of Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Trusted service providers who assist us in operating our website or conducting our business, provided they agree to keep this information confidential.</li>
              <li>Legal authorities if required by law or to protect our rights and safety.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>5. Cookies</h2>
            <p>
              Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may affect the functionality of certain parts of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4">
              <p><strong>Misi Associates</strong></p>
              <p>S3 Second Floor, Subam 9/5, College Road, Nungambakkam, Chennai, Tamil Nadu 600006</p>
              <p>Email: contact@misiassociates.com</p>
              <p>Phone: +91 82200 27117</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
