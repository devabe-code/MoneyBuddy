import type { SavingsGoal } from '@/src/domain/goals/savings-goal';
import type { SavingsGoalRepository } from '@/src/domain/goals/savings-goal-repository';
import type { SavingsGoalProgress, SavingsGoalProgressPolicy } from '@/src/domain/goals/savings-goal-progress';

export type SavingsGoalOverviewItem = Readonly<{ goal: SavingsGoal; progress: SavingsGoalProgress }>;

export type SavingsGoalOverviewState =
  | Readonly<{ kind: 'loading' }>
  | Readonly<{ kind: 'empty' }>
  | Readonly<{ kind: 'error'; message: string }>
  | Readonly<{ items: readonly SavingsGoalOverviewItem[]; kind: 'offline'; message: string }>
  | Readonly<{ items: readonly SavingsGoalOverviewItem[]; kind: 'partial' | 'ready' | 'stale'; updatedAt: string }>;

export type LoadSavingsGoalOverview = () => Promise<SavingsGoalOverviewState>;

export function createLoadSavingsGoalOverview({
  progressPolicy,
  repository,
}: {
  progressPolicy: SavingsGoalProgressPolicy;
  repository: SavingsGoalRepository;
}): LoadSavingsGoalOverview {
  const summarize = (goals: readonly SavingsGoal[]) => goals.map((goal) => ({ goal, progress: progressPolicy.summarize(goal) }));

  return async () => {
    const result = await repository.list();
    if (result.kind === 'error') return { kind: 'error', message: result.message };
    if (result.kind === 'offline') return { kind: 'offline', message: result.message, items: summarize(result.cachedData ?? []) };
    if (result.data.length === 0) return { kind: 'empty' };
    return {
      items: summarize(result.data),
      kind: result.freshness === 'fresh' ? 'ready' : result.freshness,
      updatedAt: result.updatedAt,
    };
  };
}
