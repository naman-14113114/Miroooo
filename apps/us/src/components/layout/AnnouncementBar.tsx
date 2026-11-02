'use client';

import React from 'react';

interface AnnouncementBarProps {
  isHalloween?: boolean;
}

export function AnnouncementBar({ isHalloween: _isHalloween }: AnnouncementBarProps = {}) {
  const tickerItemSet = (
    <>
      <div className="miroooo-ticker-item">
        <span style={{ fontWeight: 800, color: '#111111' }}>BLACK FRIDAY SALE</span>
        <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span style={{ fontWeight: 700, color: '#111111' }}>50% OFF TODAY</span>
        <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span style={{ fontWeight: 700, color: '#111111' }}>FREE SHIPPING ON ALL ORDERS</span>
        <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span style={{ fontWeight: 700, color: '#111111' }}>4.9 STARS FROM 40,000+ CUSTOMERS</span>
        <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span style={{ fontWeight: 800, color: '#111111' }}>BLACK FRIDAY EARLY ACCESS</span>
        <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
    </>
  );

  return (
    <div
      id="miroooo-announcement-bar"
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
      <div
        className="miroooo-announcement-ticker"
        style={{ animationDuration: '267s' }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <React.Fragment key={i}>{tickerItemSet}</React.Fragment>
        ))}
      </div>
    </div>
  );
}
