import type { SavingsGoalRepositoryResult } from '@/src/domain/goals/savings-goal-repository';
import { defaultSavingsGoalProgressPolicy } from '@/src/domain/goals/savings-goal-progress';
import { SYNTHETIC_SAVINGS_GOALS } from '@/src/test/fixtures/synthetic-savings-goals';
import { createLoadSavingsGoalOverview } from './load-savings-goal-overview';

function loader(result: SavingsGoalRepositoryResult) {
  return createLoadSavingsGoalOverview({
    progressPolicy: defaultSavingsGoalProgressPolicy,
    repository: { list: async () => result },
  });
}

describe('load savings-goal overview', () => {
  it.each(['fresh', 'stale', 'partial'] as const)('maps %s repository data without leaking the adapter', async (freshness) => {
    const state = await loader({ data: SYNTHETIC_SAVINGS_GOALS, freshness, kind: 'success', updatedAt: '2026-09-18T12:00:00.000Z' })();
    expect(state.kind).toBe(freshness === 'fresh' ? 'ready' : freshness);
    expect('items' in state ? state.items[0].progress.progressPercent : undefined).toBe(62);
  });

  it('maps a successful empty repository response to empty', async () => {
    await expect(loader({ data: [], freshness: 'fresh', kind: 'success', updatedAt: '2026-09-18T12:00:00.000Z' })()).resolves.toEqual({ kind: 'empty' });
  });

  it('preserves cached items while offline', async () => {
    const state = await loader({ cachedData: SYNTHETIC_SAVINGS_GOALS, kind: 'offline', message: 'No connection.' })();
    expect(state).toMatchObject({ kind: 'offline', message: 'No connection.' });
    expect('items' in state ? state.items).toHaveLength(2);
  });

  it('maps repository failures to safe feature errors', async () => {
    await expect(loader({ kind: 'error', message: 'Goals are unavailable.' })()).resolves.toEqual({ kind: 'error', message: 'Goals are unavailable.' });
  });
});
