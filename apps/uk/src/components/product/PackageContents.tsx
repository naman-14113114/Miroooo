'use client';

import { x2Gallery } from '@/data/x2Gallery';
import React from 'react';

interface PackageContentsProps {
  isX2?: boolean;
  color?: string;
}

export function PackageContents({ isX2 = true, color = 'Silver' }: PackageContentsProps) {
  if (!isX2) {
    return (
      <div id="shopify-section-template--24203751129433__image-with-text-1" className="shopify-section x1-package" style={{ background: '#000', color: '#fff', borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <div className="section section--padding" style={{ background: '#000', paddingTop: 0, paddingBottom: 0 }}>
          <div className="page-width relative">
            <div className="image-with-text">
              <div className="image-with-text__item">
                <div className="image-with-text__media">
                  <img src="/assets_ref/x/miroooo-x-package-box.webp" alt="Package Contents" width="1000" height="667" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="image-with-text__item x1-package__text">
                <div className="rich-text">
                  <h2 className="heading leading-none title-sm"><em className="highlighted-text inline-block not-italic relative" style={{ color: '#fff', WebkitTextFillColor: '#fff' }}>Package Contents</em></h2>
                  <div className="rte leading-normal body subtext-md text-opacity" style={{ color: 'rgba(255,255,255,.8)' }}>
                    <p>Miroooo X1 electric toothbrush in chosen colour, brush heads, Travel case, and USB-C charging cable (adapter not included).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const imgSrc = isX2
    ? (x2Gallery[color as keyof typeof x2Gallery] || x2Gallery.Silver).packagingImage
    : '/assets_ref/x/miroooo-x-package-box.webp';

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
      <style>{`
        #shopify-section-template--24203751129433__image-with-text-1 .split-section-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(2rem, 4vw, 4.5rem);
        }
        @media (min-width: 1024px) {
          #shopify-section-template--24203751129433__image-with-text-1 .split-section-grid {
            flex-direction: row !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', boxSizing: 'border-box' }}>
        <div className="split-section-grid">
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
                fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif",
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
            <div style={{ color: 'rgba(255, 255, 255, 0.85)', fontFamily: "var(--font-inter), sans-serif", fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', lineHeight: 1.65 }}>
              <p style={{ margin: 0 }}>{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
