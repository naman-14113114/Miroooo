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

const US_COLLECTION_PRODUCTS: CollectionProduct[] = [
  {
    id: 'miroooo-x2',
    handle: 'miroooo-x2',
    name: 'Miroooo X2',
    category: 'toothbrushes',
    eyebrow: 'Flagship Pro',
    description: 'Dynamic 45° Bass-sweep oscillation, smart 360° red halo pressure ring guidance & 90-day battery life.',
    price: '$69',
    compareAt: '$139',
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
    price: '$69',
    compareAt: '$139',
    badge: '50% OFF',
    isSoldOut: false,
    image: '/assets_ref/x/gallery/miroooo-x1-sonic-electric-toothbrush-silver-retail-packaging.webp',
    link: '/products/miroooo-x',
    buttonText: 'Choose Miroooo X1',
  },
  {
    id: 'miroooo-water-flosser',
    handle: 'miroooo-water-flosser',
    name: 'Miroooo Water Flosser',
    category: 'accessories',
    eyebrow: 'New Release',
    description: 'Medical-grade piston pump, 60–138 PSI pressurized micro-jets, 320ml tank & 60-day battery.',
    price: '$69',
    compareAt: '$139',
    badge: '50% OFF',
    isSoldOut: false,
    image: '/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-duo.webp',
    link: '/products/miroooo-water-flosser',
    buttonText: 'Choose Miroooo Flosser',
  },
  {
    id: 'miroooo-x2-heads',
    handle: 'miroooo-x2-heads',
    name: 'Miroooo X2 Heads (2-Pack)',
    category: 'heads',
    eyebrow: 'Replacement',
    description: 'DuPont™ precision rounded bristles engineered for 45° Bass sweep oscillating drive coupling.',
    price: '$10',
    compareAt: '$20',
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
    price: '$10',
    compareAt: '$20',
    badge: '50% OFF',
    isSoldOut: false,
    image: '/assets_ref/x/gallery/miroooo-x1-replacement-brush-heads-beside-retail-carton.webp',
    link: '/products/miroooo-x1-heads',
    buttonText: 'View Item',
  },
  {
    id: 'miroooo-gift-card',
    handle: 'miroooo-gift-card',
    name: 'Miroooo Gift Card',
    category: 'accessories',
    eyebrow: 'Digital Voucher',
    description: 'Instant digital gift voucher delivered via email. Expires in 3 months and valid site-wide.',
    price: '$10',
    compareAt: '',
    badge: undefined,
    isSoldOut: false,
    image: '/assets_ref/gifts/miroooo-x2-silver-digital-gift-card.webp',
    link: '/products/miroooo-gift-card',
    buttonText: 'View Item',
  },
  {
    id: 'travel-case',
    handle: 'travel-case',
    name: 'Luxury Travel Case',
    category: 'accessories',
    eyebrow: 'Protection',
    description: 'Slim magnetic hardshell with precision micro-ventilation. Keeps your brush hygienic anywhere.',
    price: '$20',
    compareAt: '$40',
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
    price: '$9',
    compareAt: '$18',
    badge: 'SOLD OUT',
    isSoldOut: true,
    image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted.webp',
    link: '/products/wall-mounted-dock',
    buttonText: 'Sold Out',
  },
  {
    id: 'x1-charger',
    handle: 'x1-charger',
    name: 'Miroooo X1 Charging Dock',
    category: 'accessories',
    eyebrow: 'Charging',
    description: 'Rapid magnetic induction charging dock with durable high-speed braided USB power cable.',
    price: '$20',
    compareAt: '$40',
    badge: 'SOLD OUT',
    isSoldOut: true,
    image: '/assets_ref/x/gallery/miroooo-x1-charging-dock.webp',
    link: '/products/miroooo-x1-charging-dock',
    buttonText: 'Sold Out',
  },
];

export function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredProducts = useMemo(() => {
    const list =
      activeCategory === 'all'
        ? US_COLLECTION_PRODUCTS
        : US_COLLECTION_PRODUCTS.filter((p) => p.category === activeCategory);
    return [...list].sort((a, b) => (a.isSoldOut ? 1 : 0) - (b.isSoldOut ? 1 : 0));
  }, [activeCategory]);

  const counts = useMemo(() => {
    return {
      all: US_COLLECTION_PRODUCTS.length,
      toothbrushes: US_COLLECTION_PRODUCTS.filter((p) => p.category === 'toothbrushes').length,
      heads: US_COLLECTION_PRODUCTS.filter((p) => p.category === 'heads').length,
      accessories: US_COLLECTION_PRODUCTS.filter((p) => p.category === 'accessories').length,
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
          padding: clamp(24px, 4vw, 44px) 0 clamp(32px, 5vw, 48px);
          background: radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.08) 0%, rgba(8, 9, 9, 0) 70%), #080909;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .shop-hero-title {
          font-size: clamp(38px, 6.5vw, 76px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin: 0 auto 16px auto;
          color: #ffffff;
          text-align: center;
          width: 100%;
        }

        .shop-hero-lead {
          font-size: clamp(16px, 1.8vw, 20px);
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.68);
          max-width: 680px;
          margin: 0 auto 32px auto;
          text-align: center;
        }

        .shop-filters-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
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
          padding: 48px 0 clamp(20px, 3vw, 32px);
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


        /* Quiz Banner */
        .shop-quiz-section {
          padding: 8px 0 clamp(48px, 6vw, 64px);
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
        <div className="site-shell" style={{ textAlign: 'center' }}>
          <h1 className="shop-hero-title">The Complete Collection</h1>
          <p className="shop-hero-lead">
            Precision oral care engineered for considered daily routines — from high-frequency sonic toothbrushes and hydrodynamic water flossers to refined replacement heads and travel essentials.
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
                      {product.compareAt && (
                        <span className="shop-price-compare">{product.compareAt}</span>
                      )}
                      {!product.isSoldOut && product.compareAt && (
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
    </main>
  );
}
