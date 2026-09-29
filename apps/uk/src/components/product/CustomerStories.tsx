'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

import { useLoopingCarousel } from './useLoopingCarousel';

interface CustomerStory {
  id: number;
  author: string;
  concern: string;
  title: string;
  quote: string;
  image: string;
  badge: string;
}

const STORIES_DATA: CustomerStory[] = [
  {
    id: 1,
    author: 'Eleanor H., 34 · London',
    concern: 'Tea & Coffee Stains',
    title: 'Stubborn stains lifted in 2 weeks',
    quote: '"Drinking 3 cups of English breakfast tea daily left my front teeth noticeably tinted. The Whitening mode with the 45° Bass sweep lifted the tannin marks in a fortnight without any tooth sensitivity."',
    image: '/assets_ref/x2/stories/miroooo-x2-customer-review-story-1.webp',
    badge: 'Whitening Mode',
  },
  {
    id: 2,
    author: 'Gemma W., 28 · Edinburgh',
    concern: 'Sensitive Gums',
    title: 'Zero bleeding from day three',
    quote: '"My hygienist kept telling me I was scrubbing far too hard with manual brushes. The smart red halo pressure sensor stopped me pressing down, and my gums have felt so much calmer and healthier."',
    image: '/assets_ref/x2/stories/miroooo-x2-customer-review-story-2.webp',
    badge: 'Pressure Sensor',
  },
  {
    id: 3,
    author: 'Sophie T., 42 · Manchester',
    concern: 'Plaque & Biofilm',
    title: 'Dentist praised my gumline',
    quote: '"Went for my six-month dental check-up in Manchester and my dentist asked what I had changed. Plaque score dropped significantly along the back molars. Absolute game-changer of a toothbrush."',
    image: '/assets_ref/x2/stories/miroooo-x2-customer-review-story-3.webp',
    badge: 'Deep Clean',
  },
  {
    id: 4,
    author: 'Dr. Alistair M., 32 · Bristol',
    concern: 'Travel & Battery',
    title: '60 days away without a charger',
    quote: '"I travel constantly between Leeds and Bristol for work. Not having to pack bulky chargers or proprietary charging docks is liberating. The 51g unibody and slim travel case are brilliant."',
    image: '/assets_ref/x2/stories/miroooo-x2-customer-review-story-4.webp',
    badge: '90-Day Battery',
  },
  {
    id: 5,
    author: 'Charlotte K., 31 · Surrey',
    concern: 'Post-Aligners Care',
    title: 'Silky smooth teeth all day long',
    quote: '"After finishing adult aligners, keeping my teeth clean and polished was my top priority. The micro-diamond DuPont bristles reach every corner effortlessly. It feels like a professional polish daily."',
    image: '/assets_ref/x2/stories/miroooo-x2-customer-review-story-5.webp',
    badge: 'DuPont Bristles',
  },
  {
    id: 6,
    author: 'Hannah P., 27 · Bath',
    concern: 'Quiet Mornings',
    title: "So quiet it doesn't wake the house",
    quote: '"My old vibrating brush sounded like a drill at 6 AM. The Miroooo X2 is whisper-quiet under 45 dB, yet the sonic clean is vastly superior. The aluminium finish feels genuinely luxurious in the hand."',
    image: '/assets_ref/x2/stories/miroooo-x2-customer-review-story-6.webp',
    badge: '<45 dB Quiet',
  },
  {
    id: 7,
    author: 'James B., 29 · Oxford',
    concern: 'Receding Gumline',
    title: 'Gentle yet deeply effective',
    quote: '"I had mild gum recession and was terrified of harsh electric toothbrushes. The Standard mode is astonishingly soft on tender tissue while removing every trace of morning plaque. Highly recommend."',
    image: '/assets_ref/x2/stories/miroooo-x2-customer-review-story-7.webp',
    badge: 'Gum Defence',
  },
];

