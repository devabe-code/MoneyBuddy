import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, PropsWithChildren } from 'react';
import { StyleSheet, Text, View, type StyleProp, type TextProps, type TextStyle, type ViewStyle } from 'react-native';

import { tokens } from './tokens';

type IconName = ComponentProps<typeof Ionicons>['name'];
type TextVariant = 'body' | 'caption' | 'eyebrow' | 'label' | 'screenTitle' | 'sectionTitle' | 'title';
type TextTone = 'default' | 'muted' | 'primary' | 'danger' | 'onPrimary';

const toneStyles: Record<TextTone, TextStyle> = {
  default: { color: tokens.color.ink },
  muted: { color: tokens.color.muted },
  primary: { color: tokens.color.primary },
  danger: { color: tokens.color.danger },
  onPrimary: { color: tokens.color.onPrimary },
};

export function AppText({
  style,
  tone = 'default',
  variant = 'body',
  ...props
}: TextProps & { tone?: TextTone; variant?: TextVariant }) {
  return <Text {...props} style={[styles[variant], toneStyles[tone], style]} />;
}

export function SurfaceCard({
  children,
  padded = true,
  tone = 'default',
  style,
}: PropsWithChildren<{ padded?: boolean; style?: StyleProp<ViewStyle>; tone?: 'default' | 'accent' }>) {
  return (
    <View
      style={[
        styles.card,
        tone === 'accent' && styles.accentCard,
        padded && styles.paddedCard,
        style,
      ]}>
      {children}
    </View>
  );
}

export function IconBadge({
  color = tokens.color.primary,
  icon,
  size = 44,
  tint = tokens.color.primarySoft,
}: {
  color?: string;
  icon: IconName;
  size?: number;
  tint?: string;
}) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.iconBadge, { backgroundColor: tint, borderRadius: size / 2, height: size, width: size }]}>
      <Ionicons color={color} name={icon} size={Math.round(size * 0.48)} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 18 },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  label: { fontSize: 13, fontWeight: '600' },
  screenTitle: { fontSize: 32, fontWeight: '800', letterSpacing: -0.8 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  title: { fontSize: 16, fontWeight: '700' },
  card: { backgroundColor: tokens.color.surface, borderColor: tokens.color.border, borderRadius: tokens.radius.md, borderWidth: 1 },
  accentCard: { backgroundColor: tokens.color.accentSurface },
  paddedCard: { padding: tokens.space.md },
  iconBadge: { alignItems: 'center', justifyContent: 'center' },
});
