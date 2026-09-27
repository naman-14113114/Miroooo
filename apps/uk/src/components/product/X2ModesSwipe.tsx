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
        .x2-modes-swipe-section {
          background-color: #000000;
          color: #ffffff;
          width: 100%;
          overflow: visible;
          position: relative;
          box-sizing: border-box;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .x2-modes-swipe-wrapper {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 4vw, 40px);
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
        .x2-mode-card {
          position: sticky;
          top: clamp(80px, 12vh, 120px);
          width: 100%;
          box-sizing: border-box;
          border-radius: clamp(20px, 3vw, 32px);
          transition: transform 0.1s ease-out;
          will-change: transform;
        }
        .x2-mode-card-clipper {
          position: relative;
          width: 100%;
          border-radius: inherit;
          overflow: hidden;
          background: #0d0d0d;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px -10px var(--glow-color, rgba(255, 255, 255, 0.2));
        }
        .x2-mode-card-content {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: auto;
          position: relative;
          z-index: 1;
        }
        .x2-mode-card-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.22;
          pointer-events: none;
          z-index: 0;
          background: var(--glow-color, #ffffff);
        }
        .x2-mode-card-glow--top-right {
          top: -100px;
          right: -100px;
        }
        .x2-mode-card-glow--bottom-left {
          bottom: -100px;
          left: -100px;
        }
        .x2-mode-card-inner {
          padding: clamp(24px, 4vw, 48px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 2;
          box-sizing: border-box;
        }
        .x2-mode-brand-title {
          font-family: var(--font-body-family, 'Inter', sans-serif);
          font-size: clamp(0.75rem, 1.2vw, 0.9rem);
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 8px 0;
        }
        .x2-mode-main-title {
          font-family: 'GFS Didot', 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 3.8vw, 3.2rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1.1;
          color: #ffffff;
          margin: 0 0 16px 0;
        }
        .x2-mode-desc p {
          font-family: var(--font-body-family, 'Inter', sans-serif);
          font-size: clamp(0.95rem, 1.3vw, 1.15rem);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          max-width: 520px;
        }
        .x2-mode-card-media {
          width: 100%;
          position: relative;
          z-index: 2;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #000000;
        }
        .x2-mode-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @media screen and (min-width: 768px) {
          .x2-mode-card-content {
            flex-direction: row;
            align-items: center;
            height: clamp(420px, 45vw, 540px);
          }
          .x2-mode-card-inner {
            width: 50%;
            padding: clamp(36px, 4.5vw, 64px);
          }
          .x2-mode-card-media {
            width: 50%;
            height: 100%;
            min-height: 100%;
            aspect-ratio: auto;
          }
        }
      `}</style>

      <div className="x2-modes-swipe-container" style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(3rem, 5vw, 5rem) clamp(16px, 4vw, 40px)', boxStyle: 'border-box' } as React.CSSProperties}>
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
