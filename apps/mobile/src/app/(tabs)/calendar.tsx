import { StyleSheet, Text, View } from 'react-native';

import { formatMoney } from '@moneybuddy/domain';

import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { colors, spacing } from '@/theme';

const events = [
  { date: '31', label: 'Paycheck', amount: 262_000, kind: 'income' },
  { date: '01', label: 'Rent', amount: -145_000, kind: 'expense' },
  { date: '03', label: 'Emergency fund', amount: -45_000, kind: 'saving' },
];

export default function CalendarScreen() {
  return (
    <AppScreen
      eyebrow="Cashflow"
      title="Calendar"
      description="See when money arrives, leaves, and moves toward your goals."
    >
      <Card title="July → August">
        <View style={styles.balanceRow}>
          <View>
            <Text style={styles.label}>Projected balance</Text>
            <Text style={styles.balance}>{formatMoney(438_500)}</Text>
          </View>
          <Text style={styles.delta}>+{formatMoney(71_000)}</Text>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Upcoming</Text>
      <Card>
        {events.map((event, index) => (
          <View
            key={`${event.date}-${event.label}`}
            style={[styles.event, index > 0 && styles.divider]}
          >
            <View style={styles.date}>
              <Text style={styles.dateText}>{event.date}</Text>
            </View>
            <View style={styles.eventCopy}>
              <Text style={styles.eventTitle}>{event.label}</Text>
              <Text style={styles.label}>
                {event.kind === 'income'
                  ? 'Estimated after taxes'
                  : event.kind === 'saving'
                    ? 'Planned transfer'
                    : 'Recurring expense'}
              </Text>
            </View>
            <Text
              style={[
                styles.amount,
                event.amount > 0 ? styles.income : styles.outflow,
              ]}
            >
              {event.amount > 0 ? '+' : '−'}
              {formatMoney(Math.abs(event.amount))}
            </Text>
          </View>
        ))}
      </Card>

      <Card title="Tax estimate">
        <Text style={styles.body}>
          Gross pay, filing assumptions, and location-based rules will be shown
          together so the estimated net amount can be understood and revised.
        </Text>
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.muted,
    fontSize: 13,
  },
  balance: {
    marginTop: spacing.xs,
    color: colors.ink,
    fontSize: 30,
    fontWeight: '800',
  },
  delta: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  event: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  divider: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  date: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
  },
  dateText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  eventCopy: {
    flex: 1,
    gap: 2,
  },
  eventTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  amount: {
    fontSize: 14,
    fontWeight: '800',
  },
  income: {
    color: colors.primary,
  },
  outflow: {
    color: colors.ink,
  },
  body: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
});
