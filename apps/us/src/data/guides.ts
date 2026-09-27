export interface GuideItem {
  slug: string;
  title: string;
  kicker: string;
  readTime: string;
  deck: string;
  meta: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  shortAnswer: string;
  contentHtml: string;
  nextGuideHref: string;
  nextGuideTitle: string;
}

export const GUIDES: Record<string, GuideItem> = {
  'sonic-vs-oscillating-electric-toothbrush': {
    slug: 'sonic-vs-oscillating-electric-toothbrush',
    title: 'Sonic vs oscillating electric toothbrushes.',
    kicker: 'Choosing a brush',
    readTime: '7 min read',
    deck: 'Both are powered brushes. The main difference is how the head moves—and neither movement replaces careful, twice-daily technique.',
    meta: 'Miroooo Editorial Team · Updated January 2026 · 7 min read',
    metaTitle: 'Sonic vs Oscillating Electric Toothbrushes | Miroooo',
    metaDescription: 'Compare sonic and oscillating electric toothbrushes: how they move, what research says, and which practical features matter most for daily brushing.',
    canonical: 'https://www.trymiroooo.com/guides/sonic-vs-oscillating-electric-toothbrush',
    shortAnswer: 'A sonic brush uses rapid side-to-side bristle movement, usually with a familiar elongated head. An oscillating-rotating brush uses a smaller round head that moves back and forth around each tooth. Both can clean effectively. The most useful choice is the brush you can guide comfortably for about two minutes, twice a day, using fluoride toothpaste.',
    contentHtml: `
      <h2>How the movements differ</h2>
      <p>“Sonic” describes rapid side-to-side movement. You guide the head slowly across the outer, inner and chewing surfaces of your teeth. “Oscillating-rotating” describes a round head that alternates direction; it is commonly held against one tooth area at a time before moving on.</p>
      <div class="overflow-x-auto my-6">
        <table class="w-full text-left border-collapse border border-white/10 rounded-xl">
          <thead>
            <tr class="bg-white/5 border-b border-white/10">
              <th class="p-3.5 text-xs font-bold uppercase text-white/60">Feature</th>
              <th class="p-3.5 text-xs font-bold uppercase text-white/90">Sonic</th>
              <th class="p-3.5 text-xs font-bold uppercase text-white/90">Oscillating-rotating</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-[13.5px]">
            <tr>
              <td class="p-3.5 font-medium text-white/70">Typical head shape</td>
              <td class="p-3.5 text-white">Elongated, similar to a manual brush</td>
              <td class="p-3.5 text-white/80">Small and round</td>
            </tr>
            <tr>
              <td class="p-3.5 font-medium text-white/70">Main movement</td>
              <td class="p-3.5 text-white">Rapid side-to-side bristle motion</td>
              <td class="p-3.5 text-white/80">Alternating rotational motion</td>
            </tr>
            <tr>
              <td class="p-3.5 font-medium text-white/70">How it is guided</td>
              <td class="p-3.5 text-white">Slowly along each surface</td>
              <td class="p-3.5 text-white/80">Placed around individual tooth areas</td>
            </tr>
            <tr>
              <td class="p-3.5 font-medium text-white/70">Useful preference</td>
              <td class="p-3.5 text-white">Familiar head shape and sweeping feel</td>
              <td class="p-3.5 text-white/80">Compact head and tooth-by-tooth pacing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>What does the evidence say?</h2>
      <p>A Cochrane review of powered versus manual brushes found moderate-quality evidence that powered brushes reduced plaque and gingivitis more than manual brushing across the studies it examined. More than half of the included studies used oscillating-rotating brushes, and the authors noted consistent benefits across long-term dental hygiene routines.</p>
      <p>The ADA (American Dental Association) notes that manual and electric toothbrushes are both effective at cleaning teeth when used with proper technique and fluoride toothpaste for two minutes twice daily.</p>
      <h2>What matters more than the motor type?</h2>
      <ul class="space-y-2 list-disc pl-5 my-4">
        <li><strong>Coverage:</strong> clean outer, inner and chewing surfaces instead of repeatedly brushing the easiest front teeth.</li>
        <li><strong>Time:</strong> aim for about two minutes, twice a day, including last thing before bed.</li>
        <li><strong>Pressure:</strong> a powered brush does the movement; forceful scrubbing is unnecessary.</li>
        <li><strong>Head condition:</strong> worn, matted or frayed bristles are a reason to replace the head.</li>
        <li><strong>Comfort:</strong> choose a handle, head and mode that make consistency realistic.</li>
      </ul>
      <h2>Where Miroooo fits</h2>
      <p><a href="/products/miroooo-x" class="text-white underline font-semibold">Miroooo X1</a> and <a href="/products/miroooo-x2" class="text-white underline font-semibold">Miroooo X2</a> are sonic electric toothbrushes. X1 focuses on a lightweight routine with three modes. X2 adds pressure feedback, extended stated battery life and access to the free <a href="/pages/smile-coach" class="text-white underline font-semibold">Smile Coach</a> routine tool.</p>
    `,
    nextGuideHref: '/guides/how-to-use-two-minute-toothbrush-timer',
    nextGuideTitle: 'Use a two-minute timer →',
  },

  'how-often-replace-electric-toothbrush-head': {
    slug: 'how-often-replace-electric-toothbrush-head',
    title: 'How often should you replace an electric toothbrush head?',
    kicker: 'Brush care',
    readTime: '5 min read',
    deck: 'Use three to four months as the normal maximum—and let visible bristle wear bring the date forward.',
    meta: 'Miroooo Editorial Team · Updated January 2026 · 5 min read',
    metaTitle: 'How Often to Replace an Electric Toothbrush Head | Miroooo',
    metaDescription: 'Replace an electric toothbrush head every three to four months—or sooner when bristles are frayed. Learn the signs and build an easy reminder.',
    canonical: 'https://www.trymiroooo.com/guides/how-often-replace-electric-toothbrush-head',
    shortAnswer: 'The American Dental Association recommends replacing a toothbrush about every three to four months, or sooner if the bristles are visibly matted or frayed. Apply the same check to a removable electric toothbrush head.',
    contentHtml: `
      <h2>Why the date is only a guide</h2>
      <p>Three to four months is a useful routine, not a reason to ignore a visibly worn head. Bristles can spread or bend sooner depending on pressure, frequency of use and how the head is stored. Worn bristles are less effective, so check the head itself rather than relying only on the calendar.</p>
      <h2>Four signs it is time for a new head</h2>
      <ol class="space-y-2 list-decimal pl-5 my-4">
        <li><strong>Frayed or splayed bristles:</strong> the bristles no longer keep their original shape.</li>
        <li><strong>Matted tufts:</strong> individual groups of bristles look flattened or stuck together.</li>
        <li><strong>Visible damage:</strong> the head, neck or attachment is cracked or distorted.</li>
        <li><strong>Your scheduled replacement has arrived:</strong> even when wear is subtle, three to four months is a sensible upper interval.</li>
      </ol>
      <h2>A simple replacement routine</h2>
      <p>Fit the new head, then set a reminder for three months. Check the bristles during normal rinsing and replace earlier if they fray. The free <a href="/pages/smile-coach" class="text-white underline font-semibold">Miroooo Smile Coach</a> includes local brush-care reminders, stored in your browser without requiring an account.</p>
      <h2>How to care for the head between uses</h2>
      <ul class="space-y-2 list-disc pl-5 my-4">
        <li>Rinse away toothpaste and debris after brushing.</li>
        <li>Store the brush upright where the head can air-dry.</li>
        <li>Avoid routinely sharing toothbrush heads.</li>
        <li>Do not use a dishwasher or microwave to clean the head; high heat may damage it.</li>
      </ul>
      <h2>Choosing the correct Miroooo head</h2>
      <p>Replacement heads are model-specific. <a href="/products/miroooo-x1-heads" class="text-white underline font-semibold">Miroooo X1 Heads</a> are designed for Miroooo X1, and <a href="/products/miroooo-x2-heads" class="text-white underline font-semibold">Miroooo X2 Heads</a> are engineered for Miroooo X2.</p>
    `,
    nextGuideHref: '/guides/electric-toothbrush-travel-guide',
    nextGuideTitle: 'Traveling with a brush →',
  },

  'how-to-use-two-minute-toothbrush-timer': {
    slug: 'how-to-use-two-minute-toothbrush-timer',
    title: 'How to use a two-minute toothbrush timer.',
    kicker: 'Technique',
    readTime: '6 min read',
    deck: 'A timer tells you how long you brushed. A four-zone routine helps make that time more evenly distributed.',
    meta: 'Miroooo Editorial Team · Updated January 2026 · 6 min read',
    metaTitle: 'How to Use a Two-Minute Toothbrush Timer | Miroooo',
    metaDescription: 'Use a two-minute electric toothbrush timer by splitting your mouth into four 30-second zones, while cleaning every outer, inner and chewing surface.',
    canonical: 'https://www.trymiroooo.com/guides/how-to-use-two-minute-toothbrush-timer',
    shortAnswer: 'Divide your mouth into upper right, upper left, lower right and lower left. Spend roughly 30 seconds in each zone, moving slowly across the outer, inner and chewing surfaces. Dental guidance recommends brushing with fluoride toothpaste twice a day for about two minutes, including before bed.',
    contentHtml: `
      <h2>The four-zone method</h2>
      <div class="overflow-x-auto my-6">
        <table class="w-full text-left border-collapse border border-white/10 rounded-xl">
          <thead>
            <tr class="bg-white/5 border-b border-white/10">
              <th class="p-3.5 text-xs font-bold uppercase text-white/60">Time</th>
              <th class="p-3.5 text-xs font-bold uppercase text-white/90">Zone</th>
              <th class="p-3.5 text-xs font-bold uppercase text-white/90">Focus</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-[13.5px]">
            <tr>
              <td class="p-3.5 font-medium text-white/70">0:00–0:30</td>
              <td class="p-3.5 text-white">Upper right</td>
              <td class="p-3.5 text-white/80">Outer, inner and chewing surfaces</td>
            </tr>
            <tr>
              <td class="p-3.5 font-medium text-white/70">0:30–1:00</td>
              <td class="p-3.5 text-white">Upper left</td>
              <td class="p-3.5 text-white/80">Outer, inner and chewing surfaces</td>
            </tr>
            <tr>
              <td class="p-3.5 font-medium text-white/70">1:00–1:30</td>
              <td class="p-3.5 text-white">Lower right</td>
              <td class="p-3.5 text-white/80">Outer, inner and chewing surfaces</td>
            </tr>
            <tr>
              <td class="p-3.5 font-medium text-white/70">1:30–2:00</td>
              <td class="p-3.5 text-white">Lower left</td>
              <td class="p-3.5 text-white/80">Outer, inner and chewing surfaces</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Step by step</h2>
      <ol class="space-y-2 list-decimal pl-5 my-4">
        <li>Apply fluoride toothpaste appropriate for you and place the head in your mouth before switching on.</li>
        <li>Start in the same zone each time so the sequence becomes automatic.</li>
        <li>Guide the powered head slowly. Do not try to add vigorous manual scrubbing.</li>
        <li>Use each 30-second cue to move to the next zone.</li>
        <li>After about two minutes, spit out excess toothpaste. Avoid immediately rinsing away the protective fluoride barrier.</li>
      </ol>
      <h2>What a timer cannot do</h2>
      <p>A timer cannot confirm that every surface was reached, that pressure was appropriate or that the brush head was in good condition. Treat it as a pacing aid. Pressure feedback can help with force, while a repeatable route helps coverage.</p>
    `,
    nextGuideHref: '/guides/sonic-vs-oscillating-electric-toothbrush',
    nextGuideTitle: 'Sonic vs oscillating →',
  },

  'electric-toothbrush-travel-guide': {
    slug: 'electric-toothbrush-travel-guide',
    title: 'Electric toothbrush travel guide.',
    kicker: 'Travel',
    readTime: '6 min read',
    deck: 'Protect the head, prevent accidental activation and check the rules that apply to rechargeable devices before you fly.',
    meta: 'Miroooo Editorial Team · Updated January 2026 · 6 min read',
    metaTitle: 'Electric Toothbrush Travel Guide & Packing Checklist | Miroooo',
    metaDescription: 'Pack an electric toothbrush for travel with a simple checklist for charging, ventilation, accidental activation and current lithium-battery guidance.',
    canonical: 'https://www.trymiroooo.com/guides/electric-toothbrush-travel-guide',
    shortAnswer: 'Charge the handle, let the head dry, pack it in a ventilated protective case, prevent the power button being pressed, bring the correct cable and check your airline’s current rules for battery-powered devices.',
    contentHtml: `
      <h2>Before you leave</h2>
      <ol class="space-y-2 list-decimal pl-5 my-4">
        <li><strong>Check the charge:</strong> Long battery life helps, but charge before a longer trip instead of relying on a stated maximum.</li>
        <li><strong>Clean and dry the head:</strong> Rinse it after use and give it time to air-dry before closing the case.</li>
        <li><strong>Pack the right cable:</strong> Check the handle’s charging connection and the USB power supply available at your destination.</li>
        <li><strong>Protect the switch:</strong> Use a fitted case or a secure position in your bag so pressure cannot activate the handle.</li>
      </ol>
      <h2>Can an electric toothbrush go on a plane?</h2>
      <p>Rechargeable toothbrushes are battery-powered electronic devices. The FAA and TSA permit electric toothbrushes in both carry-on and checked baggage, recommending carry-on luggage for devices with integrated lithium batteries.</p>
      <h2>Keeping the brush head fresh</h2>
      <p>A sealed case is useful in transit, but do not leave a wet head closed for the entire trip. Let it air-dry upright when you arrive. Keep the bristles away from loose toiletries and the inside of a dopp kit.</p>
      <h2>Travel-ready Miroooo options</h2>
      <p><a href="/products/miroooo-x" class="text-white underline font-semibold">Miroooo X1</a> includes a travel case and has stated battery life of more than 60 days. <a href="/products/miroooo-x2" class="text-white underline font-semibold">Miroooo X2</a> includes a travel case, USB-C charging and stated battery life of up to 90 days.</p>
    `,
    nextGuideHref: '/guides/how-often-replace-electric-toothbrush-head',
    nextGuideTitle: 'Replacement guide →',
  },
};

export function getAllGuides(): GuideItem[] {
  return Object.values(GUIDES);
}

export function getGuide(slug: string): GuideItem | undefined {
  return GUIDES[slug];
}
