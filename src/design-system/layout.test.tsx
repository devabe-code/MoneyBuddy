import { render, screen } from '@testing-library/react-native';

import { Screen, SectionHeader } from './layout';

describe('layout components', () => {
  it('gives screen and section titles heading semantics', async () => {
    await render(<Screen title="Goals"><SectionHeader title="Closest goal" /></Screen>);
    expect(screen.getAllByRole('header')).toHaveLength(2);
  });

  it('renders section actions as accessible links', async () => {
    await render(<SectionHeader action="View calendar" href="/calendar" title="Coming up" />);
    expect(screen.getByRole('link', { name: 'View calendar' })).toBeOnTheScreen();
  });
});
