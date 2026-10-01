import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryCountry = searchParams.get("country") || "";
  const headerCountry =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    req.headers.get("x-country-code") ||
    req.headers.get("x-country") ||
    "";

  const rawCountry = (queryCountry || headerCountry || "").toString().trim().toUpperCase();
  const isMorocco = rawCountry === "MA" || rawCountry === "MOROCCO";

  return NextResponse.json(
    {
      country: rawCountry,
      blocked: isMorocco,
      isMorocco,
      message: isMorocco
        ? "The checkout has not been connected, and no order has been placed."
        : null,
      redirectUrl: null,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
