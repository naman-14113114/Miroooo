import type { TrackingData, TrackingStage, TimelineEvent } from './order-tracking';

export class TrackingUnavailableError extends Error {
  constructor() { super('Carrier updates could not be refreshed. Please try again shortly.'); }
}
type RecordData = {
  trackingNumber?: string; lastTrackNumber?: string; trackingStatus?: string;
  lastMileCarrier?: string; trackingTo?: string;
  routes?: { acceptTime: string; remark: string }[];
};
type Snapshot = { record: RecordData; checkedAt: number };
type TrackingAssociation = { trackNumber?: string; currentTrackNumber?: string; orderId?: string };
type RawCJOrder = {
  orderId?: string; orderNum?: string; shopId?: string; orderStatus?: string;
  trackNumber?: string; shippingCity?: string; shippingCountryCode?: string; logisticName?: string;
};
export type CJOrder = {
  orderId: string; reference: string; shopId: string; status: string;
  trackingNumbers: string[]; city?: string; country?: string; carrier?: string;
};
const snapshots = new Map<string, Snapshot>();
const FRESH_MS = 60000;
const RETAIN_MS = 30 * 86400000;
let token: { value: string; expires: number } | undefined;
let initialRejected = false;
let nextRequest = 0;

async function json(url: string, options: RequestInit = {}) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const delay = Math.max(0, nextRequest - Date.now());
    if (delay > 10000) throw new TrackingUnavailableError();
    nextRequest = Date.now() + delay + 1100;
    if (delay) await new Promise(resolve => setTimeout(resolve, delay));
    try {
      const response = await fetch(url, { ...options, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(12000) });
      if (response.status === 401) return { result: false, code: 401, message: 'Token expired or unauthorized' };
      if (response.ok) return await response.json();
      if (response.status === 400) return await response.json();
      if (response.status < 500 && response.status !== 429) throw new TrackingUnavailableError();
    } catch (error) {
      if (error instanceof TrackingUnavailableError || attempt === 1) throw new TrackingUnavailableError();
    }
  }
  throw new TrackingUnavailableError();
}
async function accessToken(force = false): Promise<string> {
  const initial = process.env.CJ_ACCESS_TOKEN;
  const expiry = Date.parse(process.env.CJ_ACCESS_TOKEN_EXPIRES || '');
  if (force) initialRejected = true;
  if (!force && token && token.expires > Date.now() + 60000) return token.value;
  if (!force && !initialRejected && initial && expiry > Date.now() + 60000) return initial;
  if (!process.env.CJ_API_KEY) throw new TrackingUnavailableError();
  const auth = await json('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: process.env.CJ_API_KEY }),
  });
  const expires = Date.parse(auth.data?.accessTokenExpiryDate);
  if (!auth.result || !auth.data?.accessToken || !Number.isFinite(expires)) throw new TrackingUnavailableError();
  token = { value: auth.data.accessToken, expires };
  return token.value;
}
async function cjRequest(path: string, body?: unknown, allowMissing = false): Promise<unknown> {
  // Store orders need the account's order-reading credential. An API-store key
  // can return an empty list for orders imported through the Whop connection.
  const orderToken = /^(shopping\/order\/|logistic\/getOrderTrackHistory)/.test(path)
    ? process.env.CJ_ORDER_ACCESS_TOKEN : undefined;
  let auth = orderToken || await accessToken();
  const call = () => json('https://developers.cjdropshipping.com/api2.0/v1/' + path, {
    method: body ? 'POST' : 'GET',
    headers: { 'CJ-Access-Token': auth, 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  let result = await call();
  if (!result.result && /token|unauthoriz|expired|401/i.test(String(result.message) + String(result.code))) {
    if (orderToken) throw new TrackingUnavailableError();
    auth = await accessToken(true);
    result = await call();
  }
  if (allowMissing && ((String(result.code) === '1600300' && /^order not found$/i.test(result.message || '')) || result.result && result.data == null)) return null;
  if (!result.result) throw new TrackingUnavailableError();
  return result.data;
}
export function hasCJTrackingCredentials() {
  return Boolean(process.env.CJ_API_KEY || process.env.CJ_ACCESS_TOKEN);
}

export const isCJTrackingNumber = (value: string) => /^(?=.*\d)[A-Z0-9-]{8,60}$/i.test(value) &&
  !/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(value);

async function trackingAssociation(number: string): Promise<TrackingAssociation | null> {
  const data = await cjRequest('logistic/getOrderTrackHistory', { trackNumbers: [number] });
  if (!Array.isArray(data)) throw new TrackingUnavailableError();
  const matched = data.filter((row: TrackingAssociation) => row.trackNumber?.toUpperCase() === number);
  return matched.length === 1 ? matched[0] : null;
}

const orderSnapshots = new Map<string, { order: CJOrder | null; expires: number }>();
const orderRequests = new Map<string, Promise<CJOrder | null>>();
function cachedOrder(key: string, load: () => Promise<CJOrder | null>) {
  const snapshot = orderSnapshots.get(key);
  if (snapshot && snapshot.expires > Date.now()) return Promise.resolve(snapshot.order);
  const inProgress = orderRequests.get(key);
  if (inProgress) return inProgress;
  const pending = load().then(order => {
    if (orderSnapshots.size >= 500) orderSnapshots.delete(orderSnapshots.keys().next().value!);
    orderSnapshots.set(key, { order, expires: Date.now() + FRESH_MS });
    return order;
  }).finally(() => orderRequests.delete(key));
  orderRequests.set(key, pending);
  return pending;
}

export function lookupCJOrder(reference: string): Promise<CJOrder | null> {
  return cachedOrder('order:' + reference, async () => {
    const raw = await cjRequest('shopping/order/getOrderDetail?orderId=' + encodeURIComponent(reference), undefined, true) as RawCJOrder | null;
    if (!raw || !raw.orderId || !raw.orderNum || (raw.orderId !== reference && raw.orderNum !== reference)) return null;
    return {
      orderId: raw.orderId, reference: raw.orderNum, shopId: raw.shopId || '', status: raw.orderStatus || '',
      city: raw.shippingCity?.trim(), country: raw.shippingCountryCode?.trim(), carrier: raw.logisticName?.trim(),
      trackingNumbers: [...new Set((raw.trackNumber || '').toUpperCase().split(/[\s,;]+/).filter(isCJTrackingNumber))],
    };
  });
}

export function lookupCJOrderByTracking(number: string): Promise<CJOrder | null> {
  number = number.trim().toUpperCase();
  if (!isCJTrackingNumber(number)) return Promise.resolve(null);
  return cachedOrder('barcode:' + number, async () => {
    const related = await trackingAssociation(number);
    if (!related?.orderId) return null;
    const order = await lookupCJOrder(related.orderId);
    const current = related.currentTrackNumber?.toUpperCase() || number;
    if (!order?.trackingNumbers.includes(current)) return null;
    return { ...order, trackingNumbers: [current, ...order.trackingNumbers.filter(n => n !== current)] };
  });
}

async function fetchRecord(number: string, replaced = false): Promise<RecordData | null> {
  const records = await cjRequest('logistic/trackInfo?trackNumber=' + encodeURIComponent(number));
  if (!Array.isArray(records)) throw new TrackingUnavailableError();
  const exact = records.filter((r: RecordData) => [r.trackingNumber, r.lastTrackNumber].some(n => n?.toUpperCase() === number));
  const record = exact.length === 1 ? exact[0] : null;
  if (record) return record;
  if (!replaced && /^ZHPHD/i.test(number)) {
    const related = await trackingAssociation(number);
    const current = related?.currentTrackNumber?.toUpperCase();
    if (current && current !== number && isCJTrackingNumber(current)) return fetchRecord(current, true);
  }
  return null;
}
export function carrierEvents(record: RecordData, now = Date.now()) {
  const events: (TimelineEvent & { timestamp: number })[] = [];
  for (const route of record.routes || []) {
    if (!route.remark?.trim() || typeof route.acceptTime !== 'string') continue;
    const timestamp = parseCarrierTimestamp(route.acceptTime);
    const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(route.acceptTime);
    if (timestamp === null || timestamp > now + (hasZone ? 0 : 14 * 3600000)) continue;
    events.push({ title: route.remark.trim(), description: '', date: route.acceptTime,
      completed: true, stage: classifyTrackingEvent(route.remark), timestamp });
  }
  const seen = new Set<string>();
  return events.sort((a,b) => b.timestamp-a.timestamp).filter(event => {
    const key = event.timestamp + ':' + event.title;
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
}
export function stageData(stage: TrackingStage) {
  const states = {
    ORDER_PLACED: ['Processing',0], PROCESSING: ['Processing',1], IN_TRANSIT: ['In Transit',2],
    OUT_FOR_DELIVERY: ['Out for Delivery',3], DELIVERED: ['Delivered',4],
  } as const;
  return { status: states[stage][0], statusCode: stage, activeStepIndex: states[stage][1], progressPercentage: states[stage][1] * 25 };
}
export async function lookupCJTracking(query: string): Promise<TrackingData | null> {
  const number = query.trim().toUpperCase();
  if (!isCJTrackingNumber(number)) return null;
  let previous = snapshots.get(number);
  if (previous && Date.now() - previous.checkedAt > RETAIN_MS) previous = undefined;
  let record = previous?.record;
  let checkedAt = previous?.checkedAt || Date.now();
  let stale = false;
  if (!previous || Date.now() - previous.checkedAt > FRESH_MS) {
    try {
      const fresh = await fetchRecord(number);
      if (fresh) {
        const events = carrierEvents(fresh);
        const old = record ? carrierEvents(record) : [];
        if (!record || (!events.length && !old.length && !fresh.routes?.length) || (events.length && (!old.length || events[0].timestamp >= old[0].timestamp))) {
          record = fresh; checkedAt = Date.now();
          const snapshot = { record, checkedAt };
          snapshots.set(number, snapshot);
          if (snapshots.size > 1000) snapshots.delete(snapshots.keys().next().value!);
        } else stale = true;
      } else if (record) stale = true;
      else return null;
    } catch (error) {
      if (!record) throw error;
      stale = true;
    }
  }
  if (!record) return null;
  const events = carrierEvents(record);
  const latest = events.at(0);
  let stage = latest?.stage;
  const summary = record.trackingStatus || '';
  if (!stage && !record.routes?.length && /delivered|transit|delivery|courier|facility|shipped|label|processing/i.test(summary)) {
    stage = classifyTrackingEvent(summary);
  }
  if (!stage) throw new TrackingUnavailableError();
  const carrierNumber = record.lastTrackNumber || record.trackingNumber || number;
  const royalMail = /royal\s*mail/i.test(record.lastMileCarrier || '') || /^[A-Z]{2}\d{9}GB$/.test(carrierNumber);
  return {
    found: true, orderRef: '', trackingNumber: number,
    carrierName: royalMail ? 'Royal Mail' : record.lastMileCarrier || 'Carrier',
    carrierTrackingUrl: royalMail ? 'https://www.royalmail.com/track-your-item#/tracking-results/' + encodeURIComponent(carrierNumber)
      : 'https://www.cjpacket.com/?trackingNumber=' + encodeURIComponent(number),
    destination: record.trackingTo || 'See carrier updates', orderDate: '', items: [],
    ...stageData(stage), estimatedDelivery: latest?.stage === 'DELIVERED' ? latest.date : '',
    ...(/\b(failed|unsuccessful|unable to deliver|delivery attempt(?:ed)?|attempted delivery|returned|return to sender|cancelled|exception)\b/i.test(latest?.title || summary)
      ? {status: 'Delivery issue' as const} : {}),
    timeline: events.map(({ timestamp, ...event }) => event),
    checkedAt: new Date(checkedAt).toISOString(), stale,
  };
}

export function isExplicitCustomerDelivery(text: string): boolean {
  const t = text.trim().toLowerCase();
  if (/\b(undelivered|not delivered|not yet delivered|unsuccessful|failed|attempted|attempt|unable|pending|scheduled|expected|estimated|tomorrow|soon|will be|to be|out for delivery|returned|return to sender)\b/.test(t)) return false;
  if (/\b(delivered|handed|passed)\b.*\b(carrier|courier|partner|company|sender|depot|hub|facility|warehouse|airport|airline|sorting|distribution|delivery office|delivery unit|post office|service centre|service center|service point|collection point|pickup point|pick up point|parcelshop|locker|agent)\b/.test(t)) return false;
  return /^(?:delivered|delivery completed|delivery successful)\b/.test(t) ||
    /\b(?:successfully delivered|(?:item|package|parcel|shipment)(?: has been| was| is)? delivered|signed for by|delivered to (?:the )?(?:recipient|customer|addressee|neighbour|neighbor|safe place|front door|porch|letterbox|mailbox|reception))\b/.test(t);
}

export function classifyTrackingEvent(text: string): TrackingStage {
  const t = text.trim().toLowerCase();
  if (isExplicitCustomerDelivery(t)) return "DELIVERED";
  const pendingOrFailed = /\b(pending|not|not yet|failed|unsuccessful|attempt|attempted|unable|scheduled|expected|estimated|tomorrow|will be|awaiting|returned|return to sender|cancelled)\b/.test(t);
  if (!pendingOrFailed && /\b(out for delivery|on (?:the )?vehicle for delivery|with (?:your |the )?(?:delivery )?driver|with one of our drivers for delivery|with (?:the )?courier for delivery|loaded onto (?:the |a )?(?:courier |delivery )?van)\b/.test(t)) return "OUT_FOR_DELIVERY";
  if (/^(?:processing|pending|unshipped)$/i.test(t) || /\b(order (?:created|placed|confirmed)|label (?:created|generated)|(?:shipment |electronic |shipping )?information received|pre[ -]?advice|awaiting (?:your |the )?(?:item|parcel|shipment)|expecting (?:your |the )?(?:item|parcel)|ready for outbound|packed|packaged|warehouse is processing)\b/.test(t)) return "PROCESSING";
  return "IN_TRANSIT";
}



// Bare timestamps are carrier wall-clock times, not server-local or UK times.
// Keep them as supplied; explicit offsets/epoch timestamps are used when present.
export function parseCarrierTimestamp(value: string): number | null {
  const m = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?(\.\d+)?(Z|[+-]\d{2}:?\d{2})?$/i);
  if (!m) return null;
  const [, year, month, day, hour, minute, second = "0"] = m;
  const timestamp = Date.UTC(+year, +month - 1, +day, +hour, +minute, +second);
  const d = new Date(timestamp);
  if (d.getUTCFullYear() !== +year || d.getUTCMonth() !== +month - 1 || d.getUTCDate() !== +day || +hour > 23 || +minute > 59 || +second > 59) return null;
  const result = m[8] ? Date.parse(value.replace(" ", "T")) : timestamp;
  return Number.isFinite(result) ? result : null;
}


