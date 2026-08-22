import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { commonStateKinds } from '@/src/design-system/common-state';
import { SYNTHETIC_COMMON_APP_STATES } from '@/src/test/fixtures/common-app-states';
import { CommonStatePreviewScreen } from './common-state-preview-screen';

describe('CommonStatePreviewScreen', () => {
  it('demonstrates every synthetic shared state', async () => {
    await render(<CommonStatePreviewScreen examples={SYNTHETIC_COMMON_APP_STATES} />);
    expect(SYNTHETIC_COMMON_APP_STATES).toHaveLength(commonStateKinds.length);
    for (const fixture of SYNTHETIC_COMMON_APP_STATES) {
      expect(screen.getByText(fixture.title)).toBeOnTheScreen();
    }
  });

  it('demonstrates recovery actions without external side effects', async () => {
    await render(<CommonStatePreviewScreen examples={SYNTHETIC_COMMON_APP_STATES} />);
    fireEvent.press(screen.getByRole('button', { name: 'Try again' }));
    await waitFor(() => expect(screen.getByText('Synthetic action selected: Try again.')).toHaveProp('accessibilityLiveRegion', 'polite'));
  });
});
