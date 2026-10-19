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
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-studio-still-life-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-graphite-black-four-indicator-dots-interface-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-satin-black-luxury-white-towel-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-minimalist-studio-architecture-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-seven-specialized-attachments-kit-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-lifestyle-still-life-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-sculptural-porcelain-tray-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-man-examining-precision-nozzle-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-relaxed-man-holding-ergonomic-grip-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-luxury-stone-vanity-uk.webp',
  ],
  thumbnails: [
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-studio-still-life-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-graphite-black-four-indicator-dots-interface-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-satin-black-luxury-white-towel-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-minimalist-studio-architecture-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-seven-specialized-attachments-kit-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-lifestyle-still-life-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-sculptural-porcelain-tray-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-man-examining-precision-nozzle-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-relaxed-man-holding-ergonomic-grip-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-black-luxury-stone-vanity-uk.webp',
  ],
  alts: [
    'Miroooo Cordless Water Flosser Matt Black Studio Still Life Display - UK Deep Clean',
    'Miroooo Water Flosser Graphite Black Smart 4-Mode LED Indicator Interface - UK',
    'Miroooo Water Flosser Satin Matt Black Resting on Pure White Luxury Towel - UK',
    'Miroooo Cordless Water Flosser Matt Black in Modern Minimalist Studio Setting - UK',
    'Miroooo Water Flosser Matt Black with 7 Specialized Precision Nozzle Attachments - UK',
    'Miroooo Cordless Water Flosser Matt Black Elegant Bathroom Still Life - UK',
    'Miroooo Water Flosser Matt Black on Architectural Ceramic Porcelain Tray - UK',
    'Man Examining Miroooo Cordless Water Flosser Matt Black Precision Jet Tip - UK',
    'Relaxed Man Holding Miroooo Water Flosser Matt Black with Ergonomic Non-Slip Grip - UK',
    'Miroooo Cordless Water Flosser Matt Black Upright on Luxury Natural Stone Vanity - UK',
  ],
};

const whiteVariant: FlosserGalleryVariant = {
  images: [
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-pearl-white-display-wedge-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-pearl-white-reflective-silver-tray-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-pearl-white-sculptural-architectural-arch-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-white-mist-blue-minimalist-backdrop-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-four-dot-control-plate-battery-bar-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-seven-specialized-attachments-kit-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-four-dot-control-plate-battery-indicator-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-lifted-from-bathroom-shelf-lifestyle-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-four-mode-cleaning-panel-close-up-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-bright-sunlit-bathroom-lifestyle-uk.webp',
  ],
  thumbnails: [
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-pearl-white-display-wedge-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-pearl-white-reflective-silver-tray-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-pearl-white-sculptural-architectural-arch-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-cordless-water-flosser-white-mist-blue-minimalist-backdrop-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-four-dot-control-plate-battery-bar-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-seven-specialized-attachments-kit-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-four-dot-control-plate-battery-indicator-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-lifted-from-bathroom-shelf-lifestyle-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-four-mode-cleaning-panel-close-up-uk.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-bright-sunlit-bathroom-lifestyle-uk.webp',
  ],
  alts: [
    'Miroooo Cordless Water Flosser Pearl White on Architectural Display Wedge - UK Deep Clean',
    'Miroooo Water Flosser Pearl White Displayed on Reflective Silver Vanity Tray - UK',
    'Miroooo Water Flosser Pearl White Framed in Sculptural Architectural Arch - UK',
    'Miroooo Cordless Water Flosser Pearl White on Calming Mist-Blue Backdrop - UK',
    'Miroooo Water Flosser Pearl White 4-Dot Smart Control Plate with LED Battery Bar - UK',
    'Miroooo Water Flosser Pearl White with 7 Specialized Precision Nozzle Attachments - UK',
    'Miroooo Water Flosser Pearl White Ergonomic Handle with LED Battery Indicator - UK',
    'Miroooo Water Flosser Pearl White Lifted from Minimalist Bathroom Shelf - UK',
    'Miroooo Water Flosser Pearl White 4 Cleaning Modes Selection Panel Close-Up - UK',
    'Miroooo Water Flosser Pearl White in Bright Sunlit Luxury Bathroom - UK',
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
