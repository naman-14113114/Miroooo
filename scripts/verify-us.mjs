import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import process from 'node:process';
import { createHash } from 'node:crypto';

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
  'page', 'shop/page', 'all-products/page', 'cart/page',
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
for (const route of routes) check(existsSync(join(root, 'apps/us/src/app', `${route}.tsx`)), `US TSX route: /${route.replace(/\/page$/, '')}`);
const ukFiles = walk(join(root, 'apps/us/src'));
const ukSource = ukFiles.filter((path) => /\.(?:tsx?|css)$/.test(path));
check(!ukFiles.some((path) => path.endsWith('.html')), 'US pages remain React/TypeScript routes');
const publicRoot = join(root, 'apps/us/public');
for (const file of ukSource) {
  const content = readFileSync(file, 'utf8');
  for (const match of content.matchAll(/["'](\/(?:assets_ref|assets|gallery_orig)\/[^"'?#]+\.(?:avif|gif|jpe?g|mp4|png|svg|webm|webp))["']/gi)) {
    const target = join(publicRoot, match[1].slice(1));
    check(existsSync(target) && statSync(target).size > 0, `US asset: ${relative(root, file)} -> ${match[1]}`);
  }
}
const products = read('apps/us/src/data/products.ts');
const cart = read('apps/us/src/lib/cart.ts');
for (const value of ["price: 91.15", "compareAt: 129.88", "compareAt: 184.23", "price: 169.10", "price: 234.07", "price: 10.0", "freeHeadsCount: 2"]) {
  check(products.includes(value), `Current USD offer value: ${value}`);
}
for (const value of ['normalizeCartItems', 'cents(tier.promoPrice)', 'x1Count * cents(x1.price)', 'x2Count * cents(x2.price)']) {
  check(cart.includes(value), `Canonical cart rule: ${value}`);
}
const checkout = read('apps/us/src/app/api/checkout/prepare/route.ts');
const checkoutAdapter = read('apps/us/src/lib/checkout.ts');
check(checkout.includes('prepareUSCheckout') && checkoutAdapter.includes('assertCheckoutOrderQuote'), 'US checkout compares the generated live USD order');
for (const clip of ['V5', 'miroooo-8', 'V4', 'miroooo-6', 'miroooo-5', 'V2']) {
  const poster = join(publicRoot, 'assets_ref/x/reels', `${clip}-poster.webp`);
  check(existsSync(poster) && statSync(poster).size > 0, `US reel poster: ${clip}`);
}
check(checkout.includes('PRICE_MISMATCH'), 'US checkout reports price mismatch');
check(read('apps/us/src/context/CartContext.tsx').includes('setCheckoutError'), 'US cart displays checkout failures');
check(read('apps/us/src/styles/globals.css').includes('@import "tailwindcss"'), 'US Tailwind stylesheet configured');
check(existsSync(join(root, 'apps/us/postcss.config.mjs')), 'US PostCSS configured');

// The approved UK media is already optimized without reducing quality. Require
// exact copies so a future US sync cannot accidentally restore the older files.
const ukPublic = join(root, 'apps/uk/public');
for (const file of walk(ukPublic).filter((path) => /\.(mp4|webm|webp|png|jpe?g|gif|svg|woff2)$/i.test(path))) {
  const destination = join(publicRoot, relative(ukPublic, file));
  const hash = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
  check(existsSync(destination) && hash(file) === hash(destination), `Exact UK media parity: ${relative(ukPublic, file)}`);
}

if (failures.length) {
  console.error(`US verification failed (${failures.length}/${checks}):`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}
console.log(`US verification passed: ${checks} checks.`);
