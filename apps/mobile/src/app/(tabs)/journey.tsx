import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { colors, spacing } from '@/theme';

const milestones = [
  {
    title: 'Starter emergency fund',
    detail: 'Completed May 2026',
    state: 'complete',
  },
  {
    title: 'Full emergency fund',
    detail: 'Projected October 2026',
    state: 'active',
  },
  {
    title: 'Home down payment',
    detail: 'Up next',
    state: 'future',
  },
];

export default function JourneyScreen() {
  return (
    <AppScreen
      eyebrow="Milestones"
      title="Your journey"
      description="A record of where you have been and what comes next."
    >
      <Card>
        {milestones.map((milestone, index) => (
          <View key={milestone.title} style={styles.milestone}>
            <View style={styles.rail}>
              <View
                style={[
                  styles.dot,
                  milestone.state === 'complete' && styles.completeDot,
                  milestone.state === 'active' && styles.activeDot,
                ]}
              >
                <Text style={styles.dotText}>
                  {milestone.state === 'complete' ? '✓' : index + 1}
                </Text>
              </View>
              {index < milestones.length - 1 ? (
                <View style={styles.line} />
              ) : null}
            </View>
            <View style={styles.copy}>
              <Text style={styles.title}>{milestone.title}</Text>
              <Text style={styles.detail}>{milestone.detail}</Text>
              {milestone.state === 'active' ? (
                <View style={styles.activePill}>
                  <Text style={styles.activeText}>In progress</Text>
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </Card>

      <Card title="Journal preview">
        <Text style={styles.journalDate}>JULY 18, 2026</Text>
        <Text style={styles.journalTitle}>Baseline plan updated</Text>
        <Text style={styles.detail}>
          Raising the paycheck allocation moved the emergency fund goal two
          weeks earlier.
        </Text>
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  milestone: {
    minHeight: 88,
    flexDirection: 'row',
    gap: spacing.md,
  },
  rail: {
    width: 32,
    alignItems: 'center',
  },
  dot: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 15,
    backgroundColor: colors.surface,
  },
  completeDot: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  activeDot: {
    borderColor: colors.accent,
    backgroundColor: '#FFF6E5',
  },
  dotText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '800',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
  },
  copy: {
    flex: 1,
    gap: 3,
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
  },
  title: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  detail: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  activePill: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 99,
    backgroundColor: '#FFF0CF',
  },
  activeText: {
    color: '#76510D',
    fontSize: 11,
    fontWeight: '800',
  },
  journalDate: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  journalTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
});
