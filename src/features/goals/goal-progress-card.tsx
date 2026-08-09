import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Ionicons } from '@expo/vector-icons';

import { AppText, IconBadge, ProgressBar, SurfaceCard } from '@/src/design-system/components';
import { tokens } from '@/src/design-system/tokens';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type GoalProgress = {
  date?: string;
  icon: IconName;
  name: string;
  progress: number;
  remaining: string;
  saved: string;
  target: string;
  tone?: keyof typeof goalToneTints;
};

const goalToneTints = {
  default: tokens.color.primarySoft,
  info: tokens.color.infoSoft,
  warning: tokens.color.warningSoft,
} as const;

export function GoalProgressCard({ compact = false, goal }: { compact?: boolean; goal: GoalProgress }) {
  return (
    <SurfaceCard>
      <View style={styles.heading}>
        <IconBadge color={compact ? tokens.color.warningInk : tokens.color.ink} icon={goal.icon} tint={goalToneTints[goal.tone ?? 'default']} />
        <View style={styles.grow}>
          <AppText variant="title">{goal.name}</AppText>
          <AppText tone="muted" variant="caption">{goal.target}</AppText>
        </View>
        <AppText accessibilityLabel={`${goal.progress} percent complete`} style={styles.percent} tone="primary">{goal.progress}%</AppText>
      </View>
      <ProgressBar label={`${goal.name} savings progress`} value={goal.progress} />
      <View style={styles.amounts}>
        <AppText variant="caption">{goal.saved} saved</AppText>
        <AppText tone="muted" variant="caption">{goal.remaining} remaining</AppText>
      </View>
      {!compact && goal.date ? (
        <View style={styles.outlook}>
          <IconBadge icon="trending-up" size={24} tint="transparent" />
          <AppText style={styles.outlookText} tone="primary" variant="label">At this pace, target date is {goal.date}</AppText>
        </View>
      ) : null}
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  heading: { alignItems: 'center', flexDirection: 'row', gap: 12, marginBottom: 16 },
  grow: { flex: 1, gap: 3 },
  percent: { fontSize: 18, fontWeight: '800' },
  amounts: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 9 },
  outlook: { alignItems: 'center', backgroundColor: tokens.color.primarySoft, borderRadius: 10, flexDirection: 'row', gap: 8, marginTop: 16, padding: 11 },
  outlookText: { color: tokens.color.primaryDark, flex: 1 },
});
