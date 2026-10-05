export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const HEADER_NAV = [
  {
    label: 'Shop',
    href: '/all-products',
    hasDropdown: true,
    groups: [
      {
        title: 'Sonic Brushes',
        items: [
          {
            label: 'Miroooo X2 (Flagship)',
            href: '/products/miroooo-x2',
            description: '45° Bass sweep & smart red halo defense',
            badge: 'Flagship',
          },
          {
            label: 'Miroooo X1',
            href: '/products/miroooo-x',
            description: '51g ultra-lightweight linear sonic motor',
          },
        ],
      },
      {
        title: 'Accessories',
        items: [
          {
            label: 'Miroooo X2 Heads (2-Pack)',
            href: '/products/miroooo-x2-heads',
            description: 'DuPont precision Bass-sweep heads',
          },
          {
            label: 'Miroooo X1 Heads (2-Pack)',
            href: '/products/miroooo-x1-heads',
            description: 'Micro-diamond polished replacement heads',
          },
          {
            label: 'Luxury Travel Case',
            href: '/products/travel-case',
            description: 'Slim ventilated magnetic travel shell',
          },
          {
            label: 'Wall-Mounted Dock',
            href: '/products/wall-mounted-dock',
            description: 'Magnetic floating wall & mirror mount',
          },
          {
            label: 'X1 Fast Charger',
            href: '/products/x1-charger',
            description: 'High-speed magnetic induction dock',
          },
        ],
      },
    ],
  },
  { label: 'About Us', href: '/pages/about-us' },
  { label: 'Dental Care Quiz', href: '/pages/dentalcare-quiz' },
  { label: 'Contact Us', href: '/pages/contact-us' },
  { label: 'FAQs', href: '/pages/faqs' },
];

export const DRAWER_MENU = {
  shop: {
    label: 'Shop',
    brushes: [
      { label: 'Miroooo X2', href: '/products/miroooo-x2', badge: 'Flagship' },
      { label: 'Miroooo X1', href: '/products/miroooo-x' },
    ],
    accessories: [
      { label: 'Miroooo X2 Heads', href: '/products/miroooo-x2-heads' },
      { label: 'Miroooo X1 Heads', href: '/products/miroooo-x1-heads' },
      { label: 'Luxury Travel Case', href: '/products/travel-case' },
      { label: 'Wall-Mounted Dock', href: '/products/wall-mounted-dock' },
      { label: 'X1 Fast Charger', href: '/products/x1-charger' },
    ],
  },
  pages: [
    { label: 'About Us', href: '/pages/about-us' },
    { label: 'Dental Care Quiz', href: '/pages/dentalcare-quiz' },
    { label: 'Smile Coach', href: '/pages/smile-coach' },
    { label: 'Contact Us', href: '/pages/contact-us' },
    { label: 'FAQs', href: '/pages/faqs' },
  ],
};

export const FOOTER_NAV = {
  products: {
    title: 'Products',
    links: [
      { label: 'Miroooo X2 Flagship', href: '/products/miroooo-x2' },
      { label: 'Miroooo X1 Essential', href: '/products/miroooo-x' },
      { label: 'Miroooo X2 Heads (2-Pack)', href: '/products/miroooo-x2-heads' },
      { label: 'Miroooo X1 Heads (2-Pack)', href: '/products/miroooo-x1-heads' },
      { label: 'Luxury Travel Case', href: '/products/travel-case' },
      { label: 'Wall-Mounted Dock', href: '/products/wall-mounted-dock' },
      { label: 'X1 Fast Charger', href: '/products/x1-charger' },
      { label: 'Shop Entire Collection', href: '/all-products' },
    ],
  },
  guides: {
    title: 'Guides & Tools',
    links: [
      { label: 'Dental Care Quiz', href: '/pages/dentalcare-quiz' },
      { label: 'Smile Coach App', href: '/pages/smile-coach' },
      { label: 'Oral Care Guides Index', href: '/guides' },
      { label: 'Sonic vs Oscillating Guide', href: '/guides/sonic-vs-oscillating-electric-toothbrush' },
      { label: 'Electric Toothbrush Travel Guide', href: '/guides/electric-toothbrush-travel-guide' },
      { label: 'How Often to Replace Heads', href: '/guides/how-often-replace-electric-toothbrush-head' },
      { label: '2-Minute Timer Quad-Pacer', href: '/guides/how-to-use-two-minute-toothbrush-timer' },
    ],
  },
  careAndLegal: {
    title: 'Customer Care & Policies',
    links: [
      { label: 'Help & FAQs', href: '/pages/faqs' },
      { label: 'Contact Support', href: '/pages/contact-us' },
      { label: 'Track Your Order', href: '/pages/order-tracking' },
      { label: 'Shipping Policy', href: '/policies/shipping-policy' },
      { label: 'Delivery & Returns', href: '/policies/delivery-returns' },
      { label: 'Return Policy (30-Day)', href: '/policies/return-policy' },
      { label: 'Refund Policy', href: '/policies/refund-policy' },
      { label: '2-Year Warranty Policy', href: '/policies/warranty' },
      { label: 'Privacy Policy', href: '/policies/privacy-policy' },
      { label: 'Terms of Service', href: '/policies/terms-of-service' },
      { label: 'Cookies Policy', href: '/policies/cookies-policy' },
    ],
  },
  contactInfo: {
    title: 'Business Address',
    address: '131 Continental Dr Suite 305, Newark, DE 19713, USA',
    email: 'support@trymiroooo.com',
    hours: 'Monday – Friday: 9:00 AM – 5:00 PM Eastern Time',
    announcement: 'Free Tracked US Delivery across all England, Scotland, Wales & Northern Ireland.',
  },
};
