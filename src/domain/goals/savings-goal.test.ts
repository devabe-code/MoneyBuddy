import { defineSavingsGoal } from './savings-goal';

const validGoal = {
  currency: 'USD' as const,
  id: 'synthetic-emergency-fund',
  kind: 'emergency-fund' as const,
  name: 'Synthetic emergency fund',
  savedMinor: 744_000n,
  targetMinor: 1_200_000n,
};

describe('defineSavingsGoal', () => {
  it('creates an immutable goal from integer minor units', () => {
    const goal = defineSavingsGoal(validGoal);
    expect(goal.savedMinor).toBe(744_000n);
    expect(Object.isFrozen(goal)).toBe(true);
  });

  it.each([
    [{ ...validGoal, id: '' }, 'id is required'],
    [{ ...validGoal, name: ' ' }, 'name is required'],
    [{ ...validGoal, targetMinor: 0n }, 'target must be greater than zero'],
    [{ ...validGoal, savedMinor: -1n }, 'saved amount cannot be negative'],
  ])('rejects invalid domain input', (input, message) => {
    expect(() => defineSavingsGoal(input)).toThrow(message);
  });
});
