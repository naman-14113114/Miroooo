/* eslint-disable @typescript-eslint/no-explicit-any -- The existing checkout endpoint accepts several legacy request shapes. */
import { NextResponse } from "next/server";
import { XPAGE_VARIANTS, detectBundlePayload } from "@miroooo/shared";
import { calculateTotals, normalizeCartItems } from "@/lib/cart";
import { CheckoutQuoteError } from "@/lib/checkout-quote";
import { prepareUKCheckout } from "@/lib/checkout";
import { PRODUCTS } from "@/data/products";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const validDiscountCodes = ["MIROOOO", "MIROOOO10"];
export const KNOWN_VARIANTS: Record<string, { handle: string; color: string }> = {
  [XPAGE_VARIANTS.x1_silver]: { handle: 'miroooo-x', color: 'Silver' },
  [XPAGE_VARIANTS.x1_grey]: { handle: 'miroooo-x', color: 'Grey' },
  [XPAGE_VARIANTS.x1_pink]: { handle: 'miroooo-x', color: 'Pink' },
  [XPAGE_VARIANTS.x1_silver_6pc]: { handle: 'miroooo-x', color: 'Silver' },
  [XPAGE_VARIANTS.x1_grey_6pc]: { handle: 'miroooo-x', color: 'Grey' },
  [XPAGE_VARIANTS.x1_pink_6pc]: { handle: 'miroooo-x', color: 'Pink' },
  [XPAGE_VARIANTS.x2_silver]: { handle: 'miroooo-x2', color: 'Silver' },
  [XPAGE_VARIANTS.x2_grey]: { handle: 'miroooo-x2', color: 'Grey' },
  [XPAGE_VARIANTS.x2_pink]: { handle: 'miroooo-x2', color: 'Pink' },
  [XPAGE_VARIANTS.x1_heads]: { handle: 'miroooo-x1-heads', color: 'Default' },
  [XPAGE_VARIANTS.x2_heads]: { handle: 'miroooo-x2-heads', color: 'Default' },
  [XPAGE_VARIANTS.gift_card]: { handle: 'miroooo-gift-card', color: 'Default' },
  [XPAGE_VARIANTS.package_protection]: { handle: 'miroooo-package-protection', color: 'Default' },
  // Miroooo Water Flosser
  [XPAGE_VARIANTS.flosser_black_7]: { handle: 'miroooo-water-flosser', color: 'Black' },
  [XPAGE_VARIANTS.flosser_black_4]: { handle: 'miroooo-water-flosser', color: 'Black' },
  [XPAGE_VARIANTS.flosser_white_7]: { handle: 'miroooo-water-flosser', color: 'White' },
  [XPAGE_VARIANTS.flosser_white_4]: { handle: 'miroooo-water-flosser', color: 'White' },
};

const xpageVariantToLocal = KNOWN_VARIANTS;

function resolveCheckoutLine(line: any) {
  if (!line || typeof line !== 'object') throw new Error('Invalid checkout item.');
  const requestedId = String(line.variantId || line.variant_id || '');
  const xpageVariant = KNOWN_VARIANTS[requestedId];
  const inferred = xpageVariant || Object.values(PRODUCTS).flatMap((product) =>
    product.variants.map((variant) => ({ handle: product.handle, color: variant.color, id: variant.id }))
  ).find((variant) => variant.id === requestedId);
  if (!inferred) return line;
  if (line.productHandle && line.productHandle !== inferred.handle) throw new Error('Invalid checkout variant.');
  const product = PRODUCTS[inferred.handle];
  const variant = product?.variants?.find((item) => item.id === requestedId) ||
    product?.variants?.find((item) => item.color === inferred.color) ||
    product?.variants?.[0];
  return { ...line, productHandle: product?.handle || inferred.handle, variantId: variant?.id || requestedId };
}

function normalizeDiscountCode(code: unknown): string {
  return String(code || "").trim().toUpperCase();
}

