'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { getProduct } from '@/data/products';
import { ProductHero } from './ProductHero';
import { ShippingMarquee } from './ShippingMarquee';
import { HeadsProductHero } from './HeadsProductHero';
import { CustomerStories } from './CustomerStories';
import { EnergyBoostSplit } from './EnergyBoostSplit';
import { CustomerStats } from './CustomerStats';
import { X2ModesSwipe } from './X2ModesSwipe';
import { BrushFunctions } from './BrushFunctions';
import { ProductReviews } from './ProductReviews';
import { ComparisonTable } from './ComparisonTable';
import { DentalAppSection } from './DentalAppSection';
import { PackageContents } from './PackageContents';
import { X2ComparisonTable } from './X2ComparisonTable';
import { ProductFaqs } from './ProductFaqs';
import { ReelsCarousel } from './ReelsCarousel';
import { X1TriCleaningModes } from './X1TriCleaningModes';
import { BrushStylePrecision } from './BrushStylePrecision';
import { DiscoverOralHygiene } from './DiscoverOralHygiene';
import { LuxuriousProfessionalism } from './LuxuriousProfessionalism';
import { ProductStickyNav } from './ProductStickyNav';
import { MinimalProductHero } from './MinimalProductHero';
import { FlosserModesSection } from './FlosserModesSection';
import { FlosserStylePrecision } from './FlosserStylePrecision';
import { DiscoverFlosserHygiene } from './DiscoverFlosserHygiene';
import { FlosserComparisonTable } from './FlosserComparisonTable';

interface ProductPageProps {
  handle: string;
  searchParams?: { color?: string };
  isSimpleBuybox?: boolean;
  isMirooooX1Route?: boolean;
}

export function ProductPage({ handle, searchParams, isSimpleBuybox = false, isMirooooX1Route = true }: ProductPageProps) {
  const isFlosser = handle === 'miroooo-water-flosser' || handle === 'water-flosser';
  const defaultColor = isFlosser ? 'Black' : 'Silver';
  const validColors = isFlosser ? ['Black', 'White'] : ['Silver', 'Grey', 'Pink'];
  const initialColor = validColors.find((color) => color.toLowerCase() === searchParams?.color?.toLowerCase()) || defaultColor;
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const product = getProduct(handle);
  if (!product) {
    notFound();
  }

  const isMinimal =
    handle === 'miroooo-gift-card' ||
    handle === 'gift-card' ||
    handle === 'giftcard' ||
    handle === 'miroooo-package-protection' ||
    handle === 'package-protection' ||
    handle === 'packageprotection';

  if (isMinimal) {
    return (
      <main className="product-page-root minimal-product-page bg-[#080909] min-h-screen text-white">
        <MinimalProductHero product={product} />
      </main>
    );
  }

  const isAccessory =
    handle === 'miroooo-x1-heads' ||
    handle === 'miroooo-x2-heads' ||
    handle === 'wall-mounted-dock' ||
    handle === 'travel-case' ||
    handle === 'x1-charger' ||
    handle === 'miroooo-x1-charging-dock' ||
    handle === 'x1-charging-dock';
  const isX2 = handle === 'miroooo-x2';

  if (isAccessory) {
    return (
      <main className="product-page-root heads-product-page bg-[#080909] min-h-screen text-white">
        <HeadsProductHero product={product} />
      </main>
    );
  }

  return (
    <main className={`product-page-root ${isFlosser ? 'flosser-product-page' : (isX2 ? 'x2-product-page' : 'x1-product-page')} bg-[#080909] min-h-screen text-white`}>
      {/* 0. Top Fixed Section Navigation (Oval Pill Header) */}
      <ProductStickyNav isX2={isX2} isFlosser={isFlosser} />

      {/* 1. Main Product Hero & Buy Box */}
      <ProductHero
        product={product}
        initialColor={initialColor}
        onColorChange={setSelectedColor}
        isSimpleBuybox={isSimpleBuybox}
        isMirooooX1Route={isMirooooX1Route}
      />

      <ShippingMarquee />

      {isFlosser ? (
        /* Miroooo Water Flosser Complete Section Sequence */
        <>
          {/* 4. 4 Intelligent Cleaning Modes */}
          <FlosserModesSection />

          {/* 5. Floss with Style & Precision */}
          <FlosserStylePrecision color={selectedColor} />

          {/* 6. Built for Deep Hygiene & Travel */}
          <DiscoverFlosserHygiene />


          {/* 10. Luxurious Professionalism (95%, 98%, 91% Clinical Proof) */}
          <LuxuriousProfessionalism isFlosser={true} />

          {/* 11. Verified Customer Reviews */}
          <ProductReviews isFlosser={true} isX2={false} />

          {/* 12. Miroooo Dental App (Smile Coach) */}
          <DentalAppSection isX2={false} isFlosser={true} />

          {/* 13. Competitor Comparison Table */}
          <FlosserComparisonTable />

          {/* 14. Package Contents */}
          <PackageContents isFlosser={true} color={selectedColor} />

          {/* 15. Flosser FAQs Accordion */}
          <ProductFaqs isFlosser={true} isX2={false} />
        </>
      ) : isX2 ? (
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

          {/* 7. Verified Customer Reviews */}
          <ProductReviews isX2={true} />

          {/* 8. Miroooo Dental App */}
          <DentalAppSection isX2={true} />

          {/* 9. Competitor Comparison Table */}
          <ComparisonTable isX2={true} />

          {/* 10. Package Contents */}
          <PackageContents isX2={true} color={selectedColor} />

          {/* 11. X2 vs X1 Comparison Table */}
          <X2ComparisonTable />

          {/* 12. Luxury FAQs Accordion */}
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
          <BrushStylePrecision color={selectedColor} />

          {/* 6. Discover the Ultimate Travel-Ready Electric Toothbrush */}
          <DiscoverOralHygiene />

          {/* 7. 3 Brush Functions, 1 Effective Technology */}
          <BrushFunctions isX2={false} color={selectedColor} />

          {/* 8. Luxurious Professionalism */}
          <LuxuriousProfessionalism />

          {/* 9. Verified Customer Reviews */}
          <ProductReviews isX2={false} />

          {/* 10. Miroooo Dental App */}
          <DentalAppSection isX2={false} />

          {/* 11. Competitor Comparison Table */}
          <ComparisonTable isX2={false} />

          {/* 11. Package Contents */}
          <PackageContents isX2={false} />

          {/* 12. Luxury FAQs Accordion */}
          <ProductFaqs isX2={false} />
        </>
      )}
    </main>
  );
}
