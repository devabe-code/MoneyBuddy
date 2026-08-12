import { loadSyntheticSavingsGoalOverview } from '@/src/bootstrap/savings-goals';
import { SavingsGoalsScreen } from '@/src/features/goals/savings-goals-screen';

export default function GoalsRoute() {
  return <SavingsGoalsScreen loadOverview={loadSyntheticSavingsGoalOverview} />;
}
