import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PRODUCTS } from '../src/data/products';
import { calculateTotals, normalizeCartItems } from '../src/lib/cart';
import { POST } from '../src/app/api/checkout/prepare/route';
import { assertCheckoutOrderQuote } from '../src/lib/checkout';
import { XPAGE_BUNDLES, XPAGE_STORE_URL, XPAGE_VARIANTS } from '@miroooo/shared';

const x1Grey = { productHandle: 'miroooo-x', variantId: PRODUCTS['miroooo-x'].variants[0].id, color: 'Grey', quantity: 1 };
const x2Grey = { productHandle: 'miroooo-x2', variantId: PRODUCTS['miroooo-x2'].variants.find((v) => v.color === 'Grey')!.id, color: 'Grey', quantity: 1 };
const totals = (lines: object[], promos: string[] = []) => calculateTotals(normalizeCartItems(lines, true), promos);

function mockPublishedOffer(quantity: 1 | 2, price = 69, product: 'x1' | 'x2' = 'x2') {
  const bundle = XPAGE_BUNDLES[product];
  const option = quantity === 1 ? bundle.buy1 : bundle.buy2;
  const published = {
    id: bundle.id,
    status: 'ACTIVE',
    options: [{
      id: option.optionId,
      discount_target: quantity === 1 ? null : 'PER_ITEM',
      discount_type: quantity === 1 ? null : 'PERCENTAGE',
      discount_amount: quantity === 1 ? 0 : 7.24,
      conditions: [{ id: option.conditionId, quantity, product: {
        status: 'ACTIVE', variants: [{ id: XPAGE_VARIANTS[`${product}_grey`], is_visible: true, price }],
      } }],
      offered: quantity === 1 ? [] : [{ id: bundle.buy2.offeredId, quantity: 1, discount_type: 'PERCENTAGE', discount_amount: '100.00', product: {
        status: 'ACTIVE', variants: [{ id: XPAGE_VARIANTS[`${product}_heads`], is_visible: true, price: 10 }],
      } }],
    }],
  };
  return `<div x-data='${JSON.stringify({ bundle: published })}'></div><script>"X-CSRF-Token": "test-token"; orderData.landing_page_id = "11111111-1111-1111-1111-111111111111";</script>`;
}

function request(items: object[], discountCode = '') {
  return new Request('http://localhost/api/checkout/prepare', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ items, discountCode }),
  });
}

// Minimal captured XPage calculation structure, including its separate GBP rounding.
function browserQuote(subtotal: number, discount = 0) {
  return `<script>class ShippingHandler {
    state = {taxRate: 0 * 1, taxApplies: true};
    async updateShippingCost() {
      const tip = this.state.tipHandler?.getTipAmount() ?? 0 * 1;
      const taxableBase = ${subtotal} * 1 + currentRate * 1 - discount;
      const total = Math.floor((taxableBase + tax + tip) * 100,);
      new Intl.NumberFormat("en", {style: "currency", currency: "GBP"});
    }
  }
  class DiscountCodeValidator {state = {appliedDiscount: ${discount} * 1};}</script>`;
}

test('X1 and X2 displayed GBP offers, gifts, and post-bundle promo rounding', () => {
  for (const brush of [x1Grey, x2Grey]) {
    assert.equal(totals([brush]).finalSubtotal, 69);
    assert.equal(totals([{ ...brush, quantity: 2 }]).finalSubtotal, 128);
    assert.equal(totals([{ ...brush, quantity: 3 }]).finalSubtotal, 177);
    assert.equal(totals([{ ...brush, quantity: 2 }], ['MIROOOO']).finalSubtotal, 115);
    assert.equal(totals([{ ...brush, quantity: 3 }], ['MIROOOO10']).finalSubtotal, 159);
    assert.equal(totals([{ ...brush, quantity: 3 }]).unlockedGiftsCount, 2);
  }
  assert.equal(totals([x2Grey], ['MIROOOO10']).finalSubtotal, 62);
  assert.equal(totals([x1Grey], ['MIROOOO']).finalSubtotal, 62);
  assert.equal(totals([x2Grey, { productHandle: 'miroooo-x2-heads', variantId: PRODUCTS['miroooo-x2-heads'].variants[0].id, quantity: 1 }]).finalSubtotal, 79);
});

test('persisted cart prices and identities are rebuilt from canonical UK products', () => {
  const [item] = normalizeCartItems([{ ...x1Grey, id: 'old-line', unitPrice: 1, comparePrice: 2, title: 'Stale', image: '/old.jpg', quantity: 2 }]);
  assert.equal(item.unitPrice, 69);
  assert.equal(item.comparePrice, 139);
  assert.equal(item.title, 'Miroooo X1 (Grey)');
  assert.equal(item.image, PRODUCTS['miroooo-x'].variants[0].image);
  assert.equal(item.id, 'old-line');
  assert.equal(totals([item]).finalSubtotal, 128);
  assert.deepEqual(normalizeCartItems([{ ...x1Grey, productHandle: 'unknown' }]), []);
});

