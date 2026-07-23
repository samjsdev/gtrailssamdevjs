import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Misi Associates',
  description: 'Terms of Service for using the Misi Associates website and services.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Terms() {
  return (
    <div className="min-h-screen py-32 px-6" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-[var(--muted)]">
          <section>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              Welcome to Misi Associates. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>1. Disclaimer</h2>
            <p>
              The content provided on this website is for informational purposes only and is intended to highlight our architectural, construction, project management, and interior design solutions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>2. Use of Website</h2>
            <p>
              You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>3. Consultations and Enquiries</h2>
            <p>
              Consultations scheduled through our website or by phone are subject to availability. We request that you provide advance notice if you need to reschedule a site visit or appointment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>4. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and project portfolios, is the property of Misi Associates or its content suppliers and is protected by copyright laws. You may not reproduce, distribute, modify, or create derivative works without our express written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>5. Limitation of Liability</h2>
            <p>
              Misi Associates shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of, or inability to use, the materials on this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>7. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
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
