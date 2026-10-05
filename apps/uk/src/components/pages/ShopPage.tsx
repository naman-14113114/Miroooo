'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

type CategoryFilter = 'all' | 'toothbrushes' | 'heads' | 'accessories';

interface CollectionProduct {
  id: string;
  handle: string;
  name: string;
  category: 'toothbrushes' | 'heads' | 'accessories';
  eyebrow: string;
  description: string;
  price: string;
  compareAt: string;
  badge?: string;
  isSoldOut?: boolean;
  image: string;
  link: string;
  buttonText: string;
}

const UK_COLLECTION_PRODUCTS: CollectionProduct[] = [
  {
    id: 'miroooo-x2',
    handle: 'miroooo-x2',
    name: 'Miroooo X2',
    category: 'toothbrushes',
    eyebrow: 'Flagship Pro',
    description: 'Dynamic 45° Bass-sweep oscillation, smart 360° red halo pressure ring guidance & 90-day battery life.',
    price: '£69',
    compareAt: '£139',
    badge: '50% OFF',
    isSoldOut: false,
    image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-precision-bristle-heads.webp',
    link: '/products/miroooo-x2',
    buttonText: 'Choose Miroooo X2',
  },
  {
    id: 'miroooo-x',
    handle: 'miroooo-x',
    name: 'Miroooo X1',
    category: 'toothbrushes',
    eyebrow: 'The Essential',
    description: 'Ultra-precise 32,000 VPM acoustic sonic motor, 51g featherweight unibody & 60-day battery life.',
    price: '£69',
    compareAt: '£139',
    badge: '50% OFF',
    isSoldOut: false,
    image: '/assets_ref/x/gallery/Miroooo_x_Pink-1.webp',
    link: '/products/miroooo-x',
    buttonText: 'Choose Miroooo X1',
  },
  {
    id: 'miroooo-x2-heads',
    handle: 'miroooo-x2-heads',
    name: 'Miroooo X2 Heads (2-Pack)',
    category: 'heads',
    eyebrow: 'Replacement',
    description: 'DuPont™ precision rounded bristles engineered for 45° Bass sweep oscillating drive coupling.',
    price: '£10',
    compareAt: '£20',
    badge: '50% OFF',
    isSoldOut: false,
    image: '/assets_ref/x2/heads/B1.webp',
    link: '/products/miroooo-x2-heads',
    buttonText: 'View Item',
  },
  {
    id: 'miroooo-x1-heads',
    handle: 'miroooo-x1-heads',
    name: 'Miroooo X1 Heads (2-Pack)',
    category: 'heads',
    eyebrow: 'Replacement',
    description: 'Micro-diamond polished DuPont filaments protecting delicate enamel & gumline.',
    price: '£10',
    compareAt: '£20',
    badge: '50% OFF',
    isSoldOut: false,
    image: '/assets_ref/x/heads/B1.webp',
    link: '/products/miroooo-x1-heads',
    buttonText: 'View Item',
  },
  {
    id: 'travel-case',
    handle: 'travel-case',
    name: 'Luxury Travel Case',
    category: 'accessories',
    eyebrow: 'Protection',
    description: 'Slim magnetic hardshell with precision micro-ventilation. Keeps your brush hygienic anywhere.',
    price: '£20',
    compareAt: '£40',
    badge: 'SOLD OUT',
    isSoldOut: true,
    image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp',
    link: '/products/travel-case',
    buttonText: 'Sold Out',
  },
  {
    id: 'wall-mounted-dock',
    handle: 'wall-mounted-dock',
    name: 'Wall-Mounted Dock',
    category: 'accessories',
    eyebrow: 'Storage',
    description: 'Hygienic floating magnetic mirror and tile mount with 3M Command™ damage-free adhesive.',
    price: '£9',
    compareAt: '£18',
    badge: 'SOLD OUT',
    isSoldOut: true,
    image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted.webp',
    link: '/products/wall-mounted-dock',
    buttonText: 'Sold Out',
  },
  {
    id: 'x1-charger',
    handle: 'x1-charger',
    name: 'X1 Fast Charger',
    category: 'accessories',
    eyebrow: 'Charging',
    description: 'Rapid magnetic induction charging dock with durable high-speed braided USB power cable.',
    price: '£20',
    compareAt: '£40',
    badge: 'SOLD OUT',
    isSoldOut: true,
    image: '/assets_ref/x/gallery/MIROOOO-toothbrush-on-white-charging-dock.png',
    link: '/products/x1-charger',
    buttonText: 'Sold Out',
  },
];

