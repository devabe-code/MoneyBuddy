import { SYNTHETIC_SAVINGS_GOALS } from './synthetic-savings-goals';

describe('synthetic savings goals', () => {
  it('contains valid, explicitly synthetic domain records', () => {
    expect(SYNTHETIC_SAVINGS_GOALS).toHaveLength(2);
    expect(SYNTHETIC_SAVINGS_GOALS.every((goal) => goal.id.startsWith('synthetic-'))).toBe(true);
    expect(SYNTHETIC_SAVINGS_GOALS.every((goal) => goal.targetMinor > 0n)).toBe(true);
  });
});
