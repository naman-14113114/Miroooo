import React from 'react';
import Link from 'next/link';

export function CartMinimalFooter() {
  return (
    <footer className="cart-minimal-footer bg-[#050606] text-white/60 border-t border-white/10 py-8 px-6 text-[12.5px]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Miroooo UK. All rights reserved. 71-75 Shelton St, London WC2H 9JQ.</p>
        <div className="flex items-center gap-4">
          <Link href="/policies/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/policies/terms-of-service" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/policies/return-policy" className="hover:text-white transition-colors">
            Returns &amp; Refunds
          </Link>
        </div>
      </div>
    </footer>
  );
}
