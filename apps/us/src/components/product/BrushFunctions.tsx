'use client';

import React from 'react';

export function BrushFunctions() {
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
            Tailored modes engineered to protect gums, lift surface stains, and deliver a dentist-level clean every single day.
          </p>
        </div>

        {/* 3 Modes Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2rem, 3.5vw, 3.5rem)',
            justifyContent: 'center',
            alignItems: 'start',
          }}
        >
          {/* Function 1: STANDARD */}
          <div className="function-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: 'clamp(140px, 18vw, 220px)',
                height: 'clamp(140px, 18vw, 220px)',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'transform 0.3s ease',
              }}
            >
              <img
                id="x2-mode-img-standard"
                src="/assets_ref/x2/modes/miroooo-x2-sonic-standard-cleaning-mode-green-led.webp"
                alt="Miroooo X2 Sonic Electric Toothbrush Standard Cleaning Mode with Green LED Halo Ring"
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
                STANDARD
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
                Balanced acoustic frequency designed for complete daily dental care, effectively removing everyday plaque while protecting sensitive enamel.
              </p>
            </div>
          </div>

          {/* Function 2: WHITENING */}
          <div className="function-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: 'clamp(140px, 18vw, 220px)',
                height: 'clamp(140px, 18vw, 220px)',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'transform 0.3s ease',
              }}
            >
              <img
                id="x2-mode-img-whitening"
                src="/assets_ref/x2/modes/miroooo-x2-sonic-whitening-mode-purple-led.webp"
                alt="Miroooo X2 Sonic Electric Toothbrush Whitening Mode with Purple LED Halo Ring"
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
                WHITENING
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
                Targeted high-frequency vibrations that effectively lift stubborn surface stains from coffee, tea, and food for a radiant smile.
              </p>
            </div>
          </div>

          {/* Function 3: DEEP CLEANSING */}
          <div className="function-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: 'clamp(140px, 18vw, 220px)',
                height: 'clamp(140px, 18vw, 220px)',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'transform 0.3s ease',
              }}
            >
              <img
                id="x2-mode-img-deep-clean"
                src="/assets_ref/x2/modes/miroooo-x2-sonic-deep-cleansing-mode-blue-led.webp"
                alt="Miroooo X2 Sonic Electric Toothbrush Deep Cleansing Mode with Blue LED Halo Ring"
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
                DEEP CLEANSING
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
                Maximum power for an intensive plaque-removing clean, delivering a dentist-fresh feeling along the gumline and hard-to-reach areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
