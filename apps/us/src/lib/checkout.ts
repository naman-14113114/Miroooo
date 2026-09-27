import type { CartItem } from "./cart";

export interface AttributionParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  msclkid?: string;
  gclid?: string;
  fbclid?: string;
  ttclid?: string;
  [key: string]: string | undefined;
}

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "msclkid",
  "gclid",
  "fbclid",
  "ttclid",
];

const ATTRIBUTION_STORAGE_KEY = "miroooo_attribution";

export function getStoredAttribution(): AttributionParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function captureAttribution(): AttributionParams {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const captured: AttributionParams = { ...getStoredAttribution() };
    let hasNew = false;

    for (const key of ATTRIBUTION_KEYS) {
      const val = params.get(key);
      if (val) {
        captured[key] = val;
        hasNew = true;
      }
    }

    if (hasNew) {
      sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(captured));
    }
    return captured;
  } catch {
    return {};
  }
}

export interface PrepareCheckoutOptions {
  items: CartItem[];
  discountCode?: string;
  attribution?: AttributionParams;
}

export async function prepareCheckout({
  items,
  discountCode = "",
  attribution,
}: PrepareCheckoutOptions): Promise<{ ok: boolean; checkoutUrl?: string; error?: string }> {
  try {
    const currentAttribution = attribution || getStoredAttribution();

    // Map items for /api/checkout/prepare endpoint
    const lines = items.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      color: item.color || "Silver",
      quantity: item.quantity,
      isFree: item.isFree || false,
      name: item.name,
      price: item.price,
    }));

    const response = await fetch("/api/checkout/prepare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: { lines },
        items: lines,
        discountCode: discountCode.trim().toUpperCase(),
        attribution: currentAttribution,
        country: "US",
        currency: "USD",
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.checkoutUrl) {
      throw new Error(data.error || "Failed to generate secure checkout session.");
    }

    return {
      ok: true,
      checkoutUrl: data.checkoutUrl,
    };
  } catch (error: any) {
    console.error("prepareCheckout error:", error);
    return {
      ok: false,
      error: error.message || "Checkout could not be initialized.",
    };
  }
}
