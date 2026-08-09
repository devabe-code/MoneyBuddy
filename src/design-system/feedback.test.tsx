import { render, screen } from '@testing-library/react-native';

import { appStates, clampPercentage, ProgressBar, StateNotice } from './feedback';

describe('feedback components', () => {
  it.each([[-10, 0], [44, 44], [180, 100], [Number.NaN, 0]])('bounds progress %s to %s', (input, output) => {
    expect(clampPercentage(input)).toBe(output);
  });

  it('exposes bounded progress to assistive technology', async () => {
    await render(<ProgressBar label="Goal progress" value={180} />);
    expect(screen.getByRole('progressbar')).toHaveAccessibilityValue({ max: 100, min: 0, now: 100 });
  });

  it.each(appStates)('renders the %s application state', async (state) => {
    await render(<StateNotice message="State details" state={state} title={`${state} state`} />);
    expect(screen.getByText(`${state} state`)).toBeOnTheScreen();
  });

  it('announces errors assertively', async () => {
    await render(<StateNotice message="Try again" state="error" title="Unable to load" />);
    expect(screen.getByRole('alert')).toHaveProp('accessibilityLiveRegion', 'assertive');
  });
});
