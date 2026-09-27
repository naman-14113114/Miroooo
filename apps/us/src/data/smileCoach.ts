export interface SmileCoachPlan {
  id: string;
  name: string;
  headline: string;
  totalDays: number;
  morningRoutine: string;
  eveningRoutine: string;
  focusTip: string;
}

export const SMILE_COACH_GOALS = [
  { id: 'consistency', title: 'Stay consistent', desc: 'Build a reliable twice-daily habit' },
  { id: 'coverage', title: 'Better coverage', desc: 'Spend equal time across every zone' },
  { id: 'whitening', title: 'Whitening routine', desc: 'Use your whitening mode consistently' },
  { id: 'gentle', title: 'Gentler technique', desc: 'Slow down and avoid hard scrubbing' },
  { id: 'freshness', title: 'Fresher mouth', desc: 'Add tongue and between-teeth care' },
];

export const QUADRANT_STAGES = [
  { id: 1, name: 'Upper Right', description: 'Outer, inner and chewing surfaces (Top Right)' },
  { id: 2, name: 'Upper Left', description: 'Outer, inner and chewing surfaces (Top Left)' },
  { id: 3, name: 'Lower Right', description: 'Outer, inner and chewing surfaces (Bottom Right)' },
  { id: 4, name: 'Lower Left', description: 'Outer, inner and chewing surfaces (Bottom Left)' },
];
