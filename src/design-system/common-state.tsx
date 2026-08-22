import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './primitives';
import { tokens } from './tokens';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type CommonStateKind = 'empty' | 'error' | 'loading' | 'offline' | 'partial' | 'stale';
export const commonStateKinds = Object.freeze([
  'loading',
  'empty',
  'error',
  'offline',
  'stale',
  'partial',
] as const satisfies readonly CommonStateKind[]);

export type CommonStateAction = Readonly<{
  accessibilityHint?: string;
  disabled?: boolean;
  label: string;
  onPress: () => void;
}>;

export type CommonStateProps = Readonly<{
  action?: CommonStateAction;
  kind: CommonStateKind;
  message: string;
  metadata?: string;
  presentation?: 'inline' | 'panel';
  title: string;
}>;

const statePresentation: Record<CommonStateKind, Readonly<{
  background: string;
  color: string;
  icon: IconName;
}>> = {
  empty: { icon: 'book-outline', background: tokens.color.infoSoft, color: tokens.color.info },
  error: { icon: 'alert-circle-outline', background: tokens.color.dangerSoft, color: tokens.color.danger },
  loading: { icon: 'hourglass-outline', background: tokens.color.infoSoft, color: tokens.color.info },
  offline: { icon: 'cloud-offline-outline', background: tokens.color.warningSoft, color: tokens.color.warningInk },
  partial: { icon: 'information-circle-outline', background: tokens.color.infoSoft, color: tokens.color.info },
  stale: { icon: 'time-outline', background: tokens.color.warningSoft, color: tokens.color.warningInk },
};

export function CommonState({
  action,
  kind,
  message,
  metadata,
  presentation = 'panel',
  title,
}: CommonStateProps) {
  const state = statePresentation[kind];
  const accessibilityLabel = [title, message, metadata].filter(Boolean).join('. ');

  return (
    <View
      style={[
        styles.container,
        presentation === 'panel' ? styles.panel : styles.inline,
        { backgroundColor: state.background },
      ]}>
      <View
        accessible
        accessibilityLabel={accessibilityLabel}
        accessibilityLiveRegion={kind === 'error' ? 'assertive' : 'polite'}
        accessibilityRole={kind === 'error' ? 'alert' : kind === 'loading' ? 'progressbar' : 'summary'}
        accessibilityState={kind === 'loading' ? { busy: true } : undefined}
        style={styles.content}>
        <Ionicons
          accessibilityElementsHidden
          color={state.color}
          importantForAccessibility="no-hide-descendants"
          name={state.icon}
          size={21}
        />
        <View style={styles.copy}>
          <AppText style={{ color: state.color }} variant="title">{title}</AppText>
          <AppText tone="muted" variant="caption">{message}</AppText>
          {metadata ? <AppText style={{ color: state.color }} variant="caption">{metadata}</AppText> : null}
          {kind === 'loading' ? <LoadingPlaceholders /> : null}
        </View>
      </View>
      {action ? (
        <Pressable
          accessibilityHint={action.accessibilityHint}
          accessibilityRole="button"
          accessibilityState={{ disabled: action.disabled }}
          disabled={action.disabled}
          onPress={action.onPress}
          style={({ pressed }) => [
            styles.action,
            { borderColor: state.color },
            pressed && !action.disabled && styles.pressed,
            action.disabled && styles.disabled,
          ]}>
          <AppText style={{ color: state.color }} variant="label">{action.label}</AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

function LoadingPlaceholders() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.placeholders}>
      <View style={[styles.placeholder, styles.placeholderWide]} />
      <View style={[styles.placeholder, styles.placeholderMedium]} />
      <View style={[styles.placeholder, styles.placeholderShort]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: tokens.radius.md, gap: tokens.space.sm },
  panel: { borderColor: tokens.color.border, borderWidth: 1, padding: 14 },
  inline: { paddingHorizontal: 14, paddingVertical: 12 },
  content: { alignItems: 'flex-start', flexDirection: 'row', gap: 11 },
  copy: { flex: 1, gap: 3 },
  action: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: tokens.radius.sm,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 14,
  },
  pressed: { opacity: 0.65 },
  disabled: { opacity: 0.45 },
  placeholders: { gap: 6, marginTop: tokens.space.sm },
  placeholder: { backgroundColor: tokens.color.borderStrong, borderRadius: 4, height: 8 },
  placeholderWide: { width: '100%' },
  placeholderMedium: { width: '76%' },
  placeholderShort: { width: '52%' },
});
