export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQS_GENERAL: FaqItem[] = [
  {
    id: 'return-policy',
    category: 'Returns & Orders',
    question: 'What is your return policy?',
    answer:
      'Returns may be requested within 30 days of delivery for damaged, defective, incorrect, or missing items. Please contact our support team at support@trymiroooo.com with your order details and photo/video evidence to receive written return authorization before sending any item back.',
  },
  {
    id: 'shipping-policy',
    category: 'Shipping & Delivery',
    question: 'What is the UK shipping policy and delivery timeframe?',
    answer:
      'We provide free tracked UK delivery on qualifying orders. Orders are processed within 1 to 3 business days, and standard tracked delivery transit takes 7 to 20 business days. You will receive an automated dispatch notification with your tracking link as soon as the courier scans your parcel.',
  },
  {
    id: 'choosing-brush',
    category: 'Products',
    question: 'How do I know which Miroooo toothbrush is right for me?',
    answer:
      'Miroooo X1 offers a lightweight, minimalist sonic routine (51g unibody, 3 modes, 60-day battery), while Miroooo X2 is our flagship model adding dynamic 45° Bass sweep vibration, smart red halo pressure defense, 90-day battery life, and floating magnetic wall mount. Take our interactive Dental Care Quiz to find your exact match.',
  },
  {
    id: 'ordering',
    category: 'Returns & Orders',
    question: 'How do I place my order?',
    answer:
      'Simply choose your preferred model, colour, and bundle tier in our shop or product page, click Add to Cart, and complete checkout through our secure payment gateway.',
  },
  {
    id: 'shipping-costs',
    category: 'Shipping & Delivery',
    question: 'What are the shipping costs?',
    answer:
      'Standard tracked shipping is 100% free across the United Kingdom with no hidden fees or surprise handling charges.',
  },
  {
    id: 'care-maintenance',
    category: 'Care & Battery',
    question: 'How do I care for and maintain my Miroooo toothbrush?',
    answer:
      'To keep your toothbrush in optimal condition, rinse the brush head thoroughly under running water after each use and allow it to air-dry upright. Wipe the aerospace aluminium handle with a damp cloth as needed and recharge via USB-C when the battery indicator signals low power.',
  },
  {
    id: 'head-replacement',
    category: 'Care & Battery',
    question: 'How often should I change brush heads?',
    answer:
      'Dentists recommend replacing brush heads every 3 months or sooner if the bristles appear splayed or frayed. We offer convenient 2-packs for both Miroooo X1 and Miroooo X2 with DuPont precision filaments.',
  },
  {
    id: 'waterproof',
    category: 'Products',
    question: 'Is the toothbrush waterproof and can I use it in the shower?',
    answer:
      'Yes! Both the Miroooo X1 and Miroooo X2 feature full IPX7 immersion waterproofing, allowing you to comfortably brush in the shower and safely rinse the entire device under running water. Always ensure the handle base and charging connection are dry before connecting to the USB-C charging cable.',
  },
  {
    id: 'tracking-issue',
    category: 'Shipping & Delivery',
    question: "My tracking number isn't updating yet",
    answer:
      'Tracking links usually take 24 to 72 hours after carrier handover to update in courier systems. If no scan update appears after this timeframe, reach out to our UK support desk at support@trymiroooo.com and we will investigate immediately.',
  },
  {
    id: 'payment-methods',
    category: 'Payments & Security',
    question: 'What types of payment do you accept?',
    answer:
      'We accept Visa, Mastercard, American Express, Maestro, JCB, PayPal, Apple Pay, and Google Pay in GBP.',
  },
  {
    id: 'security',
    category: 'Payments & Security',
    question: 'How secure is my personal and payment information?',
    answer:
      'All transactions are secured with 256-bit SSL encryption and processed via certified PCI-DSS Level 1 compliant gateways. We never store raw payment card data.',
  },
  {
    id: 'contact-support',
    category: 'Returns & Orders',
    question: 'How can I contact customer service?',
    answer:
      'Reach our London UK support desk at support@trymiroooo.com or via our Contact Us page. Our hours are Monday through Friday, 9:00 AM to 5:00 PM GMT.',
  },
];

export const PRODUCT_FAQS_X2: FaqItem[] = [
  {
    id: 'x2-bass-motion',
    question: 'What makes the 45° Bass sweep movement different?',
    answer:
      'Unlike simple vibration toothbrushes, Miroooo X2 features a dynamic 45° oscillating drive shaft that replicates the dentist-recommended Bass method, sweeping along the gumline to lift plaque out of gingival pockets without aggressive manual scrubbing.',
  },
  {
    id: 'x2-pressure-sensor',
    question: 'How does the 360° Red Halo Pressure Defense work?',
    answer:
      'A built-in optical sensor constantly monitors force. If you apply excessive pressure against your enamel or gums, the 360° halo ring at the neck immediately illuminates red and automatically throttles motor amplitude to protect delicate gum tissue.',
  },
  {
    id: 'x2-battery',
    question: 'How long does the battery last on a single charge?',
    answer:
      'The Miroooo X2 high-density lithium battery delivers up to 90 days of daily brushing (2 minutes twice daily) on a single 2-hour USB-C charge. No bulky charging cradles required.',
  },
  {
    id: 'x2-contents',
    question: 'What is included in the box?',
    answer:
      'Each Miroooo X2 includes the CNC anodized aluminium handle, 1x DuPont™ Bass-sweep brush head, 1x luxury magnetic wall & mirror dock, 1x slim magnetic travel case, 1x USB-C fast charging cable, and a 2-year warranty card.',
  },
];

export const PRODUCT_FAQS_X1: FaqItem[] = [
  {
    id: 'x1-motor',
    question: 'How powerful is the linear sonic motor in Miroooo X1?',
    answer:
      'Miroooo X1 features a 32,000 micro-vibrations per minute linear acoustic motor that creates micro-bubbles in toothpaste fluids to dislodge plaque between tight teeth while remaining whisper-quiet (<50 dB).',
  },
  {
    id: 'x1-modes',
    question: 'What are the 3 brushing modes?',
    answer:
      'Clean mode (daily balanced plaque removal), Soft mode (for sensitive gums or new electric toothbrush users), and White mode (high frequency polish for surface stains).',
  },
  {
    id: 'x1-battery',
    question: 'How long does the Miroooo X1 battery last?',
    answer:
      'Miroooo X1 delivers 60+ days of standard brushing on a single USB-C charge.',
  },
];
