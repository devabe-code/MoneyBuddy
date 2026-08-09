import { StyleSheet, View } from 'react-native';

import { AppText, SurfaceCard } from '@/src/design-system/components';
import { tokens } from '@/src/design-system/tokens';
import { CASHFLOW_CALENDAR } from './constants';

export type CalendarDay = {
  event?: string;
  label: string;
  muted: boolean;
  number: number;
  positive?: boolean;
  today: boolean;
};

export function CalendarGrid({ days, monthLabel }: { days: CalendarDay[]; monthLabel: string }) {
  return (
    <View accessibilityLabel={`${monthLabel} cashflow calendar`}>
      <View style={styles.weekLabels}>
        {CASHFLOW_CALENDAR.weekdayLabels.map((day, index) => <AppText key={`${day}-${index}`} style={styles.weekLabel} tone="muted" variant="eyebrow">{day}</AppText>)}
      </View>
      <SurfaceCard padded={false}>
        <View style={styles.grid}>
          {days.map((day, index) => (
            <View accessibilityLabel={`${day.label}${day.event ? `, ${day.event}` : ''}`} key={`${day.label}-${index}`} style={[styles.day, day.muted && styles.mutedDay, day.today && styles.today]}>
              <AppText style={[styles.dayText, day.today && styles.todayText]} tone={day.muted ? 'muted' : day.today ? 'onPrimary' : 'default'}>{day.number}</AppText>
              {day.event ? <View accessibilityElementsHidden style={[styles.dot, day.positive ? styles.incomeDot : styles.expenseDot]} /> : null}
            </View>
          ))}
        </View>
      </SurfaceCard>
    </View>
  );
}

const styles = StyleSheet.create({
  weekLabels: { flexDirection: 'row', paddingHorizontal: 13, paddingBottom: 8 },
  weekLabel: { flex: 1, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  day: { alignItems: 'center', aspectRatio: 1, borderRadius: 20, justifyContent: 'center', width: `${100 / 7}%` },
  mutedDay: { opacity: 0.35 },
  today: { backgroundColor: tokens.color.primary },
  dayText: { fontWeight: '600' },
  todayText: { fontWeight: '800' },
  dot: { borderRadius: 4, height: 7, marginTop: 4, width: 7 },
  incomeDot: { backgroundColor: tokens.color.primary },
  expenseDot: { backgroundColor: tokens.color.warning },
});
