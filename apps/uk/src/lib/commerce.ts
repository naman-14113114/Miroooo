export const FREE_SHIPPING_THRESHOLD_PENCE = 4900;
export const SHIPPING_FEE_PENCE = 299;
export const HEADS_PACK_PRICE = 10;
export const HEADS_COMPARE_PRICE = 12;
export const HEADS_DISCOUNT_PERCENT = Math.round(100 * (HEADS_COMPARE_PRICE - HEADS_PACK_PRICE) / HEADS_COMPARE_PRICE);

export function shippingPence(merchandisePence: number): number {
  return merchandisePence > 0 && merchandisePence < FREE_SHIPPING_THRESHOLD_PENCE
    ? SHIPPING_FEE_PENCE : 0;
}

export function isBrushHeads(handle: string): boolean {
  return handle === 'miroooo-x1-heads' || handle === 'miroooo-x2-heads';
}