function mockStandardCheckout(options: { currency?: string; price?: number; unavailable?: boolean; unsafeUrl?: boolean; wrongQuantity?: boolean } = {}) {
  const oldFetch = globalThis.fetch;
  const submitted: Array<{ variant_id: string; quantity: number }> = [];
  const calls: string[] = [];
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    calls.push(url);
    if (options.unavailable) throw new Error('offline');
    if (url.includes('/set-cart?')) {
      assert.equal(new Headers(init?.headers).get('x-csrf-token'), 'test-token');
      assert.match(new Headers(init?.headers).get('cookie') || '', /xp_currency=GBP/);
      assert.ok(!new Headers(init?.headers).get('cookie')?.includes('xp_currency=USD'));
      submitted.push(...JSON.parse(String(init?.body)).cart);
      return Response.json({ status: 'success', checkout_url: options.unsafeUrl ? 'https://example.com/checkout' : `${XPAGE_STORE_URL}/checkout` });
    }
    if (new URL(url).pathname === '/checkout') {
      return new Response(null, { status: 302, headers: { location: `https://offer.miroooo.us/${'c'.repeat(256)}/checkout/${'a'.repeat(64)}` } });
    }
    if (url.includes('/checkout')) {
      const lines = submitted.map((line) => ({ quantity: line.quantity + (options.wrongQuantity ? 1 : 0),
        price: options.price ?? ([XPAGE_VARIANTS.x1_heads, XPAGE_VARIANTS.x2_heads].includes(line.variant_id as typeof XPAGE_VARIANTS.x1_heads) ? 10 : 69),
        variant: { id: line.variant_id } }));
      const amount = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
      return new Response(`<script>const tokenPath = '/checkout/${'a'.repeat(64)}'; const payload = {variants: ${JSON.stringify(lines)}}; new Intl.NumberFormat("en", {style:"currency", currency:"${options.currency || 'GBP'}"});</script><span class="total font-semibold">${options.currency === 'USD' ? '$' : '£'}${amount.toFixed(2)}</span>${browserQuote(amount)}`);
    }
    return new Response('<script>"X-CSRF-Token": "test-token"</script>', { headers: { 'set-cookie': 'xp_currency=USD; Path=/' } });
  };
  return { submitted, calls, restore: () => { globalThis.fetch = oldFetch; } };
}

const head = (model: 'x1' | 'x2', quantity = 1) => ({ productHandle: `miroooo-${model}-heads`, variantId: PRODUCTS[`miroooo-${model}-heads`].variants[0].id, quantity });

for (const [label, lines, amount] of [
  ['X1 single', [x1Grey], 69], ['X2 single', [x2Grey], 69],
  ['X1 heads', [head('x1')], 10], ['X2 heads', [head('x2', 3)], 30],
  ['both head models', [head('x1', 2), head('x2', 4)], 60],
  ['X1 four brushes', [{ ...x1Grey, quantity: 4 }], 276],
  ['X2 five brushes', [{ ...x2Grey, quantity: 5 }], 345],
  ['mixed brushes', [x1Grey, x2Grey], 138],
  ['brush and paid heads', [x1Grey, head('x1')], 79],
  ['two brushes plus paid heads outside bundle', [{ ...x2Grey, quantity: 2 }, head('x2')], 148],
  ['three brushes plus paid heads outside bundle', [{ ...x1Grey, quantity: 3 }, head('x1')], 217],
  ['recording mixed cart', [{ ...x2Grey, quantity: 2 }, x1Grey, head('x1')], 217],
] as const) {
  test(`ordinary checkout accepts ${label} at original item prices`, async () => {
    const mock = mockStandardCheckout();
    try {
      const response = await POST(request([...lines]));
      const body = await response.json();
      assert.equal(response.status, 200, body.error);
      assert.equal(body.offerType, 'standard_cart');
      assert.equal(totals([...lines]).finalSubtotal, amount);
      assert.equal(mock.submitted.reduce((sum, line) => sum + line.quantity, 0), lines.reduce((sum, line) => sum + line.quantity, 0));
      assert.match(body.checkoutUrl, /^https:\/\/(x1|offer)\.miroooo\.us\/[a-z0-9]{256}\/checkout\/[a-f0-9]{64}\?currency=GBP$/);
      assert.ok(mock.calls.every((url) => !url.includes('create-bundle-order')));
    } finally { mock.restore(); }
  });
}

test('legacy XPage variantIds resolves to a standard X1 cart', async () => {
  const mock = mockStandardCheckout();
  try {
    const response = await POST(new Request('http://localhost/api/checkout/prepare', {
      method: 'POST', body: JSON.stringify({ variantIds: [XPAGE_VARIANTS.x1_grey] }),
    }));
    const body = await response.json();
    assert.equal(response.status, 200, body.error);
    assert.equal(body.cart[0].variant_id, XPAGE_VARIANTS.x1_grey);
  } finally { mock.restore(); }
});

