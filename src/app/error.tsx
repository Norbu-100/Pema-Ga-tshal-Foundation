'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-red-50 p-8 rounded-2xl max-w-md w-full shadow-sm border border-red-100">
        <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">Something went wrong!</h2>
        <p className="text-slate-600 mb-8">
          We apologize for the inconvenience. An unexpected error has occurred while processing your request.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-[var(--color-pgf-primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-pgf-primary)]/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
