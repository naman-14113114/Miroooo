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
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-complete-set.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-duo.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-7-precision-nozzles.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-dual-upright-silhouette.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-7-nozzles-kit.webp',
  ],
  thumbnails: [
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-complete-set.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-duo.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-7-precision-nozzles.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-dual-upright-silhouette.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-7-nozzles-kit.webp',
  ],
  alts: [
    'Miroooo Water Flosser Matte Black Complete Set with 7 Precision Dental Nozzles and Luxury Packaging - US',
    'Miroooo Water Flosser Obsidian Black and Pearl White Duo in Luxury Studio Setting - US',
    'Miroooo Water Flosser Matte Black 7 Specialized Precision Nozzle Tips Breakdown - US',
    'Miroooo Water Flosser Matte Black and Pearl White Upright Silhouette 138 PSI Deep Clean - US',
    'Miroooo Water Flosser Matte Black Complete Unboxing Kit with USB-C Charging Cable - US',
  ],
};

const whiteVariant: FlosserGalleryVariant = {
  images: [
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-complete-set.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-duo.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-7-precision-nozzles.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-dual-upright-silhouette.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-7-nozzles-kit.webp',
  ],
  thumbnails: [
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-complete-set.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-duo.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-7-precision-nozzles.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-dual-upright-silhouette.webp',
    '/assets_ref/flosser/gallery/miroooo-water-flosser-white-7-nozzles-kit.webp',
  ],
  alts: [
    'Miroooo Water Flosser Pearl White Complete Set with 7 Precision Dental Nozzles and Luxury Packaging - US',
    'Miroooo Water Flosser Pearl White and Obsidian Black Duo in Luxury Studio Setting - US',
    'Miroooo Water Flosser Pearl White 7 Specialized Precision Nozzle Tips Breakdown - US',
    'Miroooo Water Flosser Pearl White and Obsidian Black Upright Silhouette 138 PSI Deep Clean - US',
    'Miroooo Water Flosser Pearl White Complete Unboxing Kit with USB-C Charging Cable - US',
  ],
};

export const flosserGallery = {
  Black: blackVariant,
  White: whiteVariant,
  'Matte Black': blackVariant,
  'Pearl White': whiteVariant,
} as const;

export type FlosserColor = keyof typeof flosserGallery;

/**
 * Dynamically resolves gallery images for Miroooo Water Flosser based on color choice.
 * Falls back safely to 'Black' if color is undefined or not recognized.
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

  const badgesList: Array<FlosserInfographicBadge | undefined> = [
    {
      pos: 'miroooo-infographic-badge--top-right miroooo-infographic-badge--white',
      title: '7 Precision<br>Nozzles',
      sub: 'Complete Care For Braces & Gums',
    },
    {
      pos: 'miroooo-infographic-badge--bottom-left miroooo-infographic-badge--white',
      title: '138 PSI<br>Peak Power',
      sub: 'Medical-Grade Piston Pump Deep Clean',
    },
    {
      pos: 'miroooo-infographic-badge--top-left miroooo-infographic-badge--white',
      title: 'Targeted Care<br>Specialists',
      sub: 'Periodontal & Orthodontic Heads',
    },
    {
      pos: 'miroooo-infographic-badge--top-left miroooo-infographic-badge--white',
      title: 'IPX7 100%<br>Waterproof',
      sub: 'Shower-Safe & Fully Submersible',
    },
    {
      pos: 'miroooo-infographic-badge--bottom-right miroooo-infographic-badge--white',
      title: '60-Day<br>Battery Life',
      sub: '2000mAh Battery On 1 Quick Charge',
    },
  ];

  return variant.images.map((src, index): FlosserGallerySlide => {
    return {
      type: 'image',
      src,
      thumbImg: variant.thumbnails[index] || src,
      alt: variant.alts[index] || `Miroooo Water Flosser view ${index + 1}`,
      badge: badgesList[index],
    };
  });
}
