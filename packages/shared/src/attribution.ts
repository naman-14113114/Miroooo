import type { AttributionKey, ProductPageContent } from "./types";

export const STOREFRONT_ATTRIBUTION_KEYS: AttributionKey[] = [
  "msclkid",
  "gclid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

export const CHECKOUT_ATTRIBUTION_KEYS: AttributionKey[] = [
  "msclkid",
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

export interface BuildCheckoutUrlInput {
  product: Pick<ProductPageContent, "checkoutProductId" | "checkoutSource">;
  primaryVariantId: string;
  quantity: number;
  attribution?: Partial<Record<AttributionKey, string>>;
}

export function buildBuudyCheckoutUrl({
  product,
  primaryVariantId,
  quantity,
  attribution = {},
}: BuildCheckoutUrlInput): string {
  const url = new URL("https://buudy.com/pages/add-to-cart");
  url.searchParams.set("product_id", product.checkoutProductId);
  url.searchParams.set("variant_id", primaryVariantId);
  url.searchParams.set("quantity", String(quantity));
  url.searchParams.set("source", product.checkoutSource);

  for (const key of CHECKOUT_ATTRIBUTION_KEYS) {
    const value = attribution[key]?.trim();
    if (value) url.searchParams.set(key, value);
  }

  return url.toString();
}

