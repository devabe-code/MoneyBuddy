import { useEffect, useState } from 'react';

import { DisabledAction, Screen, StateNotice } from '@/src/design-system/components';
import { GoalProgressCard } from './goal-progress-card';
import type { LoadSavingsGoalOverview, SavingsGoalOverviewState } from './load-savings-goal-overview';
import { presentSavingsGoal } from './present-savings-goal';

const initialState: SavingsGoalOverviewState = Object.freeze({ kind: 'loading' });

export function SavingsGoalsScreen({ loadOverview }: { loadOverview: LoadSavingsGoalOverview }) {
  const [state, setState] = useState<SavingsGoalOverviewState>(initialState);

  useEffect(() => {
    let active = true;
    loadOverview()
      .then((nextState) => active && setState(nextState))
      .catch(() => active && setState({ kind: 'error', message: 'Goals are unavailable right now.' }));
    return () => { active = false; };
  }, [loadOverview]);

  const items = 'items' in state ? state.items : [];

  return (
    <Screen eyebrow="SAVINGS PLAN" title="Goals" subtitle="Turn a target into a plan you can see.">
      <GoalsStateNotice state={state} />
      {items.map((item) => <GoalProgressCard goal={presentSavingsGoal(item)} key={item.goal.id} />)}
      {items.length > 0 ? <DisabledAction label="Add a goal · coming soon" /> : null}
    </Screen>
  );
}

function GoalsStateNotice({ state }: { state: SavingsGoalOverviewState }) {
  switch (state.kind) {
    case 'ready':
      return null;
    case 'loading':
      return <StateNotice message="Preparing your savings outlook." state="loading" title="Loading goals" />;
    case 'empty':
      return <StateNotice message="Create a goal when goal editing becomes available." state="empty" title="No goals yet" />;
    case 'error':
      return <StateNotice message={state.message} state="error" title="Unable to load goals" />;
    case 'offline':
      return <StateNotice message={state.items.length > 0 ? 'Showing the last synthetic snapshot.' : state.message} state="offline" title="You are offline" />;
    case 'partial':
      return <StateNotice message="Some goal details are not available yet." state="partial" title="Partial outlook" />;
    case 'stale':
      return <StateNotice message="Goal editing arrives in a later milestone. This synthetic snapshot may be outdated." state="stale" title="Sample outlook" />;
  }
}
