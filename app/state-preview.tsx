import { CommonStatePreviewScreen } from '@/src/features/common-states/common-state-preview-screen';
import { SYNTHETIC_COMMON_APP_STATES } from '@/src/test/fixtures/common-app-states';

export default function StatePreviewRoute() {
  return <CommonStatePreviewScreen examples={SYNTHETIC_COMMON_APP_STATES} />;
}
