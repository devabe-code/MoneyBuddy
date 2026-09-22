import { commonStateKinds } from '@/src/design-system/common-state';
import { SYNTHETIC_COMMON_APP_STATES } from './common-app-states';

describe('common app-state fixtures', () => {
  it('demonstrates every supported state exactly once', () => {
    expect(SYNTHETIC_COMMON_APP_STATES.map(({ kind }) => kind).sort()).toEqual(
      [...commonStateKinds].sort(),
    );
  });

  it('is explicitly synthetic and avoids placeholder financial values while loading', () => {
    expect(
      SYNTHETIC_COMMON_APP_STATES.every(
        ({ fixtureKind, id }) => fixtureKind === 'synthetic' && id.startsWith('synthetic-'),
      ),
    ).toBe(true);
    const loading = SYNTHETIC_COMMON_APP_STATES.find(({ kind }) => kind === 'loading');
    expect(`${loading?.title} ${loading?.message}`).not.toMatch(/[$€£]\s?\d|\b\d+[,.]\d{2}\b/);
  });

  it('includes freshness metadata for cached and outdated examples', () => {
    for (const kind of ['offline', 'stale'] as const) {
      expect(
        SYNTHETIC_COMMON_APP_STATES.find((fixture) => fixture.kind === kind)?.metadata,
      ).toMatch(/^Last updated/);
    }
  });
});
