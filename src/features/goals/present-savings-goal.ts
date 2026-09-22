import type { SavingsGoalOverviewItem } from './load-savings-goal-overview';
import type { GoalProgress } from './goal-progress-card';

const presentationByGoalKind = {
  custom: { icon: 'flag-outline', tone: 'default' },
  'emergency-fund': { icon: 'shield-checkmark-outline', tone: 'warning' },
  vehicle: { icon: 'car-sport-outline', tone: 'info' },
} as const;

export function formatUsdMinor(minor: bigint) {
  const absolute = minor < 0n ? -minor : minor;
  const dollars = absolute / 100n;
  const cents = absolute % 100n;
  const sign = minor < 0n ? '−' : '';
  const fraction = cents === 0n ? '' : `.${cents.toString().padStart(2, '0')}`;
  return `${sign}$${dollars.toLocaleString('en-US')}${fraction}`;
}

export function formatFreshnessLabel(instant: string) {
  const date = new Date(instant);
  if (Number.isNaN(date.getTime())) return 'Last updated time unavailable';
  const formatted = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    timeZone: 'UTC',
    timeZoneName: 'short',
    year: 'numeric',
  }).format(date);
  return `Last updated ${formatted}`;
}

export function presentSavingsGoal({ goal, progress }: SavingsGoalOverviewItem): GoalProgress {
  const presentation = presentationByGoalKind[goal.kind];
  return {
    date: goal.targetDate ? formatTargetMonth(goal.targetDate) : undefined,
    icon: presentation.icon,
    name: goal.name,
    progress: progress.progressPercent,
    remaining: formatUsdMinor(progress.remainingMinor),
    saved: formatUsdMinor(goal.savedMinor),
    target: `${formatUsdMinor(goal.targetMinor)} target`,
    tone: presentation.tone,
  };
}

function formatTargetMonth(localDate: string) {
  const [year, month] = localDate.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}
