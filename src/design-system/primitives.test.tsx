import { render, screen } from '@testing-library/react-native';

import { AppText, IconBadge, SurfaceCard } from './primitives';

describe('design-system primitives', () => {
  it('renders reusable typography and card content', async () => {
    await render(<SurfaceCard><AppText variant="title">Reusable card</AppText></SurfaceCard>);
    expect(screen.getByText('Reusable card')).toBeOnTheScreen();
  });

  it('keeps decorative icon badges out of the accessibility tree', async () => {
    const { toJSON } = await render(<IconBadge icon="sparkles" />);
    expect(toJSON()).toMatchObject({ props: { accessibilityElementsHidden: true, importantForAccessibility: 'no-hide-descendants' } });
  });
});
