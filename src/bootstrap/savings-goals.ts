import { defaultSavingsGoalProgressPolicy } from '@/src/domain/goals/savings-goal-progress';
import { createLoadSavingsGoalOverview } from '@/src/features/goals/load-savings-goal-overview';
import { SyntheticSavingsGoalRepository } from '@/src/services/repositories/synthetic-savings-goal-repository';
import { SYNTHETIC_SAVINGS_GOALS } from '@/src/test/fixtures/synthetic-savings-goals';

const repository = new SyntheticSavingsGoalRepository(SYNTHETIC_SAVINGS_GOALS);

export const loadSyntheticSavingsGoalOverview = createLoadSavingsGoalOverview({
  progressPolicy: defaultSavingsGoalProgressPolicy,
  repository,
});
