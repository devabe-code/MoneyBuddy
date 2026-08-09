import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from './primitives';
import { tokens } from './tokens';

export function clampPercentage(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

const statePresentation = {
  empty: { icon: 'book-outline' as const, background: tokens.color.infoSoft, color: tokens.color.info },
  error: { icon: 'alert-circle-outline' as const, background: tokens.color.dangerSoft, color: tokens.color.danger },
  loading: { icon: 'hourglass-outline' as const, background: tokens.color.infoSoft, color: tokens.color.info },
  offline: { icon: 'cloud-offline-outline' as const, background: tokens.color.warningSoft, color: tokens.color.warningInk },
  partial: { icon: 'information-circle-outline' as const, background: tokens.color.infoSoft, color: tokens.color.info },
  stale: { icon: 'time-outline' as const, background: tokens.color.warningSoft, color: tokens.color.warningInk },
};

export type AppState = keyof typeof statePresentation;
export const appStates = Object.freeze(Object.keys(statePresentation) as AppState[]);

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

export function StateNotice({ message, state, title }: { message: string; state: AppState; title: string }) {
  const presentation = statePresentation[state];
  return (
    <View
      accessible
      accessibilityLiveRegion={state === 'error' ? 'assertive' : 'polite'}
      accessibilityRole={state === 'error' ? 'alert' : 'summary'}
      style={[styles.notice, { backgroundColor: presentation.background }]}>
      <Ionicons accessibilityElementsHidden color={presentation.color} name={presentation.icon} size={21} />
      <View style={styles.noticeCopy}>
        <AppText style={{ color: presentation.color }} variant="title">{title}</AppText>
        <AppText tone="muted" variant="caption">{message}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressTrack: { backgroundColor: tokens.color.border, borderRadius: 5, height: 9, overflow: 'hidden' },
  progressFill: { backgroundColor: tokens.color.primary, borderRadius: 5, height: '100%' },
  notice: { alignItems: 'flex-start', borderRadius: tokens.radius.md, flexDirection: 'row', gap: 11, padding: 14 },
  noticeCopy: { flex: 1, gap: 3 },
});
