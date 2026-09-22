import { useState } from 'react';

import { AppText, CommonState, Screen } from '@/src/design-system/components';
import type { CommonStateKind } from '@/src/design-system/common-state';

export type CommonStateExample = Readonly<{
  actionLabel?: string;
  id: string;
  kind: CommonStateKind;
  message: string;
  metadata?: string;
  title: string;
}>;

export function CommonStatePreviewScreen({
  examples,
}: {
  examples: readonly CommonStateExample[];
}) {
  const [announcement, setAnnouncement] = useState('');

  return (
    <Screen
      eyebrow="DESIGN SYSTEM"
      subtitle="Accessible synthetic examples for every shared app-state pattern."
      title="App state preview"
    >
      {examples.map((fixture) => (
        <CommonState
          action={
            fixture.actionLabel
              ? {
                  accessibilityHint: `Demonstrates the ${fixture.kind} recovery action.`,
                  label: fixture.actionLabel,
                  onPress: () =>
                    setAnnouncement(`Synthetic action selected: ${fixture.actionLabel}.`),
                }
              : undefined
          }
          key={fixture.id}
          kind={fixture.kind}
          message={fixture.message}
          metadata={fixture.metadata}
          title={fixture.title}
        />
      ))}
      {announcement ? (
        <AppText
          accessibilityLiveRegion="polite"
          accessibilityRole="summary"
          tone="muted"
          variant="caption"
        >
          {announcement}
        </AppText>
      ) : null}
    </Screen>
  );
}
