import { Screen, StateNotice } from '@/src/design-system/components';
import { JourneyRoadmap } from '@/src/features/journey/journey-roadmap';
import { samplePlan } from '@/src/test/fixtures/sample-plan';

export default function JourneyScreen() {
  return (
    <Screen eyebrow="YOUR STORY" title="Journey" subtitle="A map of the milestones your savings can unlock.">
      <StateNotice message="Your journal will grow as goals and real progress are added. These entries are synthetic." state="empty" title="Journal preview" />
      <JourneyRoadmap milestones={samplePlan.journey} />
    </Screen>
  );
}
