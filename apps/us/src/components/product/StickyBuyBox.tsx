'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface StickyBuyBoxProps {
  product: Product;
}

export function StickyBuyBox({ product }: StickyBuyBoxProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls down past the hero buybox (~550px)
      setIsVisible(window.scrollY > 550);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0d0e]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] shadow-2xl transition-all duration-300 animate-slide-up"
      aria-label="Quick Add to Cart Floating Bar"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Product Meta */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:block">
            <h4 className="text-[14px] font-bold text-white truncate">{product.name}</h4>
            <span className="text-[12px] text-white/60">Free Tracked US Delivery</span>
          </div>
          <div className="flex items-baseline gap-2">
            <strong className="text-[16px] font-extrabold text-white">{product.formattedPrice}</strong>
            <s className="text-[13px] text-white/40">{product.formattedCompareAt}</s>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => {
            addItem({
              productHandle: product.handle,
              quantity: 1,
            });
            router.push('/cart');
          }}
          className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-[13.5px] hover:bg-neutral-200 active:scale-95 transition-all shadow-lg flex-shrink-0"
        >
          Add To Cart
        </button>
      </div>
    </aside>
  );
}
