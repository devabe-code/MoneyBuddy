import { render, screen, waitFor } from '@testing-library/react-native';

import type { SavingsGoalOverviewState } from './load-savings-goal-overview';
import { SavingsGoalsScreen } from './savings-goals-screen';
import { defaultSavingsGoalProgressPolicy } from '@/src/domain/goals/savings-goal-progress';
import { SYNTHETIC_SAVINGS_GOALS } from '@/src/test/fixtures/synthetic-savings-goals';

const item = {
  goal: SYNTHETIC_SAVINGS_GOALS[0],
  progress: defaultSavingsGoalProgressPolicy.summarize(SYNTHETIC_SAVINGS_GOALS[0]),
};

async function renderState(state: SavingsGoalOverviewState) {
  await render(<SavingsGoalsScreen loadOverview={async () => state} />);
  await waitFor(() => expect(screen.queryByText('Loading goals')).not.toBeOnTheScreen());
}

describe('SavingsGoalsScreen', () => {
  it('exposes an accessible loading state while the repository is pending', async () => {
    await render(<SavingsGoalsScreen loadOverview={() => new Promise(() => undefined)} />);
    expect(screen.getByText('Loading goals')).toBeOnTheScreen();
  });

  it.each([
    [{ kind: 'empty' } as const, 'No goals yet'],
    [{ kind: 'error', message: 'Safe failure.' } as const, 'Unable to load goals'],
    [{ items: [], kind: 'offline', message: 'No connection.' } as const, 'You are offline'],
  ])('renders the $state.kind state without goal cards', async (state, heading) => {
    await renderState(state);
    expect(screen.getByText(heading)).toBeOnTheScreen();
    expect(screen.queryByRole('progressbar')).not.toBeOnTheScreen();
  });

  it.each(['ready', 'stale', 'partial'] as const)('renders domain summaries in the %s state', async (kind) => {
    await renderState({ items: [item], kind, updatedAt: '2026-09-18T12:00:00.000Z' });
    expect(screen.getByRole('progressbar')).toHaveAccessibilityValue({ now: 62 });
    if (kind !== 'ready') expect(screen.getByRole('summary')).toBeOnTheScreen();
  });

  it('retains cached summaries while offline', async () => {
    await renderState({ items: [item], kind: 'offline', message: 'No connection.' });
    expect(screen.getByText('Showing the last synthetic snapshot.')).toBeOnTheScreen();
    expect(screen.getByRole('progressbar')).toBeOnTheScreen();
  });

  it('converts unexpected repository rejection into a safe error state', async () => {
    await render(<SavingsGoalsScreen loadOverview={async () => { throw new Error('Sensitive adapter detail'); }} />);
    await waitFor(() => expect(screen.getByText('Unable to load goals')).toBeOnTheScreen());
    expect(screen.queryByText('Sensitive adapter detail')).not.toBeOnTheScreen();
  });
});
