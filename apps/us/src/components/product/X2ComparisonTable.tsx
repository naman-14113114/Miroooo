'use client';

import { PRODUCTS } from '@/data/products';
import React from 'react';

export function X2ComparisonTable() {
  return (
    <div
      id="shopify-section-template--miroooo-x2-comparison"
      className="shopify-section"
      style={{
        background: '#000000',
        color: '#ffffff',
        padding: 'clamp(2.5rem, 4vw, 4.5rem) 0',
        overflow: 'visible',
        width: '100%',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        .x2-comp-section {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3.5vw, 32px);
          box-sizing: border-box;
        }
        .x2-comp-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto clamp(2rem, 3.5vw, 2.75rem) auto;
        }
        .x2-comp-title {
          font-family: var(--font-heading-family, 'Inter', -apple-system, sans-serif);
          font-size: clamp(1.85rem, 3.5vw, 2.75rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 10px 0;
          letter-spacing: -0.03em;
          line-height: 1.15;
          text-transform: uppercase;
        }
        .x2-comp-title .x2-comp-vs {
          color: rgba(255, 255, 255, 0.45);
          font-weight: 400;
          font-size: 0.75em;
          margin: 0 6px;
        }
        .x2-comp-subtitle {
          font-family: var(--font-body-family, 'Inter', -apple-system, sans-serif);
          font-size: clamp(0.92rem, 1.6vw, 1.05rem);
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          font-weight: 400;
          line-height: 1.5;
        }
        .x2-comp-card-container {
          background: #ffffff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.12);
          width: 100%;
          box-sizing: border-box;
        }
        .x2-comp-desktop {
          display: block;
          width: 100%;
        }
        .x2-comp-grid {
          display: grid;
          grid-template-columns: 240px 1fr 1fr;
          gap: 0;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          background: #ffffff;
        }
        .x2-comp-col {
          display: flex;
          flex-direction: column;
          position: relative;
          box-sizing: border-box;
          background: #ffffff;
        }
        .x2-comp-col--features {
          border-right: 1px solid #f1f5f9;
        }
        .x2-comp-col--x2 {
          border-right: 1px solid #f1f5f9;
        }
        .x2-comp-cell--head {
          height: 205px;
          min-height: 205px;
          padding: 18px 14px 0 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          border-bottom: 1.5px solid #e5e7eb;
          background: #ffffff;
          box-sizing: border-box;
          position: relative;
        }
        .x2-comp-col--features .x2-comp-cell--head {
          align-items: flex-start;
          text-align: left;
          justify-content: flex-end;
          padding: 18px 18px 24px 18px;
        }
        .x2-comp-badge-pill {
          display: inline-block;
          background: #16a34a;
          color: #ffffff;
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          padding: 2px 9px;
          border-radius: 9999px;
          text-transform: uppercase;
          margin-bottom: 4px;
          box-shadow: 0 2px 6px rgba(22, 163, 74, 0.25);
        }
        .x2-comp-head-title {
          font-family: var(--font-heading-family, 'Inter', -apple-system, sans-serif);
          font-size: 1.12rem;
          font-weight: 800;
          color: #111111;
          margin: 1px 0 1px 0;
          line-height: 1.2;
        }
        .x2-comp-head-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #15803d;
          margin-bottom: 6px;
        }
        .x2-comp-col--x1 .x2-comp-head-tag {
          color: #666666;
          font-weight: 600;
        }
        .x2-comp-head-img-wrap {
          height: 120px;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          margin-top: auto;
          margin-bottom: 0;
          line-height: 0;
          box-sizing: border-box;
          background: #ffffff;
        }
        .x2-comp-head-img-wrap img {
          max-height: 120px;
          width: auto;
          object-fit: contain;
          object-position: bottom center;
          display: block;
          margin: 0 auto;
          padding: 0;
        }
        .x2-comp-cell {
          height: 52px;
          min-height: 52px;
          padding: 0 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 0.86rem;
          color: #333333;
          border-bottom: 1px solid #f1f5f9;
          box-sizing: border-box;
          line-height: 1.3;
          background: #ffffff;
        }
        .x2-comp-cell:nth-child(even) {
          background: #f9fafb;
        }
        .x2-comp-col--features .x2-comp-cell {
          justify-content: flex-start;
          text-align: left;
          font-size: 0.86rem;
          font-weight: 700;
          color: #111111;
          padding-left: 18px;
        }
        .x2-comp-col--x2 .x2-comp-cell {
          color: #111111;
          font-weight: 700;
        }
        .x2-comp-col--x1 .x2-comp-cell {
          color: #4b5563;
          font-weight: 500;
        }
        .x2-comp-val-highlight {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-weight: 700;
        }
        .x2-comp-tick-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #16a34a;
          color: #ffffff;
          font-size: 9px;
          font-weight: 900;
          flex-shrink: 0;
        }
        .x2-comp-cell--price {
          height: 74px;
          min-height: 74px;
          padding: 8px 12px;
          border-bottom: none !important;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .x2-comp-col--features .x2-comp-cell--price {
          justify-content: flex-start;
          padding-left: 18px;
        }
        .x2-price-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }
        .x2-price-line {
          display: inline-flex;
          align-items: baseline;
          gap: 5px;
        }
        .x2-price-old {
          font-size: 0.85rem;
          color: #64748b;
          text-decoration: line-through;
          font-weight: 600;
        }
        .x2-price-val {
          font-size: 1.32rem;
          font-weight: 900;
          color: #15803d;
          line-height: 1;
        }
        .x2-price-val-standard {
          font-size: 1.22rem;
          font-weight: 800;
          color: #111111;
          line-height: 1;
        }
        .x2-price-note {
          font-size: 0.65rem;
          font-weight: 700;
          color: #15803d;
          background: rgba(22, 163, 74, 0.12);
          padding: 1px 7px;
          border-radius: 9999px;
          letter-spacing: 0.02em;
        }

        /* Mobile Layout (< 768px) */
        .x2-comp-mobile {
          display: none;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 767px) {
          .x2-comp-desktop {
            display: none !important;
          }
          .x2-comp-mobile {
            display: block !important;
          }
          .x2-comp-m-table {
            width: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            box-sizing: border-box;
            padding: 4px 6px;
            background: #ffffff;
          }
          .x2-comp-m-head-row {
            display: flex;
            align-items: flex-end;
            width: 100%;
            border-bottom: 1.5px solid #e5e7eb;
            padding-bottom: 12px;
            box-sizing: border-box;
            background: #ffffff;
          }
          .x2-comp-m-head-col {
            flex: 1;
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 6px 4px 0 4px;
            box-sizing: border-box;
            position: relative;
            background: #ffffff;
          }
          .x2-comp-m-head-col:first-child {
            border-right: 1px solid #f1f5f9;
          }
          .x2-comp-m-badge {
            display: inline-block;
            background: #16a34a;
            color: #ffffff;
            font-size: 0.6rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            padding: 2px 8px;
            border-radius: 9999px;
            text-transform: uppercase;
            margin-bottom: 4px;
            box-shadow: 0 2px 5px rgba(22, 163, 74, 0.25);
          }
          .x2-comp-m-brand-name {
            font-family: var(--font-heading-family, 'Inter', -apple-system, sans-serif);
            font-size: 0.96rem;
            font-weight: 800;
            color: #111111;
            line-height: 1.2;
            margin-bottom: 1px;
          }
          .x2-comp-m-tag {
            font-size: 0.68rem;
            font-weight: 700;
            color: #15803d;
            margin-bottom: 6px;
          }
          .x2-comp-m-tag--x1 {
            color: #666666;
            font-weight: 600;
          }
          .x2-comp-m-head-img-wrap {
            height: 85px;
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            margin-top: auto;
            line-height: 0;
            background: #ffffff;
          }
          .x2-comp-m-head-img {
            max-height: 85px;
            width: auto;
            object-fit: contain;
            object-position: bottom center;
            display: block;
            margin: 0 auto;
            padding: 0;
          }
          .x2-comp-m-row-group {
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid #f1f5f9;
            padding: 8px 0 6px 0;
            box-sizing: border-box;
          }
          .x2-comp-m-row-group:nth-child(even) {
            background: #f9fafb;
            border-radius: 6px;
          }
          .x2-comp-m-row-group--last {
            border-bottom: none;
            padding-bottom: 4px;
          }
          .x2-comp-m-feature-title {
            font-family: var(--font-body-family, 'Inter', -apple-system, sans-serif);
            font-size: 0.78rem;
            font-weight: 700;
            color: #111111;
            padding: 0 4px 3px 4px;
            text-align: center !important;
            width: 100% !important;
            display: block !important;
            box-sizing: border-box;
            margin: 0 auto;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }
          .x2-comp-m-values-row {
            display: flex;
            align-items: stretch;
            width: 100%;
          }
          .x2-comp-m-val-cell {
            flex: 1;
            width: 50%;
            min-height: 38px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: var(--font-body-family, 'Inter', -apple-system, sans-serif);
            font-size: 0.78rem;
            font-weight: 600;
            color: #4b5563;
            padding: 3px 6px;
            box-sizing: border-box;
            line-height: 1.25;
          }
          .x2-comp-m-val-cell:first-child {
            border-right: 1px solid #f1f5f9;
          }
          .x2-comp-m-val-cell--x2 {
            color: #111111 !important;
            font-weight: 700;
          }
          .x2-comp-m-val-main {
            font-size: 0.8rem;
            font-weight: 700;
            line-height: 1.2;
          }
          .x2-comp-m-val-cell--x2 .x2-comp-m-val-main {
            color: #111111;
            font-weight: 800;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
          .x2-comp-m-val-sub {
            font-size: 0.65rem;
            color: #666666;
            margin-top: 1px;
            line-height: 1.15;
          }
          .x2-comp-m-val-cell--x2 .x2-comp-m-val-sub {
            color: #374151;
            font-weight: 600;
          }
          .x2-comp-m-tick {
            color: #16a34a;
            font-weight: 900;
            font-size: 0.85rem;
          }
          .x2-comp-m-price-winner {
            color: #15803d !important;
            font-size: 1.18rem;
            font-weight: 900;
            line-height: 1.1;
          }
          .x2-comp-m-price-old {
            font-size: 0.72rem;
            color: #64748b;
            font-weight: 700;
            text-decoration: line-through;
            display: block;
            margin-top: 1px;
          }
          .x2-comp-m-price-standard {
            color: #111111;
            font-size: 1.1rem;
            font-weight: 800;
          }
        }
      `}</style>

      <div className="x2-comp-section">
        {/* Header */}
        <div className="x2-comp-header">
          <h2 className="x2-comp-title">
            <span className="x2-comp-model">X1</span>
            <span className="x2-comp-vs">vs</span>
            <span className="x2-comp-model">X2</span>
          </h2>
          <p className="x2-comp-subtitle">
            Compare cleaning technology, power, and design across Miroooo X1 and Miroooo X2.
          </p>
        </div>

        {/* White Card Container */}
        <div className="x2-comp-card-container">
          {/* Desktop Table (>= 768px) */}
          <div className="x2-comp-desktop">
            <div className="x2-comp-grid">
              {/* Features Column */}
              <div className="x2-comp-col x2-comp-col--features">
                <div className="x2-comp-cell--head">
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#111111' }}>Key Features</span>
                </div>
                <div className="x2-comp-cell">Battery Life</div>
                <div className="x2-comp-cell">Motor Power (VPM)</div>
                <div className="x2-comp-cell">Cleaning Motion</div>
                <div className="x2-comp-cell">Cleaning Modes</div>
                <div className="x2-comp-cell">Charging &amp; Travel</div>
                <div className="x2-comp-cell">Body Material</div>
                <div className="x2-comp-cell x2-comp-cell--price">Price</div>
              </div>

              {/* Miroooo X2 (Winner) Column */}
              <div className="x2-comp-col x2-comp-col--x2">
                <div className="x2-comp-cell--head">
                  <span className="x2-comp-badge-pill">★ Flagship Choice</span>
                  <h3 className="x2-comp-head-title">Miroooo X2</h3>
                  <span className="x2-comp-head-tag">Next-Gen Flagship</span>
                  <div className="x2-comp-head-img-wrap">
                    <img src="/assets_ref/x2/miroooo-x2-sonic-electric-toothbrush-model-comparison.webp" alt="Miroooo X2 Sonic Electric Toothbrush with 45° Bass Sweep - Flagship Model" loading="eager" decoding="async" />
                  </div>
                </div>
                <div className="x2-comp-cell">
                  <span className="x2-comp-val-highlight">
                    <span className="x2-comp-tick-icon">✓</span>
                    <strong>90+ Days</strong>
                  </span>
                </div>
                <div className="x2-comp-cell">
                  <span className="x2-comp-val-highlight">
                    <span className="x2-comp-tick-icon">✓</span>
                    <strong>40,000 VPM</strong> High-Torque Motor
                  </span>
                </div>
                <div className="x2-comp-cell">
                  <span className="x2-comp-val-highlight">
                    <span className="x2-comp-tick-icon">✓</span>
                    <strong>45° Bass Sweep</strong> (Dentist Motion)
                  </span>
                </div>
                <div className="x2-comp-cell">
                  <span className="x2-comp-val-highlight">
                    <span className="x2-comp-tick-icon">✓</span>
                    <strong>3 Modes</strong> (Clean, White, Deep)
                  </span>
                </div>
                <div className="x2-comp-cell">
                  <span className="x2-comp-val-highlight">
                    <span className="x2-comp-tick-icon">✓</span>
                    <strong>Direct USB-C</strong> (No Bulky Dock)
                  </span>
                </div>
                <div className="x2-comp-cell">
                  <span className="x2-comp-val-highlight">
                    <span className="x2-comp-tick-icon">✓</span>
                    <strong>Aerospace Aluminium</strong>
                  </span>
                </div>
                <div className="x2-comp-cell x2-comp-cell--price">
                  <div className="x2-price-wrap">
                    <div className="x2-price-line">
                      <span className="x2-price-old">{PRODUCTS['miroooo-x2'].formattedCompareAt}</span>
                      <span className="x2-price-val">{PRODUCTS['miroooo-x2'].formattedPrice}</span>
                    </div>
                    <span className="x2-price-note">(for today only)</span>
                  </div>
                </div>
              </div>

              {/* Miroooo X1 Column */}
              <div className="x2-comp-col x2-comp-col--x1">
                <div className="x2-comp-cell--head">
                  <span className="x2-comp-badge-pill" style={{ visibility: 'hidden' }}>Placeholder</span>
                  <h3 className="x2-comp-head-title">Miroooo X1</h3>
                  <span className="x2-comp-head-tag">Standard Model</span>
                  <div className="x2-comp-head-img-wrap">
                    <img src="/assets_ref/x/miroooo-x1-sonic-electric-toothbrush-model-comparison.webp" alt="Miroooo X1 Sonic Electric Toothbrush - Standard Model" loading="eager" decoding="async" />
                  </div>
                </div>
                <div className="x2-comp-cell">60 Days</div>
                <div className="x2-comp-cell">32,000 VPM Sonic Motor</div>
                <div className="x2-comp-cell">Standard Micro-Vibration (0°)</div>
                <div className="x2-comp-cell">Everyday Clean</div>
                <div className="x2-comp-cell">Bulky Charging Dock</div>
                <div className="x2-comp-cell">Aerospace Aluminium</div>
                <div className="x2-comp-cell x2-comp-cell--price">
                  <div className="x2-price-wrap">
                    <span className="x2-price-val-standard">{PRODUCTS['miroooo-x'].formattedPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Comparison Layout (< 768px) */}
          <div className="x2-comp-mobile">
            <div className="x2-comp-m-table">
              {/* Mobile Headers (Side-by-Side) */}
              <div className="x2-comp-m-head-row">
                {/* Left: Miroooo X2 */}
                <div className="x2-comp-m-head-col">
                  <span className="x2-comp-m-badge">★ Flagship</span>
                  <span className="x2-comp-m-brand-name">Miroooo X2</span>
                  <span className="x2-comp-m-tag">Next-Gen Flagship</span>
                  <div className="x2-comp-m-head-img-wrap">
                    <img src="/assets_ref/x2/miroooo-x2-sonic-electric-toothbrush-model-comparison.webp" alt="Miroooo X2 Sonic Electric Toothbrush" className="x2-comp-m-head-img" loading="eager" decoding="async" />
                  </div>
                </div>
                {/* Right: Miroooo X1 */}
                <div className="x2-comp-m-head-col">
                  <span className="x2-comp-m-badge" style={{ visibility: 'hidden' }}>Placeholder</span>
                  <span className="x2-comp-m-brand-name">Miroooo X1</span>
                  <span className="x2-comp-m-tag x2-comp-m-tag--x1">Standard Model</span>
                  <div className="x2-comp-m-head-img-wrap">
                    <img src="/assets_ref/x/miroooo-x1-sonic-electric-toothbrush-model-comparison.webp" alt="Miroooo X1 Sonic Electric Toothbrush" className="x2-comp-m-head-img" loading="eager" decoding="async" />
                  </div>
                </div>
              </div>

              {/* Feature 1: Battery Life */}
              <div className="x2-comp-m-row-group">
                <div className="x2-comp-m-feature-title">Battery Life</div>
                <div className="x2-comp-m-values-row">
                  <div className="x2-comp-m-val-cell x2-comp-m-val-cell--x2">
                    <span className="x2-comp-m-val-main"><span className="x2-comp-m-tick">✓</span> 90+ Days</span>
                    <span className="x2-comp-m-val-sub">High-Density Cell</span>
                  </div>
                  <div className="x2-comp-m-val-cell">
                    <span className="x2-comp-m-val-main">60 Days</span>
                    <span className="x2-comp-m-val-sub">Standard Battery</span>
                  </div>
                </div>
              </div>

              {/* Feature 2: Motor Power (VPM) */}
              <div className="x2-comp-m-row-group">
                <div className="x2-comp-m-feature-title">Motor Power (VPM)</div>
                <div className="x2-comp-m-values-row">
                  <div className="x2-comp-m-val-cell x2-comp-m-val-cell--x2">
                    <span className="x2-comp-m-val-main"><span className="x2-comp-m-tick">✓</span> 40,000 VPM</span>
                    <span className="x2-comp-m-val-sub">High-Torque Acoustic</span>
                  </div>
                  <div className="x2-comp-m-val-cell">
                    <span className="x2-comp-m-val-main">32,000 VPM</span>
                    <span className="x2-comp-m-val-sub">Standard Sonic</span>
                  </div>
                </div>
              </div>

              {/* Feature 3: Cleaning Motion */}
              <div className="x2-comp-m-row-group">
                <div className="x2-comp-m-feature-title">Cleaning Motion</div>
                <div className="x2-comp-m-values-row">
                  <div className="x2-comp-m-val-cell x2-comp-m-val-cell--x2">
                    <span className="x2-comp-m-val-main"><span className="x2-comp-m-tick">✓</span> 45° Bass Sweep</span>
                    <span className="x2-comp-m-val-sub">Dentist-Recommended</span>
                  </div>
                  <div className="x2-comp-m-val-cell">
                    <span className="x2-comp-m-val-main">Micro-Vibration</span>
                    <span className="x2-comp-m-val-sub">0° Linear</span>
                  </div>
                </div>
              </div>

              {/* Feature 4: Cleaning Modes */}
              <div className="x2-comp-m-row-group">
                <div className="x2-comp-m-feature-title">Cleaning Modes</div>
                <div className="x2-comp-m-values-row">
                  <div className="x2-comp-m-val-cell x2-comp-m-val-cell--x2">
                    <span className="x2-comp-m-val-main"><span className="x2-comp-m-tick">✓</span> 3 Modes</span>
                    <span className="x2-comp-m-val-sub">Clean, White, Deep</span>
                  </div>
                  <div className="x2-comp-m-val-cell">
                    <span className="x2-comp-m-val-main">Everyday Clean</span>
                    <span className="x2-comp-m-val-sub">Standard Mode</span>
                  </div>
                </div>
              </div>

              {/* Feature 5: Charging & Travel */}
              <div className="x2-comp-m-row-group">
                <div className="x2-comp-m-feature-title">Charging &amp; Travel</div>
                <div className="x2-comp-m-values-row">
                  <div className="x2-comp-m-val-cell x2-comp-m-val-cell--x2">
                    <span className="x2-comp-m-val-main"><span className="x2-comp-m-tick">✓</span> Direct USB-C</span>
                    <span className="x2-comp-m-val-sub">No Bulky Dock Needed</span>
                  </div>
                  <div className="x2-comp-m-val-cell">
                    <span className="x2-comp-m-val-main">Charging Dock</span>
                    <span className="x2-comp-m-val-sub">Requires Bulky Base</span>
                  </div>
                </div>
              </div>

              {/* Feature 6: Body Material */}
              <div className="x2-comp-m-row-group">
                <div className="x2-comp-m-feature-title">Body Material</div>
                <div className="x2-comp-m-values-row">
                  <div className="x2-comp-m-val-cell x2-comp-m-val-cell--x2">
                    <span className="x2-comp-m-val-main"><span className="x2-comp-m-tick">✓</span> Aerospace Aluminium</span>
                    <span className="x2-comp-m-val-sub">CNC Precision Handle</span>
                  </div>
                  <div className="x2-comp-m-val-cell">
                    <span className="x2-comp-m-val-main">Aerospace Aluminium</span>
                    <span className="x2-comp-m-val-sub">CNC Precision Handle</span>
                  </div>
                </div>
              </div>

              {/* Feature 7: Price */}
              <div className="x2-comp-m-row-group x2-comp-m-row-group--last">
                <div className="x2-comp-m-feature-title">Price</div>
                <div className="x2-comp-m-values-row">
                  <div className="x2-comp-m-val-cell x2-comp-m-val-cell--x2">
                    <div>
                      <div className="x2-comp-m-price-winner">{PRODUCTS['miroooo-x2'].formattedPrice}</div>
                      <span className="x2-comp-m-price-old">{PRODUCTS['miroooo-x2'].formattedCompareAt}</span>
                      <span style={{ fontSize: '0.58rem', color: '#15803d', fontWeight: 700, display: 'block', lineHeight: 1, marginTop: '1px' }}>(for today only)</span>
                    </div>
                  </div>
                  <div className="x2-comp-m-val-cell">
                    <span className="x2-comp-m-price-standard">{PRODUCTS['miroooo-x'].formattedPrice}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
