import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type CoreRoute = {
  activeIcon: IconName;
  file: 'index' | 'calendar' | 'goals' | 'journey';
  href: '/' | '/calendar' | '/goals' | '/journey';
  icon: IconName;
  key: 'today' | 'calendar' | 'goals' | 'journey';
  title: 'Today' | 'Calendar' | 'Goals' | 'Journey';
};

export const MONEYBUDDY_SCHEME = 'moneybuddy' as const;

export const coreRoutes: readonly CoreRoute[] = [
  { key: 'today', title: 'Today', file: 'index', href: '/', icon: 'today-outline', activeIcon: 'today' },
  { key: 'calendar', title: 'Calendar', file: 'calendar', href: '/calendar', icon: 'calendar-outline', activeIcon: 'calendar' },
  { key: 'goals', title: 'Goals', file: 'goals', href: '/goals', icon: 'flag-outline', activeIcon: 'flag' },
  { key: 'journey', title: 'Journey', file: 'journey', href: '/journey', icon: 'trail-sign-outline', activeIcon: 'trail-sign' },
];

export function resolveCoreRoute(input: string): CoreRoute | undefined {
  let path = input.trim();

  try {
    const url = new URL(path);
    path = url.protocol === `${MONEYBUDDY_SCHEME}:` ? `/${url.hostname}${url.pathname}` : url.pathname;
  } catch {
    path = path.split(/[?#]/, 1)[0];
  }

  const normalizedPath = `/${path}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  return coreRoutes.find((route) => route.href === normalizedPath);
}
