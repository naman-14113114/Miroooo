'use client';

import React from 'react';
import { PRODUCTS } from '@/data/products';

export function FlosserComparisonTable() {
  const product = PRODUCTS['miroooo-water-flosser'] || PRODUCTS['water-flosser'] || PRODUCTS['flosser'];
  const currentPrice = product?.formattedPrice || '£69';
  const oldPrice = product?.formattedCompareAt || '£139';
  const isUk = currentPrice.includes('£');

  const competitors = [
    {
      name: 'Waterpik Cordless',
      img: '/assets_ref/x/compare-suri.webp',
      badge: 'Cordless Advanced',
      psi: '75 PSI',
      reservoir: '210 ml',
      battery: '14 Days',
      nozzles: '4 Nozzles',
      modes: '3 Modes',
      pump: false,
      ipx7: true,
      usbc: false,
      gift: false,
      price: isUk ? '£89' : '$99',
    },
    {
      name: 'Philips 3000',
      img: '/assets_ref/x/compare-philips.webp',
      badge: 'Power Flosser',
      psi: '60 PSI',
      reservoir: '250 ml',
      battery: '14 Days',
      nozzles: '2 Nozzles',
      modes: '2 Modes',
      pump: false,
      ipx7: false,
      usbc: false,
      gift: false,
      price: isUk ? '£99' : '$119',
    },
    {
      name: 'Oral-B Aquacare',
      img: '/assets_ref/x/compare-oralb.webp',
      badge: 'Series 6',
      psi: '50 PSI',
      reservoir: '150 ml',
      battery: '7–10 Days',
      nozzles: '2 Nozzles',
      modes: '2 Modes',
      pump: false,
      ipx7: true,
      usbc: false,
      gift: false,
      price: isUk ? '£79' : '$89',
    },
    {
      name: 'Panasonic EW',
      img: '/assets_ref/x/compare-miroooo.webp',
      badge: 'Cordless Irrigator',
      psi: '85 PSI',
      reservoir: '200 ml',
      battery: '7 Days',
      nozzles: '2 Nozzles',
      modes: '3 Modes',
      pump: false,
      ipx7: true,
      usbc: false,
      gift: false,
      price: isUk ? '£85' : '$99',
    },
  ];

  return (
    <div
      id="shopify-section-template--miroooo-flosser-comparison"
      className="shopify-section flosser-comparison-section"
      style={{
        background: '#000000',
        color: '#ffffff',
        padding: 'clamp(3.5rem, 6vw, 6rem) 0',
        overflow: 'visible',
        width: '100%',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        .flosser-comp-section {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 20px;
          box-sizing: border-box;
        }
        .flosser-comp-header {
          text-align: center;
          max-width: 840px;
          margin: 0 auto clamp(2.5rem, 4vw, 3.5rem) auto;
        }
        .flosser-comp-title {
          font-family: var(--font-heading-family, 'Inter', -apple-system, sans-serif);
          font-size: clamp(1.85rem, 3.5vw, 2.75rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 10px 0;
          letter-spacing: -0.03em;
          line-height: 1.15;
        }
        .flosser-comp-subtitle {
          font-family: var(--font-body-family, 'Inter', -apple-system, sans-serif);
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          font-weight: 400;
        }
        .flosser-comp-scroll-wrapper {
          width: 100%;
          overflow-x: auto;
          padding: 24px 8px 32px 8px;
          box-sizing: border-box;
          -webkit-overflow-scrolling: touch;
        }
        .flosser-comp-grid {
          display: grid;
          grid-template-columns: 220px repeat(5, minmax(170px, 1fr));
          min-width: 1080px;
          gap: 0;
          position: relative;
        }
        .flosser-comp-col {
          display: flex;
          flex-direction: column;
          background: #111111;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }
        .flosser-comp-col:last-child {
          border-top-right-radius: 16px;
          border-bottom-right-radius: 16px;
        }
        .flosser-comp-col--features {
          background: #000000;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
          z-index: 1;
        }
        .flosser-comp-col--winner {
          background: #ffffff;
          color: #000000;
          border: 2px solid #22c55e !important;
          border-radius: 18px;
          transform: scale(1.03) translateY(-8px);
          z-index: 10;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(34, 197, 94, 0.25);
        }
        .flosser-comp-cell--head {
          min-height: 220px;
          padding: 20px 16px 16px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-sizing: border-box;
          position: relative;
        }
        .flosser-comp-col--features .flosser-comp-cell--head {
          align-items: flex-start;
          text-align: left;
          justify-content: flex-end;
          padding-bottom: 18px;
        }
        .flosser-comp-col--winner .flosser-comp-cell--head {
          border-bottom: 2px solid #22c55e;
          background: #ffffff;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          padding: 20px 16px 0 16px;
        }
        .flosser-comp-head-img-wrap {
          height: 135px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          width: 100%;
          margin-top: auto;
          line-height: 0;
        }
        .flosser-comp-head-img-wrap img {
          height: 135px;
          max-height: 135px;
          width: auto;
          object-fit: contain;
          display: block;
          margin: 0 auto;
        }
        .flosser-comp-cell {
          min-height: 58px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.7);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          box-sizing: border-box;
          line-height: 1.35;
        }
        .flosser-comp-col--features .flosser-comp-cell {
          justify-content: flex-start;
          text-align: left;
          font-size: 0.88rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          padding-left: 14px;
        }
        .flosser-comp-col--winner .flosser-comp-cell {
          color: #000000 !important;
          font-weight: 700;
          font-size: 0.9rem;
          border-bottom: 1px solid #edf2f7;
        }
        .flosser-comp-cell--price {
          min-height: 76px;
          font-size: 1.2rem;
          font-weight: 700;
          border-bottom: none !important;
        }
        .flosser-comp-col--winner .flosser-comp-cell--price {
          background: #f0fdf4 !important;
          border-bottom-left-radius: 17px;
          border-bottom-right-radius: 17px;
        }
        .flosser-comp-mobile,
        .miroooo-comp-mobile {
          display: none;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 767px) {
          .flosser-comp-scroll-wrapper {
            display: none !important;
          }
          .flosser-comp-mobile,
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

      <div className="flosser-comp-section">
        {/* Header */}
        <div className="flosser-comp-header">
          <h2 className="flosser-comp-title">
            What makes Miroooo Water Flosser right for you?
          </h2>
          <p className="flosser-comp-subtitle">
            (Here is a comparison, but there is really no comparison)
          </p>
        </div>

        {/* Desktop Table (>= 901px) */}
        <div className="flosser-comp-scroll-wrapper">
          <div className="flosser-comp-grid">
            {/* Column 0: Features Labels */}
            <div className="flosser-comp-col flosser-comp-col--features">
              <div className="flosser-comp-cell--head">
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                  SPECIFICATION
                </span>
              </div>
              <div className="flosser-comp-cell">Peak Hydro Pressure</div>
              <div className="flosser-comp-cell">Reservoir Capacity</div>
              <div className="flosser-comp-cell">Battery Endurance</div>
              <div className="flosser-comp-cell">Specialized Nozzles</div>
              <div className="flosser-comp-cell">Intelligent Modes</div>
              <div className="flosser-comp-cell">Medical Piston Pump</div>
              <div className="flosser-comp-cell">Waterproof Rating</div>
              <div className="flosser-comp-cell">USB-C Fast Charge</div>
              <div className="flosser-comp-cell">Free £10 Gift Card</div>
              <div className="flosser-comp-cell flosser-comp-cell--price" style={{ fontSize: '1rem', color: '#ffffff' }}>Price</div>
            </div>

            {/* Column 1: Miroooo Water Flosser (WINNER) */}
            <div className="flosser-comp-col flosser-comp-col--winner">
              <div className="flosser-comp-cell--head">
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#000000', whiteSpace: 'nowrap', marginBottom: '4px' }}>
                  Miroooo Flosser
                </div>
                <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                  #1 CLEAR WINNER
                </div>
                <div className="flosser-comp-head-img-wrap">
                  <img src="/assets_ref/flosser/gallery/miroooo-water-flosser-black-complete-set.webp" alt="Miroooo Water Flosser" />
                </div>
              </div>
              <div className="flosser-comp-cell" style={{ color: '#16a34a' }}>138 PSI Peak</div>
              <div className="flosser-comp-cell" style={{ color: '#16a34a' }}>320 ml High-Cap</div>
              <div className="flosser-comp-cell" style={{ color: '#16a34a' }}>60 Days (2000mAh)</div>
              <div className="flosser-comp-cell" style={{ color: '#16a34a' }}>7 Precision Tips</div>
              <div className="flosser-comp-cell">4 Hydro Modes</div>
              <div className="flosser-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="flosser-comp-cell">IPX7 Shower-Safe</div>
              <div className="flosser-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="flosser-comp-cell">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.2L8.6 12.8L14.2 7.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="flosser-comp-cell flosser-comp-cell--price">
                <div>
                  <div style={{ color: '#15803d', fontSize: '1.25rem', fontWeight: 900 }}>{currentPrice}</div>
                  {oldPrice && (
                    <span style={{ fontSize: '0.8rem', color: '#64748b', textDecoration: 'line-through' }}>{oldPrice}</span>
                  )}
                  <span style={{ fontSize: '0.62rem', color: '#15803d', fontWeight: 700, display: 'block', lineHeight: 1 }}>(for today only)</span>
                </div>
              </div>
            </div>

            {/* Competitor Columns */}
            {competitors.map((comp) => (
              <div key={comp.name} className="flosser-comp-col">
                <div className="flosser-comp-cell--head">
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>{comp.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>{comp.badge}</div>
                  <div className="flosser-comp-head-img-wrap">
                    <img src={comp.img} alt={comp.name} />
                  </div>
                </div>
                <div className="flosser-comp-cell">{comp.psi}</div>
                <div className="flosser-comp-cell">{comp.reservoir}</div>
                <div className="flosser-comp-cell">{comp.battery}</div>
                <div className="flosser-comp-cell">{comp.nozzles}</div>
                <div className="flosser-comp-cell">{comp.modes}</div>
                <div className="flosser-comp-cell">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="flosser-comp-cell">{comp.ipx7 ? 'IPX7' : 'Splash-Only'}</div>
                <div className="flosser-comp-cell">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="flosser-comp-cell">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7L13 13M13 7L7 13" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="flosser-comp-cell flosser-comp-cell--price">
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{comp.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View (<= 767px) */}
        <div className="miroooo-comp-mobile flosser-comp-mobile">
          <div className="miroooo-comp-m-table">
            <div className="miroooo-comp-m-head-row">
              <div className="miroooo-comp-m-head-col miroooo-comp-m-head-col--winner">
                <span className="miroooo-comp-m-brand-name">Miroooo Flosser</span>
                <img
                  src="/assets_ref/flosser/gallery/miroooo-water-flosser-black-complete-set.webp"
                  alt="Miroooo Flosser"
                  className="miroooo-comp-m-head-img"
                />
              </div>
              <div className="miroooo-comp-m-head-col">
                <span className="miroooo-comp-m-brand-name">Waterpik Cordless</span>
                <img
                  src="/assets_ref/x/compare-suri.webp"
                  alt="Waterpik Cordless"
                  className="miroooo-comp-m-head-img"
                />
              </div>
              <div className="miroooo-comp-m-head-col">
                <span className="miroooo-comp-m-brand-name">Philips 3000</span>
                <img
                  src="/assets_ref/x/compare-philips.webp"
                  alt="Philips 3000"
                  className="miroooo-comp-m-head-img"
                />
              </div>
              <div className="miroooo-comp-m-head-col">
                <span className="miroooo-comp-m-brand-name">Oral-B Aquacare</span>
                <img
                  src="/assets_ref/x/compare-oralb.webp"
                  alt="Oral-B Aquacare"
                  className="miroooo-comp-m-head-img"
                />
              </div>
            </div>

            {/* Feature: Peak Hydro Pressure */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Peak Hydro Pressure</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">138 PSI</div>
                <div className="miroooo-comp-m-val-cell">75 PSI</div>
                <div className="miroooo-comp-m-val-cell">60 PSI</div>
                <div className="miroooo-comp-m-val-cell">50 PSI</div>
              </div>
            </div>

            {/* Feature: Reservoir Capacity */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Reservoir Capacity</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">320 ml</div>
                <div className="miroooo-comp-m-val-cell">210 ml</div>
                <div className="miroooo-comp-m-val-cell">250 ml</div>
                <div className="miroooo-comp-m-val-cell">150 ml</div>
              </div>
            </div>

            {/* Feature: Battery Endurance */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Battery Endurance</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">60 Days</div>
                <div className="miroooo-comp-m-val-cell">14 Days</div>
                <div className="miroooo-comp-m-val-cell">14 Days</div>
                <div className="miroooo-comp-m-val-cell">7–10 Days</div>
              </div>
            </div>

            {/* Feature: Specialized Nozzles */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Specialized Nozzles</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">7 Tips</div>
                <div className="miroooo-comp-m-val-cell">4 Tips</div>
                <div className="miroooo-comp-m-val-cell">2 Tips</div>
                <div className="miroooo-comp-m-val-cell">2 Tips</div>
              </div>
            </div>

            {/* Feature: Intelligent Modes */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Intelligent Modes</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">4 Modes</div>
                <div className="miroooo-comp-m-val-cell">3 Modes</div>
                <div className="miroooo-comp-m-val-cell">2 Modes</div>
                <div className="miroooo-comp-m-val-cell">2 Modes</div>
              </div>
            </div>

            {/* Feature: Medical Piston Pump */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Medical Piston Pump</div>
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

            {/* Feature: Waterproof Rating */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Waterproof Rating</div>
              <div className="miroooo-comp-m-values-row">
                <div className="miroooo-comp-m-val-cell miroooo-comp-m-val-cell--winner">IPX7</div>
                <div className="miroooo-comp-m-val-cell">IPX7</div>
                <div className="miroooo-comp-m-val-cell">Splash</div>
                <div className="miroooo-comp-m-val-cell">IPX7</div>
              </div>
            </div>

            {/* Feature: USB-C Fast Charge */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">USB-C Fast Charge</div>
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

            {/* Feature: Free Gift Card */}
            <div className="miroooo-comp-m-row-group">
              <div className="miroooo-comp-m-feature-title">Free Gift Card</div>
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
                    {oldPrice && <span className="miroooo-comp-m-price-old">{oldPrice}</span>}
                    <span style={{ fontSize: '0.58rem', color: '#15803d', fontWeight: 700, display: 'block', lineHeight: 1, marginTop: '1px' }}>
                      (for today only)
                    </span>
                  </div>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <span className="miroooo-comp-m-price-competitor">{isUk ? '£89' : '$99'}</span>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <span className="miroooo-comp-m-price-competitor">{isUk ? '£99' : '$119'}</span>
                </div>
                <div className="miroooo-comp-m-val-cell">
                  <span className="miroooo-comp-m-price-competitor">{isUk ? '£79' : '$89'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
