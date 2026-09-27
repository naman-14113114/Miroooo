'use client';

import React from 'react';

export function LuxuriousProfessionalism() {
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
            <video
              id="luxurious-video"
              src="/assets_ref/x/miroooo-video-2s.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#000000', pointerEvents: 'none' }}
            ></video>
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
                fontFamily: "'GFS Didot', 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                lineHeight: 1.25,
                margin: '0 0 1.75rem 0',
                color: '#ffffff',
                maxWidth: '540px',
                wordBreak: 'break-word',
              }}
            >
              LUXURIOUS PROFESSIONALISM
            </h2>

            <p
              style={{
                fontFamily: "'GFS Didot', Georgia, serif",
                fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.75,
                margin: 0,
                maxWidth: '580px',
              }}
            >
              Uncover the exceptional qualities of a toothbrush carefully designed for daily professional and personalized dental care. Its gentle yet potent performance ensures optimal health for your teeth and gums, making it an intelligent companion for your active on-the-go lifestyle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
