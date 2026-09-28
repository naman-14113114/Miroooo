'use client';

import React from 'react';

interface BrushFunctionsProps {
  isX2?: boolean;
}

export function BrushFunctions({ isX2 = false }: BrushFunctionsProps) {
  const modes = isX2
    ? [
        {
          id: 'standard',
          name: 'STANDARD',
          desc: 'Balanced acoustic frequency designed for complete daily dental care, effectively removing everyday plaque while protecting sensitive enamel.',
          img: '/assets_ref/x2/modes/miroooo-x2-sonic-standard-cleaning-mode-green-led.webp',
          alt: 'Miroooo X2 Standard Cleaning Mode',
        },
        {
          id: 'whitening',
          name: 'WHITENING',
          desc: 'Targeted high-frequency vibrations that effectively lift stubborn surface stains from coffee, tea, and food for a radiant smile.',
          img: '/assets_ref/x2/modes/miroooo-x2-sonic-whitening-mode-purple-led.webp',
          alt: 'Miroooo X2 Whitening Mode',
        },
        {
          id: 'deep-clean',
          name: 'DEEP CLEANSING',
          desc: 'Maximum power for an intensive plaque-removing clean, delivering a dentist-fresh feeling along the gumline and hard-to-reach areas.',
          img: '/assets_ref/x2/modes/miroooo-x2-sonic-deep-cleansing-mode-blue-led.webp',
          alt: 'Miroooo X2 Deep Cleansing Mode',
        },
      ]
    : [
        {
          id: 'standard',
          name: 'STANDARD',
          desc: 'Gentle daily oral care designed for sensitive teeth and gums, providing a smooth, comfortable clean perfect for everyday brushing.',
          img: '/assets_ref/x/G1.webp',
          alt: 'Miroooo X1 Standard Mode',
        },
        {
          id: 'whitening',
          name: 'WHITENING',
          desc: 'Targeted high-frequency vibrations that effectively lift stubborn surface stains from coffee, tea, and food for a radiant smile.',
          img: '/assets_ref/x/G2.webp',
          alt: 'Miroooo X1 Whitening Mode',
        },
        {
          id: 'deep-clean',
          name: 'DEEP CLEANSING',
          desc: 'Maximum power for an intensive plaque-removing clean, delivering a dentist-fresh feeling along the gumline and hard-to-reach areas.',
          img: '/assets_ref/x/G3.webp',
          alt: 'Miroooo X1 Deep Cleansing Mode',
        },
      ];

  return (
    <div
      id="shopify-section-template--miroooo-brush-functions"
      className="shopify-section"
      style={{
        background: '#000000',
        color: '#ffffff',
        width: '100%',
        overflow: 'hidden',
        padding: 'clamp(4rem, 6vw, 6.5rem) 0',
        boxSizing: 'border-box',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <style>{`
        .brush-functions-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem, 3.5vw, 3.5rem);
          justify-content: center;
          align-items: start;
        }
        @media (min-width: 768px) {
          .brush-functions-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        .function-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.25rem;
        }
        .function-item-circle {
          width: clamp(140px, 18vw, 220px);
          height: clamp(140px, 18vw, 220px);
          border-radius: 50%;
          overflow: hidden;
          background: #111111;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.08);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .function-item:hover .function-item-circle {
          transform: scale(1.05);
        }
      `}</style>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', boxSizing: 'border-box' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 4.5vw, 4rem)' }}>
          <h2
            style={{
              fontFamily: "'GFS Didot', 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: '0 0 0.75rem 0',
            }}
          >
            3 Brush Functions, 1 Effective Technology
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body-family, 'Inter', sans-serif)",
              fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Our unique acoustic brushing method is complemented by three individual brushing functions, catering to every need, whether you seek a gentle or deep cleaning.
          </p>
        </div>

        {/* 3 Modes Grid */}
        <div className="brush-functions-grid">
          {modes.map((mode) => (
            <div key={mode.id} className="function-item">
              <div className="function-item-circle">
                <img
                  src={mode.img}
                  alt={mode.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'GFS Didot', 'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    margin: '0 0 0.75rem 0',
                  }}
                >
                  {mode.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body-family, 'Inter', sans-serif)",
                    fontSize: 'clamp(0.9rem, 1.05vw, 1.02rem)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.6,
                    maxWidth: '320px',
                    margin: '0 auto',
                    textAlign: 'center',
                    fontWeight: 400,
                  }}
                >
                  {mode.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
