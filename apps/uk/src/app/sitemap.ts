import type { MetadataRoute } from "next";

const BASE_URL = "https://www.trymiroooo.com";

const routes = [
  // Homepage
  ["/", "weekly", 1.0],

  // Storefront & Cart
  ["/shop", "weekly", 0.9],
  ["/cart", "weekly", 0.8],

  // Products
  ["/products/miroooo-x", "weekly", 0.9],
  ["/products/miroooo-x2", "weekly", 0.9],
  ["/products/miroooo-x1-heads", "weekly", 0.8],
  ["/products/miroooo-x2-heads", "weekly", 0.8],

  // Pages
  ["/pages/about-us", "monthly", 0.7],
  ["/pages/contact-us", "monthly", 0.7],
  ["/pages/faqs", "monthly", 0.7],
  ["/pages/dentalcare-quiz", "monthly", 0.7],
  ["/pages/smile-coach", "monthly", 0.7],
  ["/pages/order-tracking", "monthly", 0.6],

  // Policies
  ["/policies/privacy-policy", "yearly", 0.3],
  ["/policies/return-policy", "yearly", 0.3],
  ["/policies/refund-policy", "yearly", 0.3],
  ["/policies/shipping-policy", "yearly", 0.3],
  ["/policies/terms-of-service", "yearly", 0.3],
  ["/policies/cookies-policy", "yearly", 0.3],
  ["/policies/delivery-returns", "yearly", 0.3],
  ["/policies/warranty", "yearly", 0.3],

  // Guides
  ["/guides", "weekly", 0.8],
  ["/guides/sonic-vs-oscillating-electric-toothbrush", "monthly", 0.7],
  ["/guides/how-often-replace-electric-toothbrush-head", "monthly", 0.7],
  ["/guides/electric-toothbrush-travel-guide", "monthly", 0.7],
  ["/guides/how-to-use-two-minute-toothbrush-timer", "monthly", 0.7],
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(([path, changeFrequency, priority]) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
