export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const generalFaqs: FAQItem[] = [
  {
    category: "Product & Technology",
    question: "What is the difference between Miroooo X1 and Miroooo X2?",
    answer:
      "The Miroooo X1 is our ultra-portable sonic electric toothbrush with 32,000 vibrations per minute, 3 brushing modes, and 60+ days of battery life in a 51g unibody design. The Miroooo X2 is our flagship model featuring an upgraded 40,000 VPM motor, dynamic 45° Bass Method oscillating sweep, 360° red halo pressure sensor with auto-throttle, 90-day battery life, and an included floating magnetic charging dock.",
  },
  {
    category: "Product & Technology",
    question: "How does the 45° Bass Method sweep work on the Miroooo X2?",
    answer:
      "Dentists globally recommend the Modified Bass Technique, which angles bristles at 45 degrees towards the gumline to sweep plaque from the gingival sulcus. The Miroooo X2 incorporates a micro-mechanical oscillating linkage that automatically sweeps DuPont filaments in this exact 45° motion, giving you a clinically superior clean without harsh scrubbing.",
  },
  {
    category: "Product & Technology",
    question: "How does the smart red halo pressure sensor protect my gums?",
    answer:
      "When you press too hard against your teeth or enamel, the 360° light ring around the neck of the Miroooo X2 illuminates in crimson red and automatically throttles motor amplitude down to prevent enamel abrasion and gum recession.",
  },
  {
    category: "Product & Technology",
    question: "Is the Miroooo electric toothbrush waterproof?",
    answer:
      "Yes. Both the Miroooo X1 and Miroooo X2 are IPX7 rated and fully submersible up to 1 meter in water for 30 minutes. You can safely rinse the unibody handle under running tap water or use it in the shower.",
  },
  {
    category: "Battery & Charging",
    question: "How long does the battery last and how do I recharge it?",
    answer:
      "The Miroooo X1 delivers over 60 days of battery life on a single 2-hour charge, while the Miroooo X2 provides 90+ days. Both recharge via universal USB-C. The Miroooo X2 also includes a magnetic contact dock for effortless bathroom counter storage.",
  },
  {
    category: "Brush Heads",
    question: "How often should I replace my Miroooo brush head?",
    answer:
      "Dental associations recommend replacing your toothbrush head every 3 months, or sooner if filaments appear frayed or discolored. Genuine Miroooo replacement heads feature DuPont™ Tynex® bristles with end-rounded filaments to ensure maximum plaque removal while remaining gentle on enamel.",
  },
  {
    category: "Shipping & Delivery",
    question: "How long does shipping take within the United States?",
    answer:
      "Orders are processed within 1–3 business days. Once dispatched via USPS Priority or FedEx Ground, transit across the US typically takes 7–20 business days. You will receive an automated tracking link by email as soon as your parcel ships.",
  },
  {
    category: "Warranty & Guarantee",
    question: "What is your warranty and 90-day home trial policy?",
    answer:
      "Every Miroooo toothbrush comes with a 90-day risk-free home trial. If you are not completely satisfied, contact our support team. Additionally, all Miroooo devices are backed by a comprehensive 2-year manufacturer replacement warranty covering mechanical and electronic defects.",
  },
];

export const x1Faqs: FAQItem[] = [
  {
    question: "How quiet is the Miroooo X1 linear sonic motor?",
    answer:
      "The acoustic magnetic levitation motor in the Miroooo X1 operates below 50 decibels—significantly quieter than traditional oscillating electric toothbrushes. You experience a smooth, high-frequency micro-vibration without harsh buzzing.",
  },
  {
    question: "What modes are available on the Miroooo X1?",
    answer:
      "The Miroooo X1 features 3 tailored brushing modes: Clean (everyday thorough plaque removal), Soft (sensitive gums and enamel protection), and White (enhanced stain lifting and surface polishing).",
  },
  {
    question: "Is the travel case included with the Miroooo X1?",
    answer:
      "Yes, every Miroooo X1 includes a slim magnetic protective travel case that accommodates the toothbrush unibody handle and one brush head, keeping it clean and protected wherever you go.",
  },
];

export const x2Faqs: FAQItem[] = [
  {
    question: "Why is the 45° Bass sweep mechanism better than normal sonic vibration?",
    answer:
      "Standard sonic toothbrushes vibrate in place, relying entirely on user manual angle guidance. The Miroooo X2 combines high-frequency acoustic micro-vibrations (40,000 VPM) with a physical 45° wide-angle sweep that mimics the recommended dental Bass technique automatically.",
  },
  {
    question: "What comes included in the Miroooo X2 box?",
    answer:
      "Each Miroooo X2 set includes the CNC anodized aluminum handle, 2x DuPont™ precision Bass-sweep brush heads, the luxury magnetic floating counter dock, a hard-shell protective travel case, a braided USB-C charging cable, and the Smile Coach setup card.",
  },
  {
    question: "Can I use X1 brush heads on the Miroooo X2?",
    answer:
      "No. The Miroooo X2 uses an engineered oscillating drive shaft tailored for the 45° Bass sweep, requiring genuine Miroooo X2 replacement heads with the matched coupling mechanism.",
  },
];
