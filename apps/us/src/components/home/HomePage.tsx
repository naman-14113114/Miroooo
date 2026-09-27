'use client';

import React from 'react';
import { HomeHero } from './HomeHero';
import { ShowcaseGrid } from './ShowcaseGrid';
import { FeatureSplitSection } from './FeatureSplitSection';
import { CoachPromo } from './CoachPromo';
import { StorySection } from './StorySection';
import {
  X2_FINISHES,
  X1_FINISHES,
  X2_FEATURE_SECTION,
  X1_FEATURE_SECTION,
} from '@/data/home';

export function HomePage() {
  return (
    <main id="main">
      {/* 1. Full Screen Hero with Video */}
      <HomeHero />

      {/* 2. Miroooo X2 Finish Showcase */}
      <ShowcaseGrid
        id="finish-range-x2"
        kicker="Choose Your Finish"
        title="Miroooo X2 Electric Toothbrush"
        finishes={X2_FINISHES}
      />

      {/* 3. Flagship Miroooo X2 Feature Split Section */}
      <FeatureSplitSection data={X2_FEATURE_SECTION} />

      {/* 4. Miroooo Standard Ritual Feature Section */}
      <FeatureSplitSection data={X1_FEATURE_SECTION} />

      {/* 5. Miroooo X1 Finish Showcase */}
      <ShowcaseGrid
        id="finish-range"
        kicker="Choose Your Finish"
        title="Miroooo X1 Electric Toothbrush"
        finishes={X1_FINISHES}
      />

      {/* 6. Free Smile Coach App Promo Banner */}
      <CoachPromo />

      {/* 7. Designed For The Ritual Story Section */}
      <StorySection />
    </main>
  );
}
