'use client';

import React from 'react';
import { BatteryCharging, Waves, BadgeCheck, Feather } from 'lucide-react';

export function BrushStylePrecision({ color = 'Pink' }: { color?: string }) {
  return (
    <div
      id="shopify-section-template--miroooo-brush-style-precision"
      className="shopify-section"
      style={{
        background: '#e6e6e6',
        color: '#171717',
        width: '100%',
        overflow: 'hidden',
        padding: 'clamp(4rem, 7vw, 7.5rem) 0',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        .style-precision-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem, 3.5vw, 4rem);
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }
        .style-col-center {
          order: -1;
        }
        .style-col-center img {
          max-height: 380px;
        }
        @media (min-width: 900px) {
          .style-precision-grid {
            grid-template-columns: 1fr 1.15fr 1fr !important;
          }
          .style-col-center {
            order: 0 !important;
          }
          .style-col-center img {
            max-height: 580px !important;
          }
        }
        .style-feature-card {
          transition: transform 0.3s ease;
        }
        .style-feature-card:hover {
          transform: translateY(-2px);
        }
      `}</style>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', boxSizing: 'border-box', width: '100%' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5.5vw, 5.5rem)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2
            style={{
              fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.85rem, 3.4vw, 3rem)',
              fontWeight: 600,
              color: '#111111',
              margin: '0 0 0.75rem 0',
              letterSpacing: '-0.01em',
              lineHeight: 1.25,
              textAlign: 'center',
              width: '100%',
            }}
          >
            Brush with Style &amp; Precision
          </h2>
          <p
            style={{
              fontFamily: "var(--font-didot), Georgia, serif",
              fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
              color: '#555555',
              fontStyle: 'italic',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Your new smile starts right here
          </p>
        </div>

        {/* 3-Column Grid: Left (2 Pointers) | Center (Hero Toothbrush) | Right (2 Pointers) */}
        <div className="style-precision-grid">
          {/* Left Column: Pointers 1 & 2 */}
          <div className="style-col-left" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 4.5vw, 4.5rem)', textAlign: 'center' }}>
            {/* Pointer 1: Long-Lasting Performance */}
            <div className="style-feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                <BatteryCharging size={52} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif", fontSize: 'clamp(1.2rem, 1.55vw, 1.45rem)', fontWeight: 600, color: '#111111', margin: 0 }}>
                Long-Lasting Performance
              </h3>
              <div style={{ fontFamily: "var(--font-body-family, sans-serif)", fontSize: 'clamp(0.92rem, 1.08vw, 1.05rem)', color: '#444444', lineHeight: 1.65 }}>
                <p style={{ margin: 0 }}>Lasts 6-8 weeks on a single charge</p>
                <p style={{ margin: 0 }}>USB-C fast charging</p>
              </div>
            </div>

            {/* Pointer 2: Professional & Effortless Brushing */}
            <div className="style-feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                <Waves size={52} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif", fontSize: 'clamp(1.2rem, 1.55vw, 1.45rem)', fontWeight: 600, color: '#111111', margin: 0 }}>
                Professional &amp; effortless brushing
              </h3>
              <div style={{ fontFamily: "var(--font-body-family, sans-serif)", fontSize: 'clamp(0.92rem, 1.08vw, 1.05rem)', color: '#444444', lineHeight: 1.65 }}>
                <p style={{ margin: 0 }}>32,000 vibrations per minute</p>
                <p style={{ margin: 0 }}>3 advanced brushing modes</p>
                <p style={{ margin: 0 }}>Smart sensor technology</p>
              </div>
            </div>
          </div>

          {/* Center Hero Toothbrush Image */}
          <div className="style-col-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%' }}>
            <div style={{ maxWidth: '340px', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <img
                id="brush-with-style-img"
                src={`/assets_ref/x/${color === 'Grey' ? 'gray' : color.toLowerCase()}_brush_with_style.webp`}
                alt="Miroooo X1 Electric Toothbrush"
                style={{ maxHeight: '600px', width: '100%', objectFit: 'contain', background: '#e6e6e6', display: 'block' }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right Column: Pointers 3 & 4 */}
          <div className="style-col-right" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 4.5vw, 4.5rem)', textAlign: 'center' }}>
            {/* Pointer 3: Premium Quality */}
            <div className="style-feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                <BadgeCheck size={52} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif", fontSize: 'clamp(1.2rem, 1.55vw, 1.45rem)', fontWeight: 600, color: '#111111', margin: 0 }}>
                Premium quality
              </h3>
              <div style={{ fontFamily: "var(--font-body-family, sans-serif)", fontSize: 'clamp(0.92rem, 1.08vw, 1.05rem)', color: '#444444', lineHeight: 1.65 }}>
                <p style={{ margin: 0 }}>IPX-7 waterproof rated alloy casing</p>
                <p style={{ margin: 0 }}>Silent brushing at 50 DB</p>
              </div>
            </div>

            {/* Pointer 4: Compact & Lightweight */}
            <div className="style-feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                <Feather size={52} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif", fontSize: 'clamp(1.2rem, 1.55vw, 1.45rem)', fontWeight: 600, color: '#111111', margin: 0 }}>
                Compact &amp; lightweight
              </h3>
              <div style={{ fontFamily: "var(--font-body-family, sans-serif)", fontSize: 'clamp(0.92rem, 1.08vw, 1.05rem)', color: '#444444', lineHeight: 1.65 }}>
                <p style={{ margin: 0 }}>Travel-friendly at only 51 g</p>
                <p style={{ margin: 0 }}>45% smaller than regular electric toothbrushes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
