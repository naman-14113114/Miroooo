import { formatUSD, savingPercent } from '@/lib/money';

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
  promoPrice: number;
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
    price: 91.15,
    compareAt: 129.88,
    formattedPrice: formatUSD(91.15),
    formattedCompareAt: formatUSD(129.88),
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
        price: 91.15,
        compareAt: 129.88,
        formattedPrice: formatUSD(91.15),
        formattedCompareAt: formatUSD(129.88),
        freeHeadsCount: 0,
        promoPrice: 82.03,
        savingText: `${savingPercent(91.15, 129.88)}% OFF`,
        description: 'Includes 1 Miroooo X1 set & 1 Travel Case',
      },
      {
        quantity: 2,
        name: 'BUY 2',
        badge: 'Most Popular',
        price: 169.10,
        compareAt: 259.76,
        formattedPrice: formatUSD(169.10),
        formattedCompareAt: formatUSD(259.76),
        freeHeadsCount: 1,
        promoPrice: 152.18,
        savingText: `SAVE ${formatUSD(259.76 - 169.10)}`,
        description: 'Includes 2 Miroooo X1 sets + 1 FREE 2-Pack Brush Heads Set',
      },
      {
        quantity: 3,
        name: 'BUY 3',
        badge: 'BEST VALUE',
        price: 234.07,
        compareAt: 389.64,
        formattedPrice: formatUSD(234.07),
        formattedCompareAt: formatUSD(389.64),
        freeHeadsCount: 2,
        promoPrice: 210.67,
        savingText: `SAVE ${formatUSD(389.64 - 234.07)}`,
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
        value: 13.15,
        formattedValue: formatUSD(13.15),
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
    price: 91.15,
    compareAt: 184.23,
    formattedPrice: formatUSD(91.15),
    formattedCompareAt: formatUSD(184.23),
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
        image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-complete-set-packaging.webp',
        checkoutImage: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-checkout.webp',
      },
      {
        id: '1000020700182883',
        name: 'Grey',
        color: 'Grey',
        swatch: '#737373',
        image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-complete-set-packaging.webp',
        checkoutImage: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-checkout.webp',
      },
      {
        id: '1000020700182882',
        name: 'Pink',
        color: 'Pink',
        swatch: '#f2a7b3',
        image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-complete-set-packaging.webp',
        checkoutImage: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-checkout.webp',
      },
    ],
    bundles: [
      {
        quantity: 1,
        name: 'BUY 1',
        price: 91.15,
        compareAt: 184.23,
        formattedPrice: formatUSD(91.15),
        formattedCompareAt: formatUSD(184.23),
        freeHeadsCount: 1,
        promoPrice: 82.03,
        savingText: `${savingPercent(91.15, 184.23)}% OFF`,
        description: 'Includes 1 Miroooo X2 set & 1 FREE 2-Pack Brush Heads Set',
      },
      {
        quantity: 2,
        name: 'BUY 2',
        badge: 'Most Popular',
        price: 169.10,
        compareAt: 368.46,
        formattedPrice: formatUSD(169.10),
        formattedCompareAt: formatUSD(368.46),
        freeHeadsCount: 2,
        promoPrice: 152.18,
        savingText: `SAVE ${formatUSD(368.46 - 169.10)}`,
        description: 'Includes 2 Miroooo X2 sets + 2 FREE 2-Pack Brush Heads Sets (4 Heads)',
      },
      {
        quantity: 3,
        name: 'BUY 3',
        badge: 'BEST VALUE',
        price: 234.07,
        compareAt: 552.69,
        formattedPrice: formatUSD(234.07),
        formattedCompareAt: formatUSD(552.69),
        freeHeadsCount: 3,
        promoPrice: 210.67,
        savingText: `SAVE ${formatUSD(552.69 - 234.07)}`,
        description: 'Includes 3 Miroooo X2 sets + 3 FREE 2-Pack Brush Heads Sets (6 Heads)',
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
        value: 13.2,
        formattedValue: formatUSD(13.2),
        minimumQuantity: 2,
        image: '/assets_ref/x2/heads/B1.webp',
        subtitle: 'DuPont precision replacement heads for Miroooo X2',
      },
    ],
    galleryImages: [
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-precision-bristle-heads.webp', alt: 'Miroooo X2 Silver Precision DuPont Bristle Heads', width: 1200, height: 1200, variantColor: 'Silver' },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-glowing-ring.webp?v=violet', alt: 'Miroooo X2 Pink with Glowing Smart Ring', width: 1200, height: 1200, variantColor: 'Pink' },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-wet-stone-kit.webp', alt: 'Miroooo X2 Grey Kit on Wet Stone', width: 1200, height: 1200, variantColor: 'Grey' },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp', alt: 'Miroooo X2 Silver Upright Grip', width: 700, height: 700, variantColor: 'Silver' },
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
    formattedPrice: formatUSD(10.0),
    formattedCompareAt: formatUSD(20.0),
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
    bundles: [
      {
        quantity: 1,
        name: 'BUY 1',
        price: 10.0,
        promoPrice: 10.0,
        compareAt: 20.0,
        formattedPrice: formatUSD(10.0),
        formattedCompareAt: formatUSD(20.0),
        freeHeadsCount: 0,
        savingText: '50% OFF',
        description: '1 Pack (2 Brush Heads)',
      },
      {
        quantity: 2,
        name: 'BUY 2',
        badge: 'Most Popular',
        price: 18.0,
        promoPrice: 18.0,
        compareAt: 40.0,
        formattedPrice: formatUSD(18.0),
        formattedCompareAt: formatUSD(40.0),
        freeHeadsCount: 0,
        savingText: `SAVE ${formatUSD(22.0)}`,
        description: '2 Packs (4 Brush Heads) — $9 / pack',
      },
      {
        quantity: 3,
        name: 'BUY 3',
        badge: 'BEST VALUE',
        price: 24.0,
        promoPrice: 24.0,
        compareAt: 60.0,
        formattedPrice: formatUSD(24.0),
        formattedCompareAt: formatUSD(60.0),
        freeHeadsCount: 0,
        savingText: `SAVE ${formatUSD(36.0)}`,
        description: '3 Packs (6 Brush Heads) — $8 / pack',
      },
    ],
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
    formattedPrice: formatUSD(10.0),
    formattedCompareAt: formatUSD(20.0),
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
    bundles: [
      {
        quantity: 1,
        name: 'BUY 1',
        price: 10.0,
        promoPrice: 10.0,
        compareAt: 20.0,
        formattedPrice: formatUSD(10.0),
        formattedCompareAt: formatUSD(20.0),
        freeHeadsCount: 0,
        savingText: '50% OFF',
        description: '1 Pack (2 Brush Heads)',
      },
      {
        quantity: 2,
        name: 'BUY 2',
        badge: 'Most Popular',
        price: 18.0,
        promoPrice: 18.0,
        compareAt: 40.0,
        formattedPrice: formatUSD(18.0),
        formattedCompareAt: formatUSD(40.0),
        freeHeadsCount: 0,
        savingText: `SAVE ${formatUSD(22.0)}`,
        description: '2 Packs (4 Brush Heads) — $9 / pack',
      },
      {
        quantity: 3,
        name: 'BUY 3',
        badge: 'BEST VALUE',
        price: 24.0,
        promoPrice: 24.0,
        compareAt: 60.0,
        formattedPrice: formatUSD(24.0),
        formattedCompareAt: formatUSD(60.0),
        freeHeadsCount: 0,
        savingText: `SAVE ${formatUSD(36.0)}`,
        description: '3 Packs (6 Brush Heads) — $8 / pack',
      },
    ],
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

  'wall-mounted-dock': {
    id: 'wall-mounted-dock',
    handle: 'wall-mounted-dock',
    name: 'Miroooo Magnetic Wall Mounted Dock',
    model: 'Wall Mount Dock',
    headline: 'Floating magnetic wall storage for Miroooo.',
    subtitle: 'Effortless bathroom mirror & tile mounting.',
    description:
      'Floating magnetic wall storage dock for Miroooo X1 & Miroooo X2 Sonic Electric Toothbrushes. Features 3M Command™ damage-free adhesive backing and aerospace polymer magnetic core for effortless mirror and tile mounting.',
    price: 9.0,
    compareAt: 18.0,
    formattedPrice: formatUSD(9.0),
    formattedCompareAt: formatUSD(18.0),
    rating: 4.9,
    reviewCount: 4275,
    customerCount: '4,275',
    plusBaseProductId: '1000000675616059',
    defaultQuantity: 1,
    variants: [
      {
        id: '1000020718937118',
        name: 'Default',
        color: 'Default',
        swatch: '#888888',
        image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted.webp',
        checkoutImage: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted.webp',
      },
    ],
    bundles: [],
    specs: [
      { label: 'Compatibility', value: 'Miroooo X1 & Miroooo X2 Sonic Electric Toothbrushes' },
      { label: 'Mounting', value: '3M Command™ damage-free adhesive backing' },
      { label: 'Material', value: 'High-grade aerospace polymer with magnetic docking core' },
      { label: 'Dimensions', value: '42mm x 38mm x 18mm (18g)' },
    ],
    highlights: [
      '3M Command™ Damage-Free Adhesive Backing',
      'High-Grade Aerospace Magnetic Docking Core',
      'Miroooo X1 & X2 Universal Compatibility',
      'Minimalist Bathroom Space-Saving Floating Design',
    ],
    gifts: [],
    galleryImages: [
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted.webp', alt: 'Miroooo Magnetic Wall Mounted Dock Storage', width: 800, height: 800 },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted-dock-storage.webp', alt: 'Miroooo Magnetic Wall Mounted Dock Storage Cradle', width: 800, height: 800 },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-wall-mounted-storage.webp', alt: 'Miroooo Wall Mounted Dock Grey Storage', width: 800, height: 800 },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-wall-mounted-storage.webp', alt: 'Miroooo Wall Mounted Dock Pink Storage', width: 800, height: 800 },
    ],
    boxContents: [
      '1x Miroooo Magnetic Wall & Mirror Storage Mount',
      '1x 3M Command™ Damage-Free Adhesive Strip',
      '1x Quick Installation & Surface Guide',
    ],
  },

  'travel-case': {
    id: 'travel-case',
    handle: 'travel-case',
    name: 'Miroooo Luxury Magnetic Travel Case',
    model: 'Travel Case',
    headline: 'Slim, magnetic travel protection for Miroooo.',
    subtitle: 'Ventilated acoustic travel pod.',
    description:
      'Slim, magnetic travel protection for Miroooo sonic electric toothbrushes. Features quad-magnetic snap closure, micro-ventilation ports, and matte soft-touch impact-resistant casing engineered to hold 1 handle and 1 brush head securely.',
    price: 20.0,
    compareAt: 40.0,
    formattedPrice: formatUSD(20.0),
    formattedCompareAt: formatUSD(40.0),
    rating: 4.9,
    reviewCount: 4275,
    customerCount: '4,275',
    plusBaseProductId: '1000000675616060',
    defaultQuantity: 1,
    variants: [
      {
        id: '1000020718937119',
        name: 'Default',
        color: 'Default',
        swatch: '#888888',
        image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp',
        checkoutImage: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp',
      },
    ],
    bundles: [],
    specs: [
      { label: 'Compatibility', value: 'Miroooo X1 & Miroooo X2 Handles + 1 Brush Head' },
      { label: 'Closure', value: 'Quad-magnetic snap closure with micro-ventilation ports' },
      { label: 'Material', value: 'Matte soft-touch impact-resistant casing' },
      { label: 'Dimensions', value: '215mm x 35mm x 28mm (62g)' },
    ],
    highlights: [
      'Quad-Magnetic Snap Closure',
      'Micro-Ventilation Acoustic Air Ports',
      'Matte Soft-Touch Impact-Resistant Shell',
      'Holds 1 Miroooo Handle + 1 Brush Head',
    ],
    gifts: [],
    galleryImages: [
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp', alt: 'Miroooo Luxury Magnetic Travel Case Lifestyle', width: 800, height: 800 },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-ventilated-travel-case.webp', alt: 'Miroooo Ventilated Magnetic Travel Case', width: 800, height: 800 },
      { src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-handbag-travel-case.webp', alt: 'Miroooo Travel Case Handbag Portability', width: 800, height: 800 },
      { src: '/assets_ref/x2/miroooo-x2-sonic-electric-toothbrush-portable-luxury-travel-case.webp', alt: 'Miroooo Portable Luxury Travel Case', width: 800, height: 800 },
    ],
    boxContents: [
      '1x Miroooo Luxury Magnetic Travel Case',
      '1x Micro-Ventilated Interior Cushion Insert',
    ],
  },

  'x1-charger': {
    id: 'x1-charger',
    handle: 'x1-charger',
    name: 'Miroooo X1 Magnetic Fast Charger',
    model: 'X1 Charger',
    headline: 'High-speed magnetic inductive charging dock.',
    subtitle: 'Fast 2-hour full charge for 60+ days battery.',
    description:
      'High-speed magnetic inductive charging dock exclusively for Miroooo X1 Sonic Electric Toothbrush. Features fast 2-hour full charge delivering 60+ days of battery, integrated 1.0m braided USB cable, and complete multi-surge safety protection.',
    price: 20.0,
    compareAt: 40.0,
    formattedPrice: formatUSD(20.0),
    formattedCompareAt: formatUSD(40.0),
    rating: 4.9,
    reviewCount: 4275,
    customerCount: '4,275',
    plusBaseProductId: '1000000675616061',
    defaultQuantity: 1,
    variants: [
      {
        id: '1000020718937120',
        name: 'Default',
        color: 'Default',
        swatch: '#888888',
        image: '/assets_ref/x/gallery/MIROOOO-toothbrush-on-white-charging-dock.png',
        checkoutImage: '/assets_ref/x/gallery/MIROOOO-toothbrush-on-white-charging-dock.png',
      },
    ],
    bundles: [],
    specs: [
      { label: 'Compatibility', value: 'Miroooo X1 Sonic Electric Toothbrush exclusively' },
      { label: 'Cable', value: 'Integrated 1.0m braided USB-A to magnetic inductive dock' },
      { label: 'Input', value: '5V/1A USB fast charging' },
      { label: 'Safety', value: 'Over-voltage, short-circuit and temperature surge protection' },
    ],
    highlights: [
      'High-Speed Magnetic Inductive Charging Base',
      'Fast 2-Hour Full Charge (60+ Days Battery)',
      'Integrated 1.0m Braided USB-A Cable',
      'Over-Voltage, Short-Circuit & Thermal Protection',
    ],
    gifts: [],
    galleryImages: [
      { src: '/assets_ref/x/gallery/MIROOOO-toothbrush-on-white-charging-dock.png', alt: 'Miroooo Toothbrush on White Charging Dock', width: 800, height: 800 },
      { src: '/assets_ref/x/gallery/Rose-gold-toothbrush-on-MIROOOO-charging-dock.png', alt: 'Rose Gold Toothbrush on Miroooo Charging Dock', width: 800, height: 800 },
      { src: '/assets_ref/x/gallery/White-toothbrush-with-subtle-MIROOOO-dock-logo.webp', alt: 'White Toothbrush with Subtle Miroooo Dock Logo', width: 800, height: 800 },
    ],
    boxContents: [
      '1x Miroooo X1 Magnetic Inductive Fast Charging Dock',
      '1x Integrated 1.0m Braided USB-A Cable',
      '1x Safety & Charging Manual',
    ],
  },
};

export function getProduct(handle: string): Product | undefined {
  if (handle === 'miroooo_x1') return PRODUCTS['miroooo-x'];
  if (handle === 'miroooo_x2') return PRODUCTS['miroooo-x2'];
  if (handle === 'wall_mounted_dock') return PRODUCTS['wall-mounted-dock'];
  if (handle === 'travel_case') return PRODUCTS['travel-case'];
  if (handle === 'x1_charger') return PRODUCTS['x1-charger'];
  return PRODUCTS[handle];
}

export function getAllProducts(): Product[] {
  return Object.values(PRODUCTS);
}

export function getBrushes(): Product[] {
  return [PRODUCTS['miroooo-x2'], PRODUCTS['miroooo-x']];
}

export function getAccessories(): Product[] {
  return [
    PRODUCTS['wall-mounted-dock'],
    PRODUCTS['travel-case'],
    PRODUCTS['x1-charger'],
    PRODUCTS['miroooo-x2-heads'],
    PRODUCTS['miroooo-x1-heads'],
  ];
}
