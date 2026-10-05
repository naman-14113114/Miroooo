import { prepareUKCheckout } from "../apps/uk/src/lib/checkout.ts";

async function testAll() {
  const cases = [
    {
      name: "Option 1: Buy 1 + 1 Free Head",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 1 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 1 }
      ],
      expectedGBP: 69
    },
    {
      name: "Option 2: Buy 2 + 2 Free Heads",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 2 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 2 }
      ],
      expectedGBP: 128
    },
    {
      name: "Option 3: Buy 3 + 3 Free Heads",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 3 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 3 }
      ],
      expectedGBP: 177
    },
    {
      name: "Option 4: Buy 1 + 1 Free Head + 1 Paid Head",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 1 },
        { productHandle: "miroooo-x2-heads", variantId: "1000020718937117", quantity: 1 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 1 }
      ],
      expectedGBP: 79
    },
    {
      name: "Option 5: Buy 2 + 2 Free Heads + 1 Paid Head",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 2 },
        { productHandle: "miroooo-x2-heads", variantId: "1000020718937117", quantity: 1 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 2 }
      ],
      expectedGBP: 138
    },
    {
      name: "Option 6: Buy 3 + 3 Free Heads + 1 Paid Head",
      cart: [
        { productHandle: "miroooo-x2", variantId: "1000020700182884", color: "Silver", quantity: 3 },
        { productHandle: "miroooo-x2-heads", variantId: "1000020718937117", quantity: 1 },
        { id: "miroooo-x2-heads:free", productHandle: "miroooo-x2-heads", variantId: "1000020718937117", isFree: true, quantity: 3 }
      ],
      expectedGBP: 187
    }
  ];

  for (const c of cases) {
    console.log(`\n========================================`);
    console.log(`TESTING prepareUKCheckout: ${c.name}`);
    try {
      const res = await prepareUKCheckout({
        cart: c.cart,
        discountCode: "",
        expectedGBP: c.expectedGBP,
        useBundle: true,
        attribution: {}
      });
      console.log(`RESULT SUCCESS:`, res.checkoutUrl);
    } catch (err) {
      console.error(`RESULT FAILED:`, err.message);
    }
  }
}

testAll();
