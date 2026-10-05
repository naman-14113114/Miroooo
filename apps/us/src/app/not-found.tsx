import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-page min-h-[70vh] bg-[#080909] text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6 p-8 rounded-3xl bg-[#111213] border border-white/10 shadow-2xl">
        <span className="text-5xl block font-extrabold text-white/40">404</span>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Page Not Found</h1>
          <p className="text-sm text-white/60">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-extrabold text-sm hover:bg-neutral-200 transition-colors shadow-lg"
          >
            Return to Home
          </Link>
          <Link
            href="/all-products"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors border border-white/15"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
