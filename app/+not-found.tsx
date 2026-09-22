import { CommonState, PrimaryLink, Screen } from '@/src/design-system/components';

export default function NotFoundScreen() {
  return (
    <Screen title="That page is not in the plan" subtitle="The link may be old or incomplete.">
      <CommonState
        kind="error"
        message="Your sample plan is safe. Return to Today to keep exploring."
        title="Page not found"
      />
      <PrimaryLink href="/" label="Return to Today" />
    </Screen>
  );
}
