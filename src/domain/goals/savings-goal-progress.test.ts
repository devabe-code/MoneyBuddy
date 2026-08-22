import { defineSavingsGoal } from './savings-goal';
import { defaultSavingsGoalProgressPolicy, type SavingsGoalProgressPolicy } from './savings-goal-progress';

function goal(savedMinor: bigint, targetMinor = 1_200_000n) {
  return defineSavingsGoal({ currency: 'USD', id: 'synthetic-goal', kind: 'custom', name: 'Synthetic goal', savedMinor, targetMinor });
}

describe('SavingsGoalProgressPolicy', () => {
  const policy: SavingsGoalProgressPolicy = defaultSavingsGoalProgressPolicy;

  it('calculates progress and remaining value with integer arithmetic', () => {
    expect(policy.summarize(goal(744_000n))).toEqual({ progressPercent: 62, remainingMinor: 456_000n });
  });

  it('rounds to the nearest whole display percentage', () => {
    expect(policy.summarize(goal(2n, 3n)).progressPercent).toBe(67);
  });

  it('caps already-funded goals without creating a negative remainder', () => {
    expect(policy.summarize(goal(1_300_000n))).toEqual({ progressPercent: 100, remainingMinor: 0n });
  });
});
