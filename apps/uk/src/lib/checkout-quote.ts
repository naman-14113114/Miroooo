import { detectBundlePayload, loadXpageSession } from '@miroooo/shared';

export class CheckoutQuoteError extends Error {
  constructor(public code: 'PRICE_MISMATCH' | 'QUOTE_UNAVAILABLE', message: string) {
    super(message);
  }
}

/** Validate a live bundle selection; the generated checkout determines its actual converted total. */
export async function loadPublishedCheckoutOffer(cart: unknown[], discountCode: string) {
  const selected = detectBundlePayload(cart, discountCode);
  if (!selected) {
    throw new CheckoutQuoteError('QUOTE_UNAVAILABLE', 'The selected bundle is unavailable. Please try again later.');
  }
  const product = selected.product as 'x1' | 'x2' | 'x1_heads' | 'x2_heads';
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

  selected.brushes.forEach((id: string) => {
    const variant = condition.product.variants?.find((item: { id: string; is_visible: boolean }) => item.id === id && item.is_visible);
    if (!variant || !Number.isFinite(Number(variant.price)) || Number(variant.price) < 0) {
      throw new CheckoutQuoteError('QUOTE_UNAVAILABLE', 'The selected item has no live GBP checkout quote.');
    }
  });
  const discount = Number(option.discount_amount || 0);
  if (!Number.isFinite(discount) || discount < 0 ||
      (option.discount_type && option.discount_type !== 'PERCENTAGE' && option.discount_type !== 'FIXED_AMOUNT' && option.discount_type !== 'FIXED')) {
    throw new CheckoutQuoteError('QUOTE_UNAVAILABLE', 'The live GBP discount could not be verified.');
  }
  if (selected.offeredQty > 0) {
    const offered = option.offered?.find((item: { quantity: number }) => item.quantity === selected.offeredQty);
    const head = offered?.product?.variants?.find((item: { id: string; is_visible: boolean }) => item.id === selected.headsVariant && item.is_visible);
    const headDiscount = Number(offered?.discount_amount);
    if (!head || offered?.product?.status !== 'ACTIVE' || !Number.isFinite(Number(head.price)) || Number(head.price) < 0 || offered?.discount_type !== 'PERCENTAGE' || !Number.isFinite(headDiscount) || headDiscount < 0 || headDiscount > 100) {
      throw new CheckoutQuoteError('QUOTE_UNAVAILABLE', 'The live GBP head offer could not be verified.');
    }
  }
  return { session, selected, option, condition };
}
