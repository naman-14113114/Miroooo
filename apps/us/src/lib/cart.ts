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

/** Rebuild every cart line from the US catalogue. Stored/requested prices are never trusted. */
export function normalizeCartItems(raw: unknown, strict = false): CartItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((value, index): CartItem[] => {
    if (!value || typeof value !== 'object') return [];
    const line = value as Partial<CartItem>;
    if (line.isFree || /(?:^|:)free(?:$|:)/i.test(String(line.id || ''))) return [];
    const product = PRODUCTS[String(line.productHandle || '')];
    const quantity = Number(line.quantity ?? 1);
    if (!product || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 99) {
      if (strict) throw new Error('Invalid checkout item.');
      return [];
    }
    const variant = product.variants.find((item) => item.id === String(line.variantId || '')) ||
      (!strict ? product.variants.find((item) => item.color.toLowerCase() === String(line.color || '').toLowerCase()) : undefined);
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
  const hasPaidHeads = x1HeadsCount + x2HeadsCount > 0;
  const isX1Bundle = !hasPaidHeads && x2Count === 0 && (x1Count === 2 || x1Count === 3);
  const isX2Bundle = !hasPaidHeads && x1Count === 0 && (x2Count === 2 || x2Count === 3);
  const tier = isX1Bundle ? x1.bundles[x1Count - 1] : isX2Bundle ? x2.bundles[x2Count - 1] : undefined;
  const extraX1BrushHeadSets = isX1Bundle ? x1Count - 1 : 0;
  const extraBrushHeadSets = isX2Bundle ? x2Count - 1 : 0;
  const brushBase = x1Count * cents(x1.price) + x2Count * cents(x2.price);
  const headsBase = x1HeadsCount * cents(h1.price) + x2HeadsCount * cents(h2.price);
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
  const bundlePromoDiscount = isX2Bundle ? (brushBase - brushNet) / 100 : 0;
  const bundleSavings = (compareAtCents - brushBase - headsBase) / 100
    + (isX1Bundle ? (brushBase - brushNet) / 100 : 0);
  const promoDiscount = (brushNet - promoNet) / 100;
  return {
    itemCount: x1Count + x2Count + x1HeadsCount + x2HeadsCount,
    subtotal: (brushNet + headsBase) / 100,
    compareAt: compareAtCents / 100,
    bundleSavings: roundMoney(bundleSavings),
    bundlePromoDiscount,
    bundlePromoName: isX2Bundle ? `Buy ${x2Count} bundle (${formatUSD(bundlePromoDiscount)} extra saving)` : '',
    unlockedGiftsCount: extraX1BrushHeadSets + extraBrushHeadSets,
    giftsValue,
    promoDiscount,
    totalSavings: roundMoney(bundleSavings + bundlePromoDiscount + giftsValue + promoDiscount),
    finalSubtotal: (promoNet + headsBase) / 100,
    isX1: x1Count > 0, isX2: x2Count > 0,
    isHeadsOnly: hasPaidHeads && x1Count + x2Count === 0,
    isX1Heads: x1HeadsCount > 0, isX2Heads: x2HeadsCount > 0,
    extraBrushHeadSets, extraX1BrushHeadSets, x1Count, x2Count, x1HeadsCount, x2HeadsCount,
    bundleEligible: isX1Bundle || isX2Bundle,
  };
}
