# Miroooo Storefront Context

This file is an append-only historical record for `E:\1st YEAR DTU\New folder\miroooo`. Read it in full before future work and preserve all prior entries.

## 2026-08-17 11:38:59 +05:30 - New Miroooo Next.js/Turborepo storefront implemented locally

- Repository/workspace: `E:\1st YEAR DTU\New folder\miroooo`, intended public domain `https://miroooo.co`. This directory was intentionally created without Git, so branch, HEAD, upstream, remotes, ahead/behind, staged, unstaged, and untracked states are not applicable. `Test-Path .git` was false at completion.
- Source/reference repository: `E:\1st YEAR DTU\New folder\gobrush-product-page`, branch `main`, HEAD `fd11c666d70e1467c6b54b8a18278d90babf5e5c`, upstream `origin/main`, aligned `0/0`. The user supplied `a2cae088b7a33294a4ee674c1a2c53ce6b0d26ad` as the latest known commit and explicitly requested a pull. A clean `git pull --ff-only` advanced through that commit to the actual then-current remote HEAD `fd11c66`. The source worktree remained untouched except for its already-untracked `CONTEXT.md`, which was preserved exactly.
- User request and practical meaning: implement the approved Miroooo Storefront Monorepo Refactor in a new sibling project; use the live deployment as the observable visual/interaction authority and source commit content/assets where implementation details were inaccessible; self-host runtime assets/fonts; preserve routes, checkout behavior, attribution, reviews, metadata, redirects, policies, headers, and responsive interactions; verify locally; do not initialize Git or publish anything.
- Protected areas: no code/content/asset edit was allowed in `gobrush-product-page`; no source Git cleanup; no cart route or checkout backend; no analytics SDK/pixel; no external contact/tracking service; no Git initialization, commit, push, branch, pull request, GitHub repository, Vercel link, deployment, domain change, production promotion, payment, or order.

### Source and baseline inspected

- Read workspace `AGENTS.md`, complete workspace `CONTEXT.md`, source `CONTEXT.md`, source docs `README.md`, `PRODUCT.md`, `DESIGN.md`, `DESIGN.json`, Vercel config, static routes, product HTML/CSS/JS, review generators, media libraries, checkout logic, attribution handling, metadata, robots, sitemap, manifest, and verifier behavior.
- Frozen live baseline: `C:\Users\sahil\.codex\visualizations\2026\08\17\miroooo-live-baseline-fd11c66`. It contains screenshots for all 13 routes at `1440x1000`, `820x1180`, and `390x844`, plus `asset-hashes.json`. The live header/assets were recorded because observable deployment state differed from older commits.
- Required storefront routes implemented and inspected: `/`, `/shop`, `/products/miroooo-x`, `/products/miroooo-x2`, `/about`, `/faq`, `/contact`, `/delivery-returns`, `/warranty`, `/order-tracking`, `/privacy`, `/terms`, `/404`, and `not-found.tsx`. Internal dynamic route: `/api/reviews/[productId]`. Generated route: `/sitemap.xml`.

### Files and architecture created

- Root workspace files: `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `turbo.json`, `.gitignore`, `README.md`, `PRODUCT.md`, `DESIGN.md`, `DESIGN.json`, `docs/MIGRATION.md`, and `scripts/verify.mjs`.
- Workspace packages/apps: `apps/uk`, `packages/ui`, `packages/shared`, `packages/eslint-config`, and `packages/tsconfig`.
- Versions: pnpm `11.1.1`, Turbo `2.8.6`, TypeScript 5, Next.js `16.2.6`, React/React DOM `19.2.4`.
- Next App Router route pages remain Server Components. Focused Client Components own the site header/drawer, magnetic behavior, attribution/cart state, cookie choice, product gallery/bundles/lightbox/sticky purchase bar, reviews/filtering/modal, FAQ interactions, and order-tracking guidance.
- Vanilla CSS only. Local font files are used through Next local font loading; there are no runtime Google Fonts requests.
- `@miroooo/shared` exports typed `ProductId`, `ProductVariant`, `ProductMedia`, `BundleTier`, `Gift`, `ProductPageContent`, `Review`, `ReviewSummary`, and `AttributionKey` models plus checkout/attribution helpers and product/review datasets.
- `@miroooo/ui` contains only genuinely reusable controls/layout primitives (`ArrowLink`, `IconButton`, `VisuallyHidden`). Product-specific composition remains in `apps/uk`.

### Product and checkout implementation

- Miroooo X checkout product ID `1000000664011633`; Grey variant `1000020348812113`, Pink `1000020348812111`, Silver `1000020348812112`; source `miroooo`.
- Miroooo X2 checkout product ID `1000000664011618`; Grey variant `1000020348810048`, Pink `1000020348810062`, Silver `1000020348810046`; source `miroooo-x2`.
- `buildBuudyCheckoutUrl()` targets `https://buudy.com/pages/add-to-cart`, defaults to Buy 2, preserves first-selected-colour behavior and quantities, and performs no payment locally.
- Storefront attribution captures `msclkid`, `gclid`, `fbclid`, and UTM values. Checkout intentionally forwards the narrower current set: `msclkid`, `gclid`, and UTM values, not `fbclid`.
- Browser-captured X2 Buy 3 Pink URL: `https://buudy.com/pages/add-to-cart?product_id=1000000664011618&variant_id=1000020348810062&quantity=3&source=miroooo-x2&msclkid=MS123&gclid=G123&utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term&utm_content=content`.
- Browser-captured X Buy 1 Silver URL: `https://buudy.com/pages/add-to-cart?product_id=1000000664011633&variant_id=1000020348812112&quantity=1&source=miroooo&msclkid=MX&gclid=GX&utm_source=xsource`.
- X and X2 retain independent section order and buying composition. X has its standalone colour selection before light bundle cards. X2 keeps purchase/trust/delivery before dark bundle cards. Both preserve mobile gallery, lightbox, gifts, cart drawer, sticky purchase controls, and reduced-motion handling.
- Header variants follow the live storefront: non-product mobile routes show `Navigation`, Account, and cart; product mobile routes use left and right menu controls with cart between them. Desktop retains roll-up navigation, Account, cart, `Bundles`, and magnetic hover behavior.

