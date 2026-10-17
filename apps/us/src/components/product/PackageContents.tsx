'use client';

import { x2Gallery } from '@/data/x2Gallery';
import React from 'react';

export interface PackageContentsProps {
  isX2?: boolean;
  color?: string;
  isFlosser?: boolean;
  handle?: string;
  nozzleCount?: number;
  giftCardValue?: string;
}

export function PackageContents({
  isX2 = true,
  color = 'Silver',
  isFlosser,
  handle,
  nozzleCount = 7,
  giftCardValue,
}: PackageContentsProps) {
  const isWaterFlosser = Boolean(
    isFlosser ||
    handle === 'miroooo-water-flosser' ||
    handle === 'water-flosser' ||
    handle === 'flosser'
  );

  const isX1Product = Boolean(
    !isWaterFlosser &&
    (handle === 'miroooo-x' || handle === 'miroooo_x1' || isX2 === false)
  );

  if (isWaterFlosser) {
    const isWhite = color?.toLowerCase() === 'white';
    const flosserImgSrc = isWhite
      ? '/assets_ref/flosser/gallery/miroooo-water-flosser-white-complete-set.webp'
      : '/assets_ref/flosser/gallery/miroooo-water-flosser-black-complete-set.webp';

    const effectiveNozzles = nozzleCount === 4 ? 4 : 7;
    const giftCardDisplay = giftCardValue || '$10';

    const flosserItems = [
      {
        title: '1x Miroooo Water Flosser Handle & 320ml Reservoir',
        subtitle: 'Detachable wide-mouth water tank with ergonomic anti-slip grip',
      },
      {
        title: `${effectiveNozzles}x Precision Dental Nozzles`,
        subtitle:
          effectiveNozzles === 4
            ? '4x precision multi-use dental nozzles (Orthodontic & classic jets)'
            : 'Complete 7-piece specialized nozzle set (Orthodontic, Periodontal, Plaque Seeker & Classic Jets)',
      },
      {
        title: '1x USB-C Fast Charging Cable',
        subtitle: 'Universal 3-hour rapid charging cable (wall adapter not included)',
      },
      {
        title: `1x Complimentary ${giftCardDisplay} Miroooo Digital Gift Card`,
        subtitle: 'Instant digital code redeemable site-wide towards replacement tips & accessories',
      },
      {
        title: '1x Comprehensive User Guide & Quick-Start Card',
        subtitle: 'Step-by-step clinical setup, mode guidance & hygiene tips',
      },
    ];

    const flosserDesc = `Miroooo Water Flosser in selected finish with 320ml high-capacity reservoir, ${effectiveNozzles}x specialized precision dental nozzles, 1x USB-C fast charging cable (power adapter not included), 1x complimentary ${giftCardDisplay} Miroooo digital gift card, and 1x comprehensive user guide & quick-start manual.`;

    return (
      <div
        id="shopify-section-template--24203751129433__image-with-text-1"
        className="shopify-section flosser-package-section"
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
                  src={flosserImgSrc}
                  alt="Miroooo Water Flosser Complete Set Presentation Packaging"
                  style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

            {/* Text Content Right on Desktop, Below on Phone */}
            <div style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#c3f06a',
                  fontFamily: "var(--font-inter), 'Mulish', Inter, -apple-system, sans-serif",
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Complete Unboxing
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  margin: '0 0 1.5rem 0',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                }}
              >
                Package Contents
              </h2>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 1.5rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {flosserItems.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      borderRadius: '12px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(195, 240, 106, 0.15)',
                        color: '#c3f06a',
                        fontSize: '11px',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      ✓
                    </span>
                    <div>
                      <div
                        style={{
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: 'clamp(0.925rem, 1.05vw, 1.025rem)',
                          fontFamily: "var(--font-inter), 'Mulish', Inter, -apple-system, sans-serif",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div
                          style={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '0.85rem',
                            fontFamily: "var(--font-inter), 'Mulish', Inter, -apple-system, sans-serif",
                            marginTop: '2px',
                            lineHeight: 1.4,
                          }}
                        >
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontFamily: "var(--font-inter), 'Mulish', Inter, -apple-system, sans-serif",
                  fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
                  lineHeight: 1.6,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '1.25rem',
                }}
              >
                <p style={{ margin: 0 }}>{flosserDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isX1Product) {
    return (
      <div id="shopify-section-template--24203751129433__image-with-text-1" className="shopify-section x1-package" style={{ background: '#000', color: '#fff', borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <div className="section section--padding" style={{ background: '#000', paddingTop: 'clamp(10px, 1.8vh, 20px)', paddingBottom: 'clamp(10px, 1.8vh, 20px)' }}>
          <div className="page-width relative">
            <div className="image-with-text">
              <div className="image-with-text__item">
                <div className="image-with-text__media">
                  <img src="/assets_ref/x/miroooo-x1-sonic-electric-toothbrush-package-contents-kit-flat-lay.webp" alt="Miroooo X1 Sonic Electric Toothbrush Package Contents &amp; Flat Lay Kit" width="1254" height="1254" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="image-with-text__item x1-package__text">
                <div className="rich-text">
                  <h2 className="heading leading-none title-sm"><em className="highlighted-text inline-block not-italic relative" style={{ color: '#fff', WebkitTextFillColor: '#fff' }}>Package Contents</em></h2>
                  <div className="rte leading-normal body subtext-md text-opacity" style={{ color: 'rgba(255,255,255,.8)' }}>
                    <p>Miroooo X1 sonic electric toothbrush in chosen colour, 1x magnetic wireless charger dock, 1x fluted travel case, 3x DuPont™ replacement brush heads (1x extra head + 2x free gift heads), 1x protective hygiene travel cap, 1x USB-C fast charging cable (adapter not included), and 1x luxury packaging box &amp; user manual.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const imgSrc = (x2Gallery[color as keyof typeof x2Gallery] || x2Gallery.Silver).packagingImage;

  const desc = 'Miroooo X2 electric toothbrush in selected finish, 2x DuPont replacement brush heads, Luxury travel case, wall-mounted storage dock, and USB-C charging cable (adapter not included).';

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
