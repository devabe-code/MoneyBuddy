import type { SavingsGoal } from './savings-goal';

export type RepositoryFreshness = 'fresh' | 'partial' | 'stale';

export type SavingsGoalRepositoryResult =
  | Readonly<{
      data: readonly SavingsGoal[];
      freshness: RepositoryFreshness;
      kind: 'success';
      updatedAt: string;
    }>
  | Readonly<{
      cachedAt?: string;
      cachedData?: readonly SavingsGoal[];
      kind: 'offline';
      message: string;
    }>
  | Readonly<{ kind: 'error'; message: string }>;

export interface SavingsGoalRepository {
  list(): Promise<SavingsGoalRepositoryResult>;
}
