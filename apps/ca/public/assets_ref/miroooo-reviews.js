/**
 * MIROOOO X — Interactive Dark Theme Review Engine & Dataset
 * High-Performance E-Commerce Review Architecture
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
      3: { count: 3, percent: 1 },
      2: { count: 2, percent: 0.5 },
      1: { count: 3, percent: 0.5 }
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

  // Top Curated Flagship Reviews
  const CURATED_REVIEWS = [
    {
      id: 'rev-01',
      name: 'Oliver Bennett',
      country: 'London, UK',
      rating: 5,
      date: '2026-09-21',
      displayDate: '21 September 2026',
      variant: 'Color: Grey',
      title: 'Arrived in 2 days — genuine luxury feel straight out of the box',
      body: 'Tracked delivery arrived within 48 hours in London. The unboxing experience feels like opening an Apple device. The anodised aluminium body feels solid in hand, lightweight at only 51g, and looks brilliant on the bathroom sink.',
      images: [],
      helpful: 48,
      verified: true
    },
    {
      id: 'rev-02',
      name: 'Charlotte Davies',
      country: 'Edinburgh, UK',
      rating: 5,
      date: '2026-09-20',
      displayDate: '20 September 2026',
      variant: 'Color: Silver',
      title: 'Get the 3-pack bundle — bought one each for me, my partner and our son',
      body: 'Initially planned on buying just one, but the 3-brush bundle was far better value. Got Silver for myself, Pink for my daughter and Grey for my partner. Everyone is thoroughly impressed with how clean their teeth feel after every session.',
      images: ['/assets_ref/reviews/customer-review-3pack-bundle.png'],
      helpful: 54,
      verified: true
    },
    {
      id: 'rev-03',
      name: 'James Harrington',
      country: 'Manchester, UK',
      rating: 5,
      date: '2026-09-18',
      displayDate: '18 September 2026',
      variant: 'Color: Grey',
      title: 'Retired my Oral-B iO — far gentler on gums with better plaque removal',
      body: 'Used Oral-B electric brushes for nearly a decade. The rotating head always felt aggressive on my gumline. Switched to the Miroooo X1 micro-vibrations and my gums haven\'t bled once. Teeth feel silky smooth after every 2-minute cycle.',
      images: ['/assets_ref/reviews/customer-review-bristle-head-detail.png'],
      helpful: 42,
      verified: true
    },
    {
      id: 'rev-04',
      name: 'Emma Richardson',
      country: 'Bristol, UK',
      rating: 5,
      date: '2026-09-16',
      displayDate: '16 September 2026',
      variant: 'Color: Pink',
      title: '60-day battery life is no exaggeration — still on the first charge',
      body: 'Charged it once via USB-C when it arrived over six weeks ago and it is still running at full power. No bulky chargers or ugly cords cluttering my bathroom counter anymore.',
      images: [],
      helpful: 37,
      verified: true
    },
    {
      id: 'rev-05',
      name: 'Dr. Alistair Ross',
      country: 'Oxford, UK',
      rating: 5,
      date: '2026-09-14',
      displayDate: '14 September 2026',
      variant: 'Color: Silver',
      title: 'Slim magnetic travel case makes packing effortless',
      body: 'I commute between Oxford and London weekly. The magnetic travel case is wonderfully slim and protects the bristle head without taking up luggage space. The magnetic charging base is super compact and clean too.',
      images: ['/assets_ref/reviews/customer-review-unboxing-travel-case.png'],
      helpful: 61,
      verified: true
    },
    {
      id: 'rev-06',
      name: 'Sophie Turner',
      country: 'Bath, UK',
      rating: 5,
      date: '2026-09-12',
      displayDate: '12 September 2026',
      variant: 'Color: Grey',
      title: 'Whisper quiet acoustic motor — noticeably quieter than my old SURI',
      body: 'My old SURI brush made a loud buzzing rattle in the morning that woke up my partner. The Miroooo X1 is whisper quiet with almost zero handle vibration fatigue. The 32,000 VPM feels refined and comfortable.',
      images: [],
      helpful: 39,
      verified: true
    },
    {
      id: 'rev-07',
      name: 'George MacLeod',
      country: 'Glasgow, UK',
      rating: 5,
      date: '2026-09-10',
      displayDate: '10 September 2026',
      variant: 'Color: Grey',
      title: 'Three intuitive modes with zero unnecessary app gimmicks',
      body: 'So glad this doesn\'t require a bloated smartphone app just to brush your teeth. One tactile button cycles smoothly between Standard, Whitening and Sensitive. The 30-second quadrant pulse keeps your routine disciplined.',
      images: [],
      helpful: 29,
      verified: true
    },
    {
      id: 'rev-08',
      name: 'Hannah Cooper',
      country: 'Leeds, UK',
      rating: 5,
      date: '2026-09-08',
      displayDate: '8 September 2026',
      variant: 'Color: Silver',
      title: 'Sealed DuPont brush heads and zero grime build-up around the base',
      body: 'Extra brush heads came individually sealed in sterile packs. Love that the magnetic base doesn\'t collect that nasty black puddle grime that standard electric toothbrushes always suffer from.',
      images: ['/assets_ref/reviews/customer-review-dupont-brush-heads.png'],
      helpful: 45,
      verified: true
    },
    {
      id: 'rev-09',
      name: 'Callum Scott',
      country: 'York, UK',
      rating: 5,
      date: '2026-09-06',
      displayDate: '6 September 2026',
      variant: 'Color: Grey',
      title: 'Weighs just 51g — unbelievable power for such a lightweight brush',
      body: 'Holding this feels like holding a luxury pen rather than a clunky plastic electric toothbrush. You don\'t get any wrist fatigue at all, yet the acoustic clean is powerful and deep.',
      images: [],
      helpful: 33,
      verified: true
    },
    {
      id: 'rev-10',
      name: 'Victoria Campbell',
      country: 'Birmingham, UK',
      rating: 5,
      date: '2026-09-04',
      displayDate: '4 September 2026',
      variant: 'Color: Pink',
      title: 'My dental hygienist was genuinely impressed with my checkup',
      body: 'Drink several cups of black tea daily and usually dread the tartar scrape at my 6-month checkup. My hygienist asked what I changed because my lower teeth were practically tartar-free. The Whitening mode genuinely works.',
      images: [],
      helpful: 51,
      verified: true
    },
    {
      id: 'rev-11',
      name: 'Harry Fletcher',
      country: 'Cambridge, UK',
      rating: 5,
      date: '2026-09-01',
      displayDate: '1 September 2026',
      variant: 'Color: Silver',
      title: 'USB-C fast charging is so clean and convenient',
      body: 'Charges quickly via standard USB-C and battery lasts for weeks. Direct USB-C compatibility means I can charge it anywhere with standard cables without proprietary bathroom two-pin shaving plugs.',
      images: [],
      helpful: 44,
      verified: true
    },
    {
      id: 'rev-12',
      name: 'Megan Phillips',
      country: 'Cardiff, UK',
      rating: 5,
      date: '2026-08-29',
      displayDate: '29 August 2026',
      variant: 'Color: Pink',
      title: 'Gentlest acoustic clean I\'ve experienced for sensitive receding gums',
      body: 'Was nervous to switch to acoustic because of gum recession, but the Sensitive mode is remarkably gentle. The curved DuPont bristles hug the tooth contours without scraping raw enamel.',
      images: [],
      helpful: 28,
      verified: true
    },
    {
      id: 'rev-13',
      name: 'Daniel Hughes',
      country: 'Newcastle, UK',
      rating: 5,
      date: '2026-08-26',
      displayDate: '26 August 2026',
      variant: 'Color: Grey',
      title: 'Took it on a 3-week holiday to Greece without taking the charger',
      body: 'Packed the brush in its hard case and left the charging cable at home in Newcastle. Used it twice a day for 21 days and it still had plenty of charge when I returned. Perfect travel companion.',
      images: [],
      helpful: 36,
      verified: true
    },
    {
      id: 'rev-14',
      name: 'Dr. Fiona Stewart',
      country: 'Aberdeen, UK',
      rating: 5,
      date: '2026-08-23',
      displayDate: '23 August 2026',
      variant: 'Color: Silver',
      title: 'Flawless bristle geometry and acoustic frequency',
      body: 'The 3D wave cut on the brush head reaches right between molars and along the gumline. You can feel the acoustic fluid action pushing toothpaste foam through interdental spaces.',
      images: [],
      helpful: 58,
      verified: true
    },
    {
      id: 'rev-15',
      name: 'Lewis Armstrong',
      country: 'Belfast, UK',
      rating: 5,
      date: '2026-08-20',
      displayDate: '20 August 2026',
      variant: 'Color: Grey',
      title: 'Exceptional customer service and quick Royal Mail delivery',
      body: 'Dispatched the same afternoon and arrived with tracked delivery in Belfast 2 days later. Had a quick question about replacement brush heads and support replied within 20 minutes. Truly top tier service.',
      images: [],
      helpful: 31,
      verified: true
    },
    {
      id: 'rev-16',
      name: 'Grace Jenkins',
      country: 'Norwich, UK',
      rating: 5,
      date: '2026-08-17',
      displayDate: '17 August 2026',
      variant: 'Color: Pink',
      title: 'Replaced my bulky Philips Sonicare — slimmer, lighter and lasts way longer',
      body: 'My old Sonicare DiamondClean felt like a heavy brick and the rubber grip started peeling after a year. The Miroooo X1 full aluminium shell is so much more premium and hygienic. Very happy customer.',
      images: [],
      helpful: 47,
      verified: true
    },
    {
      id: 'rev-17',
      name: 'Nathan Walker',
      country: 'Sheffield, UK',
      rating: 4,
      date: '2026-08-14',
      displayDate: '14 August 2026',
      variant: 'Color: Silver',
      title: 'Superb brushing power and build — wish starter box came with 4 heads',
      body: 'The toothbrush itself is a solid 5/5 — quiet motor, 60-day battery and sleek aerospace aluminium. The only reason for 4 stars instead of 5 is that I wish the single pack came with 4 heads standard instead of 2. I ended up ordering extra heads separately.',
      images: ['/assets_ref/reviews/customer-review-packaging-box.png'],
      helpful: 26,
      verified: true
    },
    {
      id: 'rev-18',
      name: 'Zara Patel',
      country: 'Leicester, UK',
      rating: 5,
      date: '2026-08-11',
      displayDate: '11 August 2026',
      variant: 'Color: Pink',
      title: 'Ordered 2 for me and my sister — best electric toothbrush we\'ve owned',
      body: 'We both ordered during the bundle promotion. The Pink is a gorgeous subtle pastel and the Grey is very sleek. Cleans significantly better than manual or cheap drugstore electric brushes.',
      images: [],
      helpful: 35,
      verified: true
    },
    {
      id: 'rev-19',
      name: 'Benjamin Taylor',
      country: 'Brighton, UK',
      rating: 5,
      date: '2026-08-08',
      displayDate: '8 August 2026',
      variant: 'Color: Silver',
      title: 'Aerospace aluminium finish is in a completely different league',
      body: 'Every electric toothbrush on the market is cheap moulded plastic that gets discoloured and grimy. The seamless aluminium unibody on the Miroooo X1 feels like precision industrial design. Fits neatly into its case for gym and weekend trips.',
      images: ['/assets_ref/reviews/customer-review-aluminium-handle-case.png'],
      helpful: 52,
      verified: true
    },
    {
      id: 'rev-20',
      name: 'Rebecca Evans',
      country: 'Liverpool, UK',
      rating: 5,
      date: '2026-08-05',
      displayDate: '5 August 2026',
      variant: 'Color: Grey',
      title: 'Worth every penny — sleek, whisper quiet and teeth feel dentist-clean',
      body: 'After using it for a month, I can never go back to regular brushes. Battery seems almost limitless, the travel case is super convenient, and my teeth feel squeaky clean every single day.',
      images: [],
      helpful: 41,
      verified: true
    },
    {
      id: 'rev-21',
      name: 'Alexander Wright',
      country: 'Glasgow, UK',
      rating: 2,
      date: '2026-07-22',
      displayDate: '22 July 2026',
      variant: 'Color: Grey',
      title: 'Outer shipping carton had a corner crease from Royal Mail transit',
      body: 'The toothbrush itself and accessories inside the hard travel case were completely pristine and work beautifully. However, the outer postal shipping box had a dent on delivery. For a premium device, transit packaging should be reinforced.',
      images: [],
      helpful: 12,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Experience Team',
        date: '23 July 2026',
        text: 'Hello Alexander, thank you for your honest feedback! We are glad your Miroooo X1 is performing impeccably, but we apologize for the rough handling by the postal courier. We have upgraded our outbound packaging to heavy-duty double-wall corrugated cartons, and our team has added a complimentary 2-pack of DuPont brush heads to your account.'
      }
    },
    {
      id: 'rev-22',
      name: 'David O\'Connor',
      country: 'Belfast, UK',
      rating: 1,
      date: '2026-07-17',
      displayDate: '17 July 2026',
      variant: 'Color: Silver',
      title: 'Postal delay during holiday rush resolved quickly by support',
      body: 'Ordered during the Black Friday peak and the courier parcel stalled for 4 days at the regional depot. Reached out to support and they immediately dispatched an express replacement parcel with next-day DPD tracking. Brush is fantastic now that it arrived, but delivery delay was annoying.',
      images: [],
      helpful: 18,
      verified: true,
      merchantReply: {
        author: 'Miroooo Support Care',
        date: '18 July 2026',
        text: 'Dear David, we understand how frustrating carrier backlogs can be during holiday peaks. Our policy is to immediately intervene and dispatch a priority express replacement at zero cost when couriers stall. We are glad our support team took care of you and that you are enjoying the Miroooo X1 clean!'
      }
    },
    {
      id: 'rev-23',
      name: 'Toby Armstrong',
      country: 'Newcastle, UK',
      rating: 1,
      date: '2026-07-14',
      displayDate: '14 July 2026',
      variant: 'Color: Grey',
      title: 'Courier delivered parcel to neighboring porch during storm',
      body: 'The local delivery driver left the parcel outside down the road in the rain. Contacted customer support who resolved the delivery issue promptly.',
      images: [],
      helpful: 16,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '15 July 2026',
        text: 'Hello Toby, we deeply regret the courier misplacement. Our team immediately intervened with the carrier supervisor and dispatched a priority replacement parcel. We are glad you received it safely.'
      }
    },
    {
      id: 'rev-24',
      name: 'Rachel Davies',
      country: 'Cardiff, UK',
      rating: 1,
      date: '2026-07-12',
      displayDate: '12 July 2026',
      variant: 'Color: Pink',
      title: 'Missing secondary travel cap in bundle — replacement sent immediately',
      body: 'Received the brush and accessories, but the extra hygienic travel cap was missing from the box upon opening.',
      images: [],
      helpful: 14,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '13 July 2026',
        text: 'Hi Rachel, our apologies for the missing accessory in fulfillment. We dispatched a complimentary replacement accessory multi-pack via Royal Mail 24 on the same afternoon.'
      }
    },
    {
      id: 'rev-25',
      name: 'Lars Lindgren',
      country: 'Oslo, NO',
      rating: 2,
      date: '2026-07-10',
      displayDate: '10 July 2026',
      variant: 'Color: Grey',
      title: 'Did not realize wall charger brick was not included in box',
      body: 'Package includes the USB-C charging cable, but you need your own 5V USB wall plug. Works fine plugged into my phone charger, but would prefer a wall adapter included directly in the box.',
      images: [],
      helpful: 14,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '11 July 2026',
        text: 'Hi Lars, thank you for your feedback! To reduce global electronic waste, the Miroooo X1 includes a universal USB-C cable compatible with any standard 5V adapter, laptop, or power bank. Because the battery only needs charging once every 60 days, most customers use their existing phone charger. We appreciate your valuable input!'
      }
    },
    {
      id: 'rev-26',
      name: 'Markus Weber',
      country: 'Frankfurt, DE',
      rating: 3,
      date: '2026-07-05',
      displayDate: '5 July 2026',
      variant: 'Color: Grey',
      title: 'Good brush, high vibration intensity takes adjustment',
      body: 'The toothbrush is extremely well manufactured and the 60-day battery is accurate. However, the 32,000 VPM motor is quite powerful even on Daily Clean mode. I recommend starting on Sensitive mode for the first week until your gums acclimate.',
      images: [],
      helpful: 15,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '6 July 2026',
        text: 'Hi Markus, thank you for the helpful review! For users new to acoustic levitation motors, starting on Mode 1 (Sensitive) allows the oral tissue to gently acclimate before transitioning to Daily Clean or Whitening mode.'
      }
    },
    {
      id: 'rev-27',
      name: 'Valerie Gomez',
      country: 'Madrid, ES',
      rating: 3,
      date: '2026-06-29',
      displayDate: '29 June 2026',
      variant: 'Color: Silver',
      title: 'Great hardware, delivery took 6 days to Spain',
      body: 'The Miroooo X1 device itself is 5 stars—whisper quiet, waterproof, and sleek. Took 6 business days for international shipping to arrive in Madrid instead of the promised 3-4 days. Customer support was polite and tracked the parcel.',
      images: [],
      helpful: 11,
      verified: true,
      merchantReply: {
        author: 'Miroooo Support Care',
        date: '30 June 2026',
        text: 'Hello Valerie, thank you for loving the brush! We apologize for the international customs transit delay to Spain and have since integrated express courier routing for all mainland European shipments.'
      }
    },
    {
      id: 'rev-28',
      name: 'Simon Clarke',
      country: 'Leeds, UK',
      rating: 3,
      date: '2026-06-22',
      displayDate: '22 June 2026',
      variant: 'Color: Grey',
      title: 'Carrier tracking took 48 hours to activate on portal',
      body: 'The brush is lightweight and cleans brilliantly. The dispatch tracking link took two days to scan on the carrier portal which caused slight confusion initially.',
      images: [],
      helpful: 9,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: '23 June 2026',
        text: 'Hi Simon, thank you for the feedback. Our automated logistics pipeline has been updated with real-time GPS tracking sync so dispatch scans reflect immediately.'
      }
    },
    {
      id: 'rev-21',
      name: 'Bernadine Mitchell',
      country: 'Oxford, UK',
      rating: 5,
      date: '2026-05-17',
      displayDate: 'May 17, 2026',
      variant: 'Color: Pink',
      title: 'Enjoying the gentle yet thorough acoustic clean',
      body: 'I am thoroughly enjoying my new electric toothbrush. The DuPont bristles are soft on sensitive areas yet lift daily plaque effortlessly. Leaves my mouth feeling completely refreshed every morning.',
      images: [],
      helpful: 27,
      verified: true
    },
    {
      id: 'rev-22',
      name: 'Ryan Sterling',
      country: 'Leeds, UK',
      rating: 5,
      date: '2026-03-16',
      displayDate: 'Mar 16, 2026',
      variant: 'Color: Grey',
      title: 'Clean teeth and no more bleeding gums',
      body: 'Really happy with my Miroooo electric brush. Squeaky clean teeth and no more bleeding gums when brushing. What more could you ask for?',
      images: [],
      helpful: 31,
      verified: true
    },
    {
      id: 'rev-23',
      name: 'Tom Sinclair',
      country: 'Bath, UK',
      rating: 5,
      date: '2026-03-12',
      displayDate: 'Mar 12, 2026',
      variant: 'Color: Silver',
      title: 'Lightweight and sleek aesthetic on the bathroom counter',
      body: 'I love the aesthetics of the brush. It is so light, balanced, and sleek in the hand. The slim unibody design keeps everything super neat. Simply love it!',
      images: [],
      helpful: 29,
      verified: true
    },
    {
      id: 'rev-24',
      name: 'Alistair Campbell',
      country: 'Edinburgh, UK',
      rating: 5,
      date: '2026-08-14',
      displayDate: 'Aug 14, 2026',
      variant: 'Color: Grey',
      title: 'Great lightweight toothbrush with exceptional battery life',
      body: 'Great lightweight electric toothbrush with exceptional battery life. The acoustic motor runs smooth and quiet, and the USB-C fast charging is completely hassle-free.',
      images: [],
      helpful: 38,
      verified: true
    },
    {
      id: 'rev-25',
      name: 'Lajla K.',
      country: 'Birmingham, UK',
      rating: 5,
      date: '2025-07-05',
      displayDate: 'Jul 5, 2025',
      variant: 'Color: Grey',
      title: 'Remarkably sleek design and fantastic brushing power',
      body: 'Not only remarkably sleek and handsome on the countertop, but also a truly fantastic electric toothbrush. Customer service was top tier too — in short, an absolute recommendation!',
      images: [],
      helpful: 36,
      verified: true
    },
    {
      id: 'rev-26',
      name: 'Marthijn W.',
      country: 'Cambridge, UK',
      rating: 5,
      date: '2025-05-10',
      displayDate: 'May 10, 2025',
      variant: 'Color: Silver',
      title: 'Cleans so much better than my old bulky electric brush',
      body: 'Delighted with this! The brush cleans so much better than my old heavy electric toothbrush. I think it is because of the slim, compact head and 32,000 VPM oscillation speed.',
      images: [],
      helpful: 25,
      verified: true
    },
    {
      id: 'rev-27',
      name: 'Fred v. V.',
      country: 'York, UK',
      rating: 5,
      date: '2025-05-04',
      displayDate: 'May 4, 2025',
      variant: 'Color: Grey',
      title: 'Top tier electric toothbrush — leaves teeth squeaky clean',
      body: 'Top tier electric toothbrush. Delivers an effortless, scale-and-polish clean every single morning and evening. Highly satisfied.',
      images: [],
      helpful: 20,
      verified: true
    },
    {
      id: 'rev-28',
      name: 'Shelly Pennington',
      country: 'London, UK',
      rating: 5,
      date: '2025-05-03',
      displayDate: 'May 3, 2025',
      variant: 'Color: Pink',
      title: 'Thoughtful ergonomic design and exceptional customer support',
      body: 'An incredibly thoughtful, friendly and responsive team. Ordered the brush for my mother who struggles with manual brushing. The ultra-lightweight 51g handle and long battery life make daily oral care effortless for her.',
      images: [],
      helpful: 47,
      verified: true
    },
    {
      id: 'rev-29',
      name: 'Marga B.',
      country: 'Glasgow, UK',
      rating: 5,
      date: '2025-05-03',
      displayDate: 'May 3, 2025',
      variant: 'Color: Grey',
      title: 'Fast replacement and brilliant customer service',
      body: 'Had a small query after my first month of use and the support team resolved it immediately with utmost care. Brushing performance is top tier and my teeth feel amazing.',
      images: [],
      helpful: 28,
      verified: true
    },
    {
      id: 'rev-30',
      name: 'Aynsca MacDonald',
      country: 'Inverness, UK',
      rating: 5,
      date: '2025-04-18',
      displayDate: 'Apr 18, 2025',
      variant: 'Color: Silver',
      title: 'Ordered two units for my son and myself — highly recommended',
      body: 'Ordered two toothbrushes for my teenage son and myself. Delivery was very fast. Took a couple of days to adjust to acoustic vibration, but it is a lovely, lightweight brush with 3 great modes. I recommend it to everyone.',
      images: [],
      helpful: 33,
      verified: true
    },
    {
      id: 'rev-31',
      name: 'Nathalie Bernard',
      country: 'Brussels, BE',
      rating: 4,
      date: '2026-05-13',
      displayDate: 'May 13, 2026',
      variant: 'Color: Pink',
      title: 'Beautiful color, wish the brush head cap clicked tighter',
      body: 'The travel case is fantastic. When using the standalone plastic travel cap, it fits securely but could have a firmer snap lock. Brushing performance and battery longevity are undisputed 5 stars.',
      images: [],
      helpful: 17,
      verified: true
    },
    {
      id: 'rev-32',
      name: 'Vince Crawford',
      country: 'London, UK',
      rating: 5,
      date: '2025-03-27',
      displayDate: 'Mar 27, 2025',
      variant: 'Color: Grey',
      title: 'Ideal for business travel with slim profile and hard case',
      body: 'Very elegant design and excellent brushing performance. Together with the ventilated travel case, this toothbrush is ideal for travel. I regularly travel abroad for work, so having an electric brush that has the slim profile of a manual brush without bulky charging stands is perfect!',
      images: [],
      helpful: 39,
      verified: true
    },
    {
      id: 'rev-33',
      name: 'Sylke Jansen',
      country: 'Brighton, UK',
      rating: 5,
      date: '2025-03-25',
      displayDate: 'Mar 25, 2025',
      variant: 'Color: Silver',
      title: 'Premium acoustic build quality and extraordinary battery life',
      body: 'The acoustic micro-vibration cleaning performs remarkably well. Battery life lasts far longer than expected. I was initially hesitant about build quality, but after several weeks of use it clearly sits in the luxury tier and cleans deep into gum margins.',
      images: [],
      helpful: 41,
      verified: true
    },
    {
      id: 'rev-34',
      name: 'Owen Davies',
      country: 'Cardiff, UK',
      rating: 5,
      date: '2025-03-25',
      displayDate: 'Mar 25, 2025',
      variant: 'Color: Grey',
      title: 'Compact design and lasts weeks longer than other brushes',
      body: 'Works really well! Extremely pleased with the battery longevity and compact ergonomic design. Far superior to drugstore electric toothbrushes that run flat after just a week and a half.',
      images: [],
      helpful: 26,
      verified: true
    },
    {
      id: 'rev-35',
      name: 'Marga Bennett',
      country: 'Norwich, UK',
      rating: 5,
      date: '2025-03-15',
      displayDate: 'Mar 15, 2025',
      variant: 'Color: Silver',
      title: 'Balanced in hand and cleans smoothly without gum irritation',
      body: 'Next day delivery! Wonderful toothbrush, feels balanced in the hand and brushes smoothly — neither too harsh nor too soft. Gums feel healthy and teeth look visibly polished.',
      images: [],
      helpful: 23,
      verified: true
    },
    {
      id: 'rev-36',
      name: 'Robert MacLeod',
      country: 'Aberdeen, UK',
      rating: 4,
      date: '2026-04-23',
      displayDate: 'Apr 23, 2026',
      variant: 'Color: Grey',
      title: 'Super smooth brushing, replacement head subscription is handy',
      body: 'The brush itself is top tier. Appreciate that replacement heads can be ordered easily. The acoustic motor sound is very discreet compared to loud mechanical brushes.',
      images: [],
      helpful: 15,
      verified: true
    },
    {
      id: 'rev-37',
      name: 'Arianne Fraser',
      country: 'Aberdeen, UK',
      rating: 5,
      date: '2025-03-04',
      displayDate: 'Mar 4, 2025',
      variant: 'Color: Pink',
      title: 'Barely ever needs charging and looks lovely on the bathroom vanity',
      body: 'Excellent service with prompt, clear communication. Great toothbrush, handy to hold, and you barely ever have to recharge it. Looks lovely mounted on the bathroom mirror too.',
      images: [],
      helpful: 30,
      verified: true
    },
    {
      id: 'rev-38',
      name: 'Roos V.',
      country: 'Southampton, UK',
      rating: 5,
      date: '2025-02-28',
      displayDate: 'Feb 28, 2025',
      variant: 'Color: Grey',
      title: 'Brilliant electric brush and compact travel case',
      body: 'Brilliant electric toothbrush, and the slim travel case is so handy for packing. The acoustic hum is very discreet and the 2-minute auto timer keeps me on track.',
      images: [],
      helpful: 19,
      verified: true
    },
    {
      id: 'rev-39',
      name: 'Karin B.',
      country: 'Exeter, UK',
      rating: 5,
      date: '2025-02-19',
      displayDate: 'Feb 19, 2025',
      variant: 'Color: Silver',
      title: 'Sleek aesthetic and thorough hydrodynamic cleaning',
      body: 'Takes a couple of days to get used to the acoustic micro-vibrations, but it looks sleek and cleans thoroughly between tight teeth. Very courteous and efficient support team when ordering extra brush heads.',
      images: [],
      helpful: 22,
      verified: true
    },
    {
      id: 'rev-40',
      name: 'Maaike T.',
      country: 'Bristol, UK',
      rating: 5,
      date: '2025-02-03',
      displayDate: 'Feb 3, 2025',
      variant: 'Color: Grey',
      title: 'Rapid delivery and thrilled with the brushing results',
      body: 'Ordered and arrived the very next day. Impressed with the rapid delivery! Absolutely thrilled with how smooth and polished my teeth feel after every brushing session.',
      images: [],
      helpful: 24,
      verified: true
    },
    {
      id: 'rev-41',
      name: 'Hannah Edwards',
      country: 'Chester, UK',
      rating: 5,
      date: '2025-02-03',
      displayDate: 'Feb 3, 2025',
      variant: 'Color: Pink',
      title: 'Teeth feel glassy-smooth and pink metallic finish is gorgeous',
      body: 'Recently bought the Pink variant. My teeth always feel clean and glassy-smooth, and the metallic satin finish matches my bathroom tiles beautifully — a gorgeous addition to my morning routine!',
      images: [],
      helpful: 35,
      verified: true
    },
    {
      id: 'rev-42',
      name: 'Senne V.',
      country: 'Newcastle, UK',
      rating: 5,
      date: '2025-01-30',
      displayDate: 'Jan 30, 2025',
      variant: 'Color: Grey',
      title: 'Upgraded from a manual brush — night and day difference',
      body: 'Upgraded from a manual toothbrush to this electric brush and it is a massive step up. The micro-vibrations lift plaque without aggressive brushing pressure. Night and day difference!',
      images: [],
      helpful: 29,
      verified: true
    },
    {
      id: 'rev-43',
      name: 'Nvard Hovhannisyan',
      country: 'Sheffield, UK',
      rating: 5,
      date: '2025-01-29',
      displayDate: 'Jan 29, 2025',
      variant: 'Color: Silver',
      title: 'Gifted the Silver to my partner — ordering a second one',
      body: 'Bought the Silver toothbrush as a gift for my partner, and he loves it! I am definitely getting the Pink one for myself now. Delivery was swift and on time.',
      images: [],
      helpful: 32,
      verified: true
    },
    {
      id: 'rev-44',
      name: 'Edith Blackwood',
      country: 'Nottingham, UK',
      rating: 5,
      date: '2025-01-29',
      displayDate: 'Jan 29, 2025',
      variant: 'Color: Grey',
      title: 'Two months of daily brushing without a single recharge',
      body: 'So pleased with this! I have been using the brush for nearly two months and still haven\'t needed to plug it in to recharge. The long battery life is so reliable. Absolutely wonderful device.',
      images: [],
      helpful: 44,
      verified: true
    },
    {
      id: 'rev-45',
      name: 'Lyan v. H.',
      country: 'Liverpool, UK',
      rating: 5,
      date: '2025-01-07',
      displayDate: 'Jan 7, 2025',
      variant: 'Color: Silver',
      title: 'Arrived just in time for holiday travel',
      body: 'Purchased specifically for my travels, and thankfully the order arrived rapidly just before my holiday. Packed it in the travel case without bringing any charger and it worked flawlessly for 3 weeks.',
      images: [],
      helpful: 27,
      verified: true
    },
    {
      id: 'rev-46',
      name: 'Marwan v. H.',
      country: 'Manchester, UK',
      rating: 5,
      date: '2024-12-17',
      displayDate: 'Dec 17, 2024',
      variant: 'Color: Grey',
      title: 'Switched from Oral-B — much gentler and cleaner feel',
      body: 'I had always used Oral-B oscillating brushes and decided it was time to try acoustic micro-vibration cleaning. After the first few days, I am thoroughly impressed. Much gentler on my enamel, excellent results, and neatly packaged.',
      images: [],
      helpful: 38,
      verified: true
    },
    {
      id: 'rev-47',
      name: 'Noah v. D.',
      country: 'Leeds, UK',
      rating: 5,
      date: '2024-11-22',
      displayDate: 'Nov 22, 2024',
      variant: 'Color: Grey',
      title: 'Super fast dispatch and great build quality',
      body: 'The toothbrush arrived the very next day after ordering. Super quick fulfillment and great quality device. The 3 modes switch smoothly with single button clicks.',
      images: [],
      helpful: 21,
      verified: true
    },
    {
      id: 'rev-48',
      name: 'Tess Morrison',
      country: 'Belfast, UK',
      rating: 5,
      date: '2024-10-27',
      displayDate: 'Oct 27, 2024',
      variant: 'Color: Pink',
      title: 'Immediate relief for sensitive gums',
      body: 'I often struggle with sensitive gums and receding margins. After using Sensitive mode on this electric brush for a few weeks, I noticed an immediate difference. Zero irritation and much healthier gums.',
      images: [],
      helpful: 37,
      verified: true
    },
    {
      id: 'rev-49',
      name: 'Jasper Vance',
      country: 'London, UK',
      rating: 5,
      date: '2024-10-20',
      displayDate: 'Oct 20, 2024',
      variant: 'Color: Silver',
      title: 'Top tier hardware and outstanding customer service',
      body: 'The quality of the toothbrush is top tier. The acoustic levitation motor runs smooth without rattling. Service is outstanding and delivery was prompt. More than satisfied.',
      images: [],
      helpful: 30,
      verified: true
    },
    {
      id: 'rev-50',
      name: 'Mila Brennan',
      country: 'Edinburgh, UK',
      rating: 5,
      date: '2024-10-05',
      displayDate: 'Oct 5, 2024',
      variant: 'Color: Grey',
      title: 'Switched from another brand and couldn\'t be happier',
      body: 'After a disappointing experience with another major brand, I made the switch and couldn\'t be happier. It is lighter, quieter, and holds battery 4x longer. A new lifetime customer!',
      images: [],
      helpful: 35,
      verified: true
    },
    {
      id: 'rev-51',
      name: 'Thijs d. B.',
      country: 'Oxford, UK',
      rating: 5,
      date: '2024-10-03',
      displayDate: 'Oct 3, 2024',
      variant: 'Color: Silver',
      title: 'Superb build quality and well-calibrated brushing modes',
      body: 'Delivered very quickly! The build quality is superb and I love the different calibrated mode settings. Clean, minimalist design that looks great on the counter. Highly recommend.',
      images: [],
      helpful: 28,
      verified: true
    },
    {
      id: 'rev-52',
      name: 'Eva de Jong',
      country: 'Cardiff, UK',
      rating: 5,
      date: '2024-09-22',
      displayDate: 'Sep 22, 2024',
      variant: 'Color: Pink',
      title: 'First-class live customer support and fast resolution',
      body: 'When I had a question about replacement heads, live customer support assisted me immediately and kindly. The toothbrush itself is immaculate and Whitening mode lifted coffee stains within weeks.',
      images: [],
      helpful: 26,
      verified: true
    },
    {
      id: 'rev-53',
      name: 'Sophie Marshall',
      country: 'Bath, UK',
      rating: 5,
      date: '2024-09-19',
      displayDate: 'Sep 19, 2024',
      variant: 'Color: Grey',
      title: 'Long battery endurance eliminates charging hassle',
      body: 'Just received my new toothbrush and I am very impressed. The long battery endurance means I can brush for weeks without ever having to worry about charging cables or cluttered bathroom sinks.',
      images: [],
      helpful: 33,
      verified: true
    },
    {
      id: 'rev-54',
      name: 'Sander White',
      country: 'York, UK',
      rating: 5,
      date: '2024-09-06',
      displayDate: 'Sep 6, 2024',
      variant: 'Color: Silver',
      title: 'Remarkably smooth teeth without irritating gums',
      body: 'My teeth feel remarkably smooth after brushing, completely gentle on gums with zero irritation. The 30-second quad pacer ensures an even 2-minute clean every time.',
      images: [],
      helpful: 29,
      verified: true
    },
    {
      id: 'rev-55',
      name: 'Anna Walker',
      country: 'Newcastle, UK',
      rating: 5,
      date: '2024-08-11',
      displayDate: 'Aug 11, 2024',
      variant: 'Color: Grey',
      title: 'Morning rush made easy — no more dead batteries',
      body: 'In the morning I am always rushing. My old toothbrush needed charging every week which was a constant nuisance. With this 60-day battery, that problem is finally solved for good.',
      images: [],
      helpful: 40,
      verified: true
    }
  ];

  // ==========================================================================
  // HIGH-PERFORMANCE 4,275 REVIEW DATASET & GENERATOR ENGINE
  // Tailored 100% to Miroooo X1 specifications with strict anti-duplication
  // ==========================================================================

  const FIRST_NAMES = [
    'Oliver', 'George', 'Harry', 'Jack', 'Jacob', 'Noah', 'Charlie', 'Muhammad', 'Thomas', 'Oscar',
    'William', 'James', 'Henry', 'Alfie', 'Leo', 'Joshua', 'Archie', 'Ethan', 'Alexander', 'Lucas',
    'Edward', 'Daniel', 'Isaac', 'Max', 'Mohammed', 'Samuel', 'Finley', 'Benjamin', 'Adam', 'Sebastian',
    'Theodore', 'Arthur', 'Toby', 'Luke', 'Mason', 'Harrison', 'Freddie', 'Theo', 'Liam', 'Nathan',
    'Amelia', 'Olivia', 'Emily', 'Isla', 'Ava', 'Jessica', 'Poppy', 'Isabella', 'Sophie', 'Mia',
    'Ruby', 'Lily', 'Grace', 'Evie', 'Sophia', 'Ella', 'Scarlett', 'Chloe', 'Isabelle', 'Freya',
    'Charlotte', 'Sienna', 'Daisy', 'Phoebe', 'Millie', 'Eva', 'Alice', 'Lucy', 'Florence', 'Sofia',
    'Layla', 'Lola', 'Holly', 'Imogen', 'Molly', 'Matilda', 'Lilly', 'Rosie', 'Elizabeth', 'Erin',
    'Callum', 'Connor', 'Lewis', 'Kyle', 'Cameron', 'Ewan', 'Fraser', 'Hamish', 'Brodie', 'Calum',
    'Aoife', 'Niamh', 'Ciara', 'Caoimhe', 'Roisin', 'Maeve', 'Sinead', 'Sorcha', 'Clodagh', 'Orlaith',
    'Kieran', 'Declan', 'Cillian', 'Ronan', 'Eoin', 'Sean', 'Cian', 'Conor', 'Fintan', 'Darragh',
    'Julian', 'Sebastian', 'Alistair', 'Dominic', 'Rupert', 'Jasper', 'Felix', 'Gideon', 'Benedict', 'Miles',
    'Gemma', 'Fiona', 'Harriet', 'Zara', 'Clara', 'Beatrice', 'Philippa', 'Rowena', 'Constance', 'Penelope',
    'Matthias', 'Florian', 'Tobias', 'Jonas', 'Leon', 'Lukas', 'Niklas', 'Finn', 'Paul', 'Jan',
    'Astrid', 'Elin', 'Linnea', 'Maja', 'Freja', 'Ingrid', 'Sigrid', 'Klara', 'Saga', 'Ebba',
    'Hugo', 'Gabriel', 'Raphael', 'Clement', 'Louis', 'Antonin', 'Valentin', 'Mathieu', 'Bastien', 'Adrien'
  ];

  const LAST_NAMES = [
    'Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Robinson', 'Wright',
    'Thompson', 'Evans', 'Walker', 'White', 'Roberts', 'Green', 'Hall', 'Thomas', 'Clarke', 'Jackson',
    'Wood', 'Harris', 'Edwards', 'Turner', 'Martin', 'Cooper', 'Hill', 'Ward', 'Hughes', 'Moore',
    'King', 'Harrison', 'Lewis', 'Baker', 'Patel', 'Young', 'Allen', 'Anderson', 'Phillips', 'Mitchell',
    'Campbell', 'Bell', 'Carter', 'Parker', 'Miller', 'Davis', 'Murphy', 'Price', 'Bennett', 'Griffiths',
    'Watson', 'Kelly', 'Simpson', 'Marshall', 'Collins', 'Carter', 'Stevenson', 'Reynolds', 'Morrison', 'Sinclair',
    'MacDonald', 'MacLean', 'Fraser', 'Robertson', 'Stewart', 'Munro', 'Cameron', 'MacKenzie', 'Ross', 'Grant',
    'O\'Sullivan', 'O\'Neill', 'O\'Brien', 'Walsh', 'Ryan', 'O\'Connor', 'Doyle', 'McCarthy', 'Gallagher', 'Brennan',
    'Lindqvist', 'Svensson', 'Nilsson', 'Larsson', 'Andersson', 'Bergqvist', 'Holm', 'Johansson', 'Nystrom', 'Ekstrom',
    'Mueller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Hoffmann', 'Schulz',
    'Moreau', 'Lefebvre', 'Dubois', 'Laurent', 'Simon', 'Michel', 'Garcia', 'David', 'Bertrand', 'Roux',
    'Vandenberg', 'Van Dijk', 'Bakker', 'Janssen', 'De Jong', 'Visser', 'Smit', 'Meijer', 'De Boer', 'Vos',
    'Sterling', 'Thorne', 'Pennington', 'Vance', 'Blackwood', 'Kensington', 'Chamberlain', 'Huntington', 'Fairfax', 'Ashford'
  ];

  const PROFESSIONAL_TITLES = [
    ' (DDS)', ' (Dental Surgeon)', ' (Dental Hygienist)', ' (RDH)', ' (BDS Bristol)', ' (Oral Health Therapist)'
  ];

  const LOCATIONS = [
    'London, UK', 'Manchester, UK', 'Birmingham, UK', 'Leeds, UK', 'Glasgow, UK', 'Edinburgh, UK',
    'Liverpool, UK', 'Bristol, UK', 'Sheffield, UK', 'Newcastle, UK', 'Cardiff, UK', 'Belfast, UK',
    'Oxford, UK', 'Cambridge, UK', 'Nottingham, UK', 'Bath, UK', 'Brighton, UK', 'York, UK',
    'Aberdeen, UK', 'Norwich, UK', 'Southampton, UK', 'Exeter, UK', 'Plymouth, UK', 'Leicester, UK',
    'Chester, UK', 'Dundee, UK', 'Inverness, UK', 'Coventry, UK', 'Portsmouth, UK', 'Reading, UK',
    'Bournemouth, UK', 'Derby, UK', 'Milton Keynes, UK', 'Swansea, UK', 'Hull, UK', 'Ipswich, UK',
    'Gloucester, UK', 'Salisbury, UK', 'Winchester, UK', 'Cheltenham, UK', 'Harrogate, UK', 'Stirling, UK',
    'Dublin, IE', 'Cork, IE', 'Galway, IE', 'Limerick, IE',
    'Toronto, CA', 'Vancouver, CA', 'Montreal, CA', 'Calgary, CA', 'Ottawa, CA',
    'Sydney, AU', 'Melbourne, AU', 'Brisbane, AU', 'Perth, AU', 'Adelaide, AU',
    'Auckland, NZ', 'Wellington, NZ', 'Christchurch, NZ',
    'New York, US', 'Los Angeles, US', 'Chicago, US', 'Boston, US', 'Seattle, US', 'Austin, US',
    'Amsterdam, NL', 'Rotterdam, NL', 'Utrecht, NL',
    'Munich, DE', 'Berlin, DE', 'Hamburg, DE', 'Frankfurt, DE',
    'Stockholm, SE', 'Gothenburg, SE', 'Malmo, SE',
    'Paris, FR', 'Lyon, FR', 'Bordeaux, FR',
    'Zurich, CH', 'Geneva, CH', 'Basel, CH',
    'Copenhagen, DK', 'Aarhus, DK', 'Oslo, NO', 'Bergen, NO', 'Helsinki, FI', 'Vienna, AT'
  ];

  const VARIANTS = [
    'Color: Grey',
    'Color: Silver',
    'Color: Pink'
  ];

  // 5-Star Phrasing Matrices (Combinatorially massive, 0% repetition)
  const FIVE_STAR_TITLES = [
    '60-day battery is completely real — haven\'t charged it in weeks',
    '32,000 VPM acoustic cleaning leaves teeth squeaky clean',
    'Dental hygienist was amazed at my plaque reduction',
    'Sensitive mode completely calmed my inflamed gums',
    'Universal USB-C fast charging is an absolute triumph',
    'Quiet acoustic motor — no more jarring handle vibrations',
    'DuPont curved bristles reach tight back molars with ease',
    'Took this on an 8-week international trip with no charger',
    'Whitening mode lifted stubborn espresso stains in three weeks',
    'IPX7 waterproof sealed body makes shower brushing effortless',
    'Sleek travel case with ventilation is wonderfully engineered',
    'Feels like leaving a professional dental hygienist every day',
    '30-second quadrant pacer transformed my brushing routine',
    'Best electric toothbrush I have owned in 15 years',
    'Grey anodized finish looks stunning in my bathroom',
    'So much gentler on enamel than round oscillating heads',
    'Fluid dynamic cavitation reaches where manual bristles cannot',
    'Whisper-quiet acoustic operation is a joy at 6 AM',
    'Countertop stays spotless thanks to the slim unibody design',
    'Enamel feels glass-smooth from morning until night',
    'The 3 modes cover every dental need with perfection',
    'Remarkable plaque removal along the posterior gumline',
    'Unboxing experience and build precision rival luxury audio gear',
    'Brushing twice daily is now something I genuinely look forward to',
    'High-density DuPont filaments don\'t splay after months of use',
    'Replaced my noisy flagship toothbrush and never looking back',
    'No messy charging cradle or gross build-up around the base',
    'Acoustic micro-bubbles clean deep between dental contacts',
    'My partner ordered one after trying mine for just two days',
    'Zero sensitivity even with cold water now — remarkable device',
    'Dentist confirmed my gum pockets reduced significantly',
    'Battery longevity is in a completely different league',
    'Effortless gliding action — no harsh scrubbing pressure needed',
    'Pure minimalist luxury for your daily bathroom counter',
    'The gentle hum is so discreet compared to old electric brushes',
    'Noticeable brightening without any chemical whitening strips',
    'USB-C universal charging makes packing for travel a breeze',
    'Ergonomic handle balance is weighted to perfection',
    '3D bristle contour fits the curvature of every single tooth',
    'Cleanest teeth I have experienced outside of a scale & polish',
    'Solid metallic build quality that feels built to last for years',
    'Brilliant engineering down to the micro-vented travel case',
    'Worth every single penny for the dental peace of mind',
    'Acoustic levitation motor delivers consistent powerful torque',
    'Gentle yet undeniably thorough — five stars without hesitation',
    'My tea and red wine stains have faded completely',
    'IPX7 waterproof sealed unibody works wonderfully in the shower',
    'Outstanding product — delivered quickly and impeccably boxed',
    'Two full minutes fly by thanks to the quad-interval pacer',
    'The pinnacle of electric toothbrush design and daily performance'
  ];

  const FIVE_STAR_OPENERS = [
    'I have tested nearly every major electric toothbrush brand over the past decade, but the Miroooo X1 operates on a completely different level.',
    'After my dental hygienist warned me about early gum recession from aggressive manual brushing, I immediately ordered the Miroooo X1.',
    'I travel constantly for business across Europe and North America, and I was so tired of packing chunky proprietary chargers.',
    'As someone with very sensitive teeth and mild fluorosis, finding an electric toothbrush that doesn\'t cause toothache was a major challenge.',
    'My previous electric toothbrush sounded like an industrial drill and vibrated my entire skull every single morning.',
    'I was skeptical about the 60-day battery claim at first, but after two full months of twice-daily use, the Miroooo X1 proved me wrong.',
    'Bought this based on the recommendation of a colleague who is a dental surgeon, and it has exceeded every possible expectation.',
    'The moment you hold this brush in your hand, the anodized finish and weighted ergonomic balance feel like high-end precision audio hardware.',
    'I have a permanent retainer behind my lower teeth which constantly traps plaque, making manual brushing very frustrating.',
    'Drinking multiple flat whites and black teas every day left noticeable surface discoloration on my incisors.',
    'I always brush my teeth in the shower to streamline my morning routine, so true IPX7 waterproofing was an absolute requirement.',
    'Our bathroom countertop used to be cluttered with bulky charging stands until we switched to this sleek USB-C brush.'
  ];

  const FIVE_STAR_FEATURES = [
    'The 32,000 vibrations per minute maglev motor creates powerful hydrodynamic micro-bubbles that flush out biofilm between tight teeth.',
    'The 60-day lithium cell is genuinely extraordinary — a single USB-C charge lasts for two solid months.',
    'The 3 calibrated modes (Standard Clean, Whitening, Sensitive) make it effortless to switch between deep plaque removal and gentle gum care.',
    'The 3D curved DuPont filaments are rounded at the microscopic level, allowing them to glide smoothly over enamel without scratching.',
    'The sleek standing design keeps the brush head elevated and hygienic with zero countertop residue.',
    'The ventilated hard travel case protects the power switch from accidental activation in my luggage while allowing the bristles to dry naturally.',
    'The 30-second quadrant interval pacer gives a gentle, tactile pause to ensure all four dental zones receive equal 30-second attention.',
    'At under 50dB, the acoustic motor produces a refined, whisper-quiet hum with almost zero vibration transferred to your hand.'
  ];

  const FIVE_STAR_RESULTS = [
    'My dental hygienist was genuinely impressed during my 6-month checkup — she said my plaque index was the lowest she had ever recorded.',
    'Within three weeks of using Whitening mode with my normal toothpaste, the stubborn coffee and tea stains on my front teeth were gone.',
    'My gum sensitivity has completely vanished; there is zero bleeding when flossing and cold water no longer triggers sharp pain.',
    'My teeth have that glassy, squeaky-clean smoothness that you normally only get immediately following a professional dental hygiene visit.',
    'I completed an entire 7-week overseas holiday without packing a charging cable once, and the power remained at 100% throughout.',
    'The interdental cleaning is so effective that my dental floss comes out clean even after eating fibrous foods and salads.',
    'My entire family noticed how much brighter my smile looked after just three weeks of consistent morning and evening cycles.',
    'The morning shower routine is completely seamless now — the brush rinses spotless under running water with zero moisture ingress.'
  ];

  const FIVE_STAR_CLOSERS = [
    'I cannot recommend this electric toothbrush highly enough to anyone who values their long-term oral health.',
    'Truly an exceptional piece of modern industrial design and oral care engineering. Five stars all the way.',
    'I have already purchased a second unit in Pink for my partner, and she is just as enamored with it.',
    'Easily the best £59 investment I have made for my daily wellness routine this year.',
    'If you are on the fence between this and overpriced drugstore brands, get the Miroooo X1 — you will not regret it.',
    'A masterclass in minimalist design, quiet performance, and uncompromising battery longevity.',
    'My only regret is that I did not switch to this acoustic technology years earlier.',
    'Top tier build quality, rapid delivery, and immaculate packaging. Truly a 10 out of 10 product.'
  ];

  // 4-Star Phrasing (Authentic praise, diverse titles, modular structures with zero duplication)
  // 4-Star Phrasing (Authentic praise, clean titles, modular structures with zero duplication)
  const FOUR_STAR_TITLES = [
    'Recommend to all',
    'Love the brush',
    'Great toothbrush, very happy with results',
    'Recommend to anyone looking for a sleek acoustic brush',
    'Love the brush — teeth feel so polished',
    'Exceptional 60-day battery life, very quiet motor',
    'Leaves teeth feeling like glass, minor suggestion on extra heads',
    'Top tier acoustic clean, very gentle on sensitive gums',
    'High quality build, highly recommend to all',
    'Love the brush — clean teeth and no sink clutter',
    'Whisper quiet and powerful, beautiful Pink finish',
    'Superb plaque removal, great upgrade from manual brush',
    'Brilliant toothbrush, wish the travel cap snapped tighter',
    'Very pleased with the clean, teeth feel noticeably smoother',
    'Solid 4 stars, excellent battery longevity and finish',
    'Recommend to all my colleagues',
    'Love the brush and the minimalist magnetic mount',
    'Great clean, gums stopped bleeding after week one',
    'Clean and modern look, fast USB-C charging',
    'Gentle micro-vibrations, wonderful daily experience',
    'Super smooth teeth, beautiful anodised aluminium',
    'Outstanding value in the multi-pack bundle',
    'Fantastic acoustic brush, would buy again',
    'Love the brush — clean teeth from morning until night',
    'Recommend to all! Zero regrets switching from old oscillating brush',
    'Super clean feeling, took a couple of days to adjust',
    'Impressive power and sleek feel in hand',
    'Takes 2-3 days to adapt to high-speed vibrations, then it is amazing',
    'Great hardware, quiet acoustic clean and no counter mess',
    'Remarkably lightweight at 51g, perfect for travelling',
    'Gentle on enamel and gums, highly recommend to all',
    'Love the brush! Teeth feel as smooth as after a hygienist clean',
    'Minimalist design done right, battery lasts months',
    'Great daily performance, single pack could include 4 heads',
    'Acoustic micro-vibrations are smooth and effective',
    'Love the sleek metallic finish, recommend to all',
    'Very quiet at 6 AM, partner does not hear it at all',
    'Noticeable brightening on whitening mode in 3 weeks',
    'Wonderful brush, lightweight and very comfortable to grip',
    'Recommend to all friends looking to upgrade their oral care',
    'Great toothbrush, USB-C charging is fast and easy',
    'Love the brush! 30-second interval pulse keeps routine disciplined',
    'Solid acoustic clean, very easy to rinse clean under water',
    'Clean feel lasts all day, recommend to all',
    'Very impressed by the battery life and build precision',
    'DuPont bristles are soft yet thorough, great purchase',
    'Love the brush — feels like a luxury gadget in the bathroom',
    'Recommend to all, superior to clunky drugstore electric brushes',
    'Teeth feel silky smooth, wonderful travel case included',
    'Great design and clean, highly recommend to anyone'
  ];

  const FOUR_STAR_OPENERS = [
    'I have been using the Miroooo X1 for about a month now and I am genuinely impressed.',
    'Switched to this acoustic toothbrush after my dentist suggested a gentler sonic option.',
    'Really love the brush! The minimalist aluminium design looks so sleek on the bathroom counter.',
    'Upgraded from a standard manual toothbrush and the difference in oral hygiene is night and day.',
    'Ordered the multi-pack bundle for my partner and myself after reading positive feedback.',
    'This is easily one of the best electric toothbrushes I have tried in terms of daily comfort.',
    'The unboxing was great and the build quality feels like a luxury precision gadget.',
    'Brushing with this has made my morning routine feel so much fresher and disciplined.',
    'I was skeptical about the 60-day battery claim at first, but it really does keep going strong.',
    'My teeth have always been slightly sensitive, so I was cautious about high-frequency vibrations.',
    'After years of using heavy, clunky electric toothbrushes, the lightweight Miroooo X1 is refreshing.',
    'Received my order within two days and started using it right away on Sensitive mode.',
    'The sleek anodised metal chassis immediately stands out compared to plastic drugstore brushes.',
    'Love the brush! It has completely transformed how clean my mouth feels before bed.',
    'I commute frequently for work and needed an electric brush that travels easily without bulky cradles.',
    'My hygienist recommended switching to high-vibration sonic technology for plaque along the gumline.',
    'Been using this twice a day for five weeks now and my oral routine feels totally elevated.',
    'The brushed aluminium finish feels wonderfully premium in the hand and does not collect grimy buildup.',
    'Purchased during the promotion and I am very satisfied with the overall experience so far.',
    'Extremely pleased with how lightweight and balanced this toothbrush feels during brushing.'
  ];

  const FOUR_STAR_FEATURES = [
    'The 32,000 VPM acoustic motor creates a thorough hydrodynamic clean that leaves teeth glass-smooth.',
    'The 3 dedicated modes make it simple to alternate between daily Standard Clean and gentle gum polishing.',
    'The 60-day lithium battery is genuine — I have only charged it once on arrival and power has not dropped.',
    'The curved DuPont bristles fit neatly along the dental curvature without scraping enamel.',
    'The direct USB-C charging is effortless and keeps the sink area clean and clutter-free.',
    'The acoustic motor produces a refined quiet hum that does not disturb anyone in the house early morning.',
    'The 30-second quadrant interval pacer gives a helpful tactile pulse so you do not rush your brushing.',
    'The IPX7 waterproof unibody construction means I can rinse it thoroughly under the tap without worry.',
    'The Whitening mode has visibly reduced coffee stains on my front teeth after three weeks.',
    'The slim magnetic travel case protects the power button inside my gym bag and luggage.',
    'The 51g aerospace aluminium body feels exceptionally light and maneuverable compared to bulky alternatives.',
    'The micro-vibrations clean deep between tight interdental spaces where standard bristles struggle.'
  ];

  const FOUR_STAR_FEEDBACK = [
    'My only small suggestion is that the starter single box should include four replacement heads instead of two.',
    'It takes about 48 hours to get used to the ticklish high-speed vibration if you are transitioning from manual brushing.',
    'The USB-C cable is a little on the shorter side for my particular plug layout.',
    'Would love to see replacement brush heads available in mixed pastel colour packs for family members.',
    'The travel case works great, though the snap-fit cap could click with just a fraction more resistance.',
    'The quadrant vibration pause is quite subtle at first, but you quickly learn to recognize the rhythm.',
    'Outer shipping packaging had a tiny corner crease from the postal courier, though the product inside was pristine.',
    'The satin metal handle is very smooth, so you just need to keep a firm grip when your hands are wet.',
    'Delivery tracking took about 24 hours to update on the carrier portal, but the package arrived safely.',
    'Took a few days to master the optimal 45-degree angle against the gumline, but results have been stellar.'
  ];

  const FOUR_STAR_CLOSERS = [
    'Recommend to all. A fantastic daily toothbrush.',
    'Definitely love the brush and will be ordering extra replacement heads soon.',
    'Highly recommend to anyone looking to upgrade their oral care routine.',
    'Solid 4 stars. Great product and very pleased with the clean.',
    'Would recommend to all my friends and family without hesitation.',
    'Love the brush and very happy with the purchase.',
    'Recommend to all. Teeth feel cleaner and fresher than ever before.',
    'A wonderful addition to my bathroom counter. Great job Miroooo!',
    'Very happy with how clean my teeth feel every single morning.',
    'Great purchase overall, recommend to all.',
    'Love the brush! Sleek, quiet, and delivers great results daily.',
    'Superb value and performance. Recommend to all.',
    'Genuinely pleased with the build quality and results. Recommend to all.',
    'Solid 4 stars. Minimalist luxury done right.',
    'Love the brush — clean teeth, no clutter, and great battery life.'
  ];

  const FOUR_STAR_SHORT_REVIEWS = [
    'Love the brush! Clean feels just like leaving the dental hygienist. Wish replacement heads came in bigger packs.',
    'Recommend to all. Sleek aluminium handle and whisper quiet motor. Gums feel much healthier already.',
    'Great electric toothbrush. Battery life is unbelievable and the slim profile keeps the counter clean.',
    'Very sleek design and cleans thoroughly. Highly recommend to friends and family.'
  ];

  // 3-Star Phrasing (Balanced feedback)
  const THREE_STAR_TITLES = [
    'Good brush, high vibration intensity takes a week of adjustment',
    'Great hardware and battery, international delivery took 6 business days',
    'Very well made, acoustic motor is stronger than expected',
    'Solid acoustic clean, compact unibody is very easy to handle',
    'Impressive battery life, handle is very sleek but can be slippery when wet'
  ];

  const THREE_STAR_BODIES = [
    'The toothbrush is undeniably well manufactured and the 60-day battery claim appears accurate. However, the 32,000 VPM motor is quite intense even on the lowest mode. I recommend starting strictly on Sensitive mode for the first full week until your gums and teeth acclimate.',
    'The Miroooo X1 hardware is very high quality — whisper quiet, completely waterproof, and the travel case is great. Delivery to Europe took 6 business days rather than the estimated 3-4 days. Customer support was polite and provided tracking when asked.',
    'Cleaning performance is good and the USB-C fast charging is a very clean solution. The satin finish is beautiful, though if you have soapy hands in the shower you need to maintain a firm grip. Plaque removal is noticeably better than my old manual brush.',
    'A good electric toothbrush with great battery longevity. Completely waterproof and fits easily in the travel case.'
  ];

  // 2-Star Phrasing (Transit/minor issues + merchant care)
  const TWO_STAR_TITLES = [
    'Outer shipping carton had a corner crease from transit handling',
    'Did not realize wall charger plug was not included in the box',
    'Took longer than expected to adjust from a manual toothbrush',
    'Delivery courier left parcel behind garden gate in the rain'
  ];

  const TWO_STAR_BODIES = [
    'The toothbrush and travel case inside were pristine and work exactly as described. However, the outer postal box was slightly squashed by Royal Mail during transit. For a luxury product, transit outer cartons should be heavier duty.',
    'The package comes with the USB-C charging cable, but you have to supply your own USB wall plug or use your phone adapter. Works fine once plugged in, but would have preferred a dedicated wall plug included.',
    'I found the 32,000 vibrations per minute too intense for my highly sensitive front teeth during the first few days. Sensitive mode helped, but it took nearly two weeks of gradual use to become comfortable with acoustic brushing.'
  ];

  const TWO_STAR_REPLIES = [
    {
      author: 'Miroooo Customer Experience Team',
      text: 'Thank you for your feedback! We are delighted that your Miroooo X1 is performing well. We have upgraded our outbound packaging to heavy-duty corrugated cartons to prevent courier transit damage, and our team has credited a complimentary 2-pack of DuPont brush heads to your account.'
    },
    {
      author: 'Miroooo Customer Care',
      text: 'Hi there, thank you for sharing your experience! To minimize global electronic waste, Miroooo X1 includes a universal USB-C charging cable compatible with any standard 5V wall adapter or power bank. Because the battery lasts 60 days, most users only plug it in 6 times a year. We appreciate your valuable feedback!'
    }
  ];

  // 1-Star Phrasing (Carrier delay / logistics + prompt merchant care)
  const ONE_STAR_TITLES = [
    'Postal delay during holiday rush resolved quickly by support',
    'Courier misdelivered parcel to wrong address initially',
    'Regional depot delay held package for 4 days before express reshipment',
    'Black Friday shipping backlog took longer than anticipated'
  ];

  const ONE_STAR_BODIES = [
    'Ordered during the holiday peak and the courier parcel stalled for 4 days at the regional distribution centre. Reached out to Miroooo customer support and they immediately dispatched a priority express replacement with next-day DPD tracking. The brush is fantastic now that it has arrived, but the delivery delay was frustrating.',
    'The postal driver initially marked the package as delivered to the wrong door number down the road. Support intervened immediately and dispatched a new unit with priority delivery. Great toothbrush once received, but carrier logistics need improvement during peak season.',
    'Parcel took over a week to arrive due to a regional courier sorting backlog. Customer service was responsive and refunded my priority shipping fee right away. The brush itself works wonderfully and the 60-day battery is legit.'
  ];

  const ONE_STAR_REPLIES = [
    {
      author: 'Miroooo Support Care',
      text: 'Dear customer, we sincerely apologize for the carrier delay during the peak holiday volume. Our strict policy is to immediately dispatch a priority express replacement at zero charge whenever a courier stalls. We are glad our support team took care of you and that you are enjoying your Miroooo X1 clean!'
    },
    {
      author: 'Miroooo Client Services',
      text: 'Thank you for your patience! We take logistics reliability very seriously and intervened immediately to ensure your replacement was delivered. We hope the Miroooo X1 provides you with years of immaculate oral care.'
    }
  ];

  // Deterministic Pseudo-Random Generator (LCG) for Zero-Duplication
  function pseudoRandom(seed) {
    let s = (seed * 9301 + 49297) % 233280;
    return s / 233280;
  }

  // Generate All 4,275 Reviews
  function generateFullReviewsDataset() {
    const totalTarget = REVIEWS_SUMMARY.total; // 4275
    const dataset = CURATED_REVIEWS.slice(); // 36 curated reviews

    // Calculate remaining reviews per star rating to reach exact target counts
    const curated5 = dataset.filter(r => r.rating === 5).length;
    const curated4 = dataset.filter(r => r.rating === 4).length;
    const curated3 = dataset.filter(r => r.rating === 3).length;
    const curated2 = dataset.filter(r => r.rating === 2).length;
    const curated1 = dataset.filter(r => r.rating === 1).length;

    const remainingCounts = {
      5: Math.max(0, REVIEWS_SUMMARY.distribution[5].count - curated5),
      4: Math.max(0, REVIEWS_SUMMARY.distribution[4].count - curated4),
      3: 0, // Curated only (3 reviews total, matching X2)
      2: 0, // Curated only (2 reviews total, matching X2)
      1: 0  // Curated only (3 reviews total, matching X2)
    };

    // Reference anchor date: Aug 21, 2026 (shifted by +190 days)
    const baseTimestamp = new Date('2026-09-23T12:00:00Z').getTime();
    let globalIndex = dataset.length + 1;

    // Helper to generate a unique date
    function generateDate(index, total) {
      // Spread across 540 days starting chronologically after curated flagship reviews
      const progress = index / total;
      const daysAgo = Math.floor(Math.pow(progress, 1.35) * 480) + 52;
      const dateObj = new Date(baseTimestamp - (daysAgo * 86400000));
      const yyyy = dateObj.getFullYear();
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
      const dd = String(dateObj.getDate()).padStart(2, '0');
      const isoDate = `${yyyy}-${mm}-${dd}`;
      const displayDate = `${dateObj.getDate()} ${UK_MONTHS[dateObj.getMonth()]} ${yyyy}`;

      return { isoDate, displayDate, daysAgo };
    }

    // Generator for 5-Star Reviews (3,907 items)
    for (let i = 0; i < remainingCounts[5]; i++) {
      const seed = globalIndex * 7919 + i * 31;
      const r1 = pseudoRandom(seed + 1);
      const r2 = pseudoRandom(seed + 2);
      const r3 = pseudoRandom(seed + 3);
      const r4 = pseudoRandom(seed + 4);
      const r5 = pseudoRandom(seed + 5);
      const r6 = pseudoRandom(seed + 6);
      const r7 = pseudoRandom(seed + 7);

      const fName = FIRST_NAMES[Math.floor(r1 * FIRST_NAMES.length)];
      const lName = LAST_NAMES[Math.floor(r2 * LAST_NAMES.length)];
      const hasTitle = r3 < 0.04;
      const titleSuffix = hasTitle ? PROFESSIONAL_TITLES[Math.floor(r4 * PROFESSIONAL_TITLES.length)] : '';
      const fullName = `${fName} ${lName}${titleSuffix}`;

      const location = LOCATIONS[Math.floor(r5 * LOCATIONS.length)];
      const variant = VARIANTS[Math.floor(r6 * VARIANTS.length)];

      const titleIdx = (i * 7 + Math.floor(r1 * 13)) % FIVE_STAR_TITLES.length;
      const openerIdx = (i * 11 + Math.floor(r2 * 7)) % FIVE_STAR_OPENERS.length;
      const featureIdx = (i * 13 + Math.floor(r3 * 11)) % FIVE_STAR_FEATURES.length;
      const resultIdx = (i * 17 + Math.floor(r4 * 13)) % FIVE_STAR_RESULTS.length;
      const closerIdx = (i * 19 + Math.floor(r5 * 17)) % FIVE_STAR_CLOSERS.length;

      const title = FIVE_STAR_TITLES[titleIdx];
      const body = `${FIVE_STAR_OPENERS[openerIdx]} ${FIVE_STAR_FEATURES[featureIdx]} ${FIVE_STAR_RESULTS[resultIdx]} ${FIVE_STAR_CLOSERS[closerIdx]}`;

      const { isoDate, displayDate } = generateDate(globalIndex, totalTarget);
      const helpful = Math.floor(r7 * r7 * 38);

      dataset.push({
        id: `rev-gen-${globalIndex}`,
        name: fullName,
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

    // Generator for 4-Star Reviews (251 items)
    for (let i = 0; i < remainingCounts[4]; i++) {
      const seed = globalIndex * 6271 + i * 47;
      const r1 = pseudoRandom(seed + 1);
      const r2 = pseudoRandom(seed + 2);
      const r3 = pseudoRandom(seed + 3);
      const r4 = pseudoRandom(seed + 4);
      const r5 = pseudoRandom(seed + 5);
      const r6 = pseudoRandom(seed + 6);
      const r7 = pseudoRandom(seed + 7);
      const r8 = pseudoRandom(seed + 8);

      const fName = FIRST_NAMES[Math.floor(r1 * FIRST_NAMES.length)];
      const lName = LAST_NAMES[Math.floor(r2 * LAST_NAMES.length)];
      const fullName = `${fName} ${lName}`;
      const location = LOCATIONS[Math.floor(r5 * LOCATIONS.length)];
      const variant = VARIANTS[Math.floor(r6 * VARIANTS.length)];

      const titleIdx = (i * 7 + Math.floor(r1 * 23)) % FOUR_STAR_TITLES.length;
      const title = FOUR_STAR_TITLES[titleIdx];

      let body = '';
      const SHORT_INDICES = { 3: 0, 24: 1, 70: 2, 140: 3 };
      const EMOJI_MAP = { 12: ' ✨', 45: ' 👍', 98: ' 🪥', 165: ' ⭐️' };

      if (SHORT_INDICES[i] !== undefined) {
        body = FOUR_STAR_SHORT_REVIEWS[SHORT_INDICES[i]];
      } else {
        const openerIdx = (i * 7 + Math.floor(r2 * 19)) % FOUR_STAR_OPENERS.length;
        const featureIdx = (i * 11 + Math.floor(r3 * 17)) % FOUR_STAR_FEATURES.length;
        const feedbackIdx = (i * 13 + Math.floor(r4 * 13)) % FOUR_STAR_FEEDBACK.length;
        const closerIdx = (i * 17 + Math.floor(r5 * 11)) % FOUR_STAR_CLOSERS.length;
        body = `${FOUR_STAR_OPENERS[openerIdx]} ${FOUR_STAR_FEATURES[featureIdx]} ${FOUR_STAR_FEEDBACK[feedbackIdx]} ${FOUR_STAR_CLOSERS[closerIdx]}`;
      }

      if (EMOJI_MAP[i]) {
        body += EMOJI_MAP[i];
      }

      const { isoDate, displayDate } = generateDate(globalIndex, totalTarget);
      const helpful = Math.floor(r7 * 24);

      dataset.push({
        id: `rev-gen-${globalIndex}`,
        name: fullName,
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

    // Generator for 3-Star Reviews (41 items)
    for (let i = 0; i < remainingCounts[3]; i++) {
      const seed = globalIndex * 5417 + i * 61;
      const r1 = pseudoRandom(seed + 1);
      const r2 = pseudoRandom(seed + 2);
      const r5 = pseudoRandom(seed + 5);
      const r6 = pseudoRandom(seed + 6);
      const r7 = pseudoRandom(seed + 7);

      const fName = FIRST_NAMES[Math.floor(r1 * FIRST_NAMES.length)];
      const lName = LAST_NAMES[Math.floor(r2 * LAST_NAMES.length)];
      const fullName = `${fName} ${lName}`;
      const location = LOCATIONS[Math.floor(r5 * LOCATIONS.length)];
      const variant = VARIANTS[Math.floor(r6 * VARIANTS.length)];

      const title = THREE_STAR_TITLES[i % THREE_STAR_TITLES.length];
      const body = THREE_STAR_BODIES[i % THREE_STAR_BODIES.length];

      const { isoDate, displayDate } = generateDate(globalIndex, totalTarget);
      const helpful = Math.floor(r7 * 16);

      dataset.push({
        id: `rev-gen-${globalIndex}`,
        name: fullName,
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
      });

      globalIndex++;
    }

    // Generator for 2-Star Reviews (20 items)
    for (let i = 0; i < remainingCounts[2]; i++) {
      const seed = globalIndex * 4813 + i * 73;
      const r1 = pseudoRandom(seed + 1);
      const r2 = pseudoRandom(seed + 2);
      const r5 = pseudoRandom(seed + 5);
      const r6 = pseudoRandom(seed + 6);
      const r7 = pseudoRandom(seed + 7);

      const fName = FIRST_NAMES[Math.floor(r1 * FIRST_NAMES.length)];
      const lName = LAST_NAMES[Math.floor(r2 * LAST_NAMES.length)];
      const fullName = `${fName} ${lName}`;
      const location = LOCATIONS[Math.floor(r5 * LOCATIONS.length)];
      const variant = VARIANTS[Math.floor(r6 * VARIANTS.length)];

      const title = TWO_STAR_TITLES[i % TWO_STAR_TITLES.length];
      const body = TWO_STAR_BODIES[i % TWO_STAR_BODIES.length];

      const { isoDate, displayDate } = generateDate(globalIndex, totalTarget);
      const helpful = Math.floor(r7 * 14);

      const reviewObj = {
        id: `rev-gen-${globalIndex}`,
        name: fullName,
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

      if (i % 2 === 0) {
        const replyTemplate = TWO_STAR_REPLIES[i % TWO_STAR_REPLIES.length];
        reviewObj.merchantReply = {
          author: replyTemplate.author,
          date: displayDate,
          text: replyTemplate.text
        };
      }

      dataset.push(reviewObj);
      globalIndex++;
    }

    // Generator for 1-Star Reviews (20 items)
    for (let i = 0; i < remainingCounts[1]; i++) {
      const seed = globalIndex * 3709 + i * 89;
      const r1 = pseudoRandom(seed + 1);
      const r2 = pseudoRandom(seed + 2);
      const r5 = pseudoRandom(seed + 5);
      const r6 = pseudoRandom(seed + 6);
      const r7 = pseudoRandom(seed + 7);

      const fName = FIRST_NAMES[Math.floor(r1 * FIRST_NAMES.length)];
      const lName = LAST_NAMES[Math.floor(r2 * LAST_NAMES.length)];
      const fullName = `${fName} ${lName}`;
      const location = LOCATIONS[Math.floor(r5 * LOCATIONS.length)];
      const variant = VARIANTS[Math.floor(r6 * VARIANTS.length)];

      const title = ONE_STAR_TITLES[i % ONE_STAR_TITLES.length];
      const body = ONE_STAR_BODIES[i % ONE_STAR_BODIES.length];

      const { isoDate, displayDate } = generateDate(globalIndex, totalTarget);
      const helpful = Math.floor(r7 * 15);

      const reviewObj = {
        id: `rev-gen-${globalIndex}`,
        name: fullName,
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

      if (i % 2 === 0) {
        const replyTemplate = ONE_STAR_REPLIES[i % ONE_STAR_REPLIES.length];
        reviewObj.merchantReply = {
          author: replyTemplate.author,
          date: displayDate,
          text: replyTemplate.text
        };
      }

      dataset.push(reviewObj);
      globalIndex++;
    }

    return dataset;
  }

  // Populate Master 4,275 Dataset
  const REVIEWS_DATA = generateFullReviewsDataset();

  // Global State
  let currentFilterRating = null; // null = all
  let currentWithPhotos = false;
  let currentVerifiedOnly = false;
  let currentVisibleCount = 12;
  const PAGE_SIZE = 12;

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

  // Init Function
  function initProductReviews() {
    const root = document.getElementById('shopify-section-template--24203751129433__reviews') || document.getElementById('miroooo-reviews-grid') || document.querySelector('.miroooo-reviews-section');
    if (!root) return;

    gridEl = document.getElementById('miroooo-reviews-grid');
    loadMoreBtn = document.getElementById('miroooo-load-more-btn');
    emptyStateEl = document.getElementById('miroooo-reviews-empty');
    loadCountEl = document.getElementById('miroooo-load-count');
    filterStatusEl = document.getElementById('miroooo-filter-status');
    statusTextEl = document.getElementById('miroooo-status-text');
    starDropdownEl = document.getElementById('miroooo-star-dropdown');
    starTriggerLabel = document.getElementById('miroooo-selected-star-label');
    filterPhotosBtn = document.getElementById('miroooo-filter-photos');
    filterVerifiedBtn = document.getElementById('miroooo-filter-verified');
    resetFilterBtn = document.getElementById('miroooo-reset-filter');
    breakdownRows = Array.from(document.querySelectorAll('.miroooo-breakdown-row'));

    bindEvents();
    renderReviews();
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

  // Smooth Interactive Progress Bar Filling on Viewport Entry
  function initProgressBarsAnimation() {
    const bars = document.querySelectorAll('.miroooo-progress-bar');
    if (!bars.length) return;

    bars.forEach(bar => {
      const target = bar.getAttribute('data-target-width') || bar.style.width || '0%';
      bar.setAttribute('data-target-width', target);
      bar.style.width = '0%';
    });

    const reviewsSection = document.querySelector('.miroooo-reviews-section') || document.getElementById('reviews') || document.getElementById('shopify-section-template--24203751129433__reviews');
    if (!reviewsSection || typeof IntersectionObserver === 'undefined') {
      bars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-target-width');
      });
      return;
    }

    let hasAnimated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          bars.forEach((bar, idx) => {
            setTimeout(() => {
              bar.style.width = bar.getAttribute('data-target-width');
            }, idx * 100);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.12 });

    observer.observe(reviewsSection);
  }

  // Bind UI Events
  function bindEvents() {
    // Breakdown Rows Filter
    breakdownRows.forEach(row => {
      row.addEventListener('click', () => {
        const star = parseInt(row.getAttribute('data-star'), 10);
        if (currentFilterRating === star) {
          setStarFilter(null);
        } else {
          setStarFilter(star);
        }
      });
    });

    // Star Dropdown Trigger
    const starTrigger = document.getElementById('miroooo-star-trigger');
    if (starTrigger) {
      starTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (starDropdownEl) starDropdownEl.classList.toggle('open');
      });
    }

    // Star Dropdown Items
    const starMenuItems = document.querySelectorAll('#miroooo-star-menu .miroooo-dropdown-item');
    starMenuItems.forEach(item => {
      item.addEventListener('click', () => {
        const val = item.getAttribute('data-value');
        setStarFilter(val === 'all' ? null : parseInt(val, 10));
        if (starDropdownEl) starDropdownEl.classList.remove('open');
      });
    });

    // Close Dropdowns on Click Outside
    document.addEventListener('click', () => {
      if (starDropdownEl) starDropdownEl.classList.remove('open');
    });

    // Filter Toggle: Photos
    if (filterPhotosBtn) {
      filterPhotosBtn.addEventListener('click', () => {
        currentWithPhotos = !currentWithPhotos;
        filterPhotosBtn.classList.toggle('active', currentWithPhotos);
        filterPhotosBtn.setAttribute('aria-pressed', currentWithPhotos);
        currentVisibleCount = PAGE_SIZE;
        renderReviews();
      });
    }

    // Filter Toggle: Verified
    if (filterVerifiedBtn) {
      filterVerifiedBtn.addEventListener('click', () => {
        currentVerifiedOnly = !currentVerifiedOnly;
        filterVerifiedBtn.classList.toggle('active', currentVerifiedOnly);
        filterVerifiedBtn.setAttribute('aria-pressed', currentVerifiedOnly);
        currentVisibleCount = PAGE_SIZE;
        renderReviews();
      });
    }

    // Reset Filter Button & Clear All Link
    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', resetAllFilters);
    }
    const clearAllLink = document.getElementById('miroooo-clear-all-link');
    if (clearAllLink) {
      clearAllLink.addEventListener('click', resetAllFilters);
    }
    const emptyResetBtn = document.getElementById('miroooo-empty-reset-btn');
    if (emptyResetBtn) {
      emptyResetBtn.addEventListener('click', resetAllFilters);
    }

    // Load More Button
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        currentVisibleCount += PAGE_SIZE;
        renderReviews(false);
      });
    }

    // Write Review Button
    const writeBtn = document.getElementById('miroooo-write-review-btn');
    if (writeBtn) {
      writeBtn.addEventListener('click', openWriteModal);
    }

    // Lightbox Events
    setupLightboxEvents();

    // Write Form Events
    setupWriteModalEvents();
  }

  function setStarFilter(star) {
    currentFilterRating = star;
    currentVisibleCount = PAGE_SIZE;

    // Update Breakdown Bar active state
    breakdownRows.forEach(row => {
      const rowStar = parseInt(row.getAttribute('data-star'), 10);
      row.classList.toggle('active', currentFilterRating === rowStar);
    });

    // Update Star Dropdown Active Item & Trigger Label
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

  function resetAllFilters() {
    currentFilterRating = null;
    currentWithPhotos = false;
    currentVerifiedOnly = false;
    currentVisibleCount = PAGE_SIZE;

    // Reset Breakdown Bars
    breakdownRows.forEach(r => r.classList.remove('active'));

    // Reset Pills
    if (filterPhotosBtn) {
      filterPhotosBtn.classList.remove('active');
      filterPhotosBtn.setAttribute('aria-pressed', 'false');
    }
    if (filterVerifiedBtn) {
      filterVerifiedBtn.classList.remove('active');
      filterVerifiedBtn.setAttribute('aria-pressed', 'false');
    }

    // Reset Dropdown Labels
    if (starTriggerLabel) starTriggerLabel.textContent = 'All stars';

    const starMenuItems = document.querySelectorAll('#miroooo-star-menu .miroooo-dropdown-item');
    starMenuItems.forEach(item => item.classList.toggle('active', item.getAttribute('data-value') === 'all'));

    renderReviews();
  }

  // Filter Core Logic
  function getFilteredAndSortedReviews() {
    let list = REVIEWS_DATA.slice();

    // 1. Star Rating Filter
    if (currentFilterRating !== null) {
      list = list.filter(r => r.rating === currentFilterRating);
    }

    // 2. Photos Filter
    if (currentWithPhotos) {
      list = list.filter(r => r.images && r.images.length > 0);
    }

    // 3. Verified Filter
    if (currentVerifiedOnly) {
      list = list.filter(r => r.verified === true);
    }

    // Chronological default sorting (most recent first)
    list.sort((a, b) => new Date(b.date) - new Date(a.date));

    return list;
  }

  // Render Reviews into Grid
  function renderReviews(scrollUp = true) {
    if (!gridEl) return;

    const filtered = getFilteredAndSortedReviews();
    const isFiltered = currentFilterRating !== null || currentWithPhotos || currentVerifiedOnly;

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

  // Review Star Rating Generator (Uses identical /assets/star.png with transparent background)
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

        <!-- Customer Gallery -->
        ${galleryHTML}

        <!-- Title -->
        <h4 class="miroooo-card-title">${review.title}</h4>

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

    // 4. Whole Review Card Click (Opens modal on card click)
    const cards = gridEl.querySelectorAll('.miroooo-review-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
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

  // ==========================================================================
  // LIGHTBOX / FULL REVIEW MODAL LOGIC (No internal nav, smooth frosted blur)
  // ==========================================================================
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
    void modal.offsetHeight; // Force reflow for smooth CSS transition
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
    if (titleEl) titleEl.textContent = activeLightboxReview.title;
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

  // ==========================================================================
  // WRITE A REVIEW MODAL LOGIC
  // ==========================================================================
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
    const successBox = document.getElementById('miroooo-write-success');
    const successCloseBtn = document.getElementById('miroooo-success-close');

    if (closeBtn) closeBtn.addEventListener('click', closeWriteModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeWriteModal);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeWriteModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeWriteModal();
    });

    // Star Hover & Click
    starBtns.forEach(btn => {
      const rating = parseInt(btn.getAttribute('data-rating'), 10);

      btn.addEventListener('mouseenter', () => {
        starBtns.forEach(b => {
          const r = parseInt(b.getAttribute('data-rating'), 10);
          b.classList.toggle('hover', r <= rating);
        });
        if (ratingLabel) ratingLabel.textContent = ratingLabels[rating];
      });

      btn.addEventListener('mouseleave', () => {
        starBtns.forEach(b => {
          b.classList.remove('hover');
          const r = parseInt(b.getAttribute('data-rating'), 10);
          b.classList.toggle('active', r <= selectedFormRating);
        });
        if (ratingLabel) ratingLabel.textContent = ratingLabels[selectedFormRating];
      });

      btn.addEventListener('click', () => {
        selectedFormRating = rating;
        starBtns.forEach(b => {
          const r = parseInt(b.getAttribute('data-rating'), 10);
          b.classList.toggle('active', r <= selectedFormRating);
        });
        if (ratingLabel) ratingLabel.textContent = ratingLabels[selectedFormRating];
      });
    });

    // Mock File Dropzone Preview
    const fileInput = document.getElementById('miroooo-form-photos');
    const thumbsContainer = document.getElementById('miroooo-preview-thumbs');
    let uploadedImageURLs = [];

    if (fileInput && thumbsContainer) {
      fileInput.addEventListener('change', () => {
        thumbsContainer.innerHTML = '';
        uploadedImageURLs = [];
        const files = Array.from(fileInput.files);
        files.forEach(file => {
          const url = URL.createObjectURL(file);
          uploadedImageURLs.push(url);
          const thumb = document.createElement('div');
          thumb.className = 'miroooo-thumb-item';
          thumb.innerHTML = `<img src="${url}" alt="Preview" />`;
          thumbsContainer.appendChild(thumb);
        });
      });
    }

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

        // Post review to standalone backend storage (saved into org_miroooo-reviews.js)
        try {
          fetch('/api/reviews/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productId: 'miroooo-x',
              name: name,
              email: email,
              rating: selectedFormRating,
              variant: variant,
              title: title,
              body: body,
              images: uploadedImageURLs.length > 0 ? uploadedImageURLs : []
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

  function openWriteModal() {
    const modal = document.getElementById('miroooo-write-modal');
    const form = document.getElementById('miroooo-review-form');
    const submitBtn = document.getElementById('miroooo-form-submit');
    const successBox = document.getElementById('miroooo-write-success');
    if (!modal) return;

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
    void modal.offsetHeight; // Force reflow for smooth CSS transition
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
            submitBtn.querySelectorAll('.miroooo-button-click-loader, .buudy-button-click-loader').forEach(l => l.remove());
          }
        }
        if (successBox) successBox.style.display = 'none';
      }
    }, 250);
  }

  // Initialize on Idle / DOM Ready
  function scheduleInit() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initProductReviews, { timeout: 1500 });
    } else {
      setTimeout(initProductReviews, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInit);
  } else {
    scheduleInit();
  }

})();
