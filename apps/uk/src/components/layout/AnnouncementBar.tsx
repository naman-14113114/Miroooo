'use client';

import React from 'react';

export function AnnouncementBar() {
  const tickerItemSet = (
    <>
      <div className="miroooo-ticker-item">
        <span>FREE SHIPPING ON ALL ORDERS</span> <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span>50% OFF TODAY</span> <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span>ULTRA LIGHTWEIGHT</span> <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span>4.9 STARS FROM 40,000+ CUSTOMERS</span> <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
    </>
  );

  return (
    <div
      className="announcement"
      style={{
        background: '#e6e6e6',
        color: '#111111',
        padding: '4px 0',
        overflow: 'hidden',
        width: '100%',
        minHeight: '24px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="miroooo-announcement-ticker">
        {Array.from({ length: 12 }).map((_, i) => (
          <React.Fragment key={i}>{tickerItemSet}</React.Fragment>
        ))}
      </div>
    </div>
  );
}
