import {
  buildCheckoutUrl, loadXpageSession, mapCartToXpageVariants,
  XPAGE_LANDING_URLS, XPAGE_STORE_URL, XPAGE_VARIANTS,
} from '@miroooo/shared';
import { loadPublishedCheckoutOffer, CheckoutQuoteError } from './checkout-quote';

type CartLine = { id: string; productHandle: string; variantId: string; quantity: number };
type ProviderLine = { variant_id: string; quantity: number };
const origins = new Set<string>([XPAGE_STORE_URL, ...Object.values(XPAGE_LANDING_URLS)]);
const unavailable = (message = 'The live USD checkout could not be verified. Please try again. No order has been placed.') =>
  new CheckoutQuoteError('QUOTE_UNAVAILABLE', message);
const pennies = (value: number) => Math.round((value + Number.EPSILON) * 100);
const checkoutPath = /^\/(?:[A-Za-z0-9_%+=-]{128,1024}\/)?checkout(?:\/[a-f\d]{64})?\/?$/i;
const sessionPath = /\/checkout\/[a-f\d]{64}\/?$/i;

function destination(href: unknown, base = XPAGE_STORE_URL) {
  if (typeof href !== 'string') throw unavailable();
  const url = new URL(href, base);
  if (!origins.has(url.origin) || url.username || url.password ||
      !checkoutPath.test(url.pathname)) throw unavailable();
  url.search = '?currency=USD';
  url.hash = '';
  return url;
}

function cookies(...headers: string[][]) {
  const jar = new Map<string, string>();
  for (const header of headers.flat()) {
    const pair = header.split(';')[0];
    const index = pair.indexOf('=');
    if (index > 0) jar.set(pair.slice(0, index), pair.slice(index + 1));
  }
  jar.set('xp_currency', 'USD');
  return [...jar].map(([name, value]) => `${name}=${value}`).join('; ');
}

async function readCheckout(url: URL, cookie?: string) {
  // Validate before every fetch; a provider response must never become an arbitrary URL fetch.
  let next = destination(url.toString());
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(next, {
      headers: { Accept: 'text/html', ...(cookie ? { Cookie: cookie } : {}) },
      redirect: 'manual', cache: 'no-store', signal: AbortSignal.timeout(12000),
    });
    if (response.status >= 300 && response.status < 400) {
      next = destination(response.headers.get('location'), next.origin);
      continue;
    }
    if (!response.ok) throw unavailable();
    return { html: await response.text(), url: next };
  }
  throw unavailable();
}

// XPage embeds its quoted order lines as JSON in the checkout payment data.
// Read JSON only: never evaluate JavaScript supplied by the provider.
function orderLines(html: string): Array<{ quantity: number; price: number | string; variant: { id: string } }> {
  const start = /\bvariants:\s*(?=\[)/.exec(html);
  if (!start) throw unavailable();
  const offset = start.index + start[0].length;
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = offset; index < html.length; index++) {
    const character = html[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === '"') quoted = false;
    } else if (character === '"') quoted = true;
    else if (character === '[') depth++;
    else if (character === ']' && --depth === 0) {
      try { return JSON.parse(html.slice(offset, index + 1)); } catch { throw unavailable(); }
    }
  }
  throw unavailable();
}

