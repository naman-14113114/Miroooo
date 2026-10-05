import fs from 'fs';

const html = fs.readFileSync('checkout_debug.html', 'utf8');

// Find all occurrences of variants, products, pricing, orderData in checkout_debug.html
console.log("=== CHECKOUT HTML INSPECTION ===");

const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
scripts.forEach((s, idx) => {
  if (s.includes('variants:') || s.includes('bundleData') || s.includes('bundle_selected_variants') || s.includes('line_items') || s.includes('items:')) {
    console.log(`\n--- Script ${idx} ---`);
    console.log(s);
  }
});
