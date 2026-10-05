import { prepareUSCheckout } from "../apps/us/src/lib/checkout.ts";

async function testAllUS() {
  const cases = [
    {
      name: "US Option 1: Buy 1 + 1 Free Head",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 1 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 1 }
      ],
      expectedUSD: 69
    },
    {
      name: "US Option 2: Buy 2 + 2 Free Heads",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 2 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 2 }
      ],
      expectedUSD: 128
    },
    {
      name: "US Option 3: Buy 3 + 3 Free Heads",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 3 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 3 }
      ],
      expectedUSD: 177
    },
    {
      name: "US Option 4: Buy 1 + 1 Free Head + 1 Paid Head",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 1 },
        { productHandle: "miroooo-x2-heads", variantId: "1000020718937117", quantity: 1 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 1 }
      ],
      expectedUSD: 79
    },
    {
      name: "US Option 5: Buy 2 + 2 Free Heads + 1 Paid Head",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 2 },
        { productHandle: "miroooo-x2-heads", variantId: "1000020718937117", quantity: 1 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 2 }
      ],
      expectedUSD: 138
    },
    {
      name: "US Option 6: Buy 3 + 3 Free Heads + 1 Paid Head",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 3 },
        { productHandle: "miroooo-x2-heads", variantId: "1000020718937117", quantity: 1 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 3 }
      ],
      expectedUSD: 187
    }
  ];

  for (const c of cases) {
    console.log(`\n========================================`);
    console.log(`TESTING prepareUSCheckout: ${c.name}`);
    try {
      const res = await prepareUSCheckout({
        cart: c.cart,
        discountCode: "",
        expectedUSD: c.expectedUSD,
        useBundle: true,
        attribution: {}
      });
      console.log(`RESULT SUCCESS:`, res.checkoutUrl);
    } catch (err) {
      console.error(`RESULT FAILED:`, err.message);
    }
  }
}

testAllUS();
