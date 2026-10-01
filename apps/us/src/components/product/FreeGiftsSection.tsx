'use client';

interface FreeGiftsSectionProps {
  isX2?: boolean;
}

export function FreeGiftsSection({ isX2 = false }: FreeGiftsSectionProps) {
  const gifts = [
    {
      title: 'Ventilated Travel Case',
      normalPrice: 'Normally $35',
      image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-handbag-travel-case.webp',
      alt: 'Miroooo Luxury Ventilated Travel Case',
      benefit: 'Hygienic magnetic closure with micro-ventilation ports keeps your brush fresh anywhere.',
    },
    {
      title: isX2 ? '90-Day Battery & USB-C Cable' : '60-Day Battery & USB-C Cable',
      normalPrice: 'Normally $25',
      image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-usbc-fast-charging-port.webp',
      alt: isX2 ? '90-Day Battery and Fast USB-C Port' : '60-Day Battery and Fast USB-C Port',
      benefit: isX2
        ? 'Industry-leading 90-day battery life with rapid braided USB-C fast charging.'
        : 'Ultra-efficient 60-day battery life with rapid braided USB-C fast charging.',
    },
    {
      title: '2x DuPont™ Precision Brush Heads',
      normalPrice: 'Normally $26',
      image: isX2 ? '/assets_ref/x2/heads/B1.webp' : '/assets_ref/x/heads/B1.webp',
      alt: isX2 ? 'Miroooo X2 DuPont 45-degree Bass Brush Heads' : 'Miroooo X1 DuPont Precision Brush Heads',
      benefit: isX2
        ? 'Genuine DuPont™ 45° Bass angled bristles for clinical gum-line plaque defense.'
        : 'Genuine DuPont™ high-density precision diamond bristles for gentle deep cleaning.',
    },
  ];

  return (
    <section
      id="miroooo-free-gifts-section"
      className="py-12 sm:py-16 bg-[#0c0d0e] border-y border-white/10 relative overflow-hidden"
      aria-label="Complimentary Free Gifts"
    >
      {/* Ambient background glows */}
      <div
        className="absolute -top-24 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <span className="text-sm leading-none" aria-hidden="true">💡</span>
          <span>LIMITED TIME OFFER</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
          Active Offer Found: $86 in{' '}
          <span className="text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg inline-block transform -rotate-1 shadow-sm">
            FREE GIFTS
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12">
          Every Miroooo toothbrush today includes these 3 premium essentials bundled completely free with your order.
        </p>

        {/* 3-card responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {gifts.map((gift, idx) => (
            <div
              key={idx}
              className="group relative bg-[#131517] border border-white/10 hover:border-emerald-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-xl hover:shadow-emerald-500/5 flex flex-col justify-between"
            >
              {/* Floating animated 'FREE' badge */}
              <div className="absolute -top-3.5 right-5 bg-emerald-500 text-[#080909] font-black text-xs sm:text-sm px-3.5 py-1 rounded-full shadow-lg z-20 tracking-wider flex items-center gap-1 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-black/60 animate-ping" aria-hidden="true" />
                FREE
              </div>

              {/* Rounded image container */}
              <div className="relative mb-4 sm:mb-5 rounded-xl overflow-hidden bg-[#080909] border border-white/5 aspect-square flex items-center justify-center p-3">
                {/* Line-through regular price tag */}
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/90 font-bold line-through z-10 bg-black/80 backdrop-blur-md px-3.5 py-1 rounded-full text-xs shadow-md border border-white/10 whitespace-nowrap tracking-tight">
                  {gift.normalPrice}
                </span>
                <img
                  src={gift.image}
                  alt={gift.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card content */}
              <div className="flex flex-col gap-2 mt-auto">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-white text-base sm:text-lg leading-snug">
                    {gift.title}
                  </h3>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-2 py-0.5 rounded uppercase shrink-0">
                    FREE
                  </span>
                </div>
                <p className="text-white/65 text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{gift.benefit}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
