import type { SavingsGoalRepository } from './savings-goal-repository';

describe('SavingsGoalRepository', () => {
  it('supports replaceable asynchronous implementations', async () => {
    const repository: SavingsGoalRepository = {
      list: async () => ({ data: [], freshness: 'fresh', kind: 'success', updatedAt: '2026-09-18T12:00:00.000Z' }),
    };
    await expect(repository.list()).resolves.toMatchObject({ kind: 'success', data: [] });
  });
});
