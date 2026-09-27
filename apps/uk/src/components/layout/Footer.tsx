import React from 'react';
import Link from 'next/link';
import { FOOTER_NAV } from '@/data/navigation';

export function Footer() {
  return (
    <footer className="site-footer bg-[#050606] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Service / Trust Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-white/10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-white">Free Tracked UK Delivery</h3>
              <p className="text-[12.5px] text-white/60">Dispatched within 1–3 business days</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-white">2-Year Manufacturer Warranty</h3>
              <p className="text-[12.5px] text-white/60">Full motor & battery defect protection</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l4 2" />
              </svg>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-white">30-Day Defective Guarantee</h3>
              <p className="text-[12.5px] text-white/60">Prompt RMA replacement or full refund</p>
            </div>
          </div>
        </div>

        {/* 4-Column Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-white/10">
          {/* Column 1: Products */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-white/50 mb-4">
              {FOOTER_NAV.products.title}
            </h4>
            <ul className="space-y-2.5 text-[13.5px]">
              {FOOTER_NAV.products.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Guides & Tools */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-white/50 mb-4">
              {FOOTER_NAV.guides.title}
            </h4>
            <ul className="space-y-2.5 text-[13.5px]">
              {FOOTER_NAV.guides.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care & Legal */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-white/50 mb-4">
              {FOOTER_NAV.careAndLegal.title}
            </h4>
            <ul className="space-y-2.5 text-[13.5px]">
              {FOOTER_NAV.careAndLegal.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: London Headquarters & Support */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-white/50 mb-4">
              {FOOTER_NAV.contactInfo.title}
            </h4>
            <div className="space-y-3 text-[13.5px] text-white/70 leading-relaxed">
              <p>
                <strong className="text-white block">Address:</strong>
                {FOOTER_NAV.contactInfo.address}
              </p>
              <p>
                <strong className="text-white block">Operating Hours:</strong>
                {FOOTER_NAV.contactInfo.hours}
              </p>
              <p>
                <strong className="text-white block">Email Support:</strong>
                <a
                  href={`mailto:${FOOTER_NAV.contactInfo.email}`}
                  className="text-white hover:underline"
                >
                  {FOOTER_NAV.contactInfo.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment SVGs */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[12.5px] text-white/50">
          <p>© {new Date().getFullYear()} Miroooo. All rights reserved. Registered UK storefront.</p>

          {/* 5 SVG Payment Badges */}
          <div className="flex items-center gap-3" aria-label="Accepted payment methods">
            {/* Visa */}
            <span className="h-7 px-2.5 rounded bg-white/10 flex items-center justify-center font-bold text-white text-[11px] tracking-wider">
              VISA
            </span>
            {/* Mastercard */}
            <span className="h-7 px-2.5 rounded bg-white/10 flex items-center justify-center font-bold text-white text-[11px] tracking-wider">
              MC
            </span>
            {/* Amex */}
            <span className="h-7 px-2.5 rounded bg-white/10 flex items-center justify-center font-bold text-white text-[11px] tracking-wider">
              AMEX
            </span>
            {/* PayPal */}
            <span className="h-7 px-2.5 rounded bg-white/10 flex items-center justify-center font-bold text-white text-[11px] tracking-wider">
              PAYPAL
            </span>
            {/* Apple Pay */}
            <span className="h-7 px-2.5 rounded bg-white/10 flex items-center justify-center font-bold text-white text-[11px] tracking-wider">
              PAY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
