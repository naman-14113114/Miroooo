import type { NextConfig } from "next";
import path from "node:path";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@miroooo/ui", "@miroooo/shared"],
  turbopack: {
    root: path.join(process.cwd(), "../.."),
  },
  async redirects() {
    return [
      // Product legacy paths
      { source: "/miroooo-x", destination: "/products/miroooo-x", permanent: true },
      { source: "/miroooo-x1", destination: "/products/miroooo-x", permanent: true },
      { source: "/products/miroooo-x1", destination: "/products/miroooo-x", permanent: true },
      { source: "/miroooo-x2", destination: "/products/miroooo-x2", permanent: true },
      { source: "/miroooo-x1-heads", destination: "/products/miroooo-x1-heads", permanent: true },
      { source: "/miroooo-x2-heads", destination: "/products/miroooo-x2-heads", permanent: true },
      { source: "/miroooo-x-heads", destination: "/products/miroooo-x1-heads", permanent: true },
      { source: "/products/miroooo-x-heads", destination: "/products/miroooo-x1-heads", permanent: true },

      // Policy legacy paths
      { source: "/privacy", destination: "/policies/privacy-policy", permanent: true },
      { source: "/privacy-policy", destination: "/policies/privacy-policy", permanent: true },
      { source: "/policies/privacy", destination: "/policies/privacy-policy", permanent: true },
      { source: "/terms", destination: "/policies/terms-of-service", permanent: true },
      { source: "/terms-of-service", destination: "/policies/terms-of-service", permanent: true },
      { source: "/policies/terms", destination: "/policies/terms-of-service", permanent: true },
      { source: "/refund-policy", destination: "/policies/refund-policy", permanent: true },
      { source: "/refund", destination: "/policies/refund-policy", permanent: true },
      { source: "/policies/refund", destination: "/policies/refund-policy", permanent: true },
      { source: "/return-policy", destination: "/policies/return-policy", permanent: true },
      { source: "/returns", destination: "/policies/return-policy", permanent: true },
      { source: "/policies/returns", destination: "/policies/return-policy", permanent: true },
      { source: "/shipping-policy", destination: "/policies/shipping-policy", permanent: true },
      { source: "/shipping", destination: "/policies/shipping-policy", permanent: true },
      { source: "/policies/shipping", destination: "/policies/shipping-policy", permanent: true },
      { source: "/cookies-policy", destination: "/policies/cookies-policy", permanent: true },
      { source: "/cookies", destination: "/policies/cookies-policy", permanent: true },
      { source: "/policies/cookies", destination: "/policies/cookies-policy", permanent: true },
      { source: "/delivery-returns", destination: "/policies/delivery-returns", permanent: true },
      { source: "/policies/delivery", destination: "/policies/delivery-returns", permanent: true },
      { source: "/warranty", destination: "/policies/warranty", permanent: true },

      // Page legacy paths
      { source: "/contact", destination: "/pages/contact-us", permanent: true },
      { source: "/contact-us", destination: "/pages/contact-us", permanent: true },
      { source: "/pages/contact", destination: "/pages/contact-us", permanent: true },
      { source: "/about", destination: "/pages/about-us", permanent: true },
      { source: "/about-us", destination: "/pages/about-us", permanent: true },
      { source: "/pages/about", destination: "/pages/about-us", permanent: true },
      { source: "/faq", destination: "/pages/faqs", permanent: true },
      { source: "/faqs", destination: "/pages/faqs", permanent: true },
      { source: "/pages/faq", destination: "/pages/faqs", permanent: true },
      { source: "/dentalcare-quiz", destination: "/pages/dentalcare-quiz", permanent: true },
      { source: "/quiz", destination: "/pages/dentalcare-quiz", permanent: true },
      { source: "/pages/quiz", destination: "/pages/dentalcare-quiz", permanent: true },
      { source: "/smile-coach", destination: "/pages/smile-coach", permanent: true },
      { source: "/order-tracking", destination: "/pages/order-tracking", permanent: true },
      { source: "/tracking", destination: "/pages/order-tracking", permanent: true },
      { source: "/pages/tracking", destination: "/pages/order-tracking", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/:path*\\.(mp4|webm)",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|webp|svg|woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
