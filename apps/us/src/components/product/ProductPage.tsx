'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { getProduct } from '@/data/products';
import { ProductHero } from './ProductHero';
import { HeadsProductHero } from './HeadsProductHero';
import { CustomerStories } from './CustomerStories';
import { EnergyBoostSplit } from './EnergyBoostSplit';
import { CustomerStats } from './CustomerStats';
import { X2ModesSwipe } from './X2ModesSwipe';
import { BrushFunctions } from './BrushFunctions';
import { ArchitectureCollage } from './ArchitectureCollage';
import { ProductReviews } from './ProductReviews';
import { ComparisonTable } from './ComparisonTable';
import { PackageContents } from './PackageContents';
import { X2ComparisonTable } from './X2ComparisonTable';
import { ProductFaqs } from './ProductFaqs';
import { ReelsCarousel } from './ReelsCarousel';
import { X1TriCleaningModes } from './X1TriCleaningModes';
import { BrushStylePrecision } from './BrushStylePrecision';
import { DiscoverOralHygiene } from './DiscoverOralHygiene';
import { LuxuriousProfessionalism } from './LuxuriousProfessionalism';

interface ProductPageProps {
  handle: string;
  searchParams?: { color?: string };
}

export function ProductPage({ handle, searchParams }: ProductPageProps) {
  const product = getProduct(handle);
  if (!product) {
    notFound();
  }

  const isHeads = handle === 'miroooo-x1-heads' || handle === 'miroooo-x2-heads';
  const isX2 = handle === 'miroooo-x2';
  const initialColor = searchParams?.color || 'Silver';

  if (isHeads) {
    return (
      <main className="product-page-root bg-[#080909] min-h-screen text-white">
        <HeadsProductHero product={product} />
        <ProductFaqs isX2={handle === 'miroooo-x2-heads'} />
      </main>
    );
  }

  return (
    <main className="product-page-root bg-[#080909] min-h-screen text-white">
      {/* 1. Main Product Hero & Buy Box */}
      <ProductHero product={product} initialColor={initialColor} />

      {/* 2. Marquee Text Strip */}
      <div id="shopify-section-template--24203751129433__scrolling_text_P3gRex" className="shopify-section scrolling-text-section">
        <div className="section section--padding" style={{ padding: '36px 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="relative z-1 overflow-hidden">
            <div className="miroooo-announcement-ticker" style={{ fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#ffffff' }}>
              <div className="miroooo-ticker-item"><span>Free tracked US delivery</span> <span className="miroooo-ticker-dot" aria-hidden="true"></span></div>
              <div className="miroooo-ticker-item"><span>50% OFF Today</span> <span className="miroooo-ticker-dot" aria-hidden="true"></span></div>
              <div className="miroooo-ticker-item"><span>Ultra Lightweight (51g)</span> <span className="miroooo-ticker-dot" aria-hidden="true"></span></div>
              <div className="miroooo-ticker-item"><span>4.9 Stars from 40,000+ Customers</span> <span className="miroooo-ticker-dot" aria-hidden="true"></span></div>
              <div className="miroooo-ticker-item"><span>90-Day Battery Life</span> <span className="miroooo-ticker-dot" aria-hidden="true"></span></div>
              <div className="miroooo-ticker-item"><span>45° Bass Sweep Motion</span> <span className="miroooo-ticker-dot" aria-hidden="true"></span></div>
            </div>
          </div>
        </div>
      </div>

      {isX2 ? (
        /* Miroooo X2 Complete Section Sequence */
        <>
          {/* 3. Real Customer Stories & Experiences Carousel */}
          <CustomerStories />

          {/* 4. Built for Travel Split Section */}
          <EnergyBoostSplit />

          {/* 5. Customer Satisfaction Circular Metric Counters */}
          <CustomerStats />

          {/* 6. Stacking 3-Mode Cards */}
          <X2ModesSwipe />

          {/* 7. 3 Brush Functions, 1 Effective Technology */}
          <BrushFunctions />

          {/* 8. Engineering Architecture Schematic */}
          <ArchitectureCollage />

          {/* 9. Verified Customer Reviews */}
          <ProductReviews isX2={true} />

          {/* 10. Competitor Comparison Table */}
          <ComparisonTable isX2={true} />

          {/* 11. Package Contents */}
          <PackageContents isX2={true} />

          {/* 12. X2 vs X1 Comparison Table */}
          <X2ComparisonTable />

          {/* 13. Luxury FAQs Accordion */}
          <ProductFaqs isX2={true} />
        </>
      ) : (
        /* Miroooo X1 Complete Section Sequence */
        <>
          {/* 3. Video Demonstration Reels Slider */}
          <ReelsCarousel />

          {/* 4. Miroooo X1 Tri Cleaning Modes */}
          <X1TriCleaningModes />

          {/* 5. Brush with Style & Precision */}
          <BrushStylePrecision />

          {/* 6. Discover the Ultimate Travel-Ready Electric Toothbrush */}
          <DiscoverOralHygiene />

          {/* 7. Luxurious Professionalism */}
          <LuxuriousProfessionalism />

          {/* 8. Verified Customer Reviews */}
          <ProductReviews isX2={false} />

          {/* 9. Competitor Comparison Table */}
          <ComparisonTable isX2={false} />

          {/* 10. Package Contents */}
          <PackageContents isX2={false} />

          {/* 11. Luxury FAQs Accordion */}
          <ProductFaqs isX2={false} />
        </>
      )}
    </main>
  );
}
