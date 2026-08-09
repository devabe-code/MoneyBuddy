import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/design-system/components';
import { tokens } from '@/src/design-system/tokens';

export type CashflowEvent = {
  amount: string;
  day?: string;
  kind?: string;
  label: string;
  month?: string;
  positive: boolean;
};

export function CashflowEventRow({ event, showDate = false }: { event: CashflowEvent; showDate?: boolean }) {
  return (
    <View accessibilityLabel={`${event.label}, ${event.amount}`} style={styles.row}>
      {showDate && event.month && event.day ? (
        <View style={styles.dateTile}>
          <AppText style={styles.month} tone="primary" variant="eyebrow">{event.month}</AppText>
          <AppText style={styles.day} variant="sectionTitle">{event.day}</AppText>
        </View>
      ) : null}
      <View style={styles.grow}>
        <AppText variant="title">{event.label}</AppText>
        {event.kind ? <AppText tone="muted" variant="caption">{event.kind}</AppText> : null}
      </View>
      <AppText style={styles.amount} tone={event.positive ? 'primary' : 'default'} variant="label">{event.amount}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', flexDirection: 'row', gap: 12, minHeight: 56 },
  divider: { borderTopColor: tokens.color.border, borderTopWidth: StyleSheet.hairlineWidth, marginTop: 8, paddingTop: 8 },
  dateTile: { alignItems: 'center', backgroundColor: tokens.color.canvas, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6, width: 48 },
  month: { fontSize: 10, letterSpacing: 0.5 },
  day: { fontSize: 18 },
  grow: { flex: 1, gap: 3 },
  amount: { fontSize: 14, fontWeight: '800' },
});

export const eventDividerStyle = styles.divider;
