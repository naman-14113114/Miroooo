export interface PolicyContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
}

export const POLICIES: Record<string, PolicyContent> = {
  'shipping-policy': {
    slug: 'shipping-policy',
    title: 'UK Shipping & Delivery Policy',
    metaTitle: 'UK Shipping & Delivery Policy | Miroooo',
    metaDescription: 'Read our UK shipping policy: Free tracked delivery, 1-3 business days processing, 7-20 business days transit timeframe.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: '1. Free Tracked UK Delivery',
        content:
          '<p>We are pleased to provide <strong>100% Free Tracked Shipping</strong> on all Miroooo electric toothbrush and bundle orders delivered across the United Kingdom, including England, Scotland, Wales, Northern Ireland, and UK offshore islands.</p>',
      },
      {
        heading: '2. Order Processing & Dispatch Timeframe',
        content:
          '<p>All orders are verified, packed, and dispatched from our fulfillment facility within <strong>1 to 3 business days</strong> (Monday through Friday, excluding UK bank holidays). You will receive an automated dispatch notification email containing your courier tracking number as soon as your parcel is scanned into the carrier network.</p>',
      },
      {
        heading: '3. Estimated Delivery Times',
        content:
          '<p>Standard tracked UK delivery transit takes <strong>7 to 20 business days</strong> from the date of dispatch. During peak seasonal periods (such as Black Friday, Cyber Week, and Christmas), postal carrier networks may experience minor delays outside of our direct control.</p>',
      },
      {
        heading: '4. Tracking Your Parcel',
        content:
          '<p>Once dispatched, you can monitor the progress of your shipment 24/7 using our <a href="/pages/order-tracking">Order Tracking Portal</a>. Please note that courier tracking records may take 24 to 72 hours from initial label generation to reflect live transit scans.</p>',
      },
      {
        heading: '5. Address Accuracy & Modifications',
        content:
          '<p>Please ensure your delivery address and postal code are entered accurately at checkout. If you need to make an urgent address correction, please email us at <a href="mailto:support@trymiroooo.com">support@trymiroooo.com</a> within <strong>2 hours</strong> of placing your order. Once an order enters our automated fulfillment pipeline, address modifications cannot be guaranteed.</p>',
      },
    ],
  },

  'delivery-returns': {
    slug: 'delivery-returns',
    title: 'Delivery & Returns Overview',
    metaTitle: 'Delivery & Returns Overview | Miroooo UK',
    metaDescription: 'Comprehensive overview of Miroooo UK shipping timelines, order tracking, returns eligibility, and 2-year warranty.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: 'Shipping & Delivery Summary',
        content:
          '<p>&bull; <strong>Free Delivery:</strong> All UK orders qualify for 100% free tracked courier delivery.<br>&bull; <strong>Processing:</strong> 1–3 business days.<br>&bull; <strong>Transit:</strong> 7–20 business days.<br>&bull; <strong>Tracking:</strong> Real-time tracking link emailed upon dispatch.</p>',
      },
      {
        heading: '30-Day Defective Product Return Guarantee',
        content:
          '<p>If your Miroooo device arrives damaged, defective, or incorrect, you are entitled to request a replacement or return within <strong>30 calendar days</strong> of confirmed delivery date. Prior written authorization from <a href="mailto:support@trymiroooo.com">support@trymiroooo.com</a> is required.</p>',
      },
      {
        heading: '2-Year Manufacturer Warranty',
        content:
          '<p>Every Miroooo X1 and X2 toothbrush handle is backed by a comprehensive <strong>2-year manufacturer warranty</strong> covering acoustic linear motor failures, charging malfunctions, and battery defects under normal personal hygiene use.</p>',
      },
    ],
  },

  'return-policy': {
    slug: 'return-policy',
    title: 'Return Policy',
    metaTitle: 'Return Policy | Miroooo UK',
    metaDescription: 'Miroooo UK 30-day defective return policy, RMA authorization requirements, and return process.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: '1. Eligibility for Returns (30-Day Window)',
        content:
          '<p>To maintain rigorous hygiene and healthcare standards, Miroooo toothbrushes and brush heads are classified as personal oral hygiene instruments. We accept returns within <strong>30 calendar days</strong> of delivery strictly for items that arrive defective, damaged in transit, or materially incorrect.</p>',
      },
      {
        heading: '2. Return Merchandise Authorization (RMA)',
        content:
          '<p>Do not return any parcel to the address on the packaging without contacting us first. You must request a Return Authorization from our UK support team at <a href="mailto:support@trymiroooo.com">support@trymiroooo.com</a> including your order number, photo/video proof of defect, and reason for return. Unauthorized returns cannot be identified or processed.</p>',
      },
      {
        heading: '3. Condition Requirements',
        content:
          '<p>All returned items must include all original unibody components, charging cables, travel cases, and packaging materials. Returned items are inspected upon arrival at our returns processing center.</p>',
      },
    ],
  },

  'refund-policy': {
    slug: 'refund-policy',
    title: 'Refund Policy',
    metaTitle: 'Refund Policy | Miroooo UK',
    metaDescription: 'Refund processing timelines, payment method credits, and return inspection policies.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: '1. Refund Processing',
        content:
          '<p>Once your authorized return is received and inspected at our returns facility, we will notify you via email regarding the approval or rejection of your refund. Approved refunds are processed immediately to your original payment method (Visa, Mastercard, Amex, PayPal, Apple Pay).</p>',
      },
      {
        heading: '2. Timing for Card Issuers',
        content:
          '<p>Depending on your bank or credit card provider, the credited funds typically appear on your statement within <strong>3 to 7 business days</strong>.</p>',
      },
      {
        heading: '3. Late or Missing Refunds',
        content:
          '<p>If you have not received an approved refund after 10 business days, first check your banking statement, then contact your credit card provider. If you still require assistance, email us at <a href="mailto:support@trymiroooo.com">support@trymiroooo.com</a>.</p>',
      },
    ],
  },

  'warranty': {
    slug: 'warranty',
    title: '2-Year Limited Manufacturer Warranty',
    metaTitle: '2-Year Warranty Policy | Miroooo UK',
    metaDescription: 'Comprehensive 2-year warranty terms covering Miroooo X1 & Miroooo X2 electric toothbrushes.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: '1. Scope of Coverage',
        content:
          '<p>Miroooo warrants that your Miroooo X1 or Miroooo X2 toothbrush handle is free from functional defects in materials and acoustic motor workmanship for a period of <strong>24 months (2 years)</strong> from the date of original purchase.</p>',
      },
      {
        heading: '2. Covered Issues',
        content:
          '<p>&bull; Acoustic sonic motor or drive shaft mechanical failure.<br>&bull; Internal lithium-ion battery failure to charge or hold voltage under normal use.<br>&bull; On/off power switch or mode toggle failure.<br>&bull; Internal IPX7 hermetic waterproofing defect not caused by impact.</p>',
      },
      {
        heading: '3. What Is Excluded',
        content:
          '<p>&bull; Normal bristle wear and natural degradation of consumable brush heads.<br>&bull; Cosmetic scratches, dents, or anodization wear resulting from drops or abrasives.<br>&bull; Damage resulting from unauthorized disassemblies, commercial misuse, or submerging in chemicals.<br>&bull; Use of non-compliant 3rd-party charging blocks exceeding voltage specs.</p>',
      },
      {
        heading: '4. Warranty Claim Procedure',
        content:
          '<p>To file a warranty claim, email <a href="mailto:support@trymiroooo.com">support@trymiroooo.com</a> with proof of purchase and a brief video illustrating the fault. Approved claims receive a replacement device at zero cost.</p>',
      },
    ],
  },

  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy (UK & GDPR)',
    metaTitle: 'Privacy Policy | Miroooo UK',
    metaDescription: 'Read the Miroooo UK Privacy Policy. Learn how we protect personal information in compliance with UK GDPR and Data Protection Act 2018.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: '1. Information We Collect',
        content:
          '<p>When you visit trymiroooo.com or complete a purchase, we collect contact details (name, email address, phone number), delivery address, order details, IP address, and browser analytics to fulfill your order and optimize your shopping experience.</p>',
      },
      {
        heading: '2. Legal Basis for Processing',
        content:
          '<p>We process your data under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018 to perform contractual obligations (order fulfillment), comply with accounting laws, and pursue legitimate interests (security and fraud prevention).</p>',
      },
      {
        heading: '3. Data Security & Third Parties',
        content:
          '<p>We never sell your personal data. We only share necessary data with trusted service partners (such as postal carriers for shipping and PCI-DSS Level 1 certified payment processors for checkout security).</p>',
      },
      {
        heading: '4. Your Rights',
        content:
          '<p>Under UK GDPR, you have the right to access, rectify, or request deletion of your personal data held by us. Contact our Data Protection Officer at <a href="mailto:support@trymiroooo.com">support@trymiroooo.com</a>.</p>',
      },
    ],
  },

  'terms-of-service': {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    metaTitle: 'Terms of Service | Miroooo UK',
    metaDescription: 'Terms and conditions governing the use of the Miroooo UK website and purchase of Miroooo oral care products.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        content:
          '<p>By accessing or purchasing from trymiroooo.com, you agree to be bound by these Terms of Service. If you do not agree to all terms, you must discontinue use of the website.</p>',
      },
      {
        heading: '2. Product Use & Dental Disclaimer',
        content:
          '<p>Miroooo toothbrushes and tools (including the Dental Care Quiz and Smile Coach) provide wellness and hygiene support and are not a substitute for professional dental diagnosis, treatment, or medical advice. Consult a licensed dentist if you experience persistent bleeding, tooth pain, or gum distress.</p>',
      },
      {
        heading: '3. Pricing & Governing Law',
        content:
          '<p>All prices are listed in Pounds Sterling (GBP) inclusive of applicable taxes. These terms are governed by and construed in accordance with the laws of England and Wales, and disputes shall be subject to the exclusive jurisdiction of the courts of England.</p>',
      },
    ],
  },

  'cookies-policy': {
    slug: 'cookies-policy',
    title: 'Cookies & Tracking Policy',
    metaTitle: 'Cookies Policy | Miroooo UK',
    metaDescription: 'Learn how Miroooo uses cookies, local storage, and analytical technologies to enhance your browsing experience.',
    lastUpdated: 'September 2026',
    sections: [
      {
        heading: '1. What Are Cookies',
        content:
          '<p>Cookies are small text files placed on your device by websites you visit. They enable the site to remember your cart items, preferences, and session state across pages.</p>',
      },
      {
        heading: '2. Cookies We Use',
        content:
          '<p>&bull; <strong>Strictly Necessary:</strong> Required for cart functionality, promo code validation, and checkout session generation.<br>&bull; <strong>Performance & Analytics:</strong> Aggregate insights (Microsoft Clarity) to identify layout errors and optimize page load speed.<br>&bull; <strong>Local Storage:</strong> Used client-side for Smile Coach habits and quiz recommendations without sending private records to external servers.</p>',
      },
      {
        heading: '3. Managing Cookie Preferences',
        content:
          '<p>You can adjust your browser settings at any time to block or delete cookies. However, disabling essential cookies may impact shopping cart operation and checkout responsiveness.</p>',
      },
    ],
  },
};

export function getPolicy(slug: string): PolicyContent | undefined {
  return POLICIES[slug];
}
