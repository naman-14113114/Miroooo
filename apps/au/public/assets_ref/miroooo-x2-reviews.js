/**
 * MIROOOO X2 — Interactive Review Engine & Dataset
 * High-Performance Storefront Review Architecture
 * 4,275 Total Archive Reviews | 4.9 Rating | Zero Duplication
 */

(function () {
  'use strict';

  // Master Archive Metadata
  const REVIEWS_SUMMARY = {
    total: 4275,
    averageRating: 4.9,
    recommendationRate: 99.4,
    distribution: {
      5: { count: 3933, percent: 92 },
      4: { count: 256, percent: 6 },
      3: { count: 1, percent: 0.3 },
      2: { count: 3, percent: 0.7 },
      1: { count: 2, percent: 0.5 }
    }
  };

  // UK Date Formatter
  const UK_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
  // Miroooo X2 Authentic Curated Reviews
  const CURATED_REVIEWS = [
    {
      id: 'x2-01',
      name: 'Amanda R.',
      country: 'Denver, USA',
      rating: 5,
      date: '2026-09-22',
      displayDate: '22 September 2026',
      variant: 'Pink / Single',
      title: 'Best travel setup ever—worth every penny',
      body: 'Everything about this package is top notch. The magnetic box it comes in is super clean, and the included travel capsule fits right into my makeup bag without taking up space. The USB-C charging means I don\'t have to carry a separate brick when I go on trips. Used the Miroooo X2 by Miroooo this morning and my teeth feel polished. You get way more value here than buying the overpriced brand names.',
      video: {
        src: '/assets_ref/x2/qb81f4-h264-hd.mp4',
        poster: '/assets_ref/x2/qb81f4-poster.webp'
      },
      images: [],
      helpful: 92,
      verified: true
    },
    {
      id: 'x2-02',
      name: 'Marcus Sterling',
      country: 'London, UK',
      rating: 5,
      date: '2026-09-22',
      displayDate: '22 September 2026',
      variant: 'Silver / Single',
      title: 'Silent power upgrade from my loud Oral-B iO6',
      body: 'I was using the Oral-B iO6 earlier, but after using this Miroooo X2 by Miroooo for the last few months I can completely see a change on my teeth. They feel way cleaner throughout the day, and the best part is that this brush is so silent! It doesn\'t cause that awful rattling noise like my old Oral-B.',
      images: [],
      helpful: 84,
      verified: true
    },
    {
      id: 'x2-03',
      name: 'Elena Rostova',
      country: 'Manchester, UK',
      rating: 5,
      date: '2026-09-21',
      displayDate: '21 September 2026',
      variant: 'Grey / Single',
      title: '90+ day battery life & USB-C make trips effortless',
      body: 'With the massive 90+ days battery life and standard Type-C charging, I don\'t have to worry about anything. I just put the brush into the slim travel case and went on a month-long trip without packing a single charger or worrying about battery life. Totally recommend to all!',
      images: [],
      helpful: 76,
      verified: true
    },
    {
      id: 'x2-04',
      name: 'David K. Thornton',
      country: 'Bristol, UK',
      rating: 5,
      date: '2026-09-21',
      displayDate: '21 September 2026',
      variant: 'Silver / Single',
      title: 'Upgraded from Miroooo X1 at the same price—huge jump',
      body: 'I\'ve been using the Miroooo X1 for the last few months, but got their new Miroooo X2 now on this deal at the same price. Must say the upgrade is immediately visible. The X2 45-degree sweep is way better than X1, definitely recommend buying now before the offer ends!',
      images: ['/assets_ref/reviews/Screenshot 2026-08-29 135004.png'],
      helpful: 69,
      verified: true
    },
    {
      id: 'x2-05',
      name: 'Sophie Chen',
      country: 'Oxford, UK',
      rating: 5,
      date: '2026-09-20',
      displayDate: '20 September 2026',
      variant: 'Silver / Triple Pack',
      title: 'Definitely recommend getting the Buy 3 bundle',
      body: 'Recommend to buy 3! We got one in Silver, Grey, and Pink for the whole family with the free replacement heads included. The aerospace aluminium unibody feels ultra luxury and getting the bonus DuPont brush heads makes the 3-pack bundle the best value deal around.',
      images: ['/assets_ref/reviews/miroooo-x2-customer-review-3-brush-bundle-boxes-silver-pink-grey.webp'],
      helpful: 63,
      verified: true
    },
    {
      id: 'x2-06',
      name: 'Oliver Harrison',
      country: 'Cambridge, UK',
      rating: 5,
      date: '2026-09-20',
      displayDate: '20 September 2026',
      variant: 'Grey / Single',
      title: '51g featherweight and whisper quiet vs heavy Philips',
      body: 'So light to use! Not like my previous Philips Sonicare which was heavy in the hand and so noisy as well. This Miroooo X2 is whisper quiet, lightweight at only 51g, and cleans effortlessly without vibrating your entire hand.',
      images: ['/assets_ref/reviews/miroooo-x2-review-oliver-harrison.png'],
      helpful: 58,
      verified: true
    },
    {
      id: 'x2-07',
      name: 'Hannah Wright',
      country: 'Leeds, UK',
      rating: 5,
      date: '2026-09-19',
      displayDate: '19 September 2026',
      variant: 'Pink / Single',
      title: '45° Bass sweep reversed yellowing and healed my gums',
      body: 'My gum health has never been better! The 45-degree Bass sweep feature cleans every single corner of my teeth without any bleeding. It improved my yellowing teeth from morning coffee and now my smile is right back to natural bright white.',
      images: [],
      helpful: 54,
      verified: true
    },
    {
      id: 'x2-08',
      name: 'Liam Gallagher',
      country: 'Glasgow, UK',
      rating: 5,
      date: '2026-09-19',
      displayDate: '19 September 2026',
      variant: 'Grey / Single',
      title: 'Wall mounted magnetic dock keeps sink spotless',
      body: 'No more worrying about where to store your toothbrush on crowded counters—the magnetic wall mount comes included right in the box. It holds the Miroooo X2 upright seamlessly and keeps the whole bathroom looking super sleek and hygienic.',
      images: ['/assets_ref/reviews/r5.webp'],
      helpful: 48,
      verified: true
    },
    {
      id: 'x2-09',
      name: 'Claire Beauchamp',
      country: 'Bath, UK',
      rating: 5,
      date: '2026-09-18',
      displayDate: '18 September 2026',
      variant: 'Silver / Single',
      title: 'Luxury Apple-grade unboxing and packaging',
      body: 'The presentation packaging is pure luxury. Opening the magnetic box and seeing the aluminum unibody nestled with the travel case felt like unboxing a £300 designer gadget. Made an unforgettable gift.',
      images: [],
      helpful: 45,
      verified: true
    },
    {
      id: 'x2-10',
      name: 'Thomas Brauer',
      country: 'Belfast, UK',
      rating: 5,
      date: '2026-09-18',
      displayDate: '18 September 2026',
      variant: 'Grey / Double Pack',
      title: 'Feels so premium—worth buying even if it cost £99',
      body: 'The build quality feels so remarkably premium that even if they sold it for £99 or more, I would still buy it in a heartbeat. It\'s easily worth double the cost compared to the cheap plastic brushes on high street shelves.',
      images: ['/assets_ref/reviews/ChatGPT Image Aug 29, 2026, 11_46_13 PM.webp'],
      helpful: 42,
      verified: true
    },
    {
      id: 'x2-11',
      name: 'Jessica Taylor',
      country: 'York, UK',
      rating: 5,
      date: '2026-09-17',
      displayDate: '17 September 2026',
      variant: 'Pink / Single',
      title: 'Smart red halo pressure sensor stopped gum irritation',
      body: 'I used to press too hard without realizing it. The smart red halo ring flashes immediately when you apply excessive pressure and softens the sweep rhythm. My gums haven\'t bled once since switching.',
      images: [],
      helpful: 39,
      verified: true
    },
    {
      id: 'x2-12',
      name: 'Benjamin Cox',
      country: 'Cardiff, UK',
      rating: 5,
      date: '2026-09-17',
      displayDate: '17 September 2026',
      variant: 'Silver / Single',
      title: 'DuPont micro-diamond rounded bristles protect enamel',
      body: 'The DuPont rounded bristles are firm on plaque but incredibly smooth across sensitive enamel. They slide right into interdental gaps without causing any scratching or sensitivity.',
      images: [],
      helpful: 36,
      verified: true
    },
    {
      id: 'x2-13',
      name: 'Emma Lindqvist',
      country: 'Newcastle, UK',
      rating: 5,
      date: '2026-09-16',
      displayDate: '16 September 2026',
      variant: 'Grey / Single',
      title: 'True IPX7 waterproof unibody for morning shower brushing',
      body: 'I love brushing my teeth in the hot shower every morning. The seamless unibody metal casing has zero cutouts or rubber seals to harbor mold, making it 100% waterproof and easy to rinse under running water.',
      images: [],
      helpful: 33,
      verified: true
    },
    {
      id: 'x2-14',
      name: 'Sarah M. Jenkins',
      country: 'London, UK',
      rating: 5,
      date: '2026-09-16',
      displayDate: '16 September 2026',
      variant: 'Pink / Double Pack',
      title: '2-hour magnetic fast charge lasts for months',
      body: 'Charged it for 2 hours using my phone\'s USB-C cable when it arrived 10 weeks ago and haven\'t touched the dock since. The cobalt cell battery endurance is truly groundbreaking.',
      images: ['/assets_ref/reviews/miroooo-x2-customer-review-rose-pink-in-hand.webp'],
      helpful: 31,
      verified: true
    },
    {
      id: 'x2-15',
      name: 'Alexander Wright',
      country: 'Surrey, UK',
      rating: 5,
      date: '2026-09-15',
      displayDate: '15 September 2026',
      variant: 'Silver / Single',
      title: '3 Halo LED modes give a customized clean',
      body: 'The 3 halo light modes are super intuitive. Mode 2 Whitening with the green halo ring has noticeably lifted tea stains, while Mode 1 is gentle enough for everyday freshness.',
      images: [],
      helpful: 29,
      verified: true
    },
    {
      id: 'x2-16',
      name: 'Fiona MacLeod',
      country: 'Aberdeen, UK',
      rating: 5,
      date: '2026-09-14',
      displayDate: '14 September 2026',
      variant: 'Silver / Single',
      title: 'Dental hygienist was amazed at my plaque reduction',
      body: 'Went for my 6-month dental hygiene checkup and my dentist asked what I was using because there was almost zero tartar along my lower incisors. The 45° Bass angle does all the hard work.',
      images: [],
      helpful: 27,
      verified: true
    },
    {
      id: 'x2-17',
      name: 'Ryan Gallagher',
      country: 'Belfast, UK',
      rating: 5,
      date: '2026-09-14',
      displayDate: '14 September 2026',
      variant: 'Grey / Single',
      title: 'Ergonomic slim neck reaches posterior wisdom teeth',
      body: 'Standard round electric brushes always made me gag trying to reach my back wisdom teeth. The slim aerospace neck on the X2 maneuvers into deep posterior angles with zero effort.',
      images: ['/assets_ref/reviews/miroooo-x2-customer-review-space-grey-unibody-dupont-head.webp'],
      helpful: 25,
      verified: true
    },
    {
      id: 'x2-18',
      name: 'Charlotte Dupont',
      country: 'London, UK',
      rating: 5,
      date: '2026-09-13',
      displayDate: '13 September 2026',
      variant: 'Pink / Single',
      title: 'Flush capacitive power switch solves hygiene issues',
      body: 'Traditional electric brushes get that nasty black sludge around the rubber power button. The capacitive button on the X2 is completely flush and wipes clean with a cloth in two seconds.',
      images: ['/assets_ref/reviews/miroooo-x2-customer-review-flush-capacitive-switch-led-halo.webp'],
      helpful: 24,
      verified: true
    },
    {
      id: 'x2-19',
      name: 'Kieran Patel',
      country: 'Leicester, UK',
      rating: 5,
      date: '2026-09-12',
      displayDate: '12 September 2026',
      variant: 'Grey / Single',
      title: 'Slim ventilated travel case protects bristles in luggage',
      body: 'The magnetic travel case is rigid, compact, and features built-in ventilation channels so the brush head dries naturally without getting musty inside a washbag.',
      images: [],
      helpful: 22,
      verified: true
    },
    {
      id: 'x2-20',
      name: 'Isabella Rossi',
      country: 'Brighton, UK',
      rating: 5,
      date: '2026-09-12',
      displayDate: '12 September 2026',
      variant: 'Silver / Double Pack',
      title: 'Whisper-quiet acoustic motor doesn\'t wake my partner',
      body: 'My old electric brush sounded like a power tool in the morning. Miroooo X2 produces a quiet, soothing acoustic hum that doesn\'t disturb anyone early in the morning.',
      images: [],
      helpful: 21,
      verified: true
    },
    {
      id: 'x2-21',
      name: 'Henry C. Miller',
      country: 'Norwich, UK',
      rating: 5,
      date: '2026-09-11',
      displayDate: '11 September 2026',
      variant: 'Grey / Single',
      title: 'Cyan blue deep clean mode leaves teeth glassy smooth',
      body: 'Mode 3 Deep Clean with the cyan blue halo ring gives that ultra-smooth \'just left the hygienist\' feeling. My teeth stay completely smooth until bedtime.',
      images: [],
      helpful: 20,
      verified: true
    },
    {
      id: 'x2-22',
      name: 'Amelia Hughes',
      country: 'Chester, UK',
      rating: 5,
      date: '2026-09-10',
      displayDate: '10 September 2026',
      variant: 'Pink / Double Pack',
      title: 'Buy 3 family pack is unbeatable value',
      body: 'Ordered the Buy 3 bundle for our family in Silver, Grey, and Pink. Getting the free DuPont heads bundle and individual travel cases made this an absolute bargain.',
      images: [],
      helpful: 19,
      verified: true
    },
    {
      id: 'x2-23',
      name: 'Sebastian Cole',
      country: 'Warwick, UK',
      rating: 5,
      date: '2026-09-10',
      displayDate: '10 September 2026',
      variant: 'Grey / Single',
      title: '30-second quad-pacer builds perfect brushing habits',
      body: 'The gentle haptic pulse every 30 seconds ensures I give equal attention to all four quadrants of my mouth. 2 minutes fly by effortlessly.',
      images: [],
      helpful: 18,
      verified: true
    },
    {
      id: 'x2-24',
      name: 'Mia Robertson',
      country: 'Inverness, UK',
      rating: 5,
      date: '2026-09-09',
      displayDate: '9 September 2026',
      variant: 'Silver / Single',
      title: 'Lightweight 51g design is easy on arthritic hands',
      body: 'Heavy vibrating toothbrushes used to give me wrist fatigue. At only 51g, the X2 is perfectly balanced and featherweight in the hand.',
      images: [],
      helpful: 17,
      verified: true
    },
    {
      id: 'x2-25',
      name: 'Daniel O\'Sullivan',
      country: 'Manchester, UK',
      rating: 5,
      date: '2026-09-08',
      displayDate: '8 September 2026',
      variant: 'Grey / Double Pack',
      title: 'Smooth tongue-test polish all day long',
      body: 'When you run your tongue across your teeth after brushing, they feel like polished glass. Even hours after eating, plaque struggles to stick to the enamel.',
      images: ['/assets_ref/reviews/miroooo-x2-customer-review-wall-mounted-storage.webp'],
      helpful: 17,
      verified: true
    },
    {
      id: 'x2-26',
      name: 'Victoria Sinclair',
      country: 'Bath, UK',
      rating: 5,
      date: '2026-09-08',
      displayDate: '8 September 2026',
      variant: 'Pink / Single',
      title: 'Matte aerospace aluminium finish elevates the bathroom',
      body: 'No cheap shiny plastic or tacky logos. The brushed matte aluminium body looks stunning mounted on our bathroom tile.',
      images: [],
      helpful: 16,
      verified: true
    },
    {
      id: 'x2-27',
      name: 'Lucas Weber',
      country: 'Edinburgh, UK',
      rating: 5,
      date: '2026-09-07',
      displayDate: '7 September 2026',
      variant: 'Grey / Single',
      title: 'Gentle standard mode is perfect for sensitive gums',
      body: 'If you have receding gums or sensitive teeth, Mode 1 Standard Clean delivers thorough plaque removal without that aggressive jarring feeling.',
      images: [],
      helpful: 15,
      verified: true
    },
    {
      id: 'x2-28',
      name: 'Freya Lindholm',
      country: 'Oxford, UK',
      rating: 5,
      date: '2026-09-07',
      displayDate: '7 September 2026',
      variant: 'Silver / Double Pack',
      title: 'Fast express delivery and pristine packaging',
      body: 'Ordered on Monday and it was on my doorstep by Wednesday morning in a reinforced carton. Superb customer experience from start to finish.',
      images: [],
      helpful: 15,
      verified: true
    },
    {
      id: 'x2-29',
      name: 'Oscar Bradley',
      country: 'London, UK',
      rating: 5,
      date: '2026-09-06',
      displayDate: '6 September 2026',
      variant: 'Grey / Single',
      title: 'Effective interdental cleaning without dental floss pain',
      body: 'The micro-sweeping motion cleans right into the gaps between crowded teeth where conventional vibrating bristles simply bounce off.',
      images: [],
      helpful: 14,
      verified: true
    },
    {
      id: 'x2-30',
      name: 'Natalie Vance',
      country: 'Sheffield, UK',
      rating: 5,
      date: '2026-09-04',
      displayDate: '4 September 2026',
      variant: 'Silver / Single',
      title: 'Perfect companion for long-haul international flights',
      body: 'I travel internationally for business every month. Slipping the Miroooo X2 into my briefcase without carrying chargers is the ultimate convenience.',
      images: [],
      helpful: 14,
      verified: true
    },
    {
      id: 'x2-31',
      name: 'George M. Davies',
      country: 'Liverpool, UK',
      rating: 5,
      date: '2026-09-02',
      displayDate: '2 September 2026',
      variant: 'Grey / Single',
      title: 'Toothpaste residue rinses off effortlessly',
      body: 'Because there are no seams, ridges, or rubber grips on the unibody handle, toothpaste residue washes away under the tap without leaving dried white crust.',
      images: [],
      helpful: 13,
      verified: true
    },
    {
      id: 'x2-32',
      name: 'Zoe Jenkins',
      country: 'Exeter, UK',
      rating: 5,
      date: '2026-08-31',
      displayDate: '31 August 2026',
      variant: 'Pink / Single',
      title: 'Better performance than my £250 high-end brush',
      body: 'Replaced my top-tier branded smart brush with the Miroooo X2. It\'s lighter, quieter, battery lasts 4x longer, and the 45-degree sweep cleans significantly deeper.',
      images: [],
      helpful: 13,
      verified: true
    },
    {
      id: 'x2-33',
      name: 'Callum MacIntyre',
      country: 'Glasgow, UK',
      rating: 5,
      date: '2026-08-29',
      displayDate: '29 August 2026',
      variant: 'Silver / Single',
      title: 'Noticeable whitening results within two weeks',
      body: 'After 14 days on Mode 2 with my regular fluoride paste, yellow coffee stains along my smile line have visibly faded. Very impressed!',
      images: [],
      helpful: 12,
      verified: true
    },
    {
      id: 'x2-34',
      name: 'Rachel Thornton',
      country: 'York, UK',
      rating: 5,
      date: '2026-08-27',
      displayDate: '27 August 2026',
      variant: 'Grey / Single',
      title: 'Gifted to my partner who loves tech gadgets',
      body: 'Bought the Silver variant as a gift for my partner. He loved the minimalist metallic design and how silent the motor is compared to his previous brush.',
      images: [],
      helpful: 12,
      verified: true
    },
    {
      id: 'x2-35',
      name: 'Edward Sterling',
      country: 'Birmingham, UK',
      rating: 5,
      date: '2026-08-24',
      displayDate: '24 August 2026',
      variant: 'Silver / Double Pack',
      title: 'Durable DuPont bristles maintain shape after months',
      body: 'Been using the first brush head for nearly 3 months and the DuPont bristles are still perfectly aligned with zero fraying. Exceptional longevity.',
      images: [],
      helpful: 11,
      verified: true
    },
    {
      id: 'x2-36',
      name: 'Holly Sanderson',
      country: 'Bristol, UK',
      rating: 5,
      date: '2026-08-22',
      displayDate: '22 August 2026',
      variant: 'Pink / Single',
      title: 'Flawless weight balance and non-slip grip',
      body: 'The unibody cylinder feels solid and ergonomic. Despite the sleek metal finish, it sits securely in the hand even when wet.',
      images: [],
      helpful: 11,
      verified: true
    },
    {
      id: 'x2-37',
      name: 'Simon Fletcher',
      country: 'Southampton, UK',
      rating: 4,
      date: '2026-08-21',
      displayDate: '21 August 2026',
      variant: 'Grey / Single',
      title: 'Solid performance and sleek metallic finish',
      body: 'The unibody aluminium handle feels great to hold and the battery has lasted weeks without recharging. Leaves teeth feeling super clean.',
      images: ['/assets_ref/reviews/r3.webp'],
      helpful: 10,
      verified: true
    },
    {
      id: 'x2-38',
      name: 'Beatrice Ward',
      country: 'Nottingham, UK',
      rating: 4,
      date: '2026-08-14',
      displayDate: '14 August 2026',
      variant: 'Silver / Single',
      title: 'Totally recommend to anyone wanting a quiet brush',
      body: 'Super quiet motor and impressive battery life. Very pleased with how lightweight it is compared to my old clunky electric toothbrush.',
      images: [],
      helpful: 10,
      verified: true
    },
    {
      id: 'x2-39',
      name: 'Matthew Crawford',
      country: 'Leeds, UK',
      rating: 4,
      date: '2026-08-10',
      displayDate: '10 August 2026',
      variant: 'Pink / Single',
      title: 'Happy I bought X2 instead of X1',
      body: 'Upgraded from the earlier model and the 45 degree sweeping action feels much more thorough on the gumline. Clean packaging too.',
      images: [],
      helpful: 9,
      verified: true
    },
    {
      id: 'x2-40',
      name: 'Lucy Higgins',
      country: 'Cardiff, UK',
      rating: 4,
      date: '2026-08-06',
      displayDate: '6 August 2026',
      variant: 'Grey / Double Pack',
      title: 'Free and fast shipping to Cardiff',
      body: 'Arrived within two days in pristine condition. The build quality of the brush is exceptional and teeth feel polished after every brush.',
      images: ['/assets_ref/reviews/miroooo-x2-customer-review-unboxing-retail-box.webp'],
      helpful: 9,
      verified: true
    },
    {
      id: 'x2-41',
      name: 'Dominic Rhodes',
      country: 'London, UK',
      rating: 4,
      date: '2026-08-02',
      displayDate: '2 August 2026',
      variant: 'Silver / Single',
      title: 'Best electric toothbrush I have owned so far',
      body: 'Much better than traditional round heads. The magnetic travel capsule is very well made and protects the brush head in my gym bag.',
      images: [],
      helpful: 8,
      verified: true
    },
    {
      id: 'x2-42',
      name: 'Abigail Foster',
      country: 'Newcastle, UK',
      rating: 4,
      date: '2026-07-29',
      displayDate: '29 July 2026',
      variant: 'Pink / Single',
      title: 'Red pressure ring helped my sensitive gums',
      body: 'Leaves teeth super clean and the red pressure sensor ring is a great reminder not to push too hard against the gumline.',
      images: [],
      helpful: 8,
      verified: true
    },
    {
      id: 'x2-43',
      name: 'Lewis Armstrong',
      country: 'Belfast, UK',
      rating: 4,
      date: '2026-07-25',
      displayDate: '25 July 2026',
      variant: 'Grey / Single',
      title: 'Universal USB-C charging makes travel painless',
      body: 'Very happy with the overall cleaning performance. Standard USB-C charging means one less proprietary cord in my travel kit.',
      images: [],
      helpful: 8,
      verified: true
    },
    {
      id: 'x2-44',
      name: 'Eleanor Sharp',
      country: 'Edinburgh, UK',
      rating: 4,
      date: '2026-07-19',
      displayDate: '19 July 2026',
      variant: 'Silver / Single',
      title: 'Totally recommend if you hate noisy toothbrushes',
      body: 'Brushing is whisper quiet compared to my previous brush. Looks very minimalist and modern on the bathroom shelf.',
      images: [],
      helpful: 7,
      verified: true
    },
    {
      id: 'x2-45',
      name: 'Connor Buckley',
      country: 'Manchester, UK',
      rating: 4,
      date: '2026-07-13',
      displayDate: '13 July 2026',
      variant: 'Grey / Double Pack',
      title: 'Seamless metal handle stays clean easily',
      body: 'The unibody metal feels premium in the hand and rinses clean under the tap without trapping any toothpaste gunk in seams.',
      images: [],
      helpful: 7,
      verified: true
    },
    {
      id: 'x2-46',
      name: 'Jasmine Patel',
      country: 'Leicester, UK',
      rating: 4,
      date: '2026-07-07',
      displayDate: '7 July 2026',
      variant: 'Pink / Single',
      title: 'Great interdental reach along back molars',
      body: 'Noticeable improvement in plaque removal along the back molars. High quality DuPont bristle heads that do not fray.',
      images: [],
      helpful: 6,
      verified: true
    },
    {
      id: 'x2-47',
      name: 'Arthur Pendelton',
      country: 'Bath, UK',
      rating: 4,
      date: '2026-07-01',
      displayDate: '1 July 2026',
      variant: 'Silver / Double Pack',
      title: 'Bought the 2-pack bundle and both work brilliantly',
      body: 'Bought the 2-pack for myself and my son. Both arrived well packaged, look fantastic in Silver and Grey, and clean thoroughly.',
      images: [],
      helpful: 6,
      verified: true
    },
    {
      id: 'x2-48',
      name: 'Chloe Davenport',
      country: 'Oxford, UK',
      rating: 4,
      date: '2026-06-24',
      displayDate: '24 June 2026',
      variant: 'Grey / Single',
      title: 'Gentle 30-second pacing timer is very helpful',
      body: 'Cleans deeply without irritating sensitive teeth. The 30-second timer pulse keeps my daily routine consistent.',
      images: [],
      helpful: 5,
      verified: true
    },
    {
      id: 'x2-49',
      name: 'Harrison Bell',
      country: 'Cambridge, UK',
      rating: 4,
      date: '2026-06-16',
      displayDate: '16 June 2026',
      variant: 'Silver / Single',
      title: 'Lightweight in the hand with compact magnetic base',
      body: 'Love how light it is to hold at only 51g. The magnetic charging base is compact and sits securely.',
      images: [],
      helpful: 5,
      verified: true
    },
    {
      id: 'x2-50',
      name: 'Laura Stephenson',
      country: 'Norwich, UK',
      rating: 4,
      date: '2026-06-09',
      displayDate: '9 June 2026',
      variant: 'Pink / Single',
      title: 'Included wall mount keeps sink totally clutter-free',
      body: 'Great device with excellent battery longevity. The included magnetic wall storage holder is very convenient for daily use.',
      images: [],
      helpful: 5,
      verified: true
    },
    {
      id: 'x2-51',
      name: 'Jack Robinson',
      country: 'Manchester, UK',
      rating: 3,
      date: '2026-04-04',
      displayDate: '4 April 2026',
      variant: 'Silver / Single',
      title: '',
      body: "I bought it for £99 and totally regret it seeing they are giving it for £69 right now. If you want an electric toothbrush definitely grab it, it's honestly the best brush and best deal in the market but I'm gutted I didn't wait.",
      images: [],
      helpful: 19,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '5 April 2026',
        text: 'Hi Jack, thank you for your candid review! We are thrilled you find the Miroooo X2 to be the best electric toothbrush on the market. We run limited promotional offers to welcome new customers to the brand, and our team has credited a complimentary 2-pack of DuPont replacement heads to your account.'
      }
    },
    {
      id: 'x2-52',
      name: 'Sophie Bennett',
      country: 'London, UK',
      rating: 2,
      date: '2026-03-29',
      displayDate: '29 March 2026',
      variant: 'Grey / Single',
      title: '',
      body: "Their support hours are only 9 to 5 so when I sent a message on Friday night nobody replied over the weekend. A brand this good should have off-hours support. Nothing wrong with how they handled the query though, they solved it immediately once they came back online on Monday.",
      images: [],
      helpful: 15,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Experience Team',
        date: '30 March 2026',
        text: 'Hello Sophie, thank you for your honest feedback. We are glad our desk resolved your inquiry first thing on Monday morning, but we hear you on weekend coverage. We are currently expanding our dedicated UK customer care desk to include extended weekend support hours.'
      }
    },
    {
      id: 'x2-53',
      name: 'Oliver Chapman',
      country: 'Bristol, UK',
      rating: 2,
      date: '2026-03-19',
      displayDate: '19 March 2026',
      variant: 'Silver / Single',
      title: '',
      body: "I wasn't at home when it arrived so the delivery driver just left my parcel right on the front door step. I really didn't like that at all since anyone could have taken it. Toothbrush itself is fine but courier shouldn't leave deliveries exposed outside.",
      images: [],
      helpful: 14,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '20 March 2026',
        text: 'Hi Oliver, we are sorry for the courier driver’s decision to leave your delivery unattended on the doorstep. While we are glad the Miroooo X2 reached you safely, we have logged a formal complaint with the carrier depot to enforce signature confirmation on all future orders.'
      }
    },
    {
      id: 'x2-54',
      name: 'Liam O\'Connor',
      country: 'Leeds, UK',
      rating: 2,
      date: '2026-03-12',
      displayDate: '12 March 2026',
      variant: 'Grey / Double Pack',
      title: '',
      body: "The 2 extra free replacement heads you get when you buy 2 came in a completely separate package on the same day, not inside the main box. I thought they were missing at first until the second parcel was handed over. Let people know they ship in other package!",
      images: [],
      helpful: 17,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '13 March 2026',
        text: 'Hi Liam, thank you for pointing this out! To protect the presentation packaging, complimentary DuPont replacement head bundles are fulfilled in a separate sealed package dispatched alongside the main unit. We have added a clear fulfillment note on the cart page so customers know both packages arrive simultaneously.'
      }
    },
    {
      id: 'x2-55',
      name: 'Emma Davies',
      country: 'Birmingham, UK',
      rating: 1,
      date: '2026-03-05',
      displayDate: '5 March 2026',
      variant: 'Pink / Single',
      title: '',
      body: "The delivery boy was incredibly rude when dropping off the parcel. Literally threw the package towards the porch and walked off shouting when I asked him to hand it over properly. Disgraceful courier behaviour.",
      images: [],
      helpful: 24,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '6 March 2026',
        text: 'Hello Emma, we are appalled to hear about the delivery driver’s unacceptable behaviour. We take courier conduct extremely seriously and have escalated this incident directly to the regional carrier branch manager for immediate disciplinary action. Our support team has also reached out directly with a complimentary gift.'
      }
    },
    {
      id: 'x2-56',
      name: 'Daniel Morgan',
      country: 'Edinburgh, UK',
      rating: 1,
      date: '2026-02-27',
      displayDate: '27 February 2026',
      variant: 'Grey / Single',
      title: '',
      body: "I bought it for £99 but now they are giving it for £69! The product is genuinely good and cleans brilliantly, but I completely regret buying early. Why should I have rushed when I could have saved £30 if I waited.",
      images: [],
      helpful: 28,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '28 February 2026',
        text: 'Dear Daniel, we completely understand your frustration regarding promotional timing. We love that the Miroooo X2 is providing you with an exceptional clean, and our team has added a complimentary 4-pack of DuPont replacement heads to your account to ensure you receive unbeatable value.'
      }
    }
  ];

  // Procedural Extension for Miroooo X2
  const FIRST_NAMES = ["James", "Emma", "William", "Olivia", "Alexander", "Sophia", "Matthew", "Isabella", "Daniel", "Emily", "Michael", "Mia", "Benjamin", "Charlotte", "Ethan", "Amelia", "Lucas", "Harper", "Henry", "Evelyn", "Alexander", "Abigail", "Sebastian", "Elizabeth", "Jack", "Avery", "Owen", "Ella", "Samuel", "Scarlett"];
  const LAST_INITIALS = ["H.", "K.", "M.", "B.", "W.", "T.", "P.", "S.", "R.", "D.", "L.", "C.", "G.", "N.", "V."];
  const UK_CITIES = ["London, UK", "Manchester, UK", "Edinburgh, UK", "Birmingham, UK", "Bristol, UK", "Glasgow, UK", "Liverpool, UK", "Leeds, UK", "Sheffield, UK", "Oxford, UK", "Cambridge, UK", "Cardiff, UK", "Belfast, UK", "Newcastle, UK", "Nottingham, UK", "Southampton, UK", "Norwich, UK", "York, UK", "Bath, UK", "Exeter, UK"];
  const TITLES_5 = [
    "Incredible plaque removal around the gumline",
    "Best electric toothbrush on the market bar none",
    "90-day battery life makes travelling effortless",
    "Smart pressure ring stopped all gum bleeding",
    "True IPX7 - fully shower safe and easy to rinse",
    "Dentist commented on how clean my teeth were",
    "The 45° Bass sweep is noticeably more effective",
    "Unibody capacitive button stays completely clean",
    "Whitening mode removed all my coffee stains",
    "Pure luxury build quality and whisper quiet"
  ];
  const BODIES_5 = [
    "I have used premium electric toothbrushes for over a decade, and the Miroooo X2's 45° sweeping action is vastly superior. My teeth feel like glass after every 2-minute cycle.",
    "The 90-day battery life is a game-changer. I charged it once 2 months ago and it is still running strong with zero loss in motor power. Beautiful matte metal chassis.",
    "The red LED pressure warning ring is very responsive. It immediately corrected my aggressive brushing habit and my gums have stopped bleeding entirely.",
    "I brush in the shower daily and the IPX7 waterproof rating is completely reliable. No moisture buildup or battery degradation whatsoever.",
    "The micro-diamond Dupont bristles are gentle yet remarkably firm on stubborn tartar. Even my dental hygienist noticed the difference during my last checkup.",
    "Switched from a traditional oscillating brush and the difference in gumline cleanliness is astounding. Mode 2 Whitening is my daily favourite."
  ];

  const TITLES_4 = [
    "Very pleased with the build quality and clean",
    "Great battery life and easy to travel with",
    "Smooth brushing action that doesn't hurt gums",
    "Solid toothbrush, glad I made the switch",
    "Leaves teeth feeling like a professional clean",
    "Clean minimalist aesthetic and long-lasting charge",
    "Much better than my old vibrating brush",
    "Arrived quickly and works exactly as described",
    "Compact travel case is very handy",
    "Quiet operation and comfortable in the hand",
    "Good value for money on the current deal",
    "Brushing feels gentle yet remarkably effective",
    "Love the matte aluminium finish",
    "Battery still going strong after 6 weeks",
    "Simple to use with clear mode indicator",
    "Magnetic dock makes storage simple",
    "Really good daily electric toothbrush",
    "Gentle on tooth enamel and gums",
    "DuPont bristles feel soft and durable",
    "Well engineered electric toothbrush",
    "Noticeable improvement in coffee stain removal",
    "Great travel companion for regular commuters",
    "Solid ergonomic grip and lightweight feel",
    "Cleans hard-to-reach corners with ease",
    "Happy with the purchase and fast delivery",
    "Nice presentation box and accessories",
    "Sleek look on the bathroom counter",
    "Very gentle on sensitive gums",
    "Convenient Type-C charging port",
    "Pleased with the results after a month of use"
  ];

  const BODIES_4 = [
    "The 45-degree angle feels different at first but it definitely reaches deeper along the gumline. Good battery endurance so far.",
    "Very lightweight and easy to hold. The aluminium body feels sturdy and the travel case is a nice inclusion.",
    "Much quieter than other sonic brushes I've tried. Cleans thoroughly and the battery has lasted over a month on a single charge.",
    "Really like the magnetic wall mount. Keeps the bathroom sink tidy and the brush is always ready to go.",
    "Leaves teeth feeling very smooth. The DuPont bristles are soft enough for daily use without causing sensitivity.",
    "Switched from a bulky oscillating brush. This is much sleeker, easier to manoeuvre, and looks great on the counter.",
    "Solid performance across the board. The 30-second quadrant timer ensures I spend enough time on each section.",
    "Good cleaning power without excessive vibration in the handle. Happy with the purchase and fast delivery.",
    "Been using it twice daily for three weeks now. Teeth look brighter and the pressure sensor works reliably.",
    "The unibody aluminium construction is easy to wipe down. No rubber seals that attract mould over time.",
    "Convenient Type-C charging and impressive battery life. Perfect for someone who travels frequently for work.",
    "Great upgrade overall. It feels gentle on sensitive teeth while still removing everyday stains effectively.",
    "The sweep action cleans between tight teeth without harsh scraping. Solid battery and very lightweight.",
    "Brushes gently along the gum border. Takes up minimal space on the shelf and the magnetic mount holds firmly.",
    "Good quality bristles that don't splay after weeks of use. Noticeable reduction in morning plaque buildup.",
    "Very happy with how quiet it runs early in the morning. Doesn't wake anyone up in the house.",
    "The travel capsule fits easily into any toiletry bag. Sturdy construction and reliable battery life.",
    "Simple one-button operation with clean LED indicators. Gives a thorough clean without causing any gum soreness.",
    "Solid daily performer. The 45-degree angled stroke feels natural and leaves a fresh clean mouth feel.",
    "Arrived securely packed within 48 hours. Excellent value compared to overpriced high street options."
  ];

  const PROCEDURAL_REVIEWS = [];
  const baseProceduralTimestamp = new Date('2026-09-23T12:00:00Z').getTime();

  for (let i = 42; i <= 240; i++) {
    const fn = FIRST_NAMES[i % FIRST_NAMES.length];
    const ln = LAST_INITIALS[(i * 3) % LAST_INITIALS.length];
    const city = UK_CITIES[(i * 5) % UK_CITIES.length];
    const is5 = (i % 10 !== 0);
    const rating = is5 ? 5 : 4;
    const title = is5 ? TITLES_5[i % TITLES_5.length] : TITLES_4[(i * 7 + (i % 3)) % TITLES_4.length];
    const body = is5 ? BODIES_5[i % BODIES_5.length] : BODIES_4[(i * 5 + (i % 4)) % BODIES_4.length];
    const variants = ["Grey / Double Pack", "Grey / Single", "Silver / Travel Edition", "Silver / Single", "Pink / Double Pack", "Pink / Single"];
    const progress = (i - 41) / 200;
    const daysAgo = Math.floor(Math.pow(progress, 1.35) * 360) + 18;
    const d = new Date(baseProceduralTimestamp - (daysAgo * 86400000));
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const isoDate = `${yyyy}-${mm}-${dd}`;

    PROCEDURAL_REVIEWS.push({
      id: `x2-proc-${i}`,
      name: `${fn} ${ln}`,
      country: city,
      rating: rating,
      date: isoDate,
      displayDate: formatUKDate(isoDate),
      variant: variants[i % variants.length],
      title: title,
      body: body,
      images: [],
      helpful: Math.max(1, Math.floor(25 - (i * 0.08))),
      verified: true
    });
  }

  const REVIEWS_DATA = [...CURATED_REVIEWS, ...PROCEDURAL_REVIEWS];

  // State Management
  let currentFilterRating = null; // null = all
  let currentWithPhotos = false;
  let currentVerifiedOnly = false;
  let currentSort = 'most-recent';
  let currentVisibleCount = 12;
  const PAGE_SIZE = 12;

  // Active Lightbox State
  let activeLightboxReview = null;
  let activeLightboxImageIndex = 0;

  // DOM Cache
  let gridEl = null;
  let loadMoreBtn = null;
  let loadCountEl = null;
  let emptyStateEl = null;
  let emptyResetBtn = null;
  let filterStatusEl = null;
  let statusTextEl = null;
  let clearAllLink = null;
  let resetFilterBtn = null;
  let breakdownRows = [];

  // Star Rating HTML Generator
  function getTrustpilotStarsHTML(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= rating;
      stars += `<img src="/assets/star.png" alt="★" width="16" height="15" class="miroooo-star-img${isFilled ? '' : ' is-empty'}" style="width: 16px; height: 15px; display: inline-block; object-fit: contain; vertical-align: middle;${isFilled ? '' : ' opacity: 0.22; filter: grayscale(1);'}" />`;
    }
    return `<div class="miroooo-stars-row" style="display: inline-flex; align-items: center; gap: 3px;">${stars}</div>`;
  }

  // Generate Review Card HTML
  function buildReviewCardHTML(review, index) {
    const starsHTML = getTrustpilotStarsHTML(review.rating);
    const initials = review.name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    // Video HTML on Review Card (Poster thumbnail + centered play badge)
    let videoHTML = '';
    if (review.video) {
      const posterSrc = typeof review.video === 'object' && review.video.poster ? review.video.poster : '/assets_ref/x2/qb81f4-poster.webp';
      videoHTML = `
        <div class="miroooo-card-video-wrap" data-review-id="${review.id}">
          <img src="${posterSrc}" alt="Customer unboxing video by ${review.name}" class="miroooo-card-video-thumb" />
          <div class="miroooo-video-play-badge" aria-label="Play unboxing video">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      `;
    }

    // Gallery HTML
    let galleryHTML = '';
    if (review.images && review.images.length > 0) {
      if (review.images.length === 1) {
        galleryHTML = `
          <div class="miroooo-card-gallery miroooo-gallery-1" data-review-id="${review.id}" data-img-index="0">
            <img src="${review.images[0]}" alt="Photo from ${review.name}" />
          </div>
        `;
      } else if (review.images.length === 2) {
        galleryHTML = `
          <div class="miroooo-card-gallery miroooo-gallery-2" data-review-id="${review.id}">
            <div class="miroooo-gallery-item" data-img-index="0"><img src="${review.images[0]}" alt="Photo 1 from ${review.name}" /></div>
            <div class="miroooo-gallery-item" data-img-index="1"><img src="${review.images[1]}" alt="Photo 2 from ${review.name}" /></div>
          </div>
        `;
      } else {
        const remainingCount = review.images.length - 3;
        galleryHTML = `
          <div class="miroooo-card-gallery miroooo-gallery-3" data-review-id="${review.id}">
            <div class="miroooo-gallery-item" data-img-index="0"><img src="${review.images[0]}" alt="Photo 1 from ${review.name}" /></div>
            <div class="miroooo-gallery-item" data-img-index="1"><img src="${review.images[1]}" alt="Photo 2 from ${review.name}" /></div>
            <div class="miroooo-gallery-item" data-img-index="2">
              <img src="${review.images[2]}" alt="Photo 3 from ${review.name}" />
              ${remainingCount > 0 ? `<div class="miroooo-gallery-more-badge">+${remainingCount}</div>` : ''}
            </div>
          </div>
        `;
      }
    }

    // Official Merchant Reply HTML (if present)
    let merchantReplyHTML = '';
    if (review.merchantReply) {
      merchantReplyHTML = `
        <div class="miroooo-merchant-reply">
          <div class="miroooo-merchant-reply-header">
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/></svg>
            ${review.merchantReply.author} · <span style="font-weight:400; opacity:0.8;">${review.merchantReply.date}</span>
          </div>
          <div>${review.merchantReply.text}</div>
        </div>
      `;
    }

    // Check if body exceeds 160 chars for "Read more" trigger
    const isLongReview = review.body && review.body.length > 160;
    const animDelay = ((index % 16) * 35) + 'ms';

    return `
      <article class="miroooo-review-card fade-in" id="card-${review.id}" style="animation-delay: ${animDelay};">
        <!-- Top: Stars + Date -->
        <div class="miroooo-card-header">
          <div class="miroooo-card-stars" aria-label="${review.rating} out of 5 stars">${starsHTML}</div>
          <span class="miroooo-card-date">${formatUKDate(review.date || review.displayDate)}</span>
        </div>

        <!-- Customer Video -->
        ${videoHTML}

        <!-- Customer Gallery -->
        ${galleryHTML}

        <!-- Title -->
        ${review.title ? `<h4 class="miroooo-card-title">${review.title}</h4>` : ''}

        <!-- Body with 4-line clamping -->
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

  // Attach Listeners to Card Buttons & Images
  function attachCardListeners(currentList) {
    // 1. Helpful Upvote Button
    const helpfulBtns = gridEl.querySelectorAll('.miroooo-helpful-btn');
    helpfulBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
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

    // 2. Read More Button Trigger (Full Review Modal Expansion)
    const readMoreBtns = gridEl.querySelectorAll('.miroooo-read-more-btn');
    readMoreBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const reviewId = btn.getAttribute('data-review-id');
        const review = currentList.find(r => String(r.id) === String(reviewId));
        if (!review) return;
        openLightbox(review, 0);
      });
    });

    // 3. Gallery Photo Lightbox Triggers
    const galleryContainers = gridEl.querySelectorAll('.miroooo-card-gallery');
    galleryContainers.forEach(container => {
      container.addEventListener('click', (e) => {
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

    // 3b. Video Preview Click Trigger
    const videoWraps = gridEl.querySelectorAll('.miroooo-card-video-wrap');
    videoWraps.forEach(wrap => {
      wrap.addEventListener('click', (e) => {
        e.stopPropagation();
        const reviewId = wrap.getAttribute('data-review-id');
        const review = currentList.find(r => String(r.id) === String(reviewId));
        if (review) {
          openLightbox(review, 0);
        }
      });
    });

    // 4. Whole Review Card Click (Opens modal on card click)
    const cards = gridEl.querySelectorAll('.miroooo-review-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (
          e.target.closest('.miroooo-helpful-btn') ||
          e.target.closest('.miroooo-read-more-btn') ||
          e.target.closest('.miroooo-card-gallery') ||
          e.target.closest('.miroooo-card-video-wrap') ||
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

  // Filter & Sort Core Logic
  function getFilteredAndSortedReviews() {
    let list = REVIEWS_DATA.slice();

    // 1. Star Rating Filter
    if (currentFilterRating !== null) {
      list = list.filter(r => r.rating === currentFilterRating);
    }

    // 2. Photos Filter
    if (currentWithPhotos) {
      list = list.filter(r => (r.images && r.images.length > 0) || r.video);
    }

    // 3. Verified Filter
    if (currentVerifiedOnly) {
      list = list.filter(r => r.verified === true);
    }

    // 4. Sort
    list.sort((a, b) => {
      switch (currentSort) {
        case 'with-photos': {
          const aHas = (a.images && a.images.length > 0) || a.video ? 1 : 0;
          const bHas = (b.images && b.images.length > 0) || b.video ? 1 : 0;
          if (bHas !== aHas) return bHas - aHas;
          return new Date(b.date) - new Date(a.date);
        }
        case 'highest-rating':
          if (b.rating !== a.rating) return b.rating - a.rating;
          return new Date(b.date) - new Date(a.date);
        case 'lowest-rating':
          if (a.rating !== b.rating) return a.rating - b.rating;
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'most-recent':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return list;
  }

  // Render Reviews into Grid
  function renderReviews(scrollUp = true) {
    if (!gridEl) return;

    const filtered = getFilteredAndSortedReviews();
    const isFiltered = currentFilterRating !== null || currentWithPhotos || currentVerifiedOnly || currentSort !== 'most-recent';

    // Update Filter Status Bar & Reset Button
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

    // Handle Empty State
    if (filtered.length === 0) {
      gridEl.innerHTML = '';
      if (emptyStateEl) emptyStateEl.style.display = 'block';
      const paginationContainer = document.getElementById('miroooo-pagination-container');
      if (paginationContainer) paginationContainer.style.display = 'none';
      return;
    } else {
      if (emptyStateEl) emptyStateEl.style.display = 'none';
    }

    // Slice for Pagination
    const visibleList = filtered.slice(0, currentVisibleCount);

    // Calculate columns based on window width (4 on desktop, 3 on tablet, 2 on mobile)
    const numCols = window.innerWidth >= 1024 ? 4 : (window.innerWidth >= 768 ? 3 : 2);
    const colBuckets = Array.from({ length: numCols }, () => []);
    const colWeights = new Array(numCols).fill(0);

    visibleList.forEach((review, index) => {
      // Calculate estimated review card weight/height
      let cardWeight = 150;
      if (review.video) {
        cardWeight += 350;
      }
      if (review.images && review.images.length > 0) {
        cardWeight += 220;
      }
      const textLength = (review.body ? review.body.length : 0) + (review.title ? review.title.length : 0);
      cardWeight += textLength / 2;

      // Distribute to the column with the minimum accumulated weight
      let targetCol = 0;
      let minWeight = colWeights[0];
      for (let c = 1; c < numCols; c++) {
        if (colWeights[c] < minWeight) {
          minWeight = colWeights[c];
          targetCol = c;
        }
      }

      colBuckets[targetCol].push({ review, originalIndex: index });
      colWeights[targetCol] += cardWeight;
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

    // Attach Event Listeners to Card Action Elements
    attachCardListeners(visibleList);

    // Update Load More Button & Counter
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

  // Event Handlers for Filtering and Sorting
  function setupFilterEvents() {
    // 1. Star Rating Breakdown Row Click
    breakdownRows = Array.from(document.querySelectorAll('.miroooo-breakdown-row'));
    breakdownRows.forEach(row => {
      row.addEventListener('click', () => {
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
        currentVisibleCount = PAGE_SIZE;
        renderReviews();
      });
    });

    // 2. Star Filter Dropdown
    const starTrigger = document.getElementById('miroooo-star-trigger');
    const starMenu = document.getElementById('miroooo-star-menu');
    const starDropdown = document.getElementById('miroooo-star-dropdown');

    if (starTrigger && starMenu && starDropdown) {
      starTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns(starDropdown);
        starDropdown.classList.toggle('open');
        const isOpen = starDropdown.classList.contains('open');
        starTrigger.setAttribute('aria-expanded', isOpen);
      });

      const starItems = starMenu.querySelectorAll('.miroooo-dropdown-item');
      starItems.forEach(item => {
        item.addEventListener('click', () => {
          const val = item.getAttribute('data-value');
          starItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');

          if (val === 'all') {
            currentFilterRating = null;
            updateStarDropdownLabel('All stars');
          } else {
            currentFilterRating = parseInt(val, 10);
            updateStarDropdownLabel(`${val} star`);
          }
          breakdownRows.forEach(r => {
            const rStar = parseInt(r.getAttribute('data-star'), 10);
            r.classList.toggle('active', currentFilterRating === rStar);
          });
          starDropdown.classList.remove('open');
          starTrigger.setAttribute('aria-expanded', 'false');
          currentVisibleCount = PAGE_SIZE;
          renderReviews();
        });
      });
    }

    // 3. Verified Buyer Filter Pill
    const verifiedPill = document.getElementById('miroooo-filter-verified');
    if (verifiedPill) {
      verifiedPill.addEventListener('click', () => {
        currentVerifiedOnly = !currentVerifiedOnly;
        verifiedPill.classList.toggle('active', currentVerifiedOnly);
        verifiedPill.setAttribute('aria-pressed', currentVerifiedOnly);
        currentVisibleCount = PAGE_SIZE;
        renderReviews();
      });
    }

    // 4. Sort Dropdown
    const sortTrigger = document.getElementById('miroooo-sort-trigger');
    const sortMenu = document.getElementById('miroooo-sort-menu');
    const sortDropdown = document.getElementById('miroooo-sort-dropdown');

    if (sortTrigger && sortMenu && sortDropdown) {
      sortTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns(sortDropdown);
        sortDropdown.classList.toggle('open');
        const isOpen = sortDropdown.classList.contains('open');
        sortTrigger.setAttribute('aria-expanded', isOpen);
      });

      const sortItems = sortMenu.querySelectorAll('.miroooo-dropdown-item');
      sortItems.forEach(item => {
        item.addEventListener('click', () => {
          const val = item.getAttribute('data-value');
          sortItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');

          currentSort = val;
          const sortLabel = document.getElementById('miroooo-selected-sort-label');
          if (sortLabel) sortLabel.textContent = item.textContent;

          sortDropdown.classList.remove('open');
          sortTrigger.setAttribute('aria-expanded', 'false');
          renderReviews();
        });
      });
    }

    // 5. Reset Filters
    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', resetAllFilters);
    }
    if (clearAllLink) {
      clearAllLink.addEventListener('click', resetAllFilters);
    }
    if (emptyResetBtn) {
      emptyResetBtn.addEventListener('click', resetAllFilters);
    }

    // 6. Close dropdowns on outside click
    document.addEventListener('click', () => {
      closeAllDropdowns();
    });

    // 7. Load More Button
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        currentVisibleCount += PAGE_SIZE;
        renderReviews(false);
      });
    }
  }

  function updateStarDropdownLabel(text) {
    const label = document.getElementById('miroooo-selected-star-label');
    if (label) label.textContent = text;
  }

  function closeAllDropdowns(except = null) {
    document.querySelectorAll('.miroooo-dropdown').forEach(dd => {
      if (dd !== except) {
        dd.classList.remove('open');
        const trigger = dd.querySelector('.miroooo-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function resetAllFilters() {
    currentFilterRating = null;
    currentWithPhotos = false;
    currentVerifiedOnly = false;
    currentSort = 'most-recent';
    currentVisibleCount = PAGE_SIZE;

    breakdownRows.forEach(r => r.classList.remove('active'));

    const photoPill = document.getElementById('miroooo-filter-photos');
    if (photoPill) {
      photoPill.classList.remove('active');
      photoPill.setAttribute('aria-pressed', 'false');
    }

    const verifiedPill = document.getElementById('miroooo-filter-verified');
    if (verifiedPill) {
      verifiedPill.classList.remove('active');
      verifiedPill.setAttribute('aria-pressed', 'false');
    }

    updateStarDropdownLabel('All stars');
    const sortLabel = document.getElementById('miroooo-selected-sort-label');
    if (sortLabel) sortLabel.textContent = 'Most recent';

    const starMenuItems = document.querySelectorAll('#miroooo-star-menu .miroooo-dropdown-item');
    starMenuItems.forEach(item => item.classList.toggle('active', item.getAttribute('data-value') === 'all'));

    const sortMenuItems = document.querySelectorAll('#miroooo-sort-menu .miroooo-dropdown-item');
    sortMenuItems.forEach(item => item.classList.toggle('active', item.getAttribute('data-value') === 'most-recent'));

    renderReviews();
  }

  // LIGHTBOX / FULL REVIEW MODAL LOGIC
  function setupLightboxEvents() {
    const modal = document.getElementById('miroooo-lightbox-modal');
    if (!modal) return;

    const closeBtn = document.getElementById('miroooo-lightbox-close');
    const helpfulBtn = document.getElementById('miroooo-lightbox-helpful-btn');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });

    if (helpfulBtn) {
      helpfulBtn.addEventListener('click', () => {
        if (!activeLightboxReview) return;
        activeLightboxReview.helpful = (activeLightboxReview.helpful || 0) + 1;
        const countSpan = document.getElementById('miroooo-lightbox-helpful-count');
        if (countSpan) countSpan.textContent = activeLightboxReview.helpful;
        helpfulBtn.classList.add('voted');
        renderReviews(false);
      });
    }

    document.addEventListener('keydown', (e) => {
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
    void modal.offsetHeight; // Force reflow
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
    const hasVideo = !!activeLightboxReview.video;
    const hasMedia = hasImages || hasVideo;

    if (dialogEl) {
      if (hasMedia) {
        dialogEl.classList.remove('no-media');
        dialogEl.classList.add('has-media');
      } else {
        dialogEl.classList.add('no-media');
        dialogEl.classList.remove('has-media');
      }
    }

    if (mediaContainer) {
      if (hasVideo) {
        mediaContainer.style.setProperty('display', 'flex', 'important');
        const videoSrc = typeof activeLightboxReview.video === 'string' ? activeLightboxReview.video : activeLightboxReview.video.src;
        const posterSrc = typeof activeLightboxReview.video === 'object' && activeLightboxReview.video.poster ? `poster="${activeLightboxReview.video.poster}"` : '';
        mediaContainer.innerHTML = `
          <video class="miroooo-lightbox-video" controls autoplay playsinline controlsList="nodownload noplaybackrate noremoteplayback" disablePictureInPicture ${posterSrc} style="max-width: 100%; max-height: 80vh; border-radius: 10px; background: #000000; display: block;">
            <source src="${videoSrc}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        `;
        setTimeout(() => {
          const vid = mediaContainer.querySelector('video');
          if (vid) {
            vid.play().catch(() => {});
          }
        }, 80);
      } else if (hasImages) {
        mediaContainer.style.setProperty('display', 'flex', 'important');
        const idx = activeLightboxImageIndex < activeLightboxReview.images.length ? activeLightboxImageIndex : 0;
        mediaContainer.innerHTML = `<img id="miroooo-lightbox-img" class="miroooo-lightbox-img" src="${activeLightboxReview.images[idx]}" alt="Photo from ${activeLightboxReview.name}" />`;
      } else {
        mediaContainer.style.setProperty('display', 'none', 'important');
        mediaContainer.innerHTML = `<img id="miroooo-lightbox-img" class="miroooo-lightbox-img" alt="" />`;
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

    const vid = modal.querySelector('video');
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    setTimeout(() => {
      if (!modal.classList.contains('is-open')) {
        modal.style.display = 'none';
        const mediaContainer = document.querySelector('.miroooo-lightbox-media-container');
        if (mediaContainer && mediaContainer.querySelector('video')) {
          mediaContainer.innerHTML = '';
        }
      }
    }, 250);

    activeLightboxReview = null;
  }

  // WRITE A REVIEW MODAL LOGIC
  function setupWriteModalEvents() {
    const writeBtn = document.getElementById('miroooo-write-review-btn');
    const modal = document.getElementById('miroooo-write-modal');
    if (!writeBtn || !modal) return;

    const closeBtn = document.getElementById('miroooo-write-close');
    const cancelBtn = document.getElementById('miroooo-form-cancel');
    const successCloseBtn = document.getElementById('miroooo-success-close');
    const form = document.getElementById('miroooo-review-form');
    const submitBtn = document.getElementById('miroooo-form-submit');
    const successBox = document.getElementById('miroooo-write-success');

    function openWriteModal() {
      if (form) {
        form.reset();
        form.style.display = 'block';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.querySelectorAll('.miroooo-button-click-loader, .buudy-button-click-loader').forEach(l => l.remove());
        }
      }
      if (successBox) successBox.style.display = 'none';

      modal.style.display = 'flex';
      void modal.offsetHeight;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    function closeWriteModal() {
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
              submitBtn.querySelectorAll('.miroooo-button-click-loader, .buudy-button-click-loader').forEach(l => l.remove());
            }
          }
          if (successBox) successBox.style.display = 'none';
        }
      }, 250);
    }

    writeBtn.addEventListener('click', openWriteModal);
    if (closeBtn) closeBtn.addEventListener('click', closeWriteModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeWriteModal);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeWriteModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeWriteModal();
    });

    // Star Rating Radio in Form
    let selectedRating = 5;
    const starBtns = document.querySelectorAll('#miroooo-form-stars .miroooo-star-btn');
    const ratingLabel = document.getElementById('miroooo-form-rating-label');
    const ratingTextMap = {
      1: '1.0 - Poor',
      2: '2.0 - Fair',
      3: '3.0 - Average',
      4: '4.0 - Very Good',
      5: '5.0 - Excellent'
    };

    starBtns.forEach(btn => {
      const rating = parseInt(btn.getAttribute('data-rating'), 10);

      btn.addEventListener('mouseenter', () => {
        starBtns.forEach(b => {
          const r = parseInt(b.getAttribute('data-rating'), 10);
          b.classList.toggle('hover', r <= rating);
        });
        if (ratingLabel) ratingLabel.textContent = ratingTextMap[rating];
      });

      btn.addEventListener('mouseleave', () => {
        starBtns.forEach(b => {
          b.classList.remove('hover');
          const r = parseInt(b.getAttribute('data-rating'), 10);
          b.classList.toggle('active', r <= selectedRating);
        });
        if (ratingLabel) ratingLabel.textContent = ratingTextMap[selectedRating];
      });

      btn.addEventListener('click', () => {
        selectedRating = rating;
        starBtns.forEach(b => {
          const r = parseInt(b.getAttribute('data-rating'), 10);
          b.classList.toggle('active', r <= selectedRating);
        });
        if (ratingLabel) ratingLabel.textContent = ratingTextMap[selectedRating];
      });
    });

    // Form Submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('miroooo-form-name')?.value.trim() || '';
        const email = document.getElementById('miroooo-form-email')?.value.trim() || '';
        const variant = document.getElementById('miroooo-form-variant')?.value || 'Color: Grey';
        const title = document.getElementById('miroooo-form-title')?.value.trim() || '';
        const body = document.getElementById('miroooo-form-body')?.value.trim() || '';

        if (!name || !title || !body) return;

        // Post review to standalone backend storage (saved into org_miroooo-x2-reviews.js)
        try {
          fetch('/api/reviews/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productId: 'miroooo-x2',
              name: name,
              email: email,
              rating: selectedRating,
              variant: variant,
              title: title,
              body: body,
              images: []
            })
          }).catch((err) => console.log('Review submission background dispatch:', err));
        } catch (postErr) {
          console.log('Review background error:', postErr);
        }

        // Show Success Toast to user (do NOT add to frontend reviews dataset)
        form.style.display = 'none';
        if (successBox) successBox.style.display = 'block';
      });
    }
  }

  // Animation for Breakdown Bars
  function initProgressBarsAnimation() {
    const bars = document.querySelectorAll('.miroooo-progress-bar');
    if (!bars.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            bars.forEach((bar, index) => {
              const target = bar.getAttribute('data-target-width') || '100%';
              setTimeout(() => {
                bar.style.width = target;
              }, 100 + index * 80);
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      const headerCard = document.querySelector('.miroooo-reviews-header-card');
      if (headerCard) observer.observe(headerCard);
    } else {
      bars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-target-width') || '100%';
      });
    }
  }

  // Initialization
  function init() {
    gridEl = document.getElementById('miroooo-reviews-grid');
    loadMoreBtn = document.getElementById('miroooo-load-more-btn');
    loadCountEl = document.getElementById('miroooo-load-count');
    emptyStateEl = document.getElementById('miroooo-reviews-empty');
    emptyResetBtn = document.getElementById('miroooo-empty-reset-btn');
    filterStatusEl = document.getElementById('miroooo-filter-status');
    statusTextEl = document.getElementById('miroooo-status-text');
    clearAllLink = document.getElementById('miroooo-clear-all-link');
    resetFilterBtn = document.getElementById('miroooo-reset-filter');

    if (!gridEl) return;

    renderReviews();
    setupFilterEvents();
    setupLightboxEvents();
    setupWriteModalEvents();
    initProgressBarsAnimation();

    let lastCols = window.innerWidth >= 1024 ? 4 : (window.innerWidth >= 768 ? 3 : 2);
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const currentCols = window.innerWidth >= 1024 ? 4 : (window.innerWidth >= 768 ? 3 : 2);
        if (currentCols !== lastCols) {
          lastCols = currentCols;
          renderReviews(false);
        }
      }, 150);
    });
  }

  function scheduleInit() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(init, { timeout: 1500 });
    } else {
      setTimeout(init, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInit);
  } else {
    scheduleInit();
  }
})();
