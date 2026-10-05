import { PRODUCTS } from '@/data/products';
import { cents, roundMoney, formatUSD } from './money';
export { formatUSD } from './money';

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

const US_HANDLE_ALIASES: Record<string, string> = {
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

/** Rebuild every cart line from the US catalogue. Stored/requested prices are never trusted. */
export function normalizeCartItems(raw: unknown, strict = false): CartItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((value, index): CartItem[] => {
    if (!value || typeof value !== 'object') return [];
    const line = value as Partial<CartItem>;
    if (line.isFree || /(?:^|:)free(?:$|:)/i.test(String(line.id || ''))) return [];
    const rawHandle = String(line.productHandle || line.productId || '');
    const resolvedHandle = US_HANDLE_ALIASES[rawHandle.toLowerCase()] || rawHandle;
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

function getHeadsNetCents(count: number): number {
  if (count <= 0) return 0;
  if (count === 1) return 1000;
  if (count === 2) return 1800;
  if (count === 3) return 2400;
  return 2400 + (count - 3) * 800;
}

export function calculateTotals(items: CartItem[], appliedPromoCodes: string[]): CartTotals {
  const count = (handle: string) => items.filter((item) => item.productHandle === handle)
    .reduce((sum, item) => sum + item.quantity, 0);
  const x1Count = count('miroooo-x');
  const x2Count = count('miroooo-x2');
  const x1HeadsCount = count('miroooo-x1-heads');
  const x2HeadsCount = count('miroooo-x2-heads');
  const x1 = PRODUCTS['miroooo-x'];
  const x2 = PRODUCTS['miroooo-x2'];
  const h1 = PRODUCTS['miroooo-x1-heads'];
  const h2 = PRODUCTS['miroooo-x2-heads'];
  const isX1Bundle = x2Count === 0 && (x1Count === 2 || x1Count === 3);
  const isX2Bundle = x1Count === 0 && (x2Count === 1 || x2Count === 2 || x2Count === 3);
  const tier = isX1Bundle ? x1.bundles[x1Count - 1] : isX2Bundle && x2Count > 1 ? x2.bundles[x2Count - 1] : undefined;
  const extraX1BrushHeadSets = x2Count === 0 ? (x1Count === 2 ? 1 : x1Count === 3 ? 2 : 0) : 0;
  const extraBrushHeadSets = x1Count === 0 ? (x2Count === 1 || x2Count === 2 ? 1 : x2Count === 3 ? 2 : 0) : 0;
  const brushBase = x1Count * cents(x1.price) + x2Count * cents(x2.price);
  const headsBase = x1HeadsCount * cents(h1.price) + x2HeadsCount * cents(h2.price);
  const headsNet = getHeadsNetCents(x1HeadsCount) + getHeadsNetCents(x2HeadsCount);
  const headsBundleDiscount = (headsBase - headsNet) / 100;
  const brushNet = tier ? cents(tier.price) : brushBase;
  const hasPromo = appliedPromoCodes.some((code) => VALID_PROMO_CODES.includes(code.trim().toUpperCase()));
  // Native XPage promo tiers include the provider's cent rounding. Other carts use
  // the regular 10% brush-only code; the server still verifies its live order quote.
  const promoNet = !hasPromo ? brushNet : tier ? cents(tier.promoPrice)
    : x1Count + x2Count === 1 ? cents((x1Count ? x1 : x2).bundles[0].promoPrice)
    : brushNet - Math.round(brushNet * 0.1);
  const compareAtCents = x1Count * cents(x1.compareAt) + x2Count * cents(x2.compareAt)
    + x1HeadsCount * cents(h1.compareAt) + x2HeadsCount * cents(h2.compareAt);
  const giftsValue = roundMoney(extraX1BrushHeadSets * h1.price + extraBrushHeadSets * h2.price);
  const isHeadsOnly = (x1HeadsCount + x2HeadsCount > 0) && x1Count + x2Count === 0;
  const headsBundleCount = x1HeadsCount || x2HeadsCount;
  const brushBundlePromoDiscount = isX2Bundle && x2Count > 1 ? (brushBase - brushNet) / 100 : 0;
  const bundlePromoDiscount = brushBundlePromoDiscount > 0 ? brushBundlePromoDiscount : isHeadsOnly && headsBundleDiscount > 0 ? headsBundleDiscount : 0;
  const bundlePromoName = isX2Bundle && x2Count > 1
    ? `Buy ${x2Count} bundle (${formatUSD(brushBundlePromoDiscount)} extra saving)`
    : isHeadsOnly && headsBundleDiscount > 0
    ? `Buy ${headsBundleCount} heads bundle (${formatUSD(headsBundleDiscount)} extra saving)`
    : '';
  const bundleSavings = (compareAtCents - brushBase - headsBase) / 100
    + (isX1Bundle ? (brushBase - brushNet) / 100 : 0)
    + headsBundleDiscount;
  const promoDiscount = (brushNet - promoNet) / 100;
  return {
    itemCount: x1Count + x2Count + x1HeadsCount + x2HeadsCount,
    subtotal: (brushNet + headsNet) / 100,
    compareAt: compareAtCents / 100,
    bundleSavings: roundMoney(bundleSavings),
    bundlePromoDiscount,
    bundlePromoName,
    unlockedGiftsCount: extraX1BrushHeadSets + extraBrushHeadSets,
    giftsValue,
    promoDiscount,
    totalSavings: roundMoney(bundleSavings + (isHeadsOnly ? 0 : bundlePromoDiscount) + giftsValue + promoDiscount),
    finalSubtotal: (promoNet + headsNet) / 100,
    isX1: x1Count > 0, isX2: x2Count > 0,
    isHeadsOnly,
    isX1Heads: x1HeadsCount > 0, isX2Heads: x2HeadsCount > 0,
    extraBrushHeadSets, extraX1BrushHeadSets, x1Count, x2Count, x1HeadsCount, x2HeadsCount,
    bundleEligible: isX1Bundle || isX2Bundle || (isHeadsOnly && ((x1HeadsCount >= 1 && x1HeadsCount <= 3 && x2HeadsCount === 0) || (x2HeadsCount >= 1 && x2HeadsCount <= 3 && x1HeadsCount === 0))),
  };
}
