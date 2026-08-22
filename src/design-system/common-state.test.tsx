import { fireEvent, render, screen } from '@testing-library/react-native';

import { CommonState, commonStateKinds } from './common-state';

describe('CommonState', () => {
  it.each(commonStateKinds)('renders the accessible %s contract', async (kind) => {
    await render(
      <CommonState
        kind={kind}
        message="Synthetic state detail."
        metadata="Last updated at a synthetic time."
        title={`${kind} title`}
      />,
    );

    const role = kind === 'error' ? 'alert' : kind === 'loading' ? 'progressbar' : 'summary';
    const state = screen.getByRole(role, { name: new RegExp(`${kind} title`, 'i') });
    if (kind === 'loading') expect(state).toHaveProp('accessibilityState', { busy: true });
    expect(screen.getByText('Last updated at a synthetic time.')).toBeOnTheScreen();
  });

  it('announces errors assertively and other changes politely', async () => {
    const view = await render(<CommonState kind="error" message="Try again." title="Unable to load" />);
    expect(screen.getByRole('alert')).toHaveProp('accessibilityLiveRegion', 'assertive');

    await view.rerender(<CommonState kind="offline" message="Cached content remains available." title="Offline" />);
    expect(screen.getByRole('summary')).toHaveProp('accessibilityLiveRegion', 'polite');
  });

  it('keeps its recovery action independently operable and accessible', async () => {
    const onPress = jest.fn();
    await render(
      <CommonState
        action={{ accessibilityHint: 'Attempts the synthetic request again.', label: 'Try again', onPress }}
        kind="error"
        message="The request did not complete."
        title="Unable to load"
      />,
    );

    const action = screen.getByRole('button', { name: 'Try again' });
    expect(action).toHaveProp('accessibilityHint', 'Attempts the synthetic request again.');
    expect(action).toHaveStyle({ minHeight: 44 });
    fireEvent.press(action);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('honors disabled action state', async () => {
    const onPress = jest.fn();
    await render(
      <CommonState
        action={{ disabled: true, label: 'Unavailable', onPress }}
        kind="partial"
        message="Some details are missing."
        title="Partial result"
      />,
    );

    const action = screen.getByRole('button', { name: 'Unavailable' });
    expect(action).toBeDisabled();
    fireEvent.press(action);
    expect(onPress).not.toHaveBeenCalled();
  });
});
