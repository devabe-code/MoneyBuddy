import { PrimaryLink, Screen, StateNotice } from '@/src/design-system/components';

export default function NotFoundScreen() {
  return (
    <Screen title="That page is not in the plan" subtitle="The link may be old or incomplete.">
      <StateNotice message="Your sample plan is safe. Return to Today to keep exploring." state="error" title="Page not found" />
      <PrimaryLink href="/" label="Return to Today" />
    </Screen>
  );
}
