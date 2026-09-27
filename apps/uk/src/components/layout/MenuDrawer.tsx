'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { DRAWER_MENU } from '@/data/navigation';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet Drawer */}
      <div
        className="relative z-10 w-full max-h-[85vh] bg-[#111213] text-white rounded-t-[28px] border-t border-white/10 shadow-2xl flex flex-col overflow-hidden animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Grab Bar & Header */}
        <div className="pt-3 pb-2 px-6 flex items-center justify-between border-b border-white/5">
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
          <span className="text-[15px] font-bold tracking-wider uppercase text-white/50 pt-2">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors pt-0"
            aria-label="Close menu"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Nav Content */}
        <nav className="p-6 overflow-y-auto space-y-6">
          {/* Shop Group */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
              Shop Brushes
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {DRAWER_MENU.shop.brushes.map((b) => (
                <Link
                  key={b.label}
                  href={b.href}
                  onClick={onClose}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors block"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14.5px] font-semibold text-white">{b.label}</span>
                    {b.badge && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-white/15 text-white px-1.5 py-0.5 rounded-full">
                        {b.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <span className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mt-4 mb-3">
              Accessories
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {DRAWER_MENU.shop.accessories.map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  onClick={onClose}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors block"
                >
                  <span className="text-[14px] font-medium text-white/90">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Main Links */}
          <div className="space-y-1">
            {DRAWER_MENU.pages.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="block py-2.5 text-[17px] font-medium text-white/90 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/shop"
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-white text-black font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <span>Explore All Products</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
