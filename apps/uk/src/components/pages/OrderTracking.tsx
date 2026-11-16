"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Package, Copy, Check, AlertCircle, ArrowRight, Clock, Truck, MapPin, Home } from 'lucide-react';
import type { TrackingData } from '@/lib/order-tracking';
import styles from './OrderTracking.module.css';

const deliverySteps = [
  { label: 'Processing', description: 'Preparing your order', icon: Package },
  { label: 'In Transit', description: 'On the way', icon: Truck },
  { label: 'Out for Delivery', description: 'With the courier', icon: MapPin },
  { label: 'Delivered', description: 'Arrived', icon: Home },
];
const deliveryStepIndex = { ORDER_PLACED: 0, PROCESSING: 0, IN_TRANSIT: 1, OUT_FOR_DELIVERY: 2, DELIVERED: 3 };

const scanDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London',
});
const wallClockDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
});
function formatDate(value: string) {
  if (!value) return '';
  const bare = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(?::\d{2})?$/.test(value);
  const date = Date.parse(value.replace(' ', 'T') + (bare ? 'Z' : ''));
  return Number.isFinite(date) ? (bare ? wallClockDate : scanDate).format(date) : value;
}

export function OrderTracking() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<TrackingData | null>(null);
  const [selectedParcel, setSelectedParcel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [copied, setCopied] = useState(false);
  const activeQuery = useRef('');
  const request = useRef<AbortController | null>(null);
  const trackingData = result?.shipments?.find(s => s.trackingNumber === selectedParcel) || result;

  const currentStep = trackingData && trackingData.status !== 'Cancelled' ? deliveryStepIndex[trackingData.statusCode] : -1;

  const clear = useCallback(() => {
    request.current?.abort();
    request.current = null;
    activeQuery.current = '';
    setQuery('');
    setResult(null);
    setSelectedParcel('');
    setError(null);
    setIsPending(false);
  }, []);

  const handleSearch = useCallback(async (searchQuery: string, refresh = false) => {
    const q = searchQuery.trim();
    if (!q) { clear(); setError('Please enter your tracking number or order reference.'); return; }
    if (refresh && request.current) return;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    if (activeQuery.current !== q) {
      setResult(null);
      setSelectedParcel('');
    }
    activeQuery.current = q;
    if (!refresh) setError(null);
    if (!refresh) setIsPending(true);
    const timeout = setTimeout(() => controller.abort(), 55000);
    try {
      const response = await fetch('/api/order-tracking', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, cache: 'no-store',
        body: JSON.stringify({ query: q }), signal: controller.signal,
      });
      const json = await response.json();
      if (request.current !== controller) return;
      if (response.ok && json.status === 'found' && json.data) { setError(null); setResult(json.data); }
      else {
        setError(json.message || 'Tracking could not be loaded. Please try again shortly.');
        setResult(old => response.status >= 500 && old ? { ...old, stale: true,
          shipments: old.shipments?.map(s => ({ ...s, stale: true })) } : null);
      }
    } catch {
      if (request.current !== controller) return;
      setError('Tracking is temporarily unavailable. Please try again shortly.');
      setResult(old => old ? { ...old, stale: true,
        shipments: old.shipments?.map(s => ({ ...s, stale: true })) } : null);
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) { request.current = null; setIsPending(false); }
    }
  }, [clear]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get('tracking') || params.get('number') || params.get('order');
    if (initial?.trim()) { setQuery(initial.trim()); void handleSearch(initial); }
    const refresh = () => {
      if (document.visibilityState === 'visible' && activeQuery.current) void handleSearch(activeQuery.current, true);
    };
    const interval = setInterval(refresh, 60000);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', refresh);
      request.current?.abort();
      request.current = null;
    };
  }, [handleSearch]);

  const copyNumber = async () => {
    if (!trackingData) return;
    try {
      await navigator.clipboard.writeText(trackingData.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { setCopied(false); }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <h1>Track your order</h1>
          <p>Enter the tracking number or order reference from your confirmation email.</p>
        </header>
        <form className={styles.search} onSubmit={event => { event.preventDefault(); void handleSearch(query); }}>
          <div className={styles.field}>
            <label className={styles.srOnly} htmlFor="tracking-query">Tracking number or order reference</label>
            <Search size={20} aria-hidden="true" />
            <input id="tracking-query" name="tracking" value={query} maxLength={100} autoComplete="off" spellCheck={false}
              onChange={event => event.target.value ? setQuery(event.target.value) : clear()}
              placeholder="Tracking number or order reference" />
            {query && <button type="button" onClick={clear} className={styles.clear}>Clear</button>}
          </div>
          <button type="submit" disabled={isPending} className={`button button--primary ${styles.action} ${styles.trackButton}`}>
            <span className="btn-fill" data-fill aria-hidden="true" />
            <span className="btn-text">{isPending ? 'Checking…' : 'Track order'}<ArrowRight size={18} aria-hidden="true" /></span>
          </button>
        </form>
        {error && <p className={styles.error} role="alert"><AlertCircle size={18} aria-hidden="true" />{error}</p>}
        {trackingData && <div className={styles.results} aria-live="polite" aria-busy={isPending}>
          {result?.shipments && <div className={styles.parcels} aria-label="Shipments in this order">
            {result.shipments.map((parcel, index) => <button key={parcel.trackingNumber} type="button"
              onClick={() => setSelectedParcel(parcel.trackingNumber)}
              aria-pressed={trackingData.trackingNumber === parcel.trackingNumber}>Parcel {index + 1}</button>)}
          </div>}
          {trackingData.stale && !error && <p className={styles.notice}>Showing the last confirmed tracking information. Please try again shortly for the latest status.</p>}
          <section className={styles.card} aria-labelledby="shipment-status">
            <div className={styles.overview}>
              <div>
                <p className={styles.eyebrow}>Delivery status</p>
                <h2 id="shipment-status">{trackingData.status}</h2>
              </div>
              <span className={styles.statusBadge}><Clock size={16} aria-hidden="true" />{trackingData.status}</span>
            </div>
            <dl className={styles.metadata}>
              <div><dt>Tracking number</dt><dd className={styles.number}>
                <span>{trackingData.trackingNumber}</span>
                {trackingData.trackingNumber !== 'Not assigned yet' && <button type="button" onClick={copyNumber}
                  aria-label={copied ? 'Tracking number copied' : 'Copy tracking number'}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>}
              </dd></div>
              {trackingData.destination && <div><dt>Destination</dt><dd>{trackingData.destination}</dd></div>}
              {trackingData.whopCustomerId && <div><dt>Customer ID</dt><dd>{trackingData.whopCustomerId}</dd></div>}
              {trackingData.orderRef && !trackingData.whopCustomerId && <div><dt>Order reference</dt><dd>{trackingData.orderRef}</dd></div>}
              {trackingData.statusCode === 'DELIVERED' && trackingData.estimatedDelivery && <div><dt>Delivered</dt><dd>{formatDate(trackingData.estimatedDelivery)}</dd></div>}
            </dl>
            <div className={styles.journey}>
              <div className={styles.journeyHeading}>
                <h3 id="delivery-journey">Delivery Journey</h3>
                <span>{trackingData.status}</span>
              </div>
              <div className={styles.journeyBar} role="progressbar" aria-labelledby="delivery-journey"
                aria-valuemin={0} aria-valuemax={100} aria-valuenow={(currentStep + 1) * 25} aria-valuetext={trackingData.status}>
                <span style={{ width: `${(currentStep + 1) * 25}%` }} />
              </div>
              <ol className={styles.journeySteps} aria-label="Delivery stages">
                {deliverySteps.map(({ label, description, icon: Icon }, index) => (
                  <li key={label} data-reached={index <= currentStep} aria-current={index === currentStep ? 'step' : undefined}>
                    <span className={styles.stepIcon}><Icon size={22} aria-hidden="true" /></span>
                    <span className={styles.stepName}>{label}</span>
                    <span className={styles.stepDescription}>{description}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
          <section className={styles.card} aria-labelledby="tracking-history">
            <div className={styles.timelineHeading}>
              <h2 id="tracking-history"><Truck size={20} aria-hidden="true" /> Shipment Timeline</h2>
              {trackingData.timeline.length > 0 && <span>Latest carrier scans</span>}
            </div>
            {trackingData.timeline.length ? <ol className={styles.timeline}>
              {trackingData.timeline.map((event, index) => (
                <li key={`${event.date}-${index}`}>
                  <span className={styles.dot} aria-hidden="true" />
                  <div className={styles.checkpoint}>
                    <div className={styles.checkpointHeading}>
                      <h3>{event.title.replace(/\borigin(?:al)? facility\b/gi, 'logistics processing hub')}</h3>
                      {event.date && <time dateTime={event.date.replace(' ', 'T')}>{formatDate(event.date)}</time>}
                    </div>
                    <p>Carrier checkpoint</p>
                  </div>
                </li>
              ))}
            </ol> : <p className={styles.notice}>{trackingData.trackingNumber === 'Not assigned yet'
              ? 'Your order is being prepared. Tracking will appear when a number is assigned.'
              : 'Your tracking number has been assigned. Delivery scans will appear once the carrier publishes them.'}</p>}
          </section>
          <div className={styles.bottomGrid}>
            <section className={styles.card} aria-labelledby="order-contents">
              <h2 id="order-contents">Order contents</h2>
              {trackingData.items.length ? (
                <ul className={styles.items}>
                  {trackingData.items.map((item, index) => (
                    <li key={`${item.title}-${item.variant || ''}-${index}`}>
                      <div><strong>{item.title}</strong>{item.variant && <span>{item.variant}</span>}</div>
                      <span className={styles.quantity}>Qty {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : <p className={styles.notice}>See your order confirmation for item details.</p>}
            </section>
            <section className={styles.card} aria-labelledby="tracking-help">
              <h2 id="tracking-help">Need a hand?</h2>
              <p className={styles.notice}>Our team can help with your order or delivery. Include your tracking number when you get in touch.</p>
              <div className={styles.support}>
                <a className={`button button--primary ${styles.action}`} href="mailto:support@trymiroooo.com">
                  <span className="btn-fill" data-fill aria-hidden="true" />
                  <span className="btn-text">Contact support</span>
                </a>
                <Link className={styles.faqLink} href="/pages/faqs">Delivery FAQs<ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            </section>
          </div>
        </div>}
      </div>
    </main>
  );
}
