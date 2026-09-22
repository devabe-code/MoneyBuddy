import type { CommonStateExample } from '@/src/features/common-states/common-state-preview-screen';

export type CommonAppStateFixture = CommonStateExample &
  Readonly<{
    fixtureKind: 'synthetic';
    id: `synthetic-${string}`;
  }>;

export const SYNTHETIC_COMMON_APP_STATES: readonly CommonAppStateFixture[] = Object.freeze([
  {
    fixtureKind: 'synthetic',
    id: 'synthetic-loading',
    kind: 'loading',
    message: 'Preparing the example outlook without displaying placeholder financial values.',
    title: 'Loading outlook',
  },
  {
    actionLabel: 'Create a goal',
    fixtureKind: 'synthetic',
    id: 'synthetic-empty',
    kind: 'empty',
    message: 'There are no example goals in this view yet.',
    title: 'No goals yet',
  },
  {
    actionLabel: 'Try again',
    fixtureKind: 'synthetic',
    id: 'synthetic-error',
    kind: 'error',
    message: 'The example request did not complete. Your entries remain unchanged.',
    title: 'Unable to load outlook',
  },
  {
    actionLabel: 'Check connection',
    fixtureKind: 'synthetic',
    id: 'synthetic-offline',
    kind: 'offline',
    message: 'Showing a cached example while the network is unavailable.',
    metadata: 'Last updated Sep 18, 2026 at 12:00 PM UTC',
    title: 'You are offline',
  },
  {
    actionLabel: 'Refresh',
    fixtureKind: 'synthetic',
    id: 'synthetic-stale',
    kind: 'stale',
    message: 'This example is available, but a newer result may exist.',
    metadata: 'Last updated Sep 18, 2026 at 12:00 PM UTC',
    title: 'Outlook may be outdated',
  },
  {
    actionLabel: 'Refresh details',
    fixtureKind: 'synthetic',
    id: 'synthetic-partial',
    kind: 'partial',
    message: 'Usable example results are shown while some details are unavailable.',
    title: 'Some details are missing',
  },
] as const);
