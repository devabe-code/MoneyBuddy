import { defineSavingsGoal } from '@/src/domain/goals/savings-goal';

export const SYNTHETIC_SAVINGS_GOALS = Object.freeze([
  defineSavingsGoal({
    currency: 'USD',
    id: 'synthetic-emergency-fund',
    kind: 'emergency-fund',
    name: 'Emergency fund',
    savedMinor: 744_000n,
    targetDate: '2027-03-01',
    targetMinor: 1_200_000n,
  }),
  defineSavingsGoal({
    currency: 'USD',
    id: 'synthetic-next-car',
    kind: 'vehicle',
    name: 'Next car',
    savedMinor: 432_000n,
    targetDate: '2028-01-01',
    targetMinor: 1_800_000n,
  }),
]);