function browserQuotePennies(html: string) {
  // XPage rounds converted subtotal and discount separately in its browser code.
  // Check those embedded numeric values too: the initial HTML total can differ.
  // This reads the known calculation without executing any provider JavaScript.
  const shipping = html.match(/class ShippingHandler\s*\{([\s\S]*?)class DiscountCodeValidator/)?.[1];
  const discount = html.match(/class DiscountCodeValidator\s*\{[\s\S]*?appliedDiscount:\s*([\d.]+)\s*\*\s*1/)?.[1];
  if (!shipping || !discount ||
      !/const total = Math\.floor\(\s*\(taxableBase \+ tax \+ tip\) \* 100,?\s*\)/.test(shipping) ||
      !/currency:\s*["']USD["']/.test(shipping)) throw unavailable();
  const subtotal = shipping.match(/const taxableBase = ([\d.]+) \* 1 \+ currentRate \* 1 - discount;/)?.[1];
  const tip = shipping.match(/getTipAmount\(\) \?\? ([\d.]+) \* 1/)?.[1];
  const taxRate = shipping.match(/taxRate:\s*([\d.]+)\s*\*\s*1/)?.[1];
  const taxApplies = shipping.match(/taxApplies:\s*(true|false)/)?.[1];
  if (subtotal === undefined || tip === undefined || taxRate === undefined || taxApplies === undefined ||
      [subtotal, discount, tip, taxRate].some((value) => !Number.isFinite(Number(value)) || Number(value) < 0)) throw unavailable();
  const taxableBase = Number(subtotal) - Number(discount);
  const tax = taxApplies === 'true' ? taxableBase * Number(taxRate) : 0;
  return Math.floor((taxableBase + tax + Number(tip)) * 100);
}

export function assertCheckoutOrderQuote(html: string, cart: ProviderLine[], expectedUSD: number) {
  // XPage converts the generated order, including bundle discounts, separately
  // from its published variant prices. Compare its displayed total, never an estimate.
  const totals = [...html.matchAll(/<span\b[^>]*class=["'](?:[^"']*\s)?total(?:\s[^"']*)?["'][^>]*>([^<]+)<\/span>/gi)]
    .map((match) => match[1].replace(/&dollar;|&#36;|&#x0*24;/gi, '$').replace(/&nbsp;|[\s,]/g, ''));
  if (!totals.length || totals.some((total) => !/^\$[\d]+(?:\.\d{1,2})?$/.test(total))) {
    throw unavailable('Checkout is temporarily paused because XPage is not displaying this order in USD. Your cart is saved; no order has been placed.');
  }
  const amounts = totals.map((total) => pennies(Number(total.slice(1))));
  if (amounts.some((amount) => amount !== amounts[0])) throw unavailable();
  const quoted = new Map<string, number>();
  for (const line of orderLines(html)) {
    const id = line.variant?.id;
    const price = Number(line.price);
    if (!id || !Number.isSafeInteger(line.quantity) || line.quantity < 1 ||
        !Number.isFinite(price) || price < 0) throw unavailable();
    quoted.set(id, (quoted.get(id) || 0) + line.quantity);
  }
  if (quoted.size !== cart.length || cart.some((line) => quoted.get(line.variant_id) !== line.quantity)) {
    throw unavailable('The checkout items changed unexpectedly. Please try again. No order has been placed.');
  }
  const settledAmount = browserQuotePennies(html);
  const amount = amounts[0] !== pennies(expectedUSD) ? amounts[0] : settledAmount;
  if (amount !== pennies(expectedUSD)) {
    throw new CheckoutQuoteError('PRICE_MISMATCH',
      `Checkout is paused: your cart shows $${expectedUSD.toFixed(2)}, but the live checkout offer is $${(amount / 100).toFixed(2)}. No order has been placed.`);
  }
}

/** US-specific cart/session handling. The shared helper and UK behavior are unchanged. */
export async function prepareUSCheckout({ cart, discountCode, expectedUSD, useBundle, attribution }: {
  cart: CartLine[]; discountCode: string; expectedUSD: number; useBundle: boolean;
  attribution: Record<string, unknown>;
}) {
  const xpageCart = mapCartToXpageVariants(cart);
  const x1 = new Set<string>([XPAGE_VARIANTS.x1_grey, XPAGE_VARIANTS.x1_pink, XPAGE_VARIANTS.x1_silver, XPAGE_VARIANTS.x1_heads]);
  const product = xpageCart.every((line) => x1.has(line.variant_id)) ? 'x1' : 'x2';
  let checkout: URL;

  if (useBundle) {
    const { session, selected, option, condition } = await loadPublishedCheckoutOffer(cart, discountCode);
    const offered = option.offered?.find((item: { quantity: number; product?: { variants?: Array<{ id: string }> } }) =>
      item.quantity === selected.offeredQty && item.product?.variants?.some((variant) => variant.id === selected.headsVariant));
    if (selected.offeredQty && !offered) throw unavailable();
    const response = await fetch(`${session.origin}/create-bundle-order?currency=USD`, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json',
        'X-CSRF-Token': session.csrfToken, Origin: session.origin, Referer: session.url,
        Cookie: cookies(session.setCookieHeaders) },
      body: JSON.stringify({ bundle_option_id: option.id, landing_page_id: session.landingPageId,
        bundle_selected_variants: { conditions: { [condition.id]: selected.brushes },
          offered: offered ? { [offered.id]: Array(selected.offeredQty).fill(selected.headsVariant) } : {} } }),
    });
    if (!response.ok) throw unavailable();
    const data = await response.json();
    if (data.status !== 'success') throw unavailable();
    checkout = destination(data.checkout_url, session.origin);
  } else {
    const session = await loadXpageSession('USD', 'store');
    if (!session.csrfToken) throw unavailable();
    const response = await fetch(`${XPAGE_STORE_URL}/set-cart?checkout=true&currency=USD`, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json',
        'X-CSRF-Token': session.csrfToken, Origin: session.origin, Referer: session.url,
        Cookie: cookies(session.setCookieHeaders) },
      body: JSON.stringify({ cart: xpageCart }),
    });
    if (!response.ok) throw unavailable();
    const data = await response.json();
    if (data.status !== 'success') throw unavailable();
    checkout = destination(data.checkout_url);
    if (!sessionPath.test(checkout.pathname)) {
      const page = await readCheckout(checkout, cookies(session.setCookieHeaders, response.headers.getSetCookie()));
      // Keep XPage's signed handoff path. Removing its prefix loses currency/session context.
      if (!sessionPath.test(page.url.pathname)) throw unavailable();
      checkout = page.url;
    }
  }

  if (!sessionPath.test(checkout.pathname)) throw unavailable();
  if (/^\/checkout\//.test(checkout.pathname)) {
    // Resolve the native store URL before branding it; this redirect carries the signed prefix.
    checkout = (await readCheckout(destination(checkout.pathname, XPAGE_STORE_URL))).url;
  }
  // Preserve the native handoff prefix while keeping the existing model-specific destination.
  checkout = destination(checkout.pathname, XPAGE_LANDING_URLS[product]);
  // Verify exactly what a new customer's browser receives, without our server cookies.
  const page = await readCheckout(checkout);
  assertCheckoutOrderQuote(page.html, xpageCart, expectedUSD);
  return { checkoutUrl: buildCheckoutUrl(page.url.toString(), '', attribution, 'USD'),
    cart: xpageCart, isBundle: useBundle, isPromoBundle: useBundle && Boolean(discountCode) };
}
