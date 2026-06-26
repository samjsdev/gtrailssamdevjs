import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Lumina Interior',
  description: 'Terms of Service for using the Lumina Interior website and services.',
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
              Welcome to Lumina Interior. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>1. Disclaimer</h2>
            <p>
              The content provided on this website is for informational purposes only and is not intended to be a substitute for professional design advice. Always seek the advice of a qualified interior designer or architect with any questions you may have regarding your project. Never disregard professional advice or delay in seeking it because of something you have read on this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>2. Use of Website</h2>
            <p>
              You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>3. Consultations and Cancellations</h2>
            <p>
              Consultations scheduled through our website or by phone are subject to availability. We request that you provide at least 24 hours' notice if you need to cancel or reschedule a consultation. Failure to do so may result in a cancellation fee.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>4. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the property of Lumina Interior or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, modify, or create derivative works of any content without our express written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>5. Limitation of Liability</h2>
            <p>
              Lumina Interior shall not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products, even if Lumina Interior has been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after any changes indicates your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>7. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Chennai.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4">
              <p><strong>Lumina Interior</strong></p>
              <p>123 Innovation Drive, Tech City, TC 90210</p>
              <p>Email: contact@luminainterior.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
