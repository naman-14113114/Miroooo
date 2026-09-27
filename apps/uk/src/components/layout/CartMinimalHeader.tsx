'use client';

import React from 'react';
import Link from 'next/link';

export function CartMinimalHeader() {
  return (
    <header className="cart-minimal-header bg-[#080909] text-white border-b border-white/10 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-extrabold uppercase tracking-[0.08em] text-white text-xl"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          MIROOOO
        </Link>

        <div className="flex items-center gap-2 text-[12.5px] text-white/70">
          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>

        <Link
          href="/shop"
          className="text-[13px] font-semibold text-white/80 hover:text-white underline underline-offset-4"
        >
          Continue Shopping
        </Link>
      </div>
    </header>
  );
}
