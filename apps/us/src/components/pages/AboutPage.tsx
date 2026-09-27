'use client';

import React from 'react';
import Link from 'next/link';

export function AboutPage() {
  return (
    <div className="about-page-wrapper">
      <main id="main">
        {/* Hero Section */}
        <section className="about-hero" aria-labelledby="about-hero-heading">
          <img
            src="/assets/about/about-hero-banner.jpg"
            alt="Miroooo Considered Oral Care Lifestyle"
            className="about-hero__bg"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="about-hero__overlay" aria-hidden="true"></div>
          <div className="about-hero__content">
            <span className="about-eyebrow" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>About Miroooo</span>
            <h1 id="about-hero-heading" className="about-hero-title">Welcome to Miroooo</h1>
            <p className="about-hero-copy">
              At Miroooo, we believe daily care should feel considered, not complicated. We engineer quietly precise electric toothbrushes that combine acoustic innovation with minimalist design to make better brushing effortless.
            </p>
          </div>
        </section>

        {/* Section 1: Our Team */}
        <section className="about-section about-section--black" aria-labelledby="our-team-heading">
          <div className="about-shell">
            <div className="about-grid-split">
              <div className="about-media-box">
                <video
                  src="/assets_ref/x2/vbj9qc-h264-hd.mp4"
                  poster="/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-video-thumbnail.webp"
                  className="about-media-element"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  preload="metadata"
                ></video>
              </div>

              <div className="about-text-col">
                <span className="about-eyebrow">Who We Are</span>
                <h2 id="our-team-heading" className="about-section-title">Our Team</h2>
                <p className="about-copy">
                  Behind Miroooo is a dedicated collective of industrial designers, acoustic engineers, and oral care researchers. We don&apos;t just engineer toothbrushes — we use Miroooo every day.
                </p>
                <p className="about-copy">
                  From fine-tuning our 40,000 VPM acoustic motors to designing ultra-light aerospace aluminum handles, our team is united by one purpose: bringing quiet precision and lasting results to your morning and evening ritual.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Our Story & Mission */}
        <section className="about-section about-section--surface" aria-labelledby="story-mission-heading">
          <div className="about-shell">
            <div className="about-grid-split">
              <div className="about-text-col">
                <span className="about-eyebrow">How We Started</span>
                <h2 id="story-mission-heading" className="about-section-title">Our Story &amp; Mission</h2>
                <p className="about-copy">
                  The idea for Miroooo started with frustration over conventional electric toothbrushes — loud, bulky, aggressive, and dependent on frequent charging cords.
                </p>
                <p className="about-copy">
                  We redesigned the instrument from the ground up: 45° Bass sweeping action, pressure-sensor feedback, 60-to-90-day battery endurance, and a balanced, featherlight grip. Today, thousands of customers across the US trust Miroooo for a calmer, more effective clean.
                </p>
              </div>

              <div className="about-media-box">
                <video
                  src="/assets/about/our-team-video.mp4"
                  className="about-media-element"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  preload="metadata"
                ></video>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Trust & Values */}
        <section className="about-section about-section--black" aria-labelledby="trust-heading">
          <div className="about-shell">
            <div className="about-values-header">
              <span className="about-eyebrow">Core Values</span>
              <h2 id="trust-heading" className="about-section-title">Trust and Transparency</h2>
              <p className="about-copy">
                Every decision we make is guided by rigorous acoustic engineering, certified materials, and uncompromised customer protection.
              </p>
            </div>

            <div className="about-values-grid">
              <div className="about-value-card">
                <div className="about-value-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <h3 className="about-value-card__title">Tested for Precision</h3>
                <p className="about-value-card__desc">
                  Every Miroooo brush is rigorously tested with DuPont filaments and balanced acoustic vibration frequencies for safe enamel protection.
                </p>
              </div>

              <div className="about-value-card">
                <div className="about-value-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h3 className="about-value-card__title">Privacy First</h3>
                <p className="about-value-card__desc">
                  256-bit SSL encrypted checkout and 100% secure payment handling. We never store raw payment credentials.
                </p>
              </div>

              <div className="about-value-card">
                <div className="about-value-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="about-value-card__title">Dedicated Support</h3>
                <p className="about-value-card__desc">
                  Our US customer care team is located in Newark, DE, ready to assist with any product questions or order support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Customer Support Banner */}
        <section className="about-section about-section--surface" aria-labelledby="support-banner-heading">
          <div className="about-shell">
            <div className="about-support-card">
              <span className="about-eyebrow" style={{ color: '#666666' }}>US Customer Care</span>
              <h2 id="support-banner-heading" className="about-support-card__title">Customer Support</h2>
              <p className="about-support-card__desc">
                We believe exceptional products require equally exceptional service. Our US-based support team is here to assist with any questions about your brush, replacement heads, or orders.
              </p>

              <div className="about-support-card__meta">
                <a href="mailto:support@trymiroooo.com" className="about-btn-action" style={{ padding: '12px 24px', fontSize: '14.5px' }}>
                  <span className="btn-fill" data-fill></span>
                  <span className="btn-text">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    support@trymiroooo.com
                  </span>
                </a>
                <div className="about-support-pill">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Monday to Friday, 9am - 5pm EST
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Link href="/pages/faqs" className="about-text-link">
                  Visit Support &amp; FAQ Center <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
