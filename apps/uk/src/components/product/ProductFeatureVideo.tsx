'use client';

import React, { useRef, useEffect } from 'react';

interface ProductFeatureVideoProps {
  isX2: boolean;
}

interface FeaturePoint {
  title: string;
  description: string;
}

interface ProductFeatureData {
  kicker: string;
  heading: string;
  points: FeaturePoint[];
  ctaText: string;
  videoSrc: string;
  aspectRatio: string;
  isPortrait: boolean;
}

const X2_DATA: ProductFeatureData = {
  kicker: 'Miroooo X2 Flagship',
  heading: 'Precision. Without The Noise.',
  points: [
    {
      title: '40,000 Micro-Sweeps/Min',
      description: 'Dentist-recommended 45° Bass angle sweeps plaque from gum pockets without abrasion.',
    },
    {
      title: 'Smart Red Halo Pressure Defense',
      description: '360° glowing visual alert throttles vibration if you press too hard.',
    },
    {
      title: '90+ Days On A Single Charge',
      description: 'Full 3 months of twice-daily brushing from a single 2-hour USB-C charge.',
    },
    {
      title: 'IPX7 Submersible Waterproof',
      description: 'Aerospace aluminium chassis engineered for effortless shower brushing.',
    },
  ],
  ctaText: 'Get Miroooo X2 + 2 Free Heads',
  videoSrc: '/assets_ref/x2/vbj9qc-h264-hd.mp4',
  aspectRatio: '9/16',
  isPortrait: true,
};

const X1_DATA: ProductFeatureData = {
  kicker: 'The Miroooo X1 Standard',
  heading: 'Brushing, Elevated To Ritual.',
  points: [
    {
      title: '32,000 Acoustic Vibrations/Min',
      description: 'Ultrasonic micro-bubbles lift plaque 10x more effectively than manual brushing.',
    },
    {
      title: '51g Featherweight Unibody',
      description: 'Precision CNC aerospace aluminium body eliminates hand and wrist fatigue.',
    },
    {
      title: '60+ Days Battery Life',
      description: '2 full months of morning and evening routines without bulky charger clutter.',
    },
    {
      title: 'Smart Quad-Pacer Timer',
      description: '2-minute clean with 30-second interval guidance across all 4 oral quadrants.',
    },
  ],
  ctaText: 'Get Miroooo X1 + 2 Free Heads',
  videoSrc: '/assets_ref/x/miroooo-feature-video.mp4',
  aspectRatio: '1/1',
  isPortrait: false,
};

export function ProductFeatureVideo({ isX2 }: ProductFeatureVideoProps) {
  const data = isX2 ? X2_DATA : X1_DATA;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, [data.videoSrc]);

  return (
    <section
      id={`product-feature-video-${isX2 ? 'x2' : 'x1'}`}
      className="product-feature-video-section"
      aria-label="Product Features"
    >
      <style>{`
        .product-feature-video-section {
          width: 100%;
          background: #000000;
          color: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04);
          padding: clamp(18px, 2.5vw, 28px) clamp(20px, 3vw, 36px);
          margin: 0 0 clamp(20px, 2.5vw, 28px) 0;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .product-feature-video-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(20px, 3vw, 32px);
          align-items: center;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .product-feature-video-grid {
            grid-template-columns: 1.15fr 0.85fr;
            gap: clamp(28px, 3.5vw, 48px);
            align-items: center;
          }
          .product-feature-video-content {
            order: 1;
            padding-right: clamp(12px, 2vw, 24px);
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .product-feature-video-media {
            order: 2;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        @media (max-width: 1023px) {
          .product-feature-video-media {
            order: 1;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .product-feature-video-content {
            order: 2;
            width: 100%;
          }
        }

        .product-feature-video-frame--portrait {
          width: 100%;
          max-width: clamp(210px, 22vw, 250px);
          aspect-ratio: 9 / 16;
          max-height: clamp(370px, 46vh, 440px);
          border-radius: 24px;
          overflow: hidden;
          background: #0d0d0d;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08);
          position: relative;
          margin: 0 auto;
        }

        .product-feature-video-frame--square {
          width: 100%;
          max-width: clamp(260px, 28vw, 340px);
          aspect-ratio: 1 / 1;
          border-radius: 24px;
          overflow: hidden;
          background: #0d0d0d;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08);
          position: relative;
          margin: 0 auto;
        }

        @media (max-width: 1023px) {
          .product-feature-video-frame--portrait {
            max-width: min(72vw, 240px);
            max-height: 420px;
          }
          .product-feature-video-frame--square {
            max-width: min(80vw, 300px);
          }
        }

        .product-feature-video-player {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        .product-feature-video-heading {
          font-size: clamp(22px, 2.2vw, 32px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0 0 12px 0;
        }

        .product-feature-video-divider {
          width: 56px;
          height: 2px;
          background: rgba(255, 255, 255, 0.25);
          margin-bottom: 16px;
        }

        .product-feature-video-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 0;
        }

        .product-feature-video-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .product-feature-video-bullet {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ffffff;
          margin-top: 6px;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }

        .product-feature-video-item-title {
          font-size: clamp(13.5px, 1.1vw, 15px);
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 2px 0;
          line-height: 1.3;
        }

        .product-feature-video-item-desc {
          font-size: clamp(12px, 0.95vw, 13px);
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.4;
          margin: 0;
        }
      `}</style>

      <div className="product-feature-video-grid">
        {/* Content Column (Left on Desktop, Below on Phone) */}
        <div className="product-feature-video-content">
          <h2 className="product-feature-video-heading">{data.heading}</h2>
          <div className="product-feature-video-divider" />

          <div className="product-feature-video-list">
            {data.points.map((point) => (
              <div key={point.title} className="product-feature-video-item">
                <div className="product-feature-video-bullet" />
                <div>
                  <h3 className="product-feature-video-item-title">{point.title}</h3>
                  <p className="product-feature-video-item-desc">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Column (Right on Desktop, Above on Phone) */}
        <div className="product-feature-video-media">
          <div
            className={
              data.isPortrait
                ? 'product-feature-video-frame--portrait'
                : 'product-feature-video-frame--square'
            }
          >
            <video
              ref={videoRef}
              key={isX2 ? 'x2-feat-video' : 'x1-feat-video'}
              src={data.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              className="product-feature-video-player"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
