'use client';

import React from 'react';

interface FreeGiftsSectionProps {
  isX2?: boolean;
}

export function FreeGiftsSection({ isX2 = false }: FreeGiftsSectionProps) {
  const gifts = [
    {
      id: 'travel-case',
      title: 'Ventilated Travel Case',
      regularPrice: '£25',
      image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-handbag-travel-case.webp',
      alt: 'Miroooo Ventilated Luxury Travel Case',
      benefit: 'Custom-moulded slim travel case with breathable ventilation ports for clean on-the-go storage.',
    },
    {
      id: 'battery-cable',
      title: isX2 ? '90-Day Battery & USB-C Cable' : '60-Day Battery & USB-C Cable',
      regularPrice: '£20',
      image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-usbc-fast-charging-port.webp',
      alt: isX2 ? 'Miroooo X2 90-Day Battery & Fast USB-C Charging Port' : 'Miroooo X1 60-Day Battery & Fast USB-C Charging Port',
      benefit: isX2
        ? 'Universal fast-charging USB-C cable powering an industry-leading 90-day battery runtime.'
        : 'Universal fast-charging USB-C cable powering up to 60 days of daily brushing on one charge.',
    },
    {
      id: 'brush-heads',
      title: '2x DuPont™ Brush Heads',
      regularPrice: '£20',
      image: isX2 ? '/assets_ref/x2/heads/B1.webp' : '/assets_ref/x/heads/B1.webp',
      alt: isX2 ? '2x Authentic DuPont 45 Degree Bass Replacement Brush Heads' : '2x Authentic DuPont Precision Replacement Brush Heads',
      benefit: isX2
        ? 'Two authentic DuPont™ 45° Bass angled bristle heads with end-rounded enamel defense.'
        : 'Two authentic DuPont™ precision-cut replacement heads designed for plaque removal and gum care.',
    },
  ];

  return (
    <section
      id="free-gifts-included"
      className="shopify-section free-gifts-section relative overflow-hidden"
      style={{
        background: '#080909',
        color: '#ffffff',
        padding: 'clamp(3rem, 5vw, 5rem) 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <style>{`
        @keyframes freePillPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 16px 3px rgba(34, 197, 94, 0.65);
          }
        }
        .miroooo-free-badge {
          animation: freePillPulse 2.4s ease-in-out infinite;
        }
        .free-gift-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .free-gift-card:hover {
          transform: translateY(-4px);
          border-color: rgba(34, 197, 94, 0.45);
          box-shadow: 0 18px 40px -15px rgba(0, 0, 0, 0.8), 0 0 24px -5px rgba(34, 197, 94, 0.2);
        }
      `}</style>

      <div className="page-width max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <span>💡 LIMITED TIME OFFER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-tight mb-4 text-white">
            Active Offer Found:{' '}
            <span
              style={{
                color: '#22c55e',
                textShadow: '0 0 25px rgba(34, 197, 94, 0.35)',
              }}
            >
              £65 in FREE GIFTS
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            Every Miroooo toothbrush today includes these 3 premium essentials bundled completely free with your order.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="free-gift-card relative flex flex-col justify-between rounded-2xl sm:rounded-[24px] bg-[#121315] border border-white/10 p-5 sm:p-6"
            >
              {/* Floating Animated FREE pill badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="miroooo-free-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22c55e] text-black text-xs font-black uppercase tracking-wider shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                  FREE
                </span>
              </div>

              {/* Card Content Top */}
              <div>
                {/* Rounded Image Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/5 p-4 flex items-center justify-center mb-5">
                  <img
                    src={gift.image}
                    alt={gift.alt}
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                  {/* Price Tag Overlay at Bottom of Image */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs">
                    <span className="line-through text-white/50">Normally {gift.regularPrice}</span>
                    <span className="text-[#22c55e] font-bold">£0.00</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                  {gift.title}
                </h3>

                {/* Benefit Bullet */}
                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  {gift.benefit}
                </p>
              </div>

              {/* Card Footer: Status check */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/60">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Auto-applied at checkout
                </span>
                <span className="font-mono text-white/40">100% FREE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
