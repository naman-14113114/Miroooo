'use client';

import { useEffect, useRef, type ComponentProps } from 'react';

/** Native buffering ahead of the section; offscreen playback never competes with the hero. */
export function ViewportVideo(props: ComponentProps<'video'>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const prepare = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.preload = 'auto';
        prepare.disconnect();
      }
    }, { rootMargin: '1800px 0px' });
    const playback = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    prepare.observe(video);
    playback.observe(video);
    return () => { prepare.disconnect(); playback.disconnect(); video.pause(); };
  }, [props.src]);
  return <video {...props} ref={videoRef} autoPlay={false} preload="none" />;
}
