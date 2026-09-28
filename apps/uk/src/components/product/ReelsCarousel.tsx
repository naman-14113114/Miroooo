'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const reelSources = [
  '/assets_ref/x/reels/V5.mp4',
  '/assets_ref/x/reels/miroooo-8.mp4',
  '/assets_ref/x/reels/V4.mp4',
  '/assets_ref/x/reels/miroooo-6.mp4',
  '/assets_ref/x/reels/miroooo-5.mp4',
  '/assets_ref/x/reels/V2.mp4',
];

export function ReelsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);

  const selectReel = useCallback((index: number, smooth = true) => {
    const carousel = carouselRef.current;
    const card = carousel?.children[index] as HTMLElement | undefined;
    if (!carousel || !card) return;
    carousel.scrollTo({
      left: card.offsetLeft - (carousel.clientWidth - card.clientWidth) / 2,
      behavior: smooth ? 'smooth' : 'instant',
    });
    setSelectedIndex(index);
  }, []);

  useEffect(() => {
    selectReel(0, false);
  }, [selectReel]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === selectedIndex) video.play().catch(() => {});
      else video.pause();
    });
  }, [selectedIndex]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!carouselRef.current?.matches(':hover')) {
        selectReel((selectedIndex + 1) % reelSources.length);
      }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedIndex, selectReel]);

  const onScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const center = carousel.scrollLeft + carousel.clientWidth / 2;
    let closest = selectedIndex;
    let distance = Infinity;
    Array.from(carousel.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const gap = Math.abs(card.offsetLeft + card.clientWidth / 2 - center);
      if (gap < distance) {
        closest = index;
        distance = gap;
      }
    });
    if (closest !== selectedIndex) setSelectedIndex(closest);
  };

  const toggleSound = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.muted = !video.muted;
    setUnmutedIndex(video.muted ? null : index);
    selectReel(index);
  };

  return (
    <section id="shopify-section-template--miroshine-reels-container" className="shopify-section miroshine-reels-section" aria-label="Miroooo customer videos">
      <div id="miroshine-reels-slider" ref={carouselRef} className="miroshine-reels-carousel" onScroll={onScroll}>
        {reelSources.map((src, index) => (
          <div
            key={src}
            className={`reels-card-cell ${selectedIndex === index ? 'is-selected' : ''}`}
            onClick={() => selectReel(index)}
          >
            <div className="reels-card-inner">
              <video
                ref={(element) => { videoRefs.current[index] = element; }}
                className="reels-video"
                src={src}
                loop
                muted
                playsInline
                preload="none"
              />
              <button
                className={`reels-sound-btn ${unmutedIndex === index ? 'is-unmuted' : ''}`}
                type="button"
                aria-label={unmutedIndex === index ? 'Mute video' : 'Unmute video'}
                onClick={(event) => { event.stopPropagation(); toggleSound(index); }}
              >
                {unmutedIndex === index ? <Volume2 size={20} strokeWidth={2} /> : <VolumeX size={20} strokeWidth={2} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
