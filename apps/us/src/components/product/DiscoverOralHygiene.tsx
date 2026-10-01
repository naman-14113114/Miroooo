'use client';

import React from 'react';
import { ViewportVideo } from '@/components/media/ViewportVideo';

export function DiscoverOralHygiene() {
  return (
    <div
      id="shopify-section-template--miroooo-discover-oral-hygiene"
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
        .oral-hygiene-grid {
          display: grid;
          grid-template-columns: 1fr;
          width: 100%;
          min-height: 520px;
          background: #000000;
          align-items: stretch;
        }
        .oral-hygiene-media {
          order: -1;
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #000000;
        }
        @media (min-width: 1024px) {
          .oral-hygiene-grid {
            grid-template-columns: 1fr 1fr !important;
            min-height: 600px !important;
          }
          .oral-hygiene-media {
            order: 2 !important;
            aspect-ratio: auto !important;
            height: 100% !important;
          }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: '1856px', margin: '0 auto' }}>
        <div className="oral-hygiene-grid">
          {/* Left Column: Typography & Feature Bullets */}
          <div
            className="oral-hygiene-content"
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
                fontFamily: "var(--font-heading-family, 'Inter', serif)",
                fontSize: 'clamp(1.45rem, 2.6vw, 2.5rem)',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                lineHeight: 1.28,
                margin: '0 0 1.5rem 0',
                color: '#ffffff',
                maxWidth: '540px',
                wordBreak: 'break-word',
              }}
            >
              THE ULTIMATE TRAVEL-READY ELECTRIC TOOTHBRUSH
            </h2>

            <div style={{ width: '100px', height: '1px', background: 'rgba(255, 255, 255, 0.35)', margin: '0 0 2.25rem 0' }}></div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '580px' }}>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  fontSize: 'clamp(0.92rem, 1.15vw, 1.15rem)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  lineHeight: 1.45,
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}
              >
                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff', flexShrink: 0 }}></span>
                <span>Slim, protective travel case included (fits seamlessly into your carry-on, wash bag, or handbag without taking up space)</span>
              </li>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  fontSize: 'clamp(0.92rem, 1.15vw, 1.15rem)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  lineHeight: 1.45,
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}
              >
                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff', flexShrink: 0 }}></span>
                <span>60+ days of long-lasting battery life (no need to hunt for chargers or carry cables on holidays)</span>
              </li>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  fontSize: 'clamp(0.92rem, 1.15vw, 1.15rem)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  lineHeight: 1.45,
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}
              >
                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff', flexShrink: 0 }}></span>
                <span>Ultralight 51g aerospace weight (lighter than standard manual brushes, you will forget it is even in your bag)</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Demo Video */}
          <div className="oral-hygiene-media">
            <ViewportVideo
              id="oral-hygiene-video"
              src="/assets_ref/x/miroooo-video-3.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#000000', pointerEvents: 'none' }}
            ></ViewportVideo>
          </div>
        </div>
      </div>
    </div>
  );
}
