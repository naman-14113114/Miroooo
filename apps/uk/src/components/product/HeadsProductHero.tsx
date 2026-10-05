'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { ShippingMarquee } from './ShippingMarquee';
import { AnimatedIcon } from '@/components/ui/AnimatedIcon';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface HeadsProductHeroProps {
  product: Product;
}

export function HeadsProductHero({ product }: HeadsProductHeroProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const isX2 = product.handle === 'miroooo-x2-heads';
  const isHeads = product.handle === 'miroooo-x1-heads' || product.handle === 'miroooo-x2-heads';
  const isOutOfStock = product.handle === 'wall-mounted-dock' || product.handle === 'travel-case' || product.handle === 'x1-charger';

  const [quantity, setQuantity] = useState(1);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLightboxZoomed, setIsLightboxZoomed] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isShippingTooltipOpen, setIsShippingTooltipOpen] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<number | null>(0); // 0: Details, 1: Package contents, 2: Specs

  // Delivery timer countdown
  const [deliveryCountdown, setDeliveryCountdown] = useState('14:38');
  const [deliveryDateStr, setDeliveryDateStr] = useState('Friday 21 Aug');

  const heroCtaRef = useRef<HTMLButtonElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const images = (product.galleryImages && product.galleryImages.length > 0)
    ? product.galleryImages
    : isX2
    ? [
        { src: '/assets_ref/x2/heads/B1.webp', alt: 'Miroooo X2 Heads DuPont Pack' },
        { src: '/assets_ref/x2/heads/B2.webp', alt: 'Miroooo X2 Heads Precision Bristles' },
      ]
    : [
        { src: '/assets_ref/x/heads/B1.webp', alt: 'Miroooo X1 Heads DuPont Pack' },
      ];

  const basePrice = product.price || 10;
  const totalPrice = basePrice * quantity;

  // Match the reference delivery estimate and countdown.
  useEffect(() => {
    let deliverySeconds = 14 * 60 + 38;
    const updateTimers = () => {
      const now = new Date();
      setDeliveryCountdown(`${String(Math.floor(deliverySeconds / 60)).padStart(2, '0')}:${String(deliverySeconds % 60).padStart(2, '0')}`);
      deliverySeconds = deliverySeconds > 0 ? deliverySeconds - 1 : 15 * 60 + 59;

      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() + 5);
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
    if (isOutOfStock) return;
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOutOfStock]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('gallery-open');
    return () => {
      document.body.style.overflow = overflow;
      document.body.classList.remove('gallery-open');
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setIsLightboxZoomed(false);
        setIsShippingTooltipOpen(false);
      }
      if (isLightboxOpen && ['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        setIsLightboxZoomed(false);
        setActiveMediaIndex((index) => (index + 1) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  // Scroll thumbnails into view with active thumbnail centered
  useEffect(() => {
    if (navRef.current) {
      const container = navRef.current;
      const activeThumb = container.children[activeMediaIndex] as HTMLElement;
      if (activeThumb) {
        const containerRect = container.getBoundingClientRect();
        const thumbRect = activeThumb.getBoundingClientRect();

        const currentScrollTop = container.scrollTop;
        const thumbRelativeTop = thumbRect.top - containerRect.top + currentScrollTop;
        const targetScrollTop = thumbRelativeTop - (container.clientHeight - thumbRect.height) / 2;

        const currentScrollLeft = container.scrollLeft;
        const thumbRelativeLeft = thumbRect.left - containerRect.left + currentScrollLeft;
        const targetScrollLeft = thumbRelativeLeft - (container.clientWidth - thumbRect.width) / 2;

        container.scrollTo({
          top: Math.max(0, targetScrollTop),
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth',
        });
      }
    }
  }, [activeMediaIndex]);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      productHandle: product.handle,
      color: 'Default',
      quantity,
    });
    router.push('/cart');
  };

  const scrollThumbnails = (dir: 'up' | 'down') => {
    if (navRef.current) {
      const offset = dir === 'up' ? -100 : 100;
      navRef.current.scrollBy({ top: offset, left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div id="shopify-section-template--24203751129433__main-product" className="shopify-section" style={{ paddingTop: 16, marginTop: 0, paddingBottom: 0, marginBottom: 0 }}>
      <div className="section section--padding section--rounded relative">
        <div className="page-width relative">
          <div className="featured-product product product--columns flex flex-col items-start lg:grid gap-5 w-full relative">
            {/* Gallery */}
            <div className="product__gallery product__gallery--full_width block w-full relative">
              <div className="miroooo-minmun-gallery" id="MirooooMainGallery">
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="miroooo-gallery__nav-wrap" aria-label="Product image thumbnails">
                    <button
                      type="button"
                      className="miroooo-gallery__nav-arrow miroooo-gallery__nav-arrow--prev hidden lg:flex"
                      onClick={() => scrollThumbnails('up')}
                      aria-label="Scroll thumbnails up"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>

                    <div className="miroooo-gallery__nav" id="MirooooGalleryNav" ref={navRef}>
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`miroooo-gallery__thumb ${activeMediaIndex === idx ? 'is-active' : ''}`}
                          onClick={() => setActiveMediaIndex(idx)}
                          aria-label={img.alt}
                          aria-current={activeMediaIndex === idx ? 'true' : 'false'}
                        >
                          <div className="thumb-inner">
                            <img src={img.src} alt={img.alt} loading="eager" decoding="async" />
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="miroooo-gallery__nav-arrow miroooo-gallery__nav-arrow--next hidden lg:flex"
                      onClick={() => scrollThumbnails('down')}
                      aria-label="Scroll thumbnails down"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                )}

                {/* Stage */}
                <div className="miroooo-gallery__stage-wrap">
                  <div className="miroooo-gallery__stage" id="MirooooGalleryStage" aria-label="Main product image gallery">
                    {images.length > 1 && (
                      <button
                        type="button"
                        className="miroooo-gallery__arrow miroooo-gallery__arrow--prev"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMediaIndex((prev) => (prev - 1 + images.length) % images.length);
                        }}
                        aria-label="Previous image"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                    )}

                    <div
                      className="miroooo-gallery__slide gallery-zoom-cursor is-active"
                      onClick={() => setIsLightboxOpen(true)}
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

                    {images.length > 1 && (
                      <button
                        type="button"
                        className="miroooo-gallery__arrow miroooo-gallery__arrow--next"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMediaIndex((prev) => (prev + 1) % images.length);
                        }}
                        aria-label="Next image"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Info / Buy Box */}
            <div className="product__info block sticky w-full">
              <div className="product__title">
                <h1
                  className="heading leading-none product-title-sm font-bold"
                  style={{ fontSize: '40px', fontWeight: 700, lineHeight: 1.08, color: '#ffffff', margin: '4px 0 2px 0', letterSpacing: '-0.03em' }}
                >
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div className="product__price grid gap-2 mt-2" style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span className="text-3xl font-extrabold text-white" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
                  {isOutOfStock ? `£${product.price}` : `£${Number(totalPrice.toFixed(2))}`}
                </span>
                {product.compareAt && (
                  <s style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '1.15rem', textDecoration: 'line-through' }}>
                    £{product.compareAt}
                  </s>
                )}
              </div>

              {/* Features List */}
              <div className="product__features-list my-4" style={{ margin: '16px 0' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255, 255, 255, 0.9)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                  {(product.highlights && product.highlights.length > 0 ? product.highlights : [
                    'DuPont precision rounded nylon bristles for gentle enamel protection.',
                    `Engineered exclusively for ${isX2 ? 'Miroooo X2 45° Bass sweep sonic motor' : 'Miroooo X1 32,000 VPM acoustic sonic motor'}.`,
                    '3-Month optimal hygiene and plaque-removal replacement cycle.',
                    'Anti-bacterial, fast-drying bristle design.',
                  ]).map((highlight, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', flexShrink: 0, background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector (In Stock only) */}
              {!isOutOfStock && (
                <div className="heads-quantity-selector my-4" style={{ margin: '20px 0 16px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>QUANTITY:</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px' }}>£{basePrice} per 2-head pack</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#111111', border: '1px solid rgba(255, 255, 255, 0.18)', borderRadius: '9999px', padding: '4px 8px', height: '50px', boxSizing: 'border-box' }}>
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: quantity <= 1 ? 'not-allowed' : 'pointer', fontSize: '18px', fontWeight: 700, opacity: quantity <= 1 ? 0.3 : 1, transition: 'all 0.2s ease' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', fontFamily: 'ui-monospace, SFMono-Regular, monospace', minWidth: '40px', textAlign: 'center' }}>
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', fontWeight: 700, transition: 'all 0.2s ease' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                  </div>
                </div>
              )}

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
                    aria-label="Shipping estimate details"
                  >
                    <span>?</span>
                  </button>
                  {isShippingTooltipOpen ? (
                    <div
                      className="shipping-info-tooltip"
                      style={{ display: 'block', position: 'absolute', right: 0, top: 'calc(100% + 8px)', zIndex: 50, width: '270px', background: '#18191a', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '12px 14px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)', textAlign: 'left', color: 'rgba(255, 255, 255, 0.85)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 700, fontSize: '12px', color: '#ffffff' }}>Delivery Estimate</span>
                        <button
                          type="button"
                          style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px', cursor: 'pointer', float: 'right' }}
                          onClick={() => setIsShippingTooltipOpen(false)}
                        >
                          &times;
                        </button>
                      </div>
                      <p style={{ fontSize: '11.5px', lineHeight: 1.5, margin: 0, color: 'rgba(255, 255, 255, 0.8)' }}>
                        This is the estimated delivery timeframe based on 1–3 business days processing and 7–20 business days standard transit. For more information, please visit our <Link href="/policies/shipping-policy" style={{ color: '#ffffff', textDecoration: 'underline' }}>shipping policy</Link> page.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Main CTA */}
              <div className="main-cta-wrapper my-4" style={{ margin: '18px 0 14px 0' }}>
                {isOutOfStock ? (
                  <button
                    ref={heroCtaRef}
                    type="button"
                    id="hero-cta"
                    disabled
                    className="button button--primary"
                    style={{
                      width: '100%',
                      fontSize: '1.05rem',
                      opacity: 0.5,
                      cursor: 'not-allowed',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderColor: 'rgba(255, 255, 255, 0.15)',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    <span className="btn-text">Sold out</span>
                  </button>
                ) : (
                  <button
                    ref={heroCtaRef}
                    type="button"
                    id="hero-cta"
                    className="button button--primary"
                    style={{ width: '100%', fontSize: '1.05rem' }}
                    onClick={handleAddToCart}
                  >
                    <span className="btn-fill" data-fill></span>
                    <span className="btn-text">Add to cart</span>
                  </button>
                )}
              </div>

              {/* Trust Badges */}
              <div
                className="grid grid-cols-3 gap-2 py-3 px-1 mb-6 text-center"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', padding: '12px 0 16px', marginBottom: '20px' }}
              >
                <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span className="text-[11px] font-bold uppercase tracking-tight leading-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>100% Miroooo<br/>Compatibility</span>
                </div>
                <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>
                  <span className="text-[11px] font-bold uppercase tracking-tight leading-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Premium<br/>Materials</span>
                </div>
                <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  <span className="text-[11px] font-bold uppercase tracking-tight leading-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Free Tracked<br/>Shipping</span>
                </div>
              </div>

              {/* Accordions */}
              <div className="product__accordions" style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: '14px' }}>
                <div className="product__accordion details" style={{ borderTop: '1px solid rgba(255,255,255,0.12)', padding: '12px 0' }}>
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === 0 ? null : 0)}
                    className="details__summary flex items-center justify-between gap-2 cursor-pointer w-full text-left"
                    style={{ background: 'none', border: 'none', padding: 0, color: '#ffffff', outline: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <div className="flex items-center gap-2.5" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <svg className="icon icon-sparkles icon-md" viewBox="0 0 20 20" stroke="#ffffff" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }}>
                        <path d="M10 2L11.8 7.2L17 9L11.8 10.8L10 16L8.2 10.8L3 9L8.2 7.2L10 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm font-semibold leading-none" style={{ color: '#ffffff', fontSize: '14px' }}>
                        {isHeads ? `Why ${isX2 ? 'Miroooo X2' : 'Miroooo X1'} Heads?` : 'Product details'}
                      </span>
                    </div>
                    <svg className="icon icon-chevron icon-xs flex-auto" viewBox="0 0 24 24" stroke="#ffffff" fill="none" strokeWidth="2" style={{ width: '16px', height: '16px', transform: openAccordion === 0 ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  {openAccordion === 0 && (
                    <div className="details__content rte text-sm" style={{ marginTop: '12px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, fontSize: '13.5px' }}>
                      {isHeads ? (
                        <>
                          <p><strong>Micro-Diamond Rounded DuPont Bristles:</strong> Every bristle filament undergoes advanced micro-diamond tip polishing, eliminating sharp abrasive edges to safeguard gums while maximizing interdental plaque removal.</p>
                          <p style={{ marginTop: '8px' }}><strong>{isX2 ? 'Seamless 45° Bass Sweep Coupling:' : 'Seamless 32,000 VPM Acoustic Motor Coupling:'}</strong> Custom-engineered mount securely locks with the high-frequency {isX2 ? 'Miroooo X2 acoustic magnetic motor' : 'Miroooo X1 acoustic sonic motor'} for zero energy loss.</p>
                          <p style={{ marginTop: '8px' }}><strong>Optimal 3-Month Replacement:</strong> Dentists recommend replacing toothbrush heads every 90 days to maintain peak hygiene and optimal plaque-sweeping performance.</p>
                        </>
                      ) : (
                        <p>{product.description}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="product__accordion details" style={{ borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.12)', padding: '12px 0' }}>
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
                    className="details__summary flex items-center justify-between gap-2 cursor-pointer w-full text-left"
                    style={{ background: 'none', border: 'none', padding: 0, color: '#ffffff', outline: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <div className="flex items-center gap-2.5" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <svg className="icon icon-box icon-md" viewBox="0 0 20 20" stroke="#ffffff" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }}>
                        <path d="M6.24986 7.91666L13.7499 3.33333M9.99996 10.4167L17.5 5.83333M9.99996 10.4167L2.49996 5.83333M9.99996 10.4167V18.75M1.66663 8.55104V11.4489C1.66663 12.44 1.66663 12.9355 1.80881 13.3807C1.93464 13.7747 2.14059 14.1385 2.41371 14.4491C2.72235 14.8001 3.14725 15.055 3.99705 15.5649L7.53038 17.6849C8.42828 18.2237 8.87723 18.493 9.35649 18.5983C9.78042 18.6914 10.2195 18.6914 10.6434 18.5983C11.1227 18.493 11.5716 18.2237 12.4695 17.6849L16.0029 15.5649C16.8527 15.055 17.2776 14.8001 17.5862 14.4491C17.8593 14.1385 18.0653 13.7747 18.1911 13.3807C18.3333 12.9355 18.3333 12.44 18.3333 11.4489V8.55104C18.3333 7.56002 18.3333 7.0645 18.1911 6.61926C18.0653 6.22525 17.8593 5.86151 17.5862 5.5509C17.2776 5.19989 16.8527 4.94495 16.0029 4.43508L12.4695 2.31508C11.5716 1.77634 11.1227 1.50697 10.6434 1.40172C10.2195 1.30863 9.78042 1.30863 9.35649 1.40172C8.87723 1.50697 8.42828 1.77634 7.53038 2.31508L3.99705 4.43508C3.14725 4.94495 2.72235 5.19989 2.41371 5.5509C2.14059 5.86151 1.93464 6.22525 1.80881 6.61926C1.66663 7.0645 1.66663 7.56002 1.66663 8.55104Z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm font-semibold leading-none" style={{ color: '#ffffff', fontSize: '14px' }}>Package contents</span>
                    </div>
                    <svg className="icon icon-chevron icon-xs flex-auto" viewBox="0 0 24 24" stroke="#ffffff" fill="none" strokeWidth="2" style={{ width: '16px', height: '16px', transform: openAccordion === 1 ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  {openAccordion === 1 && (
                    <div className="details__content rte text-sm" style={{ marginTop: '12px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, fontSize: '13.5px' }}>
                      <ul style={{ paddingLeft: '18px', margin: 0 }}>
                        {product.boxContents && product.boxContents.length > 0 ? (
                          product.boxContents.map((item, i) => <li key={i}>{item}</li>)
                        ) : isHeads ? (
                          <>
                            <li>2x {isX2 ? 'Miroooo X2' : 'Miroooo X1'} DuPont Replacement Brush Heads</li>
                            <li>Individually Sealed Hygienic Protective Travel Caps</li>
                          </>
                        ) : (
                          <li>1x {product.name}</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bar (In stock only) */}
          {!isOutOfStock && (
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
                    <AnimatedIcon kind="cart" className="miroooo-lottie-cart" />
                    <span id="sticky-bar-cta-text">Add to cart</span>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ShippingMarquee />

      {/* Exquisite Texture Split Section (Only on Heads pages) */}
      {isHeads && (
        <div id={isX2 ? 'x2-section-texture-split' : 'x1-section-texture-split'} className="shopify-section" style={{ background: '#000000', color: '#ffffff', width: '100%', padding: 'clamp(3.5rem, 6vw, 6rem) 0', boxSizing: 'border-box', borderTop: '1px solid rgba(255,255,200,0.06)' }}>
          <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', boxSizing: 'border-box' }}>
            <div className="split-section-grid" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2rem, 4vw, 4.5rem)' }}>
              <div style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
                <div style={{ position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
                  <img src={isX2 ? '/assets_ref/x2/miroooo-x2-sonic-electric-toothbrush-precision-bristle-head.webp' : '/assets_ref/x/heads/B1.webp'} alt={`Miroooo ${isX2 ? 'X2' : 'X1'} Precision DuPont Replacement Bristle Head`} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} loading="lazy" decoding="async" />
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
                      <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block' }}>{isX2 ? 'Gum Soothing Protection' : '32,000 VPM Acoustic Coupling'}</strong>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.5 }}>{isX2 ? 'Anatomically contoured bristle layout hugs tooth surfaces for a soothing, non-abrasive gumline massage.' : 'Custom-engineered precision shaft coupling transfers high-frequency sonic acoustic vibrations directly to bristle tips.'}</span>
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
                      <strong style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', display: 'block' }}>{isX2 ? 'Softer than Soft' : 'Gentle Gumline Protection'}</strong>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.5 }}>{isX2 ? 'Dense, velvety bristle clustering delivers an unmatched, luxurious spa-grade brushing experience.' : 'Anatomically contoured bristle layout hugs tooth surfaces for a soothing, non-abrasive gumline massage.'}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="miroooo-gallery-lightbox is-open"
          role="dialog"
          aria-modal="true"
          style={{ display: 'flex' }}
        >
          <div
            className="miroooo-gallery-lightbox__backdrop"
            onClick={() => {
              setIsLightboxOpen(false);
              setIsLightboxZoomed(false);
            }}
          ></div>
          <button
            type="button"
            className="miroooo-gallery-lightbox__close"
            onClick={() => {
              setIsLightboxOpen(false);
              setIsLightboxZoomed(false);
            }}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className="miroooo-gallery-lightbox__arrow miroooo-gallery-lightbox__prev"
              onClick={() => setActiveMediaIndex((prev) => (prev - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}

          <div
            className="miroooo-gallery-lightbox__stage"
            onClick={() => setIsLightboxZoomed((prev) => !prev)}
            style={{ cursor: isLightboxZoomed ? 'zoom-out' : 'url("/cursor-zoom-in.svg") 20 20, zoom-in' }}
          >
            <img
              src={images[activeMediaIndex].src}
              alt={images[activeMediaIndex].alt}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '12px',
                transform: isLightboxZoomed ? 'scale(1.75)' : 'scale(1)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className="miroooo-gallery-lightbox__arrow miroooo-gallery-lightbox__next"
              onClick={() => setActiveMediaIndex((prev) => (prev + 1) % images.length)}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}

          <div className="miroooo-gallery-lightbox__counter" aria-live="polite">
            <span>{activeMediaIndex + 1}</span> / <span>{images.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}

