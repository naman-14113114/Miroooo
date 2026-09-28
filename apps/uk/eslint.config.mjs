import nextConfig from "@miroooo/eslint-config/next";

// The UK storefront deliberately uses its vendored image URLs and route-scoped
// legacy styles while the React pages are brought into parity with the source.
const config = [
  ...nextConfig,
  {
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-css-tags": "off",
      "@next/next/no-page-custom-font": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];
export default config;

