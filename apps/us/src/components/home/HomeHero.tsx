import React from 'react';
import Link from 'next/link';
import { HOME_HERO_DATA } from '@/data/home';

export function HomeHero() {
  return (
    <section className="gb-video-hero" aria-labelledby="video-hero-title">
      <div className="gb-video-hero__media" aria-hidden="true">
        <video
          id="hero-featured-video"
          className="w-full h-full object-cover"
          poster={HOME_HERO_DATA.posterSrc}
          src={HOME_HERO_DATA.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
      <div className="gb-video-hero__shade" aria-hidden="true" />
      <div className="gb-video-hero__content">
        <p className="gb-kicker" data-hero-reveal>
          {HOME_HERO_DATA.kicker}
        </p>
        <h1 id="video-hero-title" className="gb-video-hero__title" aria-label="Brushing, elevated to ritual.">
          <span className="gb-word" data-hero-word>
            Brushing,
          </span>{' '}
          <span className="gb-word" data-hero-word>
            elevated
          </span>{' '}
          <span className="gb-word" data-hero-word>
            to ritual.
          </span>
        </h1>
        <p className="gb-video-hero__copy" data-hero-reveal>
          {HOME_HERO_DATA.copy}
        </p>
        <div className="gb-video-hero__actions" data-hero-reveal>
          <Link className="gb-button gb-button--light" href={HOME_HERO_DATA.ctaPrimaryHref} data-product-link>
            <span className="btn-fill" data-fill />
            <span className="btn-text">
              {HOME_HERO_DATA.ctaPrimaryText} <span aria-hidden="true">↗</span>
            </span>
          </Link>
          <Link className="gb-text-link gb-text-link--light" href={HOME_HERO_DATA.ctaSecondaryHref}>
            {HOME_HERO_DATA.ctaSecondaryText} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <a className="gb-scroll-cue" href="#finish-range-x2" aria-label="Continue to product showcase">
        <span />
      </a>
    </section>
  );
}
