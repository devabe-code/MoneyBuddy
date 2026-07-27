import assert from 'node:assert/strict';
import test from 'node:test';

import { money } from './money';
import { projectSavingsGoal } from './projections';
import type { SavingsGoal, SavingsStrategy } from './types';

const goal: SavingsGoal = {
  id: 'emergency-fund',
  name: 'Emergency fund',
  currentBalance: money(100_00),
  target: money(1_000_00),
};

test('projects the paycheck that reaches a goal', () => {
  const strategy: SavingsStrategy = {
    id: 'baseline',
    name: 'Baseline',
    contributionPerPaycheck: money(150_00),
  };

  const projection = projectSavingsGoal(goal, strategy);

  assert.equal(projection.paychecksToGoal, 6);
  assert.equal(projection.points.at(-1)?.balance, money(1_000_00));
});

test('marks a goal unreachable when the contribution is zero', () => {
  const strategy: SavingsStrategy = {
    id: 'paused',
    name: 'Paused',
    contributionPerPaycheck: money(0),
  };

  const projection = projectSavingsGoal(goal, strategy);

  assert.equal(projection.paychecksToGoal, null);
  assert.deepEqual(projection.points, []);
});

test('does not project a goal that is already complete', () => {
  const strategy: SavingsStrategy = {
    id: 'baseline',
    name: 'Baseline',
    contributionPerPaycheck: money(150_00),
  };
  const completedGoal = {
    ...goal,
    currentBalance: goal.target,
  };

  const projection = projectSavingsGoal(completedGoal, strategy);

  assert.equal(projection.paychecksToGoal, 0);
});
