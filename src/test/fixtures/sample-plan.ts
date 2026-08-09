import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

import { CASHFLOW_CALENDAR } from '@/src/features/cashflow/constants';

type IconName = ComponentProps<typeof Ionicons>['name'];

const calendarDays = Array.from({ length: CASHFLOW_CALENDAR.cellCount }, (_, index) => {
  const number = index < 2 ? 30 + index : index < 32 ? index - 1 : index - 31;
  const muted = index < 2 || index > 31;
  const eventByDay: Record<number, { event: string; positive?: boolean }> = {
    4: { event: 'Rent payment' },
    6: { event: 'Paycheck', positive: true },
    12: { event: 'Utility payment' },
    18: { event: 'Paycheck and savings transfer', positive: true },
    24: { event: 'Insurance payment' },
  };
  const event = !muted ? eventByDay[number] : undefined;
  const month = index < 2 ? 'August' : index < 32 ? 'September' : 'October';
  return {
    label: `${month} ${number}, 2026`,
    number,
    muted,
    today: !muted && number === 18,
    event: event?.event,
    positive: event?.positive,
  };
});

export const samplePlan = {
  fixtureKind: 'synthetic' as const,
  calendarMonthLabel: CASHFLOW_CALENDAR.monthLabel,
  availableThisMonth: '$1,240',
  monthlySavings: '$850',
  upcoming: [
    { month: 'SEP', day: '18', label: 'Synthetic paycheck', kind: 'Estimated net pay', amount: '+$2,240', positive: true },
    { month: 'SEP', day: '19', label: 'Savings transfer', kind: 'Emergency fund', amount: '−$425', positive: false },
    { month: 'SEP', day: '21', label: 'Sample utility bill', kind: 'Planned expense', amount: '−$118', positive: false },
  ],
  selectedCalendarDay: {
    label: 'Selected day · Sep 18',
    projectedBalance: '$3,460',
    events: [
      { amount: '+$2,240', label: 'Synthetic paycheck', positive: true },
      { amount: '−$425', label: 'Savings transfer', positive: false },
    ],
  },
  primaryGoal: { name: 'Emergency fund', target: '$12,000 target', progress: 62, saved: '$7,440', remaining: '$4,560', icon: 'shield-checkmark-outline' as IconName, tone: 'warning' as const },
  goals: [
    { name: 'Emergency fund', target: '$12,000 target', progress: 62, saved: '$7,440', remaining: '$4,560', date: 'March 2027', icon: 'shield-checkmark-outline' as IconName, tone: 'warning' as const },
    { name: 'Next car', target: '$18,000 target', progress: 24, saved: '$4,320', remaining: '$13,680', date: 'January 2028', icon: 'car-sport-outline' as IconName, tone: 'info' as const },
  ],
  journey: [
    { date: 'June 2026', name: 'Starter cushion', description: 'A first buffer for the unexpected.', status: 'Milestone reached', complete: true, icon: 'checkmark' as IconName },
    { date: 'March 2027', name: 'Emergency fund', description: 'Three months of synthetic planned expenses.', status: '62% complete', complete: false, icon: 'shield-outline' as IconName },
    { date: 'January 2028', name: 'Next car', description: 'A cash goal that follows the emergency fund.', status: 'Up next', complete: false, icon: 'car-sport-outline' as IconName },
  ],
  calendarDays,
};
