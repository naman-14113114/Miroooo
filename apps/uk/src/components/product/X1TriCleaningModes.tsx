'use client';

import React from 'react';

export function X1TriCleaningModes() {
  return (
    <div
      id="shopify-section-template--24203751129433__video_with_text_BkMKDR"
      className="shopify-section"
      style={{
        backgroundColor: '#000000',
        background: '#000000',
        color: '#171717',
        width: '100%',
        overflow: 'hidden',
        padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 48px)',
        marginBottom: 0,
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        .video-mode-container {
          max-width: 1320px;
          margin: 0 auto;
          background: #fafafa;
          border-radius: 24px;
          padding: 0 clamp(1.25rem, 4.5vw, 4rem);
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
        }
        .video-mode-frame-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
        }
        .video-mode-col-text {
          order: 2;
          width: 100%;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
          padding: 0 1rem clamp(2rem, 5vw, 3rem) 1rem;
          box-sizing: border-box;
        }
        .video-mode-col-video {
          order: 1;
          width: 100%;
          max-width: 480px;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }
        .video-mode-col-video video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          background: transparent;
          border: none;
          outline: none;
          box-shadow: none;
        }
        @media screen and (min-width: 768px) {
          .video-mode-container {
            padding: 0 clamp(2rem, 4.5vw, 4rem);
          }
          .video-mode-frame-grid {
            display: grid;
            grid-template-columns: 1.15fr 1fr;
            gap: clamp(2rem, 4vw, 4rem);
            align-items: center;
            justify-items: center;
          }
          .video-mode-col-text {
            order: 1 !important;
            text-align: left;
            padding: 0;
            justify-content: center;
          }
          .video-mode-col-video {
            order: 2 !important;
            width: 100%;
            max-width: 460px;
            aspect-ratio: 1 / 1;
          }
        }
      `}</style>

      <div className="video-mode-container">
        <div className="video-mode-frame-grid">
          {/* Video Column (Left on Desktop, Top on Mobile) */}
          <div className="video-mode-col-video">
            <video
              id="mode-360-video"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              src="/assets_ref/x/miroooo-x-360-view.mp4"
            ></video>
          </div>

          {/* Text Column (Right on Desktop, Bottom on Mobile) */}
          <div className="video-mode-col-text">
            <h2
              style={{
                fontFamily: "'GFS Didot', 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.6rem, 2.4vw, 2.3rem)',
                fontWeight: 600,
                color: '#111111',
                margin: '0 0 1.25rem 0',
                lineHeight: 1.25,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              MIROOOO X1 TRI CLEANING MODES
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', marginLeft: '-5px' }}>
              {/* 1. Standard (Blue Light Mode) */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <img
                  src="/assets/icons/mode-standard-blue.png"
                  alt="Standard Mode"
                  width="44"
                  height="44"
                  style={{ width: '44px', height: '44px', flexShrink: 0, objectFit: 'contain', borderRadius: '50%' }}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3
                    style={{
                      fontFamily: "'GFS Didot', 'Playfair Display', Georgia, serif",
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#111111',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      margin: '0 0 0.25rem 0',
                    }}
                  >
                    STANDARD
                  </h3>
                  <p style={{ fontFamily: "var(--font-body-family, 'Inter', sans-serif)", fontSize: '0.88rem', color: '#444444', lineHeight: 1.5, margin: 0 }}>
                    Gentle daily oral care designed for sensitive teeth and gums, providing a smooth, comfortable clean perfect for everyday brushing.
                  </p>
                </div>
              </div>

              {/* 2. Whitening (Purple Light Mode) */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <img
                  src="/assets/icons/mode-whitening-purple.png"
                  alt="Whitening Mode"
                  width="44"
                  height="44"
                  style={{ width: '44px', height: '44px', flexShrink: 0, objectFit: 'contain', borderRadius: '50%' }}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3
                    style={{
                      fontFamily: "'GFS Didot', 'Playfair Display', Georgia, serif",
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#111111',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      margin: '0 0 0.25rem 0',
                    }}
                  >
                    WHITENING
                  </h3>
                  <p style={{ fontFamily: "var(--font-body-family, 'Inter', sans-serif)", fontSize: '0.88rem', color: '#444444', lineHeight: 1.5, margin: 0 }}>
                    Targeted high-frequency vibrations that effectively lift stubborn surface stains from coffee, tea, and food for a radiant smile.
                  </p>
                </div>
              </div>

              {/* 3. Deep Cleansing (Green Light Mode) */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <img
                  src="/assets/icons/mode-deepclean-green.png"
                  alt="Deep Cleansing Mode"
                  width="44"
                  height="44"
                  style={{ width: '44px', height: '44px', flexShrink: 0, objectFit: 'contain', borderRadius: '50%' }}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3
                    style={{
                      fontFamily: "'GFS Didot', 'Playfair Display', Georgia, serif",
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#111111',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      margin: '0 0 0.25rem 0',
                    }}
                  >
                    DEEP CLEANSING
                  </h3>
                  <p style={{ fontFamily: "var(--font-body-family, 'Inter', sans-serif)", fontSize: '0.88rem', color: '#444444', lineHeight: 1.5, margin: 0 }}>
                    Maximum power for an intensive plaque-removing clean, delivering a dentist-fresh feeling along the gumline and hard-to-reach areas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
