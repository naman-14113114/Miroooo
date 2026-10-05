import { loadXpageSession, detectBundlePayload, mapCartToXpageVariants, XPAGE_BUNDLES } from "../packages/shared/src/xpage.ts";

async function testBundle(name, cart) {
  console.log(`\n========================================`);
  console.log(`TESTING: ${name}`);
  console.log(`Cart:`, JSON.stringify(cart));
  
  const payload = detectBundlePayload(cart);
  console.log(`detectBundlePayload result:`, payload);
  if (!payload) {
    console.error(`FAILED: detectBundlePayload returned null!`);
    return;
  }

  const session = await loadXpageSession('GBP', payload.product);
  console.log(`Session loaded: origin=${session.origin}, landingPageId=${session.landingPageId}`);

  const option = session.bundle?.options?.find(o => o.id === payload.bundle_option_id);
  if (!option) {
    console.error(`FAILED: Option ${payload.bundle_option_id} not found in bundle!`);
    return;
  }
  console.log(`Found option:`, option.id);
  
  const condition = option.conditions?.find(c => c.quantity === payload.brushes.length);
  const offered = option.offered?.find(o => o.quantity === payload.offeredQty);
  console.log(`Condition:`, condition?.id, `Offered:`, offered?.id, `OfferedQty:`, payload.offeredQty);

  const body = {
    bundle_option_id: option.id,
    landing_page_id: session.landingPageId,
    bundle_selected_variants: {
      conditions: { [condition.id]: payload.brushes },
      offered: offered ? { [offered.id]: Array(payload.offeredQty).fill(payload.headsVariant) } : {}
    }
  };
  console.log(`Calling /create-bundle-order with:`, JSON.stringify(body, null, 2));

  const cookies = (headers) => {
    const jar = new Map();
    for (const h of headers.flat()) {
      const p = h.split(';')[0];
      const idx = p.indexOf('=');
      if (idx > 0) jar.set(p.slice(0, idx), p.slice(idx + 1));
    }
    jar.set('xp_currency', 'GBP');
    return [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
  };

  const response = await fetch(`${session.origin}/create-bundle-order?currency=GBP`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-CSRF-Token': session.csrfToken,
      Origin: session.origin,
      Referer: session.url,
      Cookie: cookies(session.setCookieHeaders)
    },
    body: JSON.stringify(body)
  });

  console.log(`Response status:`, response.status);
  const data = await response.json();
  console.log(`Response data:`, data);
  if (data.status === 'success' && data.checkout_url) {
    console.log(`SUCCESS! checkout_url:`, data.checkout_url);
    
    // Now fetch the checkout page HTML to see what variants/order lines XPage rendered!
    const checkoutRes = await fetch(data.checkout_url, {
      headers: {
        Accept: 'text/html',
        Cookie: cookies([session.setCookieHeaders, response.headers.getSetCookie()].flat())
      }
    });
    const html = await checkoutRes.text();
    const variantsMatch = html.match(/\bvariants:\s*(\[[^\]]+\])/);
    if (variantsMatch) {
      console.log(`Rendered checkout variants:`, variantsMatch[1]);
    } else {
      console.log(`Could not find variants in HTML, checking snippet:`, html.slice(0, 500));
    }
  } else {
    console.error(`FAILED to create bundle order!`, data);
  }
}

async function run() {
  // Option 1: Buy 1 + 1 Free Head
  await testBundle("Option 1 (Buy 1 + 1 Free Head)", [
    { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 1 },
    { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 1 }
  ]);

  // Option 2: Buy 2 + 2 Free Heads
  await testBundle("Option 2 (Buy 2 + 2 Free Heads)", [
    { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 2 },
    { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 2 }
  ]);

  // Option 3: Buy 3 + 3 Free Heads
  await testBundle("Option 3 (Buy 3 + 3 Free Heads)", [
    { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 3 },
    { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 3 }
  ]);

  // Option 4: Buy 1 + 1 Free Head + 1 Paid Head
  await testBundle("Option 4 (Buy 1 + 1 Free Head + 1 Paid Head)", [
    { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 1 },
    { productHandle: "miroooo-x2-heads", variantId: "1000020718937117", quantity: 1 },
    { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 1 }
  ]);

  // Option 5: Buy 2 + 2 Free Heads + 1 Paid Head
  await testBundle("Option 5 (Buy 2 + 2 Free Heads + 1 Paid Head)", [
    { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 2 },
    { productHandle: "miroooo-x2-heads", variantId: "1000020718937117", quantity: 1 },
    { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 2 }
  ]);

  // Option 6: Buy 3 + 3 Free Heads + 1 Paid Head
  await testBundle("Option 6 (Buy 3 + 3 Free Heads + 1 Paid Head)", [
    { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 3 },
    { productHandle: "miroooo-x2-heads", variantId: "1000020718937117", quantity: 1 },
    { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 3 }
  ]);
}

run();
