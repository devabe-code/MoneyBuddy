import type { SavingsGoal } from '@/src/domain/goals/savings-goal';
import type { RepositoryFreshness, SavingsGoalRepository } from '@/src/domain/goals/savings-goal-repository';

type SyntheticRepositoryScenario =
  | Readonly<{ cachedAt?: string; includeCache?: boolean; kind: 'offline'; message?: string }>
  | Readonly<{ kind: 'error'; message?: string }>;

const SYNTHETIC_UPDATED_AT = '2026-09-18T12:00:00.000Z';

export class SyntheticSavingsGoalRepository implements SavingsGoalRepository {
  constructor(
    private readonly goals: readonly SavingsGoal[],
    private readonly scenario: RepositoryFreshness | SyntheticRepositoryScenario = 'stale',
  ) {}

  async list() {
    if (typeof this.scenario !== 'string') {
      if (this.scenario.kind === 'error') {
        return { kind: 'error' as const, message: this.scenario.message ?? 'Synthetic goals are unavailable.' };
      }
      return {
        cachedAt: this.scenario.cachedAt ?? SYNTHETIC_UPDATED_AT,
        cachedData: this.scenario.includeCache === false ? undefined : this.goals,
        kind: 'offline' as const,
        message: this.scenario.message ?? 'Synthetic connection unavailable.',
      };
    }
    return {
      data: this.goals,
      freshness: this.scenario,
      kind: 'success' as const,
      updatedAt: SYNTHETIC_UPDATED_AT,
    };
  }
}
