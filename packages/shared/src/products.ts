import { convertPrice, formatMoney, MarketConfig } from "./market";

export interface CatalogProductVariant {
  id: string;
  name: string;
  color: string;
  swatch: string;
  image: string;
  checkoutImage: string;
}

export interface BundleTierDefinition {
  quantity: 1 | 2 | 3;
  name: string;
  badge?: string;
  basePrice: number;
  baseCompareAt: number;
  freeHeadsCount: number;
  savingText: (market: MarketConfig) => string;
  description: (market: MarketConfig) => string;
}

export interface ProductCatalogItem {
  id: string;
  handle: string;
  name: string;
  model: string;
  headline: string;
  description: string;
  basePrice: number;
  baseCompareAt: number;
  rating: number;
  reviewCount: number;
  plusBaseProductId: string;
  variants: CatalogProductVariant[];
  bundles?: BundleTierDefinition[];
  specs: Array<{ label: string; value: string }>;
  highlights: string[];
}

export const PRODUCTS: Record<string, ProductCatalogItem> = {
  "miroooo-x": {
    id: "miroooo-x",
    handle: "miroooo-x",
    name: "Miroooo X1",
    model: "X1",
    headline: "Brushing, elevated to ritual.",
    description:
      "Ultra-precise 32,000 VPM acoustic sonic motor, 51g featherweight unibody chassis, 3 cleaning modes, and 60-day battery life with magnetic travel case included.",
    basePrice: 59.0,
    baseCompareAt: 119.0,
    rating: 4.9,
    reviewCount: 4275,
    plusBaseProductId: "1000000675113473",
    variants: [
      {
        id: "1000020700958563",
        name: "Silver",
        color: "Silver",
        swatch: "#e5e5e5",
        image: "/assets_ref/x/gallery/Miroooo_x_Silver-1.webp",
        checkoutImage: "/assets_ref/x/gallery/Miroooo_x_Silver-1.webp",
      },
      {
        id: "1000020700958564",
        name: "Grey",
        color: "Grey",
        swatch: "#737373",
        image: "/assets_ref/x/gallery/Miroooo_x_Grey-2.webp",
        checkoutImage: "/assets_ref/x/gallery/Miroooo_x_Grey-2.webp",
      },
      {
        id: "1000020700958562",
        name: "Pink",
        color: "Pink",
        swatch: "#f2a7b3",
        image: "/assets_ref/x/gallery/Miroooo_x_Pink-1.webp",
        checkoutImage: "/assets_ref/x/gallery/Miroooo_x_Pink-1.webp",
      },
    ],
    bundles: [
      {
        quantity: 1,
        name: "BUY 1",
        basePrice: 59.0,
        baseCompareAt: 119.0,
        freeHeadsCount: 0,
        savingText: () => "50% OFF",
        description: () => "Includes 1 Miroooo X1 set & 1 Travel Case",
      },
      {
        quantity: 2,
        name: "BUY 2",
        badge: "Most Popular",
        basePrice: 108.0,
        baseCompareAt: 238.0,
        freeHeadsCount: 1,
        savingText: (m) => `SAVE ${formatMoney(convertPrice(130, m), m.currencySymbol)}`,
        description: () => "Includes 2 Miroooo X1 sets + 1 FREE 2-Pack Brush Heads Set",
      },
      {
        quantity: 3,
        name: "BUY 3",
        badge: "BEST VALUE",
        basePrice: 147.0,
        baseCompareAt: 357.0,
        freeHeadsCount: 2,
        savingText: (m) => `SAVE ${formatMoney(convertPrice(210, m), m.currencySymbol)}`,
        description: () => "Includes 3 Miroooo X1 sets + 2 FREE 2-Pack Brush Heads Sets",
      },
    ],
    specs: [
      { label: "Weight", value: "51g Featherweight unibody handle" },
      { label: "Acoustic Vibrations", value: "32,000 Micro-vibrations / min" },
      { label: "Cleaning Modes", value: "3 Modes (Clean, Soft & White)" },
      { label: "Battery Life", value: "60+ Days on a single 2-hour USB-C charge" },
      { label: "Waterproof Rating", value: "IPX7 Immersion waterproof" },
      { label: "Acoustic Noise", value: "Whisper-quiet (<50 dB)" },
      { label: "Smart Timer", value: "2-Minute quad-pacer with 30-second interval stutter" },
      { label: "Bristle Filaments", value: "DuPont™ Tynex® 3D end-rounded precision bristles" },
      { label: "Casing Material", value: "Aerospace-grade CNC anodized aluminium unibody" },
    ],
    highlights: ["32,000 VPM Sonic Motor", "60+ Days Battery", "51g Ultralight Unibody", "IPX7 Immersion Waterproof"],
  },

  "miroooo-x2": {
    id: "miroooo-x2",
    handle: "miroooo-x2",
    name: "Miroooo X2",
    model: "X2",
    headline: "Precision. Without the noise.",
    description:
      "Engineered with dynamic 45° Bass sweep vibration, smart 360° red halo pressure feedback defense, aerospace aluminium unibody, 90-day battery life, and luxury magnetic travel dock.",
    basePrice: 69.0,
    baseCompareAt: 139.0,
    rating: 4.9,
    reviewCount: 4275,
    plusBaseProductId: "1000000675072187",
    variants: [
      {
        id: "1000020700182884",
        name: "Silver",
        color: "Silver",
        swatch: "#e5e5e5",
        image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp",
        checkoutImage: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-checkout.webp",
      },
      {
        id: "1000020700182883",
        name: "Grey",
        color: "Grey",
        swatch: "#737373",
        image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-upright-grip.webp",
        checkoutImage: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-checkout.webp",
      },
      {
        id: "1000020700182882",
        name: "Pink",
        color: "Pink",
        swatch: "#f2a7b3",
        image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-upright-grip.webp",
        checkoutImage: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-checkout.webp",
      },
    ],
    bundles: [
      {
        quantity: 1,
        name: "BUY 1",
        basePrice: 69.0,
        baseCompareAt: 139.0,
        freeHeadsCount: 0,
        savingText: () => "50% OFF",
        description: () => "Includes 1 Miroooo X2 set & 1 Travel Case",
      },
      {
        quantity: 2,
        name: "BUY 2",
        badge: "Most Popular",
        basePrice: 128.0,
        baseCompareAt: 278.0,
        freeHeadsCount: 1,
        savingText: (m) => `SAVE ${formatMoney(convertPrice(150, m), m.currencySymbol)}`,
        description: () => "Includes 2 Miroooo X2 sets + 1 FREE 2-Pack Brush Heads Set",
      },
      {
        quantity: 3,
        name: "BUY 3",
        badge: "BEST VALUE",
        basePrice: 177.0,
        baseCompareAt: 417.0,
        freeHeadsCount: 2,
        savingText: (m) => `SAVE ${formatMoney(convertPrice(240, m), m.currencySymbol)}`,
        description: () => "Includes 3 Miroooo X2 sets + 2 FREE 2-Pack Brush Heads Sets",
      },
    ],
    specs: [
      { label: "Weight", value: "51g Ultra-lightweight unibody handle" },
      { label: "Acoustic Vibrations", value: "40,000 Micro-vibrations / min" },
      { label: "Cleaning Motion", value: "45° Wide-angle Bass method sweep" },
      { label: "Pressure Sensor", value: "Smart 360° red halo ring alert & auto-throttle" },
      { label: "Battery Life", value: "90+ Days on a single 2-hour USB-C charge" },
      { label: "Waterproof Rating", value: "IPX7 Full submersible & shower-proof" },
      { label: "Cleaning Modes", value: "3 Tailored modes (Standard, Whitening, Deep Clean)" },
      { label: "Smart Timer", value: "2-Minute quad-pacer with 30-second interval stutter" },
      { label: "Bristle Filaments", value: "DuPont™ precision end-rounded filaments" },
      { label: "Casing Material", value: "Aerospace-grade CNC anodized aluminium unibody" },
    ],
    highlights: ["45° Bass Sweep Motion", "Smart Red Halo Pressure Defense", "90-Day Battery Life", "Magnetic Floating Storage Dock"],
  },

  "miroooo-x1-heads": {
    id: "miroooo-x1-heads",
    handle: "miroooo-x1-heads",
    name: "Miroooo X1 Heads (2-Pack)",
    model: "X1 Heads",
    headline: "Engineered exclusively for Miroooo X1.",
    description:
      "2-pack replacement DuPont acoustic precision brush heads. Micro-diamond polished tips protect enamel and remove 10x more plaque.",
    basePrice: 10.0,
    baseCompareAt: 20.0,
    rating: 4.9,
    reviewCount: 4275,
    plusBaseProductId: "1000000675471182",
    variants: [
      {
        id: "1000020710139724",
        name: "Default",
        color: "Default",
        swatch: "#888888",
        image: "/assets_ref/x/heads/B1.webp",
        checkoutImage: "/assets_ref/x/heads/B1.webp",
      },
    ],
    bundles: [
      {
        quantity: 1,
        name: "BUY 1",
        basePrice: 10.0,
        baseCompareAt: 20.0,
        freeHeadsCount: 0,
        savingText: () => "50% OFF",
        description: () => "1 Pack (2 Brush Heads)",
      },
      {
        quantity: 2,
        name: "BUY 2",
        badge: "Most Popular",
        basePrice: 18.0,
        baseCompareAt: 40.0,
        freeHeadsCount: 0,
        savingText: (m) => `SAVE ${formatMoney(convertPrice(22, m), m.currencySymbol)}`,
        description: () => "2 Packs (4 Brush Heads) — $9 / pack",
      },
      {
        quantity: 3,
        name: "BUY 3",
        badge: "BEST VALUE",
        basePrice: 24.0,
        baseCompareAt: 60.0,
        freeHeadsCount: 0,
        savingText: (m) => `SAVE ${formatMoney(convertPrice(36, m), m.currencySymbol)}`,
        description: () => "3 Packs (6 Brush Heads) — $8 / pack",
      },
    ],
    specs: [
      { label: "Compatibility", value: "100% Miroooo X1 acoustic linear vibration motor" },
      { label: "Bristle Rounding Rate", value: "90%+ End-rounded micro-polished filaments" },
      { label: "Filament Diameter", value: "0.12mm Ultra-fine DuPont bristles" },
      { label: "Package Contents", value: "2x Miroooo X1 Replacement Heads + 2x Hygienic Travel Caps" },
    ],
    highlights: ["DuPont Precision Bristles", "100% Miroooo X1 Compatibility", "3-Month Optimal Hygiene Cycle"],
  },

  "miroooo-x2-heads": {
    id: "miroooo-x2-heads",
    handle: "miroooo-x2-heads",
    name: "Miroooo X2 Heads (2-Pack)",
    model: "X2 Heads",
    headline: "Engineered exclusively for Miroooo X2 45° Bass sweep.",
    description:
      "2-pack replacement DuPont precision brush heads. Designed specifically for the Miroooo X2 dynamic 45° oscillating drive shaft.",
    basePrice: 10.0,
    baseCompareAt: 20.0,
    rating: 4.9,
    reviewCount: 4275,
    plusBaseProductId: "1000000675616058",
    variants: [
      {
        id: "1000020718937117",
        name: "Default",
        color: "Default",
        swatch: "#888888",
        image: "/assets_ref/x2/heads/B1.webp",
        checkoutImage: "/assets_ref/x2/heads/B1.webp",
      },
    ],
    bundles: [
      {
        quantity: 1,
        name: "BUY 1",
        basePrice: 10.0,
        baseCompareAt: 20.0,
        freeHeadsCount: 0,
        savingText: () => "50% OFF",
        description: () => "1 Pack (2 Brush Heads)",
      },
      {
        quantity: 2,
        name: "BUY 2",
        badge: "Most Popular",
        basePrice: 18.0,
        baseCompareAt: 40.0,
        freeHeadsCount: 0,
        savingText: (m) => `SAVE ${formatMoney(convertPrice(22, m), m.currencySymbol)}`,
        description: () => "2 Packs (4 Brush Heads) — $9 / pack",
      },
      {
        quantity: 3,
        name: "BUY 3",
        badge: "BEST VALUE",
        basePrice: 24.0,
        baseCompareAt: 60.0,
        freeHeadsCount: 0,
        savingText: (m) => `SAVE ${formatMoney(convertPrice(36, m), m.currencySymbol)}`,
        description: () => "3 Packs (6 Brush Heads) — $8 / pack",
      },
    ],
    specs: [
      { label: "Compatibility", value: "100% Miroooo X2 45° Bass sweep oscillating drive shaft" },
      { label: "Bristle Rounding Rate", value: "90%+ End-rounded micro-polished filaments" },
      { label: "Filament Diameter", value: "0.12mm Ultra-fine DuPont bristles" },
      { label: "Package Contents", value: "2x Miroooo X2 Replacement Heads + 2x Hygienic Travel Caps" },
    ],
    highlights: ["45° Bass Sweep Coupling", "DuPont Precision Bristles", "100% Miroooo X2 Compatibility"],
  },

  "wall-mounted-dock": {
    id: "wall-mounted-dock",
    handle: "wall-mounted-dock",
    name: "Miroooo Magnetic Wall Mounted Dock",
    model: "Wall Mount Dock",
    headline: "Floating magnetic wall storage for Miroooo.",
    description:
      "Effortless bathroom mirror & tile mounting. Floating magnetic wall storage dock engineered for Miroooo X1 & Miroooo X2 Sonic Electric Toothbrushes with 3M Command™ damage-free adhesive.",
    basePrice: 9.0,
    baseCompareAt: 18.0,
    rating: 4.9,
    reviewCount: 4275,
    plusBaseProductId: "wall-mounted-dock",
    variants: [
      {
        id: "wall-mounted-dock-default",
        name: "Default",
        color: "Default",
        swatch: "#888888",
        image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted.webp",
        checkoutImage: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted.webp",
      },
    ],
    specs: [
      { label: "Compatibility", value: "Miroooo X1 & Miroooo X2 Sonic Electric Toothbrushes" },
      { label: "Mounting", value: "3M Command™ damage-free adhesive backing" },
      { label: "Material", value: "High-grade aerospace polymer with magnetic docking core" },
      { label: "Dimensions", value: "42mm x 38mm x 18mm (18g)" },
    ],
    highlights: ["3M Command™ Damage-Free Adhesive", "Magnetic Docking Core", "X1 & X2 Universal Fit"],
  },

  "travel-case": {
    id: "travel-case",
    handle: "travel-case",
    name: "Miroooo Luxury Magnetic Travel Case",
    model: "Travel Case",
    headline: "Slim, magnetic travel protection for Miroooo.",
    description:
      "Ventilated acoustic travel pod. Slim, magnetic travel protection engineered with quad-magnetic snap closure and micro-ventilation ports for Miroooo X1 & Miroooo X2.",
    basePrice: 20.0,
    baseCompareAt: 40.0,
    rating: 4.9,
    reviewCount: 4275,
    plusBaseProductId: "travel-case",
    variants: [
      {
        id: "travel-case-default",
        name: "Default",
        color: "Default",
        swatch: "#888888",
        image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp",
        checkoutImage: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp",
      },
    ],
    specs: [
      { label: "Compatibility", value: "Miroooo X1 & Miroooo X2 Handles + 1 Brush Head" },
      { label: "Closure", value: "Quad-magnetic snap closure with micro-ventilation ports" },
      { label: "Material", value: "Matte soft-touch impact-resistant casing" },
      { label: "Dimensions", value: "215mm x 35mm x 28mm (62g)" },
    ],
    highlights: ["Quad-Magnetic Snap Closure", "Micro-Ventilated Ports", "Impact-Resistant Soft-Touch Shell"],
  },

  "x1-charger": {
    id: "x1-charger",
    handle: "x1-charger",
    name: "Miroooo X1 Magnetic Fast Charger",
    model: "X1 Charger",
    headline: "High-speed magnetic inductive charging dock.",
    description:
      "Fast 2-hour full charge for 60+ days battery. High-speed magnetic inductive charging dock exclusively for Miroooo X1 Sonic Electric Toothbrush.",
    basePrice: 20.0,
    baseCompareAt: 40.0,
    rating: 4.9,
    reviewCount: 4275,
    plusBaseProductId: "x1-charger",
    variants: [
      {
        id: "x1-charger-default",
        name: "Default",
        color: "Default",
        swatch: "#888888",
        image: "/assets_ref/x/gallery/MIROOOO-toothbrush-on-white-charging-dock.png",
        checkoutImage: "/assets_ref/x/gallery/MIROOOO-toothbrush-on-white-charging-dock.png",
      },
    ],
    specs: [
      { label: "Compatibility", value: "Miroooo X1 Sonic Electric Toothbrush exclusively" },
      { label: "Cable", value: "Integrated 1.0m braided USB-A to magnetic inductive dock" },
      { label: "Input", value: "5V/1A USB fast charging" },
      { label: "Safety", value: "Over-voltage, short-circuit and temperature surge protection" },
    ],
    highlights: ["Magnetic Inductive Charging Dock", "Fast 2-Hour Full Charge", "Integrated 1.0m Braided Cable", "Over-Voltage & Surge Protection"],
  },
};

