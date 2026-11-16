import type { TrackingData, TrackingItem } from './order-tracking';
import { lookupXPageTracking, pendingTracking } from './xpage-tracking';
import {
  hasCJTrackingCredentials, isCJTrackingNumber, lookupCJOrder, lookupCJOrderByTracking, lookupCJTracking, stageData,
  TrackingUnavailableError, type CJOrder,
} from './cj-tracking';

const ACCOUNT = 'biz_xa9rfJv13rrFnA';
const CJ_STORE = '2611071803233521800';
const paymentId = /^pay_[A-Za-z0-9]{10,80}$/;
const countryNames = new Intl.DisplayNames(['en-GB'], { type: 'region', fallback: 'none' });
const orderDates = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London',
});

function countryName(value?: string) {
  const trimmed = value?.trim();
  if (!trimmed || /^see carrier updates$/i.test(trimmed)) return '';
  const code = trimmed.toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? countryNames.of(code === 'UK' ? 'GB' : code) ?? '' : trimmed;
}

type WhopLine = {
  label?: string | null; product_title?: string | null;
  variant_title?: string | null; plan_title?: string | null; quantity?: number | null;
};
type WhopOrder = {
  id: string; account_id: string; status: string; created_at?: string; paid_at?: string;
  user?: { id?: string | null } | null;
  line_items?: WhopLine[];
  shipping_address?: { city?: string | null; country?: string | null } | null;
};
type WhopShipment = { account_id: string; payment_id: string; tracking_number?: string };

async function read(resource: 'payments' | 'shipments', id: string) {
  const key = process.env.WHOP_API_KEY;
  if (!key) throw new TrackingUnavailableError();
  const response = await fetch(`https://api.whop.com/api/v1/${resource}/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${key}`, 'Api-Version-Date': '2026-10-09-2' },
    cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(10000),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new TrackingUnavailableError();
  return response.json();
}

function validPayment(payment: WhopOrder | null, id: string): payment is WhopOrder {
  return !!payment && payment.id === id && payment.account_id === ACCOUNT && payment.status === 'paid';
}

function validCJOrder(order: CJOrder | null, id?: string): order is CJOrder {
  return !!order && order.shopId === CJ_STORE && (!id || order.reference === id);
}

function paymentItems(lines: WhopLine[] = []): TrackingItem[] {
  return lines.flatMap(line => {
    const description = line.variant_title?.trim() || line.plan_title?.trim() || '';
    const title = line.product_title?.trim() || line.label?.trim() || description;
    if (!title || /^tracked delivery$/i.test(title)) return [];
    const bundle = /^(\d{1,2})\s*[x×]\s*(?:X[12](?: Deal)?|Pack)\b\s*(?:[-–—]\s*)?/i.exec(description);
    const count = Number(bundle?.[1]) || 1;
    const quantity = typeof line.quantity === 'number' && Number.isInteger(line.quantity) && line.quantity > 0 ? line.quantity : 1;
    const variant = bundle ? description.slice(bundle[0].length).trim() : description;
    return [{ title, quantity: quantity * count,
      ...(!variant || variant === title || /^default$/i.test(variant) ? {} : { variant }) }];
  });
}

function orderDetails(payment: WhopOrder, order?: CJOrder | null) {
  const orderedAt = Date.parse(payment.created_at || payment.paid_at || '');
  const city = payment.shipping_address?.city?.trim() || order?.city;
  const country = countryName(payment.shipping_address?.country || order?.country);
  return {
    orderDate: Number.isFinite(orderedAt) ? orderDates.format(orderedAt) : '',
    orderRef: payment.id,
    items: paymentItems(payment.line_items),
    ...(payment.user?.id && /^user_[A-Za-z0-9]+$/.test(payment.user.id) ? { whopCustomerId: payment.user.id } : {}),
    destination: [city, country].filter(Boolean).join(', '),
  };
}

