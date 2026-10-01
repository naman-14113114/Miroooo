'use client';

import React, { useEffect, useRef } from 'react';

export function X2ModesSwipe() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.js-x2-mode-card');
    const container = wrapperRef.current;
    if (!cards.length || !container) return;

    let ticking = false;

    function updateCards() {
      cards.forEach((card, index) => {
        let minSubsequentTop = Infinity;
        for (let k = index + 1; k < cards.length; k++) {
          const rk = cards[k].getBoundingClientRect();
          if (rk.top < minSubsequentTop) {
            minSubsequentTop = rk.top;
          }
        }
        const currentRect = card.getBoundingClientRect();
        if (minSubsequentTop < currentRect.top) {
          const shift = minSubsequentTop - currentRect.top;
          card.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
        } else {
          card.style.transform = '';
        }
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateCards);
        ticking = true;
      }
    }

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              window.addEventListener('scroll', onScroll, { passive: true });
              window.addEventListener('resize', onScroll, { passive: true });
              updateCards();
            } else {
              window.removeEventListener('scroll', onScroll);
              window.removeEventListener('resize', onScroll);
            }
          });
        },
        { rootMargin: '200px 0px 200px 0px' }
      );
      observer.observe(container);
      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      updateCards();
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }
  }, []);

  return (
    <div id="shopify-section-template--miroooo-x2-modes-swipe" className="shopify-section x2-modes-swipe-section">
      <style>{`
    /* ══════════════════════════════════════════════
       X2 MODES STACKING SCROLL SECTION
       ══════════════════════════════════════════════ */
    #shopify-section-template--miroooo-x2-modes-swipe {
      display: block !important;
    }
    #shopify-section-template--miroooo-brush-functions {
      display: none !important;
    }
    .x2-modes-swipe-container {
      width: 100%;
      position: relative;
      box-sizing: border-box;
    }
    .x2-modes-swipe-wrapper {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: clamp(40px, 8vh, 80px);
      padding-bottom: clamp(40px, 8vh, 80px);
      box-sizing: border-box;
    }
    .x2-mode-card {
      position: sticky;
      top: clamp(70px, 10vh, 100px);
      margin-bottom: clamp(40px, 8vh, 80px);
      width: 100%;
      will-change: transform;
      transform-origin: center top;
      z-index: var(--card-index);
      box-sizing: border-box;
    }
    .x2-mode-card-clipper {
      border-radius: clamp(22px, 3vw, 32px);
      overflow: hidden;
      background: #000000 !important;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.08);
      position: relative;
      box-sizing: border-box;
    }
    .x2-mode-card-content {
      position: relative;
      background: #000000 !important;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      width: 100%;
      min-height: clamp(380px, 52vh, 540px);
      box-sizing: border-box;
    }

    /* Glowing ambient ellipses */
    .x2-mode-card-glow {
      position: absolute;
      width: clamp(240px, 35vw, 460px);
      height: clamp(240px, 35vw, 460px);
      background-color: var(--glow-color, #538bf6);
      filter: blur(clamp(90px, 14vw, 175px));
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.55;
      transform: translateZ(0);
    }
    .x2-mode-card-glow--top-right {
      top: -12%;
      right: -8%;
    }
    .x2-mode-card-glow--bottom-left {
      bottom: -15%;
      left: -10%;
      opacity: 0.35;
    }

    /* Inner text content */
    .x2-mode-card-inner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      row-gap: clamp(12px, 2vw, 24px);
      width: 100%;
      padding: clamp(28px, 4.5vw, 60px);
      position: relative;
      z-index: 2;
      box-sizing: border-box;
    }
    .x2-mode-brand-title {
      font-family: var(--font-body-family, var(--font-inter), sans-serif);
      font-size: clamp(1.2rem, 1.8vw, 1.85rem);
      font-weight: 400;
      color: #ffffff;
      letter-spacing: -0.01em;
      margin: 0;
      line-height: 1.1;
    }
    .x2-mode-main-title {
      font-family: 'Poppins', var(--font-heading-family, var(--font-inter), sans-serif);
      font-size: clamp(1.85rem, 3.8vw, 3.4rem);
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      margin: 0;
      line-height: 1.05;
    }
    .x2-mode-desc {
      margin-top: 4px;
    }
    .x2-mode-desc p {
      font-family: var(--font-body-family, var(--font-inter), sans-serif);
      font-size: clamp(1rem, 1.2vw, 1.18rem);
      color: rgba(255, 255, 255, 0.82);
      line-height: 1.65;
      max-width: 480px;
      margin: 0;
    }

    /* Media right / image */
    .x2-mode-card-media {
      position: relative;
      width: 100%;
      aspect-ratio: 1.15;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      overflow: hidden;
      box-sizing: border-box;
    }
    .x2-mode-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      transform: translateZ(0);
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .x2-mode-card:hover .x2-mode-img {
      transform: scale(1.025) translateZ(0);
    }

    /* Desktop layout */
    @media screen and (min-width: 768px) {
      #shopify-section-template--miroooo-x2-modes-swipe {
        background: #e6e6e6 !important;
      }
      .x2-mode-card-content {
        flex-direction: row;
        align-items: center;
        min-height: clamp(480px, 56vh, 540px);
        height: 520px;
      }
      .x2-mode-card-inner {
        width: 50%;
        padding: clamp(36px, 4.5vw, 64px);
        box-sizing: border-box;
      }
      .x2-mode-card-media {
        width: 50%;
        height: 100%;
        min-height: 100%;
        aspect-ratio: auto;
      }
    }
    @media screen and (min-width: 1200px) {
      .x2-mode-card-content {
        height: 540px;
      }
      .x2-mode-card-inner {
        padding: 48px 64px;
      }
    }
  `}</style>

      <div className="x2-modes-swipe-container" style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(3rem, 5vw, 5rem) clamp(16px, 4vw, 40px)', boxSizing: 'border-box' }}>
        <div ref={wrapperRef} className="x2-modes-swipe-wrapper js-x2-modes-wrapper" style={{ '--numcards': 3 } as React.CSSProperties}>
          
          {/* Card 1: WHITENING MODE */}
          <div className="x2-mode-card js-x2-mode-card x2-mode-card--1" data-index="1" style={{ '--card-index': 1, '--glow-color': '#538bf6' } as React.CSSProperties}>
            <div className="x2-mode-card-clipper">
              <div className="x2-mode-card-content">
                <div className="x2-mode-card-glow x2-mode-card-glow--top-right"></div>
                <div className="x2-mode-card-glow x2-mode-card-glow--bottom-left"></div>
                
                <div className="x2-mode-card-inner">
                  <h3 className="x2-mode-brand-title">Miroooo X2</h3>
                  <h2 className="x2-mode-main-title">WHITENING MODE</h2>
                  <div className="x2-mode-desc">
                    <p>High vibration frequency effectively removes stains from coffee, tea and tobacco</p>
                  </div>
                </div>
                
                <div className="x2-mode-card-media">
                  <picture>
                    <source srcSet="/assets_ref/x2/miroooo-x2-whitening-mode-blue.webp" type="image/webp" />
                    <img className="x2-mode-img" src="/assets_ref/x2/miroooo-x2-whitening-mode-blue.webp" alt="Miroooo X2 Whitening Mode High Frequency Sonic Blue LED" loading="lazy" decoding="async" />
                  </picture>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: STANDARD MODE */}
          <div className="x2-mode-card js-x2-mode-card x2-mode-card--2" data-index="2" style={{ '--card-index': 2, '--glow-color': '#e483ff' } as React.CSSProperties}>
            <div className="x2-mode-card-clipper">
              <div className="x2-mode-card-content">
                <div className="x2-mode-card-glow x2-mode-card-glow--top-right"></div>
                <div className="x2-mode-card-glow x2-mode-card-glow--bottom-left"></div>
                
                <div className="x2-mode-card-inner">
                  <h3 className="x2-mode-brand-title">Miroooo X2</h3>
                  <h2 className="x2-mode-main-title">STANDARD MODE</h2>
                  <div className="x2-mode-desc">
                    <p>General cleaning, suitable for gentle daily brushing and sensitive gums</p>
                  </div>
                </div>
                
                <div className="x2-mode-card-media">
                  <picture>
                    <source srcSet="/assets_ref/x2/miroooo-x2-standard-mode-purple.webp" type="image/webp" />
                    <img className="x2-mode-img" src="/assets_ref/x2/miroooo-x2-standard-mode-purple.webp" alt="Miroooo X2 Standard Mode Gentle Plaque Removal Purple LED" loading="lazy" decoding="async" />
                  </picture>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: DEEP CLEAN MODE */}
          <div className="x2-mode-card js-x2-mode-card x2-mode-card--3" data-index="3" style={{ '--card-index': 3, '--glow-color': '#7df793' } as React.CSSProperties}>
            <div className="x2-mode-card-clipper">
              <div className="x2-mode-card-content">
                <div className="x2-mode-card-glow x2-mode-card-glow--top-right"></div>
                <div className="x2-mode-card-glow x2-mode-card-glow--bottom-left"></div>
                
                <div className="x2-mode-card-inner">
                  <h3 className="x2-mode-brand-title">Miroooo X2</h3>
                  <h2 className="x2-mode-main-title">DEEP CLEAN MODE</h2>
                  <div className="x2-mode-desc">
                    <p>When you want an exceptionally thorough and effective clean</p>
                  </div>
                </div>
                
                <div className="x2-mode-card-media">
                  <picture>
                    <source srcSet="/assets_ref/x2/miroooo-x2-deepclean-mode-green.webp" type="image/webp" />
                    <img className="x2-mode-img" src="/assets_ref/x2/miroooo-x2-deepclean-mode-green.webp" alt="Miroooo X2 Deep Clean Intensive Ultrasonic Green LED" loading="lazy" decoding="async" />
                  </picture>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
