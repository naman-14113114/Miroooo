import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];
const checks = [];
const requireCheck = (condition, message) => {
  checks.push(message);
  if (!condition) failures.push(message);
};
const read = (path) => readFileSync(join(root, path), "utf8");

const routeFiles = [
  "apps/uk/src/app/page.tsx",
  "apps/uk/src/app/shop/page.tsx",
  "apps/uk/src/app/products/miroooo-x/page.tsx",
  "apps/uk/src/app/products/miroooo-x2/page.tsx",
  "apps/uk/src/app/about/page.tsx",
  "apps/uk/src/app/faq/page.tsx",
  "apps/uk/src/app/contact/page.tsx",
  "apps/uk/src/app/delivery-returns/page.tsx",
  "apps/uk/src/app/warranty/page.tsx",
  "apps/uk/src/app/order-tracking/page.tsx",
  "apps/uk/src/app/privacy/page.tsx",
  "apps/uk/src/app/terms/page.tsx",
  "apps/uk/src/app/404/page.tsx",
  "apps/uk/src/app/not-found.tsx",
];
for (const route of routeFiles) requireCheck(existsSync(join(root, route)), `required route module: ${route}`);

const packageJson = JSON.parse(read("package.json"));
const appPackage = JSON.parse(read("apps/uk/package.json"));
requireCheck(packageJson.packageManager === "pnpm@11.1.1", "pnpm is pinned to 11.1.1");
requireCheck(packageJson.devDependencies.turbo === "2.8.6", "Turbo is pinned to 2.8.6");
requireCheck(appPackage.dependencies.next === "16.2.6", "Next.js is pinned to 16.2.6");
requireCheck(appPackage.dependencies.react === "19.2.4", "React is pinned to 19.2.4");


const productSource = read("packages/shared/src/products.ts");
for (const value of [
  "1000000664011633", "1000020348812113", "1000020348812111", "1000020348812112", "miroooo",
  "1000000664011618", "1000020348810048", "1000020348810062", "1000020348810046", "miroooo-x2",
  "defaultQuantity: 2",
]) requireCheck(productSource.includes(value), `locked product value: ${value}`);

const reviews = read("packages/shared/src/reviews.ts");
requireCheck((reviews.match(/"productId": "miroooo-x"/g) ?? []).length === 4275, "Miroooo X has 4,275 typed reviews");
requireCheck((reviews.match(/"productId": "miroooo-x2"/g) ?? []).length === 4275, "Miroooo X2 has 4,275 typed reviews");
requireCheck(reviews.includes('"total": 4275'), "review summaries retain total 4,275");
const x2Start = reviews.indexOf("export const mirooooX2Reviews = [");
const archives = [reviews.slice(0, x2Start), reviews.slice(x2Start)];
const distributions = [
  { 1: 21, 2: 22, 3: 43, 4: 256, 5: 3933 },
  { 1: 22, 2: 21, 3: 43, 4: 256, 5: 3933 },
];
archives.forEach((archive, productIndex) => {
  Object.entries(distributions[productIndex]).forEach(([rating, count]) => {
    requireCheck((archive.match(new RegExp(`"rating": ${rating},`, "g")) ?? []).length === count, `product ${productIndex + 1} retains ${count} ${rating}-star reviews`);
  });
});

const sitemap = read("apps/uk/src/app/sitemap.ts");
const sitemapRoutes = sitemap.match(/^\s+\["\//gm) ?? [];
requireCheck(sitemapRoutes.length === 12, "sitemap contains exactly 12 storefront URLs");
for (const staticFile of ["robots.txt", "llms.txt", "site.webmanifest", "favicon.svg"]) {
  requireCheck(existsSync(join(root, "apps/uk/public", staticFile)), `public metadata asset: ${staticFile}`);
}

for (const font of ["inter-400.woff2", "inter-400-italic.woff2", "inter-500.woff2", "inter-600.woff2", "inter-700.woff2", "inter-700-italic.woff2", "inter-800.woff2", "gfs-didot-400-latin.woff2"]) {
  const path = join(root, "apps/uk/src/assets/fonts", font);
  requireCheck(existsSync(path) && statSync(path).size > 0, `vendored font: ${font}`);
}

function filesBelow(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  });
}

const mediaRoot = join(root, "apps/uk/public/media/products");
const media = filesBelow(mediaRoot);
requireCheck(media.length === 93, "complete product media library contains 93 local files");
for (const path of media) requireCheck(statSync(path).size > 0, `non-empty media: ${relative(root, path)}`);
const mediaNames = new Set(media.map((path) => path.split(/[\\/]/).at(-1)));
const referencedMediaNames = new Set(productSource.match(/[A-Za-z0-9][A-Za-z0-9._-]+\.(?:avif|gif|jpe?g|mp4|png|webm|webp)\b/gi) ?? []);
for (const name of referencedMediaNames) requireCheck(mediaNames.has(name), `product dataset media exists: ${name}`);

const sourceRoots = [join(root, "apps/uk/src"), join(root, "packages/shared/src"), join(root, "packages/ui/src")];
const sourceFiles = sourceRoots.flatMap(filesBelow).filter((path) => /\.(?:ts|tsx|css)$/.test(path));
const combined = sourceFiles.map((path) => readFileSync(path, "utf8")).join("\n");
const sourceMediaPaths = combined.match(/\/media\/products\/[A-Za-z0-9._/-]+\.(?:avif|gif|jpe?g|mp4|png|webm|webp)\b/gi) ?? [];
const sourceMediaNames = new Set(sourceMediaPaths.map((path) => path.split("/").at(-1)));
for (const name of sourceMediaNames) requireCheck(mediaNames.has(name), `source media reference exists: ${name}`);
for (const forbidden of ["cdn.shopify.com", "shopifycdn.com", "miroshine.com", "beeketing.net", "miroooo-us.vercel.app", "fonts.googleapis.com", "fonts.gstatic.com", "<product-info", "<media-gallery", "is=\"accordion-details\""]) {
  requireCheck(!combined.includes(forbidden), `no legacy/runtime source reference: ${forbidden}`);
}
requireCheck(!/@import\s+url\(https?:/i.test(combined), "no runtime remote CSS imports");
requireCheck(!/(?:src|poster)=\{?["']https?:/i.test(combined), "no runtime remote image or video sources");
requireCheck(!/letter-spacing:\s*-/i.test(combined), "CSS contains no negative letter spacing");
requireCheck(!/gradient\(/i.test(combined), "CSS contains no gradients");
requireCheck(combined.includes("buildBuudyCheckoutUrl"), "checkout URL builder is used by the product UI");

const nextConfig = read("apps/uk/next.config.ts");
for (const route of ["/miroooo-x", "/miroooo-x2", "/policies/shipping-policy", "/policies/refund-policy", "/policies/privacy-policy", "/policies/terms-of-service"]) {
  requireCheck(nextConfig.includes(route), `redirect or rewrite preserved: ${route}`);
}
for (const header of ["X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy", "immutable"]) {
  requireCheck(nextConfig.includes(header), `header policy preserved: ${header}`);
}

if (failures.length) {
  console.error(`Repository verification failed (${failures.length}/${checks.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Repository verification passed: ${checks.length} checks.`);
