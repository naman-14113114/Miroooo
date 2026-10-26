import {
  buildCheckoutUrl, loadXpageSession, mapCartToXpageVariants,
  XPAGE_LANDING_URLS, XPAGE_STORE_URL, XPAGE_VARIANTS,
} from '@miroooo/shared';
import { loadPublishedCheckoutOffer, CheckoutQuoteError } from './checkout-quote';

type CartLine = { id: string; productHandle: string; variantId: string; quantity: number };
type ProviderLine = { variant_id: string; quantity: number };
const flosserLandingUrl = XPAGE_LANDING_URLS.flosser || 'https://flosser.miroooo.us';
const origins = new Set<string>([
  XPAGE_STORE_URL,
  ...Object.values(XPAGE_LANDING_URLS),
  flosserLandingUrl,
  'https://flosser.miroooo.us',
]);
const unavailable = (message = 'The live GBP checkout could not be verified. Please try again. No order has been placed.') =>
  new CheckoutQuoteError('QUOTE_UNAVAILABLE', message);
const pennies = (value: number) => Math.round((value + Number.EPSILON) * 100);
const checkoutPath = /^\/(?:[A-Za-z0-9_%+=-]{128,1024}\/)?checkout(?:\/[a-f\d]{64})?\/?$/i;
const sessionPath = /\/checkout\/[a-f\d]{64}\/?$/i;