/**
 * Get product pricing for a specific market rounded to 2 decimal places.
 */
export function getProductMarketPricing(product: ProductCatalogItem, market: MarketConfig) {
  const price = convertPrice(product.basePrice, market);
  const compareAt = convertPrice(product.baseCompareAt, market);
  const formattedPrice = formatMoney(price, market.currencySymbol);
  const formattedCompareAt = formatMoney(compareAt, market.currencySymbol);

  const bundles = (product.bundles || []).map((b) => {
    const bPrice = convertPrice(b.basePrice, market);
    const bCompare = convertPrice(b.baseCompareAt, market);
    return {
      ...b,
      price: bPrice,
      compareAt: bCompare,
      formattedPrice: formatMoney(bPrice, market.currencySymbol),
      formattedCompareAt: formatMoney(bCompare, market.currencySymbol),
      saving: b.savingText(market),
      description: b.description(market),
    };
  });

  return {
    price,
    compareAt,
    formattedPrice,
    formattedCompareAt,
    bundles,
  };
}

import type { ProductPageContent } from "./types";
import { MARKETS } from "./market";

export function getMirooooX(market: MarketConfig): ProductPageContent {
  const p1 = convertPrice(59.0, market);
  const c1 = convertPrice(119.0, market);
  const p2 = convertPrice(108.0, market);
  const c2 = convertPrice(238.0, market);
  const s2 = convertPrice(130.0, market);
  const p3 = convertPrice(147.0, market);
  const c3 = convertPrice(357.0, market);
  const s3 = convertPrice(210.0, market);
  const giftVal = convertPrice(10.0, market);

  return {
    id: "miroooo-x",
    name: "Miroooo X1",
    slug: "miroooo-x",
    checkoutProductId: "1000000675113473",
    checkoutSource: "miroooo",
    price: formatMoney(p1, market.currencySymbol),
    compareAt: formatMoney(c1, market.currencySymbol),
    rating: "4.9",
    customerCount: "4,275",
    defaultQuantity: 2,
    variants: [
      { id: "1000020700958564", colour: "Grey", label: "Grey", swatch: "#737373", image: "/media/products/miroooo-x/gallery/Grey-color-8.jpg" },
      { id: "1000020700958562", colour: "Pink", label: "Pink", swatch: "#f2a7b3", image: "/media/products/miroooo-x/gallery/RoseGold-color-1.jpg" },
      { id: "1000020700958563", colour: "Silver", label: "Silver", swatch: "#e5e5e5", image: "/media/products/miroooo-x/gallery/Silver-color-1.jpg" },
    ],
    media: [
      { id: "x-m1", type: "image", src: "/media/products/miroooo-x/gallery/Grey-color-8.jpg", alt: "Miroooo X1 Grey Sonic Toothbrush", width: 700, height: 700 },
      { id: "x-m2", type: "image", src: "/media/products/miroooo-x/gallery/RoseGold-color-1.jpg", alt: "Miroooo X1 Pink Sonic Toothbrush", width: 700, height: 700 },
      { id: "x-m3", type: "image", src: "/media/products/miroooo-x/gallery/Silver-color-1.jpg", alt: "Miroooo X1 Silver Sonic Toothbrush", width: 700, height: 700 },
      { id: "x-m4", type: "image", src: "/media/products/miroooo-x/gallery/Grey-color-1.jpg", alt: "Miroooo X1 Lifestyle", width: 700, height: 700 },
      { id: "x-m5", type: "image", src: "/media/products/miroooo-x/gallery/Grey-color-7.jpg", alt: "Miroooo X1 Detail", width: 700, height: 700 },
    ],
    bundles: [
      { quantity: 1, name: "BUY 1", price: formatMoney(p1, market.currencySymbol), compareAt: formatMoney(c1, market.currencySymbol), saving: "50% OFF", description: "Includes 1 Miroooo X1 set & 1 Travel Case" },
      { quantity: 2, name: "BUY 2", badge: "Most Popular", price: formatMoney(p2, market.currencySymbol), compareAt: formatMoney(c2, market.currencySymbol), saving: `SAVE ${formatMoney(s2, market.currencySymbol)}`, description: "Includes 2 Miroooo X1 sets + 1 FREE 2-Pack Brush Heads Set" },
      { quantity: 3, name: "BUY 3", badge: "BEST VALUE", price: formatMoney(p3, market.currencySymbol), compareAt: formatMoney(c3, market.currencySymbol), saving: `SAVE ${formatMoney(s3, market.currencySymbol)}`, description: "Includes 3 Miroooo X1 sets + 2 FREE 2-Pack Brush Heads Sets" },
    ],
    gifts: [
      { id: "gift-x-heads", name: "Free 2-Pack Replacement Heads", value: formatMoney(giftVal, market.currencySymbol), minimumQuantity: 2, image: "/assets_ref/x/heads/B1.webp" },
    ],
    highlights: [
      "32,000 VPM Acoustic Motor",
      "60+ Days Battery Life",
      "51g Ultralight Unibody",
      "IPX7 Immersion Waterproof",
    ],
  };
}

