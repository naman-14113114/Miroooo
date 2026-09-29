'use client';

import React from 'react';
import Link from 'next/link';
import { FeatureSplitSectionData } from '@/data/home';

interface FeatureSplitSectionProps {
  data: FeatureSplitSectionData;
}

export function FeatureSplitSection({ data }: FeatureSplitSectionProps) {
  const isReverse = data.isReverse;
  const isPortrait = data.videoAspect === '9/16';

  return (
    <section
      className={`gb-video-feature-section section--dark ${isReverse ? 'gb-hero' : ''}`}
      id={data.id}
      aria-labelledby={`${data.id}-title`}
    >
      <div className="gb-video-feature-container">
        <div className={`gb-video-feature-grid ${isReverse ? 'gb-video-feature-grid--reverse' : ''}`}>
          {/* Text Column */}
          <div className="gb-video-feature-content reveal">
            <p className="gb-kicker">{data.kicker}</p>
            <h2 id={`${data.id}-title`} className="gb-video-feature-heading">
              {data.heading}
            </h2>
            <div className="gb-video-feature-divider" />
            {data.lead && <p className="gb-video-feature-lead">{data.lead}</p>}

            <div className="gb-video-feature-list">
              {data.points.map((point) => (
                <div key={point.title} className="gb-video-feature-item">
                  <div className="gb-video-feature-bullet" />
                  <div className="gb-video-feature-text">
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="gb-video-feature-action">
              <Link className="gb-button gb-button--light" href={data.ctaHref} data-product-link>
                <span className="btn-fill" data-fill />
                <span className="btn-text">
                  {data.ctaText} <span aria-hidden="true">↗</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Video Column */}
          <div className="gb-video-feature-media reveal">
            <div className={isPortrait ? 'gb-video-feature-box--portrait' : 'gb-video-feature-box'}>
              <video
                className="gb-video-feature-player"
                src={data.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                preload="none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