function destination(href: unknown, base = XPAGE_STORE_URL) {
  if (typeof href !== 'string') throw unavailable();
  const url = new URL(href, base);
  if ((!origins.has(url.origin) && !url.hostname.endsWith('.myxpage.shop')) || url.username || url.password ||
      !checkoutPath.test(url.pathname)) throw unavailable();
  url.search = '?currency=GBP';
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
  jar.set('xp_currency', 'GBP');
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

export function assertCheckoutOrderQuote(html: string, cart: ProviderLine[], _expectedGBP?: number) {
  const quoted = new Map<string, number>();
  const cartHasGiftCard = cart.some((line) => line.variant_id === XPAGE_VARIANTS.gift_card);
  for (const line of orderLines(html)) {
    const id = line.variant?.id;
    const price = Number(line.price);
    if (!id || !Number.isSafeInteger(line.quantity) || line.quantity < 1 ||
        !Number.isFinite(price) || price < 0) throw unavailable();
    if (id === XPAGE_VARIANTS.gift_card && !cartHasGiftCard && price === 0) {
      continue;
    }
    quoted.set(id, (quoted.get(id) || 0) + line.quantity);
  }
  if (quoted.size !== cart.length || cart.some((line) => quoted.get(line.variant_id) !== line.quantity)) {
    throw unavailable('The checkout items changed unexpectedly. Please try again. No order has been placed.');
  }
}

/** UK-specific cart/session handling. The shared helper and US behavior are unchanged. */
export async function prepareUKCheckout({ cart, discountCode, expectedGBP, useBundle, attribution }: {
  cart: CartLine[]; discountCode: string; expectedGBP: number; useBundle: boolean;
  attribution: Record<string, unknown>;
}) {
  const paidLines = cart.filter((line: any) => line.isFree !== true && !/(?:^|:)free(?:$|:)/i.test(String(line.id || '')));
  const xpageCart = mapCartToXpageVariants(useBundle ? cart : paidLines);
  const x1 = new Set<string>([
    XPAGE_VARIANTS.x1_grey,
    XPAGE_VARIANTS.x1_pink,
    XPAGE_VARIANTS.x1_silver,
    XPAGE_VARIANTS.x1_grey_6pc,
    XPAGE_VARIANTS.x1_pink_6pc,
    XPAGE_VARIANTS.x1_silver_6pc,
  ]);
  const flosserVariants = new Set<string>([
    XPAGE_VARIANTS.flosser_black_7,
    XPAGE_VARIANTS.flosser_black_4,
    XPAGE_VARIANTS.flosser_white_7,
    XPAGE_VARIANTS.flosser_white_4,
  ]);
  const nonGiftLines = xpageCart.filter(
    (line) => line.variant_id !== XPAGE_VARIANTS.gift_card && line.variant_id !== XPAGE_VARIANTS.package_protection
  );
  const isFlosser = nonGiftLines.length > 0 && nonGiftLines.some((line) => flosserVariants.has(line.variant_id));
  const isX1HeadsOnly = nonGiftLines.length > 0 && nonGiftLines.every((line) => line.variant_id === XPAGE_VARIANTS.x1_heads);
  const isX2HeadsOnly = nonGiftLines.length > 0 && nonGiftLines.every((line) => line.variant_id === XPAGE_VARIANTS.x2_heads);
  const isPackageProtectionOnly = xpageCart.length > 0 && xpageCart.every((line) => line.variant_id === XPAGE_VARIANTS.package_protection);
  const isGiftCardOnly = xpageCart.length > 0 && xpageCart.every((line) => line.variant_id === XPAGE_VARIANTS.gift_card);
  const product = isFlosser ? 'flosser'
    : isPackageProtectionOnly ? 'package_protection'
    : isGiftCardOnly ? 'giftcard'
    : isX1HeadsOnly ? 'x1_heads'
    : isX2HeadsOnly ? 'x2_heads'
    : nonGiftLines.every((line) => x1.has(line.variant_id) || line.variant_id === XPAGE_VARIANTS.x1_heads) ? 'x1' : 'x2';
  let checkout: URL;

  if (useBundle) {
    const { session, selected, option, condition } = await loadPublishedCheckoutOffer(cart, discountCode);
    const offeredMap: Record<string, string[]> = {};
    if (Array.isArray(option.offered)) {
      for (const item of option.offered) {
        const prodId = (item.product?.id || item.product_id || '').toLowerCase();
        const slug = (item.product?.slug || item.product?.handle || '').toLowerCase();
        const isGiftCard =
          prodId === 'a2f687d2-56cd-4709-95a5-e6d280070c18' ||
          slug === 'miroooo-gift-card' ||
          item.product?.variants?.some((v: any) => v.id === XPAGE_VARIANTS.gift_card);
        const isPackageProtection =
          prodId === 'a2f6df9e-faf7-438b-a65a-da26ee25ce03' ||
          slug === 'miroooo-package-protection' ||
          item.product?.variants?.some((v: any) => v.id === XPAGE_VARIANTS.package_protection);
        const isFlosserItem =
          prodId === 'a2f69a15-e357-403b-a11c-b3912eb49b1d' ||
          slug === 'miroooo-water-flosser' ||
          item.product?.variants?.some((v: any) => flosserVariants.has(v.id));

        if (isPackageProtection) {
          offeredMap[item.id] = Array(item.quantity).fill(XPAGE_VARIANTS.package_protection);
        } else if (isGiftCard) {
          offeredMap[item.id] = Array(item.quantity).fill(XPAGE_VARIANTS.gift_card);
        } else if (isFlosserItem) {
          const flosserVarId = (selected as any).flossers?.[1] || (selected as any).flossers?.[0] || item.product?.variants?.[0]?.id || XPAGE_VARIANTS.flosser_black_7;
          offeredMap[item.id] = Array(item.quantity).fill(flosserVarId);
        } else {
          offeredMap[item.id] = Array(item.quantity).fill(selected.headsVariant);
        }
      }
    }
    const response = await fetch(`${session.origin}/create-bundle-order?currency=GBP`, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json',
        'X-CSRF-Token': session.csrfToken, Origin: session.origin, Referer: session.url,
        Cookie: cookies(session.setCookieHeaders) },
      body: JSON.stringify({ bundle_option_id: option.id, landing_page_id: session.landingPageId,
        bundle_selected_variants: { conditions: { [condition.id]: product === 'flosser' ? [selected.brushes[0]] : selected.brushes },
          offered: offeredMap } }),
    });
    if (!response.ok) throw unavailable();
    const data = await response.json();
    if (data.status !== 'success') throw unavailable();
    checkout = destination(data.checkout_url, session.origin);
  } else {
    const isSingleProductLanding = product === 'package_protection' || product === 'giftcard';
    const targetOrigin = isSingleProductLanding ? XPAGE_LANDING_URLS[product] : XPAGE_STORE_URL;
    const session = await loadXpageSession('GBP', isSingleProductLanding ? product : 'store');
    if (!session.csrfToken) throw unavailable();
    const response = await fetch(`${targetOrigin}/set-cart?checkout=true&currency=GBP`, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json',
        'X-CSRF-Token': session.csrfToken, Origin: session.origin, Referer: session.url,
        Cookie: cookies(session.setCookieHeaders) },
      body: JSON.stringify({ cart: xpageCart }),
    });
    if (!response.ok) throw unavailable();
    const data = await response.json();
    if (data.status !== 'success') throw unavailable();
    checkout = destination(data.checkout_url, targetOrigin);
    if (!sessionPath.test(checkout.pathname)) {
      const page = await readCheckout(
        checkout,
        cookies(
          session.setCookieHeaders,
          (response.headers as any).getSetCookie ? (response.headers as any).getSetCookie() : [response.headers.get('set-cookie')].filter(Boolean) as string[]
        )
      );
      // Keep XPage's signed handoff path. Removing its prefix loses currency/session context.
      if (!sessionPath.test(page.url.pathname)) throw unavailable();
      checkout = page.url;
    }
  }

  const targetLanding = product === 'flosser' ? flosserLandingUrl : (XPAGE_LANDING_URLS[product] || XPAGE_STORE_URL);
  if (!sessionPath.test(checkout.pathname)) throw unavailable();
  if (/^\/checkout\//.test(checkout.pathname)) {
    // Resolve the native store URL before branding it; this redirect carries the signed prefix.
    const resolveOrigin = (product === 'package_protection' || product === 'giftcard' || product === 'flosser') ? targetLanding : XPAGE_STORE_URL;
    checkout = (await readCheckout(destination(checkout.pathname, resolveOrigin))).url;
  }
  // Preserve the native handoff prefix while keeping the existing model-specific destination.
  checkout = destination(checkout.pathname, targetLanding);
  // Verify exactly what a new customer's browser receives, without our server cookies.
  const page = await readCheckout(checkout);
  assertCheckoutOrderQuote(page.html, xpageCart, expectedGBP);
  return { checkoutUrl: buildCheckoutUrl(page.url.toString(), '', attribution, 'GBP'),
    cart: xpageCart, isBundle: useBundle, isPromoBundle: useBundle && Boolean(discountCode) };
}