export function CustomerStories() {
  const modalCard = useRef<HTMLDivElement>(null);
  const modalAnimation = useRef<Animation | null>(null);
  const transitioning = useRef(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const { trackRef, previous: scrollPrev, next: scrollNext } = useLoopingCarousel(STORIES_DATA.length, 3600);

  const openModal = (index: number) => {
    setActiveStoryIndex(index);

  };

  const closeModal = useCallback(() => {
    modalAnimation.current?.cancel();
    transitioning.current = false;
    setActiveStoryIndex(null);
  }, []);

  const moveStory = useCallback(async (direction: number) => {
    const card = modalCard.current;
    if (!card || transitioning.current) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveStoryIndex(index => index === null ? null : (index + direction + STORIES_DATA.length) % STORIES_DATA.length);
      return;
    }
    transitioning.current = true;
    try {
      modalAnimation.current = card.animate([
        { transform: 'translateX(0)', opacity: 1 },
        { transform: `translateX(${-direction * 100}vw)`, opacity: 0 },
      ], { duration: 220, easing: 'cubic-bezier(.2,0,0,1)', fill: 'forwards' });
      await modalAnimation.current.finished;
      setActiveStoryIndex(index => index === null ? null : (index + direction + STORIES_DATA.length) % STORIES_DATA.length);
      modalAnimation.current.cancel();
      modalAnimation.current = card.animate([
        { transform: `translateX(${direction * 100}vw)`, opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 },
      ], { duration: 280, easing: 'cubic-bezier(.16,1,.3,1)' });
      await modalAnimation.current.finished;
    } catch { /* Closing the modal cancels its current transition. */ }
    transitioning.current = false;
  }, []);
  const modalPrev = useCallback(() => { void moveStory(-1); }, [moveStory]);
  const modalNext = useCallback(() => { void moveStory(1); }, [moveStory]);
  useEffect(() => () => { modalAnimation.current?.cancel(); }, []);

  useEffect(() => {
    if (activeStoryIndex === null) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('gallery-open');
    return () => { document.body.style.overflow = overflow; document.body.classList.remove('gallery-open'); };
  }, [activeStoryIndex]);

  // Keyboard controls for modal
  useEffect(() => {
    if (activeStoryIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') modalPrev();
      if (e.key === 'ArrowRight') modalNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStoryIndex, closeModal, modalPrev, modalNext]);

  const currentStory = activeStoryIndex !== null ? STORIES_DATA[activeStoryIndex] : null;

  return (
    <div
      id="shopify-section-template--miroooo-x2-customer-stories"
      className="shopify-section"
      style={{
        background: '#000000',
        color: '#ffffff',
        width: '100%',
        overflow: 'hidden',
        padding: 'clamp(3.5rem, 5.5vw, 5.5rem) 0',
        boxSizing: 'border-box',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
      }}
    >
      <style>{`
    /* Scoped Styles for X2 Customer Stories Carousel */
    #shopify-section-template--miroooo-x2-customer-stories {
      --x2-story-bg: #e6e6e6;
      --x2-story-ink: #111111;
      --x2-story-muted: #444444;
      --x2-story-green: #15803d;
      --x2-story-border: rgba(0, 0, 0, 0.08);
    }
    @media screen and (min-width: 768px) {
      #shopify-section-template--miroooo-x2-customer-stories {
        display: none !important;
      }
    }
    @media screen and (max-width: 767px) {
      #shopify-section-template--miroooo-x2-customer-stories {
        display: block !important;
      }
    }
    .x2-stories-track-wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .x2-stories-track {
      display: flex;
      gap: clamp(16px, 2vw, 24px);
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      -webkit-overflow-scrolling: touch;
      padding: 10px clamp(16px, 4vw, 40px) 24px clamp(16px, 4vw, 40px);
      scroll-snap-type: x mandatory;
      cursor: grab;
      user-select: none;
    }
    .x2-stories-track::-webkit-scrollbar {
      display: none;
    }
    .x2-stories-track:active {
      cursor: grabbing;
    }
    .x2-story-card {
      width: clamp(280px, 80vw, 340px);
      flex: 0 0 clamp(280px, 80vw, 340px);
      background: var(--x2-story-bg);
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
      display: flex;
      flex-direction: column;
      cursor: pointer;
      scroll-snap-align: start;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
      color: var(--x2-story-ink);
    }
    .x2-story-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6);
    }
    .x2-story-img-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      background: #d8d8d8;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
    .x2-story-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .x2-story-card:hover .x2-story-img {
      transform: scale(1.03);
    }
    .x2-story-badge-overlay {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .x2-story-zoom-icon {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      opacity: 0;
      transform: scale(0.85);
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    .x2-story-card:hover .x2-story-zoom-icon {
      opacity: 1;
      transform: scale(1);
    }
    .x2-story-content {
      padding: clamp(16px, 2.4vw, 22px);
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      gap: 12px;
    }
    .x2-story-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .x2-story-concern {
      font-family: var(--font-inter), sans-serif;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--x2-story-green);
    }
    .x2-story-score {
      font-family: var(--font-inter), sans-serif;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--x2-story-ink);
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .x2-story-score-star {
      color: #16a34a;
      font-size: 0.9rem;
    }
    .x2-story-title {
      font-family: var(--font-didot), 'Playfair Display', Georgia, serif;
      font-size: clamp(1.15rem, 1.4vw, 1.3rem);
      font-weight: 600;
      color: var(--x2-story-ink);
      margin: 0;
      line-height: 1.35;
    }
    .x2-story-quote {
      font-family: var(--font-inter), sans-serif;
      font-size: 0.88rem;
      color: var(--x2-story-muted);
      line-height: 1.55;
      margin: 0;
      flex: 1;
    }
    .x2-story-footer-row {
      border-top: 1px solid var(--x2-story-border);
      padding-top: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .x2-story-author {
      font-family: var(--font-inter), sans-serif;
      font-size: 0.86rem;
      font-weight: 600;
      color: var(--x2-story-ink);
    }
    .x2-story-verified {
      font-family: var(--font-inter), sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--x2-story-green);
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .x2-story-nav-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .x2-story-nav-btn:hover {
      background: #ffffff;
      color: #000000;
      transform: scale(1.06);
    }
    .x2-story-nav-btn:active {
      transform: scale(0.96);
    }

    /* Modal / Lightbox Dialog — matches gallery lightbox exactly */
    .x2-story-modal {
      position: fixed !important;
      inset: 0 !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      height: 100dvh !important;
      z-index: 999999999 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      background: rgba(255, 255, 255, 0.75) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s ease !important;
      user-select: none !important;
      -webkit-user-select: none !important;
      box-sizing: border-box !important;
    }
    .x2-story-modal.is-active,
    .x2-story-modal.is-open {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
    }
    .x2-story-modal-backdrop {
      position: absolute !important;
      inset: 0 !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background: rgba(255, 255, 255, 0.75) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      cursor: pointer !important;
      z-index: 1 !important;
    }
    .x2-story-modal-card {
      position: relative !important;
      background: #e6e6e6 !important;
      border-radius: 24px !important;
      width: 100% !important;
      max-width: 820px !important;
      max-height: 90vh !important;
      max-height: 90dvh !important;
      overflow-y: auto !important;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25) !important;
      border: 1px solid rgba(0, 0, 0, 0.1) !important;
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      transform: scale(0.94);
      opacity: 0;
      transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
      color: #111111 !important;
      z-index: 2 !important;
      box-sizing: border-box !important;
      pointer-events: auto !important;
      touch-action: pan-y;
      will-change: transform, opacity;
    }
    .x2-story-modal.is-active .x2-story-modal-card,
    .x2-story-modal.is-open .x2-story-modal-card {
      transform: scale(1);
      opacity: 1;
    }
    .x2-story-modal-img-wrap {
      width: 100%;
      aspect-ratio: 1 / 1;
      background: #d8d8d8;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-top-left-radius: 24px;
      border-bottom-left-radius: 24px;
    }
    .x2-story-modal-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .x2-story-modal-body {
      padding: clamp(20px, 3vw, 32px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
    }
    /* Close button — fixed to viewport top-right (like gallery lightbox) */
    .x2-story-modal-close {
      position: fixed !important;
      top: 24px !important;
      right: 24px !important;
      width: 46px !important;
      height: 46px !important;
      border-radius: 50% !important;
      background: rgba(247, 241, 232, 0.94) !important;
      color: #000000 !important;
      border: 1px solid rgba(0, 0, 0, 0.15) !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease, box-shadow 0.2s ease !important;
      z-index: 1000000001 !important;
      padding: 0 !important;
      outline: none !important;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
    }
    .x2-story-modal-close:hover {
      background: #ffffff !important;
      transform: scale(1.08) !important;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
    }
    .x2-story-modal-close:active {
      transform: scale(0.95) !important;
    }
    .x2-story-modal-close svg {
      display: block;
      stroke: #000000;
      width: 20px;
      height: 20px;
    }
    /* Navigation arrows — fixed to viewport left/right (like gallery lightbox) */
    .x2-story-modal-nav-btn {
      position: fixed !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      width: 50px !important;
      height: 50px !important;
      border-radius: 50% !important;
      background: rgba(247, 241, 232, 0.94) !important;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
      color: #000000 !important;
      border: 1px solid rgba(0, 0, 0, 0.15) !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: background 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease !important;
      z-index: 1000000001 !important;
      padding: 0 !important;
      outline: none !important;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12) !important;
    }
    .x2-story-modal-nav-btn.x2-modal-prev {
      left: 24px !important;
    }
    .x2-story-modal-nav-btn.x2-modal-next {
      right: 24px !important;
    }
    .x2-story-modal-nav-btn:hover {
      background: #ffffff !important;
      border-color: rgba(0, 0, 0, 0.22) !important;
      transform: translateY(-50%) scale(1.08) !important;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18) !important;
    }
    .x2-story-modal-nav-btn:active {
      transform: translateY(-50%) scale(0.95) !important;
    }
    .x2-story-modal-nav-btn svg {
      display: block;
      stroke: #000000;
      width: 24px;
      height: 24px;
    }
    .x2-story-modal-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      background: #000000;
      color: #ffffff;
      font-family: var(--font-inter), sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      border-radius: 999px;
      text-decoration: none;
      transition: background 0.2s ease, transform 0.2s ease;
    }
    .x2-story-modal-btn:hover {
      background: #222222;
      transform: translateY(-1px);
    }
    @media (max-width: 680px) {
      .x2-story-modal-card {
        grid-template-columns: 1fr !important;
        max-height: 85vh !important;
        max-height: 85dvh !important;
      }
      .x2-story-modal-img-wrap {
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        border-bottom-left-radius: 0;
      }
      .x2-story-modal-close {
        top: 16px !important;
        right: 16px !important;
        width: 44px !important;
        height: 44px !important;
      }
      .x2-story-modal-nav-btn {
        width: 44px !important;
        height: 44px !important;
      }
      .x2-story-modal-nav-btn.x2-modal-prev {
        left: 12px !important;
      }
      .x2-story-modal-nav-btn.x2-modal-next {
        right: 12px !important;
      }
    }
  `}</style>

      <div style={{ maxWidth: '1320px', margin: '0 auto clamp(2rem, 3.5vw, 3rem) auto', padding: '0 clamp(16px, 4vw, 40px)', boxSizing: 'border-box', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-inter, sans-serif)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a1a1aa', margin: '0 0 0.5rem 0' }}>
          Real Users &middot; Real Results
        </p>
        <h2 style={{ fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif", fontSize: 'clamp(1.85rem, 3.4vw, 3rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '0 0 0.75rem 0', lineHeight: 1.2 }}>
          Real Customers, Real Experiences
        </h2>
        <p style={{ fontFamily: 'var(--font-inter, sans-serif)', fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Everyday oral routines transformed. Photographed in real UK homes after consistent use of the Miroooo X2.
        </p>
      </div>

      {/* Carousel Track Wrap */}
      <div className="x2-stories-track-wrap" id="x2-stories-wrapper">
        <div ref={trackRef} className="x2-stories-track" id="x2-stories-track" aria-label="Real customer transformations">
          {[...STORIES_DATA, ...STORIES_DATA, ...STORIES_DATA].map((story, index) => (
            <article
              key={index}
              className="x2-story-card"
              data-story-id={story.id}
              onClick={() => openModal(index % STORIES_DATA.length)}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openModal(index % STORIES_DATA.length); } }}
            >
              <div className="x2-story-img-wrap">
                <img src={story.image} alt={`Miroooo review by ${story.author}`} className="x2-story-img" loading="eager" decoding="async" />
                <span className="x2-story-badge-overlay">{story.badge}</span>
                <div className="x2-story-zoom-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                </div>
              </div>
              <div className="x2-story-content">
                <div className="x2-story-top-row">
                  <span className="x2-story-concern">{story.concern}</span>
                  <span className="x2-story-score"><span className="x2-story-score-star">★</span> 5.0</span>
                </div>
                <h3 className="x2-story-title">{story.title}</h3>
                <p className="x2-story-quote">{story.quote}</p>
                <div className="x2-story-footer-row">
                  <span className="x2-story-author">{story.author}</span>
                  <span className="x2-story-verified">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#15803d"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    Verified UK Buyer
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
        <button className="x2-story-nav-btn" id="x2-story-prev-btn" type="button" aria-label="Previous customer story" onClick={scrollPrev}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.7)' }}>
          Customer Stories
        </span>
        <button className="x2-story-nav-btn" id="x2-story-next-btn" type="button" aria-label="Next customer story" onClick={scrollNext}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      {/* Fullscreen Story Lightbox Modal */}
      {currentStory && (
        <div className="x2-story-modal is-active" role="dialog" aria-modal="true">
          <div className="x2-story-modal-backdrop" onClick={closeModal}></div>
          <button
            type="button"
            className="x2-story-modal-close"
            aria-label="Close story"
            onClick={closeModal}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <button
            type="button"
            className="x2-story-modal-nav-btn x2-modal-prev"
            aria-label="Previous story"
            onClick={modalPrev}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button
            type="button"
            className="x2-story-modal-nav-btn x2-modal-next"
            aria-label="Next story"
            onClick={modalNext}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <div className="x2-story-modal-card" ref={modalCard}>
            <div className="x2-story-modal-img-wrap">
              <img src={currentStory.image} alt={currentStory.author} className="x2-story-modal-img" />

            </div>
            <div className="x2-story-modal-body">
              <div>
                <div className="x2-story-top-row" style={{ marginBottom: '12px' }}>
                  <span className="x2-story-concern">{currentStory.concern}</span>
                  <span className="x2-story-score"><span className="x2-story-score-star">★</span> 5.0</span>
                </div>
                <h3 className="x2-story-title" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.6rem)', marginBottom: '12px', lineHeight: 1.3 }}>{currentStory.title}</h3>
                <p className="x2-story-quote" style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{currentStory.quote}</p>
              </div>
              <div className="x2-story-footer-row">
                <span className="x2-story-author">{currentStory.author}</span>
                <span className="x2-story-verified">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#15803d"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  Verified UK Buyer
                </span>
              </div>
              <a href="#hero-cta" className="x2-story-modal-btn" onClick={closeModal}>Get Miroooo X2 →</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
