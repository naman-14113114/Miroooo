'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ViewportVideo } from '@/components/media/ViewportVideo';

export function LuxuriousProfessionalism() {
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [values, setValues] = useState([0, 0, 0]);

  useEffect(() => {
    const frames = new Map<number, number>();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = [95, 98, 91];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.65) return;
        const index = statRefs.current.indexOf(entry.target as HTMLDivElement);
        if (index < 0) return;
        observer.unobserve(entry.target);
        const start = performance.now();
        const step = (now: number) => {
          const progress = reduced ? 1 : Math.min(1, (now - start) / 1400);
          const value = targets[index] * (1 - Math.pow(1 - progress, 3));
          setValues((previous) => previous.map((current, i) => i === index ? value : current));
          if (progress < 1) frames.set(index, requestAnimationFrame(step));
        };
        frames.set(index, requestAnimationFrame(step));
      });
    }, { threshold: 0.65, rootMargin: '0px 0px -72px 0px' });
    statRefs.current.forEach((row) => { if (row) observer.observe(row); });
    return () => { observer.disconnect(); frames.forEach(cancelAnimationFrame); };
  }, []);

  return (
    <div
      id="shopify-section-template--miroooo-luxurious-professionalism"
      className="shopify-section"
      style={{
        background: '#000000 !important',
        backgroundColor: '#000000',
        color: '#ffffff',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <style>{`
        .luxurious-grid {
          display: grid;
          grid-template-columns: 1fr;
          width: 100%;
          background: #000000 !important;
          align-items: stretch;
        }
        .luxurious-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #000000 !important;
        }
        @media (min-width: 1024px) {
          .luxurious-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .luxurious-media {
            aspect-ratio: auto !important;
            height: 100% !important;
          }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: '1856px', margin: '0 auto' }}>
        <div className="luxurious-grid">
          {/* Left Column: Video */}
          <div className="luxurious-media">
            <ViewportVideo
              id="luxurious-video"
              src="/assets_ref/x/miroooo-video-2s.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#000000', pointerEvents: 'none' }}
            ></ViewportVideo>
          </div>

          {/* Right Column: Content & Typography */}
          <div
            className="luxurious-content"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(3rem, 6vw, 6rem) clamp(1.75rem, 5vw, 6.5rem)',
              background: '#000000',
              color: '#ffffff',
              zIndex: 2,
              boxSizing: 'border-box',
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 700,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                lineHeight: 1.15,
                margin: '0 0 2.5rem 0',
                color: '#ffffff',
                maxWidth: '540px',
                wordBreak: 'break-word',
              }}
            >
              HERE&apos;S WHAT REAL CUSTOMERS ARE SAYING
            </h2>

            {/* Percentage Statistics List */}
            <div className="miroooo-stats-list" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.75rem, 2.8vw, 2.25rem)', maxWidth: '580px' }}>
              {/* Stat 1: 95% */}
              <div ref={(row) => { statRefs.current[0] = row; }} className="miroooo-stat-item" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
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
                      strokeDashoffset={176 * (1 - values[0] / 100)}
                    />
                  </svg>
                  <span className="miroooo-stat-value" style={{ position: 'absolute', fontFamily: "var(--font-inter), sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    {Math.round(values[0])}%
                  </span>
                </div>
                <p style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                  Found brushing significantly gentler on gums while cleaning deeper than their previous electric brush.
                </p>
              </div>

              {/* Stat 2: 98% */}
              <div ref={(row) => { statRefs.current[1] = row; }} className="miroooo-stat-item" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
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
                      strokeDashoffset={176 * (1 - values[1] / 100)}
                    />
                  </svg>
                  <span className="miroooo-stat-value" style={{ position: 'absolute', fontFamily: "var(--font-inter), sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    {Math.round(values[1])}%
                  </span>
                </div>
                <p style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                  Reported a tidier, clutter-free bathroom sink thanks to the magnetic charging dock and compact design.
                </p>
              </div>

              {/* Stat 3: 91% */}
              <div ref={(row) => { statRefs.current[2] = row; }} className="miroooo-stat-item" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
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
                      strokeDashoffset={176 * (1 - values[2] / 100)}
                    />
                  </svg>
                  <span className="miroooo-stat-value" style={{ position: 'absolute', fontFamily: "var(--font-inter), sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    {Math.round(values[2])}%
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