function collectRequestedDiscountCode(body: any): string {
  const candidates: string[] = [];
  if (Array.isArray(body.discountCodes)) {
    candidates.push(...body.discountCodes);
  }
  if (typeof body.discountCode === "string" && body.discountCode.trim()) {
    candidates.push(...body.discountCode.split(","));
  }

  const matched = candidates
    .map(normalizeDiscountCode)
    .filter((code) => validDiscountCodes.includes(code));

  return matched.find((c) => c === "MIROOOO10" || c === "MIROOOO") || "";
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  try {
    const headers = req.headers;
    const bodyText = await req.text();
    let body: any = {};
    if (bodyText) {
      try {
        body = JSON.parse(bodyText);
      } catch {
        body = {};
      }
    }

    // 1. Morocco IP Blocking
    const clientCountry = (
      headers.get("x-vercel-ip-country") ||
      headers.get("cf-ipcountry") ||
      headers.get("x-country-code") ||
      headers.get("x-country") ||
      body?.country ||
      ""
    ).toString().trim().toUpperCase();

    if (clientCountry === "MA" || clientCountry === "MOROCCO") {
      return NextResponse.json(
        { error: "The checkout has not been connected, and no order has been placed." },
        { status: 400, headers: corsHeaders }
      );
    }

    const attribution = body.attribution || {};
    let rawItems: any[] = [];

    if (Array.isArray(body.items) && body.items.length > 0) {
      rawItems = body.items;
    } else if (Array.isArray(body.cart?.lines) && body.cart.lines.length > 0) {
      rawItems = body.cart.lines;
    } else if (Array.isArray(body.cart) && body.cart.length > 0) {
      rawItems = body.cart;
    } else if (Array.isArray(body.variantIds) && body.variantIds.length > 0) {
      rawItems = body.variantIds.map((vId: string) => ({
        variantId: vId,
        quantity: 1,
      }));
    } else if (body.variantId) {
      rawItems = [
        {
          variantId: body.variantId,
          productId: body.productId,
          color: body.color,
          quantity: body.quantity === undefined ? 1 : Number(body.quantity),
        },
      ];
    }

    if (!rawItems.length) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400, headers: corsHeaders }
      );
    }

    const discountCode = collectRequestedDiscountCode(body);
    const canonicalItems = normalizeCartItems(rawItems.map(resolveCheckoutLine), true);
    if (!canonicalItems.length) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400, headers: corsHeaders });
    }
    const totals = calculateTotals(canonicalItems, discountCode ? [discountCode] : []);
    const canonicalCart = canonicalItems.map(({ id, productHandle, productId, variantId, title, color, quantity }) =>
      ({ id, productHandle, productId, variantId, title, color, quantity })
    );
    if (totals.extraX1BrushHeadSets > 0) {
      const handle = 'miroooo-x1-heads';
      const quantity = totals.extraX1BrushHeadSets;
      const gift = normalizeCartItems([{ productHandle: handle, variantId: '1000020710139724', quantity }], true)[0];
      canonicalCart.push({ id: `${handle}:free`, productHandle: gift.productHandle, productId: gift.productId, variantId: gift.variantId, title: gift.title, color: gift.color, quantity });
    }
    const flosserCount = canonicalItems
      .filter((item) => item.productHandle === 'miroooo-water-flosser' || item.productHandle === 'water-flosser' || item.productHandle === 'flosser')
      .reduce((sum, item) => sum + (item.quantity || 1), 0);
    const hasFlosser = flosserCount > 0;
    if (hasFlosser && flosserCount !== 2) {
      if (!canonicalCart.some((line) => line.id === 'miroooo-gift-card:free' || line.productHandle === 'miroooo-gift-card')) {
        canonicalCart.push({
          id: 'miroooo-gift-card:free',
          productHandle: 'miroooo-gift-card',
          productId: 'a2f687d2-56cd-4709-95a5-e6d280070c18',
          variantId: 'a2f687d5-32cc-427c-81f1-5d153911e592',
          title: 'Miroooo Gift Card',
          color: 'Default',
          quantity: 1,
        });
      }
    }
    const requestedProtection = Boolean(
      flosserCount === 2 || body?.packageProtection || body?.cart?.packageProtection || body?.protection || body?.package_protection
    );
    if (requestedProtection && !canonicalCart.some((line) => line.productHandle === 'miroooo-package-protection')) {
      const protectionProduct = PRODUCTS['miroooo-package-protection'];
      const protectionVariant = protectionProduct?.variants?.[0];
      if (protectionProduct && protectionVariant) {
        canonicalCart.push({
          id: 'miroooo-package-protection',
          productHandle: 'miroooo-package-protection',
          productId: protectionProduct.plusBaseProductId || XPAGE_VARIANTS.package_protection,
          variantId: protectionVariant.id,
          title: protectionProduct.name,
          color: protectionVariant.color || 'Default',
          quantity: 1,
        });
      }
    }
    let expectedGBP = totals.finalSubtotal;
    if (requestedProtection && !canonicalItems.some((i) => i.productHandle === 'miroooo-package-protection')) {
      expectedGBP += 3;
    }
    const bundlePayload = totals.bundleEligible ? detectBundlePayload(canonicalCart, discountCode) : null;
    const useBundle = Boolean(bundlePayload);
    const result = await prepareUKCheckout({
      cart: canonicalCart,
      attribution,
      expectedGBP,
      useBundle,
      discountCode: discountCode === "MIROOOO" ? "MIROOOO10" : discountCode,
    });

    return NextResponse.json(
      {
        ok: true,
        checkoutUrl: result.checkoutUrl,
        appliedDiscountCode: result.isPromoBundle ? discountCode : null,
        discountCodeToEnter: result.isBundle ? null : discountCode || null,
        offerType: result.isBundle ? "native_bundle" : "standard_cart",
        cart: result.cart,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    if (error instanceof Error && /^Invalid checkout/.test(error.message)) {
      return NextResponse.json({ ok: false, code: 'INVALID_CART', error: error.message }, { status: 400, headers: corsHeaders });
    }
    if (error instanceof CheckoutQuoteError) {
      return NextResponse.json({ ok: false, code: error.code, error: error.message }, { status: error.code === 'PRICE_MISMATCH' ? 409 : 503, headers: corsHeaders });
    }
    console.error("XPage checkout preparation failed.");
    return NextResponse.json(
      { ok: false, code: 'QUOTE_UNAVAILABLE', error: "Secure checkout is temporarily unavailable. No order has been placed." },
      { status: 503, headers: corsHeaders }
    );
  }
}
