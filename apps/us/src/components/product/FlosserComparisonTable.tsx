'use client';

import React from 'react';
import { PRODUCTS } from '@/data/products';

export function FlosserComparisonTable() {
  const product = PRODUCTS['miroooo-water-flosser'] || PRODUCTS['water-flosser'] || PRODUCTS['flosser'];
  const currentPrice = product?.formattedPrice || '$69';
  const oldPrice = product?.formattedCompareAt || '$139';
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
        .flosser-comp-mobile {
          display: none;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 900px) {
          .flosser-comp-scroll-wrapper {
            display: none !important;
          }
          .flosser-comp-mobile {
            display: block !important;
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
              <div className="flosser-comp-cell">Free $10 Gift Card</div>
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

        {/* Mobile View (Card Matrix on < 900px) */}
        <div className="flosser-comp-mobile">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Winner Card */}
            <div
              style={{
                background: '#ffffff',
                color: '#000000',
                borderRadius: '16px',
                border: '2px solid #22c55e',
                padding: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <span style={{ background: '#22c55e', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    #1 Winner
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '6px 0 0 0', color: '#000000' }}>
                    Miroooo Water Flosser
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#15803d' }}>{currentPrice}</div>
                  {oldPrice && <div style={{ fontSize: '0.8rem', color: '#64748b', textDecoration: 'line-through' }}>{oldPrice}</div>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '0.82rem' }}>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>Peak Pressure</div>
                  <strong style={{ color: '#000000' }}>138 PSI Max</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>Reservoir</div>
                  <strong style={{ color: '#000000' }}>320 ml (Full Session)</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>Battery Life</div>
                  <strong style={{ color: '#000000' }}>60 Days (2000mAh)</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>Nozzles Included</div>
                  <strong style={{ color: '#000000' }}>7 Precision Tips</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>Piston Pump</div>
                  <strong style={{ color: '#15803d' }}>Medical Grade Stainless</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>Bonus Gift</div>
                  <strong style={{ color: '#15803d' }}>Free $10 Voucher Included</strong>
                </div>
              </div>
            </div>

            {/* Competitor Cards Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {competitors.map((comp) => (
                <div
                  key={comp.name}
                  style={{
                    background: '#111111',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '14px',
                  }}
                >
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>{comp.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px' }}>{comp.price}</div>
                  <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.45 }}>
                    <div>PSI: {comp.psi}</div>
                    <div>Tank: {comp.reservoir}</div>
                    <div>Battery: {comp.battery}</div>
                    <div>Tips: {comp.nozzles}</div>
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
