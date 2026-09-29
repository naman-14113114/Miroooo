'use client';

import React, { useEffect, useState, useRef } from 'react';

export function CustomerStats() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [values, setValues] = useState([0, 0, 0]);
  useEffect(() => {
    let frame = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = [95, 98, 91];
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect(); setInView(true);
      const start = performance.now();
      const step = (now: number) => {
        setValues(targets.map((target, index) => {
          const progress = reduced ? 1 : Math.max(0, Math.min(1, (now - start - index * 180) / 1200));
          return Math.round(target * (1 - Math.pow(1 - progress, 3)));
        }));
        if (!reduced && now - start < 1560) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: .1, rootMargin: '50px 0px' });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="x2-section-texture-split"
      className="shopify-section"
      style={{
        background: '#000000',
        color: '#ffffff',
        width: '100%',
        padding: 'clamp(3.5rem, 6vw, 6rem) 0',
        boxSizing: 'border-box',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <style>{`
        #x2-section-texture-split .split-section-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(2rem, 4vw, 4.5rem);
        }
        @media (min-width: 1024px) {
          #x2-section-texture-split .split-section-grid {
            flex-direction: row !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', boxSizing: 'border-box' }}>
        <div className="split-section-grid">
          {/* Image (Left on Desktop, Top on Phone) */}
          <div style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
            <div
              className="desc-media-loading"
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              }}
            >
              <img
                src="/assets_ref/x2/miroooo-x2-sonic-electric-toothbrush-instant-energy-boost.webp"
                alt="Miroooo X2 Sonic Electric Toothbrush Instant Energy Boost 90-Day Long Battery Life"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Text / Data Content (Right on Desktop, Below on Phone) */}
          <div style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
            <h2
              style={{
                fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.15,
                margin: '0 0 2.5rem 0',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              HERE&apos;S WHAT REAL CUSTOMERS ARE SAYING
            </h2>

            {/* Percentage Statistics List */}
            <div className="miroooo-stats-list" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.75rem, 2.8vw, 2.25rem)' }}>
              {/* Stat 1: 95% */}
              <div className="miroooo-stat-item" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                <div className="miroooo-stat-circle" style={{ position: 'relative', width: '68px', height: '68px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <circle cx="34" cy="34" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3.5" />
                    <circle
                      className="miroooo-stat-progress"
                      cx="34"
                      cy="34"
                      r="28"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="176"
                      strokeDashoffset={inView ? 8.8 : 176}
                      style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  </svg>
                  <span className="miroooo-stat-value" style={{ position: 'absolute', fontFamily: "var(--font-inter), sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    {values[0]}%
                  </span>
                </div>
                <p style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                  Found brushing significantly gentler on gums while cleaning deeper than their previous electric brush.
                </p>
              </div>

              {/* Stat 2: 98% */}
              <div className="miroooo-stat-item" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                <div className="miroooo-stat-circle" style={{ position: 'relative', width: '68px', height: '68px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <circle cx="34" cy="34" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3.5" />
                    <circle
                      className="miroooo-stat-progress"
                      cx="34"
                      cy="34"
                      r="28"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="176"
                      strokeDashoffset={inView ? 3.5 : 176}
                      style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  </svg>
                  <span className="miroooo-stat-value" style={{ position: 'absolute', fontFamily: "var(--font-inter), sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    {values[1]}%
                  </span>
                </div>
                <p style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                  Reported a tidier, clutter-free bathroom sink thanks to the magnetic wall dock and compact design.
                </p>
              </div>

              {/* Stat 3: 91% */}
              <div className="miroooo-stat-item" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                <div className="miroooo-stat-circle" style={{ position: 'relative', width: '68px', height: '68px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <circle cx="34" cy="34" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3.5" />
                    <circle
                      className="miroooo-stat-progress"
                      cx="34"
                      cy="34"
                      r="28"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="176"
                      strokeDashoffset={inView ? 15.8 : 176}
                      style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  </svg>
                  <span className="miroooo-stat-value" style={{ position: 'absolute', fontFamily: "var(--font-inter), sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    {values[2]}%
                  </span>
                </div>
                <p style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                  Noticed visibly brighter, cleaner teeth and healthier gums within just 3 weeks of daily use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
