import { render, screen } from '@testing-library/react-native';

import { DisabledAction, PrimaryLink, TextLink } from './actions';

describe('action components', () => {
  it('renders a reusable primary navigation action', async () => {
    await render(<PrimaryLink href="/" label="Return to Today" />);
    expect(screen.getByRole('button', { name: 'Return to Today' })).toBeOnTheScreen();
  });

  it('renders accessible text links', async () => {
    await render(<TextLink hint="Opens details" href="/about" label="Learn more" />);
    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveProp('accessibilityHint', 'Opens details');
  });

  it('exposes disabled state', async () => {
    await render(<DisabledAction label="Add a goal · coming soon" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
