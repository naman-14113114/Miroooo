'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

import { useLoopingCarousel } from './useLoopingCarousel';

const reelSources = [
  '/assets_ref/x/reels/V5.mp4',
  '/assets_ref/x/reels/miroooo-8.mp4',
  '/assets_ref/x/reels/V4.mp4',
  '/assets_ref/x/reels/miroooo-6.mp4',
  '/assets_ref/x/reels/miroooo-5.mp4',
  '/assets_ref/x/reels/V2.mp4',
];

export function ReelsCarousel() {
  const { trackRef: carouselRef, selected: selectedIndex, select: selectReel } = useLoopingCarousel(reelSources.length, 5000, true);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      video.muted = index !== unmutedIndex;
      if (index === selectedIndex) video.play().catch(() => {});
      else video.pause();
    });
  }, [selectedIndex, unmutedIndex]);

  const toggleSound = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.muted = !video.muted;
    setUnmutedIndex(video.muted ? null : index);
    selectReel(index);
  };

  return (
    <section id="shopify-section-template--miroshine-reels-container" className="shopify-section miroshine-reels-section" aria-label="Miroooo customer videos">
      <div id="miroshine-reels-slider" ref={carouselRef} className="miroshine-reels-carousel" data-drag-scroll>
        {[...reelSources, ...reelSources, ...reelSources].map((src, index) => (
          <div
            key={index}
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
