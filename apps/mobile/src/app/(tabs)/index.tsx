import { StyleSheet, Text, View } from 'react-native';

import { formatMoney } from '@moneybuddy/domain';

import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { colors, spacing } from '@/theme';

const monthlyIncome = 524_000;
const plannedExpenses = 361_500;
const plannedSavings = monthlyIncome - plannedExpenses;

export default function DashboardScreen() {
  return (
    <AppScreen
      eyebrow="July outlook"
      title="Good morning"
      description="A planning preview using sample data."
      trailing={
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MB</Text>
        </View>
      }
    >
      <Card>
        <Text style={styles.label}>Available to save this month</Text>
        <Text style={styles.heroValue}>{formatMoney(plannedSavings)}</Text>
        <Text style={styles.positive}>On track for your baseline plan</Text>
      </Card>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.label}>Net income</Text>
          <Text style={styles.metricValue}>{formatMoney(monthlyIncome)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.label}>Planned outflow</Text>
          <Text style={styles.metricValue}>{formatMoney(plannedExpenses)}</Text>
        </View>
      </View>

      <Card title="Emergency fund">
        <View style={styles.row}>
          <Text style={styles.goalAmount}>{formatMoney(625_000)}</Text>
          <Text style={styles.label}>of {formatMoney(1_000_000)}</Text>
        </View>
        <ProgressBar progress={0.625} />
        <Text style={styles.helper}>
          Baseline projection: goal reached in October 2026
        </Text>
      </Card>

      <Card title="Next on your calendar">
        <View style={styles.event}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateMonth}>JUL</Text>
            <Text style={styles.dateDay}>31</Text>
          </View>
          <View style={styles.eventCopy}>
            <Text style={styles.eventTitle}>Paycheck</Text>
            <Text style={styles.helper}>Estimated net pay</Text>
          </View>
          <Text style={styles.positiveValue}>+{formatMoney(262_000)}</Text>
        </View>
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    backgroundColor: colors.primary,
  },
  avatarText: {
    color: colors.surface,
    fontWeight: '800',
  },
  label: {
    color: colors.muted,
    fontSize: 13,
  },
  heroValue: {
    color: colors.ink,
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
  },
  positive: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metric: {
    flex: 1,
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
  },
  metricValue: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  goalAmount: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '800',
  },
  helper: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  event: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dateBadge: {
    width: 48,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
  },
  dateMonth: {
    width: '100%',
    paddingVertical: 2,
    textAlign: 'center',
    color: colors.surface,
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: colors.primary,
  },
  dateDay: {
    paddingVertical: 5,
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  eventCopy: {
    flex: 1,
  },
  eventTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  positiveValue: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
});
