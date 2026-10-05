export interface HomeHeroData {
  kicker: string;
  titleWords: string[];
  copy: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  videoSrc: string;
  posterSrc: string;
}

export interface ShowcaseProductFinish {
  handle: string;
  name: string;
  color: 'Pink' | 'Grey' | 'Silver';
  price: number;
  compareAt: number;
  formattedPrice: string;
  formattedCompareAt: string;
  rating: number;
  images: string[];
}

export interface FeatureSplitSectionData {
  id: string;
  kicker: string;
  heading: string;
  lead: string;
  ctaText: string;
  ctaHref: string;
  videoSrc: string;
  videoAspect: '1/1' | '9/16';
  isReverse?: boolean;
  points: Array<{
    title: string;
    description: string;
  }>;
}

export const HOME_HERO_DATA: HomeHeroData = {
  kicker: 'Electric Toothbrushes',
  titleWords: ['Brushing,', 'elevated', 'to ritual.'],
  copy: 'Ultra-precise acoustic vibration, aerospace aluminium finish, and up to 90 days of battery life without bathroom clutter.',
  ctaPrimaryText: 'Shop Miroooo X2',
  ctaPrimaryHref: '/products/miroooo-x2',
  ctaSecondaryText: 'Dental Care Quiz',
  ctaSecondaryHref: '/pages/dentalcare-quiz',
  videoSrc: '/assets_ref/x/gallery/miroooo-video-1.mp4',
  posterSrc: '/assets/home/hero-video-poster.webp',
};

export const X2_FINISHES: ShowcaseProductFinish[] = [
  {
    handle: 'miroooo-x2',
    name: 'Miroooo X2 Pink',
    color: 'Pink',
    price: 69,
    compareAt: 139,
    formattedPrice: '£69',
    formattedCompareAt: '£139',
    rating: 4.9,
    images: [
      '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-upright-grip.webp',
      '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-in-hand.webp',
      '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-complete-set-packaging.webp',
    ],
  },
  {
    handle: 'miroooo-x2',
    name: 'Miroooo X2 Grey',
    color: 'Grey',
    price: 69,
    compareAt: 139,
    formattedPrice: '£69',
    formattedCompareAt: '£139',
    rating: 4.9,
    images: [
      '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-upright-grip.webp',
      '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-in-hand.webp',
      '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-complete-set-packaging.webp',
    ],
  },
  {
    handle: 'miroooo-x2',
    name: 'Miroooo X2 Silver',
    color: 'Silver',
    price: 69,
    compareAt: 139,
    formattedPrice: '£69',
    formattedCompareAt: '£139',
    rating: 4.8,
    images: [
      '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp',
      '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp',
      '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-complete-set-packaging.webp',
    ],
  },
];

export const X1_FINISHES: ShowcaseProductFinish[] = [
  {
    handle: 'miroooo-x',
    name: 'Miroooo X1 Pink',
    color: 'Pink',
    price: 59,
    compareAt: 129,
    formattedPrice: '£59',
    formattedCompareAt: '£129',
    rating: 4.8,
    images: [
      '/gallery_orig/RoseGold-color-1.jpg',
      '/gallery_orig/RoseGold-color-2.jpg',
      '/gallery_orig/RoseGold-color-6.jpg',
    ],
  },
  {
    handle: 'miroooo-x',
    name: 'Miroooo X1 Grey',
    color: 'Grey',
    price: 59,
    compareAt: 129,
    formattedPrice: '£59',
    formattedCompareAt: '£129',
    rating: 4.5,
    images: [
      '/gallery_orig/Grey-color-8.jpg',
      '/gallery_orig/Grey-color-1.jpg',
      '/gallery_orig/Grey-color-5.jpg',
    ],
  },
  {
    handle: 'miroooo-x',
    name: 'Miroooo X1 Silver',
    color: 'Silver',
    price: 59,
    compareAt: 129,
    formattedPrice: '£59',
    formattedCompareAt: '£129',
    rating: 4.4,
    images: [
      '/gallery_orig/Silver-color-1.jpg',
      '/gallery_orig/Silver-color-2.jpg',
      '/gallery_orig/Silver-color-6.jpg',
    ],
  },
];

