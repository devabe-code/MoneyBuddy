import { addMoney, money } from './money';
import type { SavingsGoal, SavingsProjection, SavingsStrategy } from './types';

export interface ProjectionOptions {
  maxPaychecks?: number;
}

/**
 * Builds a deterministic, interest-free savings projection.
 *
 * Interest and changing cashflow will be introduced as explicit rules later;
 * keeping this primitive simple makes its assumptions visible.
 */
export function projectSavingsGoal(
  goal: SavingsGoal,
  strategy: SavingsStrategy,
  options: ProjectionOptions = {},
): SavingsProjection {
  const maxPaychecks = options.maxPaychecks ?? 520;

  if (!Number.isSafeInteger(maxPaychecks) || maxPaychecks < 0) {
    throw new RangeError('maxPaychecks must be a non-negative safe integer.');
  }

  if (goal.target <= goal.currentBalance) {
    return {
      goalId: goal.id,
      strategyId: strategy.id,
      points: [],
      paychecksToGoal: 0,
    };
  }

  if (strategy.contributionPerPaycheck <= 0) {
    return {
      goalId: goal.id,
      strategyId: strategy.id,
      points: [],
      paychecksToGoal: null,
    };
  }

  const points: SavingsProjection['points'] = [];
  let balance = money(goal.currentBalance);

  for (
    let paycheckNumber = 1;
    paycheckNumber <= maxPaychecks;
    paycheckNumber++
  ) {
    balance = addMoney(balance, strategy.contributionPerPaycheck);
    points.push({ paycheckNumber, balance });

    if (balance >= goal.target) {
      return {
        goalId: goal.id,
        strategyId: strategy.id,
        points,
        paychecksToGoal: paycheckNumber,
      };
    }
  }

  return {
    goalId: goal.id,
    strategyId: strategy.id,
    points,
    paychecksToGoal: null,
  };
}
