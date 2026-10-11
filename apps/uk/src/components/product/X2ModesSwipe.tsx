'use client';

import React, { useState, useEffect } from 'react';

interface CleaningMode {
  id: string;
  name: string;
  desc: string;
  color: string;
  image: string;
  alt: string;
}

const MODES: CleaningMode[] = [
  {
    id: 'whitening',
    name: 'WHITENING MODE',
    desc: 'High vibration frequency effectively removes stains from coffee, tea and tobacco',
    color: '#538bf6',
    image: '/assets_ref/x2/miroooo-x2-whitening-mode-blue.webp',
    alt: 'Miroooo X2 Whitening Mode High Frequency Sonic Blue LED',
  },
  {
    id: 'standard',
    name: 'STANDARD MODE',
    desc: 'General cleaning, suitable for gentle daily brushing and sensitive gums',
    color: '#e483ff',
    image: '/assets_ref/x2/miroooo-x2-standard-mode-purple.webp',
    alt: 'Miroooo X2 Standard Mode Gentle Plaque Removal Purple LED',
  },
  {
    id: 'deepclean',
    name: 'DEEP CLEAN MODE',
    desc: 'When you want an exceptionally thorough and effective clean',
    color: '#7df793',
    image: '/assets_ref/x2/miroooo-x2-deepclean-mode-green.webp',
    alt: 'Miroooo X2 Deep Clean Intensive Ultrasonic Green LED',
  },
];

export function X2ModesSwipe() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MODES.length);
    }, 3400);

    return () => clearInterval(timer);
  }, []);

  const activeMode = MODES[activeIndex];

  return (
    <div
      id="shopify-section-template--miroooo-x2-modes-swipe"
      className="shopify-section x2-modes-section"
      style={{
        background: '#000000',
        backgroundColor: '#000000',
        color: '#ffffff',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(2.5rem, 4vw, 4rem) 0',
        boxSizing: 'border-box',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <style>{`
        #shopify-section-template--miroooo-x2-modes-swipe {
          display: block !important;
          background: #000000 !important;
          background-color: #000000 !important;
        }
        #shopify-section-template--miroooo-brush-functions {
          display: none !important;
        }

        .x2-modes-layout-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(1.75rem, 3.5vw, 3.5rem);
          width: 100%;
          box-sizing: border-box;
        }

        /* Mobile: Image on top, data below */
        .x2-modes-col-media {
          order: 1;
          width: 100%;
          max-width: 360px;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
        }

        .x2-modes-col-data {
          order: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        /* Desktop: 2-column grid keeping section in frame */
        @media screen and (min-width: 992px) {
          .x2-modes-layout-grid {
            display: grid;
            grid-template-columns: 1.15fr 1fr;
            align-items: center;
            gap: clamp(2.5rem, 4.5vw, 4.5rem);
          }
          .x2-modes-col-data {
            order: 1 !important;
            width: 100%;
          }
          .x2-modes-col-media {
            order: 2 !important;
            width: 100%;
            max-width: 440px;
            justify-content: flex-end;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 40px)',
          boxSizing: 'border-box',
        }}
      >
        <div className="x2-modes-layout-grid">
          
          {/* DATA COLUMN (NO BOX CONTAINER, JUST CLEAN TYPOGRAPHY & GLOWING DOTS) */}
          <div className="x2-modes-col-data">
            <div style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body-family, var(--font-inter), sans-serif)',
                  fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '0.4rem',
                }}
              >
                Miroooo X2
              </span>
              <h2
                style={{
                  fontFamily: "'Poppins', var(--font-heading-family, var(--font-inter), sans-serif)",
                  fontSize: 'clamp(1.75rem, 3vw, 2.6rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                3 SMART CLEANING MODES
              </h2>
            </div>

            {/* Fully visible, static modes list with clean dots */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.1rem, 2vw, 1.5rem)', width: '100%' }}>
              {MODES.map((mode) => (
                <div
                  key={mode.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    padding: 0,
                    margin: 0,
                    background: 'transparent',
                    border: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: mode.color,
                        boxShadow: `0 0 10px ${mode.color}`,
                        flexShrink: 0,
                      }}
                    />
                    <h3
                      style={{
                        fontFamily: "'Poppins', var(--font-heading-family, var(--font-inter), sans-serif)",
                        fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {mode.name}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body-family, var(--font-inter), sans-serif)',
                      fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                      color: 'rgba(255, 255, 255, 0.82)',
                      lineHeight: 1.55,
                      margin: 0,
                      paddingLeft: '1.45rem',
                      maxWidth: '520px',
                    }}
                  >
                    {mode.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* MEDIA COLUMN - Completely clean, NO text, NO chips, NO navigation on bottom */}
          <div className="x2-modes-col-media">
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: 'clamp(20px, 2.5vw, 26px)',
                overflow: 'hidden',
                background: '#050505',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: `0 20px 50px rgba(0, 0, 0, 0.85), 0 0 40px ${activeMode.color}20`,
                transition: 'box-shadow 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                boxSizing: 'border-box',
              }}
            >
              {/* Dynamic Ambient Glow Behind Toothbrush */}
              <div
                style={{
                  position: 'absolute',
                  width: '75%',
                  height: '75%',
                  top: '12%',
                  right: '10%',
                  backgroundColor: activeMode.color,
                  filter: 'blur(clamp(70px, 9vw, 100px))',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  zIndex: 1,
                  opacity: 0.55,
                  transform: 'translateZ(0)',
                  transition: 'background-color 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '50%',
                  height: '50%',
                  bottom: '-10%',
                  left: '-10%',
                  backgroundColor: activeMode.color,
                  filter: 'blur(clamp(80px, 10vw, 110px))',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  zIndex: 1,
                  opacity: 0.28,
                  transform: 'translateZ(0)',
                  transition: 'background-color 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Stacked Images Cross-fading Smoothly */}
              {MODES.map((mode, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={mode.id}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scale(1) translateZ(0)' : 'scale(1.03) translateZ(0)',
                      transition:
                        'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                      pointerEvents: isActive ? 'auto' : 'none',
                      zIndex: isActive ? 2 : 1,
                      willChange: 'opacity, transform',
                    }}
                  >
                    <picture>
                      <source srcSet={mode.image} type="image/webp" />
                      <img
                        src={mode.image}
                        alt={mode.alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block',
                          transform: 'translateZ(0)',
                        }}
                        loading="eager"
                        decoding="async"
                      />
                    </picture>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
