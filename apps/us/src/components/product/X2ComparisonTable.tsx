'use client';

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
      <div className="x2-comp-section">
        {/* Header */}
        <div className="x2-comp-header">
          <h2 className="x2-comp-title">
            <span className="x2-comp-model">Miroooo X2</span>
            <span className="x2-comp-vs">vs</span>
            <span className="x2-comp-model" style={{ color: 'rgba(255,255,255,0.7)' }}>Miroooo X1</span>
          </h2>
          <p className="x2-comp-subtitle">
            A clear breakdown of why our latest flagship represents the definitive upgrade in everyday dental care.
          </p>
        </div>

        {/* White Card Container */}
        <div className="x2-comp-card-container">
          {/* Desktop Table (>= 768px) */}
          <div className="x2-comp-desktop">
            <div className="x2-comp-grid">
              {/* Features Column */}
              <div className="x2-comp-col x2-comp-col--features">
                <div className="x2-comp-cell x2-comp-cell--head">
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                    Feature Comparison
                  </span>
                </div>
                <div className="x2-comp-cell">Brushing Motion</div>
                <div className="x2-comp-cell">Vibration Speed</div>
                <div className="x2-comp-cell">Plaque Removal</div>
                <div className="x2-comp-cell">Battery Life</div>
                <div className="x2-comp-cell">Button &amp; Indicator</div>
                <div className="x2-comp-cell">Pressure Feedback</div>
                <div className="x2-comp-cell">Storage Solution</div>
                <div className="x2-comp-cell">Body Material</div>
                <div className="x2-comp-cell">Weight</div>
                <div className="x2-comp-cell x2-comp-cell--price">Price Today</div>
              </div>

              {/* Miroooo X2 (Winner) Column */}
              <div className="x2-comp-col x2-comp-col--x2">
                <div className="x2-comp-cell x2-comp-cell--head">
                  <span className="x2-comp-badge-pill">Latest Generation</span>
                  <h3 className="x2-comp-head-title">Miroooo X2</h3>
                  <span className="x2-comp-head-tag">45° Bass Sweep Technology</span>
                  <div className="x2-comp-head-img-wrap">
                    <img src="/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp" alt="Miroooo X2" />
                  </div>
                </div>
                <div className="x2-comp-cell">
                  <span className="x2-comp-val-highlight" style={{ color: '#15803d' }}>
                    <span className="x2-comp-tick-icon">✓</span> 45° Bass Sweep Motion
                  </span>
                </div>
                <div className="x2-comp-cell">
                  <span className="x2-comp-val-highlight">40,000 VPM Dynamic</span>
                </div>
                <div className="x2-comp-cell">
                  <span className="x2-comp-val-highlight" style={{ color: '#15803d' }}>10x Deeper Clean</span>
                </div>
                <div className="x2-comp-cell">
                  <span className="x2-comp-val-highlight" style={{ color: '#15803d' }}>90 Days (3 Months)</span>
                </div>
                <div className="x2-comp-cell">
                  <span>Seamless Button + Halo LED</span>
                </div>
                <div className="x2-comp-cell">
                  <span className="x2-comp-val-highlight" style={{ color: '#15803d' }}>
                    <span className="x2-comp-tick-icon">✓</span> Smart Red Halo Ring
                  </span>
                </div>
                <div className="x2-comp-cell">
                  <span>Magnetic Dock + Case</span>
                </div>
                <div className="x2-comp-cell">
                  <span>Aerospace Aluminum</span>
                </div>
                <div className="x2-comp-cell">
                  <span>51g (Ultralight)</span>
                </div>
                <div className="x2-comp-cell x2-comp-cell--price">
                  <div className="x2-price-wrap">
                    <div className="x2-price-line">
                      <span className="x2-price-old">$180.70</span>
                      <span className="x2-price-val">$89.70</span>
                    </div>
                    <span style={{ fontSize: '0.65rem', color: '#15803d', fontWeight: 800 }}>50% OFF TODAY</span>
                  </div>
                </div>
              </div>

              {/* Miroooo X1 Column */}
              <div className="x2-comp-col x2-comp-col--x1">
                <div className="x2-comp-cell x2-comp-cell--head">
                  <span style={{ height: '22px' }}></span>
                  <h3 className="x2-comp-head-title" style={{ color: '#4b5563' }}>Miroooo X1</h3>
                  <span className="x2-comp-head-tag">Classic Sonic Edition</span>
                  <div className="x2-comp-head-img-wrap">
                    <img src="/assets_ref/x/gallery/miroooo-x-sonic-electric-toothbrush-silver.webp" alt="Miroooo X1" />
                  </div>
                </div>
                <div className="x2-comp-cell">Standard Acoustic Sonic</div>
                <div className="x2-comp-cell">32,000 VPM</div>
                <div className="x2-comp-cell">Standard Daily Clean</div>
                <div className="x2-comp-cell">60 Days (2 Months)</div>
                <div className="x2-comp-cell">Physical Click Button</div>
                <div className="x2-comp-cell" style={{ color: '#9ca3af' }}>Standard Resistance</div>
                <div className="x2-comp-cell">Slim Travel Case</div>
                <div className="x2-comp-cell">Aircraft-Grade Alloy</div>
                <div className="x2-comp-cell">51g (Ultralight)</div>
                <div className="x2-comp-cell x2-comp-cell--price">
                  <div className="x2-price-wrap">
                    <div className="x2-price-line">
                      <span className="x2-price-old">$154.70</span>
                      <span className="x2-price-val" style={{ color: '#4b5563' }}>$76.70</span>
                    </div>
                    <span style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 700 }}>50% OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Comparison Table (<= 767px) */}
          <div className="x2-comp-mobile" style={{ display: 'none' }}>
            {/* Styled with CSS media query in theme.css / apps.css */}
          </div>
        </div>
      </div>
    </div>
  );
}
