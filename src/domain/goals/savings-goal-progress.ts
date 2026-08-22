import type { SavingsGoal } from "./savings-goal";

export type SavingsGoalProgress = Readonly<{
  progressPercent: number;
  remainingMinor: bigint;
}>;

export interface SavingsGoalProgressPolicy {
  summarize(goal: SavingsGoal): SavingsGoalProgress;
}

export const defaultSavingsGoalProgressPolicy: SavingsGoalProgressPolicy =
  Object.freeze({
    summarize(goal: SavingsGoal) {
      const boundedSaved =
        goal.savedMinor > goal.targetMinor ? goal.targetMinor : goal.savedMinor;
      const roundedPercent = Number(
        (boundedSaved * 100n + goal.targetMinor / 2n) / goal.targetMinor,
      );
      return Object.freeze({
        progressPercent: Math.min(100, roundedPercent),
        remainingMinor: goal.targetMinor - boundedSaved,
      });
    },
  });
