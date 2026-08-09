import { Ionicons } from '@expo/vector-icons';
import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from './primitives';
import { tokens } from './tokens';

export function PrimaryLink({ href, label }: { href: Href; label: string }) {
  return (
    <Link asChild href={href}>
      <Pressable accessibilityRole="button" style={({ pressed }) => [styles.primary, pressed && styles.pressed]}>
        <AppText tone="onPrimary" variant="title">{label}</AppText>
      </Pressable>
    </Link>
  );
}

export function TextLink({ hint, href, label }: { hint?: string; href: Href; label: string }) {
  return (
    <Link asChild href={href}>
      <Pressable accessibilityHint={hint} accessibilityRole="link" style={({ pressed }) => [styles.textLink, pressed && styles.pressed]}>
        <AppText tone="primary" variant="label">{label}</AppText>
        <Ionicons accessibilityElementsHidden color={tokens.color.primary} name="arrow-forward" size={18} />
      </Pressable>
    </Link>
  );
}

export function DisabledAction({ label }: { label: string }) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ disabled: true }} disabled style={styles.disabled}>
      <Ionicons accessibilityElementsHidden color={tokens.color.muted} name="add" size={20} />
      <AppText tone="muted" variant="label">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: { alignItems: 'center', backgroundColor: tokens.color.primary, borderRadius: 14, justifyContent: 'center', minHeight: 52 },
  textLink: { alignItems: 'center', flexDirection: 'row', gap: 8, justifyContent: 'center', minHeight: 48 },
  disabled: { alignItems: 'center', borderColor: tokens.color.borderStrong, borderRadius: 14, borderStyle: 'dashed', borderWidth: 1, flexDirection: 'row', gap: 8, justifyContent: 'center', minHeight: 52 },
  pressed: { opacity: 0.7 },
});
