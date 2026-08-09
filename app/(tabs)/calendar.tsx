import { StyleSheet, View } from 'react-native';

import { AppText, Screen, SectionHeader, StateNotice, SurfaceCard } from '@/src/design-system/components';
import { tokens } from '@/src/design-system/tokens';
import { CalendarGrid } from '@/src/features/cashflow/calendar-grid';
import { CashflowEventRow, eventDividerStyle } from '@/src/features/cashflow/cashflow-event-row';
import { samplePlan } from '@/src/test/fixtures/sample-plan';

export default function CalendarScreen() {
  return (
    <Screen eyebrow="CASHFLOW" title="Calendar" subtitle="See when money is expected to arrive and leave.">
      <StateNotice message="Tax estimates and recurring bills are not configured yet. This preview uses a synthetic plan." state="partial" title="Preview data" />
      <SectionHeader title={samplePlan.calendarMonthLabel} />
      <CalendarGrid days={samplePlan.calendarDays} monthLabel={samplePlan.calendarMonthLabel} />
      <SectionHeader title={samplePlan.selectedCalendarDay.label} />
      <SurfaceCard>
        <View style={styles.balanceRow}>
          <View>
            <AppText tone="muted" variant="caption">Projected balance</AppText>
            <AppText style={styles.balance}>{samplePlan.selectedCalendarDay.projectedBalance}</AppText>
          </View>
          <View style={styles.legend}>
            <Legend color={tokens.color.primary} label="Income" />
            <Legend color={tokens.color.warning} label="Planned" />
          </View>
        </View>
        {samplePlan.selectedCalendarDay.events.map((event) => (
          <View key={event.label} style={eventDividerStyle}>
            <CashflowEventRow event={event} />
          </View>
        ))}
      </SurfaceCard>
    </Screen>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View accessibilityElementsHidden style={[styles.dot, { backgroundColor: color }]} />
      <AppText tone="muted" variant="caption">{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  balance: { fontSize: 26, fontWeight: '800', marginTop: 4 },
  legend: { gap: 6 },
  legendItem: { alignItems: 'center', flexDirection: 'row', gap: 6 },
  dot: { borderRadius: 4, height: 7, width: 7 },
});
