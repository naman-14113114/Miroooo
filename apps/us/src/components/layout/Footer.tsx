import Link from "next/link";
import { Clock, Headphones, ShieldCheck, Truck } from "lucide-react";
import { footerColumns } from "@/data/navigation";
import { legalEntity } from "@/data/policies";

export function Footer() {
  return (
    <>
      {/* Customer Care Service Strip */}
      <section
        className="border-t border-b border-[rgba(255,255,255,0.08)] bg-[#0d0e0e] text-neutral-300 py-10"
        aria-label="Customer Care Highlights"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Tracked US Delivery</h4>
                <p className="text-xs text-neutral-400 mt-1">Free on all toothbrush orders</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">90-Day Home Trial</h4>
                <p className="text-xs text-neutral-400 mt-1">Risk-free satisfaction guarantee</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white">
                <Clock size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">2-Year Warranty</h4>
                <p className="text-xs text-neutral-400 mt-1">Full replacement coverage</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white">
                <Headphones size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Dedicated Support</h4>
                <p className="text-xs text-neutral-400 mt-1">US EST hours · Fast email response</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 4-Column Footer */}
      <footer className="bg-[#080909] text-white pt-16 pb-12 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-[rgba(255,255,255,0.08)]">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="text-2xl font-black tracking-widest uppercase hover:opacity-90 transition font-sans"
              >
                MIROOOO
              </Link>
              <p className="mt-4 text-xs text-neutral-400 leading-relaxed max-w-sm">
                Quietly precise sonic oral care, engineered around the everyday ritual. Designed
                for long-lasting performance and bathroom counter elegance.
              </p>
              <div className="mt-6 text-xs text-neutral-400 space-y-1.5">
                <p className="font-semibold text-neutral-300">{legalEntity.company}</p>
                <p>{legalEntity.address}</p>
                <p>Hours: {legalEntity.hours}</p>
                <a
                  href={`mailto:${legalEntity.email}`}
                  className="inline-block text-white hover:underline mt-1 font-medium"
                >
                  {legalEntity.email}
                </a>
              </div>
            </div>

            {/* 4 Structured Menu Columns */}
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-5">
                  {col.title}
                </h3>
                <ul className="space-y-3 text-xs text-neutral-400">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Row: Copyright, entity & SVGs */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xs text-neutral-400 text-center md:text-left space-y-1">
              <p>© {new Date().getFullYear()} Miroooo ({legalEntity.company}). All rights reserved.</p>
              <p className="text-[11px] text-neutral-400">United States Store · USD ($)</p>
            </div>

            {/* 5 SVG Payment Icons */}
            <div className="flex items-center gap-2.5 flex-wrap justify-center" aria-label="Accepted Payment Methods">
              {/* Visa */}
              <div className="h-7 px-2.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <svg className="h-3.5 w-auto" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.16 1.05L13.1 15.35H8.76L5.35 3.9C5.14 3.06 4.96 2.76 4.3 2.39C3.23 1.8 1.5 1.25 0 0.92L0.1 0.45H7.72C8.75 0.45 9.66 1.15 9.88 2.29L11.75 12.3L16.4 1.05H19.16ZM36.03 10.65C36.05 6.78 30.58 6.57 30.62 4.79C30.64 4.25 31.17 3.67 32.32 3.52C32.89 3.44 34.46 3.39 36.14 4.15L36.81 1.05C35.88 0.72 34.69 0.4 33.17 0.4C29.13 0.4 26.25 2.5 26.22 5.51C26.19 7.74 28.23 8.98 29.77 9.72C31.35 10.48 31.88 10.97 31.87 11.66C31.85 12.72 30.58 13.19 29.41 13.2C27.47 13.22 26.33 12.67 25.43 12.26L24.73 15.48C25.75 15.94 27.63 16.33 29.58 16.35C33.86 16.35 36.63 14.28 36.65 11.02L36.03 10.65ZM46.96 15.35H50.8L47.45 1.05H43.91C43.12 1.05 42.45 1.51 42.16 2.21L36.03 15.35H40.38L41.25 12.98H46.56L46.96 15.35ZM42.44 9.77L44.62 3.86L45.86 9.77H42.44ZM25.04 1.05L21.67 15.35H17.52L20.89 1.05H25.04Z" fill="#ffffff"/>
                </svg>
              </div>

              {/* Mastercard */}
              <div className="h-7 px-2.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <svg className="h-4 w-auto" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="#EB001B" fillOpacity="0.9"/>
                  <circle cx="22" cy="10" r="10" fill="#F79E1B" fillOpacity="0.9"/>
                  <path d="M16 3.8C18.2 5.4 19.6 8 19.6 11C19.6 14 18.2 16.6 16 18.2C13.8 16.6 12.4 14 12.4 11C12.4 8 13.8 5.4 16 3.8Z" fill="#FF5F00"/>
                </svg>
              </div>

              {/* American Express */}
              <div className="h-7 px-2.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <span className="text-[10px] font-black tracking-tighter text-blue-400">AMEX</span>
              </div>

              {/* Apple Pay */}
              <div className="h-7 px-2.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <svg className="h-3.5 w-auto" viewBox="0 0 32 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.4 7.6C5.4 5.9 6.8 5 6.9 4.9C6 3.6 4.7 3.4 4.2 3.3C3.1 3.2 2 4 1.4 4C0.8 4 0 3.3 -0.8 3.3C-1.8 3.3 -3.1 4.1 -3.8 5.2C-5.3 7.8 -4.2 11.6 -2.7 13.7C-2 14.7 -1.2 15.8 -0.1 15.8C0.9 15.7 1.3 15.1 2.5 15.1C3.7 15.1 4.1 15.7 5.2 15.8C6.3 15.8 7 14.8 7.7 13.8C8.5 12.6 8.8 11.5 8.9 11.4C8.8 11.3 6.9 10.6 6.9 8.3L5.4 7.6ZM3.4 2.2C3.9 1.6 4.2 0.8 4.1 0C3.4 0 2.5 0.5 2 1.1C1.6 1.6 1.2 2.4 1.3 3.2C2.1 3.3 2.9 2.8 3.4 2.2Z" transform="translate(6, 0)"/>
                  <text x="16" y="12" fontSize="9" fontWeight="bold" fill="currentColor" fontFamily="sans-serif">Pay</text>
                </svg>
              </div>

              {/* Google Pay */}
              <div className="h-7 px-2.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <span className="text-[10px] font-bold text-neutral-200">G Pay</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
