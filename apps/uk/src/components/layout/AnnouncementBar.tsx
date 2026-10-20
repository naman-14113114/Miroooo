'use client';

import React from 'react';

interface AnnouncementBarProps {
  isHalloween?: boolean;
}

export function AnnouncementBar({ isHalloween = false }: AnnouncementBarProps) {
  const originalTickerItemSet = (
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

  const halloweenTickerItemSet = (
    <>
      <div className="miroooo-ticker-item">
        <span>🎃 <span style={{ color: '#ff7a00', fontWeight: 800 }}>HALLOWEEN EXCLUSIVE</span></span>
        <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span>4.9 STARS FROM 40,000+ CUSTOMERS</span>
        <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span>FREE SHIPPING ON ALL ORDERS</span>
        <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span>🎃 <span style={{ color: '#ff7a00', fontWeight: 800 }}>50% OFF TODAY</span></span>
        <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span><span style={{ color: '#a855f7' }}>🦇</span> <span style={{ color: '#ff7a00', fontWeight: 800 }}>HALLOWEEN EXCLUSIVE</span></span>
        <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
      <div className="miroooo-ticker-item">
        <span><span>4.9 STARS FROM 40,000+</span> <span style={{ color: '#a855f7' }}>🦇</span></span>
        <span className="miroooo-ticker-dot" aria-hidden="true" />
      </div>
    </>
  );

  const tickerItemSet = isHalloween ? halloweenTickerItemSet : originalTickerItemSet;

  return (
    <div
      id="miroooo-announcement-bar"
      className={`announcement ${isHalloween ? 'announcement--halloween' : ''}`}
      style={
        isHalloween
          ? {
              background: '#0a0510',
              color: '#ffffff',
              padding: '4px 0',
              overflow: 'hidden',
              width: '100%',
              minHeight: '24px',
              borderBottom: '1px solid rgba(255, 122, 0, 0.35)',
            }
          : {
              background: '#e6e6e6',
              color: '#111111',
              padding: '4px 0',
              overflow: 'hidden',
              width: '100%',
              minHeight: '24px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            }
      }
    >
      <div
        className="miroooo-announcement-ticker"
        style={isHalloween ? { animationDuration: '267s' } : undefined}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <React.Fragment key={i}>{tickerItemSet}</React.Fragment>
        ))}
      </div>
    </div>
  );
}