### Reviews, assets, and content

- `packages/shared/src/reviews.ts` contains exactly 4,275 typed X reviews and 4,275 typed X2 reviews (8,550 total), preserving IDs, wording, dates, order, verification state, and helpful counts from the migrated archives.
- X distribution: 3,933 five-star, 256 four-star, 43 three-star, 22 two-star, 21 one-star. X2 distribution: 3,933 five-star, 256 four-star, 43 three-star, 21 two-star, 22 one-star. X2 generated ratings were normalized when browser filtering exposed a mismatch between the declared summary and generated archive; wording/order were not changed.
- Review behavior includes rating toggling/select, five sort modes, photos and verified toggles, clear/empty states, 12-at-a-time load more, keyboard-focused write modal, Escape close, and local simulated review submission. No review is posted externally.
- Product media library: 93 non-empty local files under `apps/uk/public/media/products`, totaling about 200 MB. It includes all 10 `gallery_orig` assets, all 58 X2 library files, X videos/posters/reels/features, gift media, and locally rendered storefront media.
- The three old Amazon competitor image URLs returned 404 during vendoring. They were not added as broken runtime assets; comparison wording/data remains present without remote requests.
- Exact local fonts: six Shopify-served Inter faces for 400-700 regular/italic, Google-served Inter 800 Latin WOFF2, and GFS Didot Latin WOFF2.
- Runtime legacy Shopify/custom-element/vendor residue is absent from the new source. No runtime Shopify, Miroshine, Beeketing, Vercel media, Google font, or other remote asset request remains.

### SEO, routing, and policy behavior

- Exact canonical base is `https://miroooo.co`. Metadata, Open Graph/Twitter data, Organization/WebSite/Product/FAQ JSON-LD, robots, 12-URL sitemap, `llms.txt`, manifest, and favicon are local.
- General FAQ JSON-LD contains the 12 visible questions with real plain-text answers rather than React-node fallbacks.
- Permanent redirects: `/miroooo-x` to `/products/miroooo-x`; `/miroooo-x2` to `/products/miroooo-x2`.
- Policy rewrites: shipping/refund to `/delivery-returns`, privacy to `/privacy`, terms to `/terms`, retaining target canonicals.
- Headers preserved: `X-Content-Type-Options: nosniff`, strict-origin referrer policy, camera/microphone/geolocation permissions policy, no `X-Powered-By`, and one-year immutable local media/font/image caching.
- Contact stays `mailto:support@miroooo.co`. Order tracking stays local guidance focused after form submission; it does not claim a live carrier lookup.

### Mistakes and corrections during implementation

