import { navigationTheme, tokens } from './tokens';

describe('design tokens', () => {
  it('keeps navigation colors aligned with shared application tokens', () => {
    expect(navigationTheme.colors).toMatchObject({
      background: tokens.color.canvas,
      border: tokens.color.border,
      primary: tokens.color.primary,
      text: tokens.color.ink,
    });
  });

  it('provides reusable spacing and radius scales in ascending order', () => {
    expect(Object.values(tokens.space)).toEqual([4, 8, 16, 24, 32]);
    expect(Object.values(tokens.radius)).toEqual([10, 16, 24]);
  });
});
