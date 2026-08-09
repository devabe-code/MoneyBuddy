import { StyleSheet, View } from 'react-native';

import { AppText, IconBadge, SurfaceCard } from '@/src/design-system/components';
import { tokens } from '@/src/design-system/tokens';
import type { ExplainerContent } from './explainer-content';

export function ExplainerStep({ copy, icon, number, title }: ExplainerContent & { number: number }) {
  return (
    <SurfaceCard>
      <View style={styles.row}>
        <View accessibilityLabel={`Step ${number}`} style={styles.number}>
          <AppText tone="onPrimary" variant="label">{number}</AppText>
        </View>
        <View style={styles.copy}>
          <View style={styles.titleRow}>
            <IconBadge icon={icon} size={28} tint="transparent" />
            <AppText variant="title">{title}</AppText>
          </View>
          <AppText tone="muted">{copy}</AppText>
        </View>
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 14 },
  number: { alignItems: 'center', backgroundColor: tokens.color.primary, borderRadius: 16, height: 32, justifyContent: 'center', width: 32 },
  copy: { flex: 1 },
  titleRow: { alignItems: 'center', flexDirection: 'row', gap: 8, marginBottom: 8 },
});
