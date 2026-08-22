import { SyntheticSavingsGoalRepository } from './synthetic-savings-goal-repository';
import { SYNTHETIC_SAVINGS_GOALS } from '@/src/test/fixtures/synthetic-savings-goals';

describe('SyntheticSavingsGoalRepository', () => {
  it('returns injected synthetic records through the repository contract', async () => {
    const result = await new SyntheticSavingsGoalRepository(SYNTHETIC_SAVINGS_GOALS).list();
    expect(result).toMatchObject({ data: SYNTHETIC_SAVINGS_GOALS, freshness: 'stale', kind: 'success' });
  });

  it('allows freshness to be selected without changing feature code', async () => {
    await expect(new SyntheticSavingsGoalRepository([], 'fresh').list()).resolves.toMatchObject({ freshness: 'fresh' });
  });

  it('provides deterministic cached and failure scenarios', async () => {
    await expect(new SyntheticSavingsGoalRepository(SYNTHETIC_SAVINGS_GOALS, { kind: 'offline' }).list()).resolves.toMatchObject({
      cachedAt: '2026-09-18T12:00:00.000Z',
      cachedData: SYNTHETIC_SAVINGS_GOALS,
      kind: 'offline',
    });
    await expect(new SyntheticSavingsGoalRepository([], { kind: 'error' }).list()).resolves.toEqual({
      kind: 'error',
      message: 'Synthetic goals are unavailable.',
    });
  });
});
