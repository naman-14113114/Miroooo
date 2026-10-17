'use client';

import React from 'react';

export function DiscoverFlosserHygiene() {
  return (
    <div
      id="shopify-section-template--miroooo-discover-flosser-hygiene"
      className="shopify-section"
      style={{
        background: '#000000',
        color: '#ffffff',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <style>{`
        .flosser-hygiene-grid {
          display: grid;
          grid-template-columns: 1fr;
          width: 100%;
          min-height: 520px;
          background: #000000;
          align-items: stretch;
        }
        .flosser-hygiene-media {
          order: -1;
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #000000;
        }
        @media (min-width: 1024px) {
          .flosser-hygiene-grid {
            grid-template-columns: 1fr 1fr !important;
            min-height: 600px !important;
          }
          .flosser-hygiene-media {
            order: 2 !important;
            aspect-ratio: auto !important;
            height: 100% !important;
          }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: '1856px', margin: '0 auto' }}>
        <div className="flosser-hygiene-grid">
          {/* Left Column: Typography & 3-Tier Proof List */}
          <div
            className="flosser-hygiene-content"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 6.5rem)',
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
                margin: '0 0 2rem 0',
                color: '#ffffff',
                maxWidth: '560px',
                wordBreak: 'break-word',
              }}
            >
              BUILT FOR DEEP HYGIENE &amp; TRAVEL
            </h2>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '580px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#c3f06a',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(195, 240, 106, 0.12)',
                    border: '1px solid rgba(195, 240, 106, 0.25)',
                    marginTop: '2px',
                    flexShrink: 0,
                  }}
                >
                  01
                </span>
                <div>
                  <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block', marginBottom: '4px' }}>
                    2,000 Pulses/Min Micro-Jets
                  </strong>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.55 }}>
                    High-pressure sonic water pulses penetrate deep between tight interdental spaces and beneath the gumline where regular string floss and brushes cannot reach.
                  </span>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#c3f06a',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(195, 240, 106, 0.12)',
                    border: '1px solid rgba(195, 240, 106, 0.25)',
                    marginTop: '2px',
                    flexShrink: 0,
                  }}
                >
                  02
                </span>
                <div>
                  <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block', marginBottom: '4px' }}>
                    320ml Reservoir for full sessions
                  </strong>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.55 }}>
                    Generous high-capacity water chamber provides a full 60–90 second deep cleansing session without needing annoying mid-session refills.
                  </span>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#c3f06a',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(195, 240, 106, 0.12)',
                    border: '1px solid rgba(195, 240, 106, 0.25)',
                    marginTop: '2px',
                    flexShrink: 0,
                  }}
                >
                  03
                </span>
                <div>
                  <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block', marginBottom: '4px' }}>
                    Ergonomic unibody grip
                  </strong>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.55 }}>
                    Weighs perfectly in hand with IPX7 shower-safe waterproof body and unibody leak-proof seal—effortless to pack for holidays or business trips.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Studio Photography */}
          <div className="flosser-hygiene-media">
            <img
              src="/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-duo.webp"
              alt="Miroooo Water Flosser Built for Deep Hygiene and Travel"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                background: '#000000',
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
