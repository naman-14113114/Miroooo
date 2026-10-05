async function main() {
  const res = await fetch('https://offer.miroooo.us/?currency=GBP', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  for (const match of html.matchAll(/\bx-data\s*=\s*(["'])([\s\S]*?)\1/g)) {
    if (!match[2].includes('bundle')) continue;
    try {
      const parsed = JSON.parse(match[2].replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
      if (parsed.bundle) {
        console.log("=== BUNDLE FOUND ===");
        console.log("Bundle ID:", parsed.bundle.id);
        console.log("Status:", parsed.bundle.status);
        parsed.bundle.options.forEach((opt, idx) => {
          console.log(`\n--- OPTION ${idx + 1} ---`);
          console.log("Option ID:", opt.id);
          console.log("Name:", opt.name);
          console.log("Conditions:");
          opt.conditions?.forEach(c => {
            console.log(`  Condition ID: ${c.id}, Qty: ${c.quantity}, Product: ${c.product?.title} (${c.product?.id})`);
            console.log(`  Variants:`, c.product?.variants?.map(v => `${v.id} (${v.title})`));
          });
          console.log("Offered:");
          opt.offered?.forEach(o => {
            console.log(`  Offered ID: ${o.id}, Qty: ${o.quantity}, Product: ${o.product?.title} (${o.product?.id})`);
            console.log(`  Variants:`, o.product?.variants?.map(v => `${v.id} (${v.title})`));
          });
        });
      }
    } catch (e) {
      console.error("Parse error:", e);
    }
  }
}

main();
