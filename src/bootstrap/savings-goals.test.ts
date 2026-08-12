import { loadSyntheticSavingsGoalOverview } from './savings-goals';

describe('savings-goal composition root', () => {
  it('wires the repository adapter to the domain policy and feature use case', async () => {
    const state = await loadSyntheticSavingsGoalOverview();
    expect(state.kind).toBe('stale');
    expect('items' in state ? state.items : []).toHaveLength(2);
  });
});