- The initial source copy glob used `-LiteralPath *`, which did not expand; the copy was rerun correctly without overwriting source.
- An early media command combined a cleanup operation in a way that violated the Windows safety rule; it was not executed and was retried without destructive cleanup.
- A first ESLint FlatCompat attempt produced circular config behavior; it was replaced with the existing Muuhu-style flat config.
- Initial type naming/import mismatches and a Next root `useSearchParams` prerender bailout were corrected; attribution now uses `useSyncExternalStore` without a root suspense bailout.
- Early product screenshots showed a single desktop gallery and rigid shared ordering. Desktop mosaics and distinct X/X2 buying/section order were restored.
- Initial X comparison rows had duplicate React keys; both row and cell keys now include indexes.
- Mobile product spacing initially included desktop padding/gap, and the header lacked the live second product menu. Responsive geometry and product/non-product header variants were corrected against the frozen screenshots.
- FAQ schema initially used each question as the answer because visible answers were React nodes; explicit schema answer strings fixed this.
- X2 review summary and generated archive initially disagreed, and the first implementation paged six reviews. The archive now matches the locked distribution and both products use the original 12-review page size with filters/sorts.
- One X2 upright image path omitted `electric`, causing Next Image 400 responses on home/shop/about and the Silver variant. All references were corrected, and `scripts/verify.mjs` now validates direct app paths plus dataset basenames.
- Next Image warnings on package and mode media were corrected with `height: auto` where appropriate and fixed-aspect `fill` wrappers for mode cards.
- Some early viewport screenshots were captured at 150 ms and showed reveal animations mid-state. Settled captures at 1,000-1,200 ms confirmed the home title and shop collection match the intended live composition.

### Verification completed

- `pnpm lint`: passed. ESLint emits informational package warnings about React detection/pages directories in non-app packages, but zero lint warnings/errors are counted because commands run with `--max-warnings=0`.
- `pnpm typecheck`: passed for shared, UI, and UK app workspaces.
- `pnpm build`: passed with Next.js 16.2.6; 16 static pages generated, all storefront routes static, review API dynamic.
- `pnpm verify`: passed 199 checks covering routes, pinned versions, Git absence, checkout IDs, both exact review distributions, metadata files, eight fonts, 93 non-empty media files, direct source/dataset media references, forbidden remote/legacy source strings, routing, headers, no gradients, and no negative letter spacing.
- HTTP checks: redirects returned 308 with correct locations; policy rewrites returned 200 with target canonicals; explicit `/404` and unknown routes returned 404; `/robots.txt`, `/llms.txt`, `/site.webmanifest`, `/favicon.svg`, and `/sitemap.xml` returned 200; sitemap had 12 URLs; security/cache headers matched configuration.
- Review API checks: X one-star total 21 and X2 one-star total 22, each returning 12 per page; X2 two-star total 21; unknown product returned 404.
- Browser interaction checks: both mobile menu controls and Escape close, general mobile Navigation/Account/cart header, magnetic/roll-up header presence, product gallery thumbnails, lightbox next/Escape, video controls/autoplay markup, colour selection, all bundle quantities, gifts, cart drawer/Escape, sticky purchase bar, rating filter, load more to 22, sort/filter controls, empty state, review submission and Escape close, FAQ accordion, contact mailto, and tracking guidance/focus.
- Final fresh X2 browser check after mode-card correction: 10 gallery media, three mode media wrappers, zero broken images, zero horizontal overflow, and no console warnings/errors beyond normal React DevTools/HMR informational logs.
- Local screenshot set: `E:\1st YEAR DTU\New folder\miroooo\output\playwright\final`, containing 39 route/viewport captures plus focused settled/header checks. All 13 routes were checked at 1440x1000, 820x1180, and 390x844 with no horizontal overflow. Representative home/shop/product/help views were manually compared with the frozen baseline; dynamic video frame timing and normal browser rendering noise were not treated as intentional differences.
- Local dev server is running at `http://localhost:3000` from the `miroooo` workspace after the final build.

### Not tested and remaining uncertainty

- No real Buudy navigation beyond URL capture, checkout completion, payment, order creation, email, carrier lookup, production analytics, ad-platform event, Vercel deployment, public DNS/domain behavior, or production promotion was exercised.
- No automated pixel-difference threshold was accepted because videos and browser rasterization produce dynamic noise; visual checks used frozen screenshots and manual side-by-side review.
- The three unavailable historical Amazon competitor images remain intentionally absent rather than becoming broken or remote runtime dependencies.

### Final state and publishing

- New target remains intentionally non-Git. No Git repository was initialized and no commit, push, branch, pull request, remote, GitHub repository, Vercel link, or deployment was created.
- Source `gobrush-product-page` final state: `main...origin/main`, HEAD `fd11c666d70e1467c6b54b8a18278d90babf5e5c`, only pre-existing/untracked `CONTEXT.md`; no source files changed after the requested fast-forward pull.
- No production, environment, domain, checkout, payment, order, analytics, or ad-platform action occurred.
- Future work should start by reading this complete file, the workspace context, and current source/live state. Re-run status/fetch before editing because collaborators may advance `gobrush-product-page` again.
