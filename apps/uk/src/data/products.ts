export interface ProductVariant {
  id: string;
  name: string;
  color: 'Grey' | 'Pink' | 'Silver' | 'Default';
  swatch: string;
  image: string;
  checkoutImage: string;
}

export interface BundleTier {
  quantity: 1 | 2 | 3;
  name: string;
  badge?: string;
  price: number;
  compareAt: number;
  formattedPrice: string;
  formattedCompareAt: string;
  freeHeadsCount: number;
  savingText: string;
  description: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface FreeGift {
  id: string;
  name: string;
  value: number;
  formattedValue: string;
  minimumQuantity: number;
  image: string;
  subtitle: string;
}

export interface Product {
  id: string;
  handle: string;
  name: string;
  model: string;
  headline: string;
  subtitle: string;
  description: string;
  price: number;
  compareAt: number;
  formattedPrice: string;
  formattedCompareAt: string;
  rating: number;
  reviewCount: number;
  customerCount: string;
  plusBaseProductId: string;
  defaultQuantity: 1 | 2 | 3;
  variants: ProductVariant[];
  bundles: BundleTier[];
  specs: ProductSpec[];
  highlights: string[];
  gifts: FreeGift[];
  galleryImages: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
    variantColor?: 'Grey' | 'Pink' | 'Silver';
  }>;
  boxContents?: string[];
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

export const PRODUCTS: Record<string, Product> = {
  'miroooo-x': {
    id: 'miroooo-x',
    handle: 'miroooo-x',
    name: 'Miroooo X1',
    model: 'X1',
    headline: 'Brushing, elevated to ritual.',
    subtitle: 'Ultra-precise 32,000 VPM acoustic sonic motor & 51g unibody chassis.',
    description:
      'Ultra-precise 32,000 VPM acoustic sonic motor, 51g featherweight unibody chassis, 3 cleaning modes, and 60-day battery life with magnetic travel case included.',
    price: 69.0,
    compareAt: 139.0,
    formattedPrice: '£69',
    formattedCompareAt: '£139',
    rating: 4.9,
    reviewCount: 4275,
    customerCount: '4,275',
    plusBaseProductId: '1000000675113473',
    defaultQuantity: 2,
    variants: [
      {
        id: '1000020700958564',
        name: 'Grey',
        color: 'Grey',
        swatch: '#737373',
        image: '/assets_ref/x/gallery/Miroooo_x_Grey-2.webp',
        checkoutImage: '/assets_ref/x/gallery/Miroooo_x_Grey-2.webp',
      },
      {
        id: '1000020700958562',
        name: 'Pink',
        color: 'Pink',
        swatch: '#f2a7b3',
        image: '/assets_ref/x/gallery/Miroooo_x_Pink-1.webp',
        checkoutImage: '/assets_ref/x/gallery/Miroooo_x_Pink-1.webp',
      },
      {
        id: '1000020700958563',
        name: 'Silver',
        color: 'Silver',
        swatch: '#e5e5e5',
        image: '/assets_ref/x/gallery/Miroooo_x_Silver-1.webp',
        checkoutImage: '/assets_ref/x/gallery/Miroooo_x_Silver-1.webp',
      },
    ],
    bundles: [
      {
        quantity: 1,
        name: 'BUY 1',
        price: 69.0,
        compareAt: 139.0,
        formattedPrice: '£69',
        formattedCompareAt: '£139',
        freeHeadsCount: 0,
        savingText: '50% OFF',
        description: 'Includes 1 Miroooo X1 set & 1 Travel Case',
      },
      {
        quantity: 2,
        name: 'BUY 2',
        badge: 'Most Popular',
        price: 128.0,
        compareAt: 278.0,
        formattedPrice: '£128',
        formattedCompareAt: '£278',
        freeHeadsCount: 1,
        savingText: 'SAVE £150',
        description: 'Includes 2 Miroooo X1 sets + 1 FREE 2-Pack Brush Heads Set',
      },
      {
        quantity: 3,
        name: 'BUY 3',
        badge: 'BEST VALUE',
        price: 177.0,
        compareAt: 417.0,
        formattedPrice: '£177',
        formattedCompareAt: '£417',
        freeHeadsCount: 2,
        savingText: 'SAVE £240',
        description: 'Includes 3 Miroooo X1 sets + 2 FREE 2-Pack Brush Heads Sets',
      },
    ],
    specs: [
      { label: 'Weight', value: '51g Featherweight unibody handle' },
      { label: 'Acoustic Vibrations', value: '32,000 Micro-vibrations / min' },
      { label: 'Cleaning Modes', value: '3 Modes (Clean, Soft & White)' },
      { label: 'Battery Life', value: '60+ Days on a single 2-hour USB-C charge' },
      { label: 'Waterproof Rating', value: 'IPX7 Immersion waterproof' },
      { label: 'Acoustic Noise', value: 'Whisper-quiet (<50 dB)' },
      { label: 'Smart Timer', value: '2-Minute quad-pacer with 30-second interval stutter' },
      { label: 'Bristle Filaments', value: 'DuPont™ Tynex® 3D end-rounded precision bristles' },
      { label: 'Casing Material', value: 'Aerospace-grade CNC anodized aluminium unibody' },
    ],
    highlights: [
      '32,000 VPM Sonic Motor',
      '60+ Days Battery',
      '51g Ultralight Unibody',
      'IPX7 Immersion Waterproof',
    ],
    gifts: [
      {
        id: 'gift-x1-heads',
        name: 'Free 2-Pack Replacement Heads',
        value: 10.0,
        formattedValue: '£10.00',
        minimumQuantity: 2,
        image: '/assets_ref/x/heads/B1.webp',
        subtitle: 'DuPont precision replacement heads for Miroooo X1',
      },
    ],
    galleryImages: [
      { src: '/assets_ref/x/gallery/Miroooo_x_Grey-2.webp', alt: 'Miroooo X1 Grey Sonic Toothbrush', width: 700, height: 700, variantColor: 'Grey' },
      { src: '/assets_ref/x/gallery/Miroooo_x_Pink-1.webp', alt: 'Miroooo X1 Pink Sonic Toothbrush', width: 700, height: 700, variantColor: 'Pink' },
      { src: '/assets_ref/x/gallery/Miroooo_x_Silver-1.webp', alt: 'Miroooo X1 Silver Sonic Toothbrush', width: 700, height: 700, variantColor: 'Silver' },
      { src: '/assets_ref/x/G1.webp', alt: 'Miroooo X1 Lifestyle View', width: 700, height: 700 },
      { src: '/assets_ref/x/G2.webp', alt: 'Miroooo X1 Fine Details', width: 700, height: 700 },
    ],
    boxContents: [
      '1x Miroooo X1 Sonic Electric Toothbrush Handle',
      '1x DuPont™ Precision Brush Head',
      '1x Slim Magnetic Protective Travel Case',
      '1x USB-C Fast-Charging Cable',
      '1x User Manual & Warranty Guide',
    ],
  },

  'miroooo-x2': {
    id: 'miroooo-x2',
    handle: 'miroooo-x2',
    name: 'Miroooo X2',
    model: 'X2',
    headline: 'Precision. Without the noise.',
    subtitle: 'Dynamic 45° Bass sweep vibration & smart 360° red halo pressure feedback defense.',
    description:
      'Engineered with dynamic 45° Bass sweep vibration, smart 360° red halo pressure feedback defense, aerospace aluminium unibody, 90-day battery life, and luxury magnetic travel dock.',
    price: 69.0,
    compareAt: 139.0,
    formattedPrice: '£69',
    formattedCompareAt: '£139',
    rating: 4.9,
    reviewCount: 4275,
    customerCount: '4,275',
    plusBaseProductId: '1000000675072187',
    defaultQuantity: 2,
    variants: [
      {
        id: '1000020700182884',
        name: 'Silver',
        color: 'Silver',
        swatch: '#e5e5e5',
        image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp',
        checkoutImage: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-checkout.webp',
      },
      {
        id: '1000020700182883',
        name: 'Grey',
        color: 'Grey',
        swatch: '#737373',
        image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-upright-grip.webp',
        checkoutImage: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-checkout.webp',
      },
      {
        id: '1000020700182882',
        name: 'Pink',
        color: 'Pink',
        swatch: '#f2a7b3',
        image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-upright-grip.webp',
        checkoutImage: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-checkout.webp',
      },
    ],
    bundles: [
      {
        quantity: 1,
        name: 'BUY 1',
        price: 69.0,
        compareAt: 139.0,
        formattedPrice: '£69',
        formattedCompareAt: '£139',
        freeHeadsCount: 0,
        savingText: '50% OFF',
        description: 'Includes 1 Miroooo X2 set & 1 Travel Case',
      },
      {
        quantity: 2,
        name: 'BUY 2',
        badge: 'Most Popular',
        price: 128.0,
        compareAt: 278.0,
        formattedPrice: '£128',
        formattedCompareAt: '£278',
        freeHeadsCount: 1,
        savingText: 'SAVE £150',
        description: 'Includes 2 Miroooo X2 sets + 1 FREE 2-Pack Brush Heads Set',
      },
      {
        quantity: 3,
        name: 'BUY 3',
        badge: 'BEST VALUE',
        price: 177.0,
        compareAt: 417.0,
        formattedPrice: '£177',
        formattedCompareAt: '£417',
        freeHeadsCount: 2,
        savingText: 'SAVE £240',
        description: 'Includes 3 Miroooo X2 sets + 2 FREE 2-Pack Brush Heads Sets',
      },
    ],
    specs: [
      { label: 'Weight', value: '51g Ultra-lightweight unibody handle' },
      { label: 'Acoustic Vibrations', value: '40,000 Micro-vibrations / min' },
      { label: 'Cleaning Motion', value: '45° Wide-angle Bass method sweep' },
      { label: 'Pressure Sensor', value: 'Smart 360° red halo ring alert & auto-throttle' },
      { label: 'Battery Life', value: '90+ Days on a single 2-hour USB-C charge' },
      { label: 'Waterproof Rating', value: 'IPX7 Full submersible & shower-proof' },
      { label: 'Cleaning Modes', value: '3 Tailored modes (Standard, Whitening, Deep Clean)' },
      { label: 'Smart Timer', value: '2-Minute quad-pacer with 30-second interval stutter' },
      { label: 'Bristle Filaments', value: 'DuPont™ precision end-rounded filaments' },
      { label: 'Casing Material', value: 'Aerospace-grade CNC anodized aluminium unibody' },
    ],
    highlights: [
      '45° Bass Sweep Motion',
      'Smart Red Halo Pressure Defense',
      '90-Day Battery Life',
      'Magnetic Floating Storage Dock',
    ],
    gifts: [
      {
        id: 'gift-x2-heads',
        name: 'Free 2-Pack Replacement Heads',
        value: 10.0,
        formattedValue: '£10.00',
        minimumQuantity: 2,
        image: '/assets_ref/x2/heads/B1.webp',
        subtitle: 'DuPont precision replacement heads for Miroooo X2',
      },
    ],
    galleryImages: [
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp', alt: 'Miroooo X2 Silver In Hand', width: 1200, height: 1200, variantColor: 'Silver' },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp', alt: 'Miroooo X2 Silver Upright Grip', width: 700, height: 700, variantColor: 'Silver' },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-upright-grip.webp', alt: 'Miroooo X2 Grey Upright Grip', width: 700, height: 700, variantColor: 'Grey' },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-upright-grip.webp', alt: 'Miroooo X2 Pink Upright Grip', width: 700, height: 700, variantColor: 'Pink' },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-complete-set-packaging.webp', alt: 'Miroooo X2 Complete Set Packaging', width: 1000, height: 1000 },
    ],
    boxContents: [
      '1x Miroooo X2 Flagship Sonic Electric Toothbrush Handle',
      '1x DuPont™ Precision Bass-Sweep Brush Head',
      '1x Luxury Magnetic Wall & Mirror Storage Mount',
      '1x Slim Magnetic Protective Travel Case',
      '1x USB-C High-Speed Charging Cable',
      '1x User Manual & 2-Year Warranty Card',
    ],
  },

  'miroooo-x1-heads': {
    id: 'miroooo-x1-heads',
    handle: 'miroooo-x1-heads',
    name: 'Miroooo X1 Heads (2-Pack)',
    model: 'X1 Heads',
    headline: 'Engineered exclusively for Miroooo X1.',
    subtitle: 'Micro-diamond polished DuPont filaments protecting enamel.',
    description:
      '2-pack replacement DuPont acoustic precision brush heads. Micro-diamond polished tips protect enamel and remove 10x more plaque.',
    price: 10.0,
    compareAt: 20.0,
    formattedPrice: '£10',
    formattedCompareAt: '£20',
    rating: 4.9,
    reviewCount: 4275,
    customerCount: '4,275',
    plusBaseProductId: '1000000675471182',
    defaultQuantity: 1,
    variants: [
      {
        id: '1000020710139724',
        name: 'Default',
        color: 'Default',
        swatch: '#888888',
        image: '/assets_ref/x/heads/B1.webp',
        checkoutImage: '/assets_ref/x/heads/B1.webp',
      },
    ],
    bundles: [],
    specs: [
      { label: 'Compatibility', value: '100% Miroooo X1 acoustic linear vibration motor' },
      { label: 'Bristle Rounding Rate', value: '90%+ End-rounded micro-polished filaments' },
      { label: 'Filament Diameter', value: '0.12mm Ultra-fine DuPont bristles' },
      { label: 'Package Contents', value: '2x Miroooo X1 Replacement Heads + 2x Hygienic Travel Caps' },
    ],
    highlights: [
      'DuPont Precision Bristles',
      '100% Miroooo X1 Compatibility',
      '3-Month Optimal Hygiene Cycle',
    ],
    gifts: [],
    galleryImages: [
      { src: '/assets_ref/x/heads/B1.webp', alt: 'Miroooo X1 Replacement Heads 2-Pack', width: 800, height: 800 },
      { src: '/assets_ref/x/heads/B1.webp', alt: 'Miroooo X1 Heads DuPont Bristles Detail', width: 800, height: 800 },
      { src: '/assets_ref/x/heads/B1.webp', alt: 'Miroooo X1 Heads Packaging', width: 800, height: 800 },
    ],
    boxContents: [
      '2x Miroooo X1 Replacement Brush Heads',
      '2x Transparent Hygienic Travel Caps',
    ],
  },

  'miroooo-x2-heads': {
    id: 'miroooo-x2-heads',
    handle: 'miroooo-x2-heads',
    name: 'Miroooo X2 Heads (2-Pack)',
    model: 'X2 Heads',
    headline: 'Engineered exclusively for Miroooo X2 45° Bass sweep.',
    subtitle: 'Dynamic 45° oscillating drive shaft coupling with DuPont bristles.',
    description:
      '2-pack replacement DuPont precision brush heads. Designed specifically for the Miroooo X2 dynamic 45° oscillating drive shaft.',
    price: 10.0,
    compareAt: 20.0,
    formattedPrice: '£10',
    formattedCompareAt: '£20',
    rating: 4.9,
    reviewCount: 4275,
    customerCount: '4,275',
    plusBaseProductId: '1000000675616058',
    defaultQuantity: 1,
    variants: [
      {
        id: '1000020718937117',
        name: 'Default',
        color: 'Default',
        swatch: '#888888',
        image: '/assets_ref/x2/heads/B1.webp',
        checkoutImage: '/assets_ref/x2/heads/B1.webp',
      },
    ],
    bundles: [],
    specs: [
      { label: 'Compatibility', value: '100% Miroooo X2 45° Bass sweep oscillating drive shaft' },
      { label: 'Bristle Rounding Rate', value: '90%+ End-rounded micro-polished filaments' },
      { label: 'Filament Diameter', value: '0.12mm Ultra-fine DuPont bristles' },
      { label: 'Package Contents', value: '2x Miroooo X2 Replacement Heads + 2x Hygienic Travel Caps' },
    ],
    highlights: [
      '45° Bass Sweep Coupling',
      'DuPont Precision Bristles',
      '100% Miroooo X2 Compatibility',
    ],
    gifts: [],
    galleryImages: [
      { src: '/assets_ref/x2/heads/B1.webp', alt: 'Miroooo X2 Replacement Heads 2-Pack', width: 800, height: 800 },
      { src: '/assets_ref/x2/heads/B2.webp', alt: 'Miroooo X2 Heads Dynamic Bristles', width: 800, height: 800 },
      { src: '/assets_ref/x2/heads/B2.webp', alt: 'Miroooo X2 Heads Precision Packaging', width: 800, height: 800 },
    ],
    boxContents: [
      '2x Miroooo X2 Replacement Brush Heads',
      '2x Transparent Hygienic Travel Caps',
    ],
  },
};

export function getProduct(handle: string): Product | undefined {
  if (handle === 'miroooo_x1') return PRODUCTS['miroooo-x'];
  if (handle === 'miroooo_x2') return PRODUCTS['miroooo-x2'];
  return PRODUCTS[handle];
}

export function getAllProducts(): Product[] {
  return Object.values(PRODUCTS);
}

export function getBrushes(): Product[] {
  return [PRODUCTS['miroooo-x2'], PRODUCTS['miroooo-x']];
}

export function getAccessories(): Product[] {
  return [PRODUCTS['miroooo-x2-heads'], PRODUCTS['miroooo-x1-heads']];
}
