import { Link, type Href } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from './primitives';
import { tokens } from './tokens';

export function Screen({ children, eyebrow, subtitle, title }: PropsWithChildren<{ eyebrow?: string; subtitle?: string; title: string }>) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContent} contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {eyebrow ? <AppText tone="primary" variant="eyebrow">{eyebrow}</AppText> : null}
          <AppText accessibilityRole="header" variant="screenTitle">{title}</AppText>
          {subtitle ? <AppText style={styles.subtitle} tone="muted">{subtitle}</AppText> : null}
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function SectionHeader({ action, href, title }: { action?: string; href?: Href; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <AppText accessibilityRole="header" variant="sectionTitle">{title}</AppText>
      {action && href ? (
        <Link asChild href={href}>
          <Pressable accessibilityRole="link" hitSlop={6} style={({ pressed }) => [styles.sectionActionTouch, pressed && styles.pressed]}>
            <AppText tone="primary" variant="label">{action}</AppText>
          </Pressable>
        </Link>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: tokens.color.canvas, flex: 1 },
  screenContent: { gap: 16, paddingBottom: 40, paddingHorizontal: 20 },
  header: { gap: 7, paddingBottom: 8, paddingTop: 18 },
  subtitle: { fontSize: 15, lineHeight: 22 },
  sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  sectionActionTouch: { justifyContent: 'center', minHeight: 44 },
  pressed: { opacity: 0.6 },
});
