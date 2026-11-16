import assert from 'node:assert/strict';
import { test, mock } from 'node:test';
import { NextRequest } from 'next/server';
import { GET, POST } from '../src/app/api/order-tracking/route';

const url = 'http://localhost/api/order-tracking';

test('tracking returns exact XPage order details and CJ scans without customer contact data', async () => {
  const previous = { token: process.env.XPAGE_USER_TOKEN, key: process.env.CJ_API_KEY };
  process.env.XPAGE_USER_TOKEN = 'fixture-session';
  process.env.CJ_API_KEY = 'fixture-key';
  const trackingNumber = 'ZHPHD0123456789';
  const fetch = mock.method(globalThis, 'fetch', async (input: string | URL) => {
    const path = new URL(input);
    if (path.hostname === 'api.myxpage.shop') {
      return Response.json({ orders: [{
        id: 'd936cb66-9b4b-4df6-b157-6593ac8d7688', ref: '#3210', status: 'PAID',
        customer_city: 'London', customer_country: { name: 'United Kingdom' },
        customer_name: 'Private name', customer_address: 'Private street',
        variants: [{ title: 'Miroooo X2', quantity: 1, options: 'Pink' }],
        deliveries: [{ tracking_number: trackingNumber }],
      }], paginator: { lastPage: 1 } });
    }
    if (path.pathname.endsWith('/getAccessToken')) {
      return Response.json({ result: true, data: {
        accessToken: 'fixture-carrier-token', accessTokenExpiryDate: new Date(Date.now() + 3600000).toISOString(),
      } });
    }
    if (path.pathname.endsWith('/trackInfo')) {
      assert.equal(path.searchParams.get('trackNumber'), trackingNumber);
      return Response.json({ result: true, data: [{
        trackingNumber,
        routes: [{ acceptTime: '2026-11-15 12:50:05', remark: 'Parcel is out for delivery', acceptAddress: 'Private checkpoint address' }],
      }] });
    }
    throw new Error('Unexpected request in tracking fixture');
  });
  try {
    const response = await POST(new NextRequest(url, { method: 'POST', body: JSON.stringify({ orderNumber: '#3210' }) }));
    assert.equal(response.status, 200);
    assert.match(response.headers.get('cache-control') || '', /private.*no-store/);
    const body = await response.json();
    assert.equal(body.data.statusCode, 'OUT_FOR_DELIVERY');
    assert.equal(body.data.destination, 'London, United Kingdom');
    assert.deepEqual(body.data.items, [{ title: 'Miroooo X2', quantity: 1, variant: 'Pink' }]);
    assert.equal(body.data.timeline.length, 1);
    assert.ok(!JSON.stringify(body).includes('Private'));

    const unmatched = await GET(new NextRequest(url + '?order=3200'));
    assert.equal(unmatched.status, 404);
    const invalid = await GET(new NextRequest(url + '?tracking=first.last%40example.com'));
    assert.equal(invalid.status, 400);
    assert.equal(fetch.mock.calls.length, 5);
  } finally {
    fetch.mock.restore();
    if (previous.token === undefined) delete process.env.XPAGE_USER_TOKEN;
    else process.env.XPAGE_USER_TOKEN = previous.token;
    if (previous.key === undefined) delete process.env.CJ_API_KEY;
    else process.env.CJ_API_KEY = previous.key;
  }
});
