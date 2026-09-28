'use client';

import React from 'react';
import Link from 'next/link';

export function CartMinimalHeader() {
  return (
    <header className="cart-minimal-header bg-[#080909] text-white border-b border-white/10">
      <div className="bg-[#111213] py-2 text-center text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80">FREE SHIPPING ON ALL ORDERS&nbsp; • &nbsp;50% OFF TODAY&nbsp; • &nbsp;ULTRA LIGHTWEIGHT</div>
      <div className="max-w-7xl mx-auto flex items-center justify-center py-5 px-6">
        <Link
          href="/"
          className="font-extrabold uppercase tracking-[0.08em] text-white text-xl"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          MIROOOO
        </Link>

      </div>
    </header>
  );
}
