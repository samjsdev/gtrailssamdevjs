import React from 'react';
import { Metadata } from 'next';
import { readSourceConfig } from '@/lib/sourceData';

export async function generateMetadata(): Promise<Metadata> {
  const data = await readSourceConfig(undefined, 'template4');
  const clinicName = data?.clinic?.name || "Waring Interiors Ltd";

  return {
    title: `Terms & Conditions | ${clinicName}`,
    description: `Terms and Conditions of Service for ${clinicName}.`,
  };
}

export default async function TermsPage() {
  const data = await readSourceConfig(undefined, 'template4');
  const clinicName = data?.clinic?.name || "Waring Interiors Ltd";

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 border border-stone-200 shadow-sm">
        <h1 className="text-3xl md:text-5xl font-light text-stone-900 mb-12">Terms & Conditions</h1>
        
        <div className="space-y-8 text-stone-600 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">1. Agreement to Terms</h2>
            <p>
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and {clinicName} ("we," "us" or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">3. User Representations</h2>
            <p>
              By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">4. Services and Pricing</h2>
            <p>
              All interior design services and consultations are subject to availability and may be governed by separate, specific service agreements or contracts between {clinicName} and the client. Estimates and quotes provided through the website or initial consultation are not binding until a formal contract is signed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-800 mb-4 uppercase tracking-widest text-sm">5. Modifications and Interruptions</h2>
            <p>
              We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
