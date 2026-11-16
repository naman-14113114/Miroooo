import { NextResponse, type NextRequest } from "next/server";
import { lookupMirooooTracking } from '@/lib/miroooo-tracking.server';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { 'Cache-Control':'private, no-store, max-age=0' };
const reply = (data: unknown, status = 200) => NextResponse.json(data, {status, headers});
async function lookup(query: unknown) {
  if (typeof query !== 'string' || !query.trim() || !/^#?[A-Za-z0-9][A-Za-z0-9_-]{2,99}$/.test(query.trim()))
    return reply({status:'error', message:'Please enter your tracking number or order number.'}, 400);
  try {
    const q = query.trim();
    const data = await lookupMirooooTracking(q);
    if (!data) return reply({status:'not_found', message:'No tracking record found. Check the tracking number or order reference in your confirmation email. New tracking numbers may take time to appear after dispatch.'}, 404);
    return reply({status:'found', data});
  } catch {
    return reply({status:'unavailable', message:'Tracking updates are temporarily unavailable or have not been published by the carrier yet. Please try again shortly or contact support@trymiroooo.com.'}, 503);
  }
}
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  return lookup(body?.trackingNumber ?? body?.tracking_number ?? body?.orderNumber ?? body?.order_number ?? body?.query);
}
export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  return lookup(params.get('tracking') ?? params.get('number') ?? params.get('order') ?? params.get('query'));
}
