'use client';

import React from 'react';

interface ComparisonTableProps {
  isX2?: boolean;
}

export function ComparisonTable({ isX2 = true }: ComparisonTableProps) {
  const currentPrice = isX2 ? '£69' : '£59';
  const comparePrice = isX2 ? '£139' : '£119';
  const oldPrice = isX2 ? '£99' : '£89';
  const modelName = isX2 ? 'Miroooo X2' : 'Miroooo X1';
  const winnerImg = isX2
    ? '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp'
    : '/assets_ref/x/gallery/miroooo-x-sonic-electric-toothbrush-silver.webp';

  return (
    <div
      id="shopify-section-template--miroooo-comparison"
      className="shopify-section"
      style={{
        background: '#000000',
        color: '#ffffff',
        padding: 'clamp(3.5rem, 6vw, 6rem) 0',
        overflow: 'visible',
        width: '100%',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        .miroooo-comp-section {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 20px;
          box-sizing: border-box;
        }
        .miroooo-comp-header {
          text-align: center;
          max-width: 820px;
          margin: 0 auto clamp(2.5rem, 4vw, 3.5rem) auto;
        }
        .miroooo-comp-title {
          font-family: var(--font-heading-family, 'Inter', -apple-system, sans-serif);
          font-size: clamp(1.85rem, 3.5vw, 2.75rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 10px 0;
          letter-spacing: -0.03em;
          line-height: 1.15;
        }
        .miroooo-comp-subtitle {
          font-family: var(--font-body-family, 'Inter', -apple-system, sans-serif);
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          font-weight: 400;
        }
        .miroooo-comp-scroll-wrapper {
          width: 100%;
          overflow-x: auto;
          padding: 24px 8px 32px 8px;
          box-sizing: border-box;
          -webkit-overflow-scrolling: touch;
        }
        .miroooo-comp-grid {
          display: grid;
          grid-template-columns: 220px repeat(4, minmax(180px, 1fr));
          min-width: 960px;
          gap: 0;
          position: relative;
        }
        .miroooo-comp-col {
          display: flex;
          flex-direction: column;
          background: #111111;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }
        .miroooo-comp-col:last-child {
          border-top-right-radius: 16px;
          border-bottom-right-radius: 16px;
        }
        .miroooo-comp-col--features {
          background: #000000;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
          z-index: 1;
        }
        .miroooo-comp-col--winner {
          background: #ffffff;
          color: #000000;
          border: 2px solid #22c55e !important;
          border-radius: 18px;
          transform: scale(1.035) translateY(-8px);
          z-index: 10;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(34, 197, 94, 0.25);
        }
        .miroooo-comp-cell--head {
          min-height: 220px;
          padding: 24px 16px 16px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-sizing: border-box;
          position: relative;
        }
        .miroooo-comp-col--features .miroooo-comp-cell--head {
          align-items: flex-start;
          text-align: left;
          justify-content: flex-end;
          padding-bottom: 18px;
        }
        .miroooo-comp-col--winner .miroooo-comp-cell--head {
          border-bottom: 2px solid #22c55e;
          background: #ffffff;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          padding: 24px 16px 0 16px;
        }
        .miroooo-comp-head-img-wrap {
          height: 140px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          width: 100%;
          margin-top: auto;
          line-height: 0;
        }
        .miroooo-comp-head-img-wrap img {
          height: 140px;
          max-height: 140px;
          width: auto;
          object-fit: contain;
          display: block;
          margin: 0 auto;
        }
        .miroooo-comp-cell {
          min-height: 62px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.65);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          box-sizing: border-box;
          line-height: 1.35;
        }
        .miroooo-comp-col--features .miroooo-comp-cell {
          justify-content: flex-start;
          text-align: left;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          padding-left: 12px;
        }
        .miroooo-comp-col--winner .miroooo-comp-cell {
          color: #000000 !important;
          font-weight: 700;
          font-size: 0.92rem;
          border-bottom: 1px solid #edf2f7;
        }
        .miroooo-comp-cell--price {
          min-height: 76px;
          font-size: 1.2rem;
          font-weight: 700;
          border-bottom: none !important;
        }
        .miroooo-comp-col--winner .miroooo-comp-cell--price {
          background: #f0fdf4 !important;
          border-bottom-left-radius: 17px;
          border-bottom-right-radius: 17px;
        }
        .miroooo-comp-mobile {
          display: none;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 767px) {
          .miroooo-comp-scroll-wrapper {
            display: none !important;
          }
          .miroooo-comp-mobile {
            display: block !important;
          }
          .miroooo-comp-m-table {
            width: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            box-sizing: border-box;
          }
          .miroooo-comp-m-head-row {
            display: flex;
            align-items: flex-end;
            width: 100%;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            padding-bottom: 10px;
            box-sizing: border-box;
          }
          .miroooo-comp-m-head-col {
            flex: 1;
            width: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 6px 2px;
            box-sizing: border-box;
          }
          .miroooo-comp-m-head-col--winner {
            background: #ffffff;
            color: #000000;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
            padding-top: 10px;
            padding-bottom: 0;
          }
          .miroooo-comp-m-brand-name {
            font-family: var(--font-heading-family, 'Inter', -apple-system, sans-serif);
            font-size: 0.72rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.2;
            margin-bottom: 6px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          }
          .miroooo-comp-m-head-col--winner .miroooo-comp-m-brand-name {
            color: #000000;
            font-weight: 800;
            font-size: 0.76rem;
          }
          .miroooo-comp-m-head-img {
            height: 56px;
            width: 100%;
            object-fit: contain;
            display: block;
          }
          .miroooo-comp-m-row-group {
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding: 9px 0 7px 0;
            box-sizing: border-box;
          }
          .miroooo-comp-m-row-group--last {
            border-bottom: none;
            padding-bottom: 0;
          }
          .miroooo-comp-m-feature-title {
            font-family: var(--font-body-family, 'Inter', -apple-system, sans-serif);
            font-size: 0.82rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.95);
            padding: 0 4px 4px 4px;
            text-align: center !important;
            width: 100% !important;
            display: block !important;
            box-sizing: border-box;
            margin: 0 auto;
            line-height: 1.3;
          }
          .miroooo-comp-m-values-row {
            display: flex;
            align-items: stretch;
            width: 100%;
          }
          .miroooo-comp-m-val-cell {
            flex: 1;
            width: 25%;
            min-height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: var(--font-body-family, 'Inter', -apple-system, sans-serif);
            font-size: 0.76rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.65);
            padding: 2px 2px;
            box-sizing: border-box;
          }
          .miroooo-comp-m-val-cell--winner {
            background: #ffffff;
            color: #000000 !important;
            font-weight: 700;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
          }
          .miroooo-comp-m-val-cell--winner-last {
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
            padding-bottom: 12px;
          }
          .miroooo-comp-m-price-winner {
            color: #15803d !important;
            font-size: 1.05rem;
            font-weight: 900;
            line-height: 1.1;
          }
          .miroooo-comp-m-price-old {
            font-size: 0.64rem;
            color: #64748b;
            font-weight: 700;
            text-decoration: line-through;
            display: block;
            margin-top: 1px;
          }
          .miroooo-comp-m-price-competitor {
            color: rgba(255, 255, 255, 0.85);
            font-size: 0.86rem;
            font-weight: 700;
          }
        }
      `}</style>

      <div className="miroooo-comp-section">
        {/* Header */}
        <div className="miroooo-comp-header">
          <h2 className="miroooo-comp-title">
            What makes {modelName} right for you?
          </h2>
          <p className="miroooo-comp-subtitle">
            (Here is a comparison, but there is really no comparison)
          </p>
        </div>

        {/* Desktop Table (>= 768px) */}
        <div className="miroooo-comp-scroll-wrapper">
          <div className="miroooo-comp-grid">
            <div className="miroooo-comp-col miroooo-comp-col--features">
              <div className="miroooo-comp-cell--head">
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                  SPECIFICATION
                </span>
              </div>
              <div className="miroooo-comp-cell">Ultra-Light Weight</div>
              <div className="miroooo-comp-cell">Battery Life</div>
              <div className="miroooo-comp-cell">Luxury travel case</div>
              <div className="miroooo-comp-cell">Wall-mounted storage</div>
              <div className="miroooo-comp-cell">Miroooo dental care app</div>
              <div className="miroooo-comp-cell">Aluminium Alloy Body</div>
              <div className="miroooo-comp-cell">Free Extra Brush Heads</div>
              <div className="miroooo-comp-cell">Whisper Quiet (&lt;45 dB)</div>
              <div className="miroooo-comp-cell">Free Tracked Delivery</div>
              <div className="miroooo-comp-cell miroooo-comp-cell--price" style={{ fontSize: '1rem', color: '#ffffff' }}>Price</div>
            </div>

            <div className="miroooo-comp-col miroooo-comp-col--winner">
              <div className="miroooo-comp-cell--head">
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#000000', whiteSpace: 'nowrap', marginBottom: '8px' }}>
                  {modelName}
                </div>
                <div className="miroooo-comp-head-img-wrap">
                  <img src={winnerImg} alt={modelName} />
                </div>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">{isX2 ? '90 Days' : '60 Days'}</div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell miroooo-comp-cell--price">
                <div>
                  <div style={{ color: '#15803d', fontSize: '1.25rem', fontWeight: 900 }}>{currentPrice}</div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', textDecoration: 'line-through' }}>{oldPrice}</span>
                  <span style={{ fontSize: '0.62rem', color: '#15803d', fontWeight: 700, display: 'block', lineHeight: 1 }}>(for today only)</span>
                </div>
              </div>
            </div>

            <div className="miroooo-comp-col">
              <div className="miroooo-comp-cell--head">
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Oral-B iO6</div>
                <div className="miroooo-comp-head-img-wrap">
                  <img src="/assets_ref/competitors/miroooo-x2-comparison-competitor-oral-b-io6.webp" alt="Oral-B iO6" />
                </div>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">14 Days</div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell miroooo-comp-cell--price">
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>£149</span>
              </div>
            </div>

            <div className="miroooo-comp-col">
              <div className="miroooo-comp-cell--head">
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Philips 9000</div>
                <div className="miroooo-comp-head-img-wrap">
                  <img src="/assets_ref/competitors/miroooo-x2-comparison-competitor-philips-sonicare-diamondclean-9000.webp" alt="Philips Sonicare 9000" />
                </div>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">14 Days</div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell miroooo-comp-cell--price">
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>£219</span>
              </div>
            </div>

            <div className="miroooo-comp-col">
              <div className="miroooo-comp-cell--head">
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Suri 2.0</div>
                <div className="miroooo-comp-head-img-wrap">
                  <img src="/assets_ref/competitors/miroooo-x2-comparison-competitor-suri-sustainable-sonic-toothbrush.webp" alt="Suri 2.0" />
                </div>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">40 Days</div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="miroooo-comp-cell miroooo-comp-cell--price">
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>£85</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View (<= 767px) */}
        <div className="miroooo-comp-mobile">
          <div className="miroooo-comp-m-table">
            <div className="miroooo-comp-m-head-row">
              <div className="miroooo-comp-m-head-col miroooo-comp-m-head-col--winner">
                <span className="miroooo-comp-m-brand-name">{modelName}</span>
                <img src={winnerImg} alt={modelName} className="miroooo-comp-m-head-img" />
              </div>
              <div className="miroooo-comp-m-head-col">
                <span className="miroooo-comp-m-brand-name">Oral-B iO6</span>
                <img src="/assets_ref/competitors/miroooo-x2-comparison-competitor-oral-b-io6.webp" alt="Oral-B iO6" className="miroooo-comp-m-head-img" />
              </div>
              <div className="miroooo-comp-m-head-col">
                <span className="miroooo-comp-m-brand-name">Philips 9000</span>
                <img src="/assets_ref/competitors/miroooo-x2-comparison-competitor-philips-sonicare-diamondclean-9000.webp" alt="Philips 9000" className="miroooo-comp-m-head-img" />
              </div>
              <div className="miroooo-comp-m-head-col">
                <span className="miroooo-comp-m-brand-name">Suri 2.0</span>
                <img src="/assets_ref/competitors/miroooo-x2-comparison-competitor-suri-sustainable-sonic-toothbrush.webp" alt="Suri 2.0" className="miroooo-comp-m-head-img" />
              </div>
            </div>

            {/* Feature: Ultra-Light Weight */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Ultra-Light Weight</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Feature: Battery Life */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Battery Life</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">{isX2 ? '90 Days' : '60 Days'}</div>
                <div className="miroooo-comp-m-val-cell">14 Days</div>
                <div className="miroooo-comp-m-val-cell">14 Days</div>
                <div className="miroooo-comp-m-val-cell">40 Days</div>
              </div>
            </div>

            {/* Feature: Luxury travel case */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Luxury travel case</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Feature: Wall-mounted storage */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Wall-mounted storage</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Feature: Free Brush Heads */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Free Extra Brush Heads</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Feature: Whisper Quiet */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Whisper Quiet (&lt;45 dB)</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Feature: Free Tracked Delivery */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Free Tracked Delivery</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Price Row */}
            <div className="miroooo-comp-m-row-group miroooo-comp-m-row-group--last">
              <div className="miroooo-comp-m-feature-title">Price</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner miroooo-comp-m-val-cell--winner-last">
                  <div>
                    <div className="miroooo-comp-m-price-winner">{currentPrice}</div>
                    <span className="miroooo-comp-m-price-old">{oldPrice}</span>
                    <span style={{ fontSize: '0.58rem', color: '#15803d', fontWeight: 700, display: 'block', lineHeight: 1, marginTop: '1px' }}>
                      (for today only)
                    </span>
                  </div>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <span className="miroooo-comp-m-price-competitor">£149</span>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <span className="miroooo-comp-m-price-competitor">£219</span>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <span className="miroooo-comp-m-price-competitor">£85</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
