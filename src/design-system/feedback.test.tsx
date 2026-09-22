import { render, screen } from '@testing-library/react-native';

import { clampPercentage, ProgressBar } from './feedback';

describe('feedback components', () => {
  it.each([
    [-10, 0],
    [44, 44],
    [180, 100],
    [Number.NaN, 0],
  ])('bounds progress %s to %s', (input, output) => {
    expect(clampPercentage(input)).toBe(output);
  });

  it('exposes bounded progress to assistive technology', async () => {
    await render(<ProgressBar label="Goal progress" value={180} />);
    expect(screen.getByRole('progressbar')).toHaveAccessibilityValue({
      max: 100,
      min: 0,
      now: 100,
    });
  });
});
