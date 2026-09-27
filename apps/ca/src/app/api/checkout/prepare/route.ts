import { NextResponse } from "next/server";
import { createXpageCartCheckout } from "@miroooo/shared";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const validDiscountCodes = ["MIROOOO", "MIROOOO10"];

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
          quantity: Math.max(1, Math.round(Number(body.quantity) || 1)),
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

    const result = await createXpageCartCheckout({
      cart: rawItems,
      attribution,
      currency: "CAD",
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
    console.error("XPage checkout preparation failed:", error);
    return NextResponse.json(
      { error: "Secure checkout is temporarily unavailable. Please try again." },
      { status: 500, headers: corsHeaders }
    );
  }
}
