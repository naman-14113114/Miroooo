import type { TrackingData, TrackingItem } from './order-tracking';
import {
  hasCJTrackingCredentials, isCJTrackingNumber, lookupCJTracking, stageData, TrackingUnavailableError,
} from './cj-tracking';

type XPageDelivery = {
  tracking_number: string | null;
  shipping_carrier: string | null;
  shipped_at: number | null;
  delivered_at: number | null;
  order_variants?: XPageVariant[];
};

type XPageVariant = {
  title: string;
  quantity: number;
  options?: string;
};

type XPageOrder = {
  id: string;
  ref: string;
  status: string;
  created_at: number;
  customer_city?: string;
  customer_country?: { name: string; iso2: string };
  deliveries?: XPageDelivery[];
  variants?: XPageVariant[];
};

const HOSTING = process.env.XPAGE_MIROOOO_HOSTING_ID || 'a2caf480-3eef-4c93-b31e-04a8d5b32f76';
function xpageHeaders() {
  const token = process.env.XPAGE_USER_TOKEN;
  if (!token) throw new TrackingUnavailableError();
  const csrf = process.env.XPAGE_XSRF_TOKEN;
  return {
    Cookie: 'xpage_user_token=' + token + (csrf ? '; XSRF-TOKEN=' + csrf : ''),
    Accept: 'application/json',
    ...(csrf ? { 'X-XSRF-Token': csrf } : {}),
  };
}
async function page(number: number, search?: string, timeout = 7000): Promise<{ orders: XPageOrder[]; paginator?: {lastPage?: number} }> {
  const params = new URLSearchParams({ page: String(number), per_page: '50' });
  if (search) params.set('search',search.replace(/^#/, ''));
  const response = await fetch('https://api.myxpage.shop/api/v1/hosting/' + HOSTING + '/order?' + params, {
    headers: xpageHeaders(), redirect: 'error',
    cache: 'no-store', signal: AbortSignal.timeout(timeout),
  });
  if (!response.ok) throw new TrackingUnavailableError();
  const result = await response.json();
  if (!Array.isArray(result.orders)) throw new TrackingUnavailableError();
  return result;
}
function orderKey(value: string) {
  return value.replace(/^#/, '').toUpperCase();
}

function exactMatch(orders: XPageOrder[], query: string) {
  const key = orderKey(query);
  const matches = orders.filter(order =>
    [order.id, order.ref, ...(order.deliveries || []).map(delivery => delivery.tracking_number)]
      .some(value => typeof value === 'string' && orderKey(value) === key),
  );
  if (matches.length > 1) throw new TrackingUnavailableError();
  return matches[0] || null;
}

async function findOrder(query: string, barcode: boolean) {
  const searched = exactMatch((await page(1, query)).orders, query);
  if (searched || barcode) return searched;
  const first = await page(1);
  const latest = exactMatch(first.orders, query);
  if (latest) return latest;

  // Older orders can fall beyond the first page if XPage search did not index them.
  const last = Number(first.paginator?.lastPage) || 1;
  const deadline = Date.now() + 30000;
  for (let number = 2; number <= last; number++) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) throw new TrackingUnavailableError();
    const current = await page(number, undefined, Math.min(7000, remaining));
    const order = exactMatch(current.orders, query);
    if (order) return order;
  }
  return null;
}

export function pendingTracking(orderRef: string, orderDate = '', items: TrackingItem[] = []): TrackingData {
  return {
    found: true, orderRef, trackingNumber: 'Not assigned yet', carrierName: 'Awaiting dispatch',
    destination: '', orderDate, items, ...stageData('PROCESSING'),
    estimatedDelivery: '', timeline: [], checkedAt: new Date().toISOString(), stale: false,
  };
}

type HistoricalAlias = { id: string; ref: string; tracks: string[] };

function findHistoricalAlias(query: string): HistoricalAlias | undefined {
  try {
    const aliases: HistoricalAlias[] = JSON.parse(process.env.MIROOOO_LEGACY_TRACKING_ALIASES || '[]');
    if (!Array.isArray(aliases)) return undefined;
    return aliases.find(entry => entry && typeof entry.id === 'string' && typeof entry.ref === 'string' &&
      Array.isArray(entry.tracks) && entry.tracks.length > 0 &&
      entry.tracks.every(number => typeof number === 'string' && isCJTrackingNumber(number)) &&
      [entry.id, entry.ref, ...entry.tracks].some(value => orderKey(value) === query));
  } catch {
    return undefined;
  }
}

export async function lookupXPageTracking(rawQuery: string, barcode = false): Promise<TrackingData | null> {
  const query = rawQuery.trim();
  if (!query || query.length > 100) return null;
  const key = orderKey(query);
  const alias = findHistoricalAlias(key);
  let order: XPageOrder | null;
  if (alias) {
    // Use the verified association when XPage's old search is unavailable.
    const searched = await page(1, query, 3000).catch(() => null);
    order = searched ? exactMatch(searched.orders, query) : null;
    order ??= {
      id: alias.id, ref: alias.ref, status: '', created_at: 0,
      deliveries: alias.tracks.map(tracking_number => ({
        tracking_number, shipping_carrier: null, shipped_at: null, delivered_at: null,
      })),
    };
  } else {
    order = await findOrder(query, barcode);
  }
  if (!order) return null;
  if (/unpaid|pending.payment|abandon|declined|failed/i.test(order.status)) return null;
  const variants = order.variants?.length ? order.variants : (order.deliveries || []).flatMap(delivery => delivery.order_variants || []);
  const items = variants.filter(variant => typeof variant.title === 'string' && Number.isSafeInteger(variant.quantity) && variant.quantity > 0)
    .map(variant => ({ title: variant.title, quantity: variant.quantity, variant: variant.options }));
  const orderDate = order.created_at
    ? new Date(order.created_at * 1000).toLocaleDateString('en-GB', {
        timeZone: 'Europe/London', day: 'numeric', month: 'long', year: 'numeric',
      })
    : '';
  const destination = [order.customer_city, order.customer_country?.name].filter(Boolean).join(', ');
  if (/cancel|void|refund/i.test(order.status)) {
    return { ...pendingTracking(order.ref, orderDate, items), ...stageData('ORDER_PLACED'), status: 'Cancelled', destination };
  }
  const deliveries = new Map<string, XPageDelivery>();
  for (const delivery of order.deliveries || []) {
    const number = delivery.tracking_number?.trim().toUpperCase();
    if (number && isCJTrackingNumber(number)) deliveries.set(number, delivery);
  }
  if (!deliveries.size) return { ...pendingTracking(order.ref, orderDate, items), destination };

  const shipments = await Promise.all([...deliveries].map(async ([number, delivery]): Promise<TrackingData> => {
    const carrier = hasCJTrackingCredentials() ? await lookupCJTracking(number).catch(() => null) : null;
    const data = carrier || {
      ...pendingTracking(order.ref, orderDate, items),
      trackingNumber: number,
      carrierName: delivery.shipping_carrier || 'Carrier',
      ...(delivery.shipped_at ? { ...stageData('IN_TRANSIT'), status: 'Dispatched' as const } : {}),
      ...(delivery.delivered_at ? {
        ...stageData('DELIVERED'),
        estimatedDelivery: new Date(delivery.delivered_at * 1000).toISOString(),
      } : {}),
    };
    return { ...data, orderRef: order.ref, orderDate, items, destination: destination || data.destination };
  }));
  const preferred = shipments.find(parcel => parcel.trackingNumber === key) || shipments[0];
  return { ...preferred, ...(shipments.length > 1 ? { shipments } : {}) };
}
