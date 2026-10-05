import { PRODUCTS } from '@/data/products';

export interface CartItem {
  id: string; // unique item id e.g. "miroooo-x2-Pink-0" or "miroooo-x2:Pink"
  productHandle: string;
  productId: string;
  variantId: string;
  title: string;
  subtitle?: string;
  color: 'Grey' | 'Pink' | 'Silver' | 'Default' | string;
  quantity: number;
  unitPrice: number;
  comparePrice: number;
  image: string;
  url: string;
  isFree?: boolean;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  compareAt: number;
  bundleSavings: number;
  bundlePromoDiscount: number;
  bundlePromoName: string;
  unlockedGiftsCount: number;
  giftsValue: number;
  promoDiscount: number;
  totalSavings: number;
  finalSubtotal: number;
  isX2: boolean;
  isX1: boolean;
  isHeadsOnly: boolean;
  isX1Heads: boolean;
  isX2Heads: boolean;
  extraBrushHeadSets: number;
  extraX1BrushHeadSets: number;
  x2Count: number;
  x1Count: number;
  x2HeadsCount: number;
  x1HeadsCount: number;
  bundleEligible: boolean;
}

export const VALID_PROMO_CODES = ['MIROOOO', 'MIROOOO10'];

const UK_HANDLE_ALIASES: Record<string, string> = {
  'miroooo-x1': 'miroooo-x',
  'miroooo-x': 'miroooo-x',
  'x1': 'miroooo-x',
  'miroooo-x2': 'miroooo-x2',
  'x2': 'miroooo-x2',
  'miroooo-x1-heads': 'miroooo-x1-heads',
  'miroooo-x-heads': 'miroooo-x1-heads',
  'x1-heads': 'miroooo-x1-heads',
  'miroooo-x2-heads': 'miroooo-x2-heads',
  'x2-heads': 'miroooo-x2-heads',
  'x1-charger': 'x1-charger',
  'miroooo-charger': 'x1-charger',
  'charger': 'x1-charger',
  'travel-case': 'travel-case',
  'miroooo-travel-case': 'travel-case',
  'wall-mounted-dock': 'wall-mounted-dock',
  'miroooo-dock': 'wall-mounted-dock',
  'miroooo-wall-mounted-dock': 'wall-mounted-dock',
  '1000000675113473': 'miroooo-x',
  '1000000675072187': 'miroooo-x2',
  '1000000675471182': 'miroooo-x1-heads',
  '1000000675616058': 'miroooo-x2-heads',
  '1000000675113474': 'travel-case',
  '1000000675113475': 'wall-mounted-dock',
  '1000000675113476': 'x1-charger',
};

/** Rebuild every cart line from the UK catalogue. Stored/requested prices are never trusted. */
export function normalizeCartItems(raw: unknown, strict = false): CartItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((value, index): CartItem[] => {
    if (!value || typeof value !== 'object') return [];
    const line = value as Partial<CartItem>;
    if (line.isFree || /(?:^|:)free(?:$|:)/i.test(String(line.id || ''))) return [];
    const rawHandle = String(line.productHandle || line.productId || '');
    const resolvedHandle = UK_HANDLE_ALIASES[rawHandle.toLowerCase()] || rawHandle;
    const product = PRODUCTS[resolvedHandle];
    const quantity = Number(line.quantity ?? 1);
    if (!product || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 99) {
      if (strict) throw new Error('Invalid checkout item.');
      return [];
    }
    const variant = product.variants.find((item) => item.id === String(line.variantId || '')) ||
      (!strict ? product.variants.find((item) => item.color.toLowerCase() === String(line.color || '').toLowerCase()) : undefined) ||
      (!strict ? product.variants[0] : undefined);
    if (!variant) {
      if (strict) throw new Error('Invalid checkout variant.');
      return [];
    }
    const isBrush = product.handle === 'miroooo-x' || product.handle === 'miroooo-x2';
    return [{
      id: String(line.id || `${product.handle}-${variant.color}-${index}`),
      productHandle: product.handle,
      productId: product.plusBaseProductId,
      variantId: variant.id,
      title: isBrush ? `${product.name} (${variant.color})` : product.name,
      subtitle: product.subtitle,
      color: variant.color,
      quantity,
      unitPrice: product.price,
      comparePrice: product.compareAt,
      image: variant.image,
      url: `/products/${product.handle}${isBrush ? `?color=${variant.color}` : ''}`,
    }];
  });
}

function getHeadsNetGBP(count: number): number {
  if (count <= 0) return 0;
  if (count === 1) return 10;
  if (count === 2) return 18;
  if (count === 3) return 24;
  return 24 + (count - 3) * 8;
}

