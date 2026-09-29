'use client';

import React from 'react';

export function EnergyBoostSplit() {
  return (
    <div id="x2-section-energy-boost-split" className="shopify-section" style={{ background: '#000000', color: '#ffffff', width: '100%', padding: 'clamp(3.5rem, 6vw, 6rem) 0', boxSizing: 'border-box' }}>
      <style>{`
        #x2-section-energy-boost-split .split-section-grid {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          gap: clamp(2rem, 4vw, 4.5rem);
        }
        @media (min-width: 1024px) {
          #x2-section-energy-boost-split .split-section-grid {
            flex-direction: row !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', boxSizing: 'border-box' }}>
        <div className="split-section-grid">
          {/* Text / Data Content (Left on Desktop, Below on Phone) */}
          <div style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
            <h2 style={{ fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, margin: '0 0 2rem 0', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              BUILT FOR TRAVEL
            </h2>

            {/* Formatted Bullets */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffffff', marginTop: '6px', flexShrink: 0 }}></div>
                <div>
                  <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block' }}>Slim protective travel case included</strong>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.5 }}>Slips neatly into any carry-on, wash bag or handbag without taking up valuable luggage space.</span>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffffff', marginTop: '6px', flexShrink: 0 }}></div>
                <div>
                  <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block' }}>90+ day battery life from a single charge</strong>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.5 }}>Powers up to 3 months of twice-daily brushing—so you will never have to hunt for chargers or plug adaptors while away.</span>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffffff', marginTop: '6px', flexShrink: 0 }}></div>
                <div>
                  <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block' }}>Weighs just 51 grams</strong>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.5 }}>Noticeably lighter than most manual brushes—machined from premium aluminium alloy so you will hardly feel it in your bag.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Image (Right on Desktop, Top on Phone) */}
          <div style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
            <div className="desc-media-loading" style={{ position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
              <img
                src="/assets_ref/x2/miroooo-x2-sonic-electric-toothbrush-portable-luxury-travel-case.webp"
                alt="Miroooo X2 Sonic Electric Toothbrush Portable Luxury Travel Case with Magnetic Closure"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