export function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return UK_COLLECTION_PRODUCTS;
    return UK_COLLECTION_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const counts = useMemo(() => {
    return {
      all: UK_COLLECTION_PRODUCTS.length,
      toothbrushes: UK_COLLECTION_PRODUCTS.filter((p) => p.category === 'toothbrushes').length,
      heads: UK_COLLECTION_PRODUCTS.filter((p) => p.category === 'heads').length,
      accessories: UK_COLLECTION_PRODUCTS.filter((p) => p.category === 'accessories').length,
    };
  }, []);

  return (
    <main id="main" className="shop-collection-page">
      <style dangerouslySetInnerHTML={{ __html: `
        .shop-collection-page {
          background: #080909;
          color: #ffffff;
          min-height: 100vh;
        }

        .shop-hero-section {
          padding: clamp(80px, 12vw, 130px) 0 clamp(36px, 6vw, 54px);
          background: radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.08) 0%, rgba(8, 9, 9, 0) 70%), #080909;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .shop-hero-eyebrow-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .shop-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.28);
          color: #4ade80;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .shop-hero-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
        }

        .shop-hero-count {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .shop-hero-title {
          font-size: clamp(38px, 6.5vw, 76px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin: 0 0 16px 0;
          color: #ffffff;
        }

        .shop-hero-lead {
          font-size: clamp(16px, 1.8vw, 20px);
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.68);
          max-width: 680px;
          margin: 0 0 32px 0;
        }

        .shop-filters-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .shop-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 650;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.75);
        }

        .shop-filter-btn:hover {
          background: rgba(255, 255, 255, 0.09);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.24);
        }

        .shop-filter-btn.active {
          background: #ffffff;
          color: #080909;
          border-color: #ffffff;
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.15);
        }

        .shop-filter-count {
          font-size: 11.5px;
          opacity: 0.75;
          font-weight: 700;
        }

        .shop-grid-section {
          padding: 48px 0 clamp(64px, 10vw, 100px);
          background: #080909;
        }

        .shop-collection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        @media (min-width: 1024px) {
          .shop-collection-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
          }
        }

        @media (min-width: 1280px) {
          .shop-collection-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
        }

        .shop-product-card {
          background: #111213;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1), border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .shop-product-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
        }

        .shop-product-media {
          position: relative;
          aspect-ratio: 1 / 1;
          background: #161718;
          overflow: hidden;
          display: block;
        }

        .shop-product-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.3s ease;
        }

        .shop-product-card:hover .shop-product-media img {
          transform: scale(1.04);
        }

        .shop-product-media.sold-out img {
          filter: grayscale(0.25) opacity(0.85);
        }

        .shop-badge-floating {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .shop-badge-discount {
          background: rgba(34, 197, 94, 0.92);
          color: #041309;
          box-shadow: 0 2px 10px rgba(34, 197, 94, 0.35);
        }

        .shop-badge-soldout {
          background: rgba(239, 68, 68, 0.88);
          color: #ffffff;
          box-shadow: 0 2px 10px rgba(239, 68, 68, 0.3);
        }

        .shop-product-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
        }

        .shop-product-eyebrow {
          font-size: 11px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.48);
          margin: 0 0 6px 0;
        }

        .shop-product-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px 0;
          line-height: 1.25;
        }

        .shop-product-desc {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.62);
          line-height: 1.5;
          margin: 0 0 18px 0;
          flex-grow: 1;
        }

        .shop-product-bottom {
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .shop-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .shop-price-current {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
        }

        .shop-price-compare {
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: line-through;
          font-weight: 500;
        }

        .shop-price-save {
          font-size: 0.78rem;
          color: #4ade80;
          font-weight: 750;
          letter-spacing: 0.02em;
        }

        .shop-btn-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 11px 18px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 750;
          transition: all 0.2s ease;
          box-sizing: border-box;
          text-align: center;
        }

        .shop-btn-cta.active {
          background: #ffffff;
          color: #080909;
          border: 1px solid transparent;
        }

        .shop-btn-cta.active:hover {
          background: #e2e8f0;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(255, 255, 255, 0.2);
        }

        .shop-btn-cta.soldout {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Trust Strip */
        .shop-trust-strip {
          background: #0d0e0e;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 32px 0;
        }

        .shop-trust-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          align-items: center;
        }

        .shop-trust-card {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .shop-trust-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #4ade80;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .shop-trust-info strong {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
        }

        .shop-trust-info span {
          display: block;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.55);
          margin-top: 2px;
        }

        /* Quiz Banner */
        .shop-quiz-section {
          padding: 40px 0 60px;
          background: #080909;
        }

        .shop-quiz-wrapper {
          background: linear-gradient(135deg, rgba(20, 22, 22, 0.95) 0%, rgba(13, 14, 14, 0.98) 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          padding: 28px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 768px) {
          .shop-quiz-wrapper {
            padding: 24px;
            flex-direction: column;
            align-items: flex-start;
          }
          .shop-quiz-btn {
            width: 100%;
          }
        }
      ` }} />

      {/* 1. Collection Hero Section */}
      <header className="shop-hero-section">
        <div className="site-shell">
          <div className="shop-hero-eyebrow-wrap">
            <span className="shop-hero-pill">
              <span className="shop-hero-pill-dot"></span>
              Precision Oral Care
            </span>
            <span className="shop-hero-count">· {UK_COLLECTION_PRODUCTS.length} Products</span>
          </div>

          <h1 className="shop-hero-title">The Complete Collection</h1>
          <p className="shop-hero-lead">
            Engineered with aerospace materials, dynamic acoustic oscillation, and minimalist charging docks.
          </p>

          {/* Interactive Filter / Category Tabs */}
          <div className="shop-filters-row" role="tablist" aria-label="Product categories">
            <button
              role="tab"
              aria-selected={activeCategory === 'all'}
              className={`shop-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Products <span className="shop-filter-count">({counts.all})</span>
            </button>
            <button
              role="tab"
              aria-selected={activeCategory === 'toothbrushes'}
              className={`shop-filter-btn ${activeCategory === 'toothbrushes' ? 'active' : ''}`}
              onClick={() => setActiveCategory('toothbrushes')}
            >
              Toothbrushes <span className="shop-filter-count">({counts.toothbrushes})</span>
            </button>
            <button
              role="tab"
              aria-selected={activeCategory === 'heads'}
              className={`shop-filter-btn ${activeCategory === 'heads' ? 'active' : ''}`}
              onClick={() => setActiveCategory('heads')}
            >
              Brush Heads <span className="shop-filter-count">({counts.heads})</span>
            </button>
            <button
              role="tab"
              aria-selected={activeCategory === 'accessories'}
              className={`shop-filter-btn ${activeCategory === 'accessories' ? 'active' : ''}`}
              onClick={() => setActiveCategory('accessories')}
            >
              Accessories <span className="shop-filter-count">({counts.accessories})</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Unified All-Products Grid */}
      <section className="shop-grid-section" aria-label="Products Grid">
        <div className="site-shell">
          <div className="shop-collection-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="shop-product-card">
                <Link
                  href={product.link}
                  className={`shop-product-media ${product.isSoldOut ? 'sold-out' : ''}`}
                  data-product-link
                >
                  {product.badge && (
                    <span
                      className={`shop-badge-floating ${
                        product.isSoldOut ? 'shop-badge-soldout' : 'shop-badge-discount'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    width="600"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </Link>

                <div className="shop-product-body">
                  <div>
                    <p className="shop-product-eyebrow">{product.eyebrow}</p>
                    <h3 className="shop-product-title">
                      <Link href={product.link} style={{ color: 'inherit' }}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="shop-product-desc">{product.description}</p>
                  </div>

                  <div className="shop-product-bottom">
                    <div className="shop-price-row">
                      <span className="shop-price-current">{product.price}</span>
                      <span className="shop-price-compare">{product.compareAt}</span>
                      {!product.isSoldOut && (
                        <span className="shop-price-save">(50% OFF)</span>
                      )}
                    </div>

                    {product.isSoldOut ? (
                      <button disabled className="shop-btn-cta soldout" aria-disabled="true">
                        Sold Out
                      </button>
                    ) : (
                      <Link href={product.link} className="shop-btn-cta active" data-product-link>
                        <span>{product.buttonText}</span>
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Quiz Card Section */}
      <section className="shop-quiz-section">
        <div className="site-shell">
          <div className="shop-quiz-wrapper">
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  color: '#041309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="20" height="20">
                  <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#ffffff', lineHeight: 1.3 }}>
                  Unsure which brush fits your routine?
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.4 }}>
                  Answer 5 quick questions to match your dental care goals, sensitivity and habits.
                </p>
              </div>
            </div>
            <Link
              className="button button--primary shop-quiz-btn"
              href="/pages/dentalcare-quiz"
              style={{
                background: '#ffffff',
                color: '#080909',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 750,
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Take our 60-second Dental Care Quiz <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Trust Strip */}
      <section className="shop-trust-strip" aria-label="Brand Guarantees">
        <div className="site-shell">
          <div className="shop-trust-grid">
            <div className="shop-trust-card">
              <div className="shop-trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div className="shop-trust-info">
                <strong>Free UK Tracked Delivery</strong>
                <span>Royal Mail 24/48 with live tracking</span>
              </div>
            </div>

            <div className="shop-trust-card">
              <div className="shop-trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div className="shop-trust-info">
                <strong>2-Year Warranty</strong>
                <span>Direct UK replacement coverage</span>
              </div>
            </div>

            <div className="shop-trust-card">
              <div className="shop-trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="shop-trust-info">
                <strong>30-Day Risk-Free Trial</strong>
                <span>100% money-back satisfaction</span>
              </div>
            </div>

            <div className="shop-trust-card">
              <div className="shop-trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="shop-trust-info">
                <strong>Aerospace CNC Build</strong>
                <span>Anodized aluminium unibody</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Model Guide Section (Comparison Table) */}
      <section className="section" aria-labelledby="model-guide" style={{ background: '#080909', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="site-shell">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow eyebrow--light">Model Guide</p>
              <h2 id="model-guide" style={{ color: '#ffffff' }}>What changes between X1 and X2.</h2>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)' }}>The same calm design language, with different levels of guidance and battery life.</p>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .shop-comp-table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0;
              background: #111213;
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 20px;
              overflow: hidden;
            }
            .shop-comp-table th, .shop-comp-table td {
              padding: 18px 24px;
              text-align: left;
              border-bottom: 1px solid rgba(255, 255, 255, 0.06);
              font-size: 14.5px;
            }
            .shop-comp-table thead th {
              background: #161718;
              color: #ffffff;
              font-weight: 750;
              font-size: 15px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            }
            .shop-comp-table tbody tr:last-child th,
            .shop-comp-table tbody tr:last-child td {
              border-bottom: none;
            }
            .shop-comp-table tbody th {
              color: rgba(255, 255, 255, 0.7);
              font-weight: 600;
              width: 30%;
            }
            .shop-comp-table tbody td {
              color: rgba(255, 255, 255, 0.88);
            }
            .shop-comp-check {
              color: #4ade80;
              font-weight: 800;
              margin-right: 6px;
            }
            @media (max-width: 767px) {
              .shop-desktop-table {
                display: none !important;
              }
            }
            @media (min-width: 768px) {
              .x2-comp-mobile-dark {
                display: none !important;
              }
            }
          ` }} />

          {/* Desktop Table (>= 768px) */}
          <div className="shop-desktop-table reveal">
            <table className="shop-comp-table">
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
                  <td><span className="shop-comp-check">✓</span> 90+ Days</td>
                </tr>
                <tr>
                  <th>Motor Power (VPM)</th>
                  <td>32,000 VPM Sonic Motor</td>
                  <td><span className="shop-comp-check">✓</span> 40,000 VPM High-Torque Motor</td>
                </tr>
                <tr>
                  <th>Cleaning Motion</th>
                  <td>Standard Micro-Vibration (0°)</td>
                  <td><span className="shop-comp-check">✓</span> 45° Bass Sweep (Dentist Motion)</td>
                </tr>
                <tr>
                  <th>Cleaning Modes</th>
                  <td>Everyday Clean</td>
                  <td><span className="shop-comp-check">✓</span> 3 Modes (Clean, White, Deep)</td>
                </tr>
                <tr>
                  <th>Charging &amp; Travel</th>
                  <td>Bulky Charging Dock</td>
                  <td><span className="shop-comp-check">✓</span> Direct USB-C (No Bulky Dock)</td>
                </tr>
                <tr>
                  <th>Body Material</th>
                  <td>Aerospace Aluminium</td>
                  <td><span className="shop-comp-check">✓</span> Aerospace Aluminium</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td><span style={{ fontWeight: 800, color: '#ffffff' }}>£69</span></td>
                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{ color: '#4ade80', fontWeight: 800 }}>£69</span>
                      <s style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '13px' }}>£139</s>
                    </div>
                    <span style={{ display: 'block', fontSize: '11px', color: '#4ade80', fontWeight: 700, marginTop: '2px' }}>(50% OFF)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Comparison Layout (<768px) */}
          <div className="x2-comp-mobile-dark reveal">
            <div
              style={{
                background: '#111213',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <span style={{ display: 'inline-block', background: '#16a34a', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '4px' }}>★ Flagship</span>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#ffffff' }}>Miroooo X2</div>
                  <div style={{ fontSize: '12px', color: '#4ade80', fontWeight: 700 }}>£69 <s style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>£139</s></div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', borderLeft: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ display: 'inline-block', visibility: 'hidden', fontSize: '10px', padding: '2px 8px' }}>-</span>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#ffffff' }}>Miroooo X1</div>
                  <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: 700 }}>£69 <s style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>£139</s></div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Battery Life</span>
                  <span><strong style={{ color: '#4ade80' }}>90+ Days</strong> / 60 Days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Motor Power</span>
                  <span><strong style={{ color: '#4ade80' }}>40,000 VPM</strong> / 32,000 VPM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Cleaning Motion</span>
                  <span><strong style={{ color: '#4ade80' }}>45° Bass Sweep</strong> / Standard</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Charging</span>
                  <span><strong style={{ color: '#4ade80' }}>Direct USB-C</strong> / Base Dock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Essentials Section */}
      <section className="section" aria-labelledby="included-title" style={{ background: '#0d0e0e', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="site-shell">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow eyebrow--light">Ready for the Routine</p>
              <h2 id="included-title" style={{ color: '#ffffff' }}>The essentials come with you.</h2>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Each model includes its handle, brush head, charging cable and travel protection. Confirm the exact bundle on the product page before ordering.</p>
          </div>
          <div className="value-grid">
            <article className="value-card reveal" style={{ background: '#141516', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '28px' }}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#4ade80', width: '28px', height: '28px', marginBottom: '14px' }}>
                <path d="M7 3h10v18H7zM9 7h6M9 17h6" />
              </svg>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '8px' }}>Made to travel</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '14px', margin: 0 }}>A protective case keeps the brush together and ready for the next routine.</p>
            </article>
            <article className="value-card reveal" style={{ background: '#141516', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '28px' }}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#4ade80', width: '28px', height: '28px', marginBottom: '14px' }}>
                <path d="M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4" />
              </svg>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '8px' }}>USB-C charging</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '14px', margin: 0 }}>A universal cable format, with enough battery life to keep charging occasional.</p>
            </article>
            <article className="value-card reveal" style={{ background: '#141516', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '28px' }}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#4ade80', width: '28px', height: '28px', marginBottom: '14px' }}>
                <path d="M12 3 4.5 6v5.5c0 4.7 3.1 7.9 7.5 9.5 4.4-1.6 7.5-4.8 7.5-9.5V6L12 3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '8px' }}>Dedicated support</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '14px', margin: 0 }}>Our London customer team is here to assist with any product questions or easy returns.</p>
            </article>
          </div>
        </div>
      </section>

      {/* 7. CTA Panel */}
      <section className="section" style={{ background: '#080909', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="site-shell">
          <div
            className="cta-panel reveal"
            style={{
              background: '#111213',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: 'clamp(32px, 5vw, 48px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p className="eyebrow eyebrow--light" style={{ margin: '0 0 10px 0' }}>Still deciding?</p>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(28px, 4vw, 42px)', margin: '0 0 10px 0' }}>Start with the way you brush.</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '15px', margin: 0, maxWidth: '580px' }}>
                Choose Miroooo X1 for simplicity and a lighter body. Choose Miroooo X2 for more feedback and the longest battery life.
              </p>
            </div>
            <Link
              className="button button--primary"
              href="/pages/faqs"
              style={{
                background: '#ffffff',
                color: '#080909',
                padding: '13px 26px',
                borderRadius: '999px',
                fontWeight: 750,
              }}
            >
              <span className="btn-text">Read the FAQs →</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
