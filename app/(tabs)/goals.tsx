import { DisabledAction, Screen, StateNotice } from '@/src/design-system/components';
import { GoalProgressCard } from '@/src/features/goals/goal-progress-card';
import { samplePlan } from '@/src/test/fixtures/sample-plan';

export default function GoalsScreen() {
  return (
    <Screen eyebrow="SAVINGS PLAN" title="Goals" subtitle="Turn a target into a plan you can see.">
      <StateNotice message="Goal editing arrives in a later milestone. Explore this synthetic preview for now." state="stale" title="Sample outlook" />
      {samplePlan.goals.map((goal) => <GoalProgressCard goal={goal} key={goal.name} />)}
      <DisabledAction label="Add a goal · coming soon" />
    </Screen>
  );
}
