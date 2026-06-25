import React from 'react';
import { Metadata } from 'next';
import { readSourceConfig } from '@/lib/sourceData';

export async function generateMetadata(): Promise<Metadata> {
  const data = await readSourceConfig(undefined, 'template4');
  const clinicName = data?.clinic?.name || "Waring Interiors Ltd";

  return {
    title: `Privacy Policy | ${clinicName}`,
    description: `Privacy Policy for ${clinicName}. Learn how we protect and manage your data.`,
  };
}

export default async function PrivacyPage() {
  const data = await readSourceConfig(undefined, 'template4');
  const clinicName = data?.clinic?.name || "Waring Interiors Ltd";
  const email = data?.clinic?.contact?.email || "info@waringinteriors.com";

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 border border-stone-200 shadow-sm">
        <h1 className="text-3xl md:text-5xl font-light text-stone-900 mb-12">Privacy Policy</h1>
        
        <div className="space-y-8 text-stone-600 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">1. Introduction & Compliance</h2>
            <p>
              At {clinicName}, we respect your privacy and are committed to protecting your personal data. This privacy policy informs you as to how we look after your personal data when you visit our website. Our privacy practices are designed to be compliant with applicable laws in the United Kingdom and the European Union, including the General Data Protection Regulation (GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">2. Voluntary Data Collection</h2>
            <p>
              We only collect personal contact information that you voluntarily provide to us by your own free will. This may occur when you fill out a form or contact us directly. The data we may collect in these instances includes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Identity & Contact Data:</strong> Includes your name, postal address, and contact email address.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">3. Tracking, Analytics & Cookies</h2>
            <p>
              While we rely on your voluntary submission for contact details, we and our third-party service providers may automatically collect certain technical information when you visit our site.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Google Analytics:</strong> We use Google Analytics to analyze website traffic and user behavior. Google Analytics uses cookies and may collect data such as your IP address, your geographic region, browser type, and interaction with our pages.</li>
              <li><strong>Third-Party Embeds:</strong> Our website utilizes external services, including Google Forms for inquiries and Instagram embeds for displaying our portfolio. These platforms may set their own cookies and track your interactions according to their respective privacy policies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">4. Your Data Protection Rights</h2>
            <p>
              If you are a resident of the UK or the EU, you have certain rights under data protection laws, including the right to request access to, correction of, or deletion of your personal data. You also have the right to restrict or object to our processing of your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at {email}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
