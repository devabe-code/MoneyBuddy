import { StyleSheet, View } from 'react-native';

import { tokens } from './tokens';

export function clampPercentage(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

export function ProgressBar({ label, value }: { label: string; value: number }) {
  const boundedValue = clampPercentage(value);
  return (
    <View
      accessible
      accessibilityLabel={label}
      accessibilityRole="progressbar"
      accessibilityValue={{ max: 100, min: 0, now: boundedValue }}
      style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${boundedValue}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressTrack: { backgroundColor: tokens.color.border, borderRadius: 5, height: 9, overflow: 'hidden' },
  progressFill: { backgroundColor: tokens.color.primary, borderRadius: 5, height: '100%' },
});
