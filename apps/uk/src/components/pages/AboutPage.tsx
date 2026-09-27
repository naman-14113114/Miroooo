'use client';

import React from 'react';
import Link from 'next/link';

export function AboutPage() {
  return (
    <div className="about-page-wrapper">
      <main id="main">
        {/* HERO BANNER SECTION */}
        <header className="about-hero" aria-labelledby="about-hero-title">
          <img
            src="/assets/about/about-hero-banner.jpg"
            alt="Miroooo Considered Oral Care"
            className="about-hero__bg"
            loading="eager"
            decoding="async"
          />
          <div className="about-hero__overlay" aria-hidden="true" />

          <div className="about-shell">
            <div className="about-hero__content reveal">
              <p className="about-eyebrow">ABOUT MIROOOO</p>
              <h1 id="about-hero-title" className="about-hero-title">
                Welcome to Miroooo
              </h1>
              <p className="about-hero-copy">
                At Miroooo, we believe daily care should feel considered, not complicated. We engineer quietly precise
                electric toothbrushes that combine acoustic innovation with minimalist design to make better brushing
                effortless.
              </p>
            </div>
          </div>
        </header>

        {/* SECTION 1: OUR TEAM (Video on Left, Text on Right) */}
        <section className="about-section about-section--black" aria-labelledby="our-team-title">
          <div className="about-ambient-glow about-ambient-glow--1" aria-hidden="true" />
          <div className="about-shell">
            <div className="about-grid-split">
              {/* Left: 1:1 Aspect Ratio HTML5 Video */}
              <div className="about-media-col reveal">
                <div className="about-media-box">
                  <video
                    src="/assets_ref/x2/vbj9qc-h264-hd.mp4"
                    poster="/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-video-thumbnail.webp"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    preload="none"
                    className="about-media-element"
                    aria-label="Miroooo X2 Sonic Electric Toothbrush Video"
                  />
                </div>
              </div>

              {/* Right: Text Content */}
              <div className="about-text-col reveal">
                <p className="about-eyebrow">WHO WE ARE</p>
                <h2 id="our-team-title" className="about-section-title">
                  Our Team
                </h2>
                <p className="about-copy">
                  Behind Miroooo is a dedicated collective of industrial designers, acoustic engineers, and oral care
                  researchers. We don&apos;t just engineer toothbrushes — we use Miroooo every day. From fine-tuning our
                  40,000 VPM acoustic motors to designing ultra-light aerospace aluminum handles, our team is united by
                  one purpose: bringing quiet precision and lasting results to your morning and evening ritual.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR STORY & MISSION (Text on Left, Video on Right) */}
        <section className="about-section about-section--surface" aria-labelledby="our-story-title">
          <div className="about-ambient-glow about-ambient-glow--2" aria-hidden="true" />
          <div className="about-shell">
            <div className="about-grid-split">
              {/* Left: Text Content */}
              <div className="about-text-col reveal">
                <p className="about-eyebrow">HOW WE STARTED</p>
                <h2 id="our-story-title" className="about-section-title">
                  Our Story &amp; Mission
                </h2>
                <p className="about-copy">
                  The idea for Miroooo started with frustration over conventional electric toothbrushes — loud, bulky,
                  aggressive, and dependent on frequent charging cords.
                </p>
                <p className="about-copy">
                  We knew acoustic micro-vibration cleaning provided superior plaque removal, but available options
                  lacked refinement. So we redesigned the instrument from the ground up: 45° Bass sweeping action,
                  pressure-sensor feedback, 60-to-90-day cobalt cell endurance, and a balanced, featherlight grip.
                  Today, thousands of customers across the UK trust Miroooo for a calmer, more effective clean.
                </p>
              </div>

              {/* Right: 1:1 Aspect Ratio HTML5 Video */}
              <div className="about-media-col reveal">
                <div className="about-media-box">
                  <video
                    src="/assets/about/our-team-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    preload="none"
                    className="about-media-element"
                    aria-label="Miroooo engineering and product demonstration video"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TRUST AND TRANSPARENCY (Values Section) */}
        <section className="about-section about-section--black" aria-labelledby="values-title">
          <div className="about-shell">
            <div className="about-values-header reveal">
              <p className="about-eyebrow">VALUES</p>
              <h2 id="values-title" className="about-section-title">
                Trust and Transparency
              </h2>
              <p className="about-copy">
                Every decision we make is guided by rigorous acoustic engineering, certified materials, and
                uncompromised customer protection.
              </p>
            </div>

            <div className="about-values-grid">
              {/* Value Card 1: Tested for Precision */}
              <article className="about-val-card reveal">
                <div className="about-card-icon-wrap" aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M17 5v14M7 5v14M22 9v6M2 9v6" />
                  </svg>
                </div>
                <h3 className="about-val-title">Tested for Precision</h3>
                <p className="about-val-copy">
                  Every Miroooo brush is rigorously tested with DuPont bristles and balanced acoustic vibration
                  frequencies for safe enamel protection.
                </p>
              </article>

              {/* Value Card 2: Privacy First */}
              <article className="about-val-card reveal">
                <div className="about-card-icon-wrap" aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="about-val-title">Privacy First</h3>
                <p className="about-val-copy">
                  256-bit encrypted checkout and 100% secure payment handling.
                </p>
              </article>

              {/* Value Card 3: Dedicated Support */}
              <article className="about-val-card reveal">
                <div className="about-card-icon-wrap" aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <h3 className="about-val-title">Dedicated Support</h3>
                <p className="about-val-copy">
                  Our customer care team is based in London, ready to assist with any product questions or order support.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION 4: CUSTOMER SUPPORT (Centered Box) */}
        <section className="about-section about-section--surface" aria-labelledby="support-title">
          <div className="about-shell">
            <div className="about-support-container reveal">
              <div className="about-support-card">
                <p className="about-eyebrow">SUPPORT</p>
                <h2 id="support-title" className="about-section-title">
                  Customer Support
                </h2>
                <p className="about-copy" style={{ maxWidth: '620px', margin: '0 auto 24px' }}>
                  We believe exceptional products require equally exceptional service. Our UK-based support team is here
                  to assist with any questions about your brush, replacement heads, or orders.
                </p>

                <div className="about-support-pills">
                  <a className="about-contact-pill about-contact-pill--primary" href="mailto:support@trymiroooo.com">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      style={{ width: '16px', height: '16px' }}
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>support@trymiroooo.com</span>
                  </a>

                  <span className="about-contact-pill about-contact-pill--outline">
                    <svg
                      className="about-pill-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Monday to Friday, 9am - 5pm GMT</span>
                  </span>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <Link href="/pages/faqs" className="about-btn-action">
                    <span className="btn-fill" data-fill />
                    <span className="btn-text">
                      <span>Visit Support &amp; FAQ Center</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
