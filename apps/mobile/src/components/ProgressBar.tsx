import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

export function ProgressBar({ progress }: { progress: number }) {
  const width = `${Math.min(100, Math.max(0, progress * 100))}%` as const;

  return (
    <View
      accessibilityLabel={`${Math.round(progress * 100)} percent complete`}
      accessibilityRole="progressbar"
      style={styles.track}
    >
      <View style={[styles.fill, { width }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    overflow: 'hidden',
    borderRadius: 99,
    backgroundColor: colors.primarySoft,
  },
  fill: {
    height: '100%',
    borderRadius: 99,
    backgroundColor: colors.primary,
  },
});
