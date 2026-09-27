'use client';

import React, { useRef } from 'react';

const REELS = [
  {
    id: 'reel-1',
    title: '45° Bass Sweep Motion',
    subtitle: 'Dynamic micro-oscillations',
    videoSrc: 'https://miroooo-us.vercel.app/media/products/miroooo-electric-toothbrush-x2/videos/31-miroooo-electric-toothbrush-x2-demo-1.mp4',
    poster: '/assets_ref/x2/gallery/hero-video-poster.webp',
  },
  {
    id: 'reel-2',
    title: 'IPX7 Shower Immersion',
    subtitle: '100% waterproof unibody',
    videoSrc: '/assets_ref/x2/vbj9qc-h264-hd.mp4',
    poster: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-upright-grip.webp',
  },
  {
    id: 'reel-3',
    title: 'Modern Bathroom Ritual',
    subtitle: 'Magnetic floating wall mount',
    videoSrc: '/assets_ref/x/miroooo-feature-video.mp4',
    poster: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-complete-set-packaging.webp',
  },
];

export function ReelsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="reels-carousel-section py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white" aria-labelledby="reels-title">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-[11.5px] font-bold uppercase tracking-widest text-white/50 block mb-1">
            See Miroooo In Motion
          </span>
          <h2 id="reels-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Daily Routine In Action
          </h2>
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous reel"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next reel"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
      >
        {REELS.map((reel) => (
          <div
            key={reel.id}
            className="w-[280px] sm:w-[320px] flex-shrink-0 aspect-[9/16] rounded-3xl overflow-hidden bg-[#111213] border border-white/10 relative shadow-2xl snap-start group"
          >
            <video
              src={reel.videoSrc}
              poster={reel.poster}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                {reel.subtitle}
              </span>
              <strong className="text-[16px] font-bold text-white leading-tight">
                {reel.title}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
