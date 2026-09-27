'use client';

import React from 'react';
import Link from 'next/link';

export function ShopPage() {
  return (
    <main id="main">
      {/* Hero */}
      <header className="page-hero">
        <div className="site-shell">
          <p className="eyebrow eyebrow--light">Two models, no clutter</p>
          <h1>Find your Miroooo.</h1>
          <p className="lead lead--light">
            Start with the essentials or add more guidance. Both models are built around precise dental care, long battery life and a balanced aluminium body.
          </p>
        </div>
      </header>

      {/* Collection Grid */}
      <section className="section section--paper" aria-labelledby="collection-title">
        <div className="site-shell">
          <h2 id="collection-title" className="reveal">The collection.</h2>
          <div className="product-grid">
            {/* Miroooo X1 */}
            <article className="product-card reveal">
              <Link className="product-card__media" href="/products/miroooo-x" data-product-link>
                <img
                  src="/assets_ref/x/gallery/Miroooo_x_Pink-1.webp"
                  alt="Miroooo X1 in pink"
                  width="1000"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <div className="product-card__body">
                <div>
                  <p className="eyebrow">The essential</p>
                  <h3>Miroooo X1</h3>
                  <p>Three brushing modes, a lightweight 51 g body and 60+ days of battery life.</p>
                  <Link
                    className="button button--primary"
                    href="/products/miroooo-x"
                    data-product-link
                    style={{ marginTop: '18px' }}
                  >
                    <span className="btn-fill" data-fill></span>
                    <span className="btn-text">
                      Choose Miroooo X1{' '}
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle' }}>
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </div>
                <div className="price">
                  <span>£59</span> <s>£119</s>
                </div>
              </div>
            </article>

            {/* Miroooo X2 */}
            <article className="product-card product-card--dark reveal">
              <Link className="product-card__media" href="/products/miroooo-x2" data-product-link>
                <img
                  src="/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-upright-grip.webp"
                  alt="Miroooo X2 held upright"
                  width="1000"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <div className="product-card__body">
                <div>
                  <p className="eyebrow eyebrow--light">The guided</p>
                  <h3>Miroooo X2</h3>
                  <p>Up to 90 days of battery, a pressure-sensor ring and guidance for a more considered clean.</p>
                  <Link
                    className="button button--primary"
                    href="/products/miroooo-x2"
                    data-product-link
                    style={{ marginTop: '18px' }}
                  >
                    <span className="btn-fill" data-fill></span>
                    <span className="btn-text">
                      Choose Miroooo X2{' '}
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle' }}>
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </div>
                <div className="price">
                  <span>£69</span> <s>£139</s>
                </div>
              </div>
            </article>
          </div>

          {/* Quiz Card */}
          <div
            className="shop-quiz-card reveal"
            style={{
              marginTop: '28px',
              padding: '20px 28px',
              background: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: 'var(--radius-lg, 24px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--signal, #22c55e)',
                  color: '#041309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
                  <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--ink, #111111)', lineHeight: 1.4 }}>
                  Unsure which brush fits your routine?
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '13.5px', color: 'var(--mineral, #666666)', lineHeight: 1.4 }}>
                  Answer 5 quick questions to match your dental care goals, sensitivity and habits.
                </p>
              </div>
            </div>
            <Link
              className="button button--secondary"
              href="/pages/dentalcare-quiz"
              style={{ margin: 0, fontSize: '14px', padding: '10px 20px', whiteSpace: 'nowrap' }}
            >
              <span className="btn-fill" data-fill></span>
              <span className="btn-text">
                Take our 60-second Dental Care Quiz <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Model Guide Section */}
      <section className="section" aria-labelledby="model-guide">
        <div className="site-shell">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">Model guide</p>
              <h2 id="model-guide">What changes between X1 and X2.</h2>
            </div>
            <p>The same calm design language, with different levels of guidance and battery life.</p>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .compare-table .check {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              vertical-align: middle;
              margin-right: 6px;
            }
            .x2-comp-mobile {
              display: none;
              width: 100%;
              box-sizing: border-box;
            }
            @media (max-width: 767px) {
              .compare-table {
                display: none !important;
              }
              .compare-wrap {
                overflow-x: visible !important;
                background: #ffffff !important;
                border: 1.5px solid rgba(0, 0, 0, 0.08) !important;
                border-radius: 18px !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
                padding: 4px !important;
              }
              .x2-comp-mobile {
                display: block !important;
                width: 100%;
                box-sizing: border-box;
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
                vertical-align: bottom;
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
          ` }} />

          <div className="compare-wrap reveal" tabIndex={0} aria-label="Miroooo model comparison, scroll horizontally on small screens">
            {/* Desktop Table (>= 768px) */}
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Miroooo X1</th>
                  <th>Miroooo X2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Battery Life</th>
                  <td>60 Days</td>
                  <td><span className="check" aria-label="Included">✓</span> 90+ Days</td>
                </tr>
                <tr>
                  <th>Motor Power (VPM)</th>
                  <td>32,000 VPM Sonic Motor</td>
                  <td><span className="check" aria-label="Included">✓</span> 40,000 VPM High-Torque Motor</td>
                </tr>
                <tr>
                  <th>Cleaning Motion</th>
                  <td>Standard Micro-Vibration (0°)</td>
                  <td><span className="check" aria-label="Included">✓</span> 45° Bass Sweep (Dentist Motion)</td>
                </tr>
                <tr>
                  <th>Cleaning Modes</th>
                  <td>Everyday Clean</td>
                  <td><span className="check" aria-label="Included">✓</span> 3 Modes (Clean, White, Deep)</td>
                </tr>
                <tr>
                  <th>Charging &amp; Travel</th>
                  <td>Bulky Charging Dock</td>
                  <td><span className="check" aria-label="Included">✓</span> Direct USB-C (No Bulky Dock)</td>
                </tr>
                <tr>
                  <th>Body Material</th>
                  <td>Aerospace Aluminium</td>
                  <td><span className="check" aria-label="Included">✓</span> Aerospace Aluminium</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td><span>£59</span></td>
                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{ color: 'var(--signal-dark, #15803d)', fontWeight: 800 }}>£69</span>
                      <s style={{ color: 'var(--mineral, #666666)', fontSize: '13px', fontWeight: 500 }}>£139</s>
                    </div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--signal-dark, #15803d)', fontWeight: 700, marginTop: '2px' }}>(50% OFF)</span>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Mobile Comparison Layout (<768px) */}
            <div className="x2-comp-mobile">
              <div className="x2-comp-m-table">
                {/* Mobile Headers */}
                <div className="x2-comp-m-head-row">
                  <div className="x2-comp-m-head-col">
                    <span className="x2-comp-m-badge">★ Flagship</span>
                    <span className="x2-comp-m-brand-name">Miroooo X2</span>
                    <span className="x2-comp-m-tag">Next-Gen Flagship</span>
                    <div className="x2-comp-m-head-img-wrap">
                      <img src="/assets_ref/x2/miroooo-x2-sonic-electric-toothbrush-model-comparison.webp" alt="Miroooo X2 Sonic Electric Toothbrush" className="x2-comp-m-head-img" loading="eager" decoding="async" />
                    </div>
                  </div>
                  <div className="x2-comp-m-head-col">
                    <span className="x2-comp-m-badge" style={{ visibility: 'hidden' }}>Placeholder</span>
                    <span className="x2-comp-m-brand-name">Miroooo X1</span>
                    <span className="x2-comp-m-tag x2-comp-m-tag--x1">Standard Model</span>
                    <div className="x2-comp-m-head-img-wrap">
                      <img src="/assets_ref/x/miroooo-x1-sonic-electric-toothbrush-model-comparison.webp" alt="Miroooo X1 Sonic Electric Toothbrush" className="x2-comp-m-head-img" loading="eager" decoding="async" />
                    </div>
                  </div>
                </div>

                {/* Rows */}
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

                <div className="x2-comp-m-row-group x2-comp-m-row-group--last">
                  <div className="x2-comp-m-feature-title">Price</div>
                  <div className="x2-comp-m-values-row">
                    <div className="x2-comp-m-val-cell x2-comp-m-val-cell--x2">
                      <div>
                        <div className="x2-comp-m-price-winner">£69</div>
                        <span className="x2-comp-m-price-old">£139</span>
                        <span style={{ fontSize: '0.58rem', color: '#15803d', fontWeight: 700, display: 'block', lineHeight: 1, marginTop: '1px' }}>(50% OFF)</span>
                      </div>
                    </div>
                    <div className="x2-comp-m-val-cell">
                      <span className="x2-comp-m-price-standard">£59</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Essentials Section */}
      <section className="section section--dark" aria-labelledby="included-title">
        <div className="site-shell">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow eyebrow--light">Ready for the routine</p>
              <h2 id="included-title">The essentials come with you.</h2>
            </div>
            <p>Each model includes its handle, brush head, charging cable and travel protection. Confirm the exact bundle on the product page before ordering.</p>
          </div>
          <div className="value-grid">
            <article className="value-card reveal">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 3h10v18H7zM9 7h6M9 17h6" />
              </svg>
              <h3>Made to travel</h3>
              <p>A protective case keeps the brush together and ready for the next routine.</p>
            </article>
            <article className="value-card reveal">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4" />
              </svg>
              <h3>USB-C charging</h3>
              <p>A familiar cable format, with enough battery life to keep charging occasional.</p>
            </article>
            <article className="value-card reveal">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3 4.5 6v5.5c0 4.7 3.1 7.9 7.5 9.5 4.4-1.6 7.5-4.8 7.5-9.5V6L12 3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <h3>Dedicated support</h3>
              <p>Our London customer team is here to assist with any product questions or easy returns.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Panel */}
      <section className="section section--paper">
        <div className="site-shell">
          <div className="cta-panel reveal">
            <div>
              <p className="eyebrow">Still deciding?</p>
              <h2>Start with the way you brush.</h2>
              <p>Choose Miroooo X1 for simplicity and a lighter body. Choose Miroooo X2 for more feedback and the longest battery life.</p>
            </div>
            <Link className="button" href="/pages/faqs">
              <span className="btn-fill" data-fill></span>
              <span className="btn-text">Read the FAQs</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