export const X2_FEATURE_SECTION: FeatureSplitSectionData = {
  id: 'x2-showcase',
  kicker: 'Miroooo X2 Flagship',
  heading: 'Precision. Without The Noise.',
  lead: 'Engineered for deep plaque removal with ultra-lightweight aerospace aluminium, travel-ready protection, and up to 90 days on a single charge.',
  ctaText: 'Shop Miroooo X2',
  ctaHref: '/products/miroooo-x2',
  videoSrc: '/assets_ref/x2/vbj9qc-h264-hd.mp4',
  videoAspect: '9/16',
  isReverse: true,
  points: [
    {
      title: 'Ultra Lightweight',
      description: '51g unibody aerospace aluminium chassis for effortless, fatigue-free daily brushing.',
    },
    {
      title: 'Travel-Friendly',
      description: 'Slim protective travel case and magnetic charging base built for life on the move.',
    },
    {
      title: '90 Days in a Single Charge',
      description: 'Months of power on a single USB-C charge without sink clutter.',
    },
    {
      title: 'IPX7 Immersion Waterproof',
      description: 'Fully submersible unibody aluminium chassis.',
    },
  ],
};

export const X1_FEATURE_SECTION: FeatureSplitSectionData = {
  id: 'ritual-features',
  kicker: 'The Miroooo Standard',
  heading: 'Engineered For The Modern Ritual',
  lead: '',
  ctaText: 'Shop Miroooo X1',
  ctaHref: '/products/miroooo-x',
  videoSrc: '/assets_ref/x/miroooo-feature-video.mp4',
  videoAspect: '1/1',
  isReverse: false,
  points: [
    {
      title: '60+ / 90 Days Battery Life',
      description: 'Extended battery intervals for Miroooo X1 and Miroooo X2, eliminating bulky charging stands and daily clutter around your sink.',
    },
    {
      title: 'Guidance That Earns Its Place',
      description: 'Intelligent quad-pacer timing and smart pressure feedback support your oral routine without taking it over.',
    },
    {
      title: 'Ready To Travel',
      description: 'Compact magnetic charging base and luxury protective cases allow both models to move cleanly and effortlessly with you.',
    },
  ],
};

export const COMPARISON_ROWS = [
  {
    feature: 'Sonic Frequency',
    x2: '40,000 VPM Dynamic Oscillations',
    x1: '32,000 VPM Micro-Vibrations',
    manual: 'Manual (~300 strokes/min)',
  },
  {
    feature: 'Cleaning Action',
    x2: '45° Wide-Angle Bass Method Sweep',
    x1: 'Linear Micro-Acoustic Wave',
    manual: 'Manual scrub',
  },
  {
    feature: 'Pressure Sensor Defense',
    x2: 'Smart 360° Red Halo Alert + Auto-Throttle',
    x1: 'Standard manual control',
    manual: 'None (risk of enamel wear)',
  },
  {
    feature: 'Battery Duration',
    x2: 'Up to 90 Days on 1 USB-C Charge',
    x1: '60+ Days on 1 USB-C Charge',
    manual: 'No battery',
  },
  {
    feature: 'Chassis Material & Weight',
    x2: '51g CNC Aerospace Anodized Aluminium',
    x1: '51g CNC Aerospace Anodized Aluminium',
    manual: 'Cheap moulded plastic (~35g)',
  },
  {
    feature: 'Waterproofing',
    x2: 'IPX7 Full Submersible (Shower Safe)',
    x1: 'IPX7 Full Submersible (Shower Safe)',
    manual: 'Waterproof',
  },
  {
    feature: 'Mounting & Travel Dock',
    x2: 'Self-Adhesive Floating Magnetic Wall Dock + Case',
    x1: 'Slim Magnetic Travel Case Included',
    manual: 'None',
  },
];
