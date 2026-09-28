import { detectBundlePayload, loadXpageSession } from '@miroooo/shared';

export class CheckoutQuoteError extends Error {
  constructor(public code: 'PRICE_MISMATCH' | 'QUOTE_UNAVAILABLE', message: string) {
    super(message);
  }
}

const cents = (value: number) => Math.round((value + Number.EPSILON) * 100);

/** Check the live published GBP XPage option before a checkout URL can be returned. */
export async function assertMatchingCheckoutQuote(cart: unknown[], discountCode: string, expectedGBP: number) {
  const selected = detectBundlePayload(cart, discountCode);
  if (!selected) {
    throw new CheckoutQuoteError('QUOTE_UNAVAILABLE', 'We cannot verify the live checkout price for this cart. Please try a single brush or a listed bundle.');
  }
  const product = selected.product as 'x1' | 'x2';
  let session;
  try {
    session = await loadXpageSession('GBP', product);
  } catch {
    throw new CheckoutQuoteError('QUOTE_UNAVAILABLE', 'The live GBP checkout offer is unavailable. No order has been placed. Please try again later.');
  }
  const option = session.bundle?.options?.find((item: { id: string }) => item.id === selected.bundle_option_id);
  const condition = option?.conditions?.find((item: { quantity: number }) => item.quantity === selected.brushes.length);
  if (!option || !condition || condition.product?.status !== 'ACTIVE') {
    throw new CheckoutQuoteError('QUOTE_UNAVAILABLE', 'The live GBP checkout offer is unavailable. Please try again later.');
  }

  const brushPrices = selected.brushes.map((id: string) => {
    const variant = condition.product.variants?.find((item: { id: string; is_visible: boolean }) => item.id === id && item.is_visible);
    if (!variant || !Number.isFinite(Number(variant.price))) {
      throw new CheckoutQuoteError('QUOTE_UNAVAILABLE', 'The selected brush has no live GBP checkout quote.');
    }
    return Number(variant.price);
  });
  const discount = Number(option.discount_amount || 0);
  if (!Number.isFinite(discount) || discount < 0 || discount > 100 ||
      (option.discount_type && option.discount_type !== 'PERCENTAGE')) {
    throw new CheckoutQuoteError('QUOTE_UNAVAILABLE', 'The live GBP discount could not be verified.');
  }
  // Published XPage options discount the condition brushes; offered heads have their own discount.
  const brushesGBP = brushPrices.reduce((sum: number, price: number) => sum + price, 0) * (1 - discount / 100);
  let headsGBP = 0;
  if (selected.offeredQty > 0) {
    const offered = option.offered?.find((item: { quantity: number }) => item.quantity === selected.offeredQty);
    const head = offered?.product?.variants?.find((item: { id: string; is_visible: boolean }) => item.id === selected.headsVariant && item.is_visible);
    const headDiscount = Number(offered?.discount_amount);
    if (!head || offered?.discount_type !== 'PERCENTAGE' || !Number.isFinite(headDiscount) || headDiscount < 0 || headDiscount > 100) {
      throw new CheckoutQuoteError('QUOTE_UNAVAILABLE', 'The live GBP head offer could not be verified.');
    }
    headsGBP = Number(head.price) * selected.offeredQty * (1 - headDiscount / 100);
  }
  const quotedCents = cents(brushesGBP + headsGBP);
  if (quotedCents !== cents(expectedGBP)) {
    throw new CheckoutQuoteError(
      'PRICE_MISMATCH',
      `Checkout is paused: your cart shows £${expectedGBP.toFixed(2)}, but the live checkout offer is £${(quotedCents / 100).toFixed(2)}. No order has been placed.`
    );
  }
}
