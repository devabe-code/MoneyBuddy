import { useCallback, useEffect, useRef, useState } from 'react';

import { CommonState, DisabledAction, Screen } from '@/src/design-system/components';
import { GoalProgressCard } from './goal-progress-card';
import type {
  LoadSavingsGoalOverview,
  SavingsGoalOverviewState,
} from './load-savings-goal-overview';
import { formatFreshnessLabel, presentSavingsGoal } from './present-savings-goal';

const initialState: SavingsGoalOverviewState = Object.freeze({ kind: 'loading' });
const SAFE_LOAD_ERROR = 'Goals are unavailable right now.';

export function SavingsGoalsScreen({ loadOverview }: { loadOverview: LoadSavingsGoalOverview }) {
  const [state, setState] = useState<SavingsGoalOverviewState>(initialState);
  const requestSequence = useRef(0);

  const reload = useCallback(async () => {
    const request = ++requestSequence.current;
    setState(initialState);
    try {
      const nextState = await loadOverview();
      if (request === requestSequence.current) setState(nextState);
    } catch {
      if (request === requestSequence.current)
        setState({ kind: 'error', message: SAFE_LOAD_ERROR });
    }
  }, [loadOverview]);

  useEffect(() => {
    void reload();
    return () => {
      requestSequence.current += 1;
    };
  }, [reload]);

  const items = 'items' in state ? state.items : [];

  return (
    <Screen eyebrow="SAVINGS PLAN" title="Goals" subtitle="Turn a target into a plan you can see.">
      <GoalsCommonState reload={reload} state={state} />
      {items.map((item) => (
        <GoalProgressCard goal={presentSavingsGoal(item)} key={item.goal.id} />
      ))}
      {items.length > 0 ? <DisabledAction label="Add a goal · coming soon" /> : null}
    </Screen>
  );
}

function GoalsCommonState({
  reload,
  state,
}: {
  reload: () => Promise<void>;
  state: SavingsGoalOverviewState;
}) {
  const retryAction = {
    accessibilityHint: 'Requests the synthetic savings-goal outlook again.',
    label: 'Try again',
    onPress: () => {
      void reload();
    },
  } as const;
  const refreshAction = { ...retryAction, label: 'Refresh' } as const;

  switch (state.kind) {
    case 'ready':
      return null;
    case 'loading':
      return (
        <CommonState
          kind="loading"
          message="Preparing your savings outlook."
          title="Loading goals"
        />
      );
    case 'empty':
      return (
        <CommonState
          action={refreshAction}
          kind="empty"
          message="Create a goal when goal editing becomes available."
          title="No goals yet"
        />
      );
    case 'error':
      return (
        <CommonState
          action={retryAction}
          kind="error"
          message={state.message}
          title="Unable to load goals"
        />
      );
    case 'offline':
      return (
        <CommonState
          action={retryAction}
          kind="offline"
          message={state.items.length > 0 ? 'Showing the last synthetic snapshot.' : state.message}
          metadata={state.updatedAt ? formatFreshnessLabel(state.updatedAt) : undefined}
          title="You are offline"
        />
      );
    case 'partial':
      return (
        <CommonState
          action={refreshAction}
          kind="partial"
          message="Some goal details are not available yet. Usable results remain visible."
          metadata={formatFreshnessLabel(state.updatedAt)}
          title="Partial outlook"
        />
      );
    case 'stale':
      return (
        <CommonState
          action={refreshAction}
          kind="stale"
          message="This synthetic snapshot may be outdated."
          metadata={formatFreshnessLabel(state.updatedAt)}
          title="Sample outlook"
        />
      );
  }
}
