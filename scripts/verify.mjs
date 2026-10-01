import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import process from 'node:process';

const root = process.cwd();
const failures = [];
let checks = 0;
const check = (condition, message) => { checks++; if (!condition) failures.push(message); };
const read = (path) => readFileSync(join(root, path), 'utf8');
const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});

const routes = [
  'page', 'shop/page', 'cart/page',
  'products/miroooo-x/page', 'products/miroooo-x2/page',
  'products/miroooo-x1-heads/page', 'products/miroooo-x2-heads/page',
  'pages/about-us/page', 'pages/contact-us/page', 'pages/faqs/page',
  'pages/dentalcare-quiz/page', 'pages/smile-coach/page', 'pages/order-tracking/page',
  'policies/privacy-policy/page', 'policies/return-policy/page',
  'policies/refund-policy/page', 'policies/shipping-policy/page',
  'policies/terms-of-service/page', 'policies/cookies-policy/page',
  'policies/delivery-returns/page', 'policies/warranty/page',
  'guides/page',
];
for (const route of routes) check(existsSync(join(root, 'apps/uk/src/app', `${route}.tsx`)), `UK TSX route: /${route.replace(/\/page$/, '')}`);
const ukFiles = walk(join(root, 'apps/uk/src'));
const ukSource = ukFiles.filter((path) => /\.(?:tsx?|css)$/.test(path));
check(!ukFiles.some((path) => path.endsWith('.html')), 'UK pages remain React/TypeScript routes');
const publicRoot = join(root, 'apps/uk/public');
for (const file of ukSource) {
  const content = readFileSync(file, 'utf8');
  for (const match of content.matchAll(/["'](\/(?:assets_ref|assets|gallery_orig)\/[^"'?#]+\.(?:avif|gif|jpe?g|mp4|png|svg|webm|webp))["']/gi)) {
    const target = join(publicRoot, match[1].slice(1));
    check(existsSync(target) && statSync(target).size > 0, `UK asset: ${relative(root, file)} -> ${match[1]}`);
  }
}
const products = read('apps/uk/src/data/products.ts');
const cart = read('apps/uk/src/lib/cart.ts');
for (const value of ["price: 69.0", "compareAt: 139.0", "price: 128.0", "price: 177.0", "freeHeadsCount: 2"]) {
  check(products.includes(value), `Current GBP offer value: ${value}`);
}
for (const value of ['normalizeCartItems', 'Math.round(brushSubtotal * 0.1)', 'x1Count * 69', 'x2Count * 69']) {
  check(cart.includes(value), `Canonical cart rule: ${value}`);
}
const checkout = read('apps/uk/src/app/api/checkout/prepare/route.ts');
const checkoutAdapter = read('apps/uk/src/lib/checkout.ts');
check(checkout.includes('prepareUKCheckout') && checkoutAdapter.includes('assertCheckoutOrderQuote'), 'UK checkout compares the generated live GBP order');
for (const clip of ['V5', 'miroooo-8', 'V4', 'miroooo-6', 'miroooo-5', 'V2']) {
  const poster = join(publicRoot, 'assets_ref/x/reels', `${clip}-poster.webp`);
  check(existsSync(poster) && statSync(poster).size > 0, `UK reel poster: ${clip}`);
}
check(checkout.includes('PRICE_MISMATCH'), 'UK checkout reports price mismatch');
check(read('apps/uk/src/context/CartContext.tsx').includes('setCheckoutError'), 'UK cart displays checkout failures');
check(read('apps/uk/src/styles/globals.css').includes('@import "tailwindcss"'), 'UK Tailwind stylesheet configured');
check(existsSync(join(root, 'apps/uk/postcss.config.mjs')), 'UK PostCSS configured');

if (failures.length) {
  console.error(`UK verification failed (${failures.length}/${checks}):`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}
console.log(`UK verification passed: ${checks} checks.`);