export function getMirooooX2(market: MarketConfig): ProductPageContent {
  const p1 = convertPrice(69.0, market);
  const c1 = convertPrice(139.0, market);
  const p2 = convertPrice(128.0, market);
  const c2 = convertPrice(278.0, market);
  const s2 = convertPrice(150.0, market);
  const p3 = convertPrice(177.0, market);
  const c3 = convertPrice(417.0, market);
  const s3 = convertPrice(240.0, market);
  const giftVal = convertPrice(10.0, market);

  return {
    id: "miroooo-x2",
    name: "Miroooo X2",
    slug: "miroooo-x2",
    checkoutProductId: "1000000675072187",
    checkoutSource: "miroooo-x2",
    price: formatMoney(p1, market.currencySymbol),
    compareAt: formatMoney(c1, market.currencySymbol),
    rating: "4.9",
    customerCount: "4,275",
    defaultQuantity: 2,
    variants: [
      { id: "1000020700182883", colour: "Grey", label: "Grey", swatch: "#737373", image: "/media/products/miroooo-x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-upright-grip.webp" },
      { id: "1000020700182882", colour: "Pink", label: "Pink", swatch: "#f2a7b3", image: "/media/products/miroooo-x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-upright-grip.webp" },
      { id: "1000020700182884", colour: "Silver", label: "Silver", swatch: "#e5e5e5", image: "/media/products/miroooo-x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp" },
    ],
    media: [
      { id: "x2-m1", type: "image", src: "/media/products/miroooo-x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp", alt: "Miroooo X2 Silver In Hand", width: 1200, height: 1200 },
      { id: "x2-m2", type: "image", src: "/media/products/miroooo-x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp", alt: "Miroooo X2 Silver Upright", width: 700, height: 700 },
      { id: "x2-m3", type: "image", src: "/media/products/miroooo-x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-upright-grip.webp", alt: "Miroooo X2 Grey Upright", width: 700, height: 700 },
      { id: "x2-m4", type: "image", src: "/media/products/miroooo-x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-upright-grip.webp", alt: "Miroooo X2 Pink Upright", width: 700, height: 700 },
      { id: "x2-m5", type: "image", src: "/media/products/miroooo-x2/gallery/miroooo-x2-sonic-electric-toothbrush-complete-set-packaging.webp", alt: "Miroooo X2 Complete Set Packaging", width: 1000, height: 1000 },
    ],
    bundles: [
      { quantity: 1, name: "BUY 1", price: formatMoney(p1, market.currencySymbol), compareAt: formatMoney(c1, market.currencySymbol), saving: "50% OFF", description: "Includes 1 Miroooo X2 set & 1 Travel Case" },
      { quantity: 2, name: "BUY 2", badge: "Most Popular", price: formatMoney(p2, market.currencySymbol), compareAt: formatMoney(c2, market.currencySymbol), saving: `SAVE ${formatMoney(s2, market.currencySymbol)}`, description: "Includes 2 Miroooo X2 sets + 1 FREE 2-Pack Brush Heads Set" },
      { quantity: 3, name: "BUY 3", badge: "BEST VALUE", price: formatMoney(p3, market.currencySymbol), compareAt: formatMoney(c3, market.currencySymbol), saving: `SAVE ${formatMoney(s3, market.currencySymbol)}`, description: "Includes 3 Miroooo X2 sets + 2 FREE 2-Pack Brush Heads Sets" },
    ],
    gifts: [
      { id: "gift-x2-heads", name: "Free 2-Pack Replacement Heads", value: formatMoney(giftVal, market.currencySymbol), minimumQuantity: 2, image: "/assets_ref/x2/heads/B1.webp" },
    ],
    highlights: [
      "45° Bass Sweep Motion",
      "Smart Red Halo Pressure Defense",
      "90-Day Battery Life",
      "Aerospace Aluminium Unibody",
    ],
  };
}

export const mirooooX: ProductPageContent = getMirooooX(MARKETS.uk);
export const mirooooX2: ProductPageContent = getMirooooX2(MARKETS.uk);

export function getProduct(handle: string): ProductCatalogItem | undefined {
  if (handle === "miroooo_x1") return PRODUCTS["miroooo-x"];
  if (handle === "miroooo_x2") return PRODUCTS["miroooo-x2"];
  if (handle === "wall_mounted_dock") return PRODUCTS["wall-mounted-dock"];
  if (handle === "travel_case") return PRODUCTS["travel-case"];
  if (handle === "x1_charger") return PRODUCTS["x1-charger"];
  return PRODUCTS[handle];
}

export function getAllProducts(): ProductCatalogItem[] {
  return Object.values(PRODUCTS);
}

export function getBrushes(): ProductCatalogItem[] {
  return [PRODUCTS["miroooo-x2"], PRODUCTS["miroooo-x"]];
}

export function getAccessories(): ProductCatalogItem[] {
  return [
    PRODUCTS["miroooo-x2-heads"],
    PRODUCTS["miroooo-x1-heads"],
    PRODUCTS["wall-mounted-dock"],
    PRODUCTS["travel-case"],
    PRODUCTS["x1-charger"],
  ];
}

