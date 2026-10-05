import { loadXpageSession } from "../packages/shared/src/xpage.ts";

async function checkOfferedDiscountTypes() {
  const session = await loadXpageSession('GBP', 'x2');
  session.bundle.options.forEach((opt, idx) => {
    console.log(`\n=== OPTION ${idx + 1} (${opt.id}) ===`);
    console.log("Discount Type:", opt.discount_type, "Amount:", opt.discount_amount);
    opt.offered?.forEach((o, oidx) => {
      console.log(`  Offered ${oidx + 1}: ID=${o.id}, Qty=${o.quantity}, DiscountType=${o.discount_type}, DiscountAmount=${o.discount_amount}, Target=${o.discount_target}`);
    });
  });
}

checkOfferedDiscountTypes();
