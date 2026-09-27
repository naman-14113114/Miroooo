'use client';

import React, { useEffect } from 'react';

interface ProductReviewsProps {
  isX2?: boolean;
}

export function ProductReviews({ isX2 = true }: ProductReviewsProps) {
  useEffect(() => {
    // Dynamic script loading for review engine
    const scriptSrc = isX2 ? '/assets_ref/miroooo-x2-reviews.js' : '/assets_ref/miroooo-reviews.js';
    
    const runInit = () => {
      if (isX2 && typeof (window as unknown as { initMirooooX2Reviews?: () => void }).initMirooooX2Reviews === 'function') {
        (window as unknown as { initMirooooX2Reviews: () => void }).initMirooooX2Reviews();
      } else if (!isX2 && typeof (window as unknown as { initProductReviews?: () => void }).initProductReviews === 'function') {
        (window as unknown as { initProductReviews: () => void }).initProductReviews();
      }
    };

    // Check if script is already present
    const existing = document.getElementById('miroooo-reviews-runtime-script') as HTMLScriptElement | null;
    if (existing && existing.src.includes(scriptSrc)) {
      runInit();
      return;
    }

    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.id = 'miroooo-reviews-runtime-script';
    script.src = scriptSrc;
    script.defer = true;
    script.onload = () => {
      runInit();
    };
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById('miroooo-reviews-runtime-script');
      if (s) s.remove();
    };
  }, [isX2]);

  return (
    <div id="shopify-section-template--24203751129433__reviews" className="shopify-section">
      <section className="miroooo-reviews-section" id="reviews" aria-label="Customer Reviews">
        <div className="miroooo-reviews-container">

          {/* Section Header Eyebrow */}
          <div className="miroooo-section-eyebrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }} aria-hidden="true">
              <img src="/assets/star.png" alt="★" width="14" height="13" style={{ width: '14px', height: '13px', display: 'block', objectFit: 'contain' }} loading="lazy" decoding="async" />
              <img src="/assets/star.png" alt="★" width="14" height="13" style={{ width: '14px', height: '13px', display: 'block', objectFit: 'contain' }} loading="lazy" decoding="async" />
              <img src="/assets/star.png" alt="★" width="14" height="13" style={{ width: '14px', height: '13px', display: 'block', objectFit: 'contain' }} loading="lazy" decoding="async" />
              <img src="/assets/star.png" alt="★" width="14" height="13" style={{ width: '14px', height: '13px', display: 'block', objectFit: 'contain' }} loading="lazy" decoding="async" />
              <img src="/assets/star.png" alt="★" width="14" height="13" style={{ width: '14px', height: '13px', display: 'block', objectFit: 'contain' }} loading="lazy" decoding="async" />
            </div>
            <span>Verified Customer Feedback</span>
          </div>
          <h2 className="miroooo-section-title">What Our Customers Say</h2>

          {/* 1. Header Summary Card */}
          <div className="miroooo-reviews-header-card">
            <div className="miroooo-reviews-header-grid">

              {/* Overall Rating Score */}
              <div className="miroooo-score-col">
                <div className="miroooo-score-number">4.9</div>
                <div className="miroooo-score-stars" aria-label="4.9 out of 5 stars" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <img src="/assets/star.png" alt="★" width="22" height="21" className="miroooo-star-img" style={{ width: '22px', height: '21px', display: 'block', objectFit: 'contain' }} loading="eager" decoding="async" />
                  <img src="/assets/star.png" alt="★" width="22" height="21" className="miroooo-star-img" style={{ width: '22px', height: '21px', display: 'block', objectFit: 'contain' }} loading="eager" decoding="async" />
                  <img src="/assets/star.png" alt="★" width="22" height="21" className="miroooo-star-img" style={{ width: '22px', height: '21px', display: 'block', objectFit: 'contain' }} loading="eager" decoding="async" />
                  <img src="/assets/star.png" alt="★" width="22" height="21" className="miroooo-star-img" style={{ width: '22px', height: '21px', display: 'block', objectFit: 'contain' }} loading="eager" decoding="async" />
                  <img src="/assets/star.png" alt="★" width="22" height="21" className="miroooo-star-img" style={{ width: '22px', height: '21px', display: 'block', objectFit: 'contain' }} loading="eager" decoding="async" />
                </div>
                <div className="miroooo-archive-count">Based on <strong>4,275</strong> verified reviews</div>
                <div className="miroooo-badge-guarantee">
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  100% Authentic Purchases
                </div>
              </div>

              {/* Interactive Rating Breakdown Bars */}
              <div className="miroooo-breakdown-col">
                {/* 5 Star Row */}
                <button type="button" className="miroooo-breakdown-row" data-star="5" aria-label="Show 5 star reviews">
                  <span className="miroooo-row-label">5 <img src="/assets/star.png" alt="★" width="13" height="12" style={{ width: '13px', height: '12px', display: 'inline-block', verticalAlign: 'middle', objectFit: 'contain' }} loading="eager" decoding="async" /></span>
                  <div className="miroooo-progress-track">
                    <div className="miroooo-progress-bar" data-target-width="92%" style={{ width: '92%' }}></div>
                  </div>
                  <span className="miroooo-row-count">(3,933)</span>
                </button>
                {/* 4 Star Row */}
                <button type="button" className="miroooo-breakdown-row" data-star="4" aria-label="Show 4 star reviews">
                  <span className="miroooo-row-label">4 <img src="/assets/star.png" alt="★" width="13" height="12" style={{ width: '13px', height: '12px', display: 'inline-block', verticalAlign: 'middle', objectFit: 'contain' }} loading="eager" decoding="async" /></span>
                  <div className="miroooo-progress-track">
                    <div className="miroooo-progress-bar" data-target-width="6%" style={{ width: '6%' }}></div>
                  </div>
                  <span className="miroooo-row-count">(256)</span>
                </button>
                {/* 3 Star Row */}
                <button type="button" className="miroooo-breakdown-row" data-star="3" aria-label="Show 3 star reviews">
                  <span className="miroooo-row-label">3 <img src="/assets/star.png" alt="★" width="13" height="12" style={{ width: '13px', height: '12px', display: 'inline-block', verticalAlign: 'middle', objectFit: 'contain' }} loading="eager" decoding="async" /></span>
                  <div className="miroooo-progress-track">
                    <div className="miroooo-progress-bar" data-target-width="0.3%" style={{ width: '0.3%' }}></div>
                  </div>
                  <span className="miroooo-row-count">(1)</span>
                </button>
                {/* 2 Star Row */}
                <button type="button" className="miroooo-breakdown-row" data-star="2" aria-label="Show 2 star reviews">
                  <span className="miroooo-row-label">2 <img src="/assets/star.png" alt="★" width="13" height="12" style={{ width: '13px', height: '12px', display: 'inline-block', verticalAlign: 'middle', objectFit: 'contain' }} loading="eager" decoding="async" /></span>
                  <div className="miroooo-progress-track">
                    <div className="miroooo-progress-bar" data-target-width="0.7%" style={{ width: '0.7%' }}></div>
                  </div>
                  <span className="miroooo-row-count">(3)</span>
                </button>
                {/* 1 Star Row */}
                <button type="button" className="miroooo-breakdown-row" data-star="1" aria-label="Show 1 star reviews">
                  <span className="miroooo-row-label">1 <img src="/assets/star.png" alt="★" width="13" height="12" style={{ width: '13px', height: '12px', display: 'inline-block', verticalAlign: 'middle', objectFit: 'contain' }} loading="eager" decoding="async" /></span>
                  <div className="miroooo-progress-track">
                    <div className="miroooo-progress-bar" data-target-width="0.5%" style={{ width: '0.5%' }}></div>
                  </div>
                  <span className="miroooo-row-count">(2)</span>
                </button>
              </div>

              {/* Write Review Action */}
              <div className="miroooo-action-col">
                <div className="miroooo-action-text">Share your brushing experience</div>
                <button type="button" className="miroooo-btn-write" id="miroooo-write-review-btn">
                  <span className="btn-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    <span>Write a Review</span>
                  </span>
                </button>
                <div className="miroooo-satisfaction-pill">
                  <span className="miroooo-green-dot"></span>
                  99.4% Customer Recommendation
                </div>
              </div>

            </div>
          </div>

          {/* 2. Filters Toolbar */}
          <div className="miroooo-toolbar-filters">
            <span className="miroooo-toolbar-heading">Filters</span>

            {/* Star Rating Filter Dropdown */}
            <div className="miroooo-dropdown" id="miroooo-star-dropdown">
              <button type="button" className="miroooo-dropdown-trigger" id="miroooo-star-trigger" aria-haspopup="listbox" aria-expanded="false">
                <span id="miroooo-selected-star-label">All stars</span>
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
              <div className="miroooo-dropdown-menu" id="miroooo-star-menu" role="listbox">
                <div className="miroooo-dropdown-item active" data-value="all" role="option">All stars (4,275)</div>
                <div className="miroooo-dropdown-item" data-value="5" role="option">5 star (3,933)</div>
                <div className="miroooo-dropdown-item" data-value="4" role="option">4 star (256)</div>
                <div className="miroooo-dropdown-item" data-value="3" role="option">3 star (1)</div>
                <div className="miroooo-dropdown-item" data-value="2" role="option">2 star (3)</div>
                <div className="miroooo-dropdown-item" data-value="1" role="option">1 star (2)</div>
              </div>
            </div>

            {/* With Photos Filter Pill */}
            <button type="button" className="miroooo-filter-pill" id="miroooo-filter-photos" aria-pressed="false">
              <span className="miroooo-pill-checkbox">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" width="12" height="12"><path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5L6.5 11.5L12.5 4.5"/></svg>
              </span>
              With photos
            </button>

            {/* Verified Buyer Filter Pill */}
            <button type="button" className="miroooo-filter-pill" id="miroooo-filter-verified" aria-pressed="false">
              <span className="miroooo-pill-checkbox">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" width="12" height="12"><path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5L6.5 11.5L12.5 4.5"/></svg>
              </span>
              Verified purchase
            </button>

            {/* Reset Filter Button */}
            <button type="button" className="miroooo-reset-filter-btn" id="miroooo-reset-filter" style={{ display: 'none' }}>
              Reset filters ✕
            </button>
          </div>

          {/* Active Filter Status Bar */}
          <div className="miroooo-filter-status" id="miroooo-filter-status" style={{ display: 'none' }}>
            <span id="miroooo-status-text">Showing reviews</span>
            <button type="button" id="miroooo-clear-all-link">Clear all</button>
          </div>

          {/* 3. Review Masonry Grid */}
          <div className="miroooo-reviews-grid" id="miroooo-reviews-grid">
            {/* Populated dynamically by review JS engine */}
          </div>

          {/* 4. Empty State */}
          <div className="miroooo-reviews-empty" id="miroooo-reviews-empty" style={{ display: 'none' }}>
            <div className="miroooo-empty-icon">🔍</div>
            <h3>No reviews match your selected filter</h3>
            <p>Try selecting a different rating or clearing your search filters.</p>
            <button type="button" className="miroooo-btn-outline" id="miroooo-empty-reset-btn">
              <span className="btn-text">View All 4,275 Reviews</span>
            </button>
          </div>

          {/* 5. Load More Pagination Container */}
          <div className="miroooo-pagination-container" id="miroooo-pagination-container">
            <button type="button" className="miroooo-btn-load-more" id="miroooo-load-more-btn">
              <span className="btn-text">
                <span>Load More Reviews</span>
                <span className="miroooo-load-count" id="miroooo-load-count">(Showing 12 of 4,275)</span>
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* 6. Customer Photo Lightbox Modal */}
      <div className="miroooo-modal-backdrop" id="miroooo-lightbox-modal" aria-hidden="true" style={{ display: 'none' }}>
        <div className="miroooo-lightbox-dialog no-media" role="dialog" aria-modal="true" aria-label="Customer Review Preview">
          <button type="button" className="miroooo-modal-close" id="miroooo-lightbox-close" aria-label="Close modal">✕</button>

          <div className="miroooo-lightbox-media-container" style={{ display: 'none' }}>
            <img id="miroooo-lightbox-img" className="miroooo-lightbox-img" alt="" loading="eager" decoding="async" />
          </div>

          <div className="miroooo-lightbox-sidebar">
            <div className="miroooo-modal-badge-verified">
              <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Verified Customer Review
            </div>
            <div className="miroooo-modal-header-row">
              <div className="miroooo-modal-stars" id="miroooo-lightbox-stars">★★★★★</div>
              <span className="miroooo-modal-date" id="miroooo-lightbox-date"></span>
            </div>
            <h3 className="miroooo-modal-title" id="miroooo-lightbox-title"></h3>
            <p className="miroooo-modal-body" id="miroooo-lightbox-body"></p>
            <div className="miroooo-modal-footer">
              <div className="miroooo-modal-author">
                <div className="miroooo-avatar-initials" id="miroooo-lightbox-avatar">JV</div>
                <div>
                  <div className="miroooo-modal-name" id="miroooo-lightbox-name">Dr. Julian Vance</div>
                  <div className="miroooo-modal-verified-tag">✓ Verified Buyer</div>
                </div>
              </div>
              <button type="button" className="miroooo-modal-helpful-btn" id="miroooo-lightbox-helpful-btn">
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '12px', height: '12px', display: 'inline-block', verticalAlign: 'middle' }}><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a2 2 0 00-.8 1.4z"/></svg>
                Helpful (<span id="miroooo-lightbox-helpful-count">0</span>)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Write Review Form Modal */}
      <div className="miroooo-modal-backdrop" id="miroooo-write-modal" aria-hidden="true" style={{ display: 'none' }}>
        <div className="miroooo-write-dialog" role="dialog" aria-modal="true" aria-label="Write a Review">
          <button type="button" className="miroooo-modal-close" id="miroooo-write-close" aria-label="Close form modal">✕</button>

          <div className="miroooo-write-header">
            <h3>Write a Review</h3>
            <p>Share your honest feedback on the Miroooo Electric Toothbrush</p>
          </div>

          <form id="miroooo-review-form" className="miroooo-write-form">
            <div className="miroooo-form-group">
              <label>Overall Rating *</label>
              <div className="miroooo-star-rating-input" id="miroooo-form-stars" role="radiogroup">
                <button type="button" className="miroooo-star-btn active" data-rating="1">★</button>
                <button type="button" className="miroooo-star-btn active" data-rating="2">★</button>
                <button type="button" className="miroooo-star-btn active" data-rating="3">★</button>
                <button type="button" className="miroooo-star-btn active" data-rating="4">★</button>
                <button type="button" className="miroooo-star-btn active" data-rating="5">★</button>
                <span className="miroooo-rating-text" id="miroooo-form-rating-label">5.0 - Excellent</span>
              </div>
            </div>

            <div className="miroooo-form-row">
              <div className="miroooo-form-group">
                <label htmlFor="miroooo-form-name">Your Name *</label>
                <input type="text" id="miroooo-form-name" required placeholder="e.g. Sarah Jenkins" className="miroooo-input" />
              </div>
              <div className="miroooo-form-group">
                <label htmlFor="miroooo-form-email">Your Email * (Kept Private)</label>
                <input type="email" id="miroooo-form-email" required placeholder="e.g. sarah@example.com" className="miroooo-input" />
              </div>
            </div>

            <div className="miroooo-form-row">
              <div className="miroooo-form-group">
                <label htmlFor="miroooo-form-variant">Toothbrush Color / Variant</label>
                <select id="miroooo-form-variant" className="miroooo-select">
                  <option value="Grey / Single">Grey / Single</option>
                  <option value="Grey / Double Pack">Grey / Double Pack</option>
                  <option value="Grey / Travel Edition">Grey / Travel Edition</option>
                  <option value="Silver / Single">Silver / Single</option>
                  <option value="Silver / Double Pack">Silver / Double Pack</option>
                  <option value="Silver / Travel Edition">Silver / Travel Edition</option>
                  <option value="Pink / Single">Pink / Single</option>
                  <option value="Pink / Double Pack">Pink / Double Pack</option>
                  <option value="Pink / Travel Edition">Pink / Travel Edition</option>
                </select>
              </div>
              <div className="miroooo-form-group">
                <label htmlFor="miroooo-form-title">Review Headline *</label>
                <input type="text" id="miroooo-form-title" required placeholder="e.g. Genuinely revolutionary clean" className="miroooo-input" />
              </div>
            </div>

            <div className="miroooo-form-group">
              <label htmlFor="miroooo-form-body">Review Details *</label>
              <textarea id="miroooo-form-body" required rows={4} placeholder="How has the Miroooo sonic toothbrush worked for you?" className="miroooo-textarea"></textarea>
            </div>

            <div className="miroooo-form-group">
              <label>Add Photos (Optional)</label>
              <div className="miroooo-file-dropzone" id="miroooo-dropzone">
                <svg className="miroooo-dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px', margin: '0 auto 6px', color: 'var(--miroooo-gold)' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <div style={{ fontSize: '13px', color: '#d1d5db' }}>Click to select photos or drag & drop</div>
                <input type="file" id="miroooo-form-photos" multiple accept="image/*" className="miroooo-file-input" />
              </div>
              <div className="miroooo-preview-thumbs" id="miroooo-preview-thumbs"></div>
            </div>

            <div className="miroooo-form-actions">
              <button type="button" className="miroooo-btn-cancel" id="miroooo-form-cancel">Cancel</button>
              <button type="submit" className="miroooo-btn-submit" id="miroooo-form-submit">Submit Review</button>
            </div>
          </form>

          {/* Success Confirmation */}
          <div className="miroooo-write-success" id="miroooo-write-success" style={{ display: 'none' }}>
            <div className="miroooo-success-icon">✓</div>
            <h3>Thank You For Your Review!</h3>
            <p>Your review has been verified and published to the Miroooo community.</p>
            <button type="button" className="miroooo-btn-primary" id="miroooo-success-close">Continue Browsing</button>
          </div>
        </div>
      </div>
    </div>
  );
}