async function parcel(number: string, order: CJOrder | null, track = lookupCJTracking): Promise<TrackingData | null> {
  let carrier: TrackingData | null;
  try { carrier = await track(number); }
  catch (error) {
    if (!order) throw error;
    carrier = null;
  }

  const status = order?.status.toUpperCase();
  if (!carrier && !['UNSHIPPED', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'CANCELED'].includes(status || '')) return null;
  const result = carrier || { ...pendingTracking(''), trackingNumber: number, carrierName: order?.carrier || '' };
  const country = countryName(order?.country) || countryName(carrier?.destination);
  const destination = [order?.city, country].filter(Boolean).join(', ');
  const base: TrackingData = { ...result, trackingNumber: number, destination };
  if (status === 'CANCELLED' || status === 'CANCELED') {
    return { ...base, ...stageData('ORDER_PLACED'), status: 'Cancelled' };
  }
  if ((status === 'SHIPPED' || status === 'DELIVERED') && base.statusCode === 'PROCESSING') {
    return { ...base, ...stageData('IN_TRANSIT'), status: 'Dispatched' };
  }
  return base;
}

function mergeOrder(data: TrackingData, details: ReturnType<typeof orderDetails>): TrackingData {
  return { ...data, ...details, destination: details.destination || data.destination };
}

export async function lookupWhopTracking(
  query: string,
): Promise<TrackingData | null> {
  if (!paymentId.test(query)) return null;
  const payment: WhopOrder | null = await read('payments', query);
  if (!validPayment(payment, query)) return null;

  const [shipmentResult, orderResult] = await Promise.allSettled([
    read('shipments', query) as Promise<WhopShipment | null>,
    hasCJTrackingCredentials() || process.env.CJ_ORDER_ACCESS_TOKEN ? lookupCJOrder(query) : Promise.resolve(null),
  ]);
  const shipment = shipmentResult.status === 'fulfilled' ? shipmentResult.value : null;
  const order = orderResult.status === 'fulfilled' ? orderResult.value : null;
  if (shipment && (shipment.account_id !== ACCOUNT || shipment.payment_id !== query)) return null;
  const fulfilment = validCJOrder(order, query) ? order : null;
  const details = orderDetails(payment, fulfilment);
  const number = shipment?.tracking_number?.trim().toUpperCase() || '';
  const numbers = fulfilment?.trackingNumbers.length ? fulfilment.trackingNumbers : isCJTrackingNumber(number) ? [number] : [];
  if (!numbers.length) {
    if (shipmentResult.status === 'rejected' || orderResult.status === 'rejected') throw new TrackingUnavailableError();
    const pending = mergeOrder(pendingTracking(query), details);
    if (fulfilment?.status === 'CANCELLED' || fulfilment?.status === 'CANCELED') {
      return { ...pending, ...stageData('ORDER_PLACED'), status: 'Cancelled' };
    }
    return pending;
  }
  const shipments = await Promise.all(numbers.map(async number => {
    const data = await parcel(number, fulfilment);
    if (!data) throw new TrackingUnavailableError();
    return mergeOrder(data, details);
  }));
  return { ...shipments[0], ...(shipments.length > 1 ? { shipments } : {}) };
}

export async function lookupMirooooTracking(query: string): Promise<TrackingData | null> {
  if (paymentId.test(query)) return lookupWhopTracking(query);
  if (!isCJTrackingNumber(query)) return lookupXPageTracking(query);

  // Exact XPage matches supply order information. For carrier-only searches,
  // disclose Whop order details only for a dispatch from the verified CJ shop.
  const number = query.toUpperCase();
  const [xpage, cj] = await Promise.allSettled([
    lookupXPageTracking(query, true),
    hasCJTrackingCredentials() || process.env.CJ_ORDER_ACCESS_TOKEN ? lookupCJOrderByTracking(number) : Promise.resolve(null),
  ]);
  if (xpage.status === 'fulfilled' && xpage.value) return xpage.value;
  const candidate = cj.status === 'fulfilled' ? cj.value : null;
  const order = validCJOrder(candidate) ? candidate : null;
  const data = hasCJTrackingCredentials() || order ? await parcel(order?.trackingNumbers[0] || number, order) : null;
  if (data && order && paymentId.test(order.reference) && process.env.WHOP_API_KEY) {
    const payment: WhopOrder | null = await read('payments', order.reference).catch(() => null);
    if (validPayment(payment, order.reference)) {
      return mergeOrder(data, { ...orderDetails(payment, order), orderRef: '' });
    }
  }
  if (!data && xpage.status === 'rejected') throw new TrackingUnavailableError();
  return data;
}