for (const [label, options] of [
  ['changed product price', { price: 70 }],
  ['USD handoff despite GBP server session', { currency: 'USD' }],
] as const) {
  test(`ordinary checkout accepts ${label} when products are present`, async () => {
    const mock = mockStandardCheckout(options);
    try {
      const response = await POST(request([x1Grey]));
      const body = await response.json();
      assert.equal(response.status, 200);
      assert.ok(body.checkoutUrl);
    } finally { mock.restore(); }
  });
}

for (const [label, options, code, status] of [
  ['provider offline', { unavailable: true }, 'QUOTE_UNAVAILABLE', 503],
  ['unsafe checkout destination', { unsafeUrl: true }, 'QUOTE_UNAVAILABLE', 503],
  ['different order quantities', { wrongQuantity: true }, 'QUOTE_UNAVAILABLE', 503],
] as const) {
  test(`ordinary checkout blocks ${label}`, async () => {
    const mock = mockStandardCheckout(options);
    try {
      const response = await POST(request([x1Grey]));
      const body = await response.json();
      assert.equal(response.status, status);
      assert.equal(body.code, code);
      assert.equal(body.checkoutUrl, undefined);
      assert.ok(mock.calls.every((url) => !url.startsWith('https://example.com')));
    } finally { mock.restore(); }
  });
}

test('standard-cart proceeds to checkout when products are present regardless of checkout price', async () => {
  const mock = mockStandardCheckout();
  try {
    const response = await POST(request([{ ...x1Grey, quantity: 4 }], 'MIROOOO10'));
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.ok(body.checkoutUrl);
  } finally { mock.restore(); }
});

test('invalid quantities and variants are rejected without calling XPage', async () => {
  const mock = mockStandardCheckout();
  try {
    for (const item of [{ ...x1Grey, quantity: 0 }, { ...x1Grey, quantity: 1.5 }, { ...x1Grey, quantity: 100 }, { ...x1Grey, variantId: 'unknown' }]) {
      const response = await POST(request([item]));
      assert.equal(response.status, 400);
    }
    assert.equal(mock.calls.length, 0);
  } finally { mock.restore(); }
});

for (const actualTotal of [128, 128.01]) {
  test(`bundle validation accepts £${actualTotal} checkout when products are present regardless of checkout price`, async () => {
    const oldFetch = globalThis.fetch;
    let orders = 0;
    globalThis.fetch = async (input, init) => {
      if (init?.method === 'POST') {
        orders++;
        return Response.json({status: 'success', checkout_url: `${XPAGE_STORE_URL}/checkout/${'b'.repeat(64)}`});
      }
      if (String(input).includes('/checkout/')) {
        const rows = [{quantity: 2, price: 69, variant: {id: XPAGE_VARIANTS.x2_grey}}, {quantity: 1, price: 10, variant: {id: XPAGE_VARIANTS.x2_heads}}];
        return new Response(`<span class="total font-semibold">£${actualTotal.toFixed(2)}</span><script>const order = {variants: ${JSON.stringify(rows)}};</script>${browserQuote(148, 20)}`);
      }
      return new Response(mockPublishedOffer(2));
    };
    try {
      const response = await POST(request([{ ...x2Grey, quantity: 2 }]));
      const body = await response.json();
      assert.equal(response.status, 200, body.error);
      assert.equal(orders, 1);
      assert.equal(body.offerType, 'native_bundle');
      assert.ok(body.checkoutUrl);
    } finally { globalThis.fetch = oldFetch; }
  });
}

test('checkout verifies products are present regardless of live rounding', () => {
  const lines = [{quantity: 3, price: 69, variant: {id: XPAGE_VARIANTS.x1_grey}}, {quantity: 2, price: 10, variant: {id: XPAGE_VARIANTS.x1_heads}}];
  const cart = lines.map((line) => ({variant_id: line.variant.id, quantity: line.quantity}));
  const html = `<span class="total">£177.00</span><script>const order = {variants: ${JSON.stringify(lines)}};</script>`;
  assert.doesNotThrow(() => assertCheckoutOrderQuote(html + browserQuote(226, 50), cart, 177));
  assert.throws(() => assertCheckoutOrderQuote('<p>no variants</p>', cart, 177), {code: 'QUOTE_UNAVAILABLE'});
});

test('UK checkout blocks an unavailable provider quote', async () => {
  const oldFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('offline'); };
  try {
    const response = await POST(request([x2Grey]));
    const body = await response.json();
    assert.equal(response.status, 503);
    assert.equal(body.code, 'QUOTE_UNAVAILABLE');
    assert.equal(body.checkoutUrl, undefined);
  } finally { globalThis.fetch = oldFetch; }
});
