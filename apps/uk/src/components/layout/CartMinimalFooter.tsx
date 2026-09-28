import React from 'react';
import Link from 'next/link';

export function CartMinimalFooter() {
  return (
    <footer className="cart-minimal-footer bg-[#080909] text-white/60 border-t border-white/10 py-9 px-6 text-[12px] text-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/50">SECURE PAYMENTS • FREE TRACKED UK DELIVERY • HASSLE-FREE REFUNDS</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/policies/shipping-policy" className="hover:text-white">Shipping Policy</Link>
          <Link href="/policies/return-policy" className="hover:text-white">Return Policy</Link>
          <Link href="/policies/refund-policy" className="hover:text-white">Refund Policy</Link>
          <Link href="/policies/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/policies/terms-of-service" className="hover:text-white">Terms of Service</Link>
          <Link href="/pages/contact-us" className="hover:text-white">Contact Us</Link>
        </div>
        <p>© {new Date().getFullYear()} Miroooo UK. All rights reserved.</p>
      </div>
    </footer>
  );
}
