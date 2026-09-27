'use client';

import React from 'react';

export function AnnouncementBar() {
  const tickerItemSet = (
    <>
      <div className="miroooo-ticker-item">
        <span>FREE TRACKED UK DELIVERY</span> <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span>60-DAY RISK-FREE TRIAL</span> <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span>2-YEAR WARRANTY</span> <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span>RATED 4.9/5 BY DENTISTS</span> <span className="miroooo-ticker-dot" aria-hidden="true" />
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
