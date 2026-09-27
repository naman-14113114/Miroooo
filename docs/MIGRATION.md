# Miroooo Storefront Migration

The Next.js monorepo was reconstructed from the live Miroooo storefront and the
frozen `gobrush-product-page` source at commit
`fd11c666d70e1467c6b54b8a18278d90babf5e5c`.

The new application keeps route-specific product compositions in `apps/uk`,
reusable controls in `packages/ui`, and typed products, reviews, attribution,
and checkout URL construction in `packages/shared`.

Legacy Shopify theme scripts, custom elements, inline storefront generators,
and remote runtime media or font dependencies were intentionally not migrated.
All rendered product media and fonts are self-hosted. Payment remains outside
the storefront through the existing Buudy URL bridge.

The source repository was not edited by this migration. This repository is not
initialized with Git and has not been linked, published, or deployed.
