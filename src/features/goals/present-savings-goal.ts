import type { SavingsGoalOverviewItem } from './load-savings-goal-overview';
import type { GoalProgress } from './goal-progress-card';

export function formatUsdMinor(minor: bigint) {
  const absolute = minor < 0n ? -minor : minor;
  const dollars = absolute / 100n;
  const cents = absolute % 100n;
  const sign = minor < 0n ? '−' : '';
  const fraction = cents === 0n ? '' : `.${cents.toString().padStart(2, '0')}`;
  return `${sign}$${dollars.toLocaleString('en-US')}${fraction}`;
}

export function presentSavingsGoal({ goal, progress }: SavingsGoalOverviewItem): GoalProgress {
  return {
    date: goal.targetDate ? formatTargetMonth(goal.targetDate) : undefined,
    icon: 'flag-outline',
    name: goal.name,
    progress: progress.progressPercent,
    remaining: formatUsdMinor(progress.remainingMinor),
    saved: formatUsdMinor(goal.savedMinor),
    target: `${formatUsdMinor(goal.targetMinor)} target`,
    tone: goal.tone,
  };
}

function formatTargetMonth(localDate: string) {
  const [year, month] = localDate.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC', year: 'numeric' }).format(new Date(Date.UTC(year, month - 1, 1)));
}
