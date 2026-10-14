'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface NavSection {
  id: string;
  label: string;
  targetId: string;
  altTargetId?: string;
}

const X2_DESKTOP_SECTIONS: NavSection[] = [
  { id: 'stories', label: 'Customer Stories', targetId: 'shopify-section-template--miroooo-x2-customer-stories' },
  { id: 'description', label: 'Description', targetId: 'x2-section-energy-boost-split' },
  { id: 'modes', label: 'Modes', targetId: 'shopify-section-template--miroooo-x2-modes-swipe' },
  { id: 'reviews', label: 'Reviews', targetId: 'shopify-section-template--24203751129433__reviews', altTargetId: 'reviews' },
  { id: 'compare', label: 'Compare', targetId: 'shopify-section-template--miroooo-comparison' },
  { id: 'in-the-box', label: 'In The Box', targetId: 'shopify-section-template--24203751129433__image-with-text-1' },
  { id: 'x1-vs-x2', label: 'X1 vs X2', targetId: 'shopify-section-template--miroooo-x2-comparison' },
  { id: 'faq', label: 'FAQ', targetId: 'shopify-section-template--24203751129433__faq' },
];

const X2_MOBILE_SECTIONS: NavSection[] = [
  { id: 'stories', label: 'Customer Stories', targetId: 'shopify-section-template--miroooo-x2-customer-stories' },
  { id: 'description', label: 'Description', targetId: 'x2-section-energy-boost-split' },
  { id: 'modes', label: 'Modes', targetId: 'shopify-section-template--miroooo-x2-modes-swipe' },
  { id: 'reviews', label: 'Reviews', targetId: 'shopify-section-template--24203751129433__reviews', altTargetId: 'reviews' },
  { id: 'compare', label: 'Compare', targetId: 'shopify-section-template--miroooo-comparison' },
  { id: 'in-the-box', label: 'In The Box', targetId: 'shopify-section-template--24203751129433__image-with-text-1' },
  { id: 'x1-vs-x2', label: 'X1 vs X2', targetId: 'shopify-section-template--miroooo-x2-comparison' },
  { id: 'faq', label: 'FAQ', targetId: 'shopify-section-template--24203751129433__faq' },
];

const X1_DESKTOP_SECTIONS: NavSection[] = [
  { id: 'customer-videos', label: 'Real Customer Video', targetId: 'shopify-section-template--miroshine-reels-container' },
  { id: 'modes', label: 'Modes', targetId: 'shopify-section-template--24203751129433__video_with_text_BkMKDR' },
  { id: 'description', label: 'Description', targetId: 'shopify-section-template--miroooo-brush-style-precision' },
  { id: 'reviews', label: 'Reviews', targetId: 'shopify-section-template--24203751129433__reviews', altTargetId: 'reviews' },
  { id: 'compare', label: 'Compare', targetId: 'shopify-section-template--miroooo-comparison' },
  { id: 'in-the-box', label: 'In The Box', targetId: 'shopify-section-template--24203751129433__image-with-text-1' },
  { id: 'faq', label: 'FAQ', targetId: 'shopify-section-template--24203751129433__faq' },
];

const X1_MOBILE_SECTIONS: NavSection[] = [
  { id: 'customer-videos', label: 'Real Customer Video', targetId: 'shopify-section-template--miroshine-reels-container' },
  { id: 'modes', label: 'Modes', targetId: 'shopify-section-template--24203751129433__video_with_text_BkMKDR' },
  { id: 'description', label: 'Description', targetId: 'shopify-section-template--miroooo-brush-style-precision' },
  { id: 'travel', label: 'Travel', targetId: 'shopify-section-template--miroooo-discover-oral-hygiene' },
  { id: 'reviews', label: 'Reviews', targetId: 'shopify-section-template--24203751129433__reviews', altTargetId: 'reviews' },
  { id: 'compare', label: 'Compare', targetId: 'shopify-section-template--miroooo-comparison' },
  { id: 'in-the-box', label: 'In The Box', targetId: 'shopify-section-template--24203751129433__image-with-text-1' },
  { id: 'faq', label: 'FAQ', targetId: 'shopify-section-template--24203751129433__faq' },
];

function getTargetElement(targetId: string, altTargetId?: string): HTMLElement | null {
  const el1 = document.getElementById(targetId);
  const el2 = altTargetId ? document.getElementById(altTargetId) : null;
  if (el1 && el2) {
    if (el1.offsetHeight === 0 && el2.offsetHeight > 0) return el2;
    if (el2.offsetHeight === 0 && el1.offsetHeight > 0) return el1;
    const top1 = el1.getBoundingClientRect().top;
    const top2 = el2.getBoundingClientRect().top;
    return top1 <= top2 ? el1 : el2;
  }
  return el1 || el2;
}

interface ProductStickyNavProps {
  isX2: boolean;
}

export function ProductStickyNav({ isX2 }: ProductStickyNavProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sections = isX2
    ? (isMobile ? X2_MOBILE_SECTIONS : X2_DESKTOP_SECTIONS)
    : (isMobile ? X1_MOBILE_SECTIONS : X1_DESKTOP_SECTIONS);
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState(sections[0].id);
  const trackRef = useRef<HTMLDivElement>(null);
  const isClickingRef = useRef(false);

  // 1. Visibility and ScrollSpy
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        // A. Appear only when scrolled past the first section of product details (Hero BuyBox)
        const heroEl = document.getElementById('shopify-section-template--24203751129433__main-product');
        if (heroEl) {
          const rect = heroEl.getBoundingClientRect();
          // Header appears once the user has scrolled past the main product hero section
          setIsVisible(rect.bottom <= 200);
        } else {
          setIsVisible(window.scrollY > 600);
        }

        // B. ScrollSpy detection using document top coordinates
        if (!isClickingRef.current) {
          const scrollPos = window.scrollY + 160;
          let current = sections[0].id;

          for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            const el = getTargetElement(sec.targetId, sec.altTargetId);
            if (el && el.offsetHeight > 0) {
              const docTop = el.getBoundingClientRect().top + window.scrollY;
              if (scrollPos >= docTop) {
                current = sec.id;
              }
            }
          }

          // Check if scrolled near bottom of page
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
            current = sections[sections.length - 1].id;
          }

          setActiveId(current);
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  // 2. Auto-scroll active pill into view on mobile
  useEffect(() => {
    if (!trackRef.current) return;
    const activeBtn = trackRef.current.querySelector<HTMLButtonElement>(`[data-nav-id="${activeId}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeId]);

  // 3. Smooth click scroll
  const scrollToSection = useCallback((targetId: string, altTargetId: string | undefined, navId: string) => {
    setActiveId(navId);
    isClickingRef.current = true;
    setTimeout(() => {
      isClickingRef.current = false;
    }, 850);

    const el = getTargetElement(targetId, altTargetId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 62;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <aside
      className={`miroooo-sticky-nav-wrap ${isVisible ? 'is-visible' : ''}`}
      aria-label="Product Sections Navigation"
      role="navigation"
    >
      <div className="miroooo-sticky-nav-pill">
        <span className="miroooo-sticky-nav-label">Select</span>
        <div className="miroooo-sticky-nav-track" ref={trackRef}>
          {sections.map((sec) => {
            const isActive = activeId === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                data-nav-id={sec.id}
                onClick={() => scrollToSection(sec.targetId, sec.altTargetId, sec.id)}
                className={`miroooo-sticky-nav-item ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
