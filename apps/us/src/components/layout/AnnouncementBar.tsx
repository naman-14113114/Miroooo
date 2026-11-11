'use client';

import React, { useEffect, useState } from 'react';

function useUSMidnightCountdown() {
  const [timeLeft, setTimeLeft] = useState<string>('14h : 27m : 53s');

  useEffect(() => {
    function calculate() {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        const parts = formatter.formatToParts(new Date());
        const hour = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10);
        const minute = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10);
        const second = parseInt(parts.find((p) => p.type === 'second')?.value ?? '0', 10);
        const elapsed = (hour % 24) * 3600 + minute * 60 + second;
        const remaining = Math.max(0, 86400 - elapsed);

        const h = Math.floor(remaining / 3600);
        const m = Math.floor((remaining % 3600) / 60);
        const s = remaining % 60;

        setTimeLeft(
          `${String(h).padStart(2, '0')}h : ${String(m).padStart(2, '0')}m : ${String(s).padStart(2, '0')}s`
        );
      } catch {
        // Fallback
      }
    }

    calculate();
    const interval = window.setInterval(calculate, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return timeLeft;
}

interface AnnouncementBarProps {
  isHalloween?: boolean;
}

export function AnnouncementBar({ isHalloween: _isHalloween }: AnnouncementBarProps = {}) {
  const timer = useUSMidnightCountdown();

  const flameIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );

  const marqueeItem = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, fontSize: '11px', whiteSpace: 'nowrap' }}>
      <span style={{ fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#111111', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px' }}>
          <span className="miroooo-dot-ping" style={{ position: 'absolute', display: 'inline-flex', width: '100%', height: '100%', borderRadius: '50%', background: '#111111', opacity: 0.75 }} />
          <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px', borderRadius: '50%', background: '#111111' }} />
        </span>
        BLACK FRIDAY EARLY ACCESS
      </span>
      <span style={{ color: 'rgba(0, 0, 0, 0.25)' }}>|</span>
      <span style={{ color: '#111111', fontWeight: 500 }}>
        Save 50% + Extra 10% Off on Brush with code{' '}
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#111111', background: 'rgba(0, 0, 0, 0.06)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.2)' }}>
          BLACKFRIDAY10
        </span>
      </span>
      <span style={{ color: 'rgba(0, 0, 0, 0.25)' }}>|</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'monospace', fontWeight: 600, color: '#111111' }}>
        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555555', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>Ends In:</span>
        <span>{timer}</span>
      </div>
      <span style={{ color: 'rgba(0, 0, 0, 0.25)' }}>·</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#111111' }}>
        {flameIcon}
        <span style={{ fontWeight: 600 }}>88% US Batch Claimed</span>
      </div>
      <span style={{ color: 'rgba(0, 0, 0, 0.3)', margin: '0 4px' }}>✦</span>
    </div>
  );

  return (
    <div
      id="miroooo-announcement-bar"
      className="announcement"
      style={{
        background: '#e6e6e6',
        color: '#111111',
        fontFamily: 'var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif',
        width: '100%',
        minHeight: '34px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @keyframes miroooo-dot-ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .miroooo-dot-ping {
          animation: miroooo-dot-ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes miroooo-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .miroooo-marquee-track {
          display: flex;
          width: max-content;
          min-width: 100%;
          gap: 2rem;
          animation: miroooo-marquee-scroll 32s linear infinite;
        }
        @media (max-width: 767px) {
          .miroooo-bar-desktop { display: none !important; }
          .miroooo-bar-mobile { display: block !important; }
        }
        @media (min-width: 768px) {
          .miroooo-bar-desktop { display: flex !important; }
          .miroooo-bar-mobile { display: none !important; }
        }
      `}</style>

      {/* Desktop: Fixed 2-sided bar */}
      <div
        className="miroooo-bar-desktop"
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '6px 16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '12px',
          boxSizing: 'border-box',
        }}
      >
        {/* Left: Event & Code */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px' }}>
            <span className="miroooo-dot-ping" style={{ position: 'absolute', display: 'inline-flex', width: '100%', height: '100%', borderRadius: '50%', background: '#111111', opacity: 0.75 }} />
            <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px', borderRadius: '50%', background: '#111111' }} />
          </span>
          <span style={{ fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '11px', color: '#111111' }}>
            BLACK FRIDAY EARLY ACCESS
          </span>
          <span style={{ color: 'rgba(0, 0, 0, 0.25)' }}>|</span>
          <span style={{ color: '#111111', fontWeight: 500 }}>
            Save 50% + Extra 10% Off on Brush with code{' '}
            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#111111', background: 'rgba(0, 0, 0, 0.06)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.2)' }}>
              BLACKFRIDAY10
            </span>
          </span>
        </div>

        {/* Right: Timer & Stock indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'monospace', fontWeight: 600, color: '#111111' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555555', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              Ends In:
            </span>
            <span>{timer}</span>
          </div>
          <span style={{ color: 'rgba(0, 0, 0, 0.25)' }}>·</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#111111' }}>
            {flameIcon}
            <span style={{ fontWeight: 600 }}>88% US Batch Claimed</span>
          </div>
        </div>
      </div>

      {/* Mobile: 1-line smoothly scrolling marquee */}
      <div className="miroooo-bar-mobile" style={{ overflow: 'hidden', padding: '6px 0', whiteSpace: 'nowrap' }}>
        <div className="miroooo-marquee-track">
          {marqueeItem}
          {marqueeItem}
          {marqueeItem}
          {marqueeItem}
        </div>
      </div>
    </div>
  );
}
