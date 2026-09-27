export type ProductId = "miroooo-x" | "miroooo-x2";

export type ProductColour = "Pink" | "Grey" | "Silver";

export type AttributionKey =
  | "msclkid"
  | "gclid"
  | "fbclid"
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_term"
  | "utm_content";

export interface LegacyProductVariant {
  id: string;
  colour: ProductColour;
  label: string;
  swatch: string;
  image: string;
}

export interface ProductMedia {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
  width: number;
  height: number;
}

export interface Gift {
  id: string;
  name: string;
  value?: string;
  minimumQuantity: number;
  image?: string;
}

export interface BundleTier {
  quantity: 1 | 2 | 3;
  name: string;
  badge?: string;
  price: string;
  compareAt: string;
  saving: string;
  description: string;
}

export interface ProductPageContent {
  id: ProductId;
  name: string;
  slug: string;
  checkoutProductId: string;
  checkoutSource: "miroooo" | "miroooo-x2";
  price: string;
  compareAt: string;
  rating: string;
  customerCount: string;
  defaultQuantity: 2;
  variants: LegacyProductVariant[];
  media: ProductMedia[];
  bundles: BundleTier[];
  gifts: Gift[];
  highlights: string[];
}

export interface Review {
  id: string;
  productId: ProductId;
  author: string;
  title: string;
  body: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  verified: boolean;
  helpful: number;
  images: string[];
}

export interface ReviewSummary {
  average: number;
  total: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

