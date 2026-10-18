export interface FlosserGalleryVariant {
  images: string[];
  thumbnails: string[];
  alts: string[];
}

export interface FlosserInfographicBadge {
  pos: string;
  title: string;
  sub: string;
}

export interface FlosserGallerySlide {
  type: 'image' | 'video';
  src?: string;
  alt: string;
  thumbImg: string;
  videoSrc?: string;
  poster?: string;
  badge?: FlosserInfographicBadge;
  badges?: FlosserInfographicBadge[];
  isModesBadge?: boolean;
}

const blackVariant: FlosserGalleryVariant = {
  images: [
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-ivory-stone-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-7-attachments-precision-kit-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-matte-black-satin-finish-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-control-interface-detail-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-sculptural-water-splash-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-delicate-micro-spray-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-glass-carafe-bathroom-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-linen-lifestyle-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-coiled-usb-charging-cable-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-premium-black-white-duo-uk.webp',
  ],
  thumbnails: [
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-ivory-stone-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-7-attachments-precision-kit-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-matte-black-satin-finish-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-control-interface-detail-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-sculptural-water-splash-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-delicate-micro-spray-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-glass-carafe-bathroom-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-linen-lifestyle-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-coiled-usb-charging-cable-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-premium-black-white-duo-uk.webp',
  ],
  alts: [
    'Miroooo Cordless Water Flosser Matt Black on Natural Ivory Stone - UK Dental Deep Clean',
    'Miroooo Water Flosser Matt Black Complete Set with 7 Precision Nozzles & Travel Case - UK',
    'Miroooo Water Flosser Premium Satin Matt Black Finish Ergonomic Grip - UK',
    'Miroooo Water Flosser Matt Black 4-Mode Smart LED Control Interface Close-Up - UK',
    'Miroooo Water Flosser Matt Black 138 PSI High-Frequency Ultrasonic Water Jet Splash - UK',
    'Miroooo Water Flosser Matt Black Precision Interdental Micro-Spray Action - UK',
    'Miroooo Water Flosser Matt Black with 320ml Detachable Reservoir Beside Glass Carafe - UK',
    'Miroooo Water Flosser Matt Black Compact Design on Crisp White Linen - UK',
    'Miroooo Water Flosser Matt Black with USB-C Fast Charging Cable & 60-Day Battery - UK',
    'Miroooo Water Flosser Premium Matt Black and Pearl White Duo Set - UK',
  ],
};

const whiteVariant: FlosserGalleryVariant = {
  images: [
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-white-porcelain-pedestal-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-7-attachments-precision-kit-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-pearl-white-morning-light-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-control-interface-detail-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-frozen-water-splash-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-frozen-droplets-waterproof-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-clear-water-glass-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-pearl-white-blue-light-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-coiled-usb-charging-cable-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-pearl-white-black-duo-uk.webp',
  ],
  thumbnails: [
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-white-porcelain-pedestal-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-7-attachments-precision-kit-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-pearl-white-morning-light-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-control-interface-detail-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-frozen-water-splash-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-frozen-droplets-waterproof-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-clear-water-glass-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-pearl-white-blue-light-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-coiled-usb-charging-cable-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-pearl-white-black-duo-uk.webp',
  ],
  alts: [
    'Miroooo Cordless Water Flosser Pearl White on Architectural Porcelain Pedestal - UK Dental Deep Clean',
    'Miroooo Water Flosser Pearl White Complete Set with 7 Precision Nozzles & Travel Case - UK',
    'Miroooo Water Flosser Pearl White in Serene Morning Bathroom Sunlight - UK',
    'Miroooo Water Flosser Pearl White 4-Mode Smart LED Control Interface Close-Up - UK',
    'Miroooo Water Flosser Pearl White High-Pressure Water Splash 2000 Pulses Per Min - UK',
    'Miroooo Water Flosser Pearl White IPX7 100% Waterproof Unibody with Frozen Droplets - UK',
    'Miroooo Water Flosser Pearl White with 320ml Detachable Reservoir Beside Clear Glass - UK',
    'Miroooo Water Flosser Pearl White in Ambient Blue Light Architectural Setting - UK',
    'Miroooo Water Flosser Pearl White with USB-C Fast Charging Cable & 60-Day Battery - UK',
    'Miroooo Water Flosser Pearl White and Obsidian Black Luxury Bathroom Pair - UK',
  ],
};

export const flosserGallery = {
  Black: blackVariant,
  White: whiteVariant,
  'Matt Black': blackVariant,
  'Matte Black': blackVariant,
  'Pearl White': whiteVariant,
} as const;

export type FlosserColor = keyof typeof flosserGallery;

/**
 * Dynamically resolves gallery images for Miroooo Water Flosser based on colour choice.
 * Falls back safely to 'Black' if colour is undefined or not recognised.
 */
export function getFlosserGalleryForColor(color?: string): FlosserGalleryVariant {
  if (!color) return flosserGallery.Black;
  const key = color.trim().toLowerCase();
  if (key.includes('white')) {
    return flosserGallery.White;
  }
  return flosserGallery.Black;
}

/**
 * Returns complete interactive gallery slides with feature badges for Miroooo Water Flosser hero.
 */
export function getFlosserHeroSlides(selectedColor?: string): FlosserGallerySlide[] {
  const variant = getFlosserGalleryForColor(selectedColor);

  return variant.images.map((src, index): FlosserGallerySlide => {
    return {
      type: 'image',
      src,
      thumbImg: variant.thumbnails[index] || src,
      alt: variant.alts[index] || `Miroooo Water Flosser view ${index + 1}`,
    };
  });
}
