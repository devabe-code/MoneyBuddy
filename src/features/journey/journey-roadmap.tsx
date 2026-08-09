import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, SurfaceCard } from '@/src/design-system/components';
import { tokens } from '@/src/design-system/tokens';

type IconName = ComponentProps<typeof Ionicons>['name'];
export type JourneyMilestone = { complete: boolean; date: string; description: string; icon: IconName; name: string; status: string };

export function JourneyRoadmap({ milestones, title = 'Sample roadmap' }: { milestones: JourneyMilestone[]; title?: string }) {
  return (
    <SurfaceCard>
      <AppText style={styles.roadmapTitle} variant="title">{title}</AppText>
      {milestones.map((item, index) => (
        <View accessibilityLabel={`${item.name}, ${item.status}`} key={item.name} style={styles.step}>
          <View accessibilityElementsHidden style={styles.rail}>
            <View style={[styles.marker, item.complete && styles.markerComplete]}>
              <Ionicons color={item.complete ? tokens.color.onPrimary : tokens.color.primary} name={item.complete ? 'checkmark' : item.icon} size={16} />
            </View>
            {index < milestones.length - 1 ? <View style={[styles.line, item.complete && styles.lineComplete]} /> : null}
          </View>
          <View style={styles.stepContent}>
            <AppText tone="primary" variant="eyebrow">{item.date}</AppText>
            <AppText variant="title">{item.name}</AppText>
            <AppText tone="muted" variant="caption">{item.description}</AppText>
            <View style={styles.statusPill}><AppText tone="muted" variant="caption">{item.status}</AppText></View>
          </View>
        </View>
      ))}
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  roadmapTitle: { fontSize: 17, fontWeight: '800', marginBottom: 20 },
  step: { flexDirection: 'row', gap: 14, minHeight: 132 },
  rail: { alignItems: 'center', width: 34 },
  marker: { alignItems: 'center', backgroundColor: tokens.color.primarySoft, borderColor: tokens.color.primary, borderRadius: 17, borderWidth: 1, height: 34, justifyContent: 'center', width: 34 },
  markerComplete: { backgroundColor: tokens.color.primary },
  line: { backgroundColor: tokens.color.borderStrong, flex: 1, width: 2 },
  lineComplete: { backgroundColor: tokens.color.primary },
  stepContent: { flex: 1, gap: 5, paddingBottom: 22 },
  statusPill: { alignSelf: 'flex-start', backgroundColor: tokens.color.canvas, borderRadius: 20, marginTop: 5, paddingHorizontal: 10, paddingVertical: 5 },
});
