import { StyleSheet, Text, View } from 'react-native';

import { formatMoney } from '@moneybuddy/domain';

import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { colors, spacing } from '@/theme';

const strategies = [
  { name: 'Comfortable', amount: 40_000, date: 'Dec 2027' },
  { name: 'Baseline', amount: 65_000, date: 'Oct 2027' },
  { name: 'Focused', amount: 90_000, date: 'Jul 2027' },
];

export default function GoalsScreen() {
  return (
    <AppScreen
      eyebrow="Plan"
      title="Savings goals"
      description="Compare the pace that fits your life."
    >
      <Card title="Home down payment">
        <View style={styles.goalHeader}>
          <Text style={styles.goalValue}>{formatMoney(1_850_000)}</Text>
          <Text style={styles.label}>of {formatMoney(4_000_000)}</Text>
        </View>
        <ProgressBar progress={0.4625} />
      </Card>

      <Text style={styles.sectionTitle}>Strategy preview</Text>
      <Card>
        {strategies.map((strategy, index) => (
          <View
            key={strategy.name}
            style={[styles.strategy, index > 0 && styles.divider]}
          >
            <View style={styles.strategyCopy}>
              <Text style={styles.strategyName}>{strategy.name}</Text>
              <Text style={styles.label}>per paycheck</Text>
            </View>
            <View style={styles.strategyResult}>
              <Text style={styles.strategyAmount}>
                {formatMoney(strategy.amount)}
              </Text>
              <Text style={styles.date}>{strategy.date}</Text>
            </View>
          </View>
        ))}
      </Card>

      <Card title="Why compare?">
        <Text style={styles.body}>
          Each strategy will preserve the same income and expense assumptions,
          changing only the amount assigned to this goal.
        </Text>
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  goalValue: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: '800',
  },
  label: {
    color: colors.muted,
    fontSize: 13,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  strategy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  divider: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  strategyCopy: {
    gap: 2,
  },
  strategyName: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  strategyResult: {
    alignItems: 'flex-end',
    gap: 2,
  },
  strategyAmount: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  date: {
    color: colors.muted,
    fontSize: 12,
  },
  body: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
});
