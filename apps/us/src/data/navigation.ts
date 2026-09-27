export interface NavLink {
  label: string;
  href: string;
  badge?: string;
  image?: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const primaryNavigation: NavLink[] = [
  { label: "Miroooo X2", href: "/products/miroooo-x2" },
  { label: "Miroooo X1", href: "/products/miroooo-x" },
  { label: "Replacement Heads", href: "/products/miroooo-x2-heads" },
  { label: "Dental Quiz", href: "/pages/dentalcare-quiz" },
  { label: "Smile Coach", href: "/pages/smile-coach" },
];

export const secondaryNavigation: NavLink[] = [
  { label: "Track Order", href: "/pages/order-tracking" },
  { label: "About Us", href: "/pages/about-us" },
  { label: "Contact Us", href: "/pages/contact-us" },
  { label: "FAQs", href: "/pages/faqs" },
];

export const mobileShopLinks: NavLink[] = [
  {
    label: "Miroooo X2",
    href: "/products/miroooo-x2",
    badge: "Flagship",
    image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp",
  },
  {
    label: "Miroooo X1",
    href: "/products/miroooo-x",
    image: "/assets_ref/x/gallery/Miroooo_x_Silver-1.webp",
  },
  {
    label: "X2 Brush Heads (2-Pk)",
    href: "/products/miroooo-x2-heads",
    image: "/assets_ref/x2/heads/B1.webp",
  },
  {
    label: "X1 Brush Heads (2-Pk)",
    href: "/products/miroooo-x1-heads",
    image: "/assets_ref/x/heads/B1.webp",
  },
  {
    label: "Shop All Products",
    href: "/shop",
  },
];

export const mobileToolsLinks: NavLink[] = [
  { label: "Dental Care Quiz", href: "/pages/dentalcare-quiz" },
  { label: "Smile Coach App", href: "/pages/smile-coach" },
  { label: "Track Your Order", href: "/pages/order-tracking" },
];

export const announcementItems = [
  "Free tracked US delivery",
  "90-day risk-free home trial",
  "2-year warranty on all devices",
  "4.9 stars from 4,200+ happy brushers",
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "Miroooo X2", href: "/products/miroooo-x2" },
      { label: "Miroooo X1", href: "/products/miroooo-x" },
      { label: "X2 Replacement Heads", href: "/products/miroooo-x2-heads" },
      { label: "X1 Replacement Heads", href: "/products/miroooo-x1-heads" },
      { label: "Shop All", href: "/shop" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Dental Care Quiz", href: "/pages/dentalcare-quiz" },
      { label: "Smile Coach App", href: "/pages/smile-coach" },
      { label: "Electric Toothbrush Travel Guide", href: "/guides/electric-toothbrush-travel-guide" },
      { label: "Sonic vs Oscillating Toothbrushes", href: "/guides/sonic-vs-oscillating-electric-toothbrush" },
      { label: "When to Replace Brush Heads", href: "/guides/how-often-replace-electric-toothbrush-head" },
      { label: "Two-Minute Timer Guide", href: "/guides/how-to-use-two-minute-toothbrush-timer" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { label: "Track Your Order", href: "/pages/order-tracking" },
      { label: "Frequently Asked Questions", href: "/pages/faqs" },
      { label: "Contact Us", href: "/pages/contact-us" },
      { label: "Shipping Policy", href: "/policies/shipping-policy" },
      { label: "Delivery & Returns", href: "/policies/delivery-returns" },
    ],
  },
  {
    title: "Legal & Privacy",
    links: [
      { label: "Privacy Policy", href: "/policies/privacy-policy" },
      { label: "Terms of Service", href: "/policies/terms-of-service" },
      { label: "Return Policy", href: "/policies/return-policy" },
      { label: "Refund Policy", href: "/policies/refund-policy" },
      { label: "Cookies Policy", href: "/policies/cookies-policy" },
      { label: "Warranty Policy", href: "/policies/warranty" },
    ],
  },
];
