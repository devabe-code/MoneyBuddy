import { defaultSavingsGoalProgressPolicy } from '@/src/domain/goals/savings-goal-progress';
import { SYNTHETIC_SAVINGS_GOALS } from '@/src/test/fixtures/synthetic-savings-goals';
import { formatFreshnessLabel, formatUsdMinor, presentSavingsGoal } from './present-savings-goal';

describe('savings-goal presenter', () => {
  it.each([
    [0n, '$0'],
    [432_000n, '$4,320'],
    [12_345n, '$123.45'],
    [-125n, '−$1.25'],
  ])('formats %s minor units without floating-point arithmetic', (minor, formatted) => {
    expect(formatUsdMinor(minor)).toBe(formatted);
  });

  it('maps domain output to the reusable goal-card contract', () => {
    const goal = SYNTHETIC_SAVINGS_GOALS[0];
    expect(
      presentSavingsGoal({ goal, progress: defaultSavingsGoalProgressPolicy.summarize(goal) }),
    ).toMatchObject({
      date: 'March 2027',
      icon: 'shield-checkmark-outline',
      progress: 62,
      remaining: '$4,560',
      saved: '$7,440',
      target: '$12,000 target',
      tone: 'warning',
    });
  });

  it('formats freshness deterministically without using the device time zone', () => {
    expect(formatFreshnessLabel('2026-09-18T12:00:00.000Z')).toBe(
      'Last updated Sep 18, 2026, 12:00 PM UTC',
    );
    expect(formatFreshnessLabel('not-an-instant')).toBe('Last updated time unavailable');
  });
});
