'use client';

import React from 'react';
import { BatteryCharging, Waves, Droplet, ShieldCheck } from 'lucide-react';

export interface FlosserStylePrecisionProps {
  color?: string;
}

export function FlosserStylePrecision({ color = 'Black' }: FlosserStylePrecisionProps) {
  const isWhite = color?.toLowerCase() === 'white';
  const flosserImg = isWhite
    ? '/assets_ref/flosser/gallery/miroooo-water-flosser-white-complete-set.webp'
    : '/assets_ref/flosser/gallery/miroooo-water-flosser-black-complete-set.webp';

  return (
    <div
      id="shopify-section-template--miroooo-flosser-style-precision"
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
        .flosser-style-precision-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem, 3.5vw, 4rem);
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }
        .flosser-style-col-center {
          order: -1;
        }
        .flosser-style-col-center img {
          max-height: 420px;
        }
        @media (min-width: 900px) {
          .flosser-style-precision-grid {
            grid-template-columns: 1fr 1.15fr 1fr !important;
          }
          .flosser-style-col-center {
            order: 0 !important;
          }
          .flosser-style-col-center img {
            max-height: 580px !important;
          }
        }
        .flosser-style-feature-card {
          transition: transform 0.3s ease;
        }
        .flosser-style-feature-card:hover {
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
            Floss with Style &amp; Precision
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
            Your deepest, healthiest smile starts right here
          </p>
        </div>

        {/* 3-Column Grid: Left (2 Pointers) | Center (Hero Flosser) | Right (2 Pointers) */}
        <div className="flosser-style-precision-grid">
          {/* Left Column: Cards 1 & 2 */}
          <div className="flosser-style-col-left" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 4.5vw, 4.5rem)', textAlign: 'center' }}>
            {/* Card 1: 60-Day Battery Life */}
            <div className="flosser-style-feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                <BatteryCharging size={52} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif", fontSize: 'clamp(1.2rem, 1.55vw, 1.45rem)', fontWeight: 600, color: '#111111', margin: 0 }}>
                60-Day Battery Life
              </h3>
              <div style={{ fontFamily: "var(--font-body-family, sans-serif)", fontSize: 'clamp(0.92rem, 1.08vw, 1.05rem)', color: '#444444', lineHeight: 1.65 }}>
                <p style={{ margin: 0 }}>Up to 60 days on a single charge</p>
                <p style={{ margin: 0 }}>Rapid 3-hour USB-C fast charging</p>
              </div>
            </div>

            {/* Card 2: 60–138 PSI Piston Pump */}
            <div className="flosser-style-feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                <Waves size={52} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif", fontSize: 'clamp(1.2rem, 1.55vw, 1.45rem)', fontWeight: 600, color: '#111111', margin: 0 }}>
                60–138 PSI Piston Pump
              </h3>
              <div style={{ fontFamily: "var(--font-body-family, sans-serif)", fontSize: 'clamp(0.92rem, 1.08vw, 1.05rem)', color: '#444444', lineHeight: 1.65 }}>
                <p style={{ margin: 0 }}>Up to 2,000 pulses per minute</p>
                <p style={{ margin: 0 }}>Medical-grade stainless piston core</p>
                <p style={{ margin: 0 }}>4 customizable hydrodynamic modes</p>
              </div>
            </div>
          </div>

          {/* Center Hero Flosser Image */}
          <div className="flosser-style-col-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%' }}>
            <div style={{ maxWidth: '380px', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <img
                id="flosser-with-style-img"
                src={flosserImg}
                alt="Miroooo Precision Water Flosser"
                style={{ maxHeight: '600px', width: '100%', objectFit: 'contain', background: '#e6e6e6', display: 'block' }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right Column: Cards 3 & 4 */}
          <div className="flosser-style-col-right" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 4.5vw, 4.5rem)', textAlign: 'center' }}>
            {/* Card 3: 320ml High-Capacity Reservoir */}
            <div className="flosser-style-feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                <Droplet size={52} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif", fontSize: 'clamp(1.2rem, 1.55vw, 1.45rem)', fontWeight: 600, color: '#111111', margin: 0 }}>
                320ml High-Capacity Reservoir
              </h3>
              <div style={{ fontFamily: "var(--font-body-family, sans-serif)", fontSize: 'clamp(0.92rem, 1.08vw, 1.05rem)', color: '#444444', lineHeight: 1.65 }}>
                <p style={{ margin: 0 }}>Full 90-second session without refilling</p>
                <p style={{ margin: 0 }}>Detachable wide-mouth water chamber</p>
              </div>
            </div>

            {/* Card 4: IPX7 100% Waterproof */}
            <div className="flosser-style-feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                <ShieldCheck size={52} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif", fontSize: 'clamp(1.2rem, 1.55vw, 1.45rem)', fontWeight: 600, color: '#111111', margin: 0 }}>
                IPX7 100% Waterproof
              </h3>
              <div style={{ fontFamily: "var(--font-body-family, sans-serif)", fontSize: 'clamp(0.92rem, 1.08vw, 1.05rem)', color: '#444444', lineHeight: 1.65 }}>
                <p style={{ margin: 0 }}>Certified shower-safe immersion rating</p>
                <p style={{ margin: 0 }}>Effortless whole-body rinse under tap</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
