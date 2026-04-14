import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-heading font-bold text-slate-200">404</h1>
      <div className="mt-[-2rem] relative z-10">
        <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        <Link
          href="/"
          className="inline-block bg-[var(--color-pgf-primary)] text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-[var(--color-pgf-primary)]/90 transition-all hover:scale-105"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
