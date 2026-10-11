'use client';

import React from 'react';

interface FreeBrushHeadsGiftProps {
  model?: 'X1' | 'X2';
}

export function FreeBrushHeadsGift({ model = 'X2' }: FreeBrushHeadsGiftProps) {
  const isX1 = model === 'X1';

  const gifts = [
    {
      id: 'brush-heads',
      name: '2x Extra Heads',
      value: '£10',
      image: isX1 ? '/assets_ref/x/heads/B1.webp' : '/assets_ref/x2/heads/B1.webp',
      alt: isX1 ? '2x Extra Heads for Miroooo X1' : '2x Extra Heads for Miroooo X2',
    },
    {
      id: 'smile-app',
      name: '1-Year App Access',
      value: '£29',
      image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-smile-coach-app.webp',
      alt: '1-Year App Access',
    },
    {
      id: 'gift-card',
      name: '£10 Gift Card',
      value: '£10',
      image: '/assets_ref/gifts/miroooo-10-pound-gift-card.jpg',
      alt: '£10 Gift Card',
    },
  ];

  return (
    <section className="mt-6 mb-8" id="free-gifts" aria-label="Flash Sale Free Gifts">
      <div className="text-center mb-5 flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-0">
          Flash Sale
        </h3>
        <p className="mt-2 rounded bg-white/10 px-3 py-1 text-xs sm:text-sm font-bold tracking-widest text-white inline-flex items-center justify-center gap-1.5 flex-wrap">
          <span className="text-sm sm:text-base font-extrabold normal-case text-white">
            £49
          </span>
          <span>VALUE OF FREE GIFTS FOR TODAY ONLY</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="group relative flex flex-col justify-start rounded-[18px] sm:rounded-[22px] border border-white/15 bg-[#141416] p-2 pt-5 sm:pt-6 text-center shadow-sm min-h-[160px] sm:min-h-[190px] transition duration-300 hover:border-white/30 hover:-translate-y-0.5"
          >
            {/* Overlapping top badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#1a1b1e] border border-white/20 rounded-full flex items-center gap-1 shadow-md whitespace-nowrap z-10">
              <span className="text-white text-[10px] sm:text-[11px] font-black tracking-wider uppercase font-sans">
                FREE
              </span>
              <span className="line-through text-[11px] sm:text-xs text-white/50 font-semibold leading-none">
                {gift.value}
              </span>
            </div>

            {/* Gift image */}
            <div className="relative mt-1 aspect-square w-full overflow-hidden rounded-[14px] sm:rounded-[18px] p-1 flex items-center justify-center">
              <img
                src={gift.image}
                alt={gift.alt}
                width={200}
                height={200}
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain rounded-[14px] sm:rounded-[18px] transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Gift title */}
            <p className="mt-1 text-xs sm:text-[13px] font-semibold text-white leading-tight">
              {gift.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
