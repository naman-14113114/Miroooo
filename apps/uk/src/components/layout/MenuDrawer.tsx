'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DRAWER_MENU } from '@/data/navigation';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open', 'has-modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('nav-open', 'has-modal-open');
      document.body.style.overflow = '';
      setDragOffset(0);
    }
    return () => {
      document.body.classList.remove('nav-open', 'has-modal-open');
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Touch Drag-to-Dismiss Physics
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    if (diff > 0) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragOffset > 100) {
      onClose();
    }
    setDragOffset(0);
    touchStartY.current = null;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
        style={{
          opacity: dragOffset > 0 ? Math.max(0.2, 1 - dragOffset / 300) : 1,
        }}
      />

      {/* Bottom Sheet Drawer */}
      <div
        ref={drawerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 w-full max-h-[88vh] bg-[#0c0d0e] text-white rounded-t-[28px] border-t border-white/10 shadow-2xl flex flex-col overflow-hidden transition-transform ease-out"
        style={{
          transform: dragOffset > 0 ? `translate3d(0, ${dragOffset}px, 0)` : 'translate3d(0, 0, 0)',
          transitionDuration: dragOffset === 0 ? '0.35s' : '0s',
          animation: dragOffset === 0 ? 'slideUpDrawer 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        }}
      >
        {/* Grab Bar & Top Controls */}
        <div className="pt-3 pb-2 px-6 flex items-center justify-between border-b border-white/5 relative flex-shrink-0">
          <div className="w-12 h-1 bg-white/25 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
          <span className="text-[13px] font-bold tracking-wider uppercase text-white/50 pt-2">
            Navigation
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <nav className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Shop Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Sonic Brushes
              </span>
              <span className="text-[10.5px] font-medium text-white/40">50% Off Today</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {DRAWER_MENU.shop.brushes.map((b) => (
                <Link
                  key={b.label}
                  href={b.href}
                  onClick={onClose}
                  className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all block"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[14.5px] font-semibold text-white">{b.label}</span>
                    {b.badge && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
                        {b.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11.5px] text-white/50 block">View details →</span>
                </Link>
              ))}
            </div>

            <span className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mt-4 mb-3">
              Brush Heads &amp; Accessories
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {DRAWER_MENU.shop.accessories.map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  onClick={onClose}
                  className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all block"
                >
                  <span className="text-[13.5px] font-medium text-white/90 block mb-1">{a.label}</span>
                  <span className="text-[11.5px] text-white/50 block">£10.00 / 2-Pack</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Explore / Supporting Links */}
          <div className="space-y-1">
            <span className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
              Explore
            </span>
            {DRAWER_MENU.pages.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-[16px] font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-white/30 text-[14px]">→</span>
              </Link>
            ))}
          </div>

          {/* Bottom CTA Button */}
          <div className="pt-2 pb-4">
            <Link
              href="/shop"
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-full bg-white text-black font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <span>Shop All Products</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
      </div>

      <style jsx>{`
        @keyframes slideUpDrawer {
          from {
            transform: translate3d(0, 100%, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
