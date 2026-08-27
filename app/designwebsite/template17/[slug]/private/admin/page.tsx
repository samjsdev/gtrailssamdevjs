import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivateAdminPage() {
  return (
    <section aria-label="Private CMS dashboard" className="min-h-screen bg-white text-slate-900">
      <Script id="decap-manual-init" strategy="beforeInteractive">
        {`window.CMS_MANUAL_INIT = true;`}
      </Script>

      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />

      <Script id="decap-bootstrap" strategy="afterInteractive">
        {`
          (function initDecap(retries) {
            if (window.CMS && typeof window.CMS.init === "function") {
              window.CMS.init({ config: "/private/admin/config.yml" });
              return;
            }
            if (retries > 0) {
              setTimeout(function retry() {
                initDecap(retries - 1);
              }, 120);
            }
          })(80);
        `}
      </Script>

      <div id="nc-root" />
    </section>
  );
}
