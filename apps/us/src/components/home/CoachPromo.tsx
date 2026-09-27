'use client';

import React from 'react';
import Link from 'next/link';

export function CoachPromo() {
  return (
    <section className="gb-coach-promo" aria-labelledby="coach-promo-title">
      <div className="gb-coach-promo__content reveal">
        <p className="gb-kicker">Free customer app</p>
        <h2 id="coach-promo-title">Your routine, made personal.</h2>
        <p>
          Choose your Miroooo, set your priorities and get a practical 28-day plan with guided two-minute sessions,
          progress and brush-head care.
        </p>
        <ul className="gb-coach-promo__proof" aria-label="Smile Coach features">
          <li>
            <span>01</span> Personal 28-day plan
          </li>
          <li>
            <span>02</span> Four-zone brush timer
          </li>
          <li>
            <span>03</span> Private, on-device progress
          </li>
        </ul>
        <Link className="gb-button gb-button--dark" href="/pages/smile-coach">
          <span className="btn-fill" data-fill />
          <span className="btn-text">
            Open Smile Coach <span aria-hidden="true">↗</span>
          </span>
        </Link>
      </div>
      <div className="gb-coach-promo__media reveal">
        <img
          src="/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-smile-coach-app.webp"
          alt="Miroooo X2 toothbrush held beside the Smile Coach app"
          width={1254}
          height={1254}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
