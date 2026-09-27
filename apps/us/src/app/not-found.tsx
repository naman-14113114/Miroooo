import Link from "next/link";
import { ArrowRight, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 text-white">
      <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 mb-6">
        <Sparkles size={28} />
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
        Page Not Found
      </p>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-sans mb-4">
        404
      </h1>

      <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mb-8 leading-relaxed">
        The page you are looking for does not exist or has moved. Explore our electric toothbrushes
        or return home.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xl"
        >
          <Home size={15} />
          <span>Return Home</span>
        </Link>

        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-wider border border-neutral-700 transition flex items-center justify-center gap-2"
        >
          <span>Shop Products</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
