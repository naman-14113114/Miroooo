export interface QuizOption {
  id: string;
  value: string;
  title: string;
  subtitle: string;
}

export interface QuizStep {
  step: number;
  legend: string;
  description: string;
  name: string;
  options: QuizOption[];
}

export const QUIZ_STEPS: QuizStep[] = [
  {
    step: 1,
    name: 'goal',
    legend: 'What matters most in your brushing routine?',
    description: 'Choose the area where you would most value extra guidance.',
    options: [
      {
        id: 'sensitive-gums',
        value: 'sensitive-gums',
        title: 'Use a gentler routine for sensitive gums',
        subtitle: 'Softer mode suggestions with pressure-awareness guidance',
      },
      {
        id: 'brighten-enamel',
        value: 'brighten-enamel',
        title: 'Focus on everyday surface-stain care',
        subtitle: 'Build consistent coverage with the available whitening mode',
      },
      {
        id: 'plaque-tartar',
        value: 'plaque-tartar',
        title: 'Improve daily plaque control along the gumline',
        subtitle: 'Guided 45° positioning for deliberate, consistent coverage',
      },
      {
        id: 'daily-routine',
        value: 'daily-routine',
        title: 'Build a simple, consistent daily routine',
        subtitle: 'Intuitive 2-minute quad-timer with lightweight 51g unibody ease',
      },
    ],
  },
  {
    step: 2,
    name: 'current_brush',
    legend: 'What do you currently brush with?',
    description: 'Helps us evaluate your motor transition and ergonomic improvement.',
    options: [
      {
        id: 'manual',
        value: 'manual',
        title: 'Manual toothbrush',
        subtitle: 'Compare a powered, paced routine with your current manual brush',
      },
      {
        id: 'bulky-electric',
        value: 'bulky-electric',
        title: 'Bulky / heavy electric toothbrush (e.g. Oral-B / Philips)',
        subtitle: 'Replace loud, heavy plastic units with a 51g aluminium unibody',
      },
      {
        id: 'slim-sonic',
        value: 'slim-sonic',
        title: 'Slim battery sonic brush (e.g. SURI / Quip)',
        subtitle: 'Compare guided 45° positioning and the X2 pressure halo',
      },
      {
        id: 'restart-routine',
        value: 'restart-routine',
        title: 'Irregular routine / looking to restart',
        subtitle: 'Restart with a simple 28-day guided routine',
      },
    ],
  },
  {
    step: 3,
    name: 'sensitivity',
    legend: 'Do you tend to press hard or have sensitive gums?',
    description: 'Determines whether active red halo pressure alerts are essential for you.',
    options: [
      {
        id: 'heavy-sensitive',
        value: 'heavy-sensitive',
        title: 'Yes — I often press too hard or notice bleeding',
        subtitle: 'The X2 halo can remind you when the brush detects excess pressure',
      },
      {
        id: 'moderate-sensitive',
        value: 'moderate-sensitive',
        title: 'Moderate sensitivity to hot or cold',
        subtitle: 'Start gently and ask a dentist about persistent sensitivity',
      },
      {
        id: 'normal-deep-clean',
        value: 'normal-deep-clean',
        title: 'No sensitivity — I want a consistent daily clean',
        subtitle: 'Use standard mode with slow, even coverage',
      },
      {
        id: 'active-feedback',
        value: 'active-feedback',
        title: 'Not sure — I want active real-time feedback',
        subtitle: 'A visual halo reminds you when the brush detects excess pressure',
      },
    ],
  },
  {
    step: 4,
    name: 'lifestyle',
    legend: 'Where and how does brushing fit your lifestyle?',
    description: 'Tailors hardware features such as battery capacity, dock, and waterproof ratings.',
    options: [
      {
        id: 'frequent-travel',
        value: 'frequent-travel',
        title: 'Frequent travel & commuting (needs long battery & slim case)',
        subtitle: '90-day battery life, magnetic travel case, universal USB-C fast charge',
      },
      {
        id: 'shower-brushing',
        value: 'shower-brushing',
        title: 'I like brushing in the shower (needs 100% IPX7 waterproof)',
        subtitle: 'Full immersion hermetic IPX7 water resistance for shower use',
      },
      {
        id: 'minimalist-bathroom',
        value: 'minimalist-bathroom',
        title: 'Minimalist bathroom / hate cable clutter (needs wall-mounted storage)',
        subtitle: 'Self-adhesive magnetic mirror/tile mount with zero counter clutter',
      },
      {
        id: 'quiet-routine',
        value: 'quiet-routine',
        title: 'Quiet morning routine (needs ultra-silent <45dB motor)',
        subtitle: 'Whisper-quiet magnetic levitation motor designed for silent mornings',
      },
    ],
  },
  {
    step: 5,
    name: 'finish',
    legend: 'Select your preferred finish & setup:',
    description: 'Choose your anodised aluminium unibody colour or multi-instrument set.',
    options: [
      {
        id: 'silver',
        value: 'silver',
        title: 'Matte Silver (Aerospace aluminium precision)',
        subtitle: 'Classic spacecraft-grade brushed aluminium unibody',
      },
      {
        id: 'grey',
        value: 'grey',
        title: 'Space Grey (Dark luxury instrument)',
        subtitle: 'Deep graphite stealth satin metallic aesthetic',
      },
      {
        id: 'pink',
        value: 'pink',
        title: 'Rose Pink (Warm satin metallic)',
        subtitle: 'Warm champagne rose gold anodised aluminium',
      },
      {
        id: 'bundle-two',
        value: 'bundle-two',
        title: 'Bundle for Two (His & Hers set with extra savings)',
        subtitle: '2x Complete sets + Complimentary 2x Extra Brush Heads (bundle saving included)',
      },
    ],
  },
];
