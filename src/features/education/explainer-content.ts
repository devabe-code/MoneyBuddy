import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type ExplainerContent = {
  copy: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
};

export const MONEYBUDDY_EXPLAINER_STEPS: readonly ExplainerContent[] = Object.freeze([
  { icon: 'calendar-outline', title: 'Map your cashflow', copy: 'Expected pay, bills, and transfers become a dated plan.' },
  { icon: 'options-outline', title: 'Compare strategies', copy: 'See how different saving choices change your target date.' },
  { icon: 'trail-sign-outline', title: 'Follow the journey', copy: 'Capture milestones and understand why progress changed.' },
]);