export function calculateTotals(items: CartItem[], appliedPromoCodes: string[]): CartTotals {
  let x2Count = 0;
  let x1Count = 0;
  let x2HeadsCount = 0;
  let x1HeadsCount = 0;

  items.forEach((item) => {
    const qty = item.quantity || 1;
    if (item.productHandle === 'miroooo-x2') x2Count += qty;
    else if (item.productHandle === 'miroooo-x') x1Count += qty;
    else if (item.productHandle === 'miroooo-x2-heads') x2HeadsCount += qty;
    else if (item.productHandle === 'miroooo-x1-heads') x1HeadsCount += qty;
  });

  const totalQty = x2Count + x1Count + x2HeadsCount + x1HeadsCount;
  const isX2 = x2Count > 0;
  const isX1 = x1Count > 0;
  const hasPaidHeads = x2HeadsCount > 0 || x1HeadsCount > 0;
  const isHeadsOnly = hasPaidHeads && x2Count === 0 && x1Count === 0;

  // Pure bundle qualification:
  // ONLY if NO paid heads are in cart, and exactly 1, 2 or 3 for X2, or 2 or 3 for X1
  const isX2Bundle = !hasPaidHeads && x1Count === 0 && (x2Count === 1 || x2Count === 2 || x2Count === 3);
  const isX1Bundle = !hasPaidHeads && x2Count === 0 && (x1Count === 2 || x1Count === 3);

  // Compare At calculations (base compare: brush 139, heads 20)
  const x2Compare = x2Count * 139;
  const x1Compare = x1Count * 139;
  const x2HeadsCompare = x2HeadsCount * 20;
  const x1HeadsCompare = x1HeadsCount * 20;
  const compareAt = x2Compare + x1Compare + x2HeadsCompare + x1HeadsCompare;

  // Base 50% savings on brushes
  const baseBrushCompareSavings = x2Count * (139 - 69) + x1Count * (139 - 69);
  const baseHeadsCompareSavings = x2HeadsCount * (20 - 10) + x1HeadsCount * (20 - 10);

  let x2BundlePromoDiscount = 0;
  let x2BundlePromoName = '';
  let extraBrushHeadSets = 0;

  if (isX2Bundle) {
    if (x2Count === 1) {
      x2BundlePromoDiscount = 0;
      x2BundlePromoName = '';
      extraBrushHeadSets = 1;
    } else if (x2Count === 2) {
      x2BundlePromoDiscount = 10;
      x2BundlePromoName = 'Buy 2 bundle (£10 extra saving)';
      extraBrushHeadSets = 1;
    } else if (x2Count === 3) {
      x2BundlePromoDiscount = 30;
      x2BundlePromoName = 'Buy 3 bundle (£30 extra saving)';
      extraBrushHeadSets = 2;
    }
  }

  let x1BundleDiscount = 0;
  let extraX1BrushHeadSets = 0;

  if (isX1Bundle) {
    if (x1Count === 2) {
      x1BundleDiscount = 10;
      extraX1BrushHeadSets = 1;
    } else if (x1Count === 3) {
      x1BundleDiscount = 30;
      extraX1BrushHeadSets = 2;
    }
  }

  let giftsValue = 0;
  let unlockedGiftsCount = 0;

  if (extraBrushHeadSets > 0) {
    giftsValue += extraBrushHeadSets * 10;
    unlockedGiftsCount += extraBrushHeadSets;
  }
  if (extraX1BrushHeadSets > 0) {
    giftsValue += extraX1BrushHeadSets * 10;
    unlockedGiftsCount += extraX1BrushHeadSets;
  }

  const headsBase = x2HeadsCount * 10 + x1HeadsCount * 10;
  const headsNet = getHeadsNetGBP(x2HeadsCount) + getHeadsNetGBP(x1HeadsCount);
  const headsBundleDiscount = headsBase - headsNet;
  const headsBundleCount = x1HeadsCount || x2HeadsCount;

  const x2Net = x2Count * 69 - x2BundlePromoDiscount;
  const x1Net = x1Count * 69 - x1BundleDiscount;
  const brushSubtotal = Math.max(0, x2Net + x1Net);
  const subtotal = Math.max(0, brushSubtotal + headsNet);

  // Promo code MIROOOO10: 10% discount strictly on brush subtotal (heads excluded), rounded integer
  const hasValidPromo = appliedPromoCodes.some((code) =>
    VALID_PROMO_CODES.includes(code.toUpperCase().trim())
  );
  const promoDiscount = hasValidPromo ? Math.round(brushSubtotal * 0.1) : 0;

  const finalSubtotal = Math.max(0, Number((subtotal - promoDiscount).toFixed(2)));
  const bundleSavings = baseBrushCompareSavings + x1BundleDiscount + baseHeadsCompareSavings + headsBundleDiscount;
  const bundlePromoDiscount = x2BundlePromoDiscount > 0 ? x2BundlePromoDiscount : isHeadsOnly && headsBundleDiscount > 0 ? headsBundleDiscount : 0;
  const bundlePromoName = x2BundlePromoName || (isHeadsOnly && headsBundleDiscount > 0 ? `Buy ${headsBundleCount} heads bundle (£${headsBundleDiscount} extra saving)` : '');
  const totalSavings = Number(
    (bundleSavings + (isHeadsOnly ? 0 : x2BundlePromoDiscount) + giftsValue + promoDiscount).toFixed(2)
  );

  return {
    itemCount: totalQty,
    subtotal,
    compareAt,
    bundleSavings,
    bundlePromoDiscount,
    bundlePromoName,
    unlockedGiftsCount,
    giftsValue,
    promoDiscount,
    totalSavings,
    finalSubtotal,
    isX2,
    isX1,
    isHeadsOnly,
    isX1Heads: x1HeadsCount > 0,
    isX2Heads: x2HeadsCount > 0,
    extraBrushHeadSets,
    extraX1BrushHeadSets,
    x2Count,
    x1Count,
    x2HeadsCount,
    x1HeadsCount,
    bundleEligible: isX2Bundle || isX1Bundle || (isHeadsOnly && ((x1HeadsCount >= 1 && x1HeadsCount <= 3 && x2HeadsCount === 0) || (x2HeadsCount >= 1 && x2HeadsCount <= 3 && x1HeadsCount === 0))),
  };
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(Number(amount) || 0);
}
