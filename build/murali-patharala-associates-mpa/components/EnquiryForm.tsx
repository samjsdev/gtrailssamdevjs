import Link from 'next/link';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf5Nw637wAR9PPdKnAKgcFdgfmmTaXFDVtUP8WgKSfvf13gEg/viewform';

export default function EnquiryForm() {
  return (
    <div className="space-y-5">
      <div className="bg-surface-cream border border-[#D8D2C8] overflow-hidden flex justify-center">
        <iframe
          src={`${FORM_URL}?embedded=true`}
          width="100%"
          height="961"
          className="w-full max-w-[640px] border-0 bg-transparent mx-auto"
          title="Project enquiry Google Form"
        >
          Loading…
        </iframe>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-ink-muted">
        <span>Prefer a separate window?</span>
        <a className="mpa-outline-cta mpa-outline-cta--accent" href={FORM_URL} target="_blank" rel="noopener noreferrer">
          Open the enquiry form ↗
        </a>
      </div>
      <p className="text-center text-xs leading-relaxed text-ink-muted">
        This enquiry form is provided by Google. Read our <Link href="/privacy" className="font-semibold text-[#703015] underline underline-offset-4 hover:text-[#302A20]">Privacy Policy</Link> for how we handle the details you share.
      </p>
    </div>
  );
}
