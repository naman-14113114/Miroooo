'use client';

import React from 'react';
import Link from 'next/link';

export function AboutPage() {
  return (
    <div className="about-page-wrapper">
      <main id="main">
        {/* HERO BANNER SECTION (Restored Reception / London Studio Image) */}
        <header className="about-hero" aria-labelledby="about-hero-title">
          <img
            src="/assets/about/about-hero-banner.jpg"
            alt="Miroooo Reception & London Headquarters"
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

              {/* Clean Trust Signals (No Royal Mail) */}
              <div className="about-hero-pills">
                <span className="about-hero-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  40,000 VPM Precision
                </span>
                <span className="about-hero-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  51g Aerospace Aluminium
                </span>
                <span className="about-hero-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  90-Day USB-C Battery
                </span>
                <span className="about-hero-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  London Studio
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* SECTION 1: OUR TEAM (Who We Are) */}
        <section className="about-section about-section--black" aria-labelledby="our-team-title">
          <div className="about-ambient-glow about-ambient-glow--1" aria-hidden="true" />
          <div className="about-shell">
            <div className="about-grid-split">
              {/* Left: 1:1 Aspect Ratio Video */}
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
                  researchers. We don&apos;t just engineer toothbrushes — we use Miroooo every day.
                </p>
                <p className="about-copy">
                  From fine-tuning our 40,000 VPM acoustic motors to designing ultra-light aerospace aluminum handles,
                  our team is united by one purpose: bringing quiet precision and lasting results to your morning and
                  evening ritual.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR STORY & MISSION (How We Started) */}
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
                  aggressive on gums, and dependent on frequent charging cords.
                </p>
                <p className="about-copy">
                  We knew acoustic micro-vibration cleaning provided superior plaque removal, but available options
                  lacked refinement. So we redesigned the instrument from the ground up: 45° Bass sweeping action,
                  pressure-sensor feedback, 60-to-90-day cobalt cell endurance, and a balanced, featherlight grip.
                </p>
                <p className="about-copy">
                  Today, thousands of customers across the UK trust Miroooo for a calmer, more effective clean.
                </p>
              </div>

              {/* Right: 1:1 Aspect Ratio Team Video */}
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
                  Every Miroooo brush is rigorously tested with DuPont™ bristles and balanced acoustic vibration
                  frequencies for safe enamel protection. Certified UKCA, CE, and IPX7 100% waterproof.
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
                  256-bit encrypted checkout and 100% secure payment handling. Customer information is managed
                  strictly in accordance with UK GDPR.
                </p>
              </article>

              {/* Value Card 3: 30-Day Risk-Free Trial */}
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
                <h3 className="about-val-title">30-Day Risk-Free Trial</h3>
                <p className="about-val-copy">
                  Experience Miroooo at home for 30 days. If you don&apos;t love the calmer acoustic clean, return it for a
                  full refund. Backed by our 1-Year UK Warranty.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION 4: OUR INSTRUMENTS (THE CLEAN PRODUCT BRIDGE - X1 & X2) */}
        <section className="about-section about-section--surface" aria-labelledby="collection-title">
          <div className="about-shell">
            <div className="about-values-header reveal">
              <p className="about-eyebrow">OUR INSTRUMENTS</p>
              <h2 id="collection-title" className="about-section-title">
                Explore the Miroooo Range
              </h2>
              <p className="about-copy">
                Quiet acoustic precision engineered for modern daily life. Compare our models and choose the clean that fits your routine.
              </p>
            </div>

            <div className="about-collection-grid">
              {/* Product 1: Miroooo X1 */}
              <article className="about-col-card reveal">
                <div className="about-col-media">
                  <img
                    src="/assets_ref/x/gallery/miroooo-x1-sonic-electric-toothbrush-silver-aerospace-aluminium-body.webp"
                    alt="Miroooo X1 Sonic Electric Toothbrush in Silver"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="about-col-badge">MINIMALIST EVERYDAY</span>
                </div>
                <div className="about-col-content">
                  <h3 className="about-col-title">Miroooo X1</h3>
                  <p className="about-col-desc">
                    Ultra-light 51g aerospace aluminium unibody with 3 acoustic brushing modes and 60-day battery endurance.
                  </p>
                  <ul className="about-col-bullets">
                    <li>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>3 Sonic Cleaning Modes</span>
                    </li>
                    <li>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>51g Aerospace Aluminium</span>
                    </li>
                    <li>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>60-Day USB-C Battery</span>
                    </li>
                  </ul>
                  <div className="about-col-footer">
                    <span className="about-col-price">From £49.00</span>
                    <Link href="/products/miroooo-x1" className="about-col-btn">
                      <span>Explore Miroooo X1</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>

              {/* Product 2: Miroooo X2 (Flagship Bestseller - Priority) */}
              <article className="about-col-card about-col-card--featured reveal">
                <div className="about-col-media">
                  <img
                    src="/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-complete-set-packaging.webp"
                    alt="Miroooo X2 Flagship Acoustic Sonic Toothbrush with Free Gifts"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="about-col-badge about-col-badge--featured">BESTSELLER · 50% OFF TODAY</span>
                </div>
                <div className="about-col-content">
                  <h3 className="about-col-title">Miroooo X2 Flagship</h3>
                  <p className="about-col-desc">
                    45° Bass sweeping action with Smart Red Halo Pressure Sensor, 90-day cobalt cell, and 3 free gifts.
                  </p>
                  <ul className="about-col-bullets">
                    <li>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span><strong>Smart Red Halo:</strong> Visual pressure protection</span>
                    </li>
                    <li>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span><strong>40,000 VPM:</strong> Under 45 dB acoustic hum</span>
                    </li>
                    <li>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span><strong>90-Day Battery:</strong> Includes Travel Case + Wall Mount</span>
                    </li>
                  </ul>
                  <div className="about-col-footer">
                    <div className="about-col-price-stack">
                      <span className="about-col-price">From £69.00</span>
                      <span className="about-col-compare">£140.00</span>
                    </div>
                    <Link href="/products/miroooo-x2" className="about-col-btn about-col-btn--primary">
                      <span>Explore Miroooo X2</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION 5: CUSTOMER SUPPORT & LONDON HQ (Centered Box) */}
        <section className="about-section about-section--black" aria-labelledby="support-title">
          <div className="about-shell">
            <div className="about-support-container reveal">
              <div className="about-support-card">
                <p className="about-eyebrow">SUPPORT &amp; HEADQUARTERS</p>
                <h2 id="support-title" className="about-section-title">
                  Customer Support
                </h2>
                <p className="about-copy" style={{ maxWidth: '620px', margin: '0 auto 16px' }}>
                  We believe exceptional products require equally exceptional service. Our UK-based support team is here
                  to assist with any questions about your brush, replacement heads, or orders.
                </p>

                <p className="about-address-text" style={{ fontSize: '0.875rem', color: '#666666', marginBottom: '24px' }}>
                  <strong>Miroooo UK:</strong> 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom
                </p>

                <div className="about-support-pills">
                  <a className="about-contact-pill about-contact-pill--primary" href="mailto:support@trymiroooo.com">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      style={{ width: '16px', height: '16px' }}
                      aria-hidden="true"
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
