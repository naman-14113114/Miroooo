'use client';

import React from 'react';
import Link from 'next/link';

export function StorySection() {
  return (
    <section className="gb-story" aria-labelledby="story-title">
      <Link className="gb-story__media reveal" href="/products/miroooo-x2" style={{ display: 'block' }}>
        <img
          src="/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-complete-set-packaging.webp"
          alt="Miroooo X2 toothbrush, travel case and accessories"
          width={1000}
          height={1000}
          style={{ transition: 'none !important', transform: 'none !important' }}
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="gb-story__content reveal">
        <p className="gb-kicker">Made for real routines</p>
        <h2 id="story-title">Designed for the ritual.</h2>
        <p>
          The best daily objects are the ones you do not have to think about. Miroooo brings together considered
          materials, useful feedback and travel-ready details in a form that feels calm on your counter.
        </p>
        <Link className="gb-button gb-button--dark" href="/products/miroooo-x2">
          <span className="btn-fill" data-fill />
          <span className="btn-text">
            Shop Now <span aria-hidden="true">↗</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
