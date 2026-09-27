'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface HeadsProductHeroProps {
  product: Product;
}

export function HeadsProductHero({ product }: HeadsProductHeroProps) {
  const { addItem } = useCart();
  const isX2 = product.handle === 'miroooo-x2-heads';

  const [quantity, setQuantity] = useState(1);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isShippingTooltipOpen, setIsShippingTooltipOpen] = useState(false);

  // Delivery timer countdown
  const [deliveryCountdown, setDeliveryCountdown] = useState('14:38');
  const [deliveryDateStr, setDeliveryDateStr] = useState('Friday 21 Aug');

  const heroCtaRef = useRef<HTMLButtonElement | null>(null);

  const images = isX2
    ? [
        { src: '/assets_ref/x2/heads/B1.webp', alt: 'Miroooo X2 Heads DuPont Pack' },
        { src: '/assets_ref/x2/heads/B2.webp', alt: 'Miroooo X2 Heads Precision Bristles' },
      ]
    : [
        { src: '/assets_ref/x/heads/B1.webp', alt: 'Miroooo X1 Heads DuPont Pack' },
        { src: '/assets_ref/x/heads/B2.webp', alt: 'Miroooo X1 Heads Precision Bristles' },
      ];

  const basePrice = 10;
  const totalPrice = basePrice * quantity;

  // Timers
  useEffect(() => {
    const updateTimers = () => {
      const now = new Date();
      const cutoff = new Date(now);
      cutoff.setHours(15, 0, 0, 0);
      if (now > cutoff) {
        cutoff.setDate(cutoff.getDate() + 1);
      }
      const cutoffDiff = cutoff.getTime() - now.getTime();
      const dHours = Math.floor((cutoffDiff / (1000 * 60 * 60)) % 24);
      const dMinutes = Math.floor((cutoffDiff / (1000 * 60)) % 60);
      setDeliveryCountdown(`${String(dHours).padStart(2, '0')}:${String(dMinutes).padStart(2, '0')}`);

      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() + 4);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      setDeliveryDateStr(`${days[targetDate.getDay()]} ${targetDate.getDate()} ${months[targetDate.getMonth()]}`);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sticky Bar Scroll Observer
  useEffect(() => {
    const handleScroll = () => {
      if (!heroCtaRef.current) return;
      const rect = heroCtaRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        setIsStickyVisible(true);
      } else {
        setIsStickyVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    addItem({
      productHandle: product.handle,
      color: 'Default',
      quantity,
    });
  };

  return (
    <div id="shopify-section-template--heads-main-product" className="shopify-section">
      <div className="section section--padding section--rounded relative">
        <div className="page-width relative">
          <div className="featured-product product product--columns flex flex-col items-start lg:grid gap-5 w-full relative">
            {/* Gallery */}
            <div className="product__gallery product__gallery--full_width block w-full relative">
              <div className="miroooo-minmun-gallery" id="MirooooMainGallery">
                {/* Thumbnails */}
                <div className="miroooo-gallery__nav-wrap" aria-label="Product image thumbnails">
                  <div className="miroooo-gallery__nav" id="MirooooGalleryNav">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`miroooo-gallery__thumb ${activeMediaIndex === idx ? 'is-active' : ''}`}
                        onClick={() => setActiveMediaIndex(idx)}
                        aria-label={img.alt}
                      >
                        <div className="thumb-inner">
                          <img src={img.src} alt={img.alt} loading="eager" decoding="async" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stage */}
                <div className="miroooo-gallery__stage-wrap">
                  <div className="miroooo-gallery__stage" id="MirooooGalleryStage">
                    <button
                      type="button"
                      className="miroooo-gallery__arrow miroooo-gallery__arrow--prev"
                      onClick={() => setActiveMediaIndex((prev) => (prev - 1 + images.length) % images.length)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>

                    <div
                      className="miroooo-gallery__slide is-active"
                      onClick={() => setIsLightboxOpen(true)}
                      style={{ cursor: 'zoom-in' }}
                    >
                      <img
                        src={images[activeMediaIndex].src}
                        alt={images[activeMediaIndex].alt}
                        width="1000"
                        height="1000"
                        fetchPriority="high"
                        decoding="async"
                      />
                    </div>

                    <button
                      type="button"
                      className="miroooo-gallery__arrow miroooo-gallery__arrow--next"
                      onClick={() => setActiveMediaIndex((prev) => (prev + 1) % images.length)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info / Buy Box */}
            <div className="product__info block sticky w-full">
              <div className="product__title">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <img key={i} src="/assets/star.png" alt="★" width="16" height="15" style={{ width: '16px', height: '15px' }} />
                    ))}
                  </div>
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    4.9 · TRUSTED BY 40,000+ CUSTOMERS
                  </span>
                </div>
                <h1
                  className="heading leading-none product-title-sm font-bold"
                  style={{ fontSize: '38px', fontWeight: 700, lineHeight: 1.1, color: '#ffffff', margin: '4px 0 2px 0' }}
                >
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div className="product__price grid gap-2 mt-2" style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span className="text-3xl font-extrabold text-white" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
                  £{totalPrice.toFixed(2)}
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px', fontWeight: 500 }}>
                  (£{basePrice.toFixed(2)} per 2-head pack)
                </span>
              </div>

              {/* Bullets */}
              <div className="product__features-list my-4" style={{ margin: '16px 0' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255, 255, 255, 0.9)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', flexShrink: 0, background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                      ✓
                    </span>
                    <span><strong>DuPont™ End-Rounded Filaments</strong> for gentle enamel care.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', flexShrink: 0, background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                      ✓
                    </span>
                    <span><strong>Precision 2-Pack Replacement</strong> tailored for {isX2 ? 'Miroooo X2' : 'Miroooo X1'}.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', flexShrink: 0, background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                      ✓
                    </span>
                    <span><strong>Dentist Recommended:</strong> Replace brush head every 3 months.</span>
                  </li>
                </ul>
              </div>

              {/* Quantity Selector */}
              <div style={{ margin: '20px 0 16px 0', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', fontWeight: 600 }}>Quantity:</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.05)', padding: '2px' }}>
                  <button
                    type="button"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'transparent', color: '#ffffff', fontSize: '18px', fontWeight: 700, border: 'none', cursor: quantity <= 1 ? 'not-allowed' : 'pointer', opacity: quantity <= 1 ? 0.3 : 1 }}
                  >
                    -
                  </button>
                  <span style={{ width: '36px', textAlign: 'center', color: '#ffffff', fontWeight: 700, fontSize: '15px' }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'transparent', color: '#ffffff', fontSize: '18px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Delivery Timer */}
              <div
                className="delivery-timer-box rounded-xl p-3.5 my-4 flex items-center gap-3 text-sm"
                style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.85)', margin: '16px 0', position: 'relative' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', width: '32px', height: '32px', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="flex-1 text-xs sm:text-sm leading-snug" style={{ fontSize: '13px', lineHeight: 1.4 }}>
                  Order within <strong className="font-mono font-bold" style={{ color: '#ffffff', fontWeight: 700 }}>{deliveryCountdown}</strong> to receive it by <strong className="font-bold" style={{ color: '#ffffff', fontWeight: 700 }}>{deliveryDateStr}</strong>
                </div>
                <div className="shipping-info-wrapper" style={{ position: 'relative', flexShrink: 0 }}>
                  <button
                    type="button"
                    className="shipping-info-btn"
                    onClick={() => setIsShippingTooltipOpen((prev) => !prev)}
                    style={{ width: '18px', height: '18px', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    ?
                  </button>
                  {isShippingTooltipOpen && (
                    <div
                      className="shipping-info-tooltip"
                      style={{ display: 'block', position: 'absolute', right: 0, top: 'calc(100% + 8px)', zIndex: 50, width: '270px', background: '#18191a', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '12px 14px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)', textAlign: 'left', color: 'rgba(255, 255, 255, 0.85)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 700, fontSize: '12px', color: '#ffffff' }}>Delivery Estimate</span>
                        <button
                          type="button"
                          style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px', cursor: 'pointer' }}
                          onClick={() => setIsShippingTooltipOpen(false)}
                        >
                          ✕
                        </button>
                      </div>
                      <p style={{ fontSize: '11.5px', lineHeight: 1.5, margin: 0, color: 'rgba(255, 255, 255, 0.8)' }}>
                        This is the estimated delivery timeframe based on 1–3 business days processing and 7–20 business days standard transit. For more information, please visit our <a href="/policies/shipping-policy" style={{ color: '#ffffff', textDecoration: 'underline' }}>shipping policy</a> page.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Main CTA */}
              <div className="main-cta-wrapper my-4" style={{ margin: '18px 0 14px 0' }}>
                <button
                  ref={heroCtaRef}
                  type="button"
                  id="hero-cta"
                  className="button button--primary"
                  style={{ width: '100%', fontSize: '1.05rem' }}
                  onClick={handleAddToCart}
                >
                  <span className="btn-fill" data-fill></span>
                  <span className="btn-text">Add to Cart</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div
                className="grid grid-cols-3 gap-2 py-3 px-1 mb-6 text-center"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', padding: '12px 0 16px' }}
              >
                <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                  <span className="text-[11px] font-bold uppercase tracking-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>DuPont™<br />Bristles</span>
                </div>
                <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  <span className="text-[11px] font-bold uppercase tracking-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Enamel<br />Safe</span>
                </div>
                <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7"><rect x="1" y="3" width="15" height="13" rx="1" /><polygon points="16 8 20 8 23 11 23 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                  <span className="text-[11px] font-bold uppercase tracking-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Tracked<br />UK Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bar */}
          <div className={`miroooo-sticky-cart-wrap ${isStickyVisible ? 'is-visible' : ''}`} id="miroooo-sticky-cart" aria-hidden={!isStickyVisible}>
            <div className="miroooo-sticky-pill">
              <div className="miroooo-sticky-left">
                <div className="miroooo-sticky-img-wrap">
                  <img id="sticky-bar-img" src={images[0].src} alt={product.name} width="54" height="54" loading="eager" decoding="async" />
                </div>
                <div className="miroooo-sticky-info">
                  <p className="miroooo-sticky-title" id="sticky-bar-title">{product.name} ({quantity}x)</p>
                  <p className="miroooo-sticky-sub" id="sticky-bar-subtitle">
                    <span id="sticky-bar-price" style={{ fontWeight: 700, color: '#ffffff' }}>£{totalPrice.toFixed(2)}</span>
                    <span className="miroooo-sticky-bullet">·</span>
                    <span id="sticky-bar-gifts" className="miroooo-sticky-gifts-tag" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>2-Pack Replacement</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="sticky-bar-cta-btn"
                className="button button--primary miroooo-sticky-btn"
                aria-label="Add to cart"
                onClick={handleAddToCart}
              >
                <span className="btn-fill" data-fill></span>
                <span className="btn-text">
                  <span className="miroooo-lottie-cart" data-lottie-cart aria-hidden="true">
                    <svg className="icon-cart-bag miroooo-sticky-bag-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                  </span>
                  <span id="sticky-bar-cta-text">Add to cart</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exquisite Texture Split Section */}
      <div id="x2-section-texture-split" className="shopify-section" style={{ background: '#000000', color: '#ffffff', width: '100%', padding: 'clamp(3.5rem, 6vw, 6rem) 0', boxSizing: 'border-box', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', boxSizing: 'border-box' }}>
          <div className="split-section-grid" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2rem, 4vw, 4.5rem)' }}>
            <div style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
              <div style={{ position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
                <img src="/assets_ref/x2/miroooo-x2-sonic-electric-toothbrush-precision-bristle-head.webp" alt="Miroooo Precision DuPont Replacement Bristle Head" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} loading="lazy" decoding="async" />
              </div>
            </div>

            <div style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
              <h2 style={{ fontFamily: 'var(--font-didot, Georgia, serif)', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, margin: '0 0 0.5rem 0', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                EXQUISITE TEXTURE
              </h2>
              <h3 style={{ fontFamily: 'var(--font-inter, sans-serif)', fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: '0 0 2rem 0' }}>
                The feel is even more premium
              </h3>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffffff', marginTop: '6px', flexShrink: 0 }}></div>
                  <div>
                    <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block' }}>90%+ Rounding Rate</strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.5 }}>Every single bristle tip undergoes micro-diamond polishing to eliminate harsh edges and protect delicate enamel.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffffff', marginTop: '6px', flexShrink: 0 }}></div>
                  <div>
                    <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block' }}>Gum Soothing Protection</strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.5 }}>Anatomically contoured bristle layout hugs tooth surfaces for a soothing, non-abrasive gumline massage.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffffff', marginTop: '6px', flexShrink: 0 }}></div>
                  <div>
                    <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block' }}>0.12mm Wire Diameter</strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.5 }}>Ultra-fine flexible filaments effortlessly reach narrow interdental gaps to remove deep trapped plaque.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffffff', marginTop: '6px', flexShrink: 0 }}></div>
                  <div>
                    <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block' }}>Softer than Soft</strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.5 }}>Dense, velvety bristle clustering delivers an unmatched, luxurious spa-grade brushing experience.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="miroooo-gallery-lightbox is-active"
          role="dialog"
          aria-modal="true"
          style={{ display: 'flex' }}
        >
          <div className="miroooo-gallery-lightbox__backdrop" onClick={() => setIsLightboxOpen(false)}></div>
          <button
            type="button"
            className="miroooo-gallery-lightbox__close"
            onClick={() => setIsLightboxOpen(false)}
          >
            ✕
          </button>
          <div className="miroooo-gallery-lightbox__stage">
            <img src={images[activeMediaIndex].src} alt={images[activeMediaIndex].alt} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </div>
  );
}
