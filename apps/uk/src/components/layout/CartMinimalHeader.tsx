'use client';

import React from 'react';
import Link from 'next/link';
import { AnnouncementBar } from './AnnouncementBar';

export function CartMinimalHeader() {
  return (
    <><AnnouncementBar /><header className="site-header site-header--cart">
      <div className="header__logo flex items-center justify-center w-full" style={{ padding: '16px 0' }}>
        <Link
          href="/"
          className="header__logo-link"
          style={{ fontFamily: "'Montserrat', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: 'clamp(1.35rem, 2vw, 1.65rem)', fontWeight: 800, letterSpacing: '.03em', color: '#fff', lineHeight: 1 }}
        >
          MIROOOO
        </Link>

      </div>
    </header></>
  );
}
