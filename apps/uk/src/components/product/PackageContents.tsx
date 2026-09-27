'use client';

import React from 'react';

interface PackageContentsProps {
  isX2?: boolean;
}

export function PackageContents({ isX2 = true }: PackageContentsProps) {
  const imgSrc = isX2
    ? '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-complete-set-packaging.webp'
    : '/assets_ref/x/gallery/miroooo-x-sonic-electric-toothbrush-packaging.webp';

  const desc = isX2
    ? 'Miroooo X2 electric toothbrush in selected finish, 2x DuPont replacement brush heads, Luxury travel case, wall-mounted storage dock, and USB-C charging cable (adapter not included).'
    : 'Miroooo X1 electric toothbrush in selected finish, 2x DuPont replacement brush heads, Slim travel case, and USB-C charging cable (adapter not included).';

  return (
    <div
      id="shopify-section-template--24203751129433__image-with-text-1"
      className="shopify-section"
      style={{
        background: '#000000',
        color: '#ffffff',
        width: '100%',
        padding: 'clamp(3.5rem, 6vw, 6rem) 0',
        boxSizing: 'border-box',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', boxSizing: 'border-box' }}>
        <div className="split-section-grid" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2rem, 4vw, 4.5rem)' }}>
          {/* Image Left on Desktop, Top on Phone */}
          <div style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
            <div
              className="desc-media-loading"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#0d0d0d',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
              }}
            >
              <img
                id="package-contents-section-img"
                src={imgSrc}
                alt="Miroooo Complete Set Presentation Packaging"
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Text Content Right on Desktop, Below on Phone */}
          <div style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
            <h2
              style={{
                fontFamily: "'GFS Didot', 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.15,
                margin: '0 0 1.25rem 0',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              Package Contents
            </h2>
            <div style={{ color: 'rgba(255, 255, 255, 0.85)', fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', lineHeight: 1.65 }}>
              <p style={{ margin: 0 }}>{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
