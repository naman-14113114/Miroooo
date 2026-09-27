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
  saving?: string;
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
  // Backward compatibility fields
  slug?: string;
  shortDescription?: string;
  media?: Array<{
    id: string;
    type: 'image' | 'video';
    src: string;
    alt: string;
    poster?: string;
    width: number;
    height: number;
  }>;
  inTheBox?: string[];
}

export type ProductItem = Product;

export const PRODUCTS: Record<string, Product> = {
  'miroooo-x': {
    id: 'miroooo-x',
    handle: 'miroooo-x',
    slug: 'miroooo-x',
    name: 'Miroooo X1',
    model: 'X1',
    headline: 'Brushing, elevated to ritual.',
    subtitle: 'Ultra-precise 32,000 VPM acoustic sonic motor & 51g unibody chassis.',
    shortDescription:
      'Ultra-precise 32,000 VPM acoustic sonic motor, 51g featherweight unibody chassis, 3 cleaning modes, and 60-day battery life with magnetic travel case included.',
    description:
      'Experience the pure essence of mindful oral care with the Miroooo X1. Crafted from aerospace-grade anodized aluminum, the unibody handle weighs just 51 grams while housing an acoustic sonic motor delivering 32,000 micro-vibrations per minute. With 3 tailored modes, intelligent 2-minute quad-pacing, and over 60 days of battery life on a single USB-C charge, the Miroooo X1 transforms daily brushing into a refined ritual.',
    price: 76.7,
    compareAt: 154.7,
    formattedPrice: '$76.70',
    formattedCompareAt: '$154.70',
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
        price: 76.7,
        compareAt: 154.7,
        formattedPrice: '$76.70',
        formattedCompareAt: '$154.70',
        freeHeadsCount: 0,
        savingText: '50% OFF',
        saving: '50% OFF',
        description: 'Includes 1 Miroooo X1 set & 1 Travel Case',
      },
      {
        quantity: 2,
        name: 'BUY 2',
        badge: 'Most Popular',
        price: 140.4,
        compareAt: 309.4,
        formattedPrice: '$140.40',
        formattedCompareAt: '$309.40',
        freeHeadsCount: 1,
        savingText: 'SAVE $169.00',
        saving: 'SAVE $169.00',
        description: 'Includes 2 Miroooo X1 sets + 1 FREE 2-Pack Brush Heads Set',
      },
      {
        quantity: 3,
        name: 'BUY 3',
        badge: 'BEST VALUE',
        price: 191.1,
        compareAt: 464.1,
        formattedPrice: '$191.10',
        formattedCompareAt: '$464.10',
        freeHeadsCount: 2,
        savingText: 'SAVE $273.00',
        saving: 'SAVE $273.00',
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
      { label: 'Casing Material', value: 'Aerospace-grade CNC anodized aluminum unibody' },
    ],
    highlights: [
      '32,000 VPM Sonic Motor',
      '60+ Days Battery Life',
      '51g Ultralight Unibody',
      'IPX7 Immersion Waterproof',
    ],
    gifts: [
      {
        id: 'gift-x1-heads',
        name: 'Free 2-Pack Replacement Heads',
        value: 13.0,
        formattedValue: '$13.00',
        minimumQuantity: 2,
        image: '/assets_ref/x/heads/1.webp',
        subtitle: 'DuPont precision replacement heads for Miroooo X1',
      },
    ],
    galleryImages: [
      { src: '/media/products/miroooo-x/gallery/Grey-color-8.jpg', alt: 'Miroooo X1 Grey Sonic Toothbrush', width: 700, height: 700, variantColor: 'Grey' },
      { src: '/media/products/miroooo-x/gallery/RoseGold-color-1.jpg', alt: 'Miroooo X1 Pink Sonic Toothbrush', width: 700, height: 700, variantColor: 'Pink' },
      { src: '/media/products/miroooo-x/gallery/Silver-color-1.jpg', alt: 'Miroooo X1 Silver Sonic Toothbrush', width: 700, height: 700, variantColor: 'Silver' },
      { src: '/media/products/miroooo-x/gallery/Grey-color-1.jpg', alt: 'Miroooo X1 Lifestyle View', width: 700, height: 700 },
      { src: '/media/products/miroooo-x/gallery/Grey-color-7.jpg', alt: 'Miroooo X1 Fine Details', width: 700, height: 700 },
    ],
    boxContents: [
      '1x Miroooo X1 Sonic Electric Toothbrush Handle',
      '1x DuPont™ Precision Brush Head',
      '1x Slim Magnetic Protective Travel Case',
      '1x USB-C Fast-Charging Cable',
      '1x User Manual & Warranty Guide',
    ],
    inTheBox: [
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
    slug: 'miroooo-x2',
    name: 'Miroooo X2',
    model: 'X2',
    headline: 'Precision. Without the noise.',
    subtitle: 'Dynamic 45° Bass sweep vibration & smart 360° red halo pressure feedback defense.',
    shortDescription:
      'Engineered with dynamic 45° Bass sweep vibration, smart 360° red halo pressure feedback defense, aerospace aluminum unibody, 90-day battery life, and luxury magnetic travel dock.',
    description:
      'The flagship Miroooo X2 redefines oral health through precision acoustic engineering. Featuring our breakthrough 45° Bass Method oscillating sweep that automatically guides filaments subgingivally, alongside a 360° red halo pressure sensor that protects sensitive gum tissue. With 40,000 micro-vibrations per minute, 90 days of battery life on a single USB-C charge, and a floating magnetic dock, the Miroooo X2 delivers unmatched hygiene in a stunning aerospace aluminum unibody.',
    price: 89.7,
    compareAt: 180.7,
    formattedPrice: '$89.70',
    formattedCompareAt: '$180.70',
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
        price: 89.7,
        compareAt: 180.7,
        formattedPrice: '$89.70',
        formattedCompareAt: '$180.70',
        freeHeadsCount: 0,
        savingText: '50% OFF',
        saving: '50% OFF',
        description: 'Includes 1 Miroooo X2 set & 1 Travel Case',
      },
      {
        quantity: 2,
        name: 'BUY 2',
        badge: 'Most Popular',
        price: 166.4,
        compareAt: 361.4,
        formattedPrice: '$166.40',
        formattedCompareAt: '$361.40',
        freeHeadsCount: 1,
        savingText: 'SAVE $195.00',
        saving: 'SAVE $195.00',
        description: 'Includes 2 Miroooo X2 sets + 1 FREE 2-Pack Brush Heads Set',
      },
      {
        quantity: 3,
        name: 'BUY 3',
        badge: 'BEST VALUE',
        price: 230.1,
        compareAt: 542.1,
        formattedPrice: '$230.10',
        formattedCompareAt: '$542.10',
        freeHeadsCount: 2,
        savingText: 'SAVE $312.00',
        saving: 'SAVE $312.00',
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
      { label: 'Casing Material', value: 'Aerospace-grade CNC anodized aluminum unibody' },
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
        value: 13.0,
        formattedValue: '$13.00',
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
    inTheBox: [
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
    slug: 'miroooo-x1-heads',
    name: 'Miroooo X1 Heads (2-Pack)',
    model: 'X1 Heads',
    headline: 'Engineered exclusively for Miroooo X1.',
    subtitle: 'Micro-diamond polished DuPont filaments protecting enamel.',
    shortDescription:
      '2-pack replacement DuPont acoustic precision brush heads. Micro-diamond polished tips protect enamel and remove 10x more plaque.',
    description:
      'Engineered exclusively for the Miroooo X1 linear acoustic motor. These genuine DuPont™ Tynex® micro-diamond rounded filaments oscillate at 32,000 VPM to create micro-bubble fluid dynamics between teeth. Includes two hygienic travel caps.',
    price: 13.0,
    compareAt: 26.0,
    formattedPrice: '$13.00',
    formattedCompareAt: '$26.00',
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
        image: '/assets_ref/x/heads/1.webp',
        checkoutImage: '/assets_ref/x/heads/1.webp',
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
      'DuPont™ Tynex® Precision Bristles',
      '100% Miroooo X1 Compatibility',
      '3-Month Optimal Hygiene Cycle',
    ],
    gifts: [],
    galleryImages: [
      { src: '/assets_ref/x/heads/1.webp', alt: 'Miroooo X1 Replacement Heads 2-Pack', width: 800, height: 800 },
      { src: '/assets_ref/x/heads/2.webp', alt: 'Miroooo X1 Heads DuPont Bristles Detail', width: 800, height: 800 },
      { src: '/assets_ref/x/heads/3.webp', alt: 'Miroooo X1 Heads Packaging', width: 800, height: 800 },
    ],
    boxContents: [
      '2x Miroooo X1 Replacement Brush Heads',
      '2x Transparent Hygienic Travel Caps',
    ],
    inTheBox: [
      '2x Miroooo X1 Replacement Brush Heads',
      '2x Transparent Hygienic Travel Caps',
    ],
  },

  'miroooo-x2-heads': {
    id: 'miroooo-x2-heads',
    handle: 'miroooo-x2-heads',
    slug: 'miroooo-x2-heads',
    name: 'Miroooo X2 Heads (2-Pack)',
    model: 'X2 Heads',
    headline: 'Engineered exclusively for Miroooo X2 45° Bass sweep.',
    subtitle: 'Dynamic 45° oscillating drive shaft coupling with DuPont bristles.',
    shortDescription:
      '2-pack replacement DuPont precision brush heads. Designed specifically for the Miroooo X2 dynamic 45° oscillating drive shaft.',
    description:
      'Custom-engineered for the Miroooo X2 45° dynamic oscillating sweep mechanism. With multi-tiered DuPont™ filaments contoured to the cervical gumline and diamond-polished tips, these replacement heads maximize plaque clearance without causing gingival abrasion.',
    price: 13.0,
    compareAt: 26.0,
    formattedPrice: '$13.00',
    formattedCompareAt: '$26.00',
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
      'DuPont™ Precision Bristles',
      '100% Miroooo X2 Compatibility',
    ],
    gifts: [],
    galleryImages: [
      { src: '/assets_ref/x2/heads/B1.webp', alt: 'Miroooo X2 Replacement Heads 2-Pack', width: 800, height: 800 },
      { src: '/assets_ref/x2/heads/B2.webp', alt: 'Miroooo X2 Heads Dynamic Bristles', width: 800, height: 800 },
      { src: '/assets_ref/x2/heads/B3.webp', alt: 'Miroooo X2 Heads Precision Packaging', width: 800, height: 800 },
    ],
    boxContents: [
      '2x Miroooo X2 Replacement Brush Heads',
      '2x Transparent Hygienic Travel Caps',
    ],
    inTheBox: [
      '2x Miroooo X2 Replacement Brush Heads',
      '2x Transparent Hygienic Travel Caps',
    ],
  },
};

export const mirooooX1 = PRODUCTS['miroooo-x'];
export const mirooooX2 = PRODUCTS['miroooo-x2'];
export const mirooooX1Heads = PRODUCTS['miroooo-x1-heads'];
export const mirooooX2Heads = PRODUCTS['miroooo-x2-heads'];

export const allProducts: Product[] = [PRODUCTS['miroooo-x2'], PRODUCTS['miroooo-x']];

export function getProduct(handle: string): Product | undefined {
  if (handle === 'miroooo-x1' || handle === 'miroooo-x') return PRODUCTS['miroooo-x'];
  if (handle === 'miroooo-x2' || handle === 'miroooo-x2-sonic-electric-toothbrush') return PRODUCTS['miroooo-x2'];
  return PRODUCTS[handle];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProduct(slug);
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
