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
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">1. Introduction</h2>
            <p>
              At {clinicName}, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">2. The Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.
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
