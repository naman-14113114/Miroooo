'use client';

import React from 'react';

export interface FlosserModesSectionProps {
  className?: string;
  id?: string;
}

interface HydroModeItem {
  number: string;
  title: string;
  specs: string;
  description: string;
  icon: React.ReactNode;
}

export const HYDRO_MODES: HydroModeItem[] = [
  {
    number: '01',
    title: 'CLEAN / NORMAL',
    specs: '1,800 Pulses/Min • 90 PSI',
    description:
      'Everyday deep cleaning between teeth. Generates a precision micro-bubble stream to flush trapped plaque, food particles, and biofilm from interdental crevices.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        <path d="M12 11a3 3 0 0 0-3 3" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'WHITE / INTENSE',
    specs: '2,000 Pulses/Min • 138 PSI',
    description:
      'Maximum hydrodynamic power. High-frequency micro-jets designed to lift stubborn surface stains along the gumline and dislodge tight interproximal debris.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M11 3L8 9l4 11 4-11-3-6" />
        <path d="M2 9h20" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'NURSE / PULSE',
    specs: '1,800 Pulses/Min • 60–100 PSI',
    description:
      'Intermittent hydro-massage. Gentle pressure waves alternate to stimulate blood circulation in delicate gum tissue and soothe sensitive gingival margins.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'SOFT',
    specs: '1,400 Pulses/Min • 60 PSI',
    description:
      'Gentle low-turbulence stream. Tailored for first-time flosser users, delicate enamel, and sensitive gums for comfortable daily flossing.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  },
];

export function FlosserModesSection({
  className = '',
  id = 'flosser-modes-section',
}: FlosserModesSectionProps) {
  return (
    <div
      id={id}
      className={`shopify-section ${className}`}
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
        .flosser-mode-container {
          max-width: 1320px;
          margin: 0 auto;
          background: #fafafa;
          border-radius: 24px;
          padding: clamp(2rem, 4.5vw, 4rem) clamp(1.25rem, 4.5vw, 4rem);
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
        }
        .flosser-mode-frame-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 100%;
        }
        .flosser-mode-col-visual {
          order: 1;
          width: 100%;
          max-width: 480px;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }
        .flosser-mode-col-visual img {
          width: 100%;
          height: 100%;
          max-height: 480px;
          object-fit: contain;
          display: block;
          background: transparent;
          border: none;
          outline: none;
          box-shadow: none;
        }
        .flosser-mode-col-text {
          order: 2;
          width: 100%;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
          padding: 0 0.5rem;
          box-sizing: border-box;
        }
        @media screen and (min-width: 768px) {
          .flosser-mode-container {
            padding: clamp(2.5rem, 4.5vw, 4rem);
          }
          .flosser-mode-frame-grid {
            display: grid;
            grid-template-columns: 1fr 1.15fr;
            gap: clamp(2rem, 4vw, 4rem);
            align-items: center;
            justify-items: center;
          }
          .flosser-mode-col-visual {
            order: 1 !important;
            width: 100%;
            max-width: 460px;
            aspect-ratio: 1 / 1;
          }
          .flosser-mode-col-text {
            order: 2 !important;
            text-align: left;
            padding: 0;
            justify-content: center;
          }
        }
      `}</style>

      <div className="flosser-mode-container">
        <div className="flosser-mode-frame-grid">
          {/* Left Column: Visual */}
          <div className="flosser-mode-col-visual">
            <img
              src="/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-duo.webp"
              alt="Miroooo Hydro Cleaning Modes"
              width="480"
              height="480"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Right Column: Text List */}
          <div className="flosser-mode-col-text">
            <h2
              style={{
                fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.6rem, 2.4vw, 2.3rem)',
                fontWeight: 600,
                color: '#111111',
                margin: '0 0 1.25rem 0',
                lineHeight: 1.25,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              MIROOOO 4 HYDRO CLEANING MODES
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', marginLeft: '-5px' }}>
              {HYDRO_MODES.map((mode) => (
                <div key={mode.number} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      flexShrink: 0,
                      borderRadius: '50%',
                      backgroundColor: '#111111',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {mode.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.45rem',
                        flexWrap: 'wrap',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif",
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          color: '#111111',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          margin: 0,
                        }}
                      >
                        {mode.number}. {mode.title}
                      </h3>
                      <span
                        style={{
                          fontFamily: "var(--font-body-family, var(--font-inter), sans-serif)",
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#666666',
                          letterSpacing: '0.02em',
                        }}
                      >
                        ({mode.specs})
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-body-family, var(--font-inter), sans-serif)",
                        fontSize: '0.88rem',
                        color: '#444444',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {mode.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlosserModesSection;
