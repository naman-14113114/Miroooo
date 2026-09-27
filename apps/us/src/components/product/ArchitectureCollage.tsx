'use client';

import React from 'react';

export function ArchitectureCollage() {
  return (
    <div
      id="x2-section-button-architecture"
      className="shopify-section"
      style={{
        background: '#000000',
        color: '#ffffff',
        width: '100%',
        overflow: 'hidden',
        padding: 'clamp(2rem, 4vw, 4rem) 0',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4vw, 3.5rem)' }}>
        <div style={{ position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', background: '#000000', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
          <picture>
            <source media="(max-width: 767px)" srcSet="/assets_ref/x2/pure_black/miroooo-x2-sonic-electric-toothbrush-engineering-architecture-mobile.webp" />
            <img
              src="/assets_ref/x2/pure_black/x2_architecture.jpg"
              alt="Miroooo X2 Sonic Electric Toothbrush Engineering Architecture, Smart Sensor Chip, High-Performance Motor and IPX7 Waterproof Body"
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
