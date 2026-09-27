'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShowcaseProductFinish } from '@/data/home';

interface ShowcaseGridProps {
  id: string;
  kicker: string;
  title: string;
  finishes: ShowcaseProductFinish[];
}

export function ShowcaseGrid({ id, kicker, title, finishes }: ShowcaseGridProps) {
  return (
    <section className="gb-product-showcase section--dark" id={id} aria-labelledby={`${id}-title`}>
      <div className="gb-product-showcase__header reveal">
        <div>
          <p className="gb-kicker">{kicker}</p>
          <h2 id={`${id}-title`}>{title}</h2>
        </div>
        <Link className="gb-text-link gb-text-link--light" href="/shop">
          View all products <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="gb-product-grid" data-drag-scroll tabIndex={0} aria-label={`${title} Color Finishes`}>
        {finishes.map((finish) => (
          <FinishCard key={finish.name} finish={finish} />
        ))}
      </div>
    </section>
  );
}

function FinishCard({ finish }: { finish: ShowcaseProductFinish }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const images = finish.images || [];
  const totalSlides = images.length;

  return (
    <article className="gb-product-card reveal">
      <div className="gb-product-card__media" data-slide-gallery>
        <Link
          className="gb-product-card__media-link"
          href={`/products/${finish.handle}?color=${finish.color}`}
          data-product-link
          aria-label={`View ${finish.name}`}
        >
          <span className="badge badge--onsale">Save 50%</span>
          <div className="product-card__rating">
            <svg className="icon icon-star icon-xs" viewBox="0 0 16 16" fill="#f59e0b" width="11" height="11">
              <path d="M8 0L9.88914 5.81283H16L11.056 9.40604L12.9452 15.2177L8 11.6245L3.05603 15.2177L4.94397 9.40484L0 5.81163H6.11086L8 0Z" />
            </svg>
            <span>{finish.rating}</span>
          </div>

          <div
            className="gb-product-card__track"
            style={{
              width: `${totalSlides * 100}%`,
              transform: `translateX(-${(slideIndex * 100) / totalSlides}%)`,
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {images.map((imgSrc, idx) => (
              <div
                key={imgSrc + idx}
                className="gb-product-card__slide"
                style={{ width: `${100 / totalSlides}%` }}
              >
                <img
                  src={imgSrc}
                  alt={`${finish.name} view ${idx + 1}`}
                  width={700}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          {totalSlides > 1 && (
            <div
              className="flickity-page-dots"
              aria-hidden="true"
              style={{ pointerEvents: 'auto' }}
            >
              {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSlideIndex(dotIdx);
                  }}
                  className={`dot ${slideIndex === dotIdx ? 'is-selected' : ''}`}
                  aria-label={`View slide ${dotIdx + 1}`}
                  style={{ border: 'none', cursor: 'pointer', padding: 0 }}
                />
              ))}
            </div>
          )}
        </Link>

        <Link
          href={`/products/${finish.handle}?color=${finish.color}`}
          className="quick-view__button"
          aria-label={`Quick view ${finish.name}`}
          data-product-link
        >
          <span className="btn-fill" data-fill />
          <span className="btn-text">
            <svg className="icon icon-eye" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path
                d="M18.3334 10C18.3334 12.0833 15.8334 16.6667 10 16.6667C4.16669 16.6667 1.66669 12.0833 1.66669 10C1.66669 7.91668 4.16669 3.33334 10 3.33334C15.8334 3.33334 18.3334 7.91668 18.3334 10Z"
                strokeLinecap="round"
              />
              <path
                d="M12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61931 12.5 7.50002 11.3807 7.50002 10C7.50002 8.6193 8.61931 7.50001 10 7.50001C11.3807 7.50001 12.5 8.6193 12.5 8.6193Z"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </Link>
      </div>

      <div className="gb-product-card__meta">
        <h3 className="gb-product-card__name">
          <Link href={`/products/${finish.handle}?color=${finish.color}`}>
            {finish.name}
          </Link>
        </h3>
        <div className="gb-product-card__price-wrap">
          <strong className="gb-product-card__price">{finish.formattedPrice}</strong>
          <span className="gb-product-card__compare">{finish.formattedCompareAt}</span>
        </div>
      </div>
    </article>
  );
}
