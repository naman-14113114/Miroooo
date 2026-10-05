import fs from 'fs';

async function checkCheckoutHtml() {
  const sessionRes = await fetch('https://offer.miroooo.us/?currency=GBP', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const sessionHtml = await sessionRes.text();
  const csrfToken = sessionHtml.match(/["']X-CSRF-Token["']:\s*["']([^"']+)["']/)?.[1] || "";
  const landingPageId = sessionHtml.match(/orderData\.landing_page_id\s*=\s*["']([\da-f-]{36})["']/)?.[1] || "";
  
  const setCookieHeaders = sessionRes.headers.getSetCookie();
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

  // Option 4: buy1_1head
  const body = {
    bundle_option_id: "a2e88657-6fbd-410c-950c-56e0208d19a9",
    landing_page_id: landingPageId,
    bundle_selected_variants: {
      conditions: { "a2e8bae1-eda1-4ba1-b1ae-38cd1fd182f7": ["a2d08cd4-6781-49a7-ad82-f3d52ba0270f"] },
      offered: { "a2e8bae1-f651-464e-8a2f-fe38bb44d0de": ["a2d0cb1d-dfcf-425d-9251-7792053c08b8", "a2d0cb1d-dfcf-425d-9251-7792053c08b8"] }
    }
  };

  const response = await fetch(`https://offer.miroooo.us/create-bundle-order?currency=GBP`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-CSRF-Token': csrfToken,
      Origin: 'https://offer.miroooo.us',
      Referer: 'https://offer.miroooo.us/?currency=GBP',
      Cookie: cookies(setCookieHeaders)
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  console.log("Create bundle order response:", data);
  if (data.checkout_url) {
    const checkoutRes = await fetch(data.checkout_url, {
      headers: {
        Accept: 'text/html',
        Cookie: cookies([setCookieHeaders, response.headers.getSetCookie()].flat())
      }
    });
    const checkoutHtml = await checkoutRes.text();
    fs.writeFileSync('checkout_debug.html', checkoutHtml);
    console.log("Saved checkout_debug.html. Searching for order data, variants, bundle, etc:");
    
    // Look for all script tags or JSON objects in checkoutHtml
    for (const m of checkoutHtml.matchAll(/orderData\s*=\s*(\{[\s\S]*?\});/g)) {
      console.log("Found orderData:", m[1].slice(0, 500));
    }
    for (const m of checkoutHtml.matchAll(/x-data\s*=\s*(["'])([\s\S]*?)\1/g)) {
      if (m[2].includes('variant') || m[2].includes('item') || m[2].includes('bundle')) {
        console.log("Found x-data snippet:", m[2].slice(0, 300));
      }
    }
  }
}

checkCheckoutHtml();
