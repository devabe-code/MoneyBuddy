import { StyleSheet, View } from 'react-native';

import { AppText, IconBadge, Screen, SectionHeader, SurfaceCard, TextLink } from '@/src/design-system/components';
import { tokens } from '@/src/design-system/tokens';
import { CashflowEventRow, eventDividerStyle } from '@/src/features/cashflow/cashflow-event-row';
import { GoalProgressCard } from '@/src/features/goals/goal-progress-card';
import { samplePlan } from '@/src/test/fixtures/sample-plan';

export default function TodayScreen() {
  return (
    <Screen eyebrow="SYNTHETIC SAMPLE PLAN" title="Good morning" subtitle="Here is what your plan is doing today.">
      <SurfaceCard tone="accent">
        <View style={styles.cardHeading}>
          <View>
            <AppText tone="muted" variant="label">Available after planned spending</AppText>
            <AppText accessibilityLabel="1,240 dollars available" style={styles.heroAmount}>{samplePlan.availableThisMonth}</AppText>
          </View>
          <IconBadge icon="sparkles" size={48} />
        </View>
        <AppText tone="muted">You are on track to save {samplePlan.monthlySavings} this month.</AppText>
      </SurfaceCard>

      <SectionHeader action="View calendar" href="/calendar" title="Coming up" />
      <SurfaceCard>
        {samplePlan.upcoming.map((event, index) => (
          <View key={event.label} style={index > 0 && eventDividerStyle}>
            <CashflowEventRow event={event} showDate />
          </View>
        ))}
      </SurfaceCard>

      <SectionHeader action="See goals" href="/goals" title="Closest goal" />
      <GoalProgressCard compact goal={samplePlan.primaryGoal} />
      <TextLink hint="Opens an explanation screen" href="/about" label="How MoneyBuddy works" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardHeading: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  heroAmount: { color: tokens.color.ink, fontSize: 34, fontWeight: '800', letterSpacing: -1, marginVertical: 8 },
});
