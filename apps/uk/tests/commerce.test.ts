import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PRODUCTS } from '../src/data/products';
import { calculateTotals, normalizeCartItems } from '../src/lib/cart';
import { POST } from '../src/app/api/checkout/prepare/route';
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

test('UK checkout allows an exact live GBP single-brush quote', async () => {
  const oldFetch = globalThis.fetch;
  let orders = 0;
  globalThis.fetch = async (_input, init) => {
    if (init?.method === 'POST') {
      orders++;
      return Response.json({ status: 'success', checkout_url: `${XPAGE_STORE_URL}/checkout/${'a'.repeat(64)}` });
    }
    return new Response(mockPublishedOffer(1), { status: 200 });
  };
  try {
    const response = await POST(request([x2Grey]));
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(orders, 1);
    assert.match(body.checkoutUrl, /^https:\/\/offer\.miroooo\.us\/checkout\//);
  } finally { globalThis.fetch = oldFetch; }
});

test('legacy XPage variantIds shape resolves X1 to canonical UK checkout data', async () => {
  const oldFetch = globalThis.fetch;
  let orders = 0;
  globalThis.fetch = async (_input, init) => {
    if (init?.method === 'POST') {
      orders++;
      return Response.json({ status: 'success', checkout_url: `${XPAGE_STORE_URL}/checkout/${'b'.repeat(64)}` });
    }
    return new Response(mockPublishedOffer(1, 69, 'x1'), { status: 200 });
  };
  try {
    const response = await POST(new Request('http://localhost/api/checkout/prepare', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ variantIds: [XPAGE_VARIANTS.x1_grey] }),
    }));
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(orders, 1);
    assert.equal(body.cart[0].variant_id, XPAGE_VARIANTS.x1_grey);
  } finally { globalThis.fetch = oldFetch; }
});

test('UK checkout blocks a published bundle penny mismatch without creating an order', async () => {
  const oldFetch = globalThis.fetch;
  let orders = 0;
  globalThis.fetch = async (_input, init) => {
    if (init?.method === 'POST') orders++;
    return new Response(mockPublishedOffer(2), { status: 200 });
  };
  try {
    const response = await POST(request([{ ...x2Grey, quantity: 2 }]));
    const body = await response.json();
    assert.equal(response.status, 409);
    assert.equal(body.code, 'PRICE_MISMATCH');
    assert.match(body.error, /£128\.00.*£128\.01/);
    assert.equal(orders, 0);
  } finally { globalThis.fetch = oldFetch; }
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
