import type { SavingsGoal } from '@/src/domain/goals/savings-goal';
import type { RepositoryFreshness, SavingsGoalRepository } from '@/src/domain/goals/savings-goal-repository';

export class SyntheticSavingsGoalRepository implements SavingsGoalRepository {
  constructor(
    private readonly goals: readonly SavingsGoal[],
    private readonly freshness: RepositoryFreshness = 'stale',
  ) {}

  async list() {
    return {
      data: this.goals,
      freshness: this.freshness,
      kind: 'success' as const,
      updatedAt: '2026-09-18T12:00:00.000Z',
    };
  }
}
