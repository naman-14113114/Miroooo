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
import { FreeGiftsSection } from './FreeGiftsSection';

interface ProductPageProps {
  handle: string;
  searchParams?: { color?: string };
  isSimpleBuybox?: boolean;
}

export function ProductPage({ handle, searchParams, isSimpleBuybox = false }: ProductPageProps) {
  const defaultColor = handle === 'miroooo-x2' ? 'Silver' : 'Pink';
  const initialColor = ['Silver', 'Grey', 'Pink'].find((color) => color.toLowerCase() === searchParams?.color?.toLowerCase()) || defaultColor;
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const product = getProduct(handle);
  if (!product) {
    notFound();
  }

  const isHeads = handle === 'miroooo-x1-heads' || handle === 'miroooo-x2-heads';
  const isX2 = handle === 'miroooo-x2';

  if (isHeads) {
    return (
      <main className="product-page-root heads-product-page bg-[#080909] min-h-screen text-white">
        <HeadsProductHero product={product} />
      </main>
    );
  }

  return (
    <main className={`product-page-root ${isX2 ? 'x2-product-page' : 'x1-product-page'} bg-[#080909] min-h-screen text-white`}>
      {/* 1. Main Product Hero & Buy Box */}
      <ProductHero
        product={product}
        initialColor={initialColor}
        onColorChange={setSelectedColor}
        isSimpleBuybox={isSimpleBuybox}
      />

      <ShippingMarquee />

      {isSimpleBuybox && <FreeGiftsSection isX2={isX2} />}

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

          {/* 7. Engineering Architecture Schematic */}
          <ArchitectureCollage />

          {/* 8. Verified Customer Reviews */}
          <ProductReviews isX2={true} />

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

          {/* 10. Competitor Comparison Table */}
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
