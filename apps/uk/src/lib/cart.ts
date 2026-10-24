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
  hasFreeGiftCard: boolean;
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
  'miroooo-x1-charging-dock': 'x1-charger',
  'x1-charging-dock': 'x1-charger',
  'charging-dock': 'x1-charger',
  'miroooo-charger': 'x1-charger',
  'charger': 'x1-charger',
  'travel-case': 'travel-case',
  'miroooo-travel-case': 'travel-case',
  'wall-mounted-dock': 'wall-mounted-dock',
  'miroooo-dock': 'wall-mounted-dock',
  'miroooo-wall-mounted-dock': 'wall-mounted-dock',
  'miroooo-gift-card': 'miroooo-gift-card',
  'gift-card': 'miroooo-gift-card',
  'giftcard': 'miroooo-gift-card',
  'a2f687d2-56cd-4709-95a5-e6d280070c18': 'miroooo-gift-card',
  'a2f687d5-32cc-427c-81f1-5d153911e592': 'miroooo-gift-card',
  'miroooo-package-protection': 'miroooo-package-protection',
  'package-protection': 'miroooo-package-protection',
  'packageprotection': 'miroooo-package-protection',
  'shipping-protection': 'miroooo-package-protection',
  'a2f6dfa1-50ae-46c9-a88e-fdb563e124a2': 'miroooo-package-protection',
  'miroooo-water-flosser': 'miroooo-water-flosser',
  'water-flosser': 'miroooo-water-flosser',
  'flosser': 'miroooo-water-flosser',
  'a2f69a15-e357-403b-a11c-b3912eb49b1d': 'miroooo-water-flosser',
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
      unitPrice: variant.price ?? product.price,
      comparePrice: variant.compareAt ?? product.compareAt,
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
  let flosserCount = 0;
  let x2HeadsCount = 0;
  let x1HeadsCount = 0;

  let otherItemsQty = 0;
  let otherItemsSubtotal = 0;
  let otherItemsCompareAt = 0;
  let x2ItemSubtotal = 0;
  let x1ItemSubtotal = 0;
  let x2ItemCompare = 0;
  let x1ItemCompare = 0;
  let flosserItemCompare = 0;

  items.forEach((item) => {
    const qty = item.quantity || 1;
    if (item.productHandle === 'miroooo-x2') {
      x2Count += qty;
      x2ItemSubtotal += (item.unitPrice || 69) * qty;
      x2ItemCompare += (item.comparePrice || 139) * qty;
    }
    else if (item.productHandle === 'miroooo-x') {
      x1Count += qty;
      x1ItemSubtotal += (item.unitPrice || 69) * qty;
      x1ItemCompare += (item.comparePrice || 139) * qty;
    }
    else if (item.productHandle === 'miroooo-water-flosser') {
      flosserCount += qty;
      otherItemsQty += qty;
      const effectiveUnitPrice = item.unitPrice || 69.0;
      otherItemsSubtotal += effectiveUnitPrice * qty;
      flosserItemCompare += (item.comparePrice || 139.0) * qty;
    }
    else if (item.productHandle === 'miroooo-x2-heads') x2HeadsCount += qty;
    else if (item.productHandle === 'miroooo-x1-heads') x1HeadsCount += qty;
    else {
      otherItemsQty += qty;
      const isPackageProtection = item.productHandle === 'miroooo-package-protection';
      const effectiveUnitPrice = isPackageProtection ? 3 : (item.unitPrice || 0);
      otherItemsSubtotal += effectiveUnitPrice * qty;
      otherItemsCompareAt += ((item.comparePrice || (isPackageProtection ? 3 : item.unitPrice)) || 0) * qty;
    }
  });

  const totalQty = x2Count + x1Count + x2HeadsCount + x1HeadsCount + otherItemsQty;
  const isX2 = x2Count > 0;
  const isX1 = x1Count > 0;
  const hasPaidHeads = x2HeadsCount > 0 || x1HeadsCount > 0;
  const isHeadsOnly = hasPaidHeads && x2Count === 0 && x1Count === 0;

  const isX2Bundle = x1Count === 0 && (x2Count === 1 || x2Count === 2 || x2Count === 3);
  const isX1Bundle = x2Count === 0 && (x1Count === 1 || x1Count === 2 || x1Count === 3);

  // Compare At calculations (base compare: flosser 139, X2 brush 139, X1 brush 139, heads 20)
  const flosserCompare = flosserItemCompare || (flosserCount * 139.0);
  const x2Compare = x2ItemCompare || (x2Count * 139);
  const x1Compare = x1ItemCompare || (x1Count * 139);
  const x2HeadsCompare = x2HeadsCount * 20;
  const x1HeadsCompare = x1HeadsCount * 20;
  const compareAt = flosserCompare + x2Compare + x1Compare + x2HeadsCompare + x1HeadsCompare + otherItemsCompareAt;

  // Base savings on brushes (reference canonical: x1Count * 69, x2Count * 69)
  const baseBrushCompareSavings = Math.max(0, (x2Compare - (x2Count === 1 ? x2ItemSubtotal : (x2Count === 2 ? 128 : (x2Count === 3 ? 177 : x2ItemSubtotal)))) + (x1Compare - (x1Count === 1 ? x1ItemSubtotal : (x1Count === 2 ? 128 : (x1Count === 3 ? 177 : x1ItemSubtotal)))));
  const baseHeadsCompareSavings = x2HeadsCount * (20 - 10) + x1HeadsCount * (20 - 10);

  let x2BundlePromoDiscount = 0;
  let x2BundlePromoName = '';
  let extraBrushHeadSets = 0;

  if (x1Count === 0) {
    if (x2Count === 1) {
      x2BundlePromoDiscount = 0;
      x2BundlePromoName = '';
      extraBrushHeadSets = 1;
    } else if (x2Count === 2) {
      x2BundlePromoDiscount = 10;
      x2BundlePromoName = 'Buy 2 bundle (£10 extra saving)';
      extraBrushHeadSets = 2;
    } else if (x2Count === 3) {
      x2BundlePromoDiscount = 30;
      x2BundlePromoName = 'Buy 3 bundle (£30 extra saving)';
      extraBrushHeadSets = 3;
    }
  }

  let x1BundleDiscount = 0;
  let x1BundlePromoName = '';
  let extraX1BrushHeadSets = 0;

  if (x2Count === 0) {
    if (x1Count === 1) {
      x1BundleDiscount = 0;
      x1BundlePromoName = '';
      extraX1BrushHeadSets = 1;
    } else if (x1Count === 2) {
      x1BundleDiscount = 10;
      x1BundlePromoName = 'Buy 2 bundle (£10 extra saving)';
      extraX1BrushHeadSets = 2;
    } else if (x1Count === 3) {
      x1BundleDiscount = 30;
      x1BundlePromoName = 'Buy 3 bundle (£30 extra saving)';
      extraX1BrushHeadSets = 3;
    }
  }

  let giftsValue = 0;
  let unlockedGiftsCount = 0;
  let hasFreeGiftCard = false;

  if (x2Count > 0 || x1Count > 0 || flosserCount > 0) {
    giftsValue += 10;
    unlockedGiftsCount += 1;
    hasFreeGiftCard = true;
  }

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

  // Net calculation per brush model (reference rule: x2Count * 69, x1Count * 69)
  const x2Net = x1Count === 0
    ? (x2Count === 1 ? x2ItemSubtotal : (x2Count === 2 ? 128 : (x2Count === 3 ? 177 : Math.max(0, x2ItemSubtotal - x2BundlePromoDiscount))))
    : x2ItemSubtotal;
  const x1Net = x2Count === 0
    ? (x1Count === 1 ? x1ItemSubtotal : (x1Count === 2 ? 128 : (x1Count === 3 ? 177 : Math.max(0, x1ItemSubtotal - x1BundleDiscount))))
    : x1ItemSubtotal;
  const brushSubtotal = Math.max(0, x2Net + x1Net);
  const subtotal = Math.max(0, brushSubtotal + headsNet + otherItemsSubtotal);

  // Promo code MIROOOO10: 10% discount strictly on brush subtotal (heads excluded), rounded integer
  const hasValidPromo = appliedPromoCodes.some((code) =>
    VALID_PROMO_CODES.includes(code.toUpperCase().trim())
  );
  const promoDiscount = hasValidPromo ? Math.round(brushSubtotal * 0.1) : 0;

  const finalSubtotal = Math.max(0, Number((subtotal - promoDiscount).toFixed(2)));
  const bundlePromoDiscount = x2BundlePromoDiscount > 0 ? x2BundlePromoDiscount : x1BundleDiscount > 0 ? x1BundleDiscount : isHeadsOnly && headsBundleDiscount > 0 ? headsBundleDiscount : 0;
  const bundlePromoName = x2BundlePromoName || x1BundlePromoName || (isHeadsOnly && headsBundleDiscount > 0 ? `Buy ${headsBundleCount} heads bundle (£${headsBundleDiscount} extra saving)` : '');
  const bundleSavings = baseBrushCompareSavings + baseHeadsCompareSavings + headsBundleDiscount;
  const totalSavings = Number(
    (bundleSavings + (isHeadsOnly ? 0 : (x2BundlePromoDiscount + x1BundleDiscount)) + giftsValue + promoDiscount).toFixed(2)
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
    hasFreeGiftCard,
  };
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(Number(amount) || 0);
}
