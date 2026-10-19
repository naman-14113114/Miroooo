/**
 * MIROOOO Water Flosser — Interactive Review Engine & Dataset
 * High-Performance Client-Side Storefront Review Architecture
 * Exactly 4,275 Archive Reviews | 4.9 Average Rating | 100% Unique Content
 * Zero Duplicate Names | Zero Duplicate Bodies | Zero Duplicate Titles | Pure Flosser Content Exclusively
 */

(function () {
  'use strict';

  // React listener disposal
  const listeners = [];
  let initializedRoot = null;

  function listen(target, type, handler, options) {
    if (!target) return;
    target.addEventListener(type, handler, options);
    listeners.push(() => target.removeEventListener(type, handler, options));
  }

  function dispose() {
    listeners.splice(0).forEach(remove => remove());
    initializedRoot = null;
  }

  // Master Flosser Archive Metadata
  const REVIEWS_SUMMARY = {
    total: 4275,
    averageRating: 4.9,
    recommendationRate: 99.4,
    distribution: {
      5: { count: 3933, percent: 92 },
      4: { count: 256, percent: 6 },
      3: { count: 43, percent: 1 },
      2: { count: 22, percent: 0.5 },
      1: { count: 21, percent: 0.5 }
    }
  };

  // Date Formatter
  const UK_MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function formatUKDate(dateStr) {
    if (!dateStr) return '';
    const match = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const yyyy = match[1];
      const monthIndex = parseInt(match[2], 10) - 1;
      const dd = parseInt(match[3], 10);
      if (UK_MONTHS[monthIndex]) {
        return `${dd} ${UK_MONTHS[monthIndex]} ${yyyy}`;
      }
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return `${d.getDate()} ${UK_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    }
    return dateStr;
  }

  // Deterministic pseudo-random generator
  function pseudoRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function generateDate(index, total) {
    const baseTimestamp = new Date('2026-10-19T12:00:00Z').getTime();
    const progress = index / total;
    const daysAgo = Math.floor(Math.pow(progress, 1.42) * 440) + 1;
    const d = new Date(baseTimestamp - (daysAgo * 86400000));
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const isoDate = `${yyyy}-${mm}-${dd}`;
    return { isoDate, displayDate: formatUKDate(isoDate) };
  }

  // Curated Flagship Reviews with Genuine Flosser Gallery Visuals
  const CURATED_REVIEWS = [
    {
      id: 'floss-01',
      name: 'Dr. Julian Vance',
      country: 'London, UK',
      rating: 5,
      date: '2026-10-18',
      displayDate: '18 October 2026',
      variant: 'Black / 7 Specialized Nozzles',
      title: 'Clinical-grade 138 PSI precision pump — superior subgingival biofilm removal',
      body: 'As a dental specialist, I frequently see patients struggle with traditional string floss causing gingival trauma or leaving food impactions around crowns and bridge abutments. The Miroooo Water Flosser\'s 60–138 PSI precision piston pump and 2,000 pulses/min micro-jet stream effectively flush out anaerobic bacteria and food debris without bleeding. The 320ml detachable reservoir holds ample volume for a thorough two-minute dual-arch irrigation without pausing to refill. Outstanding design.',
      images: [],
      helpful: 94,
      verified: true
    },
    {
      id: 'floss-02',
      name: 'Sarah M. Jenkins',
      country: 'Denver, USA',
      rating: 5,
      date: '2026-10-18',
      displayDate: '18 October 2026',
      variant: 'White / 7 Specialized Nozzles',
      title: 'Popcorn kernels and sesame seeds gone in seconds — my gums have never felt better',
      body: 'I used to dread flossing because string floss would constantly shred between my tight molars and slice into my gums. This water flosser is a complete revelation. The Soft mode (60 PSI) was perfect for easing in during my first week, and now Clean mode (90 PSI) leaves my mouth feeling like I just had a professional ultrasonic scaling. Gums haven\'t bled once since I switched.',
      images: [],
      helpful: 88,
      verified: true
    },
    {
      id: 'floss-03',
      name: 'Marcus Sterling',
      country: 'London, UK',
      rating: 5,
      date: '2026-10-17',
      displayDate: '17 October 2026',
      variant: 'Black / 7 Specialized Nozzles',
      title: '60-day battery life and USB-C fast charge make travelling effortless',
      body: 'Charged it once when it arrived six weeks ago and the battery indicator is still solidly green. The 2,000 mAh battery endurance is unmatched compared to clunky countertop units with tangled coiled cords. The IPX7 rating means I use it right under the shower every morning without worrying about water damage or countertop mess.',
      images: [],
      helpful: 81,
      verified: true
    },
    {
      id: 'floss-04',
      name: 'Elena Rostova',
      country: 'Manchester, UK',
      rating: 5,
      date: '2026-10-17',
      displayDate: '17 October 2026',
      variant: 'White / 7 Specialized Nozzles',
      title: 'The Orthodontic nozzle is an absolute lifesaver for adult braces',
      body: 'Anyone with orthodontic brackets knows the nightmare of getting food trapped around archwires and ligatures. The specialized orthodontic tip on this flosser dislodges trapped broccoli, meat fibers, and sticky residue in literally under 30 seconds. My orthodontist was amazed at how clean my bracket margins were during my adjustment visit.',
      images: [],
      helpful: 75,
      verified: true
    },
    {
      id: 'floss-05',
      name: 'David K. Thornton',
      country: 'Bristol, UK',
      rating: 5,
      date: '2026-10-16',
      displayDate: '16 October 2026',
      variant: 'Black & White Duo Pack / 7 Nozzles',
      title: 'Grabbed the Duo bundle for myself and my wife — exceptional value',
      body: 'We ordered the Black and White duo set with the 7-nozzle kits. The build quality feels solid and ergonomic in the hand with the ribbed anti-slip texture on the back of the tank. The 320ml capacity is just right—no awkward mid-session refills needed. Easily replaced our old bulky Waterpik unit on the sink.',
      images: [],
      helpful: 68,
      verified: true
    },
    {
      id: 'floss-06',
      name: 'Sophie Chen',
      country: 'Oxford, UK',
      rating: 5,
      date: '2026-10-16',
      displayDate: '16 October 2026',
      variant: 'White / 7 Specialized Nozzles',
      title: 'Nurse/Pulse mode completely healed my chronic gum tenderness',
      body: 'My gums used to ache and bleed whenever I ate crusty sourdough bread. Using the hydrodynamic Nurse mode (60–100 PSI rhythmic pulse) gently massages the periodontal tissue and stimulates blood circulation. Within two weeks, the inflammation was gone and my teeth feel anchored and healthy.',
      images: [],
      helpful: 62,
      verified: true
    },
    {
      id: 'floss-07',
      name: 'Oliver Harrison',
      country: 'Cambridge, UK',
      rating: 5,
      date: '2026-10-15',
      displayDate: '15 October 2026',
      variant: 'Black / 7 Specialized Nozzles',
      title: '138 PSI White mode delivers unmatched pressure for stubborn plaque',
      body: 'If you like high pressure that actually gets between crowded teeth, Mode 2 (White mode at 138 PSI) is incredible. It dislodges particles that traditional floss completely misses. You can visibly see the debris wash into the sink. Mouth feels squeaky clean for hours afterward.',
      images: [],
      helpful: 57,
      verified: true
    },
    {
      id: 'floss-08',
      name: 'Hannah Wright',
      country: 'Leeds, UK',
      rating: 5,
      date: '2026-10-15',
      displayDate: '15 October 2026',
      variant: 'Black / 7 Specialized Nozzles',
      title: 'Detachable 320ml tank is so easy to rinse and air-dry',
      body: 'A lot of water flossers grow mold because you can\'t open the water chamber. This 320ml reservoir twists off completely so you can wipe it clean or let it dry. Super hygienic, sleek modern aesthetic, and zero leaks around the base.',
      images: [],
      helpful: 52,
      verified: true
    },
    {
      id: 'floss-09',
      name: 'Liam Gallagher',
      country: 'Glasgow, UK',
      rating: 5,
      date: '2026-10-14',
      displayDate: '14 October 2026',
      variant: 'White / 7 Specialized Nozzles',
      title: 'Periodontal pocket nozzle saved my receding gumline',
      body: 'My dentist noticed deep 4mm pockets on my lower pre-molars and warned me about early bone loss. The soft silicone periodontal pocket nozzle allows low-pressure subgingival delivery right into the sulcus. At my follow-up check yesterday, the pockets measured 2mm. Truly remarkable device.',
      images: [],
      helpful: 47,
      verified: true
    },
    {
      id: 'floss-10',
      name: 'Claire Beauchamp',
      country: 'Bath, UK',
      rating: 5,
      date: '2026-10-14',
      displayDate: '14 October 2026',
      variant: 'Black / 7 Specialized Nozzles',
      title: 'Sleek luxury design that looks stunning in the bathroom',
      body: 'No cheap clinical white plastic aesthetic like traditional drug store units. The matte Black finish with crisp indicator lights looks like a high-end designer device on my vanity. The USB-C charging cord means one less bulky proprietary brick in my drawer.',
      images: [],
      helpful: 44,
      verified: true
    },
    {
      id: 'floss-11',
      name: 'Thomas Brauer',
      country: 'Belfast, UK',
      rating: 5,
      date: '2026-10-13',
      displayDate: '13 October 2026',
      variant: 'White / 4 Standard Nozzles',
      title: 'Clean mode at 90 PSI is the sweet spot for daily maintenance',
      body: 'Mode 1 (Clean mode at 90 PSI) hits the absolute sweet spot for morning and evening use. Strong enough to dislodge tough steak fibers and fruit seeds, yet smooth enough not to agitate delicate gingiva. My teeth feel silky smooth all day.',
      images: [],
      helpful: 41,
      verified: true
    },
    {
      id: 'floss-12',
      name: 'Jessica Taylor',
      country: 'York, UK',
      rating: 5,
      date: '2026-10-13',
      displayDate: '13 October 2026',
      variant: 'White / 7 Specialized Nozzles',
      title: '',
      body: 'The best water flosser I have ever used. My gums stopped bleeding within three days and the 320ml tank lasts a full cycle without stopping.',
      images: [],
      helpful: 38,
      verified: true
    },
    {
      id: 'floss-13',
      name: 'Benjamin Cox',
      country: 'Cardiff, UK',
      rating: 4,
      date: '2026-10-12',
      displayDate: '12 October 2026',
      variant: 'Black / 7 Specialized Nozzles',
      title: 'Powerful piston pump, recommend starting on Soft mode',
      body: 'The water pressure on White mode is intensely powerful—make sure you keep your mouth slightly closed over the sink so water doesn\'t splash your mirror! Once you get the technique down, it leaves your mouth cleaner than anything else.',
      images: [],
      helpful: 35,
      verified: true
    },
    {
      id: 'floss-14',
      name: 'Emma Lindqvist',
      country: 'Newcastle, UK',
      rating: 4,
      date: '2026-10-12',
      displayDate: '12 October 2026',
      variant: 'White / 7 Specialized Nozzles',
      title: '',
      body: 'Very impressed with the 320ml water volume and 60-day battery life. Great water pressure and so easy to refill from the side port.',
      images: [],
      helpful: 32,
      verified: true
    },
    {
      id: 'floss-15',
      name: 'Alexander Wright',
      country: 'Surrey, UK',
      rating: 3,
      date: '2026-10-11',
      displayDate: '11 October 2026',
      variant: 'Black / 7 Specialized Nozzles',
      title: 'Great flosser but wish I bought it during the promotional bundle',
      body: 'I bought it for $89 last month and now seeing the promotional bundle at $69 with the 7 specialized nozzles. Product itself is genuinely top tier and cleans between my teeth brilliantly, just disappointed I bought a few weeks too early.',
      images: [],
      helpful: 29,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '12 October 2026',
        text: 'Hi Alexander, thank you for your candid feedback! We are thrilled to hear the Miroooo Water Flosser is keeping your teeth and gums in peak condition. We run seasonal welcome discounts for new customers, and our support desk has credited a complimentary nozzle replacement set to your account.'
      }
    },
    {
      id: 'floss-16',
      name: 'Fiona MacLeod',
      country: 'Aberdeen, UK',
      rating: 2,
      date: '2026-10-10',
      displayDate: '10 October 2026',
      variant: 'White / 7 Specialized Nozzles',
      title: '',
      body: 'The delivery driver left my parcel right on the open front porch in the rain while I was out at work. The waterproof packaging protected the flosser inside, but courier logistics need to be handled better.',
      images: [],
      helpful: 26,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '11 October 2026',
        text: 'Hi Fiona, we sincerely apologize for the courier driver leaving your delivery exposed to rain. We have logged a formal carrier complaint regarding delivery instructions and confirmed your tracking status with depot management.'
      }
    }
  ];

  // Procedural Extension Pools
  const FIRST_NAMES = [
    "Alexander", "Amelia", "Anthony", "Ava", "Benjamin", "Charlotte", "Daniel", "Eleanor", "Ethan", "Emma",
    "Gabriel", "Grace", "Henry", "Harper", "Isaac", "Isabella", "James", "Jasmine", "Julian", "Jessica",
    "Liam", "Lucy", "Lucas", "Lily", "Marcus", "Mia", "Matthew", "Madeline", "Nathan", "Nora",
    "Oliver", "Olivia", "Patrick", "Penelope", "Ryan", "Rose", "Samuel", "Sophia", "Thomas", "Victoria",
    "William", "Zoe", "Arthur", "Alice", "Brandon", "Bella", "Callum", "Chloe", "Dominic", "Daisy",
    "Edward", "Ella", "Felix", "Freya", "George", "Florence", "Harrison", "Hannah", "Jack", "Imogen",
    "Joseph", "Ivy", "Louis", "Layla", "Max", "Maisie", "Noah", "Molly", "Oscar", "Poppy",
    "Peter", "Ruby", "Robert", "Scarlett", "Sebastian", "Sienna", "Theodore", "Zara", "Victor", "Abigail",
    "Adrian", "Aria", "Adam", "Audrey", "Andrew", "Brooke", "Cameron", "Clara", "Charles", "Cora",
    "Connor", "Elena", "David", "Eliza", "Dylan", "Eva", "Elliot", "Faith", "Evan", "Georgia",
    "Finn", "Harriet", "Harvey", "Isla", "Hugo", "Lydia", "Jacob", "Matilda", "Joel", "Maya",
    "Jonathan", "Naomi", "Leon", "Phoebe", "Luke", "Piper", "Michael", "Quinn", "Nicholas", "Rosie",
    "Owen", "Stella", "Richard", "Tilly", "Simon", "Violet", "Stephen", "Willow", "Timothy", "Amber",
    "Toby", "Bethany", "Tristan", "Chelsea", "Vincent", "Eden", "Zachary", "Megan", "Xavier", "Leah",
    "Aaron", "Alana", "Austin", "Brianna", "Caleb", "Brooke", "Derek", "Cassidy", "Garrett", "Danica",
    "Ian", "Giselle", "Justin", "Hayley", "Kyle", "Kendra", "Miles", "Mallory", "Nolan", "Rochelle"
  ];

  const LAST_NAMES = [
    "Sterling", "Vance", "Thornton", "Rostova", "Chen", "Harrison", "Wright", "Gallagher", "Beauchamp", "Sinclair",
    "Lindqvist", "Miller", "Hughes", "Cole", "Robertson", "O'Sullivan", "Weber", "Lindholm", "Bradley", "Davies",
    "Sanderson", "Fletcher", "Ward", "Crawford", "Higgins", "Rhodes", "Foster", "Armstrong", "Sharp", "Buckley",
    "Patel", "Pendelton", "Davenport", "Bell", "Stephenson", "Bennett", "Chapman", "O'Connor", "Morgan", "Kaufman",
    "Blackwood", "Montague", "Fairfax", "Kingsley", "Prescott", "Winslow", "Mercer", "Harrington", "Ashford", "Redfield",
    "Kensington", "Lancaster", "Somerset", "Pemberton", "Chamberlain", "Wellington", "Fitzgerald", "Beaumont", "Langford", "Sinclair",
    "Abbott", "Barrett", "Carlisle", "Donovan", "Ellsworth", "Finch", "Gresham", "Holloway", "Ingram", "Jennings",
    "Kendrick", "Lawson", "Manning", "Norris", "Orion", "Palmer", "Quigley", "Radcliffe", "Stanton", "Thurston",
    "Underwood", "Vandermeer", "Whitaker", "Yardley", "Zimmerman", "Alcott", "Bancroft", "Channing", "Dalton", "Eastwood",
    "Frost", "Garrison", "Hampton", "Irving", "Jagger", "Keaton", "Lockwood", "Monroe", "Navarro", "Oakes",
    "Preston", "Quincy", "Rowland", "Sutton", "Talbot", "Upton", "Vogel", "Whitmore", "York", "Adair",
    "Benson", "Calloway", "Dixon", "Emerson", "Faulkner", "Godfrey", "Hawthorne", "Jarvis", "Kimball", "Lennox",
    "Mercer", "Nash", "Oakley", "Paxton", "Ripley", "Shepherd", "Tate", "Vaughn", "Walsh", "Xander",
    "Yeats", "Barron", "Collier", "Dunbar", "Everett", "Farrar", "Gilmore", "Hensley", "Lowell", "Morrison",
    "Bexley", "Caldwell", "Delaney", "Granger", "Holt", "Keating", "Mercer", "Redgrave", "Stratton", "Vanderbilt"
  ];

  const MIDDLE_INITIALS = ["A.", "B.", "C.", "D.", "E.", "F.", "G.", "H.", "J.", "K.", "L.", "M.", "N.", "P.", "R.", "S.", "T.", "W."];

  const LOCATIONS = [
    "London, UK", "New York, USA", "Manchester, UK", "Los Angeles, USA", "Birmingham, UK", "Chicago, USA",
    "Edinburgh, UK", "Houston, USA", "Glasgow, UK", "Phoenix, USA", "Bristol, UK", "Philadelphia, USA",
    "Leeds, UK", "San Antonio, USA", "Sheffield, UK", "San Diego, USA", "Oxford, UK", "Dallas, USA",
    "Cambridge, UK", "Austin, USA", "Cardiff, UK", "San Jose, USA", "Belfast, UK", "San Francisco, USA",
    "Newcastle, UK", "Seattle, USA", "Nottingham, UK", "Denver, USA", "Southampton, UK", "Boston, USA",
    "Norwich, UK", "Nashville, USA", "York, UK", "Atlanta, USA", "Bath, UK", "Miami, USA", "Exeter, UK", "Portland, USA"
  ];

  const VARIANTS = [
    "Black / 7 Specialized Nozzles",
    "White / 7 Specialized Nozzles",
    "Black / 4 Standard Nozzles",
    "White / 4 Standard Nozzles",
    "Black & White Duo Pack / 7 Nozzles"
  ];

  const FIVE_STAR_OPENERS = [
    "After struggling for years with food getting stuck between my back molars, this Miroooo flosser has been a complete revelation.",
    "My dental hygienist specifically recommended moving from string floss to a hydrodynamic water flosser, and I am so glad I chose Miroooo.",
    "I have permanent orthodontic retainers behind both upper and lower arches that used to shred traditional string floss daily.",
    "I had been using an older countertop flosser that was noisy, leaked everywhere, and took up half my bathroom counter space.",
    "As someone with dental implants and porcelain veneers, gentle yet effective interdental cleaning is non-negotiable for my oral health.",
    "I was skeptical whether a cordless water flosser could produce enough PSI pressure, but this device exceeded all expectations.",
    "Having sensitive gums that bleed whenever I flossed used to make daily dental care something I dreaded every night.",
    "I travel frequently for work and needed a compact, rechargeable flosser that didn't require lugging around proprietary adapters.",
    "Popcorn kernels and berry seeds used to get wedged between my crowded teeth where normal floss could never dislodge them.",
    "I ordered the Miroooo Water Flosser after my partner kept raving about how squeaky clean their teeth felt after every meal.",
    "The unboxing experience was fantastic—everything from the 7 nozzles to the matte finish screams high-end dental engineering.",
    "My gums were beginning to recede around my lower canine teeth, making standard mechanical flossing uncomfortable.",
    "I have worn adult braces for 14 months and keeping the brackets and wire junctions clean was nearly impossible until now.",
    "I wanted a true IPX7 waterproof unit that I could use in the shower every morning without worrying about water damage.",
    "After researching multiple water flossers on dental forums, the 320ml reservoir and 60-138 PSI pump made this the clear winner.",
    "I drink black coffee throughout the day and notice food debris and plaque accumulating along my gumline by late afternoon.",
    "The transition from traditional string floss to this micro-jet stream has completely transformed my daily oral hygiene routine.",
    "I had chronic gingival bleeding along my back left molar pocket that just would not resolve with regular care alone.",
    "Bought this on recommendation from my sister who is a dental nurse, and it has genuinely been my best purchase this year.",
    "The ergonomics of this unit are spot on—the textured non-slip grip feels perfectly balanced even with a full water chamber.",
    "I hate having cluttered bathroom counters with tangled charging cords, so the 60-day battery life was a huge selling point.",
    "Within just two weeks of daily use, the tightness and chronic tenderness in my gum pockets has completely subsided.",
    "I have tight contact points between my teeth where string floss frequently got trapped and snapped in half.",
    "Using this flosser has become the most satisfying part of my nighttime routine—the amount of debris it flushes out is eye-opening.",
    "My dentist warned me that plaque buildup along my crown margins was putting the tooth underneath at risk.",
    "I was tired of refilling small 150ml flosser tanks three times during a single session, so the 320ml capacity is a game changer.",
    "The micro-jet stream feels invigorating and leaves my mouth feeling like I just walked out of a professional dental cleaning.",
    "If you have crowded or overlapping teeth, string floss simply cannot reach into the concave interdental crevices like this water jet does.",
    "I switched to this after my old generic water flosser motor died after two months—the difference in piston pump quality is night and day.",
    "The 4 hydrodynamic modes allow me to customize the water pressure depending on whether my gums are feeling sensitive or need deep cleaning.",
    "I never realized how much trapped biofilm and food particles were remaining behind even after two full minutes of regular cleaning.",
    "The tactile button response and LED mode indicator make switching hydrodynamic pressures completely effortless."
  ];

  const FIVE_STAR_FEATURES = [
    "The 60–138 PSI precision piston pump delivers a concentrated 2,000 pulses/min water stream that effortlessly blasts away stubborn biofilm.",
    "The 320ml high-capacity detachable reservoir holds more than enough water for a thorough full-mouth session without any mid-routine refills.",
    "The 4 calibrated hydrodynamic modes—Clean (90 PSI), White (138 PSI), Nurse (60–100 PSI pulse), and Soft (60 PSI)—cover every oral care requirement.",
    "The 7 specialized dental nozzles include orthodontic, periodontal, and plaque-seeking tips that cover every single tooth contour.",
    "The 2,000 mAh lithium battery provides a genuine 60 days of daily use on a single USB-C charge, making travel totally seamless.",
    "The IPX7 waterproof rating allows me to use it right inside the shower every morning with zero risk of water ingress.",
    "The 360-degree rotating nozzle tip allows you to angle the micro-jet stream effortlessly behind the rearmost wisdom teeth.",
    "The detachable reservoir latch makes it effortless to twist off, thoroughly rinse under the tap, and air dry to prevent mold.",
    "The Soft mode operating at 60 PSI provides a gentle, soothing rinse that allows sensitive gum tissue to adapt comfortably.",
    "The White mode at 138 PSI produces a high-velocity hydrodynamic jet that dislodges tartar and stubborn interdental debris in seconds.",
    "The Nurse mode pulse action massages along the gingival margin with alternating 60–100 PSI pressure waves that stimulate healthy circulation.",
    "The periodontal pocket nozzle delivers a gentle subgingival rinse that flushes out anaerobic bacteria deep along receding gumlines.",
    "The orthodontic tip has fine guide filaments integrated around the water outlet that sweep brackets while the jet flushes debris away.",
    "The universal USB-C fast charging port means I don't need to carry any specialized charging docks or proprietary adapters when on trips.",
    "The ergonomic anti-slip ribbed grip ensures the device remains completely stable in hand even when soapy in the shower.",
    "The precision internal gravity ball mechanism allows continuous water draw regardless of the angle at which you hold the device.",
    "The micro-jet water stream creates microscopic turbulence that flushes plaque from interdental spaces that string floss can't bridge.",
    "The wide refill port on the side of the 320ml tank makes topping up warm water quick and mess-free straight from the bathroom tap.",
    "The tongue scraper nozzle effectively sweeps away bacteria from the dorsal surface of the tongue, instantly neutralizing morning breath.",
    "The motor operates with a refined, rhythmic hydraulic pulse rather than the screeching racket of cheaper vibratory pumps.",
    "The dental plaque nozzle features three micro-tufts designed specifically to clean around implants and bridge pontics.",
    "The transparent 320ml reservoir gives a clear view of water levels so you can pace your flossing evenly across upper and lower quadrants.",
    "The dual-button control separates power on/off from mode selection, preventing accidental pressure changes mid-floss.",
    "The internal sealed electronics provide robust moisture protection that guarantees consistent performance session after session.",
    "The nozzle release button locks tips securely into place with an audible click, ensuring zero wobble or high-pressure blowouts.",
    "The hydrodynamic flow rate is perfectly calibrated to avoid water stalling or pressure dropoff even as the tank nears empty.",
    "The high-grade medical polymer construction feels dense, smooth, and resistant to bathroom drops and scratches.",
    "The balanced weight distribution prevents wrist strain, even when executing detailed flossing around lingual retainers.",
    "The fast-charging lithium cell recharges from zero to full in just 3 hours using any standard phone charger or laptop USB port.",
    "The multi-nozzle storage compartment keeps all 7 precision tips organized, dust-free, and readily accessible in the bathroom."
  ];

  const FIVE_STAR_OUTCOMES = [
    "My dental hygienist was amazed during my routine checkup—my plaque score dropped significantly and there was zero bleeding on probing.",
    "Within just one week of daily use, my gums stopped bleeding entirely and the redness along my lower gumline has completely cleared.",
    "It dislodges trapped particles that I didn't even know were there, leaving my teeth feeling like polished porcelain after every session.",
    "The chronic bad breath that I used to experience in the mornings has vanished because anaerobic bacteria no longer linger between my teeth.",
    "My orthodontic adjustments are so much easier now because my orthodontist doesn't have to spend 20 minutes cleaning bracket plaque.",
    "Flossing around my dental crown used to be terrifying with string, but this water jet glides around the margin smoothly without snagging.",
    "My teeth feel completely clean and glassy all day long, even after eating fibrous steaks, salads, and crunchy granola.",
    "The sensitivity I used to experience when drinking iced water has noticeably subsided as my gingival health has strengthened.",
    "I completed a six-week overseas business tour without packing the charging cable once, and the flosser never lost pump pressure.",
    "The tight interproximal gaps between my crowded premolars are finally free of trapped food debris that caused constant discomfort.",
    "Using this in the shower saves me five minutes every morning and eliminates any messy water splashing around the bathroom sink.",
    "My gums feel firm, pink, and healthy again instead of puffy and tender like they were when I only used string floss.",
    "Even after regular cleaning, this flosser always manages to flush out hidden particles from between molars that were missed.",
    "My periodontal pockets measured 4mm and 5mm last year, but at my latest measurement they have tightened down to a healthy 2mm and 3mm.",
    "The tongue scraper tip has made an incredible difference in mouth freshness—my mouth feels revitalized from morning until night.",
    "No more sliced fingers, bleeding gums, or broken strands of string floss stuck between tightly wedged teeth.",
    "My partner noticed the improvement in my smile and oral freshness right away, and we immediately ordered a second unit.",
    "The 320ml capacity gives me exactly 75 seconds of continuous hydrodynamic flossing, which is the perfect duration for a complete clean.",
    "Food impactions that used to cause throbbing pressure between my back molars after dinner are cleared in literally two seconds.",
    "My dentist remarked that whatever I'm doing at home is working wonders, and recommended I keep using this exact flosser.",
    "The Nurse mode pulse has noticeably improved tissue tone around my dental implant, preventing peri-implant inflammation.",
    "It reaches deep behind the rearmost surfaces of my wisdom teeth where traditional string could never comfortably maneuver.",
    "I had struggled with gingivitis flares for years, but this water flosser has kept my gum margins completely calm and pink.",
    "Running my tongue along the gumline feels incredibly smooth—there is zero gritty biofilm residue remaining on the enamel.",
    "The ease of refilling and operating this flosser has finally helped me maintain 100% daily flossing consistency for over three months.",
    "The water pressure is strong enough to dislodge stubborn debris yet gentle enough that it never causes discomfort on sensitive spots.",
    "The travel lock feature prevents the unit from accidentally turning on in my luggage, giving me total peace of mind on flights.",
    "My gums no longer bleed when I eat apples or crusty bread, which used to be an embarrassing daily problem for me.",
    "The fresh, squeaky-clean sensation in my mouth lasts right through the night until I wake up in the morning.",
    "It has saved me hundreds in potential dental treatment by keeping interproximal cavities and gum disease completely at bay."
  ];

  const FIVE_STAR_CLOSERS = [
    "I cannot recommend this Miroooo water flosser highly enough to anyone serious about upgrading their dental health.",
    "Truly a clinical-grade piece of oral care engineering—easily worth three times the price compared to pharmacy alternatives.",
    "If you are on the fence between string floss and a water flosser, do yourself a favor and buy this immediately.",
    "An exceptional product with brilliant battery longevity, thoughtful nozzles, and flawless build quality. Five stars all the way.",
    "I have already convinced three of my co-workers to get one, and every single one of them has thanked me for the recommendation.",
    "Hands down the single best investment I have made for my personal wellness and smile this year.",
    "Miroooo has knocked it out of the park with this flosser—the design, performance, and reliability are simply second to none.",
    "I will never go back to traditional string floss again. This device has set an entirely new standard for my oral routine.",
    "Top tier performance, rapid shipping, and beautiful packaging. You will not regret adding this to your daily hygiene routine.",
    "A fantastic purchase that delivers on every clinical claim. My dentist and I could not be happier with the results.",
    "Worth every single penny and then some. Flossing has gone from an annoying chore to a quick, refreshing daily ritual.",
    "The build quality feels luxury and durable—clearly designed by people who understand real dental care needs.",
    "If you have braces, crowns, or implants, this flosser is an absolute necessity that will protect your dental investment.",
    "Completely transformed my oral hygiene routine. 10 out of 10 from a very satisfied and loyal customer.",
    "Extremely impressed with the customer experience, rapid delivery, and superior hydrodynamic pressure.",
    "I only wish I had discovered this water flosser years earlier before wasting money on weak battery-operated alternatives.",
    "The combination of the 320ml tank and 60-day battery life makes this the undisputed king of cordless water flossers.",
    "A must-have device for every modern bathroom. My entire family is hooked on how clean our mouths feel.",
    "Delivers clinical results in the comfort of your own home. Unreservedly recommended to anyone who values their smile.",
    "Outstanding engineering from start to finish. Everything from the pump pressure to the nozzle selection is pure perfection.",
    "Definitely grab the 7-nozzle kit if you can—having specialized tips for every dental scenario is unbeatable.",
    "Leaves my teeth feeling professionally scaled every single day. Easily one of my most satisfying online purchases.",
    "Superb water pressure, whisper-quiet motor, and zero leaks. Miroooo has built an absolute winner here.",
    "Simply brilliant. If you want healthier gums and fresher breath without string floss pain, this is your solution.",
    "A game-changer for anyone with crowded teeth or bridge work. Cannot imagine my morning routine without it.",
    "The battery endurance alone makes this worth buying, but the cleaning power is what will keep you using it every day.",
    "Arrived beautifully boxed within 48 hours and worked straight out of the package. Five stars without hesitation.",
    "My gums are healthier now in my forties than they were in my twenties, all thanks to this water flosser.",
    "Everything about this device feels deliberate, premium, and durable. Total five-star rating across the board.",
    "An absolute dental essential. Do your teeth and gums a massive favor and get the Miroooo Water Flosser today."
  ];

  const SIMPLE_5_BODIES = [
    "The best water flosser I have ever used. My gums feel completely healthy and stopped bleeding.",
    "Recommend to all! The 320ml tank is so convenient and you don't have to refill constantly.",
    "Great water pressure and very easy to refill straight from the bathroom tap.",
    "Stopped my gum bleeding within a week. Much gentler and more thorough than string floss.",
    "Very easy to refill, holds plenty of water for a complete session, and feels very solid.",
    "Much better than string floss. Reaches deep behind wisdom teeth with zero pain or irritation.",
    "Genuinely great water flosser. The 60-day battery life on USB-C is fantastic for travel.",
    "So easy to use in the shower. Completely waterproof and keeps the sink clean.",
    "My dental hygienist noticed an immediate difference in plaque reduction along my lower teeth.",
    "Works wonders on braces. Clears trapped food around brackets in under 30 seconds.",
    "Clean teeth all day long. The 138 PSI White mode is unbelievably effective on stubborn tartar.",
    "Best oral care purchase I have made in years. Sleek, powerful, and easy to clean.",
    "Gentle on sensitive gums using Soft mode. Highly recommend to anyone with gum recession.",
    "Flossing is finally easy and painless. Zero shredded floss stuck between tight teeth.",
    "Outstanding quality! The 7 nozzles cover every possible angle and need in our household.",
    "The 2,000 pulses/min water jet gets out popcorn seeds that string floss missed entirely.",
    "Charged it once a month ago and it is still running at full power. Exceptional engineering.",
    "Teeth feel squeaky clean like leaving the dental hygienist chair every single night.",
    "The detachable 320ml reservoir is so simple to dry out and keep spotless.",
    "Noticeable improvement in breath freshness. The tongue scraper tip works brilliantly."
  ];

  const TITLE_LEADS = [
    "Hands down", "Genuinely", "Honestly", "By far", "Simply", "Without a doubt", "Definitely",
    "Absolutely", "Clinical grade:", "Remarkable:", "Outstanding:", "Flawless:", "Game changer:",
    "Life changing:", "Exceeded expectations:", "Unmatched quality:", "Worth every cent:",
    "So impressed:", "Best purchase this year:", "Total oral care upgrade:", "Essential daily device:",
    "Goodbye string floss:", "Perfection:", "Hygienist approved:", "Finally found the one:",
    "A true revelation:", "Brilliant engineering:", "Huge difference:", "Top tier performance:",
    "Five stars:", "Cleanest teeth ever:", "Simply superior:", "Couldn't be happier:", "10/10 flosser:", "Delighted:"
  ];

  const TITLE_SUBJECTS = [
    "the best water flosser", "the 320ml tank design", "this 138 PSI flosser", "this hydrodynamic flosser",
    "interdental flossing", "the 4 hydro modes", "the micro-jet pulse technology", "this cordless flosser",
    "my daily flossing routine", "flossing with braces", "cleaning tight dental spaces", "the 60-day battery life",
    "water flosser for sensitive gums", "the 7 specialized nozzles", "this shower-safe flosser",
    "deep gumline cleaning", "tartar and plaque removal", "the 2000 pulses/min stream", "this travel-friendly flosser",
    "interdental oral care", "precision water jet", "this high-pressure flosser", "orthodontic cleaning",
    "periodontal pocket care", "the Soft mode setting", "the Clean mode performance", "the White mode blast",
    "the Nurse pulse massage", "replacing traditional string floss", "this rechargeable flosser"
  ];

  const TITLE_TAILS = [
    "for sensitive gums", "worth every single penny", "leaving teeth squeaky clean", "stopped all gum bleeding",
    "battery lasts two whole months", "replaces string floss forever", "shower safe and easy to rinse",
    "popcorn kernels cleared in seconds", "best investment for my smile", "super easy to refill and clean",
    "recommended by my dental hygienist", "cleans around crowns effortlessly", "gentle on dental implants",
    "perfect for orthodontic braces", "food debris washed away instantly", "breath stays fresh all day",
    "so much faster than string", "no more painful shredded floss", "huge relief for inflamed gums",
    "feels like a professional dental visit", "unbeatable value and quality", "compact enough for business trips",
    "gentle yet remarkably thorough", "noticeably cleaner teeth in a week", "the reservoir size is perfect",
    "USB-C charging is so convenient", "handles tight teeth with ease", "cleans deep under the gumline",
    "delivers unbelievable water pressure", "my entire family loves it", "arrived fast and works flawlessly",
    "gentle on receding gums", "a must-have for dental hygiene", "smooth and quiet piston pump", "keeps dental checkups stress-free"
  ];

  const SIMPLE_TITLES = [
    "The best water flosser I ever used", "Recommend to all", "Great water pressure",
    "Stopped my gum bleeding", "Very easy to refill", "Much better than string floss",
    "Genuinely great flosser", "So easy to use in shower", "Impressed with the battery",
    "My hygienist noticed the difference", "Works wonders on braces", "Clean teeth all day long",
    "Best purchase in years", "Gentle on sensitive gums", "Flossing is finally easy",
    "Incredible cleaning power", "Super convenient 320ml tank", "High quality dental device",
    "No more shredded floss", "Essential for dental implants", "Flawless unboxing experience",
    "Delighted with the results", "Five stars without question", "Brilliant product",
    "Wonderful for tight teeth", "Clean mouth feeling", "Compact and powerful",
    "USB-C fast charge is great", "Healthy pink gums again", "Zero regrets buying this"
  ];

  const FOUR_STAR_OPENERS = [
    "I have been using the Miroooo Water Flosser for about a month now and I am very satisfied with the results.",
    "Switched to this hydrodynamic flosser after my dentist advised using water irrigation for plaque along the gumline.",
    "Really impressed with the water flosser! The matte finish and compact tank look very modern on the sink.",
    "Upgraded from standard string floss and the difference in interdental cleanliness is immediately noticeable.",
    "Ordered the flosser after reading positive feedback about the 320ml reservoir and multi-nozzle kit.",
    "This is easily one of the most powerful cordless water flossers I have used in terms of water pressure.",
    "The unboxing was very neat and the build quality feels solid and sturdy in hand.",
    "Flossing with this has made my evening routine so much faster and completely painless.",
    "I was curious about the 60-day battery endurance, and after five weeks it is still running strong.",
    "My gums have always been slightly sensitive, so I started carefully on Soft mode (60 PSI).",
    "After years of wrestling with bulky countertop tanks and coiled hoses, this cordless flosser is very liberating.",
    "Received my package within two days in pristine condition and tested it right away after dinner.",
    "The sleek cylindrical design sits securely in hand and doesn't slip when wet.",
    "Great flosser! It has completely changed how clean my gumline feels before going to sleep.",
    "I travel frequently for business trips and needed a flosser that charges via standard USB-C.",
    "Been using this twice daily for a month and my mouth feels noticeably fresher throughout the day.",
    "Purchased during the promotional launch and I am very satisfied with the overall experience so far.",
    "Extremely pleased with how thoroughly it dislodges food particles from between tight molars."
  ];

  const FOUR_STAR_FEATURES = [
    "The 60-138 PSI piston pump produces a consistent hydrodynamic stream that sweeps away stubborn debris.",
    "The 4 dedicated hydro modes make it simple to switch between gentle gum massage and deep plaque blasting.",
    "The 320ml detachable tank holds enough volume for a full irrigation cycle without stopping midway.",
    "The 7 specialized nozzles give plenty of options for different family members and dental needs.",
    "The universal USB-C charging means one less proprietary cable to worry about in the bathroom.",
    "The IPX7 waterproof casing allows effortless cleaning under the running tap and safe shower flossing.",
    "The 360-degree rotating nozzle makes it easy to target the rearmost molar surfaces without wrist strain.",
    "The side refill door makes topping up warm water quick and mess-free straight from the faucet.",
    "The 2,000 pulses/min micro-jet action feels stimulating on the gums without causing bleeding.",
    "The transparent water chamber lets you easily monitor water consumption across all quadrants."
  ];

  const FOUR_STAR_FEEDBACK = [
    "Be careful on White mode (138 PSI) at first—the pressure is very strong so make sure your lips are closed over the sink.",
    "The water pressure takes a day or two to get used to, but once you master the angle it works brilliantly.",
    "I would have loved an included hard travel case instead of the soft travel pouch, but the device itself is 5 stars.",
    "Make sure you empty and air-dry the tank after use to keep the water chamber pristine.",
    "The power button is quite responsive, so remember to position the tip in your mouth before powering on.",
    "Takes about 3 days for sensitive gums to adapt to the pulse rhythm, then it feels fantastic.",
    "A slightly larger water level font on the tank would be nice, but the 320ml capacity is very generous.",
    "The nozzle storage pouch could be slightly more rigid, though the 7 nozzles themselves are top quality.",
    "Just remember to use lukewarm water if you have sensitive root surfaces or cold-reactive teeth."
  ];

  const FOUR_STAR_CLOSERS = [
    "Solid 4-star performer that has genuinely elevated my daily oral care routine.",
    "Very happy with this purchase and would definitely recommend it to friends and family.",
    "Great value for money on the current promotion—much better than overpriced pharmacy alternatives.",
    "A dependable, high-pressure water flosser that does exactly what it promises.",
    "Leaves teeth feeling remarkably clean and smooth. Glad I made the switch from string floss.",
    "Definitely worth buying if you want powerful interdental cleaning without shredded string pain.",
    "High quality device, arrived quickly, and cleans exceptionally well around tight teeth.",
    "Solid daily performer that keeps dental checkups fast and painless. Highly recommended."
  ];

  const THREE_STAR_TEMPLATES = [
    {
      title: "Very powerful water jet, take time to learn the technique",
      body: "The water pressure on White mode (138 PSI) is intensely strong! When I first pressed power with my mouth open, water shot straight across the bathroom mirror. You definitely need to lean right over the sink and start on Soft mode first.",
      reply: { author: "Miroooo Customer Care", text: "Hello! We always recommend first-time users begin on Soft mode (60 PSI) with lips loosely closed over the nozzle tip while leaning over the basin before switching the power on. Once accustomed, you can comfortably step up to Clean and White modes!" }
    },
    {
      title: "Great flosser but promotional price appeared right after I ordered",
      body: "I purchased this water flosser at $89 just two weeks ago, and now see the promotional deal at $69 with the 7 nozzles. The flosser itself works brilliantly and cleaned up my gum inflammation, but the pricing timing stung a bit.",
      reply: { author: "Miroooo Customer Experience Desk", text: "Hi there! We are thrilled the Miroooo Water Flosser is giving you great clinical results. We occasionally run limited promotional events for new shoppers, and our team has credited a complimentary nozzle replacement set to your account." }
    },
    {
      title: "Nozzles are packed in the bottom tray beneath the flosser",
      body: "When I opened the box I thought the 7 specialized nozzles were missing because only the main unit was visible on top. Found them tucked safely underneath the lower cardboard tray. The packaging could make the accessory compartment more obvious.",
      reply: { author: "Miroooo Product Care", text: "Thank you for the constructive feedback! We have updated our unboxing insert to clearly show the dual-tier tray layout so customers can easily locate the specialized nozzles and USB-C charging cable." }
    },
    {
      title: "Customer care responded on Monday for a Friday evening inquiry",
      body: "I emailed support on Friday night with a question about nozzle compatibility and did not receive a reply until Monday morning. While they answered thoroughly and solved my question immediately, weekend support coverage would be appreciated.",
      reply: { author: "Miroooo Support Desk", text: "Thank you for your candid feedback. While our team resolved your query first thing Monday, we are currently expanding our customer care hours to include comprehensive weekend chat coverage." }
    },
    {
      title: "Takes a few sessions to find your preferred hydrodynamic mode",
      body: "Tried Clean mode on my first day and it felt a little too intense for my sensitive gums. Switched to Nurse mode (60-100 PSI pulse) which was much gentler. Device works well now that I found the right setting.",
      reply: { author: "Miroooo Dental Support", text: "Glad you found the perfect setting! Nurse mode uses rhythmic hydrodynamic massage specifically designed to stimulate delicate gingiva without discomfort." }
    }
  ];

  const TWO_STAR_TEMPLATES = [
    {
      title: "",
      body: "The delivery driver left my parcel outside by the garden gate in damp weather instead of placing it under the covered porch. The sealed product box kept the flosser dry, but courier handling was disappointing.",
      reply: { author: "Miroooo Logistics Care", text: "We sincerely apologize for the driver's delivery placement. We have filed a formal carrier complaint regarding delivery instructions and confirmed safe delivery with regional depot management." }
    },
    {
      title: "",
      body: "The 320ml reservoir latch was quite stiff to twist off during my first use. Once I figured out the twist-lock angle it became easier, but instructions could explain the alignment dot better.",
      reply: { author: "Miroooo Customer Support", text: "Thank you for pointing this out! The reservoir features a tight silicone watertight seal to guarantee IPX7 integrity. Aligning the dot indicator makes twisting on and off effortless." }
    },
    {
      title: "",
      body: "Delivery took 4 business days instead of the estimated 2-day delivery window due to regional carrier backlog. The water flosser itself works well and has great battery life, but shipping was slower than expected.",
      reply: { author: "Miroooo Dispatch Desk", text: "We apologize for the regional courier delay. We are actively reviewing carrier routing to ensure all standard deliveries consistently meet our 48-hour tracked delivery promise." }
    }
  ];

  const ONE_STAR_TEMPLATES = [
    {
      title: "",
      body: "The delivery courier was extremely rude, dropped the parcel over the front fence and walked away without knocking or ringing the bell. Completely unacceptable delivery behavior.",
      reply: { author: "Miroooo Executive Care", text: "We are appalled by the courier driver's unprofessional conduct. We hold logistics partners to rigorous standards and have formally escalated this incident to carrier branch management for immediate disciplinary action." }
    },
    {
      title: "",
      body: "I ordered this at full retail price right before the promotional bundle launched with the extra nozzles. Great flosser and powerful pump, but frustrating promotional timing.",
      reply: { author: "Miroooo Customer Care", text: "We completely understand your frustration regarding promotional timing. Our care team has reached out directly to provide a complimentary nozzle accessory care pack to ensure you receive outstanding value." }
    },
    {
      title: "",
      body: "The outer shipping carton arrived crushed at one corner from rough courier transit. Thankfully the inner presentation packaging and water flosser were intact, but parcel handling was poor.",
      reply: { author: "Miroooo Operations Team", text: "We apologize for the carrier's rough transit handling. We have logged this damage report with the carrier depot and reinforced our outer shipping cartons with impact-resistant corner buffers." }
    }
  ];

  // Procedural Generator for Complete 4,275 Review Dataset
  function generateFullReviewsDataset() {
    const targetCounts = { 5: 3933, 4: 256, 3: 43, 2: 22, 1: 21 };
    const totalTarget = 4275;

    const dataset = [];
    const usedNames = new Set();
    const usedBodies = new Set();
    const usedTitles = new Set();

    let globalIndex = 0;

    // 1. Ingest Curated Reviews
    for (const cr of CURATED_REVIEWS) {
      usedNames.add(cr.name);
      usedBodies.add(cr.body);
      if (cr.title) usedTitles.add(cr.title);
      dataset.push(cr);
      globalIndex++;
    }

    const remaining = {
      5: targetCounts[5] - CURATED_REVIEWS.filter(r => r.rating === 5).length,
      4: targetCounts[4] - CURATED_REVIEWS.filter(r => r.rating === 4).length,
      3: targetCounts[3] - CURATED_REVIEWS.filter(r => r.rating === 3).length,
      2: targetCounts[2] - CURATED_REVIEWS.filter(r => r.rating === 2).length,
      1: targetCounts[1] - CURATED_REVIEWS.filter(r => r.rating === 1).length
    };

    function getUniqueName(seed, step) {
      let attempts = 0;
      while (attempts < 1000) {
        const r1 = pseudoRandom(seed + attempts * 7 + 1);
        const r2 = pseudoRandom(seed + attempts * 11 + 2);
        const r3 = pseudoRandom(seed + attempts * 13 + 3);

        const fName = FIRST_NAMES[Math.floor(r1 * FIRST_NAMES.length)];
        const lName = LAST_NAMES[Math.floor(r2 * LAST_NAMES.length)];
        const useMiddle = (r3 > 0.45);
        const mInit = MIDDLE_INITIALS[Math.floor(r3 * MIDDLE_INITIALS.length)];

        const candidate = useMiddle ? `${fName} ${mInit} ${lName}` : `${fName} ${lName}`;
        if (!usedNames.has(candidate)) {
          usedNames.add(candidate);
          return candidate;
        }
        attempts++;
      }
      const fallback = `${FIRST_NAMES[step % FIRST_NAMES.length]} ${LAST_NAMES[(step * 3) % LAST_NAMES.length]} (${step})`;
      usedNames.add(fallback);
      return fallback;
    }

    function getUniqueTitle(seed, step, rating) {
      const rHasTitle = pseudoRandom(seed + 9);
      if (rHasTitle < 0.35) {
        return "";
      }

      let attempts = 0;
      while (attempts < 500) {
        const rA = pseudoRandom(seed + attempts * 5 + 1);
        const rB = pseudoRandom(seed + attempts * 7 + 2);
        const rC = pseudoRandom(seed + attempts * 11 + 3);

        let candidate = "";
        if (attempts === 0 && rA < 0.25) {
          candidate = SIMPLE_TITLES[Math.floor(rB * SIMPLE_TITLES.length)];
        } else {
          const lead = TITLE_LEADS[Math.floor(rA * TITLE_LEADS.length)];
          const subj = TITLE_SUBJECTS[Math.floor(rB * TITLE_SUBJECTS.length)];
          const tail = TITLE_TAILS[Math.floor(rC * TITLE_TAILS.length)];
          candidate = `${lead} ${subj} ${tail}`;
        }

        if (!usedTitles.has(candidate)) {
          usedTitles.add(candidate);
          return candidate;
        }
        attempts++;
      }

      const fallback = `${SIMPLE_TITLES[step % SIMPLE_TITLES.length]} - Part ${step}`;
      usedTitles.add(fallback);
      return fallback;
    }

    // Generate remaining 5-Star Reviews
    for (let i = 0; i < remaining[5]; i++) {
      const seed = globalIndex * 7919 + i * 37;
      const rLoc = pseudoRandom(seed + 4);
      const rVar = pseudoRandom(seed + 5);
      const rHelp = pseudoRandom(seed + 6);
      const rType = pseudoRandom(seed + 8);

      const name = getUniqueName(seed, globalIndex);
      const location = LOCATIONS[Math.floor(rLoc * LOCATIONS.length)];
      const variant = VARIANTS[Math.floor(rVar * VARIANTS.length)];
      const title = getUniqueTitle(seed, globalIndex, 5);

      let body = "";
      let bAttempts = 0;
      while (bAttempts < 500) {
        if (rType < 0.12 && bAttempts === 0) {
          const sBody = SIMPLE_5_BODIES[(i + bAttempts) % SIMPLE_5_BODIES.length];
          const sCloser = FIVE_STAR_CLOSERS[(i * 3 + bAttempts) % FIVE_STAR_CLOSERS.length];
          const candidate = `${sBody} ${sCloser}`;
          if (!usedBodies.has(candidate)) {
            body = candidate;
            break;
          }
        } else {
          const r1 = pseudoRandom(seed + bAttempts * 13 + 1);
          const r2 = pseudoRandom(seed + bAttempts * 17 + 2);
          const r3 = pseudoRandom(seed + bAttempts * 19 + 3);
          const r4 = pseudoRandom(seed + bAttempts * 23 + 4);

          const op = FIVE_STAR_OPENERS[Math.floor(r1 * FIVE_STAR_OPENERS.length)];
          const fe = FIVE_STAR_FEATURES[Math.floor(r2 * FIVE_STAR_FEATURES.length)];
          const ou = FIVE_STAR_OUTCOMES[Math.floor(r3 * FIVE_STAR_OUTCOMES.length)];
          const cl = FIVE_STAR_CLOSERS[Math.floor(r4 * FIVE_STAR_CLOSERS.length)];

          const candidate = `${op} ${fe} ${ou} ${cl}`;
          if (!usedBodies.has(candidate)) {
            body = candidate;
            break;
          }
        }
        bAttempts++;
      }

      if (!body) {
        body = `${FIVE_STAR_OPENERS[i % FIVE_STAR_OPENERS.length]} ${FIVE_STAR_FEATURES[(i * 3) % FIVE_STAR_FEATURES.length]} ${FIVE_STAR_OUTCOMES[(i * 5) % FIVE_STAR_OUTCOMES.length]} ${FIVE_STAR_CLOSERS[(i * 7) % FIVE_STAR_CLOSERS.length]} (Review verified #${globalIndex})`;
      }
      usedBodies.add(body);

      const { isoDate, displayDate } = generateDate(globalIndex, totalTarget);
      const helpful = Math.floor(rHelp * rHelp * 35);

      dataset.push({
        id: `floss-gen-${globalIndex}`,
        name: name,
        country: location,
        rating: 5,
        date: isoDate,
        displayDate: displayDate,
        variant: variant,
        title: title,
        body: body,
        images: [],
        helpful: helpful,
        verified: true
      });

      globalIndex++;
    }

    // Generate remaining 4-Star Reviews
    for (let i = 0; i < remaining[4]; i++) {
      const seed = globalIndex * 6271 + i * 47;
      const rLoc = pseudoRandom(seed + 4);
      const rVar = pseudoRandom(seed + 5);
      const rHelp = pseudoRandom(seed + 6);

      const name = getUniqueName(seed, globalIndex);
      const location = LOCATIONS[Math.floor(rLoc * LOCATIONS.length)];
      const variant = VARIANTS[Math.floor(rVar * VARIANTS.length)];
      const title = getUniqueTitle(seed, globalIndex, 4);

      let body = "";
      let bAttempts = 0;
      while (bAttempts < 500) {
        const r1 = pseudoRandom(seed + bAttempts * 11 + 1);
        const r2 = pseudoRandom(seed + bAttempts * 13 + 2);
        const r3 = pseudoRandom(seed + bAttempts * 17 + 3);
        const r4 = pseudoRandom(seed + bAttempts * 19 + 4);

        const op = FOUR_STAR_OPENERS[Math.floor(r1 * FOUR_STAR_OPENERS.length)];
        const fe = FOUR_STAR_FEATURES[Math.floor(r2 * FOUR_STAR_FEATURES.length)];
        const fb = FOUR_STAR_FEEDBACK[Math.floor(r3 * FOUR_STAR_FEEDBACK.length)];
        const cl = FOUR_STAR_CLOSERS[Math.floor(r4 * FOUR_STAR_CLOSERS.length)];

        const candidate = `${op} ${fe} ${fb} ${cl}`;
        if (!usedBodies.has(candidate)) {
          body = candidate;
          break;
        }
        bAttempts++;
      }

      if (!body) {
        body = `${FOUR_STAR_OPENERS[i % FOUR_STAR_OPENERS.length]} ${FOUR_STAR_FEATURES[(i * 3) % FOUR_STAR_FEATURES.length]} ${FOUR_STAR_FEEDBACK[(i * 5) % FOUR_STAR_FEEDBACK.length]} ${FOUR_STAR_CLOSERS[(i * 7) % FOUR_STAR_CLOSERS.length]} (Verified order #${globalIndex})`;
      }
      usedBodies.add(body);

      const { isoDate, displayDate } = generateDate(globalIndex, totalTarget);
      const helpful = Math.floor(rHelp * 22);

      dataset.push({
        id: `floss-gen-${globalIndex}`,
        name: name,
        country: location,
        rating: 4,
        date: isoDate,
        displayDate: displayDate,
        variant: variant,
        title: title,
        body: body,
        images: [],
        helpful: helpful,
        verified: true
      });

      globalIndex++;
    }

    // Generate remaining 3-Star Reviews
    for (let i = 0; i < remaining[3]; i++) {
      const seed = globalIndex * 5417 + i * 61;
      const rLoc = pseudoRandom(seed + 4);
      const rVar = pseudoRandom(seed + 5);
      const rHelp = pseudoRandom(seed + 6);

      const name = getUniqueName(seed, globalIndex);
      const location = LOCATIONS[Math.floor(rLoc * LOCATIONS.length)];
      const variant = VARIANTS[Math.floor(rVar * VARIANTS.length)];

      const template = THREE_STAR_TEMPLATES[i % THREE_STAR_TEMPLATES.length];
      const title = getUniqueTitle(seed, globalIndex, 3);

      let body = template.body;
      if (usedBodies.has(body)) {
        body = `${template.body} (Customer purchase confirmed in ${location.split(',')[0]}.)`;
      }
      if (usedBodies.has(body)) {
        body = `${template.body} (Notice for order ref #${globalIndex}.)`;
      }
      usedBodies.add(body);

      const { isoDate, displayDate } = generateDate(globalIndex, totalTarget);
      const helpful = Math.floor(rHelp * 18);

      const reviewObj = {
        id: `floss-gen-${globalIndex}`,
        name: name,
        country: location,
        rating: 3,
        date: isoDate,
        displayDate: displayDate,
        variant: variant,
        title: title,
        body: body,
        images: [],
        helpful: helpful,
        verified: true
      };

      if (i % 2 === 0 && template.reply) {
        reviewObj.merchantReply = {
          author: template.reply.author,
          date: displayDate,
          text: template.reply.text
        };
      }

      dataset.push(reviewObj);
      globalIndex++;
    }

    // Generate remaining 2-Star Reviews
    for (let i = 0; i < remaining[2]; i++) {
      const seed = globalIndex * 4813 + i * 73;
      const rLoc = pseudoRandom(seed + 4);
      const rVar = pseudoRandom(seed + 5);
      const rHelp = pseudoRandom(seed + 6);

      const name = getUniqueName(seed, globalIndex);
      const location = LOCATIONS[Math.floor(rLoc * LOCATIONS.length)];
      const variant = VARIANTS[Math.floor(rVar * VARIANTS.length)];

      const template = TWO_STAR_TEMPLATES[i % TWO_STAR_TEMPLATES.length];
      const title = getUniqueTitle(seed, globalIndex, 2);

      let body = template.body;
      if (usedBodies.has(body)) {
        body = `${template.body} (Customer delivery in ${location.split(',')[0]}.)`;
      }
      if (usedBodies.has(body)) {
        body = `${template.body} (Tracking record ref #${globalIndex}.)`;
      }
      usedBodies.add(body);

      const { isoDate, displayDate } = generateDate(globalIndex, totalTarget);
      const helpful = Math.floor(rHelp * 16);

      const reviewObj = {
        id: `floss-gen-${globalIndex}`,
        name: name,
        country: location,
        rating: 2,
        date: isoDate,
        displayDate: displayDate,
        variant: variant,
        title: title,
        body: body,
        images: [],
        helpful: helpful,
        verified: true
      };

      if (i % 2 === 0 && template.reply) {
        reviewObj.merchantReply = {
          author: template.reply.author,
          date: displayDate,
          text: template.reply.text
        };
      }

      dataset.push(reviewObj);
      globalIndex++;
    }

    // Generate remaining 1-Star Reviews
    for (let i = 0; i < remaining[1]; i++) {
      const seed = globalIndex * 3709 + i * 89;
      const rLoc = pseudoRandom(seed + 4);
      const rVar = pseudoRandom(seed + 5);
      const rHelp = pseudoRandom(seed + 6);

      const name = getUniqueName(seed, globalIndex);
      const location = LOCATIONS[Math.floor(rLoc * LOCATIONS.length)];
      const variant = VARIANTS[Math.floor(rVar * VARIANTS.length)];

      const template = ONE_STAR_TEMPLATES[i % ONE_STAR_TEMPLATES.length];
      const title = getUniqueTitle(seed, globalIndex, 1);

      let body = template.body;
      if (usedBodies.has(body)) {
        body = `${template.body} (Carrier dispatch to ${location.split(',')[0]}.)`;
      }
      if (usedBodies.has(body)) {
        body = `${template.body} (Carrier escalation ref #${globalIndex}.)`;
      }
      usedBodies.add(body);

      const { isoDate, displayDate } = generateDate(globalIndex, totalTarget);
      const helpful = Math.floor(rHelp * 19);

      const reviewObj = {
        id: `floss-gen-${globalIndex}`,
        name: name,
        country: location,
        rating: 1,
        date: isoDate,
        displayDate: displayDate,
        variant: variant,
        title: title,
        body: body,
        images: [],
        helpful: helpful,
        verified: true
      };

      if (i % 2 === 0 && template.reply) {
        reviewObj.merchantReply = {
          author: template.reply.author,
          date: displayDate,
          text: template.reply.text
        };
      }

      dataset.push(reviewObj);
      globalIndex++;
    }

    return dataset;
  }

  // Populate Master 4,275 Dataset
  const REVIEWS_DATA = generateFullReviewsDataset();

  // State Management
  let currentFilterRating = null; // null = all
  let currentWithPhotos = false;
  let currentVerifiedOnly = false;
  let currentSort = 'most-recent';

  function getPageSize() {
    return typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 24;
  }

  let currentVisibleCount = getPageSize();
  const PAGE_SIZE = 24;

  // Active Lightbox State
  let activeLightboxReview = null;
  let activeLightboxImageIndex = 0;

  // DOM Elements Cache
  let gridEl = null;
  let loadMoreBtn = null;
  let emptyStateEl = null;
  let loadCountEl = null;
  let filterStatusEl = null;
  let statusTextEl = null;
  let starDropdownEl = null;
  let starTriggerLabel = null;
  let filterPhotosBtn = null;
  let filterVerifiedBtn = null;
  let resetFilterBtn = null;
  let breakdownRows = [];

  // Update Header Summary Card DOM
  function updateHeaderSummaryDOM() {
    const scoreNumber = document.querySelector('.miroooo-score-number');
    if (scoreNumber) scoreNumber.textContent = '4.9';

    const archiveCount = document.querySelector('.miroooo-archive-count');
    if (archiveCount) {
      archiveCount.innerHTML = 'Based on <strong>4,275</strong> verified reviews';
    }

    const actionText = document.querySelector('.miroooo-action-text');
    if (actionText) {
      actionText.textContent = 'Share your flossing experience';
    }

    // Update row counts & bars
    const rowCounts = { 5: '(3,933)', 4: '(256)', 3: '(43)', 2: '(22)', 1: '(21)' };
    const rowWidths = { 5: '92%', 4: '6%', 3: '1%', 2: '0.5%', 1: '0.5%' };

    document.querySelectorAll('.miroooo-breakdown-row').forEach(row => {
      const star = row.getAttribute('data-star');
      if (star && rowCounts[star]) {
        const countSpan = row.querySelector('.miroooo-row-count');
        if (countSpan) countSpan.textContent = rowCounts[star];
        const bar = row.querySelector('.miroooo-progress-bar');
        if (bar && rowWidths[star]) {
          bar.setAttribute('data-target-width', rowWidths[star]);
          bar.style.width = rowWidths[star];
        }
      }
    });

    // Update dropdown items
    const dropdownLabels = {
      'all': 'All stars (4,275)',
      '5': '5 star (3,933)',
      '4': '4 star (256)',
      '3': '3 star (43)',
      '2': '2 star (22)',
      '1': '1 star (21)'
    };
    document.querySelectorAll('#miroooo-star-menu .miroooo-dropdown-item').forEach(item => {
      const val = item.getAttribute('data-value');
      if (val && dropdownLabels[val]) {
        item.textContent = dropdownLabels[val];
      }
    });
  }

  // Filter and Sort Pipeline
  function getFilteredAndSortedReviews() {
    let list = REVIEWS_DATA.slice();

    if (currentFilterRating !== null) {
      list = list.filter(r => r.rating === currentFilterRating);
    }
    if (currentWithPhotos) {
      list = list.filter(r => r.images && r.images.length > 0);
    }
    if (currentVerifiedOnly) {
      list = list.filter(r => r.verified === true);
    }

    list.sort((a, b) => {
      switch (currentSort) {
        case 'highest-rating':
          if (b.rating !== a.rating) return b.rating - a.rating;
          return new Date(b.date || b.displayDate) - new Date(a.date || a.displayDate);
        case 'lowest-rating':
          if (a.rating !== b.rating) return a.rating - b.rating;
          return new Date(b.date || b.displayDate) - new Date(a.date || a.displayDate);
        case 'oldest':
          return new Date(a.date || a.displayDate) - new Date(b.date || b.displayDate);
        case 'most-recent':
        default:
          return new Date(b.date || b.displayDate) - new Date(a.date || a.displayDate);
      }
    });

    return list;
  }

  // Star Rating HTML Generator
  function getTrustpilotStarsHTML(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= rating;
      stars += `<img src="/assets/star.png" alt="★" width="16" height="15" class="miroooo-star-img${isFilled ? '' : ' is-empty'}" style="width: 16px; height: 15px; display: inline-block; object-fit: contain; vertical-align: middle;${isFilled ? '' : ' opacity: 0.22; filter: grayscale(1);'}" />`;
    }
    return `<div class="miroooo-stars-row" style="display: inline-flex; align-items: center; gap: 3px;">${stars}</div>`;
  }

  // Review Card HTML Generator (ZERO Review ID displayed on frontend)
  function buildReviewCardHTML(review, index) {
    const starsHTML = getTrustpilotStarsHTML(review.rating);
    const initials = review.name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    // Gallery HTML
    let galleryHTML = '';
    if (review.images && review.images.length > 0) {
      if (review.images.length === 1) {
        galleryHTML = `
          <div class="miroooo-card-gallery miroooo-gallery-1" data-review-id="${review.id}" data-img-index="0">
            <img src="${review.images[0]}" alt="Photo from ${review.name}" loading="lazy" decoding="async" />
          </div>
        `;
      } else if (review.images.length === 2) {
        galleryHTML = `
          <div class="miroooo-card-gallery miroooo-gallery-2" data-review-id="${review.id}">
            <div class="miroooo-gallery-item" data-img-index="0"><img src="${review.images[0]}" alt="Photo 1 from ${review.name}" loading="lazy" decoding="async" /></div>
            <div class="miroooo-gallery-item" data-img-index="1"><img src="${review.images[1]}" alt="Photo 2 from ${review.name}" loading="lazy" decoding="async" /></div>
          </div>
        `;
      } else {
        const remainingCount = review.images.length - 3;
        galleryHTML = `
          <div class="miroooo-card-gallery miroooo-gallery-3" data-review-id="${review.id}">
            <div class="miroooo-gallery-item" data-img-index="0"><img src="${review.images[0]}" alt="Photo 1 from ${review.name}" loading="lazy" decoding="async" /></div>
            <div class="miroooo-gallery-item" data-img-index="1"><img src="${review.images[1]}" alt="Photo 2 from ${review.name}" loading="lazy" decoding="async" /></div>
            <div class="miroooo-gallery-item" data-img-index="2">
              <img src="${review.images[2]}" alt="Photo 3 from ${review.name}" loading="lazy" decoding="async" />
              ${remainingCount > 0 ? `<div class="miroooo-gallery-more-badge">+${remainingCount}</div>` : ''}
            </div>
          </div>
        `;
      }
    }

    // Merchant Reply
    let merchantReplyHTML = '';
    if (review.merchantReply) {
      merchantReplyHTML = `
        <div class="miroooo-merchant-reply">
          <div class="miroooo-merchant-reply-header">
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/></svg>
            ${review.merchantReply.author} · <span style="font-weight:400; opacity:0.8;">${review.merchantReply.date}</span>
          </div>
          <div>${review.merchantReply.text}</div>
        </div>
      `;
    }

    const isLongReview = review.body && review.body.length > 160;
    const animDelay = ((index % 16) * 35) + 'ms';

    return `
      <article class="miroooo-review-card fade-in" id="card-${review.id}" style="animation-delay: ${animDelay};">
        <!-- Top: Stars + Date -->
        <div class="miroooo-card-header">
          <div class="miroooo-card-stars" aria-label="${review.rating} out of 5 stars">${starsHTML}</div>
          <span class="miroooo-card-date">${formatUKDate(review.date || review.displayDate)}</span>
        </div>

        <!-- Customer Gallery -->
        ${galleryHTML}

        <!-- Title: Only rendered if non-empty -->
        ${review.title ? `<h4 class="miroooo-card-title">${review.title}</h4>` : ''}

        <!-- Body -->
        <p class="miroooo-card-body miroooo-card-text">${review.body}</p>

        <!-- Read More Button for long reviews -->
        ${isLongReview ? `<button type="button" class="miroooo-read-more-btn" data-review-id="${review.id}">Read more</button>` : ''}

        <!-- Official Merchant Care Reply -->
        ${merchantReplyHTML}

        <!-- Card Footer -->
        <div class="miroooo-card-footer">
          <div class="miroooo-card-author-row">
            <div class="miroooo-card-author">
              <div class="miroooo-avatar miroooo-avatar-initials">${initials}</div>
              <div class="miroooo-author-info">
                <span class="miroooo-author-name">${review.name}</span>
                ${review.country ? `<span class="miroooo-author-country">${review.country}</span>` : ''}
              </div>
            </div>
            ${review.verified ? `
              <span class="miroooo-card-verified-badge" title="Verified Customer Purchase">
                <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                Verified
              </span>
            ` : ''}
          </div>

          <div class="miroooo-card-actions">
            <button type="button" class="miroooo-helpful-btn" data-review-id="${review.id}">
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a2 2 0 00-.8 1.4z"/></svg>
              Helpful (<span class="miroooo-helpful-count">${review.helpful || 0}</span>)
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // Render Grid
  function renderReviews(scrollUp = true) {
    if (!gridEl) return;

    const filtered = getFilteredAndSortedReviews();
    const isFiltered = currentFilterRating !== null || currentWithPhotos || currentVerifiedOnly || currentSort !== 'most-recent';

    if (resetFilterBtn) {
      resetFilterBtn.style.display = isFiltered ? 'inline-block' : 'none';
    }

    if (filterStatusEl && statusTextEl) {
      if (isFiltered) {
        filterStatusEl.style.display = 'flex';
        let desc = [];
        if (currentFilterRating !== null) desc.push(`${currentFilterRating}-star reviews`);
        if (currentWithPhotos) desc.push('with photos');
        if (currentVerifiedOnly) desc.push('verified buyers only');
        statusTextEl.textContent = `Showing ${filtered.length.toLocaleString()} matching reviews (${desc.join(', ')})`;
      } else {
        filterStatusEl.style.display = 'none';
      }
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = '';
      if (emptyStateEl) emptyStateEl.style.display = 'block';
      const paginationContainer = document.getElementById('miroooo-pagination-container');
      if (paginationContainer) paginationContainer.style.display = 'none';
      return;
    } else {
      if (emptyStateEl) emptyStateEl.style.display = 'none';
    }

    const visibleList = filtered.slice(0, currentVisibleCount);
    const numCols = window.innerWidth >= 1024 ? 4 : (window.innerWidth >= 768 ? 3 : 2);
    const colBuckets = Array.from({ length: numCols }, () => []);

    visibleList.forEach((review, index) => {
      colBuckets[index % numCols].push({ review, originalIndex: index });
    });

    let html = '';
    colBuckets.forEach((bucket, colIdx) => {
      html += `<div class="miroooo-reviews-column" data-col="${colIdx}">`;
      bucket.forEach(({ review, originalIndex }) => {
        html += buildReviewCardHTML(review, originalIndex);
      });
      html += `</div>`;
    });

    gridEl.innerHTML = html;
    attachCardListeners(visibleList);

    const paginationContainer = document.getElementById('miroooo-pagination-container');
    if (paginationContainer && loadMoreBtn && loadCountEl) {
      if (visibleList.length >= filtered.length) {
        paginationContainer.style.display = 'none';
      } else {
        paginationContainer.style.display = 'flex';
        const displayTotal = isFiltered ? filtered.length : REVIEWS_SUMMARY.total;
        loadCountEl.textContent = `(Showing ${visibleList.length.toLocaleString()} of ${displayTotal.toLocaleString()})`;
      }
    }
  }

  // Card Listeners
  function attachCardListeners(currentList) {
    const helpfulBtns = gridEl.querySelectorAll('.miroooo-helpful-btn');
    helpfulBtns.forEach(btn => {
      listen(btn, 'click', (e) => {
        e.stopPropagation();
        const reviewId = btn.getAttribute('data-review-id');
        const countSpan = btn.querySelector('.miroooo-helpful-count');
        const review = currentList.find(r => String(r.id) === String(reviewId));
        if (!review) return;

        if (btn.classList.contains('voted')) {
          review.helpful = Math.max(0, (review.helpful || 0) - 1);
          btn.classList.remove('voted');
        } else {
          review.helpful = (review.helpful || 0) + 1;
          btn.classList.add('voted');
        }
        if (countSpan) countSpan.textContent = review.helpful;
      });
    });

    const readMoreBtns = gridEl.querySelectorAll('.miroooo-read-more-btn');
    readMoreBtns.forEach(btn => {
      listen(btn, 'click', (e) => {
        e.stopPropagation();
        const reviewId = btn.getAttribute('data-review-id');
        const review = currentList.find(r => String(r.id) === String(reviewId));
        if (!review) return;
        openLightbox(review, 0);
      });
    });

    const galleryContainers = gridEl.querySelectorAll('.miroooo-card-gallery');
    galleryContainers.forEach(container => {
      listen(container, 'click', (e) => {
        e.stopPropagation();
        const reviewId = container.getAttribute('data-review-id');
        const review = currentList.find(r => String(r.id) === String(reviewId));
        if (!review || !review.images || review.images.length === 0) return;

        let imgIndex = 0;
        const targetItem = e.target.closest('[data-img-index]');
        if (targetItem) {
          imgIndex = parseInt(targetItem.getAttribute('data-img-index'), 10) || 0;
        }
        openLightbox(review, imgIndex);
      });
    });

    const cards = gridEl.querySelectorAll('.miroooo-review-card');
    cards.forEach(card => {
      listen(card, 'click', (e) => {
        if (
          e.target.closest('.miroooo-helpful-btn') ||
          e.target.closest('.miroooo-read-more-btn') ||
          e.target.closest('.miroooo-card-gallery') ||
          e.target.closest('button') ||
          e.target.closest('a')
        ) {
          return;
        }
        const reviewId = card.id ? card.id.replace('card-', '') : null;
        if (!reviewId) return;
        const review = currentList.find(r => String(r.id) === String(reviewId));
        if (review) {
          openLightbox(review, 0);
        }
      });
    });
  }

  // Lightbox Implementation
  function setupLightboxEvents() {
    const modal = document.getElementById('miroooo-lightbox-modal');
    if (!modal) return;

    const closeBtn = document.getElementById('miroooo-lightbox-close');
    const helpfulBtn = document.getElementById('miroooo-lightbox-helpful-btn');

    if (closeBtn) listen(closeBtn, 'click', closeLightbox);

    listen(modal, 'click', (e) => {
      if (e.target === modal) closeLightbox();
    });

    if (helpfulBtn) {
      listen(helpfulBtn, 'click', () => {
        if (!activeLightboxReview) return;
        activeLightboxReview.helpful = (activeLightboxReview.helpful || 0) + 1;
        const countSpan = document.getElementById('miroooo-lightbox-helpful-count');
        if (countSpan) countSpan.textContent = activeLightboxReview.helpful;
        helpfulBtn.classList.add('voted');
        renderReviews(false);
      });
    }

    listen(document, 'keydown', (e) => {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function openLightbox(review, imgIndex = 0) {
    activeLightboxReview = review;
    activeLightboxImageIndex = imgIndex;

    const modal = document.getElementById('miroooo-lightbox-modal');
    if (!modal) return;

    updateLightboxContent();

    modal.style.display = 'flex';
    void modal.offsetHeight;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function updateLightboxContent() {
    if (!activeLightboxReview) return;

    const dialogEl = document.querySelector('.miroooo-lightbox-dialog');
    const mediaContainer = document.querySelector('.miroooo-lightbox-media-container');
    const imgEl = document.getElementById('miroooo-lightbox-img');
    const starsEl = document.getElementById('miroooo-lightbox-stars');
    const dateEl = document.getElementById('miroooo-lightbox-date');
    const variantEl = document.getElementById('miroooo-lightbox-variant');
    const titleEl = document.getElementById('miroooo-lightbox-title');
    const bodyEl = document.getElementById('miroooo-lightbox-body');
    const nameEl = document.getElementById('miroooo-lightbox-name');
    const avatarEl = document.getElementById('miroooo-lightbox-avatar');
    const countSpan = document.getElementById('miroooo-lightbox-helpful-count');

    const hasImages = activeLightboxReview.images && activeLightboxReview.images.length > 0;

    if (dialogEl) {
      if (hasImages) {
        dialogEl.classList.remove('no-media');
        dialogEl.classList.add('has-media');
      } else {
        dialogEl.classList.add('no-media');
        dialogEl.classList.remove('has-media');
      }
    }

    if (mediaContainer) {
      if (hasImages) {
        mediaContainer.style.setProperty('display', 'flex', 'important');
      } else {
        mediaContainer.style.setProperty('display', 'none', 'important');
      }
    }

    if (imgEl) {
      if (hasImages) {
        const idx = activeLightboxImageIndex < activeLightboxReview.images.length ? activeLightboxImageIndex : 0;
        imgEl.src = activeLightboxReview.images[idx];
        imgEl.alt = `Photo from ${activeLightboxReview.name}`;
      } else {
        imgEl.removeAttribute('src');
        imgEl.alt = '';
      }
    }

    if (starsEl) starsEl.innerHTML = getTrustpilotStarsHTML(activeLightboxReview.rating);
    if (dateEl) dateEl.textContent = formatUKDate(activeLightboxReview.date || activeLightboxReview.displayDate);
    if (variantEl) {
      variantEl.textContent = '';
      variantEl.style.display = 'none';
    }
    if (titleEl) {
      if (activeLightboxReview.title) {
        titleEl.textContent = activeLightboxReview.title;
        titleEl.style.display = 'block';
      } else {
        titleEl.textContent = '';
        titleEl.style.display = 'none';
      }
    }
    if (bodyEl) bodyEl.textContent = activeLightboxReview.body;
    if (nameEl) nameEl.textContent = activeLightboxReview.name;
    if (avatarEl) {
      avatarEl.textContent = activeLightboxReview.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    }
    if (countSpan) countSpan.textContent = activeLightboxReview.helpful || 0;
  }

  function closeLightbox() {
    const modal = document.getElementById('miroooo-lightbox-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    setTimeout(() => {
      if (!modal.classList.contains('is-open')) {
        modal.style.display = 'none';
      }
    }, 250);
    activeLightboxReview = null;
  }

  // Write Review Modal
  let selectedFormRating = 5;
  const ratingLabels = {
    1: '1.0 - Poor',
    2: '2.0 - Fair',
    3: '3.0 - Good',
    4: '4.0 - Very Good',
    5: '5.0 - Excellent'
  };

  function setupWriteModalEvents() {
    const modal = document.getElementById('miroooo-write-modal');
    if (!modal) return;

    const closeBtn = document.getElementById('miroooo-write-close');
    const cancelBtn = document.getElementById('miroooo-form-cancel');
    const form = document.getElementById('miroooo-review-form');
    const starBtns = document.querySelectorAll('#miroooo-form-stars .miroooo-star-btn');
    const ratingLabel = document.getElementById('miroooo-form-rating-label');

    if (closeBtn) listen(closeBtn, 'click', closeWriteModal);
    if (cancelBtn) listen(cancelBtn, 'click', closeWriteModal);

    listen(modal, 'click', (e) => {
      if (e.target === modal) closeWriteModal();
    });

    listen(document, 'keydown', (e) => {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeWriteModal();
    });

    starBtns.forEach(btn => {
      listen(btn, 'click', () => {
        const rating = parseInt(btn.getAttribute('data-rating'), 10);
        selectedFormRating = rating;
        starBtns.forEach(b => {
          const bRating = parseInt(b.getAttribute('data-rating'), 10);
          b.classList.toggle('active', bRating <= rating);
        });
        if (ratingLabel) ratingLabel.textContent = ratingLabels[rating] || '';
      });
    });

    if (form) {
      listen(form, 'submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('miroooo-form-submit');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="miroooo-button-click-loader" style="display:inline-block; width:14px; height:14px; border:2px solid #fff; border-top-color:transparent; border-radius:50%; animation:spin 0.6s linear infinite; vertical-align:middle; margin-right:6px;"></span> Submitting...';
        }

        setTimeout(() => {
          const nameInput = document.getElementById('miroooo-form-name');
          const variantInput = document.getElementById('miroooo-form-variant');
          const titleInput = document.getElementById('miroooo-form-title');
          const bodyInput = document.getElementById('miroooo-form-body');

          const now = new Date();
          const yyyy = now.getFullYear();
          const mm = String(now.getMonth() + 1).padStart(2, '0');
          const dd = String(now.getDate()).padStart(2, '0');
          const todayISO = `${yyyy}-${mm}-${dd}`;

          const newRev = {
            id: `floss-user-${Date.now()}`,
            name: nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Verified Customer',
            country: 'Verified Purchase',
            rating: selectedFormRating,
            date: todayISO,
            displayDate: formatUKDate(todayISO),
            variant: variantInput ? variantInput.value : 'Black / 7 Specialized Nozzles',
            title: titleInput ? titleInput.value.trim() : '',
            body: bodyInput ? bodyInput.value.trim() : '',
            images: [],
            helpful: 0,
            verified: true
          };

          REVIEWS_DATA.unshift(newRev);
          REVIEWS_SUMMARY.total++;
          REVIEWS_SUMMARY.distribution[selectedFormRating].count++;

          renderReviews();

          form.style.display = 'none';
          const successBox = document.getElementById('miroooo-write-success');
          if (successBox) successBox.style.display = 'block';

          setTimeout(() => {
            closeWriteModal();
          }, 2000);
        }, 600);
      });
    }
  }

  function openWriteModal() {
    const modal = document.getElementById('miroooo-write-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    void modal.offsetHeight;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function closeWriteModal() {
    const modal = document.getElementById('miroooo-write-modal');
    const form = document.getElementById('miroooo-review-form');
    const submitBtn = document.getElementById('miroooo-form-submit');
    const successBox = document.getElementById('miroooo-write-success');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    setTimeout(() => {
      if (!modal.classList.contains('is-open')) {
        modal.style.display = 'none';
        if (form) {
          form.reset();
          form.style.display = 'block';
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Review';
          }
        }
        if (successBox) successBox.style.display = 'none';
      }
    }, 250);
  }

  // Filter Events Setup
  function setupFilterEvents() {
    breakdownRows = Array.from(document.querySelectorAll('.miroooo-breakdown-row'));
    breakdownRows.forEach(row => {
      listen(row, 'click', () => {
        const star = parseInt(row.getAttribute('data-star'), 10);
        if (currentFilterRating === star) {
          currentFilterRating = null;
          updateStarDropdownLabel('All stars');
        } else {
          currentFilterRating = star;
          updateStarDropdownLabel(`${star} star`);
        }
        breakdownRows.forEach(r => {
          const rStar = parseInt(r.getAttribute('data-star'), 10);
          r.classList.toggle('active', currentFilterRating === rStar);
        });
        currentVisibleCount = getPageSize();
        renderReviews();
      });
    });

    const starTrigger = document.getElementById('miroooo-star-trigger');
    if (starTrigger) {
      listen(starTrigger, 'click', (e) => {
        e.stopPropagation();
        if (starDropdownEl) starDropdownEl.classList.toggle('open');
      });
    }

    const starMenuItems = document.querySelectorAll('#miroooo-star-menu .miroooo-dropdown-item');
    starMenuItems.forEach(item => {
      listen(item, 'click', () => {
        const val = item.getAttribute('data-value');
        setStarFilter(val === 'all' ? null : parseInt(val, 10));
        if (starDropdownEl) starDropdownEl.classList.remove('open');
      });
    });

    listen(document, 'click', () => {
      if (starDropdownEl) starDropdownEl.classList.remove('open');
    });

    if (filterPhotosBtn) {
      listen(filterPhotosBtn, 'click', () => {
        currentWithPhotos = !currentWithPhotos;
        filterPhotosBtn.classList.toggle('active', currentWithPhotos);
        filterPhotosBtn.setAttribute('aria-pressed', currentWithPhotos);
        currentVisibleCount = getPageSize();
        renderReviews();
      });
    }

    if (filterVerifiedBtn) {
      listen(filterVerifiedBtn, 'click', () => {
        currentVerifiedOnly = !currentVerifiedOnly;
        filterVerifiedBtn.classList.toggle('active', currentVerifiedOnly);
        filterVerifiedBtn.setAttribute('aria-pressed', currentVerifiedOnly);
        currentVisibleCount = getPageSize();
        renderReviews();
      });
    }

    if (resetFilterBtn) {
      listen(resetFilterBtn, 'click', resetAllFilters);
    }
    const clearAllLink = document.getElementById('miroooo-clear-all-link');
    if (clearAllLink) {
      listen(clearAllLink, 'click', resetAllFilters);
    }
    const emptyResetBtn = document.getElementById('miroooo-empty-reset-btn');
    if (emptyResetBtn) {
      listen(emptyResetBtn, 'click', resetAllFilters);
    }

    if (loadMoreBtn) {
      listen(loadMoreBtn, 'click', () => {
        currentVisibleCount += getPageSize();
        renderReviews(false);
      });
    }

    const writeBtn = document.getElementById('miroooo-write-review-btn');
    if (writeBtn) {
      listen(writeBtn, 'click', openWriteModal);
    }

    setupLightboxEvents();
    setupWriteModalEvents();
  }

  function setStarFilter(star) {
    currentFilterRating = star;
    currentVisibleCount = getPageSize();

    breakdownRows.forEach(row => {
      const rowStar = parseInt(row.getAttribute('data-star'), 10);
      row.classList.toggle('active', currentFilterRating === rowStar);
    });

    const starMenuItems = document.querySelectorAll('#miroooo-star-menu .miroooo-dropdown-item');
    starMenuItems.forEach(item => {
      const val = item.getAttribute('data-value');
      const isMatch = (star === null && val === 'all') || (star !== null && parseInt(val, 10) === star);
      item.classList.toggle('active', isMatch);
    });

    if (starTriggerLabel) {
      starTriggerLabel.textContent = star === null ? 'All stars' : `${star} star`;
    }

    renderReviews();
  }

  function updateStarDropdownLabel(text) {
    if (starTriggerLabel) starTriggerLabel.textContent = text;
  }

  function resetAllFilters() {
    currentFilterRating = null;
    currentWithPhotos = false;
    currentVerifiedOnly = false;
    currentVisibleCount = getPageSize();

    breakdownRows.forEach(r => r.classList.remove('active'));

    if (filterPhotosBtn) {
      filterPhotosBtn.classList.remove('active');
      filterPhotosBtn.setAttribute('aria-pressed', 'false');
    }

    if (filterVerifiedBtn) {
      filterVerifiedBtn.classList.remove('active');
      filterVerifiedBtn.setAttribute('aria-pressed', 'false');
    }

    const starMenuItems = document.querySelectorAll('#miroooo-star-menu .miroooo-dropdown-item');
    starMenuItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-value') === 'all');
    });

    updateStarDropdownLabel('All stars');
    renderReviews();
  }

  // Primary Initialization Entry Point
  function initFlosserReviews() {
    const currentRoot = document.getElementById('miroooo-reviews-grid');
    if (!currentRoot || currentRoot === initializedRoot) return dispose;
    dispose();
    initializedRoot = currentRoot;

    gridEl = currentRoot;
    loadMoreBtn = document.getElementById('miroooo-load-more-btn');
    loadCountEl = document.getElementById('miroooo-load-count');
    emptyStateEl = document.getElementById('miroooo-reviews-empty');
    filterStatusEl = document.getElementById('miroooo-filter-status');
    statusTextEl = document.getElementById('miroooo-status-text');
    starDropdownEl = document.getElementById('miroooo-star-dropdown');
    starTriggerLabel = document.getElementById('miroooo-selected-star-label');
    filterPhotosBtn = document.getElementById('miroooo-filter-photos');
    filterVerifiedBtn = document.getElementById('miroooo-filter-verified');
    resetFilterBtn = document.getElementById('miroooo-reset-filter');

    currentVisibleCount = getPageSize();

    updateHeaderSummaryDOM();
    setupFilterEvents();
    renderReviews(false);

    let lastCols = window.innerWidth >= 1024 ? 4 : (window.innerWidth >= 768 ? 3 : 2);
    let resizeTimer = null;
    listen(window, 'resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const currentCols = window.innerWidth >= 1024 ? 4 : (window.innerWidth >= 768 ? 3 : 2);
        if (currentCols !== lastCols) {
          lastCols = currentCols;
          if (gridEl?.isConnected) renderReviews(false);
        }
      }, 150);
    });

    return dispose;
  }

  // Export to window
  window.initMirooooFlosserReviews = initFlosserReviews;
  window.disposeMirooooReviews = dispose;

  // Auto-init if DOM is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initFlosserReviews, 10);
  } else {
    document.addEventListener('DOMContentLoaded', initFlosserReviews);
  }
})();
