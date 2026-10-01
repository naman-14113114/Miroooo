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
  const [isNearby, setIsNearby] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const track = carouselRef.current;
    if (!track) return;
    // Prepare upcoming clips before arrival, without downloading all 18 copies.
    const prepare = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearby(true);
        prepare.disconnect();
      }
    }, { rootMargin: '1800px 0px' });
    const visibility = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    prepare.observe(track);
    visibility.observe(track);
    return () => { prepare.disconnect(); visibility.disconnect(); };
  }, [carouselRef]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      video.muted = index !== unmutedIndex;
      if (isVisible && index === selectedIndex) video.play().catch(() => {});
      else video.pause();
    });
  }, [selectedIndex, unmutedIndex, isVisible]);

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
                poster={src.replace('.mp4', '-poster.webp')}
                loop
                muted
                playsInline
                preload={isNearby && (index === selectedIndex || index === selectedIndex + 1 || (isVisible && index === selectedIndex - 1))
                  ? 'auto'
                  : index >= reelSources.length && index < reelSources.length * 2 ? 'metadata' : 'none'}
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
