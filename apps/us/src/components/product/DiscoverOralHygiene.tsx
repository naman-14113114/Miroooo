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
                fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 700,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                lineHeight: 1.15,
                margin: '0 0 2rem 0',
                color: '#ffffff',
                maxWidth: '540px',
                wordBreak: 'break-word',
              }}
            >
              BUILT FOR TRAVEL
            </h2>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '580px' }}>
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
                  <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block' }}>60+ day battery life from a single charge</strong>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.5 }}>Powers up to 2 months of twice-daily brushing—so you will never have to hunt for chargers or carry cables on holidays.</span>
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
