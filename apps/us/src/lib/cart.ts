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
  selectedColors?: string[];
  name?: string;
  price?: number;
  compareAt?: number;
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
  rawSubtotal?: number;
  brushSubtotal?: number;
  headsSubtotal?: number;
  bundleDiscount?: number;
  totalDiscount?: number;
  compareAtTotal?: number;
  shipping?: number;
  total?: number;
  freeGifts?: Array<{ name: string; value: number; image: string; quantity: number }>;
  isBundleEligible?: boolean;
  activePromo?: string | null;
}

export const VALID_PROMO_CODES = ['MIROOOO', 'MIROOOO10'];
export const PROMO_CODE_VALID = 'MIROOOO10';
export const STORAGE_KEY = 'miroooo_cart';

export function calculateTotals(items: CartItem[], appliedPromoCodes: string[]): CartTotals {
  let x2Count = 0;
  let x1Count = 0;
  let x2HeadsCount = 0;
  let x1HeadsCount = 0;

  items.forEach((item) => {
    const qty = item.quantity || 1;
    const handle = item.productHandle || item.productId;
    if (handle === 'miroooo-x2') x2Count += qty;
    else if (handle === 'miroooo-x' || handle === 'miroooo-x1') x1Count += qty;
    else if (handle === 'miroooo-x2-heads') x2HeadsCount += qty;
    else if (handle === 'miroooo-x1-heads') x1HeadsCount += qty;
  });

  const totalQty = x2Count + x1Count + x2HeadsCount + x1HeadsCount;
  const isX2 = x2Count > 0;
  const isX1 = x1Count > 0;
  const hasPaidHeads = x2HeadsCount > 0 || x1HeadsCount > 0;
  const isHeadsOnly = hasPaidHeads && x2Count === 0 && x1Count === 0;

  // Pure bundle qualification:
  // ONLY if NO paid heads are in cart, and exactly 2 or 3 of a single brush model
  const isX2Bundle = !hasPaidHeads && x1Count === 0 && (x2Count === 2 || x2Count === 3);
  const isX1Bundle = !hasPaidHeads && x2Count === 0 && (x1Count === 2 || x1Count === 3);

  // Compare At calculations in USD
  const x2Compare = x2Count * 180.7;
  const x1Compare = x1Count * 154.7;
  const x2HeadsCompare = x2HeadsCount * 26.0;
  const x1HeadsCompare = x1HeadsCount * 26.0;
  const compareAt = Number((x2Compare + x1Compare + x2HeadsCompare + x1HeadsCompare).toFixed(2));

  // Base 50% savings on brushes
  const baseBrushCompareSavings = x2Count * (180.7 - 89.7) + x1Count * (154.7 - 76.7);

  let x2BundlePromoDiscount = 0;
  let x2BundlePromoName = '';
  let extraBrushHeadSets = 0;

  if (isX2Bundle) {
    if (x2Count === 2) {
      // 2 * 89.70 = 179.40. Bundle = 166.40. Discount = 13.00
      x2BundlePromoDiscount = 13.0;
      x2BundlePromoName = 'Buy 2 bundle ($13.00 extra saving)';
      extraBrushHeadSets = 1;
    } else if (x2Count === 3) {
      // 3 * 89.70 = 269.10. Bundle = 230.10. Discount = 39.00
      x2BundlePromoDiscount = 39.0;
      x2BundlePromoName = 'Buy 3 bundle ($39.00 extra saving)';
      extraBrushHeadSets = 2;
    }
  }

  let x1BundleDiscount = 0;
  let extraX1BrushHeadSets = 0;

  if (isX1Bundle) {
    if (x1Count === 2) {
      // 2 * 76.70 = 153.40. Bundle = 140.40. Discount = 13.00
      x1BundleDiscount = 13.0;
      extraX1BrushHeadSets = 1;
    } else if (x1Count === 3) {
      // 3 * 76.70 = 230.10. Bundle = 191.10. Discount = 39.00
      x1BundleDiscount = 39.0;
      extraX1BrushHeadSets = 2;
    }
  }

  let giftsValue = 0;
  let unlockedGiftsCount = 0;
  const freeGifts: Array<{ name: string; value: number; image: string; quantity: number }> = [];

  if (extraBrushHeadSets > 0) {
    giftsValue += extraBrushHeadSets * 13.0;
    unlockedGiftsCount += extraBrushHeadSets;
    freeGifts.push({
      name: 'Free 2-Pack Replacement Heads',
      value: 13.0 * extraBrushHeadSets,
      image: '/assets_ref/x2/heads/B1.webp',
      quantity: extraBrushHeadSets,
    });
  }
  if (extraX1BrushHeadSets > 0) {
    giftsValue += extraX1BrushHeadSets * 13.0;
    unlockedGiftsCount += extraX1BrushHeadSets;
    freeGifts.push({
      name: 'Free 2-Pack Replacement Heads',
      value: 13.0 * extraX1BrushHeadSets,
      image: '/assets_ref/x/heads/1.webp',
      quantity: extraX1BrushHeadSets,
    });
  }

  const x2Net = x2Count * 89.7 - x2BundlePromoDiscount;
  const x1Net = x1Count * 76.7 - x1BundleDiscount;
  const headsNet = x2HeadsCount * 13.0 + x1HeadsCount * 13.0;
  const brushSubtotal = Math.max(0, x2Net + x1Net);
  const subtotal = Math.max(0, Number((brushSubtotal + headsNet).toFixed(2)));

  // Promo code MIROOOO10: 10% discount strictly on brush subtotal (heads excluded)
  const hasValidPromo = appliedPromoCodes.some((code) =>
    VALID_PROMO_CODES.includes(code.toUpperCase().trim())
  );
  const promoDiscount = hasValidPromo ? Number((brushSubtotal * 0.1).toFixed(2)) : 0;

  const finalSubtotal = Math.max(0, Number((subtotal - promoDiscount).toFixed(2)));
  const bundleSavings = Number((baseBrushCompareSavings + x1BundleDiscount).toFixed(2));
  const totalSavings = Number(
    (bundleSavings + x2BundlePromoDiscount + giftsValue + promoDiscount).toFixed(2)
  );

  return {
    itemCount: totalQty,
    subtotal,
    compareAt,
    bundleSavings,
    bundlePromoDiscount: x2BundlePromoDiscount,
    bundlePromoName: x2BundlePromoName,
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
    bundleEligible: isX2Bundle || isX1Bundle,
    rawSubtotal: subtotal,
    brushSubtotal,
    headsSubtotal: headsNet,
    bundleDiscount: x2BundlePromoDiscount + x1BundleDiscount,
    totalDiscount: totalSavings,
    compareAtTotal: compareAt,
    shipping: 0,
    total: finalSubtotal,
    freeGifts,
    isBundleEligible: isX2Bundle || isX1Bundle,
    activePromo: hasValidPromo ? appliedPromoCodes[0] : null,
  };
}

export function formatUSD(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatGBP(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatCurrency(amount: number, currency = '$'): string {
  return `${currency}${amount.toFixed(2)}`;
}

export interface CartState {
  items: CartItem[];
  promoCode: string;
  discountApplied: boolean;
}

export function getInitialCart(): CartState {
  if (typeof window === 'undefined') {
    return { items: [], promoCode: '', discountApplied: false };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], promoCode: '', discountApplied: false };
    const parsed = JSON.parse(raw);
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      promoCode: typeof parsed.promoCode === 'string' ? parsed.promoCode : '',
      discountApplied: Boolean(parsed.discountApplied),
    };
  } catch {
    return { items: [], promoCode: '', discountApplied: false };
  }
}

export function saveCart(cart: CartState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart to localStorage:', e);
  }
}

export function calculateCart(items: CartItem[], promoCodeInput = '') {
  const applied = promoCodeInput ? [promoCodeInput] : [];
  const totals = calculateTotals(items, applied);
  return {
    calculatedItems: items,
    totals,
  };
}
