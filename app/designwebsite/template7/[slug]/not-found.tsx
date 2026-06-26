import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-8xl md:text-9xl font-serif mb-6 opacity-20 select-none" style={{ color: 'var(--accent-2)' }}>404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>
        <p className="text-lg mb-10 leading-relaxed" style={{ color: 'var(--muted)' }}>
          We couldn't find the page you were looking for. It might have been moved, deleted, or the link might be incorrect.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all duration-300 rounded-full hover:scale-105 hover:shadow-lg"
          style={{ 
            backgroundColor: 'var(--accent-2)', 
            color: 'var(--bg)' 
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
