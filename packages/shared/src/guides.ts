export interface GuideItem {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  readTime: string;
  updatedDate: string;
  deck: string;
  shortAnswer: string;
  sections: Array<{
    heading: string;
    content: string; // HTML content
  }>;
  table?: {
    headers: string[];
    rows: string[][];
  };
  sources: Array<{ title: string; url: string }>;
  disclaimer: string;
  aside: {
    card1: { title: string; text: string; linkText: string; linkUrl: string };
    card2: { title: string; text: string; linkText: string; linkUrl: string };
  };
}

export const GUIDES: GuideItem[] = [
  {
    slug: "sonic-vs-oscillating-electric-toothbrush",
    title: "Sonic vs oscillating electric toothbrushes.",
    metaTitle: "Sonic vs Oscillating Electric Toothbrushes | Miroooo",
    metaDescription: "Compare sonic and oscillating electric toothbrushes: how they move, what research says, and which practical features matter most for daily brushing.",
    kicker: "Choosing a brush",
    readTime: "7 min read",
    updatedDate: "1 September 2026",
    deck: "Both are powered brushes. The main difference is how the head moves—and neither movement replaces careful, twice-daily technique.",
    shortAnswer: "A sonic brush uses rapid side-to-side bristle movement, usually with a familiar elongated head. An oscillating-rotating brush uses a smaller round head that moves back and forth around each tooth. Both can clean effectively. The most useful choice is the brush you can guide comfortably for about two minutes, twice a day, using fluoride toothpaste.",
    table: {
      headers: ["Feature", "Sonic", "Oscillating-rotating"],
      rows: [
        ["Typical head shape", "Elongated, similar to a manual brush", "Small and round"],
        ["Main movement", "Rapid side-to-side bristle motion", "Alternating rotational motion"],
        ["How it is guided", "Slowly along each surface", "Placed around individual tooth areas"],
        ["Useful preference", "Familiar head shape and sweeping feel", "Compact head and tooth-by-tooth pacing"],
      ],
    },
    sections: [
      {
        heading: "How the movements differ",
        content: "<p>“Sonic” describes rapid side-to-side movement. You guide the head slowly across the outer, inner and chewing surfaces of your teeth. “Oscillating-rotating” describes a round head that alternates direction; it is commonly held against one tooth area at a time before moving on.</p>",
      },
      {
        heading: "What does the evidence say?",
        content: "<p>A Cochrane review of powered versus manual brushes found moderate-quality evidence that powered brushes reduced plaque and gingivitis more than manual brushing across the studies it examined. More than half of the included studies used oscillating-rotating brushes, and the authors said the long-term clinical importance was unclear. That review should not be read as proof that every electric brush—or one current model—will produce the same result.</p><p>The NHS takes a practical position: manual and electric brushes can both work when every tooth surface is cleaned with fluoride toothpaste. Some people simply find an electric brush easier to use thoroughly.</p>",
      },
      {
        heading: "What matters more than the motor type?",
        content: "<ul><li><strong>Coverage:</strong> clean outer, inner and chewing surfaces instead of repeatedly brushing the easiest front teeth.</li><li><strong>Time:</strong> aim for about two minutes, twice a day, including last thing before bed.</li><li><strong>Pressure:</strong> a powered brush does the movement; forceful scrubbing is unnecessary.</li><li><strong>Head condition:</strong> worn, matted or frayed bristles are a reason to replace the head.</li><li><strong>Comfort:</strong> choose a handle, head and mode that make consistency realistic.</li></ul><div class=\"guide-note\"><p>If you have painful gums, persistent bleeding, loose teeth, sensitivity or ongoing dental treatment, ask a dentist or dental hygienist for advice tailored to you.</p></div>",
      },
      {
        heading: "Where Miroooo fits",
        content: "<p><a href=\"/products/miroooo-x\">Miroooo X1</a> and <a href=\"/products/miroooo-x2\">Miroooo X2</a> are sonic electric toothbrushes. X1 focuses on a lightweight routine with three modes. X2 adds pressure feedback, extended stated battery life and access to the free <a href=\"/smile-coach\">Smile Coach</a> routine tool. Compare the features honestly; the right model is the one whose guidance and feel suit your routine.</p>",
      },
    ],
    sources: [
      { title: "NHS: How to keep your teeth clean", url: "https://www.nhs.uk/live-well/healthy-teeth-and-gums/how-to-keep-your-teeth-clean/" },
      { title: "Cochrane: Powered versus manual toothbrushing for oral health", url: "https://www.cochrane.org/evidence/CD002281_poweredelectric-toothbrushes-compared-manual-toothbrushes-maintaining-oral-health" },
    ],
    disclaimer: "Sources last checked 1 September 2026. This general information is not a diagnosis or a substitute for advice from your dental professional.",
    aside: {
      card1: { title: "Compare the brushes", text: "See X1 and X2 features and pricing together.", linkText: "Visit the Miroooo shop →", linkUrl: "/shop" },
      card2: { title: "Next guide", text: "Make two minutes easier to repeat.", linkText: "Use a two-minute timer →", linkUrl: "/guides/how-to-use-two-minute-toothbrush-timer" },
    },
  },
  {
    slug: "how-often-replace-electric-toothbrush-head",
    title: "How often should you replace an electric toothbrush head?",
    metaTitle: "How Often to Replace an Electric Toothbrush Head | Miroooo",
    metaDescription: "Replace an electric toothbrush head every three to four months—or sooner when bristles are frayed. Learn the signs and build an easy reminder.",
    kicker: "Brush care",
    readTime: "5 min read",
    updatedDate: "1 September 2026",
    deck: "Use three to four months as the normal maximum—and let visible bristle wear bring the date forward.",
    shortAnswer: "The American Dental Association recommends replacing a toothbrush about every three to four months, or sooner if the bristles are visibly matted or frayed. Apply the same check to a removable electric toothbrush head.",
    sections: [
      {
        heading: "Why the date is only a guide",
        content: "<p>Three to four months is a useful routine, not a reason to ignore a visibly worn head. Bristles can spread or bend sooner depending on pressure, frequency of use and how the head is stored. Worn bristles are less effective, so check the head itself rather than relying only on the calendar.</p>",
      },
      {
        heading: "Four signs it is time for a new head",
        content: "<ol><li><strong>Frayed or splayed bristles:</strong> the bristles no longer keep their original shape.</li><li><strong>Matted tufts:</strong> individual groups of bristles look flattened or stuck together.</li><li><strong>Visible damage:</strong> the head, neck or attachment is cracked or distorted.</li><li><strong>Your scheduled replacement has arrived:</strong> even when wear is subtle, three to four months is a sensible upper interval.</li></ol>",
      },
      {
        heading: "A simple replacement routine",
        content: "<p>Fit the new head, then set a reminder for three months. Check the bristles during normal rinsing and replace earlier if they fray. The free <a href=\"/smile-coach\">Miroooo Smile Coach</a> includes local brush-care reminders, stored in your browser without requiring an account.</p>",
      },
      {
        heading: "How to care for the head between uses",
        content: "<ul><li>Rinse away toothpaste and debris after brushing.</li><li>Store the brush upright where the head can air-dry.</li><li>Avoid routinely sharing toothbrush heads.</li><li>Do not use a dishwasher or microwave to clean the head; high heat may damage it.</li></ul><div class=\"guide-note\"><p>A new head cannot correct forceful brushing. Let the powered movement do the work and ask a dentist or hygienist about technique if your bristles repeatedly splay much earlier than expected.</p></div>",
      },
      {
        heading: "Choosing the correct Miroooo head",
        content: "<p>Replacement heads are model-specific. <a href=\"/products/miroooo-x1-heads\">Miroooo X1 Heads</a> are designed for Miroooo X1, and <a href=\"/products/miroooo-x2-heads\">Miroooo X2 Heads</a> are engineered for Miroooo X2. If you are unsure which head fits your brush, contact <a href=\"/contact\">Miroooo support</a> before ordering.</p>",
      },
    ],
    sources: [
      { title: "American Dental Association: Toothbrushes", url: "https://www.ada.org/resources/ada-library/oral-health-topics/toothbrushes" },
    ],
    disclaimer: "Source last checked 1 September 2026. This general information is not a diagnosis or a substitute for advice from your dental professional.",
    aside: {
      card1: { title: "Miroooo X2 Heads", text: "Shop model-specific replacement heads.", linkText: "View Miroooo X2 Heads →", linkUrl: "/products/miroooo-x2-heads" },
      card2: { title: "Build the habit", text: "Use a free local reminder in Smile Coach.", linkText: "Open Smile Coach →", linkUrl: "/smile-coach" },
    },
  },
  {
    slug: "electric-toothbrush-travel-guide",
    title: "Electric toothbrush travel guide.",
    metaTitle: "Electric Toothbrush Travel Guide & Packing Checklist | Miroooo",
    metaDescription: "Pack an electric toothbrush for travel with a simple checklist for charging, ventilation, accidental activation and current lithium-battery guidance.",
    kicker: "Travel",
    readTime: "6 min read",
    updatedDate: "1 September 2026",
    deck: "Protect the head, prevent accidental activation and check the rules that apply to rechargeable devices before you fly.",
    shortAnswer: "Charge the handle, let the head dry, pack it in a ventilated protective case, prevent the power button being pressed, bring the correct cable and check your airline’s current rules for battery-powered devices.",
    sections: [
      {
        heading: "Before you leave",
        content: "<ol><li><strong>Check the charge.</strong> Long battery life helps, but charge before a longer trip instead of relying on a stated maximum.</li><li><strong>Clean and dry the head.</strong> Rinse it after use and give it time to air-dry before closing the case.</li><li><strong>Pack the right cable.</strong> Check the handle’s charging connection and the plug or USB supply available at your destination.</li><li><strong>Protect the switch.</strong> Use a fitted case or a secure position in your bag so pressure cannot activate the handle.</li></ol>",
      },
      {
        heading: "Can an electric toothbrush go on a plane?",
        content: "<p>Rechargeable toothbrushes are battery-powered portable electronic devices. The UK Civil Aviation Authority says portable devices with lithium batteries should be carried in hand baggage where possible; if a permitted device is placed in checked baggage, it should be completely switched off and protected from damage and accidental activation. IATA’s passenger guidance specifically includes electric toothbrushes among everyday lithium-powered items and advises protecting them in a case or pouch in hand luggage.</p><div class=\"guide-note\"><p>Airline, route and local rules can differ and can change. Check the airline’s current baggage page before travelling; its instructions take priority over a general packing guide.</p></div>",
      },
      {
        heading: "Keeping the brush head fresh",
        content: "<p>A sealed case is useful in transit, but do not leave a wet head closed for the entire trip. Let it air-dry upright when you arrive. Keep the bristles away from loose toiletries and the inside of a wash bag. If several people share a bathroom, keep individual heads separate and identifiable.</p>",
      },
      {
        heading: "Do you need to bring the charger?",
        content: "<p>Compare the length of your trip with the charge actually left in your handle, not only the maximum battery figure on a product page. A brush used twice daily may last through a short trip without its charger, while an older battery, frequent mode changes or an incomplete starting charge can reduce the margin.</p>",
      },
      {
        heading: "Travel-ready Miroooo options",
        content: "<p><a href=\"/products/miroooo-x\">Miroooo X1</a> includes a travel case and has stated battery life of more than 60 days. <a href=\"/products/miroooo-x2\">Miroooo X2</a> includes a travel case, USB-C charging and stated battery life of up to 90 days. These are product specifications, not a promise of identical real-world runtime for every pattern of use.</p>",
      },
    ],
    sources: [
      { title: "UK Civil Aviation Authority: What items can I travel with?", url: "https://www.caa.co.uk/air-passengers/about-your-trip/baggage/safety-advice-on-what-to-pack/" },
      { title: "IATA: Safe travel with lithium batteries", url: "https://www.iata.org/en/youandiata/travelers/batteries" },
    ],
    disclaimer: "Sources last checked 1 September 2026. Always confirm current requirements with your airline.",
    aside: {
      card1: { title: "Compare travel features", text: "See case, charging and battery details.", linkText: "Compare X1 and X2 →", linkUrl: "/shop" },
      card2: { title: "Care after the trip", text: "Know when the head needs changing.", linkText: "Replacement guide →", linkUrl: "/guides/how-often-replace-electric-toothbrush-head" },
    },
  },
  {
    slug: "how-to-use-two-minute-toothbrush-timer",
    title: "How to use a two-minute toothbrush timer.",
    metaTitle: "How to Use a Two-Minute Toothbrush Timer | Miroooo",
    metaDescription: "Use a two-minute electric toothbrush timer by splitting your mouth into four 30-second zones, while cleaning every outer, inner and chewing surface.",
    kicker: "Technique",
    readTime: "6 min read",
    updatedDate: "1 September 2026",
    deck: "A timer tells you how long you brushed. A four-zone routine helps make that time more evenly distributed.",
    shortAnswer: "Divide your mouth into upper right, upper left, lower right and lower left. Spend roughly 30 seconds in each zone, moving slowly across the outer, inner and chewing surfaces. The NHS recommends brushing with fluoride toothpaste twice a day for about two minutes, including last thing before bed.",
    table: {
      headers: ["Time", "Zone", "Focus"],
      rows: [
        ["0:00–0:30", "Upper right", "Outer, inner and chewing surfaces"],
        ["0:30–1:00", "Upper left", "Outer, inner and chewing surfaces"],
        ["1:00–1:30", "Lower right", "Outer, inner and chewing surfaces"],
        ["1:30–2:00", "Lower left", "Outer, inner and chewing surfaces"],
      ],
    },
    sections: [
      {
        heading: "The four-zone method",
        content: "<p>The 30-second split is an organising tool, not a requirement to abandon an area the instant the timer changes. Mouths differ. The goal is to avoid spending most of the session on the easy front surfaces while missing the inside and back areas.</p>",
      },
      {
        heading: "Step by step",
        content: "<ol><li>Apply fluoride toothpaste appropriate for you and place the head in your mouth before switching on.</li><li>Start in the same zone each time so the sequence becomes automatic.</li><li>Guide the powered head slowly. Do not try to add vigorous manual scrubbing.</li><li>Use each 30-second cue to move to the next zone.</li><li>After about two minutes, spit out excess toothpaste. NHS guidance says not to rinse immediately with water because that washes away concentrated fluoride left from the toothpaste.</li></ol>",
      },
      {
        heading: "What a timer cannot do",
        content: "<p>A timer cannot confirm that every surface was reached, that pressure was appropriate or that the brush head was in good condition. Treat it as a pacing aid. Pressure feedback can help with force, while a repeatable route helps coverage. If brushing causes persistent pain or bleeding, seek professional advice rather than relying on an app or mode change.</p>",
      },
      {
        heading: "Make the routine easier to repeat",
        content: "<ul><li>Brush last thing before bed and on one other occasion, as the NHS recommends.</li><li>Keep the brush and fluoride toothpaste visible and ready.</li><li>Use the same four-zone order morning and evening.</li><li>Replace a head when bristles fray, or around every three to four months.</li><li>Use a simple streak or reminder if consistency—not technique—is the main obstacle.</li></ul><div class=\"guide-note\"><p>The free <a href=\"/smile-coach\">Miroooo Smile Coach</a> provides guided two-minute sessions and a 28-day routine. It stores progress in your browser and does not claim to diagnose dental conditions or read sensor data from the brush.</p></div>",
      },
      {
        heading: "Which Miroooo brushes include pacing?",
        content: "<p>See the current timer, mode, pressure-feedback and battery details on the <a href=\"/products/miroooo-x\">Miroooo X1</a> and <a href=\"/products/miroooo-x2\">Miroooo X2</a> product pages, or use the side-by-side <a href=\"/shop\">Miroooo comparison</a>.</p>",
      },
    ],
    sources: [
      { title: "NHS: How to keep your teeth clean", url: "https://www.nhs.uk/live-well/healthy-teeth-and-gums/how-to-keep-your-teeth-clean/" },
      { title: "American Dental Association: Toothbrushes", url: "https://www.ada.org/resources/ada-library/oral-health-topics/toothbrushes" },
    ],
    disclaimer: "Sources last checked 1 September 2026. This general information is not a diagnosis or a substitute for advice from your dental professional.",
    aside: {
      card1: { title: "Start a guided session", text: "Use the free two-minute timer and local progress tracker.", linkText: "Open Smile Coach →", linkUrl: "/smile-coach" },
      card2: { title: "Choosing a brush", text: "Understand the two common powered movements.", linkText: "Sonic vs oscillating →", linkUrl: "/guides/sonic-vs-oscillating-electric-toothbrush" },
    },
  },
];
